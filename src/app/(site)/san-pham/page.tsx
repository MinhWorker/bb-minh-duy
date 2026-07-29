import type { Metadata } from "next";
import { ProductCard } from "@/components/site/cards";
import { PageHero } from "@/components/site/page-primitives";
import { listVisibleProducts } from "@/lib/cms/site-content";

export const metadata: Metadata = {
  title: "Sản phẩm",
  description: "Khám phá các dòng sản phẩm từ cây bồn bồn của HTX Bồn Bồn Minh Duy, Cà Mau.",
};

export default async function ProductsPage() {
  const products = await listVisibleProducts();
  return (
    <>
      <PageHero
        title="Sản phẩm từ cây bồn bồn"
        description="Mỗi sản phẩm mang một hương vị và cách thưởng thức riêng. Liên hệ Minh Duy để biết cách đóng gói, giá và sản phẩm đang có."
        image="/media/product-dua-truyen-thong.webp"
        imageAlt="Các hũ dưa bồn bồn"
      />
      <section className="section product-catalogue">
        <div className="site-container">
          <div className="catalogue-intro">
            <p className="section-index">Sản phẩm Minh Duy</p>
            <p>Chọn món bồn bồn phù hợp với bữa cơm và khẩu vị của gia đình bạn.</p>
          </div>
          {products.length ? (
            <div className="product-grid">
              {products.map((product) => <ProductCard key={product.slug} product={product} />)}
            </div>
          ) : <div className="empty-state"><p>Hiện chưa có sản phẩm để hiển thị. Vui lòng liên hệ Minh Duy để được tư vấn.</p></div>}
        </div>
      </section>
    </>
  );
}
