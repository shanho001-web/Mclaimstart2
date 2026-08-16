/** Design philosophy: One task is one complete human action — decide, find, act, fill, and verify without scrolling between summaries. */
import { ArrowDown, CheckCircle2, ChevronDown, CirclePlus, Code2, Database, FileCode2, FolderGit2, Github, KeyRound, Lock, MonitorPlay, Plus, Rocket, ShieldCheck, TerminalSquare, UploadCloud } from "lucide-react";
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
  extra?: React.ReactNode;
  result: string;
  tip?: string;
};

type ToolGuide = {
  id: "github" | "firebase" | "vercel";
  lesson: LessonNumber;
  tool: string;
  title: string;
  goal: string;
  intro?: React.ReactNode;
  overview?: React.ReactNode;
  view: React.ReactNode;
  steps: TaskStep[];
  mascot: { src: string; alt: string };
  completion?: string;
};

export const firebaseSecurityPrinciples = [
  { name: "Authentication", summary: "先確認目前是誰登入；沒有通過登入就不應取得需要登入的身分。" },
  { name: "Firestore Rules", summary: "每次讀取或改動 Claim 資料時，由規則再次核對指定管理員 Email。" },
  { name: "Storage Rules", summary: "每次上載、查看或刪除收據時，由另一組規則限制存取。" },
];

export const firebaseWelcomeMessage = {
  eyebrow: "第 4 課 · 想請朋友到家吃飯？",
  title: "客廳歡迎朋友，",
  emphasis: "重要物品要鎖進房間。",
};

export const firebaseConfigLines = [
  { key: "apiKey", value: "YOUR_API_KEY", meaning: "這個 Web app 使用的 Firebase API 設定值；以 Console 顯示的內容取代。" },
  { key: "authDomain", value: "YOUR_AUTH_DOMAIN", meaning: "Email／Password 登入使用的驗證網域。" },
  { key: "projectId", value: "YOUR_PROJECT_ID", meaning: "指出要連接哪一個 Firebase Project 和 Firestore。" },
  { key: "storageBucket", value: "YOUR_STORAGE_BUCKET", meaning: "指出收據圖片要使用的 Cloud Storage bucket。" },
  { key: "messagingSenderId", value: "YOUR_MESSAGING_SENDER_ID", meaning: "Web app 的訊息識別值；Console 有這行就完整保留。" },
  { key: "appId", value: "YOUR_APP_ID", meaning: "辨識這個已註冊的 Web app；Console 有這行就完整保留。" },
] as const;

export function FirebaseConfigBreakdown() {
  return <section className="firebase-config-breakdown" aria-labelledby="firebase-config-card-title"><header><span><FileCode2 size={16}/> firebaseConfig · 逐行核對</span><h4 id="firebase-config-card-title">不要自己猜欄位；把 Console 的每一行放到同一個位置。</h4><p>先在 Firebase Console 完整複製 `firebaseConfig`，再對照下列卡片。每個 Project 的值不同，所以示範中的 `YOUR_...` 只用來找位置。</p></header><div className="config-destinations"><FileCode2 size={22}/><div><b>同一份設定放進兩個檔案</b><p><code>index.html</code> 與 <code>dashboard.html</code> 內原有的 <code>const firebaseConfig = &#123; ... &#125;</code> 區塊。</p></div></div><div className="config-code-card"><div className="config-line config-declaration"><code>const firebaseConfig = &#123;</code><span>不要改這一行</span></div>{firebaseConfigLines.map((line, index) => <div className="config-line" key={line.key}><code><b>{line.key}</b>: <mark>"{line.value}"</mark>{index < firebaseConfigLines.length - 1 ? "," : ""}</code><p><span>0{index + 1}</span>{line.meaning}</p></div>)}<div className="config-line config-declaration"><code>&#125;;</code><span>保留結尾的分號</span></div></div><aside className="config-security-note"><ShieldCheck size={20}/><div><b>網站設定，不是管理員密碼。</b><p>`firebaseConfig` 會隨網站交付，真正的資料存取仍由 Authentication 和 Firestore／Storage Rules 決定。<strong>不可</strong>把 Service Account JSON、`private_key`、Admin SDK 或管理員密碼貼進 `index.html`、`dashboard.html` 或公開 repository。</p></div></aside></section>;
}

