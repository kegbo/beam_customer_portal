import * as React from "react";
import { SVGProps } from "react";

export const CandleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    {...props}
  >
    <path
      stroke="#595957"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      d="M4.334 14.667V10M4.334 3.334v-2M11.666 14.666v-2M11.666 6V1.335M6.334 4.667v4c0 .734-.333 1.334-1.333 1.334H3.667c-1 0-1.333-.6-1.333-1.334v-4c0-.733.333-1.333 1.333-1.333h1.334c1 0 1.333.6 1.333 1.333ZM13.666 7.333v4c0 .734-.333 1.334-1.333 1.334h-1.334c-1 0-1.333-.6-1.333-1.334v-4C9.666 6.6 9.999 6 10.999 6h1.334c1 0 1.333.6 1.333 1.333Z"
    />
  </svg>
);
