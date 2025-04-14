"use client";
import Input from "@/components/Input";
import Button from "@/components/utilities/Button";
import Checkbox from "@/components/Checkbox";
import { useState } from "react";
import { Form, Formik } from "formik";
import { acceptInviteSchema } from "./validation.schema";
import styled from "styled-components";

const FormGrid = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const AcceptInviteForm = () => {
  const [isAgreedToPrivacyPolicy, setIsAgreedToPrivacyPolicy] = useState(false);

  return (
    <div style={{ marginTop: "2rem" }}>
      <Formik
        initialValues={{}}
        validationSchema={acceptInviteSchema}
        onSubmit={(values, { setSubmitting }) => {}}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <FormGrid>
              <Input
                type="text"
                radius="12px"
                style={{ marginBottom: "16px" }}
                labelStyle={{
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "10px",
                }}
                label="First name"
                name="firstName"
              />
              <Input
                type="text"
                radius="12px"
                style={{ marginBottom: "16px" }}
                labelStyle={{
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "10px",
                }}
                label="Last name"
                name="lastName"
              />
            </FormGrid>
            <Input
              type="email"
              radius="12px"
              style={{ marginBottom: "16px" }}
              labelStyle={{
                fontSize: "14px",
                fontWeight: 400,
                marginBottom: "10px",
              }}
              label="Email Address"
              name="email"
            />
            <Input
              type="tel"
              radius="12px"
              style={{ marginBottom: "16px" }}
              labelStyle={{
                fontSize: "14px",
                fontWeight: 400,
                marginBottom: "10px",
              }}
              label="Phone number"
              name="phone"
            />
            <Input
              type="password"
              radius="12px"
              style={{ marginBottom: "16px" }}
              labelStyle={{
                fontSize: "14px",
                fontWeight: 400,
                marginBottom: "10px",
              }}
              label="Password"
              name="password"
            />
            <Input
              type="password"
              radius="12px"
              labelStyle={{
                fontSize: "14px",
                fontWeight: 400,
                marginBottom: "10px",
              }}
              label="Confirm Password"
              name="confirmPassword"
            />
            <div
              style={{
                fontSize: 12,
                display: "flex",
                gap: 12,
              }}
            >
              <Checkbox
                // name="isAgreedToPrivacyPolicy"
                checked={isAgreedToPrivacyPolicy}
                onChange={() =>
                  setIsAgreedToPrivacyPolicy(!isAgreedToPrivacyPolicy)
                }
              />
              <p>
                By setting up an account, you are agreeing with our Terms of Use
                and our Privacy Policy
              </p>
            </div>
            <Button
              radius="100px"
              isLoading={isSubmitting}
              height="3rem"
              fullWidth
              style={{ marginTop: 32 }}
            >
              Continue
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
