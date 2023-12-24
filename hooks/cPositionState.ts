import { formatEther, formatUnits } from 'viem';
import { poolABI } from "@/abis/poolABI"
import { useEffect, useState } from "react"
import { useContractRead } from "wagmi"


export const usePositionAndLiqPositionInfo = (poolAddress: any) => {
    const { data: liqPositionData, isLoading: liqPositionLoading, isError: liqPositionError } = useContractRead({
        address: poolAddress,
        abi: poolABI,
        functionName: 'globalLiquidityPosition',
    })

    const { data: positionData, isLoading: positionLoading, isError: positionError } = useContractRead({
        address: poolAddress,
        abi: poolABI,
        functionName: 'globalPosition',
    })

    const [lpNetSize, setLpNetSize] = useState(0)
    const [lpSide, setLpSide] = useState(1)
    const [lpEntryPrice, setLpEntryPrice] = useState(0)
    const [liquidity, setLiquidity] = useState(0)
    const [liqPnL, setLiqPnL] = useState(0)

    const [longSize, setLongSize] = useState(0)
    const [shortSize, setShortSize] = useState(0)
    const [longFundingRateGrowthX96, setLongFundingRateGrowthX96] = useState(0)
    const [shortFundingRateGrowthX96, setShortFundingRateGrowthX96] = useState(0)

    const liqPositionDataArray = liqPositionData as any[];

    useEffect(() => {
        if (liqPositionDataArray && liqPositionDataArray.length > 0) {
            setLpNetSize(Number(formatEther(liqPositionDataArray[0] as bigint || 0n)));
            setLpEntryPrice(Number(formatEther(liqPositionDataArray[2] as bigint || 0n)))
            setLpSide(Number(liqPositionDataArray[3] as bigint || 0n))
            setLiquidity(Number(formatUnits(liqPositionDataArray[4] as bigint || 0n, 6)))
            setLiqPnL(Number(formatEther(liqPositionDataArray[5] as bigint || 0n)))
        }
    }, [liqPositionDataArray]);

    const positionDataArray = positionData as any[];

    useEffect(() => {
        if (positionDataArray && (positionDataArray as any[]).length > 0) {
            setLongSize(Number(formatEther(positionDataArray[0] as bigint || 0n)));
            setShortSize(Number(formatEther(positionDataArray[1] as bigint || 0n)));
            setLongFundingRateGrowthX96(Number(formatEther(positionDataArray[2] as bigint || 0n)));
            setShortFundingRateGrowthX96(Number(formatEther(positionDataArray[3] as bigint || 0n)));

        }
    }, [positionDataArray])

    return {
        lpNetSize,
        lpSide,
        lpEntryPrice,
        liquidity,
        liqPnL,
        longSize,
        shortSize,
        longFundingRateGrowthX96,
        shortFundingRateGrowthX96
    }
}