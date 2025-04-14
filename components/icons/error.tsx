import * as React from "react";
import { SVGProps } from "react";
export const ErrorIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    {...props}
  >
    <rect width={54} height={54} fill="#fff" rx={27} />
    <path
      fill="#D14343"
      fillRule="evenodd"
      d="M27.503 19.005A7.993 7.993 0 0 0 19.508 27a7.993 7.993 0 0 0 7.995 7.995A7.993 7.993 0 0 0 35.498 27a7.993 7.993 0 0 0-7.995-7.995Zm-1 12.992v-1.999h2v1.999h-2Zm0-9.994v6.996h2v-6.996h-2Z"
      clipRule="evenodd"
    />
  </svg>
);
