
export type PoolInfo = {
    name: string
    token0: string
    token1: string
    token0Address: string
    token1Address: string
}

export const APTOS_COIN_STORE = "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"

export const PoolList: PoolInfo[] = [
    {
        name: "APTOS/USD",
        token0: 'APTOS',
        token1: "USDX",
        token0Address: '0',
        token1Address: '1',
    },
    {
        name: "BTC/USD",
        token0: 'BTC',
        token1: "USDX",
        token0Address: '0',
        token1Address: '1',
    },
    {
        name: "ETH/USD",
        token0: 'ETH',
        token1: "USDX",
        token0Address: '0',
        token1Address: '1',
    }
]