import { Link } from "@tanstack/react-router";
import { RippleButton } from "./ui/ripple-button";

export default function ProductCard({
  image,
  altImage,
  productName,
  productDescription,
  productPrice,
  productId,
  stock,
}: {
  image: string;
  altImage: string;
  productName: string;
  productDescription: string;
  productPrice: string;
  productId: number;
  stock: number;
}) {
  return (
    <div className="w-full bg-white shadow-lg p-4 rounded-xl flex flex-col items-center gap-4">
      <div className="relative w-40 h-40">
        <img src={image} alt={altImage} className="object-contain" />
      </div>

      <div className="flex flex-col items-center gap-2 text-zinc-800">
        <h2 className="font-bold text-sky-500">{productName}</h2>
        <p className="font-extralight">{productDescription}</p>

        <p className={`${stock === 0 && "text-red-500"}`}>
          {stock} left in stock
        </p>

        <p className="font-bold text-4xl">{productPrice}</p>
      </div>

      <Link disabled={stock === 0} to={"/product/" + productId}>
        <RippleButton
          disabled={stock === 0}
          className="px-10 bg-sky-500 text-white border-none"
        >
          Add to cart
        </RippleButton>
      </Link>
    </div>
  );
}
