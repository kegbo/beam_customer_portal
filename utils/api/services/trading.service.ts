import axiosInstance from "..";
import axios from "axios";

const ngxBaseURL = process.env.NEXT_PUBLIC_NGX_API_URL;
const ngxToken = process.env.NEXT_PUBLIC_NGX_TOKEN;
const tradingServiceURL = "/trading/api/v1";

export const tradingApiService = {
  buyStock: async (payload: {
    quantity: number;
    price: number;
    symbol: string;
    type: string;
    timeInForce: string;
    customerId: string;
  }) => {
    try {
      return axiosInstance.post(`${tradingServiceURL}/orders/buy`, {
        quantity: payload.quantity,
        price: payload.price,
        securityID: payload.symbol,
        type: payload.type,
        timeInForce: payload.timeInForce,
        customerId: payload.customerId,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },

  sellStock: async (payload: {
    quantity: number;
    price: number;
    symbol: string;
    type: string;
    timeInForce: string;
    customerId: string;
  }) => {
    try {
      return axiosInstance.post(`${tradingServiceURL}/orders/sell`, {
        quantity: payload.quantity,
        price: payload.price,
        securityID: payload.symbol,
        type: payload.type,
        timeInForce: payload.timeInForce,
        customerId: payload.customerId,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },

  getAllEquities: async (params: {
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    const { data } = await axiosInstance.get(
      `${tradingServiceURL}/markets/securities`,
      {
        params,
      }
    );

    return data;
  },

  getEquity: async (id: string) => {
    try {
      return axiosInstance.get(
        `${tradingServiceURL}/markets/securities/${id}`,
        {
          params: {
            showMarketData: true,
          },
        }
      );
    } catch (error) {
      return Promise.reject(error);
    }
  },

  getTradingSessions: async () => {
    try {
      return axiosInstance.get(`${tradingServiceURL}/markets/sessions`);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  getPortfolios: async () => {
    try {
      return axiosInstance.get(`${tradingServiceURL}/portfolios`, {
        params: {
          page: 1,
          limit: 100,
        },
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },

  getOrders: async (params: {
    customerId: string;
    status?: string;
    page: number;
  }) => {
    try {
      return axiosInstance.get(`${tradingServiceURL}/orders`, {
        params: {
          ...params,
          limit: 10,
        },
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },

  getOrderTypes: async () => {
    try {
      return axiosInstance.get(`${tradingServiceURL}/orders/types`);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  getTimeInForces: async () => {
    try {
      return axiosInstance.get(`${tradingServiceURL}/orders/timeinforces`);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  getCustomerPortfolios: async (params: {
    customerId?: string;
    page: number;
  }) => {
    try {
      return axiosInstance.get(`${tradingServiceURL}/portfolios`, {
        params: {
          ...params,
          limit: 10,
        },
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },

  getActiveStocks: async () => {
    try {
      return axiosInstance.get(`${tradingServiceURL}/overviews/active-stocks`);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  getActiveCustomers: async () => {
    try {
      return axiosInstance.get(
        `${tradingServiceURL}/overviews/active-customers`
      );
    } catch (error) {
      return Promise.reject(error);
    }
  },

  getDashboardMetrics: async () => {
    try {
      return axiosInstance.get(`${tradingServiceURL}/overviews/metrics`);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  updateOrder: async (payload: {
    orderId: string;
    quantity: number;
    price: number;
    type: string;
    timeInForce: string;
  }) => {
    try {
      return axiosInstance.put(
        `${tradingServiceURL}/orders/${payload.orderId}`,
        {
          quantity: payload.quantity,
          price: payload.price,
          type: payload.type,
          timeInForce: payload.timeInForce,
        }
      );
    } catch (error) {
      return Promise.reject(error);
    }
  },

  cancelOrder: async (payload: { orderId: string; reason: string }) => {
    try {
      return axiosInstance.post(
        `${tradingServiceURL}/orders/${payload.orderId}/cancel`,
        {
          reason: payload.reason,
        }
      );
    } catch (error) {
      return Promise.reject(error);
    }
  },

  getMarketActivities: async (marketType: string) => {
    try {
      // This uses a different base URL for NGX API
      const axiosNgxInstance = axios.create({ baseURL: ngxBaseURL });

      return axiosNgxInstance.get(`marketactivity/topgainerslosers.json`, {
        params: {
          _t: ngxToken,
        },
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },

  getMarketChartData: async (symbol: string) => {
    try {
      // This uses a different base URL for NGX API
      const axiosNgxInstance = axios.create({ baseURL: ngxBaseURL });

      return axiosNgxInstance.get(`price/interdayprices.json`, {
        params: {
          s: symbol,
          _t: ngxToken,
        },
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
