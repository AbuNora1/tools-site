"use client";
import { useState } from "react";

const SYM: Record<string, string> = { C: "°C", F: "°F", K: "K" };

export default function TempCalculator() {
  const [val, setVal] = useState("");
  const [from, setFrom] = useState("C");
  const [to, setTo] = useState("F");
  const [res, setRes] = useState<{ label: string; out: number; sym: string } | null>(null);

  function calc() {
    const v = parseFloat(val);
    if (isNaN(v)) return;
    let c: number;
    if (from === "C") c = v;
    else if (from === "F") c = ((v - 32) * 5) / 9;
    else c = v - 273.15;
    let out: number;
    if (to === "C") out = c;
    else if (to === "F") out = (c * 9) / 5 + 32;
    else out = c + 273.15;
    setRes({ label: `${v} ${SYM[from]} =`, out, sym: SYM[to] });
  }

  return (
    <div className="calc">
      <div className="field">
        <label>القيمة</label>
        <input type="number" value={val} onChange={(e) => setVal(e.target.value)} placeholder="25" />
      </div>
      <div className="frow">
        <div className="field"><label>من</label>
          <select value={from} onChange={(e) => setFrom(e.target.value)}>
            <option value="C">°C</option><option value="F">°F</option><option value="K">K</option>
          </select></div>
        <div className="field"><label>إلى</label>
          <select value={to} onChange={(e) => setTo(e.target.value)}>
            <option value="F">°F</option><option value="C">°C</option><option value="K">K</option>
          </select></div>
      </div>
      <button className="calcbtn" onClick={calc}>حوّل</button>
      {res && (
        <div className="result show">
          <div className="lbl">{res.label}</div>
          <div className="big">
            {res.out.toLocaleString("ar-EG", { maximumFractionDigits: 2 })} {res.sym}
          </div>
        </div>
      )}
    </div>
  );
}
