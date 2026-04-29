export const TSHIRT_BASE_PRICE = 1499;

export const tshirtColors = [
  { id: "forest",  label: "Forest Green", hex: "#2d5016" },
  { id: "white",   label: "Cloud White",  hex: "#f0ede8", border: true },
  { id: "black",   label: "Jet Black",    hex: "#0f1114" },
  { id: "slate",   label: "Slate Gray",   hex: "#6b7280" },
  { id: "navy",    label: "Deep Navy",    hex: "#1e2a4a" },
  { id: "sky",     label: "Sky Blue",     hex: "#5b8db8" },
  { id: "sand",    label: "Sand",         hex: "#c8a97a", border: true },
  { id: "crimson", label: "Crimson",      hex: "#7c1d1d" },
];

export const tshirtMaterials = [
  { id: "cotton",   label: "Cotton",         priceModifier: 0,   description: "Soft, breathable 180 GSM cotton" },
  { id: "premium",  label: "Premium Cotton",  priceModifier: 300, description: "Pima 220 GSM, ultra-smooth finish" },
  { id: "poly",     label: "Polyester Blend", priceModifier: 100, description: "Lightweight, moisture-wicking" },
];

export const tshirtSizes = [
  { id: "s",   label: "S",   priceModifier: 0   },
  { id: "m",   label: "M",   priceModifier: 0   },
  { id: "l",   label: "L",   priceModifier: 50  },
  { id: "xl",  label: "XL",  priceModifier: 100 },
  { id: "xxl", label: "XXL", priceModifier: 150 },
];

export const tshirtPatterns = [
  { id: "plain",     label: "Plain",              priceModifier: 0,   description: "Classic solid color" },
  { id: "h-stripes", label: "Horizontal Stripes",  priceModifier: 200, description: "Clean horizontal stripe pattern" },
  { id: "v-stripes", label: "Vertical Stripes",    priceModifier: 200, description: "Clean vertical stripe pattern" },
];

export const tshirtAddons = [
  { id: "pocket",    label: "Chest Pocket",      priceModifier: 200 },
  { id: "embroider", label: "Embroidery Detail",  priceModifier: 350 },
  { id: "stitch",    label: "Premium Stitching",  priceModifier: 150 },
  { id: "logo",      label: "Logo Print",         priceModifier: 150 },
];
