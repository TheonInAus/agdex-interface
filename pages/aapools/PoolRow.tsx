"use client"

import { Edit3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PositionItem } from "@/components/ui/positionItem"
import {
  StyledTabs,
  StyledTabsContent,
  StyledTabsList,
  StyledTabsTrigger,
} from "@/components/ui/styledTab"

type PoolPowProps = {
  market?: PoolDataType
  expandIndex: number
  onToggle: () => void
}

export type PoolDataType = {
  name: string
  maxAPR: string
  volume: string
  fees: string
  liquidity: string
  myLiquidity: string
  index: number
  marketAddress?: string
}

export default function PoolRow({
  market,
  expandIndex,
  onToggle,
}: PoolPowProps) {
  // const [isExpanded, setIsExpanded] = useState(false)
  const marketLiqList: any = {
    liquidityPositionIncreaseds: [],
  }

  return (
    <>
      <div className="my-2">
        <div className="p-5 cursor-pointer bg-muted" onClick={onToggle}>
          <div
            className="grid grid-cols-6"
            style={{ gridTemplateColumns: "15% 16% 20% 15% 21% auto" }}
          >
            <div className="col-span-1 text-base">{market?.name}</div>
            <div className="col-span-1 text-0xgreen">{market?.maxAPR}</div>
            <div className="col-span-1">{market?.volume}</div>
            <div className="col-span-1">{market?.fees}</div>
            <div className="col-span-1">{market?.liquidity}</div>
            <div className="col-span-1">{market?.myLiquidity}</div>
          </div>
        </div>
        {expandIndex === market?.index && (
          <div className="p-3 bg-muted">
            <StyledTabs defaultValue="Position">
              <StyledTabsList>
                <StyledTabsTrigger value="Position">Position</StyledTabsTrigger>
                {/* <StyledTabsTrigger value="Passive Position Changes(Live)">
                  Passive Position Changes(Live)
                </StyledTabsTrigger> */}
                <StyledTabsTrigger value="History">History</StyledTabsTrigger>
              </StyledTabsList>
              <StyledTabsContent value="Position" className="ml-3">
                <div className="positions-container">
                  <div className="my-2 border-t border-0xline"></div>
                  {marketLiqList &&
                  marketLiqList.liquidityPositionIncreaseds.length > 0 ? (
                    marketLiqList.liquidityPositionIncreaseds.map(
                      (position: any, index: number) => (
                        <div className="flex w-full p-2 mb-1" key={index}>
                          <div className="flex flex-row w-full mt-3">
                            <div className="flex flex-col w-[22%]">
                              <PositionItem
                                keyText="Liquidity"
                                value={`${11}`}
                              />
                              <PositionItem
                                keyText="Utilized Leverage"
                                value={""}
                              />
                            </div>
                            <div className="flex flex-col w-1/5">
                              <PositionItem keyText="Leverage" value={""} />
                              <PositionItem
                                keyText="Temporary Loss"
                                value={""}
                              />
                            </div>
                            <div className="flex flex-col w-[35%]">
                              <PositionItem
                                keyText="Realized Profit"
                                value={`${Number(
                                  position.realizedPnLDelta as unknown as string
                                )}`}
                              />
                              <PositionItem keyText="Risk" value={""} />
                            </div>
                            <div className="flex flex-col w-[17%]">
                              <div className="flex flex-row">
                                <PositionItem
                                  keyText="Margin"
                                  value={`${1}`}
                                  info="ll"
                                />
                                <button className="ml-1">
                                  <Edit3
                                    className="text-white text-opacity-70 hover:text-opacity-100"
                                    size={13}
                                  />
                                </button>
                              </div>
                              <Button className="w-20 h-5 mt-1 text-sm text-white bg-transparent border border-white hover:bg-0xbox">
                                Remove
                              </Button>
                            </div>
                          </div>
                          {/* <PositionItem
                            keyText="Liquidity"
                            value={`${formatEther(
                              (position.liquidity as bigint) || 0n
                            )}`}
                            className="flex w-[20%]"
                          />
                          <PositionItem
                            keyText="Leverage"
                            value={""}
                            className="flex w-[15%]"
                          />
                          <PositionItem
                            keyText="Realized Profit"
                            value={`${formatEther(
                              (position.realizedProfitGrowthX64 as bigint) || 0n
                            )}`}
                            className="flex w-[33%]"
                          />
                          <PositionItem
                            keyText="Margin"
                            value={`${formatEther(
                              (position.margin as bigint) || 0n
                            )}`}
                            className="flex w-[20%]"
                          /> */}
                          {/* <div className="flex-1 text-left">{`Position ID: ${position.positionID}`}</div> */}
                          {/* <div className="flex-1 text-left">{`Account: ${position.account.slice(
                              0,
                              6
                            )}`}</div> */}
                          {/* <div className="flex-1 text-left">{`Liquidity: ${formatEther(
                              (position.liquidity as bigint) || 0n
                            )}`}</div> */}
                          {/* </div> */}
                          {/* <div key={index} className="flex justify-between">
                            <PositionItem
                              keyText="Utilized Leverage"
                              value={""}
                              className="flex w-[18%]"
                            />
                            <PositionItem
                              keyText="Temporary Loss"
                              value={""}
                              className="flex w-[18%]"
                            />
                            <PositionItem
                              keyText="Risk"
                              value={""}
                              className="flex w-[15%]"
                            /> */}
                          {/* <div className="flex-1 text-left">{`EntryUnrealizedLoss: ${position.entryUnrealizedLoss}`}</div>
                            <div className="flex-1 text-left">{`Margin: ${formatEther(
                              (position.margin as bigint) || 0n
                            )}`}</div>
                            <div className="flex-1 text-left">{`RealizedProfitGrowthX64: ${formatEther(
                              (position.realizedProfitGrowthX64 as bigint) || 0n
                            )}`}</div> */}
                          {/* </div> */}
                          <div className="my-2 border-t border-0xline"></div>
                        </div>
                      )
                    )
                  ) : (
                    <div className="no-positions">No open positions</div>
                  )}
                </div>
              </StyledTabsContent>
              {/* <StyledTabsContent
                value="Passive Position Changes(Live)"
                className="ml-3"
              >
                <div className="positions-container">
                  <div className="my-2 border-t border-0xline"></div>
                </div>
              </StyledTabsContent> */}
              <StyledTabsContent value="History" className="ml-3">
                <div className="positions-container">
                  <div className="my-2 border-t border-0xline"></div>
                </div>
              </StyledTabsContent>
            </StyledTabs>
          </div>
        )}
      </div>
    </>
  )
}
