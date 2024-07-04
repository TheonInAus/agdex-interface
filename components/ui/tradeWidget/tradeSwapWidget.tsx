import { useEffect, useState } from "react"
import { Aptos, MoveObjectType, MoveType, MoveValue } from "@aptos-labs/ts-sdk"
import {
  APTOS_ADDRESS,
  fetchSwapRate,
  generateFunctionPath,
  getVaultInfo,
  getVaultTokenBalance,
} from "@/chainio/fetchData"
import useTokenStore from "@/chainio/useTokenStore"
import { aptos, moduleAddress } from "@/pages/_app"
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import Decimal from "decimal.js"
import { Edit3, ExternalLink, Loader, Power } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { CustomTooltip } from "@/components/ui/customToolTip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ListItem } from "@/components/ui/listItem"
import { Slider } from "@/components/ui/slider"
import { TpsLInput } from "@/components/ui/tpslIput"

import { Card } from "../card"
import { PoolInputBox } from "../poolInputBox"
import { TokenInputBox } from "../tokenInputBox"
import { TokenBox } from "../tokenBox"

type TradeMarketSwapType = {
  sourcePrice: any
  destinationPrice: any
}

export default function TradeSwapWidget({
  sourcePrice,
  destinationPrice,
}: TradeMarketSwapType) {
  const [usdMargin, setUsdMargin] = useState("")
  const [usdAfterMargin, setUsdAfterMargin] = useState("")
  const [tradingSize, setTradingSize] = useState("")
  const [isChecked, setIsChecked] = useState(true)
  const [priceSlippage, setPriceSlippage] = useState("1")
  const [ethPrice, setEthPrice] = useState(0)
  const [tokenPrice, setTokenPrice] = useState(0)
  const [contractPrice, setContractPrice] = useState(0)

  const [tokenAfterSlippagePrice, setTokenAfterSlippagePrice] = useState(0)
  const [liqPrice, setLiqPrice] = useState(0)

  const { account, signAndSubmitTransaction } = useWallet()

  // Fetch balance--------------------------------------------------
  const [sourceBalance, setSourceBalance] = useState("0")
  const [destinationBalance, setDestinationBalance] = useState("0")
  const { vault, vault2 } = useTokenStore()

  // Fetch source balance
  const fetchSourceBalance = async () => {
    try {
      const { result } = await getVaultTokenBalance(
        account?.address || "",
        vault
      )
      setSourceBalance(result)
    } catch (error) {
      setSourceBalance("0")
    }
  }

  useEffect(() => {
    if (account?.address) {
      fetchSourceBalance()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.address, vault])

  // Fetch destination balance
    const fetchDestinationBalance = async () => {
      try {
        const { result } = await getVaultTokenBalance(
          account?.address || "",
          vault2
        )
        setDestinationBalance(result)
      } catch (error) {
        setDestinationBalance("0")
      }
    }
  
    useEffect(() => {
      if (account?.address) {
        fetchDestinationBalance()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account?.address, vault2])
  //------------------------------------------------------------

  const [wrapperConfig, setWrapperConfig] = useState<any>(null)

  // fetch vault information
  const [sourceVaultInfo, setSourceVaultInfo] = useState<any>(null)
  console.log("🚀 ~ vaultInfo:", sourceVaultInfo)
  const fetchSourceVaultInfo = async () => {
    try {
      let { result } = await getVaultInfo(vault.tokenAddress as APTOS_ADDRESS)
      setSourceVaultInfo(result)
    } catch (error) {
      setSourceVaultInfo(null)
    }
  }

  useEffect(() => {
    if (vault) {
      fetchSourceVaultInfo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vault])

  const [destinationVaultInfo, setDestinationVaultInfo] = useState<any>(null)
  console.log("🚀 ~ destinationVaultInfo:", destinationVaultInfo)
  const fetchDestinationVaultInfo = async () => {
    try {
      let { result } = await getVaultInfo(vault2.tokenAddress as APTOS_ADDRESS)
      setDestinationVaultInfo(result)
    } catch (error) {
      setDestinationVaultInfo(null)
    }
  }

  useEffect(() => {
    if (vault2) {
      fetchDestinationVaultInfo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vault2])
  //-------------------------------------------------------------
  /*
  useEffect(() => {
    if (contractPrice && priceSlippage) {
    }
  }, [contractPrice, priceSlippage])

  const [tradingFee, setTradingFee] = useState(0)
*/

  const [source, setSource] = useState("")
  const [destination, setDestination] = useState("")
  // Respectively change between source number and destination number
  useEffect(() => {
    if (source && sourcePrice !== 0 && destinationPrice !== 0) {
      setDestination(
        ((Number(source) * sourcePrice) / destinationPrice ).toString()
      )
    }
    if (!source) {
      setDestination(Number(0.0).toString())
    }
  }, [source, sourcePrice, destinationPrice])
  // -----------------------------------------------------------------

  // handle swap event
  const handleSwap = async () => {
    const response = await signAndSubmitTransaction({
      sender: account?.address,
      data: {
        function: generateFunctionPath(
          moduleAddress,
          "market",
          "swap"
        ),
        typeArguments: [
          vault.tokenAddress,
          vault2.tokenAddress,
        ],
        functionArguments: [
          (Number(source)*Math.pow(10, vault.decimal)).toString(), //amount_in
          0,
          [],
        ],
      },
    })
    try {
      const temp = await aptos.waitForTransaction({
        transactionHash: response.hash,
      })
      console.log("🚀 ~ trading handleSwap ~ temp:", temp)
    } catch (error) {
      console.error(error)
    }
  }
  //--------------------------------------------------------

  // Calculate fee amount
  const [feeAmount, setFeeAmount] = useState("0");

  async function getSwapFeeRates() {
    let [sourceRate, destinationRate] = await fetchSwapRate(vault.tokenAddress, vault2.tokenAddress);
    console.log([sourceRate, destinationRate]);
    let swap_in_fee = Number(source) * sourcePrice * Number(sourceRate) / Math.pow(10, 18);
    let swap_value = Number(source) * sourcePrice - swap_in_fee;
    let swap_out_fee = swap_value * Number(destinationRate) / Math.pow(10, 18);
    return swap_in_fee+swap_out_fee;
  }
  
  useEffect(() => {
    fetchSwapRate(vault.tokenAddress, vault2.tokenAddress)
    .then((data) => {
      const s = JSON.parse(JSON.stringify(data[0]));
      const d = JSON.parse(JSON.stringify(data[1]));
      if (s.value !== "undefined" && d.value !== "undefined") {
        setFeeAmount(
          (Number(source) * (Number(s.value)+Number(d.value)) / Math.pow(10, 18)).toString()
        )
      }
      else {
        setFeeAmount("0");
      }
      return;
    })
  }, 
  [source, vault, vault2])

  return (
    <div>
      <TokenInputBox
        title={`Pay`}
        subTitle={`$${(Number(source) * sourcePrice).toFixed(6)}`}
        value={source}
        balanceNode={<span>{`Balance: ${sourceBalance}`}</span>}
        maxNode={<div className="rounded-xl">max</div>}
        onValueChange={(e) => {
          setSource(e.target.value)
        }}
        onMaxClick={() => { setSource(sourceBalance) }}
      />
      <br></br>
      <TokenBox
        title={`Receive`}
        subTitle={`$${(Number(destination) * destinationPrice).toFixed(6)}`}
        value={destination}
        balanceNode={<span>{`Balance: ${destinationBalance}`}</span>}
        maxNode={false}
      />
      <br></br>
      <div
      className={` outline-none bg-[#242424] rounded-xl`}>      
        <div className="flex flex-row items-center mb-2 justify-around">
          <div className="flex flex-row items-baseline justify-between w-full">
            <div className="flex text-xl font-bold text-white ml-4">Fee</div>
            <div className="flex right-0 mr-4 text-sm text-gray-400">{feeAmount}$</div>
          </div>
      </div>
    </div>
      <Button
        disabled={false}
        onClick={() => handleSwap()}
        className={`w-full font-bold text-center rounded-md item-center mt-4  h-9 text-white bg-agdexMain`}
      >
        Swap
      </Button>
    </div>
  )
}
