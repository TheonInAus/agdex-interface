import { useState, useEffect } from 'react';

function convertData(rawData: any[], type: number) {
    return rawData.map(item => {
        const timestamp = parseInt(item.period, 10) * type * 60;
        let time;

        if (type < 1440) {
            time = timestamp;
        } else {
            const date = new Date(timestamp * 1000);
            time = {
                year: date.getUTCFullYear(),
                month: date.getUTCMonth() + 1,
                day: date.getUTCDate(),
            };
        }
        return {
            time: time,
            open: parseFloat(item.open),
            high: parseFloat(item.high),
            low: parseFloat(item.low),
            close: parseFloat(item.close),
        };
    });
}

export const useGetKlineData = (symbol: string, type = 1, interval = 10000) => {
    const [resultData, setResultData] = useState<any>(null);
    const [klineData, setKlinedata] = useState<any[]>([])
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const baseUrl = 'http://localhost:3002/price/klineData';
    const url = `${baseUrl}?symbol=${encodeURIComponent(symbol)}&type=${type}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                if (result.status === 'success') {
                    setResultData(result.data);
                    setError(null);
                }

            } catch (error: any) {
                setError(error?.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, interval);

        return () => clearInterval(intervalId);
    }, [symbol, type, interval, url]);

    useEffect(() => {
        if (resultData && resultData.length > 0) {
            const formattedData = convertData(resultData, type)
            setKlinedata(formattedData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resultData])

    return { klineData, error, loading };
};

export const useGetKlineDataMock = (symbol: string, type = 1, interval = 10000) => {
    const [resultData, setResultData] = useState<any>(null);
    const [klineData, setKlinedata] = useState<any[]>([])
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const baseUrl = 'http://localhost:3002/price/klineData';
    const url = `${baseUrl}?symbol=${encodeURIComponent(symbol)}&type=${type}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                console.log("~ check kline ~ result:", result)
                if (result.status === 'success') {
                    setResultData(result.data);
                    setError(null);
                }

            } catch (error: any) {
                setError(error?.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, interval);

        return () => clearInterval(intervalId);
    }, [symbol, type, interval, url]);

    useEffect(() => {
        if (resultData && resultData.length > 0) {
            const formattedData = convertData(resultData, type)
            setKlinedata(formattedData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resultData])

    return { klineData, error, loading };
};
