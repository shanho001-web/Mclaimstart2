/**
 * Design philosophy: Model Workbench — every stage teaches one tool, produces
 * one visible reward, and unlocks a small amount of confidence before theory.
 */
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, Bot, Boxes, Check, CircleHelp, ExternalLink, FolderTree, Github, Globe2, LockKeyhole, Rocket, ShieldCheck, Sparkles, TerminalSquare } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { StepNav } from "@/components/StepNav";
import { codeTemplates, steps, type CodeKey } from "../data/course";

const logoUrl = "/manus-storage/modelkit-logo_f86a875b.png";
const heroUrl = "/manus-storage/modelkit-hero_49f2565d.png";
const codeMascotUrl = "/manus-storage/modelkit-mascot-code_cf331196.png";
const uploadMascotUrl = "/manus-storage/modelkit-mascot-upload_dd6157ed.png";

const fileNames: Record<CodeKey, string> = {
  macSetup:"macOS Terminal", windowsSetup:"Windows PowerShell", cuteHome:"index.html", githubCommands:"VS Code Terminal", vercelJson:"vercel.json", loginHome:"index.html", dashboard:"dashboard.html", firestoreRules:"Firestore Rules", storageRules:"Storage Rules"
};

const toolIcon = (tool: string) => tool.includes("GitHub") ? <Github size={18} /> : tool.includes("Vercel") ? <Rocket size={18} /> : tool.includes("Security") ? <ShieldCheck size={18} /> : tool.includes("Authentication") ? <LockKeyhole size={18} /> : tool.includes("VS Code") ? <TerminalSquare size={18} /> : <Boxes size={18} />;

