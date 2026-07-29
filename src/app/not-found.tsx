import Link from "next/link";
import { ArrowRightIcon } from "@/components/site/icons";

export default function NotFound() {
  return (
    <section className="not-found-page">
      <div className="site-container not-found-inner">
        <p className="not-found-code">404</p>
        <h1>Không tìm thấy trang</h1>
        <p>Đường dẫn này không tồn tại hoặc nội dung đã được chuyển sang vị trí khác.</p>
        <Link className="button" href="/">
          Về trang chủ <ArrowRightIcon className="button-icon" />
        </Link>
      </div>
    </section>
  );
}
