import { AppProps } from "next/app"

import "@/styles/globals.css"
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react"
import { OKXWallet } from "@okwallet/aptos-wallet-adapter"
import { PontemWallet } from "@pontem/wallet-adapter-plugin"
import { SnackbarProvider } from "notistack"
import { PetraWallet } from "petra-plugin-wallet-adapter"

import RootLayout from "./layout"

interface ProvidersProps {
  children: React.ReactNode
}

const wallets = [new OKXWallet(), new PetraWallet(), new PontemWallet()]

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AptosWalletAdapterProvider
      plugins={wallets}
      autoConnect={true}
      onError={(error) => {
        console.log("error", error)
      }}
    >
      <SnackbarProvider maxSnack={5} />
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </AptosWalletAdapterProvider>
  )
}

export default MyApp
