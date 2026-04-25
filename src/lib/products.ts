import type { Product } from "@/components/ProductCard";

export const products: Product[] = [
  {
    id: "classic-tshirt",
    name: "Classic T-Shirt",
    startingPrice: "₹499",
    description: "Customize colors and materials for everyday comfort",
    image: "/tshirt.png",
    href: "/products/tshirt",
  },
  {
    id: "modern-sofa",
    name: "Modern Sofa",
    startingPrice: "₹15,999",
    description: "Personalize fabric and finish for your living space",
    image: "/sofa.png",
    href: "/products/sofa",
  },
  {
    id: "luxury-sedan",
    name: "Luxury Sedan",
    startingPrice: "₹25,00,000",
    description: "Customize exterior color for a premium driving experience",
    image: "/car.png",
    href: "/products/car",
  },
];
