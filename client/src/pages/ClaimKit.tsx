import { useState } from "react";
import { CheckCircle2, CloudCog, Code2, Database, FileLock2, Globe2, KeyRound, MonitorPlay, ShieldCheck, UploadCloud } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { KitFooter, KitHeader, LessonPager } from "@/components/KitHeader";
import { claimCode } from "../data/claimCode";

const claimHeroUrl = "/manus-storage/modelkit-claim-hero-white_aaf5e8b0.png";
const securityMascotUrl = "/manus-storage/guardian-model-github-lock_c014df84.png";
const folderMascotUrl = "/manus-storage/guardian-model-folder-open_fb5db00d.png";

type Sample = keyof typeof claimCode;
function HumanSteps({ steps, tip }: { steps: string[]; tip?: string }) {
  return <><ol className="human-steps">{steps.map((step) => <li key={step}>{step}</li>)}</ol>{tip && <aside className="guardian-tip"><b>小守護員提示</b><p>{tip}</p></aside>}</>;
}
const samples: { id: Sample; label: string; file: string; note: string }[] = [
  { id:"indexHtml", label:"管理員登入", file:"index.html", note:"只允許 YOUR_ADMIN_EMAIL 登入；沒有會員註冊按鈕。" },
  { id:"dashboardHtml", label:"管理主頁", file:"dashboard.html", note:"小守護員控制台可查看全部 Claim、開收據及改狀態。" },
  { id:"firestoreRules", label:"管理員 Rules", file:"Firestore → Rules", note:"只有指定管理員 Email 可讀取、建立、更新或刪除 Claim。" },
  { id:"storageRules", label:"收據 Rules", file:"Storage → Rules", note:"只有指定管理員 Email 可讀取或寫入 claims 收據。" },
  { id:"vercelJson", label:"HTTPS header", file:"vercel.json", note:"加入基本瀏覽器保護 header；HTTPS 由 Vercel 網址與正式網域設定提供。" },
];

const claimJourney = [
  { title:"確認前四課已完成", action:"GitHub 已有 repository；Firebase 已有 Project；Vercel 可登入。", result:"你不會在第五課才回頭找帳戶或網址。" },
  { title:"先建立管理員帳戶", action:"Firebase Authentication → Users → Add user，手動建立管理員 Email／密碼。", result:"有一個可登入的管理員帳戶。" },
  { title:"再替換 Claim 網站檔案", action:"在 GitHub repository 內放入 index.html、dashboard.html、vercel.json。", result:"GitHub 有管理員 Claim 控制台所需檔案。" },
  { title:"最後貼兩份管理員 Rules", action:"規則貼在 Firebase 的 Firestore／Storage → Rules，不是貼進 VS Code。", result:"兩個 Rules 都顯示 Publish。" },
  { title:"用 Vercel 部署和測試", action:"回第 4 課 Import repository，用指定管理員 Email 登入正式網址。", result:"只有管理員能進入 Claim 控制台。" }
];

