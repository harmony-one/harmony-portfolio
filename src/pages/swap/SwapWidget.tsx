import React, {useState} from 'react'
import { Box, Text } from 'grommet'
import {SwapToken} from "../../types";
import { ReactComponent as ArrowDownImg } from '../../assets/arrow_down.svg'
import { ReactComponent as HarmonyImg } from '../../assets/harmony.svg'
import { ReactComponent as ArrowDownLongImg } from '../../assets/arrow_down_long.svg'
import {Button, InputNumber} from "antd";
import {InputNumberProps} from "antd/es/input-number";
import styled from "styled-components";

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


const TokenSelect = (props: {
  token: SwapToken | null;
  onSelect?: (token: SwapToken | null) => void;
}) => {
  const { token } = props

  return <Box
    direction={'row'}
    background={'#323232'}
    round={'26px'}
    pad={'10px 16px'}
    justify={'between'}
    align={'center'}
    gap={'16px'}
  >
    {!token &&
        <Box>
            <Text size={'16px'} weight={'bold'}>Select Token</Text>
        </Box>
    }
    <Box>
      <ArrowDownImg />
    </Box>
  </Box>
}

interface SwapSideProps {
  type: SwapSideType
  data: SwapSideState
}

const SwapSide = (props: SwapSideProps) => {
  const { type, data: { token, amount } } = props

  const inputProps: InputNumberProps = {
    className: 'swap_number_input',
    controls: false,
    autoFocus: true,
    value: amount,
    style: {
      width: '100%',
      border: 'none',
      background: 'transparent',
      fontSize: '52px',
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

  return <Box
    background={'#323232'}
    pad={'24px'}
    round={'28px'}
  >
    <Box gap={'4px'} style={{ position: 'relative' }}>
      <SwapSide type={'pay'} data={statePay} />
      <SwapSide type={'receive'} data={stateReceive} />
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
