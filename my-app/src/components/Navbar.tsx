"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50" style={{
      background: "rgba(7,9,15,0.92)",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
    }}>
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 sm:px-8 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105"
            style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" fill="white" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-bold text-base text-white tracking-tight group-hover:text-blue-400 transition-colors">
            Varianta
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href}
                className={`text-sm font-medium px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? "text-white bg-white/10"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}>
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/cart" aria-label={`Cart (${totalItems} items)`}
            className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blue-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>
          <Link href="/products"
            className="text-sm font-semibold px-5 py-2.5 rounded-xl text-white transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg,#3b82f6,#2563eb)", boxShadow: "0 4px 20px rgba(59,130,246,0.3)" }}>
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-all"
          aria-label="Toggle menu" onClick={() => setMobileOpen(!mobileOpen)}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-6 pb-5 pt-2 flex flex-col gap-1"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-slate-400 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition-all">
              {link.label}
            </Link>
          ))}
          <Link href="/cart" onClick={() => setMobileOpen(false)}
            className="text-sm font-medium text-slate-400 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition-all flex items-center gap-2">
            Cart {totalItems > 0 && (
              <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">{totalItems}</span>
            )}
          </Link>
          <Link href="/products" onClick={() => setMobileOpen(false)}
            className="mt-2 text-sm font-semibold px-5 py-3 rounded-xl text-white text-center transition-all"
            style={{ background: "linear-gradient(135deg,#3b82f6,#2563eb)" }}>
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
