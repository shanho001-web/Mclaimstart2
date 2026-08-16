import { useState } from "react";
import { CheckCircle2, Code2, Database, Globe2, KeyRound, MonitorPlay, ShieldCheck } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { KitFooter, KitHeader, LessonPager } from "@/components/KitHeader";
import { LessonCopyGuide } from "@/components/LessonCopyGuide";
import { claimCode } from "../data/claimCode";

const claimHeroUrl = "/manus-storage/modelkit-claim-hero-white_aaf5e8b0.png";

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

export const claimAssemblyParts = {
  website: { title: "PART 01 · VS Code：兩個網頁檔案", ids: ["indexHtml", "dashboardHtml"] as const },
  rules: { title: "PART 02 · Firebase：兩份 Rules", ids: ["firestoreRules", "storageRules"] as const },
};

export const claimAdminSetup = {
  where: "Firebase Console → Build → Authentication → Users → Add user",
  requirement: "這個 Email 必須和 index.html、dashboard.html、Firestore Rules、Storage Rules 裡的 YOUR_ADMIN_EMAIL 完全相同。",
};

export const claimCopyInstructions = {
  website: "先在 VS Code 左邊 Explorer 按指定檔案；回本頁按「複製 code」；回同一個檔案全選、貼上、儲存。",
  rules: "在 Firebase 左邊 Build 選對應服務 → 按 Rules → 回本頁按「複製 code」→ 回 Rules 貼上 → Publish。",
};

export const claimLessonArticle = {
  subtitle: "LESSON 05 / 05 · 管理員專用 CLAIM 控制台",
  title: "把 Claim 控制台接上 Firebase",
  goal: "今課會把管理員登入頁和管理主頁放進 VS Code，然後在 Firebase 建立自己的管理員帳戶並發布兩份 Rules。前面四課的網站、版本、網址和安全概念已準備好，今課只需把它們集合起來。",
  flow: ["替換 index.html", "替換 dashboard.html", "建立唯一管理員", "發布兩份 Rules"],
  standard: "回 Vercel 網址，用管理員 Email 登入後看見守護員管理主頁，而且可查看 Claim、開收據和更新狀態。",
  transition: "本課分兩部分完成。先留在 VS Code 替換兩個網頁檔案；之後才返回 Firebase 建立唯一管理員，逐一貼 Firestore 和 Storage Rules。程式碼卡內容已準備好，不需要自己重寫。",
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
    <LessonCopyGuide data={claimLessonArticle}/>
    <section className="kit-section" data-part="01" id="website-code"><div className="section-tab">{claimAssemblyParts.website.title}</div><h2>第一部分：在 VS Code 換兩個網頁檔案。</h2><p className="section-lead">先按上方的檔案名稱選擇 <b>index.html</b> 或 <b>dashboard.html</b>。然後只做同一個動作：在 VS Code 左邊 Explorer 開同名檔案，複製下方 code，回檔案全選、貼上、儲存。</p><div className="code-tab-row">{websiteSamples.map(item=><button className={item.id === websiteActive ? "code-tab active" : "code-tab"} onClick={()=>setWebsiteActive(item.id)} key={item.id}>{item.label}</button>)}</div><div className="sample-explain"><Code2 size={18}/><div><b>{websiteSample.file}</b><span>{websiteSample.note}</span></div></div><CodeBlock code={claimCode[websiteActive]} fileName={websiteSample.file}/><HumanSteps steps={[`VS Code 左邊 Explorer → 開 ${websiteSample.file}`, "回這張卡按「複製 code」", "回同一個檔案按 Ctrl/Cmd + A → 貼上 → Ctrl/Cmd + S 儲存"]}/></section>
    <section className="kit-section" data-part="02" id="rules"><div className="section-tab">{claimAssemblyParts.rules.title}</div><h2>第二部分：在 Firebase 建管理員，再發布兩份 Rules。</h2><p className="section-lead">先在 Authentication 建立自己的管理員 Email；再輪流選 Firestore Rules 和 Storage Rules。兩份 code 都要把 <b>YOUR_ADMIN_EMAIL</b> 改成同一個 Email。</p><div className="admin-setup-quick"><div><KeyRound size={20}/><p>先加自己做唯一管理員</p><h3>{claimAdminSetup.where}</h3></div><ol><li>第一次用：先開 Sign-in method → Email/Password → Enabled → Save。</li><li>開 Users → 按 Add user。</li><li>輸入你自己的管理員 Email 和強密碼 → 按 Add user。</li><li>在 Users 清單看見這個 Email；記下密碼。</li></ol><aside><b>最重要：</b>{claimAdminSetup.requirement}</aside></div><p className="section-lead">選下方一份 Rules：在 Firebase 左邊 Build 開對應服務，按 Rules，回本頁複製 code，再回 Rules 貼上和 Publish。完成一份後，再選另一份。</p><div className="code-tab-row">{ruleSamples.map(item=><button className={item.id === ruleActive ? "code-tab active" : "code-tab"} onClick={()=>setRuleActive(item.id)} key={item.id}>{item.label}</button>)}</div><div className="sample-explain"><ShieldCheck size={18}/><div><b>{ruleSample.file}</b><span>{ruleSample.note}</span></div></div><CodeBlock code={claimCode[ruleActive]} fileName={ruleSample.file}/><HumanSteps steps={[`Firebase Console 左邊 Build → ${ruleActive === "firestoreRules" ? "Firestore Database" : "Storage"}`, "按 Rules → 回這張卡按「複製 code」", "回 Rules 全選舊內容 → 貼上 → 按 Publish"]}/></section>
    <section className="kit-section secure-finish"><div><p className="section-tab">本課完成</p><h2>回 Vercel 網址，用管理員 Email 登入。</h2><p>{claimLessonArticle.standard}</p></div><ShieldCheck className="finish-shield"/></section><LessonPager current={5}/>
  </main><KitFooter/></div>;
}
