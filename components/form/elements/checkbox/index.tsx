import { CheckboxCheckedIcon, CheckboxOutlineIcon } from "../../../icons";
import {
  CheckboxLabel,
  CheckboxWrapper,
  HiddenCheckbox,
  IconWrapper,
} from "./Checkbox.style";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  size?: string;
  color?: string;
  label?: string;
  labelStyle?: React.CSSProperties;
}

export const Checkbox: React.FC<CheckboxProps> = ({
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
