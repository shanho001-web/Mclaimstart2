import { useState } from "react";
import { CheckCircle2, CloudCog, Code2, Database, FileLock2, Globe2, KeyRound, ShieldCheck, UploadCloud } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { KitFooter, KitHeader } from "@/components/KitHeader";
import { claimCode } from "../data/claimCode";

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
    <section className="kit-hero"><div><p className="kit-kicker">MODEL KIT 02 · 登入、會員頁和安全</p><h1>把第一條網址，<em>砌成可登入的 Claim 網站。</em></h1><p>這一盒會把第一模型盒的三個檔案升級為登入頁和會員 Dashboard，再替 Firebase 與 Vercel 裝上真正的守門設定。</p><div className="kit-pills"><span><KeyRound/> Firebase Auth</span><span><Database/> Firestore + Storage</span><span><Globe2/> HTTPS 發布</span></div></div><div className="kit-diagram"><div className="diagram-node"><KeyRound/>登入</div><i/><div className="diagram-node"><UploadCloud/>UID 收據</div><i/><div className="diagram-node strong"><ShieldCheck/>Rules</div></div></section>
    <section className="kit-warning"><FileLock2 size={20}/><p><b>開始前先知道：</b>以下是可運作的「熟人內部 Claim 初版」。請先用兩個會員帳戶和一個管理員帳戶測試 Rules；不要把 Firebase 的管理員憑證、Service Account 或私人密碼放進任何前端檔案。</p></section>
    <section className="kit-section" data-part="01" id="code"><div className="section-tab">PART 01 · 重寫網站 code</div><h2>先將四個檔案放到同一個 GitHub repository。</h2><p className="section-lead">你不需要猜哪些 code 放在哪裡。下面每一張卡都直接標示檔案名稱；由左至右選取，完整複製並覆蓋相同名稱的檔案。Firebase 設定內的 <mark>YOUR_...</mark> 必須換成你自己的 Web app 設定。</p><div className="code-tab-row">{samples.map(item=><button className={item.id === active ? "code-tab active" : "code-tab"} onClick={()=>setActive(item.id)} key={item.id}>{item.label}</button>)}</div><div className="sample-explain"><Code2 size={18}/><div><b>{sample.file}</b><span>{sample.note}</span></div></div><CodeBlock code={claimCode[active]} fileName={sample.file} caption="完整複製到上方列出的檔案或 Firebase Rules 編輯器；儲存後才前往下一項。"/></section>
    <section className="kit-section split-kit" data-part="02" id="firebase"><div><div className="section-tab">PART 02 · Firebase 後台</div><h2>按這個順序開啟四道門。</h2><div className="console-steps"><article><b>01</b><div><h3>Authentication</h3><p><strong>Firebase Console → Build → Authentication → Get started。</strong>在 Sign-in method 開啟 Email/Password；於 Users 手動建立第一個熟人帳戶。</p></div></article><article><b>02</b><div><h3>建立 Web app</h3><p><strong>Project settings → Your apps → Web。</strong>註冊 Web app，複製 firebaseConfig 到 index.html 和 dashboard.html 的 <mark>YOUR_...</mark> 位置。</p></div></article><article><b>03</b><div><h3>Firestore Database</h3><p><strong>Build → Firestore Database → Create database。</strong>開啟後按 Rules，貼上「報帳 Rules」卡，先把管理員 email 改好才 Publish。</p></div></article><article><b>04</b><div><h3>Storage</h3><p><strong>Build → Storage → Get started。</strong>按 Rules，貼上「收據 Rules」卡，再 Publish。不要保留測試模式的公開規則。</p></div></article></div></div><aside className="test-panel"><CloudCog size={24}/><h3>三個帳戶測試</h3><p>每次發布 Rules 後都要做。這不是形式，而是確認資料隔離真的生效。</p><ol><li>會員 A 提交一張收據和 claim。</li><li>會員 B 登入後，嘗試讀取 A 的 claim／收據：應被拒絕。</li><li>管理員登入後，檢查可讀取並更新 claim 狀態。</li></ol><small>Firestore Rules 模擬器可在 Firestore → Rules 開啟，先測試再 Publish。[1]</small></aside></section>
    <section className="kit-section" data-part="03" id="https"><div className="section-tab">PART 03 · Vercel HTTPS</div><h2>正式網址由 Vercel 發出；自訂網域要先做 DNS 驗證。</h2><div className="https-grid"><article><span>01</span><h3>先用 .vercel.app</h3><p>由 GitHub import 的專案完成部署後，Vercel 會提供 HTTPS 網址。先用這個網址完整測試登入、上載、Rules 和手機版。</p></article><article><span>02</span><h3>再加自訂網域</h3><p>Vercel Project → Settings → Domains → Add Domain。輸入你的網域，跟畫面提供的 DNS 記錄到網域供應商設定。</p></article><article><span>03</span><h3>只從正式網址使用</h3><p>等待 Domain 顯示 Valid Configuration／有效後，將這條 HTTPS 網址給朋友。每次 main branch 更新，Vercel 會更新正式部署；其他 branch 會產生 Preview。[2]</p></article></div></section>
    <section className="kit-section secure-finish"><div><p className="section-tab">完成清單</p><h2>完成第二模型盒，才邀請第一位朋友。</h2><ul><li><CheckCircle2/> GitHub repository 保持 Private，未放 Service Account、管理員密碼或其他私密檔案。</li><li><CheckCircle2/> Firebase Authentication 已開 Email/Password，管理員帳戶使用強密碼並啟用可用的多因素驗證。</li><li><CheckCircle2/> Firestore 和 Storage Rules 已 Publish，並由 A、B、管理員帳戶實測。</li><li><CheckCircle2/> Vercel 正式 HTTPS 網址和手機版已實測；朋友只從這條網址登入。</li></ul></div><ShieldCheck className="finish-shield"/></section>
  </main><KitFooter/></div>;
}
