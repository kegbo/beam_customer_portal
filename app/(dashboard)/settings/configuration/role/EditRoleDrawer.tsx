import Input from "@/components/Input";
import Button from "@/components/utilities/Button";
import Drawer from "@/components/utilities/Drawer";
import { Form, Formik } from "formik";
import { Permission } from "./Permissions";
import { useState } from "react";
import { useAtom } from "jotai";
import { updateRoleDrawerStatus } from "@/utils/atom";
import { useQuery } from "@tanstack/react-query";
import { authApiService } from "@/utils/api/services/auth.service";

type GroupedPermission = {
  module: string;
  permissions: string[];
};

function groupPermissionsByModule(
  permissionArray: string[]
): GroupedPermission[] {
  const map = new Map<string, Set<string>>();

  permissionArray.forEach((perm) => {
    const [module, action] = perm.split(".");
    if (!map.has(module)) {
      map.set(module, new Set());
    }
    map.get(module)!.add(action);
  });

  return Array.from(map.entries()).map(([module, actions]) => ({
    module: capitalizeFirstLetter(module),
    permissions: Array.from(actions),
  }));
}

function capitalizeFirstLetter(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export const EditRoleDrawer = () => {
  const [status, setIsOpen] = useAtom(updateRoleDrawerStatus);
  const [item, setItem] = useState<Record<string, string[]>>({
    Wallets: ["Create"],
    Reports: ["View"],
  });

  const { isLoading, data: role } = useQuery({
    queryKey: ["roles", status.id],
    queryFn: () => authApiService.getRole(status.id),
  });

  const { name, permissions = [] } = role?.data || {};

  return (
    <Drawer
      isLoading={isLoading}
      title="Edit a role"
      isOpen={status?.isOpen}
      onClose={() => setIsOpen({ isOpen: false, id: "" })}
      width="338px"
    >
      <p style={{ fontSize: "12px", marginBottom: "24px" }}>
        Please input the details below
      </p>

      <Formik
        initialValues={{
          name,
          permissions: permissions,
        }}
        onSubmit={() => {}}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Input variant="drawer" type="text" label="Role Name" name="name" />

            <Permission
              onChange={function (updatedPermissions: string[]): void {
                setFieldValue("permissions", updatedPermissions);
              }}
              defaultValue={values.permissions}
            />

            <Button style={{ marginTop: "40px" }} fullWidth variant="yellow">
              Create
            </Button>
          </Form>
        )}
      </Formik>
    </Drawer>
  );
};
