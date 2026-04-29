"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useCart } from "@/context/CartContext";
import ConfiguratorLayout from "@/components/configurator/ConfiguratorLayout";
import { SOFA_BASE_PRICE, sofaMaterials, sofaColors, sofaSizes, sofaAddons } from "@/lib/sofa-data";

const Sofa3DScene = dynamic(
  () => import("@/components/configurator/Sofa3DScene"),
  { ssr: false, loading: () => <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0c0f1a", color: "#94a3b8", fontSize: 13 }}>Loading 3D Scene…</div> }
);

function fmt(n: number) { return `₹${n.toLocaleString("en-IN")}`; }

export default function SofaPage() {
  const { addToCart } = useCart();
  const [material, setMaterial] = useState(sofaMaterials[0].id);
  const [color, setColor]       = useState(sofaColors[0].id);
  const [size, setSize]         = useState(sofaSizes[0].id);
  const [addons, setAddons]     = useState<string[]>([]);
  const [added, setAdded]       = useState(false);

  const selColor    = sofaColors.find((c) => c.id === color)!;
  const selMaterial = sofaMaterials.find((m) => m.id === material)!;
  const selSize     = sofaSizes.find((s) => s.id === size)!;

  const total = useMemo(() => {
    const addonSum = addons.reduce((s, id) =>
      s + (sofaAddons.find((a) => a.id === id)?.priceModifier ?? 0), 0);
    return SOFA_BASE_PRICE + selMaterial.priceModifier + selSize.priceModifier + addonSum;
  }, [material, size, addons, selMaterial, selSize]);

  function handleAddToCart() {
    addToCart({
      product: "Modern Sofa",
      price: total,
      image: "/sofa.png",
      config: {
        material: selMaterial.label,
        color:    selColor.label,
        size:     selSize.label,
        addons:   addons.map((id) => sofaAddons.find((a) => a.id === id)?.label).filter(Boolean).join(", ") || "None",
      },
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <ConfiguratorLayout
      productCategory="Modern Sofa"
      productName="Comfort Sofa"
      productTagline="Handcrafted comfort. Tailored materials. Your living room, perfected."
      productHref="/sofa.png"
      rating={4.7}
      reviewCount={312}
      productFeatures={[
        "Premium high-density foam cushions",
        "Solid hardwood frame construction",
        "Stain-resistant treated fabric",
        "Anti-sag spring support system",
        "Removable & washable covers",
        "2-year structural warranty",
      ]}
      totalPrice={total}
      formatPrice={fmt}

      colors={sofaColors}
      selectedColor={color}
      onColorChange={setColor}

      optionGroups={[
        { label: "Material", options: sofaMaterials, selected: material, onChange: setMaterial },
        { label: "Size",     options: sofaSizes,     selected: size,     onChange: setSize     },
      ]}

      addons={sofaAddons}
      selectedAddons={addons}
      onAddonChange={setAddons}

      viewer={<Sofa3DScene color={selColor.hex} size={size} />}
      selectedColorHex={selColor.hex}

      cartConfig={{
        color:    selColor.label,
        material: selMaterial.label,
        size:     selSize.label,
        addons:   addons.length ? `${addons.length} selected` : "None",
      }}

      thumbnails={sofaColors.map((c) => ({ id: c.id, label: c.label, color: c.hex }))}
      activeThumbnail={color}
      onThumbnailChange={setColor}

      onAddToCart={handleAddToCart}
      added={added}
    />
  );
}
