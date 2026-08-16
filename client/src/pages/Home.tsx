/** Design philosophy: Friendly model workbench — clear route-first action cards with pop-out guardian stickers. */
import { ArrowRight, Bot, CheckCircle2, ExternalLink, TerminalSquare } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { CourseNav } from "@/components/KitHeader";
import { LessonCopyGuide } from "@/components/LessonCopyGuide";
import { codeTemplates, homeLessonArticle, steps, type Guide } from "../data/course";

const logoUrl = "/images/logo.webp";
const heroUrl = "/images/guardian-welcome-desktop.png";
const mobileHeroUrl = "/images/guardian-welcome-mobile.png";
const modelDownloadUrl = "/images/guardian-download.webp";
const modelFolderOpenUrl = "/images/guardian-folder-open.webp";
const modelCodeUrl = "/images/guardian-code-fit.webp";
const modelIdeaUrl = "/images/guardian-idea.png";
const codeNames = { macFiles:"VS Code 下方的黑色 Terminal（macOS）", windowsFiles:"VS Code 下方的黑色 Terminal（Windows）", indexHtml:"VS Code 左側的 index.html", styleCss:"VS Code 左側的 style.css", scriptJs:"VS Code 左側的 script.js", gitPush:"VS Code 下方的黑色 Terminal", gitUpdate:"VS Code 下方的黑色 Terminal" };
const actionArt = [modelDownloadUrl, modelFolderOpenUrl, modelFolderOpenUrl, modelCodeUrl, modelCodeUrl, modelFolderOpenUrl, modelCodeUrl, modelDownloadUrl];
const partBreaks = [
  { art: modelIdeaUrl, label:"", title:"把三張網站零件砌進主頁", note:"" },
];

function Visual({ guide, index }: { guide: Guide; index: number }) {
  const image = actionArt[index] || modelDownloadUrl;
  return <img className="walkthrough-mascot model-action-sticker" src={image} alt={`小守護員正在示範：${guide.title}`} />;
}

function splitIntoHumanSteps(detail: string) {
  return detail.split(/[。；]/).map((item) => item.trim()).filter(Boolean);
}

function ActionCard({ guide, sequence }: { guide: Guide; sequence: number }) {
  return <div className="action-card">
    <div className="beat beat-where"><span>{sequence * 2 - 1}</span><div><b>到哪裡</b><p>{guide.instruction}</p></div></div>
    <div className="beat beat-do major"><span>{sequence * 2}</span><div><b>做甚麼</b><p className="action-lead">{guide.title}</p><ol className="human-steps">{(guide.microSteps || splitIntoHumanSteps(guide.detail)).map((item) => <li key={item}>{item}</li>)}</ol></div></div>
  </div>;
}

