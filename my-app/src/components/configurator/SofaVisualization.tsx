interface Props {
  color: string;
  material: string;
  size: string;
}

export default function SofaVisualization({ color, size }: Props) {
  const is3 = size === "3-seater" || size === "l-shape";
  const cushions = is3 ? 3 : 2;
  const W = 520, ARM = 55;
  const inner = W - ARM * 2;
  const cW = inner / cushions;

  return (
    <div className="w-full max-w-2xl mx-auto" style={{ filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.7))" }}>
      <svg viewBox="0 0 560 420" fill="none" className="w-full" style={{ transition: "all 0.65s cubic-bezier(0.4,0,0.2,1)" }}>
        <defs>
          <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#111827" />
            <stop offset="80%" stopColor="#0d1117" />
          </linearGradient>
          <linearGradient id="floorGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a2030" />
            <stop offset="100%" stopColor="#0d1117" />
          </linearGradient>
          <linearGradient id="rugGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.07" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="sofaRefl" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.15" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
          <radialGradient id="sofaShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.5)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <radialGradient id="ambientSpot" cx="50%" cy="0%" r="60%">
            <stop offset="0%" stopColor="rgba(180,200,255,0.04)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>

        {/* Wall */}
        <rect x={0} y={0} width={560} height={280} fill="url(#wallGrad)" />
        {/* Baseboard */}
        <rect x={0} y={278} width={560} height={5} fill="rgba(255,255,255,0.06)" />

        {/* Ambient light cone from top */}
        <ellipse cx={280} cy={0} rx={240} ry={140} fill="url(#ambientSpot)" />

        {/* Subtle wall texture lines */}
        <line x1={0} y1={130} x2={560} y2={130} stroke="rgba(255,255,255,0.02)" strokeWidth={1} />
        <line x1={0} y1={200} x2={560} y2={200} stroke="rgba(255,255,255,0.02)" strokeWidth={1} />

        {/* Floor */}
        <rect x={0} y={283} width={560} height={137} fill="url(#floorGrad2)" />
        {/* Floor boards */}
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={0} y={283 + i * 34} width={560} height={33}
            fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth={1} />
        ))}

        {/* Area rug */}
        <rect x={30} y={283} width={500} height={80} rx={4} fill="url(#rugGrad)" />
        <rect x={30} y={283} width={500} height={80} rx={4} fill="none" stroke={color} strokeOpacity={0.1} strokeWidth={1} />
        <rect x={42} y={286} width={476} height={74} rx={2} fill="none" stroke={color} strokeOpacity={0.06} strokeWidth={0.5} />

        {/* Sofa ground shadow */}
        <ellipse cx={280} cy={302} rx={218} ry={14} fill="url(#sofaShadow)" />

        {/* Floor reflection */}
        <rect x={60} y={305} width={440} height={60} rx={4} fill="url(#sofaRefl)" opacity={0.7} />

        {/* ── LEGS ── */}
        {[85, 200, 360, 475].map((x) => (
          <g key={x}>
            <rect x={x} y={282} width={20} height={26} rx={5} fill={color} style={{ filter: "brightness(0.45)" }} />
            {/* Leg highlight */}
            <rect x={x + 2} y={282} width={8} height={10} rx={3} fill="rgba(255,255,255,0.12)" />
          </g>
        ))}

        {/* ── SOFA BASE ── */}
        <rect x={18} y={214} width={524} height={72} rx={20} fill={color} style={{ filter: "brightness(0.7)" }} />
        {/* Base front highlight */}
        <rect x={18} y={214} width={524} height={18} rx={18} fill="rgba(255,255,255,0.08)" />
        {/* Base bottom shadow */}
        <rect x={18} y={266} width={524} height={20} rx={14} fill="rgba(0,0,0,0.2)" />

        {/* ── SEAT CUSHIONS ── */}
        {Array.from({ length: cushions }).map((_, i) => (
          <g key={i}>
            {/* Cushion base */}
            <rect x={ARM + 18 + i * cW} y={180} width={cW - 14} height={64}
              rx={12} fill={color} style={{ filter: "brightness(0.86)" }} />
            {/* Cushion top highlight */}
            <rect x={ARM + 20 + i * cW} y={182} width={cW - 20} height={18}
              rx={9} fill="rgba(255,255,255,0.13)" />
            {/* Cushion bottom shadow */}
            <rect x={ARM + 18 + i * cW} y={226} width={cW - 14} height={16}
              rx={8} fill="rgba(0,0,0,0.18)" />
          </g>
        ))}

        {/* Cushion divider gaps */}
        {Array.from({ length: cushions - 1 }).map((_, i) => (
          <rect key={i} x={ARM + 18 + (i + 1) * cW - 7} y={182}
            width={12} height={60} fill="rgba(0,0,0,0.22)" rx={3} />
        ))}

        {/* ── BACKREST ── */}
        <rect x={18} y={82} width={524} height={108} rx={22} fill={color} style={{ filter: "brightness(0.8)" }} />
        {/* Backrest top highlight */}
        <rect x={18} y={82} width={524} height={30} rx={22} fill="rgba(255,255,255,0.12)" />
        {/* Backrest bottom edge */}
        <rect x={18} y={170} width={524} height={16} rx={8} fill="rgba(0,0,0,0.2)" />

        {/* Back cushion dividers */}
        {Array.from({ length: cushions - 1 }).map((_, i) => (
          <rect key={i} x={ARM + 18 + (i + 1) * cW - 7} y={87}
            width={12} height={96} fill="rgba(0,0,0,0.16)" rx={3} />
        ))}

        {/* ── ARMRESTS ── */}
        {/* Left */}
        <rect x={5} y={106} width={ARM + 16} height={136} rx={22} fill={color} style={{ filter: "brightness(0.72)" }} />
        <rect x={5} y={106} width={ARM + 16} height={26} rx={20} fill="rgba(255,255,255,0.14)" />
        {/* Right */}
        <rect x={W - ARM - 1 + 20} y={106} width={ARM + 16} height={136} rx={22} fill={color} style={{ filter: "brightness(0.72)" }} />
        <rect x={W - ARM - 1 + 20} y={106} width={ARM + 16} height={26} rx={20} fill="rgba(255,255,255,0.14)" />

        {/* ── THROW PILLOWS ── */}
        <ellipse cx={148} cy={165} rx={36} ry={28} fill={color} style={{ filter: "brightness(1.1)" }} />
        <ellipse cx={148} cy={163} rx={34} ry={22} fill="rgba(255,255,255,0.1)" />
        <ellipse cx={412} cy={165} rx={36} ry={28} fill={color} style={{ filter: "brightness(1.08)" }} />
        <ellipse cx={412} cy={163} rx={34} ry={22} fill="rgba(255,255,255,0.1)" />
      </svg>
    </div>
  );
}
