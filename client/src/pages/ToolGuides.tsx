/** Design philosophy: One task is one complete human action — decide, find, act, fill, and verify without scrolling between summaries. */
import { CheckCircle2, ChevronDown, CirclePlus, Code2, Database, FolderGit2, Github, KeyRound, Lock, Plus, Rocket, ShieldCheck, UploadCloud } from "lucide-react";
import { useEffect, useRef } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { KitFooter, KitHeader, LessonPager } from "@/components/KitHeader";
import { codeTemplates } from "@/data/course";
import type { LessonNumber } from "@/data/lessons";

const githubMascotUrl = "/manus-storage/guardian-model-folder-open_fb5db00d.png";
const firebaseMascotUrl = "/manus-storage/guardian-model-code-fit_69207a70.png";
const vercelMascotUrl = "/manus-storage/guardian-model-launch_1f0fec45.png";

type TaskStep = {
  title: string;
  where: string;
  actions: string[];
  fill?: string;
  code?: string;
  result: string;
  tip?: string;
};

type ToolGuide = {
  id: "github" | "firebase" | "vercel";
  lesson: LessonNumber;
  tool: string;
  title: string;
  goal: string;
  view: React.ReactNode;
  steps: TaskStep[];
  mascot: { src: string; alt: string };
  completion?: string;
};

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

  return <img ref={ref} className="tool-mascot-pop" src={src} alt={alt} />;
}

