"ues client"

import React, { useState } from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { InputBox } from "@/components/ui/inputBox"
import { ListItem } from "@/components/ui/listItem"
import { Stats } from "@/components/ui/stats"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RootLayout from "@/app/layout"

export default function TradePage() {
  const indexPrice = "57.5938"

  const [activeTab, setActiveTab] = useState("long")
  // const [inputValue, setInputValue] = React.useState(""); // This will hold the value of the input

  // // Define a handler for when the input changes
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value);
  // };

  return (
    <RootLayout>
      <section className="container items-center gap-6 pt-6 pb-8">
        <div className="flex flex-row w-full">
          {/* Left Column */}
          <div className="px-3 mb-6 basis-auto">
            {/* Wide Block 1 */}
            <div className="p-6 mb-6 rounded-lg bg-0xbox">
              <div className="flex gap-6">
                <div className="text-lg">Token/Asset</div>
                <div className="text-lg text-0xred-lighter">Price</div>
                <Stats title={"Index Price"} value={indexPrice} />
                <Stats
                  title={"24h Change"}
                  value={"-2.01%"}
                  textColor={"text-0xred-lighter"}
                />
                <Stats
                  title={"1h Funding"}
                  value={"+0.001250%"}
                  textColor={"text-0xyellow-lighter"}
                  additionalText={"(27:15)"}
                  info={"lll"}
                />
                <Stats
                  title={"Open Interest"}
                  value={"20.10k SOL"}
                  textColor={"text-0xyellow-lighter"}
                  additionalText={"($1,144,535.35)"}
                  info={"lll"}
                />
              </div>
              {/* <div className="border-t-4 border-0xred"></div> */}
            </div>
            <br></br>
            {/* Wide Block 2 */}
            <div className="p-6 rounded-lg bg-0xbox">
              <Stats
                title={"Index Price"}
                value={indexPrice}
                textColor={"text-0xyellow-lighter"}
                additionalText={"(time)"}
                info={"lll"}
              />
            </div>
          </div>
          {/* Right Column */}
          <div className="px-3 basis-1/3">
            {/* Narrow Block 1 */}
            <div className="p-6 mb-6 rounded-lg bg-0xbox">
              <Tabs defaultValue={"long"} className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger className={"w-1/2"} value={"long"}>
                    Long
                  </TabsTrigger>
                  <TabsTrigger value={"short"} className={"w-1/2"}>
                    Short
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="long">
                  <div className="w-full">
                    <InputBox
                      title="Pay"
                      value={""}
                      suffix="USDT"
                      // onValueChange={handleInputChange}
                    />
                    <br></br>
                    <InputBox
                      title="Size"
                      value={"0.00"}
                      suffix="SOL"
                      prefix="Leverage:"
                      // onValueChange={handleInputChange}
                    />
                    <br></br>
                    <ListItem keyText="Entry Price" value={""} />
                    <ListItem keyText="Price Impact" value={""} />
                    <ListItem
                      keyText="Acceptable Price"
                      value={""}
                      percentage="0.30%"
                    />
                    <ListItem keyText="Liq. Price" value={""} />
                    <ListItem keyText="Est. Margin" value={""} />
                    <ListItem keyText="Fees" value={""} />
                  </div>
                </TabsContent>
                <TabsContent value="short">
                  <div className="w-full">
                    <InputBox
                      title="Pay"
                      value={"0.00"}
                      suffix="USDT"
                      // onValueChange={handleInputChange}
                    />
                    <br></br>
                    <InputBox
                      title="Size"
                      value={"0.00"}
                      suffix="SOL"
                      prefix="Leverage:"
                      // onValueChange={handleInputChange}
                    />
                    <br></br>
                    <ListItem keyText="Entry Price" value={""} />
                    <ListItem keyText="Price Impact" value={""} />
                    <ListItem
                      keyText="Acceptable Price"
                      value={""}
                      percentage="0.30%"
                    />
                    <ListItem keyText="Liq. Price" value={""} />
                    <ListItem keyText="Est. Margin" value={""} />
                    <ListItem keyText="Fees" value={""} />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            {/* Narrow Block 2 */}
            <br></br>
            <div className="p-6 rounded-lg bg-0xbox">
              <div className="w-full">
                <ListItem keyText="Entry Price" value={10} info="llll" />
                <ListItem
                  keyText="Acceptable Price"
                  value={""}
                  percentage="0.30%"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </RootLayout>
  )
}
