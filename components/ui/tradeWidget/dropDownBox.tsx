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

export default function DropDownBox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("ETH")
  const tokens: any[] = []
  const handleDropDownSelect = (token: any) => {}

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="justify-center text-xl font-extrabold hover:bg-0xtrans"
        >
          xxx
          <ChevronDown className="ml-1 opacity-50 size-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2">
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
                  <div className="">{token.name}</div>
                  <div className="flex">
                    <div>{Number(token.price)}</div>
                    <div
                      className={`text-sm ml-3 ${
                        token.percentageChange?.startsWith("-")
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {`${(Number(token.percentageChange) * 100).toFixed(2)}%`}
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
