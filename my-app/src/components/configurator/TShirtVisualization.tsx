interface Props {
  color: string;
  pattern: "plain" | "striped" | "printed";
  addons: string[];
}

const SHIRT = "M 155 72 Q 200 98 245 72 L 310 108 L 390 138 L 382 190 L 308 172 L 322 390 L 78 390 L 92 172 L 18 190 L 10 138 L 90 108 Z";
const COLLAR = "M 155 72 Q 200 98 245 72 Q 220 118 200 118 Q 180 118 155 72 Z";

export default function TShirtVisualization({ color, pattern, addons }: Props) {
  const hasLogo = addons.includes("logo");
  const hasText = addons.includes("text");

  return (
    <div className="w-full max-w-xs mx-auto" style={{ filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.75))" }}>
      <svg viewBox="0 0 400 520" fill="none" className="w-full" style={{ transition: "all 0.65s cubic-bezier(0.4,0,0.2,1)" }}>
        <defs>
          <pattern id="p-stripes" patternUnits="userSpaceOnUse" width="28" height="28">
            <rect width="14" height="28" fill="rgba(255,255,255,0.22)" />
          </pattern>
          <pattern id="p-print" patternUnits="userSpaceOnUse" width="38" height="38">
            <circle cx="19" cy="19" r="7" fill="rgba(255,255,255,0.18)" />
            <circle cx="0" cy="0" r="3" fill="rgba(255,255,255,0.1)" />
            <circle cx="38" cy="38" r="3" fill="rgba(255,255,255,0.1)" />
          </pattern>
          <clipPath id="shirt-clip"><path d={SHIRT} /></clipPath>
          <linearGradient id="studioGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(180,200,255,0.06)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
          <radialGradient id="hangerShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.5)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#111827" />
            <stop offset="100%" stopColor="#0d1117" />
          </linearGradient>
        </defs>

        {/* Studio background */}
        <rect x={0} y={0} width={400} height={520} fill="url(#bgGrad)" />
        {/* Studio spotlight */}
        <ellipse cx={200} cy={0} rx={200} ry={220} fill="url(#studioGrad)" />

        {/* Curtain rod */}
        <rect x={20} y={18} width={360} height={6} rx={3} fill="#1e293b" />
        <circle cx={20} cy={21} r={5} fill="#334155" />
        <circle cx={380} cy={21} r={5} fill="#334155" />
        {/* Rod highlight */}
        <rect x={20} y={18} width={360} height={2} rx={1} fill="rgba(255,255,255,0.12)" />

        {/* Hanger */}
        <path d="M200 24 L200 46" stroke="#94a3b8" strokeWidth={2.5} strokeLinecap="round" />
        <path d="M200 46 Q200 52 212 56 Q240 64 260 72" stroke="#94a3b8" strokeWidth={2} fill="none" strokeLinecap="round" />
        <path d="M200 46 Q200 52 188 56 Q160 64 140 72" stroke="#94a3b8" strokeWidth={2} fill="none" strokeLinecap="round" />
        {/* Hanger cross bar */}
        <line x1={140} y1={72} x2={260} y2={72} stroke="#94a3b8" strokeWidth={2.5} strokeLinecap="round" />
        {/* Hanger hook */}
        <path d="M200 24 Q200 16 208 14 Q218 12 218 20" stroke="#cbd5e1" strokeWidth={2} fill="none" strokeLinecap="round" />

        {/* Shirt ground shadow */}
        <ellipse cx={200} cy={416} rx={130} ry={10} fill="url(#hangerShadow)" />

        {/* Shirt base */}
        <path d={SHIRT} fill={color} />

        {/* Pattern overlay */}
        {pattern === "striped" && (
          <rect x={0} y={0} width={400} height={520} fill="url(#p-stripes)" clipPath="url(#shirt-clip)" />
        )}
        {pattern === "printed" && (
          <rect x={0} y={0} width={400} height={520} fill="url(#p-print)" clipPath="url(#shirt-clip)" />
        )}

        {/* Fabric folds/shadow */}
        <path d="M 155 200 Q 175 280 170 390" stroke="rgba(0,0,0,0.12)" strokeWidth={6} fill="none" strokeLinecap="round" />
        <path d="M 245 200 Q 225 280 230 390" stroke="rgba(0,0,0,0.12)" strokeWidth={6} fill="none" strokeLinecap="round" />
        <path d="M 200 190 Q 202 310 200 390" stroke="rgba(0,0,0,0.06)" strokeWidth={4} fill="none" strokeLinecap="round" />

        {/* Studio light highlight - left shoulder */}
        <path d="M 110 130 Q 155 105 210 120 Q 170 115 120 145 Z" fill="rgba(255,255,255,0.16)" />
        {/* Body highlight stripe */}
        <path d="M 155 150 Q 175 145 200 148" stroke="rgba(255,255,255,0.12)" strokeWidth={8} strokeLinecap="round" fill="none" />

        {/* Shirt outline */}
        <path d={SHIRT} fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth={2} />

        {/* Collar */}
        <path d={COLLAR} fill="rgba(0,0,0,0.2)" />
        {/* Neckline stitch */}
        <path d="M 159 77 Q 200 103 241 77" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth={1.5} strokeDasharray="4 3" />

        {/* Shoulder/sleeve stitches */}
        <path d="M 90 114 L 155 76" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={1} strokeDasharray="4 3" />
        <path d="M 310 114 L 245 76" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={1} strokeDasharray="4 3" />

        {/* Hem stitch */}
        <line x1={80} y1={384} x2={320} y2={384} stroke="rgba(255,255,255,0.28)" strokeWidth={1.5} strokeDasharray="5 4" />
        {/* Side seam stitches */}
        <line x1={92} y1={174} x2={92} y2={384} stroke="rgba(255,255,255,0.1)" strokeWidth={1} strokeDasharray="5 4" />
        <line x1={308} y1={174} x2={308} y2={384} stroke="rgba(255,255,255,0.1)" strokeWidth={1} strokeDasharray="5 4" />

        {/* Armhole seam */}
        <line x1={308} y1={174} x2={92} y2={174} stroke="rgba(255,255,255,0.14)" strokeWidth={1} strokeDasharray="5 4" />

        {/* Logo addon */}
        {hasLogo && (
          <g>
            <circle cx={200} cy={240} r={30} fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.5)" strokeWidth={1.5} />
            <text x={200} y={248} textAnchor="middle" fill="rgba(255,255,255,0.95)"
              fontSize={22} fontWeight="bold" fontFamily="Georgia,serif">V</text>
          </g>
        )}

        {/* Text print */}
        {hasText && (
          <text x={200} y={hasLogo ? 284 : 248} textAnchor="middle"
            fill="rgba(255,255,255,0.82)" fontSize={12} fontWeight={700}
            fontFamily="Arial,sans-serif" letterSpacing={5}>VARIANTA</text>
        )}

        {/* Printed star graphic */}
        {pattern === "printed" && !hasLogo && !hasText && (
          <text x={200} y={265} textAnchor="middle" clipPath="url(#shirt-clip)"
            fill="rgba(255,255,255,0.38)" fontSize={80} fontWeight={900}>★</text>
        )}
      </svg>
    </div>
  );
}
