import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const StyledTabs = TabsPrimitive.Root

const StyledTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "flex h-8 gap-2 overflow-hidden",
      className
    )}
    {...props}
  />
))
StyledTabsList.displayName = "StyledTabsList"

const StyledTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "h-8 relative inline-flex text-center items-center   px-3 text-base font-bold focus-visible:outline-none disabled:pointer-events-none disabled:text-gray-200 data-[state=active]:rounded-xl data-[state=active]:text-agdexMain data-[state=active]:underline data-[state=active]:underline-offset-4",
      className
    )}
    {...props}
  >
    {props.children}
  </TabsPrimitive.Trigger>
))
StyledTabsTrigger.displayName = "StyledTabsTrigger"
const StyledTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
StyledTabsContent.displayName = "TabsContent"

export { StyledTabs, StyledTabsList, StyledTabsTrigger, StyledTabsContent }
