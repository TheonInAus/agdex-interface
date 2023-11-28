import React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { ListItem } from "@/components/ui/listItem"
import { Stats } from "@/components/ui/stats"
import { InputBox } from "@/components/ui/inputBox";
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
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div>
        <Stats
          title={"Index Price"}
          value={indexPrice}
          textColor={"text-0xyellow-lighter"}
          additionalText={"(time)"}
          info={"lll"}
        />
      </div>
      <div className="w-1/4">
        <ListItem keyText="Entry Price" value={10} info="llll"/>
        <ListItem keyText="Acceptable Price" value={''} percentage="0.30%"/>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3">
        <InputBox
          title="Pay"
          value={'0.00'}
          suffix="USDT"
          // onValueChange={handleInputChange}
        />
        <br></br>
        <InputBox
          title="Size"
          value={'0.00'}
          suffix="SOL"
          prefix="Leverage:"
          // onValueChange={handleInputChange}
        />
      </div>
    </section>
    </RootLayout>
  
  )
}
