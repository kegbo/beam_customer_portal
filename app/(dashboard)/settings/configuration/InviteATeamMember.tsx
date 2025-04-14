import Input from "@/components/Input";
import Select from "@/components/Select";
import Button from "@/components/utilities/Button";
import Drawer from "@/components/utilities/Drawer";
import { authApiService } from "@/utils/api/services/auth.service";
import { addTeamDrawerStatus } from "@/utils/atom";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useAtom } from "jotai";
import toast from "react-hot-toast";

export const InviteTeamDrawer = () => {
  const [isOpen, setIsOpen] = useAtom(addTeamDrawerStatus);
  const { isLoading, data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: () => authApiService.getAllRoles(),
  });

  const { data = [] } = roles?.data || {};
  const formattedRoles =
    data?.map((role: any) => ({
      value: role.id,
      label: role.name,
    })) || [];

  return (
    <Drawer
      title="Invite a team member"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      width="338px"
    >
      <p style={{ fontSize: "12px", marginBottom: "24px" }}>
        Please input the details below
      </p>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          role: "",
        }}
        onSubmit={(values, { setSubmitting }) => {}}
      >
        {({ handleChange, values, setFieldValue, handleSubmit }) => (
          <Form>
            <Input
              variant="drawer"
              type="text"
              label="First Name"
              name="firstName"
              onChange={handleChange}
            />
            <Input
              variant="drawer"
              type="text"
              label="Last Name"
              name="lastName"
              onChange={handleChange}
            />
            <Input
              variant="drawer"
              type="email"
              label="Email Address"
              name="email"
              onChange={handleChange}
            />

            <Select
              variant="standard"
              label="Role"
              name="role"
              options={formattedRoles}
              onChange={(d) => setFieldValue("role", d)}
            />
            <Button
              onClick={handleSubmit}
              style={{ marginTop: "40px" }}
              fullWidth
              variant="yellow"
            >
              Invite
            </Button>
          </Form>
        )}
      </Formik>
    </Drawer>
  );
};
