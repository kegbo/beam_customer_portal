import React from "react";
import styled, { keyframes } from "styled-components";

// Keyframes for the loading animation (dots bouncing)
const bounce = keyframes`
  0%, 100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
`;

// Wrapper for the loader to center it
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
`;

// Style for each dot in the loader
interface DotProps {
  delay: string;
}

const Dot = styled.div<DotProps>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #8c8c89; // Material purple color (Google style)
  animation: ${bounce} 1.4s infinite ease-in-out;
  animation-delay: ${(props) => props.delay};

  /* Each dot has a different animation delay for the bouncing effect */
  &:nth-child(1) {
    animation-delay: 0s;
  }
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

export const ThreeDotLoader: React.FC = () => {
  return (
    <LoaderWrapper>
      <Dot delay="0s" />
      <Dot delay="0.2s" />
      <Dot delay="0.4s" />
    </LoaderWrapper>
  );
};
