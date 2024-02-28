import * as React from "react"

import { Card } from "@/components/ui/card"
import { Input, InputProps } from "@/components/ui/input"

import { Button } from "./button"

interface ButtonInputProps extends InputProps {
  label: string
  suffix: string
}

const ButtonInput = React.forwardRef<HTMLInputElement, ButtonInputProps>(
  ({ label, suffix }, ref) => {
    return (
      <Card className="w-full rounded-xl border-none bg-boxBackground outline-none">
        <div className="flex flex-col justify-between ml-4">
          <div className="flex flex-row items-center">
            <span className="block text-sm text-0xgrey">{label}</span>
            <Button
              variant="outline"
              className="hover:border-bronze w-[55px] text-sm ml-2 h-[25px] border-0xgrey"
            >
              market
            </Button>
            <Input
              ref={ref}
              className="w-[48%] text-right text-white bg-transparent border-none shadow-none outline-none text-md placeholder:text-gray-300"
              placeholder=""
            />
            <span className="text-right text-white text-sm">{suffix}</span>
          </div>
        </div>
      </Card>
    )
  }
)

ButtonInput.displayName = "LabeledInput"

export { ButtonInput }
