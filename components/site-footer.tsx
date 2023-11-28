import React from "react"
import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "@/config/site"

import Iconify from "./Iconify"

const SiteFooter = () => {
  return (
    <footer className="flex flex-col items-center space-y-4 py-4 text-white">
      <div>
        <Image src="/0xx_logo.svg" alt="Logo" width={46} height={23} className="mb-2" />
      </div>
      <div className="flex items-center justify-center space-x-10">
        <Link href={siteConfig.links.twitter}>
          <Iconify
            icon="pajamas:twitter"
            className="rounded-xl bg-boxBackground p-2"
            size={18}
          />
        </Link>
        <Link href={siteConfig.links.discord}>
          <Iconify
            icon="bxl:discord-alt"
            className="rounded-xl bg-boxBackground p-2"
            size={22}
          />
        </Link>
        <Link href={siteConfig.links.telegram}>
          <Iconify
            icon="uit:telegram-alt"
            className="rounded-xl bg-boxBackground p-2"
            size={22}
          />
        </Link>
        <Link href={siteConfig.links.medium}>
          <Iconify
            icon="arcticons:medium-alt"
            className="rounded-xl bg-boxBackground p-2"
            size={22}
          />
        </Link>
        <Link href={siteConfig.links.github}>
          <Iconify
            icon="simple-icons:gitbook"
            className="rounded-xl bg-boxBackground p-2"
            size={22}
          />
        </Link>
      </div>
    </footer>
  )
}

export default SiteFooter
