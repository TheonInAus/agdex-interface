import { useBalance, useContractRead, useContractReads } from "wagmi"
import { btcMarketAddress, ethMarketAddress, registerPoolsInfos, usdxAddress, rewardFarmAddress } from "./zAddressHelper"
import { useWalletClient } from 'wagmi'
import { arbitrumGoerli } from 'wagmi/chains'
import { poolABI } from "@/abis/poolABI"
import { SIDE_LONG, SIDE_SHORT } from "./zContractHelper"
import { useQuery, gql } from '@apollo/client';
import { rewardFarmABI } from "@/abis/rewardFarmABI"
import { TokenConfigType } from "./zTokenConfig"

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
        token: usdxAddress,
        watch: true
    })

    return { data, isError, isLoading }
}

type TokenParamsType = {
    tokenName: string
    poolAddress: string
}

export const useUserPositionList = (token: TokenConfigType) => {
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
    contractParams.push({
        ...contractBaseInfo,
        address: token.poolContract,
        args: [walletClient?.account.address, SIDE_LONG]
    });
    tokenBaseInfo.push({ tokenName: token.name, tokenSide: 'Long', tokenPool: token.poolContract })

    contractParams.push({
        ...contractBaseInfo,
        address: token.poolContract,
        args: [walletClient?.account.address, SIDE_SHORT]
    });

    tokenBaseInfo.push({ tokenName: token.name, tokenSide: 'Short', tokenPool: token.poolContract })

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

type OrderBookItemType = {
    blockTimestamp: string
    blockNumber: string
    account: string
    id: string
    marginDelta: string
    sizeDelta: string
    orderIndex: string
    pool: string
    side: number
    triggerAbove: boolean
    triggerMarketPriceX96: string
    acceptableTradePriceX96: string
    __typename: string
};


type QueryResult = {
    increaseOrderCreateds: OrderBookItemType[];
    decreaseOrderCreateds: OrderBookItemType[];
};
export const useUserOrderList = () => {
    const { data: walletClient } = useWalletClient({
        chainId: arbitrumGoerli.id,
    })
    const GET_DATA = gql`
    query GetOrderBookList($address: String!) {
        increaseOrderCreateds(
            orderBy: blockTimestamp
            orderDirection: desc
            where:{account: $address}
        ) {
            blockTimestamp
            blockNumber
            account
            marginDelta
            sizeDelta
            orderIndex
            pool
            side
            triggerAbove
            triggerMarketPriceX96
            acceptableTradePriceX96
        }
        decreaseOrderCreateds(
            orderBy: blockTimestamp
            orderDirection: desc
            where:{account: $address}
        ) {
            blockTimestamp
            blockNumber
            account
            id
            marginDelta
            sizeDelta
            orderIndex
            pool
            side
            triggerAbove
            triggerMarketPriceX96
            acceptableTradePriceX96
        }
    }
  `;

    const { loading, error, data } = useQuery<QueryResult>(GET_DATA, {
        skip: !walletClient?.account.address,
        variables: { address: walletClient?.account.address },
        pollInterval: 5000
    });


    const combineData = data?.increaseOrderCreateds.concat(data?.decreaseOrderCreateds)
    combineData?.sort((a, b) => Number(b.blockTimestamp) - Number(a.blockTimestamp));

    // console.log('result graph result order combineData=> ', combineData)

    return {
        isLoading: loading,
        isError: error,
        orderBookList: combineData
    }
}


export const useGetReferralState = () => {
    const { data: walletClient } = useWalletClient({
        chainId: arbitrumGoerli.id,
    })

    const { data, isLoading, isError } = useContractRead({
        address: rewardFarmAddress,
        abi: rewardFarmABI,
        functionName: "alreadyBoundReferralTokens",
        args: [walletClient?.account.address]
    })

    return { data, isLoading, isError }
}