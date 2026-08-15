/** Design philosophy: Friendly model workbench — one visible click, result and tiny win at a time. */
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Bot, Check, CheckCircle2, CircleHelp, Copy, Download, ExternalLink, FolderOpen, FolderPlus, Github, Globe2, LockKeyhole, MousePointer2, Rocket, Sparkles, TerminalSquare } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { StepNav } from "@/components/StepNav";
import { codeTemplates, steps, type CodeKey, type Guide } from "../data/course";

const logoUrl = "/manus-storage/modelkit-logo_f86a875b.png";
const heroUrl = "/manus-storage/modelkit-hero_49f2565d.png";
const codeMascotUrl = "/manus-storage/modelkit-mascot-code_cf331196.png";
const folderMascotUrl = "/manus-storage/mascot-folder-guide_5e3eace4.png";
const terminalMascotUrl = "/manus-storage/mascot-terminal-guide_3a27255b.png";
const launchMascotUrl = "/manus-storage/mascot-launch-guide_fb1a0d7f.png";
const fileNames: Record<CodeKey,string> = { macFiles:"macOS Terminal", windowsFiles:"Windows PowerShell", indexHtml:"index.html", styleCss:"style.css", scriptJs:"script.js", gitPush:"VS Code Terminal", gitUpdate:"VS Code Terminal" };

const toolIcon=(tool:string)=>tool.includes("GitHub")?<Github size={18}/>:tool.includes("Vercel")?<Rocket size={18}/>:tool.includes("VS Code")?<TerminalSquare size={18}/>:<Globe2 size={18}/>;

function GuideVisual({ guide }: { guide: Guide }) {
  const image = guide.visual === "folder" ? folderMascotUrl : guide.visual === "terminal" ? terminalMascotUrl : guide.visual === "launch" ? launchMascotUrl : null;
  if (image) return <img src={image} alt="小守護員正在示範這個動作" className="guide-mascot" />;
  const Icon = guide.visual === "download" ? Download : guide.visual === "open" ? FolderOpen : guide.visual === "copy" ? Copy : guide.visual === "github" ? Github : guide.visual === "private" ? LockKeyhole : guide.visual === "vercel" ? Rocket : guide.visual === "edit" ? MousePointer2 : FolderPlus;
  return <div className="guide-icon"><Icon size={34}/><img src={codeMascotUrl} alt="小守護員在旁提示" /></div>;
}

