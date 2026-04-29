interface Props {
  color: string;
  pattern: "plain" | "striped" | "printed";
  addons: string[];
}

const SHIRT = "M 158 58 Q 200 90 242 58 L 300 100 L 382 130 L 374 178 L 305 162 L 318 400 L 82 400 L 95 162 L 26 178 L 18 130 L 100 100 Z";
const COLLAR = "M 158 58 Q 200 90 242 58 Q 218 112 200 112 Q 182 112 158 58 Z";

export default function TShirtVisualization({ color, pattern, addons }: Props) {
  const hasLogo = addons.includes("logo");
  const hasText = addons.includes("text");

  return (
    <div className="w-full max-w-xs mx-auto py-4">
      <svg viewBox="0 0 400 430" fill="none" className="w-full drop-shadow-2xl">
        <defs>
          <pattern id="p-stripes" patternUnits="userSpaceOnUse" width="28" height="28">
            <rect width="14" height="28" fill="rgba(255,255,255,0.28)" />
          </pattern>
          <pattern id="p-print" patternUnits="userSpaceOnUse" width="36" height="36">
            <circle cx="18" cy="18" r="6" fill="rgba(255,255,255,0.22)" />
            <circle cx="0" cy="0" r="3" fill="rgba(255,255,255,0.12)" />
            <circle cx="36" cy="36" r="3" fill="rgba(255,255,255,0.12)" />
          </pattern>
          <clipPath id="shirt-clip"><path d={SHIRT} /></clipPath>
        </defs>

        <ellipse cx="200" cy="420" rx="130" ry="8" fill="rgba(0,0,0,0.08)" />

        {/* Shirt base fill */}
        <path d={SHIRT} fill={color} />

        {/* Pattern overlay – clipped to shirt shape */}
        {pattern === "striped" && (
          <rect x="0" y="0" width="400" height="430" fill="url(#p-stripes)" clipPath="url(#shirt-clip)" />
        )}
        {pattern === "printed" && (
          <rect x="0" y="0" width="400" height="430" fill="url(#p-print)" clipPath="url(#shirt-clip)" />
        )}

        {/* Outline */}
        <path d={SHIRT} fill="none" stroke="rgba(0,0,0,0.14)" strokeWidth={2} />

        {/* Collar shadow */}
        <path d={COLLAR} fill="rgba(0,0,0,0.18)" />

        {/* Neckline stitch */}
        <path d="M 162 63 Q 200 92 238 63" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth={1.5} strokeDasharray="4 3" />

        {/* Armhole stitch */}
        <line x1="305" y1="162" x2="95" y2="162" stroke="rgba(255,255,255,0.2)" strokeWidth={1} strokeDasharray="5 4" />

        {/* Hem stitch */}
        <line x1="82" y1="394" x2="318" y2="394" stroke="rgba(255,255,255,0.35)" strokeWidth={1.5} strokeDasharray="5 4" />

        {/* Highlight */}
        <path d="M 120 110 Q 175 95 210 112 Q 175 105 125 120 Z" fill="rgba(255,255,255,0.14)" />

        {/* Star graphic for printed (when no addons) */}
        {pattern === "printed" && !hasLogo && !hasText && (
          <text x="200" y="255" textAnchor="middle" clipPath="url(#shirt-clip)"
            fill="rgba(255,255,255,0.45)" fontSize="72" fontWeight="900">★</text>
        )}

        {/* Logo addon */}
        {hasLogo && (
          <g>
            <circle cx="200" cy="228" r="28" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.6)" strokeWidth={1.5} />
            <text x="200" y="235" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" fontFamily="Georgia,serif" opacity="0.95">V</text>
          </g>
        )}

        {/* Text print addon */}
        {hasText && (
          <text x="200" y={hasLogo ? 272 : 242} textAnchor="middle"
            fill="rgba(255,255,255,0.88)" fontSize="13" fontWeight="600"
            fontFamily="Arial,sans-serif" letterSpacing="4">VARIANTA</text>
        )}
      </svg>
    </div>
  );
}
