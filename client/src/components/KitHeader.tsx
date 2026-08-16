import { ArrowLeft, ArrowRight, BookOpen, ExternalLink, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { getLesson, lessons, type LessonNumber } from "@/data/lessons";

const logoUrl = "/manus-storage/modelkit-logo_f86a875b.png";

export function CourseNav({ active, firstHref = "/#part-01" }: { active?: LessonNumber; firstHref?: string }) {
  return <nav className="course-nav" aria-label="五課課程導航">{lessons.map((lesson) => {
    const href = lesson.number === 1 ? firstHref : lesson.href;
    return <a key={lesson.number} href={href} className={active === lesson.number ? "course-nav-link active" : "course-nav-link"} aria-current={active === lesson.number ? "page" : undefined}><span>{lesson.number}</span><b>{lesson.short}</b></a>;
  })}</nav>;
}

export function KitHeader({ active }: { active: LessonNumber | "guide" }) {
  return <><header className="kit-header"><Link href="/" className="kit-brand"><img src={logoUrl} alt="網站模型設計圖"/><span><b>網站模型設計圖</b><small>5 LESSON COURSE</small></span></Link><nav><Link href="/" className="nav-back"><ArrowLeft size={15}/> 課程首頁</Link><Link href="/member-guide" className={active === "guide" ? "nav-current" : ""}><BookOpen size={15}/> 成員指南</Link></nav></header><CourseNav active={typeof active === "number" ? active : undefined}/></>;
}

export function LessonPager({ current }: { current: LessonNumber }) {
  const previous = current > 1 ? getLesson((current - 1) as LessonNumber) : undefined;
  const next = current < 5 ? getLesson((current + 1) as LessonNumber) : undefined;
  return <nav className="lesson-pager" aria-label="上一課與下一課">{previous ? <Link href={previous.href} className="lesson-pager-link previous"><ArrowLeft/><small>上一課 · 第 {previous.number} 課</small><b>{previous.short}</b></Link> : <span/>}{next ? <Link href={next.href} className="lesson-pager-link next"><small>下一課 · 第 {next.number} 課</small><b>{next.short}</b><ArrowRight/></Link> : <Link href="/member-guide" className="lesson-pager-link next"><small>五課完成</small><b>查看成員指南</b><ArrowRight/></Link>}</nav>;
}

export function KitFooter() {
  return <footer className="kit-footer"><ShieldCheck size={16}/> 五課課程中的後台設定以官方文件為準。<a href="https://firebase.google.com/docs/firestore/security/get-started" target="_blank" rel="noreferrer">Firestore Rules <ExternalLink size={12}/></a><a href="https://firebase.google.com/docs/storage/security" target="_blank" rel="noreferrer">Storage Rules <ExternalLink size={12}/></a><a href="https://vercel.com/docs/git/vercel-for-github" target="_blank" rel="noreferrer">Vercel Git Deploy <ExternalLink size={12}/></a></footer>;
}
