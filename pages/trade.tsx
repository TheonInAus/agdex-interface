import React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { InputBox } from "@/components/ui/inputBox"
import { ListItem } from "@/components/ui/listItem"
import { Stats } from "@/components/ui/stats"
import RootLayout from "@/app/layout"

export default function TradePage() {
  const indexPrice = "57.5938"
  // const [inputValue, setInputValue] = React.useState(""); // This will hold the value of the input

  // // Define a handler for when the input changes
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value);
  // };

  return (
    <RootLayout>
      <section className="container items-center gap-6 pb-8 pt-6">
        <div className="flex w-full flex-row">
          {/* Left Column */}
          <div className="mb-6 basis-auto px-3">
            {/* Wide Block 1 */}
            <div className="mb-6 rounded-lg bg-0xbox  p-6">
              <div className="flex gap-6">
                <div className="text-xl">Token/Asset</div>
                <div className="text-xl text-0xred-lighter">Price</div>
                <Stats
                  title={"Index Price"}
                  value={indexPrice}
                />
                <Stats
                  title={"24h Change"}
                  value={'-2.01%'}
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
            </div>
            <br></br>
            {/* Wide Block 2 */}
            <div className="rounded-lg bg-0xbox p-6">
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
          <div className="basis-auto px-3">
            {/* Narrow Block 1 */}
            <div className="mb-6 rounded-lg bg-0xbox p-6">
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
                <ListItem keyText="Entry Price" value={10} info="llll" />
                <ListItem
                  keyText="Acceptable Price"
                  value={""}
                  percentage="0.30%"
                />
              </div>
            </div>
            {/* Narrow Block 2 */}
            <br></br>
            <div className="rounded-lg bg-0xbox p-6">
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
