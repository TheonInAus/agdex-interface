import { APTOS_COIN } from "@aptos-labs/ts-sdk"

export type PoolInfo = {
    name: string
    tokenName: string
    tokenAddress: string
}

export type VaultInfo = {
    name: string,
    symbol: string,
    tokenAddress: string
}

export const APTOS_COIN_STORE = "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
export const pythAptosFeeder = { address: "0x44a93dddd8effa54ea51076c4e851b6cbbfd938e82eb90197de38fe8876bb66e", decimal: 8 }
export const PoolList: PoolInfo[] = [
    {
        name: "APTOS/USD",
        tokenName: 'APTOS',
        tokenAddress: APTOS_COIN,
    },
    {
        name: "BTC/USD",
        tokenName: 'BTC',
        tokenAddress: '0',
    },
    {
        name: "ETH/USD",
        tokenName: 'ETH',
        tokenAddress: '1',
    }
]


export const VaultList: VaultInfo[] = [
    {
        name: 'APTOS',
        symbol: 'APT',
        tokenAddress: APTOS_COIN
    },
    {
        name: 'USDX',
        symbol: 'USDT',
        tokenAddress: 'xxx'
    },
    {
        name: 'SOLANA',
        symbol: 'USDC',
        tokenAddress: 'xxx'
    }
]