const guides: ToolGuide[] = [
  {
    id: "github",
    lesson: 2,
    tool: "GitHub",
    title: "把 welcome-site 資料夾變成可保存版本的 Private repository。",
    goal: "完成這課後，GitHub 會看到三個網站檔案；你每次改動都會有一個可回復的版本。",
    view: <div className="mock-window github-window"><div className="mock-top"><Github /> github.com <span className="mock-avatar">你</span></div><div className="mock-body"><div className="mock-menu"><b><CirclePlus /> 登入後：右上角按「+」</b><span>New repository</span></div><div className="repo-form"><label>Repository name</label><div className="fake-input">welcome-site</div><label>Visibility</label><div className="visibility"><span><Lock /> Private <small>推薦</small></span><span>○ Public</span></div><p className="mock-note">名稱可自訂；三個額外選項不勾選。</p><button>Create repository</button></div></div></div>,
    steps: [
      {
        title: "現在：登入 GitHub",
        where: "瀏覽器 → github.com → 右上角",
        actions: ["有帳戶按 Sign in；沒有帳戶才按 Sign up", "用自己的 GitHub 帳戶完成登入", "右上角看見頭像後，按頭像旁的 +"],
        result: "頭像旁的小選單會出現 New repository。",
      },
      {
        title: "現在：建立空 repository",
        where: "+ 小選單 → New repository",
        actions: ["按 New repository", "Owner 保留自己的帳戶", "在 Repository name 輸入名稱"],
        fill: "Repository name：welcome-site",
        result: "你會停留在 Create a new repository 表格。",
        tip: "這個名稱會成為網址的一部分：github.com/你的帳戶/welcome-site。",
      },
      {
        title: "現在：設為 Private，再建立",
        where: "Create a new repository 表格 → Visibility",
        actions: ["選 Private", "README、.gitignore template、License 三項保持不勾選", "按綠色 Create repository"],
        result: "畫面進入 Quick setup，代表空 repository 已建立。",
      },
      {
        title: "現在：從 VS Code 上載三個檔案",
        where: "VS Code → welcome-site → 下方黑色 Terminal",
        actions: ["將 git code 裡的 YOUR NAME、YOUR_EMAIL、YOUR_GITHUB_NAME 改成自己的資料", "完整複製 git code", "貼進 Terminal 後按 Enter；第一次若開瀏覽器登入 GitHub，跟畫面完成登入"],
        code: codeTemplates.gitPush,
        result: "回 GitHub 重新整理後，會看到 index.html、style.css、script.js 和最新 commit。",
        tip: "GitHub 密碼只在 GitHub 的登入畫面輸入；不要貼進 Terminal 或公開筆記。",
      },
    ],
    mascot: { src: githubMascotUrl, alt: "小守護員正在把網站檔案收進 GitHub repository" },
    completion: "好喇，已經成功擺上雲端，你已係半個程式開發員。",
  },
  {
    id: "firebase",
    lesson: 3,
    tool: "Firebase",
    title: "先建立一個 Firebase Project，再逐一開登入、資料庫與收據空間。",
    goal: "先有 Project 和 Web app，才開 Authentication、Firestore、Storage；Rules 一定放在最後。",
    view: <div className="mock-window firebase-window"><div className="mock-top"><span className="firebase-mark">◆</span> Firebase console <ChevronDown size={15} /></div><div className="firebase-body"><aside><b>Project Overview</b><small>Build</small><span className="selected"><KeyRound /> Authentication</span><span><Database /> Firestore Database</span><span><UploadCloud /> Storage</span></aside><main><p>同一個 Build 內，依次開啟需要的服務</p><div className="firebase-card"><Code2 /><b>Web app</b><small>Project settings → Your apps → </small><button>Register app</button></div><div className="firebase-card small"><ShieldCheck /><b>Rules</b><small>Firestore / Storage → Rules → Publish</small></div></main></div></div>,
    steps: [
      {
        title: "現在：先登記／登入 Firebase",
        where: "瀏覽器 → console.firebase.google.com",
        actions: ["有 Google 帳戶：按 Sign in，用自己的 Google email 登入", "沒有 Google 帳戶：按 Create account，依畫面建立帳戶並完成驗證", "回到 Firebase Console，按 Continue to Firebase"],
        result: "右上角會出現你的 Google 頭像，首頁會看到 Add project。",
        tip: "Firebase 使用 Google 帳戶登入；之後開 Project、Authentication、Firestore、Storage 都在這個 Console 內完成。",
      },
      {
        title: "現在：建立 Firebase Project",
        where: "瀏覽器 → console.firebase.google.com → Add project",
        actions: ["按 Add project", "輸入 Project name", "按 Continue", "Google Analytics 暫時不需要可關閉", "按 Create project，等畫面進入 Project Overview"],
        fill: "Project name：claim-site",
        result: "左上角會顯示 claim-site，並進入 Project Overview。",
      },
      {
        title: "現在：註冊 Web app，先拿 firebaseConfig",
        where: "Project Overview 中間 → Web 圖示 </>",
        actions: ["按 Web 圖示", "輸入 app nickname", "按 Register app", "複製畫面上的 firebaseConfig，先放在安全筆記"],
        fill: "App nickname：claim-web",
        result: "你會看到 firebaseConfig；第五課要貼進 index.html 和 dashboard.html。",
        tip: "firebaseConfig 是網站認得 Project 的地址，不是管理員密碼；但 Service Account 絕不能放進 HTML。",
      },
      {
        title: "現在：開 Email／Password 登入",
        where: "左側 Build → Authentication",
        actions: ["按 Get started", "開 Sign-in method", "選 Email/Password", "把第一個開關設為 Enabled", "按 Save"],
        result: "Email/Password 顯示 Enabled；現在可以建立唯一管理員帳戶。",
      },
      {
        title: "現在：建立唯一管理員帳戶",
        where: "Authentication → Users → Add user",
        actions: ["按 Add user", "輸入你日後管理 Claim 的 email 和強密碼", "按 Add user 完成建立", "確認 Users 清單只出現這個管理員帳戶"],
        fill: "Email：第五課 Rules 內的 ADMIN_EMAIL；Password：只由管理員保存",
        result: "Users 清單有一個管理員帳戶；Claim 網站沒有註冊按鈕，其他人不能自行開戶。",
        tip: "這個 email 必須和第五課 Firestore／Storage Rules 裡的 ADMIN_EMAIL 完全相同。",
      },
      {
        title: "現在：建 Firestore，再貼報帳 Rules",
        where: "左側 Build → Firestore Database",
        actions: ["按 Create database", "選資料位置", "選 Production mode", "按 Create", "開 Rules 分頁，貼第五課的報帳 Rules", "改好管理員 email 後按 Publish"],
        result: "Firestore Rules 顯示最新 Publish 時間。",
        tip: "Rules 貼在 Firebase → Firestore → Rules，不是貼進 VS Code。",
      },
      {
        title: "現在：建 Storage，再貼收據 Rules",
        where: "左側 Build → Storage",
        actions: ["按 Get started", "完成 Storage 建立", "開 Rules 分頁", "貼第五課的收據 Rules", "按 Publish"],
        result: "Storage Rules 顯示最新 Publish 時間，收據才會受你的限制保護。",
      },
    ],
    mascot: { src: firebaseMascotUrl, alt: "小守護員正在把 Firebase 設定零件裝進網站模型" },
  },
  {
    id: "vercel",
    lesson: 4,
    tool: "Vercel",
    title: "把 GitHub repository 接到 Vercel，取得第一條可分享的 HTTPS 網址。",
    goal: "Vercel 先要看得到 GitHub repository；Import、Deploy 成功後才會有公開網址。",
    view: <div className="mock-window vercel-window"><div className="mock-top"><span className="vercel-mark">▲</span> Dashboard <button><Plus size={14} /> Add New</button></div><div className="vercel-body"><div className="new-menu"><b>登入後：Add New</b><span>Project</span></div><div className="import-card"><FolderGit2 /><div><b>Import Git Repository</b><small>welcome-site · Private</small></div><button>Import</button></div><div className="deploy-card"><Rocket /><div><b>Configure Project</b><small>Other · Build Command 留空</small></div><button>Deploy</button></div><div className="ready"><CheckCircle2 /> Ready · https://welcome-site.vercel.app</div></div></div>,
    steps: [
      {
        title: "現在：先登記／登入 Vercel",
        where: "瀏覽器 → vercel.com → Sign Up 或 Log In",
        actions: ["第一次用：按 Sign Up，再選 Continue with GitHub", "在跳出的 GitHub 畫面登入並同意連結", "回到 Vercel Dashboard，確認右上角有自己的頭像"],
        result: "你已進入 Vercel Dashboard，現在才可以建立部署 Project。",
      },
      {
        title: "現在：開一個 Vercel Project",
        where: "Vercel Dashboard → 右上角 Add New → Project",
        actions: ["按 Add New", "選 Project", "等畫面開啟 Import Git Repository"],
        result: "畫面顯示 Import Git Repository 清單。",
      },
      {
        title: "現在：找到 welcome-site，按 Import",
        where: "New Project → Import Git Repository",
        actions: ["在清單找 welcome-site", "在同一行按 Import", "找不到時先回 GitHub Settings → Applications → Vercel → Configure 授權 repository，再回來重新整理"],
        result: "畫面進入 Configure Project。",
      },
      {
        title: "現在：填部署設定，再按 Deploy",
        where: "Configure Project",
        actions: ["Project Name 保留 welcome-site", "Framework Preset 選 Other", "Build Command 留空", "按 Deploy"],
        fill: "Project Name：welcome-site；Framework Preset：Other；Build Command：留空",
        result: "部署畫面先顯示 Building，完成後會變 Ready。",
      },
      {
        title: "現在：打開網址測試",
        where: "Deploy 完成畫面 → Ready 旁的 Visit",
        actions: ["等 Building 變 Ready", "按 Visit 開網址", "用手機或無痕視窗再開一次"],
        result: "看到 https://...vercel.app；這就是第一條可分享網址。",
        tip: "日後 GitHub push 新版本，Vercel 會自動部署；不用再次手動上載。",
      },
    ],
    mascot: { src: vercelMascotUrl, alt: "小守護員正在把網站模型送上 Vercel" },
  },
];

