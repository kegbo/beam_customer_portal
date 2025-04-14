export const dynamic = "force-dynamic";

import { DashboardLayoutWrapper } from "@/components/layouts/layout.component";
import { Main } from "@/components/layouts/main";
import { Sidebar } from "@/components/layouts/sidebar";
import { useProfile } from "@/utils/hooks/useSession";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = (await useProfile()) as unknown as { data?: any };

  return (
    <>
      <DashboardLayoutWrapper>
        <Sidebar />
        <Main data={profile?.data}>{children}</Main>
      </DashboardLayoutWrapper>
    </>
  );
}
