/** Design philosophy: Friendly model workbench — a calm four-beat guide that scrolls like a helpful companion. */
import { ArrowRight, Bot, CheckCircle2, CircleHelp, Download, ExternalLink, FolderOpen, FolderPlus, Github, LockKeyhole, MousePointer2, Rocket, TerminalSquare } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { codeTemplates, steps, type Guide } from "../data/course";

const logoUrl = "/manus-storage/modelkit-logo_f86a875b.png";
const heroUrl = "/manus-storage/modelkit-hero_49f2565d.png";
const mobileHeroUrl = "/manus-storage/modelkit-mobile-hero_cfab313c.png";
const codeMascotUrl = "/manus-storage/modelkit-mascot-code_cf331196.png";
const folderMascotUrl = "/manus-storage/mascot-folder-guide_5e3eace4.png";
const terminalMascotUrl = "/manus-storage/mascot-terminal-guide_3a27255b.png";
const launchMascotUrl = "/manus-storage/mascot-launch-guide_fb1a0d7f.png";
const codeNames = { macFiles:"VS Code 下方的黑色 Terminal（macOS）", windowsFiles:"VS Code 下方的黑色 Terminal（Windows）", indexHtml:"VS Code 左側的 index.html", styleCss:"VS Code 左側的 style.css", scriptJs:"VS Code 左側的 script.js", gitPush:"VS Code 下方的黑色 Terminal", gitUpdate:"VS Code 下方的黑色 Terminal" };

function Visual({ guide }: { guide: Guide }) {
  const image = guide.visual === "folder" ? folderMascotUrl : guide.visual === "terminal" ? terminalMascotUrl : guide.visual === "launch" ? launchMascotUrl : null;
  if (image) return <img className="walkthrough-mascot" src={image} alt="小守護員正在示範這個動作" />;
  const Icon = guide.visual === "download" ? Download : guide.visual === "open" ? FolderOpen : guide.visual === "copy" ? MousePointer2 : guide.visual === "github" ? Github : guide.visual === "private" ? LockKeyhole : guide.visual === "vercel" ? Rocket : FolderPlus;
  return <div className="walkthrough-icon"><Icon size={34}/><img src={codeMascotUrl} alt="小守護員在旁提示"/></div>;
}

function FourBeat({ guide, tool, serial }: { guide: Guide; tool: string; serial: string }) {
  return <div className="four-beat">
    <div className="beat"><span>1</span><div><b>動作</b><p>{guide.title}</p></div></div>
    <div className="beat"><span>2</span><div><b>到哪裡</b><p>{tool}</p></div></div>
    <div className="beat major"><span>3</span><div><b>做甚麼</b><p>{guide.instruction}</p><small>{guide.detail}</small></div></div>
    <div className="beat"><span>4</span><div><b>提示</b><p>{guide.tip || "做完這格，向下滑就會看到下一個小動作。"}</p></div></div>
    <div className="beat-serial">{serial}</div>
  </div>;
}

