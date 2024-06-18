import { useEffect, useState } from "react"
import Decimal from "decimal.js"
import { Edit3, ExternalLink, Loader } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ListItem } from "@/components/ui/listItem"
import { Slider } from "@/components/ui/slider"

import { CustomTooltip } from "../customToolTip"
import { PoolInputBox } from "../poolInputBox"
import { TokenInputBox } from "../tokenInputBox"

type Side = {}
type TradeMarketType = {
  side: Side
  marketAndIndexPriceData: any
  tokenPrice: any
}

export default function TradeLimitWidget({
  side,
  marketAndIndexPriceData,
  tokenPrice,
}: TradeMarketType) {
  const [usdMargin, setUsdMargin] = useState("")
  const [usdAfterMargin, setUsdAfterMargin] = useState("")
  const [tradingSize, setTradingSize] = useState("")
  const [leverageNumber, setLeverageNumber] = useState(1)
  const [isChecked, setIsChecked] = useState(true)
  const [showSlider, setShowSlider] = useState(true)
  const [limitPrice, setLimitPrice] = useState("")
  const [acceptableLimit, setAcceptableLimit] = useState("")
  useEffect(() => {
    if (limitPrice) {
      const accLimit = Number(limitPrice) * (1 + limitAcceptableRate)
      setAcceptableLimit(accLimit.toString())
    }
  }, [limitPrice])
  const limitAcceptableRate = 0.03

  const [ethPrice, setEthPrice] = useState(0)

  const handleCheckboxChange = (checked: any) => {
    setIsChecked(checked)
    // Now, use the isChecked state to control the visibility of the Slider
    setShowSlider(checked) // Assuming setShowSlider is defined elsewhere
  }
  const handleSliderValueChange = (value: any) => {
    setLeverageNumber(value)
  }

  const handleIncOrderTemp = () => {}

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
    if (usdAfterMargin !== "") {
      const tradingSize = new Decimal(usdAfterMargin)
        .dividedBy(new Decimal(ethPrice))
        .toFixed(18)
        .toString()
      setTradingSize(tradingSize)
    } else {
      setTradingSize("")
    }
  }, [ethPrice, usdAfterMargin])

  const feesValue = 0

  return (
    <div>
      <div className="w-full">
        <TokenInputBox
          title="Price"
          value={limitPrice}
          onValueChange={(e) => {
            setLimitPrice(e.target.value)
          }}
        />
        <br></br>
        <PoolInputBox
          title="Pay"
          value={usdMargin}
          balanceNode={
            <div>
              Balance: {0} {"balanceData?.symbol"}
            </div>
          }
          onValueChange={(e) => {
            setUsdMargin(e.target.value)
          }}
        />
        <br></br>
        {/* <InputBox
          title="Size"
          value={tradingSize}
          prefix={`Leverage:`}
          prefixValue={leverageNumber}
          onValueChange={(e) => {
            setUsdMargin(e.target.value)
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
        /> */}
        <br></br>
        <div>
          <div className="flex flex-row items-center justify-between">
            <div className="text-sm">Leverage Slider</div>
            <Checkbox
              checked={isChecked}
              onCheckedChange={handleCheckboxChange}
            />
          </div>
          {showSlider && (
            <Slider
              defaultValue={[1]}
              onValueChange={handleSliderValueChange}
              max={200}
              min={1}
              step={1}
              value={[leverageNumber]}
              style={{ marginBottom: 10, marginTop: 10 }}
            />
          )}
        </div>
        <br></br>
        {/* <ListItem keyText="Entry Price" value={""} /> */}
        {/* <ListItem keyText="Price Impact" value={""} /> */}
        <ListItem keyText="Acceptable Price" value={""} percentage="0.30%" />
        {/* <ListItem keyText="Liq. Price" value={""} /> */}
        <ListItem keyText="Est. Margin" value={""} />
        <div className="flex justify-between">
          <div className="text-sm">Fees</div>
          {feesValue > 0 ? (
            <CustomTooltip
              triggerContent={<div className="font-bold">{feesValue}</div>}
            >
              <div className="flex justify-between">
                <div className="font-bold">Trading Fee</div>
                <div className="font-bold">-0.82 USDX</div>
              </div>
              <div className="text-xs text-0xgrey">
                (0.050% of the position value)
              </div>
              <div className="flex justify-between">
                <div className="text-xs text-white">Execution Fee Fee</div>
                <div className="text-xs text-white">
                  -0.82 USDX{" "}
                  <span className="text-sm text-0xgrey">(-$0.46)</span>
                </div>
              </div>
            </CustomTooltip>
          ) : (
            <div className="font-bold">-</div>
          )}
        </div>
      </div>
      <Button
        disabled={false}
        onClick={() => {
          handleIncOrderTemp()
        }}
        className={`w-full font-bold text-center rounded-md item-center mt-4 ${"bg-0xgreen"} h-9 text-white`}
      >
        <>
          <Loader className="mr-2 size-4 animate-spin" />
          Please wait
        </>
      </Button>
    </div>
  )
}
