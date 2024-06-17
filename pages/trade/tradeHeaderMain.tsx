import { useEffect, useState } from "react"
import {
  commonTableHandle,
  getLastPostionData,
  parseAptosDecimal,
} from "@/chainio/fetchData"
import { PoolInfo, PoolList, pythAptosFeeder } from "@/chainio/helper"
import { usePriceData } from "@/chainio/usePriceData"

import { Card } from "@/components/ui/card"
import { CustomTooltip } from "@/components/ui/customToolTip"
import { Stats } from "@/components/ui/stats"
import TokenPairWidget from "@/components/ui/tokenPair/TokenPairWidget"
import { DropDownBox } from "@/components/ui/tradeWidget/dropDownBox"

interface TradeHeaderWidgetProps {
  priceType: boolean
  priceData: number
}

export default function TradeHeaderWidget({
  priceType,
  priceData,
}: TradeHeaderWidgetProps) {
  const [currentPool, setCurrentPool] = useState<PoolInfo>(PoolList[0])
  const handlePoolSelected = (poolInfo: PoolInfo) => {
    setCurrentPool(poolInfo)
  }

  const [lastPosition, setLastPosition] = useState<any>()
  const fetchLastPosition = async () => {
    const result = await getLastPostionData(commonTableHandle)
    if (result && result.length > 0) {
      setLastPosition(result[0])
    }
  }
  useEffect(() => {
    fetchLastPosition()
  }, [])

  return (
    <div className="flex justify-center">
      <Card className="w-[1250px]">
        <div className="flex items-center justify-start gap-10 py-6 pl-10">
          <TokenPairWidget token0={currentPool.tokenName} token1={"usdx"} />
          <DropDownBox handleSelectedPool={handlePoolSelected} />

          <Stats
            title={"Price"}
            value={priceData.toFixed(6)}
            textColor={priceType ? "text-0xgreen" : "text-0xred"}
          />
          <Stats
            title={"Funding(L)"}
            value={`${(
              parseAptosDecimal(
                lastPosition?.decoded_value.last_funding_rate.value.value,
                18
              ) * 100
            ).toFixed(6)}%`}
          />
          <Stats
            title={"Funding(S)"}
            value={`${(
              parseAptosDecimal(
                lastPosition?.decoded_value.last_funding_rate.value.value,
                18
              ) * 100
            ).toFixed(6)}%`}
          />
        </div>
        {/* Wide Block 2 */}
      </Card>
    </div>
  )
}
