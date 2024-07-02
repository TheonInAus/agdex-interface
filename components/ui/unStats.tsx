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

const UnStats: React.FC<StatsProps> = ({
  title,
  value,
  textColor,
  additionalText,
  info,
}) => {
  const valueTextColor = textColor || "text-white"
  return (
    <div className="flex flex-col mr-9">
      <div className="flex items-center gap-0.5">
        <span className="text-sm font-bold">{title}</span>
        {info ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-1">
                  <AlertCircle
                    className="text-white text-opacity-70 hover:text-opacity-100"
                    size={12}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{info}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <span className="w-5 h-5"></span>
        )}
      </div>
      <div className="flex items-center gap-2 mt-1">
        <span className={cn(valueTextColor, "text-2xl font-extrabold")}>
          {value}
        </span>
        {additionalText && <span className="text-lg">{additionalText}</span>}
      </div>
    </div>
  )
}

export { UnStats }
