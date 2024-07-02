export const rewardFarmABI = [
    {
        "inputs": [
            {
                "internalType": "contract IPoolFactory",
                "name": "_poolFactory",
                "type": "address"
            },
            {
                "internalType": "contract Router",
                "name": "_router",
                "type": "address"
            },
            {
                "internalType": "contract IEFC",
                "name": "_EFC",
                "type": "address"
            },
            {
                "internalType": "contract IERC20",
                "name": "_EQU",
                "type": "address"
            },
            {
                "internalType": "uint64",
                "name": "_mintTime",
                "type": "uint64"
            },
            {
                "internalType": "uint32",
                "name": "_referralMultiplier",
                "type": "uint32"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "Forbidden",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidArgument",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "caller",
                "type": "address"
            }
        ],
        "name": "InvalidCaller",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "rate",
                "type": "uint256"
            }
        ],
        "name": "InvalidMiningRate",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint64",
                "name": "mintTime",
                "type": "uint64"
            }
        ],
        "name": "InvalidMintTime",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "contract IPool",
                "name": "pool",
                "type": "address"
            }
        ],
        "name": "InvalidPool",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidRewardCap",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ReentrancyGuardReentrantCall",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint8",
                "name": "bits",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "SafeCastOverflowedUintDowncast",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TooManyPools",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousGov",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newGov",
                "type": "address"
            }
        ],
        "name": "ChangeGovStarted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "liquidityRate",
                        "type": "uint32"
                    },
                    {
                        "internalType": "uint32",
                        "name": "riskBufferFundLiquidityRate",
                        "type": "uint32"
                    },
                    {
                        "internalType": "uint32",
                        "name": "referralTokenRate",
                        "type": "uint32"
                    },
                    {
                        "internalType": "uint32",
                        "name": "referralParentTokenRate",
                        "type": "uint32"
                    }
                ],
                "indexed": false,
                "internalType": "struct IRewardFarm.Config",
                "name": "newConfig",
                "type": "tuple"
            }
        ],
        "name": "ConfigChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousGov",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newGov",
                "type": "address"
            }
        ],
        "name": "GovChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "contract IPool[]",
                "name": "pools",
                "type": "address[]"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "rewardDebt",
                "type": "uint256"
            }
        ],
        "name": "LiquidityRewardCollected",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "contract IPool",
                "name": "pool",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "rewardDebtDelta",
                "type": "uint256"
            }
        ],
        "name": "LiquidityRewardDebtChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "contract IPool",
                "name": "pool",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "rewardDelta",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint128",
                "name": "rewardGrowthAfterX64",
                "type": "uint128"
            }
        ],
        "name": "PoolLiquidityRewardGrowthIncreased",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "contract IPool",
                "name": "pool",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "rewardDelta",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint128",
                "name": "rewardGrowthAfterX64",
                "type": "uint128"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "positionRewardDelta",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint128",
                "name": "positionRewardGrowthAfterX64",
                "type": "uint128"
            }
        ],
        "name": "PoolReferralParentTokenRewardGrowthIncreased",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "contract IPool",
                "name": "pool",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "rewardDelta",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint128",
                "name": "rewardGrowthAfterX64",
                "type": "uint128"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "positionRewardDelta",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint128",
                "name": "positionRewardGrowthAfterX64",
                "type": "uint128"
            }
        ],
        "name": "PoolReferralTokenRewardGrowthIncreased",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "contract IPool",
                "name": "pool",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint160",
                "name": "rewardPerSecond",
                "type": "uint160"
            }
        ],
        "name": "PoolRewardUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "contract IPool",
                "name": "pool",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "rewardDelta",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint128",
                "name": "rewardGrowthAfterX64",
                "type": "uint128"
            }
        ],
        "name": "PoolRiskBufferFundRewardGrowthIncreased",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "contract IPool",
                "name": "pool",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "referralToken",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "rewardDebtDelta",
                "type": "uint256"
            }
        ],
        "name": "ReferralLiquidityRewardDebtChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "contract IPool",
                "name": "pool",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "referralToken",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "rewardDebtDelta",
                "type": "uint256"
            }
        ],
        "name": "ReferralPositionRewardDebtChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "contract IPool[]",
                "name": "pools",
                "type": "address[]"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "referralTokens",
                "type": "uint256[]"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "rewardDebt",
                "type": "uint256"
            }
        ],
        "name": "ReferralRewardCollected",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint128",
                "name": "rewardCapAfter",
                "type": "uint128"
            }
        ],
        "name": "RewardCapChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "contract IPool[]",
                "name": "pools",
                "type": "address[]"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "rewardDebt",
                "type": "uint256"
            }
        ],
        "name": "RiskBufferFundRewardCollected",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "contract IPool",
                "name": "pool",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "rewardDebtDelta",
                "type": "uint256"
            }
        ],
        "name": "RiskBufferFundRewardDebtChanged",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "EFC",
        "outputs": [
            {
                "internalType": "contract IEFC",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "EQU",
        "outputs": [
            {
                "internalType": "contract IERC20",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "acceptGov",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "alreadyBoundReferralTokens",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_newGov",
                "type": "address"
            }
        ],
        "name": "changeGov",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IPool[]",
                "name": "_pools",
                "type": "address[]"
            },
            {
                "internalType": "address",
                "name": "_account",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_receiver",
                "type": "address"
            }
        ],
        "name": "collectLiquidityRewardBatch",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "rewardDebt",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IPool[]",
                "name": "_pools",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "_referralTokens",
                "type": "uint256[]"
            },
            {
                "internalType": "address",
                "name": "_receiver",
                "type": "address"
            }
        ],
        "name": "collectReferralRewardBatch",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "rewardDebt",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IPool[]",
                "name": "_pools",
                "type": "address[]"
            },
            {
                "internalType": "address",
                "name": "_account",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_receiver",
                "type": "address"
            }
        ],
        "name": "collectRiskBufferFundRewardBatch",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "rewardDebt",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "config",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "liquidityRate",
                "type": "uint32"
            },
            {
                "internalType": "uint32",
                "name": "riskBufferFundLiquidityRate",
                "type": "uint32"
            },
            {
                "internalType": "uint32",
                "name": "referralTokenRate",
                "type": "uint32"
            },
            {
                "internalType": "uint32",
                "name": "referralParentTokenRate",
                "type": "uint32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "gov",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "indexPools",
        "outputs": [
            {
                "internalType": "contract IPool",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "liquidityRewards",
        "outputs": [
            {
                "internalType": "Bitmap",
                "name": "bitmap",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "rewardDebt",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_account",
                "type": "address"
            },
            {
                "internalType": "contract IPool",
                "name": "_pool",
                "type": "address"
            }
        ],
        "name": "liquidityRewardsWithPool",
        "outputs": [
            {
                "internalType": "uint128",
                "name": "liquidity",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "rewardGrowthX64",
                "type": "uint128"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "mintTime",
        "outputs": [
            {
                "internalType": "uint64",
                "name": "",
                "type": "uint64"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "mintedReward",
        "outputs": [
            {
                "internalType": "uint128",
                "name": "",
                "type": "uint128"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_referee",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_oldReferralToken",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_oldReferralParentToken",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_newReferralToken",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_newReferralParentToken",
                "type": "uint256"
            }
        ],
        "name": "onChangeReferralToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_account",
                "type": "address"
            },
            {
                "internalType": "int256",
                "name": "_liquidityDelta",
                "type": "int256"
            }
        ],
        "name": "onLiquidityPositionChanged",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_account",
                "type": "address"
            },
            {
                "internalType": "Side",
                "name": "_side",
                "type": "uint8"
            },
            {
                "internalType": "uint128",
                "name": "_sizeAfter",
                "type": "uint128"
            },
            {
                "internalType": "uint160",
                "name": "_entryPriceAfterX96",
                "type": "uint160"
            }
        ],
        "name": "onPositionChanged",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_account",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_liquidityAfter",
                "type": "uint256"
            }
        ],
        "name": "onRiskBufferFundPositionChanged",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pendingGov",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "poolFactory",
        "outputs": [
            {
                "internalType": "contract IPoolFactory",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "poolIndexNext",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IPool",
                "name": "",
                "type": "address"
            }
        ],
        "name": "poolIndexes",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IPool",
                "name": "",
                "type": "address"
            }
        ],
        "name": "poolRewards",
        "outputs": [
            {
                "internalType": "uint128",
                "name": "liquidity",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "liquidityRewardGrowthX64",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "referralLiquidity",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "referralTokenRewardGrowthX64",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "referralParentTokenRewardGrowthX64",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "referralPosition",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "referralTokenPositionRewardGrowthX64",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "referralParentTokenPositionRewardGrowthX64",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "riskBufferFundLiquidity",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "riskBufferFundRewardGrowthX64",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "rewardPerSecond",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "lastMintTime",
                "type": "uint128"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "positions",
        "outputs": [
            {
                "internalType": "Bitmap",
                "name": "bitmap",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_account",
                "type": "address"
            },
            {
                "internalType": "contract IPool",
                "name": "_pool",
                "type": "address"
            }
        ],
        "name": "positionsWithPool",
        "outputs": [
            {
                "internalType": "uint128",
                "name": "long",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "short",
                "type": "uint128"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "referralMultiplier",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "referralRewards",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "rewardDebt",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_referralToken",
                "type": "uint256"
            },
            {
                "internalType": "contract IPool",
                "name": "_pool",
                "type": "address"
            }
        ],
        "name": "referralRewardsWithPool",
        "outputs": [
            {
                "internalType": "uint128",
                "name": "liquidity",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "rewardGrowthX64",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "position",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "positionRewardGrowthX64",
                "type": "uint128"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "rewardCap",
        "outputs": [
            {
                "internalType": "uint128",
                "name": "",
                "type": "uint128"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "riskBufferFundRewards",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "rewardDebt",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_account",
                "type": "address"
            },
            {
                "internalType": "contract IPool",
                "name": "_pool",
                "type": "address"
            }
        ],
        "name": "riskBufferFundRewardsWithPool",
        "outputs": [
            {
                "internalType": "uint128",
                "name": "liquidity",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "rewardGrowthX64",
                "type": "uint128"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "router",
        "outputs": [
            {
                "internalType": "contract Router",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "liquidityRate",
                        "type": "uint32"
                    },
                    {
                        "internalType": "uint32",
                        "name": "riskBufferFundLiquidityRate",
                        "type": "uint32"
                    },
                    {
                        "internalType": "uint32",
                        "name": "referralTokenRate",
                        "type": "uint32"
                    },
                    {
                        "internalType": "uint32",
                        "name": "referralParentTokenRate",
                        "type": "uint32"
                    }
                ],
                "internalType": "struct IRewardFarm.Config",
                "name": "_config",
                "type": "tuple"
            }
        ],
        "name": "setConfig",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IPool[]",
                "name": "_pools",
                "type": "address[]"
            },
            {
                "internalType": "uint128[]",
                "name": "_rewardsPerSecond",
                "type": "uint128[]"
            }
        ],
        "name": "setPoolsReward",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint128",
                "name": "_rewardCap",
                "type": "uint128"
            }
        ],
        "name": "setRewardCap",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]