import { useState } from "react"
import { Separator } from "@radix-ui/react-select"
import { Edit3, ExternalLink, Loader2 } from "lucide-react"

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

export default function PositionListWidget({
  contractPriceAfter,
}: PositionListWidgetType) {
  const positionDataList: any[] = []

  const [currentPosition, setCurrentPosition] = useState<PositionInfo>()

  const calUnPnL = (entryPrice: number, size: number, side: string) => {
    const diff = contractPriceAfter - entryPrice
    if (side === "Long") {
      return diff * size
    } else {
      return -diff * size
    }
  }

  const handleSetCurrentPosition = (position: any) => {}
  const feesValue = 0

  return (
    <div>
      <div className="mb-4 border-t border-0xline"></div>
      {positionDataList.length > 0 ? (
        <>
          {positionDataList.map((position, index) => (
            <div key={index}>
              <div className="flex flex-row gap-2 font-extrabold">
                <div>{`symbol`}</div>
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
                  <PositionItem keyText="Size" value={`name`} />
                  <div className="flex flex-row mt-2">
                    <CustomTooltip
                      triggerContent={
                        <div className="text-sm mr-7">Margin</div>
                      }
                    >
                      <p>llll</p>
                    </CustomTooltip>
                    <CustomTooltip
                      triggerContent={
                        <div className="font-bold">{0 + " USDX"}</div>
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
                    value={position.entryPriceX96}
                  />
                  <div className="flex mt-2 gap-7">
                    <CustomTooltip
                      triggerContent={<div className="text-sm">Liq. Price</div>}
                    >
                      <p>llll</p>
                    </CustomTooltip>
                    <div className="font-bold">xxx</div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <CustomTooltip
                      triggerContent={
                        <div className="text-sm mr-7">Unrealized Pnl.</div>
                      }
                    >
                      <p>llll</p>
                    </CustomTooltip>
                    <div className={`font-bold ${"text-0xgreen"}`}>xxx</div>

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
                        className="h-8 text-base bg-transparent border text-agdexMain border-agdexMain hover:bg-0xbox"
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
              <div className="mt-4 border-b border-b-popover"></div>
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
