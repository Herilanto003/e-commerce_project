import SectionContainer from "@/components/SectionContainer";
import ShoppingCartCard from "@/components/ShoppingCartCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Cart() {
  return (
    <div className="w-full">
      <SectionContainer>
        <h1 className="text-xl font-semibold text-zinc-700 py-10">
          Shopping Cart
        </h1>

        {/* listes des produits selectionnées par l'utilisateur */}
        <div className="w-full flex flex-col gap-6">
          <ShoppingCartCard
            image="/images/iphone_image2.png"
            altImage="iphone image"
            title="Iphone 14 Pro Max"
            price="$1399"
          />

          <Separator />

          <ShoppingCartCard
            image="/images/iphone_image2.png"
            altImage="iphone image"
            title="Iphone 14 Pro Max"
            price="$1399"
          />

          <Separator />

          <ShoppingCartCard
            image="/images/iphone_image2.png"
            altImage="iphone image"
            title="Iphone 14 Pro Max"
            price="$1399"
          />

          <Separator />
        </div>

        {/* Total des prix */}
        <div>
          les prix
          {/* button checkout */}
          <Link href={"#"}>
            <Button>Checkout</Button>
          </Link>
        </div>
      </SectionContainer>
    </div>
  );
}
