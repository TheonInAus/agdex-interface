import { useState } from "react"
import { Loader } from "lucide-react"

import { useCreateDecreasePosition } from "@/hooks/actionTradePosition"
import { ethPoolAddress } from "@/hooks/zAddressHelper"
import {
  SIDE_LONG,
  e6DivideE18,
  giveMeFormattedToShow,
  minExecutionFee,
  wrapperFormatEther6e,
  wrapperFormatEther18e,
} from "@/hooks/zContractHelper"
import { Button } from "@/components/ui/button"
import { InputBox } from "@/components/ui/inputBox"
import { ListItem } from "@/components/ui/listItem"

type ReduceMarginProps = {
  positionInfo: any
}
export const ReduceMarginWidget = ({ positionInfo }: ReduceMarginProps) => {
  const [afterMargin, setAfterMargin] = useState("")
  const marginShow = giveMeFormattedToShow(
    wrapperFormatEther6e(positionInfo.margin)
  )
  const handleMaxClick = () => {
    setAfterMargin(marginShow)
  }

  const { decPositionData, decPositionLoading, decPositionWrite } =
    useCreateDecreasePosition(
      ethPoolAddress,
      positionInfo.tokenSide === "Long" ? 1 : 2,
      afterMargin,
      "0",
      "0",
      ""
    )

  const handleIncPostionTemp = () => {
    decPositionWrite()
  }
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
          {positionInfo.tokenName}/USDX
        </div>
        <div
          className={`text-sm ${
            positionInfo.tokenSide === "Long"
              ? "text-0xgreen"
              : "text-0xredLighter"
          }`}
        >
          {positionInfo.tokenSide}{" "}
          {e6DivideE18(positionInfo.margin, positionInfo.size, 2000n)}x
        </div>
      </div>
      <ListItem keyText={"Margin"} value={""} />
      <ListItem keyText={"Leverage"} value={""} />
      <ListItem keyText={"Size"} value={""} />
      <ListItem keyText={"Index Price"} value={""} />
      <ListItem keyText={"Liq. Price"} value={""} />
      <div className="mt-3 border-t border-0xline"></div>
      <div className="flex flex-row justify-between w-full mt-2 text-sm">
        <div>Execution Fee</div>
        <div>{wrapperFormatEther18e(minExecutionFee)} ($-)</div>
      </div>
      <Button
        className={`w-full font-bold text-center rounded-md item-center mt-4 h-9 text-white bg-0xyellow-lighter`}
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
