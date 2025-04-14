import styled from "styled-components";

export const CheckboxLabel = styled.span`
  color: #3b3a39;
  user-select: none;
`;

export const CheckboxWrapper = styled.label<{ $size: string; $color: string }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
  font-size: ${(props) => props.$size};
  color: ${(props) => props.$color};
`;

export const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;

export const IconWrapper = styled.span`
  display: flex;
  transition: transform 0.2s ease-in-out;
  input:checked + & {
    transform: scale(1.1);
  }
`;
