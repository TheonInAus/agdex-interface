import { useEffect, useState } from "react"
import { Edit3, ExternalLink, Loader2 } from "lucide-react"

import { useCreateDecreasePosition } from "@/hooks/actionTradePosition"
import { useUserPositionList } from "@/hooks/cUserState"
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
import { Button } from "@/components/ui/button"
import { PositionItem } from "@/components/ui/positionItem"

type PositionInfo = {
  poolAddress: any
  side: Side
  marginDelta: any
  sizeDelta: any
  acceptableTradePriceX96: any
}

export const PositionListWidget = () => {
  const { data: positionDataList, isLoading, isError } = useUserPositionList()
  const [currentPosition, setCurrentPosition] = useState<PositionInfo>()

  const { decPositionData, decPositionLoading, decPositionWrite } =
    useCreateDecreasePosition(
      currentPosition?.poolAddress,
      currentPosition?.side || 1,
      currentPosition?.marginDelta,
      currentPosition?.sizeDelta,
      currentPosition?.acceptableTradePriceX96,
      ""
    )

  const handleClosePosition = (position: any) => {
    setCurrentPosition({
      poolAddress: position.tokenPool,
      side: position.tokenSide === "Long" ? SIDE_LONG : SIDE_SHORT,
      marginDelta: 0,
      sizeDelta: position.size,
      acceptableTradePriceX96:
        position.tokenSide === "Long"
          ? to0xxPriceX96("1999")
          : to0xxPriceX96("2002"),
    })
    decPositionWrite()
  }

  //   useEffect(() => {
  //     if (positionDataList.length > 0) {
  //       const position = positionDataList[0]
  //       setCurrentPosition({
  //         poolAddress: position.tokenPool,
  //         side: position.tokenSide === "Long" ? SIDE_LONG : SIDE_SHORT,
  //         marginDelta: 0,
  //         sizeDelta: position.size,
  //         acceptableTradePriceX96:
  //           position.tokenSide === "Long"
  //             ? to0xxPriceX96("1999")
  //             : to0xxPriceX96("2002"),
  //       })
  //     }
  //   }, [positionDataList])

  return (
    <div>
      {positionDataList.length > 0 ? (
        <>
          {positionDataList.map((position, index) => (
            <div key={index}>
              <div className="mt-2 mb-4 border-t border-0xline"></div>
              <div className="flex flex-row gap-2">
                <div className="text-white">{`${position.tokenName}/USDX`}</div>
                <div
                  className={`${
                    position.tokenSide === "Long"
                      ? "text-0xgreen"
                      : "text-0xredLighter"
                  }`}
                >
                  {position.tokenSide}{" "}
                  {e6DivideE18(position.margin, position.size, 2000n)} x
                </div>
                <div className="text-gray-600">
                  [ todo measure position risk]
                </div>
              </div>
              <div className="flex flex-row w-full mt-3 justify-evenly">
                <div className="flex flex-col w-full">
                  <PositionItem
                    keyText="Size"
                    value={
                      giveMeFormattedToShow(
                        wrapperFormatEther18e(position.size)
                      ) + " ETH"
                    }
                  />
                  <div className="flex flex-row mt-2">
                    <PositionItem
                      keyText="Margin"
                      value={
                        giveMeFormattedToShow(
                          wrapperFormatEther6e(position.margin)
                        ) + " USDX"
                      }
                      info="ll"
                    />
                    <button className="ml-1">
                      <Edit3
                        className="text-white text-opacity-70 hover:text-opacity-100"
                        size={13}
                      />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <PositionItem
                    keyText="Entry Price"
                    value={x96Price2Readable(position.entryPrice)}
                  />
                  <div className="mt-2">
                    <PositionItem keyText="Lig. Price" value={""} info="ll" />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex flex-row">
                    <PositionItem
                      plusCss={`${
                        Number(x96Price2Readable(position.unrealizedPnL)) >= 0
                          ? "text-0xgreen"
                          : "text-0xredLighter"
                      }`}
                      keyText="Unrealized Pnl."
                      value={x96Price2Readable(position.unrealizedPnL)}
                      info=""
                    />

                    <ExternalLink
                      className="ml-1 text-white text-opacity-70 hover:text-opacity-100"
                      size={13}
                    />
                  </div>
                  <div className="mt-2">
                    <PositionItem keyText="Net Funding" value={"-"} info={""} />
                  </div>
                </div>
                <div className="flex flex-row justify-end w-full gap-3">
                  <Button className="h-5 text-sm text-white bg-transparent hover:bg-0xbox border border-white">
                    TP/SL
                  </Button>
                  <Button
                    disabled={decPositionLoading}
                    className="h-5 text-sm text-white bg-transparent hover:bg-0xbox border border-white"
                    onClick={() => {
                      handleClosePosition(position)
                    }}
                  >
                    {decPositionLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      "Close"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <div>No Position</div>
        </>
      )}
    </div>
  )
}
