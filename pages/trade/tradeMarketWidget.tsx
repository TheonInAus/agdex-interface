import { useEffect, useState } from "react"
import Decimal from "decimal.js"
import { Edit3, ExternalLink, Loader } from "lucide-react"

import { useCreateIncreasePostion } from "@/hooks/actionTradePosition"
import { useUserUsdxBalance } from "@/hooks/cUserState"
import { ethPoolAddress } from "@/hooks/zAddressHelper"
import {
  SIDE_LONG,
  Side,
  giveMeFormattedToShow,
  to0xxPriceX96,
} from "@/hooks/zContractHelper"
import { Button, buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { InputBox } from "@/components/ui/inputBox"
import { ListItem } from "@/components/ui/listItem"
import { Slider } from "@/components/ui/slider"

type TradeMarketType = {
  side: Side
}

export const TradeMarketWidget = ({ side }: TradeMarketType) => {
  const [usdMargin, setUsdMargin] = useState("")
  const [usdAfterMargin, setUsdAfterMargin] = useState("")
  const [tradingSize, setTradingSize] = useState("")
  const [leverageNumber, setLeverageNumber] = useState(1)
  const [isChecked, setIsChecked] = useState(true)
  const [showSlider, setShowSlider] = useState(true)
  const ethPrice = "2333"

  const {
    data: balanceData,
    isError: isBalanceError,
    isLoading: isBalanceLoading,
  } = useUserUsdxBalance()

  const { incPositionData, incPositionLoading, incPositionWrite } =
    useCreateIncreasePostion(
      ethPoolAddress,
      side,
      usdMargin,
      tradingSize,
      to0xxPriceX96(side === SIDE_LONG ? "2005" : "1995")
    )

  const handleCheckboxChange = (checked: any) => {
    setIsChecked(checked)
    // Now, use the isChecked state to control the visibility of the Slider
    setShowSlider(checked) // Assuming setShowSlider is defined elsewhere
  }
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

  return (
    <div>
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
                Balance:{" "}
                {giveMeFormattedToShow(Number(balanceData?.formatted) || 0)}{" "}
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
          <div className="flex flex-row items-center justify-between">
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
        <ListItem keyText="Entry Price" value={""} />
        <ListItem keyText="Price Impact" value={""} />
        <div className="flex">
          <ListItem keyText="Acceptable Price" value={""} percentage="0.30%" />
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
        onClick={() => {
          handleIncPostionTemp()
        }}
        className={`w-full font-bold text-center rounded-md item-center mt-4 ${
          side === SIDE_LONG ? "bg-0xgreen" : "bg-0xredLighter"
        } h-9 text-white`}
      >
        {incPositionLoading ? (
          <>
            <Loader className="w-4 h-4 mr-2 animate-spin" />
            Please wait
          </>
        ) : side === SIDE_LONG ? (
          "Long"
        ) : (
          "Short"
        )}
      </Button>
    </div>
  )
}
