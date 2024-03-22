import { formatEther, formatUnits } from 'viem';
import { poolABI } from "@/abis/poolABI"
import { useEffect, useState } from "react"
import { useContractRead } from "wagmi"
import { marketManagerAddress } from "./zAddressHelper"
import { marketManagerABI } from "@/abis/marketManagerABI"

type LiqPositionDataType = {
    liquidationBufferNetSize: bigint
    liquidity: bigint
    netSize: bigint
    previousSPPriceX96: bigint
    side: number
    unrealizedPnLGrowthX64: bigint
}

type PositionDataType = {
    longFundingRateGrowthX96: bigint
    longSize: bigint
    maxSize: bigint
    maxSizePerPosition: bigint
    shortFundingRateGrowthX96: bigint
    shortSize: bigint
}

export const usePositionAndLiqPositionInfo = (market: any) => {
    const { data: liqPositionData } = useContractRead({
        address: marketManagerAddress,
        abi: marketManagerABI,
        functionName: 'globalLiquidityPositions',
        args: [market]
    }) as { data: LiqPositionDataType };

    const { data: positionData } = useContractRead({
        address: marketManagerAddress,
        abi: marketManagerABI,
        functionName: 'globalPositions',
        args: [market]
    }) as { data: PositionDataType }

    const [lpNetSize, setLpNetSize] = useState(0)
    const [lpSide, setLpSide] = useState(1)
    const [lpEntryPrice, setLpEntryPrice] = useState(0)
    const [liquidity, setLiquidity] = useState(0)
    const [liqPnL, setLiqPnL] = useState(0)

    const [longSize, setLongSize] = useState(0)
    const [shortSize, setShortSize] = useState(0)
    const [maxSize, setMaxSize] = useState(0)
    const [maxSizePerPosition, setMaxSizePerPosition] = useState(0)
    const [longFundingRateGrowthX96, setLongFundingRateGrowthX96] = useState(0)
    const [shortFundingRateGrowthX96, setShortFundingRateGrowthX96] = useState(0)


    useEffect(() => {
        if (liqPositionData) {
            setLpNetSize(Number(formatEther(liqPositionData?.liquidationBufferNetSize)));
            setLpEntryPrice(Number(formatEther(liqPositionData?.previousSPPriceX96)))
            setLpSide(liqPositionData?.side)
            setLiquidity(Number(formatUnits(liqPositionData?.liquidity, 6)))
            setLiqPnL(Number(formatEther(liqPositionData?.unrealizedPnLGrowthX64)))
        }
    }, [liqPositionData]);


    useEffect(() => {
        if (positionData) {
            setLongSize(Number(formatEther(positionData?.longSize)));
            setShortSize(Number(formatEther(positionData?.shortSize)));
            setMaxSize(Number(formatEther(positionData?.maxSize)));
            setMaxSizePerPosition(Number(formatEther(positionData?.maxSizePerPosition)));
            setLongFundingRateGrowthX96(Number(formatEther(positionData?.longFundingRateGrowthX96)));
            setShortFundingRateGrowthX96(Number(formatEther(positionData?.shortFundingRateGrowthX96)));

        }
    }, [positionData])

    return {
        lpNetSize,
        lpSide,
        lpEntryPrice,
        liquidity,
        liqPnL,
        longSize,
        shortSize,
        maxSize,
        maxSizePerPosition,
        longFundingRateGrowthX96,
        shortFundingRateGrowthX96
    }
}