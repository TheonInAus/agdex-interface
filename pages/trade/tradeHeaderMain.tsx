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
  return (
    <div className="flex justify-center">
      <Card className="w-[1250px]">
        <div className="flex items-center justify-start gap-10 py-6 pl-10">
          <TokenPairWidget token1={"ETH"} token2={"USDX"} />
          <DropDownBox />
          <div
            className={`mt-1 mx-2 text-xl font-bold mr-10 ${
              priceType ? "text-0xred" : "text-0xgreen"
            }`}
          >
            {contractPrice}
          </div>
          <Stats
            title={"Index Price"}
            value={"shownIndexPrice"}
            textColor={priceType ? "text-0xred" : "text-0xgreen"}
          />
          <Stats
            title={"24h Change"}
            value={`${change24h}%`}
            textColor={change24h >= 0 ? "text-0xgreen" : "text-0xred"}
          />
          <div>
            <CustomTooltip
              triggerContent={<div className="text-base">Open Interest</div>}
            >
              <p> todo desc</p>
            </CustomTooltip>
            <div className="flex items-center mt-1">
              <div className="mr-1 text-lg text-agdexMain">xxx</div>
              <div className="text-sm">{`($${openInterstValue})`}</div>
            </div>
          </div>
        </div>
        {/* Wide Block 2 */}
      </Card>
    </div>
  )
}
