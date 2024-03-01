"use client"

import React, { useEffect, useState } from "react"
import { Edit3, ExternalLink, Loader } from "lucide-react"

import {
  useApprovePlugin,
  useCheckPluginState,
} from "@/hooks/actionApprovePlugin"
import {
  useExeDecreasePosition,
  useExeIncreasePosition,
} from "@/hooks/actionMixExecutorHelper"
import { usePositionAndLiqPositionInfo } from "@/hooks/cPositionState"
import { useGetReferralState } from "@/hooks/cUserState"
import {
  useGetPoolPriceState,
  useTokenMarketAndIndexPrice,
} from "@/hooks/usePrice"
import useTokenConfigStore from "@/hooks/useTokenConfigStore"
import { orderBookAddress, positionRouterAddress } from "@/hooks/zAddressHelper"
import {
  SIDE_LONG,
  SIDE_SHORT,
  giveMeFormattedToShow,
  x96Price2Readable,
} from "@/hooks/zContractHelper"
import { Button } from "@/components/ui/button"
import { ButtonInput } from "@/components/ui/buttonInput"
import CalculatorDropDownBox from "@/components/ui/calculatorDropDown"
import { CustomTooltip } from "@/components/ui/customToolTip"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { LabeledInput } from "@/components/ui/labeledInput"
import { LeverageInput } from "@/components/ui/leverageInput"
import { ListItem } from "@/components/ui/listItem"
import { PnLSlider } from "@/components/ui/pnlSlider"
import { Stats } from "@/components/ui/stats"
import {
  StyledTabs,
  StyledTabsContent,
  StyledTabsList,
  StyledTabsTrigger,
} from "@/components/ui/styledTab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AddMarginWidget from "@/components/ui/tradeWidget/addMarginWidget"
import DropDownBox from "@/components/ui/tradeWidget/dropDownBox"
import OrderListWidget from "@/components/ui/tradeWidget/orderListWidget"
import PositionListWidget from "@/components/ui/tradeWidget/positionListWidget"
import ReduceMarginWidget from "@/components/ui/tradeWidget/reduceMarginWidget"
import TradeLimitWidget from "@/components/ui/tradeWidget/tradeLimitWidget"
import TradeMarketWidget from "@/components/ui/tradeWidget/tradeMarketWidget"
import Iconify from "@/components/Iconify"
import TradingViewWidget from "@/components/tradingView"

interface IndexPriceData {
  [key: string]: {
    indexPrice: number
  }
}

