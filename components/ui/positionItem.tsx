import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle, Edit3 } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"

const positionItemVariants = cva(
  "flex items-center justify-between space-x-2", // Adjust the spacing as needed
  {
    variants: {
      size: {
        default: "text-base",
        sm: "text-sm",
        xs: "text-xs",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface positionItemProps
  extends VariantProps<typeof positionItemVariants> {
  keyText: string
  value: string | number
  info?: string
  percentage?: string
  plusCss?: string
}

const PositionItem: React.FC<positionItemProps> = ({
  keyText,
  value,
  info,
  percentage,
  plusCss,
  ...props
}) => {
  return (
    <div className={positionItemVariants(props)} {...props}>
      <div className="flex flex-row">
        <span className="  text-sm">{keyText}</span>
        {info ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-1">
                  <AlertCircle
                    className="text-0xbox-foreground text-opacity-70 hover:text-opacity-100"
                    size={14}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                <p>{info}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <span className="w-5 h-5"></span>
        )}
        <span className={`font-bold text-left ml-3 ${plusCss}`}>
          {value || "-"}
        </span>
      </div>
      {/* <div className="flex flex-row"> */}
      {/* <span className="text-base text-left text-white">{value || "-"}</span> */}
      {/* {percentage && (
          <>
            <button className="ml-1">
              <Edit3
                className="text-white text-opacity-70 hover:text-opacity-100"
                size={13}
              />
            </button>
          </>
        )} */}
      {/* </div> */}
    </div>
  )
}

export { PositionItem }
