export type Address = `0x${string}`

export interface ProvisionDistribution {
  total: bigint
  payer: bigint
  receiver: bigint
}

export interface LiquidityQuote {
  totalFutureProvisionNotional: ProvisionDistribution
  totalFutureProvisionPayerDv01: bigint
  totalFutureProvisionReceiverDv01: bigint
  newMarginThreshold: bigint
  newProvisionDistribution: ProvisionDistribution
  newProvisionNotionalDv01: bigint
  marketPortfolio: MarketPortfolio
}

export interface VAMMParams {
  lowerBoundRate: bigint
  currentFutureRate: bigint
  upperBoundRate: bigint
  intervalLength: bigint
  intervalsCount: number
}

export interface FutureInfo {
  id: string
  marketId: string
  termStart: bigint
  termLength: bigint
  vAMMParams: VAMMParams
  totalLiquidityNotional: bigint
  openInterest: bigint
}

enum RiskDirectionType {
  RECEIVER = 0,
  PAYER = 1
}

enum IRateMathType {
  LINEAR = 0,
  COMPOUNDING = 1
}

export interface MarketDescriptor {
  id: string
  sourceName: string
  instrumentName: string
  tag: string
  version: number
  underlying: string
  underlyingName: string
  underlyingDecimals: bigint
  underlyingIsWrappedNativeToken: boolean
  rateMathType: IRateMathType
}

export interface MarketInfo {
  descriptor: MarketDescriptor
  futures: FutureInfo[]
  openInterest: bigint
  totalLiquidityNotional: bigint
}

export interface FixedAndFloatTokensPair {
  fixedTokenAmount: bigint,
  floatTokenAmount: bigint
}

export interface TradeInfo {
  notional: bigint;
  direction: RiskDirectionType
  tokensPair: FixedAndFloatTokensPair;
  marketRate: bigint;
  tradeRate: bigint;
  lpFee: bigint
  protocolFee: bigint
  floatIndex: bigint;
}

export interface OneDirectionTradeQuote {
  tradeInfo: TradeInfo
  totalFutureOpenPositionNotional: bigint;
  totalFutureOpenPositionDv01: bigint;
  newMargin: Margin;
  newMarginThreshold: bigint;
  tradeNotionalDv01: bigint;
}

export interface TradeQuote {
  insufficientLiquidityForPayer: boolean
  exceededRateImpactLimitForPayer: boolean
  insufficientLiquidityForReceiver: boolean
  exceededRateImpactLimitForReceiver: boolean
  payerQuote: OneDirectionTradeQuote,
  receiverQuote: OneDirectionTradeQuote
  marketPortfolio: MarketPortfolio
}

export interface ProfitAndLoss {
  netFutureValue: bigint
  accruedLPFee: bigint
  incurredFee: bigint
}

export interface Margin {
  collateral: bigint
  profitAndLoss: ProfitAndLoss
}

export interface MarginState {
  margin: Margin;
  initialMarginThreshold: bigint;
  liquidationMarginThreshold: bigint;
  lpMarginThreshold: bigint;
  dv01: bigint;
  riskDirection:  RiskDirectionType
}

export interface FutureOpenPosition {
  futureId: string
  tokensPair: FixedAndFloatTokensPair
  notional: bigint
  profitAndLoss: ProfitAndLoss
  requiredMargin: bigint
  dv01: bigint
  riskDirection: RiskDirectionType
}

export interface RateBounds {
  lower: bigint
  upper: bigint
}

export interface ProvisionInfo {
  bounds: RateBounds
  notional: ProvisionDistribution
  requiredMargin: bigint
  payerDv01: bigint
  receiverDv01: bigint
}

export interface MakerFutureProvisions {
  futureId: string
  provisions: ProvisionInfo[]
}

export interface MarketPortfolio {
  descriptor: MarketDescriptor
  marginState: MarginState
  futures: FutureInfo[]
  futureOpenPositions: FutureOpenPosition[]
  futureMakerProvisions: MakerFutureProvisions[]
}

export interface OraclePackage {
  marketId: string;
  timestamp: number
  signature: string
  indexValue: bigint
}

export interface MarketOraclePackages {
  marketId: string
  packages: OraclePackage[]
}

export interface IntervalLiquidity {
  notional: bigint
  bounds: RateBounds
}

export interface LiquidityDistribution {
  totalNotional: bigint
  currentSwapRate: bigint
  intervalLiquidity: IntervalLiquidity[]
}

export interface MakerLiquidityDistribution {
  currentFutureRate: bigint
  intervalLiquidity: IntervalLiquidity[]
}
