import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design"

import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"

import ApotosConnectButtonWidget from "./ui/AptosConnectButton"
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css"

export function SiteHeader() {
  return (
    <header className="top-0 z-40 pb-2 bg-0xboxBackground">
      <div className="flex flex-row items-center justify-between gap-10 px-20 mt-5">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex items-center ">
          <ApotosConnectButtonWidget />
          {/* <WalletSelector /> */}
        </div>
      </div>
    </header>
  )
}
