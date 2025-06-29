import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import { createPublicClient, createWalletClient, http, custom } from 'viem';
import { mainnet, polygon, arbitrum, optimism } from 'viem/chains';

// Web3 State
interface Web3State {
  isConnected: boolean;
  address: string | null;
  chainId: number;
  balance: string;
  isLoading: boolean;
  error: string | null;
  client: any | null;
}

type Web3Action =
  | { type: 'CONNECT_START' }
  | { type: 'CONNECT_SUCCESS'; payload: { address: string; chainId: number } }
  | { type: 'CONNECT_ERROR'; payload: { error: string } }
  | { type: 'DISCONNECT' }
  | { type: 'CHAIN_CHANGED'; payload: { chainId: number } }
  | { type: 'BALANCE_UPDATED'; payload: { balance: string } }
  | { type: 'SET_CLIENT'; payload: { client: any } };

const initialState: Web3State = {
  isConnected: false,
  address: null,
  chainId: 1,
  balance: '0',
  isLoading: false,
  error: null,
  client: null,
};

function web3Reducer(state: Web3State, action: Web3Action): Web3State {
  switch (action.type) {
    case 'CONNECT_START':
      return { ...state, isLoading: true, error: null };
    case 'CONNECT_SUCCESS':
      return {
        ...state,
        isConnected: true,
        address: action.payload.address,
        chainId: action.payload.chainId,
        isLoading: false,
        error: null,
      };
    case 'CONNECT_ERROR':
      return {
        ...state,
        isConnected: false,
        isLoading: false,
        error: action.payload.error,
      };
    case 'DISCONNECT':
      return { ...initialState };
    case 'CHAIN_CHANGED':
      return { ...state, chainId: action.payload.chainId };
    case 'BALANCE_UPDATED':
      return { ...state, balance: action.payload.balance };
    case 'SET_CLIENT':
      return { ...state, client: action.payload.client };
    default:
      return state;
  }
}

const Web3Context = createContext<{
  state: Web3State;
  dispatch: React.Dispatch<Web3Action>;
  connect: () => Promise<void>;
  disconnect: () => void;
  switchChain: (chainId: number) => Promise<void>;
  getBalance: () => Promise<void>;
} | null>(null);

interface Web3ProviderProps {
  children: ReactNode;
}

const SUPPORTED_CHAINS = [mainnet, polygon, arbitrum, optimism];

export function Web3Provider({ children }: Web3ProviderProps) {
  const [state, dispatch] = useReducer(web3Reducer, initialState);

  // Initialize client
  useEffect(() => {
    const chain = SUPPORTED_CHAINS.find(c => c.id === state.chainId) || mainnet;
    const client = createPublicClient({
      chain,
      transport: http(),
    });
    dispatch({ type: 'SET_CLIENT', payload: { client } });
  }, [state.chainId]);

  const connect = async () => {
    dispatch({ type: 'CONNECT_START' });
    
    try {
      if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('No wallet detected');
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      });

      dispatch({
        type: 'CONNECT_SUCCESS',
        payload: {
          address: accounts[0],
          chainId: parseInt(chainId, 16),
        },
      });

      // Get balance after connecting
      await getBalance();
    } catch (error: any) {
      dispatch({
        type: 'CONNECT_ERROR',
        payload: { error: error.message },
      });
    }
  };

  const disconnect = () => {
    dispatch({ type: 'DISCONNECT' });
  };

  const switchChain = async (chainId: number) => {
    try {
      if (!window.ethereum) return;

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });

      dispatch({ type: 'CHAIN_CHANGED', payload: { chainId } });
    } catch (error: any) {
      // Chain not added to wallet
      if (error.code === 4902) {
        const chain = SUPPORTED_CHAINS.find(c => c.id === chainId);
        if (chain && window.ethereum) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${chainId.toString(16)}`,
                chainName: chain.name,
                nativeCurrency: chain.nativeCurrency,
                rpcUrls: [chain.rpcUrls.default.http[0]],
                blockExplorerUrls: chain.blockExplorers?.default ? [chain.blockExplorers.default.url] : [],
              },
            ],
          });
          dispatch({ type: 'CHAIN_CHANGED', payload: { chainId } });
        }
      }
    }
  };

  const getBalance = async () => {
    if (!state.address || !state.client) return;

    try {
      const balance = await state.client.getBalance({
        address: state.address,
      });
      
      dispatch({
        type: 'BALANCE_UPDATED',
        payload: { balance: balance.toString() },
      });
    } catch (error) {
      console.error('Failed to get balance:', error);
    }
  };

  // Listen for account and chain changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnect();
      } else {
        dispatch({
          type: 'CONNECT_SUCCESS',
          payload: {
            address: accounts[0],
            chainId: state.chainId,
          },
        });
      }
    };

    const handleChainChanged = (chainId: string) => {
      dispatch({
        type: 'CHAIN_CHANGED',
        payload: { chainId: parseInt(chainId, 16) },
      });
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [state.chainId]);

  // Check if already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window === 'undefined' || !window.ethereum) return;

      try {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });

        if (accounts.length > 0) {
          const chainId = await window.ethereum.request({
            method: 'eth_chainId',
          });

          dispatch({
            type: 'CONNECT_SUCCESS',
            payload: {
              address: accounts[0],
              chainId: parseInt(chainId, 16),
            },
          });
        }
      } catch (error) {
        console.error('Failed to check connection:', error);
      }
    };

    checkConnection();
  }, []);

  const value = {
    state,
    dispatch,
    connect,
    disconnect,
    switchChain,
    getBalance,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}

// Utility hooks
export function useWallet() {
  const { state, connect, disconnect } = useWeb3();
  return {
    isConnected: state.isConnected,
    address: state.address,
    balance: state.balance,
    connect,
    disconnect,
  };
}

export function useChain() {
  const { state, switchChain } = useWeb3();
  return {
    chainId: state.chainId,
    switchChain,
  };
}

// Type declarations
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (eventName: string, handler: (...args: any[]) => void) => void;
      removeListener: (eventName: string, handler: (...args: any[]) => void) => void;
    };
  }
}
