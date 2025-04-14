import React from "react";
import {
  InputWrapper,
  InputLabel,
  InputContainer,
  StyledInput,
  ErrorMessage,
} from "./Input.style";

type InputProps = {
  label?: string;
  error?: string;
  variant?: "default" | "drawer" | "modal" | "filter";
  radius?: string;
  height?: string;
  render?: (value: any, row: Record<string, any>) => React.ReactNode;
  labelStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  removeBorder?: boolean;
  wrapperStyle?: React.CSSProperties;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = ({
  label,
  error,
  variant = "default",
  render,
  radius = "5px",
  labelStyle,
  height,
  removeBorder,
  inputStyle,
  wrapperStyle,
  ...props
}) => {
  return (
    <InputWrapper $variant={variant} style={wrapperStyle}>
      {label && <InputLabel style={labelStyle}>{label}</InputLabel>}
      <InputContainer>
        {render ? (
          render(props.value, { name: props.name || "" })
        ) : (
          <StyledInput
            $radius={radius}
            $height={height}
            $variant={variant}
            $removeBorder={removeBorder}
            style={inputStyle}
            {...props}
          />
        )}
      </InputContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}{" "}
      {/* Display error message */}
    </InputWrapper>
  );
};
