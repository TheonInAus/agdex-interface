import { aptos } from "@/pages/_app";
import { Key } from "lucide-react";

export const getAccountInfo = async (accountAddress: string) => {
    const fund = await aptos.getAccountInfo({ accountAddress });
    return { data: fund }
}

export const getAccountTransactions = async (accountAddress: string) => {
    const modules = await aptos.getAccountTransactions({ accountAddress });
    return { data: modules }
}

export const getAccountOwnedTokens = async (accountAddress: string) => {
    const tokens = await aptos.getAccountOwnedTokens({ accountAddress });
    return { tokens }
}

type Coin = { coin: { value: string } }


export const parseAptosDecimal = (value: number, decimals: number = 8) => {
    return value / Math.pow(10, decimals);
}


export const getAllUserPositions = async (ownerAddress: string, tableHandle: string) => {
    try {
        const response = await aptos.getTableItemsData({
            options: {
                where: {
                    table_handle: { _eq: tableHandle },
                    decoded_key: { _contains: { owner: ownerAddress } },
                },
                orderBy: [{ transaction_version: 'desc' }],
            },
        });

        console.log("Fetched positions:", response);
        return response;
    } catch (error) {
        console.error("Error fetching positions:", error);
        throw error;
    }
}

export const getAllUserOpenPositionOrder = async (ownerAddress: string, tableHandle: string) => {
    try {
        const response = await aptos.getTableItemsData({
            options: {
                where: {
                    table_handle: { _eq: tableHandle },
                    decoded_key: { _contains: { owner: ownerAddress } },
                },
                orderBy: [{ transaction_version: 'desc' }],
            },
        });

        console.log("Fetched open positions order:", response);
        return response;
    } catch (error) {
        console.error("Error fetching open positions order:", error);
        throw error;
    }
}

export const getAllUserDecreasePositionOrder = async (ownerAddress: string, tableHandle: string) => {
    try {
        const response = await aptos.getTableItemsData({
            options: {
                where: {
                    table_handle: { _eq: tableHandle },
                    decoded_key: { _contains: { owner: ownerAddress } },
                },
                orderBy: [{ transaction_version: 'desc' }],
            },
        });

        console.log("Fetched decrease positions order:", response);
        return response;
    } catch (error) {
        console.error("Error fetching decrease positions order:", error);
        throw error;
    }
}


export const getAptosCoinBalance = async (accountAddress: string, COIN_STORE: `${string}::${string}::${string}`) => {
    const result: any = await aptos.getAccountResource<Coin>({
        accountAddress: accountAddress,
        resourceType: COIN_STORE,
    })
    return { result }
}