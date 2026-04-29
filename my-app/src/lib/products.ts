import type { Product } from "@/components/ProductCard";

export const products: Product[] = [
  {
    id: "classic-tshirt",
    name: "Classic T-Shirt",
    startingPrice: "₹499",
    description: "Customize colors and materials for everyday comfort",
    image: "/black_tshirt.png",
    href: "/products/tshirt",
  },
  {
    id: "modern-sofa",
    name: "Modern Sofa",
    startingPrice: "₹15,999",
    description: "Personalize fabric and finish for your living space",
    image: "/black_sofa.png",
    href: "/products/sofa",
  },
];
