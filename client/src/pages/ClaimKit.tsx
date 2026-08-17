import { useState } from "react";
import { CheckCircle2, Code2, Database, Globe2, KeyRound, MonitorPlay, ShieldCheck } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { KitFooter, KitHeader, LessonPager } from "@/components/KitHeader";
import { LessonCopyGuide } from "@/components/LessonCopyGuide";
import { FirebaseConfigBreakdown } from "./ToolGuides";
import { claimCode } from "../data/claimCode";

const claimHeroUrl = "/images/guardian-inspector.png";

type Sample = keyof typeof claimCode;
function HumanSteps({ steps, tip }: { steps: string[]; tip?: string }) {
  return <><ol className="human-steps">{steps.map((step) => <li key={step}>{step}</li>)}</ol>{tip && <aside className="guardian-tip"><b>小守護員提示</b><p>{tip}</p></aside>}</>;
}
const samples: { id: Sample; label: string; file: string; note: string; tone?: "firestore" | "storage" }[] = [
  { id:"indexHtml", label:"1 管理員登入", file:"index.html", note:"只允許 YOUR_ADMIN_EMAIL 登入；沒有會員註冊按鈕。" },
  { id:"dashboardHtml", label:"2 管理主頁", file:"dashboard.html", note:"小守護員控制台可查看全部 Claim、開收據及改狀態。" },
  { id:"firestoreRules", label:"1 管理員 Rules", file:"Firestore → Rules", note:"只有指定管理員 Email 可讀取、建立、更新或刪除 Claim。", tone:"firestore" },
  { id:"storageRules", label:"2 收據 Rules", file:"Storage → Rules", note:"只有指定管理員 Email 可讀取或寫入 claims 收據。", tone:"storage" },
  { id:"vercelJson", label:"3 HTTPS header", file:"vercel.json", note:"加入基本瀏覽器保護 header；HTTPS 由 Vercel 網址與正式網域設定提供。" },
];

export const claimAssemblyParts = {
  setup: { title: "PART 00 · Firebase：建立 Project 與 Web app", ids: [] as const },
  website: { title: "PART 01 · VS Code：三個網頁檔案", ids: ["indexHtml", "dashboardHtml", "vercelJson"] as const },
  rules: { title: "PART 02 · Firebase：兩份 Rules", ids: ["firestoreRules", "storageRules"] as const },
};

export const claimFirebaseSetup = {
  where: "瀏覽器 → console.firebase.google.com<br/>→ Add project",
  requirement: "每個 Project 的 firebaseConfig 都不同；複製後暫時保存在記事本，Part 1 貼 code 時逐行填入。",
};

export const claimAdminSetup = {
  where: "Firebase Console → Build → Authentication → Users → Add user",
  requirement: "這個 Email 必須和 index.html、dashboard.html、Firestore Rules、Storage Rules 裡的 YOUR_ADMIN_EMAIL 完全相同。",
};

export const claimCopyInstructions = {
  website: "三個檔案分兩種做法：① index.html：在 VS Code 開原有檔案，全選覆蓋；② dashboard.html：VS Code 左邊 Explorer 按右鍵 → New File 新增，命名 dashboard.html；③ vercel.json：同樣 New File 新增，命名 vercel.json。三個都貼好 code 後，把 code 內 6 個 firebaseConfig 的 YOUR_ 欄位換成自己在 Firebase 複製的真實值，並把 YOUR_ADMIN_EMAIL 改成你打算使用的管理員 Email。",
  rules: "在 Firebase 左邊 Build 選對應服務 → 按 Rules → 回本頁按「複製 code」→ 回 Rules 貼上 → Publish。",
};

export const claimLessonArticle = {
  subtitle: "LESSON 05 / 05 · 管理員專用 CLAIM 控制台",
  title: "把 Claim 控制台接上 Firebase",
  goal: "今課會先建立 Firebase Project 和 Web app（取得 firebaseConfig），再把管理員登入頁和管理主頁放進 VS Code，最後建立管理員帳戶並發布兩份 Rules。前面四課的網站、版本、網址和安全概念已準備好，今課只需把它們集合起來。",
  flow: ["建立 Firebase Project 與 Web app", "替換 index.html", "替換 dashboard.html", "建立唯一管理員", "發布兩份 Rules"],
  standard: "回 Vercel 網址，用管理員 Email 登入後看見守護員管理主頁，而且可查看 Claim、開收據和更新狀態。",
  transition: "本課分三部分完成。先到 Firebase 建立 Project 與 Web app 並複製 firebaseConfig（PART 00）；再留在 VS Code 替換兩個網頁檔案並填入真實設定（PART 01）；最後返回 Firebase 建立唯一管理員，逐一貼 Firestore 和 Storage Rules（PART 02）。程式碼卡內容已準備好，不需要自己重寫。",
};

