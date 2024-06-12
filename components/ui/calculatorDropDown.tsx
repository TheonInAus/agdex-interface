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

export default function CalculatorDropDownBox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("BTC")
  const tokens: any[] = []
  const handleDropDownSelect = (token: any) => {
    setValue(token.name)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-start text-base font-semibold hover:bg-0xtrans"
        >
          xxx
          <ChevronDown className="ml-1 opacity-50 size-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-2">
        <Command>
          <CommandInput placeholder="Search Market..." className="h-9" />
          <CommandEmpty>No Token found.</CommandEmpty>
          <CommandGroup>
            <div className="my-2 ml-2 text-sm text-0xgrey">Market</div>
            {tokens.map((token) => (
              <CommandItem
                key={token.name}
                value={token.name}
                onSelect={() => {
                  handleDropDownSelect(token)
                }}
              >
                <div className="flex justify-between w-full">
                  <div className="text-sm text-white">{token.name}</div>
                  <div className="w-12 text-center rounded-md bg-boxBackground">
                    100X
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
