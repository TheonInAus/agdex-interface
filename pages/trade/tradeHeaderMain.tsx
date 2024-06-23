import { useEffect, useState } from "react"
import {
  APTOS_ADDRESS,
  getLastPostionData,
  getPositionResources,
  parseAptosDecimal,
} from "@/chainio/fetchData"
import { usePriceData } from "@/chainio/usePriceData"
import useTokenStore from "@/chainio/useTokenStore"
import { useWallet } from "@aptos-labs/wallet-adapter-react"

import { Card } from "@/components/ui/card"
import { CustomTooltip } from "@/components/ui/customToolTip"
import { Stats } from "@/components/ui/stats"
import TokenPairWidget from "@/components/ui/tokenPair/TokenPairWidget"
import { DropDownBox } from "@/components/ui/tradeWidget/dropDownBox"

import { aptos, moduleAddress } from "../_app"

interface TradeHeaderWidgetProps {
  priceType: boolean
  priceData: number
}

export default function TradeHeaderWidget({
  priceType,
  priceData,
}: TradeHeaderWidgetProps) {
  const { symbol, vault } = useTokenStore()
  const [currentHandle, setCurrentHandle] = useState("")
  const [lastPosition, setLastPosition] = useState<any>()

  const fetchHandle = async () => {
    try {
      const resultLong = await aptos.getAccountResource({
        accountAddress: moduleAddress,
        resourceType: getPositionResources(
          vault.tokenAddress as APTOS_ADDRESS,
          symbol.tokenAddress as APTOS_ADDRESS,
          "LONG"
        ),
      })
      if (resultLong) {
        setCurrentHandle(resultLong?.positions.handle)
      } else {
        const resultShort = await aptos.getAccountResource({
          accountAddress: moduleAddress,
          resourceType: getPositionResources(
            vault.tokenAddress as APTOS_ADDRESS,
            symbol.tokenAddress as APTOS_ADDRESS,
            "SHORT"
          ),
        })
        if (resultShort) {
          setCurrentHandle(resultShort?.positions.handle)
        } else {
          setCurrentHandle("")
        }
      }
    } catch (error) {
      setCurrentHandle("")
    }
  }
  useEffect(() => {
    fetchHandle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol, vault])

  const fetchLastPostion = async () => {
    const positions = await getLastPostionData(currentHandle)
    console.log("🚀 ~ fetchLastPostion ~ positions:", positions)
    if (positions && positions.length > 0) {
      setLastPosition(positions[0])
    } else {
      setLastPosition(null)
    }
  }
  useEffect(() => {
    if (currentHandle) {
      fetchLastPostion()
    } else {
      setLastPosition(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentHandle, vault, symbol])

  return (
    <div className="flex justify-center">
      <Card className="w-[1250px]">
        <div className="flex items-center justify-start gap-10 py-6 pl-10">
          <TokenPairWidget token0={symbol.tokenName} token1={"usdx"} />
          <DropDownBox />

          <Stats
            title={"Price"}
            value={priceData?.toFixed(6)}
            textColor={priceType ? "text-0xgreen" : "text-0xred"}
          />
          {lastPosition ? (
            <Stats
              title={"Funding(L)"}
              value={`${(
                parseAptosDecimal(
                  lastPosition?.decoded_value.last_funding_rate.value.value,
                  18
                ) * 100
              ).toFixed(6)}%`}
            />
          ) : (
            <Stats title={"Funding(S)"} value={`-`} />
          )}
          {lastPosition ? (
            <Stats
              title={"Funding(S)"}
              value={`${(
                parseAptosDecimal(
                  lastPosition?.decoded_value.last_reserving_rate.value,
                  18
                ) * 100
              ).toFixed(6)}%`}
            />
          ) : (
            <Stats title={"Funding(S)"} value={`-`} />
          )}
        </div>
        {/* Wide Block 2 */}
      </Card>
    </div>
  )
}
