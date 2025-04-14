import CurrencyInput from "@/components/CurrencyInput";
import DatePicker from "@/components/DatePicker";
import FileUploader from "@/components/FileUploader";
import Input from "@/components/Input";
import Button from "@/components/utilities/Button";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import styled from "styled-components";
import { useEffect, useState } from "react";

export const ModalTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 24px;
  margin-bottom: 1.131rem;
  
  @media (max-width: 576px) {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
  }
`;

export const ModalDescription = styled.p`
  font-size: 0.75rem;
  color: #595957;
  margin-bottom: 1.119rem;
  
  @media (max-width: 576px) {
    margin-bottom: 0.875rem;
  }
`;

export const ButtonGroupWrapper = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  margin-top: 37px;
  
  @media (max-width: 576px) {
    margin-top: 24px;
    flex-direction: column;
    gap: 8px;
  }
  
  @media (min-width: 576px) and (max-width: 768px) {
    margin-top: 30px;
  }
`;

const InputGroupWrapper = styled.div`
  display: grid;
  grid-template-columns: 237px 1fr;
  gap: 13px;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const UL = styled.ul`
  list-style-type: none;
`;

export const InitializeFundingForm: React.FC<{
  onCompleted?: () => void;
  onCancel?: () => void;
}> = ({ onCompleted, onCancel }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 576);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <>
      <ModalTitle>Fund Wallet</ModalTitle>
      <ModalDescription>
        Please enter the amount you wish to add.
      </ModalDescription>
      <Formik
        initialValues={{}}
        onSubmit={function (
          values: FormikValues,
          formikHelpers: FormikHelpers<FormikValues>
        ): void | Promise<any> {
          throw new Error("Function not implemented.");
        }}
      >
        {() => (
          <Form>
            <CurrencyInput name={"name"} />
            <InputGroupWrapper>
              <Input label="Session ID" variant="modal" name={"sessionId"} />
              <DatePicker
                selectionMode="single"
                label="Transaction date"
                variant="modal"
                onClick={function (
                  startDate: Date | null,
                  endDate: Date | null
                ): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </InputGroupWrapper>
            <div style={{ marginTop: isMobile ? '12px' : '16px' }}>
              <FileUploader
                onFileSelect={function (files: FileList): void {
                  console.log(files);
                }}
              />
            </div>
            <ButtonGroupWrapper>
              <Button
                onClick={onCancel}
                variant="ghost"
                height={isMobile ? "36px" : "42px"}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                height={isMobile ? "36px" : "42px"}
                fullWidth
                variant="yellow"
                onClick={onCompleted}
              >
                Continue
              </Button>
            </ButtonGroupWrapper>
          </Form>
        )}
      </Formik>
    </>
  );
};