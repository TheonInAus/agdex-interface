import { useContractRead, useContractReads } from "wagmi"
import { ethMarketAddress, priceFeedAddress } from "./zAddressHelper"
import { priceFeedABI } from "@/abis/priceFeedABI"
import { SIDE_LONG, SIDE_SHORT, x96Price2Readable } from "./zContractHelper"
import { poolABI } from "@/abis/poolABI"


export const useContractTokenPrice = (tokenAddress: any) => {
    const { data, isLoading, isError } = useContractRead({
        address: priceFeedAddress,
        abi: priceFeedABI,
        functionName: 'latestPrices',
        args: [tokenAddress]
    })

    const result = data as Array<bigint> || [0n, 0n, 0n, 0n,]
    const updateTimestamp = result[0]
    const maxPriceX96 = result[1]
    const minPriceX96 = result[2]
    const updateBlockTimestamp = result[3]

    const maxPrice = x96Price2Readable(maxPriceX96)
    const minPrice = x96Price2Readable(minPriceX96)
    return {
        updateTimestamp,
        maxPriceX96,
        minPriceX96,
        maxPrice,
        minPrice,
        updateBlockTimestamp
    }
}

type TokenMarketPriceType = {
    marketPriceForLong: number
    marketPriceForShort: number
}

export const useTokenMarketPrice = (tokenPoolAddress: any) => {
    const baseParams = {
        address: ethMarketAddress,
        abi: poolABI,
        functionName: 'marketPriceX96'
    }
    let paramsArr: any[] = [
        { ...baseParams, args: [SIDE_LONG] },
        { ...baseParams, args: [SIDE_SHORT] },
    ]

    const { data, isLoading, isError } = useContractReads({
        contracts: paramsArr
    })

    const result: TokenMarketPriceType = { marketPriceForLong: 0, marketPriceForShort: 0 }
    if (data && data.length > 0) {
        if (data[0].status === 'success') {
            result.marketPriceForLong = Number(data[0].result as unknown as bigint || 0n)
        }
        if (data[1].status === 'success') {
            result.marketPriceForShort = Number(data[1].result as unknown as bigint || 0n)
        }
    }

    return { marketPriceData: result }

}


