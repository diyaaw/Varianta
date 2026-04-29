"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useState } from "react";

/* ── Types ── */
interface ColorOption  { id: string; label: string; hex: string; border?: boolean; }
interface OptionItem   { id: string; label: string; priceModifier: number; description?: string; }
interface AddonItem    { id: string; label: string; priceModifier: number; }

export interface ConfiguratorLayoutProps {
  /* Meta */
  productCategory: string;
  productName?: string;          // large headline, e.g. "T-Shirt"
  productTagline: string;
  productHref: string;
  productFeatures: string[];
  totalPrice: number;
  formatPrice: (n: number) => string;
  rating?: number;               // e.g. 4.8
  reviewCount?: number;          // e.g. 256

  /* Left panel data */
  colors: ColorOption[];
  selectedColor: string;
  onColorChange: (id: string) => void;

  optionGroups: Array<{
    label: string;
    options: OptionItem[];
    selected: string;
    onChange: (id: string) => void;
  }>;

  addons?: AddonItem[];
  selectedAddons?: string[];
  onAddonChange?: (ids: string[]) => void;

  /* Center viewer */
  viewer: React.ReactNode;
  selectedColorHex: string;

  /* Right panel */
  cartConfig: Record<string, unknown>;

  /* Bottom strip thumbnails */
  thumbnails: Array<{ id: string; label: string; color: string }>;
  activeThumbnail: string;
  onThumbnailChange: (id: string) => void;
}

/* ─── Mini Icons ────────────────────────────────────────────────────────── */
function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="flex items-center gap-0.5">
        {[1,2,3,4,5].map((s) => {
          const filled  = s <= Math.floor(rating);
          const partial = !filled && s === Math.ceil(rating) && rating % 1 > 0;
          return (
            <svg key={s} width="13" height="13" viewBox="0 0 24 24"
              fill={filled ? "#f59e0b" : partial ? "url(#half)" : "none"}
              stroke="#f59e0b" strokeWidth={filled || partial ? 0 : 1.5}>
              {partial && (
                <defs>
                  <linearGradient id="half" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              )}
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          );
        })}
      </div>
      <span className="text-xs font-bold text-amber-400">{rating.toFixed(1)}</span>
      <span className="text-[10px] text-slate-600">({count.toLocaleString()} reviews)</span>
    </div>
  );
}
function CartIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}
function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}
function ShareIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  );
}

