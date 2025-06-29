// Chain configurations
export const CHAIN_CONFIGS = {
  ethereum: {
    id: 1,
    name: 'Ethereum',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      default: { http: ['https://eth-mainnet.g.alchemy.com/v2'] },
      public: { http: ['https://eth-mainnet.g.alchemy.com/v2'] },
    },
    blockExplorers: {
      default: { name: 'Etherscan', url: 'https://etherscan.io' },
    },
  },
  polygon: {
    id: 137,
    name: 'Polygon',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrls: {
      default: { http: ['https://polygon-rpc.com'] },
      public: { http: ['https://polygon-rpc.com'] },
    },
    blockExplorers: {
      default: { name: 'PolygonScan', url: 'https://polygonscan.com' },
    },
  },
  arbitrum: {
    id: 42161,
    name: 'Arbitrum One',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      default: { http: ['https://arb1.arbitrum.io/rpc'] },
      public: { http: ['https://arb1.arbitrum.io/rpc'] },
    },
    blockExplorers: {
      default: { name: 'Arbiscan', url: 'https://arbiscan.io' },
    },
  },
  optimism: {
    id: 10,
    name: 'Optimism',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      default: { http: ['https://mainnet.optimism.io'] },
      public: { http: ['https://mainnet.optimism.io'] },
    },
    blockExplorers: {
      default: { name: 'Optimistic Etherscan', url: 'https://optimistic.etherscan.io' },
    },
  },
} as const;

// Social login providers
export const SOCIAL_PROVIDERS_CONFIG = {
  google: {
    id: 'google',
    name: 'Google',
    icon: '🔍',
    enabled: true,
  },
  twitter: {
    id: 'twitter',
    name: 'Twitter',
    icon: '🐦',
    enabled: true,
  },
  discord: {
    id: 'discord',
    name: 'Discord',
    icon: '💬',
    enabled: true,
  },
  github: {
    id: 'github',
    name: 'GitHub',
    icon: '🐙',
    enabled: true,
  },
} as const;

// API endpoints
export const API_ENDPOINTS = {
  COINGECKO: 'https://api.coingecko.com/api/v3',
  STARTALE_BUNDLER: 'https://bundler.startale.com',
  STARTALE_PAYMASTER: 'https://paymaster.startale.com',
} as const;

// Error codes
export const ERROR_CODES = {
  AUTHENTICATION_FAILED: 'AUTH_001',
  SMART_ACCOUNT_CREATION_FAILED: 'SA_001',
  TRANSACTION_FAILED: 'TX_001',
  INSUFFICIENT_FUNDS: 'TX_002',
  NETWORK_ERROR: 'NETWORK_001',
  INVALID_ADDRESS: 'ADDR_001',
  UNSUPPORTED_CHAIN: 'CHAIN_001',
  USER_REJECTED: 'USER_001',
} as const;

// Default values
export const DEFAULTS = {
  CHAIN_ID: 1,
  GAS_LIMIT: '21000',
  CONFIRMATION_BLOCKS: 1,
  POLLING_INTERVAL: 4000,
  TIMEOUT: 30000,
} as const;

// Feature flags
export const FEATURES = {
  SOCIAL_LOGIN: true,
  SMART_ACCOUNTS: true,
  GASLESS_TRANSACTIONS: true,
  MULTI_CHAIN: true,
  CRYPTO_PREDICTIONS: true,
} as const;
