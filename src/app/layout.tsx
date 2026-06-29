import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Header from "@/components/Header";
import { SITE_URL } from "@/lib/site";
import { CATEGORIES, getPopularTools } from "@/lib/tools";
import Analytics from '@/components/Analytics';

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  display: "swap",
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "حاسب | منصة الأدوات والحاسبات الذكية",
    template: "%s | حاسب",
  },
  description:
    "منصة عربية تضم مئات الأدوات والحاسبات الذكية: حاسبة العمر، النسبة المئوية، الزكاة، BMI، العد التنازلي، والتحويلات — بواجهة سريعة وحديثة.",
  openGraph: { type: "website", locale: "ar_SA", siteName: "حاسب" },
  // أضفنا هذا السطر للتحقق من ملكية جوجل (استبدل كلمة الصق_الكود_هنا بالكود اللي نسخته)
  verification: {
    google: "k66m4_Ff8eP6Nva1",
  },
};
// سكربت لمنع وميض الوضع الليلي قبل التحميل
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const popular = getPopularTools(5);
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className={tajawal.variable}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Header />
        <main>{children}</main>
        <footer className="site-footer">
          <div className="wrap">
            <div className="fgrid">
              <div className="fcol">
                <Link href="/" className="brand" style={{ marginBottom: 12 }}>
                  <span className="logo">حـ</span><span>حاسب</span>
                </Link>
                <p>منصة عربية للأدوات والحاسبات الذكية — سريعة، دقيقة، ومجانية بالكامل.</p>
              </div>
              <div className="fcol">
                <h5>الأكثر استخداماً</h5>
                {popular.map((t) => (
                  <Link href={`/tools/${t.slug}`} key={t.slug}>{t.name}</Link>
                ))}
              </div>
              <div className="fcol">
                <h5>التصنيفات</h5>
                {CATEGORIES.map((c) => (
                  <Link href={`/categories/${c.slug}`} key={c.slug}>{c.name}</Link>
                ))}
              </div>
              <div className="fcol">
                <h5>روابط</h5>
                <Link href="/">عن المنصة</Link>
                <Link href="/">سياسة الخصوصية</Link>
                <Link href="/">تواصل معنا</Link>
              </div>
            </div>
            <div className="fbottom">© 2026 حاسب — Smart Tools Hub. جميع الحقوق محفوظة.</div>
          </div>
        </footer>
        {/* تم إضافة مكون التتبع هنا */}
        <Analytics />
      </body>
    </html>
  );
}