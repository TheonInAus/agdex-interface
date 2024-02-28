import * as React from "react"

import { Card } from "@/components/ui/card"
import { Input, InputProps } from "@/components/ui/input"

interface LabeledInputProps extends InputProps {
  label: string
  suffix: string
}

const LabeledInput = React.forwardRef<HTMLInputElement, LabeledInputProps>(
  ({ label, suffix }, ref) => {
    return (
      <Card className="w-full rounded-xl border-none bg-boxBackground outline-none mt-2">
        <div className="flex flex-col justify-between">
          <div className="flex flex-row items-center justify-between">
            <span className="block text-sm text-0xgrey ml-4">{label}</span>
            <div className="flex flex-row items-center w-[60%]">
              <Input
                ref={ref}
                className="text-right text-white bg-transparent border-none shadow-none outline-none text-md placeholder:text-gray-300"
                placeholder=""
              />
              <span className="text-right text-white text-sm mr-[10px]">
                {suffix}
              </span>
            </div>
          </div>
        </div>
      </Card>
    )
  }
)

LabeledInput.displayName = "LabeledInput"

export { LabeledInput }
