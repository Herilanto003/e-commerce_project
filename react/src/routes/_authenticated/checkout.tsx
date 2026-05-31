import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SectionContainer from "@/components/SectionContainer";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/features/cart_management/store/cart-store";
import { API_URL } from "@/lib/config";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/checkout")({
  component: RouteComponent,
});

function RouteComponent() {
  const { items, addItem, removeItem, clearItem } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + (item.price === undefined ? 0 : item.price),
    0,
  );

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
          body: JSON.stringify({ items }),
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
          {total === 0 || items.length === 0 ? (
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
                    {items.map((item, key) => (
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
                            <Button onClick={() => removeItem(item.id)}>
                              -
                            </Button>
                            <Input
                              readOnly
                              className="w-10"
                              value={item.quantity}
                            />
                            <Button
                              onClick={() => addItem({ ...item, quantity: 1 })}
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
                  {paymentPending ? "..." : "Proceed to payment"}
                </Button>
                <Button onClick={clearItem}>Clear cart</Button>
              </div>
            </div>
          )}
        </SectionContainer>
      </main>

      <Footer />
    </div>
  );
}
