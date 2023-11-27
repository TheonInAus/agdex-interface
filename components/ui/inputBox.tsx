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
  // onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Assuming you are handling state in a parent component
}

// The PayInput component definition.
export const InputBox: React.FC<InputBoxProps> = ({
  title,
  value,
  suffix,
  prefix,
  // onValueChange,
  ...props
}) => {
  return (
    <Card
      className={`${inputBoxVariants(
        props
      )} w-5/6 rounded-xl border-none bg-0xbox outline-none`}
    >
      <div className="flex h-full w-full flex-col justify-between">
        <div className="mb-2 ml-3 flex flex-row">
          <span className="block text-0xgrey">{title}</span>
          {prefix && (
            <>
              <span className="block w-full text-right text-sm text-0xgrey">{prefix}</span>
              <Input
                className="focus-visible:ring-none h-5 w-3/12 border-none bg-transparent p-1 text-left text-sm text-white shadow-none outline-none placeholder:text-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                value={value}
                placeholder="0.00"
              />
            </>
          )}
        </div>
        <div className="flex">
          <Input
            className="focus-visible:ring-none w-1/2 border-none bg-transparent text-left text-lg text-white shadow-none outline-none placeholder:text-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
            value={value}
            placeholder="0.00"
            // onChange={onValueChange} // Assuming you have a handler function for this
          />
          <span className="mr-7 mt-1 w-full text-right text-lg text-white">{suffix}</span>
        </div>
      </div>
    </Card>
  )
}
