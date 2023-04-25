import { SVGProps } from "react";

const SvgGoogleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={13}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M6.5 5.792h6.044c.031.272.048.552.048.838 0 1.937-.694 3.567-1.897 4.675-1.052.972-2.492 1.541-4.21 1.541A6.36 6.36 0 0 1 1.988 1.987 6.358 6.358 0 0 1 6.486.125c1.714 0 3.154.63 4.256 1.657L9.706 2.817c-.82-.793-1.929-1.275-3.206-1.275a4.958 4.958 0 1 0 0 9.916c2.498 0 4.352-1.847 4.659-4.25H6.5V5.792Z"
    />
  </svg>
);

export default SvgGoogleIcon;