function TaskUnit({ step, number }: { step: TaskStep; number: number }) {
  return <article className="task-unit">
    <header className="task-unit-head"><b>{number}</b><div><small>現在做甚麼</small><h3>{step.title}</h3></div></header>
    <div className="task-unit-body">
      <div className="task-location"><small>到哪裡</small><p>{step.where}</p></div>
      <div className="task-instructions"><small>怎樣做</small><ol>{step.actions.map((item) => <li key={item}>{item}</li>)}</ol></div>
      {step.fill && <div className="task-fill"><small>填甚麼</small><p>{step.fill}</p></div>}
      {step.code && <div className="task-code"><div><small>完整複製這段</small><p>先把橙色的 YOUR NAME、YOUR_EMAIL、YOUR_GITHUB_NAME 改成自己的資料；再完整複製，貼進 Terminal 後按 Enter。</p></div><CodeBlock code={step.code} fileName="貼進 VS Code 的 Terminal" /></div>}
      <div className="task-result"><CheckCircle2 /><div><small>完成後</small><p>{step.result}{step.tip && <><span className="result-note">注意：{step.tip}</span></>}</p></div></div>
    </div>
  </article>;
}

function ToolLesson({ id }: { id: ToolGuide["id"] }) {
  const guide = guides.find((item) => item.id === id)!;
  return <div className="kit-page tools-page tool-lesson-page"><KitHeader active={guide.lesson} /><main className="tools-main"><section className="tools-hero tool-lesson-hero"><p className="kit-kicker">LESSON 0{guide.lesson} / 05 · 看著畫面按</p><h1>第一次用 {guide.tool}？<em>照著這張大圖按。</em></h1><p>{guide.goal}</p></section><section className="tool-guide standalone-tool-guide" id={guide.id}><div className="tool-title"><span>0{guide.lesson}</span><div><p>{guide.tool} 操作畫面</p><h2>{guide.title}</h2></div></div><div className="tool-image">{guide.view}</div><div className="task-unit-list">{guide.steps.map((step, index) => <TaskUnit key={step.title} step={step} number={index + 1} />)}</div><div className="tool-result"><CheckCircle2 /><div><b>本課真正完成</b><p>{guide.completion || "已完成以上每一個操作單元；下一課才會使用這一課建立的帳戶、設定或網址。"}</p></div><ToolMascot src={guide.mascot.src} alt={guide.mascot.alt} /></div></section><LessonPager current={guide.lesson} /></main><KitFooter /></div>;
}

export function GithubLesson() { return <ToolLesson id="github" />; }
export function FirebaseLesson() { return <ToolLesson id="firebase" />; }
export function VercelLesson() { return <ToolLesson id="vercel" />; }
export default GithubLesson;
