import Image from "next/image";
import HeaderNavItem from "./HeaderNavItem";
import MobileSidebarToggle from "./MobileSideBarToggle";
import { Store } from "lucide-react";

const Header = () => {
  return (
    <header className="px-6 lg:px-16 py-4 flex items-center justify-between bg-background/80 backdrop-blur-md fixed top-0 w-full z-50 border-b border-border/40">
      <div className="flex items-center gap-3">
        <MobileSidebarToggle />
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 relative">
            <Image src="/images/logo.png" fill className="object-cover" alt="BB Minh Duy logo" sizes="40px" />
          </div>
          <p className="font-gwendolyn text-primary text-2xl font-bold hidden sm:block">BB Minh Duy</p>
        </div>
      </div>

      <nav className="hidden md:block">
        <ul className="flex items-center gap-8 lg:gap-12">
          <HeaderNavItem name="Về chúng tôi" id="aboutus" />
          <HeaderNavItem name="Sản phẩm" id="products" />
          <HeaderNavItem name="Mục tiêu" id="goals" />
          <HeaderNavItem name="Quy trình" id="procedures" />
          <HeaderNavItem name="Liên hệ" id="contact" />
        </ul>
      </nav>

      <div className="flex items-center gap-4">
        <a 
          href="#products" 
          className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Store size={18} />
          <span className="hidden sm:inline">Cửa hàng</span>
        </a>
      </div>
    </header>
  )
}

export default Header;
