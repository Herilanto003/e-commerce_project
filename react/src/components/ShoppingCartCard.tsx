import { FaTimes } from "react-icons/fa";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { Input } from "./ui/input";

export default function ShoppingCartCard({
  image,
  altImage,
  title,
  price,
}: {
  image: string;
  altImage: string;
  title: string;
  price: string;
}) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 text-xs">
        <div className="relative w-20 h-20">
          <img src={image} alt={altImage} className="object-contain" />
        </div>

        <div>
          <h4 className="text-zinc-800 font-bold">{title}</h4>

          <div className="flex items-center justify-between mt-3">
            {/* les boutons - et + pour les nombres de produits */}
            <div className="text-xs">
              <ButtonGroup className="h-7">
                <Button variant="outline" className="px-2 py-0 text-xs h-7">
                  -
                </Button>

                <Input
                  value={12}
                  className="w-10 h-7 text-center text-xs p-0"
                />

                <Button variant="outline" className="px-2 py-0 text-xs h-7">
                  +
                </Button>
              </ButtonGroup>

              {/* price */}
              <p className="mt-3 font-semibold text-zinc-700">{price}</p>
            </div>
          </div>
        </div>

        <div>
          <Button variant={"ghost"} className="cursor-pointer text-2xl">
            <FaTimes className="text-zinc-600" />
          </Button>
        </div>
      </div>
    </div>
  );
}
