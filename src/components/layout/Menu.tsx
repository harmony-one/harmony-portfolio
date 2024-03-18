import React, {useState} from 'react'
import {CrownOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';
import {appRoutes} from "../../constants";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppTheme, AppTheme} from "../../hooks/useTheme";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const getPageByRoute = (route: string, defaultRoute = appRoutes.dashboard) => {
  const rawRoute = route.replace('/', '')
  if(rawRoute && Object.keys(appRoutes).includes(rawRoute)) {
    return rawRoute as appRoutes
  }
  return defaultRoute
}

export const AppMenu = () => {
  const theme = useAppTheme()
  const location = useLocation();
  const navigate = useNavigate()
  const [selectedKey, setSelectedKey] = useState(getPageByRoute(location.pathname))
  const items: MenuItem[] = [
    getItem('Dashboard', appRoutes.dashboard, <CrownOutlined />),
    getItem('Explore', appRoutes.explore, <CrownOutlined />),
  ];

  return <Menu
    theme={theme === AppTheme.light ? 'light' : 'dark'}
    onClick={(item) => {
      setSelectedKey(item.key as appRoutes)
      navigate(`/${item.key}`)
    }}
    // style={{ width: 256 }}
    defaultOpenKeys={['protocol']}
    selectedKeys={[selectedKey]}
    mode="inline"
    items={items}
  />
}