function ProcessArrow({ label }: { label: string }) {
  return <div className="process-arrow" aria-label={`下一步：${label}`}><span>{label}</span><ArrowDown size={20}/></div>;
}

function ProcessNode({ number, icon, title, detail, tone = "blue" }: { number: string; icon: React.ReactNode; title: string; detail: string; tone?: "blue" | "orange" | "green" }) {
  return <article className={`process-node process-node-${tone}`}><span className="process-node-number">{number}</span><div className="process-node-icon">{icon}</div><div><b>{title}</b><small>{detail}</small></div></article>;
}

export function GithubProcessFlow() {
  return <div className="mock-window process-flow-window github-window"><div className="mock-top"><Github /> github.com <span className="mock-avatar">你</span></div><div className="process-flow-stack"><ProcessNode number="01" icon={<Github />} title="登入 GitHub" detail="右上角看見你的頭像"/><ProcessArrow label="按頭像旁的 +"/><ProcessNode number="02" icon={<CirclePlus />} title="New repository" detail="輸入 welcome-site" tone="orange"/><ProcessArrow label="選擇儲存方式"/><ProcessNode number="03" icon={<Lock />} title="Private repository" detail="README、License 先不勾選"/><ProcessArrow label="建立後回 VS Code"/><ProcessNode number="04" icon={<TerminalSquare />} title="貼上 git code" detail="把三個網站檔案 push 上雲端" tone="green"/></div></div>;
}

export function VercelProcessFlow() {
  return <div className="mock-window process-flow-window vercel-window"><div className="mock-top"><span className="vercel-mark">▲</span> Vercel Dashboard <span className="mock-avatar">你</span></div><div className="process-flow-stack"><ProcessNode number="01" icon={<Github />} title="Continue with GitHub" detail="先登入並同意 Vercel 連結 GitHub"/><ProcessArrow label="回到 Dashboard"/><ProcessNode number="02" icon={<Plus />} title="Add New → Project" detail="開啟 Import Git Repository" tone="orange"/><ProcessArrow label="找到你的 repository"/><ProcessNode number="03" icon={<FolderGit2 />} title="Import welcome-site" detail="按同一行的 Import；找不到先開 Vercel application 權限"/><div className="process-access-note"><KeyRound size={16}/><span><b>清單沒有 welcome-site？</b> GitHub Settings → Applications → Vercel → Configure，允許這個 repository。</span></div><ProcessArrow label="確認設定後部署"/><ProcessNode number="04" icon={<Rocket />} title="Deploy → Ready" detail="取得第一條 HTTPS 網址" tone="green"/></div></div>;
}

export function FirebaseProcessFlow() {
  return <div className="mock-window process-flow-window firebase-window"><div className="mock-top"><span className="firebase-mark">◆</span> Firebase console <ChevronDown size={15} /></div><div className="process-flow-stack firebase-process-stack"><ProcessNode number="01" icon={<Database />} title="Firebase Project" detail="先建立 claim-site Project"/><ProcessArrow label="Project Overview 中間"/><ProcessNode number="02" icon={<Code2 />} title="Web app 〈/〉" detail="按 Web icon，Register app" tone="orange"/><ProcessArrow label="畫面會顯示網頁設定"/><ProcessNode number="03" icon={<FileCode2 />} title="firebaseConfig code" detail="複製給第 5 課 index.html 和 dashboard.html"/><ProcessArrow label="再設定登入與存取規則"/><ProcessNode number="04" icon={<ShieldCheck />} title="Authentication + Rules" detail="唯一管理員、Firestore、Storage" tone="green"/></div></div>;
}

