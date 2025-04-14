import Input from "@/components/Input";
import Select from "@/components/Select";
import Button from "@/components/utilities/Button";
import Drawer from "@/components/utilities/Drawer";
import { accountingApiService } from "@/utils/api/services/accounting.service";
import { updateAnAccountDrawerStatus } from "@/utils/atom";
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

export const EditAnAccountDrawer = () => {
  const [status, setIsOpen] = useAtom(updateAnAccountDrawerStatus);

  const { isLoading, data: account } = useQuery({
    queryKey: ["chartOfAccount", status.id],
    queryFn: () => accountingApiService.getChartOfAccount(status.id),
  });

  return (
    <Drawer
      title="Invite a team member"
      isOpen={status.isOpen}
      onClose={() => setIsOpen({ isOpen: false, id: "" })}
      width="338px"
    >
      <p style={{ fontSize: "12px", marginBottom: "24px" }}>
        Please input the details below
      </p>

      <Formik
        initialValues={{
          accountType: account?.data?.accountType,
          entryType: account?.data?.entryType,
          accountName: account?.data?.accountName,
          accountCode: account?.data?.accountCode,
          date: account?.data?.date,
          description: account?.data?.description,
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          accountingApiService.updateChartOfAccount(status.id, values);
          toast.success("Account updated successfully");
          setIsOpen({ isOpen: false, id: "" });
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
              defaultValue={values.accountType}
            />
            <Select
              variant="standard"
              label="Entry Type"
              name="entryType"
              options={entryTypeOptions}
              onChange={(d) => setFieldValue("entryType", d)}
              defaultValue={values.entryType}
            />
            <Input
              variant="drawer"
              type="text"
              label="Account Name"
              name="accountName"
              onChange={handleChange}
              value={values.accountName}
            />
            <Input
              variant="drawer"
              type="text"
              label="Account Code"
              name="accountCode"
              onChange={handleChange}
              value={values.accountCode}
            />
            <Input
              variant="drawer"
              type="date"
              label="date"
              name="date"
              onChange={handleChange}
              value={values.date}
            />
            <Input
              variant="drawer"
              type="text"
              label="description"
              name="description"
              onChange={handleChange}
              value={values.description}
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
