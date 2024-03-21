import React, {useState} from 'react'
import { Box, Text } from 'grommet'
import {SwapToken} from "../../types";
import { ReactComponent as ArrowDownImg } from '../../assets/arrow_down.svg'
import { ReactComponent as HarmonyImg } from '../../assets/harmony.svg'
import { ReactComponent as ArrowDownLongImg } from '../../assets/arrow_down_long.svg'
import {Button, InputNumber, Modal} from "antd";
import {InputNumberProps} from "antd/es/input-number";
import styled from "styled-components";
import { TokenSelect } from './TokenSelect'

export type SwapSideType = 'pay' | 'receive'

interface SwapSideState {
  amount: string
  token: SwapToken | null
}

const defaultSwapSideState: SwapSideState = {
  amount: '0',
  token: null
}

const tokensList: SwapToken[] = [{
  name: 'ONE',
  decimals: 6
}]

interface SwapSideProps {
  type: SwapSideType
  data: SwapSideState
  onChangeAmount: (value: string) => void
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
    data: { token, amount },
    onChangeAmount
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

  return <Box
    width={'620px'}
    height={'170px'}
    direction={'row'}
    justify={'between'}
    background={'rgba(255, 255, 255, 0.22)'}
    round={'18px'}
    pad={'28px 20px'}
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
      <TokenSelect token={token} />
    </Box>
  </Box>
}

const SwapButton = styled(Box)`
    background: rgba(255, 255, 255, 0.9);
    border-radius: 25px;
    padding: 16px;
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
  const [statePay, setStatePay] = useState<SwapSideState>(defaultSwapSideState)
  const [stateReceive, setStateReceive] = useState<SwapSideState>(defaultSwapSideState)

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
      />
      <SwapSide
        type={'receive'}
        data={stateReceive}
        onChangeAmount={onReceiveAmountChanged}
      />
      <SideSwitch>
        <ArrowDownLongImg />
      </SideSwitch>
    </Box>
    <Box margin={{ top: '40px' }}>
      <SwapButton>
        <Text color={'#323232'} size={'30px'} weight={500}>Swap</Text>
      </SwapButton>
    </Box>
  </Box>
}
