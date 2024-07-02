"use client"

import { useState } from "react"
import { PoolInfo, PoolList } from "@/chainio/helper"
import useTokenStore from "@/chainio/useTokenStore"
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

type DropDownBoxProp = {}

export const DropDownBox: React.FC<DropDownBoxProp> = ({}) => {
  const [open, setOpen] = useState(false)
  const pools: PoolInfo[] = PoolList
  const { symbol, setSymbol } = useTokenStore()

  const handleDropDownSelect = (pool: PoolInfo) => {
    setSymbol(pool)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="justify-center text-xl font-extrabold hover:bg-0xtrans"
        >
          {symbol.name}
          <ChevronDown className="ml-1 opacity-50 size-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2">
        <Command>
          <CommandInput placeholder="Search Token..." className="h-9" />
          <CommandEmpty>No Token found.</CommandEmpty>
          <CommandGroup>
            {pools.map((pool) => (
              <CommandItem
                key={pool.name}
                value={pool.name}
                onSelect={() => {
                  handleDropDownSelect(pool)
                }}
              >
                <div className="flex justify-between w-full">
                  <div className="">{pool.name}</div>
                  <div className="flex">
                    <div>{"Price"}</div>
                    <div className={`text-sm ml-3 ${"text-green-500"}`}>
                      {`pool.percetage%`}
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
