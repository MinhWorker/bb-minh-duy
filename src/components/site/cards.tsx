import Image from "next/image";
import Link from "next/link";
import type { JournalEntry, Product } from "@/content/site";
import { getJournalHref, journalLabels } from "@/content/site";
import { ArrowRightIcon } from "./icons";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <article className="product-card">
      <Link href={`/san-pham/${product.slug}`} className="product-card-media" aria-label={`Xem ${product.name}`}>
        <Image src={product.image} alt={product.imageAlt} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 800px" quality={95} priority={priority} />
      </Link>
      <div className="product-card-copy">
        <h3><Link href={`/san-pham/${product.slug}`}>{product.name}</Link></h3>
        <p>{product.summary}</p>
        <Link className="text-link" href={`/san-pham/${product.slug}`}>
          Xem sản phẩm <ArrowRightIcon />
        </Link>
      </div>
    </article>
  );
}

export function JournalCard({ entry, featured = false }: { entry: JournalEntry; featured?: boolean }) {
  return (
    <article className={`journal-card${featured ? " journal-card-featured" : ""}`}>
      <Link href={getJournalHref(entry)} className="journal-card-media" aria-label={`Đọc ${entry.title}`}>
        <Image src={entry.image} alt={entry.imageAlt} fill sizes={featured ? "(max-width: 900px) 100vw, 1000px" : "(max-width: 720px) 100vw, 800px"} quality={95} />
      </Link>
      <div className="journal-card-copy">
        <p className="content-meta">{journalLabels[entry.kind]} <span aria-hidden="true">·</span> {entry.readingTime}</p>
        <h3><Link href={getJournalHref(entry)}>{entry.title}</Link></h3>
        <p>{entry.excerpt}</p>
        <Link className="text-link" href={getJournalHref(entry)}>
          Đọc tiếp <ArrowRightIcon />
        </Link>
      </div>
    </article>
  );
}

