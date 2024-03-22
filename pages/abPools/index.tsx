import useTokenConfigStore from "@/hooks/useTokenConfigStore"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CustomTooltip } from "@/components/ui/customToolTip"
import { InputBox } from "@/components/ui/inputBox"
import { ListItem } from "@/components/ui/listItem"
import { PositionItem } from "@/components/ui/positionItem"
import { Stats } from "@/components/ui/stats"
import {
  StyledTabs,
  StyledTabsContent,
  StyledTabsList,
  StyledTabsTrigger,
} from "@/components/ui/styledTab"
import TokenPairWidget from "@/components/ui/tokenPair/TokenPairWidget"
import { UnStats } from "@/components/ui/unStats"
import TradingViewWidgetSmall from "@/components/tradingViewSmall"

export default function PrepPoolsWidget() {
  const currentTokenEntity = useTokenConfigStore(
    (state: any) => state.currentTokenEntity
  )
  const poolList: any[] = [
    {
      token: "SUI",
      price: "$1.67526",
      available: "133,256.53",
      reserve: "133,256.53",
      targetWeight: "20%",
      currentWeight: "10%",
      utilization: "23.46%",
    },
    {
      token: "USDC",
      price: "$0.99997",
      available: "2123,256.53",
      reserve: "33,222.53",
      targetWeight: "60%",
      currentWeight: "32%",
      utilization: "15.46%",
    },
    {
      token: "USDT",
      price: "$1.0009",
      available: "755,656.53",
      reserve: "83,2536.53",
      targetWeight: "76%",
      currentWeight: "23%",
      utilization: "3.46%",
    },
  ]

  return (
    <section className="container flex items-center justify-center gap-6 pt-6 pb-8">
      <div className="flex flex-col gap-4 w-[1250px]">
        <Card className="bg-transparent">
          <div className="flex flex-row items-center justify-between px-10 py-4">
            <TokenPairWidget token1={currentTokenEntity.name} token2={"USDX"} />
            <Stats title={"Price"} value={`$ 100`} />
            <Stats title={"Total Supple"} value={`0 ALP`} />
            <Stats title={"Market Cap"} value={`$ 98`} />
            <Stats title={"APR"} value={`0%`} />
            <Stats title={"Stake Reward"} value={`0%`} />
          </div>
        </Card>
        <div className="w-full text-base   font-bold text-center bg-popover">
          Mint ALP Tokens to earn fees from swaps and leverage tradings.
          <a href="google.com" className="text-0xyellow underline ml-2">
            Learn more
          </a>
        </div>

        <Card className="p-6 bg-secondary">
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col">
              <div className="flex flex-col">
                <div className="text-2xl   font-extrabold text-0xyellow">
                  {" "}
                  Stake To Earn Reward
                </div>

                <div className="w-[650px] mt-5 font-medium">
                  {" "}
                  You can stake ALP to receive SUI as the reward. The amount of
                  SUI you receive is determined by your share in the Stake Pool,
                  and rewards are settled every second.
                </div>
              </div>
              <div className="h-[50px]" />
              <div className="flex flex-col">
                <div className="text-lg   font-extrabold text-0xyellow">
                  {" "}
                  Portfolio
                </div>
                <div className="flex flex-row justify-between mt-2 w-[500px]">
                  <UnStats title={"Unstaked"} value={`0 ALP`} />
                  <div className="h-full border border-muted" />
                  <UnStats title={"Staked"} value={`0 ALP`} />
                  <div className="h-full border border-muted" />
                  <UnStats title={"Claimable rewards"} value={`0 Ap`} />
                </div>
              </div>
            </div>
            <div>
              <StyledTabs defaultValue="stake" className="w-[400px] ">
                <StyledTabsList className="w-[400px] h-[40px]">
                  <StyledTabsTrigger
                    value="stake"
                    className="flex justify-center w-1/2 h-full"
                  >
                    Stake
                  </StyledTabsTrigger>
                  <StyledTabsTrigger
                    value="unstake"
                    className="flex justify-center w-1/2 h-full"
                  >
                    Unstake
                  </StyledTabsTrigger>
                </StyledTabsList>
                <StyledTabsContent value={"stake"}>
                  <InputBox
                    title="Stake Amount"
                    value={""}
                    suffix="USDX"
                    maxNode={<div className="rounded-xl">max</div>}
                  />
                </StyledTabsContent>
                <StyledTabsContent value={"unstake"}>
                  <InputBox
                    title="Unstake Amount"
                    value={""}
                    suffix="USDX"
                    maxNode={<div className="rounded-xl">max</div>}
                  />
                </StyledTabsContent>
                <Button className="w-full h-[50px] mt-6 bg-0xyellow text-xl font-bold">
                  Stake
                </Button>
              </StyledTabs>
            </div>
          </div>
        </Card>

        <Card className="bg-transparent">
          <div className="flex flex-row gap-5 p-2">
            <div className="flex-1">
              <TradingViewWidgetSmall tokenName={currentTokenEntity.name} />
            </div>
            <div>
              <StyledTabs defaultValue="buy" className="w-[400px] ">
                <StyledTabsList className="w-[400px] h-[40px]">
                  <StyledTabsTrigger
                    value="buy"
                    className="flex justify-center w-1/2 h-full"
                  >
                    Buy ALP
                  </StyledTabsTrigger>
                  <StyledTabsTrigger
                    value="sell"
                    className="flex justify-center w-1/2 h-full"
                  >
                    Sell ALP
                  </StyledTabsTrigger>
                </StyledTabsList>
                <StyledTabsContent value={"buy"}>
                  <InputBox
                    title="ALP Amount"
                    value={""}
                    suffix="USDX"
                    maxNode={<div className="rounded-xl">max</div>}
                  />
                </StyledTabsContent>
                <StyledTabsContent value={"sell"}>
                  <InputBox
                    title="ALP Amount"
                    value={""}
                    suffix="USDX"
                    maxNode={<div className="rounded-xl">max</div>}
                  />
                </StyledTabsContent>
                <ListItem
                  keyText="Fees"
                  value={"0%"}
                  percentage={`${0}%`}
                />
                <Button className="w-full h-[50px] mt-6 bg-0xyellow text-xl font-bold">
                  Pay
                </Button>
              </StyledTabs>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-transparent">
          <div className="text-2xl   font-bold text-0xyellow">
            Pool Overview
          </div>

          <div className="flex flex-row justify-between p-5  ">
            <div className="w-[10%]">Token</div>
            <div className="w-[10%]">Price</div>
            <div className="w-[20%]">Avaliable</div>
            <div className="w-[20%]">Reserve</div>
            <div className="w-[15%]">Target Weight</div>
            <div className="w-[15%]">Current Weight</div>
            <div className="w-[10%]">Utilization</div>
          </div>
          <div className="border bg-0xline" />
          <div>
            {poolList.map((item, index) => (
              <div className="flex flex-row justify-between p-5 text-lg font-extrabold">
                <div className="w-[10%]">{item.token}</div>
                <div className="w-[10%]">{item.price}</div>
                <div className="w-[20%]">{item.available}</div>
                <div className="w-[20%]">{item.reserve}</div>
                <div className="w-[15%]">{item.targetWeight}</div>
                <div className="w-[15%]">{item.currentWeight}</div>
                <div className="w-[10%]">{item.utilization}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}
