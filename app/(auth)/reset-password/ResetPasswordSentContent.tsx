"use client";
import Button from "@/components/utilities/Button";
import Link from "next/link";
import styled from "styled-components";
import { CheckboxBaseIcon } from "@/components/icons/checkbox-circle-white";
import { BackToLogin } from "../AuthLayout";

const ContentContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }
`;

const IconContainer = styled.div`
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const Instructions = styled.p`
  font-size: 0.875rem;
  color: #595957;
  margin-bottom: 2rem;
  line-height: 1.5;
  max-width: 400px;
  
  @media (max-width: 768px) {
    font-size: 0.813rem;
    margin-bottom: 1.5rem;
  }
`;

const NoteText = styled.p`
  font-size: 0.813rem;
  color: #8C8C89;
  margin-top: 1.5rem;
  max-width: 400px;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
    margin-top: 1.25rem;
  }
`;

const StyledCircleIcon = styled(CheckboxBaseIcon)`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #00934C;
  display: flex;
  align-items: center;
  justify-content: center;
  
  rect {
    fill: #00934C;
  }
  
  path {
    fill: #fff;
  }
`;

export const ResetPasswordSentContent = () => {
  return (
    <ContentContainer>
      <IconContainer>
        <StyledCircleIcon width={48} height={48} />
      </IconContainer>
      
      <Instructions>
        We've sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.
      </Instructions>
      
    <BackToLogin marginBottom="36px" label="Back to Login?" />
      
      
      <NoteText>
        If you don't see the email, please check your spam folder or request another reset link.
      
      </NoteText>
    </ContentContainer>
  );
};