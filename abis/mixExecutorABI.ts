export const minExecutorABI = [
    {
        "inputs": [
            {
                "internalType": "contract ILiquidator",
                "name": "_liquidator",
                "type": "address"
            },
            {
                "internalType": "contract IPositionRouter",
                "name": "_router",
                "type": "address"
            },
            {
                "internalType": "contract IPriceFeed",
                "name": "_priceFeed",
                "type": "address"
            },
            {
                "internalType": "contract IOrderBook",
                "name": "_orderBook",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "ExecutionError",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "Forbidden",
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
                "internalType": "contract IPool",
                "name": "_pool",
                "type": "address"
            }
        ],
        "name": "collectProtocolFee",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint128",
                "name": "_endIndex",
                "type": "uint128"
            }
        ],
        "name": "executeAdjustLiquidityPositionMargins",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint128",
                "name": "_endIndex",
                "type": "uint128"
            }
        ],
        "name": "executeCloseLiquidityPositions",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_orderIndex",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "_requireSuccess",
                "type": "bool"
            }
        ],
        "name": "executeDecreaseOrder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint128",
                "name": "_endIndex",
                "type": "uint128"
            }
        ],
        "name": "executeDecreasePositions",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint128",
                "name": "_endIndex",
                "type": "uint128"
            }
        ],
        "name": "executeDecreaseRiskBufferFundPositions",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_orderIndex",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "_requireSuccess",
                "type": "bool"
            }
        ],
        "name": "executeIncreaseOrder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint128",
                "name": "_endIndex",
                "type": "uint128"
            }
        ],
        "name": "executeIncreasePositions",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint128",
                "name": "_endIndex",
                "type": "uint128"
            }
        ],
        "name": "executeIncreaseRiskBufferFundPositions",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint128",
                "name": "_endIndex",
                "type": "uint128"
            }
        ],
        "name": "executeOpenLiquidityPositions",
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
        "name": "executors",
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
                "components": [
                    {
                        "internalType": "contract IERC20",
                        "name": "token",
                        "type": "address"
                    },
                    {
                        "internalType": "uint160",
                        "name": "priceX96",
                        "type": "uint160"
                    }
                ],
                "internalType": "struct IPriceFeed.TokenPrice[]",
                "name": "_tokenPrices",
                "type": "tuple[]"
            },
            {
                "internalType": "uint64",
                "name": "_timestamp",
                "type": "uint64"
            }
        ],
        "name": "fastSetPriceX96s",
        "outputs": [],
        "stateMutability": "nonpayable",
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
                "internalType": "bool",
                "name": "_requireSuccess",
                "type": "bool"
            }
        ],
        "name": "liquidateLiquidityPosition",
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
                "internalType": "bool",
                "name": "_requireSuccess",
                "type": "bool"
            }
        ],
        "name": "liquidatePosition",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "liquidator",
        "outputs": [
            {
                "internalType": "contract ILiquidator",
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
                "internalType": "bytes[]",
                "name": "data",
                "type": "bytes[]"
            }
        ],
        "name": "multicall",
        "outputs": [
            {
                "internalType": "bytes[]",
                "name": "results",
                "type": "bytes[]"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "orderBook",
        "outputs": [
            {
                "internalType": "contract IOrderBook",
                "name": "",
                "type": "address"
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
        "inputs": [],
        "name": "positionRouter",
        "outputs": [
            {
                "internalType": "contract IPositionRouter",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "priceFeed",
        "outputs": [
            {
                "internalType": "contract IPriceFeed",
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
            }
        ],
        "name": "sampleAndAdjustFundingRate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bool",
                "name": "_cancelOrderIfFailedStatus",
                "type": "bool"
            }
        ],
        "name": "setCancelOrderIfFailedStatus",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_executor",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "_active",
                "type": "bool"
            }
        ],
        "name": "setExecutor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "_receiver",
                "type": "address"
            }
        ],
        "name": "setFeeReceiver",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint160[]",
                        "name": "priceX96s",
                        "type": "uint160[]"
                    },
                    {
                        "internalType": "uint64",
                        "name": "timestamp",
                        "type": "uint64"
                    }
                ],
                "internalType": "struct MixedExecutor.SetPricesParams",
                "name": "_params",
                "type": "tuple"
            }
        ],
        "name": "setPriceX96s",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20[]",
                "name": "_tokens",
                "type": "address[]"
            }
        ],
        "name": "setTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "slot",
        "outputs": [
            {
                "internalType": "address payable",
                "name": "feeReceiver",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "cancelOrderIfFailedStatus",
                "type": "bool"
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
        "name": "tokens",
        "outputs": [
            {
                "internalType": "contract IERC20",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]