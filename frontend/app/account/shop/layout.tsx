import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
