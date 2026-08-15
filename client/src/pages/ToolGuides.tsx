import { ArrowRight, CheckCircle2, ChevronDown, CirclePlus, Cloud, Code2, Database, FileCode2, FolderGit2, Github, KeyRound, Lock, Plus, Rocket, ShieldCheck, UploadCloud } from "lucide-react";
import { KitFooter, KitHeader } from "@/components/KitHeader";

const launchMascotUrl = "/manus-storage/mascot-launch-guide_fb1a0d7f.png";

const guides = [
  {
    id: "github", tool: "GitHub", title: "先把三個檔案放進一個 Private repository。", goal: "做完後，你會在 GitHub 看到 index.html、dashboard.html 和 vercel.json。",
    view: <div className="mock-window github-window"><div className="mock-top"><Github/> github.com <span className="mock-avatar">你</span></div><div className="mock-body"><div className="mock-menu"><b><CirclePlus/> ① 右上角按「+」</b><span>New repository</span></div><div className="repo-form"><label>Repository name</label><div className="fake-input">claim-site</div><label>Visibility</label><div className="visibility"><span><Lock/> Private <small>推薦</small></span><span>○ Public</span></div><p className="mock-note">② 不要勾選 README、.gitignore 或 License。</p><button>Create repository</button></div></div></div>,
    steps: ["打開 github.com，登入自己的帳戶。", "右上角按「+」，選 New repository。", "名稱輸入 claim-site；Visibility 選 Private。", "不要勾選 README、.gitignore、License；按 Create repository。"],
    result: "看見 Quick setup 畫面，就代表空的私人 repository 建好了。"
  },
  {
    id: "firebase", tool: "Firebase", title: "在同一個 Firebase Project 開四道服務門。", goal: "做完後，登入、資料表、收據檔案都有正確的 Firebase 位置可設定。",
    view: <div className="mock-window firebase-window"><div className="mock-top"><span className="firebase-mark">◆</span> Firebase console <ChevronDown size={15}/></div><div className="firebase-body"><aside><b>Project Overview</b><small>Build</small><span className="selected"><KeyRound/> Authentication</span><span><Database/> Firestore Database</span><span><UploadCloud/> Storage</span></aside><main><p>③ 依次按左邊 Build 內的服務</p><div className="firebase-card"><Code2/><b>Web app</b><small>Project settings → Your apps → </small><button>Register app</button></div><div className="firebase-card small"><ShieldCheck/><b>Rules</b><small>Firestore / Storage → Rules → Publish</small></div></main></div></div>,
    steps: ["打開 console.firebase.google.com，按 Add project；輸入 claim-site。", "在 Project Overview 中間按 Web 圖示 </>，Register app；複製 firebaseConfig。", "左邊 Build → Authentication → Get started；開啟 Email/Password。", "繼續在 Build 開 Firestore Database 和 Storage；最後分別到 Rules 貼上第二課 code。"],
    result: "左側 Build 下會看見 Authentication、Firestore Database 和 Storage；Rules 按 Publish 後才真正生效。"
  },
  {
    id: "vercel", tool: "Vercel", title: "把 GitHub 的 Claim 網站變成 HTTPS 正式網址。", goal: "做完後，Vercel 顯示 Ready；你可用 / 和 /dashboard 測試兩個頁面。",
    view: <div className="mock-window vercel-window"><div className="mock-top"><span className="vercel-mark">▲</span> Dashboard <button><Plus size={14}/> Add New</button></div><div className="vercel-body"><div className="new-menu"><b>④ Add New</b><span>Project</span></div><div className="import-card"><FolderGit2/><div><b>Import Git Repository</b><small>claim-site · Private</small></div><button>Import</button></div><div className="deploy-card"><Rocket/><div><b>Configure Project</b><small>Framework Preset: Other</small></div><button>Deploy</button></div><div className="ready"><CheckCircle2/> Ready · https://claim-site.vercel.app</div></div></div>,
    steps: ["打開 vercel.com，用 GitHub 登入；允許它讀取你的 Private repository。", "Dashboard 右上按 Add New → Project。", "在 Import Git Repository 找到 claim-site，按 Import。", "Framework Preset 選 Other；不要填 Build Command；按 Deploy，等 Ready。"],
    result: "看到綠色 Ready 和 https://...vercel.app；先開網址，再測試 /dashboard。"
  }
];

export default function ToolGuides() {
  return <div className="kit-page tools-page"><KitHeader active="tools"/><main className="tools-main"><section className="tools-hero"><p className="kit-kicker">MODEL KIT 02 · 看著畫面按</p><h1>第一次用 GitHub、Firebase、Vercel？<em>照著這三張大圖按。</em></h1><p>每張圖只教一個工具。先找畫面上橙色編號的位置，再按下面短句做；完成後，才前往下一張。</p><div className="tools-rail"><span>① GitHub 建私人 repository</span><i/><span>② Firebase 開服務</span><i/><span>③ Vercel Import + Deploy</span></div></section>{guides.map((guide, index) => <section className="tool-guide" key={guide.id} id={guide.id}><div className="tool-title"><span>0{index+1}</span><div><p>{guide.tool} 操作畫面</p><h2>{guide.title}</h2><small>{guide.goal}</small></div></div><div className="tool-showcase"><div className="tool-image">{guide.view}</div><div className="tool-actions"><p className="action-label">照這個次序按</p><ol>{guide.steps.map((step, stepIndex) => <li key={step}><b>{stepIndex+1}</b><span>{step}</span></li>)}</ol><div className="tool-result"><CheckCircle2/><div><b>按完後會看到</b><p>{guide.result}</p></div>{guide.id === "vercel" && <img src={launchMascotUrl} alt="小守護員提示：看到 Ready 才算真正發布完成"/>}</div>{index < guides.length-1 && <a href={`#${guides[index+1].id}`} className="tool-next">下一個工具 <ArrowRight size={16}/></a>}</div></div></section>)}</main><KitFooter/></div>;
}
