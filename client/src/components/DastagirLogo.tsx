import type { SVGProps } from "react";

type DastagirLogoProps = SVGProps<SVGSVGElement>;

/** A grocery bag monogram designed for the Dastagir brand. */
export default function DastagirLogo({
  className,
  ...props
}: DastagirLogoProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M9 14.5h22l-1.4 17.1A3.5 3.5 0 0 1 26.1 35H13.9a3.5 3.5 0 0 1-3.5-3.4L9 14.5Z"
        fill="currentColor"
      />
      <path
        d="M14 15v-2a6 6 0 0 1 12 0v2"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M16.5 20h4.1a4.3 4.3 0 1 1 0 8.6h-4.1V20Z"
        stroke="white"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M21 7.8c.5-2.5 2.2-4.1 4.8-4.8-.5 2.6-2.1 4.3-4.8 4.8Z"
        fill="currentColor"
      />
    </svg>
  );
}
