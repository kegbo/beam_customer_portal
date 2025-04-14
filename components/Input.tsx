import React from "react";
import styled from "styled-components";

type InputProps = {
  label?: string;
  error?: string;
  variant?: "default" | "drawer" | "modal" | "filter";
  radius?: string;
  render?: (value: any, row: Record<string, any>) => React.ReactNode;
  labelStyle?: React.CSSProperties;
} & React.InputHTMLAttributes<HTMLInputElement>;

const getHeight = (variant: string) => {
  switch (variant) {
    case "drawer":
      return "36px";
    case "filter":
      return "32px";
    default:
      return "40px";
  }
};

const getBorder = (variant: string) => {
  switch (variant) {
    case "drawer":
      return "0.031rem solid #FFFFFF";
    case "modal":
      return "0.031rem solid #D9D8D5";
    case "filter":
      return "0.031rem solid #D9D8D5";
    default:
      return "0.031rem solid #595957";
  }
};

const getTextSize = (variant: string) => {
  switch (variant) {
    case "drawer":
    case "modal":
    case "filter":
      return "0.625rem";
    default:
      return "1rem";
  }
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
  position: relative;
  padding: 0 1px;
`;

export const InputLabel = styled.label`
  font-size: 0.625rem;
  margin-bottom: 2px;
  font-weight: 400;
  line-height: 18px;
  color: #595957;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledInput = styled.input<{ $variant: string; $radius: string }>`
  width: 100%;
  height: ${({ $variant }) => getHeight($variant)};
  padding: 0 18px;
  border-radius: ${({ $radius }) => $radius};
  font-size: ${({ $variant }) => getTextSize($variant)};
  outline: 0.031rem solid transparent;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.031rem;
  transition: outline-color 0.3s ease;
  border: ${({ $variant }) => getBorder($variant)};
  &:focus {
    outline-color: #0d0d0c;
  }
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const Input: React.FC<InputProps> = ({
  label,
  variant = "default",
  render,
  radius = "5px",
  labelStyle,
  ...props
}) => {
  return (
    <InputWrapper>
      {label && <InputLabel style={labelStyle}>{label}</InputLabel>}
      <InputContainer>
        {render ? (
          render(props.value, { name: props.name || "" })
        ) : (
          <StyledInput $radius={radius} $variant={variant} {...props} />
        )}
      </InputContainer>
    </InputWrapper>
  );
};

export default Input;
