import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

// Define variants for the PayInput styling.
const inputBoxVariants = cva(
  "flex items-center justify-between p-4 bg-gray-800", // Adjust the classes for the dark grey box
  {
    variants: {
      size: {
        default: "text-base",
        sm: "text-sm",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

// Define the props for the PayInput component, extending the variant props.
export interface InputBoxProps extends VariantProps<typeof inputBoxVariants> {
  title: string
  value: string
  suffix: string
  prefix?: string
  onValueChange?: (e: React.ChangeEvent<HTMLInputElement>) => void // Assuming you are handling state in a parent component
}

// The PayInput component definition.
export const InputBox: React.FC<InputBoxProps> = ({
  title,
  value,
  suffix,
  prefix,
  onValueChange,
  ...props
}) => {
  return (
    <Card
      className={`${inputBoxVariants(
        props
      )} w-full rounded-xl border-none bg-0xbox outline-none`}
    >
      <div className="flex flex-col justify-between w-full h-full">
        <div className="flex flex-row mb-2 ml-3">
          <span className="block text-sm text-0xgrey">{title}</span>
          {prefix && (
            <>
              <span className="block w-full text-sm text-right text-0xgrey">
                {prefix}
              </span>
              {/* <Input
                className="w-3/12 h-5 p-1 text-sm text-right text-white bg-transparent border-none shadow-none outline-none placeholder:text-gray-300"
                value={value}
                placeholder="0.00"
              /> */}
            </>
          )}
        </div>
        <div className="flex">
          <Input
            className="w-full text-left text-white bg-transparent border-none shadow-none outline-none text-md placeholder:text-gray-300"
            value={value}
            placeholder="0.00"
            onChange={onValueChange} // Assuming you have a handler function for this
          />
          <span className="mt-2 text-right text-white text-md">{suffix}</span>
        </div>
      </div>
    </Card>
  )
}
