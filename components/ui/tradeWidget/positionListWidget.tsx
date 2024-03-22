import { useState } from "react"
import { Edit3, ExternalLink, Loader2 } from "lucide-react"
import { formatEther } from "viem"

import { useCreateDecreasePosition } from "@/hooks/actionTradePosition"
import { useUserPositionListSingleMock } from "@/hooks/cUserState"
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
import { Button } from "@/components/ui/button"
import { CustomTooltip } from "@/components/ui/customToolTip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PositionItem } from "@/components/ui/positionItem"
import {
  StyledTabs,
  StyledTabsContent,
  StyledTabsList,
  StyledTabsTrigger,
} from "@/components/ui/styledTab"
import AddMarginWidget from "@/components/ui/tradeWidget/addMarginWidget"
import ReduceMarginWidget from "@/components/ui/tradeWidget/reduceMarginWidget"

import ClosePositionWidget from "./closePositionWidget"

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

export default function PositionListWidget({
  contractPriceAfter,
}: PositionListWidgetType) {
  const currentTokenEntity = useTokenConfigStore(
    (state) => state.currentTokenEntity
  )

  const {
    data: positionDataList,
    isLoading,
    isError,
  } = useUserPositionListSingleMock(currentTokenEntity)

  const [currentPosition, setCurrentPosition] = useState<PositionInfo>()

  const calUnPnL = (entryPrice: number, size: number, side: string) => {
    const diff = contractPriceAfter - entryPrice
    if (side === "Long") {
      return diff * size
    } else {
      return -diff * size
    }
  }

  const handleSetCurrentPosition = (position: any) => {
    setCurrentPosition({
      poolAddress: position.tokenPool,
      side: position.tokenSide === "Long" ? SIDE_LONG : SIDE_SHORT,
      marginDelta: 0,
      sizeDelta: position.size,
      acceptableTradePriceX96:
        position.tokenSide === "Long"
          ? to0xxPriceX96((contractPriceAfter - 1).toString())
          : to0xxPriceX96((contractPriceAfter + 1).toString()),
    })
  }
  const feesValue = 0

  return (
    <div>
      <div className="mb-4 border-t border-0xline"></div>
      {positionDataList.length > 0 ? (
        <>
          {positionDataList.map((position, index) => (
            <div key={index}>
              <div className="flex flex-row gap-2 font-extrabold">
                <div>{`${currentTokenEntity.symbol}`}</div>
                <div
                  className={`${
                    position.tokenSide === "Long"
                      ? "text-0xgreen"
                      : "text-0xred"
                  }`}
                >
                  {position.tokenSide}{" "}
                  {/* {e6DivideE18(
                    position.margin,
                    position.size,
                    BigInt(Math.round(contractPriceAfter))
                  )} */}
                  x
                </div>
                <div className="">[ todo measure position risk]</div>
              </div>
              <div className="flex flex-row justify-between w-full mt-3">
                <div className="flex flex-col">
                  <PositionItem
                    keyText="Size"
                    value={
                      giveMeFormattedToShow(
                        wrapperFormatEther18e(position.size)
                      ) + ` ${currentTokenEntity.name}`
                    }
                  />
                  <div className="flex flex-row mt-2">
                    <CustomTooltip
                      triggerContent={<div className="mr-7">Margin</div>}
                    >
                      <p>llll</p>
                    </CustomTooltip>
                    <CustomTooltip
                      triggerContent={
                        <div className="font-bold">
                          {giveMeFormattedToShow(
                            wrapperFormatEther6e(position.margin)
                          ) + " USDX"}
                        </div>
                      }
                    >
                      <p>llll</p>
                    </CustomTooltip>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="ml-1">
                          <Edit3
                            className="text-opacity-70 hover:text-opacity-100"
                            size={13}
                            onClick={() => handleSetCurrentPosition(position)}
                          />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] bg-0xdialog">
                        <DialogHeader>
                          <DialogTitle className="mb-2 text-center">
                            Edit Margin
                          </DialogTitle>
                        </DialogHeader>
                        <StyledTabs defaultValue="Add Margin">
                          <StyledTabsList className="border-none">
                            <StyledTabsTrigger
                              value="Add Margin"
                              className="p-0 mr-3 text-sm"
                            >
                              Add Margin
                            </StyledTabsTrigger>
                            <StyledTabsTrigger
                              value="Reduce Margin"
                              className="p-0 text-sm"
                            >
                              Reduce Margin
                            </StyledTabsTrigger>
                          </StyledTabsList>
                          <StyledTabsContent value="Add Margin">
                            <AddMarginWidget positionInfo={position} />
                          </StyledTabsContent>
                          <StyledTabsContent value="Reduce Margin">
                            <ReduceMarginWidget positionInfo={position} />
                          </StyledTabsContent>
                        </StyledTabs>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <div className="flex flex-col">
                  <PositionItem
                    keyText="Entry Price"
                    value={x96Price2Readable(position.entryPriceX96)}
                  />
                  <div className="flex mt-2 gap-7">
                    <CustomTooltip triggerContent={<div>Liq. Price</div>}>
                      <p>llll</p>
                    </CustomTooltip>
                    <div className="font-bold">
                      {position?.tokenSide === "Long"
                        ? giveMeFormattedToShow(
                            Number(x96Price2Readable(position.entryPriceX96)) -
                              Number(wrapperFormatEther6e(position.margin)) /
                                Number(wrapperFormatEther18e(position.size))
                          )
                        : giveMeFormattedToShow(
                            Number(x96Price2Readable(position.entryPriceX96)) +
                              Number(wrapperFormatEther6e(position.margin)) /
                                Number(wrapperFormatEther18e(position.size))
                          )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <CustomTooltip
                      triggerContent={
                        <div className="mr-7">Unrealized Pnl.</div>
                      }
                    >
                      <p>llll</p>
                    </CustomTooltip>
                    <div
                      className={`font-bold ${
                        calUnPnL(
                          Number(x96Price2Readable(position.entryPriceX96)),
                          Number(formatEther(position.size)),
                          position.tokenSide
                        ) >= 0
                          ? "text-0xgreen"
                          : "text-0xred"
                      }`}
                    >
                      {giveMeFormattedToShow(
                        calUnPnL(
                          Number(x96Price2Readable(position.entryPriceX96)),
                          Number(formatEther(position.size)),
                          position.tokenSide
                        )
                      )}
                    </div>

                    <ExternalLink
                      className="mt-1 ml-1 text-opacity-70 hover:text-opacity-100"
                      size={13}
                    />
                  </div>
                  <div className="mt-2">
                    <PositionItem keyText="Net Funding" value={"-"} info={""} />
                  </div>
                </div>
                <div className="flex flex-row">
                  {/* <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => handleSetCurrentPosition(position)}
                        className="h-5 text-sm text-white bg-transparent border border-white hover:bg-0xbox"
                      >
                        TP/SL
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-0xdialog">
                      <DialogHeader>
                        <DialogTitle className="mb-5 text-center">
                          TP/SL
                        </DialogTitle>
                        <DialogDescription>
                          <TpslDescWidget positionItem={position} />
                        </DialogDescription>
                      </DialogHeader>
                      <TpslStyledTabContent positionInfo={position} />
                    </DialogContent>
                  </Dialog> */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        disabled={false}
                        className="h-8 text-base bg-transparent border text-0xyellow border-0xyellow hover:bg-0xbox"
                        onClick={() => handleSetCurrentPosition(position)}
                      >
                        Close
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-0xdialog">
                      <DialogHeader>
                        <DialogTitle className="mb-5 text-center">
                          Close
                        </DialogTitle>
                        <DialogDescription>
                          <ClosePositionWidget positionInfo={position} />
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
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
  )
}
