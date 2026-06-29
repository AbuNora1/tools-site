import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { CATEGORIES, getCategory, getToolsByCategory } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) return { title: "التصنيف غير موجود" };
  return {
    title: c.name,
    description: `جميع أدوات وحاسبات ${c.name} في مكان واحد.`,
    alternates: { canonical: `${SITE_URL}/categories/${slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) notFound();
  const tools = getToolsByCategory(slug);

  return (
    <div className="wrap">
      <nav className="crumb">
        <Link href="/">الرئيسية</Link><span className="sep">›</span><span>{c.name}</span>
      </nav>
      <div className="toolhead">
        <div className="em">{c.icon}</div>
        <div><h1>{c.name}</h1><p>{tools.length} أداة</p></div>
      </div>
      <div className="grid" style={{ marginTop: 16 }}>
        {tools.map((t) => <ToolCard tool={t} key={t.slug} />)}
      </div>
    </div>
  );
}
