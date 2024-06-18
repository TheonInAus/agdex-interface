import { useEffect, useState } from "react"
import useTokenStore from "@/chainio/useTokenStore"
import * as RadioGroup from "@radix-ui/react-radio-group"

import { Card } from "@/components/ui/card"
import TradingViewWidget from "@/components/tradingView"

export default function TradeTradingViewWidget() {
  const { symbol } = useTokenStore()

  return (
    <div className="flex justify-center">
      <Card className="w-[870px]">
        <TradingViewWidget tokenName={symbol.tokenSymbol} />
      </Card>
    </div>
  )
}
