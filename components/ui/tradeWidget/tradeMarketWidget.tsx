import { useEffect, useState } from "react"
import Decimal from "decimal.js"
import { Edit3, ExternalLink, Loader } from "lucide-react"

import { useCreateIncreasePostion } from "@/hooks/actionTradePosition"
import { useGetReferralState, useUserUsdxBalance } from "@/hooks/cUserState"
import {
  useGetPoolPriceState,
  useTokenMarketAndIndexPrice,
} from "@/hooks/usePrice"
import useTokenConfigStore from "@/hooks/useTokenConfigStore"
import { btcPoolAddress, ethPoolAddress } from "@/hooks/zAddressHelper"
import {
  SIDE_LONG,
  Side,
  giveMeFormattedToShow,
  minExecutionFeeNumber,
  to0xxPriceX96,
} from "@/hooks/zContractHelper"
import { tokenConfig } from "@/hooks/zTokenConfig"
import { Button, buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { CustomTooltip } from "@/components/ui/customToolTip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { InputBox } from "@/components/ui/inputBox"
import { ListItem } from "@/components/ui/listItem"
import { Slider } from "@/components/ui/slider"
import { TpsLInput } from "@/components/ui/tpslIput"

type TradeMarketType = {
  side: Side
  marketAndIndexPriceData: any
}

export default function TradeMarketWidget({
  side,
  marketAndIndexPriceData,
}: TradeMarketType) {
  const [usdMargin, setUsdMargin] = useState("")
  const [usdAfterMargin, setUsdAfterMargin] = useState("")
  const [tradingSize, setTradingSize] = useState("")
  const [leverageNumber, setLeverageNumber] = useState(1)
  const [isChecked, setIsChecked] = useState(true)
  const [showSlider, setShowSlider] = useState(true)
  const [priceSlippage, setPriceSlippage] = useState("1")
  const currentTokenEntity = useTokenConfigStore(
    (state: any) => state.currentTokenEntity
  )

  const [ethPrice, setEthPrice] = useState(0)
  const [tokenPrice, setTokenPrice] = useState(0)

  useEffect(() => {
    if (marketAndIndexPriceData) {
      setEthPrice(marketAndIndexPriceData.indexPrices?.["ETH"]?.indexPrice)
      setTokenPrice(
        marketAndIndexPriceData.indexPrices?.[currentTokenEntity.name]
          ?.indexPrice
      )
    }
  }, [marketAndIndexPriceData, currentTokenEntity.name])

  const [btcAfterSlippagePrice, setBtcAfterSlippagePrice] = useState(0)
  const [liqPrice, setLiqPrice] = useState(0)

  const executionFee = minExecutionFeeNumber * Number(ethPrice)

  const {
    data: balanceData,
    isError: isBalanceError,
    isLoading: isBalanceLoading,
  } = useUserUsdxBalance()

  const { incPositionData, incPositionLoading, incPositionWrite } =
    useCreateIncreasePostion(
      btcPoolAddress,
      side,
      usdMargin,
      tradingSize,
      to0xxPriceX96(
        side === SIDE_LONG
          ? Number(tokenPrice + 5).toString()
          : Number(tokenPrice - 5).toString()
      )
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

  const { data: referralState } = useGetReferralState()

  const { premiumRateX96, isLoading, isError } = useGetPoolPriceState(
    currentTokenEntity.poolContract
  )

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
    if (tokenPrice) {
      if (side === SIDE_LONG) {
        const liqPrice = tokenPrice * (1 - 1 / leverageNumber)
        setLiqPrice(liqPrice)
      } else {
        const liqPrice = tokenPrice * (1 + 1 / leverageNumber)
        setLiqPrice(liqPrice)
      }
    }
  }, [leverageNumber, usdMargin, tokenPrice, side])

  useEffect(() => {
    if (usdAfterMargin !== "" && tokenPrice) {
      const tradingSize = new Decimal(usdAfterMargin)
        .dividedBy(new Decimal(tokenPrice))
        .toFixed(18)
        .toString()
      setTradingSize(tradingSize)
    } else {
      setTradingSize("")
    }
  }, [usdAfterMargin, tokenPrice])

  useEffect(() => {
    if (tokenPrice && priceSlippage) {
      if (side === SIDE_LONG) {
        setBtcAfterSlippagePrice(
          tokenPrice * (1 + Number(priceSlippage) / 10000)
        )
      } else {
        setBtcAfterSlippagePrice(
          tokenPrice * (1 - Number(priceSlippage) / 10000)
        )
      }
    }
  }, [tokenPrice, priceSlippage, side])

  const [tradingFee, setTradingFee] = useState(0)

  useEffect(() => {
    if (tradingSize && tokenPrice) {
      if (referralState) {
        //0.045%
        const tradingFee = (Number(tradingSize) * tokenPrice * 0.045) / 100
        setTradingFee(tradingFee)
      } else {
        const tradingFee = (Number(tradingSize) * tokenPrice * 0.05) / 100
        setTradingFee(tradingFee)
      }
    }
  }, [tradingSize, tokenPrice, referralState])

  return (
    <div>
      <div className="w-full">
        <InputBox
          title="Pay"
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
            setUsdMargin(e.target.value)
          }}
        />
        <br></br>
        <InputBox
          title="Size"
          value={tradingSize}
          suffix="BTC"
          prefix={`Leverage:`}
          prefixValue={leverageNumber}
          onValueChange={(e) => {
            setTradingSize(e.target.value)
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
        <ListItem
          keyText="Entry Price"
          value={giveMeFormattedToShow(Number(tokenPrice))}
        />
        <div className="flex justify-between">
          <CustomTooltip
            triggerContent={
              <div className="text-xs text-0xgrey">Price Impact</div>
            }
          >
            <p>
              The price impact is the deviation between the estimated
              transaction price of the order and the current index price. When
              it is positive number, it means that the estimated transaction
              price is more advantageous, and negative number is vice versa.
            </p>
          </CustomTooltip>
          <div className="text-xs text-white">{premiumRateX96}%</div>
        </div>
        <div className="flex">
          <ListItem
            keyText="Acceptable Price"
            value={giveMeFormattedToShow(btcAfterSlippagePrice)}
            percentage={`${Number(priceSlippage) / 100}%`}
            className="w-full"
          />
          <Dialog>
            <DialogTrigger asChild>
              <button className="ml-1">
                <Edit3
                  className="text-white text-opacity-70 hover:text-opacity-100"
                  size={13}
                />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-0xdialog w-[370px]">
              <DialogHeader>
                <DialogTitle className="mb-2 text-center">
                  Slippage Settings
                </DialogTitle>
                <DialogDescription>
                  <div className="flex justify-between mb-2">
                    <div>Max slippage</div>
                    <label className="text-white">0.30%</label>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="w-[60%]">auto/custom</div>
                    <div className="w-[40%]">
                      <TpsLInput
                        value={priceSlippage}
                        // className="col-span-3"
                        suffix="%"
                        placeholder="TP trigger price"
                        onChange={(e) => {
                          setPriceSlippage(e.target.value)
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-5">
                    If the price change exceeds this percentage, your
                    transaction will revert.
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-3">
                <Button className="w-full text-sm text-black bg-white hover:bg-0xgrey">
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <ListItem
          keyText="Liq. Price"
          value={giveMeFormattedToShow(liqPrice)}
        />
        <ListItem
          keyText="Est. Margin"
          value={`${(Number(usdMargin) - tradingFee).toFixed(2)}`}
        />
        <div className="flex justify-between">
          <div className="text-0xgrey text-xs">Fees</div>
          {(tradingFee + executionFee) > 0 ? (
            <CustomTooltip
              triggerContent={
                <div className="text-xs text-white">{`$${giveMeFormattedToShow(tradingFee + executionFee)} `}</div>
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
        <ListItem
          keyText="Trading Fee"
          value={`$${giveMeFormattedToShow(tradingFee)}`}
        />
        {/* <ListItem
          keyText="HasReferral?"
          value={referralState ? "YES" : "NO"}
        ></ListItem> */}
      </div>
      <Button
        disabled={incPositionLoading}
        onClick={() => {
          handleIncPostionTemp()
        }}
        className={`w-full font-bold text-center rounded-md item-center mt-4 ${
          side === SIDE_LONG
            ? "bg-0xgreen hover:bg-0xgreen-foreground"
            : "bg-0xredLighter hover:bg-0xredLighter-foreground"
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
