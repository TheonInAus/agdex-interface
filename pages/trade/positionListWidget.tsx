import { useEffect, useState } from "react"
import { AlertCircle, Edit3, ExternalLink, Loader2 } from "lucide-react"

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
import { Alert, AlertDescription } from "@/components/ui/alert"
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
import { Label } from "@/components/ui/label"
import { ListItem } from "@/components/ui/listItem"
import { PercentageSlider } from "@/components/ui/percentageSlider"
import { PositionItem } from "@/components/ui/positionItem"
import {
  StyledTabs,
  StyledTabsContent,
  StyledTabsList,
  StyledTabsTrigger,
} from "@/components/ui/styledTab"
import { TpsLInput } from "@/components/ui/tpslIput"

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
                          <DialogTitle className="text-center mb-2">
                            Edit Margin
                          </DialogTitle>
                          <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <StyledTabs defaultValue="Add Margin">
                          <StyledTabsList className="border-none">
                            <StyledTabsTrigger
                              value="Add Margin"
                              className="text-sm  px-0 py-0 mr-3"
                            >
                              Add Margin
                            </StyledTabsTrigger>
                            <StyledTabsTrigger
                              value="Reduce Margin"
                              className="text-sm  px-0 py-0"
                            >
                              Reduce Margin
                            </StyledTabsTrigger>
                          </StyledTabsList>
                          <StyledTabsContent value="Add Margin">
                            <InputBox title="Amount" value={""} suffix={""} />
                            <div className="flex flex-row gap-2 mb-3 mt-5">
                              <div className="text-white text-base">
                                Token/Asset
                              </div>
                              <div className="text-0xgreen text-sm mt-[2px]">
                                Long 35.98x
                              </div>
                            </div>
                            <ListItem keyText={"Margin"} value={""} />
                            <ListItem keyText={"Leverage"} value={""} />
                            <ListItem keyText={"Size"} value={""} />
                            <ListItem keyText={"Index Price"} value={""} />
                            <ListItem keyText={"Liq. Price"} value={""} />
                            <div className="mt-3 border-t border-0xline"></div>
                            <div className="flex flex-row w-full justify-between text-sm mt-2">
                              <div>Execution Fee</div>
                              <div>- ($-)</div>
                            </div>
                          </StyledTabsContent>
                          <StyledTabsContent value="Reduce Margin"></StyledTabsContent>
                        </StyledTabs>
                        <DialogFooter>
                          <Button className="w-full">Confirm</Button>
                        </DialogFooter>
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
                      className="ml-1 mt-1 text-white text-opacity-70 hover:text-opacity-100"
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
                      <Button className="h-5 text-sm text-white bg-transparent hover:bg-0xbox border border-white">
                        TP/SL
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-0xdialog">
                      <DialogHeader>
                        <DialogTitle className="text-center mb-5">
                          TP/SL
                        </DialogTitle>
                        <DialogDescription>
                          <div className="flex flex-row gap-2 mb-3">
                            <div className="text-white text-base">
                              Token/Asset
                            </div>
                            <div className="text-0xgreen text-sm mt-[2px]">
                              Long 35.98x
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <div className="flex flex-row w-full space-x-24">
                              <PositionItem
                                keyText={"Entry Price"}
                                value={""}
                              />
                              <PositionItem
                                keyText={"Market Price"}
                                value={""}
                              />
                            </div>
                            <PositionItem keyText={"Liq Price"} value={""} />
                          </div>
                          <div className="mt-3 border-t border-0xline"></div>
                        </DialogDescription>
                      </DialogHeader>
                      <StyledTabs defaultValue="Entire Position">
                        <StyledTabsList className="border-none">
                          <StyledTabsTrigger
                            value="Entire Position"
                            className="text-sm  px-0 py-0 mr-3"
                          >
                            Entire Position
                          </StyledTabsTrigger>
                          <StyledTabsTrigger
                            value="Partial Position"
                            className="text-sm  px-0 py-0"
                          >
                            Partial Position
                          </StyledTabsTrigger>
                        </StyledTabsList>
                        <StyledTabsContent value="Entire Position">
                          <div className="flex flex-row gap-[2%] mb-5">
                            <div className="flex flex-col gap-3 w-[60%]">
                              <div className="flex flex-row gap-2">
                                <Checkbox className="h-4 w-4" />
                                <Label htmlFor="name" className="text-left">
                                  Take Profit ≥
                                </Label>
                              </div>
                              <TpsLInput
                                id="name"
                                value="0.00"
                                className="col-span-3"
                                suffix="USDT"
                              />
                            </div>
                            <div className="flex flex-col gap-[14px] w-[38%]">
                              <Label
                                htmlFor="name"
                                className="text-right mr-1 text-0xgrey"
                              >
                                Exp. PnL -(-)
                              </Label>
                              <TpsLInput
                                id="name"
                                value="0.00"
                                className="col-span-3"
                                suffix="%"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row gap-[2%]">
                            <div className="flex flex-col gap-3 w-[60%]">
                              <div className="flex flex-row gap-2">
                                <Checkbox className="h-4 w-4" />
                                <Label htmlFor="name" className="text-left">
                                  Stop Loss ≤
                                </Label>
                              </div>
                              <TpsLInput
                                id="name"
                                value="0.00"
                                className="col-span-3"
                                suffix="USDT"
                              />
                            </div>
                            <div className="flex flex-col gap-[14px] w-[38%]">
                              <Label
                                htmlFor="name"
                                className="text-right mr-1 text-0xgrey"
                              >
                                Exp. PnL -(-)
                              </Label>
                              <TpsLInput
                                id="name"
                                value="0.00"
                                className="col-span-3"
                                suffix="%"
                              />
                            </div>
                          </div>
                          <div className="mt-2 w-full text-sm">
                            <div className="flex flex-row justify-between">
                              <div className="text-0xgrey">Size</div>
                              <div>-</div>
                            </div>
                            <div className="flex flex-row justify-between">
                              <div>Execution Fee</div>
                              <div>-</div>
                            </div>
                            <div className="mt-4 text-0xgrey">
                              When the market price reaches the trigger price,
                              the system will close the position at the{" "}
                              <span className="text-white">market price</span>.
                            </div>
                          </div>
                        </StyledTabsContent>
                        <StyledTabsContent value="Partial Position">
                          <div className="flex flex-row gap-[2%] mb-5">
                            <div className="flex flex-col gap-3 w-[60%]">
                              <div className="flex flex-row gap-2">
                                <Checkbox className="h-4 w-4" />
                                <Label htmlFor="name" className="text-left">
                                  Take Profit ≥
                                </Label>
                              </div>
                              <TpsLInput
                                id="name"
                                value="0.00"
                                className="col-span-3"
                                suffix="USDT"
                              />
                            </div>
                            <div className="flex flex-col gap-[14px] w-[38%]">
                              <Label
                                htmlFor="name"
                                className="text-right mr-1 text-0xgrey"
                              >
                                Exp. PnL -(-)
                              </Label>
                              <TpsLInput
                                id="name"
                                value="0.00"
                                className="col-span-3"
                                suffix="%"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row gap-[2%]">
                            <div className="flex flex-col gap-3 w-[60%]">
                              <div className="flex flex-row gap-2">
                                <Checkbox className="h-4 w-4" />
                                <Label htmlFor="name" className="text-left">
                                  Stop Loss ≤
                                </Label>
                              </div>
                              <TpsLInput
                                id="name"
                                value="0.00"
                                className="col-span-3"
                                suffix="USDT"
                              />
                            </div>
                            <div className="flex flex-col gap-[14px] w-[38%]">
                              <Label
                                htmlFor="name"
                                className="text-right mr-1 text-0xgrey"
                              >
                                Exp. PnL -(-)
                              </Label>
                              <TpsLInput
                                id="name"
                                value="0.00"
                                className="col-span-3"
                                suffix="%"
                              />
                            </div>
                          </div>
                          <div className="w-full mt-4">
                            <TpsLInput
                              id="name"
                              value="Size"
                              className="col-span-3"
                              suffix="ETH"
                            />
                            <PercentageSlider
                              defaultValue={[1]}
                              // onValueChange={handleSliderValueChange}
                              max={100}
                              min={1}
                              step={1}
                              // value={[leverageNumber]}
                              style={{ marginBottom: 40, marginTop: 20 }}
                            />
                          </div>
                          <div className="mt-2 w-full text-sm">
                            <div className="flex flex-row justify-between">
                              <div className="text-0xgrey">Size</div>
                              <div>-</div>
                            </div>
                            <div className="flex flex-row justify-between">
                              <div>Execution Fee</div>
                              <div>-</div>
                            </div>
                            <div className="mt-4 text-0xgrey">
                              When the market price reaches the trigger price,
                              the system will close the position at the{" "}
                              <span className="text-white">market price</span>.
                            </div>
                          </div>
                          <Alert className="bg-0xdialog-foreground border-gray-100 mt-4 h-[70px]">
                            <AlertCircle
                              className="text-0xredLighter hover:text-opacity-100 mt-2"
                              size={22}
                            />
                            <AlertDescription className="text-0xyellow-lighter ml-1">
                              Margin settlement has a 10% slippage to prevent
                              order failure due to insufficient margin.
                            </AlertDescription>
                          </Alert>
                        </StyledTabsContent>
                      </StyledTabs>
                      {/* <div className="flex flex-row gap-[2%] mb-5">
                        <div className="flex flex-col gap-3 w-[60%]">
                          <div className="flex flex-row gap-3">
                            <Checkbox className="h-4 w-4" />
                            <Label htmlFor="name" className="text-left">
                              Take Profit ≥
                            </Label>
                          </div>
                          <Input
                            id="name"
                            value="0.00"
                            className="col-span-3"
                            suffix="USDT"
                          />
                        </div>
                        <div className="flex flex-col gap-[14px] w-[38%]">
                          <Label
                            htmlFor="name"
                            className="text-right mr-1 text-0xgrey"
                          >
                            Exp. PnL -(-)
                          </Label>
                          <Input
                            id="name"
                            value="0.00"
                            className="col-span-3"
                            suffix="%"
                          />
                        </div>
                      </div>
                      <div className="flex flex-row gap-[2%]">
                        <div className="flex flex-col gap-3 w-[60%]">
                          <div className="flex flex-row gap-1">
                            <Checkbox className="h-4 w-4" />
                            <Label htmlFor="name" className="text-left">
                              Stop Loss ≤
                            </Label>
                          </div>
                          <Input
                            id="name"
                            value="0.00"
                            className="col-span-3"
                            suffix="USDT"
                          />
                        </div>
                        <div className="flex flex-col gap-[14px] w-[38%]">
                          <Label
                            htmlFor="name"
                            className="text-right mr-1 text-0xgrey"
                          >
                            Exp. PnL -(-)
                          </Label>
                          <Input
                            id="name"
                            value="0.00"
                            className="col-span-3"
                            suffix="%"
                          />
                        </div>
                      </div>
                      <div className="mt-2 w-full text-sm">
                        <div className="flex flex-row justify-between">
                          <div className="text-0xgrey">Size</div>
                          <div>-</div>
                        </div>
                        <div className="flex flex-row justify-between">
                          <div>Execution Fee</div>
                          <div>-</div>
                        </div>
                        <div className="mt-4 text-0xgrey">
                          When the market price reaches the trigger price, the
                          system will close the position at the{" "}
                          <span className="text-white">market price</span>.
                        </div>
                      </div>
                      <Alert className="bg-0xdialog-foreground border-gray-100">
                        <AlertCircle
                          className="text-0xredLighter hover:text-opacity-100 mt-2"
                          size={22}
                        />
                        <AlertDescription className="text-0xyellow-lighter ml-1">
                          Margin settlement has a 10% slippage to prevent order
                          failure due to insufficient margin.
                        </AlertDescription>
                      </Alert> */}
                      {/* <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="name"
                            value="Pedro Duarte"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Username
                          </Label>
                          <Input
                            id="username"
                            value="@peduarte"
                            className="col-span-3"
                          />
                        </div>
                      </div> */}
                      <DialogFooter>
                        <Button className="text-sm w-full text-black bg-white hover:bg-0xgrey">
                          Confirm
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        disabled={decPositionLoading}
                        className="h-5 text-sm text-white bg-transparent hover:bg-0xbox border border-white"
                      >
                        Close
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-0xdialog">
                      <DialogHeader>
                        <DialogTitle className="text-center mb-5">
                          Close
                        </DialogTitle>
                        <DialogDescription>
                          <InputBox title="Amount" value={""} suffix={""} />
                          <div className="mt-3">
                            <div className="flex flex-row justify-between">
                              <div className="text-sm">Pure Reduction</div>
                              <Checkbox className="w-4 h-4"/>
                            </div>
                            <ListItem keyText={"Max Slippage"} value={""} />
                          </div>
                          <div className="my-3 border-t border-0xline"></div>
                          <div className="flex flex-row gap-2 mb-3">
                            <div className="text-white text-base">
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
                          className="text-sm w-full text-black bg-white hover:bg-0xgrey"
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
