import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { ArrowUpRightIcon } from "./icons";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div className="footer-brand">
          <Link className="brand brand-inverse" href="/">
            <span className="brand-mark">
              <Image src="/media/logo-minh-duy.png" alt="" fill sizes="58px" className="object-contain" />
            </span>
            <span className="brand-copy">
              <strong>HTX Bồn Bồn Minh Duy</strong>
              <span>Gìn giữ vị quê nhà bằng sự chỉn chu và minh bạch.</span>
            </span>
          </Link>
        </div>

        <div className="footer-links">
          <p className="footer-label">Khám phá</p>
          <Link href="/gioi-thieu">Về Minh Duy</Link>
          <Link href="/san-pham">Sản phẩm</Link>
          <Link href="/goc-bon-bon">Góc Bồn Bồn</Link>
        </div>

        <address className="footer-contact">
          <p className="footer-label">Liên hệ trực tiếp</p>
          <a href={site.phoneHref}><Phone aria-hidden="true" />{site.phoneDisplay}</a>
          <a href={`mailto:${site.email}`}><Mail aria-hidden="true" />{site.email}</a>
          <a href={site.mapHref} target="_blank" rel="noreferrer"><MapPin aria-hidden="true" />{site.address}</a>
        </address>

        <a className="footer-zalo" href={site.zaloHref} target="_blank" rel="noreferrer">
          <span>Nhắn Zalo cho Minh Duy</span>
          <small>Tư vấn nhanh · sản phẩm đang có</small>
          <ArrowUpRightIcon />
        </a>
      </div>
      <div className="site-container footer-bottom">
        <p>© {new Date().getFullYear()} {site.name}.</p>
        <p>Sản phẩm bồn bồn từ Hưng Mỹ, Cà Mau</p>
      </div>
    </footer>
  );
}
