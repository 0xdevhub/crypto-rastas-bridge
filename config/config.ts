import { reduce } from 'lodash'
import { ethereum, sepolia, polygon, polygonAmoy, base, baseSepolia, abstractTestnet } from './chains'
import { Chain } from './types'

export const allowedChains = [ethereum, sepolia, polygon, polygonAmoy, base, baseSepolia, abstractTestnet]

export const allowedChainsConfig = reduce(
  allowedChains,
  (acc, chain: Chain) => {
    acc[chain.id] = chain

    return acc
  },
  {} as { [key: number]: Chain }
)
