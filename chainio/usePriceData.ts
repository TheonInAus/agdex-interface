import { useState, useEffect } from 'react';
import axios from 'axios';
import { parseAptosDecimal } from './fetchData';
import { enqueueSnackbar } from 'notistack';
import { PriceFeederInfo, PriceFeederList } from './helper';

export const contractAddress: string = "0x7e783b349d3e89cf5931af376ebeadbfab855b3fa239b7ada8f5a92fbea6b387";

export type PriceResultType = {
    tokenName: string
    price: any
}

export const usePriceData = () => {
    const [priceDatas, setPriceDatas] = useState<PriceResultType[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const prices = await Promise.all(PriceFeederList.map(item => fetchPricedata(item)));
            setPriceDatas(prices)
        };
        fetchData();
        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { priceDatas, error };
};


export const fetchPricedata = async (priceData: PriceFeederInfo): Promise<PriceResultType> => {
    try {
        const response = await axios.get(`https://hermes-beta.pyth.network/v2/updates/price/latest?ids%5B%5D=${priceData.feederAddress}`);
        return { price: parseAptosDecimal(Number(response.data.parsed[0].price.price), 8), tokenName: priceData.tokenName };
    } catch (error) {
        console.error(`Error fetching VAA for priceId ${priceData.tokenName}:`, error);
        throw error;
    }
}