export function FirebaseSecurityPrimer() {
  return <section className="firebase-opening" aria-labelledby="firebase-welcome-title"><div className="firebase-welcome-copy"><p><Lock size={16}/>{firebaseWelcomeMessage.eyebrow}</p><h1 id="firebase-welcome-title">{firebaseWelcomeMessage.title}<em>{firebaseWelcomeMessage.emphasis}</em></h1><span>請朋友到家吃飯，客廳可以讓大家自在進出；但收據、管理員帳戶和資料權限，就像重要物品，應該鎖進房間。</span></div><section className="firebase-security-brief" aria-labelledby="firebase-security-title">
    <div className="firebase-security-heading"><span><ShieldCheck size={16}/> 第 4 課先看安全概念</span><h2 id="firebase-security-title">公開網站，<em>不等於公開資料。</em></h2><p>畫面和網站程式碼可以公開；每次需要登入、讀取 Claim 或接觸收據時，Firebase 才根據身分和 Rules 判斷是否准許。第 5 課會帶你逐步完成實作。</p></div>
    <div className="security-boundary" aria-label="公開畫面與受保護資料的分界">
      <div className="security-zone public-zone"><small>公開區</small><b>歡迎頁、登入畫面</b><p>任何人都可以看見畫面與網站程式碼。</p></div>
      <div className="security-divider"><span>登入後的每次請求</span><ShieldCheck size={20}/></div>
      <div className="security-zone protected-zone"><small>受保護區</small><b>管理員、Claims、收據</b><p>Firebase 會按 Authentication 和 Rules 判斷是否准許存取。</p></div>
    </div>
    <div className="security-principle-grid">{firebaseSecurityPrinciples.map((item, index) => <article key={item.name}><span>0{index + 1}</span><div><b>{item.name}</b><p>{item.summary}</p></div></article>)}</div>
    <p className="security-flow-bridge"><b>第 5 課再實作：</b>建立 Firebase Project 和 Web app、啟用登入、建立唯一管理員，再把 Firestore 和 Storage 的 Rules 發佈。前端畫面被修改並不會取代 Firebase 伺服器端規則。</p>
  </section></section>;
}

function FirebaseLessonPreview() {
  return <section className="firebase-next-preview" aria-labelledby="firebase-preview-title"><p><MonitorPlay size={16}/> 第 4 課只作導覽，不需要開 Firebase Console</p><h3 id="firebase-preview-title">第 5 課會把這六件事逐一完成。</h3><ol><li>建立 Firebase Project</li><li>註冊 Web app</li><li>逐行貼 firebaseConfig</li><li>開 Email／Password</li><li>建立唯一管理員</li><li>發布 Firestore 與 Storage Rules</li></ol><a href="/claim-kit">前往第 5 課 Claim 實作台 →</a></section>;
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

  return <img ref={ref} className="tool-mascot-pop" src={src} alt={alt} />;
}

