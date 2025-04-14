import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { ChevronLeftIcon } from "../icons";
import { BackButton } from "./BackButton";
import { ThreeDotLoader } from "../loader/threedot.loader";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const Backdrop = styled.div<{ $isOpen: boolean; $isMounted: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  animation: ${({ $isOpen }) => ($isOpen ? fadeIn : fadeOut)} 0.3s ease-out;
  transition: opacity 0.3s ease-out;
  z-index: 999;
  display: ${({ $isMounted }) =>
    $isMounted ? "block" : "none"}; // Prevent flash
`;

const DrawerHeader = styled.div`
  height: 4.625rem;
  z-index: 10;
  padding-left: 2.5rem;
  border-bottom: 0.063rem solid #d9d8d5;
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  background-color: #f9f9f7;
  line-height: 1.5rem;
  color: #0d0d0c;
  display: flex;
  align-items: center;
  gap: 12px;
  
  @media (max-width: 768px) {
    padding-left: 1.5rem;
    height: 3.5rem;
    font-size: 0.875rem;
  }
`;

const DrawerFooter = styled.div`
  height: 81px;
  z-index: 10;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  border-top: 0.063rem solid #d9d8d5;
  padding-top: 1.503rem;
  display: flex;
  align-items: center;
  gap: 12px;
  
  @media (max-width: 768px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    height: 70px;
    padding-top: 1rem;
  }
`;

const DrawerContainerWrapper = styled.div<{
  $isOpen: boolean;
  $width: string;
  $isMounted: boolean;
}>`
  position: fixed;
  top: 0;
  right: 0;
  width: ${({ $width }) => $width};
  height: 100vh;
  background-color: #f9f9f7;
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateX(0)" : "translateX(100%)"};

  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  z-index: 1000;
  display: ${({ $isMounted }) => ($isMounted ? "block" : "none")};
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: ${({ $width }) => Math.min(parseInt($width), 90) + "vw"};
  }
`;

const DrawerContainer = styled.div<{ $hideFooter: boolean }>`
  height: 100%;
  display: grid;
  grid-template-rows: ${({ $hideFooter }) =>
    $hideFooter ? "4.625rem 1fr" : "4.625rem 1fr 130px"};
  overflow-y: auto;
  
  @media (max-width: 768px) {
    grid-template-rows: ${({ $hideFooter }) =>
      $hideFooter ? "3.5rem 1fr" : "3.5rem 1fr 70px"};
  }
`;

const DrawerContent = styled.div`
  padding-left: 2.5rem;
  padding-top: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 0.75rem;
  flex: 1;
  overflow-y: auto;
  scroll-behavior: smooth;
  
  @media (max-width: 768px) {
    padding-left: 1.5rem;
    padding-right: 1rem;
    padding-top: 1rem;
  }
`;

const DrawerFooterText = styled.p`
  font-size: 0.75rem;
  line-height: 18px;
  color: rgba(13, 13, 12, 0.5);
  
  @media (max-width: 768px) {
    font-size: 0.625rem;
    line-height: 16px;
  }
`;

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  width?: string;
  children: React.ReactNode;
  title?: string;
  hideFooter?: boolean;
  footer?: React.ReactNode;
  isMultiStep?: boolean;
  isLoading?: boolean;
  onBack?: () => void;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  width = "450px",
  children,
  title,
  footer,
  hideFooter = false,
  isMultiStep = false,
  onBack,
  isLoading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <Backdrop $isOpen={isOpen} onClick={onClose} $isMounted={isMounted} />
      )}
      <DrawerContainerWrapper
        $isOpen={isOpen}
        $width={width}
        $isMounted={isMounted}
      >
        <DrawerContainer $hideFooter={hideFooter}>
          {title && (
            <DrawerHeader>
              {isMultiStep && <BackButton onClick={onBack} />}
              <p>{title}</p>
            </DrawerHeader>
          )}
          <DrawerContent>
            {isLoading ? <ThreeDotLoader /> : children}
          </DrawerContent>
          {!hideFooter &&
            (footer || (
              <DrawerFooter>
                <img src="./drawer-footer-shield.svg" width="24" height="24" />
                <DrawerFooterText>
                  Secured and Collateralised Platform{" "}
                  <span style={{ fontWeight: 600, color: "#0D0D0C" }}>
                    Powered by Beam
                  </span>
                </DrawerFooterText>
              </DrawerFooter>
            ))}
        </DrawerContainer>
      </DrawerContainerWrapper>
    </>
  );
};

export default Drawer;