import Link from "next/link";
import { getCategory, type Tool } from "@/lib/tools";

export default function ToolCard({ tool }: { tool: Tool }) {
  const cat = getCategory(tool.category);
  return (
    <Link className="card" href={`/tools/${tool.slug}`}>
      {!tool.live && <span className="soon">قريباً</span>}
      <div className="top">
        <div className="emo">{tool.emoji}</div>
        <span className="tag">{cat?.name}</span>
      </div>
      <h3>{tool.name}</h3>
      <div className="desc">{tool.description}</div>
    </Link>
  );
}
