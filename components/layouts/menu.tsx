"use client";
import { FC } from "react";
import {
  MenuContainer,
  MenuItemLink,
  MenuItemWrapper,
} from "./layout.component";
import { usePathname } from "next/navigation";

interface MenuItemProp {
  label: string;
  Icon: FC<{ fillColor?: string }>;
  url: string;
  onClick?: () => void;
}

interface MenuProp {
  children: React.ReactNode;
}

export const Menu: React.FC<MenuProp> = ({ children }) => {
  return <MenuContainer>{children}</MenuContainer>;
};

export const MenuItem: React.FC<MenuItemProp> = ({
  label,
  url,
  Icon,
  onClick,
}) => {
  const pathname = usePathname();
  const isActive = pathname === url;
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <MenuItemWrapper
      style={{ color: isActive ? "#18A0FB" : "#D9D8D5" }}
      onClick={onClick}
    >
      <MenuItemLink href={url}>
        <Icon fillColor={isActive ? "#18A0FB" : "#D9D8D5"} />
        <span>{label}</span>
      </MenuItemLink>
    </MenuItemWrapper>
  );
};
