import { useEffect, useState } from "react"
import Image from "next/image"
import {
  AptosStandardSupportedWallet,
  Wallet,
  WalletName,
  WalletReadyState,
  isRedirectable,
  useWallet,
} from "@aptos-labs/wallet-adapter-react"
import { enqueueSnackbar } from "notistack"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "./button"
import { Card } from "./card"

export default function ApotosConnectButtonWidget() {
  const { connect, connected, wallets, account, disconnect } = useWallet()
  //   const { setErrorAlertMessage } = useAlert()
  const [currentWallet, setCurrentWallet] = useState<Wallet>()

  const onCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText((account?.address as string) || "")
      console.log("copy done")
    } catch (error) {
      console.error("copy error:", error)
    }
    setDialogOpen(false)
  }

  const onDisconnect = async () => {
    try {
      if (connected) {
        disconnect()
      }
    } catch (error: any) {
      console.log("🚀 ~ wallet error ~ :", error)
    }
    setDialogOpen(false)
  }

  // we are on desktop view
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleButtonClick = () => {
    setDialogOpen(true)

    // if (connected) {
    //   console.log("🚀 ~ handleButtonClick 1111 ~ :", isWalletReady)
    //   setIsDialogOpen(true)
    // } else {
    //   setIsDialogOpen(false)
    //   onWalletConnectRequest(currentWallet?.name)
    // }
  }

  const handleWalletConnected = (wallet: Wallet) => {
    setCurrentWallet(wallet)
    setDialogOpen(false)
  }

  return (
    <div>
      <button
        className={`bg-blue-500  text-white font-bold py-2 px-4 rounded mr-4 
               `}
        key={currentWallet?.name}
        onClick={handleButtonClick}
      >
        <>{`${
          connected
            ? currentWallet?.name +
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
      <Dialog open={dialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-0xdialog">
          <div className="text-xl italic font-extrabold">Wallet Connect</div>
          {wallets &&
            wallets.length > 0 &&
            wallets.map((wallet, index) => (
              <WalletItemWidget
                wallet={wallet}
                handleWalletConnected={handleWalletConnected}
              />
            ))}
          <div className="flex w-full mt-2 justify-evenly">
            <Card>
              <button key={currentWallet?.name} onClick={() => onCopyAddress()}>
                Copy Address
              </button>
            </Card>
            <Card>
              <button key={currentWallet?.name} onClick={() => onDisconnect()}>
                Disconnect
              </button>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
interface WalletProps {
  wallet: Wallet | AptosStandardSupportedWallet<string>
  handleWalletConnected: (wallet: Wallet) => void
}

const WalletItemWidget: React.FC<WalletProps> = ({ wallet }) => {
  const { connect, connected, wallets, account, disconnect } = useWallet()
  const walletInstalled = wallet?.readyState === WalletReadyState.Installed
  const walletLoadable = wallet?.readyState === WalletReadyState.Loadable

  const onWalletConnectRequest = async (walletName: WalletName) => {
    if (!walletInstalled) {
      enqueueSnackbar(`${walletName} Not Install`, { variant: "error" })
      return
    }

    if (!walletLoadable) {
      enqueueSnackbar(`${walletName} Can't Loadable`, { variant: "info" })
    }
    try {
      connect(walletName)
    } catch (error: any) {
      console.log("🚀 ~ wallet error ~ :", error)
    }
  }

  // useEffect(() => {
  //   if (connected) {
  //     enqueueSnackbar(`Connected Success`, { variant: "success" })
  //     handleWalletConnected(wallet)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [connected])

  return (
    <Card className="flex flex-row items-center justify-between gap-4 px-2">
      <div className="flex flex-row items-center justify-between gap-4">
        <Image src={wallet.icon} alt={wallet.name} width={40} height={40} />
        <span className="">{wallet.name}</span>
      </div>
      <Button
        onClick={() => onWalletConnectRequest(wallet.name)}
        variant={walletInstalled ? "default" : "outline"}
      >
        {walletInstalled ? "Connect" : " Not Install"}
      </Button>
    </Card>
  )
}
function handleWalletConnected(
  wallet: Wallet | AptosStandardSupportedWallet<string>
) {
  throw new Error("Function not implemented.")
}
