import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SectionContainer from "@/components/SectionContainer";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useGetOneProduct } from "@/features/product_manegement/hooks/useGetProduct";
import { API_URL } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import React from "react";

export const Route = createFileRoute("/product/$productId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { productId } = Route.useParams();

  const { product, isPending } = useGetOneProduct(productId as string);

  isPending && <div>Loading...</div>;

  // *** -------------------------------------
  // *** Gestion de panier (cart)
  // *** -------------------------------------

  // Ajout dans le panier
  const navigate = useNavigate();
  const [pendingAddToCart, setPendingAddToCart] = React.useState(false);
  const handleAddToCart = async () => {
    setPendingAddToCart(true);
    try {
      const response = await fetch(
        `${API_URL}/api/v1/cart/items/new?product_id=${productId}`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          toast.error("Vous n'êtes pas connectés !");
          return;
        }
        console.log(errorData);
        throw new Error("Error");
      }

      navigate({ to: "/checkout" });
    } catch (error) {
      console.log(error);
      toast.error("Erreur technique en cours de réparation !");
    } finally {
      setPendingAddToCart(false);
    }
  };

  return (
    <div>
      <Header />

      <main className="min-h-screen flex justify-center items-center -mt-10 py-12">
        <SectionContainer>
          <div className="grid md:grid-cols-2 gap-4 items-center">
            <div>
              <img
                src={`${API_URL}/${product?.image_link}`}
                className="w-full max-w-100 object-contain"
              />
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-xl sm:text-3xl">{product?.name}</h1>

              <p className="font-light text-xl sm:text-3xl">
                {product?.unit_price} Ar
              </p>

              <p className="font-light text-gray-700">{product?.description}</p>

              {/* <div className="flex justify-center items-center md:justify-start">
                <ButtonGroup>
                  <Button onClick={handleRemoveItem}>-</Button>
                  <Input readOnly className="w-10" value={quantity} />
                  <Button onClick={handleAddItem}>+</Button>
                </ButtonGroup>
              </div> */}
              <Button onClick={handleAddToCart} disabled={pendingAddToCart}>
                {pendingAddToCart ? "..." : "Ajouter dans le panier"}
              </Button>
            </div>
          </div>
        </SectionContainer>
      </main>

      <Footer />
    </div>
  );
}
