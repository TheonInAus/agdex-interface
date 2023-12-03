"use client"

import React, { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { Loader } from "lucide-react"

import { siteConfig } from "@/config/site"
import { useOpenLiquidityPosition } from "@/hooks/actionLiquidityPosition"
import { useUserUsdxBalance } from "@/hooks/cUserState"
import { useAllLiquidityPools } from "@/hooks/liquidityPoolInfo"
import { Button, buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { InputBox } from "@/components/ui/inputBox"
import { ListItem } from "@/components/ui/listItem"
import { Slider } from "@/components/ui/slider"
import { Stats } from "@/components/ui/stats"

import { PoolDataType, PoolRow } from "./PoolRow"

export default function PoolsPage() {
  const [leverageNumber, setLeverageNumber] = useState(1)
  const [expandedPool, setExpandedPool] = useState(0)
  const [usdMargin, setUsdMargin] = useState("")
  const [usdAfterMargin, setUsdAfterMargin] = useState("")
  //0 is for input Margin => afterMargin will change
  //1 is for input afterMaring => margin will change
  //2 is for change expanded pool => everything will be reset
  const [dataChangeMode, setDataChangeMode] = useState(0)
  const {
    data: balanceData,
    isError: isBalanceError,
    isLoading: isBalanceLoading,
  } = useUserUsdxBalance()

  const { poolsConfig } = useAllLiquidityPools()
  const currentPool = useCallback(() => {
    return poolsConfig.filter((item) => item.index === expandedPool)
  }, [expandedPool, poolsConfig])

  const handleSliderValueChange = (value: any) => {
    setLeverageNumber(value)
  }

  useEffect(() => {
    if (dataChangeMode === 0 && usdMargin !== "") {
      const tempMargin = parseFloat(usdMargin)
      const newUsdAfterMargin = (
        isNaN(tempMargin) ? 0 : tempMargin * leverageNumber
      ).toString()
      if (usdAfterMargin !== newUsdAfterMargin) {
        setUsdAfterMargin(newUsdAfterMargin)
      }
    } else if (dataChangeMode === 1 && usdAfterMargin !== "") {
      const tempMargin = parseFloat(usdAfterMargin)
      const newUsdMargin = (
        isNaN(tempMargin) ? 0 : tempMargin / leverageNumber
      ).toString()
      if (usdMargin !== newUsdMargin) {
        setUsdMargin(newUsdMargin)
      }
    } else if (dataChangeMode === 2) {
      setUsdMargin("")
      setUsdAfterMargin("")
      setLeverageNumber(1)
    }
  }, [leverageNumber, usdMargin, usdAfterMargin, dataChangeMode])

  const toggleExpansion = (index: any) => {
    console.log("check toglle expansion => ", index)
    setDataChangeMode(2)
    setExpandedPool(index)
  }

  const { openLiqPositionData, openLiqPositionLoading, openLiqPositionWrite } =
    useOpenLiquidityPosition(
      poolsConfig[0].poolAddress,
      usdMargin,
      usdAfterMargin
    )

  const handlOpenLiqTemp = () => {
    openLiqPositionWrite()
  }

  return (
    <section className="container flex items-center justify-center gap-6 pt-6 pb-8">
      <div className="flex flex-row gap-4">
        <div
          className="p-6 mb-6 rounded-lg bg-0xboxBackground"
          style={{ width: 950, height: 750 }}
        >
          <div className="flex flex-row p-5 mb-1 text-sm rounded-lg text-0xgrey">
            <div className="w-[15%]">Pool</div>
            <div className="w-[16%]">Max APR</div>
            <div className="w-[20%]">24h Volume (USDT)</div>
            <div className="w-[15%]">24h Fees</div>
            <div className="w-[20%]">Liquidity</div>
            <div>My Liquidity</div>
          </div>
          <div className="flex flex-col rounded-lg">
            {poolsConfig?.map((pool, index) => (
              <PoolRow
                key={index}
                pool={pool}
                expandIndex={expandedPool}
                onToggle={() => toggleExpansion(index)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <div
            className="p-6 mb-6 rounded-lg bg-0xboxBackground"
            style={{ width: 350, height: 550 }}
          >
            <div>{`Add ${currentPool.name}/USDT Liquidity`}</div>
            <br></br>
            <div className="w-full">
              <InputBox
                title="Margin"
                value={usdMargin}
                suffix="USDT"
                balanceNode={
                  isBalanceLoading ? (
                    <div>Fetching balance…</div>
                  ) : isBalanceError ? (
                    <div>Error fetching balance</div>
                  ) : (
                    <div>
                      Balance: {balanceData?.formatted} {balanceData?.symbol}
                    </div>
                  )
                }
                onValueChange={(e) => {
                  setDataChangeMode(0)
                  setUsdMargin(e.target.value)
                }}
              />
              <br></br>
              <InputBox
                title="Liquidity"
                value={usdAfterMargin}
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
                onValueChange={(e) => {
                  setDataChangeMode(1)
                  setUsdAfterMargin(e.target.value)
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
              disabled={openLiqPositionLoading}
              className="w-full font-bold text-center rounded-md item-center bg-0xgreen h-9"
              style={{ marginTop: 20, color: "#000000" }}
              onClick={handlOpenLiqTemp}
            >
              {openLiqPositionLoading ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Please wait
                </>
              ) : (Number(balanceData?.formatted) || 0) < Number(usdMargin) ? (
                "Insiffuient Balance"
              ) : (
                "Add"
              )}
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
