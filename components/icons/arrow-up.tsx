import * as React from "react";
import { SVGProps } from "react";

export const ArrowUpIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.666 11.333 6.667-6.667m0 0h-6.667m6.667 0v6.667"
    />
  </svg>
);
