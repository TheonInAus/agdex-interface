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
  useTokenMarketPrice,
} from "@/hooks/usePrice"
import useTokenConfigStore from "@/hooks/useTokenConfigStore"
import {
  btcPoolAddress,
  btcTokenAddress,
  ethPoolAddress,
  ethTokenAddress,
  orderBookAddress,
  positionRouterAddress,
} from "@/hooks/zAddressHelper"
import {
  SIDE_LONG,
  SIDE_SHORT,
  giveMeFormattedToShow,
  x96Price2Readable,
} from "@/hooks/zContractHelper"
import { Button } from "@/components/ui/button"
import { CustomTooltip } from "@/components/ui/customToolTip"
import { ListItem } from "@/components/ui/listItem"
import { Stats } from "@/components/ui/stats"
import {
  StyledTabs,
  StyledTabsContent,
  StyledTabsList,
  StyledTabsTrigger,
} from "@/components/ui/styledTab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DropDownBox from "@/components/ui/tradeWidget/dropDownBox"
import OrderListWidget from "@/components/ui/tradeWidget/orderListWidget"
import PositionListWidget from "@/components/ui/tradeWidget/positionListWidget"
import TradeLimitWidget from "@/components/ui/tradeWidget/tradeLimitWidget"
import TradeMarketWidget from "@/components/ui/tradeWidget/tradeMarketWidget"
import TradingViewWidget from "@/components/tradingView"

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
          ? +marketAndIndexPriceData?.indexPrices?.[currentTokenEntity.name]
          : 0
      )
      setChange24h(24)
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
  console.log("check all", lpNetSize, longSize, shortSize)

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
              <div className="mr-8 text-lg">
                <DropDownBox />
              </div>
              <div className="mt-1 mr-10 text-lg text-0xredLighter">
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
                  <StyledTabsList aria-label="Manage your account">
                    <StyledTabsTrigger value="Market">Market</StyledTabsTrigger>
                    <StyledTabsTrigger value="Limit">Limit</StyledTabsTrigger>
                  </StyledTabsList>
                  <StyledTabsContent value="Market" className="ml-3">
                    <TradeMarketWidget side={SIDE_LONG} />
                  </StyledTabsContent>
                  <StyledTabsContent value="Limit" className="ml-3">
                    <TradeLimitWidget side={SIDE_LONG} />
                  </StyledTabsContent>
                </StyledTabs>
              </TabsContent>
              <TabsContent value="short">
                <StyledTabs defaultValue="Market">
                  <StyledTabsList aria-label="Manage your account">
                    <StyledTabsTrigger value="Market">Market</StyledTabsTrigger>
                    <StyledTabsTrigger value="Limit">Limit</StyledTabsTrigger>
                  </StyledTabsList>
                  <StyledTabsContent value="Market" className="ml-3">
                    <TradeMarketWidget side={SIDE_SHORT} />
                  </StyledTabsContent>
                  <StyledTabsContent value="Limit" className="ml-3">
                    <TradeLimitWidget side={SIDE_SHORT} />
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
          </div>
        </div>
      </div>
    </section>
  )
}
