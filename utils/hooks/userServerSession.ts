import { cookies } from "next/headers";

export const useServerSession = async () => {
  const cookieStore = await cookies();
  const sessId = cookieStore.get("sessId")?.value;
  console.log(sessId);
};
