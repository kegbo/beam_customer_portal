"use client";
import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f3f4f6;
`;

const Spinner = styled.div`
  width: 64px;
  height: 64px;
  border: 4px solid rgba(0, 0, 255, 0.3);
  border-top-color: blue;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export default function Loading() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 15000); // 1-second delay
    return () => clearTimeout(timer);
  }, []);

  if (!showLoader) return null;

  return (
    <LoaderWrapper>
      <Spinner />
    </LoaderWrapper>
  );
}
