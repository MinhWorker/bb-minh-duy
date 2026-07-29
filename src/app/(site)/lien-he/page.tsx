import type { Metadata } from "next";
import Link from "next/link";
import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ArrowUpRightIcon } from "@/components/site/icons";
import { PageHero } from "@/components/site/page-primitives";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Thông tin điện thoại, Zalo, email và địa chỉ của HTX Bồn Bồn Minh Duy tại Cà Mau.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Liên hệ HTX Minh Duy"
        description="Gọi điện hoặc nhắn Zalo để hỏi về sản phẩm đang có, cách đóng gói và cơ hội hợp tác cùng Minh Duy."
      />
      <section className="section contact-page">
        <div className="site-container contact-page-grid">
          <div className="contact-list">
            <a href={site.phoneHref}>
              <span className="contact-icon"><Phone aria-hidden="true" /></span>
              <span><small>Điện thoại</small><strong>{site.phoneDisplay}</strong></span>
              <ArrowUpRightIcon />
            </a>
            <a href={site.zaloHref} target="_blank" rel="noreferrer">
              <span className="contact-icon"><MessageCircle aria-hidden="true" /></span>
              <span><small>Zalo</small><strong>Nhắn cho Minh Duy</strong></span>
              <ArrowUpRightIcon />
            </a>
            <a href={`mailto:${site.email}`}>
              <span className="contact-icon"><Mail aria-hidden="true" /></span>
              <span><small>Email</small><strong>{site.email}</strong></span>
              <ArrowUpRightIcon />
            </a>
          </div>
          <div className="contact-address">
            <p className="section-index">Ghé thăm Minh Duy</p>
            <h2>Hưng Mỹ, Cái Nước, Cà Mau</h2>
            <div className="address-row"><MapPin aria-hidden="true" /><p>{site.address}</p></div>
            <div className="address-row"><Clock3 aria-hidden="true" /><p>Vui lòng gọi trước để Minh Duy sắp xếp đón tiếp bạn chu đáo.</p></div>
            <a className="button button-outline" href={site.mapHref} target="_blank" rel="noreferrer">
              Mở Google Maps <ArrowUpRightIcon className="button-icon" />
            </a>
          </div>
        </div>
      </section>
      <section className="contact-help">
        <div className="site-container contact-help-inner">
          <p>Bạn có thể xem danh mục sản phẩm trước, sau đó gọi hoặc nhắn Zalo để được tư vấn nhanh hơn.</p>
          <Link className="text-link" href="/san-pham">Xem sản phẩm <ArrowUpRightIcon /></Link>
        </div>
      </section>
    </>
  );
}
