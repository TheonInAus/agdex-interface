"use client"

import React, { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { Loader } from "lucide-react"

import { siteConfig } from "@/config/site"
import { useOpenLiquidityPosition } from "@/hooks/actionLiquidityPosition"
import { useUserUsdxBalance } from "@/hooks/cUserState"
import { useAllLiquidityPools } from "@/hooks/liquidityPoolInfo"
import { Button, buttonVariants } from "@/components/ui/button"
import { ButtonInput } from "@/components/ui/buttonInput"
import { Checkbox } from "@/components/ui/checkbox"
import { CustomTooltip } from "@/components/ui/customToolTip"
import { InputBox } from "@/components/ui/inputBox"
import { LabeledInput } from "@/components/ui/labeledInput"
import { LeverageInput } from "@/components/ui/leverageInput"
import { ListItem } from "@/components/ui/listItem"
import { PnLSlider } from "@/components/ui/pnlSlider"
import { Slider } from "@/components/ui/slider"
import { Stats } from "@/components/ui/stats"
import {
  StyledTabs,
  StyledTabsContent,
  StyledTabsList,
  StyledTabsTrigger,
} from "@/components/ui/styledTab"
import Iconify from "@/components/Iconify"

import PoolRow, { PoolDataType } from "./PoolRow"
import CalculatorDropDownBox from "@/components/ui/calculatorDropDown"

export default function PoolsPage() {
  const [leverageNumber, setLeverageNumber] = useState(1)
  const [expandedPool, setExpandedPool] = useState(0)
  const [usdMargin, setUsdMargin] = useState("")
  const [usdAfterMargin, setUsdAfterMargin] = useState("")
  const [isChecked, setIsChecked] = useState(true)
  const [showSlider, setShowSlider] = useState(true)
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

  const handleCheckboxChange = (checked: any) => {
    setIsChecked(checked)
    // Now, use the isChecked state to control the visibility of the Slider
    setShowSlider(checked) // Assuming setShowSlider is defined elsewhere
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

  const [calLeverageNumber, setCalLeverageNumber] = useState(1)

  const handleCalSliderValueChange = (value: any) => {
    setCalLeverageNumber(value[0])
  }

  const handleInputChange = (event: any) => {
    const value = parseFloat(event.target.value)
    if (!isNaN(value) && value >= 1 && value <= 100) {
      setLeverageNumber(value)
    } else if (event.target.value === "") {
      setLeverageNumber(0)
    }
  }

  return (
    <section className="container flex items-center justify-center gap-6 pt-6 pb-8">
      <div className="flex flex-row gap-4">
        <div
          className="p-6 mb-6 rounded-lg bg-0xboxBackground"
          style={{ width: 950, height: 750 }}
        >
          <div className="flex flex-row p-5 text-sm rounded-lg text-0xgrey">
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
            <div className="w-[20%]">24h Volume (USDT)</div>
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
            <div className="flex flex-row justify-between">
              <div>{`Add ${currentPool.name}/USDT Liquidity`}</div>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="ml-1">
                    <Iconify icon={"ri:calculator-line"} />
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-0xdialog w-[730px]">
                  <DialogHeader>
                    <DialogTitle>
                      <CalculatorDropDownBox />
                    </DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-col w-[60%]">
                      <div className="mt-4">
                        <LeverageInput
                          label="Leverage"
                          suffix="X"
                          value={leverageNumber.toString()}
                          onChange={handleInputChange}
                          type="number"
                          min="1"
                          max="100"
                          className="mb-2"
                        />
                        <div className="mt-4">
                          <PnLSlider
                            defaultValue={[1]}
                            max={100}
                            min={1}
                            step={1}
                            onValueChange={handleSliderValueChange}
                            value={[leverageNumber]}
                            style={{
                              marginBottom: 10,
                              marginTop: 10,
                            }}
                          />
                        </div>
                      </div>
                      <div className="mt-[45px]">
                        <LabeledInput
                          label={"Margin"}
                          suffix={"USDT"}
                          value={0}
                          type="number"
                          className="mb-2"
                        />
                      </div>
                      <Button className="w-full mt-4 bg-bronze">
                        Calculate
                      </Button>
                    </div>
                    <div className="bg-black w-[50%] rounded-lg">
                      <div className="ml-4 mt-4">Result</div>
                      <div className="border-t my-3 mx-2 border-0xline"></div>
                      <div className="mx-4 mb-4 flex flex-col gap-2">
                        <ListItem keyText={"Liquidity"} value={"-"} />
                        <ListItem keyText={"Max APR"} value={"-"} />
                        <ListItem keyText={"Max Income"} value={"-"} />
                      </div>
                    </div>
                  </div>

                  <div className="text-0xgrey text-sm mt-2">
                  *The calculation is for reference only and does not include trading fee, execution fee and other actual costs.
                  </div>
                </DialogContent>
              </Dialog>
            </div>
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
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={handleCheckboxChange}
                  />
                </div>
                {showSlider && (
                  <Slider
                    defaultValue={[1]}
                    onValueChange={handleSliderValueChange}
                    max={200}
                    min={1}
                    step={1}
                    value={[leverageNumber]}
                    style={{ marginBottom: 10, marginTop: 10 }}
                  />
                )}
              </div>
              <br></br>
              <ListItem keyText="Liquidity" value={""} />
              <ListItem keyText="Margin" value={""} />
              <ListItem keyText="Margin Ratio" value={""} />
              <ListItem keyText="Execution Fee" value={""} />
            </div>
            <Button
              disabled={openLiqPositionLoading}
              className="w-full font-bold text-center rounded-md item-center bg-0xgreen h-9 hover:bg-0xgreen-foreground"
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
              <div className="flex justify-between">
                <CustomTooltip
                  triggerContent={
                    <div className="text-xs text-0xgrey">Average Leverage</div>
                  }
                >
                  <p className="mb-2">
                    Due to the maximum leverage being adjusted from 200x to 50x
                    on November 14, 2023, the Max APR figure may be lower than
                    the Avg. APR.
                  </p>
                </CustomTooltip>
                <div className="text-xs text-white">7.71x</div>
              </div>
              <ListItem keyText="Balance Rate" value={"26,601,123.63"} />
              <div className="flex justify-between">
                <CustomTooltip
                  triggerContent={
                    <div className="text-xs text-0xgrey">Risk Buffer Fund</div>
                  }
                >
                  <p className="mb-2">
                    The Risk Buffer Fund will bear all of the temporary losses
                    first before impacting Liquidity Providers (LPs). If its
                    balance becomes negative, this indicates that the LPs are
                    facing temporary losses.
                  </p>
                </CustomTooltip>
                <CustomTooltip
                  triggerContent={
                    <div className="text-xs text-white">-0.08%</div>
                  }
                >
                  <ListItem keyText="Realized PnL" value={"-93,922.98 USDT"} />
                  <ListItem keyText="Unrealized PnL" value={"-468.07 USDT"} />
                  <ListItem
                    keyText="Total Contribution"
                    value={"1,252,191.80 USDT"}
                  />
                </CustomTooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
