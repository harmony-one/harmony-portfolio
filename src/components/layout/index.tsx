import React, {useEffect} from 'react'
import {Box, Text} from "grommet";
import {Outlet} from "react-router-dom";
import {AppMenu} from './Menu'
import {ConnectWallet} from "./ConnectWallet";
import {Divider} from "antd";
import {AppTheme, useAppTheme, useDispatchAppTheme} from "../../hooks/useTheme";
import {Moon, Sun} from "grommet-icons";
import {useAccount, useNetwork} from "wagmi";
import {switchNetwork} from "@wagmi/core";
import config from '../../config'
import useIsTabActive from "../../hooks/useTabActive";

export const AppLayout = () => {
  const theme = useAppTheme()
  const setTheme = useDispatchAppTheme()
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
    background={theme === AppTheme.light ? '#f5f7ff' : 'black'}
    style={{ minHeight: '100%' }}
  >
    <Box
      width={'30%'}
      margin={'32px'}
      background={theme === AppTheme.light ? 'white' : '#1e1e1e'}
      round={'12px'}
      style={{ maxWidth: '320px', minHeight: '600px' }}
    >
      <Box pad={'38px 0'} align={'center'} gap={'4px'}>
        <Text size={'xlarge'}>PORTFOLIO</Text>
      </Box>
      <AppMenu />
      <Divider />
      <ConnectWallet />
      <Box pad={'16px'}>
        {theme === AppTheme.dark &&
            <Box onClick={() => setTheme(AppTheme.light)}><Sun /></Box>
        }
        {theme === AppTheme.light &&
            <Box onClick={() => setTheme(AppTheme.dark)}><Moon /></Box>
        }
      </Box>
    </Box>
    <Box width={'100%'} direction={'row'}>
      <Outlet />
    </Box>
  </Box>
}
