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
import { useTokenPrice } from "@/hooks/cTokenState"
import { ethTokenAddress } from "@/hooks/zAddressHelper"
import {
  SIDE_LONG,
  SIDE_SHORT,
  giveMeFormattedToShow,
} from "@/hooks/zContractHelper"
import { Button } from "@/components/ui/button"
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

import { PositionListWidget } from "./positionListWidget"
import { TradeLimitWidget } from "./tradeLimitWidget"
import { TradeMarketWidget } from "./tradeMarketWidget"

export default function TradePage() {
  const indexPrice = "57.5938"

  const { approvePluginData, approvePluginLoading, approvePluginWrite } =
    useApprovePlugin()

  const {
    data: pluginData,
    isLoading: isPluginLoading,
    isError: isPluginError,
  } = useCheckPluginState()

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

  const approvePluginTemp = () => {
    approvePluginWrite()
  }

  const [tokenPrice, setTokenPrice] = useState("0")
  const { maxPrice, minPrice } = useTokenPrice(ethTokenAddress)
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
              <div className="mt-1 mr-10 text-lg">ETH/USDX</div>
              <div className="mt-1 mr-10 text-lg text-0xredLighter">
                {giveMeFormattedToShow(Number(tokenPrice) || 0)}
              </div>
              <Stats title={"Index Price"} value={indexPrice} />
              <Stats
                title={"24h Change"}
                value={"-2.01%"}
                textColor={"text-0xredLighter"}
              />
              <Stats
                title={"1h Funding"}
                value={"+0.001250%"}
                textColor={"text-0xyellow-lighter"}
                additionalText={"(27:15)"}
                info={"lll"}
              />
              <Stats
                title={"Open Interest"}
                value={"20.10k SOL"}
                textColor={"text-0xyellow-lighter"}
                additionalText={"($1,144,535.35)"}
                info={"lll"}
              />
            </div>
            <div className="my-5 border-t border-0xline"></div>
            <TradingViewWidget />
          </div>
          {/* Wide Block 2 */}
          <div className="p-4 pb-16 rounded-lg bg-0xboxBackground">
            <StyledTabs defaultValue="Position">
              <StyledTabsList aria-label="Manage your account">
                <StyledTabsTrigger value="Position">Position</StyledTabsTrigger>
                <StyledTabsTrigger value="Orders">Orders</StyledTabsTrigger>
                <StyledTabsTrigger value="History">History</StyledTabsTrigger>
              </StyledTabsList>
              <StyledTabsContent value="Position" className="ml-3">
                <PositionListWidget />
              </StyledTabsContent>
              <StyledTabsContent value="Orders" className="ml-3">
                {/* Content for Orders tab */}
                <div className="mt-2 mb-4 border-t border-0xline"></div>
                <div>Orders tab content goes here.</div>
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
          <Button
            disabled={!pluginData as unknown as boolean}
            onClick={approvePluginTemp}
            className={`w-full font-bold text-center rounded-md item-center ${
              pluginData ? "bg-0xgrey" : "bg-0xgreen"
            } h-9`}
            style={{ marginTop: 20, color: "#000000" }}
          >
            {pluginData ? "Plugin Has Been Approved" : " Approve Plugin"}
          </Button>

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
