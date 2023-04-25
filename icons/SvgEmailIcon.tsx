import { SVGProps } from "react";

const SvgEmailIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.714.5H1.286a.857.857 0 0 0-.857.857v7.286c0 .473.383.857.857.857h9.428a.857.857 0 0 0 .857-.857V1.357A.857.857 0 0 0 10.714.5Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M.429 1.571 5.45 5.857a.857.857 0 0 0 1.098 0l5.022-4.286"
    />
  </svg>
);

export default SvgEmailIcon;
