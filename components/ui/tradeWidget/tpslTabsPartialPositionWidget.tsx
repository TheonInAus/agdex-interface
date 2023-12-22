"use client"

import { useEffect, useState } from "react"
import { AlertCircle } from "lucide-react"
import { parseEther } from "viem"

import {
  minExecutionFee,
  minOrderBookExecutionFee,
  wrapperFormatEther18e,
} from "@/hooks/zContractHelper"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { PercentageSlider } from "@/components/ui/percentageSlider"
import { TpsLInput } from "@/components/ui/tpslIput"

type TpslTabsPartialPositionProps = {
  positionInfo?: any
}
export default function TpslTabsPartialPositionWidget({
  positionInfo,
}: TpslTabsPartialPositionProps) {
  const [takeProfitAmount, setTakeProfitAmount] = useState("")
  const [takeProfitPnL, setTakeProfitPnL] = useState("")
  const [stopLossAmount, setStopLossAmount] = useState("")
  const [stopLossPnL, setStopLossPnL] = useState("")
  const [takeProfitChecked, setTakeProfitChecked] = useState(true)
  const [stopLossChecked, setStopLossChecked] = useState(true)
  const [sizeDelta, setSizeDelta] = useState(0)
  const [sizeRate, setSizeRate] = useState(0)
  const [orderBookExecutionFee, setOrderBookExecutionFee] = useState(
    minOrderBookExecutionFee
  )
  const doubleExecutionFee = minOrderBookExecutionFee * 2n
  useEffect(() => {
    if (takeProfitChecked && stopLossChecked) {
      setOrderBookExecutionFee(doubleExecutionFee)
    } else {
      setOrderBookExecutionFee(minOrderBookExecutionFee)
    }
  }, [takeProfitChecked, stopLossChecked, doubleExecutionFee])
  const handleSliderValueChange = (value: any) => {
    const rate = value / 100
    setSizeRate(value)
    setSizeDelta(wrapperFormatEther18e(positionInfo?.size?.toString()) * rate)
  }

  //   useEffect(() => {}, [sizeRate, sizeDelta])

  const checkDisabled = () => {
    const takeProfitValid = takeProfitAmount !== "" && takeProfitPnL !== ""
    const stopLossValid = stopLossAmount !== "" && stopLossPnL !== ""
    if (takeProfitChecked && !stopLossChecked) {
      return takeProfitValid
    } else if (stopLossChecked && !takeProfitChecked) {
      return stopLossValid
    } else if (!takeProfitChecked && !stopLossChecked) {
      return false
    } else {
      return takeProfitValid && stopLossValid
    }
  }
  return (
    <>
      <div className="flex flex-row gap-[2%] mb-5">
        <div className="flex flex-col gap-3 w-[60%]">
          <div className="flex flex-row gap-2">
            <Checkbox
              className="w-4 h-4"
              checked={takeProfitChecked}
              onCheckedChange={(checked) => {
                setTakeProfitChecked(checked as boolean)
              }}
            />
            <Label htmlFor="name" className="text-left">
              Take Profit ≥
            </Label>
          </div>
          {takeProfitChecked ? (
            <TpsLInput
              value={takeProfitAmount}
              className="col-span-3"
              suffix="USDX"
              placeholder="TP trigger price"
              onChange={(e) => {
                setTakeProfitAmount(e.target.value)
              }}
            />
          ) : (
            <div className="h-30"></div>
          )}
        </div>
        {takeProfitChecked && (
          <div className="flex flex-col gap-[14px] w-[38%]">
            <Label htmlFor="name" className="mr-1 text-right text-0xgrey">
              Exp. PnL -(-)
            </Label>
            <TpsLInput
              id="name"
              value={takeProfitPnL}
              className="col-span-3"
              suffix="%"
              placeholder="Increase"
              onChange={(e) => {
                setTakeProfitPnL(e.target.value)
              }}
            />
          </div>
        )}
      </div>
      <div className="flex flex-row gap-[2%]">
        <div className="flex flex-col gap-3 w-[60%]">
          <div className="flex flex-row gap-2">
            <Checkbox
              className="w-4 h-4"
              checked={stopLossChecked}
              onCheckedChange={(checked) => {
                setStopLossChecked(checked as boolean)
              }}
            />
            <Label htmlFor="name" className="text-left">
              Stop Loss ≤
            </Label>
          </div>
          {stopLossChecked ? (
            <TpsLInput
              value={stopLossAmount}
              placeholder="SL trigger price"
              className="col-span-3"
              suffix="USDX"
              onChange={(e) => {
                setStopLossAmount(e.target.value)
              }}
            />
          ) : (
            <div className="h-30"></div>
          )}
        </div>
        {stopLossChecked && (
          <div className="flex flex-col gap-[14px] w-[38%]">
            <Label htmlFor="name" className="mr-1 text-right text-0xgrey">
              Exp. PnL -(-)
            </Label>
            <TpsLInput
              value={stopLossPnL}
              className="col-span-3"
              placeholder="Decrease"
              suffix="%"
              onChange={(e) => {
                setStopLossPnL(e.target.value)
              }}
            />
          </div>
        )}
      </div>
      <div className="w-full mt-4">
        <TpsLInput
          id="name"
          value={sizeDelta}
          className="col-span-3"
          suffix={positionInfo?.tokenName}
          onChange={(e) => {
            setSizeDelta(Number(e.target.value))
          }}
        />
        <PercentageSlider
          max={100}
          min={0}
          step={1}
          style={{ marginBottom: 40, marginTop: 20 }}
          value={[sizeRate]}
          onValueChange={handleSliderValueChange}
        />
      </div>
      <div className="w-full mt-2 text-sm">
        <div className="flex flex-row justify-between">
          <div className="text-0xgrey">Size</div>
          <div>
            {wrapperFormatEther18e(positionInfo?.size)}{" "}
            {positionInfo?.tokenName}
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div>Execution Fee</div>
          <div>{wrapperFormatEther18e(orderBookExecutionFee)} ETH</div>
        </div>
        <div className="mt-4 text-0xgrey">
          When the market price reaches the trigger price, the system will close
          the position at the <span className="text-white">market price</span>.
        </div>
      </div>

      <Alert className="bg-0xdialog-foreground border-gray-100 mt-4 h-[70px]">
        <AlertCircle
          className="mt-2 text-0xredLighter hover:text-opacity-100"
          size={22}
        />
        <AlertDescription className="ml-1 text-0xyellow-lighter">
          Margin settlement has a 10% slippage to prevent order failure due to
          insufficient margin.
        </AlertDescription>
      </Alert>

      <Button
        className="w-full mt-4 text-sm text-black bg-0xyellow-lighter hover:bg-0xgrey"
        disabled={!checkDisabled()}
      >
        Confirm
      </Button>
    </>
  )
}
