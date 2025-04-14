// Add these imports at the top
import { useState, useEffect, useRef } from "react";
import { SearchIcon } from "@/components/icons"; // Assuming you have this icon
import styled from "styled-components";
import { Input } from "./form/elements";

type SearchInputProps = {
  value: string;
  error: string | undefined;
  items: any[];
  placeholder: string;
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

// Add these styled components after your existing styled components
const SearchInputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 16px;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #8a8a88;
`;

const CustomerInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 0.5rem 1rem 0.5rem 2.25rem;
  border: 1px solid #d9d8d5;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  outline: none;

  &:focus {
    border-color: #18a0fb;
  }

  &::placeholder {
    color: #8a8a88;
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #d9d8d5;
  border-radius: 0.25rem;
  z-index: 10;
  margin-top: 4px;
  padding: 0;
  list-style: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.li`
  padding: 10px 16px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const NoResults = styled.div`
  padding: 10px 16px;
  color: #8a8a88;
  font-size: 14px;
`;

const ErrorText = styled.p`
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
  margin-bottom: 0;
`;

export const SearchDropdown = ({
  value,
  onChange,
  error,
  items,
  placeholder,
  name,
}: SearchInputProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState(items);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Filter customers based on input
    if (inputValue) {
      const filtered = items.filter((item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items);
    }
  }, [inputValue]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef?.current as any)?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsOpen(true);
  };

  const handleSelectCustomer = (item: any) => {
    setInputValue(item.name);
    onChange?.(item);
    setIsOpen(false);
  };

  return (
    <SearchInputContainer ref={dropdownRef}>
      <Input
        variant="drawer"
        wrapperStyle={{ border: "1px solid #d9d8d5", borderRadius: "5px" }}
        type="text"
        placeholder={placeholder}
        name={name}
        error={error}
        value={inputValue}
        onChange={handleInputChange}
      />

      {isOpen && (
        <DropdownList>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <DropdownItem
                key={item.id}
                onClick={() => handleSelectCustomer(item)}
              >
                {item.name}
              </DropdownItem>
            ))
          ) : (
            <NoResults>No customers found</NoResults>
          )}
        </DropdownList>
      )}
    </SearchInputContainer>
  );
};
