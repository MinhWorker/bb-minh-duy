import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/site/icons";
import { Breadcrumbs } from "@/components/site/page-primitives";
import { getVisibleProduct, listVisibleProducts } from "@/lib/cms/site-content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await listVisibleProducts()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getVisibleProduct((await params).slug);
  if (!product) return {};
  return { title: product.name, description: product.summary };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getVisibleProduct((await params).slug);
  if (!product) notFound();

  return (
    <>
      <section className="product-detail">
        <div className="site-container">
          <Breadcrumbs items={[{ label: "Sản phẩm", href: "/san-pham" }, { label: product.name }]} />
          <div className="product-detail-grid">
            <div className="product-detail-media">
              <Image src={product.image} alt={product.imageAlt} fill sizes="(max-width: 900px) 100vw, 52vw" priority />
            </div>
            <div className="product-detail-copy">
              <p className="section-index">Sản phẩm Minh Duy</p>
              <h1>{product.name}</h1>
              <p className="product-summary">{product.summary}</p>
              <p>{product.description}</p>
              <dl className="product-facts">
                <div><dt>Cách đóng gói</dt><dd>{product.formats.join(" · ")}</dd></div>
                <div><dt>Bảo quản</dt><dd>{product.storage}</dd></div>
                <div><dt>Gợi ý sử dụng</dt><dd>{product.usage}</dd></div>
              </dl>
              {product.marketplaceUrl ? (
                <a className="button" href={product.marketplaceUrl} target="_blank" rel="noreferrer">
                  Xem tại gian hàng <ArrowUpRightIcon className="button-icon" />
                </a>
              ) : (
                <Link className="button" href="/lien-he">Hỏi sản phẩm đang có <ArrowRightIcon className="button-icon" /></Link>
              )}
              <p className="product-note">Vui lòng xem hướng dẫn bảo quản và sử dụng trên bao bì sản phẩm.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
