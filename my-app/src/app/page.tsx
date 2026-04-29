import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

import BottomCTA from "@/components/BottomCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />

        <BottomCTA />
      </main>
      <Footer />
    </div>
  );
}
