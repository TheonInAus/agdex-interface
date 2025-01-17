"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { NavItem } from "@/types/nav"
import { cn } from "@/lib/utils"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-6 md:gap-6 w-[850px]">
      <div className="flex items-center justify-center gap-2 mr-10">
        <Image src="/agLogo.svg" alt="Logo" width={50} height={50} />
        <div className="text-lg font-bold text-agdexMain">AGDEX</div>
      </div>
      {items?.length ? (
        <nav className="flex gap-6 ">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-base font-bold",
                    pathname === item.href
                      ? "underline underline-offset-4 text-agdexMain"
                      : "text-white"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
