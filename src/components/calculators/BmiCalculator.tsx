"use client";
import { useState } from "react";

export default function BmiCalculator() {
  const [w, setW] = useState("");
  const [h, setH] = useState("");
  const [res, setRes] = useState<{ bmi: number; cat: string } | null>(null);

  function calc() {
    const weight = parseFloat(w);
    const height = parseFloat(h);
    if (isNaN(weight) || isNaN(height) || height <= 0) return;
    const bmi = weight / Math.pow(height / 100, 2);
    let cat = "";
    if (bmi < 18.5) cat = "نقص في الوزن";
    else if (bmi < 25) cat = "وزن طبيعي ✅";
    else if (bmi < 30) cat = "زيادة في الوزن";
    else cat = "سمنة";
    setRes({ bmi, cat });
  }

  return (
    <div className="calc">
      <div className="frow">
        <div className="field"><label>الوزن (كجم)</label>
          <input type="number" value={w} onChange={(e) => setW(e.target.value)} placeholder="70" /></div>
        <div className="field"><label>الطول (سم)</label>
          <input type="number" value={h} onChange={(e) => setH(e.target.value)} placeholder="175" /></div>
      </div>
      <button className="calcbtn" onClick={calc}>احسب</button>
      {res && (
        <div className="result show">
          <div className="lbl">مؤشر كتلة الجسم</div>
          <div className="big">{res.bmi.toLocaleString("ar-EG", { maximumFractionDigits: 1 })}</div>
          <div className="meta">
            التصنيف: <b>{res.cat}</b><br />المعدل الطبيعي بين 18.5 و 24.9
          </div>
        </div>
      )}
    </div>
  );
}
