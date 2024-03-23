"use client"

import { useEffect, useState } from "react"
import { Loader } from "lucide-react"

import {
  useCreateDecreaseOrder,
  useCreateTakeProfitAndStopLossOrders,
} from "@/hooks/actionTradePosition"
import { ethMarketAddress } from "@/hooks/zAddressHelper"
import {
  minOrderBookExecutionFee,
  to0xxPriceX96,
  wrapperFormatEther18e,
} from "@/hooks/zContractHelper"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { TpsLInput } from "@/components/ui/tpslIput"

type TpslTabsEntirePositionProps = {
  positionInfo?: any
}

export default function TpslTabsEntirePositionWidget({
  positionInfo,
}: TpslTabsEntirePositionProps) {
  const [takeProfitAmount, setTakeProfitAmount] = useState("")
  const [afterTPAmount, setAfterTPAmount] = useState(0)
  const [takeProfitPnL, setTakeProfitPnL] = useState("")
  const [stopLossAmount, setStopLossAmount] = useState("")
  const [afterSLAmount, setAfterSLAmount] = useState(0)
  const [stopLossPnL, setStopLossPnL] = useState("")
  const [takeProfitChecked, setTakeProfitChecked] = useState(true)
  const [stopLossChecked, setStopLossChecked] = useState(true)
  const [orderBookExecutionFee, setOrderBookExecutionFee] = useState(
    minOrderBookExecutionFee
  )
  const doubleExecutionFee = minOrderBookExecutionFee * 2n

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

  useEffect(() => {
    if (takeProfitChecked && stopLossChecked) {
      setOrderBookExecutionFee(doubleExecutionFee)
    } else {
      setOrderBookExecutionFee(minOrderBookExecutionFee)
    }
  }, [takeProfitChecked, stopLossChecked, doubleExecutionFee])

  const checkTriggerAbove = () => {
    if (takeProfitChecked && !stopLossChecked) {
      return true
    }
    if (!takeProfitChecked && stopLossChecked) {
      return false
    }
    return true
  }

  const handleTPAfterAmount = () => {
    if (!takeProfitAmount) return "0"
    return (Number(takeProfitAmount) * 1.1).toString()
  }

  const handleSLAfterAmount = () => {
    if (!stopLossAmount) return "0"
    return (Number(stopLossAmount) * 1.1).toString()
  }
  const {
    createDecOrderData,
    isCreateDecOrderLoading,
    isCreateDecOrderError,
    createDecOrderWrite,
  } = useCreateDecreaseOrder(
    ethMarketAddress,
    positionInfo?.tokenSide === "Long" ? 1 : 2,
    "0",
    "0",
    checkTriggerAbove()
      ? to0xxPriceX96(takeProfitAmount)
      : to0xxPriceX96(stopLossAmount),
    checkTriggerAbove(),
    checkTriggerAbove()
      ? to0xxPriceX96(handleTPAfterAmount())
      : to0xxPriceX96(handleSLAfterAmount()),
    ""
  )

  const {
    createTPSLData,
    isCreateTPSLLoading,
    isCreateTPSLError,
    createTPSLWrite,
  } = useCreateTakeProfitAndStopLossOrders(
    ethMarketAddress,
    positionInfo?.tokenSide === "Long" ? 1 : 2,
    [0, 0],
    [0, 0],
    [to0xxPriceX96(takeProfitAmount), to0xxPriceX96(stopLossAmount)],
    [
      to0xxPriceX96(handleTPAfterAmount()),
      to0xxPriceX96(handleSLAfterAmount()),
    ],
    ""
  )

  const handleConfirmClick = () => {
    if (takeProfitChecked && stopLossChecked) {
      createTPSLWrite()
    } else {
      createDecOrderWrite()
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
      <Button
        className="w-full mt-4 text-sm text-black bg-agdexMain hover:bg-agdexMain-foreground"
        disabled={!checkDisabled()}
        onClick={() => {
          handleConfirmClick()
        }}
      >
        {isCreateDecOrderLoading || isCreateTPSLLoading ? (
          <>
            <Loader className="w-4 h-4 mr-2 animate-spin" />
            Please wait
          </>
        ) : (
          "Confirm"
        )}
      </Button>
    </>
  )
}
