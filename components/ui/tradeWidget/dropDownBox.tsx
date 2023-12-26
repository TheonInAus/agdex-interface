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

export default function DropDownBox() {
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
          className="w-[113px] justify-between text-base font-semibold hover:bg-0xtrans"
        >
          {value
            ? tokens.find((token) => token.name === value)?.symbol
            : "Select Token..."}
          <ChevronDown className="w-4 h-4 ml-1 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[330px] p-0">
        <Command>
          <CommandInput placeholder="Search Token..." className="h-9" />
          <CommandEmpty>No Token found.</CommandEmpty>
          <CommandGroup>
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
                  <div className="flex">
                    <div>{giveMeFormattedToShow(Number(token.price))}</div>
                    <div
                      className={`text-sm ml-3 ${
                        token.percentageChange?.startsWith("-")
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {`${Number(token.percentageChange).toFixed(2)}%`}
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
