export interface ColorOption {
  id: string;
  label: string;
  hex: string;
  border?: boolean;
}

export interface MaterialOption {
  id: string;
  name: string;
  description: string;
  priceModifier: number;
}

export interface Feature {
  id: string;
  label: string;
}

export const colorOptions: ColorOption[] = [
  { id: "midnight", label: "Midnight", hex: "#0f172a" },
  { id: "titanium", label: "Titanium", hex: "#78828c" },
  { id: "frost", label: "Frost", hex: "#f8fafc", border: true },
  { id: "cobalt", label: "Cobalt", hex: "#2563eb" },
];

export const materialOptions: MaterialOption[] = [
  {
    id: "nappa-leather",
    name: "Premium Nappa Leather",
    description:
      "Buttery smooth texture with hand-stitched detailing for ultimate luxury.",
    priceModifier: 0,
  },
  {
    id: "fabric-mono",
    name: "Sustainable Fabric Mono",
    description:
      "High-performance recycled mesh, breathable and durable.",
    priceModifier: -200,
  },
  {
    id: "brushed-aluminum",
    name: "Brushed Aluminum Accent",
    description:
      "Industrial precision with a smooth, cool-to-touch metallic finish.",
    priceModifier: 100,
  },
];

export const includedFeatures: Feature[] = [
  { id: "ergonomic", label: "4D Ergonomic Adjustments" },
  { id: "warranty", label: "10-Year Limited Warranty" },
  { id: "lumbar", label: "Lumbar Support System" },
  { id: "foam", label: "Anti-Fatigue Seat Foam" },
];

export const BASE_PRICE = 1299;
export const SHIPPING_LABEL = "Ships in 3-5 days";
