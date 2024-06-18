"use client"

import { useState } from "react"
import { Loader } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ListItem } from "@/components/ui/listItem"

import { TokenInputBox } from "../tokenInputBox"

type ReduceMarginProps = {
  positionInfo?: any
}
export default function ReduceMarginWidget({
  positionInfo,
}: ReduceMarginProps) {
  const [afterMargin, setAfterMargin] = useState("")

  const handleMaxClick = () => {}
  const handleIncPostionTemp = () => {}

  return (
    <>
      <TokenInputBox
        title="Amount"
        value={afterMargin}
        maxNode={true}
        onMaxClick={handleMaxClick}
        balanceNode={`${0} USDX`}
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
          {(positionInfo?.margin, positionInfo?.size, 2000n)}x
        </div>
      </div>
      <ListItem keyText={"Margin"} value={0 + " USDX"} />
      <ListItem keyText={"Leverage"} value={"000"} />
      <ListItem keyText={"Size"} value={" ETH"} />
      <ListItem keyText={"Index Price"} value={"giveMeFormattedToShow()"} />
      <ListItem keyText={"Liq. Price"} value={`${0}`} />
      <div className="mt-3 border-t border-0xline"></div>
      <div className="flex flex-row justify-between w-full mt-2 text-sm">
        <div>Execution Fee</div>
        <div>{"minExecutionFee"} ($-)</div>
      </div>
      <Button
        className={`w-full font-bold text-center rounded-md item-center mt-4 h-9 text-black bg-agdexMain hover:bg-agdexMain-foreground`}
        disabled={afterMargin === ""}
        onClick={() => {
          handleIncPostionTemp()
        }}
      >
        <>
          <Loader className="mr-2 size-4 animate-spin" />
          Please wait
        </>
      </Button>
    </>
  )
}
