import axiosInstance from "..";

const fileServiceURL = process.env.NEXT_PUBLIC_FILE_SERVICE;
const fileServiceToken = process.env.NEXT_PUBLIC_FILE_API_KEY;
const paymentServiceURL = "/payment/api/v1";

export const paymentApiService = {
  fundWallet: async (payload: {
    amount: number;
    walletId: string;
    receiptUrl: string;
    transactionDate: string;
    sessionId: string;
  }) => {
    try {
      return axiosInstance.post(
        `${paymentServiceURL}/wallets/customers/${payload.walletId}/funding/initialize`,
        {
          amount: payload.amount,
          receiptUrl: payload.receiptUrl,
          transactionDate: payload.transactionDate,
          sessionId: payload.sessionId,
        }
      );
    } catch (error) {
      return Promise.reject(error);
    }
  },

  verifyOtp: async (payload: {
    reference: string;
    code: string;
    walletId: string;
  }) => {
    try {
      return axiosInstance.post(
        `${paymentServiceURL}/wallets/customers/${payload.walletId}/funding/confirm`,
        {
          code: payload.code,
        }
      );
    } catch (error) {
      return Promise.reject(error);
    }
  },

  uploadReceipt: async (formData: FormData) => {
    try {
      formData.append("folder", "beam");
      formData.append("isPrivate", "false");

      return axiosInstance.post(`${fileServiceURL}/uploader/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-API-KEY": fileServiceToken,
        },
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },

  getCustomerTransactions: async (customerId: string) => {
    try {
      return axiosInstance.get(
        `${paymentServiceURL}/wallets/customers/${customerId}/transactions`,
        {
          params: {
            page: 1,
            limit: 10,
          },
        }
      );
    } catch (error) {
      return Promise.reject(error);
    }
  },

  getCustomerBalance: async (customerId: string) => {
    const { data } = await axiosInstance.get(
      `${paymentServiceURL}/wallets/customers/${customerId}`
    );

    return data;
  },

  getBanks: async () => {
    const { data } = await axiosInstance.get(
      `${paymentServiceURL}/miscs/banks`
    );

    return data;
  },

  triggerApprovalOtp: async (reference: string) => {
    const { data } = await axiosInstance.post(
      `${paymentServiceURL}/wallets/customers/funding/otp`,
      { reference }
    );

    return data;
  },

  confirmOtp: async (payload: { reference: string; code: string }) => {
    try {
      return axiosInstance.post(
        `${paymentServiceURL}/wallets/customers/funding/approve`,
        {
          reference: payload.reference,
          code: payload.code,
        }
      );
    } catch (error) {
      return Promise.reject(error);
    }
  },

  processPayment: async (reference: string) => {
    try {
      return axiosInstance.post(`${paymentServiceURL}/wallets/pay`, {
        reference,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },

  getTransactionMetrics: async (customerId: string) => {
    try {
      return axiosInstance.get(
        `${paymentServiceURL}/wallets/customers/${customerId}/metrics`
      );
    } catch (error) {
      return Promise.reject(error);
    }
  },

  getAllTransactions: async (params: {
    page: number;
    status?: string;
    type?: string;
    reference?: string;
    isApproved?: boolean;
    startDate?: string;
    endDate?: string;
  }) => {
    if (params?.status === "all") {
      delete params.status;
    }

    const { data } = await axiosInstance.get(
      `${paymentServiceURL}/wallets/customers/transactions`,
      {
        params: {
          ...params,
          limit: 20,
        },
      }
    );

    return data;
  },

  getOverallTransactionMetrics: async () => {
    const { data } = await axiosInstance.get(
      `${paymentServiceURL}/wallets/customers/transactions/metrics`
    );

    return data;
  },
};
