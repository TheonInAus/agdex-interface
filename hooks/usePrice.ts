import { poolABI } from '@/abis/poolABI';
import { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import { backFromX96, x96Price2Readable } from './zContractHelper';
import { TokenConfigType } from './zTokenConfig';

export const useTokenMarketPrice = (token: TokenConfigType) => {
    const [price, setPrice] = useState(0);
    const [change24h, setChange24h] = useState(0)
    let tokenIds = 'BTC'
    switch (token.name) {
        case 'BTC':
            tokenIds = 'bitcoin'
            break
        case 'ETH':
            tokenIds = 'ethereum'
            break
        case 'ORDI':
            tokenIds = 'chainlink'
            break
        default:
            tokenIds = 'bitcoin'
            break
    }
    const { data } = useTokenMarketAndIndexPrice()
    // useEffect(() => {
    //     const fetchPrice = async () => {
    //         try {
    //             const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${tokenIds}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`);
    //             const result = await res.json();
    //             setPrice(result?.[0]?.current_price || 2000);
    //             setChange24h(result?.[0]?.price_change_percentage_24h || 20);
    //         } catch (error) {
    //             console.error("Failed to fetch the market price:", error);
    //         }
    //     };
    //     fetchPrice();

    //     const interval = setInterval(fetchPrice, 30000);

    //     return () => clearInterval(interval);
    // }, [tokenIds]);
    return { price: data?.indexPrices?.[token.name], change24h: 24 }
}

export const useTokenMarketAndIndexPrice = (interval = 10000) => {
    const [data, setData] = useState({ indexPrices: null, markPrices: null, change24h: 24 });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const url = 'http://localhost:3002/price/prices'

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
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