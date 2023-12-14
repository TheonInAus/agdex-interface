"use client"

import * as React from "react"
import { CheckIcon, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


const tokens = [
  {
    value: "eth/usdx",
    label: "ETH/USDX",
    icon: "",
    volume: "617.10k ETH",
    price: "$2,054.17",
    percentageChange: "+0.11%",
  },
  {
    value: "btc/usdx",
    label: "BTC/USDX",
    volume: "19.10k BTC",
    price: "$30,054.17",
    percentageChange: "-0.21%",
  },
  {
    value: "sol/usdx",
    label: "SOL/USDX",
    volume: "20.10k SOL",
    price: "$57.17",
    percentageChange: "-0.16%",
  },
]

export function DropDownBox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("eth/usdx")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-[113px] justify-between text-base font-semibold hover:bg-0xtrans"
        >
          {value
            ? tokens.find((token) => token.value === value)?.label
            : "Select Token..."}
          <ChevronDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[330px] p-0">
        <Command>
          <CommandInput placeholder="Search Token..." className="h-9" />
          <CommandEmpty>No Token found.</CommandEmpty>
          <CommandGroup>
            {tokens.map((token) => (
              <CommandItem
                key={token.value}
                value={token.value}
                onSelect={() => {
                  setValue(token.value)
                  setOpen(false)
                }}
              >
                <div className="flex justify-between w-full">
                  <div className="flex flex-col">
                    <div className="text-sm text-white">{token.label}</div>
                    <div className="text-xs text-0xgrey">{token.volume}</div>
                  </div>
                  <div className="flex gap-3 mt-[6px]">
                  <div>{token.price}</div>
                  <div
                    className={`text-sm ${
                      token.percentageChange.startsWith("-")
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {token.percentageChange}
                  </div>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
