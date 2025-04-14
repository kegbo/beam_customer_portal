import styled from "styled-components";
import { StyledInput } from "../input/Input.style";

export const OTPContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const OTPInputEl = styled(StyledInput)`
  width: 89px;
  height: 42px;
  text-align: center;
  border-radius: 5px;
`;
