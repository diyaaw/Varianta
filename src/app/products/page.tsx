import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products — Varianta",
  description:
    "Choose from our range of customizable products. Personalize colors, materials, and finishes in real-time.",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <main className="flex-grow bg-slate-50">
        {/* Page Header */}
        <section className="py-14 sm:py-16 px-6 sm:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 leading-tight">
              Choose a Product to Customize
            </h1>
            <p className="text-base sm:text-lg text-gray-500 font-medium">
              Select a product and personalize it in real-time
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section
          className="pb-16 sm:pb-20 px-6 sm:px-8"
          aria-label="Product catalog"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <Footer tagline="© 2024 Varianta. Functional elegance for high-growth platforms." />
    </div>
  );
}
