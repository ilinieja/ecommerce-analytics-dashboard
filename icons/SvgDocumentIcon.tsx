import * as React from "react";
import { SVGProps } from "react";

const SvgDocumentIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={12}
    height={18}
    viewBox="0 0 14 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2.333.5C1.046.5 0 1.509 0 2.75v13.5c0 1.241 1.046 2.25 2.333 2.25h9.334c1.287 0 2.333-1.009 2.333-2.25V6.125H9.333c-.645 0-1.166-.503-1.166-1.125V.5H2.333Zm7 0V5H14L9.333.5Zm-5.25 9h5.834c.32 0 .583.253.583.563 0 .309-.262.562-.583.562H4.083a.575.575 0 0 1-.583-.563c0-.309.263-.562.583-.562Zm0 2.25h5.834c.32 0 .583.253.583.563 0 .309-.262.562-.583.562H4.083a.575.575 0 0 1-.583-.563c0-.309.263-.562.583-.562Zm0 2.25h5.834c.32 0 .583.253.583.563 0 .309-.262.562-.583.562H4.083a.575.575 0 0 1-.583-.563c0-.309.263-.562.583-.562Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgDocumentIcon;
