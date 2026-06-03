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
import { Link } from "@tanstack/react-router";
import { RippleButton } from "./ui/ripple-button";
import { useAuth } from "@/features/auth/context/AuthContext";
import CartLink from "@/features/cart_management/components/cart-link";
import { useState } from "react";
import LogoutDialog from "@/features/auth/components/logout-dialog";

export default function NavMenuMobile() {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  return (
    <>
      <LogoutDialog open={open} setOpen={setOpen} />
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
              <Link to={"/"} className="w-full font-semibold">
                Home
              </Link>
              <Link to={"/"} className="w-full font-semibold">
                About
              </Link>
              <Link to={"/"} className="w-full font-semibold">
                Explore
              </Link>
              <Link to={"/"} className="w-full font-semibold">
                Contact
              </Link>
              <Link to={"/"} className="w-full font-semibold">
                Blog
              </Link>
            </nav>

            {isAuthenticated && <CartLink />}

            <div className="flex justify-between items-center gap-2 mt-4">
              {isAuthenticated ? (
                <RippleButton
                  onClick={() => setOpen(true)}
                  className="bg-red-500 text-white border-none"
                >
                  Deconnexion
                </RippleButton>
              ) : (
                <>
                  <Link to="/register">S'inscrire</Link>
                  <Link to="/login">Se connecter</Link>
                </>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
