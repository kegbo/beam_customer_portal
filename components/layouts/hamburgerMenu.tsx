"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useAtom, useAtomValue } from "jotai";
import { sidebarMenuOpenState, profileStore } from "@/utils/atom";
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
import { clearSession } from "@/utils/api/services/server-api.service";
import { authApiService } from "@/utils/api/services/auth.service";
import Link from "next/link";

// Styled hamburger button (icon)
const StyledHamburger = styled.button<{ $isOpen: boolean }>`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 20;

  @media (max-width: 768px) {
    display: flex;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ $isOpen }) => ($isOpen ? "#0D0D0C" : "#0D0D0C")};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    &:first-child {
      transform: ${({ $isOpen }) => ($isOpen ? "rotate(45deg)" : "rotate(0)")};
    }

    &:nth-child(2) {
      opacity: ${({ $isOpen }) => ($isOpen ? "0" : "1")};
      transform: ${({ $isOpen }) =>
        $isOpen ? "translateX(20px)" : "translateX(0)"};
    }

    &:nth-child(3) {
      transform: ${({ $isOpen }) => ($isOpen ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

// Menu container (mobile)
const MobileMenuContainer = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 64px;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 10;
  max-height: ${({ $isOpen }) => ($isOpen ? "100vh" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  box-shadow: ${({ $isOpen }) =>
    $isOpen ? "0px 4px 12px rgba(0, 0, 0, 0.1)" : "none"};
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  text-decoration: none;
  color: #0d0d0c;
  font-weight: 500;
  border-bottom: 1px solid #eee;

  &:hover {
    background-color: #f6f6f6;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  width: 100%;
  background: none;
  border: none;
  color: #0d0d0c;
  font-weight: 500;
  text-align: left;
  border-bottom: 1px solid #eee;

  &:hover {
    background-color: #f6f6f6;
  }
`;

export const HamburgerMenu = () => {
  const router = useRouter();
  const profileData = useAtomValue(profileStore);
  const [isOpen, setIsOpen] = useAtom(sidebarMenuOpenState);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    authApiService.logout();
    clearSession();
    router.replace("/");
    setIsOpen(false);
  };

  const closeMenu = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <StyledHamburger $isOpen={isOpen} onClick={toggleMenu}>
        <div />
        <div />
        <div />
      </StyledHamburger>

      <MobileMenuContainer $isOpen={isOpen}>
        <MenuItem href="/overviews" onClick={closeMenu}>
          <OverviewIcon />
          Overview
        </MenuItem>
        <MenuItem href="/customers/1?tab=Spot" onClick={closeMenu}>
          <CustomerIcon />
          Trading
        </MenuItem>
        <MenuItem href="/markets" onClick={closeMenu}>
          <MarketIcon />
          Market
        </MenuItem>
        {/* <MenuItem href="/accountings" onClick={closeMenu}>
          <AccountIcon />
          Accounting
        </MenuItem> */}
        {/* <MenuItem href="/transactions" onClick={closeMenu}>
          <TransactionIcon />
          Transactions
        </MenuItem> */}

        <MenuItem href="/notifications" onClick={closeMenu}>
          <NotificationIcon />
          Notification
        </MenuItem>
        {/* <MenuItem href="/settings" onClick={closeMenu}>
          <SettingIcon />
          Settings
        </MenuItem> */}
        <LogoutButton onClick={handleLogout}>
          <LogoutIcon />
          Logout
        </LogoutButton>
        <MenuItem href="/help" onClick={closeMenu}>
          <HelpIcon />
          Help
        </MenuItem>
      </MobileMenuContainer>
    </>
  );
};
