import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ChevronDownIcon } from "./icons";
import { InputLabel } from "./Input";

// Styled Components
const SelectContainer = styled.div<{ $width?: string }>`
  position: relative;
  width: ${({ $width }) => $width || "100%"};
`;

const SelectBox = styled.div<{
  $isOpen: boolean;
  $disabled?: boolean;
  $variant?: string;
}>`
  width: 100%;
  height: ${({ $variant }) => ($variant === "standard" ? "37px" : "2rem")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  padding: 0 0.75rem;
  font-weight: 400;
  border: 1px solid
    ${({ $isOpen, $variant }) =>
      $isOpen
        ? "#0D0D0C"
        : $variant === "standard"
        ? "transparent"
        : "#d9d8d5"};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  background: ${({ $disabled }) => ($disabled ? "#f5f5f5" : "white")};
  border-radius: 0.313rem;
  user-select: none;
  box-sizing: border-box;
  outline: none;
  margin-bottom: 1rem;
`;

const DropdownIcon = styled(motion(ChevronDownIcon))`
  transition: transform 0.3s ease;
`;

const Dropdown = styled(motion.div)`
  position: absolute;
  width: 100%;
  background: white;
  border-radius: 0.375rem;
  box-shadow: 0 4px 8px 0 rgba(16, 24, 64, 0.16);
  z-index: 100;
  box-sizing: border-box;
  overflow: hidden;
  max-height: 12.5rem;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;

  /* Custom scrollbar for WebKit browsers */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 0.188rem;
  }
`;

const OptionItem = styled.div<{ $isSelected: boolean }>`
  padding: 0.875rem;
  cursor: pointer;
  font-size: 0.875rem;
  background: ${({ $isSelected }) => ($isSelected ? "#FFFCEB" : "white")};
  border-left: 0.125rem solid transparent;
  border-left-color: ${({ $isSelected }) =>
    $isSelected ? "#18A0FB;" : "transparent"};
  &:hover {
    background: #fffceb;
  }
`;

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  defaultValue?: string;
  name?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  width?: string;
  style?: React.CSSProperties;
  variant?: "default" | "standard";
}

export default function Select({
  label,
  options,
  placeholder = "Select...",
  onChange,
  defaultValue,
  name,
  id,
  required = false,
  disabled = false,
  errorMessage,
  width,
  style,
  variant,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(
    options.find((option) => option.value === defaultValue) || null
  );
  const selectRef = useRef<HTMLDivElement | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: Option, index: number) => {
    setSelected(option);
    setIsOpen(false);
    setFocusedIndex(index);
    onChange(option.value);
    setIsValid(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setFocusedIndex((prev) =>
        prev === null || prev >= options.length - 1 ? 0 : prev + 1
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setFocusedIndex((prev) =>
        prev === null || prev <= 0 ? options.length - 1 : prev - 1
      );
    } else if (event.key === "Enter" && focusedIndex !== null) {
      event.preventDefault();
      handleSelect(options[focusedIndex], focusedIndex);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <SelectContainer $width={width} style={style} ref={selectRef} id={id}>
      {label && <InputLabel>{label}</InputLabel>}
      <SelectBox
        $variant={variant}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-disabled={disabled}
        $disabled={disabled}
        $isOpen={isOpen}
      >
        {selected ? selected.label : placeholder}
        <DropdownIcon
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </SelectBox>
      {errorMessage && (
        <span style={{ color: "red", fontSize: "0.75rem" }}>
          {errorMessage}
        </span>
      )}
      <Dropdown
        role="listbox"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        style={{ display: isOpen ? "block" : "none" }}
      >
        {options.map((option, index) => (
          <OptionItem
            key={option.value}
            onClick={() => handleSelect(option, index)}
            $isSelected={selected?.value === option.value}
            role="option"
            aria-selected={selected?.value === option.value}
            tabIndex={-1}
          >
            {option.label}
          </OptionItem>
        ))}
      </Dropdown>
    </SelectContainer>
  );
}
