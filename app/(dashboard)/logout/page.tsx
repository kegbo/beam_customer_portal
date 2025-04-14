import { authApiService } from "@/utils/api/services/auth.service";
import { clearSession } from "@/utils/api/services/server-api.service";

export default async function LogoutPage() {
  await authApiService.logout();
  await clearSession();

  return <></>;
}
