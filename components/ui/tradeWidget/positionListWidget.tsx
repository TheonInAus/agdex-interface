import { useEffect, useState } from "react"
import {
  APTOS_ADDRESS,
  calEntryPrice,
  calEstLiqPrice,
  calLeverage,
  calUnPnL,
  getAllUserPositions,
  getPositionResources,
  getTableHandle,
  parseAptosDecimal,
} from "@/chainio/fetchData"
import useTokenStore from "@/chainio/useTokenStore"
import { moduleAddress } from "@/pages/_app"
import { APTOS_COIN } from "@aptos-labs/ts-sdk"
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { Separator } from "@radix-ui/react-select"
import { Edit3, ExternalLink, Loader2 } from "lucide-react"
import { enqueueSnackbar } from "notistack"

import { Button } from "@/components/ui/button"
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
import { PositionItem } from "@/components/ui/positionItem"

import ClosePositionWidget from "./closePositionWidget"

type PositionListWidgetType = {
  symbolPrice: number
  vaultPrice: number
}

export default function PositionListWidget({
  symbolPrice,
  vaultPrice,
}: PositionListWidgetType) {
  const handleSetCurrentPosition = (position: any) => {}
  const [longPostionHandle, setLongPositionHandle] = useState("")
  const [shortPositionHandle, setShortPositionHandle] = useState("")
  const { account } = useWallet()
  const { vault, symbol } = useTokenStore()
  const fetchPositionHandles = async () => {
    try {
      const { result } = await getTableHandle(
        moduleAddress,
        getPositionResources(
          vault.tokenAddress as APTOS_ADDRESS,
          symbol.tokenAddress as APTOS_ADDRESS,
          "LONG"
        )
      )
      setLongPositionHandle(result.positions.handle)
    } catch (error: any) {
      setLongPositionHandle("")
    }
    try {
      const { result } = await getTableHandle(
        moduleAddress,
        getPositionResources(
          vault.tokenAddress as APTOS_ADDRESS,
          symbol.tokenAddress as APTOS_ADDRESS,
          "SHORT"
        )
      )
      setShortPositionHandle(result.positions.handle)
    } catch (error: any) {
      setLongPositionHandle("")
    }
  }
  useEffect(() => {
    if (account?.address) {
      fetchPositionHandles()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.address, vault, symbol])

  const [longPositionData, setLongPositionData] = useState<any[]>([])
  const [shortPositionData, setShortpositionData] = useState<any[]>([])
  const [combineData, setCombineData] = useState<any[]>([])
  console.log("🚀 ~ combineData:", combineData)
  const fetchPositions = async (type: string) => {
    try {
      const result = await getAllUserPositions(
        account?.address || "",
        type === "LONG" ? longPostionHandle : shortPositionHandle
      )
      console.log("🚀 ~ fetchPositions ~ result:", result)
      if (type === "LONG") {
        setLongPositionData(result)
      } else {
        setShortpositionData(result)
      }
    } catch (error) {
      if (type === "LONG") {
        setLongPositionData([])
      } else {
        setShortpositionData([])
      }
    }
  }
  useEffect(() => {
    if (longPostionHandle) {
      fetchPositions("LONG")
    } else {
      setLongPositionData([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [longPostionHandle])

  useEffect(() => {
    if (shortPositionHandle) {
      fetchPositions("SHORT")
    } else {
      setShortpositionData([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortPositionHandle])

  useEffect(() => {
    const sideLongPositionData = longPositionData.map((item) => ({
      ...item,
      side: "LONG",
    }))
    const sideShortPositionData = shortPositionData.map((item) => ({
      ...item,
      side: "SHORT",
    }))
    const combinedData: any[] = [
      ...sideLongPositionData,
      ...sideShortPositionData,
    ]
    const sortedData: any[] = combinedData.sort((a, b) => {
      const dateA = new Date(a.open_timestamp).getTime()
      const dateB = new Date(b.open_timestamp).getTime()
      return dateB - dateA
    })
    setCombineData(sortedData)
  }, [longPositionData, shortPositionData])

  return (
    <div>
      <div className="mb-4 border-t border-0xline"></div>
      {combineData.length > 0 ? (
        <>
          {combineData.map((position, index) => (
            <div key={index}>
              <div className="flex flex-row gap-2 font-extrabold">
                <div>{symbol.name}</div>
                <div
                  className={`${
                    position.side === "LONG" ? "text-0xgreen" : "text-0xred"
                  }`}
                >
                  {position.side}{" "}
                  {calLeverage(
                    Number(position.decoded_value.position_amount),
                    Number(position.decoded_value.collateral.value)
                  )}
                  x
                </div>
              </div>
              <div className="flex flex-row justify-between w-full mt-3">
                <div className="flex flex-col">
                  <PositionItem
                    keyText="Size"
                    value={`${Number(
                      parseAptosDecimal(
                        Number(position.decoded_value.position_size.value),
                        18
                      ).toFixed(6)
                    )} USD`}
                  />
                  <div className="flex flex-row items-center mt-2">
                    <CustomTooltip
                      triggerContent={
                        <div className="text-sm mr-7">Collateral</div>
                      }
                    >
                      <p>{`This is Margin You've put into the Position `}</p>
                    </CustomTooltip>
                    <CustomTooltip
                      triggerContent={
                        <div className="font-bold">
                          {`${parseAptosDecimal(
                            position.decoded_value.collateral.value,
                            vault.decimal
                          )} ${vault.name}`}
                        </div>
                      }
                    >
                      <p>Margin Based</p>
                    </CustomTooltip>
                    {/* <Dialog>
                      <DialogTrigger asChild>
                        <button className="ml-1">
                          <Edit3
                            className="text-opacity-70 hover:text-opacity-100"
                            size={13}
                            onClick={() => handleSetCurrentPosition(position)}
                          />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] bg-0xdialog">
                        <DialogHeader>
                          <DialogTitle className="mb-2 text-center">
                            Edit Margin
                          </DialogTitle>
                        </DialogHeader>
                        <StyledTabs defaultValue="Add Margin">
                          <StyledTabsList className="border-none">
                            <StyledTabsTrigger
                              value="Add Margin"
                              className="p-0 mr-3 text-sm"
                            >
                              Add Margin
                            </StyledTabsTrigger>
                            <StyledTabsTrigger
                              value="Reduce Margin"
                              className="p-0 text-sm"
                            >
                              Reduce Margin
                            </StyledTabsTrigger>
                          </StyledTabsList>
                          <StyledTabsContent value="Add Margin">
                            <AddMarginWidget positionInfo={position} />
                          </StyledTabsContent>
                          <StyledTabsContent value="Reduce Margin">
                            <ReduceMarginWidget positionInfo={position} />
                          </StyledTabsContent>
                        </StyledTabs>
                      </DialogContent>
                    </Dialog> */}
                  </div>
                </div>
                <div className="flex flex-col">
                  <PositionItem
                    keyText="Entry Price"
                    value={calEntryPrice(
                      parseAptosDecimal(
                        Number(position.decoded_value.position_size.value),
                        18
                      ),
                      parseAptosDecimal(
                        Number(position.decoded_value.position_amount),
                        vault.decimal
                      )
                    )}
                  />
                  <div className="flex mt-2 gap-7">
                    <CustomTooltip
                      triggerContent={<div className="text-sm">Liq. Price</div>}
                    >
                      <p>Est Liq Price</p>
                    </CustomTooltip>
                    <div className="font-bold">
                      {calEstLiqPrice(
                        parseAptosDecimal(
                          Number(position.decoded_value.position_size.value),
                          18
                        ),
                        parseAptosDecimal(
                          Number(position.decoded_value.position_amount),
                          symbol.decimal
                        ),
                        parseAptosDecimal(
                          position.decoded_value.collateral.value,
                          8
                        ),
                        position.side
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <PositionItem
                    keyText="Market Price"
                    value={`${symbolPrice.toFixed(6)} USD`}
                    info={""}
                  />
                  <div className="flex flex-row mt-2">
                    <CustomTooltip
                      triggerContent={
                        <div className="text-sm mr-7">Unrealized Pnl.</div>
                      }
                    >
                      <p>UnPNL</p>
                    </CustomTooltip>
                    <div
                      className={`font-bold ${
                        Number(
                          calUnPnL(
                            parseAptosDecimal(
                              Number(
                                position.decoded_value.position_size.value
                              ),
                              18
                            ),
                            parseAptosDecimal(
                              Number(position.decoded_value.position_amount),
                              symbol.decimal
                            ),
                            parseAptosDecimal(
                              position.decoded_value.collateral.value,
                              vault.decimal
                            ),
                            symbolPrice,
                            position.side
                          )
                        ) >= 0
                          ? "text-0xgreen"
                          : "text-0xred"
                      }`}
                    >
                      {calUnPnL(
                        parseAptosDecimal(
                          Number(position.decoded_value.position_size.value),
                          18
                        ),
                        parseAptosDecimal(
                          Number(position.decoded_value.position_amount),
                          symbol.decimal
                        ),
                        parseAptosDecimal(
                          position.decoded_value.collateral.value,
                          8
                        ),
                        symbolPrice,
                        position.side
                      )}{" "}
                      {"USD"}
                    </div>

                    <ExternalLink
                      className="mt-1 ml-1 text-opacity-70 hover:text-opacity-100"
                      size={13}
                    />
                  </div>
                </div>
                <div className="flex flex-row">
                  {/* <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => handleSetCurrentPosition(position)}
                        className="h-5 text-sm text-white bg-transparent border border-white hover:bg-0xbox"
                      >
                        TP/SL
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-0xdialog">
                      <DialogHeader>
                        <DialogTitle className="mb-5 text-center">
                          TP/SL
                        </DialogTitle>
                        <DialogDescription>
                          <TpslDescWidget positionItem={position} />
                        </DialogDescription>
                      </DialogHeader>
                      <TpslStyledTabContent positionInfo={position} />
                    </DialogContent>
                  </Dialog> */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        disabled={false}
                        className="h-8 text-base bg-transparent border text-agdexMain border-agdexMain hover:bg-0xbox"
                        onClick={() => handleSetCurrentPosition(position)}
                      >
                        Close
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-0xdialog">
                      <DialogHeader>
                        <DialogTitle className="mb-5 text-center">
                          Close
                        </DialogTitle>
                        <DialogDescription>
                          <ClosePositionWidget
                            positionNum={position.decoded_key.id}
                            leverageNumber={calLeverage(
                              parseAptosDecimal(
                                Number(position.decoded_value.position_amount),
                                symbol.decimal
                              ),
                              parseAptosDecimal(
                                Number(position.decoded_value.collateral.value),
                                vault.decimal
                              )
                            )}
                            side={position.side}
                            collateral={parseAptosDecimal(
                              position.decoded_value.collateral.value,
                              vault.decimal
                            )}
                            positionAmount={Number(
                              position.decoded_value.position_amount
                            )}
                            entryPrice={Number(
                              calEntryPrice(
                                parseAptosDecimal(
                                  Number(
                                    position.decoded_value.position_size.value
                                  ),
                                  18
                                ),
                                parseAptosDecimal(
                                  Number(
                                    position.decoded_value.position_amount
                                  ),
                                  symbol.decimal
                                )
                              )
                            )}
                            symbolPrice={symbolPrice}
                            vaultPrice={vaultPrice}
                            liqPrice={Number(
                              calEstLiqPrice(
                                parseAptosDecimal(
                                  Number(
                                    position.decoded_value.position_size.value
                                  ),
                                  18
                                ),
                                parseAptosDecimal(
                                  Number(
                                    position.decoded_value.position_amount
                                  ),
                                  symbol.decimal
                                ),
                                parseAptosDecimal(
                                  position.decoded_value.collateral.value,
                                  vault.decimal
                                ),
                                position.side
                              )
                            )}
                            PnL={Number(
                              calUnPnL(
                                parseAptosDecimal(
                                  Number(
                                    position.decoded_value.position_size.value
                                  ),
                                  18
                                ),
                                parseAptosDecimal(
                                  Number(
                                    position.decoded_value.position_amount
                                  ),
                                  symbol.decimal
                                ),
                                parseAptosDecimal(
                                  position.decoded_value.collateral.value,
                                  vault.decimal
                                ),
                                symbolPrice,
                                position.side
                              )
                            )}
                          />
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="mt-4 border-b border-b-popover"></div>
              <br></br>
            </div>
          ))}
        </>
      ) : (
        <>
          <div>No open positions</div>
        </>
      )}
    </div>
  )
}
