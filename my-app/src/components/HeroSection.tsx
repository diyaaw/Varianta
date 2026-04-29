import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        {/* Left: Text Content */}
        <div className="flex-1 max-w-xl lg:max-w-lg xl:max-w-xl">
          <h1 className="text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-5">
            Design Your Product.
            <br />
            <span className="text-blue-600">Your Way.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-500 mb-10 max-w-md leading-relaxed">
            The ultimate SaaS platform for real-time product customization.
            Elevate your brand experience with our enterprise-grade
            configuration engine.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-blue-600 text-white px-7 py-3.5 rounded-lg font-semibold text-sm hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200"
            >
              Start Customizing
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-white text-gray-700 px-7 py-3.5 rounded-lg font-semibold text-sm border border-gray-200 hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all shadow-sm"
            >
              Explore Products
            </Link>
          </div>
        </div>

        {/* Right: Product Configurator Showcase */}
        <div className="flex-1 w-full max-w-sm sm:max-w-md lg:max-w-[480px] flex justify-center lg:justify-end">
          <div className="w-full max-w-[440px] rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/80 border border-gray-100"
            style={{ background: "#f8fafc" }}>

            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6)" }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                    <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" fill="white"/>
                  </svg>
                </div>
                <span className="text-xs font-bold text-gray-800 tracking-tight">Varianta Configurator</span>
              </div>
              <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">Live Preview</span>
            </div>

            {/* Product preview area */}
            <div className="relative h-52 flex items-center justify-center overflow-hidden"
              style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(59,130,246,0.08) 0%, #f1f5f9 60%)" }}>
              {/* T-shirt illustration */}
              <svg viewBox="0 0 200 220" fill="none" className="w-44 drop-shadow-xl" style={{ marginTop: "-8px" }}>
                {/* Hanger hook */}
                <path d="M100 14 Q100 8 106 6 Q114 4 114 12" stroke="#94a3b8" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                {/* Hanger rod */}
                <line x1="62" y1="28" x2="138" y2="28" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>
                <path d="M100 14 Q100 20 108 22 Q122 24 138 28" stroke="#94a3b8" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                <path d="M100 14 Q100 20 92 22 Q78 24 62 28" stroke="#94a3b8" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                {/* Shirt body */}
                <path d="M62 28 L32 46 L18 66 L42 74 L48 62 L48 200 L152 200 L152 62 L158 74 L182 66 L168 46 L138 28 Q120 38 100 38 Q80 38 62 28 Z" fill="#2563eb"/>
                {/* Collar shadow */}
                <path d="M62 28 Q80 38 100 38 Q120 38 138 28 Q124 56 100 56 Q76 56 62 28 Z" fill="rgba(0,0,0,0.2)"/>
                {/* Highlight stripe */}
                <path d="M56 54 Q78 44 112 50 Q84 44 58 62 Z" fill="rgba(255,255,255,0.18)"/>
                {/* Fabric folds */}
                <path d="M78 90 Q80 140 78 200" stroke="rgba(0,0,0,0.08)" strokeWidth="5" fill="none" strokeLinecap="round"/>
                <path d="M122 90 Q120 140 122 200" stroke="rgba(0,0,0,0.08)" strokeWidth="5" fill="none" strokeLinecap="round"/>
                {/* Hem stitch */}
                <line x1="49" y1="194" x2="151" y2="194" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="5 4"/>
                {/* Collar stitch */}
                <path d="M67 33 Q100 52 133 33" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeDasharray="4 3"/>
                {/* Outline */}
                <path d="M62 28 L32 46 L18 66 L42 74 L48 62 L48 200 L152 200 L152 62 L158 74 L182 66 L168 46 L138 28 Q120 38 100 38 Q80 38 62 28 Z" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5"/>
              </svg>

              {/* Floating badge */}
              <div className="absolute top-3 right-3 bg-white rounded-xl px-2.5 py-1.5 shadow-md border border-gray-100">
                <p className="text-[9px] text-gray-400 font-medium">Selected Color</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow-sm"/>
                  <span className="text-[10px] font-bold text-gray-700">Ocean Blue</span>
                </div>
              </div>
            </div>

            {/* Controls strip */}
            <div className="px-4 py-3 bg-white border-t border-gray-100 space-y-3">
              {/* Color pickers */}
              <div>
                <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-gray-400 mb-1.5">Color</p>
                <div className="flex items-center gap-2">
                  {["#2563eb","#16a34a","#dc2626","#7c3aed","#0f172a","#f59e0b"].map((c, i) => (
                    <div key={c} className="w-5 h-5 rounded-full border-2 transition-transform"
                      style={{ backgroundColor: c, borderColor: i === 0 ? "white" : "transparent", boxShadow: i === 0 ? `0 0 0 2px ${c}` : "none", transform: i === 0 ? "scale(1.2)" : "scale(1)" }}/>
                  ))}
                </div>
              </div>
              {/* Size selector */}
              <div>
                <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-gray-400 mb-1.5">Size</p>
                <div className="flex items-center gap-1.5">
                  {["S","M","L","XL"].map((s, i) => (
                    <div key={s} className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold border transition-all"
                      style={{ background: i === 1 ? "#2563eb" : "#f1f5f9", color: i === 1 ? "white" : "#6b7280", borderColor: i === 1 ? "#2563eb" : "#e2e8f0" }}>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
              {/* CTA row */}
              <div className="flex items-center gap-2 pt-1">
                <div className="flex-1 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold text-white" style={{ background: "linear-gradient(135deg,#3b82f6,#2563eb)" }}>
                  Add to Cart — ₹1,299
                </div>
                <div className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
