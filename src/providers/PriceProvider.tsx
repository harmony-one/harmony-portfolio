import React, {createContext, useContext, useState, PropsWithChildren, useEffect} from 'react';
import usePoller from "../hooks/usePoller";
import {getTokensPrice} from "../api/coingecko";

interface PriceState {
  [key: string]: number;
}

const pricesLocalStorageKey = 'h_portfolio_token_prices'

const getInitialState = (): PriceState => {
  try {
    const rawData = localStorage.getItem(pricesLocalStorageKey)
    if(rawData) {
      const data = JSON.parse(rawData)
      return data as PriceState
    }
  } catch (e) {}
  return {
    ethereum: 0,
    tether: 0,
    one: 0
  };
}

const initialState = getInitialState()
const PriceContext = createContext(initialState);
const pollingInterval = 30 * 60 * 1000

export const useTokenPrice = () => useContext(PriceContext);

export const PriceProvider : React.FC<PropsWithChildren<unknown>> = ({children}) => {
  const [ethereum, setEthereumPrice] = useState<number>(initialState.ethereum)
  const [tether, setTetherPrice] = useState<number>(initialState.tether)
  const [harmony, setHarmonyPrice] = useState<number>(initialState.harmony)

  const updateLocalStorageCache = () => {
    try {
      localStorage.setItem(pricesLocalStorageKey, JSON.stringify({
        ethereum,
        tether,
        harmony
      }))
    } catch (e) {}
  }

  useEffect(() => {
    updateLocalStorageCache()
  }, [ethereum, tether, harmony])

  usePoller(async () => {
    try {
      const tokensMap = {
        tether: 'tether',
        ethereum: 'ethereum',
        harmony: 'harmony',
      }
      const currency = 'usd'
      const data = await getTokensPrice(Object.keys(tokensMap), currency)
      if(data) {
        console.log('data', data)
        if(data[tokensMap.tether] && data[tokensMap.tether][currency]) {
          const price = data[tokensMap.tether][currency]
          setTetherPrice(price)
          console.log('PriceProvider: set new tether price:', price)
        }
        if(data[tokensMap.ethereum] && data[tokensMap.ethereum][currency]) {
          const price = data[tokensMap.ethereum][currency]
          setEthereumPrice(price)
          console.log('PriceProvider: set new ETH price:', price)
        }
        if(data[tokensMap.harmony] && data[tokensMap.harmony][currency]) {
          const price = data[tokensMap.harmony][currency]
          setHarmonyPrice(price)
          console.log('PriceProvider: set new Harmony price:', price)
        }
      }
    } catch (e) {
      console.error('PriceProvider: cannot get Coingecko rates for Tether & Ethereum:', e)
    }
  }, pollingInterval)

  return <PriceContext.Provider value={{ethereum, tether, harmony}}>
    {children}
  </PriceContext.Provider>
};
