import { SVGProps } from "react";

const SvgCircleLoader = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 100 100"
    {...props}
  >
    <circle
      cx={50}
      cy={50}
      r={44}
      fill="none"
      stroke="currentColor"
      strokeWidth={8}
      style={{
        opacity: 0.5,
      }}
    />
    <path
      d="M 50 94 A 44 44 0 0 1 12 72"
      fill="none"
      stroke="currentColor"
      strokeWidth={8}
    >
      <animateTransform
        attributeName="transform"
        dur="0.8s"
        repeatCount="indefinite"
        from="0 50 50"
        to="360 50 50"
        type="rotate"
      />
    </path>
  </svg>
);
export default SvgCircleLoader;
