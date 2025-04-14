import Input from "@/components/Input";
import Select from "@/components/Select";
import Button from "@/components/utilities/Button";
import Drawer from "@/components/utilities/Drawer";
import { accountingApiService } from "@/utils/api/services/accounting.service";
import { addAnAccountDrawerStatus } from "@/utils/atom";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useAtom } from "jotai";
import toast from "react-hot-toast";

const accountTypeOptions = [
  { label: "Expense", value: "Expense" },
  { label: "Income", value: "Income" },
  { label: "Asset", value: "Asset" },
  { label: "Liability", value: "Liability" },
  { label: "Equity", value: "Equity" },
];

const entryTypeOptions = [
  { label: "Manual", value: "Manual" },
  { label: "Automatic", value: "Automatic" },
];

export const AddAnAccountDrawer = () => {
  const [isOpen, setIsOpen] = useAtom(addAnAccountDrawerStatus);

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
          accountType: "",
          entryType: "",
          accountName: "",
          accountCode: "",
          date: "",
          description: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          accountingApiService.addChartOfAccount(values);
          toast.success("Account created successfully");
          setIsOpen(false);
          setSubmitting(false);
        }}
      >
        {({ handleChange, values, setFieldValue, handleSubmit }) => (
          <Form>
            <Select
              variant="standard"
              label="Account Type"
              name="accountType"
              options={accountTypeOptions}
              onChange={(d) => setFieldValue("accountType", d)}
            />
            <Select
              variant="standard"
              label="Entry Type"
              name="entryType"
              options={entryTypeOptions}
              onChange={(d) => setFieldValue("entryType", d)}
            />
            <Input
              variant="drawer"
              type="text"
              label="Account Name"
              name="accountName"
              onChange={handleChange}
            />
            <Input
              variant="drawer"
              type="text"
              label="Account Code"
              name="accountCode"
              onChange={handleChange}
            />
            <Input
              variant="drawer"
              type="date"
              label="date"
              name="date"
              onChange={handleChange}
            />
            <Input
              variant="drawer"
              type="text"
              label="description"
              name="description"
              onChange={handleChange}
            />

            <Button
              onClick={handleSubmit}
              style={{ marginTop: "40px" }}
              fullWidth
              variant="yellow"
            >
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </Drawer>
  );
};
