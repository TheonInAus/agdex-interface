"use client"

import React from "react"
import { AlertCircle, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { InputBox } from "@/components/ui/inputBox"
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { AddMarginWidget } from "../trade/marginEdit/addMarginWidget"
import { ReduceMarginWidget } from "../trade/marginEdit/reduceMarginWidget"

export default function EarnPage() {
  const [activeTab, setActiveTab] = React.useState("Staking")
  const [selectedDuration, setSelectedDuration] = React.useState("90")

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
            <Button className="text-xs h-8">Buy</Button>
            <Button className="text-xs h-8">Add to Wallet</Button>
          </div>
        </div>
        <div className="flex w-full mt-8 justify-between">
          <div className="flex flex-col gap-1">
            <div className="text-0xgrey text-sm">Total Emissions</div>
            <div className="text-lg text-white">412,232.06</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-0xgrey text-sm">Total Claimed</div>
            <div className="text-lg text-white">365,989.41</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-0xgrey text-sm">Total Burned</div>
            <div className="text-lg text-white">33,422.10</div>
          </div>
          <div className="flex flex-col gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-0xgrey text-sm">Total Staked</div>
                </TooltipTrigger>
                <TooltipContent className="w-80">
                  <p>
                    The calculated figure may slightly differ from the actual
                    amount because the 0XX in the 0XX/ETH LP NFT is based on the
                    EQU quantity in the LP Token at the time of staking.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-lg text-white">309,426.90</div>
                </TooltipTrigger>
                <TooltipContent className="w-80">
                  <p className="mb-2">
                    Total Staked = Staked 0XX in 0XX/ETH LP NFT + Staked 0XX
                  </p>
                  <ListItem
                    keyText={"Staked 0XX in 0XX/ETH LP NFT"}
                    value={""}
                  />
                  <ListItem keyText={"Staked 0XX"} value={""} />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-0xgrey">Current Emissions</div>
            <div className="text-lg text-white">10,000 / day</div>
          </div>
        </div>
      </div>
      <div className="p-6 mb-3 rounded-lg bg-0xboxBackground w-[85%] mt-4">
        <div>Claimable Rewards</div>
        <div className="flex mt-8 justify-between w-[75%]">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-[16%] text-lg">0 USDT</div>
              </TooltipTrigger>
              <TooltipContent className="w-80">
                <p>The trading fee income is settled every hour.</p>
                <ListItem keyText={"Staking"} value={""} />
                <ListItem keyText={"Staking LP NFT"} value={""} />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-[16%] text-lg">0 0XX</div>
              </TooltipTrigger>
              <TooltipContent className="w-80">
                <ListItem keyText={"Position Mining"} value={""} />
                <ListItem keyText={"Pool2 Mining"} value={""} />
                <ListItem keyText={"Liquidity Mining"} value={""} />
                <ListItem keyText={"RBF Mining"} value={""} />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {/* <div className="w-[16%] text-lg">0 USDT</div> */}
          {/* <div className="w-[16%] text-lg">0 0XX</div> */}
          <div className="w-[40%]">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="text-xs h-8">Claim All</Button>
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
                <Button className="ml-1 bg-transparent text-white hover:bg-transparent hover:text-0xgrey text-xs">
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
      </div>
      <div className="p-6 mb-3 rounded-lg bg-0xboxBackground w-[85%] mt-4">
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
              <StyledTabsTrigger
                className="mr-2"
                value="RBF Mining"
                onClick={() => setActiveTab("RBF Mining")}
              >
                RBF Mining
              </StyledTabsTrigger>
            </StyledTabsList>
            {activeTab === "Liquidity Mining" && (
              <div className="flex items-center ml-2 py-1">
                <span className="text-white text-sm w-32">
                  <span className="text-0xgrey">My Multiplier: </span>1.0x
                </span>
              </div>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="text-xs h-8">Claim</Button>
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
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="text-0xgreen ml-2 text-sm mt-[1px]">
                        16.11%
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="w-80">
                      <p className="mb-2">
                        Max APR (3x) = 24h Rewards Value / Σ(Staked EQU Value *
                        Multiplier) * Max Multiplier * 365 * 100%
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="text-xs h-8">Stake 0XX</Button>
                </DialogTrigger>
                <DialogContent className="bg-0xdialog">
                  <DialogHeader>
                    <DialogTitle className="mb-4 text-center">
                      Stake 0XX
                    </DialogTitle>
                    <DialogDescription>
                      <div className="flex justify-between mb-1">
                        <div className="text-0xgrey text-xs">Amount</div>
                        <div className="text-0xgrey text-xs">
                          Balance: <span className="text-white">0 0XX</span>
                        </div>
                      </div>
                      <Input
                        placeholder="0.00"
                        className="rounded-r-none border-none bg-0xdialog-foreground h-12"
                      />
                      <div className="text-0xgrey text-xs mt-7 mb-2">
                        Lock Duration
                      </div>
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
                              className="h-2 w-2 ml-3"
                              checked={selectedDuration === duration}
                              onChange={() => setSelectedDuration(duration)}
                            />
                            <span
                              className={`text-center text-sm ${
                                selectedDuration === duration
                                  ? "text-white"
                                  : "text-0xgrey"
                              }`}
                            >
                              {duration} days
                            </span>
                            <span
                              className={`text-center text-sm ${
                                selectedDuration === duration
                                  ? "text-white"
                                  : "text-0xgrey"
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
            <div className="text-center justify-center mt-10 mb-5 text-0xgrey text-sm">
              You haven't staked yet.
            </div>
          </StyledTabsContent>
          <StyledTabsContent value="Position Mining">
            <div className="flex flex-row mt-5 ml-3 mb-1 text-sm rounded-lg text-0xgrey">
              <div className="w-[12%] mt-[6px]">Market</div>
              <div className="w-[15%] mt-[6px]">Avg. APR</div>
              <div className="w-[17%] mt-[6px]">Daily Emission</div>
              <div className="w-[17%] mt-[6px]">Total Positions</div>
              <div className="w-[18%] mt-[6px]">Avg. Coefficient</div>
              <div className="w-[16%] mt-[6px]">My Positions</div>
              <div className="w-[16%] mt-[6px]">Claimable Rewards</div>
              <div>
                <Button className="h-8 text-xs">Trade</Button>
              </div>
            </div>
          </StyledTabsContent>
          <StyledTabsContent value="Pool2 Mining" className="ml-3">
            <div className="grid grid-cols-2">
              <div className="space-y-3 py-2 w-[95%] underLg:px-3">
                <div className="font-medium">Overview</div>
                <div className="flex justify-between text-sm">
                  <div className="text-0xgrey">APR (Multiplier = 3x)</div>
                  <div className="text-0xgreen">1663.32%</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="text-0xgrey">Daily Emission</div>
                  <div>2,000 0XX</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="text-0xgrey">Staked 0XX in LP NFT</div>
                  <div>34,677.9356 0XX</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="text-0xgrey">Total Value Locked (TVL)</div>
                  <div>$1,618,653.83</div>
                </div>
              </div>
              <div className="space-y-3 py-2 w-[100%] underLg:px-3">
                <div className="font-medium">My Data</div>
                <div className="flex justify-between text-sm">
                  <div className="text-0xgrey">Staked EQU in LP NFT</div>
                  <div>0 0XX</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="text-0xgrey">Avg. Multiplier</div>
                  <div>0x</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="text-0xgrey">Total Rewards</div>
                  <div>0 USDT 0 0XX</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="text-0xgrey">Claimable Rewards</div>
                  <div>0 USDT 0 0XX</div>
                </div>
              </div>
            </div>
            <div className="mt-3 mb-3 border-t border-0xline w-[100%] text-center"></div>
            <div className="flex justify-between">
              <div className="mt-3">Stake EQU/ETH LP NFT</div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="h-8 text-xs">Stake NFT</Button>
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
                        <div className="text-0xgrey text-xs">
                          Only <span className="text-white">full range</span>{" "}
                          EQU/ETH LP NFTs are acceptable.
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
                              staking. Add liquidity to Uniswap EQU/ETH pool
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
                      <div className="text-0xgrey text-xs mt-7 mb-2">
                        Lock Duration
                      </div>
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
                              className="h-2 w-2 ml-3"
                              checked={selectedDuration === duration}
                              onChange={() => setSelectedDuration(duration)}
                            />
                            <span
                              className={`text-center text-sm ${
                                selectedDuration === duration
                                  ? "text-white"
                                  : "text-0xgrey"
                              }`}
                            >
                              {duration} days
                            </span>
                            <span
                              className={`text-center text-sm ${
                                selectedDuration === duration
                                  ? "text-white"
                                  : "text-0xgrey"
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
            <div className="flex flex-row mb-1 ml-1 text-sm rounded-lg text-0xgrey">
              <div className="w-[12%]">Pool</div>
              <div className="w-[15%]">Avg / Max APR</div>
              <div className="w-[17%]">Daily Emission</div>
              <div className="w-[17%]">Total Liquidity</div>
              <div className="w-[18%]">My Liquidity</div>
              <div className="w-[16%]">Claimable Rewards</div>
              <div>
                <Button className="h-8 text-sm">Add</Button>
              </div>
            </div>
          </StyledTabsContent>
          <StyledTabsContent value="RBF Mining" className="ml-3">
            <div className="flex flex-row mb-1 ml-1 text-sm rounded-lg text-0xgrey">
              <div className="w-[12%]">Pool</div>
              <div className="w-[15%]">APR</div>
              <div className="w-[17%]">Daily Emission</div>
              <div className="w-[17%]">Total Contribution</div>
              <div className="w-[18%]">My Contribution</div>
              <div className="w-[16%]">Claimable Rewards</div>
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="h-8 text-xs">Contribute</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-0xdialog">
                    <DialogHeader>
                      <DialogTitle className="mb-3 text-center">
                        Risk Buffer Fund
                      </DialogTitle>
                      <DialogDescription>
                        <StyledTabs defaultValue="Contribute">
                          <StyledTabsList className="border-none">
                            <StyledTabsTrigger
                              value="Contribute"
                              className="p-0 mr-3 text-sm"
                            >
                              Contribute
                            </StyledTabsTrigger>
                            <StyledTabsTrigger
                              value="Withdraw"
                              className="p-0 text-sm"
                            >
                              Withdraw
                            </StyledTabsTrigger>
                          </StyledTabsList>
                          <StyledTabsContent value="Contribute">
                            <InputBox
                              title={"Amount"}
                              value={"0.00"}
                              suffix={""}
                            />
                            <div className="text-sm my-4 text-white">
                              Token/Asset
                            </div>
                            <ListItem keyText={"Net Performance"} value={""} />
                            <ListItem
                              keyText={"Total Contribution"}
                              value={""}
                            />
                            <div className="mt-2 mb-3 border-t border-0xline"></div>
                            <ListItem keyText={"My Contribution"} value={""} />
                            <ListItem
                              keyText={"Unlocking Countdown"}
                              value={""}
                            />
                            <div className="bg-0xsmallBoxBackground w-full mt-3">
                              <div className="flex items-start p-2">
                                <div className="flex-shrink-0 mr-1 mt-[2.5px]">
                                  <AlertCircle
                                    className="text-white text-opacity-70 hover:text-opacity-100"
                                    size={15} // Adjust the size to match your design
                                  />
                                </div>
                                <div className="text-white">
                                  Your contribution will be locked for 90 days
                                  (from the last time of contribution). After
                                  the lock-up period ends, you can withdraw your
                                  contribution at any time if the net
                                  performance of the fund is positive.
                                </div>
                              </div>
                              <div className="flex items-start p-2">
                                <div className="flex-shrink-0 mr-1 mt-[2.5px]">
                                  <AlertCircle
                                    className="text-white text-opacity-70 hover:text-opacity-100"
                                    size={15} // Adjust the size to match your design
                                  />
                                </div>
                                <div className="text-white">
                                  You cannot withdraw your contribution if the
                                  fund's net performance is negative, even after
                                  the lock-up period has expired, until the net
                                  performance turns positive.
                                </div>
                              </div>
                            </div>
                            <Button className="mt-4 w-full">
                              Approve USDT
                            </Button>
                          </StyledTabsContent>
                          <StyledTabsContent value="Withdraw">
                            <InputBox
                              title={"Amount"}
                              value={"0.00"}
                              suffix={""}
                            />
                            <div className="text-sm my-4 text-white">
                              Token/Asset
                            </div>
                            <ListItem keyText={"Net Performance"} value={""} />
                            <ListItem
                              keyText={"Total Contribution"}
                              value={""}
                            />
                            <div className="mt-2 mb-3 border-t border-0xline"></div>
                            <ListItem keyText={"My Contribution"} value={""} />
                            <ListItem
                              keyText={"Unlocking Countdown"}
                              value={""}
                            />
                            <div className="bg-0xsmallBoxBackground w-full mt-3">
                              <div className="flex items-start p-2">
                                <div className="flex-shrink-0 mr-1 mt-[2.5px]">
                                  <AlertCircle
                                    className="text-white text-opacity-70 hover:text-opacity-100"
                                    size={15} // Adjust the size to match your design
                                  />
                                </div>
                                <div className="text-white">
                                  Your contribution will be locked for 90 days
                                  (from the last time of contribution). After
                                  the lock-up period ends, you can withdraw your
                                  contribution at any time if the net
                                  performance of the fund is positive.
                                </div>
                              </div>
                              <div className="flex items-start p-2">
                                <div className="flex-shrink-0 mr-1 mt-[2.5px]">
                                  <AlertCircle
                                    className="text-white text-opacity-70 hover:text-opacity-100"
                                    size={15} // Adjust the size to match your design
                                  />
                                </div>
                                <div className="text-white">
                                  You cannot withdraw your contribution if the
                                  fund's net performance is negative, even after
                                  the lock-up period has expired, until the net
                                  performance turns positive.
                                </div>
                              </div>
                            </div>
                            <Button className="mt-4 w-full">
                              Approve Operation (one-time)
                            </Button>
                          </StyledTabsContent>
                        </StyledTabs>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </StyledTabsContent>
        </StyledTabs>
      </div>
    </section>
  )
}
