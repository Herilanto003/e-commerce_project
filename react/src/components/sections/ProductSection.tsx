import ProductCard from "../ProductCard";
import SectionContainer from "../SectionContainer";
import SectionTitle from "../SectionTitle";
import { API_URL } from "@/lib/config";
import { useGetAllProduct } from "@/features/product_manegement/hooks/useGetProduct";

export default function ProductSection() {
  const { products, isPending } = useGetAllProduct();

  return (
    <div className="w-full pt-6 bg-zinc-50 pb-10">
      <SectionContainer>
        <SectionTitle title="Our Products" />

        {isPending ? (
          <p>Loading ...</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products &&
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  image={
                    product.image_link
                      ? `${API_URL}/${product.image_link}`
                      : "/images/casque.png"
                  }
                  altImage={product.name}
                  productName={product.name}
                  productDescription={product.description}
                  productPrice={`${product.unit_price} Ar`}
                  productId={product.id}
                />
              ))}
          </div>
        )}
      </SectionContainer>
    </div>
  );
}
