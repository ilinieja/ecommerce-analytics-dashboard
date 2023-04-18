import { SVGProps } from "react";

const SvgChevronIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={8}
    viewBox="0 0 13 8"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M5.844 6.975a.924.924 0 0 0 1.315 0l4.643-4.688a.945.945 0 0 0 0-1.327.924.924 0 0 0-1.315 0L6.5 4.985 2.513.963a.924.924 0 0 0-1.315 0 .945.945 0 0 0 0 1.327l4.643 4.688.003-.003Z"
    />
  </svg>
);

export default SvgChevronIcon;
