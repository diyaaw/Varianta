interface Props {
  color: string;
  material: string;
  size: string;
}

export default function SofaVisualization({ color, size }: Props) {
  const is3 = size === "3-seater" || size === "l-shape";
  const cushions = is3 ? 3 : 2;

  const W = 520;
  const ARM = 55;
  const inner = W - ARM * 2;
  const cushionW = inner / cushions;

  return (
    <div className="w-full max-w-lg mx-auto py-4">
      <svg viewBox="0 0 540 310" fill="none" className="w-full drop-shadow-2xl">
        {/* Ground shadow */}
        <ellipse cx="270" cy="302" rx="210" ry="8" fill="rgba(0,0,0,0.09)" />

        {/* ── LEGS ── */}
        {[80, 180, 360, 460].map((x) => (
          <rect key={x} x={x} y={262} width={18} height={32} rx={4} fill={color}
            style={{ filter: "brightness(0.6)" }} />
        ))}

        {/* ── SOFA BASE / SKIRT ── */}
        <rect x={10} y={200} width={520} height={68} rx={18}
          fill={color} style={{ filter: "brightness(0.82)" }} />

        {/* ── SEAT CUSHIONS ── */}
        {Array.from({ length: cushions }).map((_, i) => (
          <rect key={i}
            x={ARM + 10 + i * cushionW}
            y={168}
            width={cushionW - 10}
            height={68}
            rx={10}
            fill={color}
            style={{ filter: "brightness(0.9)" }}
          />
        ))}

        {/* Seat cushion divider gaps */}
        {Array.from({ length: cushions - 1 }).map((_, i) => (
          <rect key={i}
            x={ARM + 10 + (i + 1) * cushionW - 5}
            y={170} width={10} height={64}
            fill="rgba(0,0,0,0.12)" rx={2}
          />
        ))}

        {/* ── BACK REST ── */}
        <rect x={10} y={70} width={520} height={108} rx={20}
          fill={color} style={{ filter: "brightness(0.88)" }} />

        {/* Back cushion divider gaps */}
        {Array.from({ length: cushions - 1 }).map((_, i) => (
          <rect key={i}
            x={ARM + 10 + (i + 1) * cushionW - 5}
            y={75} width={10} height={96}
            fill="rgba(0,0,0,0.10)" rx={2}
          />
        ))}

        {/* Back rest top highlight */}
        <rect x={10} y={70} width={520} height={32} rx={20}
          fill="rgba(255,255,255,0.14)" />

        {/* ── ARMRESTS ── */}
        <rect x={5} y={95} width={ARM + 8} height={130} rx={20}
          fill={color} style={{ filter: "brightness(0.78)" }} />
        <rect x={W - ARM - 13 + 20} y={95} width={ARM + 8} height={130} rx={20}
          fill={color} style={{ filter: "brightness(0.78)" }} />

        {/* Armrest top highlight */}
        <rect x={5} y={95} width={ARM + 8} height={22} rx={18}
          fill="rgba(255,255,255,0.16)" />
        <rect x={W - ARM - 13 + 20} y={95} width={ARM + 8} height={22} rx={18}
          fill="rgba(255,255,255,0.16)" />

        {/* Seat highlight */}
        {Array.from({ length: cushions }).map((_, i) => (
          <rect key={i}
            x={ARM + 12 + i * cushionW}
            y={170}
            width={cushionW - 18}
            height={16}
            rx={8}
            fill="rgba(255,255,255,0.14)"
          />
        ))}
      </svg>
    </div>
  );
}
