import { ethMarketAddress, btcMarketAddress, arbMarketAddress, linkMarketAddress } from "./zAddressHelper";

type Address = string;
export interface TokenConfigType {
    name: string;
    symbol: string;
    market: string;
    volume?: string;
    price?: string;
    percentageChange?: string;
}

export const tokenConfig: TokenConfigType[] = [
    {
        name: 'ETH',
        symbol: 'ETH/USTX',
        market: ethMarketAddress,
    },
    {
        name: 'BTC',
        symbol: 'BTC/USTX',
        market: btcMarketAddress,
    },
    {
        name: 'ARB',
        symbol: 'ARB/USTX',
        market: arbMarketAddress
    },
    {
        name: 'LINK',
        symbol: 'LINK/USTX',
        market: linkMarketAddress
    },
]