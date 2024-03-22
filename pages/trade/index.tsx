"use client"

import React, { useEffect, useState } from "react"

import {
  useApprovePlugin,
  useCheckPluginState,
} from "@/hooks/actionApprovePlugin"
import {
  useExeDecreasePosition,
  useExeIncreasePosition,
} from "@/hooks/actionMixExecutorHelper"
import { usePositionAndLiqPositionInfo } from "@/hooks/cPositionState"
import {
  useGlobalFundingRate,
  useMarketPriceState,
  useTokenMarketAndIndexPriceMock,
} from "@/hooks/usePrice"
import useTokenConfigStore from "@/hooks/useTokenConfigStore"
import { orderBookAddress, positionRouterAddress } from "@/hooks/zAddressHelper"
import {
  SIDE_LONG,
  SIDE_SHORT,
  giveMeFormattedToShow,
  x96Price2Readable,
} from "@/hooks/zContractHelper"
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

// 假设 marketAndIndexPriceData 类型如下
interface MarketAndIndexPriceData {
  indexPrices: MarketData
  markPrices: MarketData
  change24h: number
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
  } = useTokenMarketAndIndexPriceMock()

  const [shownIndexPrice, setShownIndexPrice] = useState<number>(0)
  const [change24h, setChange24h] = useState<number>(0)
  useEffect(() => {
    if (marketAndIndexPriceData && currentTokenEntity?.name) {
      const tokenName = currentTokenEntity.name as string
      const indexPrices = marketAndIndexPriceData.indexPrices as MarketData
      const markPrices = marketAndIndexPriceData.markPrices as MarketData

      if (indexPrices[tokenName] && markPrices[tokenName]) {
        const indexPrice = indexPrices[tokenName].indexPrice
        const price24hPcnt = indexPrices[tokenName].price24hPcnt

        setShownIndexPrice(Number(indexPrice))
        setChange24h(+price24hPcnt)
      }
    }
  }, [marketAndIndexPriceData, currentTokenEntity])

  const premiumRateX96 = 0.000182
  // const { cumulativePremiumRateX96 } = useGlobalFundingRate(
  //   currentTokenEntity.market
  // )
  const contractPrice = shownIndexPrice * (1 + premiumRateX96)

  const [lastContractPrice, setLastContractPrice] = useState(0)
  const [priceType, setPriceType] = useState(false)
  useEffect(() => {
    setPriceType(contractPrice > lastContractPrice)
    setLastContractPrice(contractPrice)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractPrice])
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
  } = usePositionAndLiqPositionInfo(currentTokenEntity.market)

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
    <section className="flex items-center justify-center pt-6">
      <div className="flex flex-col">
        <TradeHeaderWidget
          priceType={priceType}
          contractPrice={contractPrice}
          shownIndexPrice={shownIndexPrice}
          change24h={change24h}
          openInterst={openInterst}
          openInterstValue={openInterstValue}
        />
        <div className="flex flex-row gap-2 justify-center">
          <div className="flex flex-col mt-2">
            <TradeTradingViewWidget />
            <TradePositionWidget contractPrice={contractPrice} />
          </div>
          <div className="mt-2">
            {/* Narrow Block 1 */}
            <Card style={{ width: 372 }}>
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
                        side={SIDE_LONG}
                        marketAndIndexPriceData={marketAndIndexPriceData}
                        contractPriceAfter={contractPrice}
                      />
                    </StyledTabsContent>
                    <StyledTabsContent value="Limit">
                      <TradeLimitWidget
                        side={SIDE_LONG}
                        marketAndIndexPriceData={marketAndIndexPriceData}
                        contractPriceAfter={contractPrice}
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
                        contractPriceAfter={contractPrice}
                        side={SIDE_SHORT}
                        marketAndIndexPriceData={marketAndIndexPriceData}
                      />
                    </StyledTabsContent>
                    <StyledTabsContent value="Limit">
                      <TradeLimitWidget
                        side={SIDE_SHORT}
                        marketAndIndexPriceData={marketAndIndexPriceData}
                        contractPriceAfter={contractPrice}
                      />
                    </StyledTabsContent>
                  </StyledTabs>
                </TabsContent>
                <TabsContent value="swap">
                  <StyledTabs defaultValue="Market">
                    <div className="flex flex-row justify-between mt-6">
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
                      <TradeSwapWidget
                        contractPriceAfter={contractPrice}
                        side={SIDE_SHORT}
                        marketAndIndexPriceData={marketAndIndexPriceData}
                      />
                    </StyledTabsContent>
                    <StyledTabsContent value="Limit">
                      <TradeSwapWidget
                        side={SIDE_SHORT}
                        marketAndIndexPriceData={marketAndIndexPriceData}
                        contractPriceAfter={contractPrice}
                      />
                    </StyledTabsContent>
                  </StyledTabs>
                </TabsContent>
              </Tabs>
            </Card>
            {/* Narrow Block 2 */}
            <Card className="mt-2" style={{ width: 372 }}>
              <div className="w-full">
                <div className="mt-1 text-lg font-bold">Token/Asset</div>
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
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