export default function Home() {
  return <div className="app-shell scroll-course">
    <header className="site-header"><a href="#top" className="brand"><img src={logoUrl} alt="網站模型設計圖圖標"/><span><b>網站模型設計圖</b><small>5 LESSON COURSE</small></span></a><div className="header-course-links"><a className="header-jump" href="#part-01">第 1 課：首次發布 ↓</a><a className="header-next-kit" href="/member-guide">管理員指南 →</a></div></header>
    <CourseNav active={1} firstHref="#part-01"/>
    <div className="assembly-progress" aria-label="第一模型盒組裝進度"><span>模型進度</span><b>1</b><i/><b>2</b><i/><b>3</b><i/><b>4</b><i/><b>5</b><small>由 Folder 到網址</small></div>
    <main id="top">
      <section className="full-hero"><div className="hero-image-stage"><div className="hero-speech"><b>先讓小可愛</b><span>歡迎你。</span></div><picture><source media="(max-width: 700px)" srcSet={mobileHeroUrl}/><img className="full-hero-art hero-guardian" src={heroUrl} alt="小守護員正在砌網站模型"/></picture></div></section>
      <LessonCopyGuide data={homeLessonArticle}/>
      <div className="course-stream">
        {steps.map((step, partIndex) => { const offset = steps.slice(0, partIndex).reduce((total, previous) => total + previous.guides.length, 0); return <div className="part-block" key={step.id}><section className="course-part" id={`part-${step.number}`}>
          <div className="part-intro"><div className="part-number">{Number(step.number)}</div><div><p>第 {Number(step.number)} 部 · {step.tool}</p><h2>{step.title}</h2>{step.goal && <span>{step.goal}</span>}</div>{step.reward && <div className="part-reward"><CheckCircle2 size={17}/><small>完成後：</small><b>{step.reward}</b></div>}</div>
          <div className="guide-stack">{step.id === "welcome" ? <><article className="guide-unit code-pack"><div className="guide-visual"><Visual guide={step.guides[0]} index={offset}/></div><div className="guide-content"><div className="code-pack-copy"><p className="action-label">步驟 {(offset + 1) * 2 - 1}–{(offset + 1) * 2} · 三份主頁 code</p><h3>回到 VS Code，逐個檔案貼 code</h3><p>左邊 Explorer 先按檔案名稱；再按該張卡的「複製 code」；回同一個檔案全選、貼上，按 <b>Ctrl/Cmd + S</b> 儲存。</p></div><div className="code-pack-grid">{step.guides.slice(0, 3).map((guide) => <div className="code-pack-item" key={guide.code}><p>VS Code 左邊 Explorer → <b>{guide.code === "indexHtml" ? "index.html" : guide.code === "styleCss" ? "style.css" : "script.js"}</b> → 按下方「複製 code」→ 全選舊內容 → 貼上 → 儲存</p><CodeBlock code={codeTemplates[guide.code!]} fileName={codeNames[guide.code!]} /></div>)}</div><aside className="guardian-tip"><b>小守護員提示</b><p>index.html、style.css、script.js 三份都貼好並儲存後，再向下測試主頁。</p></aside></div></article>{step.guides.slice(3).map((guide, guideIndex) => <article className="guide-unit" key={guide.title}><div className="guide-visual"><Visual guide={guide} index={offset + guideIndex + 3}/></div><div className="guide-content"><ActionCard guide={guide} sequence={offset + guideIndex + 2}/><aside className="guardian-tip"><b>小守護員提示</b><p>{guide.tip || "完成這格後，直接向下滑到下一個動作。"}</p></aside></div></article>)}</> : step.guides.map((guide, guideIndex) => <article className="guide-unit" key={guide.title}>
            <div className="guide-visual"><Visual guide={guide} index={offset + guideIndex}/></div><div className="guide-content"><ActionCard guide={guide} sequence={offset + guideIndex + 1}/>{guide.link && <a className="official-link" href={guide.link.href} target="_blank" rel="noreferrer">{guide.link.label}<ExternalLink size={15}/></a>}
              {guide.choices ? <><p className="code-copy-direction">選自己的 Mac 或 Windows 卡 → 按「複製 code」→ 回 VS Code 下方黑色 Terminal 貼上 → 按 Enter。</p><div className="code-alternatives">{guide.choices.map((code) => <CodeBlock key={code} code={codeTemplates[code]} fileName={codeNames[code]} tone={code === "macFiles" ? "mac" : "windows"} />)}</div></> : guide.code && <><p className="code-copy-direction">按這張卡的「複製 code」→ 回 <b>{codeNames[guide.code]}</b> 貼上 → 儲存或按 Enter。</p><CodeBlock code={codeTemplates[guide.code]} fileName={codeNames[guide.code]} /></>}
              <aside className="guardian-tip"><b>小守護員提示</b><p>{guide.tip || "完成這格後，直接向下滑到下一個動作。"}</p></aside>
            </div></article>)}</div>
          </section>{partIndex < steps.length - 1 && <section className={`part-break part-break-${partIndex + 1}`}><img src={partBreaks[partIndex].art} alt={partBreaks[partIndex].title}/><div>{partBreaks[partIndex].label && <p>{partBreaks[partIndex].label}</p>}<h2>{partBreaks[partIndex].title}</h2>{partBreaks[partIndex].note && <span>{partBreaks[partIndex].note}</span>}</div></section>}</div>})}
      </div>
      <a href="/lesson-2-github" className="next-kit next-kit-simple"><div><p>下一課 · LESSON 02</p><h2>GitHub</h2><span>下一課，把你的守護員網站安全擺上雲端。</span></div><div className="next-kit-stamp">NEXT<br/>LESSON<br/><b>02</b></div><ArrowRight className="next-kit-arrow"/></a>
    </main>
    <footer>第一課 · 守護員歡迎頁完成後，按上方 GitHub 入口繼續下一課。</footer>
  </div>;
}
