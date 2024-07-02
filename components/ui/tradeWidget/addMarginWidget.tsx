"use client"

import { useState } from "react"
import { Loader } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ListItem } from "@/components/ui/listItem"

import { TokenInputBox } from "../tokenInputBox"

type AddMarginProps = {
  positionInfo?: any
}

export default function AddMarginWidget({ positionInfo }: AddMarginProps) {
  const [afterMargin, setAfterMargin] = useState("")

  const handleIncPostionTemp = () => {}

  const handleMaxClick = () => {}

  return (
    <>
      <TokenInputBox
        title="Amount"
        value={afterMargin}
        maxNode={true}
        onMaxClick={handleMaxClick}
        onValueChange={(e) => {
          setAfterMargin(e.target.value)
        }}
        balanceNode={<div>Balance: 0{"balanceData?.symbol"}</div>}
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
      <ListItem keyText={"Leverage"} value={"TODO"} />
      <ListItem keyText={"Size"} value={" ETH"} />
      <ListItem keyText={"Index Price"} value={"positionInfo?.tokenPrice"} />
      <ListItem keyText={"Liq. Price"} value={`${"longLiqPrice"}`} />
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
        <Loader className="mr-2 size-4 animate-spin" />
        Please wait
      </Button>
    </>
  )
}
