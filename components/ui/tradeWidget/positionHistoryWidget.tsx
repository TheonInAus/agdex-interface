import { useEffect, useState } from "react"

import { PositionItem } from "@/components/ui/positionItem"

type Side = {}
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
  const positionHistoryList: any[] = []
  return (
    <div>
      <div className="mt-2 mb-4 border-t border-0xline "></div>
      <div className="max-h-[400px] overflow-y-auto">
        {positionHistoryList ? (
          <>
            {positionHistoryList.map((position, index) => (
              <div key={index}>
                <div className="flex flex-row gap-2">
                  <div>{`ETH`}</div>
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
                    <PositionItem keyText="Size" value={0} />
                  </div>
                  <div className="flex flex-row justify-start w-full">
                    <PositionItem keyText="Margin" value={0 + " USDX"} />
                  </div>
                  <div className="flex flex-row justify-start w-full">
                    <PositionItem keyText="Acceptable Price" value={0} />
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
          <></>
        )}
      </div>
    </div>
  )
}
