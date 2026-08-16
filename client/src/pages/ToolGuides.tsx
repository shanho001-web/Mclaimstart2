/** Design philosophy: Route-first visual guide — every instruction begins with a findable location, then one action. */
import { ArrowRight, CheckCircle2, ChevronDown, CirclePlus, Code2, Database, FolderGit2, Github, KeyRound, Lock, Plus, Rocket, ShieldCheck, UploadCloud } from "lucide-react";
import { useEffect, useRef } from "react";
import { KitFooter, KitHeader, LessonPager } from "@/components/KitHeader";
import type { LessonNumber } from "@/data/lessons";

const githubMascotUrl = "/manus-storage/guardian-model-folder-open_fb5db00d.png";
const firebaseMascotUrl = "/manus-storage/guardian-model-code-fit_69207a70.png";
const vercelMascotUrl = "/manus-storage/guardian-model-launch_1f0fec45.png";

type ActionStep = { where: string; action: string };
type TaskMilestone = { title: string; action: string; result: string };
type ToolGuide = { id: "github" | "firebase" | "vercel"; lesson: LessonNumber; tool: string; title: string; goal: string; journey: TaskMilestone[]; view: React.ReactNode; steps: ActionStep[]; result: string; mascot: { src: string; alt: string } };

function splitIntoHumanSteps(action: string) {
  return action.split(/[；。]/).map((item) => item.trim()).filter(Boolean);
}

function ToolMascot({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const mascot = ref.current;
    if (!mascot) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      mascot.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        mascot.classList.add("is-visible");
        observer.unobserve(mascot);
      }
    }, { threshold: 0.4 });
    observer.observe(mascot);
    return () => observer.disconnect();
  }, []);

  return <img ref={ref} className="tool-mascot-pop" src={src} alt={alt}/>;
}

