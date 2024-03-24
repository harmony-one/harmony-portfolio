import {Currency, CurrencyAmount} from "@uniswap/sdk-core";
import {parseUnits} from "viem";
import JSBI from 'jsbi'

const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

export const formatBigInt = (
  value: bigint,
  underlyingDecimals: bigint,
  dp = 2
) => {
  const valueNumber = +value.toString() / 10 ** +underlyingDecimals.toString()
  const [decimalPart, fractionalPart = '00'] = valueNumber.toString().split('.')
  return `${decimalPart}.${fractionalPart.slice(0, dp)}`
}

export const truncateEthAddress = (address: string | `0x${string}`) => {
  const match = address.match(truncateRegex);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// export default function tryParseCurrencyAmount<T extends Currency>(
//   value?: string,
//   currency?: T
// ): CurrencyAmount<T> | undefined {
//   if (!value || !currency) {
//     return undefined
//   }
//   try {
//     const typedValueParsed = parseUnits(value, currency.decimals).toString()
//     if (typedValueParsed !== '0') {
//       return CurrencyAmount.fromRawAmount(currency, JSBI.BigInt(typedValueParsed))
//     }
//   } catch (error) {
//     // fails if the user specifies too many decimal places of precision (or maybe exceed max uint?)
//     console.debug(`Failed to parse input amount: "${value}"`, error)
//   }
//   return undefined
// }
