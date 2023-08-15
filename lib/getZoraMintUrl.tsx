import {
  base,
  baseGoerli,
  goerli,
  mainnet,
  optimism,
  optimismGoerli,
  zora,
  zoraTestnet,
} from "@wagmi/core/chains"

const MAINNET_URL_BASE = "https://zora.co/collect/"
const TESTNET_URL_BASE = "https://testnet.zora.co/collect/"

export const getZoraMintUrl = (chainId, contractAddress) => {
  switch (chainId) {
    case mainnet.id:
      return `${MAINNET_URL_BASE}eth:${contractAddress}`
    case optimism.id:
      return `${MAINNET_URL_BASE}oeth:${contractAddress}`
    case zora.id:
      return `${MAINNET_URL_BASE}zora:${contractAddress}`
    case base.id:
      return `${MAINNET_URL_BASE}base:${contractAddress}`
    case zoraTestnet.id:
      return `${TESTNET_URL_BASE}zgor:${contractAddress}`
    case goerli.id:
      return `${TESTNET_URL_BASE}gor:${contractAddress}`
    case optimismGoerli.id:
      return `${TESTNET_URL_BASE}ogor:${contractAddress}`
    case baseGoerli.id:
      return `${TESTNET_URL_BASE}basegor:${contractAddress}`
    default:
      throw new Error(`Unsupported chainId: ${chainId}`)
  }
}
