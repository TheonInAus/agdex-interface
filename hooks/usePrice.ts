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
    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${tokenIds}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`);
                const result = await res.json();
                setPrice(result?.[0]?.current_price || 0);
                setChange24h(result?.[0]?.price_change_percentage_24h || 0);
            } catch (error) {
                console.error("Failed to fetch the market price:", error);
            }
        };
        fetchPrice();

        const interval = setInterval(fetchPrice, 30000);

        return () => clearInterval(interval);
    }, [tokenIds]);

    return { price, change24h }
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

    console.log('check data => ', data)

    return { premiumRateX96, isLoading, isError }
}