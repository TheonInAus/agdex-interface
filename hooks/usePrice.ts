import { poolABI } from '@/abis/poolABI';
import { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import { backFromX96, x96Price2Readable } from './zContractHelper';
import { TokenConfigType } from './zTokenConfig';

export const useTokenMarketAndIndexPrice = (interval = 10000) => {
    const [data, setData] = useState({ indexPrices: null, markPrices: null, change24h: 24 });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    // const baseUrl = 'http://ec2-47-128-252-143.ap-southeast-1.compute.amazonaws.com:3002/price/prices'
    const baseUrl = 'http://localhost:3002/price/prices'

    const url = ''

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(baseUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const json = await response.json();
                setData({
                    indexPrices: json.indexPrices.data,
                    markPrices: json.markPrices.data,
                    change24h: 24
                });
                setError(null);
            } catch (error: any) {
                setError(error?.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, interval);

        return () => clearInterval(intervalId);
    }, [url, interval]);

    return { data, error, loading };
}


export const useGetPoolPriceState = (poolAddress: any) => {

    const { data, isLoading, isError } = useContractRead({
        address: poolAddress,
        abi: poolABI,
        functionName: 'priceState'
    })

    const [premiumRateX96, setPremiumRateX96] = useState(0)
    useEffect(() => {
        if (data) {
            const dataArray = data as any[]
            if (dataArray.length > 0) {
                const tempPremiumRate = dataArray[1]
                const convert = backFromX96(tempPremiumRate.toString())
                setPremiumRateX96(Number(convert))
            }
        }

    }, [data])


    return { premiumRateX96, isLoading, isError }
}