/* ─── Configurator Navbar ────────────────────────────────────────────────── */
function ConfigNav({ totalItems }: { totalItems: number }) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 h-14"
      style={{ background: "rgba(7,9,15,0.92)", borderBottom: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(20px)" }}>
      <Link href="/" className="flex items-center gap-2.5 group">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
          style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6)" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" fill="white" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="font-bold text-sm text-white tracking-tight group-hover:text-blue-400 transition-colors">Varianta</span>
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/products"
          className="text-xs font-medium text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5">
          ← Products
        </Link>
        <Link href="/cart" aria-label={`Cart (${totalItems} items)`}
          className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all">
          <CartIcon />
          {totalItems > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blue-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {totalItems > 9 ? "9+" : totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

/* ─── Left Panel ─────────────────────────────────────────────────────────── */
function LeftPanel({
  colors, selectedColor, onColorChange,
  optionGroups, addons, selectedAddons, onAddonChange,
  formatPrice,
}: Pick<ConfiguratorLayoutProps,
  "colors" | "selectedColor" | "onColorChange" |
  "optionGroups" | "addons" | "selectedAddons" | "onAddonChange" | "formatPrice"
>) {
  return (
    <aside className="w-[280px] xl:w-[300px] flex-shrink-0 flex flex-col overflow-y-auto config-sidebar">
      {/* Colors */}
      <div className="px-5 pt-6 pb-5" style={{ borderBottom: "1px solid #e2e8f0" }}>
        <span className="section-label">Color</span>
        <div className="flex flex-wrap gap-3">
          {colors.map((c) => (
            <button key={c.id} onClick={() => onColorChange(c.id)}
              aria-label={`Select ${c.label}`} title={c.label}
              className={`color-swatch ${selectedColor === c.id ? "selected" : ""}`}
              style={{
                backgroundColor: c.hex,
                border: c.border ? "1px solid rgba(255,255,255,0.25)" : "none",
              }} />
          ))}
        </div>
        <p className="mt-2 text-xs font-semibold text-gray-700">
          {colors.find((c) => c.id === selectedColor)?.label}
        </p>
      </div>

      {/* Option Groups */}
      {optionGroups.map((group) => (
        <div key={group.label} className="px-5 py-5" style={{ borderBottom: "1px solid #e2e8f0" }}>
          <span className="section-label">{group.label}</span>
          <div className="flex flex-col gap-2">
            {group.options.map((opt) => {
              const isSelected = group.selected === opt.id;
              return (
                <button key={opt.id} onClick={() => group.onChange(opt.id)}
                  className={`config-option-card text-left ${isSelected ? "selected" : ""}`}>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold leading-tight truncate ${isSelected ? "text-blue-700" : "text-gray-800"}`}>
                        {opt.label}
                      </p>
                      {opt.description && (
                        <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">{opt.description}</p>
                      )}
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-2">
                      {opt.priceModifier > 0 && (
                        <span className="text-[10px] font-semibold text-blue-600">
                          +{formatPrice(opt.priceModifier)}
                        </span>
                      )}
                      {isSelected ? (
                        <span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
                          <CheckIcon size={10} />
                        </span>
                      ) : (
                        <span className="w-5 h-5 rounded-full flex-shrink-0"
                          style={{ border: "1.5px solid #cbd5e1" }} />
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Add-ons */}
      {addons && addons.length > 0 && onAddonChange && selectedAddons && (
        <div className="px-5 py-5">
          <span className="section-label">Add-Ons</span>
          <div className="flex flex-col gap-2">
            {addons.map((addon) => {
              const isOn = selectedAddons.includes(addon.id);
              return (
                <button key={addon.id}
                  onClick={() => onAddonChange(
                    isOn ? selectedAddons.filter((id) => id !== addon.id) : [...selectedAddons, addon.id]
                  )}
                  className={`config-addon-chip ${isOn ? "selected" : ""}`}>
                  {/* Custom checkbox */}
                  <span className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all ${
                    isOn ? "bg-blue-500" : ""}`}
                    style={{ border: isOn ? "none" : "1.5px solid #cbd5e1" }}>
                    {isOn && <CheckIcon size={9} />}
                  </span>
                  <span className={`text-sm flex-1 text-left ${isOn ? "text-slate-900 font-semibold" : "text-slate-500"}`}>
                    {addon.label}
                  </span>
                  <span className="text-[10px] font-semibold text-blue-600 flex-shrink-0">
                    +{formatPrice(addon.priceModifier)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}

/* ─── Center Viewer ─────────────────────────────────────────────────────── */
function CenterViewer({ viewer, selectedColorHex }: { viewer: React.ReactNode; selectedColorHex: string }) {
  return (
    <div className="flex-1 relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        position: "relative",   /* explicit: absolute child canvas needs this */
        background: `radial-gradient(ellipse at 50% 40%, ${selectedColorHex}22 0%, #ffffff 55%), #f1f5f9`,
        transition: "background 0.8s ease",
      }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 30%, ${selectedColorHex}0e 0%, transparent 60%)`, transition: "background 0.8s ease" }} />

      {/* Product — fills entire center area */}
      <div className="absolute inset-0 z-10">
        {viewer}
      </div>

      {/* Controls hint bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4"
        style={{
          background: "rgba(7,9,15,0.72)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          borderRadius: "999px",
          padding: "6px 16px",
        }}>
        {/* Rotate */}
        <span className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
          </svg>
          Drag to rotate
        </span>
        <span className="w-px h-3 bg-white/10" />
        {/* Zoom */}
        <span className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
          Scroll to zoom
        </span>
        <span className="w-px h-3 bg-white/10" />
        {/* Fullscreen icon */}
        <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          className="text-slate-500">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      </div>
    </div>
  );
}

/* ─── Right Panel ────────────────────────────────────────────────────────── */
function RightPanel({
  productCategory, productName, productTagline, productFeatures,
  totalPrice, formatPrice, selectedColorHex, cartConfig, productHref,
  onAddToCart, added, rating, reviewCount,
}: Pick<ConfiguratorLayoutProps,
  "productCategory" | "productName" | "productTagline" | "productFeatures" |
  "totalPrice" | "formatPrice" | "selectedColorHex" | "cartConfig" | "productHref" |
  "rating" | "reviewCount"
> & { onAddToCart: () => void; added: boolean }) {
  const [qty, setQty] = useState(1);

  return (
    <aside className="w-[280px] xl:w-[300px] flex-shrink-0 flex flex-col overflow-y-auto"
      style={{ background: "#ffffff", borderLeft: "1px solid #e2e8f0" }}>
      <div className="px-6 pt-7 flex-1">
        {/* Category badge */}
        <span className="inline-block text-[10px] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full mb-3"
          style={{ background: "rgba(37,99,235,0.08)", color: "#2563eb", border: "1px solid rgba(37,99,235,0.2)" }}>
          {productCategory}
        </span>

        {/* Product name headline */}
        {productName && (
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight leading-tight mb-1">
            {productName}
          </h2>
        )}

        {/* Star rating */}
        {rating != null && reviewCount != null && (
          <StarRating rating={rating} count={reviewCount} />
        )}

        {/* Tagline / description */}
        <p className="text-xs text-gray-500 leading-relaxed mb-5">{productTagline}</p>

        {/* Price */}
        <div className="mb-5 p-4 rounded-xl" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
          <p className="text-[9px] font-bold tracking-[0.14em] uppercase text-gray-400 mb-1">Total Price</p>
          <p className="text-3xl font-black tracking-tight text-gray-900">{formatPrice(totalPrice)}</p>
          <p className="text-[10px] text-gray-400 mt-1">Inclusive of all taxes · Free shipping</p>
        </div>

        {/* Color swatch preview */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-7 h-7 rounded-full shadow-lg flex-shrink-0" style={{
            backgroundColor: selectedColorHex,
            border: "2px solid rgba(255,255,255,0.15)",
            boxShadow: `0 0 14px ${selectedColorHex}44`,
          }} />
          <div>
            <p className="text-[9px] uppercase tracking-widest text-gray-400">Selected color</p>
            <p className="text-xs font-semibold text-gray-700">{selectedColorHex}</p>
          </div>
        </div>

        {/* Features / Highlights */}
        <div className="mb-5">
          <p className="section-label">Highlights</p>
          <ul className="space-y-2">
            {productFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(37,99,235,0.1)", color: "#2563eb" }}>
                  <CheckIcon size={9} />
                </span>
                <span className="text-xs text-gray-600 leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quantity picker */}
        <div className="mb-5">
          <p className="section-label">Quantity</p>
          <div className="flex items-center gap-0" style={{ border: "1px solid #e2e8f0", borderRadius: 10, overflow:"hidden", width:"fit-content" }}>
            <button onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all text-lg font-bold">
              −
            </button>
            <span className="w-10 text-center text-sm font-bold text-gray-900">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)}
              className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all text-lg font-bold">
              +
            </button>
          </div>
        </div>

        {/* Config summary */}
        <div className="mb-5 p-3 rounded-xl" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
          <p className="section-label mb-2">Your Configuration</p>
          <div className="space-y-1.5">
            {Object.entries(cartConfig).filter(([, v]) => v).map(([k, v]) => (
              <div key={k} className="flex items-start justify-between gap-2">
                <span className="text-[10px] text-gray-400 capitalize">{k}</span>
                <span className="text-[10px] font-semibold text-gray-600 text-right">{String(v)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="px-6 pb-6 space-y-3" style={{ borderTop: "1px solid #e2e8f0", paddingTop: "20px" }}>
        <button id="configurator-add-to-cart" onClick={onAddToCart}
          className={`btn-cta w-full ${added ? "success" : ""}`}>
          {added ? <><CheckIcon size={16} /> Added to Cart!</> : <><CartIcon /> Add to Cart</>}
        </button>
        <div className="flex gap-2">
          <button className="btn-ghost flex-1 text-xs"><HeartIcon /> Save for Later</button>
          <button className="btn-ghost flex-1 text-xs"><ShareIcon /> Share</button>
        </div>
      </div>
    </aside>
  );
}

/* ─── Bottom Strip ───────────────────────────────────────────────────────── */
function BottomStrip({ thumbnails, activeThumbnail, onThumbnailChange }: {
  thumbnails: ConfiguratorLayoutProps["thumbnails"];
  activeThumbnail: string;
  onThumbnailChange: (id: string) => void;
}) {
  return (
    <div className="h-16 flex-shrink-0 flex items-center gap-3 px-6 overflow-x-auto"
      style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
      <span className="section-label mb-0 flex-shrink-0 pr-2" style={{ borderRight: "1px solid #e2e8f0", paddingRight: "12px" }}>
        Variants
      </span>
      {thumbnails.map((t) => (
        <button key={t.id} onClick={() => onThumbnailChange(t.id)}
          className={`variant-thumb flex items-center gap-2 px-3 py-2 ${t.id === activeThumbnail ? "active" : ""}`}
          style={{ background: t.id === activeThumbnail ? "rgba(37,99,235,0.08)" : "rgba(0,0,0,0.02)" }}>
          <span className="w-5 h-5 rounded-full flex-shrink-0"
            style={{ backgroundColor: t.color, border: "1.5px solid rgba(255,255,255,0.2)" }} />
          <span className={`text-[11px] font-semibold whitespace-nowrap ${t.id === activeThumbnail ? "text-blue-600" : "text-gray-500"}`}>
            {t.label}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ─── Main Export ────────────────────────────────────────────────────────── */
export default function ConfiguratorLayout(props: ConfiguratorLayoutProps & {
  onAddToCart: () => void; added: boolean;
}) {
  const { totalItems } = useCart();
  const {
    colors, selectedColor, onColorChange,
    optionGroups, addons, selectedAddons, onAddonChange,
    viewer, selectedColorHex,
    productCategory, productName, productTagline, productFeatures,
    totalPrice, formatPrice, cartConfig, productHref,
    thumbnails, activeThumbnail, onThumbnailChange,
    onAddToCart, added, rating, reviewCount,
  } = props;

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: "#f8fafc", color: "#0f172a" }}>
      <ConfigNav totalItems={totalItems} />

      {/* Three-panel body */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <LeftPanel
          colors={colors} selectedColor={selectedColor} onColorChange={onColorChange}
          optionGroups={optionGroups} addons={addons} selectedAddons={selectedAddons}
          onAddonChange={onAddonChange} formatPrice={formatPrice}
        />
        <CenterViewer viewer={viewer} selectedColorHex={selectedColorHex} />
        <RightPanel
          productCategory={productCategory}
          productName={productName}
          productTagline={productTagline}
          productFeatures={productFeatures}
          totalPrice={totalPrice}
          formatPrice={formatPrice}
          selectedColorHex={selectedColorHex}
          cartConfig={cartConfig}
          productHref={productHref}
          onAddToCart={onAddToCart}
          added={added}
          rating={rating}
          reviewCount={reviewCount}
        />
      </div>

      {/* Bottom strip */}
      <BottomStrip thumbnails={thumbnails} activeThumbnail={activeThumbnail} onThumbnailChange={onThumbnailChange} />
    </div>
  );
}
