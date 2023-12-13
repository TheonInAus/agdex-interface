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
import { useTokenMarketPrice, useTokenPrice } from "@/hooks/cTokenState"
import { useBtcMarketPrice, useGetPoolPriceState } from "@/hooks/usePrice"
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
import TradingViewWidget from "@/components/tradingView"

import { OrderListWidget } from "./orderListWidget"
import { PositionListWidget } from "./positionListWidget"
import { TradeLimitWidget } from "./tradeLimitWidget"
import { TradeMarketWidget } from "./tradeMarketWidget"

export default function TradePage() {
  const { marketPriceData } = useTokenMarketPrice(btcPoolAddress)
  console.log(
    "check btc long => ",
    x96Price2Readable(BigInt(marketPriceData.marketPriceForLong))
  )

  console.log(
    "check btc short => ",
    x96Price2Readable(BigInt(marketPriceData.marketPriceForLong))
  )

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

  const [tokenPrice, setTokenPrice] = useState("0")
  const { maxPrice, minPrice } = useTokenPrice(ethTokenAddress)
  console.log("check lastest price short => ", maxPrice, minPrice)

  const { price: indexPrice, change24h } = useBtcMarketPrice()

  const { premiumRateX96 } = useGetPoolPriceState(btcPoolAddress)
  console.log("check premiumRateX96 => ", premiumRateX96)

  const contractPrice = indexPrice + premiumRateX96

  useEffect(() => {
    if (maxPrice) {
      setTokenPrice(maxPrice)
    }
  }, [maxPrice])

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
            style={{ width: 950, height: 600 }}
          >
            <div className="flex">
              <div className="mt-1 mr-10 text-lg">BTC/USDX</div>
              <div className="mt-1 mr-10 text-lg text-0xredLighter">
                {giveMeFormattedToShow(contractPrice)}
              </div>
              <Stats
                title={"Index Price"}
                value={giveMeFormattedToShow(indexPrice)}
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
                  <p>llll</p>
                </CustomTooltip>
                <div className="flex mt-1">
                  <div className="mr-1 text-sm text-0xyellow-lighter">
                    20.10k SOL
                  </div>
                  <div className="text-sm text-0xgrey">($1,144,535.35)</div>
                </div>
              </div>
            </div>
            <div className="my-5 border-t border-0xline"></div>
            <TradingViewWidget />
          </div>
          {/* Wide Block 2 */}
          <div
            className="p-4 pb-16 rounded-lg bg-0xboxBackground"
            style={{ width: 950 }}
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
              <ListItem keyText="Liquidity" value={"26,601,123.63"} />
              <ListItem keyText="Balance Rate" value={"-0.08%"} />
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
