import * as React from "react";
import { SVGProps } from "react";
export const SuccessIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    {...props}
  >
    <rect width={54} height={54} fill="#fff" rx={27} />
    <path
      stroke="#149D52"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m21.75 27.75 3 3 7.5-7.5"
    />
  </svg>
);
