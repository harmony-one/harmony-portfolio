import React, {ReactNode, useState} from 'react'
import {appRoutes} from "../../constants";
import {useLocation, useNavigate} from "react-router-dom";
import {Box, Text} from "grommet";
import {useAppTheme} from "../../hooks/useTheme";
import {ReactComponent as LayoutIcon} from '../../assets/layout.svg'
import {ReactComponent as ExplorerIcon} from '../../assets/explorer.svg'

const getPageByRoute = (route: string, defaultRoute = appRoutes.dashboard) => {
  const rawRoute = route.replace('/', '')
  if(rawRoute && Object.keys(appRoutes).includes(rawRoute)) {
    return rawRoute as appRoutes
  }
  return defaultRoute
}

const MenuItem = (props: {
  text: string;
  icon: ReactNode;
  isSelected: boolean
  onClick: () => void
}) => {
  const { text, icon, isSelected, onClick } = props

  const weight = isSelected ? 'bold' : 400

  return <Box direction={'row'} gap={'12px'} onClick={onClick}>
    <Box>{icon}</Box>
    <Box>
      <Text weight={weight} size={'17px'}>{text}</Text>
    </Box>
  </Box>
}

export const AppMenu = () => {
  const theme = useAppTheme()
  const location = useLocation();
  const navigate = useNavigate()
  const [selectedKey, setSelectedKey] = useState(getPageByRoute(location.pathname))

  const onMenuItemClicked = (page: appRoutes) => {
    setSelectedKey(page)
    navigate(`/${page}`)
  }

  return <Box pad={{ left: '48px' }} gap={'32px'}>
    <MenuItem
      text={'Explore'}
      icon={<ExplorerIcon />}
      isSelected={selectedKey === appRoutes.explore}
      onClick={() => onMenuItemClicked(appRoutes.explore)}
    />
    <MenuItem
      text={'Dashboard'}
      icon={<LayoutIcon />}
      isSelected={selectedKey === appRoutes.dashboard}
      onClick={() => onMenuItemClicked(appRoutes.dashboard)}
    />
  </Box>
}
