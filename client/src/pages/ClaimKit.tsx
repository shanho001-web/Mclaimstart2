import { useState } from "react";
import { CheckCircle2, CloudCog, Code2, Database, FileLock2, Globe2, KeyRound, MonitorPlay, ShieldCheck, UploadCloud } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { KitFooter, KitHeader } from "@/components/KitHeader";
import { claimCode } from "../data/claimCode";

const claimHeroUrl = "/manus-storage/modelkit-claim-mobile-hero_681d04f5.png";
const securityMascotUrl = "/manus-storage/guardian-model-github-lock_c014df84.png";
const folderMascotUrl = "/manus-storage/guardian-model-folder-open_fb5db00d.png";

type Sample = keyof typeof claimCode;
const samples: { id: Sample; label: string; file: string; note: string }[] = [
  { id:"indexHtml", label:"登入主頁", file:"index.html", note:"會員輸入 email／密碼；忘記密碼只送到已登記 email。" },
  { id:"dashboardHtml", label:"會員 Dashboard", file:"dashboard.html", note:"上載收據到 claims/UID/檔名，並只載入自己的 claim。" },
  { id:"firestoreRules", label:"報帳 Rules", file:"Firestore → Rules", note:"會員建立、讀取與撤回自己的未審核 claim；管理員才可更新。" },
  { id:"storageRules", label:"收據 Rules", file:"Storage → Rules", note:"收據依 UID path 隔離，並限制格式和 10MB 大小。" },
  { id:"vercelJson", label:"HTTPS header", file:"vercel.json", note:"加入基本瀏覽器保護 header；HTTPS 由 Vercel 網址與正式網域設定提供。" },
];

