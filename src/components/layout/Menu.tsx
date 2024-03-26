import React, {ReactNode, useState} from 'react'
import {appRoutes} from "../../constants";
import {useLocation, useNavigate} from "react-router-dom";
import {Box, Text} from "grommet";
import {ReactComponent as LayoutIcon} from '../../assets/layout.svg'
import {ReactComponent as ExploreIcon} from '../../assets/explorer.svg'
import {ReactComponent as BridgeIcon} from '../../assets/bridge.svg'
import {ReactComponent as LendIcon} from '../../assets/lend.svg'
import {ReactComponent as ExchangeIcon} from '../../assets/exchange.svg'
import {ReactComponent as BrainIcon} from '../../assets/brain.svg'
import {ReactComponent as BuyIcon} from '../../assets/buy.svg'
import {capitalizeFirstLetter} from "../../utils";

const getPageByRoute = (route: string, defaultRoute = appRoutes.dashboard) => {
  const rawRoute = route.replace('/', '')
  if(rawRoute && Object.keys(appRoutes).includes(rawRoute)) {
    return rawRoute as appRoutes
  }
  return defaultRoute
}

export const getIconByRoute = (route: appRoutes) => {
  if(route === appRoutes.swap) {
    return <ExchangeIcon />
  }
  return <ExploreIcon />
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
  const location = useLocation();
  const navigate = useNavigate()
  const [selectedKey, setSelectedKey] = useState(getPageByRoute(location.pathname))

  const onMenuItemClicked = (page: appRoutes) => {
    setSelectedKey(page)
    navigate(`/${page}`)
  }

  return <Box pad={{ left: '48px' }} gap={'32px'}>
    {[appRoutes.swap, appRoutes.dashboard].map((route) => {
      const isSelected = selectedKey === route
      return <MenuItem
        key={route}
        text={capitalizeFirstLetter(route)}
        icon={getIconByRoute(route as appRoutes)}
        isSelected={isSelected}
        onClick={() => onMenuItemClicked(route as appRoutes)}
      />
    })}
  </Box>
}
