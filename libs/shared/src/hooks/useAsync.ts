import { useState, useCallback } from 'react';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface UseAsyncReturn<T, Args extends any[]> {
  state: AsyncState<T>;
  execute: (...args: Args) => Promise<T | undefined>;
  reset: () => void;
}

export function useAsync<T, Args extends any[] = []>(
  asyncFunction: (...args: Args) => Promise<T>
): UseAsyncReturn<T, Args> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
    success: false,
  });

  const execute = useCallback(
    async (...args: Args): Promise<T | undefined> => {
      setState(prev => ({
        ...prev,
        loading: true,
        error: null,
        success: false,
      }));

      try {
        const result = await asyncFunction(...args);
        setState({
          data: result,
          loading: false,
          error: null,
          success: true,
        });
        return result;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        setState({
          data: null,
          loading: false,
          error: errorMessage,
          success: false,
        });
        console.error('Async operation failed:', error);
        return undefined;
      }
    },
    [asyncFunction]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      success: false,
    });
  }, []);

  return { state, execute, reset };
}

export default useAsync;
