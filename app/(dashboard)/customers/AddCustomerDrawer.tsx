"use client";

import { AddSingleCustomer } from "./AddSingleCustomer";
import Drawer from "@/components/utilities/Drawer";
import Button from "@/components/utilities/Button";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { AddBulkCustomer } from "./AddBulkCustomer";
import { useAtom, useAtomValue } from "jotai";
import { addCustomerDrawerAtom } from "@/utils/atom";

const FileUploadButton = styled.img`
  width: 100%;
  margin-top: 24px;
  cursor: pointer;
`;

export const AddCustomerDrawer = () => {
  const [isOpen, setIsOpen] = useAtom(addCustomerDrawerAtom);

  const [selection, setSelection] = useState<"single" | "bulk" | null>(null);
  const [selectedFile, setSelectedFile] = useState<FileList | null>(null);
  const [step, setStep] = useState<number>(0);

  const title =
    selection === "bulk" ? "Add Multiple Customers" : "Add New Customer";
  return (
    <Drawer
      title={title}
      width="338px"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      isMultiStep={step > 0}
      onBack={() => {
        if (step > 0) {
          setStep(step - 1);
        }
      }}
    >
      {step > 0 ? (
        <>
          {selection === "single" && <AddSingleCustomer />}

          {selection === "bulk" && <AddBulkCustomer />}
        </>
      ) : (
        <>
          {!selectedFile && (
            <>
              <p
                style={{
                  fontSize: "12px",
                  marginBottom: "24px",
                  marginTop: "20px",
                }}
              >
                Select any of the options to add your customers
              </p>
              <Button
                onClick={() => {
                  setStep(1);
                  setSelection("single");
                }}
                style={{ marginTop: "41px" }}
                fullWidth
              >
                Add a Customer
              </Button>
            </>
          )}

          <FileUploadButton
            onClick={() => {
              setStep(1);
              setSelection("bulk");
            }}
            src="./customer-upload.svg"
          />
        </>
      )}
    </Drawer>
  );
};
