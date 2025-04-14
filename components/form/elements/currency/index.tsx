import React from "react";
import { useField } from "formik";
import {
  CurrencyInputContainer,
  CurrencyInputEl,
  CurrencyInputMainContainer,
  FlagOverlay,
} from "./CurrencyInput.style";
import { ErrorMessage, InputLabel } from "../input/Input.style";

type CurrencyInputProps = {
  label?: string;
  name: string;
  style?: React.CSSProperties;
};

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
    <CurrencyInputMainContainer style={style}>
      {label && <InputLabel>{label}</InputLabel>}
      <CurrencyInputContainer>
        <CurrencyInputEl
          {...field}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="₦0.00"
          error={!!error}
        />
        <FlagOverlay>
          <img src="/naira-nigeria-flag.svg" />
        </FlagOverlay>
      </CurrencyInputContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </CurrencyInputMainContainer>
  );
};

export default CurrencyInput;
