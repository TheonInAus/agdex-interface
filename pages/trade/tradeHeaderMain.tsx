import useTokenConfigStore from "@/hooks/useTokenConfigStore"
import { giveMeFormattedToShow } from "@/hooks/zContractHelper"
import { Card } from "@/components/ui/card"
import { CustomTooltip } from "@/components/ui/customToolTip"
import { Stats } from "@/components/ui/stats"
import TokenPairWidget from "@/components/ui/tokenPair/TokenPairWidget"
import DropDownBox from "@/components/ui/tradeWidget/dropDownBox"

interface TradeHeaderWidgetProps {
  priceType: boolean
  contractPrice: number
  shownIndexPrice: number
  change24h: number
  openInterst: number
  openInterstValue: number
}

export default function TradeHeaderWidget({
  priceType,
  contractPrice,
  shownIndexPrice,
  change24h,
  openInterst,
  openInterstValue,
}: TradeHeaderWidgetProps) {
  const currentTokenEntity = useTokenConfigStore(
    (state: any) => state.currentTokenEntity
  )
  return (
    <>
      <Card>
        <div className="flex items-center justify-start gap-10 py-6 pl-10">
          <TokenPairWidget token1={currentTokenEntity.name} token2={"USDX"} />
          <DropDownBox />
          <div
            className={`mt-1 mx-2 text-3xl font-bold mr-10 ${
              priceType ? "text-0xred" : "text-0xgreen"
            }`}
          >
            {giveMeFormattedToShow(contractPrice)}
          </div>
          <Stats
            title={"Index Price"}
            value={giveMeFormattedToShow(shownIndexPrice)}
            textColor={priceType ? "text-0xred" : "text-0xgreen"}
          />
          <Stats
            title={"24h Change"}
            value={`${change24h.toFixed(2)}%`}
            textColor={change24h >= 0 ? "text-0xgreen" : "text-0xred"}
          />
          <div>
            <CustomTooltip
              triggerContent={<div className="text-lg">Open Interest</div>}
            >
              <p> todo desc</p>
            </CustomTooltip>
            <div className="flex items-center mt-1">
              <div className="mr-1 text-lg text-0xyellow">
                {`${giveMeFormattedToShow(openInterst)} ${
                  currentTokenEntity.name
                }`}{" "}
              </div>
              <div className="text-sm">{`($${giveMeFormattedToShow(
                openInterstValue
              )})`}</div>
            </div>
          </div>
        </div>
        {/* Wide Block 2 */}
      </Card>
    </>
  )
}
