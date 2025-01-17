export const orderBookABI = [
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_usd",
                "type": "address"
            },
            {
                "internalType": "contract Router",
                "name": "_router",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_minExecutionFee",
                "type": "uint256"
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
                "name": "available",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "required",
                "type": "uint256"
            }
        ],
        "name": "InsufficientExecutionFee",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint160",
                "name": "marketPriceX96",
                "type": "uint160"
            },
            {
                "internalType": "uint160",
                "name": "triggerMarketPriceX96",
                "type": "uint160"
            }
        ],
        "name": "InvalidMarketPriceToTrigger",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "Side",
                "name": "side",
                "type": "uint8"
            }
        ],
        "name": "InvalidSide",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint160",
                "name": "tradePriceX96",
                "type": "uint160"
            },
            {
                "internalType": "uint160",
                "name": "acceptableTradePriceX96",
                "type": "uint160"
            }
        ],
        "name": "InvalidTradePrice",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "orderIndex",
                "type": "uint256"
            }
        ],
        "name": "OrderNotExists",
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
                "internalType": "uint256",
                "name": "orderIndex",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "feeReceiver",
                "type": "address"
            }
        ],
        "name": "DecreaseOrderCancelled",
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
                "internalType": "contract IPool",
                "name": "pool",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "Side",
                "name": "side",
                "type": "uint8"
            },
            {
                "indexed": false,
                "internalType": "uint128",
                "name": "marginDelta",
                "type": "uint128"
            },
            {
                "indexed": false,
                "internalType": "uint128",
                "name": "sizeDelta",
                "type": "uint128"
            },
            {
                "indexed": false,
                "internalType": "uint160",
                "name": "triggerMarketPriceX96",
                "type": "uint160"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "triggerAbove",
                "type": "bool"
            },
            {
                "indexed": false,
                "internalType": "uint160",
                "name": "acceptableTradePriceX96",
                "type": "uint160"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "executionFee",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "orderIndex",
                "type": "uint256"
            }
        ],
        "name": "DecreaseOrderCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "orderIndex",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint160",
                "name": "marketPriceX96",
                "type": "uint160"
            },
            {
                "indexed": false,
                "internalType": "address payable",
                "name": "feeReceiver",
                "type": "address"
            }
        ],
        "name": "DecreaseOrderExecuted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "orderIndex",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint160",
                "name": "triggerMarketPriceX96",
                "type": "uint160"
            },
            {
                "indexed": false,
                "internalType": "uint160",
                "name": "acceptableTradePriceX96",
                "type": "uint160"
            }
        ],
        "name": "DecreaseOrderUpdated",
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
                "internalType": "uint256",
                "name": "orderIndex",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address payable",
                "name": "feeReceiver",
                "type": "address"
            }
        ],
        "name": "IncreaseOrderCancelled",
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
                "internalType": "contract IPool",
                "name": "pool",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "Side",
                "name": "side",
                "type": "uint8"
            },
            {
                "indexed": false,
                "internalType": "uint128",
                "name": "marginDelta",
                "type": "uint128"
            },
            {
                "indexed": false,
                "internalType": "uint128",
                "name": "sizeDelta",
                "type": "uint128"
            },
            {
                "indexed": false,
                "internalType": "uint160",
                "name": "triggerMarketPriceX96",
                "type": "uint160"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "triggerAbove",
                "type": "bool"
            },
            {
                "indexed": false,
                "internalType": "uint160",
                "name": "acceptableTradePriceX96",
                "type": "uint160"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "executionFee",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "orderIndex",
                "type": "uint256"
            }
        ],
        "name": "IncreaseOrderCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "orderIndex",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint160",
                "name": "marketPriceX96",
                "type": "uint160"
            },
            {
                "indexed": false,
                "internalType": "address payable",
                "name": "feeReceiver",
                "type": "address"
            }
        ],
        "name": "IncreaseOrderExecuted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "orderIndex",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint160",
                "name": "triggerMarketPriceX96",
                "type": "uint160"
            },
            {
                "indexed": false,
                "internalType": "uint160",
                "name": "acceptableTradePriceX96",
                "type": "uint160"
            }
        ],
        "name": "IncreaseOrderUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "minExecutionFee",
                "type": "uint256"
            }
        ],
        "name": "MinExecutionFeeUpdated",
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
                "indexed": false,
                "internalType": "bool",
                "name": "active",
                "type": "bool"
            }
        ],
        "name": "OrderExecutorUpdated",
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
                "internalType": "uint256",
                "name": "_orderIndex",
                "type": "uint256"
            },
            {
                "internalType": "address payable",
                "name": "_feeReceiver",
                "type": "address"
            }
        ],
        "name": "cancelDecreaseOrder",
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
                "internalType": "address payable",
                "name": "_feeReceiver",
                "type": "address"
            }
        ],
        "name": "cancelIncreaseOrder",
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
                "internalType": "uint160",
                "name": "_triggerMarketPriceX96",
                "type": "uint160"
            },
            {
                "internalType": "bool",
                "name": "_triggerAbove",
                "type": "bool"
            },
            {
                "internalType": "uint160",
                "name": "_acceptableTradePriceX96",
                "type": "uint160"
            },
            {
                "internalType": "address",
                "name": "_receiver",
                "type": "address"
            }
        ],
        "name": "createDecreaseOrder",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "stateMutability": "payable",
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
                "internalType": "uint160",
                "name": "_triggerMarketPriceX96",
                "type": "uint160"
            },
            {
                "internalType": "bool",
                "name": "_triggerAbove",
                "type": "bool"
            },
            {
                "internalType": "uint160",
                "name": "_acceptableTradePriceX96",
                "type": "uint160"
            }
        ],
        "name": "createIncreaseOrder",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "stateMutability": "payable",
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
                "internalType": "Side",
                "name": "_side",
                "type": "uint8"
            },
            {
                "internalType": "uint128[2]",
                "name": "_marginDeltas",
                "type": "uint128[2]"
            },
            {
                "internalType": "uint128[2]",
                "name": "_sizeDeltas",
                "type": "uint128[2]"
            },
            {
                "internalType": "uint160[2]",
                "name": "_triggerMarketPriceX96s",
                "type": "uint160[2]"
            },
            {
                "internalType": "uint160[2]",
                "name": "_acceptableTradePriceX96s",
                "type": "uint160[2]"
            },
            {
                "internalType": "address",
                "name": "_receiver",
                "type": "address"
            }
        ],
        "name": "createTakeProfitAndStopLossOrders",
        "outputs": [],
        "stateMutability": "payable",
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
        "name": "decreaseOrders",
        "outputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "contract IPool",
                "name": "pool",
                "type": "address"
            },
            {
                "internalType": "Side",
                "name": "side",
                "type": "uint8"
            },
            {
                "internalType": "uint128",
                "name": "marginDelta",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "sizeDelta",
                "type": "uint128"
            },
            {
                "internalType": "uint160",
                "name": "triggerMarketPriceX96",
                "type": "uint160"
            },
            {
                "internalType": "bool",
                "name": "triggerAbove",
                "type": "bool"
            },
            {
                "internalType": "uint160",
                "name": "acceptableTradePriceX96",
                "type": "uint160"
            },
            {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "executionFee",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decreaseOrdersIndexNext",
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
                "internalType": "uint256",
                "name": "_orderIndex",
                "type": "uint256"
            },
            {
                "internalType": "address payable",
                "name": "_feeReceiver",
                "type": "address"
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
                "internalType": "uint256",
                "name": "_orderIndex",
                "type": "uint256"
            },
            {
                "internalType": "address payable",
                "name": "_feeReceiver",
                "type": "address"
            }
        ],
        "name": "executeIncreaseOrder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "executionGasLimit",
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
        "name": "increaseOrders",
        "outputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "contract IPool",
                "name": "pool",
                "type": "address"
            },
            {
                "internalType": "Side",
                "name": "side",
                "type": "uint8"
            },
            {
                "internalType": "uint128",
                "name": "marginDelta",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "sizeDelta",
                "type": "uint128"
            },
            {
                "internalType": "uint160",
                "name": "triggerMarketPriceX96",
                "type": "uint160"
            },
            {
                "internalType": "bool",
                "name": "triggerAbove",
                "type": "bool"
            },
            {
                "internalType": "uint160",
                "name": "acceptableTradePriceX96",
                "type": "uint160"
            },
            {
                "internalType": "uint256",
                "name": "executionFee",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "increaseOrdersIndexNext",
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
        "name": "minExecutionFee",
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
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "orderExecutors",
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
                "internalType": "uint256",
                "name": "_orderIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint160",
                "name": "_triggerMarketPriceX96",
                "type": "uint160"
            },
            {
                "internalType": "uint160",
                "name": "_acceptableTradePriceX96",
                "type": "uint160"
            }
        ],
        "name": "updateDecreaseOrder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_executionGasLimit",
                "type": "uint256"
            }
        ],
        "name": "updateExecutionGasLimit",
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
                "internalType": "uint160",
                "name": "_triggerMarketPriceX96",
                "type": "uint160"
            },
            {
                "internalType": "uint160",
                "name": "_acceptableTradePriceX96",
                "type": "uint160"
            }
        ],
        "name": "updateIncreaseOrder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_minExecutionFee",
                "type": "uint256"
            }
        ],
        "name": "updateMinExecutionFee",
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
        "name": "updateOrderExecutor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "usd",
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