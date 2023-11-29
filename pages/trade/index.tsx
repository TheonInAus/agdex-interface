"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Decimal from "decimal.js"

import { siteConfig } from "@/config/site"
import { useCreateIncreasePostion } from "@/hooks/actionTradePosition"
import { ethPoolAddress } from "@/hooks/zAddressHelper"
import { SIDE_LONG, to0xxPriceX96 } from "@/hooks/zContractConstantsHelper"
import { Button, buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { InputBox } from "@/components/ui/inputBox"
import { ListItem } from "@/components/ui/listItem"
import { Slider } from "@/components/ui/slider"
import { Stats } from "@/components/ui/stats"
import {
  StyledTabs,
  StyledTabsContent,
  StyledTabsList,
  StyledTabsTrigger,
} from "@/components/ui/styledTab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TradingViewWidget from "@/components/tradingView"
import RootLayout from "@/app/layout"

export default function TradePage() {
  const indexPrice = "57.5938"
  const ethPrice = "2333"
  const [activeTab, setActiveTab] = useState("long")
  const [usdMargin, setUsdMargin] = useState("")
  const [usdAfterMargin, setUsdAfterMargin] = useState("")
  const [tradingSize, setTradingSize] = useState("")
  const [leverageNumber, setLeverageNumber] = useState(1)

  console.log("check ethPoolAddress => ", ethPoolAddress)

  // const { incPositionData, incPositionLoading, incPositionWrite } =
  //   useCreateIncreasePostion(
  //     ethPoolAddress,
  //     SIDE_LONG,
  //     usdMargin,
  //     tradingSize,
  //     to0xxPriceX96("2005")
  //   )

  useEffect(() => {
    if (usdAfterMargin !== "") {
      const tradingSize = new Decimal(usdAfterMargin)
        .dividedBy(new Decimal(ethPrice))
        .toFixed(18)
        .toString()
      setTradingSize(tradingSize)
    } else {
      setTradingSize("")
    }
  }, [usdAfterMargin])

  const handleSliderValueChange = (value: any) => {
    setLeverageNumber(value)
  }

  const handleIncPostionTemp = () => {
    incPositionWrite()
  }

  useEffect(() => {
    if (usdMargin !== "") {
      const tempMargin = parseFloat(usdMargin)
      setUsdAfterMargin(
        (isNaN(tempMargin) ? 0 : tempMargin * leverageNumber).toString()
      )
    } else {
      setTradingSize("")
    }
  }, [leverageNumber, usdMargin])

  // const [inputValue, setInputValue] = React.useState(""); // This will hold the value of the input

  // // Define a handler for when the input changes
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value);
  // };

  return (
    <RootLayout>
      <section className="container flex justify-center items-center gap-6 pt-6 pb-8">
        <div className="flex flex-row">
          {/* Left Column */}
          <div className="px-3 mb-6 basis-auto">
            {/* Wide Block 1 */}
            <div
              className="p-6 mb-6 rounded-lg bg-0xboxBackground"
              style={{ width: 900, height: 600 }}
            >
              <div className="flex">
                <div className="text-lg mr-10 mt-1">Token/Asset</div>
                <div className="text-lg text-0xredLighter mr-10 mt-1">
                  Price
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
              <div className="border-t border-0xline my-5"></div>
              <TradingViewWidget />
            </div>
            {/* Wide Block 2 */}
            <div className="p-6 rounded-lg bg-0xboxBackground">
              <StyledTabs
                defaultValue="Position"
                className="my-custom-class-for-tabs"
              >
                <StyledTabsList aria-label="Manage your account">
                  <StyledTabsTrigger
                    value="Position"
                  >
                    Position  
                  </StyledTabsTrigger>
                  <StyledTabsTrigger
                    value="Orders"
                  >
                    Orders
                  </StyledTabsTrigger>
                  <StyledTabsTrigger
                    value="History"
                  >
                    History
                  </StyledTabsTrigger>
                </StyledTabsList>
                <StyledTabsContent
                  value="Position"
                  className="ml-3"
                >
                  {/* Content for Position tab */}
                  <div className="border-t border-0xline mt-2 mb-4"></div>
                  <div>Position tab content goes here.</div>
                </StyledTabsContent>
                <StyledTabsContent
                  value="Orders"
                  className="ml-3"
                >
                  {/* Content for Orders tab */}
                  <div className="border-t border-0xline mt-2 mb-4"></div>
                  <div>Orders tab content goes here.</div>
                </StyledTabsContent>
                <StyledTabsContent
                  value="History"
                  className="ml-3"
                >
                  {/* Content for History tab */}
                  <div className="border-t border-0xline mt-2 mb-4"></div>
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
                <TabsList style={{ marginBottom: 20, width: "100%" }}>
                  <TabsTrigger style={{ width: "50%" }} value={"long"}>
                    Long
                  </TabsTrigger>
                  <TabsTrigger style={{ width: "50%" }} value={"short"}>
                    Short
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="long">
                  <div className="w-full">
                    <InputBox
                      title="Pay"
                      value={usdMargin}
                      suffix="USDT"
                      onValueChange={(e) => {
                        setUsdMargin(e.target.value)
                      }}
                    />
                    <br></br>
                    <InputBox
                      title="Size"
                      value={tradingSize}
                      suffix="ETH"
                      prefix={`Leverage:`}
                      prefixValue={leverageNumber}
                      onValueChange={(e) => {
                        // setUsdMargin(e.target.value)
                      }}
                      onPrefixChange={(e) => {
                        const intValue = parseInt(e.target.value, 10)

                        if (!isNaN(intValue)) {
                          setLeverageNumber(intValue)
                        } else if (intValue < 1) {
                          setLeverageNumber(1)
                        } else if (intValue > 200) {
                          setLeverageNumber(200)
                        } else {
                          setLeverageNumber(1)
                        }
                      }}
                    />
                    <br></br>
                    <div>
                      <div
                        className="flex flex-row items-center justify-between"
                        style={{ marginBottom: 10 }}
                      >
                        <div className="text-sm">Leverage Slider</div>
                        <Checkbox />
                      </div>
                      <Slider
                        defaultValue={[1]}
                        onValueChange={handleSliderValueChange}
                        max={200}
                        min={1}
                        step={1}
                        value={[leverageNumber]}
                        style={{ marginBottom: 10 }}
                      />
                    </div>
                    <br></br>
                    <ListItem keyText="Entry Price" value={""} />
                    <ListItem keyText="Price Impact" value={""} />
                    <ListItem
                      keyText="Acceptable Price"
                      value={""}
                      percentage="0.30%"
                    />
                    <ListItem keyText="Liq. Price" value={""} />
                    <ListItem keyText="Est. Margin" value={""} />
                    <ListItem keyText="Fees" value={""} />
                  </div>
                  <button
                    onClick={handleIncPostionTemp}
                    className="item-center text-center bg-0xgreen w-full rounded-md h-9"
                    style={{ marginTop: 20, color: "#000000" }}
                  >
                    Long
                  </button>
                </TabsContent>
                <TabsContent value="short">
                  <div className="w-full">
                    <InputBox
                      title="Pay"
                      value={usdMargin}
                      suffix="USDT"
                      onValueChange={(e) => {
                        setUsdMargin(e.target.value)
                      }}
                    />
                    <br></br>
                    <InputBox
                      title="Size"
                      value={tradingSize}
                      suffix="ETH"
                      prefix={`Leverage:${leverageNumber}x`}
                      onValueChange={(e) => {
                        //   setUsdMargin(e.target.value)
                      }}
                    />
                    <br></br>
                    <div>
                      <div
                        className="flex flex-row items-center justify-between"
                        style={{ marginBottom: 10 }}
                      >
                        <div className="text-sm">Leverage Slider</div>
                        <Checkbox />
                      </div>
                      <Slider
                        defaultValue={[1]}
                        onValueChange={handleSliderValueChange}
                        max={200}
                        min={1}
                        step={1}
                        style={{ marginBottom: 10 }}
                      />
                    </div>
                    <br></br>
                    <ListItem keyText="Entry Price" value={""} />
                    <ListItem keyText="Price Impact" value={""} />
                    <ListItem
                      keyText="Acceptable Price"
                      value={""}
                      percentage="0.30%"
                    />
                    <ListItem keyText="Liq. Price" value={""} />
                    <ListItem keyText="Est. Margin" value={""} />
                    <ListItem keyText="Fees" value={""} />
                  </div>
                  <button
                    className="item-center text-center w-full bg-0xredLighter rounded-md h-9"
                    style={{
                      marginTop: 20,
                      backgroundColor: "#FF4A4A",
                      color: "#000000",
                    }}
                  >
                    Short
                  </button>
                </TabsContent>
              </Tabs>
            </div>
            {/* Narrow Block 2 */}
            <div className="p-6 rounded-lg bg-0xboxBackground">
              <div className="w-full">
                <div className="text-base">Token/Asset</div>
                <div className="border-t border-0xline my-3"></div>
                <ListItem keyText="Max Leverage" value={"200x"} />
                <ListItem keyText="Average Leverage" value={"7.71x"} />
                <ListItem keyText="Liquidity" value={"26,601,123.63"} />
                <ListItem keyText="Balance Rate" value={"-0.08%"} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </RootLayout>
  )
}
