import Image from "next/image";
import FooterNavItem from "./FooterNavItem";
import { Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1a2e1a] text-white rounded-t-[60px] pt-24 pb-12 overflow-hidden relative" id="contact">
      {/* Decorative leaf/shape (conceptual) */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Logo & Brand Story */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 relative">
                <Image src="/images/logo.png" fill alt="BB Minh Duy logo" className="object-cover" sizes="48px" />
              </div>
              <span className="font-gwendolyn text-3xl font-bold">BB Minh Duy</span>
            </div>
            <p className="text-white/70 leading-relaxed mb-8">
              Gìn giữ hương vị truyền thống Cà Mau qua từng sản phẩm OCOP chất lượng cao. Chúng tôi tự hào đồng hành cùng người nông dân Tân Hưng Đông.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-8">Liên Kết Nhanh</h4>
            <nav>
              <ul className="space-y-4">
                <FooterNavItem name="Về chúng tôi" id="aboutus" />
                <FooterNavItem name="Sản phẩm" id="products" />
                <FooterNavItem name="Mục tiêu" id="goals" />
                <FooterNavItem name="Quy trình" id="procedures" />
              </ul>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h4 className="text-xl font-bold mb-8">Liên Hệ Trực Tiếp</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-xl"><Mail size={20} /></div>
                <div>
                  <p className="text-sm text-white/50 mb-1 uppercase tracking-wider">Email</p>
                  <p className="font-medium">htxbonbonminhduy@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  <Image src="/images/zalo-icon.svg" width={20} height={20} alt="zalo" />
                </div>
                <div>
                  <p className="text-sm text-white/50 mb-1 uppercase tracking-wider">Zalo / Điện thoại</p>
                  <p className="font-medium">(+84) 948 055 359</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-xl"><MapPin size={20} className="shrink-0" /></div>
                <div>
                  <p className="text-sm text-white/50 mb-1 uppercase tracking-wider">Địa chỉ</p>
                  <p className="font-medium leading-relaxed">Ấp Đông Hưng, Xã Hưng Mỹ, Huyện Cái Nước, Tỉnh Cà Mau</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
          <p>© 2025 Hợp Tác Xã Bồn Bồn Minh Duy. Tất cả quyền được bảo lưu.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-white transition-colors">Điều khoản dịch vụ</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
