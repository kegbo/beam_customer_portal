import * as React from "react";
import { SVGProps } from "react";
export const EyeOffIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        stroke="#101828"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.425 3.18A6.84 6.84 0 0 1 9 3c5.25 0 8.25 6 8.25 6a13.874 13.874 0 0 1-1.62 2.393m-5.04-.803a2.248 2.248 0 0 1-3.732-.691A2.25 2.25 0 0 1 7.41 7.41M.75.75l16.5 16.5m-3.795-3.795A7.553 7.553 0 0 1 9 15C3.75 15 .75 9 .75 9a13.838 13.838 0 0 1 3.795-4.455l8.91 8.91Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h18v18H0z" />
      </clipPath>
    </defs>
  </svg>
);
