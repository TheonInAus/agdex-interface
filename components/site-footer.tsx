import React from "react"
import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"

import Iconify from "./Iconify"

const SiteFooter = () => {
  return (
    <footer className="flex flex-col items-center py-4 mt-10 space-y-4 text-white">
      <div>
        <Image
          src="/bronzes_logo.svg"
          alt="Logo"
          width={102}
          height={36}
          className="mb-2"
        />
      </div>
      <div className="flex items-center justify-center space-x-10">
        <Link href={siteConfig.links.twitter}>
          <Iconify
            icon="pajamas:twitter"
            className="p-2 rounded-xl bg-boxBackground"
            size={18}
          />
        </Link>
        <Link href={siteConfig.links.discord}>
          <Iconify
            icon="bxl:discord-alt"
            className="p-2 rounded-xl bg-boxBackground"
            size={22}
          />
        </Link>
        {/* <Link href={siteConfig.links.telegram}>
          <Iconify
            icon="uit:telegram-alt"
            className="p-2 rounded-xl bg-boxBackground"
            size={22}
          />
        </Link> */}
        <Link href={siteConfig.links.medium}>
          <Iconify
            icon="arcticons:medium-alt"
            className="p-2 rounded-xl bg-boxBackground"
            size={22}
          />
        </Link>
        <Link href={siteConfig.links.github}>
          <Iconify
            icon="simple-icons:gitbook"
            className="p-2 rounded-xl bg-boxBackground"
            size={22}
          />
        </Link>
      </div>
    </footer>
  )
}

export default SiteFooter
