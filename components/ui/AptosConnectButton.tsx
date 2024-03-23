import { useState } from "react"
import {
  WalletName,
  WalletReadyState,
  isRedirectable,
  useWallet,
} from "@aptos-labs/wallet-adapter-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Card } from "./card"

export default function ApotosConnectButtonWidget() {
  const { connect, connected, wallets, account, disconnect } = useWallet()
  //   const { setErrorAlertMessage } = useAlert()
  const wallet = wallets[0]
  const onWalletConnectRequest = async (walletName: WalletName) => {
    console.log("🚀 ~ ApotosConnectButtonWidget ~ 3333:", isWalletReady)
    try {
      connect(walletName)
    } catch (error: any) {
      console.log("🚀 ~ wallet error ~ :", error)
    }
  }
  const onCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText((account?.address as string) || "")
      console.log("copy done")
    } catch (error) {
      console.error("copy error:", error)
    }
    setIsDialogOpen(false)
  }
  const onDisconnect = async () => {
    try {
      if (connected) {
        disconnect()
      }
    } catch (error: any) {
      console.log("🚀 ~ wallet error ~ :", error)
    }
    setIsDialogOpen(false)
  }
  const mobileSupport = wallet.deeplinkProvider

  const isWalletReady =
    wallet.readyState === WalletReadyState.Installed ||
    wallet.readyState === WalletReadyState.Loadable

  // we are on desktop view
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleButtonClick = () => {
    if (connected) {
      console.log("🚀 ~ handleButtonClick 1111 ~ :", isWalletReady)
      setIsDialogOpen(true)
    } else {
      setIsDialogOpen(false)
      onWalletConnectRequest(wallet.name)
    }
  }

  return (
    <div>
      <button
        className={`bg-blue-500  text-white font-bold py-2 px-4 rounded mr-4 
               `}
        key={wallet.name}
        onClick={handleButtonClick}
      >
        <>{`${
          connected
            ? wallet.name +
              "  " +
              account?.address
                ?.substring(0, 6)
                .concat("...")
                .concat(
                  account?.address?.substring(
                    account.address.length - 6,
                    account.address.length
                  )
                )
            : "Connect Wallet"
        }  `}</>
      </button>
      <Dialog open={isDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-0xdialog">
          <div className="text-xl italic font-extrabold">
            Wallet Connect State
          </div>
          <div className="flex w-full mt-2 justify-evenly">
            <Card>
              <button key={wallet.name} onClick={() => onCopyAddress()}>
                Copy Address
              </button>
            </Card>
            <Card>
              <button key={wallet.name} onClick={() => onDisconnect()}>
                Disconnect
              </button>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
