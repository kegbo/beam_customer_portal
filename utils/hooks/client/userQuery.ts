import { useEffect, useReducer, useCallback, useMemo } from "react";
import axios, { AxiosRequestConfig } from "axios";
import axiosInstance from "@/utils/api";

const cache = new Map<string, any>();

interface QueryState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

// Define Action Types
type QueryAction<T> =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: T }
  | { type: "FETCH_ERROR"; payload: Error };

const initialState: QueryState<any> = {
  data: null,
  loading: true,
  error: null,
};

function queryReducer<T>(
  state: QueryState<T>,
  action: QueryAction<T>
): QueryState<T> {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

type FetchPolicy = "cache-first" | "network-only" | "cache-and-network";

interface UseQueryOptions {
  fetchPolicy?: FetchPolicy;
  options?: AxiosRequestConfig;
}

export function useQuery<T = any>(
  url: string,
  { fetchPolicy = "cache-first", options = {} }: UseQueryOptions = {}
) {
  const [state, dispatch] = useReducer(
    queryReducer<T>,
    initialState as QueryState<T>
  );

  // 🔥 Memoize options to prevent unnecessary re-renders
  const memoizedOptions = useMemo(() => options, [JSON.stringify(options)]);

  // 🔥 Optimize fetchData to prevent recreation
  const fetchData = useCallback(async () => {
    dispatch({ type: "FETCH_START" });

    if (fetchPolicy === "cache-first" && cache.has(url)) {
      dispatch({ type: "FETCH_SUCCESS", payload: cache.get(url) });
      return;
    }

    try {
      const response = await axiosInstance.get<T>(url, memoizedOptions);
      cache.set(url, response.data);
      dispatch({ type: "FETCH_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error as Error });
    }
  }, [url, memoizedOptions]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const clearCache = useCallback(() => {
    cache.delete(url);
  }, [url]);

  return { ...state, refetch: fetchData, clearCache };
}
