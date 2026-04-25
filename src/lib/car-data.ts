export const CAR_BASE_PRICE = 2500000;

export const carColors = [
  { id: "midnight", label: "Midnight Black", hex: "#0f172a" },
  { id: "pearl", label: "Pearl White", hex: "#e2e8f0", border: true },
  { id: "cobalt", label: "Cobalt Blue", hex: "#1d4ed8" },
  { id: "crimson", label: "Crimson Red", hex: "#b91c1c" },
  { id: "silver", label: "Silver", hex: "#94a3b8" },
  { id: "champagne", label: "Champagne Gold", hex: "#b8962e" },
];

export const wheelTypes = [
  { id: "standard", label: "17\" Standard Alloy", priceModifier: 0, description: "OEM polished silver alloys", rimColor: "#94a3b8", spokeCount: 5 },
  { id: "sport", label: "19\" Sport Alloy", priceModifier: 80000, description: "Gunmetal grey sport alloys with low-profile tyres", rimColor: "#374151", spokeCount: 7 },
  { id: "premium", label: "21\" Diamond-Cut", priceModifier: 150000, description: "Machine-faced diamond-cut premium alloys", rimColor: "#e2e8f0", spokeCount: 10 },
];

export const interiorTrims = [
  { id: "beige", label: "Beige Nappa Leather", priceModifier: 0, description: "Cream leather with contrast stitching" },
  { id: "black", label: "Black Nappa Leather", priceModifier: 80000, description: "All-black premium sporty leather" },
  { id: "cognac", label: "Cognac + Walnut Trim", priceModifier: 200000, description: "Rich cognac leather with brushed walnut inlays" },
];

export const carPackages = [
  { id: "sunroof", label: "Panoramic Sunroof", priceModifier: 200000 },
  { id: "privacy-glass", label: "Privacy Glass Tint", priceModifier: 80000 },
  { id: "bose", label: "BOSE® 3D Audio System", priceModifier: 250000 },
  { id: "night-vision", label: "Night Vision Assist", priceModifier: 300000 },
  { id: "sports-exhaust", label: "Sports Exhaust System", priceModifier: 150000 },
  { id: "adas", label: "Advanced Driver Aids (ADAS)", priceModifier: 400000 },
];
