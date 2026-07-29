"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRightIcon, CloseIcon, MenuIcon } from "./icons";

const navigation = [
  { href: "/", label: "Trang chủ" },
  { href: "/gioi-thieu", label: "Giới thiệu & Chất lượng" },
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/goc-bon-bon", label: "Góc Bồn Bồn" },
  { href: "/lien-he", label: "Liên hệ" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === href;
  return pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Link className="brand" href="/">
          <span className="brand-mark">
            <Image src="/media/logo-minh-duy.png" alt="" fill sizes="52px" priority className="object-contain" />
          </span>
          <span className="brand-copy">
            <strong>HTX Bồn Bồn</strong>
            <span>Minh Duy · Cà Mau</span>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Điều hướng chính">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="button button-small header-cta" href="/san-pham">
          Gian hàng
          <ArrowUpRightIcon className="button-icon" />
        </Link>

        <button
          type="button"
          className="menu-button"
          aria-label={open ? "Đóng trình đơn" : "Mở trình đơn"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <div id="mobile-navigation" className={`mobile-panel${open ? " is-open" : ""}`} aria-hidden={!open}>
        <nav className="site-container mobile-nav" aria-label="Điều hướng trên thiết bị di động">
          {navigation.map((item, index) => (
            <Link key={item.href} href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined}>
              <span>0{index + 1}</span>
              {item.label}
            </Link>
          ))}
          <Link className="button" href="/san-pham">
            Gian hàng
            <ArrowUpRightIcon className="button-icon" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
