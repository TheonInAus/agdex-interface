import { useEffect, useState } from "react"
import { AlertCircle, Edit3, ExternalLink, Loader2 } from "lucide-react"

import { useCreateDecreasePosition } from "@/hooks/actionTradePosition"
import { useUserOrderList } from "@/hooks/cUserState"
import { ethMarketAddress } from "@/hooks/zAddressHelper"
import {
  SIDE_LONG,
  SIDE_SHORT,
  Side,
  convertOrderBookTypeData,
  convertPoolAddressToShownData,
  convertPoolAddressToTokenName,
  e6DivideE18,
  formatTimestampX1000,
  giveMeFormattedToShow,
  to0xxPriceX96,
  wrapperFormatEther6e,
  wrapperFormatEther18e,
  x96Price2Readable,
} from "@/hooks/zContractHelper"
import { Button } from "@/components/ui/button"
import { PositionItem } from "@/components/ui/positionItem"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type PositionInfo = {
  poolAddress: any
  side: Side
  marginDelta: any
  sizeDelta: any
  acceptableTradePriceX96: any
}

export default function OrderListWidget() {
  const [currentPosition, setCurrentPosition] = useState<PositionInfo>()

  const handleCancelOrder = (position: any) => {}
  const {
    isLoading: loading,
    isError: error,
    orderBookList,
  } = useUserOrderList()

  return (
    <div>
      <div className="mt-2 mb-4 border-t border-0xline"></div>
      {orderBookList && orderBookList.length > 0 ? (
        <>
          <div className="flex flex-row items-center mb-3 text-0xgrey">
            <div className="w-[16%] text-sm text-start">Time</div>
            <div className="w-[11%] text-sm text-start">Market</div>
            <div className="w-[13%] text-sm text-start">Type</div>
            <div className="w-[9%] text-sm text-start">Side</div>
            <div className="w-[12%] text-sm text-start">Size</div>
            <div className="w-[16%] text-sm text-start">Trigger Price</div>
            <div className="w-[16%] text-sm text-start">Market Price</div>
            <div className="w-[15%] text-sm text-start">Acceptable Price</div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-[15%] text-sm text-end cursor-pointer">
                    Cancel All
                    <AlertCircle
                      className="inline ml-1 mb-[2px] text-white text-opacity-70 hover:text-opacity-100"
                      size={12}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" align="end">
                  <p className="text-xs">
                    This will cancel all pending operations.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {orderBookList.map((orderItem, index) => (
            <div key={index} className="flex">
              <div className="w-[16%] text-sm text-start">
                {formatTimestampX1000(orderItem.blockTimestamp)}
              </div>
              <div className="w-[11%] text-sm text-start">
                {convertPoolAddressToShownData(orderItem.pool)}
              </div>
              <div className="w-[13%] text-sm text-start">
                {convertOrderBookTypeData(
                  orderItem.__typename,
                  orderItem.triggerAbove
                )}
              </div>
              <div
                className={`w-[9%] text-sm text-start ${
                  orderItem.side === 1 ? "text-0xgreen" : "text-0xredLighter"
                }`}
              >
                {" "}
                {orderItem.side === 1 ? "Long" : "Short"}
              </div>
              <div className="w-[12%] text-sm text-start">
                {giveMeFormattedToShow(
                  wrapperFormatEther18e(BigInt(orderItem.sizeDelta))
                )}{" "}
                {convertPoolAddressToTokenName(orderItem.pool)}
              </div>
              <div className="w-[16%] text-sm text-start flex">
                <div className="mr-1">≥</div>
                {x96Price2Readable(BigInt(orderItem.triggerMarketPriceX96))}
                <button className="ml-1">
                  <Edit3
                    className="text-white text-opacity-70 hover:text-opacity-100"
                    size={13}
                  />
                </button>
              </div>
              <div className="w-[16%] text-sm text-start">
                {x96Price2Readable(BigInt(orderItem.triggerMarketPriceX96))}
              </div>
              <div className="w-[15%] text-sm text-start">
                {x96Price2Readable(BigInt(orderItem.acceptableTradePriceX96))}
              </div>
              <div className="w-[15%] text-sm text-end">
                {" "}
                <Button
                  disabled={false}
                  className="h-5 text-sm text-white bg-transparent border border-white hover:bg-0xbox"
                  onClick={() => {
                    handleCancelOrder(orderItem)
                  }}
                >
                  {false ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Cancel"
                  )}
                </Button>
              </div>
              <div className="mt-2 mb-4 border-t border-0xline"></div>
            </div>
          ))}
        </>
      ) : (
        <>
          <div>No open orders</div>
        </>
      )}
    </div>
  )
}
