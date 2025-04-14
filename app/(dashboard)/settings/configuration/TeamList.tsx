import { MoreIcon } from "@/components/icons";
import { DeleteIcon } from "@/components/icons/delete";
import { EditIcon } from "@/components/icons/edit";
import SmartPopup, { PopupItem } from "@/components/Popup";
import { Column, Table } from "@/components/table";
import { EditTeamDrawer } from "./EditTeamDrawer";
import { InviteTeamDrawer } from "./InviteATeamMember";
import { useQuery } from "@tanstack/react-query";
import { authApiService } from "@/utils/api/services/auth.service";
import { formatToLocalDateOnly } from "@/utils/helper";
import { updateTeamDrawerStatus } from "@/utils/atom";
import { useSetAtom } from "jotai";

export const TeamList = () => {
  const { isLoading, data: result } = useQuery({
    queryKey: ["admins"],
    queryFn: () => authApiService.getAllAdmins({ page: 1, limit: 50 }),
  });

  const setDrawerStatus = useSetAtom(updateTeamDrawerStatus);

  const { items = [], meta = {} } = result?.data || {};

  const columns: Column[] = [
    {
      header: "Full Name",
      accessor: "firstName",
      render: (_, { firstName, lastName }) => `${firstName} ${lastName}`,
    },
    {
      header: "Email address",
      accessor: "email",
    },
    {
      header: "Phone number",
      accessor: "phoneNumber",
    },
    {
      header: "Role",
      accessor: "role",
      render: (_, { role, isOwner }) =>
        isOwner || !role ? "Super Admin" : role?.name,
    },
    {
      header: "Status",
      accessor: "status",
      render: (_, { isEmailVerified, isRevoked }) =>
        isEmailVerified && !isRevoked
          ? "Verified"
          : isEmailVerified && isRevoked
          ? "Access Revoked"
          : "Not Verified",
    },
    {
      header: "Created At",
      accessor: "createdAt",
      render: (value) => formatToLocalDateOnly(value),
    },
    {
      header: "Action",
      accessor: "action",
      render: (_, { isEmailVerified, id }) => (
        <SmartPopup trigger={<MoreIcon width={24} height={24} />}>
          <PopupItem
            icon={<EditIcon width={16} height={16} />}
            label="Edit"
            onClick={() => setDrawerStatus({ isOpen: true, id })}
          />
          {!isEmailVerified && (
            <PopupItem
              icon={<DeleteIcon width={16} height={16} />}
              label="Delete"
              onClick={() => {}}
            />
          )}
        </SmartPopup>
      ),
    },
  ];

  return (
    <>
      <Table
        totalPages={meta?.totalPages}
        currentPage={meta?.currentPage}
        isLoading={isLoading}
        data={items}
        columns={columns}
      />
      <EditTeamDrawer />
      <InviteTeamDrawer />
    </>
  );
};
