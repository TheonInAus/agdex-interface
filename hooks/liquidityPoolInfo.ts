import { PoolDataType } from './../pages/pools/PoolRow';
import { registerMarketInfos } from "./zAddressHelper"

import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { arbitrumGoerli } from "viem/chains"
import { useBalance, useWalletClient } from "wagmi"
import { formatEther } from 'viem';


export const useAllLiquidityPools = () => {
  const poolsData: PoolDataType[] = registerMarketInfos.map((market, index) => ({
    name: market.name,
    maxAPR: "80.58%",
    volume: "8,924,967.61",
    fees: "4,057.64",
    liquidity: "204,070,998.48",
    myLiquidity: "0.00",
    marketAddress: market.market,
    index: index
  }))

  return { poolsConfig: poolsData }
}

type LiquidityPositionIncreased = {
  __typename: string;
  account: string;
  blockNumber: string;
  blockTimestamp: string;
  id: string;
  liquidityAfter: string;
  marginAfter: string;
  marginDelta: string;
  market: string;
  realizedPnLDelta: string;
};

type QueryResult = {
  liquidityPositionIncreaseds: LiquidityPositionIncreased[];
};

export const useLiqPoolsForAccount = (market: any) => {
  const { data: walletClient } = useWalletClient({
    chainId: arbitrumGoerli.id,
  })
  const GET_DATA = gql`
    query marketLiqQuery($account: String!, $market: String!) {
      liquidityPositionIncreaseds(
        where: {account: $account, market: $market}
        orderBy: id
        orderDirection: desc
      ) {
        account
        blockNumber
        blockTimestamp
        id
        liquidityAfter
        marginAfter
        marginDelta
        market
        realizedPnLDelta
      }
    }
  `;

  const { loading, error, data } = useQuery<QueryResult>(GET_DATA, {
    skip: !walletClient?.account.address,
    variables: { account: walletClient?.account.address, market: market },
    pollInterval: 5000
  });

  return {
    liqPoolsLoading: loading,
    liqPoolsError: error,
    liqPoolsData: data
  }
}



export const useLiqPoolsForAccountMock = (market: any) => {

  const data = {
    liquidityPositionIncreaseds: [
      { liquidityAfter: 8293090000, realizedPnLDelta: 5994, marginAfter: 7382000000 }
    ],

  }

  return {
    liqPoolsLoading: false,
    liqPoolsError: false,
    liqPoolsData: data
  }
}


