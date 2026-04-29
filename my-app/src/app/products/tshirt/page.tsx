"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useCart } from "@/context/CartContext";
import ConfiguratorLayout from "@/components/configurator/ConfiguratorLayout";
import {
  TSHIRT_BASE_PRICE, tshirtColors, tshirtMaterials,
  tshirtSizes, tshirtPatterns, tshirtAddons,
} from "@/lib/tshirt-data";

const TShirt3DScene = dynamic(
  () => import("@/components/configurator/TShirt3DScene"),
  { ssr: false, loading: () => <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#111318", color: "#94a3b8", fontSize: 13 }}>Loading 3D Scene…</div> }
);

function fmt(n: number) { return `₹${n.toLocaleString("en-IN")}`; }

export default function TShirtPage() {
  const { addToCart } = useCart();
  const [color,   setColor]   = useState(tshirtColors[0].id);
  const [material, setMaterial] = useState(tshirtMaterials[0].id);
  const [size,    setSize]    = useState(tshirtSizes[1].id);
  const [pattern, setPattern] = useState<"plain" | "h-stripes" | "v-stripes">("plain");
  const [addons,  setAddons]  = useState<string[]>([]);
  const [added,   setAdded]   = useState(false);

  const selColor    = tshirtColors.find((c) => c.id === color)!;
  const selMaterial = tshirtMaterials.find((m) => m.id === material)!;
  const selSize     = tshirtSizes.find((s) => s.id === size)!;
  const selPattern  = tshirtPatterns.find((p) => p.id === pattern)!;

  const total = useMemo(() => {
    const addonSum = addons.reduce((s, id) =>
      s + (tshirtAddons.find((a) => a.id === id)?.priceModifier ?? 0), 0);
    return TSHIRT_BASE_PRICE + selMaterial.priceModifier + selSize.priceModifier + selPattern.priceModifier + addonSum;
  }, [material, size, pattern, addons, selMaterial, selSize, selPattern]);

  function handleAddToCart() {
    addToCart({
      product: "Premium Cotton T-Shirt",
      price: total,
      image: "/tshirt.png",
      config: {
        color:    selColor.label,
        material: selMaterial.label,
        size:     selSize.label,
        pattern:  selPattern.label,
        addons:   addons.map((id) => tshirtAddons.find((a) => a.id === id)?.label).filter(Boolean).join(", ") || "None",
      },
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <ConfiguratorLayout
      productCategory="Premium Cotton"
      productName="T-Shirt"
      productTagline="Premium quality cotton fabric with a soft feel. Perfect for daily wear & all seasons."
      productHref="/tshirt.png"
      rating={4.8}
      reviewCount={256}
      productFeatures={[
        "100% Premium Cotton fabric",
        "Pre-shrunk & color-fast treatment",
        "Reinforced double-needle stitching",
        "Breathable moisture-wicking finish",
        "Available in S to XXL sizing",
        "Eco-friendly certified dyes",
      ]}
      totalPrice={total}
      formatPrice={fmt}

      colors={tshirtColors}
      selectedColor={color}
      onColorChange={setColor}

      optionGroups={[
        { label: "Material", options: tshirtMaterials, selected: material, onChange: setMaterial },
        { label: "Size",     options: tshirtSizes,    selected: size,     onChange: setSize },
        {
          label: "Pattern / Design",
          options: tshirtPatterns,
          selected: pattern,
          onChange: (v) => setPattern(v as "plain" | "h-stripes" | "v-stripes"),
        },
      ]}

      addons={tshirtAddons}
      selectedAddons={addons}
      onAddonChange={setAddons}

      viewer={
        <TShirt3DScene
          color={selColor.hex}
          pattern={pattern}
          addons={addons}
        />
      }
      selectedColorHex={selColor.hex}

      cartConfig={{
        color:    selColor.label,
        material: selMaterial.label,
        size:     selSize.label,
        pattern:  selPattern.label,
        addons:   addons.length ? `${addons.length} selected` : "None",
      }}

      thumbnails={tshirtColors.map((c) => ({ id: c.id, label: c.label, color: c.hex }))}
      activeThumbnail={color}
      onThumbnailChange={setColor}

      onAddToCart={handleAddToCart}
      added={added}
    />
  );
}
