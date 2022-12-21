import { SVGProps } from "react";

const ArrowBottom = ({...props}: SVGProps<SVGSVGElement>) => (
  <svg
    width="8"
    height="5"
    viewBox="0 0 8 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7 1L4 4L1 0.999999"
      stroke="#6F7383"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowBottom;
