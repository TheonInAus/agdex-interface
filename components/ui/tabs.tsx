import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex bg-popover rounded-xl text-white h-10",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const isLong = props.value === "long"

  let activeStyle = "data-[state=active]:bg-0xgreen"
  switch (props.value) {
    case "long":
      activeStyle = "data-[state=active]:bg-0xgreen"
      break
    case "short":
      activeStyle = "data-[state=active]:bg-0xred"
      break
    case "swap":
      activeStyle = "data-[state=active]:bg-agdexMain"
      break
  }

  let baseStyles = `inline-flex font-bold items-center justify-center whitespace-nowrap rounded-xl h-full text-lg  ${activeStyle} data-[state=active]:text-white`

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(baseStyles, className)}
      {...props}
    >
      {props.children}
    </TabsPrimitive.Trigger>
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
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
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
