import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  StyledTabs,
  StyledTabsContent,
  StyledTabsList,
  StyledTabsTrigger,
} from "@/components/ui/styledTab"
import OrderListWidget from "@/components/ui/tradeWidget/orderListWidget"
import PositionHistoryWidget from "@/components/ui/tradeWidget/positionHistoryWidget"
import PositionListWidget from "@/components/ui/tradeWidget/positionListWidget"

interface TradePositionWidgetProps {
  contractPrice: number
}

export default function TradePositionWidget({
  contractPrice,
}: TradePositionWidgetProps) {
  return (
    <>
      <Card className="p-4 pb-16 mt-2">
        <StyledTabs defaultValue="Position">
          <div className="flex flex-row justify-between">
            <StyledTabsList>
              <StyledTabsTrigger value="Position">Position</StyledTabsTrigger>
              <StyledTabsTrigger value="Orders">Orders</StyledTabsTrigger>
              <StyledTabsTrigger value="History">History</StyledTabsTrigger>
            </StyledTabsList>
            <div className="flex items-center justify-center gap-2">
              <Checkbox />
              <div className="italic font-semibold">Hide other markets</div>
            </div>
          </div>
          <StyledTabsContent value="Position" className="ml-3">
            <PositionListWidget contractPriceAfter={contractPrice} />
          </StyledTabsContent>
          <StyledTabsContent value="Orders" className="ml-3">
            <OrderListWidget />
          </StyledTabsContent>
          <StyledTabsContent value="History" className="ml-3">
            <PositionHistoryWidget contractPriceAfter={contractPrice} />
          </StyledTabsContent>
        </StyledTabs>
      </Card>
    </>
  )
}
