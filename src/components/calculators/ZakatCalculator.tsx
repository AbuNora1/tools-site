"use client";
import { useState } from "react";

export default function ZakatCalculator() {
  const [amount, setAmount] = useState("");
  const [res, setRes] = useState<{ zakat: number; total: number } | null>(null);

  function calc() {
    const a = parseFloat(amount);
    if (isNaN(a) || a < 0) return;
    setRes({ zakat: a * 0.025, total: a });
  }

  return (
    <div className="calc">
      <div className="field">
        <label>إجمالي المال القابل للزكاة</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" />
      </div>
      <button className="calcbtn" onClick={calc}>احسب الزكاة</button>
      {res && (
        <div className="result show">
          <div className="lbl">الزكاة الواجبة (2.5%)</div>
          <div className="big">{res.zakat.toLocaleString("ar-EG", { maximumFractionDigits: 2 })}</div>
          <div className="meta">
            من إجمالي <b>{res.total.toLocaleString("ar-EG")}</b>. تأكد من بلوغ النصاب وحولان الحول.
          </div>
        </div>
      )}
    </div>
  );
}
