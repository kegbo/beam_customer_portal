import { cookies } from "next/headers";

export const userCookie = async () => {
  try {
    const cookieStore = (await cookies()).get("next_auth");
    if (!cookieStore) throw new Error("You must be logged in");

    return cookieStore;
  } catch (error) {
    throw error;
  }
};
