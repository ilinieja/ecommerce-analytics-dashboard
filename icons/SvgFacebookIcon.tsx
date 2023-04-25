import { SVGProps } from "react";

const SvgFacebookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M12.75.75H1.25a.5.5 0 0 0-.5.5v11.5a.5.5 0 0 0 .5.5h11.5a.5.5 0 0 0 .5-.5V1.25a.5.5 0 0 0-.5-.5Zm-.5 11.5H9.373V8.41h1.625l.244-1.887H9.373V5.32c0-.547.152-.919.935-.919h.998V2.712a13.186 13.186 0 0 0-1.456-.075c-1.44 0-2.427.88-2.427 2.494v1.39H5.795v1.887h1.63v3.842H1.75V1.75h10.5v10.5Z"
    />
  </svg>
);

export default SvgFacebookIcon;
