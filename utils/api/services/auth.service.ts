import axiosInstance from "..";

const authServiceURL = "/auth/api/v1";

export const authApiService = {


   // Add forgot password endpoint
   forgotPassword: async (email: string) => {
    try {
      const { data } = await axiosInstance.post(
        `${authServiceURL}/broker/admins/auth/forgot-password`,
        { email }
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  
  // Add reset password endpoint
  resetPassword: async (token: string, password: string) => {
    try {
      const { data } = await axiosInstance.post(
        `${authServiceURL}/broker/admins/auth/reset-password`,
        {
          token,
          password,
        }
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },


  
  login: async (email: string, password: string) => {
    const { data } = await axiosInstance.post(
      `${authServiceURL}/broker/admins/auth/login`,
      {
        email,
        password,
      }
    );

    return data;
  },
  getInvitationInfo: async (
    token: string,
    config: { headers?: Record<string, string> } = {}
  ) => {
    try {
      return axiosInstance.get(
        `${authServiceURL}/broker/admins/invites/${token}`,
        config
      );
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getProfile: async () => {
    const { data } = await axiosInstance.get(
      `${authServiceURL}/broker/admins/profile`
    );

    return data;
  },
  logout: async (config: { headers?: Record<string, string> } = {}) => {
    try {
      return axiosInstance.post(
        `${authServiceURL}/broker/admins/auth/logout`,
        config
      );
    } catch (error) {
      return Promise.reject(error);
    }
  },
  acceptInvite: async (payload: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
    token: string;
  }) => {
    try {
      return axiosInstance.put(
        `${authServiceURL}/broker/admins/invites`,
        payload
      );
    } catch (error) {
      return Promise.reject(error);
    }
  },
  createCustomer: async (payload: {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    cscsCode: string;
    chn: string;
    bvn: string;
    address: string;
    country: string;
    city: string;
    localGovt: string;
    state: string;
    taxIdentificationNumber: string;
    motherMaidenName: string;
    nimcNo: string;
    bankCode: string;
    bankAccountNumber: string;
    nextofKinName: string;
    nextofKinPhoneNumber: string;
    nextofKinEmail: string;
  }) => {
    try {
      return axiosInstance.post(
        `${authServiceURL}/broker/admins/invites`,
        payload
      );
    } catch (error) {
      return Promise.reject(error);
    }
  },
  deleteRole: async (role: string) => {
    try {
      return axiosInstance.delete(`${authServiceURL}/roles/${role}`);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  resendInvite: async (email: string) => {
    try {
      return axiosInstance.put(
        `${authServiceURL}/broker/admins/invites/${email}`
      );
    } catch (error) {
      return Promise.reject(error);
    }
  },
  deleteInvite: async (admin: string) => {
    try {
      return axiosInstance.delete(`${authServiceURL}/settings/team/${admin}`);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  activateInvite: async (admin: string) => {
    try {
      return axiosInstance.patch(
        `${authServiceURL}/settings/team/${admin}/activate`
      );
    } catch (error) {
      return Promise.reject(error);
    }
  },
  revokeInvite: async (admin: string) => {
    try {
      return axiosInstance.patch(
        `${authServiceURL}/settings/team/${admin}/revoke`
      );
    } catch (error) {
      return Promise.reject(error);
    }
  },
  addAdmin: async (data: {
    email: string;
    firstName: string;
    lastName: string;
    roleId: string;
  }) => {
    try {
      return axiosInstance.post(
        `${authServiceURL}/settings/team/invites`,
        data
      );
    } catch (error) {
      return Promise.reject(error);
    }
  },
  editAdmin: async (data: {
    email: string;
    firstName: string;
    lastName: string;
    roleId: string;
  }) => {
    try {
      return axiosInstance.put(`${authServiceURL}/broker/admins/invites`, data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  addRole: async (data: {
    name: string;
    description: string;
    permissions: string[];
  }) => {
    try {
      return axiosInstance.post(`${authServiceURL}/roles`, data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  editRole: async (
    id: string,
    data: {
      name: string;
      description: string;
      permissions: string[];
    }
  ) => {
    try {
      return axiosInstance.put(`${authServiceURL}/roles/${id}`, data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getAllCustomers: async (params: {
    page: number;
    limit: number;
    status?: string;
    search?: string;
    officerId?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    const { data } = await axiosInstance.get(
      `${authServiceURL}/brokers/customers`,
      { params }
    );

    return data;
  },
  getCustomerInfo: async (
    customerId: string,
    config: { headers?: Record<string, string> } = {}
  ) => {
    const { data } = await axiosInstance.get(
      `${authServiceURL}/brokers/customers/${customerId}`,
      config
    );

    return data;
  },
  getTotalCustomers: async () => {
    try {
      return axiosInstance.get(`${authServiceURL}/brokers/customers/overview`);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getPermissions: async () => {
    const { data } = await axiosInstance.get(
      `${authServiceURL}/roles/permissions`
    );

    return data;
  },
  getRole: async (id: string) => {
    const { data } = await axiosInstance.get(`${authServiceURL}/roles/${id}`);
    return data;
  },
  getAdmin: async (id: string) => {
    const { data } = await axiosInstance.get(
      `${authServiceURL}/settings/team/${id}`
    );
    return data;
  },
  getTokenAdmin: async (id: string) => {
    try {
      return axiosInstance.get(`${authServiceURL}/broker/admins/invites/${id}`);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getActiveCountries: async () => {
    const { data } = await axiosInstance.get(
      `${authServiceURL}/miscs/countries`
    );

    return data;
  },
  getActiveStates: async (countryId?: string) => {
    const { data } = await axiosInstance.get(`${authServiceURL}/miscs/states`);

    return data;
  },
  getAllAdmins: async (params: { page: number; limit: number }) => {
    const { data } = await axiosInstance.get(
      `${authServiceURL}/settings/team`,
      { params }
    );

    return data;
  },

  getAllRoles: async () => {
    try {
      return axiosInstance.get(`${authServiceURL}/roles`);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  addMultipleCustomers: async (data: FormData) => {
    try {
      return axiosInstance.post(
        `${authServiceURL}/brokers/customers/upload/bulk`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
