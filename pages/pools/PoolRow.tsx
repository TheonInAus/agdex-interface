import { formatEther } from "viem"

import { useLiqPoolsForAccount } from "@/hooks/liquidityPoolInfo"
import { Button } from "@/components/ui/button"
import { PositionItem } from "@/components/ui/positionItem"
import { Edit3 } from "lucide-react"
import {
  StyledTabs,
  StyledTabsContent,
  StyledTabsList,
  StyledTabsTrigger,
} from "@/components/ui/styledTab"

type PoolPowProps = {
  pool: PoolDataType
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
  tokenAddress: string
  poolAddress: string
  index: number
}

export const PoolRow = ({ pool, expandIndex, onToggle }: PoolPowProps) => {
  // const [isExpanded, setIsExpanded] = useState(false)
  const { liqPoolsData: poolDatas } = useLiqPoolsForAccount(pool.poolAddress)

  return (
    <>
      <div className="m-2 text-sm text-white border rounded-lg cursor-pointer border-0xline bg-0xbox">
        <div className="p-5 cursor-pointer" onClick={onToggle}>
          <div
            className="grid grid-cols-6"
            style={{ gridTemplateColumns: "15% 16% 20% 15% 21% auto" }}
          >
            <div className="col-span-1 text-base">{pool.name}</div>
            <div className="col-span-1 text-0xgreen">{pool.maxAPR}</div>
            <div className="col-span-1">{pool.volume}</div>
            <div className="col-span-1">{pool.fees}</div>
            <div className="col-span-1">{pool.liquidity}</div>
            <div className="col-span-1">{pool.myLiquidity}</div>
          </div>
        </div>
        {expandIndex === pool.index && (
          <div
            className="p-3 rounded-b-lg"
            style={{ backgroundColor: "#080808" }}
          >
            <StyledTabs defaultValue="Position">
              <StyledTabsList>
                <StyledTabsTrigger value="Position">Position</StyledTabsTrigger>
                <StyledTabsTrigger value="History">History</StyledTabsTrigger>
              </StyledTabsList>
              <StyledTabsContent value="Position" className="ml-3">
                <div className="positions-container">
                  <div className="my-2 border-t border-0xline"></div>
                  {poolDatas &&
                  poolDatas.liquidityPositionOpeneds.length > 0 ? (
                    poolDatas.liquidityPositionOpeneds.map(
                      (position, index) => (
                        <div className="flex w-full p-2 mb-1 bg-0xblack">
                          <div className="flex flex-row w-full mt-3">
                            <div className="flex flex-col w-[22%]">
                              <PositionItem
                                keyText="Liquidity"
                                value={`${formatEther(
                                  (position.liquidity as bigint) || 0n
                                )}`}
                              />
                              <PositionItem
                                keyText="Utilized Leverage"
                                value={""}
                              />
                            </div>
                            <div className="flex flex-col w-[20%]">
                              <PositionItem keyText="Leverage" value={""} />
                              <PositionItem
                                keyText="Temporary Loss"
                                value={""}
                              />
                            </div>
                            <div className="flex flex-col w-[35%]">
                              <PositionItem
                                keyText="Realized Profit"
                                value={`${formatEther(
                                  (position.realizedProfitGrowthX64 as bigint) ||
                                    0n
                                )}`}
                              />
                              <PositionItem keyText="Risk" value={""} />
                            </div>
                            <div className="flex flex-col w-[17%]">
                              <div className="flex flex-row">
                                <PositionItem
                                  keyText="Margin"
                                  value={`${formatEther(
                                    (position.margin as bigint) || 0n
                                  )}`}
                                  info="ll"
                                />
                                <button className="ml-1">
                                  <Edit3
                                    className="text-white text-opacity-70 hover:text-opacity-100"
                                    size={13}
                                  />
                                </button>
                              </div>
                              <Button className="h-5 w-20 text-sm text-white bg-transparent hover:bg-0xbox border border-white mt-1">
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
              <StyledTabsContent
                value="History"
                className="ml-3"
              ></StyledTabsContent>
            </StyledTabs>
          </div>
        )}
      </div>
    </>
  )
}