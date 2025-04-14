import * as React from "react";
import { SVGProps } from "react";

export const AddIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    {...props}
  >
    <path
      stroke="#F2F2ED"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4.5 9h9M9 13.5v-9"
    />
  </svg>
);
