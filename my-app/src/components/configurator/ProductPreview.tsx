import Image from "next/image";

interface ProductPreviewProps {
  image: string;
  alt: string;
  colorHex?: string;
  patternStyle?: "plain" | "striped" | "printed";
  bgFrom?: string;
  bgTo?: string;
}

const patternOverlays: Record<string, string> = {
  plain: "",
  striped:
    "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.12) 10px, rgba(255,255,255,0.12) 20px)",
  printed:
    "repeating-radial-gradient(circle at 25% 25%, rgba(255,255,255,0.08) 0 8px, transparent 8px 20px)",
};

export default function ProductPreview({
  image,
  alt,
  colorHex,
  patternStyle = "plain",
  bgFrom = "#e0e7ff",
  bgTo = "#f0f9ff",
}: ProductPreviewProps) {
  return (
    <div
      className="w-full h-full flex items-center justify-center p-8 sm:p-12 transition-all duration-500 min-h-[380px]"
      style={{
        background: `linear-gradient(135deg, ${bgFrom}, ${bgTo})`,
      }}
    >
      <div
        className="relative w-full max-w-lg aspect-square rounded-2xl overflow-hidden"
        style={{
          background:
            patternStyle !== "plain"
              ? `${patternOverlays[patternStyle]}, rgba(255,255,255,0.55)`
              : "rgba(255,255,255,0.55)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.10), 0 8px 24px rgba(0,0,0,0.06)",
        }}
      >
        {/* Product image */}
        <Image
          src={image}
          alt={alt}
          fill
          className="object-contain p-6 transition-all duration-700 z-10 relative"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />

        {/* Color tint overlay — mix-blend-mode:color works on any base image */}
        {colorHex && (
          <div
            key={colorHex}
            className="absolute inset-0 z-20 pointer-events-none transition-all duration-500 rounded-2xl"
            style={{
              backgroundColor: colorHex,
              mixBlendMode: "color",
              opacity: 0.55,
            }}
          />
        )}

        {/* Pattern texture overlay */}
        {patternStyle !== "plain" && (
          <div
            className="absolute inset-0 z-30 pointer-events-none rounded-2xl"
            style={{ background: patternOverlays[patternStyle] }}
          />
        )}
      </div>
    </div>
  );
}
