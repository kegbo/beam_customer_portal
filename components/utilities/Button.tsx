"use client";

import styled, { CSSProp } from "styled-components";
import Spinner from "../Spinner";
import React from "react";

const getBackgroundColor = (variant: string) => {
  switch (variant) {
    case "ghost":
      return "#FFFFFF";
    case "ghost-slim":
      return "#FFFFFF";
    case "yellow":
      return "#18A0FB";
    case "red":
      return "#D14343";
    case "green":
      return "#149D52";
    default:
      return "linear-gradient(135.83deg, #3E3E39 -59.4%, #0D0D0C 137.23%)";
  }
};

const getTextColor = (variant: string) => {
  switch (variant) {
    case "ghost":
    case "ghost-slim":
    case "yellow":
      return "#0D0D0C";
    case "green":
    case "red":
      return "#FFFFFF";
    default:
      return "#FFFFFF";
  }
};

const getBorderColor = (variant: string) => {
  switch (variant) {
    case "yellow":
      return "#18A0FB";
    case "ghost":
      return "#0D0D0C";
    case "red":
      return "red";
    case "ghost-slim":
      return "#A6A5A2";
    default:
      return "transparent";
  }
};

const StyledButton = styled.button<{
  $variant: string;
  $fullWidth?: boolean;
  $height?: string;
  $radius?: string;
  $background?: string;
  $color?: string;
  $borderColor?: string;
  $width?: string;
}>`
  font-size: 0.75rem;
  border: 1px solid transparent;
  border-radius: ${({ $radius }) => $radius || "8px"};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  // font-weight: 600;
  justify-content: center;
  height: ${({ $height }) => $height || "42px"};
  padding: 0 1.125rem;
  gap: 0.625rem;
  width: ${({ $fullWidth, $width }) =>
    $fullWidth ? "100%" : $width || "auto"};
  border-color: ${({ $variant }) => getBorderColor($variant)};
  background: ${({ $variant }) => getBackgroundColor($variant)};

  color: ${({ $variant }) => getTextColor($variant)};

  &:hover {
    opacity: 0.9;
    // transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;

// Button Component
interface ButtonProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  variant?: "yellow" | "red" | "ghost" | "default" | "green" | "ghost-slim";
  onClick?: () => void;
  fullWidth?: boolean;
  height?: string;
  width?: string;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  radius?: string;
  background?: string;
  color?: string;
  borderColor?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

export default function Button({
  children,
  variant = "default",
  onClick,
  icon,
  fullWidth = false,
  iconPosition = "right",
  height,
  width,
  isLoading,
  radius = "8px",
  background,
  color,
  borderColor,
  style,
  disabled,
}: ButtonProps) {
  return (
    <div style={{ padding: "0 1px" }}>
      <StyledButton
        $variant={variant}
        $height={height}
        onClick={onClick}
        $fullWidth={fullWidth}
        $radius={radius}
        $background={background}
        $width={width}
        $color={color}
        $borderColor={borderColor}
        style={style}
        disabled={disabled}
      >
        {isLoading ? (
          <Spinner size={35} />
        ) : (
          <>
            {" "}
            {iconPosition === "left" && icon}
            <span>{children}</span>
          </>
        )}
        {iconPosition === "right" && icon}
      </StyledButton>
    </div>
  );
}