export default function ClaimKit() {
  const [active, setActive] = useState<Sample>("indexHtml");
  const sample = samples.find((item) => item.id === active)!;
  return <div className="kit-page"><KitHeader active="claim"/><main className="kit-main">
    <section className="claim-hero-image"><img src={claimHeroUrl} className="hero-guardian" alt="小守護員正在砌登入與安全 Claim 網站模型"/></section>
    <section className="kit-hero claim-hero-copy"><div><p className="kit-kicker">MODEL KIT 02 · 真正可部署的 Claim 系統</p><h1>把第一條網址，<em>砌成可登入的 Claim 網站。</em></h1><p>第二課會把第一模型盒的靜態歡迎頁，換成登入頁、會員 Dashboard、UID 收據路徑和 Firebase Rules。完成後，你會有 <code>/</code> 登入頁和 <code>/dashboard</code> 報帳頁。</p><div className="kit-pills"><span><KeyRound/> Firebase Auth</span><span><Database/> Firestore + Storage</span><span><Globe2/> HTTPS 發布</span></div><a className="tool-guide-launch" href="/tool-guides"><MonitorPlay size={17}/> 從未用過後台？先看「照著畫面按」</a></div><div className="kit-diagram"><div className="diagram-node"><KeyRound/>登入</div><i/><div className="diagram-node"><UploadCloud/>UID 收據</div><i/><div className="diagram-node strong"><ShieldCheck/>Rules</div></div></section>
    <section className="real-files-strip"><img className="mascot-inline mascot-folder" src={folderMascotUrl} alt="小守護員帶著資料夾"/><div><b>第二課要交給 Vercel 的 3 個實戰檔案</b><p>先建立並放入同一個 GitHub repository；然後才開 Firebase，最後 Vercel Deploy。</p></div><ol><li><span>01</span><b>index.html</b><small>會員登入／忘記密碼</small></li><li><span>02</span><b>dashboard.html</b><small>提交、查看與管理 claim</small></li><li><span>03</span><b>vercel.json</b><small>/ 及 /dashboard 路由</small></li></ol></section>
    <section className="kit-warning"><FileLock2 size={20}/><p><b>開始前先知道：</b>以下是可運作的「熟人內部 Claim 初版」。請先用兩個會員帳戶和一個管理員帳戶測試 Rules；不要把 Firebase 的管理員憑證、Service Account 或私人密碼放進任何前端檔案。</p></section>
    <section className="kit-section" data-part="01" id="code"><div className="section-tab">PART 01 · 重寫網站 code</div><h2>先將四個檔案放到同一個 GitHub repository。</h2><p className="section-lead">上方已說明每個檔案的位置。這裡只需選取檔案，按一次「複製 code」，並用完整內容覆蓋同名檔案。</p><div className="code-tab-row">{samples.map(item=><button className={item.id === active ? "code-tab active" : "code-tab"} onClick={()=>setActive(item.id)} key={item.id}>{item.label}</button>)}</div><div className="sample-explain"><Code2 size={18}/><div><b>{sample.file}</b><span>{sample.note}</span></div></div><CodeBlock code={claimCode[active]} fileName={sample.file}/></section>
    <section className="kit-section split-kit" data-part="02" id="firebase"><div><div className="section-tab">PART 02 · Firebase 後台</div><h2>按這個順序開啟四道門。</h2><div className="console-steps"><article><b>01</b><div><h3>Authentication</h3><p><strong>Firebase Console → Build → Authentication → Get started。</strong>在 Sign-in method 開啟 Email/Password；於 Users 手動建立第一個熟人帳戶。</p></div></article><article><b>02</b><div><h3>建立 Web app</h3><p><strong>Project settings → Your apps → Web。</strong>註冊 Web app，複製 firebaseConfig 到 index.html 和 dashboard.html 的 <mark>YOUR_...</mark> 位置。</p></div></article><article><b>03</b><div><h3>Firestore Database</h3><p><strong>Build → Firestore Database → Create database。</strong>開啟後按 Rules，貼上「報帳 Rules」卡，先把管理員 email 改好才 Publish。</p></div></article><article><b>04</b><div><h3>Storage</h3><p><strong>Build → Storage → Get started。</strong>按 Rules，貼上「收據 Rules」卡，再 Publish。不要保留測試模式的公開規則。</p></div></article></div></div><aside className="test-panel"><img className="mascot-inline mascot-security" src={securityMascotUrl} alt="小守護員指向安全盾牌"/><CloudCog size={24}/><h3>三個帳戶測試</h3><p>每次發布 Rules 後都要做。這不是形式，而是確認資料隔離真的生效。</p><ol><li>會員 A 提交一張收據和 claim。</li><li>會員 B 登入後，嘗試讀取 A 的 claim／收據：應被拒絕。</li><li>管理員登入後，檢查可讀取並更新 claim 狀態。</li></ol><small>Firestore Rules 模擬器可在 Firestore → Rules 開啟，先測試再 Publish。[1]</small></aside></section>
    <section className="kit-section" data-part="03" id="https"><div className="section-tab">PART 03 · Vercel HTTPS</div><h2>正式網址由 Vercel 發出；自訂網域要先做 DNS 驗證。</h2><div className="https-grid"><article><span>01</span><h3>先貼 vercel.json</h3><p>將「HTTPS header」code 卡完整放入 repository 根目錄的 <code>vercel.json</code>。它會讓 <code>/</code> 開 index.html、<code>/dashboard</code> 開 dashboard.html，同時加上基本安全 header。</p></article><article><span>02</span><h3>再用 .vercel.app 測試</h3><p>由 GitHub import 的專案完成部署後，Vercel 會提供 HTTPS 網址。先用這個網址完整測試登入、上載、Rules 和手機版。</p></article><article><span>03</span><h3>最後加自訂網域</h3><p>Vercel Project → Settings → Domains → Add Domain。跟畫面設定 DNS，等待有效後才把這條正式 HTTPS 網址給朋友。main branch 更新會更新正式部署；其他 branch 會產生 Preview。[2]</p></article></div></section>
    <section className="kit-section secure-finish"><div><p className="section-tab">完成清單</p><h2>完成第二模型盒，才邀請第一位朋友。</h2><ul><li><CheckCircle2/> GitHub repository 保持 Private，未放 Service Account、管理員密碼或其他私密檔案。</li><li><CheckCircle2/> Firebase Authentication 已開 Email/Password，管理員帳戶使用強密碼並啟用可用的多因素驗證。</li><li><CheckCircle2/> Firestore 和 Storage Rules 已 Publish，並由 A、B、管理員帳戶實測。</li><li><CheckCircle2/> Vercel 正式 HTTPS 網址和手機版已實測；朋友只從這條網址登入。</li></ul></div><ShieldCheck className="finish-shield"/></section>
  </main><KitFooter/></div>;
}
