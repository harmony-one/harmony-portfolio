import React from 'react'
import {Box, Text} from "grommet";
import {Outlet} from "react-router-dom";
import {AppMenu} from './Menu'
import {ConnectWallet} from "./ConnectWallet";
import {Divider} from "antd";
import {AppTheme, useAppTheme, useDispatchAppTheme} from "../../hooks/useTheme";
import {Moon, Sun} from "grommet-icons";

export const AppLayout = () => {
  const theme = useAppTheme()
  const setTheme = useDispatchAppTheme()

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
