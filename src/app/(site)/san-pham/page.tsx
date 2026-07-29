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
        description="Mỗi dòng sản phẩm có cách dùng riêng. Website không hiển thị giá; vui lòng liên hệ HTX để xác nhận quy cách và đợt hàng hiện tại."
        image="/media/product-dua-truyen-thong.webp"
        imageAlt="Các hũ dưa bồn bồn"
      />
      <section className="section product-catalogue">
        <div className="site-container">
          <div className="catalogue-intro">
            <p className="section-index">Danh mục giới thiệu</p>
            <p>Thông tin thương mại được cập nhật thận trọng theo nhãn và tình trạng sản xuất thực tế.</p>
          </div>
          {products.length ? (
            <div className="product-grid">
              {products.map((product) => <ProductCard key={product.slug} product={product} />)}
            </div>
          ) : <div className="empty-state"><p>Chưa có sản phẩm đáp ứng đủ điều kiện xuất bản.</p></div>}
        </div>
      </section>
    </>
  );
}