export default function Home() {
  return <div className="app-shell scroll-course">
    <header className="site-header"><a href="#top" className="brand"><img src={logoUrl} alt="網站模型設計圖圖標"/><span><b>網站模型設計圖</b><small>FIRST PUBLISH KIT</small></span></a><div className="header-course-links"><a className="header-jump" href="#part-01">第一課：發布主頁 ↓</a><a className="header-next-kit" href="/claim-kit">第二課：Claim 網站 →</a></div></header>
    <div className="assembly-progress" aria-label="第一模型盒組裝進度"><span>模型進度</span><b>01</b><i/><b>02</b><i/><b>03</b><i/><b>04</b><i/><b>05</b><small>由 Folder 到網址</small></div>
    <main id="top">
      <section className="full-hero"><div className="hero-image-stage"><div className="hero-speech"><b>先讓小可愛</b><span>歡迎你。</span></div><picture><source media="(max-width: 700px)" srcSet={mobileHeroUrl}/><img className="full-hero-art hero-guardian" src={heroUrl} alt="小守護員正在砌網站模型"/></picture></div>
        <div className="full-hero-copy"><div className="cover-serial">FIRST PUBLISH / 5 PARTS · 由 0 開始</div><p className="eyebrow"><Bot size={15}/> 給第一次做網站的朋友</p><h1>由第一個 Folder，<em>做到第一條網址。</em></h1><p className="hero-subtitle">不用懂 code。你只要跟著每一格：<b>動作 → 到哪裡 → 做甚麼 → 提示</b>，一路向下滑，就會完成會動的小可愛歡迎主頁。</p><div className="hero-cta-row"><a className="primary-cta" href="#part-01">開始第 01 步 ↓</a><a className="hero-second-cta" href="/claim-kit"><span>已完成第一課？</span>開啟第二課：Claim 網站 <ArrowRight size={16}/></a></div></div>
      </section>
      <section className="course-intro"><div><b>今次只學三個工具</b><p>VS Code 建檔案；GitHub 保存版本；Vercel 發出網址。登入、Firebase 和安全設定留待下一模型盒。</p></div><div className="mini-tools"><span><TerminalSquare/> VS Code</span><span><Github/> GitHub</span><span><Rocket/> Vercel</span></div></section>
      <div className="course-stream">
        {steps.map((step, partIndex) => <section className="course-part" id={`part-${step.number}`} key={step.id}>
          <div className="part-intro"><div className="part-number">{step.number}</div><div><p>第 {step.number} 部 · {step.tool}</p><h2>{step.title}</h2><span>{step.goal}</span></div><div className="part-reward"><CheckCircle2 size={17}/><small>完成後：</small><b>{step.reward}</b></div></div>
          <div className="guide-stack">{step.guides.map((guide, guideIndex) => <article className="guide-unit" key={guide.title}>
            <div className="guide-visual"><Visual guide={guide}/></div><div className="guide-content"><FourBeat guide={guide} tool={step.tool} serial={`${step.number}.${guideIndex + 1}`}/>{guide.link && <a className="official-link" href={guide.link.href} target="_blank" rel="noreferrer">{guide.link.label}<ExternalLink size={15}/></a>}
              {guide.choices ? <div className="code-alternatives">{guide.choices.map((code) => <CodeBlock key={code} code={codeTemplates[code]} fileName={codeNames[code]} caption={code === "macFiles" || code === "windowsFiles" ? "點黑色 Terminal 一下 → 貼上 → 按 Enter。成功後，左側 Explorer 會出現三個檔案。" : "這張 code 每一行都需要；請先按右上複製，再貼到上面寫明的正確檔案。"} />)}</div> : guide.code && <CodeBlock code={codeTemplates[guide.code]} fileName={codeNames[guide.code]} caption="先看上方指定位置，再按右上複製。貼上後，按 Ctrl/Cmd + S 儲存；如果是在 Terminal，改為按 Enter。" />}
              <div className="see-result"><CheckCircle2 size={19}/><div><b>做完後，你會看到</b><p>{guide.result}</p></div></div></div>
          </article>)}</div>
          {partIndex < steps.length - 1 && <div className="continue-line"><span>{step.number}</span><i/><b>向下滑，開始下一部分</b><i/><span>{steps[partIndex + 1].number}</span></div>}
        </section>)}
      </div>
      <a href="/claim-kit" className="next-kit next-kit-simple"><div><p>下一模型盒</p><h2>登入、會員頁<br/>和安全</h2><span>由歡迎主頁，砌成朋友可登入的 Claim 網站。</span></div><div className="next-kit-stamp">NEXT<br/>KIT<br/><b>02</b></div><ArrowRight className="next-kit-arrow"/></a>
    </main>
    <footer>首次發布模型盒 · <a href="https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository" target="_blank" rel="noreferrer">GitHub New repository <ExternalLink size={13}/></a><a href="https://vercel.com/docs/git" target="_blank" rel="noreferrer">Vercel New Project <ExternalLink size={13}/></a></footer>
  </div>;
}
