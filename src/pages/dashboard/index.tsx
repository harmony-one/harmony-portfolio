import React from 'react'
import {Box, Text} from "grommet";
import {ResultTable} from "./Table";
import { useAccount } from "wagmi";

export const Dashboard = () => {
  const { address: walletAddress, isConnected } = useAccount()

  return <Box pad={'52px 32px'} width={'100%'}>
    <Box>
      <Text size={'42px'}>Dashboard</Text>
    </Box>
    <Box margin={{ top: '32px' }} width={'95%'} style={{ maxWidth: '1300px' }}>
      <ResultTable
        data={[]}
        walletAddress={walletAddress}
      />
    </Box>
  </Box>
}
