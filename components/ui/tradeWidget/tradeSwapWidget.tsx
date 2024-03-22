import { useEffect, useState } from "react"
import Decimal from "decimal.js"
import { Edit3, ExternalLink, Loader } from "lucide-react"

import { useCreateIncreasePostion } from "@/hooks/actionTradePosition"
import { useUserUsdxBalance } from "@/hooks/cUserState"

import "@/hooks/usePrice"
import { useMarketPriceState } from "@/hooks/usePrice"
import useTokenConfigStore from "@/hooks/useTokenConfigStore"
import { btcMarketAddress, ethMarketAddress } from "@/hooks/zAddressHelper"
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

import { Card } from "../card"

type TradeMarketType = {
  side: Side
  marketAndIndexPriceData: any
  contractPriceAfter: any
}

export default function TradeSwapWidget({
  side,
  marketAndIndexPriceData,
  contractPriceAfter,
}: TradeMarketType) {
  const [usdMargin, setUsdMargin] = useState("")
  const [usdAfterMargin, setUsdAfterMargin] = useState("")
  const [tradingSize, setTradingSize] = useState("")
  const [leverageNumber, setLeverageNumber] = useState(1)
  const [isChecked, setIsChecked] = useState(true)
  const [priceSlippage, setPriceSlippage] = useState("1")
  const currentTokenEntity = useTokenConfigStore(
    (state: any) => state.currentTokenEntity
  )

  const [ethPrice, setEthPrice] = useState(0)
  const [tokenPrice, setTokenPrice] = useState(0)
  const [contractPrice, setContractPrice] = useState(0)
  useEffect(() => {
    if (marketAndIndexPriceData) {
      setEthPrice(marketAndIndexPriceData.indexPrices?.["ETH"]?.indexPrice)
      setTokenPrice(
        marketAndIndexPriceData.indexPrices?.[currentTokenEntity.name]
          ?.indexPrice
      )
      setContractPrice(Number(contractPriceAfter))
    }
  }, [marketAndIndexPriceData, currentTokenEntity.name, contractPriceAfter])

  const [tokenAfterSlippagePrice, setTokenAfterSlippagePrice] = useState(0)
  const [liqPrice, setLiqPrice] = useState(0)

  const executionFee = minExecutionFeeNumber * Number(ethPrice)

  const {
    data: balanceData,
    isError: isBalanceError,
    isLoading: isBalanceLoading,
  } = useUserUsdxBalance()

  const { incPositionData, incPositionLoading, incPositionWrite } =
    useCreateIncreasePostion(
      currentTokenEntity.market,
      side,
      usdMargin,
      tradingSize,
      to0xxPriceX96(
        side === SIDE_LONG
          ? Number(tokenAfterSlippagePrice).toString()
          : Number(tokenAfterSlippagePrice).toString()
      )
    )

  const handleCheckboxChange = (checked: any) => {
    setIsChecked(checked)
    // Now, use the isChecked state to control the visibility of the Slider
  }
  const handleSliderValueChange = (value: any) => {
    setLeverageNumber(value)
  }

  const { premiumRateX96 } = useMarketPriceState(currentTokenEntity.market)

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
    if (contractPrice && priceSlippage) {
      if (side === SIDE_LONG) {
        setTokenAfterSlippagePrice(
          contractPrice * (1 + Number(priceSlippage) / 1000)
        )
      } else {
        setTokenAfterSlippagePrice(
          contractPrice * (1 - Number(priceSlippage) / 1000)
        )
      }
    }
  }, [contractPrice, priceSlippage, side])

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

  const [tradingFee, setTradingFee] = useState(0)

  return (
    <div>
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
        suffix={currentTokenEntity.name}
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

      <Button
        disabled={incPositionLoading}
        onClick={() => {}}
        className={`w-full font-bold text-center rounded-md item-center mt-4  h-9 text-white bg-agdexMain`}
      >
        Swap
      </Button>
    </div>
  )
}
