import { ChevronDownIcon } from "@/components/icons";
import { motion } from "framer-motion";
import styled from "styled-components";

export const SelectContainer = styled.div<{
  $width?: string;
  $variant?: string;
}>`
  position: relative;
  width: ${({ $width }) => $width || "100%"};
  margin-bottom: ${({ $variant }) => ($variant === "drawer" ? "12px" : "none")};
`;

export const SelectedContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;
export const SelectBox = styled.div<{
  $isOpen: boolean;
  $disabled?: boolean;
  $variant?: string;
  $removeBorder?: boolean;
}>`
  width: 100%;
  height: ${({ $variant }) => ($variant === "drawer" ? "37px" : "2rem")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  padding: 0 0.75rem;
  font-weight: 400;
  border: 1px solid
    ${({ $isOpen, $variant, $removeBorder }) =>
      $removeBorder
        ? "transparent"
        : $isOpen
        ? "#0D0D0C"
        : $variant === "drawer"
        ? "transparent"
        : "#d9d8d5"};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  background: ${({ $disabled }) => ($disabled ? "#f5f5f5" : "white")};
  border-radius: 0.313rem;
  user-select: none;
  box-sizing: border-box;
  outline: none;
`;

export const DropdownIcon = styled(motion(ChevronDownIcon))`
  transition: transform 0.3s ease;
`;

export const DropdownWrapper = styled(motion.div)`
  position: absolute;
  width: 100%;
  background: white;
  border-radius: 0.375rem;
  box-shadow: 0 4px 8px 0 rgba(16, 24, 64, 0.16);
  z-index: 10000;
  box-sizing: border-box;
  overflow: hidden;
  max-height: 12.5rem;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 0.188rem;
  }
`;

export const OptionItem = styled.div<{ $isSelected: boolean }>`
  padding: 0.875rem;
  cursor: pointer;
  font-size: 0.875rem;
  background: ${({ $isSelected }) => ($isSelected ? "#FFFCEB" : "white")};
  border-left: 0.125rem solid
    ${({ $isSelected }) => ($isSelected ? "#18A0FB" : "transparent")};
  &:hover {
    background: #fffceb;
  }
`;
