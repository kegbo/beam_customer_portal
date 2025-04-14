"use client";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Button from "@/components/utilities/Button";
import { Form, Formik } from "formik";
import { useState } from "react";

const IndividualCustomerForm = () => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        role: "",
      }}
      onSubmit={() => {}}
    >
      {({ handleSubmit, handleChange }) => (
        <Form>
          <Input
            variant="drawer"
            name="firstName"
            type="text"
            label="First Name"
            onChange={handleChange}
          />
          <Input
            variant="drawer"
            name="lastName"
            type="text"
            label="Last Name"
            onChange={handleChange}
          />
          <Input
            variant="drawer"
            name="email"
            type="email"
            label="Email Address"
            onChange={handleChange}
          />
          <Input
            variant="drawer"
            name="phoneNumber"
            type="tel"
            label="Phone Number"
            onChange={handleChange}
          />
          <Input
            variant="drawer"
            name="bvn"
            type="text"
            label="BVN"
            onChange={handleChange}
          />
          <Input
            variant="drawer"
            name="nin"
            type="text"
            label="NIMC No"
            onChange={handleChange}
          />
          <Input
            variant="drawer"
            name="nextOfKin"
            type="text"
            label="Next of Kin"
          />
          {/* <Input
            variant="drawer"
            name="homeAddress"
            type="text"
            label="Home Address"
          />{" "}
          <Input
            variant="drawer"
            name="city"
            type="text"
            label="City of Residence"
          />{" "}
          <Select
            variant="standard"
            name="lga"
            options={[{ label: "Surulere", value: "Surulere" }]}
            onChange={() => {}}
            label="LGA of Residence"
          />{" "}
          <Select
            variant="standard"
            name="state"
            label="State of Residence"
            options={[
              { label: "Lagos", value: "Lagos" },
              { label: "Abuja", value: "Abuja" },
            ]}
            onChange={() => {}}
          />{" "}
          <Select
            variant="standard"
            name="country"
            options={country}
            onChange={() => {}}
            label="Country of Residence"
          />{" "} */}
          <Input
            variant="drawer"
            name="cscsCode"
            type="text"
            label="CSCS Code"
          />
          <Button fullWidth variant="yellow">
            Add Customer
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const IndividualCorporateForm = () => {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {() => (
        <Form>
          <Input
            variant="drawer"
            name="name"
            type="text"
            label="Company Name"
          />
          <Input
            variant="drawer"
            name="email"
            type="email"
            label="Email Address"
          />
          <Input
            variant="drawer"
            name="phoneNumber"
            type="tel"
            label="Phone Number"
          />
          <Input variant="drawer" name="bvn" type="text" label="BVN" />
          <Input
            variant="drawer"
            name="nextOfKin"
            type="text"
            label="Next of Kin"
          />
          <Input
            variant="drawer"
            name="address"
            type="text"
            label="Office Address"
          />{" "}
          <Input variant="drawer" name="city" type="text" label="City" />{" "}
          <Input variant="drawer" name="country" type="text" label="Country" />{" "}
          <Input
            variant="drawer"
            name="cscsCode"
            type="text"
            label="CSCS Code"
          />
          <Button height="42px" fullWidth variant="yellow">
            Add Customer
          </Button>
        </Form>
      )}
    </Formik>
  );
};
export const AddSingleCustomer = () => {
  const [type, setType] = useState<"Individual" | "Corporate">("Individual");

  return (
    <>
      <p style={{ fontSize: "12px", marginBottom: "24px" }}>
        Please input the details below
      </p>
      <Select
        variant="standard"
        label="Account Type"
        defaultValue={type}
        options={[
          { label: "Individual", value: "Individual" },
          { label: "Corporate Investor", value: "Corporate" },
        ]}
        onChange={(v: any) => setType(v)}
      />

      {type === "Individual" && <IndividualCustomerForm />}
      {type === "Corporate" && <IndividualCorporateForm />}
    </>
  );
};
