import { aptos, moduleAddress } from "@/pages/_app";

export const commonTableHandle = "0xc086ec2f7155735fdb646b3a33a4ee2706d8fc348372e217b7e1994390d7fd75"

export const getPositionResources = (coinType: `${string}::${string}::${string}`, index: `${string}::${string}::${string}`, direction: string) => {
    return `${moduleAddress}::market::PositionRecord<${coinType}, ${index}, ${moduleAddress}::pool::${direction}>` as `${string}::${string}::${string}`
}

export const getOrderRecordResources = (coinType: `${string}::${string}::${string}`, index: `${string}::${string}::${string}`, direction: string, fee: `${string}::${string}::${string}`) => {
    return `${moduleAddress}::market::OrderRecord<${coinType},${index},${moduleAddress}::pool::${direction},${fee}>` as `${string}::${string}::${string}`
}

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

export const calLeverage = (amount: number, collateral: number) => {
    return (amount / collateral).toFixed(6)
}
export const calEntryPrice = (size: number, amount: number) => {
    return (size / amount).toFixed(6)
}
export const calEstLiqPrice = (size: number, amount: number, collateral: number, direction: string) => {
    const leverage = amount / collateral
    const entryPrice = size / amount
    let liqPrice = 0
    if (direction === 'LONG') {
        liqPrice = entryPrice * (1 - 1 / leverage)
    } else {
        liqPrice = entryPrice * (1 + 1 / leverage)
    }
    return liqPrice.toFixed(10)
}
export const calUnPnL = (size: number, amount: number, collateral: number, tokenPrice: number, direction: string) => {
    const entryPrice = size / amount
    const leverage = amount / collateral
    return (tokenPrice - entryPrice) * leverage
}
export const getTableHandle = async (address: string, resourceType: `${string}::${string}::${string}`) => {
    const result = await aptos.getAccountResource({
        accountAddress: address,
        resourceType: resourceType
    })
    return { result }
}

export const getAllUserPositions = async (ownerAddress: string, tableHandle: string) => {
    try {
        const ledgerInfo = await aptos.getLedgerInfo()
        const lastVersion = ledgerInfo.ledger_version
        const response = await aptos.getTableItemsData({
            minimumLedgerVersion: Number(lastVersion),
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

export const getLastPostionData = async (tableHandle: string) => {
    try {
        const ledgerInfo = await aptos.getLedgerInfo()
        const lastVersion = ledgerInfo.ledger_version
        const response = await aptos.getTableItemsData({
            minimumLedgerVersion: Number(lastVersion),
            options: {
                where: {
                    table_handle: { _eq: tableHandle },
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

export const getAllUserOrderRecords = async (ownerAddress: string, tableHandle: string) => {
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

        console.log("Fetched positions order:", response);
        return response;
    } catch (error) {
        console.error("Error fetching positions order:", error);
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

