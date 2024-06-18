import { cva, type VariantProps } from "class-variance-authority"

import { Input } from "@/components/ui/input"

import { SymbolDropDownBox } from "./tradeWidget/symbolDropDownBox"

// Define variants for the PayInput styling.
const inputBoxVariants = cva(
  "flex items-center justify-between p-4", // Adjust the classes for the dark grey box
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
  prefixValue?: number
  prefix?: string
  balanceNode?: React.ReactNode
  maxNode?: React.ReactNode

  onMaxClick?: (e: React.MouseEvent<HTMLInputElement>) => void
  onValueChange?: (e: React.ChangeEvent<HTMLInputElement>) => void // Assuming you are handling state in a parent component
  onPrefixChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

// The PayInput component definition.
export const PoolInputBox: React.FC<InputBoxProps> = ({
  title,
  value,
  prefixValue,
  prefix,
  balanceNode,
  maxNode,
  onMaxClick,
  onValueChange,
  onPrefixChange,
  ...props
}) => {
  return (
    <div
      className={`${inputBoxVariants(
        props
      )} outline-none bg-[#242424] rounded-xl`}
    >
      <div className="flex flex-col justify-between size-full ">
        <div className="flex flex-row items-center mb-2">
          <span className="block text-lg font-bold text-white">{title}</span>
          {prefix && (
            <>
              <span className="block w-full mx-1 font-semibold text-right text-white">
                {prefix}
              </span>
              <Input
                className="w-6 h-4 p-0 font-semibold text-right border-none shadow-none outline-none number-input"
                value={prefixValue}
                type="number"
                placeholder="0"
                onChange={onPrefixChange}
              />
              <span className="block text-right">x</span>
            </>
          )}
          {balanceNode && (
            <div className="flex flex-row justify-end w-full text-sm font-semibold">
              {balanceNode}
            </div>
          )}
        </div>
        <div className="flex flex-row items-center">
          <Input
            className="w-full text-lg text-left bg-transparent border-none shadow-none outline-none"
            value={value}
            placeholder="0.00"
            onChange={onValueChange} // Assuming you have a handler function for this
          />
          {maxNode && (
            <div
              className="px-2 py-1 mr-2 text-xs border rounded-md border-agdexMain text-agdexMain hover:cursor-pointer"
              onClick={onMaxClick}
            >
              <span>Max</span>
            </div>
          )}
          <SymbolDropDownBox />
        </div>
      </div>
    </div>
  )
}
