import { SVGProps } from "react";

const SvgTrendLineIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={9}
    viewBox="0 0 15 9"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M15 .5v4a.5.5 0 0 1-1 0V1.706l-5.144 5.15a.506.506 0 0 1-.712 0L6 4.706l-4.144 4.15a.513.513 0 0 1-.712 0 .506.506 0 0 1 0-.712l4.5-4.5a.506.506 0 0 1 .712 0L8.5 5.794 13.294 1H10.5a.5.5 0 1 1 0-1h4a.5.5 0 0 1 .5.5Z"
    />
  </svg>
);
export default SvgTrendLineIcon;
