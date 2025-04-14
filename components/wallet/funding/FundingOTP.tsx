import Button from "@/components/utilities/Button";
import { Formik, FormikValues, FormikHelpers, Form } from "formik";
import { ModalTitle, ModalDescription, ButtonGroupWrapper } from "./Initialize";
import OTPForm from "@/components/OTPInput";
import { WalletIcon } from "@/components/icons/wallet";
import styled from "styled-components";
import { useEffect, useState } from "react";

const OTPConfirmContainer = styled.div`
  @media (max-width: 576px) {
    text-align: center;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 576px) {
    flex-direction: column-reverse;
    align-items: center;
    gap: 12px;
  }
`;

const TitleText = styled.span`
  width: 200px;
  line-height: 36px;
  
  @media (max-width: 576px) {
    width: 100%;
    text-align: center;
    line-height: 28px;
  }
`;

const ResponsiveOTPContainer = styled.div`
  width: 100%;
  
  @media (max-width: 576px) {
    /* Center the OTP inputs */
    display: flex;
    justify-content: center;
    margin: 16px 0;
  }
`;

const ResendLinkText = styled.span`
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
  user-select: none;
  
  @media (max-width: 576px) {
    /* Make the touch target larger on mobile */
    padding: 4px;
    display: inline-block;
  }
`;

export const OTPConfirmed: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
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
    <OTPConfirmContainer>
      <TitleContainer>
        <TitleText>
          Wallet Funding Request Sent!
        </TitleText>
        <WalletIcon width={isMobile ? 45 : 55} height={isMobile ? 41 : 51} />
      </TitleContainer>
      <ModalDescription style={{ marginBottom: isMobile ? 50 : 93 }}>
        The request to fund the wallet has been sent successfully. Check your
        email for a confirmation receipt.
      </ModalDescription>
      <Button variant="ghost" onClick={onClose} height={isMobile ? "36px" : "42px"} fullWidth>
        Continue
      </Button>
    </OTPConfirmContainer>
  );
};

export const FundingOtpForm: React.FC<{
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
            <ResponsiveOTPContainer>
              <OTPForm
                length={4}
                onComplete={function (otp: string): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </ResponsiveOTPContainer>
            <ModalDescription style={{ marginTop: isMobile ? 24 : 48, textAlign: isMobile ? 'center' : 'initial' }}>
              Didn't receive the email?{" "}
              <ResendLinkText>
                Click here to resend.
              </ResendLinkText>
            </ModalDescription>

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
                onClick={onCompleted}
                height={isMobile ? "36px" : "42px"}
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