"use client"

import { useEffect, useState } from "react"
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

export const DestinationVaultDropDownBox: React.FC<VaultDropDownBoxProp> = ({}) => {
  const [open, setOpen] = useState(false)
  const vaults: VaultInfo[] = VaultList
  const { vault, vault2, setVault2 } = useTokenStore()

  useEffect(() => {
    if (vault.name === vault2.name){
        if (vault.name === vaults[0].name)
            setVault2(vaults[1])
        else
            setVault2(vaults[0])
    }
  }, [vault])
  
  const handleDropDownSelect = (vault2: VaultInfo) => {
    setOpen(false)
    if (vault.name === vault2.name){
        if (vault.name === vaults[0].name)
            setVault2(vaults[1])
        else
            setVault2(vaults[0])
    } else {
        setVault2(vault2)
    }
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
          {vault2.name}
          <ChevronDown className="ml-1 opacity-50 size-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2 w-[150px]">
        <Command>
          <CommandInput placeholder="Search Token..." className="h-9" />
          <CommandEmpty>No Token found.</CommandEmpty>
          <CommandGroup>
            {vaults.map((vault2) => (
              <CommandItem
                key={vault2.name}
                value={vault2.name}
                onSelect={() => {
                  handleDropDownSelect(vault2)
                }}
              >
                <div className="flex justify-between w-full">
                  <Image
                    src={`/token/${vault2.name.toLowerCase()}.svg`}
                    alt={vault2.name}
                    width={30}
                    height={30}
                  />
                  <div className="">{vault2.name}</div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
