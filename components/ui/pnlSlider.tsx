import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const PnLSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative w-full h-1 overflow-hidden rounded-full grow bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-yellow-200" />
    </SliderPrimitive.Track>
    <div className="absolute top-1/2 left-[0%] -translate-y-1/2 h-2 w-2 rounded-full bg-agdexMain border-agdexMain"></div>
    <div className="absolute top-full left-[1%] -translate-x-1/2 mt-2 text-xs">
      1x
    </div>
    <div className="absolute top-1/2 left-[25%] -translate-y-1/2 h-2 w-2 rounded-full bg-agdexMain border-agdexMain"></div>
    <div className="absolute top-full left-[26%] -translate-x-1/2 mt-2 text-xs">
      50x
    </div>
    <div className="absolute top-1/2 left-[50%] -translate-y-1/2 h-2 w-2 rounded-full bg-agdexMain border-agdexMain"></div>
    <div className="absolute top-full left-[51%] -translate-x-1/2 mt-2 text-xs">
      100x
    </div>
    <div className="absolute top-1/2 left-[75%] -translate-y-1/2 h-2 w-2 rounded-full bg-agdexMain border-agdexMain"></div>
    <div className="absolute top-full left-[76%] -translate-x-1/2 mt-2 text-xs">
      150x
    </div>
    <div className="absolute top-1/2 left-[97%] -translate-y-1/2 h-2 w-2 rounded-full bg-agdexMain border-agdexMain"></div>
    <div className="absolute top-full left-[97%] -translate-x-1/2 mt-2 text-xs">
      200x
    </div>
    <SliderPrimitive.Thumb className="block w-4 h-4 transition-colors bg-yellow-700 border-2 border-white rounded-full ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
PnLSlider.displayName = SliderPrimitive.Root.displayName

export { PnLSlider }
