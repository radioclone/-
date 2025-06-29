import { ReactNode } from 'react';

// Core Types
export interface User {
  id: string;
  address: string;
  socialProvider?: 'google' | 'twitter' | 'discord' | 'github';
  socialId?: string;
  smartAccountAddress?: string;
  isSmartAccount: boolean;
  createdAt: Date;
  lastLogin: Date;
}

export interface SmartAccount {
  address: string;
  owner: string;
  factoryAddress: string;
  implementationAddress: string;
  saltNonce: string;
  isDeployed: boolean;
  chainId: number;
}

// Authentication Types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  smartAccount: SmartAccount | null;
}

export interface SocialLoginProvider {
  id: string;
  name: string;
  icon: string;
  clientId: string;
  enabled: boolean;
}

// Web3 Types
export interface ChainConfig {
  id: number;
  name: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: {
    default: { http: string[] };
    public: { http: string[] };
  };
  blockExplorers: {
    default: { name: string; url: string };
  };
  testnet?: boolean;
}

export interface TransactionConfig {
  to: string;
  value?: string;
  data?: string;
  gasLimit?: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
}

export interface UserOperation {
  sender: string;
  nonce: string;
  initCode: string;
  callData: string;
  callGasLimit: string;
  verificationGasLimit: string;
  preVerificationGas: string;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
  paymasterAndData: string;
  signature: string;
}

// Crypto Prediction Types
export interface CryptoPrediction {
  symbol: string;
  currentPrice: number;
  predictedPrice: number;
  timeframe: '1h' | '1d' | '1w' | '1m';
  confidence: number;
  factors: string[];
  timestamp: Date;
}

export interface PriceData {
  timestamp: number;
  price: number;
  volume: number;
  marketCap: number;
}

export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  marketCap: number;
  volume24h: number;
  priceHistory: PriceData[];
}

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export interface LoadingProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'pulse' | 'skeleton';
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

// State Management Types
export interface AppState {
  auth: AuthState;
  web3: {
    chainId: number;
    isConnected: boolean;
    selectedChain: ChainConfig;
  };
  ui: {
    theme: 'light' | 'dark';
    sidebarOpen: boolean;
    notifications: Notification[];
  };
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  dismissible: boolean;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Event Types
export type Web3Event = 
  | { type: 'ACCOUNT_CONNECTED'; payload: { address: string; chainId: number } }
  | { type: 'ACCOUNT_DISCONNECTED' }
  | { type: 'CHAIN_CHANGED'; payload: { chainId: number } }
  | { type: 'TRANSACTION_SENT'; payload: { hash: string } }
  | { type: 'TRANSACTION_CONFIRMED'; payload: { hash: string; blockNumber: number } }
  | { type: 'SMART_ACCOUNT_CREATED'; payload: { address: string; owner: string } };

export type AuthEvent =
  | { type: 'LOGIN_SUCCESS'; payload: { user: User } }
  | { type: 'LOGIN_FAILED'; payload: { error: string } }
  | { type: 'LOGOUT' }
  | { type: 'SOCIAL_LOGIN_INITIATED'; payload: { provider: string } };

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Constants
export const SUPPORTED_CHAINS = [1, 137, 42161, 10] as const;
export const SOCIAL_PROVIDERS = ['google', 'twitter', 'discord', 'github'] as const;
export const TIMEFRAMES = ['1h', '1d', '1w', '1m'] as const;

export type SupportedChain = typeof SUPPORTED_CHAINS[number];
export type SocialProvider = typeof SOCIAL_PROVIDERS[number];
export type Timeframe = typeof TIMEFRAMES[number];
