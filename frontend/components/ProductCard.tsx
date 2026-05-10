import Image from "next/image";
import { RippleButton } from "./ui/ripple-button";

export default function ProductCard({
  image,
  altImage,
  productName,
  productDescription,
  productPrice,
}: {
  image: string;
  altImage: string;
  productName: string;
  productDescription: string;
  productPrice: string;
}) {
  return (
    <div className="w-full bg-white shadow-lg p-4 rounded-xl flex flex-col items-center gap-4">
      <div className="relative w-40 h-40">
        <Image src={image} alt={altImage} fill className="object-contain" />
      </div>

      <div className="flex flex-col items-center gap-2 text-zinc-800">
        <h2 className="font-bold text-sky-500">{productName}</h2>
        <p className="font-extralight">{productDescription}</p>

        <p className="font-bold text-4xl">{productPrice}</p>
      </div>

      <RippleButton className="px-10 bg-sky-500 text-white border-none">
        Add to Cart
      </RippleButton>
    </div>
  );
}
