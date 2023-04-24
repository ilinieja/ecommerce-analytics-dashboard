import { SVGProps } from "react";

const SvgFarfetchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={9}
    height={15}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M2.867 15H.543V.723h8.066v1.972H2.867v4.453h5.371v1.963h-5.37V15Z"
    />
  </svg>
);

export default SvgFarfetchIcon;
