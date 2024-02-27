"use client"

import { useState } from "react"
import { Loader } from "lucide-react"

import { useCreateIncreasePostion } from "@/hooks/actionTradePosition"
import { useUserUsdxBalance } from "@/hooks/cUserState"
import { ethMarketAddress } from "@/hooks/zAddressHelper"
import {
  SIDE_LONG,
  e6DivideE18,
  giveMeFormattedToShow,
  minExecutionFee,
  wrapperFormatEther18e,
} from "@/hooks/zContractHelper"
import { Button } from "@/components/ui/button"
import { InputBox } from "@/components/ui/inputBox"
import { ListItem } from "@/components/ui/listItem"

type AddMarginProps = {
  positionInfo?: any
}

export default function AddMarginWidget({ positionInfo }: AddMarginProps) {
  const [afterMargin, setAfterMargin] = useState("")
  const {
    data: balanceData,
    isError: isBalanceError,
    isLoading: isBalanceLoading,
  } = useUserUsdxBalance()

  const { incPositionData, incPositionLoading, incPositionWrite } =
    useCreateIncreasePostion(
      ethMarketAddress,
      positionInfo?.tokenSide === "Long" ? 1 : 2,
      afterMargin,
      "0",
      "0"
    )

  const handleIncPostionTemp = () => {
    incPositionWrite()
  }

  const handleMaxClick = () => {
    setAfterMargin(balanceData?.formatted as string)
  }
  return (
    <>
      <InputBox
        title="Amount"
        value={afterMargin}
        suffix={"USDX"}
        maxNode={true}
        onMaxClick={handleMaxClick}
        onValueChange={(e) => {
          setAfterMargin(e.target.value)
        }}
        balanceNode={
          isBalanceLoading ? (
            <div>Fetching balance…</div>
          ) : isBalanceError ? (
            <div>Error fetching balance</div>
          ) : (
            <div>
              Balance:{" "}
              {giveMeFormattedToShow(Number(balanceData?.formatted) || 0)}{" "}
              {balanceData?.symbol}
            </div>
          )
        }
      />
      <div className="flex flex-row gap-2 mt-5 mb-3">
        <div className="text-base text-white">
          {positionInfo?.tokenName}/USDX
        </div>
        <div
          className={`text-sm ${
            positionInfo?.tokenSide === "Long"
              ? "text-0xgreen"
              : "text-0xredLighter"
          }`}
        >
          {positionInfo?.tokenSide}{" "}
          {e6DivideE18(positionInfo?.margin, positionInfo?.size, 2000n)}x
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
        className={`w-full font-bold text-center rounded-md item-center mt-4 h-9 text-black bg-bronze`}
        disabled={afterMargin === ""}
        onClick={() => {
          handleIncPostionTemp()
        }}
      >
        {incPositionLoading ? (
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
