import React from 'react'
import { Box, Text } from 'grommet'
import {useAccount, useConnect, useDisconnect} from "wagmi";
import {GradientFilledButton} from "../../button";
import {Button, Typography} from "antd";
import {truncateEthAddress} from "../../../utils";
import {connect, disconnect} from "wagmi/actions";

const ConnectedAccount = () => {
  const { address } = useAccount()

  return <Box>
    <Box gap={'32px'} direction={'row'}>
      <Box>
        {address &&
            <Typography.Text copyable={{ text: address }} style={{ fontSize: 'medium', fontWeight: 'bold' }}>
              {truncateEthAddress(address)}
            </Typography.Text>
        }
      </Box>
      <Button onClick={disconnect}>Disconnect</Button>
    </Box>
  </Box>
}

export const UserAccount = () => {
  const { isConnected } = useAccount()
  const { connectors } = useConnect()
  const { disconnectAsync } = useDisconnect()

  const metamaskConnector = connectors
    .find((item) => item.id.toLowerCase() === 'metamask')

  const onConnectClick = async () => {
    if(metamaskConnector) {
      await disconnectAsync()
      const res = await connect({
        connector: metamaskConnector
      })
      console.log('Wallet connected:', res)
    }
  }

  return <Box>
    {!isConnected &&
        <GradientFilledButton onClick={onConnectClick}>
            <Text color={'#3C3C3C'} size={'16px'} weight={600}>Connect Wallet</Text>
        </GradientFilledButton>
    }
    {isConnected &&
      <ConnectedAccount />
    }
  </Box>
}
