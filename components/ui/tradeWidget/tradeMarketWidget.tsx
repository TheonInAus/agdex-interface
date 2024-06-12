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

export default function TradeMarketWidget({
  side,
  marketAndIndexPriceData,
  contractPriceAfter,
}: TradeMarketType) {
  const [usdMargin, setUsdMargin] = useState("")
  const [usdAfterMargin, setUsdAfterMargin] = useState("")
  const [tradingSize, setTradingSize] = useState("")
  const [leverageNumber, setLeverageNumber] = useState(1)
  const [isChecked, setIsChecked] = useState(true)
  const [showSlider, setShowSlider] = useState(true)
  const [priceSlippage, setPriceSlippage] = useState("1")

  const [ethPrice, setEthPrice] = useState(0)
  const [tokenPrice, setTokenPrice] = useState(0)
  const [contractPrice, setContractPrice] = useState(0)

  const [tokenAfterSlippagePrice, setTokenAfterSlippagePrice] = useState(0)
  const [liqPrice, setLiqPrice] = useState(0)

  const handleCheckboxChange = (checked: any) => {
    setIsChecked(checked)
    // Now, use the isChecked state to control the visibility of the Slider
    setShowSlider(checked) // Assuming setShowSlider is defined elsewhere
  }
  const handleSliderValueChange = (value: any) => {
    setLeverageNumber(value)
  }

  const premiumRateX96 = 0.000219

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

  const tradingFee = 0.3

  return (
    <div>
      <InputBox
        title="Pay"
        value={usdMargin}
        suffix="USDX"
        balanceNode={<></>}
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
      <br></br>
      <div>
        <div className="flex flex-row items-center justify-between mb-5">
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
      <div className="py-2">
        <ListItem keyText="Entry Price" value={Number(tokenPrice)} />
        <div className="flex justify-between">
          <CustomTooltip
            triggerContent={<div className="text-sm">Price Impact</div>}
          >
            <p>
              The price impact is the deviation between the estimated
              transaction price of the order and the current index price. When
              it is positive number, it means that the estimated transaction
              price is more advantageous, and negative number is vice versa.
            </p>
          </CustomTooltip>
          <div className="font-bold">{premiumRateX96}%</div>
        </div>
        <div className="flex">
          <ListItem
            keyText="Acceptable Price"
            value={tokenAfterSlippagePrice}
            percentage={`${Number(priceSlippage) / 100}%`}
            className="w-full"
          />
          <Dialog>
            <DialogTrigger asChild>
              <button className="ml-1">
                <Edit3
                  className="text-opacity-70 hover:text-opacity-100"
                  size={13}
                />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-0xdialog w-[370px]">
              <DialogHeader>
                <DialogTitle className="mb-2 text-center">
                  Slippage Settings
                </DialogTitle>
                <DialogDescription>
                  <div className="flex justify-between mb-2">
                    <div>Max slippage</div>
                    <label>0.30%</label>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="w-[60%]">auto/custom</div>
                    <div className="w-[40%]">
                      <TpsLInput
                        value={priceSlippage}
                        // className="col-span-3"
                        suffix="%"
                        placeholder="TP trigger price"
                        onChange={(e) => {
                          setPriceSlippage(e.target.value)
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-5">
                    If the price change exceeds this percentage, your
                    transaction will revert.
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-3">
                <Button className="w-full text-sm bg-boxBackground hover:bg-0xboxBackground-foreground">
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <ListItem keyText="Liq. Price" value={liqPrice} />
        <ListItem
          keyText="Est. Margin"
          value={`${(Number(usdMargin) - tradingFee).toFixed(2)}`}
        />
        <div className="flex items-center justify-between">
          <div className="text-sm">Fees</div>
          {tradingFee > 0 ? (
            <CustomTooltip
              triggerContent={
                <div className="font-bold">{`$${tradingFee} `}</div>
              }
            >
              <div className="flex items-center justify-between">
                <div className="text-xs text-white">Trading Fee</div>
                <div className="text-xs text-white">-0.82 USDT</div>
              </div>
              <div className="text-xs text-0xgrey">
                (0.050% of the position value)
              </div>
              <div className="flex justify-between">
                <div className="text-xs text-white">Execution Fee Fee</div>
                <div className="text-xs text-white">
                  -0.82 USDT{" "}
                  <span className="text-sm text-0xgrey">(-$0.46)</span>
                </div>
              </div>
            </CustomTooltip>
          ) : (
            <div className="text-xs text-white">-</div>
          )}
        </div>
        <ListItem keyText="Trading Fee" value={`$${tradingFee}`} />
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
