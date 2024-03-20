import React from 'react';
import { Grommet } from 'grommet';
import {AppRoutes} from "./Routes";
import {BrowserRouter} from "react-router-dom";
import {ConfigProvider} from "antd";
import {getAntdThemeConfig} from "./theme/antd";
import './App.css'
import {WagmiConfig} from "wagmi";
import {ethereumClient, wagmiConfig} from "./modules/wagmi";
import {Web3Modal} from "@web3modal/react";
import {darkTheme, lightTheme} from "./theme/grommet";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AppThemeProvider, useAppTheme} from "./hooks/useTheme";
import {PriceProvider} from "./providers/PriceProvider";

function AppContent() {
  const theme = useAppTheme()

  return (
    <Grommet full theme={theme === 'light' ? lightTheme : darkTheme} themeMode={theme}>
      <ConfigProvider theme={getAntdThemeConfig(theme)}>
        <BrowserRouter>
          <WagmiConfig config={wagmiConfig}>
            <PriceProvider>
              <AppRoutes />
            </PriceProvider>
          </WagmiConfig>
        </BrowserRouter>
      </ConfigProvider>
      <Web3Modal
        ethereumClient={ethereumClient}
        projectId={'1234'}
      />
      <ToastContainer />
    </Grommet>);
}

function App() {
  return (
    <AppThemeProvider>
      <AppContent />
    </AppThemeProvider>);
}

export default App;
