export const marketManagerABI = [
    {
        inputs: [
            {
                internalType: 'contract IERC20',
                name: '_usd',
                type: 'address',
            },
            {
                internalType: 'contract Router',
                name: '_router',
                type: 'address',
            },
            {
                internalType: 'contract IFeeDistributor',
                name: '_feeDistributor',
                type: 'address',
            },
            {
                internalType: 'contract IEFC',
                name: '_EFC',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'target',
                type: 'address',
            },
        ],
        name: 'AddressEmptyCode',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'AddressInsufficientBalance',
        type: 'error',
    },
    {
        inputs: [],
        name: 'CallerNotLiquidator',
        type: 'error',
    },
    {
        inputs: [],
        name: 'FailedInnerCall',
        type: 'error',
    },
    {
        inputs: [],
        name: 'Forbidden',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'balance',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'requiredAmount',
                type: 'uint256',
            },
        ],
        name: 'InsufficientBalance',
        type: 'error',
    },
    {
        inputs: [],
        name: 'InsufficientGlobalLiquidity',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint128',
                name: 'requiredRiskBufferFund',
                type: 'uint128',
            },
        ],
        name: 'InsufficientLiquidationFund',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'liquidity',
                type: 'uint256',
            },
            {
                internalType: 'uint128',
                name: 'requiredLiquidity',
                type: 'uint128',
            },
        ],
        name: 'InsufficientLiquidityToDecrease',
        type: 'error',
    },
    {
        inputs: [],
        name: 'InsufficientMargin',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint128',
                name: 'size',
                type: 'uint128',
            },
            {
                internalType: 'uint128',
                name: 'requiredSize',
                type: 'uint128',
            },
        ],
        name: 'InsufficientSizeToDecrease',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'requiredCaller',
                type: 'address',
            },
        ],
        name: 'InvalidCaller',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: 'protocolFeeRate',
                type: 'uint32',
            },
            {
                internalType: 'uint32',
                name: 'referralReturnFeeRate',
                type: 'uint32',
            },
            {
                internalType: 'uint32',
                name: 'referralParentReturnFeeRate',
                type: 'uint32',
            },
        ],
        name: 'InvalidFeeRate',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: 'interestRate',
                type: 'uint32',
            },
        ],
        name: 'InvalidInterestRate',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: 'invalidLiquidationFeeRatePerLiquidityPosition',
                type: 'uint32',
            },
        ],
        name: 'InvalidLiquidationFeeRatePerLiquidityPosition',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: 'liquidationFeeRatePerPosition',
                type: 'uint32',
            },
        ],
        name: 'InvalidLiquidationFeeRatePerPosition',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint8',
                name: 'liquidationVertexIndex',
                type: 'uint8',
            },
        ],
        name: 'InvalidLiquidationVertexIndex',
        type: 'error',
    },
    {
        inputs: [],
        name: 'InvalidLiquidityToOpen',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: 'maxFundingRate',
                type: 'uint32',
            },
        ],
        name: 'InvalidMaxFundingRate',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: 'maxLeveragePerLiquidityPosition',
                type: 'uint32',
            },
        ],
        name: 'InvalidMaxLeveragePerLiquidityPosition',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: 'maxLeveragePerPosition',
                type: 'uint32',
            },
        ],
        name: 'InvalidMaxLeveragePerPosition',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint128',
                name: 'maxPositionLiquidity',
                type: 'uint128',
            },
        ],
        name: 'InvalidMaxPositionLiquidity',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: 'maxPositionValueRate',
                type: 'uint32',
            },
        ],
        name: 'InvalidMaxPositionValueRate',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint128',
                name: 'maxPriceImpactLiquidity',
                type: 'uint128',
            },
        ],
        name: 'InvalidMaxPriceImpactLiquidity',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: 'maxSizeRatePerPosition',
                type: 'uint32',
            },
        ],
        name: 'InvalidMaxSizeRatePerPosition',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: 'protocolFeeRate',
                type: 'uint32',
            },
        ],
        name: 'InvalidProtocolFeeRate',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: 'referralDiscountRate',
                type: 'uint32',
            },
        ],
        name: 'InvalidReferralDiscountRate',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: 'referralParentReturnFeeRate',
                type: 'uint32',
            },
        ],
        name: 'InvalidReferralParentReturnFeeRate',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: 'referralReturnFeeRate',
                type: 'uint32',
            },
        ],
        name: 'InvalidReferralReturnFeeRate',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'int256',
                name: 'tradePriceX96TimesSizeTotal',
                type: 'int256',
            },
        ],
        name: 'InvalidTradePrice',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: 'tradingFeeRate',
                type: 'uint32',
            },
        ],
        name: 'InvalidTradingFeeRate',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint8',
                name: 'index',
                type: 'uint8',
            },
        ],
        name: 'InvalidVertex',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'length',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'requiredLength',
                type: 'uint256',
            },
        ],
        name: 'InvalidVerticesLength',
        type: 'error',
    },
    {
        inputs: [],
        name: 'LastLiquidityPositionCannotBeClosed',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'margin',
                type: 'uint256',
            },
            {
                internalType: 'uint128',
                name: 'liquidity',
                type: 'uint128',
            },
            {
                internalType: 'uint32',
                name: 'maxLeverage',
                type: 'uint32',
            },
        ],
        name: 'LeverageTooHigh',
        type: 'error',
    },
    {
        inputs: [],
        name: 'LiquidationFundLoss',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'requiredAccount',
                type: 'address',
            },
        ],
        name: 'LiquidityPositionNotFound',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'int256',
                name: 'margin',
                type: 'int256',
            },
            {
                internalType: 'int256',
                name: 'unrealizedPnL',
                type: 'int256',
            },
            {
                internalType: 'uint256',
                name: 'maintenanceMargin',
                type: 'uint256',
            },
        ],
        name: 'MarginRateTooHigh',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'int256',
                name: 'margin',
                type: 'int256',
            },
            {
                internalType: 'int256',
                name: 'unrealizedPnL',
                type: 'int256',
            },
            {
                internalType: 'uint256',
                name: 'maintenanceMargin',
                type: 'uint256',
            },
        ],
        name: 'MarginRateTooLow',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
        ],
        name: 'MarketAlreadyEnabled',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
        ],
        name: 'MarketNotEnabled',
        type: 'error',
    },
    {
        inputs: [],
        name: 'MathOverflowedMulDiv',
        type: 'error',
    },
    {
        inputs: [],
        name: 'MaxPremiumRateExceeded',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'requiredAccount',
                type: 'address',
            },
            {
                internalType: 'Side',
                name: 'requiredSide',
                type: 'uint8',
            },
        ],
        name: 'PositionNotFound',
        type: 'error',
    },
    {
        inputs: [],
        name: 'ReentrancyGuardReentrantCall',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'int256',
                name: 'margin',
                type: 'int256',
            },
            {
                internalType: 'uint256',
                name: 'maintenanceMargin',
                type: 'uint256',
            },
        ],
        name: 'RiskRateTooHigh',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'int256',
                name: 'margin',
                type: 'int256',
            },
            {
                internalType: 'uint256',
                name: 'maintenanceMargin',
                type: 'uint256',
            },
        ],
        name: 'RiskRateTooLow',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint8',
                name: 'bits',
                type: 'uint8',
            },
            {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
            },
        ],
        name: 'SafeCastOverflowedUintDowncast',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
        ],
        name: 'SafeERC20FailedOperation',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint128',
                name: 'requiredSize',
                type: 'uint128',
            },
            {
                internalType: 'uint128',
                name: 'maxSize',
                type: 'uint128',
            },
        ],
        name: 'SizeExceedsMaxSize',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint128',
                name: 'requiredSize',
                type: 'uint128',
            },
            {
                internalType: 'uint128',
                name: 'maxSizePerPosition',
                type: 'uint128',
            },
        ],
        name: 'SizeExceedsMaxSizePerPosition',
        type: 'error',
    },
    {
        inputs: [],
        name: 'ZeroSizeDelta',
        type: 'error',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint160',
                name: 'basisIndexPriceAfterX96',
                type: 'uint160',
            },
        ],
        name: 'BasisIndexPriceChanged',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'previousGov',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'newGov',
                type: 'address',
            },
        ],
        name: 'ChangeGovStarted',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'int256',
                name: 'fundingRateDeltaX96',
                type: 'int256',
            },
            {
                indexed: false,
                internalType: 'int192',
                name: 'longFundingRateGrowthAfterX96',
                type: 'int192',
            },
            {
                indexed: false,
                internalType: 'int192',
                name: 'shortFundingRateGrowthAfterX96',
                type: 'int192',
            },
            {
                indexed: false,
                internalType: 'uint64',
                name: 'lastAdjustFundingRateTime',
                type: 'uint64',
            },
        ],
        name: 'FundingRateGrowthAdjusted',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint16',
                name: 'sampleCountAfter',
                type: 'uint16',
            },
            {
                indexed: false,
                internalType: 'int176',
                name: 'cumulativePremiumRateAfterX96',
                type: 'int176',
            },
        ],
        name: 'GlobalFundingRateSampleAdjusted',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'receiver',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'liquidationFundDelta',
                type: 'uint128',
            },
        ],
        name: 'GlobalLiquidationFundGovUsed',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'int256',
                name: 'liquidationFee',
                type: 'int256',
            },
            {
                indexed: false,
                internalType: 'int256',
                name: 'liquidationFundAfter',
                type: 'int256',
            },
        ],
        name: 'GlobalLiquidationFundIncreasedByLiquidation',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'Side',
                name: 'sideAfter',
                type: 'uint8',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'netSizeAfter',
                type: 'uint128',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'liquidationBufferNetSizeAfter',
                type: 'uint128',
            },
        ],
        name: 'GlobalLiquidityPositionNetPositionChanged',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'int256',
                name: 'unrealizedPnLGrowthAfterX64',
                type: 'int256',
            },
        ],
        name: 'GlobalLiquidityPositionPnLGrowthIncreasedByFundingFee',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'liquidityFee',
                type: 'uint128',
            },
            {
                indexed: false,
                internalType: 'int256',
                name: 'unrealizedPnLGrowthAfterX64',
                type: 'int256',
            },
        ],
        name: 'GlobalLiquidityPositionPnLGrowthIncreasedByTradingFee',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'maxSizeAfter',
                type: 'uint128',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'maxSizePerPositionAfter',
                type: 'uint128',
            },
        ],
        name: 'GlobalPositionSizeChanged',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'previousGov',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'newGov',
                type: 'address',
            },
        ],
        name: 'GovChanged',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint8',
                name: 'index',
                type: 'uint8',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'netSizeAfter',
                type: 'uint128',
            },
        ],
        name: 'LiquidationBufferNetSizeChanged',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'liquidityAfter',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'receiver',
                type: 'address',
            },
        ],
        name: 'LiquidationFundPositionDecreased',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'liquidityAfter',
                type: 'uint256',
            },
        ],
        name: 'LiquidationFundPositionIncreased',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'marginDelta',
                type: 'uint128',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'marginAfter',
                type: 'uint128',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'liquidityAfter',
                type: 'uint128',
            },
            {
                indexed: false,
                internalType: 'int256',
                name: 'realizedPnLDelta',
                type: 'int256',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'receiver',
                type: 'address',
            },
        ],
        name: 'LiquidityPositionDecreased',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'marginDelta',
                type: 'uint128',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'marginAfter',
                type: 'uint128',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'liquidityAfter',
                type: 'uint128',
            },
            {
                indexed: false,
                internalType: 'int256',
                name: 'realizedPnLDelta',
                type: 'int256',
            },
        ],
        name: 'LiquidityPositionIncreased',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'liquidator',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'int256',
                name: 'liquidationLoss',
                type: 'int256',
            },
            {
                indexed: false,
                internalType: 'int256',
                name: 'unrealizedPnLGrowthAfterX64',
                type: 'int256',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'feeReceiver',
                type: 'address',
            },
        ],
        name: 'LiquidityPositionLiquidated',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
            {
                components: [
                    {
                        internalType: 'uint64',
                        name: 'minMarginPerLiquidityPosition',
                        type: 'uint64',
                    },
                    {
                        internalType: 'uint32',
                        name: 'maxLeveragePerLiquidityPosition',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'liquidationFeeRatePerLiquidityPosition',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint64',
                        name: 'minMarginPerPosition',
                        type: 'uint64',
                    },
                    {
                        internalType: 'uint32',
                        name: 'maxLeveragePerPosition',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'liquidationFeeRatePerPosition',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint128',
                        name: 'maxPositionLiquidity',
                        type: 'uint128',
                    },
                    {
                        internalType: 'uint32',
                        name: 'maxPositionValueRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'maxSizeRatePerPosition',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint64',
                        name: 'liquidationExecutionFee',
                        type: 'uint64',
                    },
                    {
                        internalType: 'uint32',
                        name: 'interestRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'maxFundingRate',
                        type: 'uint32',
                    },
                ],
                indexed: false,
                internalType: 'struct IConfigurable.MarketBaseConfig',
                name: 'newCfg',
                type: 'tuple',
            },
        ],
        name: 'MarketBaseConfigChanged',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
            {
                components: [
                    {
                        internalType: 'uint64',
                        name: 'minMarginPerLiquidityPosition',
                        type: 'uint64',
                    },
                    {
                        internalType: 'uint32',
                        name: 'maxLeveragePerLiquidityPosition',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'liquidationFeeRatePerLiquidityPosition',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint64',
                        name: 'minMarginPerPosition',
                        type: 'uint64',
                    },
                    {
                        internalType: 'uint32',
                        name: 'maxLeveragePerPosition',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'liquidationFeeRatePerPosition',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint128',
                        name: 'maxPositionLiquidity',
                        type: 'uint128',
                    },
                    {
                        internalType: 'uint32',
                        name: 'maxPositionValueRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'maxSizeRatePerPosition',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint64',
                        name: 'liquidationExecutionFee',
                        type: 'uint64',
                    },
                    {
                        internalType: 'uint32',
                        name: 'interestRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'maxFundingRate',
                        type: 'uint32',
                    },
                ],
                indexed: false,
                internalType: 'struct IConfigurable.MarketBaseConfig',
                name: 'baseCfg',
                type: 'tuple',
            },
            {
                components: [
                    {
                        internalType: 'uint32',
                        name: 'tradingFeeRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'protocolFeeRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'referralReturnFeeRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'referralParentReturnFeeRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'referralDiscountRate',
                        type: 'uint32',
                    },
                ],
                indexed: false,
                internalType: 'struct IConfigurable.MarketFeeRateConfig',
                name: 'feeRateCfg',
                type: 'tuple',
            },
            {
                components: [
                    {
                        internalType: 'uint128',
                        name: 'maxPriceImpactLiquidity',
                        type: 'uint128',
                    },
                    {
                        internalType: 'uint8',
                        name: 'liquidationVertexIndex',
                        type: 'uint8',
                    },
                    {
                        components: [
                            {
                                internalType: 'uint32',
                                name: 'balanceRate',
                                type: 'uint32',
                            },
                            {
                                internalType: 'uint32',
                                name: 'premiumRate',
                                type: 'uint32',
                            },
                        ],
                        internalType: 'struct IConfigurable.VertexConfig[10]',
                        name: 'vertices',
                        type: 'tuple[10]',
                    },
                ],
                indexed: false,
                internalType: 'struct IConfigurable.MarketPriceConfig',
                name: 'priceCfg',
                type: 'tuple',
            },
        ],
        name: 'MarketConfigEnabled',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
            {
                components: [
                    {
                        internalType: 'uint32',
                        name: 'tradingFeeRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'protocolFeeRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'referralReturnFeeRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'referralParentReturnFeeRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'referralDiscountRate',
                        type: 'uint32',
                    },
                ],
                indexed: false,
                internalType: 'struct IConfigurable.MarketFeeRateConfig',
                name: 'newCfg',
                type: 'tuple',
            },
        ],
        name: 'MarketFeeRateConfigChanged',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
            {
                components: [
                    {
                        internalType: 'uint128',
                        name: 'maxPriceImpactLiquidity',
                        type: 'uint128',
                    },
                    {
                        internalType: 'uint8',
                        name: 'liquidationVertexIndex',
                        type: 'uint8',
                    },
                    {
                        components: [
                            {
                                internalType: 'uint32',
                                name: 'balanceRate',
                                type: 'uint32',
                            },
                            {
                                internalType: 'uint32',
                                name: 'premiumRate',
                                type: 'uint32',
                            },
                        ],
                        internalType: 'struct IConfigurable.VertexConfig[10]',
                        name: 'vertices',
                        type: 'tuple[10]',
                    },
                ],
                indexed: false,
                internalType: 'struct IConfigurable.MarketPriceConfig',
                name: 'newCfg',
                type: 'tuple',
            },
        ],
        name: 'MarketPriceConfigChanged',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'Side',
                name: 'side',
                type: 'uint8',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'marginDelta',
                type: 'uint128',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'marginAfter',
                type: 'uint128',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'sizeAfter',
                type: 'uint128',
            },
            {
                indexed: false,
                internalType: 'uint160',
                name: 'tradePriceX96',
                type: 'uint160',
            },
            {
                indexed: false,
                internalType: 'int256',
                name: 'realizedPnLDelta',
                type: 'int256',
            },
            {
                indexed: false,
                internalType: 'int256',
                name: 'fundingFee',
                type: 'int256',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'tradingFee',
                type: 'uint128',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'receiver',
                type: 'address',
            },
        ],
        name: 'PositionDecreased',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'Side',
                name: 'side',
                type: 'uint8',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'marginDelta',
                type: 'uint128',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'marginAfter',
                type: 'uint128',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'sizeAfter',
                type: 'uint128',
            },
            {
                indexed: false,
                internalType: 'uint160',
                name: 'tradePriceX96',
                type: 'uint160',
            },
            {
                indexed: false,
                internalType: 'uint160',
                name: 'entryPriceAfterX96',
                type: 'uint160',
            },
            {
                indexed: false,
                internalType: 'int256',
                name: 'fundingFee',
                type: 'int256',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'tradingFee',
                type: 'uint128',
            },
        ],
        name: 'PositionIncreased',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'liquidator',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'Side',
                name: 'side',
                type: 'uint8',
            },
            {
                indexed: false,
                internalType: 'uint160',
                name: 'indexPriceX96',
                type: 'uint160',
            },
            {
                indexed: false,
                internalType: 'uint160',
                name: 'tradePriceX96',
                type: 'uint160',
            },
            {
                indexed: false,
                internalType: 'uint160',
                name: 'liquidationPriceX96',
                type: 'uint160',
            },
            {
                indexed: false,
                internalType: 'int256',
                name: 'fundingFee',
                type: 'int256',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'tradingFee',
                type: 'uint128',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'liquidationFee',
                type: 'uint128',
            },
            {
                indexed: false,
                internalType: 'uint64',
                name: 'liquidationExecutionFee',
                type: 'uint64',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'feeReceiver',
                type: 'address',
            },
        ],
        name: 'PositionLiquidated',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'premiumRateAfterX96',
                type: 'uint128',
            },
        ],
        name: 'PremiumRateChanged',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint160',
                name: 'previousSPPriceX96',
                type: 'uint160',
            },
        ],
        name: 'PreviousSPPriceInitialized',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IPriceFeed',
                name: 'priceFeedBefore',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'contract IPriceFeed',
                name: 'priceFeedAfter',
                type: 'address',
            },
        ],
        name: 'PriceFeedChanged',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint8',
                name: 'index',
                type: 'uint8',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'sizeAfter',
                type: 'uint128',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'premiumRateAfterX96',
                type: 'uint128',
            },
        ],
        name: 'PriceVertexChanged',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'amount',
                type: 'uint128',
            },
        ],
        name: 'ProtocolFeeCollected',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'amount',
                type: 'uint128',
            },
        ],
        name: 'ProtocolFeeIncreased',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'referralToken',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'receiver',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'ReferralFeeCollected',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'referee',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'referralToken',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'referralFee',
                type: 'uint128',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'referralParentToken',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'referralParentFee',
                type: 'uint128',
            },
        ],
        name: 'ReferralFeeIncreased',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'int256',
                name: 'unrealizedPnLGrowthAfterX64',
                type: 'int256',
            },
            {
                indexed: false,
                internalType: 'uint160',
                name: 'previousSPPriceAfterX96',
                type: 'uint160',
            },
        ],
        name: 'SettlementPointReached',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'contract IERC20',
                name: 'usd',
                type: 'address',
            },
        ],
        name: 'USDEnabled',
        type: 'event',
    },
    {
        inputs: [],
        name: 'EFC',
        outputs: [
            {
                internalType: 'contract IEFC',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'USD',
        outputs: [
            {
                internalType: 'contract IERC20',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'acceptGov',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_newGov',
                type: 'address',
            },
        ],
        name: 'changeGov',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
            {
                internalType: 'uint8',
                name: '_startExclusive',
                type: 'uint8',
            },
            {
                internalType: 'uint8',
                name: '_endInclusive',
                type: 'uint8',
            },
        ],
        name: 'changePriceVertex',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
        ],
        name: 'collectProtocolFee',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '_referralToken',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: '_receiver',
                type: 'address',
            },
        ],
        name: 'collectReferralFee',
        outputs: [
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_account',
                type: 'address',
            },
            {
                internalType: 'uint128',
                name: '_liquidityDelta',
                type: 'uint128',
            },
            {
                internalType: 'address',
                name: '_receiver',
                type: 'address',
            },
        ],
        name: 'decreaseLiquidationFundPosition',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_account',
                type: 'address',
            },
            {
                internalType: 'uint128',
                name: '_marginDelta',
                type: 'uint128',
            },
            {
                internalType: 'uint128',
                name: '_liquidityDelta',
                type: 'uint128',
            },
            {
                internalType: 'address',
                name: '_receiver',
                type: 'address',
            },
        ],
        name: 'decreaseLiquidityPosition',
        outputs: [
            {
                internalType: 'uint128',
                name: 'marginAfter',
                type: 'uint128',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_account',
                type: 'address',
            },
            {
                internalType: 'Side',
                name: '_side',
                type: 'uint8',
            },
            {
                internalType: 'uint128',
                name: '_marginDelta',
                type: 'uint128',
            },
            {
                internalType: 'uint128',
                name: '_sizeDelta',
                type: 'uint128',
            },
            {
                internalType: 'address',
                name: '_receiver',
                type: 'address',
            },
        ],
        name: 'decreasePosition',
        outputs: [
            {
                internalType: 'uint160',
                name: 'tradePriceX96',
                type: 'uint160',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
            {
                components: [
                    {
                        components: [
                            {
                                internalType: 'uint64',
                                name: 'minMarginPerLiquidityPosition',
                                type: 'uint64',
                            },
                            {
                                internalType: 'uint32',
                                name: 'maxLeveragePerLiquidityPosition',
                                type: 'uint32',
                            },
                            {
                                internalType: 'uint32',
                                name: 'liquidationFeeRatePerLiquidityPosition',
                                type: 'uint32',
                            },
                            {
                                internalType: 'uint64',
                                name: 'minMarginPerPosition',
                                type: 'uint64',
                            },
                            {
                                internalType: 'uint32',
                                name: 'maxLeveragePerPosition',
                                type: 'uint32',
                            },
                            {
                                internalType: 'uint32',
                                name: 'liquidationFeeRatePerPosition',
                                type: 'uint32',
                            },
                            {
                                internalType: 'uint128',
                                name: 'maxPositionLiquidity',
                                type: 'uint128',
                            },
                            {
                                internalType: 'uint32',
                                name: 'maxPositionValueRate',
                                type: 'uint32',
                            },
                            {
                                internalType: 'uint32',
                                name: 'maxSizeRatePerPosition',
                                type: 'uint32',
                            },
                            {
                                internalType: 'uint64',
                                name: 'liquidationExecutionFee',
                                type: 'uint64',
                            },
                            {
                                internalType: 'uint32',
                                name: 'interestRate',
                                type: 'uint32',
                            },
                            {
                                internalType: 'uint32',
                                name: 'maxFundingRate',
                                type: 'uint32',
                            },
                        ],
                        internalType: 'struct IConfigurable.MarketBaseConfig',
                        name: 'baseConfig',
                        type: 'tuple',
                    },
                    {
                        components: [
                            {
                                internalType: 'uint32',
                                name: 'tradingFeeRate',
                                type: 'uint32',
                            },
                            {
                                internalType: 'uint32',
                                name: 'protocolFeeRate',
                                type: 'uint32',
                            },
                            {
                                internalType: 'uint32',
                                name: 'referralReturnFeeRate',
                                type: 'uint32',
                            },
                            {
                                internalType: 'uint32',
                                name: 'referralParentReturnFeeRate',
                                type: 'uint32',
                            },
                            {
                                internalType: 'uint32',
                                name: 'referralDiscountRate',
                                type: 'uint32',
                            },
                        ],
                        internalType: 'struct IConfigurable.MarketFeeRateConfig',
                        name: 'feeRateConfig',
                        type: 'tuple',
                    },
                    {
                        components: [
                            {
                                internalType: 'uint128',
                                name: 'maxPriceImpactLiquidity',
                                type: 'uint128',
                            },
                            {
                                internalType: 'uint8',
                                name: 'liquidationVertexIndex',
                                type: 'uint8',
                            },
                            {
                                components: [
                                    {
                                        internalType: 'uint32',
                                        name: 'balanceRate',
                                        type: 'uint32',
                                    },
                                    {
                                        internalType: 'uint32',
                                        name: 'premiumRate',
                                        type: 'uint32',
                                    },
                                ],
                                internalType: 'struct IConfigurable.VertexConfig[10]',
                                name: 'vertices',
                                type: 'tuple[10]',
                            },
                        ],
                        internalType: 'struct IConfigurable.MarketPriceConfig',
                        name: 'priceConfig',
                        type: 'tuple',
                    },
                ],
                internalType: 'struct IConfigurable.MarketConfig',
                name: '_cfg',
                type: 'tuple',
            },
        ],
        name: 'enableMarket',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'feeDistributor',
        outputs: [
            {
                internalType: 'contract IFeeDistributor',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
        ],
        name: 'globalFundingRateSamples',
        outputs: [
            {
                components: [
                    {
                        internalType: 'uint64',
                        name: 'lastAdjustFundingRateTime',
                        type: 'uint64',
                    },
                    {
                        internalType: 'uint16',
                        name: 'sampleCount',
                        type: 'uint16',
                    },
                    {
                        internalType: 'int176',
                        name: 'cumulativePremiumRateX96',
                        type: 'int176',
                    },
                ],
                internalType: 'struct IMarketPosition.GlobalFundingRateSample',
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
        ],
        name: 'globalLiquidationFunds',
        outputs: [
            {
                components: [
                    {
                        internalType: 'int256',
                        name: 'liquidationFund',
                        type: 'int256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'liquidity',
                        type: 'uint256',
                    },
                ],
                internalType: 'struct IMarketManager.GlobalLiquidationFund',
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
        ],
        name: 'globalLiquidityPositions',
        outputs: [
            {
                components: [
                    {
                        internalType: 'uint128',
                        name: 'netSize',
                        type: 'uint128',
                    },
                    {
                        internalType: 'uint128',
                        name: 'liquidationBufferNetSize',
                        type: 'uint128',
                    },
                    {
                        internalType: 'uint160',
                        name: 'previousSPPriceX96',
                        type: 'uint160',
                    },
                    {
                        internalType: 'Side',
                        name: 'side',
                        type: 'uint8',
                    },
                    {
                        internalType: 'uint128',
                        name: 'liquidity',
                        type: 'uint128',
                    },
                    {
                        internalType: 'int256',
                        name: 'unrealizedPnLGrowthX64',
                        type: 'int256',
                    },
                ],
                internalType: 'struct IMarketLiquidityPosition.GlobalLiquidityPosition',
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
        ],
        name: 'globalPositions',
        outputs: [
            {
                components: [
                    {
                        internalType: 'uint128',
                        name: 'longSize',
                        type: 'uint128',
                    },
                    {
                        internalType: 'uint128',
                        name: 'shortSize',
                        type: 'uint128',
                    },
                    {
                        internalType: 'uint128',
                        name: 'maxSize',
                        type: 'uint128',
                    },
                    {
                        internalType: 'uint128',
                        name: 'maxSizePerPosition',
                        type: 'uint128',
                    },
                    {
                        internalType: 'int192',
                        name: 'longFundingRateGrowthX96',
                        type: 'int192',
                    },
                    {
                        internalType: 'int192',
                        name: 'shortFundingRateGrowthX96',
                        type: 'int192',
                    },
                ],
                internalType: 'struct IMarketPosition.GlobalPosition',
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'gov',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_receiver',
                type: 'address',
            },
            {
                internalType: 'uint128',
                name: '_liquidationFundDelta',
                type: 'uint128',
            },
        ],
        name: 'govUseLiquidationFund',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_account',
                type: 'address',
            },
            {
                internalType: 'uint128',
                name: '_liquidityDelta',
                type: 'uint128',
            },
        ],
        name: 'increaseLiquidationFundPosition',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_account',
                type: 'address',
            },
            {
                internalType: 'uint128',
                name: '_marginDelta',
                type: 'uint128',
            },
            {
                internalType: 'uint128',
                name: '_liquidityDelta',
                type: 'uint128',
            },
        ],
        name: 'increaseLiquidityPosition',
        outputs: [
            {
                internalType: 'uint128',
                name: 'marginAfter',
                type: 'uint128',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_account',
                type: 'address',
            },
            {
                internalType: 'Side',
                name: '_side',
                type: 'uint8',
            },
            {
                internalType: 'uint128',
                name: '_marginDelta',
                type: 'uint128',
            },
            {
                internalType: 'uint128',
                name: '_sizeDelta',
                type: 'uint128',
            },
        ],
        name: 'increasePosition',
        outputs: [
            {
                internalType: 'uint160',
                name: 'tradePriceX96',
                type: 'uint160',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
        ],
        name: 'isEnabledMarket',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_account',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_feeReceiver',
                type: 'address',
            },
        ],
        name: 'liquidateLiquidityPosition',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_account',
                type: 'address',
            },
            {
                internalType: 'Side',
                name: '_side',
                type: 'uint8',
            },
            {
                internalType: 'address',
                name: '_feeReceiver',
                type: 'address',
            },
        ],
        name: 'liquidatePosition',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_account',
                type: 'address',
            },
        ],
        name: 'liquidationFundPositions',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_account',
                type: 'address',
            },
        ],
        name: 'liquidityPositions',
        outputs: [
            {
                components: [
                    {
                        internalType: 'uint128',
                        name: 'margin',
                        type: 'uint128',
                    },
                    {
                        internalType: 'uint128',
                        name: 'liquidity',
                        type: 'uint128',
                    },
                    {
                        internalType: 'int256',
                        name: 'entryUnrealizedPnLGrowthX64',
                        type: 'int256',
                    },
                ],
                internalType: 'struct IMarketLiquidityPosition.LiquidityPosition',
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
        ],
        name: 'marketBaseConfigs',
        outputs: [
            {
                components: [
                    {
                        internalType: 'uint64',
                        name: 'minMarginPerLiquidityPosition',
                        type: 'uint64',
                    },
                    {
                        internalType: 'uint32',
                        name: 'maxLeveragePerLiquidityPosition',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'liquidationFeeRatePerLiquidityPosition',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint64',
                        name: 'minMarginPerPosition',
                        type: 'uint64',
                    },
                    {
                        internalType: 'uint32',
                        name: 'maxLeveragePerPosition',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'liquidationFeeRatePerPosition',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint128',
                        name: 'maxPositionLiquidity',
                        type: 'uint128',
                    },
                    {
                        internalType: 'uint32',
                        name: 'maxPositionValueRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'maxSizeRatePerPosition',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint64',
                        name: 'liquidationExecutionFee',
                        type: 'uint64',
                    },
                    {
                        internalType: 'uint32',
                        name: 'interestRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'maxFundingRate',
                        type: 'uint32',
                    },
                ],
                internalType: 'struct IConfigurable.MarketBaseConfig',
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: 'market',
                type: 'address',
            },
        ],
        name: 'marketConfigs',
        outputs: [
            {
                components: [
                    {
                        internalType: 'uint64',
                        name: 'minMarginPerLiquidityPosition',
                        type: 'uint64',
                    },
                    {
                        internalType: 'uint32',
                        name: 'maxLeveragePerLiquidityPosition',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'liquidationFeeRatePerLiquidityPosition',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint64',
                        name: 'minMarginPerPosition',
                        type: 'uint64',
                    },
                    {
                        internalType: 'uint32',
                        name: 'maxLeveragePerPosition',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'liquidationFeeRatePerPosition',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint128',
                        name: 'maxPositionLiquidity',
                        type: 'uint128',
                    },
                    {
                        internalType: 'uint32',
                        name: 'maxPositionValueRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'maxSizeRatePerPosition',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint64',
                        name: 'liquidationExecutionFee',
                        type: 'uint64',
                    },
                    {
                        internalType: 'uint32',
                        name: 'interestRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'maxFundingRate',
                        type: 'uint32',
                    },
                ],
                internalType: 'struct IConfigurable.MarketBaseConfig',
                name: 'baseConfig',
                type: 'tuple',
            },
            {
                components: [
                    {
                        internalType: 'uint32',
                        name: 'tradingFeeRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'protocolFeeRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'referralReturnFeeRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'referralParentReturnFeeRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'referralDiscountRate',
                        type: 'uint32',
                    },
                ],
                internalType: 'struct IConfigurable.MarketFeeRateConfig',
                name: 'feeRateConfig',
                type: 'tuple',
            },
            {
                components: [
                    {
                        internalType: 'uint128',
                        name: 'maxPriceImpactLiquidity',
                        type: 'uint128',
                    },
                    {
                        internalType: 'uint8',
                        name: 'liquidationVertexIndex',
                        type: 'uint8',
                    },
                    {
                        components: [
                            {
                                internalType: 'uint32',
                                name: 'balanceRate',
                                type: 'uint32',
                            },
                            {
                                internalType: 'uint32',
                                name: 'premiumRate',
                                type: 'uint32',
                            },
                        ],
                        internalType: 'struct IConfigurable.VertexConfig[10]',
                        name: 'vertices',
                        type: 'tuple[10]',
                    },
                ],
                internalType: 'struct IConfigurable.MarketPriceConfig',
                name: 'priceConfig',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
        ],
        name: 'marketFeeRateConfigs',
        outputs: [
            {
                components: [
                    {
                        internalType: 'uint32',
                        name: 'tradingFeeRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'protocolFeeRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'referralReturnFeeRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'referralParentReturnFeeRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'referralDiscountRate',
                        type: 'uint32',
                    },
                ],
                internalType: 'struct IConfigurable.MarketFeeRateConfig',
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
        ],
        name: 'marketPriceConfigs',
        outputs: [
            {
                components: [
                    {
                        internalType: 'uint128',
                        name: 'maxPriceImpactLiquidity',
                        type: 'uint128',
                    },
                    {
                        internalType: 'uint8',
                        name: 'liquidationVertexIndex',
                        type: 'uint8',
                    },
                    {
                        components: [
                            {
                                internalType: 'uint32',
                                name: 'balanceRate',
                                type: 'uint32',
                            },
                            {
                                internalType: 'uint32',
                                name: 'premiumRate',
                                type: 'uint32',
                            },
                        ],
                        internalType: 'struct IConfigurable.VertexConfig[10]',
                        name: 'vertices',
                        type: 'tuple[10]',
                    },
                ],
                internalType: 'struct IConfigurable.MarketPriceConfig',
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
            {
                internalType: 'uint8',
                name: '_index',
                type: 'uint8',
            },
        ],
        name: 'marketPriceVertexConfigs',
        outputs: [
            {
                components: [
                    {
                        internalType: 'uint32',
                        name: 'balanceRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'premiumRate',
                        type: 'uint32',
                    },
                ],
                internalType: 'struct IConfigurable.VertexConfig',
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
            {
                internalType: 'Side',
                name: '_side',
                type: 'uint8',
            },
        ],
        name: 'marketPriceX96s',
        outputs: [
            {
                internalType: 'uint160',
                name: 'marketPriceX96',
                type: 'uint160',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'pendingGov',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_account',
                type: 'address',
            },
            {
                internalType: 'Side',
                name: '_side',
                type: 'uint8',
            },
        ],
        name: 'positions',
        outputs: [
            {
                components: [
                    {
                        internalType: 'uint128',
                        name: 'margin',
                        type: 'uint128',
                    },
                    {
                        internalType: 'uint128',
                        name: 'size',
                        type: 'uint128',
                    },
                    {
                        internalType: 'uint160',
                        name: 'entryPriceX96',
                        type: 'uint160',
                    },
                    {
                        internalType: 'int192',
                        name: 'entryFundingRateGrowthX96',
                        type: 'int192',
                    },
                ],
                internalType: 'struct IMarketPosition.Position',
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
        ],
        name: 'previousGlobalFundingRates',
        outputs: [
            {
                components: [
                    {
                        internalType: 'int192',
                        name: 'longFundingRateGrowthX96',
                        type: 'int192',
                    },
                    {
                        internalType: 'int192',
                        name: 'shortFundingRateGrowthX96',
                        type: 'int192',
                    },
                ],
                internalType: 'struct IMarketPosition.PreviousGlobalFundingRate',
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'priceFeed',
        outputs: [
            {
                internalType: 'contract IPriceFeed',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
        ],
        name: 'priceStates',
        outputs: [
            {
                components: [
                    {
                        internalType: 'uint128',
                        name: 'premiumRateX96',
                        type: 'uint128',
                    },
                    {
                        internalType: 'uint8',
                        name: 'pendingVertexIndex',
                        type: 'uint8',
                    },
                    {
                        internalType: 'uint8',
                        name: 'currentVertexIndex',
                        type: 'uint8',
                    },
                    {
                        internalType: 'uint160',
                        name: 'basisIndexPriceX96',
                        type: 'uint160',
                    },
                    {
                        components: [
                            {
                                internalType: 'uint128',
                                name: 'size',
                                type: 'uint128',
                            },
                            {
                                internalType: 'uint128',
                                name: 'premiumRateX96',
                                type: 'uint128',
                            },
                        ],
                        internalType: 'struct IMarketManager.PriceVertex[10]',
                        name: 'priceVertices',
                        type: 'tuple[10]',
                    },
                    {
                        internalType: 'uint128[10]',
                        name: 'liquidationBufferNetSizes',
                        type: 'uint128[10]',
                    },
                ],
                internalType: 'struct IMarketManager.PriceState',
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
        ],
        name: 'protocolFees',
        outputs: [
            {
                internalType: 'uint128',
                name: '',
                type: 'uint128',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '_referralToken',
                type: 'uint256',
            },
        ],
        name: 'referralFees',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'router',
        outputs: [
            {
                internalType: 'contract Router',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
        ],
        name: 'sampleAndAdjustFundingRate',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IPriceFeed',
                name: '_priceFeed',
                type: 'address',
            },
        ],
        name: 'setPriceFeed',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
            {
                components: [
                    {
                        internalType: 'uint64',
                        name: 'minMarginPerLiquidityPosition',
                        type: 'uint64',
                    },
                    {
                        internalType: 'uint32',
                        name: 'maxLeveragePerLiquidityPosition',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'liquidationFeeRatePerLiquidityPosition',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint64',
                        name: 'minMarginPerPosition',
                        type: 'uint64',
                    },
                    {
                        internalType: 'uint32',
                        name: 'maxLeveragePerPosition',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'liquidationFeeRatePerPosition',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint128',
                        name: 'maxPositionLiquidity',
                        type: 'uint128',
                    },
                    {
                        internalType: 'uint32',
                        name: 'maxPositionValueRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'maxSizeRatePerPosition',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint64',
                        name: 'liquidationExecutionFee',
                        type: 'uint64',
                    },
                    {
                        internalType: 'uint32',
                        name: 'interestRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'maxFundingRate',
                        type: 'uint32',
                    },
                ],
                internalType: 'struct IConfigurable.MarketBaseConfig',
                name: '_newCfg',
                type: 'tuple',
            },
        ],
        name: 'updateMarketBaseConfig',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
            {
                components: [
                    {
                        internalType: 'uint32',
                        name: 'tradingFeeRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'protocolFeeRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'referralReturnFeeRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'referralParentReturnFeeRate',
                        type: 'uint32',
                    },
                    {
                        internalType: 'uint32',
                        name: 'referralDiscountRate',
                        type: 'uint32',
                    },
                ],
                internalType: 'struct IConfigurable.MarketFeeRateConfig',
                name: '_newCfg',
                type: 'tuple',
            },
        ],
        name: 'updateMarketFeeRateConfig',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
            {
                components: [
                    {
                        internalType: 'uint128',
                        name: 'maxPriceImpactLiquidity',
                        type: 'uint128',
                    },
                    {
                        internalType: 'uint8',
                        name: 'liquidationVertexIndex',
                        type: 'uint8',
                    },
                    {
                        components: [
                            {
                                internalType: 'uint32',
                                name: 'balanceRate',
                                type: 'uint32',
                            },
                            {
                                internalType: 'uint32',
                                name: 'premiumRate',
                                type: 'uint32',
                            },
                        ],
                        internalType: 'struct IConfigurable.VertexConfig[10]',
                        name: 'vertices',
                        type: 'tuple[10]',
                    },
                ],
                internalType: 'struct IConfigurable.MarketPriceConfig',
                name: '_newCfg',
                type: 'tuple',
            },
        ],
        name: 'updateMarketPriceConfig',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'usdBalance',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IMarketDescriptor',
                name: '_market',
                type: 'address',
            },
        ],
        name: 'usdBalances',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
]