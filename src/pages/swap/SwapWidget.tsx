import React, {useEffect, useMemo, useState} from 'react'
import { Box, Text } from 'grommet'
import {SwapToken} from "../../types";
import { ReactComponent as ArrowDownImg } from '../../assets/arrow_down.svg'
import { ReactComponent as HarmonyImg } from '../../assets/harmony.svg'
import { ReactComponent as ArrowDownLongImg } from '../../assets/arrow_down_long.svg'
import {Button, InputNumber, Modal} from "antd";
import {InputNumberProps} from "antd/es/input-number";
import styled from "styled-components";
import { TokenSelect } from './TokenSelect'
import {useAccount, useBalance, useContractWrite} from "wagmi";
import config from "../../config";
import wethABI from "../../abi/weth.json";
import {GradientFilledButton} from "../../components/button";

export type SwapSideType = 'pay' | 'receive'

interface SwapSideState {
  amount: string
  token: SwapToken | null
  balance: string
}

const defaultSwapSideState: SwapSideState = {
  amount: '0',
  token: null,
  balance: ''
}

interface SwapSideProps {
  type: SwapSideType
  data: SwapSideState
  onChangeAmount: (value: string) => void
  onChangeToken: (token: SwapToken) => void
}

type ValueType = string | number | undefined | null

