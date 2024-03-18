import {
  createConfig,
  configureChains,
  Chain,
} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import {EthereumClient} from "@web3modal/ethereum";
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { harmonyOne } from 'wagmi/chains'
import config from '../config'

let supportedChain: Chain = harmonyOne

// if(config.chainId === arbitrum.id) {
//   supportedChain = arbitrum
// }

// if(config.rpcUrl) {
//   supportedChain.rpcUrls = {
//     public: { http: [config.rpcUrl]},
//     default: { http: [config.rpcUrl] },
//   }
//   console.log('Init wagmi with custom RPC URL:', config.rpcUrl)
// }

const supportedChains = [supportedChain]

const { chains, publicClient, webSocketPublicClient } = configureChains(
  supportedChains,
  [publicProvider()],
)

const walletConnectConnector = new WalletConnectConnector({
  chains: supportedChains,
  options: {
    projectId: config.walletConnectProjectId,
  },
})

export const metamaskConnector = new MetaMaskConnector({ chains })

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [metamaskConnector, walletConnectConnector],
})

export const ethereumClient = new EthereumClient(wagmiConfig, chains)
