import React from 'react'
import {Button, Space, Spin, Table, Tag, Typography} from 'antd';
import type { ColumnsType } from 'antd/es/table';

export interface TokensTableItem {
  name: string
  balance: string
  price: number
  priceChange: number
  portfolioPercent: number
}

export interface TokensTableProps {
  data: TokensTableItem[]
  walletAddress: `0x${string}` | undefined
}

export const TokensTable = (props: TokensTableProps) => {
  const columns: ColumnsType<any> = [
    {
      title: 'Token',
      dataIndex: 'name',
      key: 'name',
      width: '160px',
      render: (name) => <Typography.Text>
        {name}
      </Typography.Text>,
    },
    {
      title: 'Portfolio %',
      dataIndex: 'portfolioPercent',
      key: 'portfolioPercent',
      width: '200px',
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: 'Price (24h)',
      key: 'price',
      dataIndex: 'price',
      width: '100px',
      render: (price: number) => {
        return <Typography.Text>
          ${price.toFixed(4)}
        </Typography.Text>
      },
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      width: '200px',
      render: (balance, item) => {
        return <Space>
          <Typography.Text>
            ${balance}
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
