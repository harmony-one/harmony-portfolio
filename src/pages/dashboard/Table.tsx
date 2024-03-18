import React from 'react'
import {Button, Space, Spin, Table, Tag, Typography} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {truncateEthAddress} from "../../utils";

export interface ResultTableProps {
  data: any[]
  walletAddress: `0x${string}` | undefined
}

export const ResultTable = (props: ResultTableProps) => {

  const columns: ColumnsType<any> = [
    {
      title: 'Token',
      dataIndex: 'token',
      key: 'token',
      width: '160px',
      render: (text) => <Typography.Text copyable={{ text }}>
        {truncateEthAddress(text)}
      </Typography.Text>,
    },
    {
      title: 'Portfolio %',
      dataIndex: 'portfolio_percent',
      key: 'portfolio_percent',
      width: '200px',
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: 'Price (24h)',
      key: 'price_24h',
      dataIndex: 'price_24h',
      width: '100px',
      render: (isLiquidatable) => {
        const color = isLiquidatable ? 'red' : 'green';
        return <Tag color={color} style={{ fontWeight: 'bold' }}>
          {isLiquidatable ? 'TRUE' : 'FALSE'}
        </Tag>
      },
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      width: '200px',
      render: (_, item) => {
        return <Space direction={'vertical'}>
          <Typography.Text>
            {'123'}
          </Typography.Text>
        </Space>
      },
    },
  ];

  return <Table
    columns={columns}
    dataSource={props.data}
    pagination={false}
  />
}
