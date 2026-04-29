interface Props {
  bodyColor: string;
  rimColor: string;
  spokeCount: number;
  windowTint: boolean;
  hasSunroof: boolean;
}

function Wheel({ x, y, tire, rim, spokes }: {
  x: number; y: number; tire: string; rim: string; spokes: number;
}) {
  const r = 28;
  return (
    <g>
      <rect x={x} y={y} width={44} height={88} rx={14} fill={tire} />
      <rect x={x + 7} y={y + 10} width={30} height={68} rx={10} fill={rim} />
      {Array.from({ length: spokes }).map((_, i) => {
        const a = (i / spokes) * Math.PI * 2;
        const cx = x + 22, cy = y + 44;
        return (
          <line key={i}
            x1={cx + Math.cos(a) * 6} y1={cy + Math.sin(a) * 6}
            x2={cx + Math.cos(a) * (r - 8)} y2={cy + Math.sin(a) * (r - 8)}
            stroke={tire} strokeWidth={2.5} strokeLinecap="round"
          />
        );
      })}
      <circle cx={x + 22} cy={y + 44} r={6} fill={tire} />
    </g>
  );
}

export default function CarVisualization({ bodyColor, rimColor, spokeCount, windowTint, hasSunroof }: Props) {
  const glass = windowTint ? "rgba(20,30,60,0.88)" : "rgba(160,210,240,0.78)";
  const tireColor = "#1e293b";

  return (
    <div className="w-full max-w-sm mx-auto py-4">
      <svg viewBox="0 0 280 520" fill="none" className="w-full drop-shadow-2xl">

        {/* Ground shadow */}
        <ellipse cx="140" cy="510" rx="100" ry="8" fill="rgba(0,0,0,0.10)" />

        {/* ── WHEELS (behind body) ── */}
        {/* Front-left */}
        <Wheel x={4} y={80} tire={tireColor} rim={rimColor} spokes={spokeCount} />
        {/* Front-right */}
        <Wheel x={232} y={80} tire={tireColor} rim={rimColor} spokes={spokeCount} />
        {/* Rear-left */}
        <Wheel x={4} y={356} tire={tireColor} rim={rimColor} spokes={spokeCount} />
        {/* Rear-right */}
        <Wheel x={232} y={356} tire={tireColor} rim={rimColor} spokes={spokeCount} />

        {/* ── MAIN BODY ── */}
        <rect x={32} y={40} width={216} height={440} rx={36} fill={bodyColor} />

        {/* Body highlight */}
        <rect x={44} y={48} width={95} height={180} rx={28}
          fill="rgba(255,255,255,0.13)" />

        {/* ── HOOD (front) ── */}
        <rect x={50} y={18} width={180} height={44} rx={22} fill={bodyColor}
          style={{ filter: "brightness(0.88)" }} />
        <rect x={60} y={20} width={80} height={16} rx={10}
          fill="rgba(255,255,255,0.12)" />

        {/* ── TRUNK (rear) ── */}
        <rect x={50} y={458} width={180} height={40} rx={20} fill={bodyColor}
          style={{ filter: "brightness(0.85)" }} />

        {/* ── FRONT WINDSHIELD ── */}
        <rect x={58} y={62} width={164} height={90} rx={14} fill={glass} />

        {/* ── REAR WINDSHIELD ── */}
        <rect x={58} y={368} width={164} height={80} rx={14} fill={glass} />

        {/* ── SIDE WINDOWS ── */}
        {/* Left window */}
        <rect x={34} y={180} width={38} height={120} rx={10} fill={glass} />
        {/* Right window */}
        <rect x={208} y={180} width={38} height={120} rx={10} fill={glass} />

        {/* ── ROOF ── */}
        <rect x={48} y={152} width={184} height={200} rx={24}
          fill={bodyColor} style={{ filter: "brightness(0.92)" }} />

        {/* Roof highlight */}
        <rect x={60} y={158} width={80} height={60} rx={18}
          fill="rgba(255,255,255,0.10)" />

        {/* ── SUNROOF ── */}
        {hasSunroof && (
          <rect x={88} y={165} width={104} height={62} rx={10}
            fill={windowTint ? "rgba(10,20,50,0.92)" : "rgba(100,170,220,0.72)"}
            stroke="rgba(0,0,0,0.2)" strokeWidth={1} />
        )}

        {/* ── GRILLE (front) ── */}
        <rect x={82} y={20} width={116} height={20} rx={8}
          fill="rgba(0,0,0,0.45)" />
        {[96, 116, 136, 156, 176].map((x) => (
          <line key={x} x1={x} y1={22} x2={x} y2={38}
            stroke="#475569" strokeWidth={1.5} />
        ))}

        {/* ── HEADLIGHTS ── */}
        <rect x={52} y={22} width={32} height={14} rx={6}
          fill="rgba(255,248,180,0.92)" />
        <rect x={196} y={22} width={32} height={14} rx={6}
          fill="rgba(255,248,180,0.92)" />

        {/* ── TAILLIGHTS ── */}
        <rect x={52} y={462} width={32} height={12} rx={6}
          fill="rgba(220,40,40,0.9)" />
        <rect x={196} y={462} width={32} height={12} rx={6}
          fill="rgba(220,40,40,0.9)" />

        {/* ── DOOR LINE ── */}
        <line x1={48} y1={300} x2={232} y2={300}
          stroke="rgba(0,0,0,0.12)" strokeWidth={1.5} />

        {/* ── DOOR HANDLES ── */}
        <rect x={96} y={260} width={40} height={8} rx={4}
          fill="rgba(255,255,255,0.35)" />
        <rect x={144} y={260} width={40} height={8} rx={4}
          fill="rgba(255,255,255,0.35)" />

        {/* ── SIDE MIRRORS ── */}
        <rect x={14} y={148} width={22} height={14} rx={5}
          fill={bodyColor} style={{ filter: "brightness(0.85)" }} />
        <rect x={244} y={148} width={22} height={14} rx={5}
          fill={bodyColor} style={{ filter: "brightness(0.85)" }} />

      </svg>
    </div>
  );
}
