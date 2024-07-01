import { useEffect, useState } from "react"
import {
  APTOS_ADDRESS,
  generateFunctionPath,
  getVaultInfo,
  getVaultTokenBalance,
} from "@/chainio/fetchData"
import useTokenStore from "@/chainio/useTokenStore"
import { aptos, moduleAddress } from "@/pages/_app"
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import Decimal from "decimal.js"
import { Edit3, ExternalLink, Loader } from "lucide-react"

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

  const handleCheckboxChange = (checked: any) => {
    setIsChecked(checked)
    // Now, use the isChecked state to control the visibility of the Slider
  }

  const [source, setSource] = useState("")
  const [destination, setDestination] = useState("")
  const [sourceBalance, setSourceBalance] = useState("0")
  const [destinationBalance, setDestinationBalance] = useState("0")

  const { account, signAndSubmitTransaction } = useWallet()

  /*
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
          sourceVault.tokenAddress,
          destinationVault.tokenAddress,
        ],
        functionArguments: [
          source, //amount_in
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

  const [wrapperConfig, setWrapperConfig] = useState<any>(null)
  const [sourceVaultInfo, setSourceVaultInfo] = useState<any>(null)
  console.log("🚀 ~ vaultInfo:", sourceVaultInfo)
  const fetchSourceVaultInfo = async () => {
    try {
      let { result } = await getVaultInfo(sourceVault.tokenAddress as APTOS_ADDRESS)
      setSourceVaultInfo(result)
    } catch (error) {
      setSourceVaultInfo(null)
    }
  }

  useEffect(() => {
    if (sourceVault) {
      fetchSourceVaultInfo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceVault])

  const [destinationVaultInfo, setDestinationVaultInfo] = useState<any>(null)
  console.log("🚀 ~ destinationVaultInfo:", destinationVaultInfo)
  const fetchDestinationVaultInfo = async () => {
    try {
      let { result } = await getVaultInfo(destinationVault.tokenAddress as APTOS_ADDRESS)
      setDestinationVaultInfo(result)
    } catch (error) {
      setDestinationVaultInfo(null)
    }
  }

  useEffect(() => {
    if (destinationVault) {
      fetchDestinationVaultInfo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destinationVault])

  
  const fetchSourceBalance = async () => {
    try {
      const { result } = await getVaultTokenBalance(
        account?.address || "",
        sourceVault
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
  }, [account?.address, sourceVault])

  const fetchDestinationBalance = async () => {
    try {
      const { result } = await getVaultTokenBalance(
        account?.address || "",
        destinationVault
      )
      setSourceBalance(result)
    } catch (error) {
      setSourceBalance("0")
    }
  }
  useEffect(() => {
    if (account?.address) {
      fetchDestinationBalance()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.address, destinationVault])
*/
  useEffect(() => {
    if (usdAfterMargin !== "" && tokenPrice) {
      const tradingSize = new Decimal(usdAfterMargin)
        .dividedBy(new Decimal(tokenPrice))
        .toFixed(18)
        .toString()
      setTradingSize(tradingSize)
    } else {
      setTradingSize("")
    }
  }, [usdAfterMargin, tokenPrice])

  useEffect(() => {
    if (contractPrice && priceSlippage) {
    }
  }, [contractPrice, priceSlippage])

  const [tradingFee, setTradingFee] = useState(0)

  useEffect(() => {
    if (source && sourcePrice !== 0 && destinationPrice !== 0) {
      setDestination(
        ((Number(source) * sourcePrice) / destinationPrice).toString()
      )
    }
    if (!source) {
      setDestination(Number(0.0).toString())
    }
  }, [source, sourcePrice, destinationPrice])

  useEffect(() => {
    if (destination && sourcePrice !== 0 && destinationPrice !== 0) {
      setSource(
        ((Number(destination) * destinationPrice) / sourcePrice).toString()
      )
    }
    if (!destination) {
      setSource(Number(0.0).toString())
    }
  }, [destination, sourcePrice, destinationPrice])

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
      />
      <br></br>
      <TokenInputBox
        title={`Receive`}
        subTitle={`$${(Number(destination) * destinationPrice).toFixed(6)}`}
        value={destination}
        balanceNode={<span>{`Balance: ${destinationBalance}`}</span>}
        maxNode={false}
        onValueChange={(e) => {
          setDestination(e.target.value)
        }}
      />

      <Button
        disabled={false}
        onClick={() => {}}
        className={`w-full font-bold text-center rounded-md item-center mt-4  h-9 text-white bg-agdexMain`}
      >
        Swap
      </Button>
    </div>
  )
}
