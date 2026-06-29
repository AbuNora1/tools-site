"use client";
import { useState } from "react";

type Res = { y: number; m: number; d: number; totalDays: number; hijri: string };

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [res, setRes] = useState<Res | null>(null);
  const [err, setErr] = useState("");

  function calc() {
    setErr("");
    if (!dob) return;
    const b = new Date(dob);
    const now = new Date();
    if (b > now) { setErr("تاريخ غير صالح"); return; }

    let y = now.getFullYear() - b.getFullYear();
    let m = now.getMonth() - b.getMonth();
    let d = now.getDate() - b.getDate();
    if (d < 0) { m--; d += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (m < 0) { y--; m += 12; }

    const totalDays = Math.floor((now.getTime() - b.getTime()) / 86400000);
    let hijri = "";
    try {
      hijri = new Intl.DateTimeFormat("ar-SA-u-ca-islamic-umalqura", {
        day: "numeric", month: "long", year: "numeric",
      }).format(b);
    } catch {}
    setRes({ y, m, d, totalDays, hijri });
  }

  return (
    <div className="calc">
      <div className="field">
        <label>تاريخ ميلادك</label>
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
      </div>
      <button className="calcbtn" onClick={calc}>احسب العمر</button>
      {err && <p className="err">{err}</p>}
      {res && (
        <div className="result show">
          <div className="lbl">عمرك هو</div>
          <div className="big">{res.y} سنة</div>
          <div className="meta">
            و <b>{res.m}</b> شهر و <b>{res.d}</b> يوم — أي ما يعادل{" "}
            <b>{res.totalDays.toLocaleString("ar-EG")}</b> يوم.
            {res.hijri && (<><br />تاريخ ميلادك بالهجري: <b>{res.hijri}</b></>)}
          </div>
        </div>
      )}
    </div>
  );
}
