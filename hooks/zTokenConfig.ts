import { btcPoolAddress, btcTokenAddress, ethPoolAddress, ethTokenAddress, ordiPoolAddress, ordiTokenAddress } from "./zAddressHelper";

type Address = string;
export interface TokenConfigType {
    name: string;
    symbol: string;
    tokenContract: Address;
    poolContract: Address;
    volume?: string;
    price?: string;
    percentageChange?: string;
}
export const tokenConfig: TokenConfigType[] = [
    {
        name: 'BTC',
        symbol: 'BTC/USTX',
        tokenContract: btcTokenAddress,
        poolContract: btcPoolAddress
    },
    {
        name: 'ETH',
        symbol: 'ETH/USTX',
        tokenContract: ethTokenAddress,
        poolContract: ethPoolAddress
    },

    {
        name: 'ORDI',
        symbol: 'ORDI/USTX',
        tokenContract: ordiTokenAddress,
        poolContract: ordiPoolAddress
    },
]