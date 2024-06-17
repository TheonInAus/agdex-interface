import { useEffect, useState } from "react"
import {
  calLeverage,
  getAllUserOrderRecords,
  getAllUserPositions,
  getOrderRecordResources,
  getTableHandle,
  parseAptosDecimal,
} from "@/chainio/fetchData"
import useTokenStore from "@/chainio/useTokenStore"
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { AlertCircle, Edit3, ExternalLink, Loader2 } from "lucide-react"
import { enqueueSnackbar } from "notistack"

import { CustomTooltip } from "../customToolTip"
import { PositionItem } from "../positionItem"

type Side = {}
type PositionInfo = {
  poolAddress: any
  side: Side
  marginDelta: any
  sizeDelta: any
  acceptableTradePriceX96: any
}

export default function OrderListWidget() {
  const [longOrderHandleInc, setLongOrderHandleInc] = useState("")
  const [longOrderHandleDec, setLongOrderHandleDec] = useState("")
  const [shortOrderHandleInc, setShortOrderHandleInc] = useState("")

  const [shortOrderHandleDec, setShortOrderHandleDec] = useState("")

  const { account } = useWallet()
  const { vault, symbol } = useTokenStore()

  const fetchOrderRecordHandles = async () => {
    try {
      const { result } = await getTableHandle(
        account?.address || "",
        getOrderRecordResources(
          vault.tokenAddress as `${string}::${string}::${string}`,
          symbol.tokenAddress as `${string}::${string}::${string}`,
          "LONG",
          vault.tokenAddress as `${string}::${string}::${string}`
        )
      )
      if (result) {
        setLongOrderHandleInc(result.open_orders.handle)
        setLongOrderHandleDec(result.decrease_orders.handle)
      }
    } catch (error: any) {
      enqueueSnackbar(`${error?.message}`, { variant: "error" })
    }
    try {
      const { result } = await getTableHandle(
        account?.address || "",
        getOrderRecordResources(
          vault.tokenAddress as `${string}::${string}::${string}`,
          symbol.tokenAddress as `${string}::${string}::${string}`,
          "SHORT",
          vault.tokenAddress as `${string}::${string}::${string}`
        )
      )
      if (result) {
        setShortOrderHandleInc(result.open_orders.handle)
        setShortOrderHandleDec(result.decrease_orders.handle)
      }
    } catch (error: any) {
      enqueueSnackbar(`${error?.message}`, { variant: "error" })
    }
  }

  useEffect(() => {
    if (account?.address) {
      fetchOrderRecordHandles()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.address])

  const [longOrderIncData, setLongOrderIncData] = useState<any[]>([])
  const [longOrderDecData, setLongOrderDecData] = useState<any[]>([])
  const [shortOrderIncData, setShortOrderIncData] = useState<any[]>([])
  const [shortOrderDecData, setShortOrderDecData] = useState<any[]>([])

  const fetchPositions = async (type: string) => {
    let handleType = ""
    switch (type) {
      case "LONG_INC":
        handleType = longOrderHandleInc
        break
      case "LONG_DEC":
        handleType = longOrderHandleDec
        break
      case "SHORT_INC":
        handleType = shortOrderHandleInc
        break
      case "SHORT_DEC":
        handleType = shortOrderHandleDec
        break
    }

    const result = await getAllUserOrderRecords(
      account?.address || "",
      handleType
    )
    switch (type) {
      case "LONG_INC":
        setLongOrderIncData(result)
        break
      case "LONG_DEC":
        setLongOrderDecData(result)
        break
      case "SHORT_INC":
        setShortOrderIncData(result)
        break
      case "SHORT_DEC":
        setShortOrderDecData(result)
        break
    }
  }
  const [combineData, setCombineData] = useState<any[]>([])
  console.log("🚀 ~ OrderListWidget ~ combineData:", combineData)

  useEffect(() => {
    const sideLongInc = longOrderIncData.map((item) => ({
      ...item,
      side: "LONG",
      type: "INC",
    }))
    const sideLongDec = longOrderDecData.map((item) => ({
      ...item,
      side: "LONG",
      type: "DEC",
    }))
    const sideShortInc = shortOrderIncData.map((item) => ({
      ...item,
      side: "SHORT",
      type: "INC",
    }))
    const sideShortDec = shortOrderDecData.map((item) => ({
      ...item,
      side: "SHORT",
      type: "DEC",
    }))
    const combinedData: any[] = [
      ...sideLongInc,
      ...sideLongDec,
      ...sideShortInc,
      ...sideShortDec,
    ]

    const sortedData: any[] = combinedData.sort((a, b) => {
      const dateA = new Date(a.transaction_version).getTime()
      const dateB = new Date(b.transaction_version).getTime()
      return dateB - dateA
    })
    setCombineData(sortedData)
  }, [longOrderIncData, longOrderDecData, shortOrderIncData, shortOrderDecData])

  useEffect(() => {
    if (longOrderHandleInc) {
      fetchPositions("LONG_INC")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [longOrderHandleInc])

  useEffect(() => {
    if (longOrderHandleDec) {
      fetchPositions("LONG_DEC")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [longOrderHandleDec])

  useEffect(() => {
    if (shortOrderHandleInc) {
      fetchPositions("SHORT_INC")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortOrderHandleInc])

  useEffect(() => {
    if (shortOrderHandleDec) {
      fetchPositions("SHORT_DEC")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortOrderHandleDec])

  return (
    <div>
      <div className="mb-4 border-t border-0xline"></div>
      {combineData.length > 0 ? (
        <>
          {combineData.map((order, index) => (
            <div key={index}>
              <div className="flex flex-row gap-2 font-extrabold">
                <div>{`symbol`}</div>
                <div
                  className={`${
                    order.side === "LONG" ? "text-0xgreen" : "text-0xred"
                  }`}
                >
                  {order.side} {order.type} {"ORDER"}
                </div>
              </div>
              <div className="flex flex-row justify-between w-full mt-3">
                <div className="flex flex-col">
                  {order.type === "INC" ? (
                    <div className="flex flex-col">
                      <PositionItem
                        keyText="Take Profit"
                        value={order.decoded_value.take_profit ? "YES" : "NO"}
                      />
                      <PositionItem
                        keyText="Amount"
                        value={parseAptosDecimal(
                          Number(order.decoded_value.open_amount),
                          8
                        )}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <PositionItem
                        keyText="Take Profit"
                        value={order.decoded_value.take_profit ? "YES" : "NO"}
                      />
                      <PositionItem
                        keyText="Amount"
                        value={parseAptosDecimal(
                          Number(order.decoded_value.decrease_amount),
                          8
                        )}
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <PositionItem
                    keyText="Price Threshold"
                    value={parseAptosDecimal(
                      Number(
                        order.decoded_value.collateral_price_threshold.value
                      ),
                      8
                    )}
                  />

                  <PositionItem
                    keyText="Executed"
                    value={order.decoded_value.executed ? "Y" : "N"}
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <CustomTooltip
                      triggerContent={
                        <div className="text-sm mr-7">Limited Index Price.</div>
                      }
                    >
                      <p>{`This is the index price from CEX`}</p>
                    </CustomTooltip>
                    <div className={`font-bold ${"text-0xgreen"}`}>
                      {" "}
                      {parseAptosDecimal(
                        Number(
                          order.decoded_value.limited_index_price.price.value
                        ),
                        18
                      ).toFixed(6)}
                    </div>

                    <ExternalLink
                      className="mt-1 ml-1 text-opacity-70 hover:text-opacity-100"
                      size={13}
                    />
                  </div>
                </div>
                <div className="flex flex-row"></div>
              </div>
              <div className="mt-4 border-b border-b-popover"></div>
              <br></br>
            </div>
          ))}
        </>
      ) : (
        <>
          <div>No open Orders</div>
        </>
      )}
    </div>
  )
}
