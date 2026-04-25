"use client";

import { useState, useMemo } from "react";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ColorPicker from "@/components/configurator/ColorPicker";
import OptionSelector from "@/components/configurator/OptionSelector";
import AddonToggle from "@/components/configurator/AddonToggle";
import TShirtVisualization from "@/components/configurator/TShirtVisualization";
import { TSHIRT_BASE_PRICE, tshirtColors, tshirtSizes, tshirtPatterns, tshirtAddons } from "@/lib/tshirt-data";

function fmt(n: number) { return `₹${n.toLocaleString("en-IN")}`; }

export default function TShirtPage() {
  const { addToCart } = useCart();
  const [color, setColor] = useState(tshirtColors[0].id);
  const [size, setSize] = useState(tshirtSizes[1].id);
  const [pattern, setPattern] = useState<"plain" | "striped" | "printed">("plain");
  const [addons, setAddons] = useState<string[]>([]);
  const [added, setAdded] = useState(false);

  const selectedColor = tshirtColors.find((c) => c.id === color)!;
  const selectedSize = tshirtSizes.find((s) => s.id === size)!;
  const selectedPattern = tshirtPatterns.find((p) => p.id === pattern)!;

  const total = useMemo(() => {
    const addonSum = addons.reduce((s, id) => s + (tshirtAddons.find((a) => a.id === id)?.priceModifier ?? 0), 0);
    return TSHIRT_BASE_PRICE + selectedSize.priceModifier + selectedPattern.priceModifier + addonSum;
  }, [size, pattern, addons, selectedSize, selectedPattern]);

  function handleAddToCart() {
    addToCart({
      product: "Classic T-Shirt",
      price: total,
      image: "/tshirt-base.png",
      config: {
        color: selectedColor.label,
        size: selectedSize.label,
        pattern: selectedPattern.label,
        addons: addons.map((id) => tshirtAddons.find((a) => a.id === id)?.label).filter(Boolean),
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
            <p className="text-xs font-semibold text-blue-600 tracking-widest uppercase mb-1">Classic T-Shirt</p>
            <h1 className="text-2xl font-extrabold text-gray-900 leading-tight mb-2">Customize Your Tee</h1>
            <p className="text-sm text-gray-500 leading-relaxed">Pick a colour, size, pattern and add-ons.</p>
          </div>
          <div className="px-6 space-y-8">
            <ColorPicker label="Colour" colors={tshirtColors} selected={color} onChange={setColor} />
            <OptionSelector label="Size" options={tshirtSizes} selected={size} onChange={setSize} variant="pills" formatPrice={fmt} />
            <OptionSelector
              label="Pattern"
              options={tshirtPatterns}
              selected={pattern}
              onChange={(v) => setPattern(v as "plain" | "striped" | "printed")}
              variant="cards"
              formatPrice={fmt}
            />
            <AddonToggle label="Add-Ons" addons={tshirtAddons} selected={addons} onChange={setAddons} formatPrice={fmt} />
          </div>
        </aside>

        {/* RIGHT: SVG PREVIEW */}
        <div
          className="flex-1 flex items-center justify-center p-8 sm:p-12 min-h-[420px] transition-all duration-700"
          style={{ background: `linear-gradient(135deg, ${selectedColor.hex}28 0%, ${selectedColor.hex}12 40%, #f8fafc 100%)` }}
        >
          <div className="flex flex-col items-center gap-4 w-full max-w-sm">
            <TShirtVisualization color={selectedColor.hex} pattern={pattern} addons={addons} />
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-xs font-semibold text-gray-700 shadow-sm border border-gray-100">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedColor.hex }} />
                {selectedColor.label}
              </span>
              <span className="px-3 py-1.5 bg-white rounded-full text-xs font-semibold text-gray-700 shadow-sm border border-gray-100">
                {selectedSize.label} · {selectedPattern.label}
              </span>
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
            <span>{selectedSize.label} · {selectedPattern.label}</span>
            {addons.length > 0 && <><span className="text-gray-200">|</span><span>{addons.length} add-on{addons.length > 1 ? "s" : ""}</span></>}
          </div>
          <button
            id="tshirt-add-to-cart"
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
