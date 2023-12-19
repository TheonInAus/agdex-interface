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
              <div className="p-6 mb-3 rounded-lg bg-0xboxBackground mt-4">
                <div className="flex flex-row">
                  <div className="w-[92%]">
                    <div className="font-medium">Bind Referral Code</div>
                    <div className="flex mt-5">
                      <Input
                        type=""
                        placeholder="Enjoy the following benefits by binding"
                        className="rounded-r-none border-none bg-0xdialog-foreground h-12"
                      />
                      <Button className="rounded-l-none h-12 bg-bronze">Confirm</Button>
                    </div>
                    <ul className="list-disc space-y-2 pl-5 text-0xgrey text-sm mt-4">
                      <li>
                        Enjoy a{" "}
                        <span className="text-bronze font-semibold">
                          10% discount
                        </span>{" "}
                        on trading fees.
                      </li>
                      <li>
                        Earn a{" "}
                        <span className="text-bronze font-semibold">
                          1.1x boosted multiplier
                        </span>{" "}
                        for liquidity mining.
                      </li>
                    </ul>
                  </div>
                  <div className="my-2 mx-5 h-[200px] border-r border-0xline"></div>
                  <div className="w-[92%] mt-7">
                    <div className="flex gap-3">
                      <div className="text-0xgrey font-medium">
                        Trading fee rate
                      </div>
                      <div className="font-medium">0.05%</div>
                    </div>
                    <div className="text-0xgrey mt-3 text-sm">Your current fee rate for opening and closing positions.</div>
                    <div className="my-5 border-t border-0xline"></div>
                    <div className="flex gap-3">
                      <div className="text-0xgrey font-medium">
                        Mining multiplier
                      </div>
                      <div className="font-medium">1.0x</div>
                    </div>
                    <div className="text-0xgrey mt-3 text-sm">Your current liquidity mining multiplier.</div>
                  </div>
                </div>
              </div>
            </StyledTabsContent>
            <StyledTabsContent value="EFC Members">
            <div className="p-6 rounded-lg bg-0xboxBackground mt-4">
                <div className="text-center text-sm">You don't have a Member NFT yet. You can obtain one through the following methods:</div>
                <div className="flex justify-center gap-4 mt-5">
                    <Button variant="outline" className="text-sm h-10 border-0xgrey hover:border-bronze hover:bg-0xtrans">Apply for NFT</Button>
                    <Button variant="outline" className="text-sm h-10 border-0xgrey hover:border-bronze hover:bg-0xtrans">Purchase NFT</Button>
                </div>
                <div className="text-0xgrey mt-5 text-center text-sm">By holding Member NFT, you can generate multiple referral codes and receive mining rewards and trading fee income.</div>
            </div>
            </StyledTabsContent>
          </StyledTabs>
        </div>
      </div>
    </section>
  )
}
