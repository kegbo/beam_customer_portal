import * as React from "react";
import { SVGProps } from "react";
export const WalletIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    {...props}
  >
    <path
      stroke="#0D0D0C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.3}
      d="M14.5 12v24a3 3 0 0 0 3 3h30a1.5 1.5 0 0 0 1.5-1.5v-21a1.5 1.5 0 0 0-1.5-1.5h-30a3 3 0 0 1-3-3Zm0 0a3 3 0 0 1 3-3H43"
    />
    <path fill="#0D0D0C" d="M40.75 28.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    <rect width={30} height={30} y={21} fill="#fff" rx={15} />
    <path
      stroke="#8C8C89"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 32v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);
