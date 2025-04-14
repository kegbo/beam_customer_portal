import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "@/components/utilities/Button";
import DocumentCheckIcon from "@/components/icons/document-check";


const ConfirmationContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
  height: 100%;
  width: 100%;
  
  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  width: 100%;
  margin-bottom: 4rem;
  color: #595957;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
`;

const MessageContainer = styled.div`
  max-width: 70%;
  
  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

const SuccessMessage = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #595957;
  line-height: 24px;
  line-spacing: 0.5px;
`;

const SubMessage = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #595957;
  line-height: 24px;
  line-spacing: 0.5px;
`;

const IconContainer = styled.div`
  position: relative;
  width: 55px;
  height: 51px;
  
  @media (max-width: 480px) {
    align-self: center;
  }
`;

const ContinueButtonWrapper = styled.div`
  width: 100%;
  max-width: 370px;
  margin: 0 auto;
  
  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

interface ConfirmationModalProps {
  onContinue: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onContinue,
}) => {
  return (
    <ConfirmationContainer>
      <ContentWrapper>
        <MessageContainer>
          <SuccessMessage>
            Your order has been processed successfully.
          </SuccessMessage>
          <SubMessage>
            Please check your email for a confirmation receipt.
          </SubMessage>
        </MessageContainer>

        <IconContainer>
          <DocumentCheckIcon width={40} height={40} />
        </IconContainer>
      </ContentWrapper>

      <ContinueButtonWrapper>
        <Button
          onClick={onContinue}
          variant="ghost"
          style={{
            width: "100%",
            height: "42px",
            fontSize: "1rem",
            borderRadius: "8px",
          }}
        >
          Continue
        </Button>
      </ContinueButtonWrapper>
    </ConfirmationContainer>
  );
};

export default ConfirmationModal;