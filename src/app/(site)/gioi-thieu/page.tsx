import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/site/icons";
import { PageHero } from "@/components/site/page-primitives";

export const metadata: Metadata = {
  title: "Giới thiệu & Chất lượng",
  description: "Tìm hiểu HTX Bồn Bồn Minh Duy, vùng nguyên liệu và quy trình kiểm soát nội bộ từ tiếp nhận đến đóng gói.",
};

const process = [
  ["01", "Tiếp nhận nguyên liệu", "Kiểm tra, phân loại và ghi nhận nguyên liệu đầu vào theo từng đợt."],
  ["02", "Rửa & sơ chế", "Làm sạch, loại bỏ phần không phù hợp và chuẩn bị cho từng dòng chế biến."],
  ["03", "Chế biến", "Thực hiện công đoạn phù hợp với đặc tính của từng dòng sản phẩm."],
  ["04", "Đóng gói & ghi nhận", "Đóng gói, ghi nhãn, mã lô và thông tin nơi phân phối theo quy trình nội bộ."],
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
              Chúng tôi không dùng những con số chưa thống nhất để kể câu chuyện. Website ưu tiên thông tin có thể đối chiếu từ hồ sơ, hoạt động thực tế và xác nhận của HTX.
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
            <p>HTX đã xây dựng quy trình kiểm soát nội bộ nối tiếp qua các công đoạn chính.</p>
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
            <p className="section-index">Minh bạch nội dung</p>
            <h2>Chỉ công bố điều đã được kiểm tra</h2>
          </div>
          <div>
            <p>
              Thông tin về chứng nhận, pháp lý hoặc tiêu chuẩn chỉ được hiển thị khi hồ sơ gốc đã được kiểm tra. Những nội dung còn chờ xác minh không được dùng làm badge, thông điệp quảng bá hay dữ liệu có cấu trúc.
            </p>
            <Link className="button button-outline" href="/lien-he">Trao đổi với HTX <ArrowRightIcon className="button-icon" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
