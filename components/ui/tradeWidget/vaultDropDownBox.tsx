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

export const VaultDropDownBox: React.FC<VaultDropDownBoxProp> = ({}) => {
  const [open, setOpen] = useState(false)
  const vaults: VaultInfo[] = VaultList
  const [currentVault, setCurrentVault] = useState<VaultInfo>(VaultList[0])
  const { setVault } = useTokenStore()

  const handleDropDownSelect = (vault: VaultInfo) => {
    setCurrentVault(vault)
    setOpen(false)
    setVault(vault)
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
          {currentVault.name}
          <ChevronDown className="ml-1 opacity-50 size-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2 w-[150px]">
        <Command>
          <CommandInput placeholder="Search Token..." className="h-9" />
          <CommandEmpty>No Token found.</CommandEmpty>
          <CommandGroup>
            {vaults.map((vault) => (
              <CommandItem
                key={vault.name}
                value={vault.name}
                onSelect={() => {
                  handleDropDownSelect(vault)
                }}
              >
                <div className="flex justify-between w-full">
                  <Image
                    src={`/token/${vault.name.toLowerCase()}.svg`}
                    alt={vault.name}
                    width={30}
                    height={30}
                  />
                  <div className="">{vault.name}</div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
