"use client";

import Link from "next/link";

export interface Product {
  id: string;
  name: string;
  startingPrice: string;
  description: string;
  image: string;
  href: string;
}

interface Props { product: Product; }

const accentMap: Record<string, { icon: React.ReactNode; badge: string; badgeBg: string }> = {

  "classic-tshirt": {
    badge: "Apparel",
    badgeBg: "#f0fdf4",
    icon: (
      <svg viewBox="0 0 140 160" fill="none" className="w-32 opacity-95 group-hover:opacity-100 transition-opacity">
        {/* Shadow */}
        <ellipse cx="70" cy="148" rx="52" ry="5" fill="rgba(0,0,0,0.07)"/>
        {/* Hanger hook */}
        <path d="M70 10 Q70 4 76 2 Q84 0 84 8" stroke="#94a3b8" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Hanger rod */}
        <line x1="42" y1="22" x2="98" y2="22" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Hanger arms */}
        <path d="M70 10 Q70 16 78 18 Q90 20 98 22" stroke="#94a3b8" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M70 10 Q70 16 62 18 Q50 20 42 22" stroke="#94a3b8" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* T-shirt body */}
        <path d="M42 22 L20 38 L10 54 L28 60 L32 50 L32 140 L108 140 L108 50 L112 60 L130 54 L120 38 L98 22 Q84 30 70 30 Q56 30 42 22 Z" fill="#166534" opacity="0.85"/>
        {/* Collar */}
        <path d="M42 22 Q56 30 70 30 Q84 30 98 22 Q86 42 70 42 Q54 42 42 22 Z" fill="rgba(0,0,0,0.18)"/>
        {/* Collar stitch */}
        <path d="M46 26 Q70 40 94 26" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeDasharray="3 2.5"/>
        {/* Fabric folds */}
        <path d="M54 70 Q56 100 54 140" stroke="rgba(0,0,0,0.1)" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M86 70 Q84 100 86 140" stroke="rgba(0,0,0,0.1)" strokeWidth="4" fill="none" strokeLinecap="round"/>
        {/* Sleeve stitches */}
        <path d="M28 44 L42 26" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="3 2.5"/>
        <path d="M112 44 L98 26" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="3 2.5"/>
        {/* Hem stitch */}
        <line x1="33" y1="135" x2="107" y2="135" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" strokeDasharray="4 3"/>
        {/* Shoulder highlight */}
        <path d="M36 38 Q58 30 86 34 Q66 30 38 44 Z" fill="rgba(255,255,255,0.14)"/>
        {/* Side seams */}
        <line x1="33" y1="52" x2="33" y2="135" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4 3"/>
        <line x1="107" y1="52" x2="107" y2="135" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4 3"/>
      </svg>
    ),
  },
  "modern-sofa": {
    badge: "Furniture",
    badgeBg: "#faf5ff",
    icon: (
      <svg viewBox="0 0 190 100" fill="none" className="w-44 opacity-95 group-hover:opacity-100 transition-opacity">
        {/* Shadow */}
        <ellipse cx="95" cy="94" rx="82" ry="5" fill="rgba(0,0,0,0.07)"/>
        {/* Legs */}
        {[28, 76, 114, 162].map(x => (
          <g key={x}>
            <rect x={x} y={80} width={6} height={12} rx={2} fill="#5b21b6" style={{filter:"brightness(0.5)"}}/>
            <rect x={x+1} y={80} width={3} height={4} rx={1} fill="rgba(255,255,255,0.12)"/>
          </g>
        ))}
        {/* Sofa base */}
        <rect x={12} y={58} width={166} height={24} rx={8} fill="#7c3aed" style={{filter:"brightness(0.7)"}}/>
        <rect x={12} y={58} width={166} height={8} rx={7} fill="rgba(255,255,255,0.1)"/>
        {/* Seat cushions */}
        <rect x={22} y={44} width={48} height={20} rx={6} fill="#7c3aed" style={{filter:"brightness(0.88)"}}/>
        <rect x={23} y={45} width={46} height={7} rx={5} fill="rgba(255,255,255,0.13)"/>
        <rect x={78} y={44} width={34} height={20} rx={6} fill="#7c3aed" style={{filter:"brightness(0.88)"}}/>
        <rect x={79} y={45} width={32} height={7} rx={5} fill="rgba(255,255,255,0.13)"/>
        <rect x={120} y={44} width={48} height={20} rx={6} fill="#7c3aed" style={{filter:"brightness(0.88)"}}/>
        <rect x={121} y={45} width={46} height={7} rx={5} fill="rgba(255,255,255,0.13)"/>
        {/* Cushion gaps */}
        <rect x={70} y={46} width={8} height={16} rx={2} fill="rgba(0,0,0,0.18)"/>
        <rect x={112} y={46} width={8} height={16} rx={2} fill="rgba(0,0,0,0.18)"/>
        {/* Backrest */}
        <rect x={12} y={14} width={166} height={34} rx={10} fill="#6d28d9" opacity={0.9}/>
        <rect x={12} y={14} width={166} height={12} rx={10} fill="rgba(255,255,255,0.12)"/>
        <rect x={12} y={38} width={166} height={10} rx={5} fill="rgba(0,0,0,0.14)"/>
        {/* Back cushion dividers */}
        <rect x={70} y={18} width={8} height={28} rx={2} fill="rgba(0,0,0,0.1)"/>
        <rect x={112} y={18} width={8} height={28} rx={2} fill="rgba(0,0,0,0.1)"/>
        {/* Armrests */}
        <rect x={0} y={26} width={20} height={46} rx={8} fill="#5b21b6" opacity={0.95}/>
        <rect x={0} y={26} width={20} height={10} rx={8} fill="rgba(255,255,255,0.15)"/>
        <rect x={170} y={26} width={20} height={46} rx={8} fill="#5b21b6" opacity={0.95}/>
        <rect x={170} y={26} width={20} height={10} rx={8} fill="rgba(255,255,255,0.15)"/>
        {/* Throw pillows */}
        <ellipse cx={44} cy={38} rx={14} ry={10} fill="#8b5cf6" style={{filter:"brightness(1.1)"}}/>
        <ellipse cx={44} cy={36} rx={12} ry={7} fill="rgba(255,255,255,0.1)"/>
        <ellipse cx={146} cy={38} rx={14} ry={10} fill="#8b5cf6" style={{filter:"brightness(1.08)"}}/>
        <ellipse cx={146} cy={36} rx={12} ry={7} fill="rgba(255,255,255,0.1)"/>
        {/* Backrest top rail highlight */}
        <rect x={12} y={14} width={166} height={3} rx={2} fill="rgba(255,255,255,0.18)"/>
      </svg>
    ),
  },
};

