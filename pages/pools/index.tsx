"use client"

import React, { useState } from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
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

const poolsData = [
  // Add your real pool data here
  {
    name: "ETH/USDT",
    maxAPR: "80.58%",
    volume: "8,924,967.61",
    fees: "4,057.64",
    liquidity: "204,070,998.48",
    myLiquidity: "0.00",
  },
  // Repeat for as many pools as you have
]

const PoolRow = ({ pool }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      <div
        className="flex flex-row p-5 mb-1 text-white text-sm cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="text-base w-[15%]">{pool.name}</div>
        <div className="w-[16%]">{pool.maxAPR}</div>
        <div className="w-[20%]">{pool.volume}</div>
        <div className="w-[15%]">{pool.fees}</div>
        <div className="w-[20%]">{pool.liquidity}</div>
        <div>{pool.myLiquidity}</div>
      </div>
      {isExpanded && (
        <div className="p-3 rounded-b-lg" style={{ backgroundColor: "#080808" }}>
          <StyledTabs defaultValue="Position">
            <StyledTabsList>
              <StyledTabsTrigger value="Position">Position</StyledTabsTrigger>
              <StyledTabsTrigger value="History">History</StyledTabsTrigger>
            </StyledTabsList>
            <StyledTabsContent value="Position" className="ml-3">
              <div>
                <div className="mt-2 mb-4 border-t border-0xline"></div>
                <div>No open positions</div>
              </div>
            </StyledTabsContent>
            <StyledTabsContent
              value="History"
              className="ml-3"
            ></StyledTabsContent>
          </StyledTabs>
        </div>
      )}
    </>
  )
}

export default function PoolsPage() {
  const [leverageNumber, setLeverageNumber] = useState(1)

  const handleSliderValueChange = (value: any) => {
    setLeverageNumber(value)
  }

  return (
    <section className="container flex items-center justify-center gap-6 pt-6 pb-8">
      <div className="flex flex-row gap-4">
        <div
          className="p-6 mb-6 rounded-lg bg-0xboxBackground"
          style={{ width: 950, height: 600 }}
        >
          <div className="flex flex-row p-5 mb-1 text-sm text-0xgrey rounded-lg">
            <div className="w-[15%]">Pool</div>
            <div className="w-[16%]">Max APR</div>
            <div className="w-[20%]">24h Volume (USDT)</div>
            <div className="w-[15%]">24h Fees</div>
            <div className="w-[20%]">Liquidity</div>
            <div>My Liquidity</div>
          </div>
          <div className="mb-6 rounded-lg bg-0xbox border border-0xline">
            {poolsData.map((pool, index) => (
              <PoolRow key={index} pool={pool} />
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <div
            className="p-6 mb-6 rounded-lg bg-0xboxBackground"
            style={{ width: 350, height: 550 }}
          >
            <div>Add ETH/USDT Liquidity</div>
            <br></br>
            <div className="w-full">
              <InputBox title="Margin" value={0.0} suffix="USDT" />
              <br></br>
              <InputBox
                title="Liquidity"
                value={0.0}
                suffix="USDT"
                prefix={`Leverage:`}
                prefixValue={leverageNumber}
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
                  style={{ marginBottom: 10 }}
                  value={[leverageNumber]}
                />
              </div>
              <br></br>
              <ListItem keyText="Liquidity" value={""} />
              <ListItem keyText="Margin" value={""} />
              <ListItem keyText="Margin Ratio" value={""} />
              <ListItem keyText="Execution Fee" value={""} />
            </div>
            <Button
              className="w-full text-center rounded-md item-center bg-0xgreen h-9 font-bold"
              style={{ marginTop: 20, color: "#000000" }}
            >
              Long
            </Button>
          </div>
          <div className="p-6 rounded-lg bg-0xboxBackground">
            <div className="w-full">
              <div className="text-base">About Token/Asset Pool</div>
              <div className="my-3 border-t border-0xline"></div>
              <ListItem keyText="Max Leverage" value={"200x"} />
              <ListItem
                keyText="Average Leverage"
                value={"7.71x"}
                info={
                  "Due to the maximum leverage being adjusted from 200x to 50x on November 14, 2023, the Max APR figure may be lower than the Avg. APR."
                }
              />
              <ListItem keyText="Balance Rate" value={"26,601,123.63"} />
              <ListItem
                keyText="Risk Buffer Fund"
                value={"-0.08%"}
                info={
                  "The Risk Buffer Fund will bear all of the temporary losses first before impacting Liquidity Providers (LPs). If its balance becomes negative, this indicates that the LPs are facing temporary losses."
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
