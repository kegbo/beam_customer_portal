import * as React from "react";
import { SVGProps } from "react";
export const SaveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    {...props}
  >
    <path
      stroke="#fff"
      strokeWidth={0.75}
      d="M12 15.75v-1.5c0-1.414 0-2.121-.44-2.56-.439-.44-1.146-.44-2.56-.44h-.75c-1.414 0-2.121 0-2.56.44-.44.439-.44 1.146-.44 2.56v1.5"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={0.75}
      d="M5.25 6H9"
    />
    <path
      stroke="#fff"
      strokeWidth={0.75}
      d="M2.25 6.75c0-2.121 0-3.182.659-3.841.659-.659 1.72-.659 3.841-.659h5.379c.306 0 .46 0 .597.057.138.057.247.166.463.382l2.122 2.122c.216.216.325.325.382.463.057.137.057.29.057.597v5.379c0 2.121 0 3.182-.659 3.841-.659.659-1.72.659-3.841.659h-4.5c-2.121 0-3.182 0-3.841-.659-.659-.659-.659-1.72-.659-3.841v-4.5Z"
    />
  </svg>
);
