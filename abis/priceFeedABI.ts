export const priceFeedABI = [
    {
        "inputs": [
            {
                "internalType": "contract IChainLinkAggregator",
                "name": "_stableTokenPriceFeed",
                "type": "address"
            },
            {
                "internalType": "uint32",
                "name": "_stableTokenPriceFeedHeartBeatDuration",
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
        "inputs": [
            {
                "internalType": "uint256",
                "name": "sequencerUptime",
                "type": "uint256"
            }
        ],
        "name": "GracePeriodNotOver",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "int256",
                "name": "referencePrice",
                "type": "int256"
            }
        ],
        "name": "InvalidReferencePrice",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "int256",
                "name": "stableTokenPrice",
                "type": "int256"
            }
        ],
        "name": "InvalidStableTokenPrice",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint64",
                "name": "timestamp",
                "type": "uint64"
            }
        ],
        "name": "InvalidUpdateTimestamp",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NotInitialized",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ReferencePriceFeedNotSet",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "elapsed",
                "type": "uint256"
            }
        ],
        "name": "ReferencePriceTimeout",
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
        "name": "SequencerDown",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "elapsed",
                "type": "uint256"
            }
        ],
        "name": "StableTokenPriceTimeout",
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
                "indexed": false,
                "internalType": "contract IERC20",
                "name": "token",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint160",
                "name": "priceX96",
                "type": "uint160"
            },
            {
                "indexed": false,
                "internalType": "uint160",
                "name": "refPriceX96",
                "type": "uint160"
            },
            {
                "indexed": false,
                "internalType": "uint64",
                "name": "cumulativeDelta",
                "type": "uint64"
            },
            {
                "indexed": false,
                "internalType": "uint64",
                "name": "cumulativeRefDelta",
                "type": "uint64"
            }
        ],
        "name": "MaxCumulativeDeltaDiffExceeded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "contract IERC20",
                "name": "token",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint160",
                "name": "priceX96",
                "type": "uint160"
            },
            {
                "indexed": false,
                "internalType": "uint160",
                "name": "minPriceX96",
                "type": "uint160"
            },
            {
                "indexed": false,
                "internalType": "uint160",
                "name": "maxPriceX96",
                "type": "uint160"
            }
        ],
        "name": "PriceUpdated",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "DELTA_PRECISION",
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
        "inputs": [],
        "name": "GRACE_PERIOD_TIME",
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
        "inputs": [],
        "name": "TOKEN_DECIMALS",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "USD_DECIMALS",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
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
            }
        ],
        "name": "calculatePriceX96s",
        "outputs": [
            {
                "internalType": "uint160[]",
                "name": "minPriceX96s",
                "type": "uint160[]"
            },
            {
                "internalType": "uint160[]",
                "name": "maxPriceX96s",
                "type": "uint160[]"
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
                "internalType": "contract IERC20",
                "name": "_token",
                "type": "address"
            }
        ],
        "name": "getMaxPriceX96",
        "outputs": [
            {
                "internalType": "uint160",
                "name": "priceX96",
                "type": "uint160"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_token",
                "type": "address"
            }
        ],
        "name": "getMinPriceX96",
        "outputs": [
            {
                "internalType": "uint160",
                "name": "priceX96",
                "type": "uint160"
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
            }
        ],
        "name": "isUpdater",
        "outputs": [
            {
                "internalType": "bool",
                "name": "active",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "",
                "type": "address"
            }
        ],
        "name": "latestPrices",
        "outputs": [
            {
                "internalType": "uint64",
                "name": "updateTimestamp",
                "type": "uint64"
            },
            {
                "internalType": "uint160",
                "name": "maxPriceX96",
                "type": "uint160"
            },
            {
                "internalType": "uint160",
                "name": "minPriceX96",
                "type": "uint160"
            },
            {
                "internalType": "uint64",
                "name": "updateBlockTimestamp",
                "type": "uint64"
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
        "name": "sequencerUptimeFeed",
        "outputs": [
            {
                "internalType": "contract IChainLinkAggregator",
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
                "internalType": "uint32",
                "name": "_cumulativeRoundDuration",
                "type": "uint32"
            }
        ],
        "name": "setCumulativeRoundDuration",
        "outputs": [],
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
                "internalType": "uint64",
                "name": "_maxCumulativeDeltaDiff",
                "type": "uint64"
            }
        ],
        "name": "setMaxCumulativeDeltaDiffs",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "_maxDeviationRatio",
                "type": "uint32"
            }
        ],
        "name": "setMaxDeviationRatio",
        "outputs": [],
        "stateMutability": "nonpayable",
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
        "name": "setPriceX96s",
        "outputs": [],
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
                "internalType": "uint32",
                "name": "_duration",
                "type": "uint32"
            }
        ],
        "name": "setRefHeartbeatDuration",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "_refPriceExtraSample",
                "type": "uint32"
            }
        ],
        "name": "setRefPriceExtraSample",
        "outputs": [],
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
                "internalType": "contract IChainLinkAggregator",
                "name": "_priceFeed",
                "type": "address"
            }
        ],
        "name": "setRefPriceFeed",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IChainLinkAggregator",
                "name": "_sequencerUptimeFeed",
                "type": "address"
            }
        ],
        "name": "setSequencerUptimeFeed",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IChainLinkAggregator",
                "name": "_stableTokenPriceFeed",
                "type": "address"
            },
            {
                "internalType": "uint32",
                "name": "_stableTokenPriceFeedHeartBeatDuration",
                "type": "uint32"
            }
        ],
        "name": "setStableTokenPriceFeed",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "_updateTxTimeout",
                "type": "uint32"
            }
        ],
        "name": "setUpdateTxTimeout",
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
                "internalType": "bool",
                "name": "_active",
                "type": "bool"
            }
        ],
        "name": "setUpdater",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "slot",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "maxDeviationRatio",
                "type": "uint32"
            },
            {
                "internalType": "uint32",
                "name": "cumulativeRoundDuration",
                "type": "uint32"
            },
            {
                "internalType": "uint32",
                "name": "refPriceExtraSample",
                "type": "uint32"
            },
            {
                "internalType": "uint32",
                "name": "updateTxTimeout",
                "type": "uint32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "stableTokenPriceFeed",
        "outputs": [
            {
                "internalType": "contract IChainLinkAggregator",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "stableTokenPriceFeedHeartBeatDuration",
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
                "internalType": "contract IERC20",
                "name": "",
                "type": "address"
            }
        ],
        "name": "tokenConfigs",
        "outputs": [
            {
                "internalType": "contract IChainLinkAggregator",
                "name": "refPriceFeed",
                "type": "address"
            },
            {
                "internalType": "uint32",
                "name": "refHeartbeatDuration",
                "type": "uint32"
            },
            {
                "internalType": "uint64",
                "name": "maxCumulativeDeltaDiff",
                "type": "uint64"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]