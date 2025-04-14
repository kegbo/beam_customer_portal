import * as React from "react";
import { SVGProps } from "react";

export const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <g
      stroke="#627B87"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      opacity={0.5}
    >
      <path
        d="M6.159 10.826c2.849 0 5.159-2.2 5.159-4.913S9.008 1 6.158 1C3.31 1 1 3.2 1 5.913c0 2.714 2.31 4.913 5.159 4.913Z"
        clipRule="evenodd"
      />
      <path d="m10.156 9.72 3.242 3.087" />
    </g>
  </svg>
);
