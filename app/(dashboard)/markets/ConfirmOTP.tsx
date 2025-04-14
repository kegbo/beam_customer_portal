import Button from "@/components/utilities/Button";
import { Formik, FormikValues, FormikHelpers, Form } from "formik";
import {
  ModalTitle,
  ModalDescription,
  ButtonGroupWrapper,
} from "@/components/wallet/funding/Initialize";
import { OTPInput } from "@/components/form/elements";
import styled from "styled-components";

export const MainContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(13, 13, 12, 0.5);
  display: flex;
  align-items: end;
  z-index: 11;
`;

export const FormContainer = styled.div`
  width: 450px;
  height: 463px;
  background: #fff;
  border-radius: 10px;
  padding: 24px;
`;

export const ConfirmOtpForm: React.FC<{
  onCompleted?: () => void;
  onCancel?: () => void;
}> = ({ onCompleted, onCancel }) => {
  const resetOTP = () => {};
  return (
    <FormContainer>
      <ModalTitle style={{ display: "flex", justifyContent: "center" }}>
        Verify OTP
      </ModalTitle>
      <ModalDescription style={{ textAlign: "center" }}>
        Please enter the OTP sent to your email address,
        victor.adeniyi@margnartis.com -{" "}
        <span style={{ color: "#429777" }}>28sec</span>
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
            <OTPInput
              length={4}
              onComplete={function (otp: string): void {
                throw new Error("Function not implemented.");
              }}
            />
            <ModalDescription style={{ marginTop: 48, textAlign: "center" }}>
              Didn't receive the email?{" "}
              <span
                style={{
                  fontWeight: 600,
                  textDecoration: "underline",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                Click here to resend.
              </span>
            </ModalDescription>

            <ButtonGroupWrapper>
              <Button
                onClick={onCancel}
                variant="ghost"
                height="42px"
                fullWidth
              >
                Cancel
              </Button>
              <Button
                onClick={onCompleted}
                height="42px"
                fullWidth
                variant="yellow"
              >
                Continue
              </Button>
            </ButtonGroupWrapper>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export const PurchaseStock: React.FC<{
  onCompleted?: () => void;
  onCancel: () => void;
  step: number;
}> = ({ onCompleted, onCancel, step }) => {
  return (
    <MainContainer>
      <ConfirmOtpForm onCancel={onCancel} onCompleted={onCompleted} />
    </MainContainer>
  );
};
