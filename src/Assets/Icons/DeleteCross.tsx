import { SVGProps } from "react";

const DeleteSVG = ({ color = "#6F7383", ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m10.5 5.5-5 5M5.5 5.5l5 5"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
    ></path>
  </svg>
);

export default DeleteSVG;
