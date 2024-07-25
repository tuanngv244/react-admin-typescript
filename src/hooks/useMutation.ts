import { useState } from "react";

export const useMutation = <
  D extends object | string | number | null = any,
  Q extends object | string | number = any
>(
  promise: (...args: any) => Promise<{ data: D }>
) => {
  const [data, setData] = useState<D>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();

  const execute = async (
    payload?: Q,
    options?: {
      onSuccess?: (data: D) => void;
      onFailed: (err: typeof error) => void;
    }
  ) => {
    const { onSuccess, onFailed } = options || {};
    try {
      setLoading(true);
      const res: { data: D } = await promise(payload);
      setData(res.data);
      onSuccess?.(res.data);
    } catch (error) {
      setError(error);
      onFailed?.(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    execute,
    data,
    loading,
    error,
  };
};
