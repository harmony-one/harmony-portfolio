import styled from 'styled-components';
import { Button, Box, Spinner, Text } from 'grommet'

export type PrimaryButtonStatus = 'default' | 'success' | 'error'

export interface PrimaryButtonProps {
  status?: PrimaryButtonStatus
  disabled?: boolean
  loading?: boolean
  text?: string
  onClick?: () => void
}

const GradientButtonWrap = styled(Button)`
  padding: 1px;
  background: linear-gradient(to right, #DB70D6, #9470DB, #7079DB, #70A6DB);
  border-radius: 4px;
  transition: background-color 250ms;
    
    &:hover {
        background: linear-gradient(to right, #DB70D6, #9470DB, #7079DB, #70A6DB);
    }
`

const GradientButtonContainer = styled(Box)`
    border-radius: 4px;
    background: #292A32;
    padding: 8px;
`

const GradientButtonText = styled(Text)`
    background: linear-gradient(90.61deg, #DB70D6 11.08%, #9470DB 36.68%, #7079DB 62.68%, #70A6DB 88.67%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 500;
    padding: 0 8px;
`

export const GradientButton = (props: PrimaryButtonProps) => {
  const {
    disabled,
    loading = false,
    text = '',
    onClick,
    ...rest
  } = props

  return <Box>
    <GradientButtonWrap
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      <GradientButtonContainer>
        {loading
          ?
          <Box width={'100%'} direction={'row'} justify={'center'} align={'center'} gap={'16px'}>
            <Spinner size={'xsmall'} color={'white'} />
            <Text>{text}</Text>
          </Box>
          :
          <GradientButtonText>{text}</GradientButtonText>
        }
      </GradientButtonContainer>
    </GradientButtonWrap>
  </Box>
}

export const GradientFilledButton = styled(Button)`
    padding: 13px 16px;
    background: linear-gradient(0.25turn, #69FABD, #00AEE9);
    border: 1px solid black;
    border-radius: 32px;
`
