"use client";
import Input from "@/components/Input";
import Button from "@/components/utilities/Button";
import { ForgotPassword } from "../AuthLayout";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { authApiService } from "@/utils/api/services/auth.service";
import toast from "react-hot-toast";
import { setSession } from "@/utils/api/services/server-api.service";
import { useRouter } from "next/navigation";
export const LoginForm = () => {
  const router = useRouter();
  return (
    <div style={{ marginTop: "2rem" }}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setSubmitting(true);
            const response = await authApiService.login(
              values.email,
              values.password
            );
            if (!response?.data?.token)
              toast.error("An error occured. Try again");

            await setSession(response.data?.token);

            toast.success(response.message);
            router.replace("/customers/" + response.data?.user?.id + "?tab=Spot");
          } catch (error) {
            console.log(error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, handleSubmit, handleChange, values }) => (
          <Form>
            <Input
              type="email"
              label="Email Address"
              name="email"
              value={values.email}
              onChange={handleChange}
              radius="12px"
              style={{ marginBottom: "26px" }}
              labelStyle={{
                fontSize: "14px",
                fontWeight: 400,
                marginBottom: "10px",
              }}
            />
            <Input
              type="password"
              label="Password"
              name="password"
              onChange={handleChange}
              value={values.password}
              radius="12px"
              labelStyle={{
                fontSize: "14px",
                fontWeight: 400,
                marginBottom: "10px",
              }}
            />
            <ForgotPassword marginBottom="36px" label="Forgot password?" />
            <Button
              radius="100px"
              isLoading={isSubmitting}
              height="3rem"
              fullWidth
              onClick={handleSubmit}
            >
              Log in
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
