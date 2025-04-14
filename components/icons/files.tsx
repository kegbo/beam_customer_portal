import * as React from "react";
import { SVGProps } from "react";
export const FilesIcon = (
  props: { color?: string } & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    {...props}
  >
    <path
      stroke={props.color || "#fff"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.563}
      d="M11.813 15.75H3.936a.563.563 0 0 1-.562-.563V5.063a.563.563 0 0 1 .563-.563h5.624l2.813 2.813v7.875a.562.562 0 0 1-.563.562Z"
    />
    <path
      stroke={props.color || "#fff"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.563}
      d="M5.625 4.5V2.812a.563.563 0 0 1 .563-.562h5.625l2.812 2.813v7.875a.562.562 0 0 1-.563.562h-1.687M6.188 10.688h3.375M6.188 12.938h3.375"
    />
  </svg>
);
