"use client"

import React, { useEffect, useState } from "react"
import { PriceResultType, usePriceData } from "@/chainio/usePriceData"
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

export default function TradePage() {
  const { symbol, vault } = useTokenStore()
  const { priceDatas, error } = usePriceData()
  const [vaultPrice, setVaultPrice] = useState<number>(0)
  const [symbolPrice, setSymbolPrice] = useState<number>(0)

  useEffect(() => {
    if (priceDatas && priceDatas.length > 0) {
      const vaultData = priceDatas.find(
        (item) => item.tokenName === vault.name
      ) as unknown as PriceResultType
      const symbolData = priceDatas.find(
        (item) => item.tokenName === symbol.tokenName
      ) as unknown as PriceResultType
      setVaultPrice(vaultData.price)
      setSymbolPrice(symbolData.price)
    }
  }, [priceDatas, vault, symbol])

  const [priceType, setPriceType] = useState(false)
  const [lastPrice, setLastPrice] = useState(0)

  useEffect(() => {
    if (symbolPrice) {
      if (symbolPrice >= lastPrice) {
        setPriceType(true)
      } else {
        setPriceType(false)
      }
      setLastPrice(symbolPrice)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbolPrice])

  return (
    <section className="flex items-center justify-center pt-6">
      <div className="flex flex-col">
        <TradeHeaderWidget priceType={priceType} priceData={symbolPrice} />
        <div className="flex flex-row justify-center gap-2">
          <div className="flex flex-col mt-2">
            <TradeTradingViewWidget />
            <TradePositionWidget
              symbolPrice={symbolPrice}
              vaultPrice={vaultPrice}
            />
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
                      <TradeMarketWidget
                        side={"LONG"}
                        symbolPrice={symbolPrice}
                        vaultPrice={vaultPrice}
                      />
                    </StyledTabsContent>
                    <StyledTabsContent value="Limit">
                      <TradeLimitWidget
                        side={1}
                        marketAndIndexPriceData={1}
                        tokenPrice={symbolPrice}
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
                        symbolPrice={symbolPrice}
                        vaultPrice={vaultPrice}
                        side={"SHORT"}
                      />
                    </StyledTabsContent>
                    <StyledTabsContent value="Limit">
                      <TradeLimitWidget
                        side={0}
                        marketAndIndexPriceData={0}
                        tokenPrice={symbolPrice}
                      />
                    </StyledTabsContent>
                  </StyledTabs>
                </TabsContent>
                <TabsContent value="swap">
                  <TradeSwapWidget sourcePrice={1} destinationPrice={1} />
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
