import * as React from "react";
import { SVGProps } from "react";

interface ChevronDownIconProps extends SVGProps<SVGSVGElement> {
  color?: string;
}

export const ChevronDownIcon = ({
  color = "#000",
  ...props
}: ChevronDownIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    {...props}
  >
    <path
      fill={color}
      d="m1.407 4.364 3.908 3.678a1 1 0 0 0 1.37 0l3.908-3.678a.5.5 0 1 0-.686-.728L6 7.313 2.093 3.636a.5.5 0 1 0-.686.728Z"
    />
  </svg>
);