const guides: ToolGuide[] = [
  {
    id: "github", lesson: 2, tool: "GitHub", title: "把 welcome-site 資料夾變成可保存版本的 Private repository。", goal: "這一課的唯一目標：GitHub 會看到 index.html、style.css、script.js 三個檔案，並記住你的每次改動。",
    journey: [
      { title:"登入 GitHub", action:"先讓 GitHub 顯示你的頭像。", result:"右上角有自己的頭像。" },
      { title:"建立空 repository", action:"建立名為 welcome-site 的 Private repository。", result:"進入 Quick setup。" },
      { title:"從 VS Code 上載", action:"在 welcome-site 的 Terminal 貼上首次 git 指令。", result:"GitHub 出現三個檔案。" },
      { title:"確認版本已保存", action:"重新整理 repository 頁面。", result:"看見最新 commit。" }
    ],
    view: <div className="mock-window github-window"><div className="mock-top"><Github/> github.com <span className="mock-avatar">你</span></div><div className="mock-body"><div className="mock-menu"><b><CirclePlus/> 登入後：右上角按「+」</b><span>New repository</span></div><div className="repo-form"><label>Repository name</label><div className="fake-input">claim-site</div><label>Visibility</label><div className="visibility"><span><Lock/> Private <small>推薦</small></span><span>○ Public</span></div><p className="mock-note">同一張表格：名稱可自訂；三個額外選項不勾選。</p><button>Create repository</button></div></div></div>,
    steps: [
      { where:"瀏覽器 → github.com → 右上角", action:"按 Sign in；用自己的 GitHub 帳戶完成登入；確認右上角出現頭像，再按頭像旁的 +。" },
      { where:"+ 小選單 → New repository", action:"按 New repository；Repository name 輸入 welcome-site；Owner 保留自己的帳戶。" },
      { where:"Create a new repository 表格 → Visibility", action:"選 Private；README、.gitignore、License 三項保持不勾選；按綠色 Create repository。" },
      { where:"VS Code → welcome-site → 下方黑色 Terminal", action:"把 git 指令中的 YOUR NAME、YOUR_EMAIL、YOUR_GITHUB_NAME 改成自己的資料；按複製；貼到 Terminal 後按 Enter。" }
    ],
    result: "重新整理 GitHub repository 頁面後，會看到 index.html、style.css、script.js；這表示電腦裡的網站已經有一份 Private 版本。",
    mascot: { src: githubMascotUrl, alt: "小守護員正在把網站檔案收進 GitHub repository" }
  },
  {
    id: "firebase", lesson: 3, tool: "Firebase", title: "先建立一個 Firebase Project，再逐一開登入、資料庫與收據空間。", goal: "不要一進 Firebase 就找 Rules。先有 Project、Web app 和三個服務，最後才貼 Rules；每一步完成後左側 Build 都會多一個入口。",
    journey: [
      { title:"建立 Project", action:"先在 Firebase Console 建立 claim-site 專案。", result:"進入 Project Overview。" },
      { title:"註冊 Web app", action:"取得唯一的 firebaseConfig。", result:"看見 Web app 設定。" },
      { title:"開 Email 登入", action:"開啟 Authentication 的 Email/Password。", result:"Users 可以建立帳戶。" },
      { title:"建 Firestore", action:"建立資料庫，再貼報帳 Rules。", result:"Firestore Rules 已 Publish。" },
      { title:"建 Storage", action:"建立收據空間，再貼收據 Rules。", result:"Storage Rules 已 Publish。" }
    ],
    view: <div className="mock-window firebase-window"><div className="mock-top"><span className="firebase-mark">◆</span> Firebase console <ChevronDown size={15}/></div><div className="firebase-body"><aside><b>Project Overview</b><small>Build</small><span className="selected"><KeyRound/> Authentication</span><span><Database/> Firestore Database</span><span><UploadCloud/> Storage</span></aside><main><p>同一個 Build 內，依次開啟需要的服務</p><div className="firebase-card"><Code2/><b>Web app</b><small>Project settings → Your apps → </small><button>Register app</button></div><div className="firebase-card small"><ShieldCheck/><b>Rules</b><small>Firestore / Storage → Rules → Publish</small></div></main></div></div>,
    steps: [
      { where:"瀏覽器 → console.firebase.google.com → Add project", action:"按 Add project；Project name 輸入 claim-site；按 Continue；Google Analytics 不需要可先關閉；按 Create project，等畫面進入 Project Overview。" },
      { where:"Project Overview 中間 → Web 圖示 </>", action:"按 Web 圖示；App nickname 輸入 claim-web；按 Register app；複製畫面上的 firebaseConfig，先放在安全筆記，稍後貼進第五課兩個 HTML 檔案。" },
      { where:"左側 Build → Authentication", action:"按 Get started；開 Sign-in method；選 Email/Password；把第一個開關設為 Enabled；按 Save。" },
      { where:"左側 Build → Firestore Database", action:"按 Create database；選資料位置；選 Production mode；按 Create；開 Rules 分頁，貼第五課的「報帳 Rules」，改好管理員 email 後按 Publish。" },
      { where:"左側 Build → Storage", action:"按 Get started；完成 Storage 建立；開 Rules 分頁；貼第五課的「收據 Rules」；按 Publish。" }
    ],
    result: "左側 Build 下會看見 Authentication、Firestore Database 和 Storage；兩個 Rules 分頁都顯示最新 Publish 時間，才代表規則真正生效。",
    mascot: { src: firebaseMascotUrl, alt: "小守護員正在把 Firebase 設定零件裝進網站模型" }
  },
  {
    id: "vercel", lesson: 4, tool: "Vercel", title: "把 GitHub repository 接到 Vercel，取得第一條可分享的 HTTPS 網址。", goal: "先讓 Vercel 看得到你的 GitHub repository，再 Import、Deploy、開網址測試。日後 GitHub push 新版本，Vercel 才會自動更新。",
    journey: [
      { title:"用 GitHub 登入", action:"授權 Vercel 讀取你的 repository。", result:"進入 Dashboard。" },
      { title:"找到 repository", action:"在 New Project 找 welcome-site 或 claim-site。", result:"出現 Import。" },
      { title:"設定後 Deploy", action:"選正確預設值並按 Deploy。", result:"Building 變 Ready。" },
      { title:"打開網址測試", action:"用 Vercel 網址開網站。", result:"拿到 https://...vercel.app。" }
    ],
    view: <div className="mock-window vercel-window"><div className="mock-top"><span className="vercel-mark">▲</span> Dashboard <button><Plus size={14}/> Add New</button></div><div className="vercel-body"><div className="new-menu"><b>登入後：Add New</b><span>Project</span></div><div className="import-card"><FolderGit2/><div><b>Import Git Repository</b><small>claim-site · Private</small></div><button>Import</button></div><div className="deploy-card"><Rocket/><div><b>Configure Project</b><small>Other · Build Command 留空</small></div><button>Deploy</button></div><div className="ready"><CheckCircle2/> Ready · https://claim-site.vercel.app</div></div></div>,
    steps: [
      { where:"瀏覽器 → vercel.com → Continue with GitHub", action:"按 Continue with GitHub；完成 GitHub 登入與授權；進入 Dashboard 後在右上角按 Add New，再按 Project。" },
      { where:"New Project → Import Git Repository", action:"在清單找到 welcome-site；看見後按同一行的 Import；找不到時，先回 GitHub Settings → Applications → Vercel → Configure，授權 welcome-site 後再重新整理。" },
      { where:"Configure Project", action:"Project Name 保留 welcome-site；Framework Preset 選 Other；Build Command 留空；按 Deploy。" },
      { where:"Deploy 完成畫面", action:"等待 Building 變成 Ready；按 Visit 開網址；用手機或無痕視窗再開一次，確認其他人也看得到。" }
    ],
    result: "看到綠色 Ready 和 https://...vercel.app；這條網址就是你第一個可分享網站。第五課會用同一個流程部署 Claim 網站。",
    mascot: { src: vercelMascotUrl, alt: "小守護員正在把網站模型送上 Vercel" }
  }
];

