"use client";
import { useEffect } from "react";
import { tradingApiService } from "../api/services/trading.service";
import { useCache } from "./cacheUtils";

export const useAllEquities = (params: {
  search?: string;
  currentPage?: number;
}) => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "allEquities",
    tradingApiService.getAllEquities
  );

  useEffect(() => {
    fetchData(params);
  }, [params.search, params.currentPage]);

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

export const useEquity = (id: string) => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "equity",
    tradingApiService.getEquity
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

export const useTradingSessions = () => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "tradingSessions",
    tradingApiService.getTradingSessions
  );

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, data, error, refresh: fetchData };
};

export const usePortfolios = () => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "portfolios",
    tradingApiService.getPortfolios
  );

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, data, error, refresh: fetchData };
};

export const useOrders = (params: {
  customerId: string;
  status?: string;
  page: number;
}) => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "orders",
    tradingApiService.getOrders
  );

  useEffect(() => {
    if (params.customerId) {
      fetchData(params);
    }
  }, [params.customerId, params.status, params.page]);

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

export const useOrderTypes = () => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "orderTypes",
    tradingApiService.getOrderTypes
  );

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, data, error, refresh: fetchData };
};

export const useTimeInForces = () => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "timeInForces",
    tradingApiService.getTimeInForces
  );

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, data, error, refresh: fetchData };
};

export const useCustomerPortfolios = (params: {
  customerId?: string;
  page: number;
}) => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "customerPortfolios",
    tradingApiService.getCustomerPortfolios
  );

  useEffect(() => {
    fetchData(params);
  }, [params.customerId, params.page]);

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

export const useActiveStocks = () => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "activeStocks",
    tradingApiService.getActiveStocks
  );

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, data, error, refresh: fetchData };
};

export const useActiveCustomers = () => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "activeCustomers",
    tradingApiService.getActiveCustomers
  );

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, data, error, refresh: fetchData };
};

export const useDashboardMetrics = () => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "dashboardMetrics",
    tradingApiService.getDashboardMetrics
  );

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, data, error, refresh: fetchData };
};

export const useMarketActivities = (marketType: string) => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "marketActivities",
    tradingApiService.getMarketActivities
  );

  useEffect(() => {
    if (marketType) {
      fetchData(marketType);
    }
  }, [marketType]);

  return {
    loading,
    data,
    error,
    refresh: () => {
      clearCache();
      return fetchData(marketType);
    },
  };
};

export const useMarketChartData = (symbol: string) => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "marketChartData",
    tradingApiService.getMarketChartData
  );

  useEffect(() => {
    if (symbol) {
      fetchData(symbol);
    }
  }, [symbol]);

  return {
    loading,
    data,
    error,
    refresh: () => {
      clearCache();
      return fetchData(symbol);
    },
  };
};
