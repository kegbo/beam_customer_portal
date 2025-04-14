import { motion } from "framer-motion";
import styled from "styled-components";

export const DatePickerContainer = styled.div<{ $width?: string }>`
  position: relative;
  width: ${({ $width }) => $width || "100%"};
`;

export const CalendarWrapper = styled(motion.div).attrs({ layout: true })`
  position: absolute;
  top: 50px;
  left: 0;
  background: white;
  padding: 1.5rem;
  box-shadow: 0 4px 4px -4px rgba(12, 12, 13, 0.05);
  box-shadow: 0 16px 16px -8px rgba(12, 12, 13, 0.1);
  z-index: 100;
  min-width: 16.438rem;
  min-height: 16.313rem;
  border-radius: 1.25rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 1.75rem;
  color: #3b3a39;
  user-select: none;
`;

export const DaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

export const Day = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
  color: #3b3a39;
  user-select: none;
`;

export const DateCell = styled.div<{
  $isSelected: boolean;
  $isInRange: boolean;
  $isDisabled?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ $isSelected, $isInRange }) =>
    $isSelected
      ? "#18A0FB"
      : $isInRange
      ? "rgba(255, 222, 2, 0.2)"
      : "transparent"};
  color: ${({ $isDisabled }) => ($isDisabled ? "#A0A0A0" : "#0d0d0c")};
  cursor: ${({ $isDisabled }) => ($isDisabled ? "not-allowed" : "pointer")};
  font-size: 0.875rem;
  user-select: none;

  &:hover {
    background: ${({ $isDisabled }) => ($isDisabled ? "transparent" : "#ddd")};
  }
`;
