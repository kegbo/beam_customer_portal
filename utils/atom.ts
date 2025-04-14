import { atom } from "jotai";
import { Profile } from "./hooks/type";

export const overviewTabAtom = atom("Overview");
export const addCustomerDrawerAtom = atom(false);

export const addCustomerFundModal = atom(false);

export const addRoleDrawerStatus = atom(false);
export const updateRoleDrawerStatus = atom<{
  isOpen: boolean;
  id: string;
}>({ isOpen: false, id: "" });

export const addTeamDrawerStatus = atom(false);
export const updateTeamDrawerStatus = atom<{
  isOpen: boolean;
  id: string;
}>({ isOpen: false, id: "" });

export const addAnAccountDrawerStatus = atom(false);
export const updateAnAccountDrawerStatus = atom<{
  isOpen: boolean;
  id: string;
}>({ isOpen: false, id: "" });

export const allowedPermissions = atom<
  { module: string; permissions: string[] }[]
>([]);

export const countriesStore = atom<
  {
    id: string;
    name: string;
    phoneCode: string;
    emojiU: string;
    native: string;
  }[]
>([]);

export const stateStore = atom<
  {
    id: string;
    name: string;
    phoneCode: string;
    emojiU: string;
    native: string;
  }[]
>([]);

export const profileStore = atom<Profile>();

// Sidebar menu open/close state for mobile
export const sidebarMenuOpenState = atom<boolean>(false);

export const addJournalDrawerOpen = atom(false);

export const buySellDrawerStatus = atom<{
  isOpen: boolean;
  id: string;
}>({ isOpen: false, id: "" });


