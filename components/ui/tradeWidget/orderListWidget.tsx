import { useEffect, useState } from "react"
import { AlertCircle, Edit3, ExternalLink, Loader2 } from "lucide-react"

type Side = {}
type PositionInfo = {
  poolAddress: any
  side: Side
  marginDelta: any
  sizeDelta: any
  acceptableTradePriceX96: any
}

export default function OrderListWidget() {
  const [currentPosition, setCurrentPosition] = useState<PositionInfo>()

  const handleCancelOrder = (position: any) => {}

  return (
    <div>
      <div className="mt-2 mb-4 border-t border-0xline"></div>

      <>
        <div>No open orders</div>
      </>
    </div>
  )
}
