import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

export const Backdrop = styled.div<{ $isOpen: boolean; $isMounted: boolean }>`
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

export const DrawerHeader = styled.div`
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
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
`;

export const DrawerFooter = styled.div`
  height: 81px;
  z-index: 12;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  border-top: 0.063rem solid #d9d8d5;
  padding-top: 1.503rem;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const DrawerContainerWrapper = styled.div<{
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
`;

export const DrawerContainer = styled.div<{ $hideFooter: boolean }>`
  height: 100%;
  display: grid;
  grid-template-rows: ${({ $hideFooter }) =>
    $hideFooter ? "4.625rem 1fr" : "4.625rem 1fr 130px;"}
  overflow-y: auto;
`;

export const DrawerContent = styled.div`
  padding-left: 2.5rem;
  padding-top: 1.5rem;
  padding-right: 2.5rem;
  padding-bottom: 0.75rem;
  flex: 1;
  overflow-y: auto;
  scroll-behavior: smooth;
`;

export const DrawerFooterText = styled.p`
  font-size: 0.75rem;
  line-height: 18px;
  width: 250px;
  color: rgba(13, 13, 12, 0.5);
`;
