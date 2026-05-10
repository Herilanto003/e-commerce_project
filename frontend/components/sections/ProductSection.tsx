import ProductCard from "../ProductCard";
import SectionContainer from "../SectionContainer";
import SectionTitle from "../SectionTitle";

export default function ProductSection() {
  return (
    <div className="w-full pt-6 bg-zinc-50 pb-10">
      <SectionContainer>
        <SectionTitle title="Our Products" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ProductCard
            image="/images/iphone_image2.png"
            altImage="Iphone"
            productName="Apple iPhone 14"
            productDescription="Pro Max 128GB, Ram 12GB"
            productPrice="$900"
          />

          <ProductCard
            image="/images/casque.png"
            altImage="Iphone"
            productName="Apple iPhone 14"
            productDescription="Pro Max 128GB, Ram 12GB"
            productPrice="$900"
          />

          <ProductCard
            image="/images/photo.png"
            altImage="Iphone"
            productName="Apple iPhone 14"
            productDescription="Pro Max 128GB, Ram 12GB"
            productPrice="$900"
          />

          <ProductCard
            image="/images/watch.png"
            altImage="Iphone"
            productName="Apple iPhone 14"
            productDescription="Pro Max 128GB, Ram 12GB"
            productPrice="$900"
          />
        </div>
      </SectionContainer>
    </div>
  );
}
