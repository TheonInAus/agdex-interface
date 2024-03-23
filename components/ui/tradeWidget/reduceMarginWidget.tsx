"use client"

import { useState } from "react"
import { Loader } from "lucide-react"

import { useCreateDecreasePosition } from "@/hooks/actionTradePosition"
import { ethMarketAddress } from "@/hooks/zAddressHelper"
import {
  SIDE_LONG,
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

type ReduceMarginProps = {
  positionInfo?: any
}
export default function ReduceMarginWidget({
  positionInfo,
}: ReduceMarginProps) {
  const [afterMargin, setAfterMargin] = useState("")
  const marginShow = giveMeFormattedToShow(
    wrapperFormatEther6e(positionInfo?.margin)
  )
  const handleMaxClick = () => {
    setAfterMargin(marginShow)
  }

  const { decPositionData, decPositionLoading, decPositionWrite } =
    useCreateDecreasePosition(
      ethMarketAddress,
      positionInfo?.tokenSide === "Long" ? 1 : 2,
      afterMargin,
      "0",
      "0",
      ""
    )

  const handleIncPostionTemp = () => {
    decPositionWrite()
  }

  const newMargin =
    Number(wrapperFormatEther6e(positionInfo?.margin)) - Number(afterMargin)

  const longLiqPrice = giveMeFormattedToShow(
    Number(x96Price2Readable(positionInfo?.entryPriceX96)) -
      newMargin / Number(wrapperFormatEther18e(positionInfo?.size))
  )
  const shortLiqPrice = giveMeFormattedToShow(
    Number(x96Price2Readable(positionInfo?.entryPriceX96)) +
      newMargin / Number(wrapperFormatEther18e(positionInfo?.size))
  )

  return (
    <>
      <InputBox
        title="Amount"
        value={afterMargin}
        suffix={"USDX"}
        maxNode={true}
        onMaxClick={handleMaxClick}
        balanceNode={`${marginShow} USDX`}
        onValueChange={(e) => {
          setAfterMargin(e.target.value)
        }}
      />
      <div className="flex flex-row gap-2 mt-5 mb-3">
        <div className="text-base text-white">
          {positionInfo?.tokenName}/USDX
        </div>
        <div
          className={`text-sm ${
            positionInfo?.tokenSide === "Long" ? "text-0xgreen" : "text-0xred"
          }`}
        >
          {positionInfo?.tokenSide}{" "}
          {e6DivideE18(positionInfo?.margin, positionInfo?.size, 2000n)}x
        </div>
      </div>
      <ListItem
        keyText={"Margin"}
        value={giveMeFormattedToShow(newMargin) + " USDX"}
      />
      <ListItem
        keyText={"Leverage"}
        value={giveMeFormattedToShow(
          (Number(x96Price2Readable(positionInfo?.entryPriceX96)) *
            Number(wrapperFormatEther18e(positionInfo?.size))) /
            newMargin
        )}
      />
      <ListItem
        keyText={"Size"}
        value={
          giveMeFormattedToShow(wrapperFormatEther18e(positionInfo?.size)) +
          " ETH"
        }
      />
      <ListItem
        keyText={"Index Price"}
        value={giveMeFormattedToShow(positionInfo?.tokenPrice)}
      />
      <ListItem
        keyText={"Liq. Price"}
        value={`${
          positionInfo?.tokenSide === "Long" ? longLiqPrice : shortLiqPrice
        }`}
      />
      <div className="mt-3 border-t border-0xline"></div>
      <div className="flex flex-row justify-between w-full mt-2 text-sm">
        <div>Execution Fee</div>
        <div>{wrapperFormatEther18e(minExecutionFee)} ($-)</div>
      </div>
      <Button
        className={`w-full font-bold text-center rounded-md item-center mt-4 h-9 text-black bg-agdexMain hover:bg-agdexMain-foreground`}
        disabled={afterMargin === ""}
        onClick={() => {
          handleIncPostionTemp()
        }}
      >
        {decPositionLoading ? (
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
