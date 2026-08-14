/** Design philosophy: Model Workbench — first publish a joyful page, then add complexity later. */
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, Bot, Check, CircleHelp, ExternalLink, Github, Globe2, LockKeyhole, Rocket, Sparkles, TerminalSquare } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { StepNav } from "@/components/StepNav";
import { codeTemplates, steps, type CodeKey } from "../data/course";

const logoUrl = "/manus-storage/modelkit-logo_f86a875b.png";
const heroUrl = "/manus-storage/modelkit-hero_49f2565d.png";
const codeMascotUrl = "/manus-storage/modelkit-mascot-code_cf331196.png";
const uploadMascotUrl = "/manus-storage/modelkit-mascot-upload_dd6157ed.png";
const fileNames: Record<CodeKey,string> = { macFiles:"macOS Terminal", windowsFiles:"Windows PowerShell", indexHtml:"index.html", styleCss:"style.css", scriptJs:"script.js", gitPush:"VS Code Terminal" };

const toolIcon=(tool:string)=>tool.includes("GitHub")?<Github size={18}/>:tool.includes("Vercel")?<Rocket size={18}/>:tool.includes("VS Code")?<TerminalSquare size={18}/>:<Globe2 size={18}/>;

export default function Home(){
 const [activeId,setActiveId]=useState("vscode");
 const [completed,setCompleted]=useState<string[]>(()=>JSON.parse(localStorage.getItem("first-publish-journey")||"[]"));
 const [variant,setVariant]=useState<CodeKey|null>(null);
 const active=useMemo(()=>steps.find(step=>step.id===activeId)||steps[0],[activeId]);
 const score=completed.length*200,progress=Math.round(completed.length/steps.length*100),codeKey=variant||active.code;
 useEffect(()=>localStorage.setItem("first-publish-journey",JSON.stringify(completed)),[completed]);
 useEffect(()=>setVariant(null),[activeId]);
 function choose(id:string){setActiveId(id);document.getElementById("stage")?.scrollIntoView({behavior:"smooth",block:"start"});}
 function finish(){if(!completed.includes(active.id))setCompleted(all=>[...all,active.id]);const next=steps[steps.findIndex(step=>step.id===active.id)+1];if(next)choose(next.id);}
 const mascotHint:Record<string,string>={vscode:"我幫你看住工作枱。",welcome:"有動畫就代表成功！",github:"存好這一版，改錯也不怕。",vercel:"Ready 後，朋友就能看見。",update:"你剛學會真正更新網站。"};
 return <div className="app-shell journey-shell"><header className="site-header"><a href="#top" className="brand"><img src={logoUrl} alt="網站模型設計圖圖標"/><span><b>網站模型</b><small>FIRST PUBLISH KIT</small></span></a><div className="header-status"><Sparkles size={15}/>{score} 分 · 先成功，再進階</div></header>
 <main id="top"><section className="journey-hero"><div className="hero-copy"><div className="cover-serial">FIRST PUBLISH / 5 STEPS · 只做一件事</div><div className="eyebrow"><Bot size={15}/> 給零基礎朋友的首次發布模型盒</div><h1>先讓小可愛<br/><em>真的上網歡迎你。</em></h1><p>第一階段不教 claim、不教資料庫。只要照住做：在 VS Code 建三個檔案，放進 GitHub 的 Private repository，再由 Vercel 發出第一條正式網址。</p><button className="primary-cta" onClick={()=>document.getElementById("stage")?.scrollIntoView({behavior:"smooth"})}>由第一步開始 <ArrowRight size={17}/></button></div><div className="journey-art"><img src={heroUrl} alt="小守護員正在砌網站模型"/><div className="reward-bubble"><b>你的第一個目標</b><span>手機也能開的歡迎主頁</span></div></div></section>
 <section className="tool-road"><div><TerminalSquare size={18}/><b>VS Code</b><small>建立檔案</small></div><i/><div><Github size={18}/><b>GitHub</b><small>存私人版本</small></div><i/><div><Rocket size={18}/><b>Vercel</b><small>發出網址</small></div></section>
 <section className="success-promise"><div><b>今晚完成後，你會有甚麼？</b><p>一條 <code>https://你的名字.vercel.app</code> 網址；朋友一按就會看到你親手做的歡迎頁。</p></div><span><Check size={18}/> 不需要先學程式理論</span></section>
 <section className="journey-layout" id="stage"><aside className="workbench-rail"><div className="journey-score"><span>首次發布分數</span><b>{score}</b><small>{completed.length} / {steps.length} 關完成 · {progress}%</small><div className="progress-track"><i style={{width:`${progress}%`}}/></div></div><StepNav activeId={active.id} completed={completed} onChoose={choose}/></aside>
 <article className="build-stage journey-stage"><div className="stage-ribbon"><span>第 {active.number} 步</span><b>{toolIcon(active.tool)} {active.tool}</b><em>你會得到：{active.reward}</em></div><div className="stage-heading"><div><p className="section-label">現在只做這一件</p><h2>{active.title}</h2><p>{active.goal}</p></div><div className="mascot-checkpoint"><img className="mascot-float" src={active.id==="welcome"||active.id==="update"?uploadMascotUrl:codeMascotUrl} alt="小守護員在旁協助"/><span>{mascotHint[active.id]}</span></div></div>
 <div className="action-board"><div className="action-board-title"><span>跟住按，不需要跳步</span><small>做完一格，再看下一格。</small></div><ol>{active.actions.map((action,i)=><li key={action}><b>{String(i+1).padStart(2,"0")}</b><p>{action}</p></li>)}</ol></div>
 {active.note&&<div className="coach-note"><CircleHelp size={19}/><p><b>小守護員提醒</b>{active.note}</p></div>}
 {codeKey&&<>{active.id==="vscode"&&<div className="toggle-row"><button onClick={()=>setVariant("macFiles")} className={codeKey==="macFiles"?"mini-tab active":"mini-tab"}>macOS</button><button onClick={()=>setVariant("windowsFiles")} className={codeKey==="windowsFiles"?"mini-tab active":"mini-tab"}>Windows</button></div>}{active.id==="welcome"&&<div className="toggle-row"><button onClick={()=>setVariant("indexHtml")} className={codeKey==="indexHtml"?"mini-tab active":"mini-tab"}>index.html</button><button onClick={()=>setVariant("styleCss")} className={codeKey==="styleCss"?"mini-tab active":"mini-tab"}>style.css</button><button onClick={()=>setVariant("scriptJs")} className={codeKey==="scriptJs"?"mini-tab active":"mini-tab"}>script.js</button></div>}<CodeBlock code={codeTemplates[codeKey]} fileName={fileNames[codeKey]} caption="完整複製 → 貼到指定檔案／終端機 → 儲存；不要只複製其中幾行。"/></>}
 <div className="verify-card"><div className="verify-title"><BadgeCheck size={20}/><div><b>完成後你一定要看到</b><small>三項都做到，就按黃色按鈕前往下一步。</small></div></div><ul>{active.checks.map(check=><li key={check}><span/>{check}</li>)}</ul><button className="finish-step" onClick={finish}>{completed.includes(active.id)?"已完成，前往下一步":"這一步成功了！"}<ArrowRight size={16}/></button></div></article></section>
 <section className="deep-later"><div><p className="section-label">成功發布後，再慢慢學</p><h2>下一模型盒，才是登入、Dashboard 和安全。</h2><p>第一個網站成功上線後，你已掌握最重要的節奏：改 code、存版本、發布網址。下一階段才會接上 Firebase，讓朋友登入和安全處理資料。</p></div><div className="principle-stamps"><span><b>VS</b> 改三個檔案</span><span><b>GH</b> 私人保存版本</span><span><b>VE</b> 變成正式網址</span><span><b>2</b> 下一階段：登入與安全</span></div></section></main>
 <footer>首次發布模型盒 · GitHub 私人 repository 與 Vercel 發布步驟以官方文件為準。 <a href="https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository" target="_blank" rel="noreferrer">GitHub New repository <ExternalLink size={13}/></a><a href="https://vercel.com/docs/git" target="_blank" rel="noreferrer">Vercel New Project <ExternalLink size={13}/></a></footer></div>;
}
