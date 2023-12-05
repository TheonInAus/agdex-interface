import { PoolDataType } from './../pages/pools/PoolRow';
import { registerPoolsInfos } from "./zAddressHelper"

import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { arbitrumGoerli } from "viem/chains"
import { useBalance, useWalletClient } from "wagmi"


export const useAllLiquidityPools = () => {
  const poolsData: PoolDataType[] = registerPoolsInfos.map((pool, index) => ({
    name: pool.name,
    maxAPR: "80.58%",
    volume: "8,924,967.61",
    fees: "4,057.64",
    liquidity: "204,070,998.48",
    myLiquidity: "0.00",
    tokenAddress: pool.token,
    poolAddress: pool.pool,
    index: index
  }))

  return { poolsConfig: poolsData }
}



type LiquidityPositionOpened = {
  __typename: string;
  account: string;
  entryUnrealizedLoss: string;
  id: string;
  liquidity: string | unknown;
  margin: string | unknown;
  positionID: string;
  realizedProfitGrowthX64: string | unknown;
};

type QueryResult = {
  liquidityPositionOpeneds: LiquidityPositionOpened[];
};


export const useLiqPoolsForAccount = (poolAddress: any) => {
  const { data: walletClient } = useWalletClient({
    chainId: arbitrumGoerli.id,
  })
  const GET_DATA = gql`
    query GetLiquidityPositions($address: String!) {
      liquidityPositionOpeneds(
        where: {account: $address}
        orderBy: positionID
        orderDirection: desc
        first: 2
      ) {
        account
        entryUnrealizedLoss
        id
        liquidity
        margin
        positionID
        realizedProfitGrowthX64
      }
    }
  `;

  const { loading, error, data } = useQuery<QueryResult>(GET_DATA, {
    skip: !walletClient?.account.address,
    variables: { address: walletClient?.account.address },
  });

  console.log('result graph result => ', data)
  return {
    liqPoolsLoading: loading,
    liqPoolsError: error,
    liqPoolsData: data
  }
}


