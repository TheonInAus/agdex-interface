import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center bg-0xgrey",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative w-full h-1 overflow-hidden border-none rounded-full outline-none grow bg-muted">
      <SliderPrimitive.Range className="absolute h-full bg-agdexMain" />
    </SliderPrimitive.Track>
    <div className="absolute top-1/2 left-[0%] -translate-y-1/2 size-2 rounded-full bg-agdexMain "></div>
    <div className="absolute top-full left-[1%] -translate-x-1/2 mt-2 text-xs">
      1x
    </div>
    <div className="absolute top-1/2 left-[25%] -translate-y-1/2 h-2 w-2 rounded-full bg-agdexMain"></div>
    <div className="absolute top-full left-[26%] -translate-x-1/2 mt-2 text-xs">
      20x
    </div>
    <div className="absolute top-1/2 left-[50%] -translate-y-1/2 h-2 w-2 rounded-full bg-agdexMain"></div>
    <div className="absolute top-full left-[51%] -translate-x-1/2 mt-2 text-xs">
      50x
    </div>
    <div className="absolute w-2 h-2 -translate-y-1/2 rounded-full top-1/2 left-3/4 bg-agdexMain"></div>
    <div className="absolute top-full left-[76%] -translate-x-1/2 mt-2 text-xs">
      75x
    </div>
    <div className="absolute top-1/2 left-[98%] -translate-y-1/2 h-2 w-2 rounded-full bg-agdexMain"></div>
    <div className="absolute top-full left-[97%] -translate-x-1/2 mt-2 text-xs">
      100x
    </div>
    <SliderPrimitive.Thumb className="block w-4 h-4 transition-colors border-2 border-white rounded-full bg-agdexMain ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
