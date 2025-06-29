import { useCallback } from 'react';

export interface APIConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: any;
  };
}

export interface UseAPIReturn {
  get: <T = any>(endpoint: string, options?: RequestInit) => Promise<APIResponse<T>>;
  post: <T = any>(endpoint: string, data?: any, options?: RequestInit) => Promise<APIResponse<T>>;
  put: <T = any>(endpoint: string, data?: any, options?: RequestInit) => Promise<APIResponse<T>>;
  delete: <T = any>(endpoint: string, options?: RequestInit) => Promise<APIResponse<T>>;
  patch: <T = any>(endpoint: string, data?: any, options?: RequestInit) => Promise<APIResponse<T>>;
}

export function useAPI(config?: Partial<APIConfig>): UseAPIReturn {
  const defaultConfig: APIConfig = {
    baseURL: process.env.REACT_APP_API_URL || process.env.VITE_API_URL || 'http://localhost:3001',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
    ...config,
  };

  const request = useCallback(
    async <T = any>(
      endpoint: string,
      options: RequestInit = {}
    ): Promise<APIResponse<T>> => {
      const url = `${defaultConfig.baseURL}${endpoint}`;
      const token = localStorage.getItem('auth_token');

      const config: RequestInit = {
        ...options,
        headers: {
          ...defaultConfig.headers,
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
      };

      // Add timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), defaultConfig.timeout);
      config.signal = controller.signal;

      try {
        const response = await fetch(url, config);
        clearTimeout(timeoutId);

        let data: any;
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
        } else {
          data = await response.text();
        }

        if (!response.ok) {
          return {
            success: false,
            error: {
              message: data.error?.message || data.message || `HTTP ${response.status}`,
              details: data.error?.details || data,
            },
          };
        }

        // Handle different response formats
        if (typeof data === 'object' && data.hasOwnProperty('success')) {
          return data as APIResponse<T>;
        }

        return {
          success: true,
          data: data as T,
        };
      } catch (error) {
        clearTimeout(timeoutId);
        
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            return {
              success: false,
              error: {
                message: 'Request timeout',
                details: error,
              },
            };
          }

          return {
            success: false,
            error: {
              message: error.message,
              details: error,
            },
          };
        }

        return {
          success: false,
          error: {
            message: 'Unknown error occurred',
            details: error,
          },
        };
      }
    },
    [defaultConfig]
  );

  const get = useCallback(
    <T = any>(endpoint: string, options: RequestInit = {}) =>
      request<T>(endpoint, { ...options, method: 'GET' }),
    [request]
  );

  const post = useCallback(
    <T = any>(endpoint: string, data?: any, options: RequestInit = {}) =>
      request<T>(endpoint, {
        ...options,
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
      }),
    [request]
  );

  const put = useCallback(
    <T = any>(endpoint: string, data?: any, options: RequestInit = {}) =>
      request<T>(endpoint, {
        ...options,
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined,
      }),
    [request]
  );

  const del = useCallback(
    <T = any>(endpoint: string, options: RequestInit = {}) =>
      request<T>(endpoint, { ...options, method: 'DELETE' }),
    [request]
  );

  const patch = useCallback(
    <T = any>(endpoint: string, data?: any, options: RequestInit = {}) =>
      request<T>(endpoint, {
        ...options,
        method: 'PATCH',
        body: data ? JSON.stringify(data) : undefined,
      }),
    [request]
  );

  return {
    get,
    post,
    put,
    delete: del,
    patch,
  };
}

// Specific API hooks for common operations
export function useAuth() {
  const api = useAPI();

  return {
    login: (credentials: { privyToken: string; userId?: string }) =>
      api.post('/api/auth/privy', credentials),
    
    logout: () => api.post('/api/auth/logout'),
    
    getMe: () => api.get('/api/auth/me'),
    
    refreshToken: (refreshToken: string) =>
      api.post('/api/auth/refresh', { refreshToken }),
  };
}

export function useWallet() {
  const api = useAPI();

  return {
    create: (data: { userId: string; type: 'smart' | 'eoa' }) =>
      api.post('/api/wallet/create', data),
    
    getBalance: (address: string) =>
      api.get(`/api/wallet/balance/${address}`),
    
    getList: (userId: string) =>
      api.get(`/api/wallet/list/${userId}`),
    
    import: (data: { privateKey: string; userId: string }) =>
      api.post('/api/wallet/import', data),
  };
}

export function useTransaction() {
  const api = useAPI();

  return {
    send: (data: {
      from: string;
      to: string;
      value?: string;
      data?: string;
      usePaymaster?: boolean;
    }) => api.post('/api/transaction/send', data),
    
    sendBatch: (data: {
      from: string;
      transactions: Array<{ to: string; value?: string; data?: string }>;
      usePaymaster?: boolean;
    }) => api.post('/api/transaction/batch', data),
    
    getStatus: (txHash: string) =>
      api.get(`/api/transaction/status/${txHash}`),
    
    getHistory: (address: string, params?: { limit?: number; offset?: number }) => {
      const query = params ? `?${new URLSearchParams(params as any)}` : '';
      return api.get(`/api/transaction/history/${address}${query}`);
    },
  };
}

export function useSession() {
  const api = useAPI();

  return {
    create: (data: {
      walletAddress: string;
      permissions: string[];
      duration?: number;
      automationRules?: Array<{
        trigger: string;
        action: string;
        parameters: Record<string, any>;
      }>;
    }) => api.post('/api/session/create', data),
    
    execute: (data: {
      sessionId: string;
      action: string;
      parameters?: Record<string, any>;
    }) => api.post('/api/session/execute', data),
    
    getList: (walletAddress: string) =>
      api.get(`/api/session/list/${walletAddress}`),
    
    revoke: (sessionId: string) =>
      api.put(`/api/session/revoke/${sessionId}`),
    
    getAutomationStatus: (sessionId: string) =>
      api.get(`/api/session/automation-status/${sessionId}`),
  };
}

export function usePrediction() {
  const api = useAPI();

  return {
    create: (data: {
      symbol: string;
      timeframe: '1h' | '4h' | '1d' | '1w' | '1m';
      predictionType: 'price' | 'trend' | 'volatility';
      targetPrice?: number;
      confidence?: number;
    }) => api.post('/api/prediction/create', data),
    
    getList: (params?: { limit?: number; offset?: number; status?: string }) => {
      const query = params ? `?${new URLSearchParams(params as any)}` : '';
      return api.get(`/api/prediction/list${query}`);
    },
    
    getById: (id: string) => api.get(`/api/prediction/${id}`),
    
    getMarketData: (data: {
      symbols: string[];
      timeframe?: string;
      limit?: number;
    }) => api.post('/api/prediction/market-data', data),
    
    getAnalytics: () => api.get('/api/prediction/analytics'),
  };
}

export function useSystem() {
  const api = useAPI();

  return {
    getHealth: () => api.get('/health'),
    getStatus: () => api.get('/api/system/status'),
    getConfig: () => api.get('/api/system/config'),
    getMetrics: () => api.get('/api/system/metrics'),
    getLogs: (params?: { level?: string; limit?: number }) => {
      const query = params ? `?${new URLSearchParams(params as any)}` : '';
      return api.get(`/api/system/logs${query}`);
    },
  };
}

export default useAPI;
