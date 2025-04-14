import { MoreIcon } from "@/components/icons";
import { DeleteIcon } from "@/components/icons/delete";
import { EditIcon } from "@/components/icons/edit";
import SmartPopup, { PopupItem } from "@/components/Popup";
import { Column, Table } from "@/components/table";
import { CreateRoleDrawer } from "./AddRoleDrawer";
import { EditRoleDrawer } from "./EditRoleDrawer";
import { useQuery } from "@tanstack/react-query";
import { authApiService } from "@/utils/api/services/auth.service";
import { formatToLocalDateOnly } from "@/utils/helper";
import { useSetAtom } from "jotai";
import { allowedPermissions, updateRoleDrawerStatus } from "@/utils/atom";
import { useEffect } from "react";

export const RoleList = () => {
  const { isLoading, data: roles } = useQuery({
    queryKey: ["rolelist"],
    queryFn: () => authApiService.getAllRoles(),
  });

  const setPermission = useSetAtom(allowedPermissions);
  const { data: permisions = [] } = useQuery<
    Array<{ module: string; actions: string[] }>
  >({
    queryKey: ["permissions"],
    queryFn: () => authApiService.getPermissions(),
  });

  useEffect(() => {
    if (data) {
      const parsedPermissions = permisions.map(({ module, actions }) => ({
        module,
        permissions: actions,
      }));

      setPermission(parsedPermissions);
    }
  }, [permisions]);

  const setDrawerStatus = useSetAtom(updateRoleDrawerStatus);

  const { data = [] } = roles?.data || {};

  const columns: Column[] = [
    {
      header: "Role Name",
      accessor: "name",
    },
    {
      header: "User count",
      accessor: "count",
      render: () => 0,
    },
    {
      header: "Created At",
      accessor: "createdAt",
      render: (value) => formatToLocalDateOnly(value),
    },
    {
      header: "Action",
      accessor: "action",
      render: (_, { id }) => (
        <SmartPopup trigger={<MoreIcon width={24} height={24} />}>
          <PopupItem
            icon={<EditIcon width={16} height={16} />}
            label="Edit"
            onClick={() => setDrawerStatus({ isOpen: true, id })}
          />
          <PopupItem
            icon={<DeleteIcon width={16} height={16} />}
            label="Delete"
            onClick={() => {}}
          />
        </SmartPopup>
      ),
    },
  ];
  return (
    <>
      <Table data={data} isLoading={isLoading} columns={columns} />
      <CreateRoleDrawer />
      <EditRoleDrawer />
    </>
  );
};
