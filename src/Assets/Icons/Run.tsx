import { SVGProps } from "react";

const RunSVG = ({ color }: SVGProps<SVGSVGElement>) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="7" cy="7" r="6.3" stroke="#9CA2AA" strokeWidth="1.4" />
    <circle cx="7" cy="7" r="1.3" stroke="#9CA2AA" strokeWidth="1.4" />
    <path
      d="M11 7C11 4.79086 9.20914 3 7 3C4.79086 3 3 4.79086 3 7"
      stroke="#9CA2AA"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M8 6L9.5 4.5"
      stroke="#9CA2AA"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default RunSVG;
