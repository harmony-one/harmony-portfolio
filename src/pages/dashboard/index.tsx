import React from 'react'
import {Box, Text} from "grommet";
import {TokensTable, TokensTableItem} from "./TokensTable";
import {useAccount, useBalance, useToken} from "wagmi";
import {useTokenPrice} from "../../providers/PriceProvider";

export const Dashboard = () => {
  const { address: walletAddress, isConnected } = useAccount()

  const { harmony: harmonyPrice } = useTokenPrice()

  const oneTokenBalance = useBalance({
    address: walletAddress,
    enabled: walletAddress && isConnected
  })

  const oneBalanceFormatted = oneTokenBalance.isFetched && oneTokenBalance.data && harmonyPrice
    ? (+oneTokenBalance.data.formatted * harmonyPrice).toFixed(2)
    : '0'

  const oneTokenData: TokensTableItem = {
    name: 'ONE',
    balance: oneBalanceFormatted,
    price: harmonyPrice,
    priceChange: 0,
    portfolioPercent: 100
  }

  const tokensList = oneTokenBalance.isFetched && oneTokenBalance.data
    ? [oneTokenData]
    : []

  return <Box pad={'52px 32px'} width={'100%'}>
    <Box>
      <Text size={'42px'}>Dashboard</Text>
    </Box>
    <Box margin={{ top: '32px' }}>
      <Box gap={'8px'}>
        <Text size={'24px'}>All accounts</Text>
        <Text size={'32px'} weight={'bold'}>${oneBalanceFormatted}</Text>
      </Box>
    </Box>
    <Box margin={{ top: '32px' }} width={'95%'} style={{ maxWidth: '1300px' }}>
      <TokensTable
        data={tokensList}
        walletAddress={walletAddress}
      />
    </Box>
  </Box>
}
