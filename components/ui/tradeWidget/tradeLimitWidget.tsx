import { useEffect, useState } from "react"
import Decimal from "decimal.js"
import { Edit3, ExternalLink, Loader } from "lucide-react"

import {
  useCreateIncreaseOrder,
  useCreateIncreasePostion,
} from "@/hooks/actionTradePosition"
import { useUserUsdxBalance } from "@/hooks/cUserState"
import useTokenConfigStore from "@/hooks/useTokenConfigStore"
import { ethMarketAddress } from "@/hooks/zAddressHelper"
import { SIDE_LONG, Side, to0xxPriceX96 } from "@/hooks/zContractHelper"
import { Button, buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { InputBox } from "@/components/ui/inputBox"
import { ListItem } from "@/components/ui/listItem"
import { Slider } from "@/components/ui/slider"

import { CustomTooltip } from "../customToolTip"

type TradeMarketType = {
  side: Side
  marketAndIndexPriceData: any
}

export default function TradeLimitWidget({
  side,
  marketAndIndexPriceData,
}: TradeMarketType) {
  const [usdMargin, setUsdMargin] = useState("")
  const [usdAfterMargin, setUsdAfterMargin] = useState("")
  const [tradingSize, setTradingSize] = useState("")
  const [leverageNumber, setLeverageNumber] = useState(1)
  const [isChecked, setIsChecked] = useState(true)
  const [showSlider, setShowSlider] = useState(true)
  const [limitPrice, setLimitPrice] = useState("")
  const [acceptableLimit, setAcceptableLimit] = useState("")
  useEffect(() => {
    if (limitPrice) {
      const accLimit = Number(limitPrice) * (1 + limitAcceptableRate)
      setAcceptableLimit(accLimit.toString())
    }
  }, [limitPrice])
  const limitAcceptableRate = 0.03
  const {
    data: balanceData,
    isError: isBalanceError,
    isLoading: isBalanceLoading,
  } = useUserUsdxBalance()

  const currentTokenEntity = useTokenConfigStore(
    (state: any) => state.currentTokenEntity
  )

  const [ethPrice, setEthPrice] = useState(0)
  const [tokenPrice, setTokenPrice] = useState(0)
  useEffect(() => {
    if (marketAndIndexPriceData) {
      setEthPrice(marketAndIndexPriceData.indexPrices["ETH"].indexPrice)
      setTokenPrice(
        marketAndIndexPriceData.indexPrices[currentTokenEntity.name].indexPrice
      )
    }
  }, [marketAndIndexPriceData, currentTokenEntity.name])

  const {
    createIncOrderData,
    isCreateIncOrderLoading,
    isCreateIncOrderError,
    createIncOrderWrite,
  } = useCreateIncreaseOrder(
    ethMarketAddress,
    side,
    usdMargin,
    tradingSize,
    to0xxPriceX96(limitPrice ? limitPrice : "0"),
    false,
    to0xxPriceX96(acceptableLimit ? acceptableLimit : "0")
  )

  const handleCheckboxChange = (checked: any) => {
    setIsChecked(checked)
    // Now, use the isChecked state to control the visibility of the Slider
    setShowSlider(checked) // Assuming setShowSlider is defined elsewhere
  }
  const handleSliderValueChange = (value: any) => {
    setLeverageNumber(value)
  }

  const handleIncOrderTemp = () => {
    createIncOrderWrite()
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

  const feesValue = 0

  return (
    <div>
      <div className="w-full">
        <InputBox
          title="Price"
          value={limitPrice}
          suffix="USDT"
          onValueChange={(e) => {
            setLimitPrice(e.target.value)
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
                Balance: {balanceData?.formatted} {balanceData?.symbol}
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
        {/* <ListItem keyText="Entry Price" value={""} /> */}
        {/* <ListItem keyText="Price Impact" value={""} /> */}
        <ListItem keyText="Acceptable Price" value={""} percentage="0.30%" />
        {/* <ListItem keyText="Liq. Price" value={""} /> */}
        <ListItem keyText="Est. Margin" value={""} />
        <div className="flex justify-between">
          <div className="text-0xgrey text-xs">Fees</div>
          {feesValue > 0 ? (
            <CustomTooltip
              triggerContent={
                <div className="text-xs text-white">{feesValue}</div>
              }
            >
              <div className="flex justify-between">
                <div className="text-white text-xs">Trading Fee</div>
                <div className="text-white text-xs">-0.82 USDT</div>
              </div>
              <div className="text-0xgrey text-xs">
                (0.050% of the position value)
              </div>
              <div className="flex justify-between">
                <div className="text-white text-xs">Execution Fee Fee</div>
                <div className="text-white text-xs">
                  -0.82 USDT{" "}
                  <span className="text-sm text-0xgrey">(-$0.46)</span>
                </div>
              </div>
            </CustomTooltip>
          ) : (
            <div className="text-white text-xs">-</div>
          )}
        </div>
      </div>
      <Button
        disabled={isCreateIncOrderLoading}
        onClick={() => {
          handleIncOrderTemp()
        }}
        className={`w-full font-bold text-center rounded-md item-center mt-4 ${
          side === SIDE_LONG ? "bg-0xgreen" : "bg-0xredLighter"
        } h-9 text-white`}
      >
        {isCreateIncOrderLoading ? (
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
