"use server";

import axiosInstance from "../api";
import { userCookie } from "./userCookie";

export const useProfile = async () => {
  try {
    const cookie = (await userCookie()).value;

    const { data } = await axiosInstance.get(
      `auth/api/v1/broker/admins/profile`,
      {
        headers: {
          Cookie: `sessId=${cookie}`,
        },
        withCredentials: true,
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
