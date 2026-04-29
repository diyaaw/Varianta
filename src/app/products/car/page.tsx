"use client";

import { useState, useMemo } from "react";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ColorPicker from "@/components/configurator/ColorPicker";
import OptionSelector from "@/components/configurator/OptionSelector";
import AddonToggle from "@/components/configurator/AddonToggle";
import CarVisualization from "@/components/configurator/CarVisualization";
import {
  CAR_BASE_PRICE, carColors, wheelTypes, interiorTrims, carPackages,
} from "@/lib/car-data";

function fmt(n: number) { return `₹${n.toLocaleString("en-IN")}`; }

export default function CarPage() {
  const { addToCart } = useCart();
  const [color, setColor] = useState(carColors[0].id);
  const [wheel, setWheel] = useState(wheelTypes[0].id);
  const [interior, setInterior] = useState(interiorTrims[0].id);
  const [packages, setPackages] = useState<string[]>([]);
  const [added, setAdded] = useState(false);

  const selectedColor = carColors.find((c) => c.id === color)!;
  const selectedWheel = wheelTypes.find((w) => w.id === wheel)!;
  const selectedInterior = interiorTrims.find((i) => i.id === interior)!;
  const hasSunroof = packages.includes("sunroof");
  const hasPrivacyGlass = packages.includes("privacy-glass");

  const total = useMemo(() => {
    const pkgSum = packages.reduce((s, id) => {
      return s + (carPackages.find((p) => p.id === id)?.priceModifier ?? 0);
    }, 0);
    return CAR_BASE_PRICE + selectedWheel.priceModifier + selectedInterior.priceModifier + pkgSum;
  }, [wheel, interior, packages, selectedWheel, selectedInterior]);

  function handleAddToCart() {
    addToCart({
      product: "Luxury Sedan",
      price: total,
      image: "/car-base.png",
      config: {
        color: selectedColor.label,
        wheels: selectedWheel.label,
        interior: selectedInterior.label,
        packages: packages.map((id) => carPackages.find((p) => p.id === id)?.label).filter(Boolean),
      },
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex flex-col lg:flex-row flex-1">

        {/* LEFT SIDEBAR */}
        <aside className="w-full lg:w-[300px] xl:w-[320px] flex-shrink-0 bg-white border-r border-gray-100 overflow-y-auto pb-28">
          <div className="px-6 pt-7 pb-5">
            <p className="text-xs font-semibold text-blue-600 tracking-widest uppercase mb-1">Luxury Sedan</p>
            <h1 className="text-2xl font-extrabold text-gray-900 leading-tight mb-2">Configure Your Ride</h1>
            <p className="text-sm text-gray-500 leading-relaxed">Design your perfect luxury sedan — colour, wheels, interior and packages.</p>
          </div>
          <div className="px-6 space-y-8">
            <ColorPicker label="Exterior Colour" colors={carColors} selected={color} onChange={setColor} />
            <OptionSelector label="Wheel Type" options={wheelTypes} selected={wheel} onChange={setWheel} variant="cards" formatPrice={fmt} />
            <OptionSelector label="Interior Trim" options={interiorTrims} selected={interior} onChange={setInterior} variant="cards" formatPrice={fmt} />
            <AddonToggle label="Packages & Add-Ons" addons={carPackages} selected={packages} onChange={setPackages} formatPrice={fmt} />
          </div>
        </aside>

        {/* RIGHT: 2D SVG VISUALIZATION */}
        <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50/30 to-indigo-50/40 p-8 sm:p-12 min-h-[420px]">
          <div className="w-full max-w-2xl">
            <CarVisualization
              bodyColor={selectedColor.hex}
              rimColor={selectedWheel.rimColor}
              spokeCount={selectedWheel.spokeCount}
              windowTint={hasPrivacyGlass}
              hasSunroof={hasSunroof}
            />
            {/* Live spec badges */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-xs font-semibold text-gray-700 shadow-sm border border-gray-100">
                <span className="w-2.5 h-2.5 rounded-full border border-gray-200" style={{ backgroundColor: selectedColor.hex }} />
                {selectedColor.label}
              </span>
              <span className="px-3 py-1.5 bg-white rounded-full text-xs font-semibold text-gray-700 shadow-sm border border-gray-100">
                {selectedWheel.label}
              </span>
              <span className="px-3 py-1.5 bg-white rounded-full text-xs font-semibold text-gray-700 shadow-sm border border-gray-100">
                {selectedInterior.label}
              </span>
              {hasSunroof && (
                <span className="px-3 py-1.5 bg-blue-50 rounded-full text-xs font-semibold text-blue-700 border border-blue-100">
                  ☀ Panoramic Roof
                </span>
              )}
              {hasPrivacyGlass && (
                <span className="px-3 py-1.5 bg-slate-100 rounded-full text-xs font-semibold text-slate-700 border border-slate-200">
                  🔒 Privacy Glass
                </span>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* STICKY BOTTOM BAR */}
      <div className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-t border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div>
            <p className="text-[9px] font-bold tracking-widest text-gray-400 uppercase">Total Price</p>
            <p className="text-xl font-extrabold text-gray-900">{fmt(total)}</p>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-sm text-gray-500 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border border-gray-200" style={{ backgroundColor: selectedColor.hex }} />
              {selectedColor.label}
            </span>
            <span className="text-gray-200">|</span>
            <span>{selectedWheel.label}</span>
            {packages.length > 0 && <><span className="text-gray-200">|</span><span>{packages.length} package{packages.length > 1 ? "s" : ""}</span></>}
          </div>
          <button
            id="car-add-to-cart"
            onClick={handleAddToCart}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95 ${added ? "bg-green-500 text-white" : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-200"}`}
          >
            {added ? (
              <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>Added!</>
            ) : (
              <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>Add to Cart</>
            )}
          </button>
        </div>
      </div>
      <div className="h-16" />
      <Footer tagline="© 2024 Varianta. Functional elegance for high-growth platforms." />
    </div>
  );
}
