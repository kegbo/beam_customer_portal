import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  DropdownWrapper,
  SelectContainer,
  SelectBox,
  DropdownIcon,
  OptionItem,
  SelectedContainer,
} from "./Select.style";
import { InputLabel } from "../input/Input.style";

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
  inputStyle?: React.CSSProperties;
  variant?: "drawer" | "default";
  onFocus?: () => void;
  onBlur?: () => void;
  removeBorder?: boolean;
  icon?: React.ReactNode;
}

const Dropdown = ({
  children,
  open,
  anchorRef,
}: {
  children: React.ReactNode;
  open: boolean;
  anchorRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [anchorRef, open]);

  if (!open) return null;

  return createPortal(
    <DropdownWrapper
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: open ? 1 : 0, y: open ? 0 : -10 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        width: position.width,
      }}
    >
      {children}
    </DropdownWrapper>,
    document.body
  );
};

export function Select({
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
  onFocus,
  onBlur,
  removeBorder,
  inputStyle,
  icon,
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

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
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
    <SelectContainer
      $variant={variant}
      $width={width}
      style={style}
      ref={selectRef}
      id={id}
    >
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
        onFocus={onFocus}
        onBlur={onBlur}
        $removeBorder={removeBorder}
      >
        <SelectedContainer style={inputStyle}>
          {icon} {selected ? selected.label : placeholder}
        </SelectedContainer>
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
      <Dropdown open={isOpen} anchorRef={selectRef}>
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
