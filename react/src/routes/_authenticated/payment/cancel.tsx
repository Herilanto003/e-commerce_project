import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { API_URL } from "@/lib/config";
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_authenticated/payment/cancel")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      order_id: search?.order_id ?? null,
    };
  },
});

function FloatingParticle({ index }: { index: number }) {
  const size = index % 3 === 0 ? "w-1.5 h-1.5" : "w-1 h-1";
  const left = `${(index * 11.3 + 8) % 100}%`;
  const top = `${(index * 17.7 + 5) % 100}%`;
  const delay = `${(index * 0.4) % 4}s`;

  return (
    <div
      className={`absolute ${size} rounded-full bg-sky-200 opacity-0 animate-float`}
      style={{ left, top, animationDelay: delay }}
    />
  );
}

function XCircle({ visible }: { visible: boolean }) {
  return (
    <div
      className={`relative flex items-center justify-center w-28 h-28 rounded-full transition-all duration-700 ${
        visible ? "scale-100 opacity-100" : "scale-50 opacity-0"
      }`}
    >
      <div className="absolute inset-2 rounded-full bg-red-50" />
      <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-red-200 to-red-300 shadow-md shadow-red-200 border-2 border-red-300">
        <svg
          className={`w-9 h-9 text-red-600 transition-all duration-500 delay-300 ${
            visible ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  );
}

function RouteComponent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const { order_id } = useSearch({ from: "/_authenticated/payment/cancel" });

  const cancelOrder = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/payment/cancel-order/${order_id}`,
        {
          credentials: "include",
          method: "POST",
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error("error");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cancelOrder();

    const t1 = setTimeout(() => setVisible(true), 100);
    const t2 = setTimeout(() => setShowDetails(true), 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-sky-50">
      <Header />

      <main className="flex-1 flex justify-center items-center py-16 px-4 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-sky-100 opacity-60 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-sky-200 opacity-40 blur-3xl" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <FloatingParticle key={i} index={i} />
          ))}
        </div>

        {/* Card */}
        <div
          className={`relative z-10 w-full max-w-md transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="bg-white rounded-3xl shadow-xl shadow-sky-100 border border-sky-100 overflow-hidden">
            {/* Top accent — muted sky */}
            <div className="h-1.5 bg-linear-to-r from-sky-200 via-sky-300 to-sky-200" />

            <div className="px-8 pt-10 pb-8 flex flex-col items-center text-center">
              {/* X icon */}
              <XCircle visible={visible} />

              {/* Title */}
              <div
                className={`mt-6 transition-all duration-500 delay-200 ${
                  showDetails
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <h1 className="text-3xl font-bold text-red-900 tracking-tight">
                  Paiement annulé
                </h1>
                <p className="mt-2 text-red-400 text-sm">
                  Aucun montant n'a été débité de votre compte
                </p>
              </div>

              {/* Divider */}
              <div
                className={`w-full my-6 border-t border-dashed border-sky-100 transition-all duration-500 delay-300 ${
                  showDetails ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* CTAs */}
              <div
                className={`mt-6 w-full flex flex-col gap-3 transition-all duration-500 delay-600 ${
                  showDetails
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <Link
                  to="/checkout"
                  className="w-full py-3 rounded-xl bg-linear-to-r from-sky-500 to-sky-600 text-white font-semibold text-sm text-center shadow-md shadow-sky-200 hover:shadow-sky-300 hover:from-sky-400 hover:to-sky-500 transition-all duration-200 active:scale-95"
                >
                  Revoir le panier
                </Link>
                <Link
                  to="/"
                  className="w-full py-3 rounded-xl border border-sky-200 text-sky-500 font-medium text-sm text-center hover:bg-sky-50 transition-colors duration-200"
                >
                  Retour à l'accueil
                </Link>
              </div>
            </div>
          </div>

          {/* Stripe badge */}
          <p
            className={`mt-4 text-center text-xs text-sky-400 transition-all duration-500 delay-700 ${
              showDetails ? "opacity-100" : "opacity-0"
            }`}
          >
            Paiement sécurisé par{" "}
            <span className="font-semibold text-sky-500">Stripe</span>
          </p>
        </div>
      </main>

      <Footer />

      <style>{`
        @keyframes float {
          0%   { transform: translateY(0px);   opacity: 0.4; }
          50%  { transform: translateY(-12px); opacity: 0.8; }
          100% { transform: translateY(0px);   opacity: 0.4; }
        }
        .animate-float {
          animation: float ease-in-out 4s infinite;
        }
      `}</style>
    </div>
  );
}
