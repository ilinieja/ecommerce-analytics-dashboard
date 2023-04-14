import { SVGProps } from "react";

const SvgBarchartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5 2.188C5 1.462 5.672.875 6.5.875h1c.828 0 1.5.588 1.5 1.313v9.624c0 .725-.672 1.313-1.5 1.313h-1c-.828 0-1.5-.588-1.5-1.313V2.188Zm-5 5.25c0-.725.672-1.313 1.5-1.313h1c.828 0 1.5.588 1.5 1.313v4.375c0 .724-.672 1.312-1.5 1.312h-1c-.828 0-1.5-.588-1.5-1.313V7.439Zm11.5-4.813h1c.828 0 1.5.588 1.5 1.313v7.874c0 .725-.672 1.313-1.5 1.313h-1c-.828 0-1.5-.588-1.5-1.313V3.939c0-.725.672-1.313 1.5-1.313Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgBarchartIcon;
