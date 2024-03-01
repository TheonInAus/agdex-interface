import contractAddress from "./contractAddress.json"

export const positionRouterAddress = contractAddress.deployments.PositionRouter as `0x${string}`
export const routerAddress = contractAddress.deployments.Router as `0x${string}`

export const ethMarketAddress = contractAddress.deployments.registerMarkets[0].market as `0x${string}`
export const btcMarketAddress = contractAddress.deployments.registerMarkets[1].market as `0x${string}`
export const arbMarketAddress = contractAddress.deployments.registerMarkets[2].market as `0x${string}`
export const linkMarketAddress = contractAddress.deployments.registerMarkets[2].market as `0x${string}`

export const registerMarketInfos = contractAddress.deployments.registerMarkets


export const mixExecutorAddress = contractAddress.deployments.MixedExecutor as `0x${string}`//V1 

export const priceFeedAddress = contractAddress.deployments.PriceFeed as `0x${string}`
export const usdxAddress = contractAddress.usd as `0x${string}`
export const marketManagerAddress = contractAddress.deployments.MarketManager as `0x${string}`
export const orderBookAddress = contractAddress.deployments.OrderBook as `0x${string}`

export const rewardFarmAddress = contractAddress.deployments.FarmRewardDistributor as `0x${string}`