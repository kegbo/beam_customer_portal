import * as React from "react";
import { SVGProps } from "react";
export const CopyIcon = (
  props: SVGProps<SVGSVGElement & { fillColor: string }>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.469 12.375V2.531H5.625"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12.656 5.344H2.812v9.843h9.844V5.345Z"
    />
  </svg>
);
