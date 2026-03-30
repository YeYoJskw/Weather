import { useState } from 'react';

type Callback = (...args: unknown[]) => Promise<unknown>;

export const useFetching = (callback: Callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetching = async (...args: unknown[]) => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      setError(errorMessage);
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error] as const;
};
