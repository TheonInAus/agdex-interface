export const positionRouterABI = [
    {
        inputs: [
            {
                internalType: "contract IERC20",
                name: "_usd",
                type: "address",
            },
            {
                internalType: "contract Router",
                name: "_router",
                type: "address",
            },
            {
                internalType: "contract IMarketManager",
                name: "_marketManager",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_minExecutionFee",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "target",
                type: "address",
            },
        ],
        name: "AddressEmptyCode",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "AddressInsufficientBalance",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "expiredAt",
                type: "uint256",
            },
        ],
        name: "Expired",
        type: "error",
    },
    {
        inputs: [],
        name: "FailedInnerCall",
        type: "error",
    },
    {
        inputs: [],
        name: "Forbidden",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "available",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "required",
                type: "uint256",
            },
        ],
        name: "InsufficientExecutionFee",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "available",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "required",
                type: "uint256",
            },
        ],
        name: "InvalidExecutionFee",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint128",
                name: "margin",
                type: "uint128",
            },
            {
                internalType: "uint128",
                name: "acceptableMinMargin",
                type: "uint128",
            },
        ],
        name: "InvalidMargin",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "Side",
                name: "side",
                type: "uint8",
            },
        ],
        name: "InvalidSide",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint160",
                name: "tradePriceX96",
                type: "uint160",
            },
            {
                internalType: "uint160",
                name: "acceptableTradePriceX96",
                type: "uint160",
            },
        ],
        name: "InvalidTradePrice",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "contract IMarketDescriptor",
                name: "market",
                type: "address",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "LiquidityNotFound",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "contract IMarketDescriptor",
                name: "market",
                type: "address",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "Side",
                name: "side",
                type: "uint8",
            },
        ],
        name: "PositionNotFound",
        type: "error",
    },
    {
        inputs: [],
        name: "ReentrancyGuardReentrantCall",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint8",
                name: "bits",
                type: "uint8",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "SafeCastOverflowedUintDowncast",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
        ],
        name: "SafeERC20FailedOperation",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "earliest",
                type: "uint256",
            },
        ],
        name: "TooEarly",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousGov",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newGov",
                type: "address",
            },
        ],
        name: "ChangeGovStarted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint128",
                name: "index",
                type: "uint128",
            },
            {
                indexed: false,
                internalType: "address payable",
                name: "executionFeeReceiver",
                type: "address",
            },
        ],
        name: "DecreaseLiquidityPositionCancelled",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "contract IMarketDescriptor",
                name: "market",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint128",
                name: "marginDelta",
                type: "uint128",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "liquidityDelta",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "acceptableMinMargin",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "receiver",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "executionFee",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "uint128",
                name: "index",
                type: "uint128",
            },
        ],
        name: "DecreaseLiquidityPositionCreated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint128",
                name: "index",
                type: "uint128",
            },
            {
                indexed: false,
                internalType: "address payable",
                name: "executionFeeReceiver",
                type: "address",
            },
        ],
        name: "DecreaseLiquidityPositionExecuted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint128",
                name: "index",
                type: "uint128",
            },
            {
                indexed: false,
                internalType: "address payable",
                name: "executionFeeReceiver",
                type: "address",
            },
        ],
        name: "DecreasePositionCancelled",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "contract IMarketDescriptor",
                name: "market",
                type: "address",
            },
            {
                indexed: false,
                internalType: "Side",
                name: "side",
                type: "uint8",
            },
            {
                indexed: false,
                internalType: "uint128",
                name: "marginDelta",
                type: "uint128",
            },
            {
                indexed: false,
                internalType: "uint128",
                name: "sizeDelta",
                type: "uint128",
            },
            {
                indexed: false,
                internalType: "uint160",
                name: "acceptableTradePriceX96",
                type: "uint160",
            },
            {
                indexed: false,
                internalType: "address",
                name: "receiver",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "executionFee",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "uint128",
                name: "index",
                type: "uint128",
            },
        ],
        name: "DecreasePositionCreated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint128",
                name: "index",
                type: "uint128",
            },
            {
                indexed: false,
                internalType: "address payable",
                name: "executionFeeReceiver",
                type: "address",
            },
        ],
        name: "DecreasePositionExecuted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint32",
                name: "minBlockDelayExecutor",
                type: "uint32",
            },
            {
                indexed: false,
                internalType: "uint32",
                name: "minTimeDelayPublic",
                type: "uint32",
            },
            {
                indexed: false,
                internalType: "uint32",
                name: "maxTimeDelay",
                type: "uint32",
            },
        ],
        name: "DelayValuesUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "enum IPositionRouter.RequestType",
                name: "reqType",
                type: "uint8",
            },
            {
                indexed: true,
                internalType: "uint128",
                name: "index",
                type: "uint128",
            },
            {
                indexed: false,
                internalType: "bytes4",
                name: "shortenedReason",
                type: "bytes4",
            },
        ],
        name: "ExecuteFailed",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousGov",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newGov",
                type: "address",
            },
        ],
        name: "GovChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint128",
                name: "index",
                type: "uint128",
            },
            {
                indexed: false,
                internalType: "address payable",
                name: "executionFeeReceiver",
                type: "address",
            },
        ],
        name: "IncreaseLiquidityPositionCancelled",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "contract IMarketDescriptor",
                name: "market",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint128",
                name: "marginDelta",
                type: "uint128",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "liquidityDelta",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "acceptableMinMargin",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "executionFee",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "uint128",
                name: "index",
                type: "uint128",
            },
        ],
        name: "IncreaseLiquidityPositionCreated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint128",
                name: "index",
                type: "uint128",
            },
            {
                indexed: false,
                internalType: "address payable",
                name: "executionFeeReceiver",
                type: "address",
            },
        ],
        name: "IncreaseLiquidityPositionExecuted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint128",
                name: "index",
                type: "uint128",
            },
            {
                indexed: false,
                internalType: "address payable",
                name: "executionFeeReceiver",
                type: "address",
            },
        ],
        name: "IncreasePositionCancelled",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "contract IMarketDescriptor",
                name: "market",
                type: "address",
            },
            {
                indexed: false,
                internalType: "Side",
                name: "side",
                type: "uint8",
            },
            {
                indexed: false,
                internalType: "uint128",
                name: "marginDelta",
                type: "uint128",
            },
            {
                indexed: false,
                internalType: "uint128",
                name: "sizeDelta",
                type: "uint128",
            },
            {
                indexed: false,
                internalType: "uint160",
                name: "acceptableTradePriceX96",
                type: "uint160",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "executionFee",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "uint128",
                name: "index",
                type: "uint128",
            },
        ],
        name: "IncreasePositionCreated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint128",
                name: "index",
                type: "uint128",
            },
            {
                indexed: false,
                internalType: "address payable",
                name: "executionFeeReceiver",
                type: "address",
            },
        ],
        name: "IncreasePositionExecuted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "minExecutionFee",
                type: "uint256",
            },
        ],
        name: "MinExecutionFeeUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "active",
                type: "bool",
            },
        ],
        name: "PositionExecutorUpdated",
        type: "event",
    },
    {
        inputs: [],
        name: "acceptGov",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint128",
                name: "_index",
                type: "uint128",
            },
            {
                internalType: "address payable",
                name: "_executionFeeReceiver",
                type: "address",
            },
        ],
        name: "cancelDecreaseLiquidityPosition",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint128",
                name: "_index",
                type: "uint128",
            },
            {
                internalType: "address payable",
                name: "_executionFeeReceiver",
                type: "address",
            },
        ],
        name: "cancelDecreasePosition",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint128",
                name: "_index",
                type: "uint128",
            },
            {
                internalType: "address payable",
                name: "_executionFeeReceiver",
                type: "address",
            },
        ],
        name: "cancelIncreaseLiquidityPosition",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint128",
                name: "_index",
                type: "uint128",
            },
            {
                internalType: "address payable",
                name: "_executionFeeReceiver",
                type: "address",
            },
        ],
        name: "cancelIncreasePosition",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_newGov",
                type: "address",
            },
        ],
        name: "changeGov",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "contract IMarketDescriptor[]",
                name: "markets",
                type: "address[]",
            },
            {
                internalType: "address",
                name: "receiver",
                type: "address",
            },
        ],
        name: "createCloseLiquidityPositionsBatch",
        outputs: [
            {
                internalType: "uint128[]",
                name: "indices",
                type: "uint128[]",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "contract IMarketDescriptor",
                        name: "market",
                        type: "address",
                    },
                    {
                        internalType: "Side",
                        name: "side",
                        type: "uint8",
                    },
                ],
                internalType: "struct IPositionRouter.ClosePositionParameter[]",
                name: "parameters",
                type: "tuple[]",
            },
            {
                internalType: "address",
                name: "receiver",
                type: "address",
            },
        ],
        name: "createClosePositionsBatch",
        outputs: [
            {
                internalType: "uint128[]",
                name: "indices",
                type: "uint128[]",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "contract IMarketDescriptor",
                name: "_market",
                type: "address",
            },
            {
                internalType: "uint128",
                name: "_marginDelta",
                type: "uint128",
            },
            {
                internalType: "uint128",
                name: "_liquidityDelta",
                type: "uint128",
            },
            {
                internalType: "uint128",
                name: "_acceptableMinMargin",
                type: "uint128",
            },
            {
                internalType: "address",
                name: "_receiver",
                type: "address",
            },
        ],
        name: "createDecreaseLiquidityPosition",
        outputs: [
            {
                internalType: "uint128",
                name: "index",
                type: "uint128",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "contract IMarketDescriptor",
                name: "_market",
                type: "address",
            },
            {
                internalType: "Side",
                name: "_side",
                type: "uint8",
            },
            {
                internalType: "uint128",
                name: "_marginDelta",
                type: "uint128",
            },
            {
                internalType: "uint128",
                name: "_sizeDelta",
                type: "uint128",
            },
            {
                internalType: "uint160",
                name: "_acceptableTradePriceX96",
                type: "uint160",
            },
            {
                internalType: "address",
                name: "_receiver",
                type: "address",
            },
        ],
        name: "createDecreasePosition",
        outputs: [
            {
                internalType: "uint128",
                name: "index",
                type: "uint128",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "contract IMarketDescriptor",
                name: "_market",
                type: "address",
            },
            {
                internalType: "uint128",
                name: "_marginDelta",
                type: "uint128",
            },
            {
                internalType: "uint128",
                name: "_liquidityDelta",
                type: "uint128",
            },
            {
                internalType: "uint128",
                name: "_acceptableMinMargin",
                type: "uint128",
            },
        ],
        name: "createIncreaseLiquidityPosition",
        outputs: [
            {
                internalType: "uint128",
                name: "index",
                type: "uint128",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "contract IMarketDescriptor",
                name: "_market",
                type: "address",
            },
            {
                internalType: "Side",
                name: "_side",
                type: "uint8",
            },
            {
                internalType: "uint128",
                name: "_marginDelta",
                type: "uint128",
            },
            {
                internalType: "uint128",
                name: "_sizeDelta",
                type: "uint128",
            },
            {
                internalType: "uint160",
                name: "_acceptableTradePriceX96",
                type: "uint160",
            },
        ],
        name: "createIncreasePosition",
        outputs: [
            {
                internalType: "uint128",
                name: "index",
                type: "uint128",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "decreaseLiquidityPositionIndex",
        outputs: [
            {
                internalType: "uint128",
                name: "",
                type: "uint128",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "decreaseLiquidityPositionIndexNext",
        outputs: [
            {
                internalType: "uint128",
                name: "",
                type: "uint128",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint128",
                name: "",
                type: "uint128",
            },
        ],
        name: "decreaseLiquidityPositionRequests",
        outputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "contract IMarketDescriptor",
                name: "market",
                type: "address",
            },
            {
                internalType: "uint128",
                name: "marginDelta",
                type: "uint128",
            },
            {
                internalType: "uint128",
                name: "liquidityDelta",
                type: "uint128",
            },
            {
                internalType: "uint128",
                name: "acceptableMinMargin",
                type: "uint128",
            },
            {
                internalType: "uint256",
                name: "executionFee",
                type: "uint256",
            },
            {
                internalType: "uint96",
                name: "blockNumber",
                type: "uint96",
            },
            {
                internalType: "uint64",
                name: "blockTime",
                type: "uint64",
            },
            {
                internalType: "address",
                name: "receiver",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "decreasePositionIndex",
        outputs: [
            {
                internalType: "uint128",
                name: "",
                type: "uint128",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "decreasePositionIndexNext",
        outputs: [
            {
                internalType: "uint128",
                name: "",
                type: "uint128",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint128",
                name: "",
                type: "uint128",
            },
        ],
        name: "decreasePositionRequests",
        outputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "contract IMarketDescriptor",
                name: "market",
                type: "address",
            },
            {
                internalType: "Side",
                name: "side",
                type: "uint8",
            },
            {
                internalType: "uint128",
                name: "marginDelta",
                type: "uint128",
            },
            {
                internalType: "uint128",
                name: "sizeDelta",
                type: "uint128",
            },
            {
                internalType: "uint160",
                name: "acceptableTradePriceX96",
                type: "uint160",
            },
            {
                internalType: "uint256",
                name: "executionFee",
                type: "uint256",
            },
            {
                internalType: "uint96",
                name: "blockNumber",
                type: "uint96",
            },
            {
                internalType: "uint64",
                name: "blockTime",
                type: "uint64",
            },
            {
                internalType: "address",
                name: "receiver",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "contract IMarketDescriptor",
                name: "_market",
                type: "address",
            },
            {
                internalType: "uint128",
                name: "_liquidityDelta",
                type: "uint128",
            },
            {
                internalType: "address",
                name: "_receiver",
                type: "address",
            },
        ],
        name: "executeDecreaseLiquidationFundPosition",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint128",
                name: "_index",
                type: "uint128",
            },
            {
                internalType: "address payable",
                name: "_executionFeeReceiver",
                type: "address",
            },
        ],
        name: "executeDecreaseLiquidityPosition",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint128",
                name: "_endIndex",
                type: "uint128",
            },
            {
                internalType: "address payable",
                name: "_executionFeeReceiver",
                type: "address",
            },
        ],
        name: "executeDecreaseLiquidityPositions",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint128",
                name: "_index",
                type: "uint128",
            },
            {
                internalType: "address payable",
                name: "_executionFeeReceiver",
                type: "address",
            },
        ],
        name: "executeDecreasePosition",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint128",
                name: "_endIndex",
                type: "uint128",
            },
            {
                internalType: "address payable",
                name: "_executionFeeReceiver",
                type: "address",
            },
        ],
        name: "executeDecreasePositions",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "contract IMarketDescriptor",
                name: "_market",
                type: "address",
            },
            {
                internalType: "uint128",
                name: "_liquidityDelta",
                type: "uint128",
            },
        ],
        name: "executeIncreaseLiquidationFundPosition",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint128",
                name: "_index",
                type: "uint128",
            },
            {
                internalType: "address payable",
                name: "_executionFeeReceiver",
                type: "address",
            },
        ],
        name: "executeIncreaseLiquidityPosition",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint128",
                name: "_endIndex",
                type: "uint128",
            },
            {
                internalType: "address payable",
                name: "_executionFeeReceiver",
                type: "address",
            },
        ],
        name: "executeIncreaseLiquidityPositions",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint128",
                name: "_index",
                type: "uint128",
            },
            {
                internalType: "address payable",
                name: "_executionFeeReceiver",
                type: "address",
            },
        ],
        name: "executeIncreasePosition",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint128",
                name: "_endIndex",
                type: "uint128",
            },
            {
                internalType: "address payable",
                name: "_executionFeeReceiver",
                type: "address",
            },
        ],
        name: "executeIncreasePositions",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "executionGasLimit",
        outputs: [
            {
                internalType: "uint160",
                name: "",
                type: "uint160",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "gov",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "increaseLiquidityPositionIndex",
        outputs: [
            {
                internalType: "uint128",
                name: "",
                type: "uint128",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "increaseLiquidityPositionIndexNext",
        outputs: [
            {
                internalType: "uint128",
                name: "",
                type: "uint128",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint128",
                name: "",
                type: "uint128",
            },
        ],
        name: "increaseLiquidityPositionRequests",
        outputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "contract IMarketDescriptor",
                name: "market",
                type: "address",
            },
            {
                internalType: "uint128",
                name: "marginDelta",
                type: "uint128",
            },
            {
                internalType: "uint128",
                name: "liquidityDelta",
                type: "uint128",
            },
            {
                internalType: "uint128",
                name: "acceptableMinMargin",
                type: "uint128",
            },
            {
                internalType: "uint256",
                name: "executionFee",
                type: "uint256",
            },
            {
                internalType: "uint96",
                name: "blockNumber",
                type: "uint96",
            },
            {
                internalType: "uint64",
                name: "blockTime",
                type: "uint64",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "increasePositionIndex",
        outputs: [
            {
                internalType: "uint128",
                name: "",
                type: "uint128",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "increasePositionIndexNext",
        outputs: [
            {
                internalType: "uint128",
                name: "",
                type: "uint128",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint128",
                name: "",
                type: "uint128",
            },
        ],
        name: "increasePositionRequests",
        outputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "contract IMarketDescriptor",
                name: "market",
                type: "address",
            },
            {
                internalType: "Side",
                name: "side",
                type: "uint8",
            },
            {
                internalType: "uint128",
                name: "marginDelta",
                type: "uint128",
            },
            {
                internalType: "uint128",
                name: "sizeDelta",
                type: "uint128",
            },
            {
                internalType: "uint160",
                name: "acceptableTradePriceX96",
                type: "uint160",
            },
            {
                internalType: "uint256",
                name: "executionFee",
                type: "uint256",
            },
            {
                internalType: "uint96",
                name: "blockNumber",
                type: "uint96",
            },
            {
                internalType: "uint64",
                name: "blockTime",
                type: "uint64",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "marketManager",
        outputs: [
            {
                internalType: "contract IMarketManager",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "maxTimeDelay",
        outputs: [
            {
                internalType: "uint32",
                name: "",
                type: "uint32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "minBlockDelayExecutor",
        outputs: [
            {
                internalType: "uint32",
                name: "",
                type: "uint32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "minExecutionFee",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "minTimeDelayPublic",
        outputs: [
            {
                internalType: "uint32",
                name: "",
                type: "uint32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "pendingGov",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "positionExecutors",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "router",
        outputs: [
            {
                internalType: "contract Router",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint32",
                name: "_minBlockDelayExecutor",
                type: "uint32",
            },
            {
                internalType: "uint32",
                name: "_minTimeDelayPublic",
                type: "uint32",
            },
            {
                internalType: "uint32",
                name: "_maxTimeDelay",
                type: "uint32",
            },
        ],
        name: "updateDelayValues",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint160",
                name: "_executionGasLimit",
                type: "uint160",
            },
        ],
        name: "updateExecutionGasLimit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_minExecutionFee",
                type: "uint256",
            },
        ],
        name: "updateMinExecutionFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_account",
                type: "address",
            },
            {
                internalType: "bool",
                name: "_active",
                type: "bool",
            },
        ],
        name: "updatePositionExecutor",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "usd",
        outputs: [
            {
                internalType: "contract IERC20",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
]