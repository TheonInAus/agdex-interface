import contractAddress from "./contractAddress.json"

export const positionRouterAddress = contractAddress.deployments.PositionRouter as `0x${string}`
export const routerAddress = contractAddress.deployments.Router as `0x${string}`

export const btcPoolAddress = contractAddress.deployments.registerPools[0].pool as `0x${string}`
export const ethPoolAddress = contractAddress.deployments.registerPools[1].pool as `0x${string}`
export const ordiPoolAddress = contractAddress.deployments.registerPools[2].pool as `0x${string}`

export const btcTokenAddress = contractAddress.deployments.registerPools[0].token as `0x${string}`
export const ethTokenAddress = contractAddress.deployments.registerPools[1].token as `0x${string}`
export const ordiTokenAddress = contractAddress.deployments.registerPools[2].token as `0x${string}`

export const registerPoolsInfos = contractAddress.deployments.registerPools
export const mixExecutorAddress = contractAddress.deployments.MixedExecutor as `0x${string}`//V1 

export const priceFeedAddress = contractAddress.deployments.PriceFeed as `0x${string}`
export const usdxAddress = contractAddress.usd as `0x${string}`

export const orderBookAddress = contractAddress.deployments.OrderBook as `0x${string}`

export const rewardFarmAddress = contractAddress.deployments.RewardFarm as `0x${string}`