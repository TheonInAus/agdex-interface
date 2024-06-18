import { useState, useEffect } from 'react';
import axios from 'axios';
import { parseAptosDecimal } from './fetchData';
import { enqueueSnackbar } from 'notistack';

export const usePriceData = (feederAddress: string, decimal: number) => {
    const [priceData, setPriceData] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://hermes-beta.pyth.network/v2/updates/price/latest?ids%5B%5D=${feederAddress}`
                );
                const price = response.data.parsed[0].price.price;
                console.log("🚀 ~ fetchData ~ price:", price)
                setPriceData(parseAptosDecimal(Number(price), decimal));
            } catch (error) {
                console.error('Error fetching price data:', error);
                setError('Error fetching price data');
                enqueueSnackbar(error as string, { variant: 'error' })
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 5000);

        return () => clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [feederAddress]);

    return { priceData, error };
};