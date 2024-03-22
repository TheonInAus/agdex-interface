import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle, Edit3 } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"

const listItemVariants = cva(
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

export interface ListItemProps extends VariantProps<typeof listItemVariants> {
  keyText: string
  value: string | number
  info?: string
  percentage?: string
  className?: string
}

const ListItem: React.FC<ListItemProps> = ({
  keyText,
  value,
  info,
  percentage,
  className,
  ...props
}) => {
  return (
    <div
      className={`${listItemVariants(props)} ${className || ""} my-1`}
      {...props}
      {...props}
    >
      <div className="flex items-center">
        <span className="  text-sm">{keyText}</span>
        {info ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-1">
                  <AlertCircle
                    className="text-0xblack-foreground text-opacity-70 hover:text-opacity-100"
                    size={12}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="w-52">{info}</div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <span className="w-5 h-5"></span>
        )}
      </div>
      <div className="flex items-center">
        <span className="font-bold">{value || "-"}</span>
        {percentage && (
          <>
            {}
            <span className="ml-1 font-bold"> ({percentage})</span>
          </>
        )}
      </div>
    </div>
  )
}

export { ListItem }
