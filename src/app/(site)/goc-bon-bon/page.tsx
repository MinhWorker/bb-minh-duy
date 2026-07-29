import type { Metadata } from "next";
import { JournalCard } from "@/components/site/cards";
import { PageHero } from "@/components/site/page-primitives";
import { listVisibleJournalEntries } from "@/lib/cms/site-content";

export const metadata: Metadata = {
  title: "Góc Bồn Bồn",
  description: "Công thức, câu chuyện vùng đất và tin tức từ HTX Bồn Bồn Minh Duy.",
};

export default async function JournalPage() {
  const journalEntries = await listVisibleJournalEntries();
  const [featured, ...rest] = journalEntries;
  return (
    <>
      <PageHero
        title="Góc Bồn Bồn"
        description="Nơi chúng tôi kể chuyện vùng đất, chia sẻ gợi ý chế biến và cập nhật những hoạt động đã được kiểm tra thông tin."
      />
      <section className="section journal-catalogue">
        <div className="site-container">
          <nav className="journal-filters" aria-label="Nhóm nội dung">
            <a href="#tat-ca">Tất cả</a>
            <a href="#cong-thuc">Công thức</a>
            <a href="#cau-chuyen">Câu chuyện</a>
            <a href="#tin-tuc">Tin tức</a>
          </nav>
          {featured ? (
            <>
              <div id="tat-ca" className="journal-feature"><JournalCard entry={featured} featured /></div>
              <div className="journal-grid journal-grid-catalogue">
                {rest.map((entry) => (
                  <div key={`${entry.kind}-${entry.slug}`} id={entry.kind}><JournalCard entry={entry} /></div>
                ))}
              </div>
            </>
          ) : <div className="empty-state"><p>Chưa có nội dung đã duyệt để xuất bản.</p></div>}
        </div>
      </section>
    </>
  );
}
