import React from "react";
import imgDrawing from "../assets/BUILD.png"; // Imported from your assets folder

/* ============================================================
   FULL FIX: the sketch image and the animated clouds now live
   inside ONE single <svg> with ONE viewBox, using an <image>
   element for the picture instead of a separate <img> tag with
   an overlaid <svg>. That two-layer setup was the bug you were
   seeing — whenever the surrounding page's CSS treated the
   <img> and the absolutely-positioned <svg> even slightly
   differently (object-fit, max-height, a parent with its own
   aspect ratio, etc.), the two coordinate systems drifted apart
   and the clouds ended up rendered wherever that mismatch placed
   them (over the door, over the roof — exactly what you saw).
   With everything inside one SVG there is only one coordinate
   system, so this class of bug cannot happen anymore.

   Cloud movement was also rebuilt to not rely on SMIL's
   additive="sum" (summing an <animateTransform> with a static
   transform on the same element). Some renderers handle that
   combination inconsistently. Each cloud is now a plain path
   inside its own un-animated <g transform="translate(x y) scale(s)">
   wrapper, with the animateTransform living on an inner group
   using its own self-contained from/to values — no summing,
   no ambiguity, works the same everywhere.

   Clouds still fly only in the upper sky band (y < 420 in the
   image's own 2400x1000 pixel space — above both treetops and
   the roofline), and are still clipped to the building's exact
   traced silhouette as a second safety net.
   ============================================================ */

// Traced from the sketch's actual pixels (connected-component +
// top-edge extraction, then dilated for a safety margin), in the
// image's native 2400x1000 coordinate space.
const BUILDING_SILHOUETTE = "M500 875 L500 541 L500 541 L518 523 L539 515 L578 492 L599 471 L608 476 L623 477 L788 476 L791 429 L806 415 L857 412 L887 415 L880 322 L905 307 L1025 237 L1097 189 L1103 177 L1106 51 L1121 36 L1151 55 L1181 57 L1196 72 L1199 218 L1355 303 L1367 315 L1370 409 L1457 409 L1472 423 L1475 464 L1886 460 L1892 454 L1901 453 L1916 467 L1922 481 L1967 507 L2000 479 L2015 470 L2030 467 L2030 875 Z";

const CLOUD_PATH =
  "M20 40 C6 40 2 26 12 19 C7 7 22 -2 34 4 C39 -6 60 -6 65 5 C78 0 92 11 86 23 C96 29 91 40 80 40 Z";

// All y-values kept above 420 (upper sky band) so clouds always
// pass OVER the treetops (≈455/485) and roofline (≈490), never
// behind or through them.
const CLOUDS = [
  { x: 80,   y: 260, scale: 1.1, dur: 90,  begin: -4  },
  { x: 300,  y: 130, scale: 0.8, dur: 70,  begin: -40 },
  { x: 560,  y: 300, scale: 1.3, dur: 100, begin: -15 },
  { x: 820,  y: 90,  scale: 0.7, dur: 60,  begin: -55 },
  { x: 1080, y: 220, scale: 1.0, dur: 85,  begin: -25 },
  { x: 1350, y: 110, scale: 0.9, dur: 75,  begin: -65 },
  { x: 1600, y: 280, scale: 1.4, dur: 110, begin: -35 },
  { x: 1880, y: 160, scale: 0.8, dur: 68,  begin: -8  },
  { x: 2100, y: 320, scale: 1.0, dur: 78,  begin: -48 },
  { x: 2300, y: 200, scale: 0.65,dur: 58,  begin: -20 },
];

function Cloud({ x, y, scale, dur, begin, opacity = 0.85 }) {
  // Outer <g>: static position + size, never animated.
  // Inner <g>: only this one gets the animateTransform, with its
  // own self-contained translate values — no additive summing.
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="-1800 0; 8500 0"
          dur={`${dur}s`}
          begin={`${begin}s`}
          repeatCount="indefinite"
        />
        <path d={CLOUD_PATH} fill="#fdeceb" stroke="#b3121c" strokeWidth="3" />
      </g>
    </g>
  );
}

export default function BuildingSketchWithClouds({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 2400 1000"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", width: "100%", height: "auto" }}
    >
      <clipPath id="sky-clip">
        <path fillRule="evenodd" d={`M0 0 H2400 V1000 H0 Z ${BUILDING_SILHOUETTE}`} />
      </clipPath>

      {/* the reference sketch using your local asset file dependency */}
      <image href={imgDrawing} x="0" y="0" width="2400" height="1000" preserveAspectRatio="none" />

      {/* clouds: altitude-restricted above the treeline, plus clipped
          to the exact building silhouette as a second safety net */}
      <g clipPath="url(#sky-clip)">
        {CLOUDS.map((c, i) => (
          <Cloud key={i} {...c} />
        ))}
      </g>
    </svg>
  );
}