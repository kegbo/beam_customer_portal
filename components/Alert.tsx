"use client";

import { useState } from "react";
import { Toaster } from "react-hot-toast";
import styled, { keyframes, css } from "styled-components";
import { ErrorIcon } from "./icons/error";
import { SuccessIcon } from "./icons/success";

// Keyframe animations should be wrapped with css
const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const AlertContainer = styled.div<{ $isExiting: boolean }>`
  width: 332px;
  height: 84px;
  border-radius: 6px;
  padding: 12px;
  padding-right: 31px;
  color: #595957;
  display: flex;
  align-items: center;
  gap: 18px;
  animation: ${(props) =>
    props.$isExiting
      ? css`
          ${slideOut} 0.5s ease-in-out forwards;
        `
      : css`
          ${slideIn} 0.3s ease-in-out forwards;
        `};
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
`;

const Success = styled(AlertContainer)`
  background-color: #dcf2ea;
`;

const Error = styled(AlertContainer)`
  background-color: #f1dddd;
`;

const AlertTitle = styled.p`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #0d0d0c;
`;

const AlertMessage = styled.p`
  font-weight: 400;
  font-size: 10px;
  line-height: 18px;
`;

const AlertMessageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Alert = () => {
  const [isExiting, setIsExiting] = useState(false);

  // This function will trigger the exit animation after a delay
  const handleShowNotification = () => {
    setIsExiting(false);
    setTimeout(() => {
      setIsExiting(true);
    }, 3000); // Keeps the notification on screen for 3 seconds
  };

  return (
    <Toaster
      toastOptions={{
        className: "",
        style: {
          padding: "12px",
          height: "84px",
          borderRadius: "6px",
          width: "332px",
        },
        success: {
          style: {
            backgroundColor: "#DCF2EA",
          },
        },
      }}
    >
      {({ type, message }) => {
        return type === "success" ? (
          <Success $isExiting={isExiting}>
            <SuccessIcon height={54} width={54} />
            <AlertMessageContainer>
              <AlertTitle>Success</AlertTitle>
              <AlertMessage>{message?.toString()}</AlertMessage>
            </AlertMessageContainer>
          </Success>
        ) : type === "error" ? (
          <Error $isExiting={isExiting}>
            <ErrorIcon height={54} width={54} />
            <AlertMessageContainer>
              <AlertTitle style={{ color: "#D14343" }}>Sorry</AlertTitle>
              <AlertMessage>{message?.toString()}</AlertMessage>
            </AlertMessageContainer>
          </Error>
        ) : (
          <></>
        );
      }}
    </Toaster>
  );
};
