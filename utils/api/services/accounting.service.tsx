import axiosInstance from "..";

const accountingServiceURL = "accounting/api/v1";

export const accountingApiService = {
  getChartOfAccounts: async (params: {
    page: number;
    limit?: number;
    code?: string;
    type?: string;
  }) => {
    try {
      const { page = 1, limit = 10, code, type } = params;

      return axiosInstance.get(`${accountingServiceURL}/accounts`, {
        params: {
          page,
          limit,
          code,
          type,
        },
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },

  addChartOfAccount: async (data: any) => {
    try {
      return axiosInstance.post(`${accountingServiceURL}/accounts`, data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  updateChartOfAccount: async (id: string, data: any) => {
    try {
      return axiosInstance.put(`${accountingServiceURL}/accounts/${id}`, data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  getChartOfAccount: async (id: string) => {
    try {
      return axiosInstance.get(`${accountingServiceURL}/accounts/${id}`);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
