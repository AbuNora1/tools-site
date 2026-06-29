import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import {
  getToolBySlug, getCategory, getToolsByCategory, TOOLS,
} from "@/lib/tools";
import { CONTENT } from "@/lib/content";
import { CALCULATORS } from "@/components/calculators";

type Props = { params: Promise<{ slug: string }> };

// توليد كل صفحات الأدوات مسبقاً وقت البناء (SSG) — أسرع وأفضل للأرشفة
export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

// توليد عنوان/وصف/Canonical/OpenGraph/Twitter لكل أداة تلقائياً
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "الأداة غير موجودة" };

  const url = `${SITE_URL}/tools/${tool.slug}`;
  return {
    title: tool.name,
    description: tool.description,
    keywords: tool.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${tool.name} | حاسب`,
      description: tool.description,
      url,
      type: "website",
      locale: "ar_SA",
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} | حاسب`,
      description: tool.description,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const category = getCategory(tool.category)!;
  const content = CONTENT[tool.slug];
  const Calc = tool.live ? CALCULATORS[tool.slug] : null;
  const related = getToolsByCategory(tool.category).filter((t) => t.slug !== tool.slug).slice(0, 5);

  // JSON-LD: SoftwareApplication + Breadcrumb + FAQ
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: tool.name,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Web",
        description: tool.description,
        offers: { "@type": "Offer", price: "0", priceCurrency: "SAR" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "الرئيسية", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: category.name, item: `${SITE_URL}/categories/${category.slug}` },
          { "@type": "ListItem", position: 3, name: tool.name, item: `${SITE_URL}/tools/${tool.slug}` },
        ],
      },
      ...(content
        ? [{
            "@type": "FAQPage",
            mainEntity: content.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }]
        : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="wrap">
        <nav className="crumb">
          <Link href="/">الرئيسية</Link><span className="sep">›</span>
          <Link href={`/categories/${category.slug}`}>{category.name}</Link><span className="sep">›</span>
          <span>{tool.name}</span>
        </nav>

        <div className="toolhead">
          <div className="em">{tool.emoji}</div>
          <div><h1>{tool.name}</h1><p>{tool.description}</p></div>
        </div>

        <div className="toollayout">
          <div>
            {Calc ? <Calc /> : <div className="soon-banner">هذه الأداة قيد التطوير وستتوفر قريباً ✨</div>}

            {content && (
              <div className="content">
                <section className="cblock">
                  <h2><span className="d" />نبذة عن الأداة</h2>
                  <p>{content.intro}</p>
                </section>
                <section className="cblock">
                  <h2><span className="d" />طريقة الاستخدام</h2>
                  <ol>{content.howTo.map((s, i) => <li key={i}>{s}</li>)}</ol>
                </section>
                <section className="cblock">
                  <h2><span className="d" />أمثلة عملية</h2>
                  {content.examples.map(([q, a], i) => (
                    <div className="exrow" key={i}>
                      <span className="q">{q}</span>
                      <span style={{ marginInline: "auto" }} />
                      <span className="ar">{a}</span>
                    </div>
                  ))}
                </section>
                <section className="cblock">
                  <h2><span className="d" />أسئلة شائعة</h2>
                  {content.faq.map((f, i) => (
                    <details className="faqdetails" key={i}>
                      <summary>{f.q}</summary>
                      <div>{f.a}</div>
                    </details>
                  ))}
                </section>
              </div>
            )}
          </div>

          <aside className="side">
            <div className="adslot adslot-tall">
              <div>مساحة إعلانية<small>Google AdSense — أبعاد محجوزة (CLS)</small></div>
            </div>
            <div className="relbox">
              <h3>أدوات ذات صلة</h3>
              {related.length ? (
                related.map((t) => (
                  <Link className="rellink" href={`/tools/${t.slug}`} key={t.slug}>
                    <span className="e">{t.emoji}</span>
                    <span className="t">{t.name}</span>
                  </Link>
                ))
              ) : (
                <div style={{ color: "var(--muted)", fontSize: 14 }}>لا توجد أدوات ذات صلة بعد.</div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
