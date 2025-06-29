import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import { Web3Auth } from '@web3auth/modal';
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from '@web3auth/base';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';

// Auth State
interface AuthState {
  isInitialized: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  smartAccount: SmartAccount | null;
  error: string | null;
}

interface User {
  id: string;
  email?: string;
  name?: string;
  profileImage?: string;
  verifier: string;
  verifierId: string;
  typeOfLogin: string;
  aggregateVerifier?: string;
  dappShare?: string;
  oAuthIdToken?: string;
  oAuthAccessToken?: string;
  appState?: string;
  touchIDPreference?: string;
  isMfaEnabled?: boolean;
}

interface SmartAccount {
  address: string;
  owner: string;
  isDeployed: boolean;
  chainId: number;
}

type AuthAction =
  | { type: 'INIT_START' }
  | { type: 'INIT_SUCCESS' }
  | { type: 'INIT_ERROR'; payload: { error: string } }
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User } }
  | { type: 'LOGIN_ERROR'; payload: { error: string } }
  | { type: 'LOGOUT' }
  | { type: 'CREATE_SMART_ACCOUNT'; payload: { smartAccount: SmartAccount } }
  | { type: 'SET_ERROR'; payload: { error: string } };

const initialState: AuthState = {
  isInitialized: false,
  isAuthenticated: false,
  isLoading: false,
  user: null,
  smartAccount: null,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'INIT_START':
      return { ...state, isLoading: true, error: null };
    case 'INIT_SUCCESS':
      return { ...state, isInitialized: true, isLoading: false };
    case 'INIT_ERROR':
      return { ...state, isLoading: false, error: action.payload.error };
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: action.payload.error,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        isInitialized: state.isInitialized,
      };
    case 'CREATE_SMART_ACCOUNT':
      return {
        ...state,
        smartAccount: action.payload.smartAccount,
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
}

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  loginWithSocial: (provider: string) => Promise<void>;
  logout: () => Promise<void>;
  createSmartAccount: () => Promise<void>;
  web3auth: Web3Auth | null;
} | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const clientId = process.env.REACT_APP_WEB3AUTH_CLIENT_ID || "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ";

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [web3auth, setWeb3auth] = React.useState<Web3Auth | null>(null);

  // Initialize Web3Auth
  useEffect(() => {
    const init = async () => {
      dispatch({ type: 'INIT_START' });

      try {
        const chainConfig = {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x1", // Ethereum Mainnet
          rpcTarget: "https://rpc.ankr.com/eth",
          displayName: "Ethereum Mainnet",
          blockExplorerUrl: "https://etherscan.io",
          ticker: "ETH",
          tickerName: "Ethereum",
          logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
        };

        const privateKeyProvider = new EthereumPrivateKeyProvider({
          config: { chainConfig },
        });

        const web3authInstance = new Web3Auth({
          clientId,
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
          privateKeyProvider,
          uiConfig: {
            appName: "VorteX Web3 Ecosystem",
            mode: "dark",
            loginMethodsOrder: ["google", "github", "twitter", "discord"],
            logoLight: "https://web3auth.io/images/web3authlog.png",
            logoDark: "https://web3auth.io/images/web3authlogodark.png",
            defaultLanguage: "en",
            theme: {
              primary: "#768729",
            },
          },
        });

        await web3authInstance.initModal();
        setWeb3auth(web3authInstance);

        // Check if user is already logged in
        if (web3authInstance.connectedAdapterName) {
          const userInfo = await web3authInstance.getUserInfo();
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
              user: {
                id: userInfo.verifierId || '',
                email: userInfo.email,
                name: userInfo.name,
                profileImage: userInfo.profileImage,
                verifier: userInfo.verifier || '',
                verifierId: userInfo.verifierId || '',
                typeOfLogin: userInfo.typeOfLogin?.toString() || '',
                aggregateVerifier: userInfo.aggregateVerifier,
                dappShare: userInfo.dappShare,
                oAuthIdToken: userInfo.oAuthIdToken,
                oAuthAccessToken: userInfo.oAuthAccessToken,
                appState: userInfo.appState,
                touchIDPreference: userInfo.touchIDPreference,
                isMfaEnabled: userInfo.isMfaEnabled,
              },
            },
          });
        }

        dispatch({ type: 'INIT_SUCCESS' });
      } catch (error: any) {
        console.error('Web3Auth initialization failed:', error);
        dispatch({
          type: 'INIT_ERROR',
          payload: { error: error.message || 'Failed to initialize authentication' },
        });
      }
    };

    init();
  }, []);

  const loginWithSocial = async (provider: string) => {
    if (!web3auth) {
      dispatch({ type: 'SET_ERROR', payload: { error: 'Web3Auth not initialized' } });
      return;
    }

    dispatch({ type: 'LOGIN_START' });

    try {
      const web3authProvider = await web3auth.connect();
      
      if (!web3authProvider) {
        throw new Error('Failed to connect with Web3Auth');
      }

      const userInfo = await web3auth.getUserInfo();
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: {
            id: userInfo.verifierId || '',
            email: userInfo.email,
            name: userInfo.name,
            profileImage: userInfo.profileImage,
            verifier: userInfo.verifier || '',
            verifierId: userInfo.verifierId || '',
            typeOfLogin: userInfo.typeOfLogin?.toString() || '',
            aggregateVerifier: userInfo.aggregateVerifier,
            dappShare: userInfo.dappShare,
            oAuthIdToken: userInfo.oAuthIdToken,
            oAuthAccessToken: userInfo.oAuthAccessToken,
            appState: userInfo.appState,
            touchIDPreference: userInfo.touchIDPreference,
            isMfaEnabled: userInfo.isMfaEnabled,
          },
        },
      });

      // Auto-create smart account after successful login
      await createSmartAccount();
    } catch (error: any) {
      console.error('Social login failed:', error);
      dispatch({
        type: 'LOGIN_ERROR',
        payload: { error: error.message || 'Login failed' },
      });
    }
  };

  const logout = async () => {
    if (!web3auth) return;

    try {
      await web3auth.logout();
      dispatch({ type: 'LOGOUT' });
    } catch (error: any) {
      console.error('Logout failed:', error);
      dispatch({ type: 'SET_ERROR', payload: { error: error.message } });
    }
  };

  const createSmartAccount = async () => {
    if (!web3auth || !state.user) {
      dispatch({ type: 'SET_ERROR', payload: { error: 'User not authenticated' } });
      return;
    }

    try {
      // Get the private key from Web3Auth
      const provider = await web3auth.provider;
      if (!provider) {
        throw new Error('No provider available');
      }

      // This is a simplified smart account creation
      // In production, you would use proper AA SDK like Pimlico/Alchemy
      const accounts = await provider.request({ method: 'eth_accounts' }) as string[];
      const ownerAddress = accounts[0];

      // Generate smart account address (simplified)
      const smartAccountAddress = `0x${Math.random().toString(16).substring(2, 42)}`;

      const smartAccount: SmartAccount = {
        address: smartAccountAddress,
        owner: ownerAddress,
        isDeployed: false,
        chainId: 1,
      };

      dispatch({
        type: 'CREATE_SMART_ACCOUNT',
        payload: { smartAccount },
      });
    } catch (error: any) {
      console.error('Smart account creation failed:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: { error: error.message || 'Failed to create smart account' },
      });
    }
  };

  const value = {
    state,
    dispatch,
    loginWithSocial,
    logout,
    createSmartAccount,
    web3auth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Utility hooks
export function useUser() {
  const { state } = useAuth();
  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
  };
}

export function useSmartAccount() {
  const { state, createSmartAccount } = useAuth();
  return {
    smartAccount: state.smartAccount,
    createSmartAccount,
  };
}
