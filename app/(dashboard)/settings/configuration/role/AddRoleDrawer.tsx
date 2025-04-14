import Input from "@/components/Input";
import Button from "@/components/utilities/Button";
import Drawer from "@/components/utilities/Drawer";
import { Form, Formik } from "formik";
import { Permission } from "./Permissions";
import { useState } from "react";
import { useAtom } from "jotai";
import { addRoleDrawerStatus } from "@/utils/atom";

export const CreateRoleDrawer = () => {
  const [isOpen, setIsOpen] = useAtom(addRoleDrawerStatus);
  const [item, setItem] = useState<Record<string, string[]>>({
    Wallets: ["Create"],
    Reports: ["View"],
  });

  return (
    <Drawer
      title="Create a role"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      width="338px"
    >
      <p style={{ fontSize: "12px", marginBottom: "24px" }}>
        Please input the details below
      </p>

      <Formik
        initialValues={{
          name: "",
          permissions: [],
        }}
        onSubmit={() => {}}
      >
        {({ setFieldValue, handleChange, handleSubmit, values }) => (
          <Form>
            <Input
              variant="drawer"
              type="text"
              label="Role Name"
              name="name"
              value={values.name}
              onChange={handleChange}
            />

            <Permission
              defaultValue={values.permissions}
              onChange={function (updatedPermissions: string[]) {
                setFieldValue("permissions", updatedPermissions);
              }}
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
