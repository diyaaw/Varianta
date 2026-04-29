"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import ConfiguratorNavbar from "@/components/ConfiguratorNavbar";
import ConfiguratorFooter from "@/components/ConfiguratorFooter";
import {
  colorOptions,
  materialOptions,
  includedFeatures,
  BASE_PRICE,
  SHIPPING_LABEL,
} from "@/lib/configurator-data";

export default function ConfiguratorPage() {
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].id);
  const [selectedMaterial, setSelectedMaterial] = useState(materialOptions[0].id);
  const [addedToCart, setAddedToCart] = useState(false);

  const selectedColorObj = colorOptions.find((c) => c.id === selectedColor)!;
  const selectedMaterialObj = materialOptions.find((m) => m.id === selectedMaterial)!;

  const totalPrice = useMemo(() => {
    return BASE_PRICE + selectedMaterialObj.priceModifier;
  }, [selectedMaterialObj]);

  const summaryLabel = `${selectedColorObj.label} ${
    selectedMaterialObj.name.split(" ").slice(0, 2).join(" ")
  }`;

  function handleAddToCart() {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-blue-100 selection:text-blue-900">
      <ConfiguratorNavbar />

      {/* Main two-panel layout */}
      <main className="flex flex-col lg:flex-row flex-1 overflow-hidden">

        {/* ── LEFT SIDEBAR ── */}
        <aside className="w-full lg:w-[300px] xl:w-[320px] flex-shrink-0 bg-white border-r border-gray-100 overflow-y-auto pb-32 lg:pb-24">
          <div className="px-6 pt-7 pb-4">
            <h1 className="text-2xl font-extrabold text-gray-900 leading-tight mb-2">
              Customize Your Product
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              Design the perfect workspace companion tailored to your lifestyle.
            </p>
          </div>

          <div className="px-6 space-y-8 pt-2">

            {/* ── FINISH COLOR ── */}
            <section aria-labelledby="color-heading">
              <h2
                id="color-heading"
                className="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase mb-4"
              >
                Finish Color
              </h2>
              <div className="flex items-start gap-4 flex-wrap">
                {colorOptions.map((color) => (
                  <button
                    key={color.id}
                    aria-label={`Select ${color.label} finish`}
                    onClick={() => setSelectedColor(color.id)}
                    className="flex flex-col items-center gap-1.5 group"
                  >
                    <span
                      className={`w-11 h-11 rounded-full transition-all duration-200 ${
                        color.border ? "border border-gray-300" : ""
                      } ${
                        selectedColor === color.id
                          ? "ring-2 ring-blue-600 ring-offset-2 scale-110"
                          : "hover:scale-105 hover:ring-2 hover:ring-gray-300 hover:ring-offset-2"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                    <span
                      className={`text-[11px] font-semibold ${
                        selectedColor === color.id
                          ? "text-gray-900"
                          : "text-gray-400"
                      }`}
                    >
                      {color.label}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* ── MATERIAL SELECTION ── */}
            <section aria-labelledby="material-heading">
              <h2
                id="material-heading"
                className="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase mb-4"
              >
                Material Selection
              </h2>
              <div className="flex flex-col gap-3">
                {materialOptions.map((material) => {
                  const isSelected = selectedMaterial === material.id;
                  return (
                    <button
                      key={material.id}
                      onClick={() => setSelectedMaterial(material.id)}
                      aria-pressed={isSelected}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/60 shadow-sm"
                          : "border-gray-150 bg-white hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className={`text-sm font-semibold mb-1 ${isSelected ? "text-gray-900" : "text-gray-700"}`}>
                            {material.name}
                          </p>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            {material.description}
                          </p>
                        </div>
                        <div className="flex-shrink-0 mt-0.5">
                          {isSelected ? (
                            <span className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                          ) : (
                            <span className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white" />
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* ── FEATURES INCLUDED ── */}
            <section aria-labelledby="features-heading">
              <h2
                id="features-heading"
                className="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase mb-4"
              >
                Features Included
              </h2>
              <ul className="space-y-3">
                {includedFeatures.map((feature) => (
                  <li key={feature.id} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm text-gray-700 font-medium">{feature.label}</span>
                  </li>
                ))}
              </ul>
            </section>

          </div>
        </aside>

        {/* ── RIGHT: PRODUCT VIEWER ── */}
        <div className="flex-1 bg-gradient-to-br from-slate-100 via-blue-50/40 to-indigo-50/60 flex items-center justify-center p-6 sm:p-10 min-h-[420px] lg:min-h-0">
          <div className="w-full max-w-2xl bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden flex items-center justify-center p-8 aspect-[4/3]">
            <div className="relative w-full h-full">
              <Image
                src="/chair.png"
                alt={`Ergonomic chair in ${selectedColorObj.label} finish`}
                fill
                className="object-contain transition-all duration-700"
                priority
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              {/* Dynamic color tint overlay keyed to selection */}
              <div
                key={selectedColor}
                className="absolute inset-0 rounded-xl pointer-events-none animate-[fadeIn_0.4s_ease]"
                style={{
                  background:
                    selectedColor === "frost"
                      ? "transparent"
                      : `radial-gradient(ellipse at center, ${selectedColorObj.hex}12 0%, transparent 70%)`,
                }}
              />
            </div>
          </div>
        </div>
      </main>

      {/* ── STICKY BOTTOM BAR ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 h-16 flex items-center justify-between gap-4">
          {/* Price */}
          <div>
            <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase leading-none mb-0.5">
              Total Price
            </p>
            <p className="text-xl font-extrabold text-gray-900 leading-none">
              ${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
          </div>

          {/* Summary */}
          <div className="hidden sm:flex items-center gap-4 text-sm text-gray-500 font-medium">
            <span className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full border border-gray-200 flex-shrink-0"
                style={{ backgroundColor: selectedColorObj.hex }}
              />
              {summaryLabel}
            </span>
            <span className="text-gray-200">|</span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {SHIPPING_LABEL}
            </span>
          </div>

          {/* CTA */}
          <button
            id="add-to-cart-btn"
            onClick={handleAddToCart}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 shadow-sm active:scale-95 ${
              addedToCart
                ? "bg-green-500 text-white shadow-green-200"
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200"
            }`}
          >
            {addedToCart ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                Added!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>

      {/* Space so content isn't hidden behind sticky bar */}
      <div className="h-16" />

      <ConfiguratorFooter />
    </div>
  );
}
