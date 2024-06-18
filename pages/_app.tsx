import { AppProps } from "next/app"

import "@/styles/globals.css"
import { useEffect, useState } from "react"
import { getAccountInfo } from "@/chainio/fetchData"
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk"
import {
  AptosWalletAdapterProvider,
  useWallet,
} from "@aptos-labs/wallet-adapter-react"
import { OKXWallet } from "@okwallet/aptos-wallet-adapter"
import { PontemWallet } from "@pontem/wallet-adapter-plugin"
import { SnackbarProvider } from "notistack"
import { PetraWallet } from "petra-plugin-wallet-adapter"

import RootLayout from "./layout"

interface ProvidersProps {
  children: React.ReactNode
}

const wallets = [new OKXWallet(), new PetraWallet(), new PontemWallet()]

const aptosConfig = new AptosConfig({ network: Network.TESTNET })
export const aptos = new Aptos(aptosConfig)
export const moduleAddress =
  "0x87e95448bc9088569ed1f9b724a1ec679a187a1c80ff49b52c305318956c4bb7"
export const coinAddress =
  "0x6f60af74988c64cd3b7c1e214697e6949db39c061d8d4cf59a7e2bd1b66c8bf0"
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
