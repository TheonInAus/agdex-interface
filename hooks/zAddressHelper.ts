import contractAddress from "./contractAddress.json"

export const positionRouterAddress = contractAddress.deployments.PositionRouter as `0x${string}`
export const routerAddress = contractAddress.deployments.Router as `0x${string}`

export const ethPoolAddress = contractAddress.deployments.registerPools[0].pool as `0x${string}`
export const btcPoolAddress = contractAddress.deployments.registerPools[1].pool as `0x${string}`
export const arbPoolAddress = contractAddress.deployments.registerPools[2].pool as `0x${string}`
export const linkPoolAddress = contractAddress.deployments.registerPools[3].pool as `0x${string}`

export const usdxAddress = contractAddress.usd as `0x${string}`