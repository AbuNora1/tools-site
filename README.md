# حاسب | Smart Tools Hub

منصة عربية للأدوات والحاسبات الذكية، مبنية بـ **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**،
ومصمّمة من البداية لتكون قابلة للتوسّع إلى آلاف الأدوات مع نظام SEO قوي لكل أداة.

---

## 🚀 التشغيل (3 خطوات)

> يتطلّب **Node.js 20 أو أحدث** (يُفضّل 22 LTS).

```bash
npm install      # تنزيل الحزم (مرة واحدة)
npm run dev      # تشغيل خادم التطوير
```

ثم افتح: **http://localhost:3000**

للبناء للإنتاج:
```bash
npm run build
npm start
```

---

## ⚠️ قبل النشر

افتح `src/lib/site.ts` وغيّر `SITE_URL` إلى نطاقك الحقيقي.
هذا العنوان يُستخدم في: روابط canonical، خريطة الموقع sitemap، ملف robots، وبطاقات Open Graph.

---

## 🧠 الفكرة المعمارية

**كل شيء يُقاد من سجل واحد:** `src/lib/tools.ts`.
الصفحة الرئيسية، البحث، التصنيفات، صفحات الأدوات، الخريطة، والـ SEO — كلها تُولَّد من مصفوفتَي
`CATEGORIES` و `TOOLS`. **إضافة أداة جديدة = إضافة كائن واحد.**

### إضافة أداة جديدة (مثال)
1. أضف كائن الأداة في `src/lib/tools.ts` (إن لم تكن لها حاسبة بعد، اجعل `live: false`).
2. (اختياري) أضف محتوى SEO لها في `src/lib/content.ts`.
3. أنشئ مكوّن الحاسبة في `src/components/calculators/` وسجّله في `index.tsx`، ثم اجعل `live: true`.

لن تحتاج لتعديل أي صفحة — المسار الديناميكي يتكفّل بالباقي تلقائياً.

---

## 📁 البنية

```
src/
├── app/
│   ├── layout.tsx                 # القالب العام + الهيدر + الفوتر + الوضع الليلي
│   ├── page.tsx                   # الصفحة الرئيسية
│   ├── globals.css                # نظام التصميم (متغيّرات + مكوّنات)
│   ├── sitemap.ts                 # خريطة الموقع (تلقائية من السجل)
│   ├── robots.ts                  # robots.txt (تلقائي)
│   ├── tools/[slug]/page.tsx      # ⭐ محرّك الأدوات والـ SEO (metadata + JSON-LD)
│   └── categories/[slug]/page.tsx # صفحة التصنيف
├── lib/
│   ├── site.ts                    # إعدادات الموقع (غيّر النطاق هنا)
│   ├── tools.ts                   # 🎯 سجل الأدوات والتصنيفات (مصدر الحقيقة)
│   └── content.ts                 # محتوى SEO لكل أداة
└── components/
    ├── Header.tsx, ThemeToggle.tsx, ToolCard.tsx, SearchBox.tsx
    └── calculators/               # الحاسبات + خريطة slug→مكوّن
```

## ✅ ما هو جاهز
- ٦ حاسبات تعمل بالكامل (العمر بالهجري، النسبة، الزكاة، BMI، العد التنازلي الحيّ، الحرارة).
- نظام SEO كامل لكل أداة: عنوان و`description` وCanonical وOpen Graph وTwitter + JSON-LD
  (`SoftwareApplication` + `BreadcrumbList` + `FAQPage`).
- خريطة موقع وrobots تلقائية، بحث فوري، تصنيفات، وضع ليلي، RTL، وتصميم متجاوب.
- أماكن إعلانات AdSense بأبعاد محجوزة (لتفادي قفزات التخطيط CLS).

## 🔜 الخطوات التالية (موثّقة في خطة العمل)
- الإنجليزية: أضف `next-intl` ومقاطع لغة `/ar` و`/en`.
- لوحة التحكم: عمليات CRUD على جداول `tools`/`categories` في PostgreSQL/Supabase.
- ربط AdSense الفعلي، ونقل السجل إلى قاعدة البيانات، وإضافة بقية الحاسبات.

---
صُنع كنقطة انطلاق إنتاجية — وسّعه كما تشاء.
