"use client";
import { SvgProps } from "./icon.interface";

export const MarketIcon: React.FC<SvgProps> = ({ fillColor = "#D9D8D5" }) => {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 9.75V9M9 9.75V7.5M12 9.75V6M6 15.75L9 12.75L12 15.75M2.25 3H15.75M3 3H15V12C15 12.4142 14.6642 12.75 14.25 12.75H3.75C3.33579 12.75 3 12.4142 3 12V3Z"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
