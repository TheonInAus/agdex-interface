import { useBalance, useContractRead, useContractReads } from "wagmi"
import { registerMarketInfos, usdxAddress, rewardFarmAddress, marketManagerAddress } from "./zAddressHelper"
import { useWalletClient } from 'wagmi'
import { arbitrumGoerli } from 'wagmi/chains'
import { poolABI } from "@/abis/poolABI"
import { marketManagerABI } from "@/abis/marketManagerABI"
import { SIDE_LONG, SIDE_SHORT, to0xxPriceX96, toPriceX96 } from "./zContractHelper"
import { useQuery, gql } from '@apollo/client';
import { rewardFarmABI } from "@/abis/rewardFarmABI"
import { TokenConfigType } from "./zTokenConfig"
import { useEffect, useState } from "react"
import { parseEther, parseUnits } from "viem"

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

export const useUserUsdxBalanceMock = () => {

    return { data: { formatted: 288839488, symbol: 'USDX' }, isError: false, isLoading: false }
}
type TokenParamsType = {
    tokenName: string
    market: string
}

type PositionResultType = {
    margin: bigint
    size: bigint
    entryPriceX96: bigint
    entryFundingRateGrowthX96: bigint
}

export const useUserPositionListSingle = (token: TokenConfigType) => {
    const { data: walletClient } = useWalletClient({
        chainId: arbitrumGoerli.id,
    })
    // const tokensList: TokenParamsType[] = registerMarketInfos.map((market) => ({ tokenName: market.name, poolAddress: market.market }))

    const contractBaseInfo = {
        address: marketManagerAddress,
        abi: marketManagerABI,
        functionName: 'positions',
    }
    const contractParams: any[] = []
    const tokenBaseInfo: any[] = []

    contractParams.push({
        ...contractBaseInfo,
        args: [token.market, walletClient?.account.address, SIDE_LONG]
    });
    tokenBaseInfo.push({ tokenName: token.name, tokenSide: 'Long', tokenPool: token.market })

    contractParams.push({
        ...contractBaseInfo,
        args: [token.market, walletClient?.account.address, SIDE_SHORT]
    });

    tokenBaseInfo.push({ tokenName: token.name, tokenSide: 'Short', tokenPool: token.market })

    const { data, isLoading, isError } = useContractReads({
        contracts: contractParams,
        watch: true
    })

    const positionDatas: any[] = []
    if (data && data.length > 0) {
        data.forEach((item, index) => {
            if (item.status === 'success') {
                const result = item.result as PositionResultType
                let positionEntity = {
                    ...result,
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


export const useUserPositionListSingleMock = (token: TokenConfigType) => {
    const isLoading = false
    const isError = false

    const positionDataList = [
        {
            entryFundingRateGrowthX96: -746228068096002263n,
            entryPriceX96: 286620795549099141171n,
            margin: 3978125813n,
            size: 39896407220749903983n,
            tokenName: "ETH",
            tokenPool: "0x07ad9146a879361330C46611b642F0e3BFeB7492",
            tokenSide: "Long"
        },
        {
            entryFundingRateGrowthX96: 22915940078083779n,
            entryPriceX96: 267449397662878833366n,
            margin: 5006213525n,
            size: 39896407220749903983n,
            tokenName: "ETH",
            tokenPool: "0x07ad9146a879361330C46611b642F0e3BFeB7492",
            tokenSide: "Short"
        }
    ]

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


    return {
        isLoading: loading,
        isError: error,
        orderBookList: combineData
    }
}


type PositionCreatedType = {
    blockNumber: string;
    blockTimestamp: string;
    index: string;
    id: string;
    acceptableTradePriceX96: string;
    account: string;
    marginDelta: string;
    market: string;
    side: number;
    sizeDelta: string;
    __typename: string;
}

type PositionStateType = {
    blockNumber: string;
    blockTimestamp: string;
    index: string;
    id: string;
}

type PositionHistoryFinalType = PositionCreatedType & {
    status: string;
}


type QueryPositionHistoryType = {
    increasePositionCreateds: PositionCreatedType[]
    increasePositionExecuteds: PositionStateType[]
    increasePositionCancelleds: PositionStateType[]
    decreasePositionCreateds: PositionCreatedType[]
    decreasePositionExecuteds: PositionStateType[]
    decreasePositionCancelleds: PositionStateType[]
}

export const useUserPositionHistoryList = (market: any) => {
    const { data: walletClient } = useWalletClient({
        chainId: arbitrumGoerli.id,
    })
    const GET_DATA = gql`
    query GetPositionHistory($account: String!, $market: String!) {
        increasePositionCreateds(
            where:{account: $account, market : $market}
            orderBy: blockTimestamp
            orderDirection: desc
        ) {
            account
            blockNumber
            index
            marginDelta
            market
            side
            sizeDelta
            acceptableTradePriceX96
        }
        increasePositionExecuteds(orderBy: blockTimestamp, orderDirection: desc) {
            blockTimestamp
            blockNumber
            id
            index
        }
        increasePositionCancelleds(orderBy: blockTimestamp, orderDirection: desc) {
            blockTimestamp
            blockNumber
            id
            index
        }
        decreasePositionCreateds(
            where:{account: $account, market : $market}
            orderBy: blockTimestamp
            orderDirection: desc
        ) {
            account
            blockNumber
            index
            marginDelta
            market
            side
            sizeDelta
            acceptableTradePriceX96
        }
        decreasePositionExecuteds(orderBy: blockTimestamp, orderDirection: desc) {
            blockTimestamp
            blockNumber
            id
            index
        }
        decreasePositionCancelleds(orderBy: blockTimestamp, orderDirection: desc) {
            blockTimestamp
            blockNumber
            id
            index
        }
    }
  `;
    const { loading, error, data } = useQuery<QueryPositionHistoryType>(GET_DATA, {
        skip: !walletClient?.account.address,
        variables: { account: walletClient?.account.address, market: market },
        pollInterval: 5000,
    });

    const [finalArray, setFinalArray] = useState<PositionHistoryFinalType[]>([]);

    useEffect(() => {
        if (data) {
            const inAllArray = data.increasePositionCreateds;
            const deAllArray = data.decreasePositionCreateds;
            const inExecuteArray = data.increasePositionExecuteds;
            const deExecuteArray = data.decreasePositionExecuteds;
            const inCancelArray = data.increasePositionCancelleds;
            const deCancelArray = data.decreasePositionCancelleds;

            if (inAllArray && deAllArray && inExecuteArray && deExecuteArray && inCancelArray && deCancelArray) {
                const combinedCreatesArray: PositionCreatedType[] = [...inAllArray, ...deAllArray];
                combinedCreatesArray.sort((a, b) => parseInt(b.index) - parseInt(a.index));
                const combinedExecutesArray: PositionStateType[] = [...inExecuteArray, ...deExecuteArray];
                const combinedCancelsArray: PositionStateType[] = [...inCancelArray, ...deCancelArray];

                const combinedCreatesArrayWithStatus: PositionHistoryFinalType[] = combinedCreatesArray.map(item => ({
                    ...item,
                    status: 'pending'
                }));

                addStatusToCombinedArray(combinedCreatesArrayWithStatus, combinedExecutesArray, 'EXECUTED');
                addStatusToCombinedArray(combinedCreatesArrayWithStatus, combinedCancelsArray, 'CANCELLED');
                setFinalArray(combinedCreatesArrayWithStatus);
            }
        }
    }, [data]);

    return {
        isLoading: loading,
        isError: error,
        positionHistoryList: finalArray,
    };
}



export const useUserPositionHistoryListMock = (market: any) => {
    const positionHistoryList: any[] = [
        {
            side: 1,
            sizeDelta: parseEther("0.31233"),
            marginDelta: parseUnits("1000", 6),
            acceptableTradePriceX96: to0xxPriceX96("3212"),
            status: "EXECUTED"
        },
        {
            side: 2,
            sizeDelta: parseEther("2.77733"),
            marginDelta: parseUnits("2398", 6),
            acceptableTradePriceX96: toPriceX96("2332.33", 18, 6),
            status: "CANCAL"
        },
        {
            side: 1,
            sizeDelta: parseEther("0.31233"),
            marginDelta: parseUnits("7261", 6),
            acceptableTradePriceX96: to0xxPriceX96("4565.231"),
            status: "EXECUTED"
        },

    ]
    return {
        isLoading: false,
        isError: false,
        positionHistoryList
    };
}


function addStatusToCombinedArray(combinedArray: PositionHistoryFinalType[], stateArray: PositionStateType[], status: string) {
    stateArray.forEach(state => {
        const matchingIndex = combinedArray.findIndex(item => item.index === state.index);
        if (matchingIndex !== -1) {
            combinedArray[matchingIndex].status = status;
        }
    });
}