import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SectionContainer from "@/components/SectionContainer";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useActionCart } from "@/features/cart_management/hooks/useActionCart";
import { useGetAllCarts } from "@/features/cart_management/hooks/useGetAllCarts";
// import { useCartStore } from "@/features/cart_management/store/cart-store";
import { API_URL } from "@/lib/config";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { toast } from "sonner";
// import React from "react";
// import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/checkout")({
  component: RouteComponent,
});

function RouteComponent() {
  const { pending, carts, refetch, refreshing } = useGetAllCarts();
  const { increaseQuantity, decreaseQuantity, clearCart } = useActionCart();

  // Allez dans le payements
  const [paymentPending, setPaymentPending] = React.useState<boolean>(false);
  const handlePayment = async () => {
    setPaymentPending(true);
    try {
      const response = await fetch(
        API_URL + "/api/v1/payment/create-checkout-session",
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ items: carts }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        console.log(response);
      }

      const data = await response.json();

      console.log(data);
      if (!response.ok) {
        toast.error(data?.detail ?? "Erreur !");

        throw new Error("Error");
      }

      window.location.href = data.url;
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setPaymentPending(false);
    }
  };

  return (
    <div>
      <Header />

      <main className="min-h-screen flex justify-center items-center -mt-10 py-12">
        <SectionContainer>
          {pending ? (
            <div>Chargement...</div>
          ) : carts === null || carts.length === 0 ? (
            <div>
              <h1>Your cart is empty</h1>
            </div>
          ) : (
            <div>
              <h1>Checkout</h1>

              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>

                <CardContent>
                  <ul className="flex flex-col gap-4">
                    {carts.map((item, key) => (
                      <li
                        key={key}
                        className="flex flex-col md:flex-row md:items-center md:gap-10 gap-2"
                      >
                        <img
                          src={`${API_URL}/${item.imageUrl}`}
                          alt=""
                          className="w-10"
                        />
                        <div>
                          <span className="font-bold">{item.name}</span>
                          <span> - </span>
                          <span>
                            {(item.price === undefined ? 0 : item.price) *
                              item.quantity}{" "}
                            Ar
                          </span>
                        </div>
                        <div>
                          <ButtonGroup>
                            <Button
                              onClick={async () =>
                                await decreaseQuantity(item.product_id, refetch)
                              }
                            >
                              -
                            </Button>
                            <Input
                              readOnly
                              className="w-10"
                              value={item.quantity}
                            />
                            <Button
                              onClick={async () =>
                                await increaseQuantity(item.product_id, refetch)
                              }
                              disabled={refreshing}
                            >
                              +
                            </Button>
                          </ButtonGroup>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="mt-4">
                <Button disabled={paymentPending} onClick={handlePayment}>
                  Proceed to payment
                </Button>
                <Button
                  disabled={refreshing}
                  onClick={async () => await clearCart(refetch)}
                >
                  Clear cart
                </Button>
              </div>
            </div>
          )}
        </SectionContainer>
      </main>

      <Footer />
    </div>
  );
}
