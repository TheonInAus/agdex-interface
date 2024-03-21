import React, { useEffect, useState } from "react"
import { Loader } from "lucide-react"
import { parseUnits } from "viem"

import { siteConfig } from "@/config/site"
import { useOpenLiquidityPosition } from "@/hooks/actionLiquidityPosition"
import { useUserUsdxBalance } from "@/hooks/cUserState"
import { useAllLiquidityPools } from "@/hooks/liquidityPoolInfo"
import { giveMeFormattedToShow } from "@/hooks/zContractHelper"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { CustomTooltip } from "@/components/ui/customToolTip"
import { InputBox } from "@/components/ui/inputBox"
import { ListItem } from "@/components/ui/listItem"
import { Slider } from "@/components/ui/slider"

import PoolRow, { PoolDataType } from "./PoolRow"
import PoolCalculatorWidget from "./poolCalculator"

interface PoolTradeWidgetProps {
  poolsConfig: PoolDataType[]
  expandedPool: number
  dataChangeMode: number
  setDataChangeMode: React.Dispatch<React.SetStateAction<number>>
}

export default function PoolTradeWidget({
  poolsConfig,
  expandedPool,
  dataChangeMode,
  setDataChangeMode,
}: PoolTradeWidgetProps) {
  const {
    data: balanceData,
    isError: isBalanceError,
    isLoading: isBalanceLoading,
  } = useUserUsdxBalance()
  const [usdMargin, setUsdMargin] = useState("")
  const [usdAfterMargin, setUsdAfterMargin] = useState("")

  const { openLiqPositionData, openLiqPositionLoading, openLiqPositionWrite } =
    useOpenLiquidityPosition(
      poolsConfig[expandedPool].marketAddress,
      usdMargin,
      usdAfterMargin,
      parseUnits("10", 6)
    )
  const handlOpenLiqTemp = () => {
    openLiqPositionWrite()
  }
  const [leverageNumber, setLeverageNumber] = useState(1)

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

  const [isChecked, setIsChecked] = useState(true)
  const [showSlider, setShowSlider] = useState(true)
  //0 is for input Margin => afterMargin will change
  //1 is for input afterMaring => margin will change
  //2 is for change expanded pool => everything will be reset

  console.log("🚀 ~ currentPool ~ expandedPool:", expandedPool)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leverageNumber, usdMargin, usdAfterMargin, dataChangeMode])

  return (
    <>
      <div>
        <div className="mb-6">
          <div className="flex flex-row items-center justify-between">
            <div>{`Add ${poolsConfig[expandedPool].name}/USDX Liquidity`}</div>
            <PoolCalculatorWidget />
          </div>
          <br></br>
          <div>
            <InputBox
              title="Margin"
              value={usdMargin}
              suffix="USDX"
              balanceNode={
                isBalanceLoading ? (
                  <div>Fetching balance…</div>
                ) : isBalanceError ? (
                  <div>Error fetching balance</div>
                ) : (
                  <div>
                    Balance:{" "}
                    {giveMeFormattedToShow(Number(balanceData?.formatted) || 0)}{" "}
                    {balanceData?.symbol}
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
              suffix="USDX"
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
            <div className="flex justify-between">
              <CustomTooltip
                triggerContent={<div className="text-sm">Addition-Only</div>}
              >
                <p className="mb-2">
                  {`When adding more liquidity, you can choose the
                    "Addition-Only" mode. The Addition-Only mode means only
                    adding liquidity while keeping the margin unchanged. The
                    leverage of the liquidity position will change accordingly
                    after the addition`}
                  .
                </p>
              </CustomTooltip>
              <Checkbox />
            </div>
            <div className="w-full mt-2 border-t border-0xline"></div>
            <div className="my-3">
              <ListItem keyText="Liquidity" value={""} />
              <ListItem keyText="Margin" value={""} />
            </div>
            <div className="w-full bg-muted h-[70px] py-[5px] rounded-xl">
              <div className="mx-2">
                <div className="text-sm">Passive Position</div>
                <div className="flex justify-between my-1">
                  <CustomTooltip
                    triggerContent={<div className="text-xs">Est. Size</div>}
                  >
                    <p className="mb-2">
                      The estimated passive position size after adding
                      liquidity. The passive position will be opened at the
                      Index Price, and the actual position size may vary based
                      on market conditions.
                    </p>
                  </CustomTooltip>
                  <div className="text-xs">7.71x</div>
                </div>
                <ListItem keyText="Entry Price" value={""} />
              </div>
            </div>
            <div className="mt-2">
              <ListItem keyText="Execution Fee" value={""} />
            </div>
          </div>
          <Button
            disabled={openLiqPositionLoading}
            className="w-full font-bold text-center rounded-md item-center bg-0xgreen h-9 hover:bg-0xgreen-foreground"
            style={{ marginTop: 20 }}
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
        <div className="w-full">
          <div className="text-base">About Token/Asset Pool</div>
          <div className="my-3 border-t border-0xline"></div>
          <ListItem keyText="Balance Rate" value={"0.28%"} />
          <ListItem keyText="Average Leverage" value={"282.01x"} />
          <div className="flex justify-between">
            <CustomTooltip
              triggerContent={
                <div className="text-xs ">Max Effective Liquidity</div>
              }
            >
              <p className="mb-2">
                {` To reduce the risk of price manipulation, any liquidity
                    exceeding the Max Effective Liquidity threshold will not
                    further increase the pool's depth once the pool's liquidity
                    surpasses this limit.`}
              </p>
            </CustomTooltip>
            <div className="text-xs">25.00M</div>
          </div>
          <div className="flex justify-between">
            <CustomTooltip
              triggerContent={<div className="text-xs ">Max Open Interest</div>}
            >
              <p className="mb-2">
                To reduce the risk of price manipulation, there is a limit on
                the open interest of the pool.
              </p>
            </CustomTooltip>
            <div className="text-xs">216.62K ETH</div>
          </div>
        </div>
      </div>
    </>
  )
}
