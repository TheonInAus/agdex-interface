"use client"

import React from "react"
import { AlertCircle, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CustomTooltip } from "@/components/ui/customToolTip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ListItem } from "@/components/ui/listItem"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  StyledTabs,
  StyledTabsContent,
  StyledTabsList,
  StyledTabsTrigger,
} from "@/components/ui/styledTab"

export default function EarnPage() {
  const [activeTab, setActiveTab] = React.useState("Staking")
  const [selectedDuration, setSelectedDuration] = React.useState("90")

  return (
    <section className="container flex flex-col items-center justify-center pt-12">
      <Card className="w-[85%]">
        <div className="text-2xl">Earn</div>
        <div className="text-sm ">
          Earn rewards from trading fees and 0xx mining.
        </div>
      </Card>
      <Card className="p-6 rounded-lg w-[85%] mt-2">
        <div className="flex justify-between">
          <div>0XX Statistics</div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="h-8 text-sm border-0xgrey hover:border-agdexMain hover:bg-0xtrans"
            >
              Buy
            </Button>
            <Button
              variant="outline"
              className="h-8 text-sm border-0xgrey hover:border-agdexMain hover:bg-0xtrans"
            >
              Add to Wallet
            </Button>
          </div>
        </div>
        <div className="flex justify-between w-full mt-8">
          <div className="flex flex-col gap-1">
            <div>Total Emissions</div>
            <div>412,232.06</div>
          </div>
          <div className="flex flex-col gap-1">
            <div>Total Claimed</div>
            <div>365,989.41</div>
          </div>
          <div className="flex flex-col gap-1">
            <div>Total Burned</div>
            <div>33,422.10</div>
          </div>
          <div className="flex flex-col gap-1">
            <CustomTooltip triggerContent={<div>Total Staked</div>}>
              <p>
                The calculated figure may slightly differ from the actual amount
                because the 0XX in the 0XX/ETH LP NFT is based on the 0XX
                quantity in the LP Token at the time of staking.
              </p>
              <ListItem keyText={"Staking"} value={"-"} />
              <ListItem keyText={"Staking LP NFT"} value={"-"} />
            </CustomTooltip>
            <CustomTooltip triggerContent={<div>309,426.90</div>}>
              <p className="mb-2">
                Total Staked = Staked 0XX in 0XX/ETH LP NFT + Staked 0XX
              </p>
              <ListItem keyText={"Staked 0XX in 0XX/ETH LP NFT"} value={""} />
              <ListItem keyText={"Staked 0XX"} value={""} />
            </CustomTooltip>
          </div>
          <div className="flex flex-col gap-1">
            <div>Current Emissions</div>
            <div>10,000 / day</div>
          </div>
        </div>
      </Card>
      <Card className="p-6 w-[85%] mt-2">
        <div>Claimable Rewards</div>
        <div className="flex mt-8 justify-between w-[75%]">
          <CustomTooltip
            triggerContent={<div className="w-[16%] text-lg">0 USDT</div>}
          >
            <p>The trading fee income is settled every hour.</p>
            <ListItem keyText={"Staking"} value={"-"} />
            <ListItem keyText={"Staking LP NFT"} value={"-"} />
          </CustomTooltip>
          <CustomTooltip
            triggerContent={<div className="w-[16%] text-lg">0 0XX</div>}
          >
            <ListItem keyText={"Position Mining"} value={""} />
            <ListItem keyText={"Pool2 Mining"} value={""} />
            <ListItem keyText={"Liquidity Mining"} value={""} />
            <ListItem keyText={"RBF Mining"} value={""} />
          </CustomTooltip>
          <div className="w-[40%]">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="text-sm h-9 bg-0xgreen ">Claim All</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-0xdialog">
                <DialogHeader>
                  <DialogTitle className="mb-3 text-center">
                    Claim All
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    No available rewards to claim
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="ml-1 bg-transparent hover:bg-transparent hover:text-agdexMain">
                  Claim history
                  <ChevronRight className="w-4 h-4 mt-[2px]" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-0xdialog">
                <DialogHeader>
                  <DialogTitle className="mb-3 text-center">
                    Claim history
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    No claim history
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Card>
      <Card className="p-6  w-[85%] mt-2">
        <StyledTabs defaultValue="Staking" className="w-full">
          <div className="flex">
            <StyledTabsList className="w-full">
              <StyledTabsTrigger
                className="mr-2"
                value="Staking"
                onClick={() => setActiveTab("Staking")}
              >
                Staking
              </StyledTabsTrigger>
              <StyledTabsTrigger
                className="mr-2"
                value="Position Mining"
                onClick={() => setActiveTab("Position Mining")}
              >
                Position Mining
              </StyledTabsTrigger>
              <StyledTabsTrigger
                className="mr-2"
                value="Pool2 Mining"
                onClick={() => setActiveTab("Pool2 Mining")}
              >
                Pool2 Mining
              </StyledTabsTrigger>
              <StyledTabsTrigger
                className="mr-2"
                value="Liquidity Mining"
                onClick={() => setActiveTab("Liquidity Mining")}
              >
                Liquidity Mining
              </StyledTabsTrigger>
              {/* <StyledTabsTrigger
                className="mr-2"
                value="RBF Mining"
                onClick={() => setActiveTab("RBF Mining")}
              >
                RBF Mining
              </StyledTabsTrigger> */}
            </StyledTabsList>
            {activeTab === "Liquidity Mining" && (
              <div className="flex items-center py-1 ml-2">
                <span className="w-32 text-sm text-white">
                  <span className="text-black">My Multiplier: </span>1.0x
                </span>
              </div>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="h-8 text-sm border-0xgrey hover:border-agdexMain hover:bg-0xtrans"
                >
                  Claim
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-0xdialog">
                <DialogHeader>
                  <DialogTitle className="mb-3 text-center">
                    Claim All
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    No available rewards to claim
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="mt-2 mb-3 border-t border-0xline"></div>
          <StyledTabsContent value="Staking">
            <div className="flex justify-center w-full mt-8 text-center">
              <div className="flex gap-1 flex-col w-[30%]">
                <div>Staked 0XX</div>
                <div>412,232.06 0XX</div>
              </div>
              <div className="flex gap-1 flex-col w-[30%]">
                <CustomTooltip triggerContent={<div>Staked 0XX in LP NFT</div>}>
                  <p className="mb-2">
                    The calculated figure may slightly differ from the actual
                    amount because the 0XX in the 0XX/ETH LP NFT is based on the
                    0XX quantity in the LP Token at the time of staking.
                  </p>
                </CustomTooltip>
                <div>365,989.41 0XX</div>
              </div>
              <div className="flex gap-1 flex-col w-[30%]">
                <div>Total Staking Rewards</div>
                <div>33,422.10 USDT</div>
              </div>
            </div>
            <div className="mt-7 mb-3 border-t border-0xline w-[100%] text-center"></div>
            <div className="flex justify-between">
              <div className="flex mt-3">
                <div className="font-semibold">Stake 0XX</div>
                <div className="mx-2 border-l border-0xline h-[80%] text-center"></div>
                <div className="mt-[1px]">Max APR</div>
                <CustomTooltip
                  triggerContent={
                    <div className="text-0xgreen ml-2 text-sm mt-[1px]">
                      16.11%
                    </div>
                  }
                >
                  <p className="mb-2">
                    Max APR (3x) = 24h Rewards Value / Σ(Staked 0XX Value *
                    Multiplier) * Max Multiplier * 365 * 100%
                  </p>
                </CustomTooltip>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-8 hover:border-agdexMain hover:bg-0xtrans"
                  >
                    Stake 0XX
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-0xdialog">
                  <DialogHeader>
                    <DialogTitle className="mb-4 text-center">
                      Stake 0XX
                    </DialogTitle>
                    <DialogDescription>
                      <div className="flex justify-between mb-1">
                        <div>Amount</div>
                        <div>
                          Balance: <span>0 0XX</span>
                        </div>
                      </div>
                      <Input
                        placeholder="0.00"
                        className="h-12 border-none rounded-r-none bg-0xdialog-foreground"
                      />
                      <div className="mb-2 text-xsmt-7">Lock Duration</div>
                      <div className="flex justify-around">
                        {["90", "60", "30"].map((duration) => (
                          <label
                            key={duration}
                            className={`flex flex-col justify-center rounded-md h-20 w-36 ${
                              selectedDuration === duration
                                ? "bg-0xsmallBoxBackground"
                                : "bg-0xboxBackground"
                            }`}
                            onClick={() => setSelectedDuration(duration)}
                          >
                            <input
                              type="radio"
                              name="lockDuration"
                              value={duration}
                              className="w-2 h-2 ml-3"
                              checked={selectedDuration === duration}
                              onChange={() => setSelectedDuration(duration)}
                            />
                            <span
                              className={`text-center text-sm ${
                                selectedDuration === duration
                                  ? "text-black"
                                  : "text-black"
                              }`}
                            >
                              {duration} days
                            </span>
                            <span
                              className={`text-center text-sm ${
                                selectedDuration === duration
                                  ? "text-black"
                                  : "text-black"
                              }`}
                            >
                              Multiplier{" "}
                              {duration === "90"
                                ? "3x"
                                : duration === "60"
                                ? "2x"
                                : "1x"}
                            </span>
                          </label>
                        ))}
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            <div className="justify-center mt-10 mb-5 text-center">
              You have not staked yet.
            </div>
          </StyledTabsContent>
          <StyledTabsContent value="Position Mining">
            <div className="flex flex-row mt-5 mb-1 ml-3 ">
              <div className="w-[12%] mt-[6px]">Market</div>
              <div className="w-[15%] mt-[6px]">Avg. APR</div>
              <div className="w-[17%] mt-[6px]">Daily Emission</div>
              <div className="w-[17%] mt-[6px]">Total Positions</div>
              <div className="w-[18%] mt-[6px]">Avg. Coefficient</div>
              <div className="w-[16%] mt-[6px]">My Positions</div>
              <div className="w-[16%] mt-[6px]">Claimable Rewards</div>
              <div>
                <Button
                  variant="outline"
                  className="h-8 text-sm border-0xgrey hover:border-agdexMain hover:bg-0xtrans"
                >
                  Trade
                </Button>
              </div>
            </div>
          </StyledTabsContent>
          <StyledTabsContent value="Pool2 Mining" className="ml-3">
            <div className="grid grid-cols-2">
              <div className="space-y-3 py-2 w-[95%] underLg:px-3">
                <div className="font-medium">Overview</div>
                <div className="flex justify-between text-sm">
                  <div>APR (Multiplier = 3x)</div>
                  <CustomTooltip
                    triggerContent={
                      <div className="text-0xgreen">1663.32%</div>
                    }
                  >
                    <p className="mb-2">
                      APR (Multiplier = 3x) = 0XX/ETH LP APR + Staking APR (3x)
                      + Mining APR (3x)
                    </p>
                    <ListItem keyText={"0XX/ETH LP APR"} value={""} />
                    <ListItem keyText={"Staking APR (3x)"} value={""} />
                    <ListItem keyText={"Mining APR (3x)"} value={""} />
                  </CustomTooltip>
                </div>
                <div className="flex justify-between text-sm">
                  <div>Daily Emission</div>
                  <div>2,000 0XX</div>
                </div>
                <div className="flex justify-between text-sm">
                  <CustomTooltip
                    triggerContent={<div>Staked 0XX in LP NFT</div>}
                  >
                    <p className="mb-2">
                      Staked amount is calculated as the amount of 0XX in LP
                      Token at the time of staking.
                    </p>
                  </CustomTooltip>
                  <div>34,677.9356 0XX</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div>Total Value Locked (TVL)</div>
                  <div>$1,618,653.83</div>
                </div>
              </div>
              <div className="space-y-3 py-2 w-[100%] underLg:px-3">
                <div className="font-medium">My Data</div>
                <div className="flex justify-between text-sm">
                  <CustomTooltip
                    triggerContent={<div>Staked 0XX in LP NFT</div>}
                  >
                    <p className="mb-2">
                      Staked amount is calculated as the amount of 0XX in LP
                      Token at the time of staking.
                    </p>
                  </CustomTooltip>
                  <div>0 0XX</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div>Avg. Multiplier</div>
                  <div>0x</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div>Total Rewards</div>
                  <div>0 USDT 0 0XX</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div>Claimable Rewards</div>
                  <div>0 USDT 0 0XX</div>
                </div>
              </div>
            </div>
            <div className="my-3 border-t border-0xline w-[100%] text-center"></div>
            <div className="flex justify-between">
              <CustomTooltip
                triggerContent={
                  <div className="mt-3">Stake 0XX/ETH LP NFT</div>
                }
              >
                <p className="mb-2">
                  Staking amount is calculated as the amount of 0XX in LP Token
                  at the time of staking.
                </p>
              </CustomTooltip>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-8 text-sm border-0xgrey hover:border-agdexMain hover:bg-0xtrans"
                  >
                    Stake NFT
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-0xdialog">
                  <DialogHeader>
                    <DialogTitle className="mb-4 text-center">
                      Stake NFT
                    </DialogTitle>
                    <DialogDescription>
                      <div className="flex mb-1">
                        <AlertCircle
                          className="text-white text-opacity-70 hover:text-opacity-100 mt-[2px] mr-1"
                          size={12}
                        />
                        <div>
                          Only <span className="text-white">full range</span>{" "}
                          0XX/ETH LP NFTs are acceptable.
                        </div>
                      </div>
                      <Select>
                        <SelectTrigger className="w-[460px]">
                          <SelectValue placeholder="Select NFT" />
                        </SelectTrigger>
                        <SelectContent className="w-[460px]">
                          <SelectGroup>
                            <SelectLabel className="p-5 text-sm font-normal">
                              There are currently no LP NFTs available for
                              staking. Add liquidity to Uniswap 0XX/ETH pool
                              (full range) to receive your LP NFT.
                            </SelectLabel>
                            {/* <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem> */}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <div className="mb-2 mt-7">Lock Duration</div>
                      <div className="flex justify-around">
                        {["90", "60", "30"].map((duration) => (
                          <label
                            key={duration}
                            className={`flex flex-col justify-center rounded-md h-20 w-36 ${
                              selectedDuration === duration
                                ? "bg-0xsmallBoxBackground"
                                : "bg-0xboxBackground"
                            }`}
                            onClick={() => setSelectedDuration(duration)}
                          >
                            <input
                              type="radio"
                              name="lockDuration"
                              value={duration}
                              className="w-2 h-2 ml-3"
                              checked={selectedDuration === duration}
                              onChange={() => setSelectedDuration(duration)}
                            />
                            <span
                              className={`text-center text-sm ${
                                selectedDuration === duration
                                  ? "text-white"
                                  : "text-black"
                              }`}
                            >
                              {duration} days
                            </span>
                            <span
                              className={`text-center text-sm ${
                                selectedDuration === duration
                                  ? "text-white"
                                  : "text-black"
                              }`}
                            >
                              Multiplier{" "}
                              {duration === "90"
                                ? "3x"
                                : duration === "60"
                                ? "2x"
                                : "1x"}
                            </span>
                          </label>
                        ))}
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex mt-2">
              <div className="text-sm text-black mt-[10px]">
                Add liquidity to Uniswap 0XX/ETH pool (
                <span className="text-white">full range</span>) to receive your
                LP NFT.
              </div>
              <Button className="w-[110px] ml-1 px-0 justify-start bg-transparent text-white hover:bg-transparent hover:text-black">
                Add now
                <ChevronRight className="size-4 mt-[2px]" />
              </Button>
            </div>
          </StyledTabsContent>
          <StyledTabsContent value="Liquidity Mining" className="ml-3">
            <div className="flex flex-row mb-1 ml-1 text-sm text-black rounded-lg">
              <div className="w-[12%]">Pool</div>
              <div className="w-[15%]">Avg / Max APR</div>
              <div className="w-[17%]">Daily Emission</div>
              <div className="w-[17%]">Total Liquidity</div>
              <div className="w-[18%]">My Liquidity</div>
              <div className="w-[16%]">Claimable Rewards</div>
              <div>
                <Button
                  variant="outline"
                  className="h-8 text-sm border-0xgrey hover:border-agdexMain hover:bg-0xtrans"
                >
                  Add
                </Button>
              </div>
            </div>
          </StyledTabsContent>
        </StyledTabs>
      </Card>
    </section>
  )
}
