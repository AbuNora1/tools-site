/**
 * سجل الأدوات — مصدر الحقيقة الوحيد للمنصة.
 * كل ما في الموقع (الرئيسية، البحث، التصنيفات، صفحات الأدوات، الخريطة، الـ SEO)
 * يُولَّد من هذين المصفوفتين. إضافة أداة جديدة = إضافة كائن واحد إلى TOOLS.
 *
 * لاحقاً: انقل هذه البيانات إلى جدول في PostgreSQL/Supabase لتُدار من لوحة التحكم
 * دون لمس الكود. شكل الكائن يبقى نفسه.
 */

export interface Category {
  slug: string;
  name: string;
  icon: string;
  color: string;
  bg: string;
}

export interface Tool {
  slug: string;        // المعرّف الفريد ومسار الـ URL: /tools/<slug>
  category: string;    // slug التصنيف
  emoji: string;
  name: string;
  description: string;
  keywords: string[];  // عنقود الكلمات المفتاحية (SEO) — داخل صفحة واحدة
  live: boolean;       // هل الحاسبة جاهزة أم "قريباً"؟
  popular?: number;    // ترتيب الشيوع (الأصغر أهم)
}

export const CATEGORIES: Category[] = [
  { slug: "personal",    name: "الحاسبات الشخصية", icon: "🧮", color: "#5145E5", bg: "#E9E7FB" },
  { slug: "education",   name: "التعليم",          icon: "🎓", color: "#0FB89B", bg: "#D4F5EE" },
  { slug: "money",       name: "المال",            icon: "💰", color: "#F59E0B", bg: "#FDF0D5" },
  { slug: "time",        name: "الوقت والتاريخ",   icon: "⏳", color: "#EC4899", bg: "#FCE7F1" },
  { slug: "conversions", name: "التحويلات",        icon: "🔄", color: "#3B82F6", bg: "#DBEAFE" },
  { slug: "health",      name: "الصحة",            icon: "❤️", color: "#EF4444", bg: "#FEE2E2" },
];

