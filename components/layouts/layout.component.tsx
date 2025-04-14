"use client";
import Link from "next/link";
import styled from "styled-components";
import { motion } from "framer-motion";

interface SidebarProps {
  open?: boolean;
}

export const DashboardLayoutWrapper = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;


export const SidebarContainer = styled.aside<SidebarProps>`
  height: 100vh;
  overflow-y: auto;
  width: 240px;
  background-color: #0c110d;
  z-index: 2;
  
  @media (max-width: 1024px) {
    width: 200px;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    max-height: ${props => props.open ? "100vh" : "64px"};
    overflow: ${props => props.open ? "auto" : "hidden"};
    transition: max-height 0.3s ease-in-out;
  }
`;

export const SideBarTop = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  padding-left: 40px;
  
  @media (max-width: 768px) {
    padding-left: 20px;
    justify-content: space-between;
    padding-right: 20px;
  }
`;
export const SidebarLogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SidebarLogo = styled.div`
  width: 24px;
  height: 24px;
  background-color: #18A0FB;
  border-radius: 50%;
  font-weight: bold;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SidebarLogoTitle = styled.h1`
  font-size: 0.75rem;
  font-weight: bold;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.031rem;
`;


export const SidebarMenuContainer = styled.div<{ $isTopPadded?: boolean }>`
  padding-top: ${({ $isTopPadded }) => ($isTopPadded ? "2.5rem" : 0)};
  padding-left: 2.5rem;
  color: #ffffff;
  
  @media (max-width: 768px) {
    padding-left: 1.5rem;
    padding-top: ${({ $isTopPadded }) => ($isTopPadded ? "1.5rem" : 0)};
  }
`;

export const SidebarMenuContainerTitle = styled.p`
  font-size: 0.688rem;
  font-weight: 400;
`;

export const MenuContainer = styled.ul`
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
    margin-top: 1rem;
  }
`;

export const MenuItemWrapper = styled.li`
  font-size: 0.75rem;
`;

export const MenuItemLink = styled(Link)`
  display: flex;
  gap: 0.75rem;
`;

export const MenuDivider = styled.div`
  height: 0.063rem;
  background-color: #c8cbd9;
  margin: 5.734rem 0;
  margin: 0 2.5rem;
  
  @media (max-width: 768px) {
    margin: 0 1.5rem;
  }
`;

export const MainContainer = styled.main`
  flex: 1;
  overflow-y: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  
  @media (max-width: 768px) {
    height: calc(100vh - 64px);
  }
`;

export const Navbar = styled.nav`
  display: flex;
  position: sticky;
  top: 0;
  justify-content: space-between;
  height: 64px;
  background-color: white;
  border-bottom: 1px solid #c8cbd9;
  align-items: center;
  padding-left: 2.688rem;
  padding-right: 2.559rem;
  z-index: 1;
  
  @media (max-width: 1024px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  
  @media (max-width: 768px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;


export const MenuToggleContainer = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

export const Backdrop = styled.div<{ $isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 5;
  }
`;

export const UserMenuWrapper = styled.div`
  min-width: 12.378rem;
  height: 1.875rem;
  display: flex;
  align-items: center;
  gap: 20px;
  
  @media (max-width: 768px) {
    min-width: auto;
    gap: 10px;
  }
`;

export const UserAvatarContainer = styled.div`
  min-width: 1.875rem;
  height: 1.875rem;
  border-radius: 50%;
  background-color: #ffe6cc;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserMenuDropdownWrapper = styled.div`
  min-width: 6.938rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  font-size: 0.75rem;
  margin-left: 12px;
  color: #0d0d0c;
  position: relative;
  letter-spacing: 0.031rem;
  
  @media (max-width: 768px) {
    min-width: auto;
    max-width: 120px;
    
    /* Truncate long names */
    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  
  @media (max-width: 480px) {
    max-width: 80px;
  }
`;

export const UserMenuPopup = styled(motion.ul)`
  width: 10rem;
  position: absolute;
  margin-top: 9.5rem;
  transform-origin: top right;
  right: 0;
  padding: 10px;
  background-color: white;
  list-style-type: none;
  border-radius: 0.375rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 10;
`;

export const UserMenuPopItem = styled.li`
  padding: 0.4rem 0.5rem;
  border-radius: 0.375rem;
  align-items: center;
  display: flex;
  color: rgb(89 89 87);
  font-size: 0.875rem;
  line-height: 1.25rem;
  
  &:hover {
    background-color: #f3f4f6;
  }
`;

export const MobileMenuToggle = styled.button`
  display: none;
  background: transparent;
  border: none;
  width: 32px;
  height: 32px;
  cursor: pointer;
  position: relative;
  
  @media (max-width: 768px) {
    display: block;
  }
  
  &::before, &::after, span {
    content: '';
    display: block;
    height: 2px;
    width: 100%;
    background: #fff;
    position: absolute;
    left: 0;
    transition: all 0.3s ease;
  }
  
  &::before {
    top: 8px;
  }
  
  span {
    top: 15px;
  }
  
  &::after {
    bottom: 8px;
  }
  
  &.open {
    &::before {
      transform: rotate(45deg);
      top: 15px;
    }
    
    span {
      opacity: 0;
    }
    
    &::after {
      transform: rotate(-45deg);
      bottom: 15px;
    }
  }
`;

export const MobileMenuWrapper = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

export const MobileMenu = styled.ul`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