export default function Home() {
  const [activeId, setActiveId] = useState("vscode");
  const [completed, setCompleted] = useState<string[]>(() => JSON.parse(localStorage.getItem("modelkit-journey") || "[]"));
  const [codeVariant, setCodeVariant] = useState<CodeKey | null>(null);
  const active = useMemo(() => steps.find((step) => step.id === activeId) || steps[0], [activeId]);
  const score = completed.length * 125;
  const progress = Math.round(completed.length / steps.length * 100);
  const codeKey = codeVariant || active.code;

  useEffect(() => localStorage.setItem("modelkit-journey", JSON.stringify(completed)), [completed]);
  useEffect(() => setCodeVariant(null), [activeId]);
  function choose(id: string) { setActiveId(id); document.getElementById("stage")?.scrollIntoView({ behavior: "smooth", block: "start" }); }
  function complete() { if (!completed.includes(active.id)) setCompleted((all) => [...all, active.id]); const next = steps[steps.findIndex((item) => item.id === active.id) + 1]; if (next) choose(next.id); }

  const mascotHint: Record<string, string> = { vscode:"先砌好工作枱，我陪你。", cute:"看到小可愛動，就是成功。", github:"存好這一版，改錯也不怕。", vercel:"先看 Preview，再交給朋友。", login:"大門只認得真正登入的人。", dashboard:"收據會跟著自己的 UID 回家。", security:"按鈕可以改，Rules 不會被騙。", why:"你已經親手砌出第一版。" };
  return <div className="app-shell journey-shell">
    <header className="site-header">
        <a href="#top" className="brand"><img src={logoUrl} alt="網站模型設計圖圖標" /><span><b>網站模型</b><small>DESIGN KIT · 闖關版</small></span></a>
      <div className="header-status"><Sparkles size={15} /> {score} 分 · 先做到，再明白</div>
    </header>
    <main id="top">
      <section className="journey-hero">
        <div className="hero-copy"><div className="cover-serial">MODEL KIT / BUILD 01 · 由零開始</div><div className="eyebrow"><Bot size={15} /> 給朋友的一盒網站模型</div><h1>唔使識 IT，<em>一關一關</em>砌出你的網站。</h1><p>第一關只需開 VS Code，貼一段指令，就會看到自己的小可愛主頁。之後才慢慢認識 GitHub、Vercel、登入、Dashboard 和真正的安全設定。</p><button className="primary-cta" onClick={() => document.getElementById("stage")?.scrollIntoView({behavior:"smooth"})}>由第一關開始 <ArrowRight size={17} /></button></div>
        <div className="journey-art"><img src={heroUrl} alt="小守護員正在砌網站模型" /><div className="reward-bubble"><b>第一個成果</b><span>會動的小可愛主頁</span></div></div>
      </section>
      <section className="tool-road" aria-label="建站旅程"><div><TerminalSquare size={18}/><b>VS Code</b><small>砌骨架</small></div><i/><div><Github size={18}/><b>GitHub</b><small>存版本</small></div><i/><div><Globe2 size={18}/><b>Vercel</b><small>送上網</small></div><i/><div><ShieldCheck size={18}/><b>Firebase</b><small>加身分和保安</small></div></section>

      <section className="journey-layout" id="stage">
        <aside className="workbench-rail"><div className="journey-score"><span>你的小守護員分數</span><b>{score}</b><small>{completed.length} / {steps.length} 關完成 · {progress}%</small><div className="progress-track"><i style={{width:`${progress}%`}}/></div></div><StepNav activeId={active.id} completed={completed} onChoose={choose}/></aside>
        <article className="build-stage journey-stage">
          <div className="stage-ribbon"><span>第 {active.number} 關</span><b>{toolIcon(active.tool)} {active.tool}</b><em>完成獎勵：{active.reward}</em></div>
          <div className="stage-heading"><div><p className="section-label">今關只學一個工具</p><h2>{active.title}</h2><p>{active.goal}</p></div><div className="mascot-checkpoint">{["vscode","cute","github","login"].includes(active.id) ? <img className="mascot-float" src={codeMascotUrl} alt="小守護員在旁協助"/> : <img className="mascot-float" src={uploadMascotUrl} alt="小守護員在旁協助"/>}<span>{mascotHint[active.id]}</span></div></div>
          {active.id === "vscode" && <div className="folder-preview"><div className="tree-title"><FolderTree size={18}/> 你完成後會看到這個資料夾</div><pre>newclaim-starter/{'\n'}├── index.html{'\n'}├── dashboard.html{'\n'}├── vercel.json{'\n'}└── firebase/{'\n'}    ├── firestore.rules{'\n'}    └── storage.rules</pre></div>}
          <div className="action-board"><div className="action-board-title"><span>先做這三件事</span><small>不用跳關；完成一件就看一件成果。</small></div><ol>{active.actions.map((action, index)=><li key={action}><b>{String(index+1).padStart(2,"0")}</b><p>{action}</p></li>)}</ol></div>
          {active.note && <div className="coach-note"><CircleHelp size={19}/><p><b>小守護員提示</b>{active.note}</p></div>}
          {codeKey && <>{active.id === "vscode" && <div className="toggle-row"><button className={codeKey === "macSetup" ? "mini-tab active":"mini-tab"} onClick={()=>setCodeVariant("macSetup")}>macOS</button><button className={codeKey === "windowsSetup" ? "mini-tab active":"mini-tab"} onClick={()=>setCodeVariant("windowsSetup")}>Windows</button></div>}{active.id === "security" && <div className="toggle-row"><button className={codeKey === "firestoreRules" ? "mini-tab active":"mini-tab"} onClick={()=>setCodeVariant("firestoreRules")}>Firestore Rules</button><button className={codeKey === "storageRules" ? "mini-tab active":"mini-tab"} onClick={()=>setCodeVariant("storageRules")}>Storage Rules</button></div>}<CodeBlock code={codeTemplates[codeKey]} fileName={fileNames[codeKey]} caption="完整複製 → 貼到指定位置 → 將 YOUR_... 換成自己的資料 → 儲存。" /></>}
          <div className="verify-card"><div className="verify-title"><BadgeCheck size={20}/><div><b>今關驗收：你應該看到</b><small>三個現象都出現，才算真的完成。</small></div></div><ul>{active.checks.map(check=><li key={check}><span/>{check}</li>)}</ul><button className="finish-step" onClick={complete}>{completed.includes(active.id) ? "已完成，去下一關" : "完成這一關，拿分！"} <ArrowRight size={16}/></button></div>
        </article>
      </section>
      <section className="deep-later"><div><p className="section-label">最後才打開原理盒</p><h2>你先成功，原理才會變得好玩。</h2><p>當你已親手看到主頁、網址、登入與報帳，才回頭看每個工具的職責：VS Code 是工作枱，GitHub 是時間盒，Vercel 是發布線，Firebase Rules 是不會被按鈕騙過的守門員。</p></div><div className="principle-stamps"><span><b>VS</b> 寫和看</span><span><b>GH</b> 記每次改動</span><span><b>VE</b> 先預覽再發布</span><span><b>FB</b> 核對身分和資料</span></div></section>
    </main>
    <footer>網站模型闖關版 · 先完成一小關，再多懂一點。 <a href="https://firebase.google.com/docs/firestore/security/get-started" target="_blank" rel="noreferrer">Firebase Rules 文件 <ExternalLink size={13}/></a></footer>
  </div>;
}
