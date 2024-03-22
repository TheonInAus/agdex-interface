import { AppProps } from "next/app"

import "@/styles/globals.css"
import { WagmiConfig, configureChains, createConfig } from "wagmi"
import { arbitrumSepolia } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"

import "@/styles/globals.css"
import "@rainbow-me/rainbowkit/styles.css"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react"
import { OKXWallet } from "@okwallet/aptos-wallet-adapter"
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { infuraProvider } from "wagmi/providers/infura"

import RootLayout from "./layout"

const appKey = process.env.INFURA_API_KEY || "default_app_key"
const { chains, publicClient } = configureChains(
  [arbitrumSepolia],
  [
    alchemyProvider({
      apiKey: "EypqiG9ZS9WLARpuXUX8-AZ8HVTvY_mb",
    }),
    // infuraProvider({
    //   apiKey: "72580f581a484c32a2009a8f798b01e8",
    // }),

    publicProvider(),
  ]
)

const { connectors } = getDefaultWallets({
  appName: "Bronzes Interface",
  projectId:
    process.env.NEXT_PUBLIC_PROJECT_ID || "368ee5791bcf5b7032b8b1da8630c6d9",
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

interface ProvidersProps {
  children: React.ReactNode
}

// const client = new ApolloClient({
//   uri: "https://api.studio.thegraph.com/query/54949/0xxv2-new/version/latest",
//   cache: new InMemoryCache(),
// })

const wallets = [new OKXWallet()]

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <AptosWalletAdapterProvider
          plugins={wallets}
          autoConnect={true}
          onError={(error) => {
            console.log("error", error)
          }}
        >
          {/* <ApolloProvider client={client}> */}
          <RootLayout>
            <Component {...pageProps} />
          </RootLayout>
          {/* </ApolloProvider> */}
        </AptosWalletAdapterProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
