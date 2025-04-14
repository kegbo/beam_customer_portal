"use client";

import { useEffect } from "react";
import { accountingApiService } from "../api/services/accounting.service";
import { useCache } from "./cacheUtils";

export const useChartOfAccounts = (params: {
  page: number;
  limit?: number;
  code?: string;
  type?: string;
}) => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "chartOfAccounts",
    accountingApiService.getChartOfAccounts
  );

  useEffect(() => {
    fetchData(params);
  }, [params.page, params.limit, params.code, params.type]);

  return {
    loading,
    data,
    error,
    refresh: () => {
      clearCache();
      return fetchData(params);
    },
  };
};

export const useChartOfAccount = (id: string) => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "chartOfAccount",
    accountingApiService.getChartOfAccount
  );

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  return {
    loading,
    data,
    error,
    refresh: () => {
      clearCache();
      return fetchData(id);
    },
  };
};
