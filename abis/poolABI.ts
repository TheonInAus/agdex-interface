export const poolABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "CallerNotLiquidator",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint128",
        "name": "balance",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "requiredAmount",
        "type": "uint128"
      }
    ],
    "name": "InsufficientBalance",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InsufficientGlobalLiquidity",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InsufficientMargin",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint128",
        "name": "size",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "requiredSize",
        "type": "uint128"
      }
    ],
    "name": "InsufficientSizeToDecrease",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "requiredCaller",
        "type": "address"
      }
    ],
    "name": "InvalidCaller",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidLiquidityToOpen",
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
    "inputs": [],
    "name": "LastLiquidityPositionCannotBeClosed",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "margin",
        "type": "uint256"
      },
      {
        "internalType": "uint128",
        "name": "liquidity",
        "type": "uint128"
      },
      {
        "internalType": "uint32",
        "name": "maxLeverage",
        "type": "uint32"
      }
    ],
    "name": "LeverageTooHigh",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "requiredPositionID",
        "type": "uint256"
      }
    ],
    "name": "LiquidityPositionNotFound",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "int256",
        "name": "margin",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "unrealizedPnL",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "maintenanceMargin",
        "type": "uint256"
      }
    ],
    "name": "MarginRateTooHigh",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "int256",
        "name": "margin",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "unrealizedPnL",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "maintenanceMargin",
        "type": "uint256"
      }
    ],
    "name": "MarginRateTooLow",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "requiredAccount",
        "type": "address"
      },
      {
        "internalType": "Side",
        "name": "requiredSide",
        "type": "uint8"
      }
    ],
    "name": "PositionNotFound",
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
        "internalType": "uint256",
        "name": "margin",
        "type": "uint256"
      },
      {
        "internalType": "uint64",
        "name": "liquidationExecutionFee",
        "type": "uint64"
      },
      {
        "internalType": "uint128",
        "name": "positionUnrealizedLoss",
        "type": "uint128"
      }
    ],
    "name": "RiskRateTooHigh",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "margin",
        "type": "uint256"
      },
      {
        "internalType": "uint64",
        "name": "liquidationExecutionFee",
        "type": "uint64"
      },
      {
        "internalType": "uint128",
        "name": "positionUnrealizedLoss",
        "type": "uint128"
      }
    ],
    "name": "RiskRateTooLow",
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
        "internalType": "int256",
        "name": "value",
        "type": "int256"
      }
    ],
    "name": "SafeCastOverflowedIntDowncast",
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
    "inputs": [
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "SafeCastOverflowedUintToInt",
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
        "indexed": false,
        "internalType": "int256",
        "name": "fundingRateDeltaX96",
        "type": "int256"
      },
      {
        "indexed": false,
        "internalType": "int192",
        "name": "longFundingRateGrowthAfterX96",
        "type": "int192"
      },
      {
        "indexed": false,
        "internalType": "int192",
        "name": "shortFundingRateGrowthAfterX96",
        "type": "int192"
      },
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "lastAdjustFundingRateTime",
        "type": "uint64"
      }
    ],
    "name": "FundingRateGrowthAdjusted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "netSizeAfter",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "liquidationBufferNetSizeAfter",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint160",
        "name": "entryPriceAfterX96",
        "type": "uint160"
      },
      {
        "indexed": false,
        "internalType": "Side",
        "name": "sideAfter",
        "type": "uint8"
      }
    ],
    "name": "GlobalLiquidityPositionNetPositionAdjusted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "realizedProfitGrowthAfterX64",
        "type": "uint256"
      }
    ],
    "name": "GlobalLiquidityPositionRealizedProfitGrowthChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "int256",
        "name": "riskBufferFundAfter",
        "type": "int256"
      }
    ],
    "name": "GlobalRiskBufferFundChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "riskBufferFundDelta",
        "type": "uint128"
      }
    ],
    "name": "GlobalRiskBufferFundGovUsed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "lastZeroLossTimeAfter",
        "type": "uint64"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "liquidityAfter",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "liquidityTimesUnrealizedLossAfter",
        "type": "uint256"
      }
    ],
    "name": "GlobalUnrealizedLossMetricsChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint96",
        "name": "positionID",
        "type": "uint96"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "margin",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "unrealizedLoss",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "realizedProfit",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      }
    ],
    "name": "LiquidityPositionClosed",
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
      },
      {
        "indexed": true,
        "internalType": "uint96",
        "name": "positionID",
        "type": "uint96"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "realizedProfit",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "riskBufferFundDelta",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "liquidationExecutionFee",
        "type": "uint64"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "feeReceiver",
        "type": "address"
      }
    ],
    "name": "LiquidityPositionLiquidated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint96",
        "name": "positionID",
        "type": "uint96"
      },
      {
        "indexed": false,
        "internalType": "int128",
        "name": "marginDelta",
        "type": "int128"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "marginAfter",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "entryRealizedProfitGrowthAfterX64",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      }
    ],
    "name": "LiquidityPositionMarginAdjusted",
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
        "internalType": "uint96",
        "name": "positionID",
        "type": "uint96"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "margin",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "liquidity",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "entryUnrealizedLoss",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "realizedProfitGrowthX64",
        "type": "uint256"
      }
    ],
    "name": "LiquidityPositionOpened",
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
        "name": "marginAfter",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "sizeAfter",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint160",
        "name": "tradePriceX96",
        "type": "uint160"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "realizedPnLDelta",
        "type": "int256"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "fundingFee",
        "type": "int256"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "tradingFee",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      }
    ],
    "name": "PositionDecreased",
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
        "name": "marginAfter",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "sizeAfter",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint160",
        "name": "tradePriceX96",
        "type": "uint160"
      },
      {
        "indexed": false,
        "internalType": "uint160",
        "name": "entryPriceAfterX96",
        "type": "uint160"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "fundingFee",
        "type": "int256"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "tradingFee",
        "type": "uint128"
      }
    ],
    "name": "PositionIncreased",
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
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
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
        "internalType": "uint160",
        "name": "indexPriceX96",
        "type": "uint160"
      },
      {
        "indexed": false,
        "internalType": "uint160",
        "name": "liquidationPriceX96",
        "type": "uint160"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "fundingFee",
        "type": "int256"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "tradingFee",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "liquidationFee",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "liquidationExecutionFee",
        "type": "uint64"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "feeReceiver",
        "type": "address"
      }
    ],
    "name": "PositionLiquidated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "index",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "sizeAfter",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "premiumRateAfterX96",
        "type": "uint128"
      }
    ],
    "name": "PriceVertexChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "amount",
        "type": "uint128"
      }
    ],
    "name": "ProtocolFeeCollected",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "amount",
        "type": "uint128"
      }
    ],
    "name": "ProtocolFeeIncreased",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "referralToken",
        "type": "uint256"
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
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "ReferralFeeCollected",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "referee",
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
        "internalType": "uint128",
        "name": "referralFee",
        "type": "uint128"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "referralParentToken",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "referralParentFee",
        "type": "uint128"
      }
    ],
    "name": "ReferralFeeIncreased",
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
        "internalType": "uint128",
        "name": "liquidityAfter",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      }
    ],
    "name": "RiskBufferFundPositionDecreased",
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
        "internalType": "uint128",
        "name": "liquidityAfter",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "unlockTimeAfter",
        "type": "uint64"
      }
    ],
    "name": "RiskBufferFundPositionIncreased",
    "type": "event"
  },
  {
    "inputs": [
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
    "name": "adjustLiquidityPositionMargin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "_startExclusive",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "_endInclusive",
        "type": "uint8"
      }
    ],
    "name": "changePriceVertex",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
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
    "name": "closeLiquidityPosition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "collectProtocolFee",
    "outputs": [],
    "stateMutability": "nonpayable",
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
        "internalType": "address",
        "name": "_receiver",
        "type": "address"
      }
    ],
    "name": "collectReferralFee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amount",
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
    "name": "decreasePosition",
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
    "name": "decreaseRiskBufferFundPosition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "globalFundingRateSample",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "lastAdjustFundingRateTime",
        "type": "uint64"
      },
      {
        "internalType": "uint16",
        "name": "sampleCount",
        "type": "uint16"
      },
      {
        "internalType": "int176",
        "name": "cumulativePremiumRateX96",
        "type": "int176"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "globalLiquidityPosition",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "netSize",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "liquidationBufferNetSize",
        "type": "uint128"
      },
      {
        "internalType": "uint160",
        "name": "entryPriceX96",
        "type": "uint160"
      },
      {
        "internalType": "Side",
        "name": "side",
        "type": "uint8"
      },
      {
        "internalType": "uint128",
        "name": "liquidity",
        "type": "uint128"
      },
      {
        "internalType": "uint256",
        "name": "realizedProfitGrowthX64",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "globalPosition",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "longSize",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "shortSize",
        "type": "uint128"
      },
      {
        "internalType": "int192",
        "name": "longFundingRateGrowthX96",
        "type": "int192"
      },
      {
        "internalType": "int192",
        "name": "shortFundingRateGrowthX96",
        "type": "int192"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "globalRiskBufferFund",
    "outputs": [
      {
        "internalType": "int256",
        "name": "riskBufferFund",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "liquidity",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "globalUnrealizedLossMetrics",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "lastZeroLossTime",
        "type": "uint64"
      },
      {
        "internalType": "uint128",
        "name": "liquidity",
        "type": "uint128"
      },
      {
        "internalType": "uint256",
        "name": "liquidityTimesUnrealizedLoss",
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
        "name": "_receiver",
        "type": "address"
      },
      {
        "internalType": "uint128",
        "name": "_riskBufferFundDelta",
        "type": "uint128"
      }
    ],
    "name": "govUseRiskBufferFund",
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
        "name": "_marginDelta",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "_sizeDelta",
        "type": "uint128"
      }
    ],
    "name": "increasePosition",
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
    "name": "increaseRiskBufferFundPosition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint96",
        "name": "_positionID",
        "type": "uint96"
      },
      {
        "internalType": "address",
        "name": "_feeReceiver",
        "type": "address"
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
        "internalType": "address",
        "name": "_feeReceiver",
        "type": "address"
      }
    ],
    "name": "liquidatePosition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint96",
        "name": "_positionID",
        "type": "uint96"
      }
    ],
    "name": "liquidityPositionAccount",
    "outputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint96",
        "name": "",
        "type": "uint96"
      }
    ],
    "name": "liquidityPositions",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "margin",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "liquidity",
        "type": "uint128"
      },
      {
        "internalType": "uint256",
        "name": "entryUnrealizedLoss",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "entryRealizedProfitGrowthX64",
        "type": "uint256"
      },
      {
        "internalType": "uint64",
        "name": "entryTime",
        "type": "uint64"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "Side",
        "name": "_side",
        "type": "uint8"
      }
    ],
    "name": "marketPriceX96",
    "outputs": [
      {
        "internalType": "uint160",
        "name": "_marketPriceX96",
        "type": "uint160"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "onChangeTokenConfig",
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
    "name": "openLiquidityPosition",
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
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "Side",
        "name": "",
        "type": "uint8"
      }
    ],
    "name": "positions",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "margin",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "size",
        "type": "uint128"
      },
      {
        "internalType": "uint160",
        "name": "entryPriceX96",
        "type": "uint160"
      },
      {
        "internalType": "int192",
        "name": "entryFundingRateGrowthX96",
        "type": "int192"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "previousGlobalFundingRate",
    "outputs": [
      {
        "internalType": "int192",
        "name": "longFundingRateGrowthX96",
        "type": "int192"
      },
      {
        "internalType": "int192",
        "name": "shortFundingRateGrowthX96",
        "type": "int192"
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
    "inputs": [],
    "name": "priceState",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "maxPriceImpactLiquidity",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "premiumRateX96",
        "type": "uint128"
      },
      {
        "components": [
          {
            "internalType": "uint128",
            "name": "size",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "premiumRateX96",
            "type": "uint128"
          }
        ],
        "internalType": "struct IPool.PriceVertex[7]",
        "name": "priceVertices",
        "type": "tuple[7]"
      },
      {
        "internalType": "uint8",
        "name": "pendingVertexIndex",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "liquidationVertexIndex",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "currentVertexIndex",
        "type": "uint8"
      },
      {
        "internalType": "uint128[7]",
        "name": "liquidationBufferNetSizes",
        "type": "uint128[7]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "protocolFee",
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
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "referralFees",
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
    "name": "riskBufferFundPositions",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "liquidity",
        "type": "uint128"
      },
      {
        "internalType": "uint64",
        "name": "unlockTime",
        "type": "uint64"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "sampleAndAdjustFundingRate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "token",
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
    "name": "usdBalance",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]