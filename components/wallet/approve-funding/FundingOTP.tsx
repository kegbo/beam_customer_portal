import Button from "@/components/utilities/Button";
import { Formik, FormikValues, FormikHelpers, Form } from "formik";
import {
  ModalTitle,
  ModalDescription,
  ButtonGroupWrapper,
} from "../funding/Initialize";
import OTPForm from "@/components/OTPInput";
import { WalletIcon } from "@/components/icons/wallet";

export const OTPConfirmed: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <>
      <ModalTitle style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ width: 200, lineHeight: "36px" }}>
          Wallet Funding Request Sent!
        </span>
        <WalletIcon width={55} height={51} />
      </ModalTitle>
      <ModalDescription style={{ marginBottom: 93 }}>
        The request to fund the wallet has been sent successfully. Check your
        email for a confirmation receipt.
      </ModalDescription>
      <Button variant="ghost" onClick={onClose} height="42px" fullWidth>
        Continue
      </Button>
    </>
  );
};

export const FundingOtpForm: React.FC<{
  onCompleted?: () => void;
  onCancel?: () => void;
}> = ({ onCompleted, onCancel }) => {
  const resetOTP = () => {};
  return (
    <>
      <ModalTitle>Verify OTP</ModalTitle>
      <ModalDescription>
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
            <OTPForm
              length={4}
              onComplete={function (otp: string): void {
                throw new Error("Function not implemented.");
              }}
            />
            <ModalDescription style={{ marginTop: 48 }}>
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
    </>
  );
};
