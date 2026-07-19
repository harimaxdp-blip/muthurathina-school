import React from "react";

/* ---------- small reusable pieces ---------- */

function ArchWindow({ x, y, w = 34, h = 60 }) {
  const archH = w / 2;
  return (
    <g stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round">
      <path
        d={`M${x} ${y + h} V${y + archH} A${w / 2} ${archH} 0 0 1 ${x + w} ${y + archH} V${y + h}`}
      />
      <line x1={x} y1={y + h} x2={x + w} y2={y + h} />
      {/* mullions */}
      <line x1={x + w / 2} y1={y + archH * 0.15} x2={x + w / 2} y2={y + h} />
      <line x1={x} y1={y + h * 0.62} x2={x + w} y2={y + h * 0.62} />
    </g>
  );
}

function RectWindow({ x, y, w = 32, h = 46 }) {
  return (
    <g stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round">
      <rect x={x} y={y} width={w} height={h} />
      <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} />
      <line x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} />
    </g>
  );
}

function Column({ x, y, h }) {
  return (
    <g stroke="currentColor" strokeWidth="2" fill="none">
      <line x1={x} y1={y} x2={x} y2={y + h} />
      <line x1={x - 6} y1={y} x2={x + 6} y2={y} />
      <line x1={x - 6} y1={y + h} x2={x + 6} y2={y + h} />
    </g>
  );
}

function Tree({ x, y, scale = 1, flip = false }) {
  const s = scale;
  const dir = flip ? -1 : 1;
  return (
    <g
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform={`translate(${x} ${y}) scale(${dir * s} ${s})`}
    >
      {/* canopy — a few overlapping scalloped blobs */}
      <path d="M-58 -10 C-78 -14 -80 -42 -58 -48 C-60 -70 -30 -78 -14 -64 C0 -82 30 -78 34 -56 C58 -58 66 -30 46 -16 C56 0 40 18 18 12 C10 26 -14 26 -22 12 C-46 20 -66 6 -58 -10 Z" />
      <path d="M-30 -30 C-24 -40 -8 -42 0 -34" opacity="0.6" />
      <path d="M18 -26 C26 -36 40 -34 44 -24" opacity="0.6" />
      {/* trunk */}
      <line x1="0" y1="14" x2="0" y2="70" />
      <line x1="0" y1="34" x2="-14" y2="52" />
      <line x1="0" y1="44" x2="12" y2="60" />
      {/* base bushes */}
      <path d="M-40 70 C-52 70 -54 58 -44 54 C-46 44 -30 42 -24 50 C-16 42 -2 46 -2 56 C8 54 12 66 2 70 Z" />
      <path d="M20 70 C10 70 8 60 16 56 C14 48 26 44 34 50 C40 44 52 48 50 58 C58 58 58 68 48 70 Z" opacity="0.85" />
    </g>
  );
}

function Cloud({ x, y, scale = 1, dur = 60, begin = "0s", opacity = 1 }) {
  const w = 100 * scale;
  return (
    <g opacity={opacity}>
      <path
        d="M20 40 C6 40 2 26 12 19 C7 7 22 -2 34 4 C39 -6 60 -6 65 5 C78 0 92 11 86 23 C96 29 91 40 80 40 Z"
        fill="var(--mr-red-soft, #fdeceb)"
        stroke="currentColor"
        strokeWidth="1.6"
        transform={`translate(${x} ${y}) scale(${scale})`}
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          values={`${x - 220} ${y}; ${x + 1450} ${y}`}
          dur={`${dur}s`}
          begin={begin}
          repeatCount="indefinite"
          additive="sum"
        />
      </path>
    </g>
  );
}

function Bird({ x, y, scale = 1 }) {
  return (
    <path
      d={`M${x} ${y} q6 -8 12 0 q6 -8 12 0`}
      stroke="currentColor"
      strokeWidth="1.6"
      fill="none"
      strokeLinecap="round"
      transform={`scale(${scale})`}
    />
  );
}

/* ---------- main illustration ---------- */

