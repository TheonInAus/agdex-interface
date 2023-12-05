import { useEffect, useState } from "react"
import { AlertCircle, Edit3, ExternalLink, Loader2 } from "lucide-react"

import { useCreateDecreasePosition } from "@/hooks/actionTradePosition"
import { useUserOrderList, useUserPositionList } from "@/hooks/cUserState"
import { ethPoolAddress } from "@/hooks/zAddressHelper"
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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { InputBox } from "@/components/ui/inputBox"
import { ListItem } from "@/components/ui/listItem"
import { PositionItem } from "@/components/ui/positionItem"
import {
  StyledTabs,
  StyledTabsContent,
  StyledTabsList,
  StyledTabsTrigger,
} from "@/components/ui/styledTab"

import { AddMarginWidget } from "./marginEdit/addMarginWidget"
import { ReduceMarginWidget } from "./marginEdit/reduceMarginWidget"
import { TpslDescWidget } from "./tpslContent/tpslDescWidget"
import { TpslStyledTabContent } from "./tpslContent/tpslStyledTabContent"

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
                  {e6DivideE18(position.margin, position.size, 2000n)}x
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="ml-1">
                          <Edit3
                            className="text-white text-opacity-70 hover:text-opacity-100"
                            size={13}
                          />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] bg-0xdialog">
                        <DialogHeader>
                          <DialogTitle className="mb-2 text-center">
                            Edit Margin
                          </DialogTitle>
                          <DialogDescription></DialogDescription>
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
                      className="mt-1 ml-1 text-white text-opacity-70 hover:text-opacity-100"
                      size={13}
                    />
                  </div>
                  <div className="mt-2">
                    <PositionItem keyText="Net Funding" value={"-"} info={""} />
                  </div>
                </div>
                <div className="flex flex-row justify-end w-full gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="h-5 text-sm text-white bg-transparent border border-white hover:bg-0xbox">
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
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        disabled={decPositionLoading}
                        className="h-5 text-sm text-white bg-transparent border border-white hover:bg-0xbox"
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
                          <InputBox title="Amount" value={""} suffix={""} />
                          <div className="mt-3">
                            <div className="flex flex-row justify-between">
                              <div className="text-sm">Pure Reduction</div>
                              <Checkbox className="w-4 h-4" />
                            </div>
                            <ListItem keyText={"Max Slippage"} value={""} />
                          </div>
                          <div className="my-3 border-t border-0xline"></div>
                          <div className="flex flex-row gap-2 mb-3">
                            <div className="text-base text-white">
                              Token/Asset
                            </div>
                            <div className="text-0xgreen text-sm mt-[2px]">
                              Long 35.98x
                            </div>
                          </div>
                          <ListItem keyText={"Leverage"} value={""} />
                          <ListItem keyText={"Margin"} value={""} />
                          <ListItem keyText={"Entry Price"} value={""} />
                          <ListItem keyText={"Liq. Price"} value={""} />
                          <div className="my-3 border-t border-0xline"></div>
                          <ListItem keyText={"Price Impact"} value={""} />
                          <ListItem keyText={"Est. Close Price"} value={""} />
                          <ListItem keyText={"PnL"} value={""} />
                          <ListItem keyText={"Fees"} value={""} />
                          <div className="mt-3 border-t border-0xline"></div>
                        </DialogDescription>
                      </DialogHeader>
                      <ListItem keyText={"Receive"} value={""} />
                      <DialogFooter>
                        <Button
                          disabled={decPositionLoading}
                          className="w-full text-sm text-black bg-white hover:bg-0xgrey"
                          onClick={() => {
                            handleClosePosition(position)
                          }}
                        >
                          {" "}
                          {decPositionLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Please wait
                            </>
                          ) : (
                            "Close"
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  {/* <Button
                    disabled={decPositionLoading}
                    className="h-5 text-sm text-white bg-transparent border border-white hover:bg-0xbox"
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
                  </Button> */}
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
