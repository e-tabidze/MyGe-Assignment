import { SVGProps } from "react";

const ArrowRight = ({
  width = "5",
  height = "8",
  color,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    {...props}
    viewBox="0 0 5 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.611328 1L3.61133 4L0.611328 7"
      stroke={color || "#6F7383"}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default ArrowRight;