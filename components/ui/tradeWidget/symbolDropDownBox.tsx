"use client"

import { useState } from "react"
import Image from "next/image"
import { PoolInfo, PoolList, VaultInfo, VaultList } from "@/chainio/helper"
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

type VaultDropDownBoxProp = {}

export const SymbolDropDownBox: React.FC<VaultDropDownBoxProp> = ({}) => {
  const [open, setOpen] = useState(false)
  const pools: PoolInfo[] = PoolList
  const { symbol, setSymbol } = useTokenStore()

  const handleDropDownSelect = (pool: PoolInfo) => {
    setOpen(false)
    setSymbol(pool)
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
          {symbol.tokenName}
          <ChevronDown className="ml-1 opacity-50 size-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2 w-[150px]">
        <Command>
          <CommandInput placeholder="Search Token..." className="h-9" />
          <CommandEmpty>No Token found.</CommandEmpty>
          <CommandGroup>
            {pools.map((symbol) => (
              <CommandItem
                key={symbol.tokenName}
                value={symbol.tokenName}
                onSelect={() => {
                  handleDropDownSelect(symbol)
                }}
              >
                <div className="flex justify-between w-full">
                  <Image
                    src={`/token/${symbol.tokenName.toLowerCase()}.svg`}
                    alt={symbol.name}
                    width={30}
                    height={30}
                  />
                  <div className="">{symbol.tokenName}</div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
