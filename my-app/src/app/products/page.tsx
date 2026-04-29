import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products — Varianta",
  description: "Choose from our range of customizable products. Personalize colors, materials, and finishes in real-time.",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow">
        {/* Page Header */}
        <section className="bg-white border-b border-gray-100 pt-16 pb-12 px-6 sm:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            {/* Badge */}
            <span className="inline-block text-[10px] font-bold tracking-[0.16em] uppercase px-3 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(37,99,235,0.08)", color: "#2563eb", border: "1px solid rgba(37,99,235,0.18)" }}>
              Product Configurator
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 leading-tight">
              Choose &amp; Configure
              <span className="block text-blue-600"> Your Product</span>
            </h1>
            <p className="text-base text-gray-500 font-medium max-w-lg mx-auto leading-relaxed">
              Select a product and personalize every detail in real-time — color, material, size, and more.
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-14 px-6 sm:px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-gray-400 border-t border-gray-100 bg-white">
        © 2024 Varianta. Functional elegance for high-growth platforms.
      </footer>
    </div>
  );
}
