import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useCartStore } from "@/features/cart_management/store/cart-store";
import {
  createFileRoute,
  Link,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import React, { useEffect, useState } from "react";

export const Route = createFileRoute("/_authenticated/payment/success")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      session_id: search?.session_id ?? null,
    };
  },
});

function ConfettiPiece({ index }: { index: number }) {
  const colors = [
    "bg-sky-400",
    "bg-sky-300",
    "bg-sky-500",
    "bg-sky-200",
    "bg-white",
    "bg-cyan-400",
  ];
  const color = colors[index % colors.length];
  const left = `${(index * 7.3 + 5) % 100}%`;
  const delay = `${(index * 0.15) % 2}s`;
  const duration = `${2.5 + (index % 3) * 0.5}s`;
  const size =
    index % 3 === 0 ? "w-2 h-2" : index % 3 === 1 ? "w-1.5 h-3" : "w-1 h-1";

  return (
    <div
      className={`absolute top-0 ${color} ${size} rounded-sm opacity-0 animate-confetti`}
      style={{
        left,
        animationDelay: delay,
        animationDuration: duration,
      }}
    />
  );
}

function CheckmarkCircle({ visible }: { visible: boolean }) {
  return (
    <div
      className={`relative flex items-center justify-center w-28 h-28 rounded-full transition-all duration-700 ${
        visible ? "scale-100 opacity-100" : "scale-50 opacity-0"
      }`}
    >
      {/* Outer ring pulse */}
      <div className="absolute inset-0 rounded-full bg-sky-200 animate-ping opacity-30" />
      {/* Middle ring */}
      <div className="absolute inset-2 rounded-full bg-sky-100" />
      {/* Inner circle */}
      <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-sky-400 to-sky-600 shadow-lg shadow-sky-300">
        <svg
          className={`w-10 h-10 text-white transition-all duration-500 delay-300 ${
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
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </div>
  );
}

function RouteComponent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 100);
    const t2 = setTimeout(() => setShowDetails(true), 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const { session_id } = useSearch({ from: "/_authenticated/payment/success" });
  const navigate = useNavigate();

  if (session_id === null) {
    navigate({ to: "/" });
  }

  const { clearItem } = useCartStore();

  React.useEffect(() => {
    clearItem();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-sky-50">
      <Header />

      <main className="flex-1 flex justify-center items-center py-16 px-4 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-sky-200 opacity-40 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-cyan-200 opacity-40 blur-3xl" />
        </div>

        {/* Confetti */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 18 }).map((_, i) => (
            <ConfettiPiece key={i} index={i} />
          ))}
        </div>

        {/* Card */}
        <div
          className={`relative z-10 w-full max-w-md transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="bg-white rounded-3xl shadow-xl shadow-sky-100 border border-sky-100 overflow-hidden">
            {/* Top accent */}
            <div className="h-1.5 bg-linear-to-r from-sky-400 via-cyan-400 to-sky-500" />

            <div className="px-8 pt-10 pb-8 flex flex-col items-center text-center">
              {/* Checkmark */}
              <CheckmarkCircle visible={visible} />

              {/* Title */}
              <div
                className={`mt-6 transition-all duration-500 delay-200 ${
                  showDetails
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <h1 className="text-3xl font-bold text-sky-900 tracking-tight">
                  Paiement réussi !
                </h1>
                <p className="mt-2 text-sky-500 text-sm font-medium">
                  Merci pour votre confiance
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
                  to="/"
                  className="w-full py-3 rounded-xl border border-sky-200 text-sky-500 font-medium text-sm text-center hover:bg-sky-50 transition-colors duration-200"
                >
                  Retour à l'accueil
                </Link>
              </div>
            </div>
          </div>

          {/* Subtle label below */}
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

      {/* Tailwind animation for confetti */}
      <style>{`
        @keyframes confetti-fall {
          0%   { transform: translateY(-20px) rotate(0deg);   opacity: 1; }
          80%  { opacity: 0.8; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti-fall linear infinite;
        }
      `}</style>
    </div>
  );
}
