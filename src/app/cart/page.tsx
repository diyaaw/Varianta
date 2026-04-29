"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function formatPrice(n: number) {
  if (n >= 100000) return `₹${n.toLocaleString("en-IN")}`;
  if (n >= 100) return `₹${n.toLocaleString("en-IN")}`;
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
}

export default function CartPage() {
  const { items, removeFromCart, clearCart, totalItems, totalPrice } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <main className="flex-grow max-w-4xl w-full mx-auto px-6 sm:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Your Cart</h1>
            <p className="text-sm text-gray-500 mt-1">
              {totalItems === 0 ? "No items yet" : `${totalItems} item${totalItems > 1 ? "s" : ""} ready to order`}
            </p>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Empty state */}
        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-5">
              <svg className="w-9 h-9 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 text-sm mb-8 max-w-xs">
              Customize a product and add it to your cart to get started.
            </p>
            <Link
              href="/products"
              className="bg-blue-600 text-white font-semibold px-7 py-3 rounded-xl hover:bg-blue-700 transition-all active:scale-95 shadow-sm shadow-blue-200"
            >
              Browse Products
            </Link>
          </div>
        )}

        {/* Cart items */}
        {items.length > 0 && (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-5 p-5 rounded-2xl border border-gray-100 bg-white hover:shadow-md transition-shadow duration-200"
              >
                {/* Product image */}
                <div className="w-20 h-20 rounded-xl bg-slate-50 flex-shrink-0 overflow-hidden relative border border-gray-100">
                  <Image
                    src={item.image}
                    alt={item.product}
                    fill
                    className="object-contain p-2"
                    sizes="80px"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">{item.product}</h3>
                      <p className="text-lg font-extrabold text-blue-600 mt-0.5">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.product}`}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-red-50 flex-shrink-0"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  {/* Config tags */}
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {Object.entries(item.config).map(([key, val]) => {
                      if (!val || (Array.isArray(val) && val.length === 0)) return null;
                      const display = Array.isArray(val) ? val.filter(Boolean).join(", ") : String(val);
                      if (!display) return null;
                      return (
                        <span
                          key={key}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-gray-600 text-xs font-medium rounded-full"
                        >
                          <span className="text-gray-400 capitalize">{key}:</span> {display}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}

            {/* Order summary */}
            <div className="mt-8 rounded-2xl border border-gray-100 bg-slate-50 p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} item{totalItems > 1 ? "s" : ""})</span>
                  <span className="font-semibold text-gray-900">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between font-bold text-base text-gray-900">
                  <span>Total</span>
                  <span className="text-blue-600">{formatPrice(totalPrice)}</span>
                </div>
              </div>
              <button
                id="checkout-btn"
                className="mt-5 w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 active:scale-[0.99] transition-all shadow-sm shadow-blue-200 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Proceed to Checkout
              </button>
              <Link
                href="/products"
                className="mt-3 w-full text-center block text-sm text-gray-500 hover:text-gray-900 transition-colors py-2"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer tagline="© 2024 Varianta. Functional elegance for high-growth platforms." />
    </div>
  );
}
