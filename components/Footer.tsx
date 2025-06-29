import Image from "next/image";
import FooterNavItem from "./FooterNavItem";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary-foreground rounded-t-[50px] pt-16 pb-6" id="contact">
      <div className="flex flex-wrap md:justify-center gap-10 lg:gap-20 px-10 lg:px-0">
        <div className="w-full lg:w-auto flex justify-center">
          <div className="flex flex-col items-center">
            <div className="w-[120px] relative aspect-square">
              <Image src="/images/logo.png" fill alt="BB Minh Duy logo" className="object-cover" sizes="(max-width: 1920px) 120px" />
            </div>
            <p className="font-gwendolyn font-semibold text-2xl text-white mt-3 tracking-widest">BB Minh Duy</p>
          </div>
        </div>

        <nav>
          <ul>
            <FooterNavItem name="Về chúng tôi" id="aboutus" />
            <FooterNavItem name="Sản phẩm" id="products" />
            <FooterNavItem name="Mục tiêu" id="goals" />
            <FooterNavItem name="Quy trình" id="procedures" />
            <FooterNavItem name="Liên hệ" id="contact" />
          </ul>
        </nav>

        <div className="text-white w-full md:w-auto">
          <h2 className="font-bold text-xl">Liên hệ</h2>
          <p className="flex items-center gap-5 mt-3">
            <Mail />
            <span>htxbonbonminhduy@gmail.com </span>
          </p>
          <p className="flex items-center gap-5 mt-3">
            <Phone />
            <span>(+84) 948 055 359</span>
          </p>
          <p className="flex items-center gap-5 mt-3">
            <MapPin className="shrink-0" />
            <span className="max-w-[300px]">Ấp Đông Hưng, Xã Tân Hưng Đông, Cái Nước, Cà Mau</span>
          </p>
        </div>
      </div>

      <p className="w-full text-center text-white font-normal text-xs mt-10">Copyright &#169; 2025 BB Minh Duy. All rights reserved.</p>
    </footer >
  )
}

export default Footer;
