import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

export function PageHero({
  title,
  description,
  image,
  imageAlt,
  children,
}: {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className={`page-hero${image ? " page-hero-with-media" : ""}`}>
      <div className="site-container page-hero-inner">
        <div className="page-hero-copy">
          <h1>{title}</h1>
          <p>{description}</p>
          {children}
        </div>
        {image ? (
          <div className="page-hero-media">
            <Image src={image} alt={imageAlt ?? ""} fill sizes="(max-width: 900px) 100vw, 800px" quality={95} priority />
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav className="breadcrumbs" aria-label="Đường dẫn trang">
      <ol>
        <li><Link href="/">Trang chủ</Link></li>
        {items.map((item) => (
          <li key={item.label}>
            <ChevronRight aria-hidden="true" />
            {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="empty-state" role="status">
      <span className="empty-state-mark" aria-hidden="true">∿</span>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
}
