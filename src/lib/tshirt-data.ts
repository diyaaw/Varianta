export const TSHIRT_BASE_PRICE = 499;

export const tshirtColors = [
  { id: "black", label: "Black", hex: "#111827" },
  { id: "white", label: "White", hex: "#f1f5f9", border: true },
  { id: "blue", label: "Blue", hex: "#2563eb" },
  { id: "red", label: "Red", hex: "#dc2626" },
  { id: "green", label: "Green", hex: "#16a34a" },
];

export const tshirtSizes = [
  { id: "s", label: "S", priceModifier: 0 },
  { id: "m", label: "M", priceModifier: 0 },
  { id: "l", label: "L", priceModifier: 50 },
  { id: "xl", label: "XL", priceModifier: 100 },
];

export const tshirtPatterns = [
  { id: "plain", label: "Plain", priceModifier: 0, description: "Classic solid color" },
  { id: "striped", label: "Striped", priceModifier: 100, description: "Bold horizontal stripes" },
  { id: "printed", label: "Printed", priceModifier: 200, description: "Custom graphic print" },
];

export const tshirtAddons = [
  { id: "logo", label: "Logo Print", priceModifier: 150 },
  { id: "text", label: "Text Print", priceModifier: 100 },
];
