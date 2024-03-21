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
    <header className="top-0 z-40">
      <div className="flex flex-row items-center justify-center gap-10 px-20 mt-5">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex items-center ">
          <div className="px-1 mr-3">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.twitter className="w-5 h-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <ThemeToggle />
          </div>
          {/* <ConnectButton /> */}
          <ApotosConnectButtonWidget />
        </div>
      </div>
    </header>
  )
}
