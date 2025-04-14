"use client";
import { AddIcon } from "@/components/icons";
import Button from "@/components/utilities/Button";
import { QueryTab } from "@/components/utilities/query-tab";
import { useSearchParams } from "next/navigation";
import { TeamList } from "./TeamList";
import { RoleList } from "./role/RoleList";
import { useSetAtom } from "jotai";
import { addRoleDrawerStatus, addTeamDrawerStatus } from "@/utils/atom";

export const ConfigurationTab = () => {
  const tab = useSearchParams().get("tab");
  const setIsRoleDrawerOpen = useSetAtom(addRoleDrawerStatus);
  const setIsTeamDrawerOpen = useSetAtom(addTeamDrawerStatus);
  return (
    <>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <QueryTab queryKey="tab" data={["Teams", "Roles"]} />
        {tab === "Teams" && (
          <Button
            onClick={() => setIsTeamDrawerOpen(true)}
            height="32px"
            iconPosition="right"
            icon={<AddIcon height={18} width={18} />}
          >
            Invite an Admin
          </Button>
        )}
        {tab === "Roles" && (
          <Button
            onClick={() => setIsRoleDrawerOpen(true)}
            height="32px"
            iconPosition="right"
            icon={<AddIcon height={18} width={18} />}
          >
            Add a new role
          </Button>
        )}
      </div>
      {tab === "Teams" && <TeamList />}
      {tab === "Roles" && <RoleList />}
    </>
  );
};
