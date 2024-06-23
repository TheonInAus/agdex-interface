import { useEffect, useRef, useState } from "react"
import { LpToken, VaultList } from "@/chainio/helper"
import { usePriceData } from "@/chainio/usePriceData"
import useTokenStore from "@/chainio/useTokenStore"
import { useWallet } from "@aptos-labs/wallet-adapter-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  StyledTabs,
  StyledTabsContent,
  StyledTabsList,
  StyledTabsTrigger,
} from "@/components/ui/styledTab"
import TradingViewWidgetSmall from "@/components/tradingViewSmall"

import { aptos, moduleAddress } from "../_app"
import BuyLpWidget from "./buyLpWidget"
import SellLpWidget from "./sellLpWidget"
import VaultItemWidget from "./vaultItemWidget"

export default function PrepPoolsWidget() {
  const { priceDatas, error } = usePriceData()

  return (
    <section className="container flex items-center justify-center gap-6 pt-6 pb-8">
      <div className="flex flex-col gap-4 w-[1250px]">
        <Card>
          <div className="flex flex-row gap-5 p-2">
            <div className="flex-1">
              <TradingViewWidgetSmall tokenName={"APT"} />
            </div>
            <StyledTabs defaultValue="buy" className="w-[400px] ">
              <StyledTabsList className="w-[400px] h-[40px]">
                <StyledTabsTrigger
                  value="buy"
                  className="flex justify-center w-1/2 h-full"
                >
                  Buy AGLP
                </StyledTabsTrigger>
                <StyledTabsTrigger
                  value="sell"
                  className="flex justify-center w-1/2 h-full"
                >
                  Sell AGLP
                </StyledTabsTrigger>
              </StyledTabsList>
              <StyledTabsContent value={"buy"}>
                <BuyLpWidget />
              </StyledTabsContent>
              <StyledTabsContent value={"sell"}>
                <SellLpWidget />
              </StyledTabsContent>
            </StyledTabs>
          </div>
        </Card>
        <Card>
          <div className="text-2xl font-bold text-agdexMain">Pool Overview</div>

          <div className="flex flex-row justify-between p-5 ">
            <div className="w-[10%]">Token</div>
            <div className="w-[10%]">Price</div>
            <div className="w-[15%] text-right">Avaliable</div>
            <div className="w-[15%] text-right">Reserve</div>
            <div className="w-[15%] text-right">Target Weight</div>
            <div className="w-1/5 text-right">Current Weight</div>
            <div className="w-1/5 text-right">Utilization</div>
          </div>
          <div className="border bg-0xline" />
          <div>
            {VaultList.map((item, index) => (
              <VaultItemWidget
                key={index}
                vaultInfo={item}
                priceDatas={priceDatas}
              />
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}

{
  /* <Card> */
}
{
  /* <div className="flex flex-row items-center justify-between px-10 py-4">
            <TokenPairWidget token0={"USDC"} token1={"USDT"} />
            <Stats title={"Price"} value={`$ 100`} />
            <Stats title={"Total Supple"} value={`0 AGLP`} />
            <Stats title={"Market Cap"} value={`$ 98`} />
            <Stats title={"APR"} value={`0%`} />
            <Stats title={"Stake Reward"} value={`0%`} />
          </div>
        </Card>
        <div className="flex items-center justify-center w-full text-base font-bold bg-0xbox">
          <Iconify icon="iconoir:light-bulb-on" />
          <div>
            Mint AGLP Tokens to earn fees from swaps and leverage tradings.
          </div>
          <a href="google.com" className="ml-2 underline text-agdexMain">
            Learn more
          </a>
        </div> */
}

{
  /* <Card className="p-6">
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col">
              <div className="flex flex-col">
                <div className="text-2xl font-extrabold text-agdexMain">
                  {" "}
                  Stake To Earn Reward
                </div>

                <div className="w-[650px] mt-5 font-medium">
                  {" "}
                  You can stake AGLP to receive AGT as the reward. The amount of
                  AGT you receive is determined by your share in the Stake Pool,
                  and rewards are settled every second.
                </div>
              </div>
              <div className="h-[50px]" />
              <div className="flex flex-col">
                <div className="text-lg font-extrabold text-agdexMain">
                  {" "}
                  Portfolio
                </div>
                <div className="flex flex-row justify-between mt-2 w-[500px]">
                  <UnStats title={"Unstaked"} value={`0 AGLP`} />
                  <div className="h-full border border-muted" />
                  <UnStats title={"Staked"} value={`0 AGLP`} />
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
                  <TokenInputBox
                    title="Stake Amount"
                    value={""}
                    maxNode={<div className="rounded-xl">max</div>}
                  />
                </StyledTabsContent>
                <StyledTabsContent value={"unstake"}>
                  <TokenInputBox
                    title="Unstake Amount"
                    value={""}
                    maxNode={<div className="rounded-xl">max</div>}
                  />
                </StyledTabsContent>
                <Button className="w-full h-[50px] mt-6 bg-agdexMain text-xl font-bold">
                  Stake
                </Button>
              </StyledTabs>
            </div>
          </div>
        </Card> */
}
