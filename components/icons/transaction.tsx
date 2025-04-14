"use client";

import { SvgProps } from "./icon.interface";

export const TransactionIcon: React.FC<SvgProps> = ({
  fillColor = "#D9D8D5",
}) => {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 5.25L15 5.25M15 5.25L12 2.25M15 5.25L12 8.25M12 12.75L3 12.75M3 12.75L6 15.75M3 12.75L6 9.75"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