const formatterHelper = (value: ValueType) => {
  const valueStr = (value || '').toString()
  const [decimalPart, fractionalPart = ''] = valueStr.split('.')
  const decimalFormatted = `${decimalPart}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const fractionalFormatted = fractionalPart ? `.${fractionalPart}` : ''
  return decimalFormatted + fractionalFormatted
}
const parserHelper = (value: ValueType) => `${value}`.replace(/\$\s?|(,*)/g, '')


const SwapSide = (props: SwapSideProps) => {
  const {
    type,
    data: { token, amount, balance },
    onChangeAmount,
    onChangeToken
  } = props

  const inputProps: InputNumberProps = {
    className: 'swap_number_input',
    controls: false,
    autoFocus: true,
    value: amount,
    formatter: formatterHelper,
    parser: parserHelper,
    style: {
      width: '100%',
      border: 'none',
      background: 'transparent',
      fontSize: '52px',
    },
    onChange: (value) => {
      onChangeAmount(value?.toString() || '')
    }
  }

  const onSelectToken = (token: SwapToken) => {
    onChangeToken(token)
  }

  return <Box
    width={'620px'}
    height={'170px'}
    direction={'row'}
    justify={'between'}
    background={'rgba(255, 255, 255, 0.22)'}
    round={'18px'}
    pad={'28px 20px'}
    style={{ position: 'relative' }}
  >
    <Box>
      <Box>
        <Text size={'18px'} weight={'bold'}>
          {type === 'pay' ? 'You pay' : 'You receive'}
        </Text>
      </Box>
      <Box width={'360px'}>
        <InputNumber {...inputProps} status={''} />
      </Box>
    </Box>
    <Box
      align={'end'}
      justify={'center'}
    >
      <TokenSelect token={token} onSelect={onSelectToken} />
      {token &&
          <Box style={{ position: 'absolute', bottom: '24px', right: '32px' }}>
              <Text>Balance: {balance.toString()}</Text>
          </Box>
      }
    </Box>
  </Box>
}

const SwapButton = styled(GradientFilledButton)`
    padding: 20px;
    text-align: center;
`

const SideSwitch = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #5F5F5F;
    border: 4px solid #323232;
    border-radius: 15px;
    padding: 14px 17px;
`

export const SwapWidget = () => {
  const { address: userAddress, isConnected } = useAccount()
  const [statePay, setStatePay] = useState<SwapSideState>(defaultSwapSideState)
  const [stateReceive, setStateReceive] = useState<SwapSideState>(defaultSwapSideState)

  const payBalance = useBalance({
    address: userAddress,
    enabled: isConnected && !statePay.token?.isNative && !!statePay.token?.address,
    token: statePay.token ? statePay.token.address as `0x${string}` : undefined
  })

  const receiveBalance = useBalance({
    address: userAddress,
    enabled: isConnected,
    token: stateReceive.token ? stateReceive.token.address as `0x${string}` : undefined
  })

  const {
    isLoading: wrapIsLoading,
    writeAsync: wrapAsync,
  } = useContractWrite({
    address: config.wrappedOneContractAddress as `0x${string}`,
    abi: wethABI,
    functionName: 'deposit',
  })

  const {
    isLoading: unwrapIsLoading,
    writeAsync: unwrapAsync,
  } = useContractWrite({
    address: config.wrappedOneContractAddress as `0x${string}`,
    abi: wethABI,
    functionName: 'withdraw',
  })

  useEffect(() => {
    if(payBalance.data) {
      setStatePay(currentState => {
        return {
          ...currentState,
          balance: payBalance.data ? payBalance.data.formatted : ''
        }
      })
    }
  }, [payBalance.data]);

  useEffect(() => {
    if(receiveBalance.data) {
      setStateReceive(currentState => {
        return {
          ...currentState,
          balance: receiveBalance.data ? receiveBalance.data.formatted : ''
        }
      })
    }
  }, [receiveBalance.data]);

  const onPayAmountChanged = (amount: string) => {
    setStatePay(currentState => {
      return {
        ...currentState,
        amount
      }
    })
  }

  const onReceiveAmountChanged = (amount: string) => {
    setStateReceive(currentState => {
      return {
        ...currentState,
        amount
      }
    })
  }

  const onPayTokenChange = (token: SwapToken) => {
    setStatePay(currentState => {
      return {
        ...currentState,
        amount: '0',
        token
      }
    })
  }

  const onReceiveTokenChange = (token: SwapToken) => {
    setStateReceive(currentState => {
      return {
        ...currentState,
        amount: '0',
        token
      }
    })
  }

  const onWrapClicked = async () => {
    try {
      const amount = 100000000000000000n
      const data = await wrapAsync({
        value: amount
      })
      console.log('Deposit result', data)
    } catch (e) {
      console.error('Failed wrap:', e)
    }
  }

  const onUnwrapClicked = async () => {
    try {
      const amount = 100000000000000000n
      const data = await unwrapAsync({
        args: [amount]
      })
      console.log('Withdraw result', data)
    } catch (e) {
      console.error('Failed wrap:', e)
    }
  }

  return <Box
    background={'#323232'}
    pad={'24px'}
    round={'28px'}
  >
    <Box gap={'4px'} style={{ position: 'relative' }}>
      <SwapSide
        type={'pay'}
        data={statePay}
        onChangeAmount={onPayAmountChanged}
        onChangeToken={onPayTokenChange}
      />
      <SwapSide
        type={'receive'}
        data={stateReceive}
        onChangeAmount={onReceiveAmountChanged}
        onChangeToken={onReceiveTokenChange}
      />
      <SideSwitch onClick={() => {
        setStatePay(stateReceive)
        setStateReceive(statePay)
      }}>
        <ArrowDownLongImg />
      </SideSwitch>
    </Box>
    <Box margin={{ top: '40px' }}>
      {statePay.token?.isNative && stateReceive.token?.id === 'WONE' ?
          <SwapButton onClick={onWrapClicked}>
              <Text color={'#323232'} size={'30px'} weight={500}>Wrap</Text>
          </SwapButton> :
        statePay.token?.id === 'WONE' && stateReceive.token?.isNative ?
          <SwapButton onClick={onUnwrapClicked}>
            <Text color={'#323232'} size={'30px'} weight={500}>Unwrap</Text>
          </SwapButton> :
        <SwapButton>
          <Text color={'#323232'} size={'30px'} weight={500}>Swap</Text>
        </SwapButton>
      }
    </Box>
  </Box>
}
