import { useEffect, useState } from "react"
import {
  APTOS_ADDRESS,
  MOCK_USDC_COIN_STORE,
  formatAptosDecimal,
  getAptosCoinBalance,
  getPositionConfigResources,
  parseAptosDecimal,
} from "@/chainio/fetchData"
import { APTOS_COIN_STORE, VaultInfo } from "@/chainio/helper"
import useTokenStore from "@/chainio/useTokenStore"
import { aptos } from "@/pages/_app"
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
  tokenPrice: any
}

export default function TradeMarketWidget({
  side,
  tokenPrice,
}: TradeMarketType) {
  console.log("🚀 ~ side:", side)
  const [collateral, setCollateral] = useState("")
  const [amount, setAmount] = useState("")
  const [positionSize, setPositionSize] = useState("")
  const [leverageNumber, setLeverageNumber] = useState(1)
  const { symbol } = useTokenStore()
  const handleSliderValueChange = (value: any) => {
    setLeverageNumber(value[0])
  }

  useEffect(() => {
    if (collateral !== "") {
      const tempCollateral = parseFloat(collateral)

      setAmount(
        (isNaN(tempCollateral) ? 0 : tempCollateral * leverageNumber).toString()
      )
    } else {
      setPositionSize("")
    }
  }, [leverageNumber, collateral])

  useEffect(() => {
    if (amount !== "" && tokenPrice) {
      const tempPrice = formatAptosDecimal(tokenPrice, 18)
      setPositionSize((BigInt(amount) * BigInt(tempPrice)).toString())
    } else {
      setPositionSize("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, tokenPrice])

  const { vault } = useTokenStore()
  const { account } = useWallet()
  const [tokenBalance, setTokenBalance] = useState("0")
  const [estLiqPrice, setEstLiqPrice] = useState(0)

  const fetchBalance = async () => {
    const { result } = await getAptosCoinBalance(
      account?.address || "",
      vault.tokenStore as APTOS_ADDRESS
    )

    const temp = parseAptosDecimal(
      Number(result.coin.value),
      vault.decimal
    ).toFixed(6)
    setTokenBalance(temp)
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
    const result = await aptos.getAccountResource({
      accountAddress: account?.address || "",
      resourceType: getPositionConfigResources(
        symbol.tokenAddress as `${string}::${string}::${string}`,
        side
      ),
    })
    if (result) {
      setWrapperConfig(result)
    }
  }
  useEffect(() => {
    fetchConfig()
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
    if (tokenPrice && collateral) {
      let liqPrice = 0

      if (side === "LONG") {
        liqPrice =
          (Number(collateral) - tradingFee) *
          tokenPrice *
          (1 - 1 / leverageNumber)
      } else {
        liqPrice =
          (Number(collateral) - tradingFee) *
          tokenPrice *
          (1 + 1 / leverageNumber)
      }
      setEstLiqPrice(liqPrice)
    }
  }, [tokenPrice, collateral, side, leverageNumber, tradingFee])

  return (
    <div>
      <TokenInputBox
        title="Pay"
        value={collateral}
        balanceNode={<>{`Balance: ${tokenBalance}`}</>}
        maxNode={<div className="rounded-xl">max</div>}
        onValueChange={(e) => {
          setCollateral(e.target.value)
        }}
      />
      <br></br>
      <PoolInputBox
        title="Size"
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
        <ListItem keyText="Entry Price" value={Number(tokenPrice)} />
        <ListItem keyText="Est. Liq. Price" value={estLiqPrice.toFixed(6)} />
        <ListItem
          keyText="Fee"
          value={`${(tradingFee * tokenPrice).toFixed(
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
