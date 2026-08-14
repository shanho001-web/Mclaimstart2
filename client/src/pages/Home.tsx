/**
 * Design philosophy: Model Workbench. The content is taught as a buildable
 * model: each screen has one clear next move, code is a visible part, and
 * completion is locally remembered so a beginner can return without losing place.
 */
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, BookOpenCheck, ChevronDown, CircleHelp, ExternalLink, FolderCog, Rocket, ShieldCheck, Sparkles } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { StepNav } from "@/components/StepNav";
import { codeTemplates, steps, type CodeKey } from "../data/course";

const logoUrl = "/manus-storage/modelkit-logo_f86a875b.png";
const heroUrl = "/manus-storage/modelkit-hero_49f2565d.png";
const codeMascotUrl = "/manus-storage/modelkit-mascot-code_cf331196.png";
const uploadMascotUrl = "/manus-storage/modelkit-mascot-upload_dd6157ed.png";

const fileNames: Record<CodeKey, string> = {
  firebaseConfig: "Firebase 設定.js",
  indexHtml: "index.html",
  dashboardHtml: "dashboard.html",
  firestoreRules: "firestore.rules",
  storageRules: "storage.rules",
  vercelJson: "vercel.json",
};

export default function Home() {
  const [activeId, setActiveId] = useState("start");
  const [completed, setCompleted] = useState<string[]>(() => {
    const saved = localStorage.getItem("modelkit-complete");
    return saved ? JSON.parse(saved) : [];
  });
  const [secondaryCode, setSecondaryCode] = useState<CodeKey | null>(null);
  const [showNotes, setShowNotes] = useState(false);
  const activeStep = useMemo(() => steps.find((step) => step.id === activeId) ?? steps[0], [activeId]);
  const progress = Math.round((completed.length / steps.length) * 100);

  useEffect(() => localStorage.setItem("modelkit-complete", JSON.stringify(completed)), [completed]);
  useEffect(() => { setSecondaryCode(null); setShowNotes(false); }, [activeId]);

  function markComplete() {
    if (!completed.includes(activeId)) setCompleted((items) => [...items, activeId]);
    const currentIndex = steps.findIndex((step) => step.id === activeId);
    if (currentIndex < steps.length - 1) setActiveId(steps[currentIndex + 1].id);
  }

  const codeKey = secondaryCode ?? activeStep.code;
  const isRuleStep = activeStep.id === "rules";

  return (
    <div className="app-shell">
      <header className="site-header">
        <a href="#top" className="brand" aria-label="網站模型設計圖首頁">
          <img src={logoUrl} alt="網站模型設計圖圖標" />
          <span><b>網站模型</b><small>設計圖</small></span>
        </a>
        <div className="header-status"><ShieldCheck size={16} /> 先試後出街 <span className="dot" /> 初版模型</div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={15} /> 給零基礎朋友的網站模型盒</div>
            <h1>跟住砌，<em>真的</em>做出<br />你的第一個安全報帳網站。</h1>
            <p>這不是理論課。每一關都給你完整 code、要按的位置，以及完成後應該看到的畫面。由登入大門，砌到朋友可用的正式網址。</p>
            <div className="hero-actions">
              <button className="primary-cta" onClick={() => document.getElementById("workspace")?.scrollIntoView({ behavior: "smooth" })}>打開模型盒 <ArrowRight size={17} /></button>
              <span className="tiny-proof"><BadgeCheck size={17} /> 八個可自測零件</span>
            </div>
          </div>
          <div className="hero-art"><img src={heroUrl} alt="網站模型由程式、儲存庫、資料庫和部署方塊組成的插圖" /></div>
        </section>

        <section className="promise-strip">
          <div><span className="promise-icon blue"><BookOpenCheck size={18} /></span><p><b>不是叫你猜</b><small>每段 code 都有檔案位置和完成驗收。</small></p></div>
          <div><span className="promise-icon orange"><FolderCog size={18} /></span><p><b>先砌初版</b><small>登入、報帳、收據、資料隔離已足夠開始。</small></p></div>
          <div><span className="promise-icon navy"><Rocket size={18} /></span><p><b>先 Preview 後上線</b><small>朋友只會見到測試成功的正式版本。</small></p></div>
        </section>

        <section id="workspace" className="workbench">
          <aside className="workbench-rail">
            <div className="progress-card">
              <span>你的模型進度</span><b>{progress}%</b>
              <div className="progress-track"><i style={{ width: `${progress}%` }} /></div>
              <small>{completed.length} / {steps.length} 件零件已完成</small>
            </div>
            <StepNav activeId={activeId} completed={completed} onChoose={setActiveId} />
          </aside>

          <article className="build-stage">
            <div className="stage-topline"><span className="part-badge">零件 {activeStep.number}</span><span className="file-path">{activeStep.place}</span></div>
            <div className="stage-heading">
              <div><p className="section-label">現在砌這一件</p><h2>{activeStep.title}</h2><p>{activeStep.goal}</p></div>
              {(activeStep.id === "frontdoor" || activeStep.id === "github") && <img className="mascot-float" src={codeMascotUrl} alt="小守護員正在檢查程式" />}
              {(activeStep.id === "workroom" || activeStep.id === "rules") && <img className="mascot-float" src={uploadMascotUrl} alt="小守護員正在安全整理收據" />}
            </div>

            {activeStep.note && <div className="coach-note"><CircleHelp size={19} /><p><b>小守護員建議</b>{activeStep.note}</p></div>}

            {codeKey && <>
              {isRuleStep && <div className="toggle-row">
                <button onClick={() => setSecondaryCode("firestoreRules")} className={codeKey === "firestoreRules" ? "mini-tab active" : "mini-tab"}>Firestore Rules</button>
                <button onClick={() => setSecondaryCode("storageRules")} className={codeKey === "storageRules" ? "mini-tab active" : "mini-tab"}>Storage Rules</button>
              </div>}
              <CodeBlock code={codeTemplates[codeKey]} fileName={fileNames[codeKey]} caption="全選複製 → 貼到指定檔案 → 將 YOUR_... 換成自己的資料。" />
            </>}

            <div className="verify-card">
              <div className="verify-title"><BadgeCheck size={20} /><div><b>做到這裡，你應該看到</b><small>逐項核對；全部做到才按完成。</small></div></div>
              <ul>{activeStep.checks.map((check) => <li key={check}><span />{check}</li>)}</ul>
              <button className="finish-step" onClick={markComplete}>{completed.includes(activeId) ? "已完成，前往下一件" : "這一件砌好了"} <ArrowRight size={16} /></button>
            </div>
          </article>
        </section>

        <section className="safety-map">
          <div><p className="section-label">砌好後，系統怎樣分工？</p><h2>兩個頁面，三道真正的門。</h2><p>網頁是使用介面；Firebase Authentication 確認身分；Firestore 和 Storage Rules 在伺服器端逐次決定可否讀寫。</p></div>
          <div className="map-grid">
            <div className="map-card"><span className="map-index">01</span><b>index.html</b><p>大門：登入、忘記密碼；成功才帶人去 Dashboard。</p></div>
            <div className="map-card"><span className="map-index">02</span><b>dashboard.html</b><p>工作房：只在登入後讀自己的 claim 和處理自己的收據。</p></div>
            <div className="map-card wide"><span className="map-index">03</span><b>Firebase Rules</b><p>真正守門員：即使有人自己改了網頁按鈕，Rules 仍會驗證 UID、檔案 path 和管理員權限。</p></div>
          </div>
        </section>

        <section className="final-check">
          <div><span className="final-stamp"><ShieldCheck size={30} /></span><h2>交給朋友之前，做最後三人測試。</h2><p>會員 A 提交；會員 B 嘗試查看；管理員審批。這次測試比任何「看起來安全」都重要。</p></div>
          <div className="test-list"><p><b>A</b> 能提交自己的 claim 和收據</p><p><b>B</b> 看不到、改不到 A 的資料</p><p><b>管</b> 能審批，A 之後不能刪已審批 claim</p></div>
        </section>
      </main>
      <footer>網站模型設計圖 · 先做到初版，再逐步加強。 <a href="https://firebase.google.com/docs/firestore/security/get-started" target="_blank" rel="noreferrer">查看 Firebase Rules 文件 <ExternalLink size={13} /></a></footer>
    </div>
  );
}
