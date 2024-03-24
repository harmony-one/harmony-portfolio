import {SwapToken} from "./types";

export enum appRoutes {
  // buy = 'buy',
  // AI = 'AI',
  swap = 'swap',
  // pools = 'pools',
  // lend = 'lend',
  // bridge = 'bridge',
  explore = 'explore',
  dashboard = 'dashboard',
}

export const TokensList: SwapToken[] = [{
  id: 'ONE',
  name: 'ONE',
  decimals: 18,
  address: '0xcf664087a5bb0237a0bad6742852ec6c8d69a27a'
}]