function ToolLesson({ id }: { id: ToolGuide["id"] }) {
  const guide = guides.find((item) => item.id === id)!;
  return <div className="kit-page tools-page tool-lesson-page"><KitHeader active={guide.lesson}/><main className="tools-main"><section className="tools-hero tool-lesson-hero"><p className="kit-kicker">LESSON 0{guide.lesson} / 05 · 看著畫面按</p><h1>第一次用 {guide.tool}？<em>照著這張大圖按。</em></h1><p>{guide.goal}</p></section><section className="lesson-task-map"><p className="action-label">本課只跟這條順序</p><ol>{guide.journey.map((item, index) => <li key={item.title}><b>{index+1}</b><div><strong>{item.title}</strong><span>{item.action}</span><small>完成後：{item.result}</small></div></li>)}</ol></section><section className="tool-guide standalone-tool-guide" id={guide.id}><div className="tool-title"><span>0{guide.lesson}</span><div><p>{guide.tool} 操作畫面</p><h2>{guide.title}</h2><small>{guide.goal}</small></div></div><div className="tool-showcase"><div className="tool-image">{guide.view}</div><div className="tool-actions"><p className="action-label">照任務主線，一格一格完成</p><ol>{guide.steps.map((step, stepIndex) => <li key={step.where}><b>{stepIndex+1}</b><div><small>到哪裡</small><p className="where-line">{step.where}</p><small>做甚麼</small><ol className="human-steps">{splitIntoHumanSteps(step.action).map((item) => <li key={item}>{item}</li>)}</ol></div></li>)}</ol><div className="tool-result"><CheckCircle2/><div><b>本課完成後會看到</b><p>{guide.result}</p></div><ToolMascot src={guide.mascot.src} alt={guide.mascot.alt}/></div></div></div></section><LessonPager current={guide.lesson}/></main><KitFooter/></div>;
}

export function GithubLesson() { return <ToolLesson id="github"/>; }
export function FirebaseLesson() { return <ToolLesson id="firebase"/>; }
export function VercelLesson() { return <ToolLesson id="vercel"/>; }
export default GithubLesson;
