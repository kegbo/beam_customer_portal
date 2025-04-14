import styled from "styled-components";

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
    case "filter":
      return "0.031rem solid #D9D8D5";
    case "modal":
    default:
      return "0.031rem solid #D9D8D5";
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

export const InputWrapper = styled.div<{ $variant: string }>`
  display: flex;
  flex-direction: column;
  margin-top: ${({ $variant }) => ($variant === "drawer" ? "12px" : "none")};
  width: 100%;
  position: relative;
  // padding: 0 1px;
`;

export const InputLabel = styled.label`
  font-size: 0.625rem;
  margin-bottom: 2px;
  font-weight: 400;
  line-height: 18px;
  color: #595957;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledInput = styled.input<{
  $variant: string;
  $radius: string;
  $height?: string;
  $removeBorder?: boolean;
}>`
  width: 100%;
  height: ${({ $variant, $height }) => $height || getHeight($variant)};
  padding: 0 18px;
  border-radius: ${({ $radius }) => $radius};
  font-size: ${({ $variant }) => getTextSize($variant)};
  outline: 0.031rem solid transparent;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.031rem;
  transition: outline-color 0.3s ease;
  border: ${({ $variant, $removeBorder }) =>
    $removeBorder ? "0.031rem solid transparent" : getBorder($variant)};
  &:focus {
    outline-color: #0d0d0c;
  }
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;
