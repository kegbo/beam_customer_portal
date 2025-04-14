"use client";
import { useEffect } from "react";
import { paymentApiService } from "../api/services/payment.service";
import { useCache } from "./cacheUtils";

export const useCustomerTransactions = (customerId: string) => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "customerTransactions",
    paymentApiService.getCustomerTransactions
  );

  useEffect(() => {
    if (customerId) {
      fetchData(customerId);
    }
  }, [customerId]);

  return {
    loading,
    data,
    error,
    refresh: () => {
      clearCache();
      return fetchData(customerId);
    },
  };
};

export const useCustomerBalance = (customerId: string) => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "customerBalance",
    paymentApiService.getCustomerBalance
  );

  useEffect(() => {
    if (customerId) {
      fetchData(customerId);
    }
  }, [customerId]);

  return {
    loading,
    data,
    error,
    refresh: () => {
      clearCache();
      return fetchData(customerId);
    },
  };
};

export const useBanks = () => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "banks",
    paymentApiService.getBanks
  );

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, data, error, refresh: fetchData };
};

export const useTransactionMetrics = (customerId: string) => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "transactionMetrics",
    paymentApiService.getTransactionMetrics
  );

  useEffect(() => {
    if (customerId) {
      fetchData(customerId);
    }
  }, [customerId]);

  return {
    loading,
    data,
    error,
    refresh: () => {
      clearCache();
      return fetchData(customerId);
    },
  };
};

export const useAllTransactions = (params: {
  page: number;
  status?: string;
  type?: string;
  reference?: string;
  isApproved?: boolean;
  startDate?: string;
  endDate?: string;
}) => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "allTransactions",
    paymentApiService.getAllTransactions
  );

  useEffect(() => {
    fetchData(params);
  }, [
    params.page,
    params.status,
    params.type,
    params.reference,
    params.isApproved,
    params.startDate,
    params.endDate,
  ]);

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

export const useOverallTransactionMetrics = () => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "overallTransactionMetrics",
    paymentApiService.getOverallTransactionMetrics
  );

  useEffect(() => {
    fetchData();
  }, []);

  return {
    loading,
    data,
    error,
    refresh: () => {
      clearCache();
      return fetchData();
    },
  };
};
