"use client";

import { CircleWavyCheck, ShieldIcon, VectorIcon } from "@/components/icons";
import { SidebarLogo } from "@/components/layouts/layout.component";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const LayoutWrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 29.125rem 1fr;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ForgotPasswordLinkContainer = styled.div`
  text-align: right;
  font-size: 0.875rem;
  color: #595957;
`;

export const BackToLoginLinkContainer = styled.div`
  text-align: right;
  font-size: 0.875rem;
  color: #595957;
`;

const LayoutLeftContainer = styled.div`
  background-image: url("./looper-bg.svg");
  background-color: #0c110d;
  padding-left: 4.875rem;
  padding-bottom: 4.5rem;
  display: flex;
  flex-direction: column;
  color: white;
  justify-content: flex-end;
  background-repeat: no-repeat;
  background-position: left bottom;
  background-size: cover;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const LayoutRightContainer = styled.div`
  padding-left: 11.188rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  padding-top: 112px;
  padding-bottom: 50px;
  scroll-behavior: smooth;
  
  @media (max-width: 1024px) {
    padding-left: 6rem;
  }
  
  @media (max-width: 768px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  
  @media (max-width: 480px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

// Mobile-only logo container (will only display on mobile)
const MobileLogoContainer = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  }
`;

const Tagline = styled.p`
  width: 300px;
  font-size: 1.875rem;
  color: white;
  font-weight: 600;
  margin-top: 1.5rem;
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 42px;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 300;
  line-height: 24px;
`;

const Heading = styled.h1`
  font-size: 2.25rem;
  font-weight: 600;
  line-height: 42px;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
    line-height: 36px;
  }
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: #474d66;
  line-height: 1.25rem;
  letter-spacing: 0.031rem;
`;

const LayoutLeft = () => {
  return (
    <LayoutLeftContainer>
      <SidebarLogo
        style={{ width: 48, height: 48, color: "#000000", fontSize: 24 }}
      >
        B.
      </SidebarLogo>
      <Tagline>Unlock High Returns with Collateralized Equity Asset</Tagline>
      <Ul>
        <Li>
          <VectorIcon width={18} height={18} />
          Collaterized
        </Li>
        <Li>
          <ShieldIcon width={18} height={18} />
          Secured
        </Li>
        <Li>
          <CircleWavyCheck width={18} height={18} />
          Licence & regulated
        </Li>
      </Ul>
    </LayoutLeftContainer>
  );
};

export const AuthHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        position: "sticky",
        top: 0,
        zIndex: 10,
        backgroundColor: "white",
      }}
    >
      <Heading>{title}</Heading>
      <Description>{description}</Description>
    </div>
  );
};

const LayoutRight = ({ children }: { children: React.ReactNode }) => {
  return (
    <LayoutRightContainer>
      <div style={{ width: "27.5rem", overflow: "auto", maxWidth: "100%" }}>
        <MobileLogoContainer>
          <SidebarLogo
            style={{ width: 48, height: 48, backgroundColor: "#18A0FB", color: "#000000", fontSize: 24 }}
          >
            B.
          </SidebarLogo>
        </MobileLogoContainer>
        {children}
      </div>
    </LayoutRightContainer>
  );
};

export const AuthLayoutContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <LayoutWrapper>
      <LayoutLeft />
      <LayoutRight>{children}</LayoutRight>
    </LayoutWrapper>
  );
};

export const ForgotPassword = ({
  label,
  marginBottom,
}: {
  label: string;
  marginBottom?: string;
}) => {
  return (
    <ForgotPasswordLinkContainer style={{ marginBottom }}>
      <Link href={"forget-password"}>{label}</Link>
    </ForgotPasswordLinkContainer>
  );
};


export const BackToLogin = ({
  label,
  marginBottom,
}: {
  label: string;
  marginBottom?: string;
}) => {
  return (
    <BackToLoginLinkContainer style={{ marginBottom }}>
      <Link href={"login"}>{label}</Link>
    </BackToLoginLinkContainer>
  );
};