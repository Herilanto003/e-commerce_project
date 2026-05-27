import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SectionContainer from "@/components/SectionContainer";
import { createFileRoute } from "@tanstack/react-router";
import { useGetOneProduct } from "@/features/product_manegement/hooks/useGetProduct";
import { API_URL } from "@/lib/config";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/features/cart_management/store/cart-store";

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
  const { items, addItem, removeItem } = useCartStore();
  const cartItem = items.find((item) => item.id === productId);
  const quantity = cartItem ? cartItem.quantity : 0;
  const handleAddItem = () => {
    addItem({
      id: productId,
      name: product?.name,
      price: product?.unit_price,
      imageUrl: product?.image_link,
      quantity: 1,
    });
  };
  const handleRemoveItem = () => {
    removeItem(productId);
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

              <div className="flex justify-center items-center md:justify-start">
                <ButtonGroup>
                  <Button onClick={handleRemoveItem}>-</Button>
                  <Input readOnly className="w-10" value={quantity} />
                  <Button onClick={handleAddItem}>+</Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        </SectionContainer>
      </main>

      <Footer />
    </div>
  );
}
