"use client";

import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const PopupWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const TriggerButton = styled.button`
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;
`;

const PopupContainer = styled(motion.div)<{
  position: string;
  isVisible: boolean;
}>`
  position: absolute;
  background: white;
  box-shadow: 0 0.25rem 0.5rem 0px rgba(16, 24, 64, 0.16);
  border-radius: 0.25rem;
  width: auto;
  z-index: 10;
  ${({ position }) => position};
  pointer-events: ${({ isVisible }) => (isVisible ? "auto" : "none")};
`;

const PopupItemContainer = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  height: 2.5rem;
  gap: 1rem;
  cursor: pointer;
  min-width: 148px;
  display: flex;
  align-items: center;
  border-left: 0.089rem solid transparent;
  &:hover {
    background: rgba(251, 248, 229, 1);
    border-left-color: #f9d900;
  }
`;

const popupVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

interface SmartPopupProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  defaultPosition?: "top" | "bottom" | "left" | "right";
}

export default function SmartPopup({
  trigger,
  children,
  defaultPosition = "bottom",
}: SmartPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState("");
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const togglePopup = () => {
    setIsVisible((prev) => !prev);
  };

  const closePopup = (e: MouseEvent) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(e.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target as Node)
    ) {
      setIsVisible(false);
    }
  };

  const updatePosition = () => {
    if (!buttonRef.current || !popupRef.current) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const popupRect = popupRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let newPosition = "";

    switch (defaultPosition) {
      case "top":
        newPosition = "bottom: 100%; left: 50%; transform: translateX(-50%);";
        break;
      case "bottom":
        newPosition = "top: 100%; left: 50%; transform: translateX(-50%);";
        break;
      case "left":
        newPosition = "right: 100%; top: 50%; transform: translateY(-50%);";
        break;
      case "right":
        newPosition = "left: 100%; top: 50%; transform: translateY(-50%);";
        break;
      default:
        newPosition = "bottom: 100%; left: 50%; transform: translateX(-50%);";
    }

    if (buttonRect.bottom + popupRect.height > viewportHeight) {
      newPosition = "top: -100%; left: 50%; transform: translateX(-50%);";
    }
    if (buttonRect.top - popupRect.height < 0) {
      newPosition = "bottom: 100%; left: 50%; transform: translateX(-50%);";
    }
    if (buttonRect.left + popupRect.width > viewportWidth) {
      newPosition = "right: 100%; top: 50%; transform: translateY(-50%);";
    }
    if (buttonRect.right - popupRect.width < 0) {
      newPosition = "left: 100%; top: 50%; transform: translateY(-50%);";
    }

    setPosition(newPosition);
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("mousedown", closePopup);
      updatePosition();
    } else {
      document.removeEventListener("mousedown", closePopup);
    }

    return () => document.removeEventListener("mousedown", closePopup);
  }, [isVisible]);

  return (
    <PopupWrapper>
      <TriggerButton ref={buttonRef} onClick={togglePopup}>
        {trigger}
      </TriggerButton>

      <AnimatePresence>
        {isVisible && (
          <PopupContainer
            ref={popupRef}
            position={position}
            isVisible={isVisible}
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {children}
          </PopupContainer>
        )}
      </AnimatePresence>
    </PopupWrapper>
  );
}

export const PopupItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}> = ({ icon, label, onClick }) => {
  return (
    <PopupItemContainer onClick={onClick}>
      {icon}
      {label}
    </PopupItemContainer>
  );
};
