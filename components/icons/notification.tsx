"use client";
import { SvgProps } from "./icon.interface";

export const NotificationIcon: React.FC<SvgProps> = ({
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
        d="M11.25 12.75H15L13.9463 11.6963C13.6605 11.4105 13.5 11.023 13.5 10.6188V8.25C13.5 6.29067 12.2478 4.62382 10.5 4.00606V3.75C10.5 2.92157 9.82843 2.25 9 2.25C8.17157 2.25 7.5 2.92157 7.5 3.75V4.00606C5.75221 4.62382 4.5 6.29067 4.5 8.25V10.6188C4.5 11.023 4.33946 11.4105 4.0537 11.6963L3 12.75H6.75M11.25 12.75V13.5C11.25 14.7426 10.2426 15.75 9 15.75C7.75736 15.75 6.75 14.7426 6.75 13.5V12.75M11.25 12.75H6.75"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
