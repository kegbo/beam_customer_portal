import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { StyledInput } from "./Input";

const OTPContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  
  @media (max-width: 576px) {
    gap: 6px;
  }
`;

const OTPInput = styled(StyledInput)`
  width: 89px;
  height: 42px;
  text-align: center;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  
  @media (max-width: 576px) {
    width: 60px;
    height: 36px;
    font-size: 0.9rem;
  }
  
  @media (max-width: 320px) {
    width: 50px;
    height: 36px;
  }
`;

interface OTPFormProps {
  length?: number;
  onComplete: (otp: string) => void;
}

const OTPForm: React.FC<OTPFormProps> = ({ length = 6, onComplete }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 576);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  // Adjust OTP length for mobile if needed
  useEffect(() => {
    if (isMobile && length > 4) {
      // For very small screens, we might want to reduce the number of OTP fields
      // This is optional and depends on your UI design
      // setOtp(new Array(4).fill(""));
    }
  }, [isMobile, length]);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.slice(0, length).split("");
    
    const newOtp = [...otp];
    digits.forEach((digit, index) => {
      if (index < length) {
        newOtp[index] = digit;
      }
    });
    
    setOtp(newOtp);
    
    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex(val => val === '');
    if (nextEmptyIndex !== -1) {
      inputsRef.current[nextEmptyIndex]?.focus();
    } else {
      inputsRef.current[length - 1]?.focus();
    }
    
    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
    }
  };

  return (
    <OTPContainer>
      {Array.from({ length }, (_, index) => (
        <OTPInput
          $variant="modal"
          $radius="12px"
          key={index}
          type="text"
          maxLength={1}
          value={otp[index] || ""}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={index === 0 ? handlePaste : undefined}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          autoComplete="off"
          inputMode="numeric"
          pattern="[0-9]*"
        />
      ))}
    </OTPContainer>
  );
};

export default OTPForm;