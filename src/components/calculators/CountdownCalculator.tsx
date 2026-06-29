"use client";
import { useEffect, useRef, useState } from "react";

type Left = { d: number; h: number; m: number; s: number; done: boolean };

export default function CountdownCalculator() {
  const [target, setTarget] = useState("");
  const [left, setLeft] = useState<Left | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  function start() {
    if (!target) return;
    const ts = new Date(target).getTime();
    if (timer.current) clearInterval(timer.current);
    const tick = () => {
      const diff = ts - Date.now();
      if (diff <= 0) {
        setLeft({ d: 0, h: 0, m: 0, s: 0, done: true });
        if (timer.current) clearInterval(timer.current);
        return;
      }
      setLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor(diff / 3600000) % 24,
        m: Math.floor(diff / 60000) % 60,
        s: Math.floor(diff / 1000) % 60,
        done: false,
      });
    };
    tick();
    timer.current = setInterval(tick, 1000);
  }

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="calc">
      <div className="field">
        <label>التاريخ المستهدف</label>
        <input type="datetime-local" value={target} onChange={(e) => setTarget(e.target.value)} />
      </div>
      <button className="calcbtn" onClick={start}>ابدأ العدّاد</button>
      {left && (
        <div className="result show">
          {left.done ? (
            <div className="big">انتهى ✅</div>
          ) : (
            <>
              <div className="lbl">الوقت المتبقي</div>
              <div className="cdgrid">
                <div className="cdbox"><div className="n">{left.d}</div><div className="u">يوم</div></div>
                <div className="cdbox"><div className="n">{pad(left.h)}</div><div className="u">ساعة</div></div>
                <div className="cdbox"><div className="n">{pad(left.m)}</div><div className="u">دقيقة</div></div>
                <div className="cdbox"><div className="n">{pad(left.s)}</div><div className="u">ثانية</div></div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
