import * as React from "react";
import { SVGProps } from "react";
export const CheckboxBaseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    {...props}
  >
    <rect width={18} height={18} fill="#fff" rx={9} />
    <path
      fill="#0D0D0C"
      d="m6.07 11.508 2.714-2.72 2.714-2.72.502.455-5.428 5.441-.502-.456ZM6 6.56 6.572 6 12 11.44l-.572.56L6 6.56Z"
    />
  </svg>
);
