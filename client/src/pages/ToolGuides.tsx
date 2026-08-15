/** Design philosophy: Route-first visual guide — every instruction begins with a findable location, then one action. */
import { ArrowRight, CheckCircle2, ChevronDown, CirclePlus, Code2, Database, FolderGit2, Github, KeyRound, Lock, Plus, Rocket, ShieldCheck, UploadCloud } from "lucide-react";
import { KitFooter, KitHeader } from "@/components/KitHeader";

const launchMascotUrl = "/manus-storage/mascot-launch-pop-transparent_9bb45e79.png";

type ActionStep = { where: string; action: string };
type ToolGuide = { id: string; tool: string; title: string; goal: string; view: React.ReactNode; steps: ActionStep[]; result: string };

const guides: ToolGuide[] = [
  {
    id: "github", tool: "GitHub", title: "先把三個檔案放進一個 Private repository。", goal: "做完後，你會在 GitHub 看到 index.html、dashboard.html 和 vercel.json。",
    view: <div className="mock-window github-window"><div className="mock-top"><Github/> github.com <span className="mock-avatar">你</span></div><div className="mock-body"><div className="mock-menu"><b><CirclePlus/> ① 右上角按「+」</b><span>New repository</span></div><div className="repo-form"><label>Repository name</label><div className="fake-input">claim-site</div><label>Visibility</label><div className="visibility"><span><Lock/> Private <small>推薦</small></span><span>○ Public</span></div><p className="mock-note">② 不要勾選 README、.gitignore 或 License。</p><button>Create repository</button></div></div></div>,
    steps: [
      { where:"瀏覽器 → github.com", action:"登入自己的 GitHub 帳戶。登入後，先看右上角是否出現你的頭像。" },
      { where:"GitHub 右上角 → +", action:"按 +，再按 New repository。" },
      { where:"Create a new repository → Repository name 與 Visibility", action:"名稱輸入 claim-site；Visibility 選 Private。" },
      { where:"同一頁最下方 → Create repository", action:"README、.gitignore、License 都保持不勾選，再按 Create repository。" }
    ],
    result: "看見 Quick setup 畫面，就代表空的私人 repository 建好了。"
  },
  {
    id: "firebase", tool: "Firebase", title: "在同一個 Firebase Project 開四道服務門。", goal: "做完後，登入、資料表、收據檔案都有正確的 Firebase 位置可設定。",
    view: <div className="mock-window firebase-window"><div className="mock-top"><span className="firebase-mark">◆</span> Firebase console <ChevronDown size={15}/></div><div className="firebase-body"><aside><b>Project Overview</b><small>Build</small><span className="selected"><KeyRound/> Authentication</span><span><Database/> Firestore Database</span><span><UploadCloud/> Storage</span></aside><main><p>③ 依次按左邊 Build 內的服務</p><div className="firebase-card"><Code2/><b>Web app</b><small>Project settings → Your apps → </small><button>Register app</button></div><div className="firebase-card small"><ShieldCheck/><b>Rules</b><small>Firestore / Storage → Rules → Publish</small></div></main></div></div>,
    steps: [
      { where:"瀏覽器 → console.firebase.google.com", action:"按 Add project，輸入 claim-site，完成建立 Firebase Project。" },
      { where:"Project Overview 中間 → Web 圖示 </>", action:"按 Register app；複製 firebaseConfig，稍後貼到 index.html 與 dashboard.html 的 YOUR_... 位置。" },
      { where:"左側 Build → Authentication → Get started", action:"在 Sign-in method 開啟 Email/Password，才可以讓朋友用 email 和密碼登入。" },
      { where:"左側 Build → Firestore Database／Storage", action:"依次開啟兩個服務；最後各自進入 Rules，貼上第二課對應 code，再按 Publish。" }
    ],
    result: "左側 Build 下會看見 Authentication、Firestore Database 和 Storage；Rules 按 Publish 後才真正生效。"
  },
  {
    id: "vercel", tool: "Vercel", title: "把 GitHub 的 Claim 網站變成 HTTPS 正式網址。", goal: "做完後，Vercel 顯示 Ready；你可用 / 和 /dashboard 測試兩個頁面。",
    view: <div className="mock-window vercel-window"><div className="mock-top"><span className="vercel-mark">▲</span> Dashboard <button><Plus size={14}/> Add New</button></div><div className="vercel-body"><div className="new-menu"><b>④ Add New</b><span>Project</span></div><div className="import-card"><FolderGit2/><div><b>Import Git Repository</b><small>claim-site · Private</small></div><button>Import</button></div><div className="deploy-card"><Rocket/><div><b>Configure Project</b><small>Framework Preset: Other</small></div><button>Deploy</button></div><div className="ready"><CheckCircle2/> Ready · https://claim-site.vercel.app</div></div></div>,
    steps: [
      { where:"瀏覽器 → vercel.com", action:"選 Continue with GitHub 登入；按畫面允許 Vercel 讀取你的 Private repository。" },
      { where:"Vercel Dashboard 右上角 → Add New", action:"按 Add New，再按 Project。" },
      { where:"New Project → Import Git Repository", action:"找到 claim-site 這一行，按 Import。" },
      { where:"Configure Project → Framework Preset", action:"選 Other；Build Command 留空；按 Deploy，等畫面變成綠色 Ready。" }
    ],
    result: "看到綠色 Ready 和 https://...vercel.app；先開網址，再測試 /dashboard。"
  }
];

export default function ToolGuides() {
  return <div className="kit-page tools-page"><KitHeader active="tools"/><main className="tools-main"><section className="tools-hero"><p className="kit-kicker">MODEL KIT 02 · 看著畫面按</p><h1>第一次用 GitHub、Firebase、Vercel？<em>照著這三張大圖按。</em></h1><p>每張圖只教一個工具。每一步都先說你要到哪裡，再說你要做甚麼；完成一張，才前往下一張。</p><div className="tools-rail"><span>① GitHub 建私人 repository</span><i/><span>② Firebase 開服務</span><i/><span>③ Vercel Import + Deploy</span></div></section>{guides.map((guide, index) => <section className="tool-guide" key={guide.id} id={guide.id}><div className="tool-title"><span>0{index+1}</span><div><p>{guide.tool} 操作畫面</p><h2>{guide.title}</h2><small>{guide.goal}</small></div></div><div className="tool-showcase"><div className="tool-image">{guide.view}</div><div className="tool-actions"><p className="action-label">先到哪裡，再做甚麼</p><ol>{guide.steps.map((step, stepIndex) => <li key={step.where}><b>{stepIndex+1}</b><div><small>到哪裡</small><p>{step.where}</p><small>做甚麼</small><p>{step.action}</p></div></li>)}</ol><div className="tool-result"><CheckCircle2/><div><b>按完後會看到</b><p>{guide.result}</p></div>{guide.id === "vercel" && <img src={launchMascotUrl} alt="小守護員提示：看到 Ready 才算真正發布完成"/>}</div>{index < guides.length-1 && <a href={`#${guides[index+1].id}`} className="tool-next">下一個工具 <ArrowRight size={16}/></a>}</div></div></section>)}</main><KitFooter/></div>;
}
