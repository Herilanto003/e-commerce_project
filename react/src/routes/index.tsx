import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/sections/HeroSection";
import ProductSection from "@/components/sections/ProductSection";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Header />

      <main>
        <HeroSection />

        <ProductSection />
      </main>

      <Footer />
    </div>
  );
}
