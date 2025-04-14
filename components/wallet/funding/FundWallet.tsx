"use client";
import Modal from "../../Modal";
import { FormInputContainer } from "../../utilities/utility.component";

import { useState, useEffect } from "react";
import { InitializeFundingForm } from "./Initialize";
import { FundingOtpForm, OTPConfirmed } from "./FundingOTP";
import { useAtom } from "jotai";
import { addCustomerFundModal } from "@/utils/atom";
import styled from "styled-components";

// Make the modal content responsive
const ResponsiveFormContainer = styled(FormInputContainer)`
  width: 100%;
  
  @media (max-width: 576px) {
    /* Reduce spacing on mobile */
    gap: 0.5rem;
  }
`;

export const FundWallet = () => {
  const [isOpen, setIsOpen] = useAtom(addCustomerFundModal);
  const [step, setStep] = useState("init");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 576);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleCancel = () => {
    setStep("init");
    setIsOpen(false);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleCancel}
      width={isMobile ? "90%" : "535px"}
      padding={isMobile ? "2rem" : "4.5rem"}
    >
      <ResponsiveFormContainer>
        {step === "init" && (
          <InitializeFundingForm
            onCancel={handleCancel}
            onCompleted={() => setStep("otp")}
          />
        )}
        {step === "otp" && (
          <FundingOtpForm
            onCancel={handleCancel}
            onCompleted={() => setStep("otp-confirmed")}
          />
        )}

        {step === "otp-confirmed" && <OTPConfirmed onClose={handleCancel} />}
      </ResponsiveFormContainer>
    </Modal>
  );
};