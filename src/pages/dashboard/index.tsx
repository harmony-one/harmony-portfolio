import React from 'react'
import {Box, Text} from "grommet";
import {ResultTable} from "./Table";
import {useAccount, useBalance} from "wagmi";
import {useTokenPrice} from "../../providers/PriceProvider";

export const Dashboard = () => {
  const { address: walletAddress, isConnected } = useAccount()

  const { harmony } = useTokenPrice()
  console.log('harmony', harmony)

  const oneTokenBalance = useBalance({
    address: walletAddress,
    enabled: walletAddress && isConnected
  })

  const oneBalanceFormatted = oneTokenBalance.isFetched && oneTokenBalance.data && harmony
    ? (+oneTokenBalance.data.formatted * harmony).toFixed(2)
    : '0'

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
      <ResultTable
        data={[]}
        walletAddress={walletAddress}
      />
    </Box>
  </Box>
}