interface MarketData {
  indexPrices?: IndexPriceData
}
export default function TradePage() {
  const {
    data: positionRouterPluginData,
    isLoading: isPositionRouterPluginLoading,
    isError: isPositionRouterPluginError,
  } = useCheckPluginState(positionRouterAddress)

  const {
    data: orderBookPluginData,
    isLoading: isOrderBookPluginLoading,
    isError: isOrderBookPluginError,
  } = useCheckPluginState(orderBookAddress)

  const { approvePluginWrite: positionRouterWrite } = useApprovePlugin(
    positionRouterAddress
  )

  const { approvePluginWrite: orderBookWrite } =
    useApprovePlugin(orderBookAddress)

  const {
    data: exeIncPositionData,
    isLoading: isExeIncPositionLoading,
    isError: isExeIncPositionError,
    write: exeIncPositionWrite,
  } = useExeIncreasePosition()

  const {
    data: exeDecPositionData,
    isLoading: isExeDecPositionLoading,
    isError: isExeDecPositionError,
    write: exeDecPositionWrite,
  } = useExeDecreasePosition()

  const approvePositionRouterPluginTemp = () => {
    positionRouterWrite()
  }

  const approveOrderBookPluginTemp = () => {
    orderBookWrite()
  }

  const currentTokenEntity = useTokenConfigStore(
    (state: any) => state.currentTokenEntity
  )

  const {
    data: marketAndIndexPriceData,
    error,
    loading,
  } = useTokenMarketAndIndexPrice()
  console.log("check useTokenMarketAndIndexPrice => ", marketAndIndexPriceData)

  const [shownIndexPrice, setShownIndexPrice] = useState<number>(0)
  const [change24h, setChange24h] = useState<number>(0)
  useEffect(() => {
    if (
      marketAndIndexPriceData &&
      marketAndIndexPriceData.indexPrices &&
      marketAndIndexPriceData.markPrices &&
      marketAndIndexPriceData.change24h
    ) {
      setShownIndexPrice(
        marketAndIndexPriceData?.indexPrices
          ? +(
              marketAndIndexPriceData?.indexPrices?.[
                currentTokenEntity.name
              ] as any
            ).indexPrice
          : 0
      )
      setChange24h(
        marketAndIndexPriceData?.indexPrices
          ? +(
              marketAndIndexPriceData?.indexPrices?.[
                currentTokenEntity.name
              ] as any
            ).price24hPcnt
          : 0
      )
    }
  }, [marketAndIndexPriceData, currentTokenEntity])

  const shownMarketPrice =
    marketAndIndexPriceData.markPrices?.[currentTokenEntity.name] ?? 0

  const { premiumRateX96 } = useGetPoolPriceState(
    currentTokenEntity.poolContract
  )

  const contractPrice = shownIndexPrice * (1 + premiumRateX96)

  const {
    lpNetSize,
    lpSide,
    lpEntryPrice,
    liquidity,
    liqPnL,
    longSize,
    shortSize,
    longFundingRateGrowthX96,
    shortFundingRateGrowthX96,
  } = usePositionAndLiqPositionInfo(currentTokenEntity.poolContract)

  const [openInterst, setOpenInterst] = useState(0)
  const [openInterstValue, setOpenInterstValue] = useState(0)
  const [balanceRate, setBalanceRate] = useState(0)

  useEffect(() => {
    const totalSize = lpNetSize + longSize + shortSize
    setOpenInterst(totalSize)
    if (shownIndexPrice) {
      setOpenInterstValue(totalSize * shownIndexPrice)
    }
  }, [lpNetSize, longSize, shortSize, shownIndexPrice, currentTokenEntity])

  useEffect(() => {
    let tempNetSize = lpNetSize
    if (lpSide === 1) {
      tempNetSize = -lpNetSize
    } else {
      tempNetSize = lpNetSize
    }
    if (liquidity === 0) {
      setBalanceRate(0)
    } else {
      const value = (tempNetSize * shownIndexPrice) / liquidity
      setBalanceRate(value)
    }
  }, [lpNetSize, lpSide, liquidity, shownIndexPrice, currentTokenEntity])

  /**
   * just for testing ********************************
   */
  const exeIncPostionTemp = () => {
    exeIncPositionWrite()
  }

  const exeDecPostionTemp = () => {
    exeDecPositionWrite()
  }

  const exeApproveTemp = () => {}

  const [leverageNumber, setLeverageNumber] = useState(1)

  const handleSliderValueChange = (value: any) => {
    setLeverageNumber(value[0])
  }

  const handleInputChange = (event: any) => {
    const value = parseFloat(event.target.value)
    if (!isNaN(value) && value >= 1 && value <= 100) {
      setLeverageNumber(value)
    } else if (event.target.value === "") {
      setLeverageNumber(0)
    }
  }

  //************************************************** */

  return (
    <section className="container flex items-center justify-center pt-6">
      <div className="flex flex-row">
        {/* Left Column */}
        <div className="px-0.5 basis-auto">
          {/* Wide Block 1 */}
          <div
            className="p-6 mb-4 rounded-lg bg-0xboxBackground"
            style={{ width: 1100, height: 600 }}
          >
            <div className="flex">
              <div className="text-lg w-[16%]">
                <DropDownBox />
              </div>
              <div className="mt-1 text-lg mr-14 text-0xredLighter">
                {giveMeFormattedToShow(contractPrice)}
              </div>
              <Stats
                title={"Index Price"}
                value={giveMeFormattedToShow(shownIndexPrice)}
              />
              <Stats
                title={"24h Change"}
                value={`${change24h.toFixed(2)}%`}
                textColor={
                  change24h >= 0 ? "text-0xgreen" : "text-0xredLighter"
                }
              />
              <div className="mr-10">
                <CustomTooltip
                  triggerContent={
                    <div className="text-xs text-0xgrey">1h Funding</div>
                  }
                >
                  <p>
                    {
                      "Funding fees are settled every hour. When the funding rate is positive, long positions pay short positions; when it's negative, short positions pay long positions."
                    }
                  </p>
                </CustomTooltip>
                <div className="flex mt-1">
                  <div className="mr-1 text-sm text-0xyellow-lighter">
                    +0.001250%
                  </div>
                  <div className="text-sm text-0xgrey">(27:15)</div>
                </div>
              </div>
              <div className="mr-10">
                <CustomTooltip
                  triggerContent={
                    <div className="text-xs text-0xgrey">Open Interest</div>
                  }
                >
                  <p> todo desc</p>
                </CustomTooltip>
                <div className="flex mt-1">
                  <div className="mr-1 text-sm text-0xyellow-lighter">
                    {`${giveMeFormattedToShow(openInterst)} ${
                      currentTokenEntity.name
                    }`}{" "}
                  </div>
                  <div className="text-sm text-0xgrey">{`($${giveMeFormattedToShow(
                    openInterstValue
                  )})`}</div>
                </div>
              </div>
            </div>
            <div className="my-5 border-t border-0xline"></div>
            <TradingViewWidget />
          </div>
          {/* Wide Block 2 */}
          <div
            className="p-4 pb-16 rounded-lg bg-0xboxBackground"
            style={{ width: 1100 }}
          >
            <StyledTabs defaultValue="Position">
              <StyledTabsList>
                <StyledTabsTrigger value="Position">Position</StyledTabsTrigger>
                <StyledTabsTrigger value="Orders">Orders</StyledTabsTrigger>
                <StyledTabsTrigger value="History">History</StyledTabsTrigger>
              </StyledTabsList>
              <StyledTabsContent value="Position" className="ml-3">
                <PositionListWidget />
              </StyledTabsContent>
              <StyledTabsContent value="Orders" className="ml-3">
                {/* Content for Orders tab */}
                <OrderListWidget />
              </StyledTabsContent>
              <StyledTabsContent value="History" className="ml-3">
                {/* Content for History tab */}
                <div className="mt-2 mb-4 border-t border-0xline"></div>
                <div>History tab content goes here.</div>
              </StyledTabsContent>
            </StyledTabs>
          </div>
        </div>
        {/* Right Column */}
        <div className="px-3">
          {/* Narrow Block 1 */}
          <div
            className="p-6 mb-6 rounded-lg bg-0xboxBackground"
            style={{ width: 350 }}
          >
            <Tabs defaultValue={"long"} className="w-full">
              <TabsList style={{ width: "100%" }}>
                <TabsTrigger style={{ width: "50%" }} value={"long"}>
                  Long
                </TabsTrigger>
                <TabsTrigger style={{ width: "50%" }} value={"short"}>
                  Short
                </TabsTrigger>
              </TabsList>
              <TabsContent value="long">
                <StyledTabs defaultValue="Market">
                  <div className="flex flex-row justify-between">
                    <StyledTabsList>
                      <StyledTabsTrigger value="Market">
                        Market
                      </StyledTabsTrigger>
                      <StyledTabsTrigger value="Limit">Limit</StyledTabsTrigger>
                    </StyledTabsList>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="ml-1">
                          <Iconify icon={"ri:calculator-line"} />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="bg-0xdialog w-[730px]">
                        <DialogHeader>
                          <DialogTitle>
                            <CalculatorDropDownBox />
                          </DialogTitle>
                        </DialogHeader>
                        <StyledTabs defaultValue="PnL">
                          <StyledTabsList className="ml-4 space-x-8 border-none">
                            <StyledTabsTrigger
                              value="PnL"
                              className="p-0 text-sm"
                            >
                              PnL
                            </StyledTabsTrigger>
                            <StyledTabsTrigger
                              value="Target Price"
                              className="p-0 text-sm"
                            >
                              Target Price
                            </StyledTabsTrigger>
                            <StyledTabsTrigger
                              value="Liquidation Price"
                              className="p-0 text-sm"
                            >
                              Liquidation Price
                            </StyledTabsTrigger>
                            <StyledTabsTrigger
                              value="Entry Price"
                              className="p-0 text-sm"
                            >
                              Entry Price
                            </StyledTabsTrigger>
                          </StyledTabsList>
                          <div className="border-t border-0xline"></div>
                          <StyledTabsContent value="PnL">
                            <div className="flex flex-row gap-3">
                              <Tabs defaultValue={"long"} className="w-[60%]">
                                <TabsList style={{ width: "100%" }}>
                                  <TabsTrigger
                                    style={{ width: "50%" }}
                                    value={"long"}
                                  >
                                    Long
                                  </TabsTrigger>
                                  <TabsTrigger
                                    style={{ width: "50%" }}
                                    value={"short"}
                                  >
                                    Short
                                  </TabsTrigger>
                                </TabsList>
                                <TabsContent value="long">
                                  <div className="mt-4">
                                    <LeverageInput
                                      label="Leverage"
                                      suffix="X"
                                      value={leverageNumber.toString()}
                                      onChange={handleInputChange}
                                      type="number"
                                      min="1"
                                      max="100"
                                      className="mb-2"
                                    />
                                    <div className="mt-4">
                                      <PnLSlider
                                        defaultValue={[1]}
                                        max={100}
                                        min={1}
                                        step={1}
                                        onValueChange={handleSliderValueChange}
                                        value={[leverageNumber]}
                                        style={{
                                          marginBottom: 10,
                                          marginTop: 10,
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="mt-[45px]">
                                    <ButtonInput
                                      label="Entry Price"
                                      suffix="USDT"
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                    <LabeledInput
                                      label={"TP trigger price"}
                                      suffix={"USDT"}
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                    <LabeledInput
                                      label={"SL trigger price"}
                                      suffix={"USDT"}
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                    <LabeledInput
                                      label={"Size"}
                                      suffix={"ETH"}
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                  </div>
                                </TabsContent>
                                <TabsContent value="short">
                                  <div className="mt-4">
                                    <LeverageInput
                                      label="Leverage"
                                      suffix="X"
                                      value={leverageNumber.toString()}
                                      onChange={handleInputChange}
                                      type="number"
                                      min="1"
                                      max="100"
                                      className="mb-2"
                                    />
                                    <div className="mt-4">
                                      <PnLSlider
                                        defaultValue={[1]}
                                        max={100}
                                        min={1}
                                        step={1}
                                        onValueChange={handleSliderValueChange}
                                        value={[leverageNumber]}
                                        style={{
                                          marginBottom: 10,
                                          marginTop: 10,
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="mt-[45px]">
                                    <ButtonInput
                                      label="Entry Price"
                                      suffix="USDT"
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                    <LabeledInput
                                      label={"TP trigger price"}
                                      suffix={"USDT"}
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                    <LabeledInput
                                      label={"SL trigger price"}
                                      suffix={"USDT"}
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                    <LabeledInput
                                      label={"Size"}
                                      suffix={"ETH"}
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                  </div>
                                </TabsContent>
                                <Button className="w-full mt-4 bg-bronze hover:bg-bronze-foreground">
                                  Calculate
                                </Button>
                              </Tabs>
                              <div className="bg-black w-[50%] rounded-lg">
                                <div className="mt-2 ml-2">Result</div>
                                <div className="mx-2 my-3 border-t border-0xline"></div>
                                <div className="flex flex-col gap-2 mx-2 mb-4">
                                  <ListItem keyText={"Margin"} value={"-"} />
                                  <ListItem
                                    keyText={"Risk / Reward"}
                                    value={"-"}
                                  />
                                  <ListItem keyText={"TP PnL"} value={"-"} />
                                  <ListItem keyText={"TP PnL%"} value={"-"} />
                                  <ListItem keyText={"SL PnL"} value={"-"} />
                                  <ListItem keyText={"SL PnL%"} value={"-"} />
                                </div>
                                <div className="mx-2 my-3 border-t border-0xline"></div>
                                <div className="mx-3 my-2 text-sm text-0xgrey">
                                  <span className="font-semibold">
                                    Long trade
                                  </span>{" "}
                                  the risk/reward ratio is: (Entry Price − Stop
                                  Loss) / (Profit Target − Entry Price) × 100%.
                                </div>
                                <div className="mx-3 my-2 text-xs text-0xgrey">
                                  <span className="font-semibold">
                                    Short trade
                                  </span>{" "}
                                  the risk/reward ratio is: (Stop Loss − Entry
                                  Price) / (Entry Price − Profit Target) × 100%.
                                </div>
                              </div>
                            </div>
                            <div className="mt-2 text-sm text-0xgrey">
                              *The calculation is for reference only and does
                              not include trading fee, execution fee and other
                              actual costs.
                            </div>
                          </StyledTabsContent>
                          <StyledTabsContent value="Target Price">
                            <div className="flex flex-row gap-3">
                              <Tabs defaultValue={"long"} className="w-[60%]">
                                <TabsList style={{ width: "100%" }}>
                                  <TabsTrigger
                                    style={{ width: "50%" }}
                                    value={"long"}
                                  >
                                    Long
                                  </TabsTrigger>
                                  <TabsTrigger
                                    style={{ width: "50%" }}
                                    value={"short"}
                                  >
                                    Short
                                  </TabsTrigger>
                                </TabsList>
                                <TabsContent value="long">
                                  <div className="mt-4">
                                    <LeverageInput
                                      label="Leverage"
                                      suffix="X"
                                      value={leverageNumber.toString()}
                                      onChange={handleInputChange}
                                      type="number"
                                      min="1"
                                      max="100"
                                      className="mb-2"
                                    />
                                    <div className="mt-4">
                                      <PnLSlider
                                        defaultValue={[1]}
                                        max={100}
                                        min={1}
                                        step={1}
                                        onValueChange={handleSliderValueChange}
                                        value={[leverageNumber]}
                                        style={{
                                          marginBottom: 10,
                                          marginTop: 10,
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="mt-[45px]">
                                    <ButtonInput
                                      label="Entry Price"
                                      suffix="USDT"
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                    <LabeledInput
                                      label={"PnL%"}
                                      suffix={"%"}
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                  </div>
                                </TabsContent>
                                <TabsContent value="short">
                                  <div className="mt-4">
                                    <LeverageInput
                                      label="Leverage"
                                      suffix="X"
                                      value={leverageNumber.toString()}
                                      onChange={handleInputChange}
                                      type="number"
                                      min="1"
                                      max="100"
                                      className="mb-2"
                                    />
                                    <div className="mt-4">
                                      <PnLSlider
                                        defaultValue={[1]}
                                        max={100}
                                        min={1}
                                        step={1}
                                        onValueChange={handleSliderValueChange}
                                        value={[leverageNumber]}
                                        style={{
                                          marginBottom: 10,
                                          marginTop: 10,
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="mt-[45px]">
                                    <ButtonInput
                                      label="Entry Price"
                                      suffix="USDT"
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                    <LabeledInput
                                      label={"PnL%"}
                                      suffix={"%"}
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                  </div>
                                </TabsContent>
                                <Button className="w-full mt-28 bg-bronze hover:bg-bronze-foreground">
                                  Calculate
                                </Button>
                              </Tabs>
                              <div className="bg-black w-[50%] rounded-lg">
                                <div className="mt-2 ml-2">Result</div>
                                <div className="mx-2 my-3 border-t border-0xline"></div>
                                <div className="flex flex-col gap-2 mx-2 mb-4">
                                  <ListItem
                                    keyText={"Target Price"}
                                    value={"-"}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="mt-2 text-sm text-0xgrey">
                              *The calculation is for reference only and does
                              not include trading fee, execution fee and other
                              actual costs.
                            </div>
                          </StyledTabsContent>
                          <StyledTabsContent value="Liquidation Price">
                            <div className="flex flex-row gap-3">
                              <Tabs defaultValue={"long"} className="w-[60%]">
                                <TabsList style={{ width: "100%" }}>
                                  <TabsTrigger
                                    style={{ width: "50%" }}
                                    value={"long"}
                                  >
                                    Long
                                  </TabsTrigger>
                                  <TabsTrigger
                                    style={{ width: "50%" }}
                                    value={"short"}
                                  >
                                    Short
                                  </TabsTrigger>
                                </TabsList>
                                <TabsContent value="long">
                                  <div className="mt-4">
                                    <ButtonInput
                                      label="Entry Price"
                                      suffix="USDT"
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                    <LabeledInput
                                      label={"Size"}
                                      suffix={"ETH"}
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                    <LabeledInput
                                      label={"Balance"}
                                      suffix={"USDT"}
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                      tooltipContent={
                                        <span>
                                          Simulated position net value. Balance
                                          = Margin + Unrealized PnL
                                        </span>
                                      }
                                    />
                                  </div>
                                </TabsContent>
                                <TabsContent value="short">
                                  <div className="mt-4">
                                    <ButtonInput
                                      label="Entry Price"
                                      suffix="USDT"
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                    <LabeledInput
                                      label={"Size"}
                                      suffix={"ETH"}
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                    <LabeledInput
                                      label={"Balance"}
                                      suffix={"USDT"}
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                      tooltipContent={
                                        <span>
                                          Simulated position net value. Balance
                                          = Margin + Unrealized PnL
                                        </span>
                                      }
                                    />
                                  </div>
                                </TabsContent>
                                <Button className="w-full mt-[169px] bg-bronze hover:bg-bronze-foreground">
                                  Calculate
                                </Button>
                              </Tabs>
                              <div className="bg-black w-[50%] rounded-lg">
                                <div className="mt-2 ml-2">Result</div>
                                <div className="mx-2 my-3 border-t border-0xline"></div>
                                <div className="flex flex-col gap-2 mx-2 mb-4">
                                  <ListItem
                                    keyText={"Liquidation Price"}
                                    value={"-"}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="mt-2 text-sm text-0xgrey">
                              *The calculation is for reference only and does
                              not include trading fee, execution fee and other
                              actual costs.
                            </div>
                          </StyledTabsContent>
                          <StyledTabsContent value="Entry Price">
                            <div className="flex flex-row gap-3">
                              <Tabs defaultValue={"long"} className="w-[60%]">
                                <TabsList style={{ width: "100%" }}>
                                  <TabsTrigger
                                    style={{ width: "50%" }}
                                    value={"long"}
                                  >
                                    Long
                                  </TabsTrigger>
                                  <TabsTrigger
                                    style={{ width: "50%" }}
                                    value={"short"}
                                  >
                                    Short
                                  </TabsTrigger>
                                </TabsList>
                                <TabsContent value="long"></TabsContent>
                                <TabsContent value="short"></TabsContent>
                              </Tabs>
                              <div className="bg-black w-[50%] rounded-lg">
                                <div className="mt-2 ml-2">Result</div>
                                <div className="mx-2 my-3 border-t border-0xline"></div>
                                <div className="flex flex-col gap-2 mx-2 mb-4">
                                  <ListItem
                                    keyText={"Entry Price"}
                                    value={"-"}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="my-4 border-t border-0xline"></div>
                            <div className="flex flex-row gap-4">
                              <div className="w-[7%] flex flex-col mr-1">
                                <div className="text-sm text-0xgrey self-center">Open</div>
                                <div className="self-center mt-3 text-0xgrey">
                                  1
                                </div>
                              </div>
                              <div className="w-[40%]">
                                <div className="text-sm text-0xgrey">
                                  Entry price
                                </div>
                                <div>
                                  <LabeledInput
                                    label={"Entry price"}
                                    suffix={"USDT"}
                                    value={0}
                                    type="number"
                                    className="mb-2"
                                  />
                                </div>
                              </div>
                              <div className="w-[40%]">
                                <div className="text-sm text-0xgrey">Size</div>
                                <div>
                                  <LabeledInput
                                    label={"Size"}
                                    suffix={"ETH"}
                                    value={0}
                                    type="number"
                                    className="mb-2"
                                  />
                                </div>
                              </div>
                              <div className="w-[10%] flex flex-col">
                                <div className="text-sm text-0xgrey self-center">
                                  Operation
                                </div>
                                <div className="self-center mt-1 text-0xgrey">
                                  <Iconify icon={"mdi:minus-box-outline"} />
                                </div>
                              </div>
                            </div>
                            <Button className="mt-3 bg-bronze hover:bg-bronze-foreground">+ Add</Button>
                            <Button className="w-full mt-[107px] bg-bronze hover:bg-bronze-foreground">
                              Calculate
                            </Button>
                            <div className="mt-2 text-sm text-0xgrey">
                              *The calculation is for reference only and does
                              not include trading fee, execution fee and other
                              actual costs.
                            </div>
                          </StyledTabsContent>
                        </StyledTabs>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <StyledTabsContent value="Market" className="ml-3">
                    <TradeMarketWidget
                      side={SIDE_LONG}
                      marketAndIndexPriceData={marketAndIndexPriceData}
                      contractPriceAfter={contractPrice}
                    />
                  </StyledTabsContent>
                  <StyledTabsContent value="Limit" className="ml-3">
                    <TradeLimitWidget
                      side={SIDE_LONG}
                      marketAndIndexPriceData={marketAndIndexPriceData}
                    />
                  </StyledTabsContent>
                </StyledTabs>
              </TabsContent>
              <TabsContent value="short">
                <StyledTabs defaultValue="Market">
                  <div className="flex flex-row justify-between">
                    <StyledTabsList>
                      <StyledTabsTrigger value="Market">
                        Market
                      </StyledTabsTrigger>
                      <StyledTabsTrigger value="Limit">Limit</StyledTabsTrigger>
                    </StyledTabsList>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="ml-1">
                          <Iconify icon={"ri:calculator-line"} />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="bg-0xdialog w-[630px]">
                        <DialogHeader>
                          <DialogTitle>
                            <CalculatorDropDownBox />
                          </DialogTitle>
                        </DialogHeader>
                        <StyledTabs defaultValue="PnL">
                          <StyledTabsList className="ml-4 space-x-8 border-none">
                            <StyledTabsTrigger
                              value="PnL"
                              className="p-0 text-sm"
                            >
                              PnL
                            </StyledTabsTrigger>
                            <StyledTabsTrigger
                              value="Target Price"
                              className="p-0 text-sm"
                            >
                              Target Price
                            </StyledTabsTrigger>
                            <StyledTabsTrigger
                              value="Liquidation Price"
                              className="p-0 text-sm"
                            >
                              Liquidation Price
                            </StyledTabsTrigger>
                            <StyledTabsTrigger
                              value="Entry Price"
                              className="p-0 text-sm"
                            >
                              Entry Price
                            </StyledTabsTrigger>
                          </StyledTabsList>
                          <div className="border-t border-0xline"></div>
                          <StyledTabsContent value="PnL">
                            <div className="flex flex-row gap-3">
                              <Tabs defaultValue={"short"} className="w-[60%]">
                                <TabsList style={{ width: "100%" }}>
                                  <TabsTrigger
                                    style={{ width: "50%" }}
                                    value={"long"}
                                  >
                                    Long
                                  </TabsTrigger>
                                  <TabsTrigger
                                    style={{ width: "50%" }}
                                    value={"short"}
                                  >
                                    Short
                                  </TabsTrigger>
                                </TabsList>
                                <TabsContent value="long">
                                  <div className="mt-4">
                                    <LeverageInput
                                      label="Leverage"
                                      suffix="X"
                                      value={leverageNumber.toString()}
                                      onChange={handleInputChange}
                                      type="number"
                                      min="1"
                                      max="100"
                                      className="mb-2"
                                    />
                                    <div className="mt-4">
                                      <PnLSlider
                                        defaultValue={[1]}
                                        max={100}
                                        min={1}
                                        step={1}
                                        onValueChange={handleSliderValueChange}
                                        value={[leverageNumber]}
                                        style={{
                                          marginBottom: 10,
                                          marginTop: 10,
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="mt-[45px]">
                                    <ButtonInput
                                      label="Entry Price"
                                      suffix="USDT"
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                    <LabeledInput
                                      label={"TP trigger price"}
                                      suffix={"USDT"}
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                    <LabeledInput
                                      label={"SL trigger price"}
                                      suffix={"USDT"}
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                    <LabeledInput
                                      label={"Size"}
                                      suffix={"ETH"}
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                  </div>
                                </TabsContent>
                                <TabsContent value="short">
                                  <div className="mt-4">
                                    <LeverageInput
                                      label="Leverage"
                                      suffix="X"
                                      value={leverageNumber.toString()}
                                      onChange={handleInputChange}
                                      type="number"
                                      min="1"
                                      max="100"
                                      className="mb-2"
                                    />
                                    <div className="mt-4">
                                      <PnLSlider
                                        defaultValue={[1]}
                                        max={100}
                                        min={1}
                                        step={1}
                                        onValueChange={handleSliderValueChange}
                                        value={[leverageNumber]}
                                        style={{
                                          marginBottom: 10,
                                          marginTop: 10,
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="mt-[45px]">
                                    <ButtonInput
                                      label="Entry Price"
                                      suffix="USDT"
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                    <LabeledInput
                                      label={"TP trigger price"}
                                      suffix={"USDT"}
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                    <LabeledInput
                                      label={"SL trigger price"}
                                      suffix={"USDT"}
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                    <LabeledInput
                                      label={"Size"}
                                      suffix={"ETH"}
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                  </div>
                                </TabsContent>
                                <Button className="w-full mt-4 bg-bronze hover:bg-bronze-foreground">
                                  Calculate
                                </Button>
                              </Tabs>
                              <div className="bg-black w-[50%] rounded-lg">
                                <div className="mt-2 ml-2">Result</div>
                                <div className="mx-2 my-3 border-t border-0xline"></div>
                                <div className="flex flex-col gap-2 mx-2 mb-4">
                                  <ListItem keyText={"Margin"} value={"-"} />
                                  <ListItem
                                    keyText={"Risk / Reward"}
                                    value={"-"}
                                  />
                                  <ListItem keyText={"TP PnL"} value={"-"} />
                                  <ListItem keyText={"TP PnL%"} value={"-"} />
                                  <ListItem keyText={"SL PnL"} value={"-"} />
                                  <ListItem keyText={"SL PnL%"} value={"-"} />
                                </div>
                                <div className="mx-2 my-3 border-t border-0xline"></div>
                                <div className="mx-3 my-2 text-xs text-0xgrey">
                                  The risk/reward ratio is calculated by
                                  dividing the potential risk in trading by the
                                  expected rewards. The calculation formula is:
                                  Risk/Reward Ratio = (Entry Price - Stop Loss
                                  Trigger Price) / (Take Profit Trigger Price -
                                  Entry Price) * 100%
                                </div>
                              </div>
                            </div>
                            <div className="mt-2 text-sm text-0xgrey">
                              *The calculation is for reference only and does
                              not include trading fee, execution fee and other
                              actual costs.
                            </div>
                          </StyledTabsContent>
                          <StyledTabsContent value="Target Price">
                            <div className="flex flex-row gap-3">
                              <Tabs defaultValue={"short"} className="w-[60%]">
                                <TabsList style={{ width: "100%" }}>
                                  <TabsTrigger
                                    style={{ width: "50%" }}
                                    value={"long"}
                                  >
                                    Long
                                  </TabsTrigger>
                                  <TabsTrigger
                                    style={{ width: "50%" }}
                                    value={"short"}
                                  >
                                    Short
                                  </TabsTrigger>
                                </TabsList>
                                <TabsContent value="long">
                                  <div className="mt-4">
                                    <LeverageInput
                                      label="Leverage"
                                      suffix="X"
                                      value={leverageNumber.toString()}
                                      onChange={handleInputChange}
                                      type="number"
                                      min="1"
                                      max="100"
                                      className="mb-2"
                                    />
                                    <div className="mt-4">
                                      <PnLSlider
                                        defaultValue={[1]}
                                        max={100}
                                        min={1}
                                        step={1}
                                        onValueChange={handleSliderValueChange}
                                        value={[leverageNumber]}
                                        style={{
                                          marginBottom: 10,
                                          marginTop: 10,
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="mt-[45px]">
                                    <ButtonInput
                                      label="Entry Price"
                                      suffix="USDT"
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                    <LabeledInput
                                      label={"PnL%"}
                                      suffix={"%"}
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                  </div>
                                </TabsContent>
                                <TabsContent value="short">
                                  <div className="mt-4">
                                    <LeverageInput
                                      label="Leverage"
                                      suffix="X"
                                      value={leverageNumber.toString()}
                                      onChange={handleInputChange}
                                      type="number"
                                      min="1"
                                      max="100"
                                      className="mb-2"
                                    />
                                    <div className="mt-4">
                                      <PnLSlider
                                        defaultValue={[1]}
                                        max={100}
                                        min={1}
                                        step={1}
                                        onValueChange={handleSliderValueChange}
                                        value={[leverageNumber]}
                                        style={{
                                          marginBottom: 10,
                                          marginTop: 10,
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="mt-[45px]">
                                    <ButtonInput
                                      label="Entry Price"
                                      suffix="USDT"
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                    <LabeledInput
                                      label={"PnL%"}
                                      suffix={"%"}
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                  </div>
                                </TabsContent>
                                <Button className="w-full mt-28 bg-bronze hover:bg-bronze-foreground">
                                  Calculate
                                </Button>
                              </Tabs>
                              <div className="bg-black w-[50%] rounded-lg">
                                <div className="mt-2 ml-2">Result</div>
                                <div className="mx-2 my-3 border-t border-0xline"></div>
                                <div className="flex flex-col gap-2 mx-2 mb-4">
                                  <ListItem
                                    keyText={"Target Price"}
                                    value={"-"}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="mt-2 text-sm text-0xgrey">
                              *The calculation is for reference only and does
                              not include trading fee, execution fee and other
                              actual costs.
                            </div>
                          </StyledTabsContent>
                          <StyledTabsContent value="Liquidation Price">
                            <div className="flex flex-row gap-3">
                              <Tabs defaultValue={"short"} className="w-[60%]">
                                <TabsList style={{ width: "100%" }}>
                                  <TabsTrigger
                                    style={{ width: "50%" }}
                                    value={"long"}
                                  >
                                    Long
                                  </TabsTrigger>
                                  <TabsTrigger
                                    style={{ width: "50%" }}
                                    value={"short"}
                                  >
                                    Short
                                  </TabsTrigger>
                                </TabsList>
                                <TabsContent value="long">
                                  <div className="mt-4">
                                    <ButtonInput
                                      label="Entry Price"
                                      suffix="USDT"
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                    <LabeledInput
                                      label={"Size"}
                                      suffix={"ETH"}
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                    <LabeledInput
                                      label={"Balance"}
                                      suffix={"USDT"}
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                      tooltipContent={
                                        <span>
                                          Simulated position net value. Balance
                                          = Margin + Unrealized PnL
                                        </span>
                                      }
                                    />
                                  </div>
                                </TabsContent>
                                <TabsContent value="short">
                                  <div className="mt-4">
                                    <ButtonInput
                                      label="Entry Price"
                                      suffix="USDT"
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                    <LabeledInput
                                      label={"Size"}
                                      suffix={"ETH"}
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                    />
                                    <LabeledInput
                                      label={"Balance"}
                                      suffix={"USDT"}
                                      value={0}
                                      type="number"
                                      className="mb-2"
                                      tooltipContent={
                                        <span>
                                          Simulated position net value. Balance
                                          = Margin + Unrealized PnL
                                        </span>
                                      }
                                    />
                                  </div>
                                </TabsContent>
                                <Button className="w-full mt-[169px] bg-bronze hover:bg-bronze-foreground">
                                  Calculate
                                </Button>
                              </Tabs>
                              <div className="bg-black w-[50%] rounded-lg">
                                <div className="mt-2 ml-2">Result</div>
                                <div className="mx-2 my-3 border-t border-0xline"></div>
                                <div className="flex flex-col gap-2 mx-2 mb-4">
                                  <ListItem
                                    keyText={"Liquidation Price"}
                                    value={"-"}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="mt-2 text-sm text-0xgrey">
                              *The calculation is for reference only and does
                              not include trading fee, execution fee and other
                              actual costs.
                            </div>
                          </StyledTabsContent>
                          <StyledTabsContent value="Entry Price">
                            <div className="flex flex-row gap-3">
                              <Tabs defaultValue={"short"} className="w-[60%]">
                                <TabsList style={{ width: "100%" }}>
                                  <TabsTrigger
                                    style={{ width: "50%" }}
                                    value={"long"}
                                  >
                                    Long
                                  </TabsTrigger>
                                  <TabsTrigger
                                    style={{ width: "50%" }}
                                    value={"short"}
                                  >
                                    Short
                                  </TabsTrigger>
                                </TabsList>
                                <TabsContent value="long"></TabsContent>
                                <TabsContent value="short"></TabsContent>
                              </Tabs>
                              <div className="bg-black w-[50%] rounded-lg">
                                <div className="mt-2 ml-2">Result</div>
                                <div className="mx-2 my-3 border-t border-0xline"></div>
                                <div className="flex flex-col gap-2 mx-2 mb-4">
                                  <ListItem
                                    keyText={"Entry Price"}
                                    value={"-"}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="my-4 border-t border-0xline"></div>
                            <div className="flex flex-row gap-4">
                              <div className="w-[7%] flex flex-col mr-1">
                                <div className="text-sm text-0xgrey">Open</div>
                                <div className="self-center mt-3 text-0xgrey">
                                  1
                                </div>
                              </div>
                              <div className="w-[40%]">
                                <div className="text-sm text-0xgrey">
                                  Entry price
                                </div>
                                <div>
                                  <LabeledInput
                                    label={"Entry price"}
                                    suffix={"USDT"}
                                    value={0}
                                    type="number"
                                    className="mb-2"
                                  />
                                </div>
                              </div>
                              <div className="w-[40%]">
                                <div className="text-sm text-0xgrey">Size</div>
                                <div>
                                  <LabeledInput
                                    label={"Size"}
                                    suffix={"ETH"}
                                    value={0}
                                    type="number"
                                    className="mb-2"
                                  />
                                </div>
                              </div>
                              <div className="w-[10%] flex flex-col">
                                <div className="text-sm text-0xgrey">
                                  Operation
                                </div>
                                <div className="self-center mt-1 text-0xgrey">
                                  <Iconify icon={"mdi:minus-box-outline"} />
                                </div>
                              </div>
                            </div>
                            <Button className="mt-3 bg-bronze">+ Add</Button>
                            <Button className="w-full mt-[107px] bg-bronze hover:bg-bronze-foreground">
                              Calculate
                            </Button>
                            <div className="mt-2 text-sm text-0xgrey">
                              *The calculation is for reference only and does
                              not include trading fee, execution fee and other
                              actual costs.
                            </div>
                          </StyledTabsContent>
                        </StyledTabs>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <StyledTabsContent value="Market" className="ml-3">
                    <TradeMarketWidget
                      contractPriceAfter={contractPrice}
                      side={SIDE_SHORT}
                      marketAndIndexPriceData={marketAndIndexPriceData}
                    />
                  </StyledTabsContent>
                  <StyledTabsContent value="Limit" className="ml-3">
                    <TradeLimitWidget
                      side={SIDE_SHORT}
                      marketAndIndexPriceData={marketAndIndexPriceData}
                    />
                  </StyledTabsContent>
                </StyledTabs>
              </TabsContent>
            </Tabs>
          </div>
          {/* Narrow Block 2 */}
          <div className="p-6 rounded-lg bg-0xboxBackground">
            <div className="w-full">
              <div className="text-base">Token/Asset</div>
              <div className="my-3 border-t border-0xline"></div>
              <ListItem keyText="Max Leverage" value={"200x"} />
              <ListItem keyText="Average Leverage" value={"7.71x"} />
              <ListItem
                keyText="Liquidity"
                value={giveMeFormattedToShow(liquidity)}
              />
              <ListItem
                keyText="Balance Rate"
                value={`${giveMeFormattedToShow(balanceRate * 100)}%`}
              />
            </div>
          </div>
          <div className="flex flex-row w-full gap-3">
            <Button
              disabled={positionRouterPluginData as unknown as boolean}
              onClick={approvePositionRouterPluginTemp}
              className={`w-full font-bold text-center rounded-md item-center ${
                positionRouterPluginData ? "bg-0xgrey" : "bg-0xgreen"
              } h-9`}
              style={{ marginTop: 20, color: "#000000" }}
            >
              {positionRouterPluginData
                ? "PostionRouter Approved"
                : " Approve PostionRouter"}
            </Button>

            <Button
              disabled={orderBookPluginData as unknown as boolean}
              onClick={approveOrderBookPluginTemp}
              className={`w-full font-bold text-center rounded-md item-center ${
                orderBookPluginData ? "bg-0xgrey" : "bg-0xgreen"
              } h-9`}
              style={{ marginTop: 20, color: "#000000" }}
            >
              {orderBookPluginData
                ? "OrderBook Approved"
                : " Approve OrderBook"}
            </Button>
          </div>

          <div className="flex flex-row w-full gap-3">
            <Button
              disabled={isExeIncPositionLoading}
              onClick={exeIncPostionTemp}
              className="w-full font-bold text-center bg-orange-600 rounded-md item-center h-9 "
              style={{ marginTop: 20, color: "#000000" }}
            >
              {isExeIncPositionLoading ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Please wait
                </>
              ) : (
                "Exe Increase"
              )}
            </Button>

            <Button
              disabled={isExeDecPositionLoading}
              onClick={exeDecPostionTemp}
              className="w-full font-bold text-center bg-orange-300 rounded-md item-center h-9 "
              style={{ marginTop: 20, color: "#000000" }}
            >
              {isExeDecPositionLoading ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Please wait
                </>
              ) : (
                "Exe Decrease"
              )}
            </Button>

            {/* <Button
              disabled={isApprovePending}
              onClick={exeApproveTemp}
              className="w-full font-bold text-center bg-blue-500 rounded-md item-center h-9 "
              style={{ marginTop: 20, color: "#000000" }}
            >
              {isApprovePending ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Please wait
                </>
              ) : (
                "Approve Token"
              )}
            </Button> */}
          </div>
        </div>
      </div>
    </section>
  )
}
