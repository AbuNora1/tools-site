"use client";
import Link from "next/link";
import { CATEGORIES } from "@/lib/tools";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="site">
      <div className="wrap">
        <div className="hrow">
          <Link href="/" className="brand">
            <span className="logo">حـ</span>
            <span>حاسب<span className="en"> SMART TOOLS</span></span>
          </Link>
          <div className="htools">
            <ThemeToggle />
          </div>
        </div>
      </div>
      <div className="catbar">
        <div className="wrap">
          <div className="inner">
            <Link className="pill" href="/">الكل</Link>
            {CATEGORIES.map((c) => (
              <Link className="pill" href={`/categories/${c.slug}`} key={c.slug}>
                {c.icon} {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
