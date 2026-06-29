"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    const value = next ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", value);
    try { localStorage.setItem("theme", value); } catch {}
  }

  return (
    <button className="iconbtn" onClick={toggle} aria-label="تبديل الوضع الليلي">
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
