import Link from "next/link"
import { ConnectButton } from "@rainbow-me/rainbowkit"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import ApotosConnectButtonWidget from "./ui/AptosConnectButton"
import { Card } from "./ui/card"

export function SiteHeader() {
  return (
    <header className="top-0 z-40 bg-0xboxBackground pb-2">
      <div className="flex flex-row items-center justify-between gap-10 px-20 mt-5">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex items-center ">
          <ApotosConnectButtonWidget />
        </div>
      </div>
    </header>
  )
}
