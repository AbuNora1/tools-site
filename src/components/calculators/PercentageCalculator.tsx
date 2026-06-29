"use client";
import { useState } from "react";

export default function PercentageCalculator() {
  const [mode, setMode] = useState("of");
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [res, setRes] = useState<{ label: string; value: number; suffix: string } | null>(null);

  function calc() {
    const a = parseFloat(x);
    const b = parseFloat(y);
    if (isNaN(a) || isNaN(b)) return;
    let value = 0, label = "", suffix = "%";
    if (mode === "of")     { value = (a / 100) * b; label = `${a}% من ${b} =`; suffix = ""; }
    if (mode === "ratio")  { value = b !== 0 ? (a / b) * 100 : 0; label = `${a} من ${b} =`; }
    if (mode === "change") { value = a !== 0 ? ((b - a) / Math.abs(a)) * 100 : 0; label = "نسبة التغيّر ="; }
    setRes({ label, value, suffix });
  }

  return (
    <div className="calc">
      <div className="field">
        <label>نوع العملية</label>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="of">كم تساوي X% من Y</option>
          <option value="ratio">X يمثل كم % من Y</option>
          <option value="change">نسبة التغيّر من X إلى Y</option>
        </select>
      </div>
      <div className="frow">
        <div className="field"><label>X</label>
          <input type="number" value={x} onChange={(e) => setX(e.target.value)} placeholder="0" /></div>
        <div className="field"><label>Y</label>
          <input type="number" value={y} onChange={(e) => setY(e.target.value)} placeholder="0" /></div>
      </div>
      <button className="calcbtn" onClick={calc}>احسب</button>
      {res && (
        <div className="result show">
          <div className="lbl">{res.label}</div>
          <div className="big">
            {res.value.toLocaleString("ar-EG", { maximumFractionDigits: 2 })}{res.suffix}
          </div>
        </div>
      )}
    </div>
  );
}
