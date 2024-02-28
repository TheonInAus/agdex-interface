"use client"

import * as React from "react"
import { CheckIcon, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import useTokenConfigStore from "@/hooks/useTokenConfigStore"
import { useTokenConfigWrapperInfo } from "@/hooks/useTokenConfigWrapperInfo"
import { giveMeFormattedToShow } from "@/hooks/zContractHelper"
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
  const tokens = useTokenConfigWrapperInfo()
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("BTC")

  const setCurrentTokenEntity = useTokenConfigStore(
    (state: any) => state.setCurrentTokenEntity
  )

  const handleDropDownSelect = (token: any) => {
    setValue(token.name)
    setOpen(false)
    setCurrentTokenEntity(token)
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
          {value
            ? tokens.find((token) => token.name === value)?.symbol
            : "Select Market..."}
          <ChevronDown className="w-4 h-4 ml-1 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-2">
        <Command>
          <CommandInput placeholder="Search Market..." className="h-9" />
          <CommandEmpty>No Token found.</CommandEmpty>
          <CommandGroup>
            <div className="text-sm my-2 ml-2 text-0xgrey">Market</div>
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
                    <div className="bg-boxBackground w-12 text-center rounded-md">100X</div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
