import styled from "styled-components";
import { CheckboxCheckedIcon, CheckboxOutlineIcon } from "./icons";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  size?: string;
  color?: string;
  label?: string;
  labelStyle?: React.CSSProperties;
}

const CheckboxLabel = styled.span`
  color: #3b3a39;
  user-select: none;
`;
const CheckboxWrapper = styled.label<{ $size: string; $color: string }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
  font-size: ${(props) => props.$size};
  color: ${(props) => props.$color};
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;

const IconWrapper = styled.span`
  display: flex;
  transition: transform 0.2s ease-in-out;

  input:checked + & {
    transform: scale(1.1);
  }
`;

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  size = "14px",
  color = "#333",
  label,
  labelStyle,
}) => {
  return (
    <CheckboxWrapper $size={size} $color={color}>
      <HiddenCheckbox checked={checked} onChange={onChange} />
      <IconWrapper>
        {checked ? (
          <CheckboxCheckedIcon width={18} height={18} color={color} />
        ) : (
          <CheckboxOutlineIcon width={18} height={18} color={color} />
        )}
      </IconWrapper>
      {label && <CheckboxLabel style={labelStyle}>{label}</CheckboxLabel>}
    </CheckboxWrapper>
  );
};

export default Checkbox;
