"use client";
import { authApiService } from "@/utils/api/services/auth.service";
import {
  OverviewIcon,
  CustomerIcon,
  MarketIcon,
  AccountIcon,
  TransactionIcon,
  NotificationIcon,
  SettingIcon,
  LogoutIcon,
  HelpIcon,
} from "../icons";
import {
  SideBarTop,
  SidebarLogoContainer,
  SidebarLogo,
  SidebarLogoTitle,
  SidebarMenuContainer,
  SidebarMenuContainerTitle,
  MenuDivider,
  SidebarContainer,
} from "./layout.component";
import { Menu, MenuItem } from "./menu";
import { clearSession } from "@/utils/api/services/server-api.service";
import { useRouter } from "next/navigation";
import { profileStore } from "@/utils/atom";
import { useAtomValue } from "jotai";
import { useAtom } from "jotai";
import { sidebarMenuOpenState } from "@/utils/atom";

export const Sidebar = () => {
  const router = useRouter();
  const profileData = useAtomValue(profileStore);
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarMenuOpenState);

  const handleLogout = async () => {
    authApiService.logout();
    clearSession();
    router.replace("/");
  };
  const handleMenuItemClick = () => {
    // Close the sidebar on mobile when a menu item is clicked
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };
  return (
    <SidebarContainer>
      <SideBarTop>
        <SidebarLogoContainer>
          <SidebarLogo>
            {profileData?.broker?.name?.charAt(0) || "B"}
          </SidebarLogo>
          <SidebarLogoTitle>
            {profileData?.broker?.name || "BEAM"}
          </SidebarLogoTitle>
        </SidebarLogoContainer>
      </SideBarTop>
      <SidebarMenuContainer $isTopPadded>
        <SidebarMenuContainerTitle>MAIN</SidebarMenuContainerTitle>
        <Menu>
          <MenuItem label="Overview" Icon={OverviewIcon} url="/overviews" />
          <MenuItem label="Trading" Icon={CustomerIcon} url="/customers/1?tab=Spot" />
          <MenuItem label="Market" Icon={MarketIcon} url="/markets" />
          {/* <MenuItem label="Accounting" Icon={AccountIcon} url="/accountings" /> */}
          {/* <MenuItem
            label="Transactions"
            Icon={TransactionIcon}
            url="/transactions"
          /> */}
        </Menu>
      </SidebarMenuContainer>
      <MenuDivider
        style={{ marginTop: "3.734rem", marginBottom: "2.828rem" }}
      />
      <SidebarMenuContainer>
        <SidebarMenuContainerTitle>OTHERS</SidebarMenuContainerTitle>
        <Menu>
          <MenuItem
            label="Notification"
            Icon={NotificationIcon}
            url="/notifications"
          />
          {/* <MenuItem label="Settings" Icon={SettingIcon} url="/settings" /> */}
          <MenuItem
            label="Logout"
            Icon={LogoutIcon}
            url="#"
            onClick={() => handleLogout()}
          />
          <MenuItem label="Help" Icon={HelpIcon} url="/help" />
        </Menu>
      </SidebarMenuContainer>
    </SidebarContainer>
  );
};
