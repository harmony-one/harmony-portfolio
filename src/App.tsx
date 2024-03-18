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
import {lightTheme} from "./theme/grommet";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from "./config";
import {AppThemeProvider, useAppTheme} from "./hooks/useTheme";

function AppContent() {
  const theme = useAppTheme()
  return (
    <Grommet full theme={lightTheme} themeMode={'light'}>
      <ConfigProvider theme={getAntdThemeConfig(theme)}>
        <BrowserRouter>
          <WagmiConfig config={wagmiConfig}>
            <AppRoutes />
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
