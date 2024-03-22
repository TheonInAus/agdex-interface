import { useState } from "react"
import * as RadioGroup from "@radix-ui/react-radio-group"

import useTokenConfigStore from "@/hooks/useTokenConfigStore"
import { Card } from "@/components/ui/card"
import CustomTradingView from "@/components/ui/tradeWidget/CustomTradingView"
import TradingViewWidget from "@/components/tradingView"

type KlineTypeValue = {
  [key: string]: number
}
const klineValues: KlineTypeValue = {
  "1m": 1,
  "5m": 5,
  "15m": 15,
  "30m": 30,
  "1h": 60,
  "4h": 240,
  "1D": 1440,
  "1W": 10080,
}

export default function TradeTradingViewWidget() {
  const [klineType, setKlineType] = useState<number>(klineValues["1m"])

  const handleValueChange = (value: string) => {
    const newValue = klineValues[value]
    if (newValue !== undefined) {
      setKlineType(newValue)
    }
  }

  const currentTokenEntity = useTokenConfigStore(
    (state: any) => state.currentTokenEntity
  )

  return (
    <>
      <Card>
        <div style={{ marginBottom: 10 }}>
          <RadioGroup.Root
            defaultValue="1m"
            onValueChange={handleValueChange}
            className="flex items-center px-3 py-1 space-x-4 rounded-lg bg-accent"
          >
            {["1m", "5m", "15m", "30m", "1h", "4h", "1D", "1W"].map(
              (option) => (
                <RadioGroup.Item
                  key={option}
                  value={option}
                  id={option}
                  className={`relative flex items-center justify-center p-1 text-lg font-bold italic rounded-md cursor-pointer focus:outline-none ${
                    klineType === klineValues[option]
                      ? "text-0xyellow"
                      : "text-primary"
                  }`}
                >
                  {option}
                </RadioGroup.Item>
              )
            )}
          </RadioGroup.Root>
        </div>
        {/* <CustomTradingView symbol={currentTokenEntity.name} type={klineType} /> */}
        <TradingViewWidget tokenName={currentTokenEntity.name} />
      </Card>
    </>
  )
}
