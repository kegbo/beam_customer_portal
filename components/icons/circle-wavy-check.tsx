import * as React from "react";
import { SVGProps } from "react";
export const CircleWavyCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    {...props}
  >
    <path
      stroke="#18A0FB"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.832 14.168c-.647-.647-.218-2.004-.548-2.798-.33-.795-1.596-1.491-1.596-2.37s1.251-1.547 1.596-2.37c.344-.822-.099-2.151.548-2.798.647-.647 2.004-.218 2.798-.548.795-.33 1.491-1.596 2.37-1.596s1.547 1.251 2.37 1.596c.822.344 2.151-.099 2.798.548.647.647.218 2.004.548 2.798.33.795 1.597 1.491 1.597 2.37s-1.252 1.547-1.597 2.37c-.344.822.099 2.151-.548 2.798-.647.647-2.004.218-2.798.548-.795.33-1.491 1.597-2.37 1.597s-1.547-1.252-2.37-1.597c-.822-.344-2.151.099-2.798-.548Z"
    />
    <path
      stroke="#18A0FB"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12.094 7.313 7.966 11.25l-2.06-1.969"
    />
  </svg>
);