const guides: ToolGuide[] = [
  {
    id: "github",
    lesson: 2,
    tool: "GitHub",
    title: "把 welcome-site 資料夾變成可保存版本的 Private repository。",
    goal: "完成這課後，GitHub 會看到三個網站檔案；你每次改動都會有一個可回復的版本。",
    view: <GithubProcessFlow />,
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
    lesson: 4,
    tool: "Firebase",
    title: "先看懂資料如何被分開保護；第 5 課才親手設定。",
    goal: "本課只建立安全概念和操作地圖，不需要開 Firebase Console、貼程式碼或發布 Rules。",
    intro: <FirebaseSecurityPrimer />,
    overview: <FirebaseLessonPreview />,
    view: <FirebaseProcessFlow />,
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
        actions: ["按 Web 圖示", "輸入 app nickname", "按 Register app", "完整複製畫面上的 firebaseConfig", "依下方逐行卡，把同一份設定貼入 index.html 和 dashboard.html"],
        fill: "App nickname：claim-web",
        extra: <FirebaseConfigBreakdown />,
        result: "兩個檔案都有相同 firebaseConfig；第五課的登入、Claims 和收據才能連到同一個 Project。",
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
    lesson: 3,
    tool: "Vercel",
    title: "把 GitHub repository 接到 Vercel，取得第一條可分享的 HTTPS 網址。",
    goal: "Vercel 先要看得到 GitHub repository；Import、Deploy 成功後才會有公開網址。",
    view: <VercelProcessFlow />,
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
        title: "現在：找到 welcome-site；沒有就先授權 Vercel application",
        where: "New Project → Import Git Repository",
        actions: ["先在 Import Git Repository 清單找 welcome-site；看見才按同一行 Import", "清單沒有 welcome-site 時，先不要重新建立 repository；這通常代表 GitHub 還未授權 Vercel application 看這個檔案", "另開 GitHub → 右上角頭像 → Settings → Applications → 找 Vercel application → Configure", "在 Repository access 選 Only select repositories，展開清單後選 welcome-site", "按 Save／Update，回 Vercel New Project 重新整理；welcome-site 出現後按 Import"],
        result: "Vercel Import Git Repository 清單出現 welcome-site；按 Import 後畫面進入 Configure Project。",
        tip: "只選 welcome-site 已足夠，毋須讓 Vercel 讀取所有 GitHub repositories。若 GitHub 畫面把 Vercel 放在 Installed GitHub Apps，進入後同樣按 Configure，再選 Only select repositories。",
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
      {step.extra && <div className="task-extra">{step.extra}</div>}
      <div className="task-result"><CheckCircle2 /><div><small>完成後</small><p>{step.result}{step.tip && <><span className="result-note">注意：{step.tip}</span></>}</p></div></div>
    </div>
  </article>;
}

export function ToolLessonOpening({ tool }: { tool: string }) {
  return <>第一次用 {tool}，網站設計像迷宮？<em>4 個步驟即時學識。</em></>;
}

function ToolLesson({ id }: { id: ToolGuide["id"] }) {
  const guide = guides.find((item) => item.id === id)!;
  const standardTitle = <ToolLessonOpening tool={guide.tool} />;
  return <div className="kit-page tools-page tool-lesson-page"><KitHeader active={guide.lesson} /><main className="tools-main">{guide.intro}<section className="tools-hero tool-lesson-hero"><p className="kit-kicker">LESSON 0{guide.lesson} / 05 · 看著畫面按</p>{guide.id === "firebase" ? <h2 className="firebase-technical-title">{standardTitle}</h2> : <h1>{standardTitle}</h1>}<p>{guide.goal}</p></section><section className="tool-guide standalone-tool-guide" id={guide.id}><div className="tool-title"><span>0{guide.lesson}</span><div><p>{guide.tool} 操作流程圖</p><h2>{guide.title}</h2></div></div><div className="tool-image">{guide.view}</div>{guide.overview}{guide.id !== "firebase" && <div className="task-unit-list">{guide.steps.map((step, index) => <TaskUnit key={step.title} step={step} number={index + 1} />)}</div>}<div className="tool-result"><CheckCircle2 /><div><b>本課真正完成</b><p>{guide.completion || "已完成以上每一個操作單元；下一課才會使用這一課建立的帳戶、設定或網址。"}</p></div><ToolMascot src={guide.mascot.src} alt={guide.mascot.alt} /></div></section><LessonPager current={guide.lesson} /></main><KitFooter /></div>;
}

export function GithubLesson() { return <ToolLesson id="github" />; }
export function FirebaseLesson() { return <ToolLesson id="firebase" />; }
export function VercelLesson() { return <ToolLesson id="vercel" />; }
export default GithubLesson;
