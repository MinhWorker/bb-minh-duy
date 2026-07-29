import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/site/icons";
import { PageHero } from "@/components/site/page-primitives";

export const metadata: Metadata = {
  title: "Về Minh Duy",
  description: "Tìm hiểu HTX Bồn Bồn Minh Duy, vùng nguyên liệu và hành trình từ tiếp nhận đến đóng gói sản phẩm.",
};

const process = [
  ["01", "Tiếp nhận nguyên liệu", "Kiểm tra và chọn lọc bồn bồn trước khi sơ chế."],
  ["02", "Rửa & sơ chế", "Làm sạch, loại bỏ phần không phù hợp và chuẩn bị cho từng dòng chế biến."],
  ["03", "Chế biến", "Chế biến phù hợp để giữ hương vị riêng của từng sản phẩm."],
  ["04", "Đóng gói & hoàn thiện", "Đóng gói cẩn thận và hoàn thiện thông tin sản phẩm trước khi đưa đến khách hàng."],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Từ cây bồn bồn đến một hợp tác xã của vùng đất Cà Mau"
        description="Minh Duy bắt đầu từ sự gắn bó với cây bồn bồn bản địa và mong muốn tạo thêm đầu ra chỉn chu cho nông sản địa phương."
        image="/media/harvest-team.webp"
        imageAlt="Người dân di chuyển giữa vùng bồn bồn tại Cà Mau"
      />

      <section className="section about-story">
        <div className="site-container editorial-grid">
          <p className="section-index">Câu chuyện Minh Duy</p>
          <div className="editorial-lead">
            <h2>Đăng ký hoạt động từ năm 2022 tại Hưng Mỹ, Cà Mau</h2>
            <p>
              HTX hoạt động gắn với trồng, thu mua, sơ chế, chế biến và thương mại các sản phẩm từ cây bồn bồn. Vùng liên kết gồm Cái Nước, Trần Văn Thời và khu vực lân cận ở Cà Mau.
            </p>
            <p>
              Minh Duy chia sẻ câu chuyện bằng những hoạt động thực tế, từ vùng nguyên liệu đến quá trình làm ra sản phẩm.
            </p>
          </div>
        </div>
      </section>

      <section className="quality-section">
        <div className="site-container quality-grid">
          <div className="quality-image">
            <Image src="/media/process-preparation.webp" alt="Sơ chế bồn bồn sau khi thu hoạch" fill sizes="(max-width: 900px) 100vw, 44vw" />
          </div>
          <div className="quality-copy">
            <p className="section-index">Cách chúng tôi làm việc</p>
            <h2>Chất lượng bắt đầu từ từng lô nguyên liệu</h2>
            <p>Mỗi sản phẩm được chăm chút qua các công đoạn từ tiếp nhận nguyên liệu đến đóng gói.</p>
            <ol className="process-list">
              {process.map(([number, title, body]) => (
                <li key={number}>
                  <span>{number}</span>
                  <div><h3>{title}</h3><p>{body}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section evidence-note">
        <div className="site-container evidence-grid">
          <div>
            <p className="section-index">Thông tin rõ ràng</p>
            <h2>Rõ ràng trong từng thông tin</h2>
          </div>
          <div>
            <p>
              Minh Duy cam kết cung cấp thông tin rõ ràng, có căn cứ về sản phẩm, quy trình và các chứng nhận của HTX.
            </p>
            <Link className="button button-outline" href="/lien-he">Trao đổi với HTX <ArrowRightIcon className="button-icon" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
