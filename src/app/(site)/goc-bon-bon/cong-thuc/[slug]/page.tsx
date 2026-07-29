import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleDetail } from "@/components/site/article-detail";
import { getVisibleJournalEntry, listVisibleJournalEntries } from "@/lib/cms/site-content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await listVisibleJournalEntries()).filter((entry) => entry.kind === "cong-thuc").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = await getVisibleJournalEntry("cong-thuc", (await params).slug);
  return entry ? { title: entry.title, description: entry.excerpt } : {};
}

export default async function RecipePage({ params }: Props) {
  const entry = await getVisibleJournalEntry("cong-thuc", (await params).slug);
  if (!entry) notFound();
  return <ArticleDetail entry={entry} />;
}
