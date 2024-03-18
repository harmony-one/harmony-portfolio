import React from 'react'
import {Box} from 'grommet'
import {Typography, Button} from 'antd'
import { connect, disconnect } from 'wagmi/actions'
import {useConnect, useDisconnect, useAccount, useNetwork} from "wagmi";
import {truncateEthAddress} from "../../utils";

export const ConnectWallet = () => {
  const { isConnected, isConnecting, address } = useAccount()
  const { chain } = useNetwork()
  const { connectors } = useConnect()
  const { disconnectAsync } = useDisconnect()

  const metamaskConnector = connectors
    .find((item) => item.id.toLowerCase() === 'metamask')

  return <Box pad={'16px'}>
    {isConnected &&
      <Box gap={'24px'}>
        <Box>
            <Typography.Text style={{ fontSize: 'medium' }}>Connected Account</Typography.Text>
            {address &&
                <Typography.Text copyable={{ text: address }} style={{ fontSize: 'medium', fontWeight: 'bold' }}>
                  {truncateEthAddress(address)}
                </Typography.Text>
            }
        </Box>
        <Button onClick={() => {
          disconnect()
        }}>Disconnect</Button>
      </Box>
    }
    {!isConnected &&
      <Box>
          <Button
              type={'primary'}
              onClick={async () => {
                if(metamaskConnector) {
                  await disconnectAsync()
                  const res = await connect({
                    connector: metamaskConnector
                  })
                  console.log('Wallet connected:', res)
                }
              }}
          >
            {isConnecting ? 'Connecting...' : 'Connect Account'}
          </Button>
      </Box>
    }
  </Box>
}
