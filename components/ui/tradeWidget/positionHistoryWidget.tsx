import { useEffect, useState } from "react"

import { useUserPositionHistoryListMock } from "@/hooks/cUserState"
import useTokenConfigStore from "@/hooks/useTokenConfigStore"
import {
  SIDE_LONG,
  SIDE_SHORT,
  Side,
  e6DivideE18,
  giveMeFormattedToShow,
  to0xxPriceX96,
  wrapperFormatEther6e,
  wrapperFormatEther18e,
  x96Price2Readable,
} from "@/hooks/zContractHelper"
import { PositionItem } from "@/components/ui/positionItem"

type PositionInfo = {
  poolAddress: any
  side: Side
  marginDelta: any
  sizeDelta: any
  acceptableTradePriceX96: any
}

type PositionListWidgetType = {
  contractPriceAfter: any
}

export default function PositionHistoryWidget({
  contractPriceAfter, //contract price
}: PositionListWidgetType) {
  const currentTokenEntity = useTokenConfigStore(
    (state) => state.currentTokenEntity
  )
  console.log(
    "🚀 ~ PositionHistoryWidget currentTokenEntity:",
    currentTokenEntity
  )

  const { positionHistoryList, isLoading, isError } =
    useUserPositionHistoryListMock(currentTokenEntity.market)

  return (
    <div>
      <div className="mt-2 mb-4 border-t border-0xline "></div>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <div className="max-h-[400px] overflow-y-auto">
          {positionHistoryList ? (
            <>
              {positionHistoryList.map((position, index) => (
                <div key={index}>
                  <div className="flex flex-row gap-2">
                    <div>{`${currentTokenEntity.symbol}`}</div>
                    <div
                      className={`${
                        position.side === 1 ? "text-0xgreen" : "text-0xred"
                      }`}
                    >
                      {position.side === 1 ? "Long" : "Short"}
                    </div>
                  </div>
                  <div className="flex flex-row w-full mt-3 justify-evenly">
                    <div className="flex flex-row justify-start w-full">
                      <PositionItem
                        keyText="Size"
                        value={
                          giveMeFormattedToShow(
                            wrapperFormatEther18e(
                              position.sizeDelta as unknown as bigint
                            )
                          ) + ` ${currentTokenEntity.name}`
                        }
                      />
                    </div>
                    <div className="flex flex-row justify-start w-full">
                      <PositionItem
                        keyText="Margin"
                        value={
                          giveMeFormattedToShow(
                            wrapperFormatEther6e(
                              (position.marginDelta as unknown as bigint) || 0n
                            )
                          ) + " USDX"
                        }
                      />
                    </div>
                    <div className="flex flex-row justify-start w-full">
                      <PositionItem
                        keyText="Acceptable Price"
                        value={x96Price2Readable(
                          position.acceptableTradePriceX96 as unknown as bigint
                        )}
                      />
                    </div>

                    <div className="flex flex-row justify-start w-full">
                      <div>Status:</div>
                      <div
                        className={`${
                          position.status === "EXECUTED"
                            ? "text-0xgreen"
                            : "text-0xred"
                        } ml-3`}
                      >
                        {position.status}
                      </div>
                    </div>
                  </div>
                  <br></br>
                </div>
              ))}
            </>
          ) : (
            <>
              <div>No open positions</div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
