/** Design philosophy: Friendly model workbench — clear route-first action cards with pop-out guardian stickers. */
import { ArrowRight, Bot, CheckCircle2, ExternalLink, Github, Rocket, TerminalSquare } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { codeTemplates, steps, type Guide } from "../data/course";

const logoUrl = "/manus-storage/modelkit-logo_f86a875b.png";
const heroUrl = "/manus-storage/modelkit-hero-white_12274455.png";
const mobileHeroUrl = "/manus-storage/modelkit-mobile-hero-white_e139a20e.png";
const modelDownloadUrl = "/manus-storage/guardian-model-download_3c1827bc.png";
const modelFolderOpenUrl = "/manus-storage/guardian-model-folder-open_fb5db00d.png";
const modelCodeUrl = "/manus-storage/guardian-model-code-fit_69207a70.png";
const modelGithubUrl = "/manus-storage/guardian-model-github-lock_c014df84.png";
const modelLaunchUrl = "/manus-storage/guardian-model-launch_1f0fec45.png";
const codeNames = { macFiles:"VS Code 下方的黑色 Terminal（macOS）", windowsFiles:"VS Code 下方的黑色 Terminal（Windows）", indexHtml:"VS Code 左側的 index.html", styleCss:"VS Code 左側的 style.css", scriptJs:"VS Code 左側的 script.js", gitPush:"VS Code 下方的黑色 Terminal", gitUpdate:"VS Code 下方的黑色 Terminal" };
const actionArt = [modelDownloadUrl, modelFolderOpenUrl, modelFolderOpenUrl, modelCodeUrl, modelCodeUrl, modelGithubUrl, modelCodeUrl, modelLaunchUrl, modelGithubUrl, modelFolderOpenUrl, modelDownloadUrl, modelLaunchUrl, modelFolderOpenUrl, modelLaunchUrl, modelGithubUrl, modelCodeUrl, modelDownloadUrl, modelLaunchUrl];
const partBreaks = [
  { art: modelCodeUrl, label:"", title:"把三張網站零件砌進主頁", note:"" },
  { art: modelGithubUrl, label:"SAVE THE BUILD", title:"把完成的作品放進版本庫", note:"" },
  { art: modelLaunchUrl, label:"SEND THE MODEL", title:"把版本庫變成真正網址", note:"" },
  { art: modelCodeUrl, label:"ONE LAST TEST", title:"恭喜，你已成功完成第一個網頁", note:"試吓更改頁面，看看新版自動上線。" }
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
    <header className="site-header"><a href="#top" className="brand"><img src={logoUrl} alt="網站模型設計圖圖標"/><span><b>網站模型設計圖</b><small>FIRST PUBLISH KIT</small></span></a><div className="header-course-links"><a className="header-jump" href="#part-01">第一課：發布主頁 ↓</a><a className="header-next-kit" href="/claim-kit">第二課：Claim 網站 →</a></div></header>
    <div className="assembly-progress" aria-label="第一模型盒組裝進度"><span>模型進度</span><b>1</b><i/><b>2</b><i/><b>3</b><i/><b>4</b><i/><b>5</b><small>由 Folder 到網址</small></div>
    <main id="top">
      <section className="full-hero"><div className="hero-image-stage"><div className="hero-speech"><b>先讓小可愛</b><span>歡迎你。</span></div><picture><source media="(max-width: 700px)" srcSet={mobileHeroUrl}/><img className="full-hero-art hero-guardian" src={heroUrl} alt="小守護員正在砌網站模型"/></picture></div>
        <div className="full-hero-copy"><div className="cover-serial">FIRST PUBLISH / 5 PARTS · 由 0 開始</div><p className="eyebrow"><Bot size={15}/> 給第一次做網站的朋友</p><h1><span>由 Folder 開始</span><em>做到第一條網址</em></h1><div className="hero-opening"><b>零基礎也能即時學會製作網頁的概念。</b><p>先解決新手最初的迷思：網頁其實由檔案、版本和網址組成。</p></div><div className="hero-cta-row"><a className="primary-cta" href="#part-01">開始第 1 步 ↓</a></div></div>
      </section>
      <section className="course-intro"><div><b>今次只學三個工具</b><p>VS Code 建檔案；GitHub 保存版本；Vercel 發出網址。登入、Firebase 和安全設定留待下一模型盒。</p></div><div className="mini-tools"><span><TerminalSquare/> VS Code</span><span><Github/> GitHub</span><span><Rocket/> Vercel</span></div></section>
      <div className="course-stream">
        {steps.map((step, partIndex) => { const offset = steps.slice(0, partIndex).reduce((total, previous) => total + previous.guides.length, 0); return <div className="part-block" key={step.id}><section className="course-part" id={`part-${step.number}`}>
          <div className="part-intro"><div className="part-number">{Number(step.number)}</div><div><p>第 {Number(step.number)} 部 · {step.tool}</p><h2>{step.title}</h2>{step.goal && <span>{step.goal}</span>}</div>{step.reward && <div className="part-reward"><CheckCircle2 size={17}/><small>完成後：</small><b>{step.reward}</b></div>}</div>
          <div className="guide-stack">{step.id === "welcome" ? <><article className="guide-unit code-pack"><div className="guide-visual"><Visual guide={step.guides[0]} index={offset}/></div><div className="guide-content"><div className="code-pack-copy"><p className="action-label">三份主頁 code</p><h3>讓小可愛在主頁歡迎你</h3><p>把下方三份完整 code 分別貼到同名檔案。每貼完一份，按 <b>Ctrl/Cmd + S</b> 儲存。</p></div><div className="code-pack-grid">{step.guides.slice(0, 3).map((guide) => <CodeBlock key={guide.code} code={codeTemplates[guide.code!]} fileName={codeNames[guide.code!]} />)}</div><aside className="guardian-tip"><b>小守護員提示</b><p>index.html、style.css、script.js 三份都貼好並儲存後，再向下測試主頁。</p></aside></div></article>{step.guides.slice(3).map((guide, guideIndex) => <article className="guide-unit" key={guide.title}><div className="guide-visual"><Visual guide={guide} index={offset + guideIndex + 3}/></div><div className="guide-content"><ActionCard guide={guide} sequence={offset + guideIndex + 4}/><aside className="guardian-tip"><b>小守護員提示</b><p>{guide.tip || "完成這格後，直接向下滑到下一個動作。"}</p></aside></div></article>)}</> : step.guides.map((guide, guideIndex) => <article className="guide-unit" key={guide.title}>
            <div className="guide-visual"><Visual guide={guide} index={offset + guideIndex}/></div><div className="guide-content"><ActionCard guide={guide} sequence={offset + guideIndex + 1}/>{guide.link && <a className="official-link" href={guide.link.href} target="_blank" rel="noreferrer">{guide.link.label}<ExternalLink size={15}/></a>}
              {guide.choices ? <div className="code-alternatives">{guide.choices.map((code) => <CodeBlock key={code} code={codeTemplates[code]} fileName={codeNames[code]} tone={code === "macFiles" ? "mac" : "windows"} />)}</div> : guide.code && <CodeBlock code={codeTemplates[guide.code]} fileName={codeNames[guide.code]} />}
              <aside className="guardian-tip"><b>小守護員提示</b><p>{guide.tip || "完成這格後，直接向下滑到下一個動作。"}</p></aside>
            </div></article>)}</div>
          </section>{partIndex < steps.length - 1 && <section className={`part-break part-break-${partIndex + 1}`}><img src={partBreaks[partIndex].art} alt={partBreaks[partIndex].title}/><div>{partBreaks[partIndex].label && <p>{partBreaks[partIndex].label}</p>}<h2>{partBreaks[partIndex].title}</h2>{partBreaks[partIndex].note && <span>{partBreaks[partIndex].note}</span>}</div></section>}</div>})}
      </div>
      <a href="/claim-kit" className="next-kit next-kit-simple"><div><p>下一模型盒</p><h2>登入、會員頁<br/>和安全</h2><span>由歡迎主頁，砌成朋友可登入的 Claim 網站。</span></div><div className="next-kit-stamp">NEXT<br/>KIT<br/><b>02</b></div><ArrowRight className="next-kit-arrow"/></a>
    </main>
    <footer>首次發布模型盒 · <a href="https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository" target="_blank" rel="noreferrer">GitHub New repository <ExternalLink size={13}/></a><a href="https://vercel.com/docs/git" target="_blank" rel="noreferrer">Vercel New Project <ExternalLink size={13}/></a></footer>
  </div>;
}
