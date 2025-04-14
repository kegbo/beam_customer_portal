"use client";
import { useAtom, useSetAtom } from "jotai";
import { MainContainer, MenuToggleContainer, Navbar } from "./layout.component";
import { UserMenu } from "./user-menu";
import { profileStore, sidebarMenuOpenState } from "@/utils/atom";
import { useEffect } from "react";
import { Profile } from "../../utils/hooks/type";
import { HamburgerMenu } from "./hamburgerMenu";


export const Main = ({
  children,
  data,
}: Readonly<{
  children: React.ReactNode;
  data: Profile;
}>) => {
  const setProfile = useSetAtom(profileStore);
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarMenuOpenState);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    setProfile(data);
  }, [data]);

  return (
    <MainContainer>
      <Navbar>
        <MenuToggleContainer>
          <HamburgerMenu  />
        </MenuToggleContainer>
        <UserMenu />
      </Navbar>
      {children}
    </MainContainer>
  );
};
