import React, { ReactNode } from "react"

import {
  TooltipContent as TooltipContentUI,
  TooltipProvider,
  TooltipTrigger as TooltipTriggerUI,
  Tooltip as TooltipUI,
} from "./tooltip"

interface CustomTooltipProps {
  children: ReactNode
  triggerContent: ReactNode
  className?: string
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  children,
  triggerContent,
  className,
}) => {
  return (
    <TooltipProvider>
      <TooltipUI>
        <TooltipTriggerUI
          asChild
          className="italic underline decoration-dashed underline-offset-2"
        >
          {triggerContent}
        </TooltipTriggerUI>
        <TooltipContentUI className={`${className} w-80`}>
          {children}
        </TooltipContentUI>
      </TooltipUI>
    </TooltipProvider>
  )
}
