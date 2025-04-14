"use client";
import { useEffect } from "react";
import { authApiService } from "../api/services/auth.service";
import { useCache } from "./cacheUtils";

export const useInvitationInfo = (token: string) => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "invitationInfo",
    authApiService.getInvitationInfo
  );

  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [token]);

  return { loading, data, error, refresh: () => fetchData(token) };
};

export const useProfile = () => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "profile",
    authApiService.getProfile
  );

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, data, error, refresh: fetchData };
};

export const useCustomers = (params: {
  page: number;
  status?: string;
  search?: string;
  officerId?: string;
  startDate?: string;
  endDate?: string;
}) => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "customers",
    authApiService.getAllCustomers
  );

  useEffect(() => {
    fetchData(params);
  }, [
    params.page,
    params.status,
    params.search,
    params.officerId,
    params.startDate,
    params.endDate,
  ]);

  return { loading, data, error, refresh: () => fetchData(params) };
};

export const useCustomerInfo = (customerId: string) => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "customerInfo",
    authApiService.getCustomerInfo
  );

  useEffect(() => {
    if (customerId) {
      fetchData(customerId);
    }
  }, [customerId]);

  return { loading, data, error, refresh: () => fetchData(customerId) };
};

export const useTotalCustomers = () => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "totalCustomers",
    authApiService.getTotalCustomers
  );

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, data, error, refresh: fetchData };
};

export const usePermissions = () => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "permissions",
    authApiService.getPermissions
  );

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, data, error, refresh: fetchData };
};

export const useRole = (id: string) => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "role",
    authApiService.getRole
  );

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  return { loading, data, error, refresh: () => fetchData(id) };
};

export const useAdmin = (id: string) => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "admin",
    authApiService.getAdmin
  );

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  return { loading, data, error, refresh: () => fetchData(id) };
};

export const useTokenAdmin = (id: string) => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "tokenAdmin",
    authApiService.getTokenAdmin
  );

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  return { loading, data, error, refresh: () => fetchData(id) };
};

export const useActiveCountries = () => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "activeCountries",
    authApiService.getActiveCountries
  );

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, data, error, refresh: fetchData };
};

export const useActiveStates = (countryId: string) => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "activeStates",
    authApiService.getActiveStates
  );

  useEffect(() => {
    if (countryId) {
      fetchData(countryId);
    }
  }, [countryId]);

  return { loading, data, error, refresh: () => fetchData(countryId) };
};

export const useAllAdmins = () => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "allAdmins",
    authApiService.getAllAdmins
  );

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, data, error, refresh: fetchData };
};

export const useAllRoles = () => {
  const { loading, data, error, fetchData, clearCache } = useCache(
    "allRoles",
    authApiService.getAllRoles
  );

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, data, error, refresh: fetchData };
};
