import Image from "next/image";
import Link from "next/link";
import type { JournalEntry } from "@/content/site";
import { journalLabels } from "@/content/site";
import { ArrowRightIcon } from "./icons";
import { Breadcrumbs } from "./page-primitives";

export function ArticleDetail({ entry }: { entry: JournalEntry }) {
  return (
    <article className="article-detail">
      <div className="site-container article-heading">
        <Breadcrumbs items={[{ label: "Góc Bồn Bồn", href: "/goc-bon-bon" }, { label: journalLabels[entry.kind] }, { label: entry.title }]} />
        <p className="content-meta">{journalLabels[entry.kind]} <span aria-hidden="true">·</span> {entry.readingTime}</p>
        <h1>{entry.title}</h1>
        <p className="article-deck">{entry.excerpt}</p>
      </div>
      <div className="site-container article-media">
        <Image src={entry.image} alt={entry.imageAlt} fill sizes="(max-width: 1200px) 100vw, 1120px" priority />
      </div>
      <div className="site-container article-body-grid">
        <aside>
          <p>{entry.publishedLabel}</p>
          <span>Nội dung giới thiệu</span>
        </aside>
        <div className="article-body">
          {entry.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <div className="article-endnote">
            <p>Muốn biết thêm về sản phẩm hoặc hoạt động của HTX?</p>
            <Link className="text-link" href="/lien-he">Liên hệ Minh Duy <ArrowRightIcon /></Link>
          </div>
        </div>
      </div>
    </article>
  );
}

