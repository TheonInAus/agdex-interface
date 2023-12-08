"use client"

import React from "react"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  StyledTabs,
  StyledTabsContent,
  StyledTabsList,
  StyledTabsTrigger,
} from "@/components/ui/styledTab"

export default function EarnPage() {
  const [activeTab, setActiveTab] = React.useState("Staking")

  return (
    <section className="container flex flex-col items-center justify-center pt-12">
      <div className="text-left w-[85%]">
        <div className="text-2xl text-white">Earn</div>
        <div className="text-sm text-0xgrey">
          Earn rewards from trading fees and 0xx mining.
        </div>
      </div>
      <div className="p-6 mb-3 rounded-lg bg-0xboxBackground w-[85%] mt-4">
        <div className="flex justify-between">
          <div>0XX Statistics</div>
          <div className="flex gap-3">
            <Button>Buy</Button>
            <Button>Add to Wallet</Button>
          </div>
        </div>
        <div className="flex w-full mt-8 justify-between">
          <div className="flex flex-col">
            <div className="text-0xgrey text-sm">Total Emissions</div>
            <div className="text-lg text-white">412,232.06</div>
          </div>
          <div className="flex flex-col">
            <div className="text-0xgrey text-sm">Total Claimed</div>
            <div className="text-lg text-white">365,989.41</div>
          </div>
          <div className="flex flex-col">
            <div className="text-0xgrey text-sm">Total Burned</div>
            <div className="text-lg text-white">33,422.10</div>
          </div>
          <div className="flex flex-col">
            <div className="text-0xgrey text-sm">Total Staked</div>
            <div className="text-lg text-white">309,426.90</div>
          </div>
          <div className="flex flex-col">
            <div className="text-0xgrey">Current Emissions</div>
            <div className="text-lg text-white">10,000 / day</div>
          </div>
        </div>
      </div>
      <div className="p-6 mb-3 rounded-lg bg-0xboxBackground w-[85%] mt-4">
        <div>Claimable Rewards</div>
        <div className="flex mt-8 justify-between w-[75%]">
          <div className="w-[16%] text-lg">0 USDT</div>
          <div className="w-[16%] text-lg">0 0XX</div>
          <div className="w-[40%]">
            <Button>Claim All</Button>
            <Button className="ml-1 bg-transparent text-white hover:bg-transparent hover:text-0xgrey">
              Claim history
              <ChevronRight className="w-4 h-4 mt-[2px]" />
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6 mb-3 rounded-lg bg-0xboxBackground w-[85%] mt-4">
        <StyledTabs defaultValue="Staking" className="w-full">
          <div className="flex">
            <StyledTabsList className="w-full">
              <StyledTabsTrigger
                className="mr-2 text-sm"
                value="Staking"
                onClick={() => setActiveTab("Staking")}
              >
                Staking
              </StyledTabsTrigger>
              <StyledTabsTrigger
                className="mr-2 text-sm"
                value="Position Mining"
                onClick={() => setActiveTab("Position Mining")}
              >
                Position Mining
              </StyledTabsTrigger>
              <StyledTabsTrigger
                className="mr-2 text-sm"
                value="Pool2 Mining"
                onClick={() => setActiveTab("Pool2 Mining")}
              >
                Pool2 Mining
              </StyledTabsTrigger>
              <StyledTabsTrigger
                className="mr-2 text-sm"
                value="Liquidity Mining"
                onClick={() => setActiveTab("Liquidity Mining")}
              >
                Liquidity Mining
              </StyledTabsTrigger>
              <StyledTabsTrigger
                className="mr-2 text-sm"
                value="RBF Mining"
                onClick={() => setActiveTab("RBF Mining")}
              >
                RBF Mining
              </StyledTabsTrigger>
            </StyledTabsList>
            {activeTab === "Liquidity Mining" && (
              <div className="flex items-center ml-2 py-1">
                <span className="text-white text-sm w-32"><span className="text-0xgrey">My Multiplier: </span>1.0x</span>
              </div>
            )}
            <Button>Claim</Button>
          </div>
          <div className="mt-2 mb-3 border-t border-0xline"></div>
          <StyledTabsContent value="Staking">
            <div className="flex w-full mt-8 justify-center text-center">
              <div className="flex flex-col w-[30%]">
                <div className="text-0xgrey text-sm">Staked 0XX</div>
                <div className="text-white">412,232.06 0XX</div>
              </div>
              <div className="flex flex-col w-[30%]">
                <div className="text-0xgrey text-sm">Staked 0XX in LP NFT</div>
                <div className="text-white">365,989.41 0XX</div>
              </div>
              <div className="flex flex-col w-[30%]">
                <div className="text-0xgrey text-sm">Total Staking Rewards</div>
                <div className="text-white">33,422.10 USDT</div>
              </div>
            </div>
            <div className="mt-7 mb-3 border-t border-0xline w-[100%] text-center"></div>
            <div className="flex justify-between">
              <div className="flex mt-3">
                <div className="font-semibold">Stake EQU</div>
                <div className="mx-2 border-l border-0xline h-[80%] text-center"></div>
                <div className="text-0xgrey text-sm mt-[1px]">Max APR</div>
                <div className="text-0xgreen ml-2 text-sm mt-[1px]">16.11%</div>
              </div>
              <Button>Stake 0XX</Button>
            </div>
            <div className="text-center justify-center mt-10 mb-5 text-0xgrey text-sm">
              You haven't staked yet.
            </div>
          </StyledTabsContent>
          <StyledTabsContent value="Position Mining">
            <div className="flex flex-row p-3 mb-1 text-sm rounded-lg text-0xgrey">
              <div className="w-[12%]">Market</div>
              <div className="w-[15%]">Avg. APR</div>
              <div className="w-[17%]">Daily Emission</div>
              <div className="w-[17%]">Total Positions</div>
              <div className="w-[18%]">Avg. Coefficient</div>
              <div className="w-[16%]">My Positions</div>
              <div className="w-[16%]">Claimable Rewards</div>
              <div className="w-[10%]"></div>
            </div>
          </StyledTabsContent>
          <StyledTabsContent value="Pool2 Mining" className="ml-3">
            <div className="grid grid-cols-2">
              <div className="space-y-3 py-2 w-[92%] underLg:px-3">
                <div className="font-medium">Overview</div>
                <div className="flex justify-between">
                  <div className="text-0xgrey">APR (Multiplier = 3x)</div>
                  <div className="text-0xgreen">1663.32%</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-0xgrey">Daily Emission</div>
                  <div>2,000 0XX</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-0xgrey">Staked 0XX in LP NFT</div>
                  <div>34,677.9356 0XX</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-0xgrey">Total Value Locked (TVL)</div>
                  <div>$1,618,653.83</div>
                </div>
              </div>
              <div className="space-y-3 py-2 w-[92%] underLg:px-3">
                <div className="font-medium">My Data</div>
                <div className="flex justify-between">
                  <div className="text-0xgrey">Staked EQU in LP NFT</div>
                  <div>0 0XX</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-0xgrey">Avg. Multiplier</div>
                  <div>0x</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-0xgrey">Total Rewards</div>
                  <div>0 USDT 0 0XX</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-0xgrey">Claimable Rewards</div>
                  <div>0 USDT 0 0XX</div>
                </div>
              </div>
            </div>
            <div className="mt-3 mb-3 border-t border-0xline w-[100%] text-center"></div>
            <div className="flex justify-between">
              <div className="mt-3">Stake EQU/ETH LP NFT</div>
              <Button>Stake NFT</Button>
            </div>
            <div className="flex mt-2">
              <div className="text-sm text-0xgrey mt-[10px]">
                Add liquidity to Uniswap EQU/ETH pool (
                <span className="text-white">full range</span>) to receive your
                LP NFT.
              </div>
              <Button className="w-[110px] ml-1 px-0 justify-start bg-transparent text-white hover:bg-transparent hover:text-0xgrey">
                Add now
                <ChevronRight className="w-4 h-4 mt-[2px]" />
              </Button>
            </div>
          </StyledTabsContent>
          <StyledTabsContent value="Liquidity Mining" className="ml-3">
            <div className="flex flex-row p-3 mb-1 text-sm rounded-lg text-0xgrey">
              <div className="w-[12%]">Pool</div>
              <div className="w-[15%]">Avg / Max APR</div>
              <div className="w-[17%]">Daily Emission</div>
              <div className="w-[17%]">Total Liquidity</div>
              <div className="w-[18%]">My Liquidity</div>
              <div className="w-[16%]">Claimable Rewards</div>
              <div className="w-[10%]"></div>
            </div>
          </StyledTabsContent>
          <StyledTabsContent value="RBF Mining" className="ml-3">
            <div className="flex flex-row p-3 mb-1 text-sm rounded-lg text-0xgrey">
              <div className="w-[12%]">Pool</div>
              <div className="w-[15%]">APR</div>
              <div className="w-[17%]">Daily Emission</div>
              <div className="w-[17%]">Total Contribution</div>
              <div className="w-[18%]">My Contribution</div>
              <div className="w-[16%]">Claimable Rewards</div>
              <div className="w-[10%]"></div>
            </div>
          </StyledTabsContent>
        </StyledTabs>
      </div>
    </section>
  )
}
