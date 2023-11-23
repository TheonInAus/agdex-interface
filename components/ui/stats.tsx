import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle } from "lucide-react"

import { cn } from "@/lib/utils"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"

const statsVariants = cva("flex flex-col", {
  variants: {
    size: {
      default: "text-lg",
      sm: "text-sm",
      lg: "text-xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export interface StatsProps extends VariantProps<typeof statsVariants> {
  title: string
  value: string
  textColor?: string
  additionalText?: string
  info?: string
}

const Stats: React.FC<StatsProps> = ({
  title,
  value,
  textColor,
  additionalText,
  info,
}) => {
  const valueTextColor = textColor || "text-white"
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-0.5">
        <span className="text-xs text-0xgrey">{title}</span>
        {info && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-1">
                <AlertCircle
                  className="text-white text-opacity-70 hover:text-opacity-100"
                  size={16}
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{info}</p>
            </TooltipContent>
          </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className={cn(valueTextColor, "text-base")}>{value}</span>
        {additionalText && (
          <span className="text-base text-0xgrey">{additionalText}</span>
        )}
      </div>
    </div>
  )
}

export { Stats }
