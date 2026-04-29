export const SOFA_BASE_PRICE = 15999;

export const sofaMaterials = [
  { id: "cotton", label: "Cotton", priceModifier: 0, description: "Soft breathable cotton blend" },
  { id: "velvet", label: "Velvet", priceModifier: 3000, description: "Luxurious plush velvet" },
  { id: "leather", label: "Leather", priceModifier: 8000, description: "Full-grain genuine leather" },
];

export const sofaColors = [
  { id: "charcoal", label: "Charcoal", hex: "#374151" },
  { id: "sand", label: "Sand", hex: "#d2b48c", border: true },
  { id: "navy", label: "Navy", hex: "#1e3a5f" },
  { id: "sage", label: "Sage", hex: "#87a878" },
  { id: "blush", label: "Blush", hex: "#e8b4b8" },
];

export const sofaSizes = [
  { id: "2-seater", label: "2-Seater", priceModifier: 0, description: "Compact — fits 2 adults" },
  { id: "3-seater", label: "3-Seater", priceModifier: 5000, description: "Family — fits 3 adults" },
  { id: "l-shape", label: "L-Shape", priceModifier: 12000, description: "Lounge — max comfort" },
];

export const sofaAddons = [
  { id: "cushions", label: "Extra Cushions (×4)", priceModifier: 1500 },
  { id: "recliner", label: "Recliner Upgrade", priceModifier: 8000 },
  { id: "storage", label: "Under-Seat Storage", priceModifier: 4000 },
];