export default function BuildingSketch({ className = "" }) {
  const upperWindows = [
    { x: 158, dy: 0 },
    { x: 216, dy: 0 },
    { x: 274, dy: 0 },
  ];
  const rightUpperWindows = [
    { x: 730 },
    { x: 788 },
    { x: 846 },
  ];

  return (
    <svg
      className={className}
      viewBox="0 0 1200 480"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Line-art sketch of the school building"
      style={{ color: "var(--mr-red, #b3121c)", overflow: "visible" }}
    >
      {/* ---------- sky: drifting clouds + birds (behind everything) ---------- */}
      <g clipPath="url(#sky-clip)">
        <clipPath id="sky-clip">
          <rect x="-20" y="-20" width="1240" height="460" />
        </clipPath>
        <Cloud x={120} y={60} scale={0.9} dur={70} begin="-5s" opacity={0.9} />
        <Cloud x={520} y={40} scale={0.7} dur={55} begin="-30s" opacity={0.8} />
        <Cloud x={900} y={90} scale={1.1} dur={85} begin="-15s" opacity={0.85} />
        <Cloud x={40} y={140} scale={0.55} dur={48} begin="-8s" opacity={0.6} />
        <Cloud x={1000} y={170} scale={0.6} dur={62} begin="-40s" opacity={0.55} />
      </g>

      <Bird x={520} y={70} scale={1} />
      <Bird x={548} y={58} scale={0.8} />
      <Bird x={1040} y={110} scale={0.9} />
      <Bird x={1066} y={100} scale={0.7} />
      <Bird x={260} y={130} scale={0.8} />

      {/* ---------- trees ---------- */}
      <Tree x={95} y={370} scale={1.15} />
      <Tree x={1105} y={370} scale={1.15} flip />

      {/* ---------- ground / plaza steps ---------- */}
      <g stroke="currentColor" strokeWidth="2" fill="none">
        <line x1="120" y1="420" x2="1080" y2="420" />
        {[430, 440, 450].map((yy, i) => (
          <line key={yy} x1={520 - i * 12} y1={yy} x2={680 + i * 12} y2={yy} />
        ))}
        <line x1="470" y1="420" x2="470" y2="450" opacity="0.5" />
        <line x1="730" y1="420" x2="730" y2="450" opacity="0.5" />
      </g>

      {/* ---------- left wing ---------- */}
      <g stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round">
        {/* roofline */}
        <path d="M140 240 L500 200" />
        <path d="M140 240 L140 420" />
        <path d="M140 240 L120 250 L120 420" />
        <line x1="120" y1="420" x2="500" y2="420" />
        <line x1="500" y1="200" x2="500" y2="420" />
        {/* belt line between floors */}
        <line x1="140" y1="330" x2="500" y2="322" />
      </g>
      {upperWindows.map((w) => (
        <ArchWindow key={`lu-${w.x}`} x={w.x} y={255} w={34} h={58} />
      ))}
      {upperWindows.map((w) => (
        <RectWindow key={`ll-${w.x}`} x={w.x} y={345} w={34} h={55} />
      ))}
      <Column x={150} y={250} h={170} />
      <Column x={330} y={244} h={176} />

      {/* ---------- right wing ---------- */}
      <g stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round">
        <path d="M1060 240 L700 200" />
        <path d="M1060 240 L1060 420" />
        <path d="M1060 240 L1080 250 L1080 420" />
        <line x1="700" y1="420" x2="1080" y2="420" />
        <line x1="700" y1="200" x2="700" y2="420" />
        <line x1="1060" y1="330" x2="700" y2="322" />
      </g>
      {rightUpperWindows.map((w) => (
        <ArchWindow key={`ru-${w.x}`} x={w.x} y={255} w={34} h={58} />
      ))}
      {rightUpperWindows.map((w) => (
        <RectWindow key={`rl-${w.x}`} x={w.x} y={345} w={34} h={55} />
      ))}
      <Column x={870} y={244} h={176} />
      <Column x={1050} y={250} h={170} />

      {/* ---------- central pavilion ---------- */}
      <g stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinejoin="round">
        {/* pediment */}
        <path d="M480 150 L600 60 L720 150 Z" />
        <path d="M500 150 L600 78 L700 150" opacity="0.55" />
        {/* flagpole + flag */}
        <line x1="600" y1="60" x2="600" y2="16" />
        <path d="M600 18 L636 26 L600 36 Z" fill="var(--mr-red-soft, #fdeceb)" />
        {/* entablature */}
        <rect x="480" y="150" width="240" height="14" />
        {/* upper block outline */}
        <rect x="500" y="164" width="200" height="115" />
        {/* balcony rail */}
        <rect x="492" y="279" width="216" height="10" />
        {Array.from({ length: 14 }).map((_, i) => (
          <line
            key={i}
            x1={500 + i * 15}
            y1="289"
            x2={500 + i * 15}
            y2="300"
          />
        ))}
        {/* lower block outline */}
        <rect x="480" y="300" width="240" height="120" />
      </g>

      {/* upper floor windows: arch center, rect sides */}
      <RectWindow x={520} y={186} w={34} h={62} />
      <ArchWindow x={584} y={176} w={32} h={72} />
      <RectWindow x={646} y={186} w={34} h={62} />

      {/* lower floor: door + arch windows */}
      <ArchWindow x={520} y={334} w={32} h={78} />
      <g stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinejoin="round">
        <path d="M578 420 V352 A22 22 0 0 1 622 352 V420" />
        <line x1="600" y1="352" x2="600" y2="420" />
        <line x1="578" y1="386" x2="622" y2="386" />
      </g>
      <ArchWindow x={648} y={334} w={32} h={78} />

      <Column x={500} y={300} h={120} />
      <Column x={700} y={300} h={120} />
    </svg>
  );
}