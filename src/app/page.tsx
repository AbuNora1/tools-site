import Link from "next/link";
import { CATEGORIES, TOOLS, getPopularTools, getToolsByCategory } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";
import SearchBox from "@/components/SearchBox";

const QUICK: [string, string][] = [
  ["احسب عمري", "age"],
  ["كم باقي على الراتب", "countdown"],
  ["حساب الزكاة", "zakat"],
  ["احسب النسبة المئوية", "percentage"],
  ["حساب BMI", "bmi"],
  ["تحويل الحرارة", "temp"],
];

const FAQ: [string, string][] = [
  ["هل استخدام الأدوات مجاني؟", "نعم، جميع الأدوات مجانية بالكامل وبدون تسجيل."],
  ["هل تعمل على الجوال؟", "نعم، الواجهة متجاوبة بالكامل مع الجوال والتابلت والكمبيوتر."],
  ["هل بياناتي آمنة؟", "كل العمليات الحسابية تتم في متصفحك مباشرةً ولا تُرسل بياناتك لأي خادم."],
  ["كم عدد الأدوات؟", "نضيف أدوات جديدة باستمرار، وكل أداة لها صفحتها المستقلة المحسّنة للبحث."],
];

export default function Home() {
  const popular = getPopularTools(6);
  const recent = TOOLS.slice(-4);

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <span className="eyebrow">⚡ أكثر من 18 أداة وحاسبة ذكية</span>
          <h1>كل حاسبة تحتاجها في <span className="g">مكان واحد</span></h1>
          <p className="sub">احسب عمرك، نسبتك، زكاتك، والمزيد — أدوات سريعة ودقيقة بالعربية، بضغطة زر.</p>
          <SearchBox />
          <div className="quickchips">
            {QUICK.map(([label, slug]) => (
              <Link className="qchip" href={`/tools/${slug}`} key={slug}>{label}</Link>
            ))}
          </div>
        </div>
      </section>

      <div className="wrap">
        <section className="section">
          <div className="shead"><span className="ic">⭐</span><h2>الأكثر استخداماً</h2></div>
          <div className="grid">
            {popular.map((t) => <ToolCard tool={t} key={t.slug} />)}
          </div>
        </section>

        <div className="adslot">
          <div>مساحة إعلانية<small>Google AdSense — أبعاد محجوزة لمنع تغيّر التخطيط (CLS)</small></div>
        </div>

        <section className="section">
          <div className="shead"><span className="ic">🗂️</span><h2>تصفّح حسب التصنيف</h2></div>
          <div className="catgrid">
            {CATEGORIES.map((c) => (
              <Link className="catcard" href={`/categories/${c.slug}`} key={c.slug}>
                <div className="ce" style={{ background: c.bg, color: c.color }}>{c.icon}</div>
                <h4>{c.name}</h4>
                <span>{getToolsByCategory(c.slug).length} أداة</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="shead"><span className="ic">✨</span><h2>أُضيفت حديثاً</h2></div>
          <div className="grid">
            {recent.map((t) => <ToolCard tool={t} key={t.slug} />)}
          </div>
        </section>

        <section className="section">
          <div className="shead"><span className="ic">❓</span><h2>الأسئلة الشائعة</h2></div>
          {FAQ.map(([q, a], i) => (
            <details className="faqdetails" key={i}>
              <summary>{q}</summary>
              <div>{a}</div>
            </details>
          ))}
        </section>
      </div>
    </>
  );
}
