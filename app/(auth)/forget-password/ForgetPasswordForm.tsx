"use client";
import Input from "@/components/Input";
import Button from "@/components/utilities/Button";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { authApiService } from "@/utils/api/services/auth.service";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";

const FormContainer = styled.div`
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }
`;

const BackToLoginLink = styled.div`
  text-align: center;
  margin-top: 2rem;
  font-size: 0.875rem;
  color: #595957;
  
  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }
  
  a {
    color: #0D0D0C;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ForgotPasswordForm = () => {
  const router = useRouter();
  
  return (
    <FormContainer>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setSubmitting(true);
            const response = await authApiService.forgotPassword(values.email);
            if (!response?.data?.token)
              toast.error("An error occured. Try again");
            toast.success(response.message);
            router.replace("/login");
          } catch (error) {
            console.log(error);
            toast.error("Failed to send reset link. Please try again later.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, handleSubmit, handleChange, values, errors, touched }) => (
          <Form>
            <Input
              type="email"
              label="Email Address"
              name="email"
              value={values.email}
              onChange={handleChange}
              radius="12px"
              error={touched.email && errors.email ? errors.email : undefined}
              labelStyle={{
                fontSize: "14px",
                fontWeight: 400,
                marginBottom: "10px",
              }}
              style={{ marginBottom: "26px" }}
            />
            
            <Button
              radius="100px"
              isLoading={isSubmitting}
              onClick={handleSubmit}
              fullWidth
              height="3rem"
            >
              Reset Password
            </Button>
            
            <BackToLoginLink>
              Remember your password? <Link href="/login">Back to login</Link>
            </BackToLoginLink>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};