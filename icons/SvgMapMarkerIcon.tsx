import * as React from "react";
import { SVGProps } from "react";

const SvgMapMarkerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={14}
    height={18}
    viewBox="0 0 12 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 7.625a1.875 1.875 0 1 1 0-3.75 1.875 1.875 0 0 1 0 3.75ZM6 .5A5.25 5.25 0 0 0 .75 5.75C.75 9.688 6 15.5 6 15.5s5.25-5.813 5.25-9.75A5.25 5.25 0 0 0 6 .5Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgMapMarkerIcon;
