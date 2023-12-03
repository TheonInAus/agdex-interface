import { useBalance, useContractRead, useContractReads } from "wagmi"
import { ethPoolAddress, registerPoolsInfos, usdxAddress } from "./zAddressHelper"
import { useWalletClient } from 'wagmi'
import { arbitrumGoerli } from 'wagmi/chains'
import { poolABI } from "@/abis/poolABI"
import { SIDE_LONG, SIDE_SHORT } from "./zContractHelper"

// struct Position {
//     uint128 margin;
//     uint128 size;
//     uint160 entryPriceX96;
//     int192 entryFundingRateGrowthX96;
// }

export const useUserUsdxBalance = () => {
    const { data: walletClient } = useWalletClient({
        chainId: arbitrumGoerli.id,
    })
    const { data, isError, isLoading } = useBalance({
        address: walletClient?.account.address,
        token: usdxAddress
    })

    return { data, isError, isLoading }
}

type TokenParamsType = {
    tokenName: string
    poolAddress: string
}

export const useUserPositionList = () => {
    const { data: walletClient } = useWalletClient({
        chainId: arbitrumGoerli.id,
    })
    const tokensList: TokenParamsType[] = registerPoolsInfos.map((pool) => ({ tokenName: pool.name, poolAddress: pool.pool }))
    const contractBaseInfo = {
        abi: poolABI,
        functionName: 'positions',
    }
    const contractParams: any[] = []
    const tokenBaseInfo: any[] = []
    tokensList.forEach((token) => {
        contractParams.push({
            ...contractBaseInfo,
            address: token.poolAddress,
            args: [walletClient?.account.address, SIDE_LONG]
        });
        tokenBaseInfo.push({ tokenName: token.tokenName, tokenSide: 'Long', tokenPool: token.poolAddress })

        contractParams.push({
            ...contractBaseInfo,
            address: token.poolAddress,
            args: [walletClient?.account.address, SIDE_SHORT]
        });

        tokenBaseInfo.push({ tokenName: token.tokenName, tokenSide: 'Short', tokenPool: token.poolAddress })

    })

    const { data, isLoading, isError } = useContractReads({
        contracts: contractParams,
        watch: true
    })

    const positionDatas: any[] = []
    if (data && data.length > 0) {
        data.forEach((item, index) => {
            if (item.status === 'success') {
                const result = item.result as Array<bigint> || [0, 0, 0, 0]
                let positionEntity = {
                    margin: result[0],
                    size: result[1],
                    entryPrice: result[2],
                    unrealizedPnL: result[3],
                    tokenName: tokenBaseInfo[index].tokenName,
                    tokenSide: tokenBaseInfo[index].tokenSide,
                    tokenPool: tokenBaseInfo[index].tokenPool
                }
                positionDatas.push(positionEntity)
            }
        })
    }
    const positionDataList = positionDatas.filter(position => position.margin !== 0n && position.size !== 0n)
    return { data: positionDataList, isLoading, isError }
}
