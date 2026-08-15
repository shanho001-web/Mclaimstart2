/** Design philosophy: Route-first visual guide — every instruction begins with a findable location, then one action. */
import { ArrowRight, CheckCircle2, ChevronDown, CirclePlus, Code2, Database, FolderGit2, Github, KeyRound, Lock, Plus, Rocket, ShieldCheck, UploadCloud } from "lucide-react";
import { KitFooter, KitHeader } from "@/components/KitHeader";

const githubMascotUrl = "/manus-storage/guardian-model-folder-open_fb5db00d.png";
const firebaseMascotUrl = "/manus-storage/guardian-model-code-fit_69207a70.png";
const vercelMascotUrl = "/manus-storage/guardian-model-launch_1f0fec45.png";

type ActionStep = { where: string; action: string };
type ToolGuide = { id: string; tool: string; title: string; goal: string; view: React.ReactNode; steps: ActionStep[]; result: string; mascot: { src: string; alt: string } };

const guides: ToolGuide[] = [
  {
    id: "github", tool: "GitHub", title: "先把三個檔案放進一個 Private repository。", goal: "做完後，你會在 GitHub 看到 index.html、dashboard.html 和 vercel.json。",
    view: <div className="mock-window github-window"><div className="mock-top"><Github/> github.com <span className="mock-avatar">你</span></div><div className="mock-body"><div className="mock-menu"><b><CirclePlus/> 登入後：右上角按「+」</b><span>New repository</span></div><div className="repo-form"><label>Repository name</label><div className="fake-input">claim-site</div><label>Visibility</label><div className="visibility"><span><Lock/> Private <small>推薦</small></span><span>○ Public</span></div><p className="mock-note">同一張表格：名稱可自訂；三個額外選項不勾選。</p><button>Create repository</button></div></div></div>,
    steps: [
      { where:"瀏覽器 → github.com；登入後看右上角頭像旁", action:"有帳戶按 Sign in；登入後在頭像旁按 +，選 New repository。" },
      { where:"Create a new repository 表格", action:"Repository name 可輸入自己想要的名稱，例如 claim-site；這個名稱會成為 GitHub 連結的一部分。選 Private，三個額外選項保持不勾選，再按 Create repository。" }
    ],
    result: "看見 Quick setup 畫面，就代表空的私人 repository 建好了。",
    mascot: { src: githubMascotUrl, alt: "小守護員正在把網站檔案收進 GitHub repository" }
  },
  {
    id: "firebase", tool: "Firebase", title: "在同一個 Firebase Project 開四道服務門。", goal: "做完後，登入、資料表、收據檔案都有正確的 Firebase 位置可設定。",
    view: <div className="mock-window firebase-window"><div className="mock-top"><span className="firebase-mark">◆</span> Firebase console <ChevronDown size={15}/></div><div className="firebase-body"><aside><b>Project Overview</b><small>Build</small><span className="selected"><KeyRound/> Authentication</span><span><Database/> Firestore Database</span><span><UploadCloud/> Storage</span></aside><main><p>同一個 Build 內，依次開啟需要的服務</p><div className="firebase-card"><Code2/><b>Web app</b><small>Project settings → Your apps → </small><button>Register app</button></div><div className="firebase-card small"><ShieldCheck/><b>Rules</b><small>Firestore / Storage → Rules → Publish</small></div></main></div></div>,
    steps: [
      { where:"瀏覽器 → console.firebase.google.com → Add project", action:"輸入 claim-site 建立 Project；完成後，在 Project Overview 中間按 Web 圖示 </>，Register app，複製 firebaseConfig。" },
      { where:"左側 Build → Authentication", action:"按 Get started；在 Sign-in method 開啟 Email/Password。這個位置決定朋友可否用 email 和密碼登入。" },
      { where:"同一個左側 Build → Firestore Database、Storage", action:"依次開啟兩個服務；各自進 Rules，貼上第二課對應 code，再按 Publish。" }
    ],
    result: "左側 Build 下會看見 Authentication、Firestore Database 和 Storage；Rules 按 Publish 後才真正生效。",
    mascot: { src: firebaseMascotUrl, alt: "小守護員正在把 Firebase 設定零件裝進網站模型" }
  },
  {
    id: "vercel", tool: "Vercel", title: "把 GitHub 的 Claim 網站變成 HTTPS 正式網址。", goal: "做完後，Vercel 顯示 Ready；你可用 / 和 /dashboard 測試兩個頁面。",
    view: <div className="mock-window vercel-window"><div className="mock-top"><span className="vercel-mark">▲</span> Dashboard <button><Plus size={14}/> Add New</button></div><div className="vercel-body"><div className="new-menu"><b>登入後：Add New</b><span>Project</span></div><div className="import-card"><FolderGit2/><div><b>Import Git Repository</b><small>claim-site · Private</small></div><button>Import</button></div><div className="deploy-card"><Rocket/><div><b>Configure Project</b><small>Other · Build Command 留空</small></div><button>Deploy</button></div><div className="ready"><CheckCircle2/> Ready · https://claim-site.vercel.app</div></div></div>,
    steps: [
      { where:"瀏覽器 → vercel.com；登入後 Dashboard 右上角", action:"選 Continue with GitHub 登入，允許讀取 Private repository；在右上角按 Add New，再按 Project。" },
      { where:"New Project → claim-site 同一行 → Import；接著 Configure Project", action:"在 claim-site 旁按 Import；Project Name 可保留 claim-site，Framework Preset 選 Other，Build Command 留空，按 Deploy，等畫面變成綠色 Ready。" }
    ],
    result: "看到綠色 Ready 和 https://...vercel.app；先開網址，再測試 /dashboard。",
    mascot: { src: vercelMascotUrl, alt: "小守護員正在把網站模型送上 Vercel" }
  }
];

export default function ToolGuides() {
  return <div className="kit-page tools-page"><KitHeader active="tools"/><main className="tools-main"><section className="tools-hero"><p className="kit-kicker">MODEL KIT 02 · 看著畫面按</p><h1>第一次用 GitHub、Firebase、Vercel？<em>照著這三張大圖按。</em></h1><p>每一步以一個畫面位置完成一件事：先到那裡，再在同一格完成連續操作；不用為相鄰按鈕來回切換卡片。</p><div className="tools-rail"><span>① GitHub 建私人 repository</span><i/><span>② Firebase 開服務</span><i/><span>③ Vercel Import + Deploy</span></div></section>{guides.map((guide, index) => <section className="tool-guide" key={guide.id} id={guide.id}><div className="tool-title"><span>0{index+1}</span><div><p>{guide.tool} 操作畫面</p><h2>{guide.title}</h2><small>{guide.goal}</small></div></div><div className="tool-showcase"><div className="tool-image">{guide.view}</div><div className="tool-actions"><p className="action-label">一個位置，完成一件事</p><ol>{guide.steps.map((step, stepIndex) => <li key={step.where}><b>{stepIndex+1}</b><div><small>到哪裡</small><p>{step.where}</p><small>在這裡完成</small><p>{step.action}</p></div></li>)}</ol><div className="tool-result"><CheckCircle2/><div><b>按完後會看到</b><p>{guide.result}</p></div><img src={guide.mascot.src} alt={guide.mascot.alt}/></div>{index < guides.length-1 && <a href={`#${guides[index+1].id}`} className="tool-next">下一個工具 <ArrowRight size={16}/></a>}</div></div></section>)}</main><KitFooter/></div>;
}
