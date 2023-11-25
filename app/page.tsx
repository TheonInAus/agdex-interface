import React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { ListItem } from "@/components/ui/listItem"
import { Stats } from "@/components/ui/stats"
import { InputBox } from "@/components/ui/inputBox";

export default function IndexPage() {
  const indexPrice = "57.5938"
  // const [inputValue, setInputValue] = React.useState(""); // This will hold the value of the input
  
  // // Define a handler for when the input changes
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value);
  // };

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Beautifully designed components <br className="hidden sm:inline" />
          built with Radix UI and Tailwind CSS.
        </h1>
        <p className="max-w-[700px] text-lg">
          Accessible and customizable components that you can copy and paste
          into your apps. Free. Open Source. And Next.js 13 Ready.
        </p>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Accessible and customizable components that you can copy and paste
          into your apps. Free. Open Source. And Next.js 13 Ready.
        </p>
        <p className="max-w-[700px] text-lg text-0xred">
          Accessible and customizable components that you can copy and paste
          into your apps. Free. Open Source. And Next.js 13 Ready.
        </p>
        <p className="max-w-[700px] text-lg text-0xred-lighter">
          Accessible and customizable components that you can copy and paste
          into your apps. Free. Open Source. And Next.js 13 Ready.
        </p>
        <p className="max-w-[700px] text-lg text-0xyellow">
          Accessible and customizable components that you can copy and paste
          into your apps. Free. Open Source. And Next.js 13 Ready.
        </p>
        <p className="max-w-[700px] text-lg text-0xyellow-lighter">
          Accessible and customizable components that you can copy and paste
          into your apps. Free. Open Source. And Next.js 13 Ready.
        </p>
      </div>
      <div className="flex gap-4">
        <Button>Action</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="green">Active</Button>
        <Button variant="red">Error</Button>
        <Button variant="yellow">Warning</Button>
      </div>
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
        <ListItem keyText="Entry Price" value={10} info="llll" />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3">
        <InputBox
          title="Pay"
          value={'0.00'}
          suffix="USDT"
          // onValueChange={handleInputChange}
        />
      </div>
    </section>
  )
}
