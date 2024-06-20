import { useEffect, useState } from "react"
import {
  APTOS_ADDRESS,
  MOCK_USDC_COIN_STORE,
  formatAptosDecimal,
  getAptosCoinBalance,
  getPositionConfigResources,
  getVaultTokenBalance,
  parseAptosDecimal,
} from "@/chainio/fetchData"
import { APTOS_COIN_STORE, VaultInfo } from "@/chainio/helper"
import useTokenStore from "@/chainio/useTokenStore"
import { aptos, moduleAddress } from "@/pages/_app"
import { useWallet } from "@aptos-labs/wallet-adapter-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { CustomTooltip } from "@/components/ui/customToolTip"
import { ListItem } from "@/components/ui/listItem"
import { Slider } from "@/components/ui/slider"
import { TpsLInput } from "@/components/ui/tpslIput"

import { Card } from "../card"
import { PoolInputBox } from "../poolInputBox"
import { TokenInputBox } from "../tokenInputBox"

type TradeMarketType = {
  side: string
  symbolPrice: number
  vaultPrice: number
}

export default function TradeMarketWidget({
  side,
  symbolPrice,
  vaultPrice,
}: TradeMarketType) {
  const [collateral, setCollateral] = useState("")
  const [amount, setAmount] = useState("")
  const [positionSize, setPositionSize] = useState("")
  const [leverageNumber, setLeverageNumber] = useState(1)

  const { symbol } = useTokenStore()

  console.log("🚀 ~ trading amount:", amount)
  console.log("🚀 ~ trading collateral:", collateral)
  console.log("🚀 ~ trading side:", side)
  console.log("🚀 ~ trading positionSize:", positionSize)
  console.log("🚀 ~ trading leverageNumber:", leverageNumber)
  console.log("🚀 ~ trading symbol:", symbol)

  const handleSliderValueChange = (value: any) => {
    setLeverageNumber(value[0])
  }

  useEffect(() => {
    if (collateral !== "") {
      const tempCollateral = parseFloat(collateral)

      setPositionSize(
        (isNaN(tempCollateral)
          ? 0
          : (tempCollateral * vaultPrice * leverageNumber) / symbolPrice
        ).toString()
      )
    } else {
      setPositionSize("")
    }
  }, [leverageNumber, collateral, vaultPrice, symbolPrice])

  // useEffect(() => {
  //   if (amount !== "" && symbolPrice) {
  //     setPositionSize((Number(amount) * symbolPrice).toString())
  //   } else {
  //     setPositionSize("")
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [amount, symbolPrice])

  const { vault } = useTokenStore()
  const { account } = useWallet()
  const [vaultBalance, setVaultBalance] = useState("0")
  const [estLiqPrice, setEstLiqPrice] = useState(0)

  const fetchBalance = async () => {
    try {
      const { result } = await getVaultTokenBalance(
        account?.address || "",
        vault
      )
      setVaultBalance(result)
    } catch (error) {
      setVaultBalance("0")
    }
  }
  useEffect(() => {
    if (account?.address) {
      fetchBalance()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.address, vault])

  const [wrapperConfig, setWrapperConfig] = useState<any>(null)
  const [tradingFee, setTradingFee] = useState(0)
  console.log("🚀 ~ wrapperConfig:", wrapperConfig)

  const fetchConfig = async () => {
    try {
      const result = await aptos.getAccountResource({
        accountAddress: moduleAddress,
        resourceType: getPositionConfigResources(
          symbol.tokenAddress as `${string}::${string}::${string}`,
          side
        ),
      })
      setWrapperConfig(result)
    } catch (error) {
      setWrapperConfig(null)
    }
  }
  useEffect(() => {
    if (side && symbol) {
      fetchConfig()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [side, symbol])

  useEffect(() => {
    if (!wrapperConfig) return
    const open_bps = wrapperConfig.inner.open_fee_bps.value
    const dec_bps = wrapperConfig.inner.decrease_fee_bps.value
    if (!collateral) {
      return
    }
    if (side === "LONG") {
      setTradingFee(Number(collateral) * parseAptosDecimal(open_bps, 18))
    } else {
      setTradingFee(Number(collateral) * parseAptosDecimal(dec_bps, 18))
    }
  }, [wrapperConfig, collateral, side])

  useEffect(() => {
    if (symbolPrice && collateral) {
      let liqPrice = 0

      if (side === "LONG") {
        liqPrice =
          (Number(collateral) - tradingFee) *
          symbolPrice *
          (1 - 1 / leverageNumber)
      } else {
        liqPrice =
          (Number(collateral) - tradingFee) *
          symbolPrice *
          (1 + 1 / leverageNumber)
      }
      setEstLiqPrice(liqPrice)
    }
  }, [symbolPrice, collateral, side, leverageNumber, tradingFee])

  return (
    <div>
      <TokenInputBox
        title={`Pay`}
        subTitle={`$${(Number(collateral) * vaultPrice).toFixed(6)}`}
        value={collateral}
        balanceNode={<span>{`Balance: ${vaultBalance}`}</span>}
        maxNode={<div className="rounded-xl">max</div>}
        onValueChange={(e) => {
          setCollateral(e.target.value)
        }}
      />
      <br></br>
      <PoolInputBox
        title={side}
        subTitle={`$${(
          (Number(positionSize) - tradingFee) *
          symbolPrice
        ).toFixed(6)}`}
        value={positionSize}
        prefix={`Leverage:`}
        prefixValue={leverageNumber}
        onValueChange={(e) => {
          setPositionSize(e.target.value)
        }}
        onPrefixChange={(e) => {
          const intValue = parseInt(e.target.value, 10)
          if (!isNaN(intValue)) {
            setLeverageNumber(intValue)
          } else if (intValue < 1) {
            setLeverageNumber(1)
          } else if (intValue > 100) {
            setLeverageNumber(100)
          } else {
            setLeverageNumber(1)
          }
        }}
      />
      <br></br>
      <div>
        <Slider
          defaultValue={[1]}
          onValueChange={handleSliderValueChange}
          max={100}
          min={1}
          step={1}
          value={[leverageNumber]}
          style={{ marginBottom: 10, marginTop: 10 }}
        />
      </div>
      <br></br>
      <div className="py-2">
        <ListItem keyText="Collateral In" value={vault.name} />
        <ListItem keyText="Leverage" value={leverageNumber} />
        <ListItem keyText="Entry Price" value={Number(symbolPrice)} />
        <ListItem keyText="Est. Liq. Price" value={estLiqPrice.toFixed(6)} />
        <ListItem
          keyText="Fee"
          value={`${(tradingFee * vaultPrice).toFixed(
            2
          )} USD (${tradingFee.toFixed(6)}) ${vault.name}`}
        />
      </div>
      {/* <ListItem
          keyText="HasReferral?"
          value={referralState ? "YES" : "NO"}
        ></ListItem> */}
      <Button
        disabled={false}
        onClick={() => {}}
        className={`w-full font-bold text-center rounded-md item-center mt-4 ${"bg-0xgreen hover:bg-0xgreen-foreground"} h-9 text-white`}
      >
        {"Long"}
      </Button>
    </div>
  )
}
