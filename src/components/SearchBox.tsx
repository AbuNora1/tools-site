"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { searchTools } from "@/lib/tools";

export default function SearchBox() {
  const [q, setQ] = useState("");
  const router = useRouter();
  const results = useMemo(() => searchTools(q).slice(0, 6), [q]);

  function go() {
    if (results[0]) router.push(`/tools/${results[0].slug}`);
  }

  return (
    <div className="cmd">
      <div className="box">
        <span className="mag">🔍</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") go(); }}
          placeholder="ابحث عن أداة… مثل: احسب عمري"
          aria-label="بحث"
        />
        <button className="go" onClick={go}>بحث ↵</button>
      </div>
      {q.trim() && (
        <div className="results show">
          {results.length ? (
            results.map((t) => (
              <a className="ritem" href={`/tools/${t.slug}`} key={t.slug}>
                <span className="emo">{t.emoji}</span>
                <span>
                  <span className="nm">{t.name}</span>
                </span>
              </a>
            ))
          ) : (
            <div className="rempty">لا توجد نتائج مطابقة</div>
          )}
        </div>
      )}
    </div>
  );
}