export default function Home(){
 const [activeId,setActiveId]=useState("vscode");
 const [completed,setCompleted]=useState<string[]>(()=>JSON.parse(localStorage.getItem("first-publish-completed")||"[]"));
 const [guideProgress,setGuideProgress]=useState<Record<string,number>>(()=>JSON.parse(localStorage.getItem("first-publish-guide-progress")||"{}"));
 const [variant,setVariant]=useState<CodeKey|null>(null);
 const active=useMemo(()=>steps.find(step=>step.id===activeId)||steps[0],[activeId]);
 const guideIndex=Math.min(guideProgress[active.id]||0,active.guides.length-1);
 const guide=active.guides[guideIndex];
 const availableCodes=guide.choices||[];
 const codeKey=(variant&&availableCodes.includes(variant)?variant:guide.code) as CodeKey|undefined;
 const unlocked=steps.filter((_,index)=>index===0||completed.includes(steps[index-1].id)).map(step=>step.id);
 const score=completed.length*300+Object.values(guideProgress).reduce((total,current)=>total+current*40,0);
 const progress=Math.round((completed.length+guideIndex/active.guides.length)/steps.length*100);
 useEffect(()=>localStorage.setItem("first-publish-completed",JSON.stringify(completed)),[completed]);
 useEffect(()=>localStorage.setItem("first-publish-guide-progress",JSON.stringify(guideProgress)),[guideProgress]);
 useEffect(()=>setVariant(null),[activeId,guideIndex]);
 function choose(id:string){ if(!unlocked.includes(id)) return; setActiveId(id); document.getElementById("stage")?.scrollIntoView({behavior:"smooth",block:"start"}); }
 function nextAction(){ if(guideIndex<active.guides.length-1){setGuideProgress(all=>({...all,[active.id]:guideIndex+1})); return;} if(!completed.includes(active.id))setCompleted(all=>[...all,active.id]); const next=steps[steps.findIndex(step=>step.id===active.id)+1]; if(next){setActiveId(next.id);document.getElementById("stage")?.scrollIntoView({behavior:"smooth",block:"start"});} }
 function previousAction(){if(guideIndex>0)setGuideProgress(all=>({...all,[active.id]:guideIndex-1}));}
 return <div className="app-shell journey-shell"><header className="site-header"><a href="#top" className="brand"><img src={logoUrl} alt="網站模型設計圖圖標"/><span><b>網站模型</b><small>FIRST PUBLISH KIT</small></span></a><div className="header-status"><Sparkles size={15}/>{score} 分 · 一步一步成功</div></header>
 <main id="top"><section className="journey-hero"><div className="hero-copy"><div className="cover-serial">FIRST PUBLISH / 5 STEPS · 只做一件事</div><div className="eyebrow"><Bot size={15}/> 給零基礎朋友的首次發布模型盒</div><h1>由第一個 Folder，<em>做到第一條網址。</em></h1><p>你只需跟著畫面找按鈕。每完成一個小動作，下一步才會自動打開。</p><button className="primary-cta" onClick={()=>document.getElementById("stage")?.scrollIntoView({behavior:"smooth"})}>開始第 01 步 <ArrowRight size={17}/></button></div><div className="journey-art"><img src={heroUrl} alt="小守護員正在砌網站模型"/><div className="illustration-message"><b>先讓小可愛</b><span>歡迎你。</span></div><div className="reward-bubble"><b>你的第一個目標</b><span>手機也能開的歡迎主頁</span></div></div></section>
 <section className="tool-road"><div><TerminalSquare size={18}/><b>VS Code</b><small>建立檔案</small></div><i/><div><Github size={18}/><b>GitHub</b><small>存私人版本</small></div><i/><div><Rocket size={18}/><b>Vercel</b><small>發出網址</small></div></section><section className="success-promise"><div><b>今晚完成後，你會有甚麼？</b><p>一條 <code>https://你的名字.vercel.app</code> 網址；朋友一按就會看到你親手做的歡迎頁。</p></div><span><Check size={18}/> 每步有結果才前進</span></section>
 <section className="journey-layout" id="stage"><aside className="workbench-rail"><div className="journey-score"><span>首次發布分數</span><b>{score}</b><small>{completed.length} / {steps.length} 關完成 · {progress}%</small><div className="progress-track"><i style={{width:`${progress}%`}}/></div></div><StepNav activeId={active.id} completed={completed} unlocked={unlocked} onChoose={choose}/></aside>
 <article className="build-stage journey-stage"><div className="stage-ribbon"><span>第 {active.number} 關 · 動作 {String(guideIndex+1).padStart(2,"0")} / {String(active.guides.length).padStart(2,"0")}</span><b>{toolIcon(active.tool)} {active.tool}</b><em>完成這關會得到：{active.reward}</em></div><div className="stage-heading guide-heading"><div><p className="section-label">現在只做這個動作</p><h2>{guide.title}</h2><p>{active.goal}</p></div><GuideVisual guide={guide}/></div>
 <section className="single-action-card"><div className="find-line"><span><MousePointer2 size={15}/> 先去哪裡找？</span><b>{active.tool}</b></div><div className="instruction-row"><span className="action-number">{active.number}.{guideIndex+1}</span><div><h3>{guide.instruction}</h3><p>{guide.detail}</p></div></div>{guide.link&&<a className="official-link" href={guide.link.href} target="_blank" rel="noreferrer">{guide.link.label}<ExternalLink size={15}/></a>}<div className="result-strip"><CheckCircle2 size={18}/><div><b>按完後，你應該看到</b><span>{guide.result}</span></div></div>{guide.tip&&<div className="coach-note compact"><CircleHelp size={18}/><p><b>小守護員提示</b>{guide.tip}</p></div>}</section>
 {codeKey&&<>{availableCodes.length>1&&<div className="toggle-row">{availableCodes.map(item=><button key={item} onClick={()=>setVariant(item)} className={codeKey===item?"mini-tab active":"mini-tab"}>{item==="macFiles"?"macOS":item==="windowsFiles"?"Windows":item}</button>)}</div>}<CodeBlock code={codeTemplates[codeKey]} fileName={fileNames[codeKey]} caption="按右上「複製 code」→ 點指定位置 → 貼上 → 按 Enter 或儲存。整張複製，不要漏行。"/></>}
 <div className="action-controls">{guideIndex>0?<button className="back-action" onClick={previousAction}><ArrowLeft size={16}/> 回上一個動作</button>:<span/>}<button className="finish-step" onClick={nextAction}>{guideIndex===active.guides.length-1?completed.includes(active.id)?"這關已完成，下一關":"完成這關，解鎖下一關":`我已完成 ${active.number}.${guideIndex+1}，下一步`}<ArrowRight size={16}/></button></div></article></section>
 <section className="deep-later"><div><p className="section-label">成功發布後，再慢慢學</p><h2>下一模型盒，才是登入、Dashboard 和安全。</h2><p>你先完成一個真的能更新的網站。下一階段才接上 Firebase，讓朋友登入和安全處理資料。</p></div><div className="principle-stamps"><span><b>VS</b> 改三個檔案</span><span><b>GH</b> 私人保存版本</span><span><b>VE</b> 變成正式網址</span><span><b>2</b> 下一階段：登入與安全</span></div></section></main>
 <footer>首次發布模型盒 · <a href="https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository" target="_blank" rel="noreferrer">GitHub New repository <ExternalLink size={13}/></a><a href="https://vercel.com/docs/git" target="_blank" rel="noreferrer">Vercel New Project <ExternalLink size={13}/></a></footer></div>;
}
