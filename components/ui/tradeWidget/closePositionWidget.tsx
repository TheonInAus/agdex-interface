"use client"

import { useState } from "react"
import {
  formatAptosDecimal,
  generateFunctionPath,
  getSideAddress,
  parseAptosDecimal,
} from "@/chainio/fetchData"
import useTokenStore from "@/chainio/useTokenStore"
import { aptos, moduleAddress } from "@/pages/_app"
import { APTOS_COIN } from "@aptos-labs/ts-sdk"
import { useWallet } from "@aptos-labs/wallet-adapter-react"

import { Button } from "@/components/ui/button"
import { ListItem } from "@/components/ui/listItem"

import { TokenInputBox } from "../tokenInputBox"

type PositionInfo = {
  leverageNumber: any
  side: string
  collateral: number
  positionAmount: number
  entryPrice: number
  symbolPrice: number
  vaultPrice: number
  liqPrice: number
  PnL: number
  positionNum: number
}

export default function ClosePositionWidget({
  leverageNumber,
  side,
  collateral,
  positionAmount,
  entryPrice,
  symbolPrice,
  vaultPrice,
  liqPrice,
  PnL,
  positionNum,
}: PositionInfo) {
  const { account, signAndSubmitTransaction } = useWallet()

  const { vault, symbol } = useTokenStore()

  const handleClosePosition = async () => {
    const response = await signAndSubmitTransaction({
      sender: account?.address,
      data: {
        function: generateFunctionPath(
          moduleAddress,
          "market",
          "decrease_position"
        ),
        typeArguments: [
          vault.tokenAddress,
          symbol.tokenAddress,
          getSideAddress(side),
          APTOS_COIN,
        ],
        functionArguments: [
          1,
          10,
          true,
          ,
          formatAptosDecimal(Number(vaultPrice * (1 - 0.01)), 18),
          side === "LONG"
            ? formatAptosDecimal(Number(symbolPrice * (1 + 0.01)), 18)
            : formatAptosDecimal(Number(symbolPrice * (1 - 0.01)), 18),
          positionNum,
          [],
        ],
      },
    })
    try {
      await aptos.waitForTransaction({ transactionHash: response.hash })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <TokenInputBox
        title="Amount"
        value={parseAptosDecimal(positionAmount, symbol.decimal).toFixed(6)}
      />
      {/* <div className="mt-3">
        <div className="flex flex-row justify-between">
          <div className="text-sm text-white">Pure Reduction</div>
          <Checkbox className="text-white size-4 focus:text-white" />
        </div>
        <ListItem keyText={"Max Slippage"} value={""} />
      </div>
      <div className="my-3 border-t border-0xline"></div> */}
      <div className="flex flex-row gap-2 my-3">
        <div className="text-base text-white">{symbol.name}</div>
        <div
          className={`${
            side === "LONG" ? "text-0xgreen" : "text-0xred"
          } text-sm mt-[2px]`}
        >
          {`${side} ${leverageNumber}`}
        </div>
      </div>
      <ListItem keyText={"Leverage"} value={""} />
      <ListItem keyText={"Collateral"} value={collateral} />
      <ListItem keyText={"Entry Price"} value={entryPrice} />
      <ListItem keyText={"Mark Price"} value={symbolPrice} />
      <ListItem keyText={"Liq. Price"} value={liqPrice} />
      <div className="my-3 border-t border-0xline"></div>
      <ListItem
        keyText={"PnL"}
        value={PnL}
        className={PnL >= 0 ? "text-0xgreen" : "text-0xred"}
      />
      {/* <div className="flex justify-between">
        <div className="text-xs text-white">Fees</div>
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
      </div> */}
      {/* <div className="my-3 border-t border-0xline"></div> */}
      {/* <ListItem keyText={"Receive"} value={""} /> */}
      <Button
        disabled={false}
        className="w-full mt-3 text-sm text-black bg-agdexMain hover:bg-agdexMain-foreground"
        onClick={() => {
          handleClosePosition()
        }}
      >
        {" "}
        Close
      </Button>
    </>
  )
}
function signAndSubmitTransaction(arg0: {
  sender: any
  data: { function: any; typeArguments: string[]; functionArguments: any[] }
}) {
  throw new Error("Function not implemented.")
}
