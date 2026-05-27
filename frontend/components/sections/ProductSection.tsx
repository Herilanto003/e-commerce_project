import { ProductInterface } from "@/types/product.type";
import ProductCard from "../ProductCard";
import SectionContainer from "../SectionContainer";
import SectionTitle from "../SectionTitle";
import { apiUrl } from "@/lib/config";

export default function ProductSection({
  products,
}: {
  products: ProductInterface[];
}) {
  return (
    <div className="w-full pt-6 bg-zinc-50 pb-10">
      <SectionContainer>
        <SectionTitle title="Our Products" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products &&
            products.map((product) => (
              <ProductCard
                key={product.id}
                image={
                  product.image_link
                    ? `${apiUrl}/${product.image_link}`
                    : "/images/casque.png"
                }
                altImage={product.name}
                productName={product.name}
                productDescription={product.description}
                productPrice={`${product.unit_price} Ar`}
              />
            ))}
        </div>
      </SectionContainer>
    </div>
  );
}
