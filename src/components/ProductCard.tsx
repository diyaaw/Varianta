import Image from "next/image";
import Link from "next/link";

export interface Product {
  id: string;
  name: string;
  startingPrice: string;
  description: string;
  image: string;
  href: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden">
      {/* Image area */}
      <div className="bg-slate-50 flex items-center justify-center h-60 sm:h-64 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={300}
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
          priority
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2 leading-snug">
            {product.name}
          </h2>
          <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-1">
            Starting From
          </p>
          <p className="text-2xl font-extrabold text-blue-600 mb-3">
            {product.startingPrice}
          </p>
          <p className="text-sm text-gray-500 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-auto pt-2">
          <Link
            href={product.href}
            className="block w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-sm font-semibold text-center py-3.5 rounded-xl transition-all duration-200 shadow-sm shadow-blue-200"
          >
            Customize
          </Link>
        </div>
      </div>
    </article>
  );
}
