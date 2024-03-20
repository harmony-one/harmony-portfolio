import React from 'react'
import {Box, Text} from 'grommet'
import {SwapWidget} from "./SwapWidget";

export const Swap = () => {
  return <Box pad={'52px 32px'} width={'100%'}>
    <Box>
      <Text size={'42px'}>Swap</Text>
    </Box>
    <Box margin={{ top: '60px' }} align={'center'}>
      <SwapWidget />
    </Box>
  </Box>
}
