import { Link } from "@tanstack/react-router";
import { TiShoppingCart } from "react-icons/ti";
import { RippleButton } from "./ui/ripple-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { IoCaretDownOutline } from "react-icons/io5";

export default function NavMenuDesktop() {
  return (
    <div className="hidden md:flex justify-between gap-3">
      <nav className="flex gap-4 items-center justify-start w-full text-sm">
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

      <div className="relative w-10 flex justify-center items-center">
        <div className="text-xs font-bold text-white bg-sky-400 w-5 h-5 flex justify-center items-center absolute rounded-full -top-0.5 -right-1">
          12
        </div>
        <TiShoppingCart className="text-3xl" />
      </div>

      {/* <div className="flex justify-between items-center gap-2">
        <RippleButton className="text-xs border-none bg-sky-400 text-white flex-1">
          Sign up
        </RippleButton>
        <RippleButton className="text-xs border-none bg-sky-400 text-white flex-1">
          Sign in
        </RippleButton>
      </div> */}

      <DropdownMenu>
        <DropdownMenuTrigger className="text-2xl text-gray-700 cursor-pointer">
          <IoCaretDownOutline />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-40" align="start">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link to={"/"}>Sign up</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={"/"}>Sign in</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
