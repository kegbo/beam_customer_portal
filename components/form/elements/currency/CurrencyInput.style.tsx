import styled from "styled-components";
import { InputContainer } from "../input/Input.style";

export const CurrencyInputMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
  position: relative;
`;

export const InputLabel = styled.label`
  font-size: 0.75rem;
  margin-bottom: 5px;
  color: #595957;
  font-weight: 400;
`;

export const CurrencyInputContainer = styled(InputContainer)`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const CurrencyInputEl = styled.input<{ error?: boolean }>`
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
`;

export const FlagOverlay = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.25rem;
`;