export default function ClaimKit() {
  const [active, setActive] = useState<Sample>("indexHtml");
  const sample = samples.find((item) => item.id === active)!;
  return <div className="kit-page"><KitHeader active={5}/><main className="kit-main">
    <section className="claim-hero-image"><img src={claimHeroUrl} className="hero-guardian" alt="小守護員正在砌登入與安全 Claim 網站模型"/></section>
    <section className="kit-hero claim-hero-copy"><div><p className="kit-kicker">LESSON 05 / 05 · 管理員專用 Claim 控制台</p><h1>把第一條網址，<em>砌成你的管理主頁。</em></h1><p>第五課會把前四課組合成亮白守護員登入頁和 Claim 控制台。沒有會員註冊；只有指定的管理員 Email 可登入、查看紀錄及更新狀態。</p><div className="kit-pills"><span><KeyRound/> Admin Auth</span><span><Database/> Claim Console</span><span><Globe2/> HTTPS 發布</span></div><a className="tool-guide-launch" href="/lesson-4-firebase"><MonitorPlay size={17}/> Firebase 未設定？先回第 4 課</a></div><div className="kit-diagram"><div className="diagram-node"><KeyRound/>管理員登入</div><i/><div className="diagram-node"><Database/>Claim 管理</div><i/><div className="diagram-node strong"><ShieldCheck/>Admin Rules</div></div></section>
    <section className="lesson-task-map claim-task-map"><p className="action-label">第五課照這五步走；先建立管理員，再貼 code 和 Rules</p><ol>{claimJourney.map((item, index) => <li key={item.title}><b>{index+1}</b><div><strong>{item.title}</strong><span>{item.action}</span><small>完成後：{item.result}</small></div></li>)}</ol></section>
    <section className="real-files-strip"><img className="mascot-inline mascot-folder" src={folderMascotUrl} alt="小守護員帶著資料夾"/><div><b>完成 Firebase 後，才把 3 個管理主頁檔案交給 Vercel</b><p>這三個檔案在 GitHub repository；兩份管理員 Rules 則要回 Firebase Console 的 Rules 分頁貼上。</p></div><ol><li><span>01</span><b>index.html</b><small>管理員登入</small></li><li><span>02</span><b>dashboard.html</b><small>守護員 Claim 控制台</small></li><li><span>03</span><b>vercel.json</b><small>/ 及 /dashboard 路由</small></li></ol></section>
    <section className="kit-warning"><FileLock2 size={20}/><p><b>開始前先知道：</b>這是管理員專用 Claim 控制台，不提供會員註冊或會員端提交表單。請先在 Firebase Authentication 手動建立指定管理員帳戶；不要把 Firebase 的 Service Account、管理員密碼或任何私人憑證放進 GitHub 或前端檔案。</p></section>
    <section className="kit-section" data-part="01" id="code"><div className="section-tab">PART 01 · 重寫網站 code</div><h2>先將 3 個網站檔案放到 GitHub；兩份 Rules 稍後回 Firebase 貼上。</h2><p className="section-lead">每次只處理一張 code 卡：選檔案、複製完整 code、回同名位置貼上。看到「Firestore → Rules」或「Storage → Rules」時，代表那份 code 要貼進 Firebase，不是 VS Code。</p><div className="code-tab-row">{samples.map(item=><button className={item.id === active ? "code-tab active" : "code-tab"} onClick={()=>setActive(item.id)} key={item.id}>{item.label}</button>)}</div><div className="sample-explain"><Code2 size={18}/><div><b>{sample.file}</b><span>{sample.note}</span></div></div><CodeBlock code={claimCode[active]} fileName={sample.file}/><HumanSteps steps={[`確認上方目前選的是 ${sample.file}`, "按「複製 code」一次", `回同名 ${sample.file}，先全選舊內容，再貼上完整 code`]} tip="完成一張 code 卡才按下一個標籤；不要把不同檔案的 code 混在一起。"/></section>
    <section className="kit-section split-kit" data-part="02" id="firebase"><div><div className="section-tab">PART 02 · Firebase 後台</div><h2>先開 Email 登入並手動建立管理員，再接上網站和兩個資料服務。</h2><div className="console-steps"><article><b>01</b><div><h3>先開啟 Email／Password</h3><p className="step-where">Firebase Console → Build → Authentication → Sign-in method。</p><HumanSteps steps={["按 Get started", "選 Email/Password", "把第一個開關設為 Enabled，再按 Save"]} tip="這個版本只用 Email/Password；暫時不用開其他登入方式。"/></div></article><article><b>02</b><div><h3>手動建立管理員帳戶</h3><p className="step-where">Firebase Console → Authentication → Users → Add user。</p><HumanSteps steps={["按 Add user", "輸入你準備放進 YOUR_ADMIN_EMAIL 的 Email 和強密碼", "按 Add user，保留這個 Email"]} tip="這是唯一可以登入控制台的帳戶；沒有註冊頁面給一般會員。"/></div></article><article><b>03</b><div><h3>建立 Web app 和 firebaseConfig</h3><p className="step-where">Firebase Console → Project Overview → Web 圖示 <code>&lt;/&gt;</code>。</p><HumanSteps steps={["按 Web 圖示，再輸入 app nickname", "按 Register app", "複製 firebaseConfig，貼到 index.html 和 dashboard.html 的 YOUR_... 位置"]} tip="同一組 firebaseConfig 要貼進兩個 HTML 檔案。"/></div></article><article><b>04</b><div><h3>建立 Firestore，再貼管理員 Rules</h3><p className="step-where">Build → Firestore Database → Create database。</p><HumanSteps steps={["建立資料庫並選資料位置", "開 Rules 分頁", "貼上「管理員 Rules」卡；改好管理員 email 後才按 Publish"]} tip="Rules 要貼在 Firebase 的 Firestore → Rules，不是貼進 VS Code。"/></div></article><article><b>05</b><div><h3>建立 Storage，再貼收據 Rules</h3><p className="step-where">Build → Storage → Get started。</p><HumanSteps steps={["完成 Storage 建立", "開 Rules 分頁", "貼上「收據 Rules」卡，再按 Publish"]} tip="不要保留測試模式的公開規則；Publish 後才會套用管理員限制。"/></div></article></div></div><aside className="test-panel"><img className="mascot-inline mascot-security" src={securityMascotUrl} alt="小守護員指向安全盾牌"/><CloudCog size={24}/><h3>管理員登入測試</h3><p>每次發布 Rules 後都要做，確認指定管理員真的能進入而非管理員帳戶會被拒絕。</p><ol><li>用 YOUR_ADMIN_EMAIL 登入正式網址，應進入管理主頁。</li><li>確認能看到 Claim 清單、開收據並更新狀態。</li><li>用另一個帳戶登入，應被自動登出並回到登入頁。</li></ol><small>Firestore Rules 模擬器可在 Firestore → Rules 開啟，先測試再 Publish。[1]</small></aside></section>
    <section className="kit-section" data-part="03" id="https"><div className="section-tab">PART 03 · Vercel HTTPS</div><h2>正式網址由 Vercel 發出；先測管理員登入，才考慮分享或加自訂網域。</h2><div className="https-grid"><article><span>01</span><h3>先貼 vercel.json</h3><HumanSteps steps={["把「HTTPS header」code 卡完整放進 repository 根目錄的 vercel.json", "確認 / 開 index.html", "確認 /dashboard 開 dashboard.html"]} tip="這個檔案同時加上基本安全 header。"/></article><article><span>02</span><h3>再用 .vercel.app 測試</h3><HumanSteps steps={["從 GitHub import 專案並完成 Deploy", "打開 Vercel 提供的 HTTPS 網址", "用指定管理員 Email 測試登入、Claim 清單、Rules 和手機版"]} tip="先確認管理員控制台正常，再交給真正的管理者使用。"/></article><article><span>03</span><h3>最後加自訂網域</h3><HumanSteps steps={["到 Vercel Project → Settings → Domains → Add Domain", "跟畫面設定 DNS", "等待驗證成功，再交出正式 HTTPS 網址"]} tip="main branch 更新會更新正式部署；其他 branch 會產生 Preview。[2]"/></article></div></section>
    <section className="kit-section secure-finish"><div><p className="section-tab">完成清單</p><h2>完成第五課，才正式啟用管理控制台。</h2><ul><li><CheckCircle2/> GitHub repository 保持 Private，未放 Service Account、管理員密碼或其他私密檔案。</li><li><CheckCircle2/> Firebase Authentication 已開 Email/Password，並已手動建立指定管理員帳戶。</li><li><CheckCircle2/> index.html、dashboard.html、Firestore Rules、Storage Rules 的 YOUR_ADMIN_EMAIL 完全相同，兩份 Rules 已 Publish。</li><li><CheckCircle2/> Vercel 正式 HTTPS 網址和手機版已實測；管理員登入後能查看 Claim 並更新狀態。</li></ul></div><ShieldCheck className="finish-shield"/></section><LessonPager current={5}/>
  </main><KitFooter/></div>;
}
