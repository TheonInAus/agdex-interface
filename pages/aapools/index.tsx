"use client"

import React, { useEffect, useState } from "react"
import { Loader } from "lucide-react"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { CustomTooltip } from "@/components/ui/customToolTip"
import { ListItem } from "@/components/ui/listItem"
import { Slider } from "@/components/ui/slider"

import PoolRow, { PoolDataType } from "./PoolRow"
import PoolCalculatorWidget from "./poolCalculator"

// import PoolTradeWidget from "./poolTradeWidget"

export default function PoolsPage() {
  const [expandedPool, setExpandedPool] = useState(0)
  const [dataChangeMode, setDataChangeMode] = useState(0)

  const toggleExpansion = (index: any) => {
    setDataChangeMode(2)
    setExpandedPool(index)
  }
  const poolsConfig: any[] = []
  return (
    <section className="container flex items-center justify-center gap-6 pt-6 pb-8">
      <div className="flex flex-row gap-4">
        <Card style={{ width: 950, height: 870 }}>
          <div className="flex flex-row p-5 ">
            <div className="w-[15%]">Pool</div>
            <CustomTooltip
              triggerContent={<div className="w-[16%]">Max APR</div>}
            >
              <p className="mb-2">
                {
                  "Max APR is calculated based on LPs' trading fee income in the past 24 hours, 0XX daily emission, and the maximum leverage of the pool."
                }
              </p>
              <p className="mb-2">
                Max APR = Trading Fee Max APR + 0XX Max APR
              </p>
            </CustomTooltip>
            <div className="w-[20%]">24h Volume (USDX)</div>
            <CustomTooltip
              triggerContent={<div className="w-[15%]">24h Fees</div>}
            >
              <p className="mb-2">
                Total trading fee generated by the trading users within 24 hours
                of the market.
              </p>
            </CustomTooltip>
            <div className="w-[20%]">Liquidity</div>
            <div>My Liquidity</div>
          </div>
          <div>
            {poolsConfig?.map((market, index) => (
              <PoolRow
                key={index}
                market={market}
                expandIndex={expandedPool}
                onToggle={() => toggleExpansion(index)}
              />
            ))}
          </div>
        </Card>
        <Card style={{ width: 350 }}>
          {/* <PoolTradeWidget
            poolsConfig={poolsConfig}
            expandedPool={expandedPool}
            dataChangeMode={dataChangeMode}
            setDataChangeMode={setDataChangeMode}
          /> */}
        </Card>
      </div>
    </section>
  )
}
