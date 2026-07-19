import React from "react";

/**
 * Recreated seal-style school emblem as scalable inline SVG (red line-art,
 * matching the hand-drawn illustration style used across the site).
 * Swap this out for the client's real logo file by replacing the <svg> below
 * with an <img src={logoFile} /> once the original artwork is available.
 */
export default function SchoolLogo({ size = 64, className = "" }) {
  return (
    <svg
      className={`school-logo ${className}`}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Muthu Rathina Arangam Higher Secondary School emblem"
    >
      <defs>
        <path id="logoTopArc" d="M 30 108 A 70 70 0 0 1 170 108" fill="none" />
        <path id="logoBottomArc" d="M 38 130 A 62 62 0 0 0 162 130" fill="none" />
      </defs>

      <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="86" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="100" r="66" fill="none" stroke="currentColor" strokeWidth="1.5" />

      <text fill="currentColor" fontSize="10.5" fontWeight="700" letterSpacing="1.5">
        <textPath href="#logoTopArc" startOffset="50%" textAnchor="middle">
          MUTHU RATHINA ARANGAM HR SEC
        </textPath>
      </text>
      <text fill="currentColor" fontSize="9" fontWeight="600" letterSpacing="2">
        <textPath href="#logoBottomArc" startOffset="50%" textAnchor="middle">
          ACQUIRE THOROUGHLY
        </textPath>
      </text>

      {/* open book */}
      <g transform="translate(100,108)" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M0 -6 L0 20" />
        <path d="M0 -6 C -14 -12 -28 -10 -34 -4 L -34 18 C -28 12 -14 10 0 20" />
        <path d="M0 -6 C 14 -12 28 -10 34 -4 L 34 18 C 28 12 14 10 0 20" />
        <path d="M-26 2 C -20 -2 -10 -3 -3 0" />
        <path d="M-26 9 C -20 5 -10 4 -3 7" />
        <path d="M26 2 C 20 -2 10 -3 3 0" />
        <path d="M26 9 C 20 5 10 4 3 7" />
      </g>

      {/* flame / torch above book */}
      <path
        d="M100 -20 C 94 -14 92 -8 96 -2 C 98 -6 100 -6 100 -3 C 100 -6 102 -6 104 -2 C 108 -8 106 -14 100 -20 Z"
        transform="translate(0,58)"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* laurel accents */}
      <g stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round">
        <path d="M50 140 C 46 148 46 156 52 163" />
        <path d="M150 140 C 154 148 154 156 148 163" />
      </g>
    </svg>
  );
}
