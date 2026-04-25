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
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 sm:px-8 py-4">
        <Link href="/" className="font-extrabold text-xl text-gray-900 tracking-tight hover:opacity-80 transition-opacity">
          Varianta
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium pb-1 border-b-2 transition-colors ${
                  isActive ? "text-blue-600 border-blue-600" : "text-gray-500 border-transparent hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-5">
          <Link href="/cart" aria-label={`Cart (${totalItems} items)`} className="relative text-gray-500 hover:text-gray-900 transition-colors p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>
          <Link href="/products" className="bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-sm shadow-blue-200">
            Get Started
          </Link>
        </div>

        <button
          className="md:hidden text-gray-600 hover:text-gray-900 p-1 transition-colors"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 pb-5 pt-3 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 py-2 transition-colors">
              {link.label}
            </Link>
          ))}
          <Link href="/cart" onClick={() => setMobileOpen(false)}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 py-2 flex items-center gap-2 transition-colors">
            Cart {totalItems > 0 && <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">{totalItems}</span>}
          </Link>
          <Link href="/products" onClick={() => setMobileOpen(false)}
            className="mt-2 bg-blue-600 text-white text-sm font-semibold px-5 py-3 rounded-lg hover:bg-blue-700 transition text-center">
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
