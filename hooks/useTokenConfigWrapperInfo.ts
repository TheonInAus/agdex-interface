import { useEffect, useMemo, useState } from "react";
import { useTokenMarketAndIndexPrice } from "./usePrice";
import { tokenConfig, TokenConfigType } from "./zTokenConfig"


export const useTokenConfigWrapperInfo = (): TokenConfigType[] => {
    const [config, setConfig] = useState<TokenConfigType[]>(tokenConfig);
    // const { data } = useTokenMarketAndIndexPrice();
    // const { data } = useTokenMarketAndIndexPrice();

    // useEffect(() => {
    //     if (data && data.indexPrices && data.markPrices) {
    //         setConfig(prevConfig => prevConfig.map(token => {
    //             const indexPrice = (data.indexPrices?.[token.name] as any).indexPrice;
    //             const percentageChange = (data.indexPrices?.[token.name] as any).price24hPcnt;
    //             return {
    //                 ...token,
    //                 price: indexPrice ? `${indexPrice}` : token.price,
    //                 percentageChange: percentageChange,
    //             };
    //         }));
    //     }
    // }, [data]);

    return config;
};