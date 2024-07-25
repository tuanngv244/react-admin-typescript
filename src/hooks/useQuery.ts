import { useEffect, useState } from "react";

export const useQuery = <
  D extends object | string | number | null = any,
  Q extends object | string | number = any
>(
  promise: (...args: any) => Promise<{ data: D }>,
  dependencies?: unknown[],
  options?: {
    preventInitialCall: boolean;
  }
) => {
  const [data, setData] = useState<D>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>();

  useEffect(() => {
    if (options?.preventInitialCall) return;
    fetchData();
  }, [...(dependencies || []), options?.preventInitialCall]);

  const fetchData = async (query?: Q) => {
    setLoading(true);
    try {
      const res: { data: D } = await promise(query);
      setData(res?.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
