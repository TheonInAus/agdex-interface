"use client"

import React, { useEffect, useState } from "react"
import { usePriceData } from "@/chainio/usePriceData"
import useTokenStore from "@/chainio/useTokenStore"
import { useWallet } from "@aptos-labs/wallet-adapter-react"

import { Card } from "@/components/ui/card"
import { ListItem } from "@/components/ui/listItem"
import {
  StyledTabs,
  StyledTabsContent,
  StyledTabsList,
  StyledTabsTrigger,
} from "@/components/ui/styledTab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TradeLimitWidget from "@/components/ui/tradeWidget/tradeLimitWidget"
import TradeMarketWidget from "@/components/ui/tradeWidget/tradeMarketWidget"
import TradeSwapWidget from "@/components/ui/tradeWidget/tradeSwapWidget"

import TradeCalculatorWidget from "./tradeCalculator"
import TradeHeaderWidget from "./tradeHeaderMain"
import TradePositionWidget from "./tradePositionWidget"
import TradeTradingViewWidget from "./tradeTradingView"

interface MarketData {
  [key: string]: {
    markPrice: string
    indexPrice: string
    price24hPcnt: string
  }
}

export default function TradePage() {
  const { symbol } = useTokenStore()
  const { priceData, error } = usePriceData(
    symbol.pythFeederAddress,
    symbol.decimal
  )
  const [priceType, setPriceType] = useState(false)
  const [lastPrice, setLastPrice] = useState(0)

  useEffect(() => {
    if (priceData) {
      if (priceData >= lastPrice) {
        setPriceType(true)
      } else {
        setPriceType(false)
      }
      setLastPrice(priceData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceData])

  return (
    <section className="flex items-center justify-center pt-6">
      <div className="flex flex-col">
        <TradeHeaderWidget priceType={priceType} priceData={priceData} />
        <div className="flex flex-row justify-center gap-2">
          <div className="flex flex-col mt-2">
            <TradeTradingViewWidget />
            <TradePositionWidget tokenPrice={priceData} />
          </div>
          <div className="mt-2">
            {/* Narrow Block 1 */}
            <Card style={{ width: 372 }} className="py-5">
              <Tabs defaultValue={"long"}>
                <TabsList style={{ width: "100%" }}>
                  <TabsTrigger style={{ width: "33%" }} value={"long"}>
                    Long
                  </TabsTrigger>
                  <TabsTrigger style={{ width: "33%" }} value={"short"}>
                    Short
                  </TabsTrigger>
                  <TabsTrigger style={{ width: "33%" }} value={"swap"}>
                    Swap
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="long">
                  <StyledTabs defaultValue="Market">
                    <div className="flex flex-row items-center justify-between mt-6">
                      <StyledTabsList>
                        <StyledTabsTrigger value="Market">
                          Market
                        </StyledTabsTrigger>
                        <StyledTabsTrigger value="Limit">
                          Limit
                        </StyledTabsTrigger>
                      </StyledTabsList>
                      <TradeCalculatorWidget />
                    </div>
                    <StyledTabsContent value="Market">
                      <TradeMarketWidget side={"LONG"} tokenPrice={priceData} />
                    </StyledTabsContent>
                    <StyledTabsContent value="Limit">
                      <TradeLimitWidget
                        side={1}
                        marketAndIndexPriceData={1}
                        tokenPrice={priceData}
                      />
                    </StyledTabsContent>
                  </StyledTabs>
                </TabsContent>
                <TabsContent value="short">
                  <StyledTabs defaultValue="Market">
                    <div className="flex flex-row items-center justify-between mt-6">
                      <StyledTabsList>
                        <StyledTabsTrigger value="Market">
                          Market
                        </StyledTabsTrigger>
                        <StyledTabsTrigger value="Limit">
                          Limit
                        </StyledTabsTrigger>
                      </StyledTabsList>
                      <TradeCalculatorWidget />
                    </div>
                    <StyledTabsContent value="Market">
                      <TradeMarketWidget
                        tokenPrice={priceData}
                        side={"SHORT"}
                      />
                    </StyledTabsContent>
                    <StyledTabsContent value="Limit">
                      <TradeLimitWidget
                        side={0}
                        marketAndIndexPriceData={0}
                        tokenPrice={priceData}
                      />
                    </StyledTabsContent>
                  </StyledTabs>
                </TabsContent>
                <TabsContent value="swap">
                  <StyledTabs defaultValue="Market"></StyledTabs>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
