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
