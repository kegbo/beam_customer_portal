"use client";
import { useEffect } from "react";
import { authApiService } from "../api/services/auth.service";
import { useCache } from "./cacheUtils";

export const useCustomer = (token: string = "token") => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "customer",
    authApiService.getInvitationInfo
  );

  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [token]);

  return {
    loading,
    data,
    error,
    refresh: () => {
      clearCache();
      return fetchData(token);
    },
  };
};