export default function ProductCard({ product }: Props) {
  const meta = accentMap[product.id] ?? accentMap["classic-tshirt"];

  return (
    <Link href={product.href}
      className="group block rounded-2xl overflow-hidden bg-white border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>

      {/* Image area — light neutral background */}
      <div className="h-52 flex items-center justify-center relative overflow-hidden bg-slate-50 group-hover:bg-slate-100 transition-colors duration-300">
        {/* Subtle colour glow behind illustration */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(37,99,235,0.06) 0%, transparent 70%)" }} />
        <div className="relative z-10 flex items-center justify-center w-full h-full p-4">
          <img src={product.image} alt={product.name} className="w-full h-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 border-t border-gray-100">
        {/* Category badge */}
        <span className="inline-block text-[9px] font-bold tracking-[0.14em] uppercase px-2 py-0.5 rounded-full mb-3"
          style={{ background: meta.badgeBg, color: "#374151", border: "1px solid rgba(0,0,0,0.07)" }}>
          {meta.badge}
        </span>

        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-bold text-base text-gray-900 leading-tight">{product.name}</h3>
          <span className="text-blue-600 font-bold text-sm whitespace-nowrap flex-shrink-0">
            {product.startingPrice}
          </span>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">{product.description}</p>

        <div className="flex items-center gap-1.5 text-blue-600 text-xs font-semibold group-hover:gap-2.5 transition-all">
          Configure Now
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </Link>
  );
}
