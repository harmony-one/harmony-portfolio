import React, {useEffect} from 'react'
import {Box, Text} from "grommet";
import {Outlet} from "react-router-dom";
import {AppMenu} from './Menu'
import {ConnectWallet} from "./ConnectWallet";
import {Divider} from "antd";
import {useAccount, useNetwork} from "wagmi";
import {switchNetwork} from "@wagmi/core";
import config from '../../config'
import useIsTabActive from "../../hooks/useTabActive";
import { ReactComponent as HarmonyLogo } from '../../assets/harmony-large.svg'

export const AppLayout = () => {
  // const theme = useAppTheme()
  // const setTheme = useDispatchAppTheme()
  const { address: walletAddress, isConnected } = useAccount()
  const { chain, chains } = useNetwork()
  const isTabActive = useIsTabActive()


  useEffect(() => {
    if(isTabActive && isConnected && chain && (chain.unsupported || chain.id !== config.chainId)) {
      const supportedChain = chains.find(item => item.id === config.chainId)
      if(supportedChain && supportedChain.id) {
        switchNetwork({
          chainId: supportedChain.id
        }).catch(e => {
          console.error('Failed to switch network', e)
        })
      }
    }
  }, [isTabActive, isConnected, chain, chains]);

  return <Box
    direction={'row'}
    background={'backgroundContent'}
    style={{ minHeight: '100%' }}
  >
    <Box
      width={'30%'}
      background={'backgroundMenu'}
      style={{ maxWidth: '320px', minHeight: '600px' }}
    >
      <Box pad={'38px 0'} align={'center'}>
        <Box>
          <HarmonyLogo />
          <Box margin={{ left: '54px', top: '-4px' }}>
            <Text size={'13px'}>Portfolio</Text>
          </Box>
        </Box>
      </Box>
      <Box margin={{ top: '54px' }}>
        <AppMenu />
      </Box>
      <Divider />
      <ConnectWallet />
      {/*<Box pad={'16px'}>*/}
      {/*  {theme === AppTheme.dark &&*/}
      {/*      <Box onClick={() => setTheme(AppTheme.light)}><Sun /></Box>*/}
      {/*  }*/}
      {/*  {theme === AppTheme.light &&*/}
      {/*      <Box onClick={() => setTheme(AppTheme.dark)}><Moon /></Box>*/}
      {/*  }*/}
      {/*</Box>*/}
    </Box>
    <Box width={'100%'} direction={'row'}>
      <Outlet />
    </Box>
  </Box>
}
