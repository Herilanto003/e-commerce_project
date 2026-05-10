import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { RiMenu3Fill } from "react-icons/ri";
import { LiaTimesSolid } from "react-icons/lia";
import Link from "next/link";
import { RippleButton } from "./ui/ripple-button";
import { TiShoppingCart } from "react-icons/ti";

export default function NavMenuMobile() {
  return (
    <Drawer direction="right">
      <DrawerTrigger>
        <RiMenu3Fill className="text-xl cursor-pointer" />
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            <DrawerClose>
              <LiaTimesSolid className="text-xl cursor-pointer text-red-400" />
            </DrawerClose>
          </DrawerTitle>
        </DrawerHeader>

        <div className="w-4/5 overflow-x-hidden mx-auto">
          <nav className="flex flex-col gap-2 items-start justify-center w-full mb-4">
            <Link href={"#"} className="w-full font-semibold">
              Home
            </Link>
            <Link href={"#"} className="w-full font-semibold">
              About
            </Link>
            <Link href={"#"} className="w-full font-semibold">
              Explore
            </Link>
            <Link href={"#"} className="w-full font-semibold">
              Contact
            </Link>
            <Link href={"#"} className="w-full font-semibold">
              Blog
            </Link>
          </nav>

          <div className="mb-4 relative w-10">
            <div className="text-xs font-bold text-white bg-sky-400 w-5 h-5 flex justify-center items-center absolute rounded-full -top-2 -right-1">
              12
            </div>
            <TiShoppingCart className="text-4xl" />
          </div>

          <div className="flex justify-between items-center gap-2">
            <RippleButton className="text-xs border-none bg-sky-400 text-white flex-1">
              Sign up
            </RippleButton>
            <RippleButton className="text-xs border-none bg-sky-400 text-white flex-1">
              Sign in
            </RippleButton>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
