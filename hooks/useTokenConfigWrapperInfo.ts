import { tokenConfig, TokenConfigType } from "./zTokenConfig"


export const useTokenConfigWrapperInfo = (): TokenConfigType[] => {
    const tokens = [
        {
            name: 'BTC',
            label: "BTC/USDX",
            volume: "19.10k BTC",
            price: "$30,054.17",
            percentageChange: "-0.21%",
        },
        {
            name: 'ETH',
            label: "ETH/USDX",
            volume: "617.10k ETH",
            price: "$2,054.17",
            percentageChange: "+0.11%",
        },
        {
            name: 'ORDI',
            label: "ORDI/USDX",
            volume: "20.10k ORDI",
            price: "$57.17",
            percentageChange: "-0.16%",
        },
    ]
    return tokenConfig.map(config => {
        const tokenData = tokens.find(token => token.name === config.name);
        return {
            ...config,
            volume: tokenData?.volume || '',
            price: tokenData?.price || '',
            percentageChange: tokenData?.percentageChange || ''
        };
    });
}