export const TOOLS: Tool[] = [
  { slug: "age", category: "personal", emoji: "🎂", live: true, popular: 1,
    name: "حاسبة العمر",
    description: "احسب عمرك بالسنوات والأشهر والأيام، بالميلادي والهجري.",
    keywords: ["احسب عمري", "كم عمري", "حساب العمر", "العمر بالهجري", "حساب تاريخ الميلاد"] },
  { slug: "percentage", category: "education", emoji: "📊", live: true, popular: 2,
    name: "حاسبة النسبة المئوية",
    description: "احسب النسبة المئوية ونسبة الزيادة أو النقص بسهولة.",
    keywords: ["احسب النسبة المئوية", "كم النسبة", "حساب النسبة", "نسبة الزيادة", "الفرق المئوي"] },
  { slug: "zakat", category: "money", emoji: "🕌", live: true, popular: 3,
    name: "حاسبة الزكاة",
    description: "احسب زكاة المال (2.5%) مع توضيح النصاب.",
    keywords: ["حساب الزكاة", "حاسبة الزكاة", "زكاة المال", "كم زكاة مالي", "نصاب الزكاة"] },
  { slug: "bmi", category: "health", emoji: "⚖️", live: true, popular: 4,
    name: "حاسبة كتلة الجسم BMI",
    description: "احسب مؤشر كتلة الجسم واعرف إن كان وزنك صحياً.",
    keywords: ["حساب bmi", "مؤشر كتلة الجسم", "حساب الوزن المثالي", "هل وزني طبيعي", "كتلة الجسم"] },
  { slug: "countdown", category: "time", emoji: "⏳", live: true, popular: 5,
    name: "العد التنازلي",
    description: "كم باقي على الراتب أو رمضان أو أي مناسبة؟ عدّاد حيّ.",
    keywords: ["كم باقي على الراتب", "كم باقي على رمضان", "العد التنازلي", "كم باقي على مناسبة", "عداد الأيام"] },
  { slug: "temp", category: "conversions", emoji: "🌡️", live: true, popular: 6,
    name: "تحويل درجات الحرارة",
    description: "حوّل بين المئوية والفهرنهايت والكلفن فوراً.",
    keywords: ["تحويل درجة الحرارة", "مئوية الى فهرنهايت", "تحويل فهرنهايت", "درجة الحرارة"] },

  // ===== قريباً — لإظهار اتساع المنصة (نفس النمط: غيّر live إلى true بعد إضافة الحاسبة) =====
  { slug: "gpa", category: "education", emoji: "🎯", live: false,
    name: "حاسبة المعدل التراكمي", description: "احسب معدلك الجامعي GPA.",
    keywords: ["كم معدلي", "حساب المعدل", "gpa", "المعدل التراكمي"] },
  { slug: "loan", category: "money", emoji: "🏦", live: false,
    name: "حاسبة القروض", description: "القسط الشهري وإجمالي الفوائد.",
    keywords: ["حساب القرض", "القسط الشهري", "حاسبة التمويل"] },
  { slug: "savings", category: "money", emoji: "🐷", live: false,
    name: "حاسبة الادخار", description: "خطّط لهدفك الادخاري.",
    keywords: ["حساب الادخار", "كم أوفر"] },
  { slug: "date-diff", category: "personal", emoji: "📅", live: false,
    name: "الأيام بين تاريخين", description: "عدد الأيام بين أي تاريخين.",
    keywords: ["الفرق بين تاريخين", "عدد الأيام بين تاريخين"] },
  { slug: "hijri-age", category: "personal", emoji: "🌙", live: false,
    name: "حاسبة العمر بالهجري", description: "عمرك بالتقويم الهجري.",
    keywords: ["العمر بالهجري", "كم عمري هجري"] },
  { slug: "calories", category: "health", emoji: "🔥", live: false,
    name: "حاسبة السعرات", description: "احتياجك اليومي من السعرات.",
    keywords: ["حساب السعرات", "السعرات اليومية"] },
  { slug: "water", category: "health", emoji: "💧", live: false,
    name: "احتياج الماء اليومي", description: "كم لتر ماء تحتاج يومياً.",
    keywords: ["كم ماء أشرب", "احتياج الماء اليومي"] },
  { slug: "currency", category: "conversions", emoji: "💱", live: false,
    name: "تحويل العملات", description: "حوّل بين العملات بأسعار حديثة.",
    keywords: ["تحويل العملات", "سعر الدولار"] },
  { slug: "length", category: "conversions", emoji: "📏", live: false,
    name: "تحويل الطول", description: "متر، قدم، إنش، ميل.",
    keywords: ["تحويل الطول", "متر الى قدم"] },
  { slug: "weight", category: "conversions", emoji: "🏋️", live: false,
    name: "تحويل الوزن", description: "كيلوجرام، رطل، أونصة.",
    keywords: ["تحويل الوزن", "كيلو الى رطل"] },
  { slug: "ramadan", category: "time", emoji: "🌙", live: false,
    name: "كم باقي على رمضان", description: "عدّاد تنازلي لشهر رمضان.",
    keywords: ["كم باقي على رمضان", "متى رمضان"] },
  { slug: "ideal-weight", category: "health", emoji: "🎯", live: false,
    name: "حاسبة الوزن المثالي", description: "وزنك المثالي حسب طولك.",
    keywords: ["الوزن المثالي", "كم وزني المثالي"] },
];

// ===== دوال مساعدة =====
export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
export function getToolsByCategory(slug: string): Tool[] {
  return TOOLS.filter((t) => t.category === slug);
}
export function getPopularTools(limit = 6): Tool[] {
  return [...TOOLS].sort((a, b) => (a.popular ?? 99) - (b.popular ?? 99)).slice(0, limit);
}
export function searchTools(query: string): Tool[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return TOOLS.filter((t) =>
    [t.name, ...t.keywords].join(" ").toLowerCase().includes(q)
  );
}
