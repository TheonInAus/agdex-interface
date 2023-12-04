import { useContractRead } from "wagmi"
import { priceFeedAddress } from "./zAddressHelper"
import { priceFeedABI } from "@/abis/priceFeedABI"
import { x96Price2Readable } from "./zContractHelper"


export const useTokenPrice = (tokenAddress: any) => {
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