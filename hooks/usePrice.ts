import { poolABI } from '@/abis/poolABI';
import { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import { x96Price2Readable } from './zContractHelper';

export const useBtcMarketPrice = () => {
    const [price, setPrice] = useState(0);
    const [change24h, setChange24h] = useState(0)
    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_vol=trur&include_24hr_change=true&include_last_updated_at=true`);
                const result = await res.json();
                setPrice(result?.bitcoin.usd);
                setChange24h(result?.bitcoin.usd_24h_change);
            } catch (error) {
                console.error("Failed to fetch the market price:", error);
            }
        };
        fetchPrice();

        const interval = setInterval(fetchPrice, 10000);

        return () => clearInterval(interval);
    }, []);

    return { price, change24h }
}


export const useGetPoolPriceState = (poolAddress: any) => {

    const { data, isLoading, isError } = useContractRead({
        address: poolAddress,
        abi: poolABI,
        functionName: 'priceState'
    })

    console.log('check priceState => ', data)

    const [premiumRateX96, setPremiumRateX96] = useState(0)
    useEffect(() => {
        if (data) {
            const dataArray = data as any[]
            if (dataArray.length > 0) {
                const tempPremiumRate = dataArray[1]
                const convert = x96Price2Readable(tempPremiumRate)
                setPremiumRateX96(Number(convert))
            }
        }

    }, [data])


    return { premiumRateX96, isLoading, isError }
}