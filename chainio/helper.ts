import { coinAddress, moduleAddress } from "@/pages/_app"
import { APTOS_COIN } from "@aptos-labs/ts-sdk"
import { MOCK_LP_COIN_STORE, MOCK_USDC_COIN_STORE, MOCK_USDT_COIN_STORE } from "./fetchData"

export type PoolInfo = {
    name: string
    tokenName: string
    tokenSymbol: string
    tokenAddress: string
    pythFeederAddress: string
    decimal: number
}

export type VaultInfo = {
    name: string,
    symbol: string,
    tokenAddress: string,
    tokenStore: string,
    decimal: number
}

export const APTOS_COIN_STORE = "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
export const PoolList: PoolInfo[] = [
    {
        name: "APTOS/USD",
        tokenName: 'APTOS',
        tokenSymbol: 'APT',
        tokenAddress: APTOS_COIN,
        pythFeederAddress: "0x44a93dddd8effa54ea51076c4e851b6cbbfd938e82eb90197de38fe8876bb66e",
        decimal: 8
    },
    {
        name: "BTC/USD",
        tokenName: 'BTC',
        tokenSymbol: 'BTC',
        tokenAddress: `${coinAddress}::btc::BTC`,
        pythFeederAddress: "0xf9c0172ba10dfa4d19088d94f5bf61d3b54d5bd7483a322a982e1373ee8ea31b",
        decimal: 8
    },
    {
        name: "ETH/USD",
        tokenName: 'ETH',
        tokenSymbol: 'ETH',
        tokenAddress: `${coinAddress}::ETH::ETH`,
        pythFeederAddress: "0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6",
        decimal: 8
    }
]

export type LpTokenInfo = {
    name: String
    tokenName: String
    tokenSymbol: String
    tokenAddress: String
    tokenStore: String
    decimal: 6
}
export const LpToken: LpTokenInfo = {
    name: 'LP',
    tokenName: 'LP',
    tokenSymbol: 'LP',
    tokenAddress: `${coinAddress}::lp::LP`,
    tokenStore: MOCK_LP_COIN_STORE,
    decimal: 6
}

export const VaultList: VaultInfo[] = [
    {
        name: 'APTOS',
        symbol: 'APT',
        tokenAddress: APTOS_COIN,
        tokenStore: APTOS_COIN_STORE,
        decimal: 8
    },
    {
        name: 'USDT',
        symbol: 'USDT',
        tokenAddress: `${coinAddress}::usdt::USDT`,
        tokenStore: MOCK_USDT_COIN_STORE,
        decimal: 6
    },
    {
        name: 'USDC',
        symbol: 'USDC',
        tokenAddress: `${coinAddress}::usdc::USDC`,
        tokenStore: MOCK_USDC_COIN_STORE,
        decimal: 6
    }
]
export type PriceFeederInfo = {
    tokenName: string,
    feederAddress: string
    decimal: number
}

export const PriceFeederList: PriceFeederInfo[] = [
    { tokenName: 'APTOS', feederAddress: "0x44a93dddd8effa54ea51076c4e851b6cbbfd938e82eb90197de38fe8876bb66e", decimal: 8 },
    { tokenName: 'USDT', feederAddress: "0x41f3625971ca2ed2263e78573fe5ce23e13d2558ed3f2e47ab0f84fb9e7ae722", decimal: 6 },
    { tokenName: 'USDC', feederAddress: "0x1fc18861232290221461220bd4e2acd1dcdfbc89c84092c93c18bdc7756c1588", decimal: 6 },
    { tokenName: 'BTC', feederAddress: "0xf9c0172ba10dfa4d19088d94f5bf61d3b54d5bd7483a322a982e1373ee8ea31b", decimal: 8 },
    { tokenName: 'ETH', feederAddress: "0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6", decimal: 8 }
];