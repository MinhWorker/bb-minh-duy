import Image from "next/image";
import HeaderNavItem from "./HeaderNavItem";
import MobileSidebarToggle from "./MobileSideBarToggle";
import { Store } from "lucide-react";

const Header = () => {
  return (
    <header className="px-12 xl:px-[100px] py-5 sm:py-2 flex items-center justify-between sm:block lg:flex lg:items-center lg:justify-between bg-white fixed top-0 w-full shadow-lg z-50">
      <MobileSidebarToggle />

      <div className="items-center sm:gap-3 justify-center mb-4 lg:mb-0 lg:justify-between hidden sm:flex">
        <div className="min-w-[50px] w-[3vw] aspect-square relative">
          <Image src="/images/logo.png" fill className="object-cover" alt="BB Minh Duy logo" sizes="(max-width: 1920px) 3vw" />
        </div>
        <p className="font-gwendolyn text-primary-foreground text-2xl xl:text-[30px] font-semibold">BB Minh Duy</p>
      </div>

      <div className="w-[80px] aspect-square sm:hidden absolute left-1/2 transform -translate-x-1/2 top-4 border-2 border-white rounded-full shadow-md">
        <Image src="/images/logo.png" fill className="object-cover" alt="BB Minh Duy logo" sizes="(max-width: 1920px) 80px" />
      </div>

      <div className="block sm:hidden transition-colors text-white hover:text-white shadow-sm bg-primary hover:bg-primary-foreground rounded-sm px-4 py-2 shadow-black/50">
        <a href="#products" aria-label={`Go to product section`} className="flex items-center gap-2">
          {/* Sản phẩm */}
          <Store />
        </a>
      </div>

      <nav className="hidden sm:block">
        <ul className="flex items-center justify-between gap-7 lg:gap-12">
          <HeaderNavItem name="Về chúng tôi" id="aboutus" />
          <HeaderNavItem name="Sản phẩm" id="products" />
          <HeaderNavItem name="Mục tiêu" id="goals" />
          <HeaderNavItem name="Quy trình" id="procedures" />
          <HeaderNavItem name="Liên hệ" id="contact" />
        </ul>
      </nav>
    </header>
  )
}

export default Header;
