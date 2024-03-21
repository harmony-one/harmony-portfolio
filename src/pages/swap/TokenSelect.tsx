import {SwapToken} from "../../types";
import React, {useState} from "react";
import {Box, Text} from "grommet";
import {Modal, Input} from "antd";
import { ReactComponent as ArrowDownImg } from '../../assets/arrow_down.svg'
import { SearchOutlined } from '@ant-design/icons'

export const TokenSelect = (props: {
  token: SwapToken | null;
  onSelect?: (token: SwapToken | null) => void;
}) => {
  const { token } = props

  const [isModalOpen, setModalOpen] = useState(false)

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
        <Box onClick={() => setModalOpen(!isModalOpen)}>
            <Text size={'16px'} weight={'bold'}>Select Token</Text>
        </Box>
    }
    <Box>
      <ArrowDownImg />
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
    </Modal>
  </Box>
}
