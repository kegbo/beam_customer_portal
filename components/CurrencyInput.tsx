import React from "react";
import styled from "styled-components";
import { useField } from "formik";

type CurrencyInputProps = {
  label?: string;
  name: string;
  style?: React.CSSProperties;
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
  position: relative;
  
  @media (max-width: 576px) {
    margin-bottom: 0.75rem;
  }
`;

export const InputLabel = styled.label`
  font-size: 0.75rem;
  margin-bottom: 5px;
  color: #595957;
  font-weight: 400;
  
  @media (max-width: 576px) {
    margin-bottom: 3px;
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const StyledInput = styled.input<{ error?: boolean }>`
  width: 100%;
  height: 40px;
  padding: 0 18px;
  padding-left: 10px; /* Space for text input */
  padding-right: 35px; /* Space for flag */
  border: 0.031rem solid ${(props) => (props.error ? "red" : "#595957")};
  border-radius: 5px;
  font-size: 0.75rem;
  outline: 1px solid transparent;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.031rem;
  transition: outline-color 0.3s ease;
  text-align: left;
  
  &:focus {
    border-color: ${(props) => (props.error ? "#D14343" : "#0D0D0C")};
    outline-color: ${(props) => (props.error ? "#D14343" : "#0D0D0C")};
  }
  
  @media (max-width: 576px) {
    height: 36px;
    font-size: 0.7rem;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
  
  @media (max-width: 576px) {
    font-size: 10px;
    margin-top: 3px;
  }
`;

const FlagOverlay = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.25rem;
  
  img {
    height: 24px;
    width: auto;
    
    @media (max-width: 576px) {
      height: 20px;
    }
  }
`;

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  label,
  name,
  style,
}) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const { value } = field;

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    return numericValue ? `₦${Number(numericValue).toLocaleString()}` : "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(formatCurrency(e.target.value));
  };

  const error = meta.touched && meta.error ? meta.error : "";

  return (
    <InputWrapper style={style}>
      {label && <InputLabel>{label}</InputLabel>}
      <InputContainer>
        <StyledInput
          {...field}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="₦0.00"
          error={!!error}
        />
        <FlagOverlay>
          <img src="/naira-nigeria-flag.svg" alt="Naira flag" />
        </FlagOverlay>
      </InputContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
};

export default CurrencyInput;