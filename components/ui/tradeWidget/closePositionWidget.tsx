"use client"

import { useState } from "react"
import { Loader, Loader2 } from "lucide-react"

import {
  useCreateDecreasePosition,
  useCreateIncreasePostion,
} from "@/hooks/actionTradePosition"
import { useUserUsdxBalance } from "@/hooks/cUserState"
import { ethMarketAddress } from "@/hooks/zAddressHelper"
import {
  SIDE_LONG,
  Side,
  e6DivideE18,
  giveMeFormattedToShow,
  minExecutionFee,
  wrapperFormatEther6e,
  wrapperFormatEther18e,
  x96Price2Readable,
} from "@/hooks/zContractHelper"
import { Button } from "@/components/ui/button"
import { InputBox } from "@/components/ui/inputBox"
import { ListItem } from "@/components/ui/listItem"

import { Checkbox } from "../checkbox"
import { CustomTooltip } from "../customToolTip"

type ClosePositionProps = {
  positionInfo?: any
}

type PositionInfo = {
  poolAddress: any
  side: Side
  marginDelta: any
  sizeDelta: any
  acceptableTradePriceX96: any
}

export default function ClosePositionWidget({
  positionInfo,
}: ClosePositionProps) {
  const [currentPosition, setCurrentPosition] = useState<PositionInfo>()

  const { decPositionData, decPositionLoading, decPositionWrite } =
    useCreateDecreasePosition(
      currentPosition?.poolAddress,
      currentPosition?.side || 1,
      currentPosition?.marginDelta,
      currentPosition?.sizeDelta.toString(),
      currentPosition?.acceptableTradePriceX96,
      ""
    )

  const handleClosePosition = (position: any) => {
    decPositionWrite()
  }

  const feesValue = 0

  //   const longLiqPrice = giveMeFormattedToShow(
  //     Number(x96Price2Readable(positionInfo?.entryPriceX96)) -
  //       newMargin / Number(wrapperFormatEther18e(positionInfo?.size))
  //   )
  //   const shortLiqPrice = giveMeFormattedToShow(
  //     Number(x96Price2Readable(positionInfo?.entryPriceX96)) +
  //       newMargin / Number(wrapperFormatEther18e(positionInfo?.size))
  //   )

  return (
    <>
      <InputBox title="Amount" value={""} suffix={""} />
      <div className="mt-3">
        <div className="flex flex-row justify-between">
          <div className="text-sm">Pure Reduction</div>
          <Checkbox className="w-4 h-4" />
        </div>
        <ListItem keyText={"Max Slippage"} value={""} />
      </div>
      <div className="my-3 border-t border-0xline"></div>
      <div className="flex flex-row gap-2 mb-3">
        <div className="text-base text-white">Token/Asset</div>
        <div className="text-0xgreen text-sm mt-[2px]">Long 35.98x</div>
      </div>
      <ListItem keyText={"Leverage"} value={""} />
      <ListItem
        keyText={"Margin"}
        value={wrapperFormatEther6e(positionInfo?.margin)}
      />
      <ListItem
        keyText={"Entry Price"}
        value={x96Price2Readable(positionInfo?.entryPriceX96)}
      />
      <ListItem keyText={"Liq. Price"} value={""} />
      <div className="my-3 border-t border-0xline"></div>
      <ListItem keyText={"Price Impact"} value={""} />
      <ListItem keyText={"Est. Close Price"} value={""} />
      <ListItem keyText={"PnL"} value={""} />
      <div className="flex justify-between">
        <div className="text-xs text-0xgrey">Fees</div>
        {feesValue > 0 ? (
          <CustomTooltip
            triggerContent={
              <div className="text-xs text-white">{feesValue}</div>
            }
          >
            <div className="flex justify-between">
              <div className="text-xs text-white">Trading Fee</div>
              <div className="text-xs text-white">-0.82 USDT</div>
            </div>
            <div className="text-xs text-0xgrey">
              (0.050% of the position value)
            </div>
            <div className="flex justify-between">
              <div className="text-xs text-white">Execution Fee Fee</div>
              <div className="text-xs text-white">
                -0.82 USDT <span className="text-sm text-0xgrey">(-$0.46)</span>
              </div>
            </div>
          </CustomTooltip>
        ) : (
          <div className="text-xs text-white">-</div>
        )}
      </div>
      <div className="my-3 border-t border-0xline"></div>
      <ListItem keyText={"Receive"} value={""} />
      <Button
        disabled={decPositionLoading}
        className="w-full mt-3 text-sm text-black bg-bronze hover:bg-bronze-foreground"
        onClick={() => {
          handleClosePosition(positionInfo)
        }}
      >
        {" "}
        {decPositionLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Please wait
          </>
        ) : (
          "Close"
        )}
      </Button>
    </>
  )
}
