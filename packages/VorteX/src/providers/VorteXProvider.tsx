import React, { createContext, useContext, useReducer, type ReactNode } from 'react';

// VorteX Core State
interface VorteXState {
  isInitialized: boolean;
  currentModule: string | null;
  config: VorteXConfig;
  features: FeatureFlags;
}

interface VorteXConfig {
  environment: 'development' | 'production' | 'staging';
  version: string;
  modules: {
    auth: boolean;
    web3: boolean;
    predictions: boolean;
  };
}

interface FeatureFlags {
  socialLogin: boolean;
  smartAccounts: boolean;
  gaslessTransactions: boolean;
  multiChain: boolean;
  cryptoPredictions: boolean;
}

type VorteXAction =
  | { type: 'INITIALIZE'; payload: { config: VorteXConfig } }
  | { type: 'SET_MODULE'; payload: { module: string } }
  | { type: 'UPDATE_FEATURE'; payload: { feature: keyof FeatureFlags; enabled: boolean } };

const initialState: VorteXState = {
  isInitialized: false,
  currentModule: null,
  config: {
    environment: 'development',
    version: '1.0.0',
    modules: {
      auth: true,
      web3: true,
      predictions: true,
    },
  },
  features: {
    socialLogin: true,
    smartAccounts: true,
    gaslessTransactions: true,
    multiChain: true,
    cryptoPredictions: true,
  },
};

function vortexReducer(state: VorteXState, action: VorteXAction): VorteXState {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        ...state,
        isInitialized: true,
        config: { ...state.config, ...action.payload.config },
      };
    case 'SET_MODULE':
      return {
        ...state,
        currentModule: action.payload.module,
      };
    case 'UPDATE_FEATURE':
      return {
        ...state,
        features: {
          ...state.features,
          [action.payload.feature]: action.payload.enabled,
        },
      };
    default:
      return state;
  }
}

const VorteXContext = createContext<{
  state: VorteXState;
  dispatch: React.Dispatch<VorteXAction>;
} | null>(null);

interface VorteXProviderProps {
  children: ReactNode;
  initialConfig?: Partial<VorteXConfig>;
}

export function VorteXProvider({ children, initialConfig }: VorteXProviderProps) {
  const [state, dispatch] = useReducer(vortexReducer, {
    ...initialState,
    isInitialized: true, // Initialize immediately for now
  });

  // Initialize VorteX on mount
  React.useEffect(() => {
    if (initialConfig && !state.config) {
      dispatch({
        type: 'INITIALIZE',
        payload: { config: initialConfig as VorteXConfig },
      });
    }
  }, [initialConfig, state.config]);

  return (
    <VorteXContext.Provider value={{ state, dispatch }}>
      {children}
    </VorteXContext.Provider>
  );
}

export function useVorteX() {
  const context = useContext(VorteXContext);
  if (!context) {
    throw new Error('useVorteX must be used within a VorteXProvider');
  }
  return context;
}

// Utility hooks
export function useVorteXConfig() {
  const { state } = useVorteX();
  return state.config;
}

export function useFeatureFlags() {
  const { state } = useVorteX();
  return state.features;
}

export function useCurrentModule() {
  const { state } = useVorteX();
  return state.currentModule;
}

// Module registry
export class ModuleRegistry {
  private static modules = new Map<string, any>();

  static register(name: string, module: any) {
    this.modules.set(name, module);
  }

  static get(name: string) {
    return this.modules.get(name);
  }

  static has(name: string) {
    return this.modules.has(name);
  }

  static getAll() {
    return Array.from(this.modules.entries());
  }
}
