import { AppProps } from "next/app"

import "@/styles/globals.css"
import { WagmiConfig, configureChains, createConfig } from "wagmi"
import { arbitrumGoerli } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"

import "@/styles/globals.css"
import "@rainbow-me/rainbowkit/styles.css"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit"
import { infuraProvider } from "wagmi/providers/infura"

import RootLayout from "./layout"

const appKey = process.env.INFURA_API_KEY || "default_app_key"
console.log("check api key => ", appKey)
const { chains, publicClient } = configureChains(
  [arbitrumGoerli],
  [
    infuraProvider({
      apiKey: "72580f581a484c32a2009a8f798b01e8",
    }),
    publicProvider(),
  ]
)

const { connectors } = getDefaultWallets({
  appName: "Oxx interface",
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

// 初始化Apollo Client
const client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/54949/0xx/version/latest",
  cache: new InMemoryCache(),
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <ApolloProvider client={client}>
          <RootLayout>
            <Component {...pageProps} />
          </RootLayout>
        </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
