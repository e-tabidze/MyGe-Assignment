import { SVGProps } from "react";

const EmptyBinSVG = ({ color }: SVGProps<SVGSVGElement>) => (
  <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.458 1.452c-.213.076-.316.254-.316.548 0 .294.103.472.316.548.151.054 4.933.054 5.084 0 .213-.076.316-.254.316-.548 0-.294-.103-.472-.316-.548-.151-.054-4.933-.054-5.084 0M1.764 4.44c-.232.072-.349.257-.35.554-.001.307.118.496.356.567.104.03.3.039.888.039h.755v4.063c0 3.894.002 4.068.05 4.213.091.277.289.496.564.627l.146.07h7.654l.152-.071c.213-.1.404-.287.508-.499l.086-.175.007-4.114.007-4.114h.755c.588 0 .784-.009.888-.039.236-.071.357-.26.357-.561 0-.197-.049-.337-.154-.447-.155-.162.238-.153-6.445-.151-5.069.001-6.128.008-6.224.038m9.643 5.06-.007 3.9H4.6l-.007-3.9-.007-3.9h6.828l-.007 3.9"
      fillRule="evenodd"
      fill="#454857"
    ></path>
  </svg>
);

export default EmptyBinSVG;
