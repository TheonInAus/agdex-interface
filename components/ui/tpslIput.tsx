import * as React from "react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export interface TpsLInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    suffix?: string
  }

const TpsLInput = React.forwardRef<HTMLInputElement, TpsLInputProps>(
  ({ className, type, suffix, ...props }, ref) => {
    return (
      <div className="flex items-center">
        <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-l-md border-t border-l border-b border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 text-left",
          className
        )}
        ref={ref}
        {...props}
      />
      {suffix && (
          <span className="flex items-center h-10 rounded-r-md border-t border-r border-b border-input bg-background px-3 py-2 text-sm">
            {suffix}
          </span>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { TpsLInput }