import { useEffect, useState } from "react"
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
import { InputBox } from "@/components/ui/inputBox"
import { ListItem } from "@/components/ui/listItem"
import { Slider } from "@/components/ui/slider"
import { TpsLInput } from "@/components/ui/tpslIput"

import { Card } from "../card"

type Side = {}
type TradeMarketType = {
  side: Side
  marketAndIndexPriceData: any
  contractPriceAfter: any
}

export default function TradeSwapWidget({
  side,
  marketAndIndexPriceData,
  contractPriceAfter,
}: TradeMarketType) {
  const [usdMargin, setUsdMargin] = useState("")
  const [usdAfterMargin, setUsdAfterMargin] = useState("")
  const [tradingSize, setTradingSize] = useState("")
  const [leverageNumber, setLeverageNumber] = useState(1)
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
  const handleSliderValueChange = (value: any) => {
    setLeverageNumber(value)
  }

  useEffect(() => {
    if (usdMargin !== "") {
      const tempMargin = parseFloat(usdMargin)

      setUsdAfterMargin(
        (isNaN(tempMargin) ? 0 : tempMargin * leverageNumber).toString()
      )
    } else {
      setTradingSize("")
    }
  }, [leverageNumber, usdMargin])

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
  }, [contractPrice, priceSlippage, side])

  useEffect(() => {
    if (tokenPrice) {
    }
  }, [leverageNumber, usdMargin, tokenPrice, side])

  const [tradingFee, setTradingFee] = useState(0)

  return (
    <div>
      <InputBox
        title="Pay"
        value={usdMargin}
        suffix="USDX"
        balanceNode={<div>Balance: {"balanceData?.symbol"}</div>}
        onValueChange={(e) => {
          setUsdMargin(e.target.value)
        }}
      />
      <br></br>
      <InputBox
        title="Size"
        value={tradingSize}
        suffix={"currentTokenEntity.name"}
        prefix={`Leverage:`}
        prefixValue={leverageNumber}
        onValueChange={(e) => {
          setTradingSize(e.target.value)
        }}
        onPrefixChange={(e) => {
          const intValue = parseInt(e.target.value, 10)

          if (!isNaN(intValue)) {
            setLeverageNumber(intValue)
          } else if (intValue < 1) {
            setLeverageNumber(1)
          } else if (intValue > 200) {
            setLeverageNumber(200)
          } else {
            setLeverageNumber(1)
          }
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
