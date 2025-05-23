"use client";
import { SvgProps } from "./icon.interface";

export const LogoutIcon: React.FC<SvgProps> = ({ fillColor = "#D9D8D5" }) => {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 3H5.25C4.00736 3 3 4.00736 3 5.25V12.75C3 13.9926 4.00736 15 5.25 15H6M9 12L6 9M6 9L9 6M6 9L15 9"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
