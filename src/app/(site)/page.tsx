import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, ScanLine, Sprout } from "lucide-react";
import { JournalCard, ProductCard } from "@/components/site/cards";
import { ArrowRightIcon } from "@/components/site/icons";
import { listVisibleJournalEntries, listVisibleProducts } from "@/lib/cms/site-content";

export default async function HomePage() {
  const [products, journalEntries] = await Promise.all([listVisibleProducts(), listVisibleJournalEntries()]);
  return (
    <>
      <section className="home-hero">
        <div className="home-hero-media">
          <Image
            src="/media/hero-bon-bon.webp"
            alt="Bồn bồn tươi trong rổ tre"
            fill
            sizes="100vw"
            quality={95}
            priority
          />
        </div>
        <div className="home-hero-shade" aria-hidden="true" />
        <div className="site-container home-hero-inner">
          <div className="home-hero-copy">
            <h1>Bồn bồn Cà Mau,<br />trọn vị quê nhà</h1>
            <p>
              Từ vùng nguyên liệu đến từng sản phẩm, Minh Duy gìn giữ hương vị địa phương bằng sự chỉn chu và minh bạch.
            </p>
            <div className="button-row">
              <Link className="button" href="/san-pham">
                Khám phá sản phẩm <ArrowRightIcon className="button-icon" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-products">
        <div className="site-container">
          <div className="section-heading heading-split">
            <div>
              <p className="section-index">01 — Sản phẩm</p>
              <h2>Những hương vị từ cây bồn bồn</h2>
            </div>
            <div>
              <p>Khám phá các sản phẩm từ bồn bồn Cà Mau và liên hệ Minh Duy để biết sản phẩm đang có.</p>
              <Link className="text-link" href="/san-pham">Xem tất cả sản phẩm <ArrowRightIcon /></Link>
            </div>
          </div>
          {products.length ? (
            <div className="product-grid product-grid-featured">
              {products.slice(0, 3).map((product, index) => (
                <ProductCard key={product.slug} product={product} priority={index === 0} />
              ))}
            </div>
          ) : <div className="empty-state"><p>Hiện chưa có sản phẩm để hiển thị. Vui lòng liên hệ Minh Duy để được tư vấn.</p></div>}
        </div>
      </section>

      <section className="origin-band">
        <div className="site-container origin-grid">
          <div className="origin-copy">
            <p className="section-index">02 — Từ vùng nguyên liệu</p>
            <h2>Một hành trình được gìn giữ qua từng công đoạn</h2>
            <p>
              HTX gắn với vùng nguyên liệu tại Cái Nước, Trần Văn Thời và khu vực lân cận ở Cà Mau. Bồn bồn được chọn lựa, làm sạch và chế biến phù hợp với từng sản phẩm.
            </p>
            <Link className="text-link" href="/gioi-thieu">Xem cách HTX làm việc <ArrowRightIcon /></Link>
          </div>
          <div className="origin-gallery">
            <div className="origin-image origin-image-tall">
              <Image src="/media/harvest-worker.webp" alt="Sơ chế bồn bồn sau thu hoạch" fill sizes="(max-width: 780px) 100vw, 600px" quality={95} />
            </div>
            <div className="origin-image">
              <Image src="/media/harvest-team.webp" alt="Thu hoạch bồn bồn trên vùng nguyên liệu" fill sizes="(max-width: 780px) 100vw, 600px" quality={95} />
            </div>
          </div>
        </div>
        <div className="site-container process-rail" aria-label="Hành trình làm nên sản phẩm">
          <div><Sprout aria-hidden="true" /><strong>Vùng nguyên liệu</strong><span>Gắn với điều kiện tự nhiên Cà Mau</span></div>
          <ArrowRight aria-hidden="true" className="process-arrow" />
          <div><ScanLine aria-hidden="true" /><strong>Kiểm tra & sơ chế</strong><span>Chọn lọc và sơ chế cẩn thận</span></div>
          <ArrowRight aria-hidden="true" className="process-arrow" />
          <div><Leaf aria-hidden="true" /><strong>Chế biến & đóng gói</strong><span>Phù hợp với từng sản phẩm</span></div>
        </div>
      </section>

      <section className="section journal-preview">
        <div className="site-container">
          <div className="section-heading heading-inline">
            <div>
              <p className="section-index">03 — Góc Bồn Bồn</p>
              <h2>Chuyện vùng đất, món ăn và hoạt động HTX</h2>
            </div>
            <Link className="text-link" href="/goc-bon-bon">Xem tất cả bài viết <ArrowRightIcon /></Link>
          </div>
          {journalEntries.length ? (
            <div className="journal-grid">
              {journalEntries.slice(0, 3).map((entry) => <JournalCard key={`${entry.kind}-${entry.slug}`} entry={entry} />)}
            </div>
          ) : <div className="empty-state"><p>Chưa có bài viết mới. Mời bạn quay lại sau.</p></div>}
        </div>
      </section>

      <section className="contact-cta">
        <div className="site-container contact-cta-inner">
          <p>Bạn muốn biết sản phẩm nào đang có?</p>
          <h2>Liên hệ Minh Duy để được tư vấn.</h2>
          <Link className="button button-light" href="/lien-he">Xem thông tin liên hệ <ArrowRightIcon className="button-icon" /></Link>
        </div>
      </section>
    </>
  );
}
