export const routerABI = [
    {
        "inputs": [
            {
                "internalType": "contract IEFC",
                "name": "_EFC",
                "type": "address"
            },
            {
                "internalType": "contract IRewardFarm",
                "name": "_rewardFarm",
                "type": "address"
            },
            {
                "internalType": "contract IFeeDistributor",
                "name": "_feeDistributor",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "CallerUnauthorized",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "Forbidden",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "liquidator",
                "type": "address"
            }
        ],
        "name": "LiquidatorAlreadyRegistered",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "expectedOwner",
                "type": "address"
            }
        ],
        "name": "OwnerMismatch",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "plugin",
                "type": "address"
            }
        ],
        "name": "PluginAlreadyApproved",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "plugin",
                "type": "address"
            }
        ],
        "name": "PluginAlreadyRegistered",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "plugin",
                "type": "address"
            }
        ],
        "name": "PluginNotApproved",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "plugin",
                "type": "address"
            }
        ],
        "name": "PluginNotRegistered",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            }
        ],
        "name": "SafeERC20FailedOperation",
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
                "indexed": true,
                "internalType": "address",
                "name": "liquidator",
                "type": "address"
            }
        ],
        "name": "LiquidatorRegistered",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "plugin",
                "type": "address"
            }
        ],
        "name": "PluginApproved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "plugin",
                "type": "address"
            }
        ],
        "name": "PluginRegistered",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "plugin",
                "type": "address"
            }
        ],
        "name": "PluginRevoked",
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
        "name": "acceptGov",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_plugin",
                "type": "address"
            }
        ],
        "name": "approvePlugin",
        "outputs": [],
        "stateMutability": "nonpayable",
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
        "inputs": [],
        "name": "feeDistributor",
        "outputs": [
            {
                "internalType": "contract IFeeDistributor",
                "name": "",
                "type": "address"
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
                "internalType": "address",
                "name": "_account",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_plugin",
                "type": "address"
            }
        ],
        "name": "isPluginApproved",
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
                "name": "_liquidator",
                "type": "address"
            }
        ],
        "name": "isRegisteredLiquidator",
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
        "inputs": [
            {
                "internalType": "contract IPool",
                "name": "_pool",
                "type": "address"
            },
            {
                "internalType": "uint96",
                "name": "_positionID",
                "type": "uint96"
            },
            {
                "internalType": "int128",
                "name": "_marginDelta",
                "type": "int128"
            },
            {
                "internalType": "address",
                "name": "_receiver",
                "type": "address"
            }
        ],
        "name": "pluginAdjustLiquidityPositionMargin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IPool",
                "name": "_pool",
                "type": "address"
            },
            {
                "internalType": "uint96",
                "name": "_positionID",
                "type": "uint96"
            },
            {
                "internalType": "address",
                "name": "_receiver",
                "type": "address"
            }
        ],
        "name": "pluginCloseLiquidityPosition",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IPool",
                "name": "_pool",
                "type": "address"
            },
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
                "name": "_sizeDelta",
                "type": "uint128"
            },
            {
                "internalType": "address",
                "name": "_receiver",
                "type": "address"
            }
        ],
        "name": "pluginClosePositionByLiquidator",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_receiver",
                "type": "address"
            },
            {
                "internalType": "uint256[]",
                "name": "_tokenIDs",
                "type": "uint256[]"
            }
        ],
        "name": "pluginCollectArchitectRewardBatch",
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
                "name": "_owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_receiver",
                "type": "address"
            }
        ],
        "name": "pluginCollectFarmLiquidityRewardBatch",
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
        "name": "pluginCollectFarmReferralRewardBatch",
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
                "name": "_owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_receiver",
                "type": "address"
            }
        ],
        "name": "pluginCollectFarmRiskBufferFundRewardBatch",
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
                "internalType": "contract IPool",
                "name": "_pool",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_referralToken",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_receiver",
                "type": "address"
            }
        ],
        "name": "pluginCollectReferralFee",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_receiver",
                "type": "address"
            },
            {
                "internalType": "uint256[]",
                "name": "_ids",
                "type": "uint256[]"
            }
        ],
        "name": "pluginCollectStakingRewardBatch",
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
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_receiver",
                "type": "address"
            },
            {
                "internalType": "uint256[]",
                "name": "_ids",
                "type": "uint256[]"
            }
        ],
        "name": "pluginCollectV3PosStakingRewardBatch",
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
                "internalType": "contract IPool",
                "name": "_pool",
                "type": "address"
            },
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
                "name": "_marginDelta",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "_sizeDelta",
                "type": "uint128"
            },
            {
                "internalType": "address",
                "name": "_receiver",
                "type": "address"
            }
        ],
        "name": "pluginDecreasePosition",
        "outputs": [
            {
                "internalType": "uint160",
                "name": "tradePriceX96",
                "type": "uint160"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IPool",
                "name": "_pool",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_account",
                "type": "address"
            },
            {
                "internalType": "uint128",
                "name": "_liquidityDelta",
                "type": "uint128"
            },
            {
                "internalType": "address",
                "name": "_receiver",
                "type": "address"
            }
        ],
        "name": "pluginDecreaseRiskBufferFundPosition",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IPool",
                "name": "_pool",
                "type": "address"
            },
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
                "name": "_marginDelta",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "_sizeDelta",
                "type": "uint128"
            }
        ],
        "name": "pluginIncreasePosition",
        "outputs": [
            {
                "internalType": "uint160",
                "name": "tradePriceX96",
                "type": "uint160"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IPool",
                "name": "_pool",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_account",
                "type": "address"
            },
            {
                "internalType": "uint128",
                "name": "_liquidityDelta",
                "type": "uint128"
            }
        ],
        "name": "pluginIncreaseRiskBufferFundPosition",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IPool",
                "name": "_pool",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_account",
                "type": "address"
            },
            {
                "internalType": "uint128",
                "name": "_margin",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "_liquidity",
                "type": "uint128"
            }
        ],
        "name": "pluginOpenLiquidityPosition",
        "outputs": [
            {
                "internalType": "uint96",
                "name": "positionID",
                "type": "uint96"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_token",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "pluginTransfer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC721",
                "name": "_token",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "pluginTransferNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_liquidator",
                "type": "address"
            }
        ],
        "name": "registerLiquidator",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_plugin",
                "type": "address"
            }
        ],
        "name": "registerPlugin",
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
        "name": "registeredPlugins",
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
                "name": "_plugin",
                "type": "address"
            }
        ],
        "name": "revokePlugin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "rewardFarm",
        "outputs": [
            {
                "internalType": "contract IRewardFarm",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]