import Link from "next/link";

export default function BottomCTA() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-8 bg-white">
      <div className="max-w-6xl mx-auto bg-blue-600 rounded-[2rem] py-16 sm:py-20 px-6 sm:px-12 text-center relative overflow-hidden shadow-2xl shadow-blue-300/40">
        {/* Subtle radial glow overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight leading-tight">
            Ready to build your dream product?
          </h2>
          <p className="text-blue-100 text-base sm:text-lg mb-10 max-w-xl mx-auto font-medium leading-relaxed">
            Join 10,000+ designers and brands creating the future of commerce
            with Varianta.
          </p>
          <Link
            href="/products"
            id="cta-get-started"
            className="inline-flex items-center justify-center bg-white text-blue-600 font-bold px-8 py-4 rounded-xl text-sm sm:text-base hover:bg-blue-50 active:scale-95 transition-all shadow-xl shadow-blue-900/20"
          >
            Get Started for Free
          </Link>
        </div>
      </div>
    </section>
  );
}
