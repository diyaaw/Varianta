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

        {/* Right: Product Mockup Visual */}
        <div className="flex-1 w-full max-w-sm sm:max-w-md lg:max-w-[480px] flex justify-center lg:justify-end">
          <div className="w-full aspect-square max-w-[460px] bg-gradient-to-br from-red-500 to-red-700 rounded-2xl shadow-2xl shadow-red-200/60 relative overflow-hidden flex flex-col items-center justify-center">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.15)_0%,transparent_70%)]" />

            {/* Floating label top-right */}
            <div className="absolute top-6 right-6 text-right">
              <p className="text-white/60 text-[10px] font-semibold tracking-widest uppercase">
                BELIEUUS MOIYH 1UI
              </p>
              <p className="text-white font-extrabold text-lg tracking-wide leading-none mt-1">
                SAFER WORK
              </p>
              <p className="text-white/50 text-[9px] mt-1 max-w-[140px] leading-relaxed">
                The best products to help you get more done with less effort.
              </p>
            </div>

            {/* 3D sphere / product circle */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Main sphere */}
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-br from-red-400 to-red-700 shadow-[0_25px_50px_rgba(100,0,0,0.6),inset_0_6px_20px_rgba(255,255,255,0.25),inset_0_-6px_20px_rgba(0,0,0,0.2)] flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white font-extrabold text-xl sm:text-2xl tracking-wide leading-tight">
                    Product
                  </p>
                  <p className="text-white font-extrabold text-xl sm:text-2xl tracking-wide leading-tight">
                    Mockup
                  </p>
                  <p className="text-red-200/70 text-[10px] tracking-widest uppercase mt-1">
                    BELIEUUS FIXED
                  </p>
                </div>
              </div>

              {/* Italic script text below sphere */}
              <p className="text-white/70 italic text-sm mt-4 font-light tracking-wide">
                Two our World
              </p>

              {/* Shadow / base ellipse */}
              <div className="w-36 h-4 bg-black/30 rounded-full blur-md mt-2" />

              {/* Bottom pill shape */}
              <div className="w-44 h-10 bg-red-600/80 rounded-[2rem] shadow-[inset_0_-4px_8px_rgba(0,0,0,0.2),0_8px_16px_rgba(80,0,0,0.3)] mt-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
