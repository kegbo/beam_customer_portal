import Input from "@/components/Input";
import Select from "@/components/Select";
import Button from "@/components/utilities/Button";
import Drawer from "@/components/utilities/Drawer";
import { authApiService } from "@/utils/api/services/auth.service";
import { updateTeamDrawerStatus } from "@/utils/atom";
import { useAdmin, useAllRoles } from "@/utils/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useAtom } from "jotai";

export const EditTeamDrawer = () => {
  const [status, setIsOpen] = useAtom(updateTeamDrawerStatus);

  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: () => authApiService.getAllRoles(),
  });

  const { data = [] } = roles?.data || {};
  const formattedRoles =
    data?.map((role: any) => ({
      value: role.id,
      label: role.name,
    })) || [];

  const { isLoading, data: admin } = useQuery({
    queryKey: ["admin", status.id],
    queryFn: () => authApiService.getAdmin(status.id),
  });

  return (
    <Drawer
      isLoading={isLoading}
      title="Edit a team member"
      isOpen={status.isOpen}
      onClose={() => setIsOpen({ isOpen: false, id: "" })}
      width="338px"
    >
      <p style={{ fontSize: "12px", marginBottom: "24px" }}>
        Please input the details below
      </p>

      <Formik
        initialValues={{
          firstName: admin?.data?.firstName,
          lastName: admin?.data?.lastName,
          email: admin?.data?.email,
          phoneNumber: admin?.data?.phoneNumber,
          role: admin?.data?.role?.id,
        }}
        onSubmit={(value) => {
          console.log(value);
        }}
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <Form>
            <Input
              variant="drawer"
              type="text"
              label="First Name"
              name="firstName"
              value={values.firstName}
            />
            <Input
              variant="drawer"
              type="text"
              label="Last Name"
              name="lastName"
              value={values.lastName}
            />
            <Input
              variant="drawer"
              type="email"
              label="Email Address"
              name="email"
              value={values.email}
            />
            <Input
              variant="drawer"
              type="tel"
              label="Phone number"
              name="phoneNumber"
              value={values.phoneNumber}
            />
            <Select
              variant="standard"
              label="Role"
              options={formattedRoles}
              onChange={(d) => setFieldValue("role", d)}
              defaultValue={values.role}
            />
            <Button
              style={{ marginTop: "40px" }}
              fullWidth
              variant="yellow"
              onClick={handleSubmit}
            >
              Edit
            </Button>
          </Form>
        )}
      </Formik>
    </Drawer>
  );
};
