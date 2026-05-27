import NavMenuMobile from "./NavMenuMobile";
import NavMenuDesktop from "./NavMenuDesktop";

export default function Header() {
  return (
    <header className="h-12 md:h-14 w-full sticky inset-0 bg-white z-50 border-b">
      <div className="w-3/4 m-auto max-w-7xl h-full flex justify-between items-center">
        <div>
          {/* <h1>Tsenan-tsika</h1> */}
          <div className="relative w-8 h-8">
            <img src={"/images/icon.png"} alt="Icon" />
          </div>
        </div>

        <div>
          {/* Navigation menu for mobile */}
          <div className="md:hidden">
            <NavMenuMobile />
          </div>

          {/* Navigation menu for desktop */}
          <NavMenuDesktop />
        </div>
      </div>
    </header>
  );
}
