import { useState, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import axiosInstance from "@/utils/api";

// Supported HTTP Methods
type MutationMethod = "POST" | "PUT" | "PATCH" | "DELETE";

// Hook Return Type
interface UseMutationReturn<TData, TVariables> {
  mutate: (variables?: TVariables) => Promise<TData>; // Returns data or throws error
  data: TData | null;
  error: Error | null;
  loading: boolean;
  reset: () => void;
}

// 🔥 `useMutation` Hook with Catchable Error Handling
export function useMutation<TData = any, TVariables = any>(
  url: string,
  method: MutationMethod = "POST", // Default method
  options?: AxiosRequestConfig
): UseMutationReturn<TData, TVariables> {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Mutation Function
  const mutate = useCallback(
    async (variables?: TVariables): Promise<TData> => {
      setLoading(true);
      setError(null);

      try {
        let response: AxiosResponse<TData>;

        switch (method) {
          case "POST":
            response = await axiosInstance.post<TData>(url, variables, options);
            break;
          case "PUT":
            response = await axiosInstance.put<TData>(url, variables, options);
            break;
          case "PATCH":
            response = await axiosInstance.patch<TData>(
              url,
              variables,
              options
            );
            break;
          case "DELETE":
            response = await axiosInstance.delete<TData>(url, {
              ...options,
              data: variables,
            });
            break;
          default:
            throw new Error(`Unsupported HTTP method: ${method}`);
        }

        setData(response.data);
        return response.data;
      } catch (err) {
        const axiosError = err as Error;
        setError(axiosError);
        throw axiosError; // 🔥 Allows handling the error inside a `catch` block
      } finally {
        setLoading(false);
      }
    },
    [url, method, options]
  );

  // Reset Function
  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return { mutate, data, error, loading, reset };
}
