import {SwapToken} from "../../types";
import React, {useState} from "react";
import {Box, Text} from "grommet";
import {Modal, Input} from "antd";
import { ReactComponent as ArrowDownImg } from '../../assets/arrow_down.svg'
import { SearchOutlined } from '@ant-design/icons'
import {TokensList} from "../../constants";
import styled from "styled-components";

const TokenItem = styled(Box)<{ isSelected: boolean }>`
    border: 1px solid rgb(210, 217, 238);
    padding: 6px 12px 6px 6px;
    border-radius: 16px;
    cursor: pointer;
    
    ${props => props.isSelected &&
        `background-color: rgba(76, 130, 251, 0.24);`
    }
    
    &:hover {
        background-color: rgba(152, 161, 192, 0.08);
    }
`

export const TokenSelect = (props: {
  token: SwapToken | null;
  onSelect: (token: SwapToken) => void;
}) => {
  const [isModalOpen, setModalOpen] = useState(false)

  const onTokenClick = (token: SwapToken) => {
    props.onSelect(token)
    setModalOpen(false)
  }

  return <Box
    direction={'row'}
    background={'#323232'}
    round={'26px'}
    pad={'10px 16px'}
    justify={'between'}
    align={'center'}
    gap={'16px'}
  >
    <Box
      direction={'row'}
      align={'center'}
      justify={'between'}
      onClick={() => setModalOpen(!isModalOpen)}
    >
      <Text
        size={'16px'}
        weight={'bold'}
      >
        {props.token ? props.token.name : 'Select Token'}
      </Text>
      <Box>
        <ArrowDownImg />
      </Box>
    </Box>
    <Modal
      title="Select a token"
      open={isModalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
    >
      <Input
        prefix={<SearchOutlined />}
      />
      <Box direction={'row'}>
        {TokensList.map((token) => {
          const isSelected = Boolean(props.token && props.token.id === token.id)
          return <TokenItem
            isSelected={isSelected}
            onClick={() => onTokenClick(token)}
          >
            <Text>{token.name}</Text>
          </TokenItem>
        })}
      </Box>
    </Modal>
  </Box>
}
