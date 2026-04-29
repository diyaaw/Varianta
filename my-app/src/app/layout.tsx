import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Varianta — Design Your Product, Your Way",
  description:
    "The ultimate SaaS platform for real-time product customization. Elevate your brand experience with our enterprise-grade configuration engine.",
  keywords: ["product customization", "SaaS", "design tool", "brand configuration"],
  openGraph: {
    title: "Varianta — Design Your Product, Your Way",
    description: "The ultimate SaaS platform for real-time product customization.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} data-scroll-behavior="smooth">
      <body
        className="min-h-full flex flex-col bg-white text-gray-900"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
