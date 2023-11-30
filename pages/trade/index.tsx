"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Decimal from "decimal.js"
import { Edit3, ExternalLink, Loader } from "lucide-react"

import { siteConfig } from "@/config/site"
import {
  useUserPositionsLONG,
  useUserPositionsSHORT,
  useUserUsdxBalance,
} from "@/hooks/aUserState"
import { useCreateIncreasePostion } from "@/hooks/actionTradePosition"
import { ethPoolAddress } from "@/hooks/zAddressHelper"
import { SIDE_LONG, to0xxPriceX96 } from "@/hooks/zContractConstantsHelper"
import { Button, buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { InputBox } from "@/components/ui/inputBox"
import { ListItem } from "@/components/ui/listItem"
import { PositionItem } from "@/components/ui/positionItem"
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

export default function TradePage() {
  const indexPrice = "57.5938"
  const ethPrice = "2333"
  const [activeTab, setActiveTab] = useState("long")
  const [usdMargin, setUsdMargin] = useState("")
  const [usdAfterMargin, setUsdAfterMargin] = useState("")
  const [tradingSize, setTradingSize] = useState("")
  const [leverageNumber, setLeverageNumber] = useState(1)

  console.log("check ethPoolAddress => ", ethPoolAddress)

  const { incPositionData, incPositionLoading, incPositionWrite } =
    useCreateIncreasePostion(
      ethPoolAddress,
      SIDE_LONG,
      usdMargin,
      tradingSize,
      to0xxPriceX96("2005")
    )

  const {
    data: balanceData,
    isError: isBalanceError,
    isLoading: isBalanceLoading,
  } = useUserUsdxBalance()

  const {
    data: longPositionData,
    isLoading: longPositionLoading,
    isError: longPositionError,
  } = useUserPositionsLONG()

  const {
    data: shortPositionData,
    isLoading: shortPositionLoading,
    isError: shortPositionError,
  } = useUserPositionsSHORT()

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
    <section className="container flex items-center justify-center gap-6 pt-6 pb-8">
      <div className="flex flex-row">
        {/* Left Column */}
        <div className="px-3 mb-6 basis-auto">
          {/* Wide Block 1 */}
          <div
            className="p-6 mb-6 rounded-lg bg-0xboxBackground"
            style={{ width: 950, height: 600 }}
          >
            <div className="flex">
              <div className="mt-1 mr-10 text-lg">Token/Asset</div>
              <div className="mt-1 mr-10 text-lg text-0xredLighter">Price</div>
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
          <div className="p-6 rounded-lg bg-0xboxBackground">
            <StyledTabs defaultValue="Position">
              <StyledTabsList aria-label="Manage your account">
                <StyledTabsTrigger value="Position">Position</StyledTabsTrigger>
                <StyledTabsTrigger value="Orders">Orders</StyledTabsTrigger>
                <StyledTabsTrigger value="History">History</StyledTabsTrigger>
              </StyledTabsList>
              <StyledTabsContent value="Position" className="ml-3">
                {/* Content for Position tab */}
                <div className="mt-2 mb-4 border-t border-0xline"></div>

                <div className="flex flex-row gap-2">
                  <div className="text-white">Token/Asset</div>
                  <div className="text-0xgreen">
                    Long{" "}
                    {
                      "[Size (Eth number * Eth Price)/ Margin eth is 18 decimals] "
                    }
                    {Array.isArray(longPositionData) &&
                    longPositionData.length > 2 &&
                    Number(longPositionData) > 0
                      ? (
                          (longPositionData[2] * 2000n) /
                          longPositionData[1]
                        ).toString()
                      : "error"}{" "}
                    x
                  </div>
                  <div className="text-white">measure position risk</div>
                </div>
                <div className="flex flex-row gap-5">
                  <div className="flex flex-col">
                    <PositionItem
                      keyText="Size"
                      value={
                        Array.isArray(longPositionData)
                          ? longPositionData[1].toString()
                          : "error"
                      }
                    />
                    <div className="flex flex-row">
                      <PositionItem
                        keyText="Margin"
                        value={
                          Array.isArray(longPositionData)
                            ? longPositionData[0].toString()
                            : "error"
                        }
                        info="ll"
                      />
                      <button className="ml-1">
                        <Edit3
                          className="text-white text-opacity-70 hover:text-opacity-100"
                          size={13}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <PositionItem
                      keyText="Entry Price"
                      value={
                        Array.isArray(longPositionData)
                          ? longPositionData[2].toString()
                          : "error"
                      }
                    />
                    <PositionItem keyText="Lig. Price" value={""} info="ll" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <PositionItem
                        keyText="Unrealized Pnl."
                        value={""}
                        info=""
                      />
                      <ExternalLink
                        className="text-white text-opacity-70 hover:text-opacity-100 ml-1"
                        size={13}
                      />
                    </div>
                    <PositionItem
                      keyText="Net Funding"
                      value={
                        Array.isArray(longPositionData)
                          ? longPositionData[3].toString()
                          : "error"
                      }
                      info={""}
                    />
                  </div>
                  <div className="flex flex-row gap-3">
                    <Button className="bg-transparent text-white border-white border h-5 text-sm mt-3">
                      TP/SL
                    </Button>
                    <Button className="bg-transparent text-white border-white border h-5 text-sm mt-3">
                      Close
                    </Button>
                  </div>
                </div>
                {/* <div>
                  Position Margin :{" "}
                  {Array.isArray(longPositionData)
                    ? longPositionData[0].toString()
                    : "error"}
                </div>
                <div>
                  Position Size :{" "}
                  {Array.isArray(longPositionData)
                    ? longPositionData[1].toString()
                    : "error"}
                </div>
                <div>
                  Position Leverage :
                  {
                    "[Size (Eth number * Eth Price)/ Margin eth is 18 decimals] "
                  }
                  {Array.isArray(longPositionData) &&
                  longPositionData.length > 2 &&
                  Number(longPositionData) > 0
                    ? (
                        (longPositionData[2] * 2000n) /
                        longPositionData[1]
                      ).toString()
                    : "error"}
                </div>
                <div>
                  Position entryPriceX96 :{" "}
                  {Array.isArray(longPositionData)
                    ? longPositionData[2].toString()
                    : "error"}
                </div>
                <div>
                  Position entryFundingRateGrowthX96 :{" "}
                  {Array.isArray(longPositionData)
                    ? longPositionData[3].toString()
                    : "error"}
                </div> */}
                <div className="my-5 border-t border-0xline"></div>
                <div className="flex flex-row gap-2">
                  <div className="text-white">Token/Asset</div>
                  <div className="text-0xredLighter">
                    Short{" "}
                    {
                      "[Size (Eth number * Eth Price)/ Margin eth is 18 decimals] "
                    }
                    {Array.isArray(shortPositionData) &&
                    shortPositionData.length > 2 &&
                    Number(shortPositionData) > 0
                      ? (
                          (shortPositionData[2] * 2000n) /
                          shortPositionData[1]
                        ).toString()
                      : "error"}{" "}
                    x
                  </div>
                  <div className="text-white">measure position risk</div>
                </div>
                <div className="flex flex-row gap-5">
                  <div className="flex flex-col">
                    <PositionItem
                      keyText="Size"
                      value={
                        Array.isArray(shortPositionData)
                          ? shortPositionData[1].toString()
                          : "error"
                      }
                    />
                    <div className="flex flex-row">
                      <PositionItem
                        keyText="Margin"
                        value={
                          Array.isArray(longPositionData)
                            ? longPositionData[0].toString()
                            : "error"
                        }
                        info="ll"
                      />
                      <button className="ml-1">
                        <Edit3
                          className="text-white text-opacity-70 hover:text-opacity-100"
                          size={13}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <PositionItem
                      keyText="Entry Price"
                      value={
                        Array.isArray(shortPositionData)
                          ? shortPositionData[2].toString()
                          : "error"
                      }
                    />
                    <PositionItem keyText="Lig. Price" value={""} info="ll" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <PositionItem
                        keyText="Unrealized Pnl."
                        value={""}
                        info=""
                      />
                      <ExternalLink
                        className="text-white text-opacity-70 hover:text-opacity-100 ml-1"
                        size={13}
                      />
                    </div>
                    <PositionItem
                      keyText="Net Funding"
                      value={
                        Array.isArray(shortPositionData)
                          ? shortPositionData[3].toString()
                          : "error"
                      }
                    />
                  </div>
                  <div className="flex flex-row gap-3">
                    <Button className="bg-transparent text-white border-white border h-5 text-sm mt-3">
                      TP/SL
                    </Button>
                    <Button className="bg-transparent text-white border-white border h-5 text-sm mt-3">
                      Close
                    </Button>
                  </div>
                </div>
                {/* <div className="mt-1 text-0xyellow">SHORT Position</div>
                <div>
                  Position Margin :{" "}
                  {Array.isArray(shortPositionData)
                    ? shortPositionData[0].toString()
                    : "error"}
                </div>
                <div>
                  Position Size :{" "}
                  {Array.isArray(shortPositionData)
                    ? shortPositionData[1].toString()
                    : "error"}
                </div>
                <div>
                  Position Leverage :
                  {"[Size (Eth number * Eth Price)/ Margin] eth is 18 decimals"}
                  {Array.isArray(shortPositionData) &&
                  shortPositionData.length > 2 &&
                  Number(shortPositionData) > 0
                    ? (
                        (shortPositionData[2] * 2000n) /
                        shortPositionData[1]
                      ).toString()
                    : "error"}
                </div>
                <div>
                  Position entryPriceX96 :{" "}
                  {Array.isArray(shortPositionData)
                    ? shortPositionData[2].toString()
                    : "error"}
                </div>
                <div>
                  Position entryFundingRateGrowthX96 :{" "}
                  {Array.isArray(shortPositionData)
                    ? shortPositionData[3].toString()
                    : "error"}
                </div> */}
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
                    <div className="w-full">
                      <InputBox
                        title="Pay"
                        value={usdMargin}
                        suffix="USDT"
                        balanceNode={
                          isBalanceLoading ? (
                            <div>Fetching balance…</div>
                          ) : isBalanceError ? (
                            <div>Error fetching balance</div>
                          ) : (
                            <div>
                              Balance: {balanceData?.formatted}{" "}
                              {balanceData?.symbol}
                            </div>
                          )
                        }
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
                      <div className="flex">
                      <ListItem
                        className="flex gap-28"
                        keyText="Acceptable Price"
                        value={""}
                        percentage="0.30%"
                      />
                      <button className="ml-1">
                        <Edit3
                          className="text-white text-opacity-70 hover:text-opacity-100"
                          size={13}
                        />
                      </button>
                      </div>
                      <ListItem keyText="Liq. Price" value={""} />
                      <ListItem keyText="Est. Margin" value={""} />
                      <ListItem keyText="Fees" value={""} />
                    </div>
                    <Button
                      disabled={incPositionLoading}
                      onClick={handleIncPostionTemp}
                      className="w-full text-center rounded-md item-center bg-0xgreen h-9 font-bold"
                      style={{ marginTop: 20, color: "#000000" }}
                    >
                      {incPositionLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Please wait
                        </>
                      ) : (
                        "Long"
                      )}
                    </Button>
                  </StyledTabsContent>
                  <StyledTabsContent value="Limit" className="ml-3">
                    <div className="w-full">
                      <InputBox
                        title="Price"
                        value={usdMargin}
                        suffix="USDT"
                        onValueChange={(e) => {
                          setUsdMargin(e.target.value)
                        }}
                      />
                      <br></br>
                      <InputBox
                        title="Pay"
                        value={usdMargin}
                        suffix="USDT"
                        balanceNode={
                          isBalanceLoading ? (
                            <div>Fetching balance…</div>
                          ) : isBalanceError ? (
                            <div>Error fetching balance</div>
                          ) : (
                            <div>
                              Balance: {balanceData?.formatted}{" "}
                              {balanceData?.symbol}
                            </div>
                          )
                        }
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
                    <Button
                      disabled={incPositionLoading}
                      onClick={handleIncPostionTemp}
                      className="w-full text-center rounded-md item-center bg-0xgreen h-9 font-bold"
                      style={{ marginTop: 20, color: "#000000" }}
                    >
                      {incPositionLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Please wait
                        </>
                      ) : (
                        "Long"
                      )}
                    </Button>
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
                      className="w-full text-center rounded-md item-center bg-0xredLighter h-9"
                      style={{
                        marginTop: 20,
                        backgroundColor: "#FF4A4A",
                        color: "#000000",
                      }}
                    >
                      Short
                    </button>
                  </StyledTabsContent>
                  <StyledTabsContent value="Limit" className="ml-3">
                    <div className="w-full">
                      <InputBox
                        title="Price"
                        value={usdMargin}
                        suffix="USDT"
                        onValueChange={(e) => {
                          setUsdMargin(e.target.value)
                        }}
                      />
                      <br></br>
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
                      className="w-full text-center rounded-md item-center bg-0xredLighter h-9"
                      style={{
                        marginTop: 20,
                        backgroundColor: "#FF4A4A",
                        color: "#000000",
                      }}
                    >
                      Short
                    </button>
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
        </div>
      </div>
    </section>
  )
}
