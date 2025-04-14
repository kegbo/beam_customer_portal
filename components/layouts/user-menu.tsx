"use client";

import { useEffect, useRef, useState } from "react";
import { BellIcon, MenuDropdownIcon } from "../icons";
import {
  UserAvatarContainer,
  UserMenuDropdownWrapper,
  UserMenuPopItem,
  UserMenuPopup,
  UserMenuWrapper,
} from "./layout.component";
import Link from "next/link";
import { useAtomValue } from "jotai";
import { profileStore } from "@/utils/atom";

const UserAvatar = ({ char }: { char: string }) => {
  return <UserAvatarContainer>{char}</UserAvatarContainer>;
};

const UserMenuDropdown = () => {
  const profileData = useAtomValue(profileStore);

  const [isOpen, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <UserMenuDropdownWrapper
      ref={dropdownRef}
      className="no-select"
      onClick={() => setOpen(!isOpen)}
    >
      <p>
        {profileData?.firstName} {profileData?.lastName}
      </p>
      <MenuDropdownIcon />

      <UserMenuPopup
        initial={{ opacity: 0, scale: 0.95, y: -5 }}
        animate={
          isOpen
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.95, y: -5 }
        }
        transition={{ duration: 0.1, ease: "easeInOut" }}
        style={{ display: isOpen ? "block" : "none" }}
        className="shadow-lg ring-black"
      >
        <UserMenuPopItem>
          <Link href="#">Profile</Link>
        </UserMenuPopItem>
        <UserMenuPopItem>
          <Link href="#">Settings</Link>
        </UserMenuPopItem>
        <UserMenuPopItem>
          <Link href="#">Logout</Link>
        </UserMenuPopItem>
      </UserMenuPopup>
    </UserMenuDropdownWrapper>
  );
};

export const UserMenu = () => {
  const profileData = useAtomValue(profileStore);
  return (
    <UserMenuWrapper>
      <div style={{ display: "flex" }}>
        <UserAvatar char={profileData?.firstName?.charAt(0) || "A"} />
        <UserMenuDropdown />
      </div>
      <BellIcon width={16} height={16} />
    </UserMenuWrapper>
  );
};
