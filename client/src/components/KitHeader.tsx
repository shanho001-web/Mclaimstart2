import { ArrowLeft, Boxes, BookOpen, ExternalLink, MonitorPlay, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

const logoUrl = "/manus-storage/modelkit-logo_f86a875b.png";

export function KitHeader({ active }: { active: "claim" | "guide" | "tools" }) {
  return <header className="kit-header"><Link href="/" className="kit-brand"><img src={logoUrl} alt="網站模型設計圖"/><span><b>網站模型設計圖</b><small>MODEL KIT 02</small></span></Link><nav><Link href="/" className="nav-back"><ArrowLeft size={15}/> 第一模型盒</Link><Link href="/tool-guides" className={active === "tools" ? "nav-current" : ""}><MonitorPlay size={15}/> 看著畫面按</Link><Link href="/claim-kit" className={active === "claim" ? "nav-current" : ""}><Boxes size={15}/> Claim 網站</Link><Link href="/member-guide" className={active === "guide" ? "nav-current" : ""}><BookOpen size={15}/> 成員指南</Link></nav></header>;
}

export function KitFooter() {
  return <footer className="kit-footer"><ShieldCheck size={16}/> 第二模型盒的設定說明以官方文件為準。<a href="https://firebase.google.com/docs/firestore/security/get-started" target="_blank" rel="noreferrer">Firestore Rules <ExternalLink size={12}/></a><a href="https://firebase.google.com/docs/storage/security" target="_blank" rel="noreferrer">Storage Rules <ExternalLink size={12}/></a><a href="https://vercel.com/docs/git/vercel-for-github" target="_blank" rel="noreferrer">Vercel Git Deploy <ExternalLink size={12}/></a></footer>;
}
