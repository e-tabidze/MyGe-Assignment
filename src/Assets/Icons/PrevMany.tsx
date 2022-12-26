import { SVGProps } from "react";

const PrevManySVG = ({ color }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13.414"
    height="8.829"
    viewBox="0 0 13.414 8.829"
  >
    <g transform="translate(1 1.414)">
      <path
        d="M12,12,9,9l3-3"
        transform="translate(-1 -6)"
        fill="none"
        stroke="rgb(253, 65, 0)"
        strokeLinecap="round"
        strokeWidth="2px"
        strokeLinejoin="round"
      ></path>
      <path
        d="M12,12,9,9l3-3"
        transform="translate(-6 -6)"
        fill="none"
        stroke="rgb(253, 65, 0)"
        strokeLinecap="round"
        strokeWidth="2px"
        strokeLinejoin="round"
      ></path>
      <line
        y2="6"
        transform="translate(0)"
        fill="none"
        stroke="rgb(253, 65, 0)"
        strokeLinecap="round"
        strokeWidth="2px"
      ></line>
    </g>
  </svg>
);

export default PrevManySVG;
