"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  StyledTabs,
  StyledTabsContent,
  StyledTabsList,
  StyledTabsTrigger,
} from "@/components/ui/styledTab"

export default function ReferralsPage() {
  return (
    <section className="container flex flex-col items-center justify-center pt-12">
      <div className="text-left w-[85%]">
        <div className="text-2xl text-white">Referrals</div>
        <div>
          <StyledTabs defaultValue="Traders" className="mt-3">
            <StyledTabsList>
              <StyledTabsTrigger value="Traders" className="px-0 mr-3">
                Traders
              </StyledTabsTrigger>
              <StyledTabsTrigger value="EFC Members">
                EFC Members
              </StyledTabsTrigger>
            </StyledTabsList>
            <StyledTabsContent value="Traders">
              <div className="p-6 mt-4 mb-3 rounded-lg bg-0xboxBackground">
                <div className="flex flex-row">
                  <div className="w-[92%]">
                    <div className="font-medium">Bind Referral Code</div>
                    <div className="flex mt-5">
                      <Input
                        type=""
                        placeholder="Enjoy the following benefits by binding"
                        className="h-12 border-none rounded-r-none bg-0xdialog-foreground"
                      />
                      <Button className="h-12 rounded-l-none bg-bronze hover:bg-bronze-foreground">
                        Confirm
                      </Button>
                    </div>
                    <ul className="pl-5 mt-4 space-y-2 text-sm list-disc text-0xgrey">
                      <li>
                        Enjoy a{" "}
                        <span className="font-semibold text-bronze">
                          10% discount
                        </span>{" "}
                        on trading fees.
                      </li>
                      <li>
                        Earn a{" "}
                        <span className="font-semibold text-bronze">
                          1.1x boosted multiplier
                        </span>{" "}
                        for liquidity mining.
                      </li>
                    </ul>
                  </div>
                  <div className="my-2 mx-5 h-[200px] border-r border-0xline"></div>
                  <div className="w-[92%] mt-7">
                    <div className="flex gap-3">
                      <div className="font-medium text-0xgrey">
                        Trading fee rate
                      </div>
                      <div className="font-medium">0.05%</div>
                    </div>
                    <div className="mt-3 text-sm text-0xgrey">
                      Your current fee rate for opening and closing positions.
                    </div>
                    <div className="my-5 border-t border-0xline"></div>
                    <div className="flex gap-3">
                      <div className="font-medium text-0xgrey">
                        Mining multiplier
                      </div>
                      <div className="font-medium">1.0x</div>
                    </div>
                    <div className="mt-3 text-sm text-0xgrey">
                      Your current liquidity mining multiplier.
                    </div>
                  </div>
                </div>
              </div>
            </StyledTabsContent>
            <StyledTabsContent value="EFC Members">
              <div className="p-6 mt-4 rounded-lg bg-0xboxBackground">
                <div className="text-sm text-center">
                  You don&apos;t have a Member NFT yet. You can obtain one
                  through the following methods:
                </div>
                <div className="flex justify-center gap-4 mt-5">
                  <Button
                    variant="outline"
                    className="h-10 text-sm border-0xgrey hover:border-bronze hover:bg-0xtrans"
                  >
                    Apply for NFT
                  </Button>
                  <Button
                    variant="outline"
                    className="h-10 text-sm border-0xgrey hover:border-bronze hover:bg-0xtrans"
                  >
                    Purchase NFT
                  </Button>
                </div>
                <div className="mt-5 text-sm text-center text-0xgrey">
                  By holding Member NFT, you can generate multiple referral
                  codes and receive mining rewards and trading fee income.
                </div>
              </div>
            </StyledTabsContent>
          </StyledTabs>
        </div>
      </div>
    </section>
  )
}
