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
        description="Nơi Minh Duy kể chuyện vùng đất, chia sẻ món ngon và những hoạt động của HTX."
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
          ) : <div className="empty-state"><p>Chưa có bài viết mới. Mời bạn quay lại sau.</p></div>}
        </div>
      </section>
    </>
  );
}
