// Web3 utilities for the ecosystem
export type Address = string;

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

// Chain configurations
const CHAIN_CONFIGS: Record<string, ChainConfig> = {
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
};

// Web3 client factory
export function createWeb3Client(chainId: number) {
  const chain = getChainConfig(chainId);
  
  // Simplified client creation - replace with actual viem implementation
  return { 
    publicClient: {
      chain,
      estimateGas: async (tx: any) => BigInt(21000),
      getGasPrice: async () => BigInt(20000000000),
      getBlock: async () => ({ baseFeePerGas: BigInt(10000000000) }),
      getBytecode: async () => '0x',
      readContract: async () => 'result',
    }
  };
}

// Chain utilities
export function getChainConfig(chainId: number): ChainConfig {
  const configs = Object.values(CHAIN_CONFIGS);
  const config = configs.find(c => c.id === chainId);
  
  if (!config) {
    throw new Error(`Unsupported chain ID: ${chainId}`);
  }
  
  return config;
}

export function getSupportedChains(): ChainConfig[] {
  return Object.values(CHAIN_CONFIGS);
}

export function isChainSupported(chainId: number): boolean {
  return Object.values(CHAIN_CONFIGS).some(config => config.id === chainId);
}

// Address utilities
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function checksumAddress(address: string): Address {
  // Basic checksum implementation - in production, use viem's getAddress
  return address.toLowerCase();
}

export function compareAddresses(a: string, b: string): boolean {
  return a.toLowerCase() === b.toLowerCase();
}

// Transaction utilities
export async function estimateGas(
  publicClient: any,
  transaction: TransactionConfig
): Promise<bigint> {
  try {
    const gasEstimate = await publicClient.estimateGas({
      to: transaction.to,
      value: transaction.value ? BigInt(transaction.value) : undefined,
      data: transaction.data,
    });
    
    // Add 20% buffer for safety
    return (gasEstimate * BigInt(120)) / BigInt(100);
  } catch (error) {
    console.error('Gas estimation failed:', error);
    throw new Error('Failed to estimate gas');
  }
}

export async function getGasPrice(publicClient: any): Promise<{
  gasPrice: bigint;
  maxFeePerGas: bigint;
  maxPriorityFeePerGas: bigint;
}> {
  try {
    const gasPrice = await publicClient.getGasPrice();
    const block = await publicClient.getBlock({ blockTag: 'latest' });
    
    // EIP-1559 fee calculation
    const baseFee = block.baseFeePerGas || BigInt(0);
    const maxPriorityFeePerGas = BigInt(2_000_000_000); // 2 gwei
    const maxFeePerGas = baseFee * BigInt(2) + maxPriorityFeePerGas;
    
    return {
      gasPrice,
      maxFeePerGas,
      maxPriorityFeePerGas,
    };
  } catch (error) {
    console.error('Failed to get gas price:', error);
    throw new Error('Failed to get gas price');
  }
}

// Smart Account utilities
export function generateSmartAccountAddress(
  owner: Address,
  factoryAddress: Address,
  saltNonce: string
): Address {
  // This is a simplified implementation
  // In production, use the actual factory contract's getAddress method
  const hash = `${owner}${factoryAddress}${saltNonce}`;
  return `0x${hash.slice(-40)}`;
}

export function isSmartAccountDeployed(
  publicClient: any,
  smartAccountAddress: Address
): Promise<boolean> {
  return publicClient.getBytecode({ address: smartAccountAddress })
    .then((bytecode: string) => bytecode !== '0x')
    .catch(() => false);
}

// Token utilities
export async function getTokenBalance(
  publicClient: any,
  tokenAddress: Address,
  accountAddress: Address
): Promise<bigint> {
  try {
    const balance = await publicClient.readContract({
      address: tokenAddress,
      abi: [
        {
          name: 'balanceOf',
          type: 'function',
          stateMutability: 'view',
          inputs: [{ name: 'account', type: 'address' }],
          outputs: [{ name: '', type: 'uint256' }],
        },
      ],
      functionName: 'balanceOf',
      args: [accountAddress],
    });
    
    return balance as bigint;
  } catch (error) {
    console.error('Failed to get token balance:', error);
    return BigInt(0);
  }
}

export async function getTokenInfo(
  publicClient: any,
  tokenAddress: Address
): Promise<{
  name: string;
  symbol: string;
  decimals: number;
}> {
  try {
    const [name, symbol, decimals] = await Promise.all([
      publicClient.readContract({
        address: tokenAddress,
        abi: [{ name: 'name', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ name: '', type: 'string' }] }],
        functionName: 'name',
      }),
      publicClient.readContract({
        address: tokenAddress,
        abi: [{ name: 'symbol', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ name: '', type: 'string' }] }],
        functionName: 'symbol',
      }),
      publicClient.readContract({
        address: tokenAddress,
        abi: [{ name: 'decimals', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ name: '', type: 'uint8' }] }],
        functionName: 'decimals',
      }),
    ]);
    
    return {
      name: name as string,
      symbol: symbol as string,
      decimals: decimals as number,
    };
  } catch (error) {
    console.error('Failed to get token info:', error);
    throw new Error('Failed to get token information');
  }
}

// Network utilities
export async function switchChain(chainId: number): Promise<void> {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('No wallet connection detected');
  }

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    });
  } catch (error: any) {
    // Chain not added to wallet
    if (error.code === 4902) {
      const chainConfig = getChainConfig(chainId);
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: chainConfig.name,
            nativeCurrency: chainConfig.nativeCurrency,
            rpcUrls: chainConfig.rpcUrls.default.http,
            blockExplorerUrls: [chainConfig.blockExplorers.default.url],
          },
        ],
      });
    } else {
      throw error;
    }
  }
}

// Wallet utilities
export async function connectWallet(): Promise<Address[]> {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('No wallet detected');
  }

  try {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    return accounts.map((account: string) => account);
  } catch (error) {
    console.error('Failed to connect wallet:', error);
    throw new Error('Failed to connect wallet');
  }
}

export async function getConnectedAccounts(): Promise<Address[]> {
  if (typeof window === 'undefined' || !window.ethereum) {
    return [];
  }

  try {
    const accounts = await window.ethereum.request({
      method: 'eth_accounts',
    });
    return accounts.map((account: string) => account);
  } catch (error) {
    console.error('Failed to get connected accounts:', error);
    return [];
  }
}

// Error handling utilities
export function parseWeb3Error(error: any): {
  code: string;
  message: string;
  details?: any;
} {
  if (error.code === 4001) {
    return {
      code: 'USER_REJECTED',
      message: 'User rejected the request',
    };
  }
  
  if (error.code === -32603) {
    return {
      code: 'INTERNAL_ERROR',
      message: 'Internal JSON-RPC error',
      details: error.data,
    };
  }
  
  if (error.message?.includes('insufficient funds')) {
    return {
      code: 'INSUFFICIENT_FUNDS',
      message: 'Insufficient funds for transaction',
    };
  }
  
  return {
    code: 'UNKNOWN_ERROR',
    message: error.message || 'An unknown error occurred',
    details: error,
  };
}

// Type declarations for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (eventName: string, handler: (...args: any[]) => void) => void;
      removeListener: (eventName: string, handler: (...args: any[]) => void) => void;
    };
  }
}
