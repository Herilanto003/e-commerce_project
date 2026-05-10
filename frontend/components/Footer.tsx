import Link from "next/link";
import SectionContainer from "./SectionContainer";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="text-white bg-zinc-800 pt-10 text-center md:text-left">
      <SectionContainer>
        <div className="w-full grid gap-6">
          {/* description */}
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h1 className="font-bold text-xl md:text-2xl mb-2">
                Tsenan-tsika
              </h1>
              <p className="font-extralight">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                nihil perspiciatis qui dolores.
              </p>
            </div>

            <div>
              <h1 className="font-bold text-xl md:text-2xl mb-2">Services</h1>
              <div>
                <ul className="grid gap-2 font-light">
                  <li>Bonus program</li>
                  <li>Gift cards</li>
                  <li>Credit and Payment</li>
                  <li>Service contracts</li>
                  <li>Non-cash account</li>
                </ul>
              </div>
            </div>

            <div>
              <h1 className="font-bold text-xl md:text-2xl mb-2">Links</h1>
              <div className="grid gap-2">
                <Link href={"#"}>Our products</Link>
                <Link href={"#"}>Terms of delivery</Link>
                <Link href={"#"}>Contact</Link>
                <Link href={"#"}>Frequently asked questions</Link>
              </div>
            </div>
          </div>

          {/* social network */}
          <div className="flex justify-start gap-4 items-center mb-5 text-xl">
            <Link href={"#"}>
              <FaTwitter />
            </Link>
            <Link href={"#"}>
              <FaFacebook />
            </Link>
            <Link href={"#"}>
              <FaInstagram />
            </Link>
          </div>
        </div>
      </SectionContainer>
    </footer>
  );
}