export default function ClaimKit() {
  const websiteSamples = samples.filter((item) => claimAssemblyParts.website.ids.includes(item.id as (typeof claimAssemblyParts.website.ids)[number]));
  const ruleSamples = samples.filter((item) => claimAssemblyParts.rules.ids.includes(item.id as (typeof claimAssemblyParts.rules.ids)[number]));
  const [websiteActive, setWebsiteActive] = useState<Sample>("indexHtml");
  const [ruleActive, setRuleActive] = useState<Sample>("firestoreRules");
  const websiteSample = samples.find((item) => item.id === websiteActive)!;
  const ruleSample = samples.find((item) => item.id === ruleActive)!;
  return <div className="kit-page"><KitHeader active={5}/><main className="kit-main">
    <section className="claim-hero-image"><img src={claimHeroUrl} className="hero-guardian" alt="小守護員正在砌登入與安全 Claim 網站模型"/></section>
    <p className="claim-hero-caption">先試試做個小工具</p>
    <LessonCopyGuide data={claimLessonArticle}/>
    <div className="claim-page-title"><span className="small">05</span><div><h2>接通資料庫</h2><p>五課所學，今天全部接通。</p></div></div>
    <section className="kit-section" data-part="00" id="firebase-setup"><div className="section-tab">{claimAssemblyParts.setup.title}</div><h2>開始之前：先建立 Firebase Project 和 Web app。</h2><p className="section-lead">如果之前從未在 Firebase 建立過 Project，先完成下面四步，取得你的 <b>firebaseConfig</b>（之後 Part 1 貼 code 時要逐行填入）。已建立過 Project 的話，可以直接跳到 Part 1。</p><div className="admin-setup-quick"><div><KeyRound size={20}/><p>先建立並複製你的 firebaseConfig</p><h3 dangerouslySetInnerHTML={{__html: claimFirebaseSetup.where}} /></div><ol><li>用你的 Google 帳戶登入 Firebase Console（沒有帳戶就按 Create account 建立）。</li><li>按 Add project → 輸入 Project name（例如 claim-site）→ 按 Continue → 完成 Create project。</li><li>進入 Project Overview 後，按中間的 Web 圖示 〈/〉，輸入 App nickname（例如 claim-web），按 Register app。</li><li>畫面上會顯示 6 行 firebaseConfig code；按複製，貼到記事本暫時保存。</li></ol><aside><b>最重要：</b>{claimFirebaseSetup.requirement}</aside></div></section>
    <section className="kit-section" data-part="01" id="website-code"><div className="section-tab">{claimAssemblyParts.website.title}</div><img src="/images/five-files-building-blocks (1).png" className="part-hero-image" alt="五個網站檔案零件圖"/><h2>第一部分：在 VS Code 放好三個網頁檔案。</h2><div className="file-role-list"><div><b>index.html</b><span>前台接待處 — 登入頁，開網站先見到它。<em>做法：開原有檔案，覆蓋。</em></span></div><div><b>dashboard.html</b><span>登入後的管理主頁。<em>第 1 課沒有這檔：右鍵 → New File 手動新增。</em></span></div><div><b>vercel.json</b><span>網站設定檔。<em>同樣 New File 手動新增，不用改欄位。</em></span></div></div><p className="section-lead">三個都放好後，index.html 和 dashboard.html 要把 6 個 firebaseConfig 的 <b>YOUR_</b> 換成 PART 00 複製的真實值，並把 <b>YOUR_ADMIN_EMAIL</b> 改成管理員 Email。</p><FirebaseConfigBreakdown/><p className="code-tab-lead">下面 3 個檔案，每個都要複製 code：</p><div className="code-tab-row">{websiteSamples.map(item=><button className={item.id === websiteActive ? "code-tab active" : "code-tab"} onClick={()=>setWebsiteActive(item.id)} key={item.id}>{item.label}</button>)}</div><div className="sample-explain"><Code2 size={18}/><div><b>{websiteSample.file}</b><span>{websiteSample.note}</span></div></div><CodeBlock code={claimCode[websiteActive]} fileName={websiteSample.file}/><HumanSteps steps={websiteActive === "indexHtml" ? ["VS Code 左邊 Explorer → 開原有 index.html（前台接待處）", "回這張卡按「複製 code」", "回 index.html 按 Ctrl/Cmd + A 全選 → 貼上 → Ctrl/Cmd + S 儲存（覆蓋）", "把 6 個 firebaseConfig 的 YOUR_ 換成真實值，並把 YOUR_ADMIN_EMAIL 改成管理員 Email"] : [`VS Code 左邊 Explorer 空白處按右鍵 → New File`, `輸入 ${websiteActive === "dashboardHtml" ? "dashboard.html（登入後的主頁，第 1 課沒有這檔，要手動新增）" : "vercel.json（網站設定檔，要手動新增）"} 按 Enter`, "回這張卡按「複製 code」→ 回新檔案貼上 → Ctrl/Cmd + S 儲存", ...(websiteActive === "vercelJson" ? ["vercel.json 不需要改欄位；儲存即可"] : ["把 6 個 firebaseConfig 的 YOUR_ 換成真實值，並把 YOUR_ADMIN_EMAIL 改成管理員 Email"])]}/></section>
    <section className="kit-section" data-part="02" id="rules"><div className="section-tab">{claimAssemblyParts.rules.title}</div><h2>第二部分：在 Firebase 建管理員，加入你的 Admin Email 及 防火 Rules。</h2><p className="section-lead">先在 Authentication 建立自己的管理員 Email；再輪流選 Firestore Rules 和 Storage Rules。兩份 code 都要把 <b>YOUR_ADMIN_EMAIL</b> 改成與 Part 1 相同的 Email。如果左側 Build 還沒有 <b>Firestore Database</b> 或 <b>Storage</b>，先按下方「小守護員提示」建立，否則 Rules 沒有地方可以貼。</p><div className="admin-setup-quick"><div><KeyRound size={20}/><p>先加自己做唯一管理員</p><h3>{claimAdminSetup.where}</h3></div><ol className="firebase-tree" aria-label="Firebase Console 樹狀路徑"><li><span className="tree-dir">Build</span><ol><li><span className="tree-dir">Authentication</span><ol><li><span className="tree-dir">Users</span><ol><li className="tree-field"><span>按 Add user</span></li><li className="tree-field"><span>填 Email：你的管理員 Email（與 Part 1 的 YOUR_ADMIN_EMAIL 相同）</span></li><li className="tree-field"><span>填 Password：一組強密碼（自己記住）</span></li><li className="tree-field"><span>按 Add user 完成 → Users 清單出現這個 Email</span></li></ol></li><li className="tree-field"><span>第一次用：先到 Sign-in method → Email/Password → Enabled → Save</span></li></ol></li></ol></li></ol><aside><b>最重要：</b>{claimAdminSetup.requirement}</aside><div className="admin-storage-pre"><b>如果 Build 沒有 Firestore Database 或 Storage：</b><ol><li>Firestore Database → Create database → 選資料位置 → Production mode → Create。</li><li>Storage → Get started → 按畫面完成建立。</li><li>完成後 Build 左側才會出現這兩個服務，可開 Rules 分頁。</li></ol></div></div><p className="section-lead">選下方一份 Rules：在 Firebase 左邊 Build 開對應服務，按 Rules，回本頁複製 code，再回 Rules 貼上和 Publish。完成一份後，再選另一份。</p><div className="code-tab-row">{ruleSamples.map(item=><button className={`code-tab${item.id === ruleActive ? " active" : ""}${item.tone ? " tone-" + item.tone : ""}`} onClick={()=>setRuleActive(item.id)} key={item.id}>{item.label}</button>)}</div><div className="sample-explain"><ShieldCheck size={18}/><div><b>{ruleSample.file}</b><span>{ruleSample.note}</span></div></div><CodeBlock code={claimCode[ruleActive]} fileName={ruleSample.file}/><HumanSteps steps={[`Firebase Console 左邊 Build → ${ruleActive === "firestoreRules" ? "Firestore Database" : "Storage"}`, "按 Rules → 回這張卡按「複製 code」", "回 Rules 全選舊內容 → 貼上 → 把 YOUR_ADMIN_EMAIL 改成與 Part 1 相同的 Email → 按 Publish"]}/><aside className="ai-hint">看到這裡應該好迷惘 — 就係時候問問 AI。</aside></section>
    <section className="kit-section secure-finish"><div><p className="section-tab">本課完成</p><h2>回 Vercel 網址，用管理員 Email 登入。</h2><p>{claimLessonArticle.standard}</p></div><img src={claimHeroUrl} className="finish-guardian" alt="小守護員完成 Claim 系統"/></section><LessonPager current={5}/>
  </main><KitFooter/></div>;
}
