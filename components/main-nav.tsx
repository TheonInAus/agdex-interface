"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

import { Card } from "./ui/card"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-6 md:gap-6">
      {/* <Link href="/" className="flex items-center space-x-2">
        <Icons.logo />
      </Link> */}
      <div className="text-4xl italic font-extrabold">AGDEX</div>
      <Card>
        {items?.length ? (
          <nav className="flex gap-6 ">
            {items?.map(
              (item, index) =>
                item.href && (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center text-xl font-bold",
                      pathname === item.href
                        ? "underline underline-offset-4"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                )
            )}
          </nav>
        ) : null}
      </Card>
    </div>
  )
}
