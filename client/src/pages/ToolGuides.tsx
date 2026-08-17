/** Design philosophy: One task is one complete human action — decide, find, act, fill, and verify without scrolling between summaries. */
import { ArrowDown, CheckCircle2, ChevronDown, CirclePlus, Code2, Database, FileCode2, FolderGit2, Github, KeyRound, Lock, MonitorPlay, Plus, Rocket, ShieldCheck, TerminalSquare, UploadCloud } from "lucide-react";
import { useEffect, useRef } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { KitFooter, KitHeader, LessonPager } from "@/components/KitHeader";
import { LessonCopyGuide, type LessonCopyGuideData } from "@/components/LessonCopyGuide";
import { codeTemplates } from "@/data/course";
import type { LessonNumber } from "@/data/lessons";

const githubMascotUrl = "/images/guardian-inspector.png";
const firebaseMascotUrl = "/images/guardian-shield.png";
const vercelMascotUrl = "/images/guardian-celebrate.png";

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

type LessonArticle = {
  subtitle: string;
  heading: string;
  goal: string;
  flow: string[];
  standard: string;
  transition: string;
};

type ToolGuide = {
  id: "github" | "firebase" | "vercel";
  lesson: LessonNumber;
  tool: string;
  title: string;
  goal: string;
  article: LessonArticle;
  intro?: React.ReactNode;
  overview?: React.ReactNode;
  view: React.ReactNode;
  steps: TaskStep[];
  mascot: { src: string; alt: string };
  finishArt?: { src: string; alt: string };
  toolIntro?: { name: string; what: string; trick: string };
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
  return <section className="firebase-opening" aria-labelledby="firebase-welcome-title"><div className="firebase-welcome-copy"><p><Lock size={16}/>{firebaseWelcomeMessage.eyebrow}</p><h1 id="firebase-welcome-title">{firebaseWelcomeMessage.title}<em>{firebaseWelcomeMessage.emphasis}</em></h1><span>請朋友到家吃飯，客廳可以讓大家自在進出；但收據、管理員帳戶和資料權限，就像重要物品，應該鎖進房間。</span></div><aside className="firebase-danger-warning" aria-label="不設防的危險警告"><p className="firebase-danger-label">⚠ 先看危險：不設定後端的後果</p><ol><li><b>任何人都能讀取所有 Claim 和收據</b>：Firebase 預設測試模式開放讀寫，知道網址的人就能拉走整份資料。</li><li><b>任何人都能竄改或刪除資料</b>：不只偷看，還能改金額、刪記錄、上載假收據。</li><li><b>管理員帳戶形同虛設</b>：登入畫面可以造假，沒有伺服器規則把關，會員自稱管理員也攔不住。</li></ol><p className="firebase-danger-why">所以這課不是「加分題」：Firebase 的 Authentication、Firestore Rules、Storage Rules 三道防線，是讓「只有你」能碰資料的必要設定，不是可選的美化。</p></aside><section className="firebase-security-brief" aria-labelledby="firebase-security-title">
    <div className="firebase-security-heading"><span><ShieldCheck size={16}/> 第 4 課先看安全概念</span><h2 id="firebase-security-title">公開網站，<em>不等於公開資料。</em></h2><p>畫面和網站程式碼可以公開；每次需要登入、讀取不公開資料時，Firebase 才根據身分和 Rules 判斷是否准許。記住：成功建立網址，就等於屋企家門打開 — 所以記得鎖好貴重物品（管理員帳戶、Claims、收據）。第 5 課會帶你逐步完成實作。</p></div>
    <div className="security-boundary" aria-label="公開畫面與受保護資料的分界">
      <div className="security-zone public-zone"><small>公開區</small><b>歡迎頁、登入畫面</b><p>任何人都可以看見畫面與網站程式碼。</p></div>
      <div className="security-divider"><span>登入後的每次請求</span><ShieldCheck size={20}/></div>
      <div className="security-zone protected-zone"><small>受保護區</small><b>管理員、Claims、收據</b><p>Firebase 會按 Authentication 和 Rules 判斷是否准許存取。</p></div>
    </div>
    <div className="security-principle-grid">{firebaseSecurityPrinciples.map((item, index) => <article key={item.name}><span>0{index + 1}</span><div><b>{item.name}</b><p>{item.summary}</p></div></article>)}</div>
    <div className="firebase-factcheck" aria-label="官方確認的安全重點"><p className="firebase-factcheck-label">✓ 這些不是廣告，是 Google 官方文件確認的</p><ol><li><b>每個請求都會被規則擋下</b>：Firestore 官方文件寫明「每一個來自 Web 的請求，在讀寫任何資料前都會先經 Security Rules 評估」。</li><li><b>檔按 UID 分開</b>：Storage 規則可用 <code>request.auth.uid</code> 確保每個人只能碰自己的收據。</li><li><b>登入憑證可驗證</b>：登入 token 有官方簽章，伺服器可驗證真偽，冒名頂替會被拒。</li><li><b>App Check 擋機器人</b>：官方提供的 App Check 可驗證請求來自合法 app／瀏覽器，拒絕自動化腳本。</li></ol></div>
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

export const guides: ToolGuide[] = [
  {
    id: "github",
    lesson: 2,
    tool: "GitHub",
    title: "把 welcome-site 資料夾變成可保存版本的 Private repository。",
    goal: "完成這課後，GitHub 會看到三個網站檔案；你每次改動都會有一個可回復的版本。",
    article: {
      subtitle: "LESSON 02 / 05 · GITHUB · 零基礎",
      heading: "把第一個網站保存到 GitHub",
      goal: "今課會把第 1 課的 welcome-site 放進 Private repository。你不用重寫網站；只要登入 GitHub、建立 repository，再從 VS Code 上載三個檔案。",
      flow: ["登入 GitHub", "建立 welcome-site Private repository", "回 VS Code 貼 git code"],
      standard: "GitHub 的 welcome-site 頁會看到 index.html、style.css、script.js 和最新 commit。",
      transition: "GitHub 只負責保存程式碼和版本。Vercel 發出網址會在下一課處理；現在先由下列三步把本機檔案安全保存起來。",
    },
    view: <GithubProcessFlow />,
    toolIntro: { name: "GitHub", what: "GitHub 是一個放程式碼的雲端倉庫：把檔案存上去，就能保存每個版本、隨時回到舊版，也能和別人協作。", trick: "絕招：每次改動都有「時間機」— 改壞了可以回到任何之前的版本，不用怕弄壞。" },
    steps: [
      {
        title: "登入 GitHub",
        where: "瀏覽器 → github.com → 右上角",
        actions: ["有帳戶按 Sign in；沒有帳戶才按 Sign up", "用自己的 GitHub 帳戶完成登入", "右上角看見頭像後，按頭像旁的 +"],
        result: "頭像旁的小選單會出現 New repository。",
      },
      {
        title: "建立 Private repository",
        where: "+ 小選單 → New repository → Create a new repository 表格",
        actions: ["按 New repository", "Owner 保留自己的帳戶", "在 Repository name 輸入 welcome-site", "向下到 Visibility，選 Private", "README、.gitignore template、License 三項保持不勾選", "按綠色 Create repository"],
        fill: "Repository name：welcome-site；Visibility：Private",
        result: "畫面進入 Quick setup，代表空 repository 已建立。",
        tip: "名稱會成為網址的一部分：github.com/你的帳戶/welcome-site。所有設定都在同一張表格完成，不用轉畫面。README、.gitignore、License 先不勾選，是因為你稍後會從 VS Code push 現有檔案；若在網頁先建立這些檔案，之後 push 會出現合併衝突。",
      },
      {
        title: "回到 VS Code 上載三個檔案",
        where: "VS Code → welcome-site → 下方黑色 Terminal",
        actions: ["按下方 code 卡的「複製 code」", "先開一個文字檔改好再貼：VS Code 上方 File → New File（或按 Ctrl/Cmd + N）開新檔，把 code 貼進去，再把三處 YOUR_ 改成自己的資料：YOUR NAME 填你的名字、YOUR_EMAIL 填你的電郵、網址裡的 YOUR_GITHUB_NAME 填你的 GitHub 帳戶名（就是 github.com/你的帳戶名/welcome-site 中間那段）", "改好後整段複製，回 VS Code → welcome-site → 下方黑色 Terminal 貼上，再按 Enter 執行；第一次若開瀏覽器登入 GitHub，跟畫面完成登入"],
        code: codeTemplates.gitPush,
        result: "回 GitHub 重新整理後，會看到 index.html、style.css、script.js 和最新 commit。",
        tip: "Terminal 每行成功會出現綠色剔號或亮燈（如 ✓、main、->），代表該指令通過；若出現紅色 error 或叉號，代表該行有問題，把錯誤貼回給人檢查。commit -m \"第一個小守護員主頁\" 的引號內是「這個版本的儲存名」，可自行改成任何名字（例如「歡迎頁完成」），它只是方便你日後認得這個版本。GitHub 密碼只在 GitHub 的登入畫面輸入；不要貼進 Terminal 或公開筆記。如果出現 repository not found，代表網址裡的 YOUR_GITHUB_NAME 未改成自己的帳戶名；改好後重新貼一次。",
      },
    ],
    mascot: { src: githubMascotUrl, alt: "小守護員正在把網站檔案收進 GitHub repository" },
    finishArt: { src: "/images/guardian-folder-open.webp", alt: "小守護員完成檔案上載" },
    completion: "好喇，已經成功擺上雲端，你已經識流行的專業上載手法。",
  },
  {
    id: "firebase",
    lesson: 4,
    tool: "Firebase",
    title: "先看懂資料如何被分開保護；第 5 課才親手設定。",
    goal: "本課只建立安全概念和操作地圖，不需要開 Firebase Console、貼程式碼或發布 Rules。",
    article: {
      subtitle: "LESSON 04 / 05 · FIREBASE · 先看概念",
      heading: "先看懂資料如何被保護",
      goal: "今課不需要開 Firebase Console 或貼程式碼。你會先知道第 5 課為甚麼要建立 Web app、管理員帳戶和兩份 Rules。",
      flow: ["認識公開與受保護的分界", "看懂三道安全防線", "對照第 5 課的設定地圖"],
      standard: "你能說出公開區與受保護區的分別，並知道第 5 課會到 Firebase 的哪個服務做設定。",
      transition: "公開網站不等於公開資料。這課先看安全地圖；真正按 Firebase 按鈕、建立管理員和發布 Rules，全部留到第 5 課一次完成。",
    },
    intro: <FirebaseSecurityPrimer />,
    overview: <FirebaseLessonPreview />,
    view: <FirebaseProcessFlow />,
    toolIntro: { name: "Firebase", what: "Firebase 是 Google 的雲端服務：負責管理誰能登入、儲存報帳資料和收據，並用規則決定誰可以碰甚麼。", trick: "絕招：所有檢查都在 Google 伺服器端執行 — 就算有人改瀏覽器畫面，也騙不過伺服器規則。" },
    steps: [
      {
        title: "認識公開與受保護的分界",
        where: "本課頁面 → 公開區與受保護區圖",
        actions: ["記住：歡迎頁、登入畫面是公開區，任何人都看得到", "記住：管理員、Claims、收據是受保護區，要登入才可存取"],
        result: "你能指出哪些東西公開、哪些要保護。",
      },
      {
        title: "看懂三道安全防線",
        where: "本課頁面 → 三道防線圖",
        actions: ["Authentication：先確認目前是誰登入", "Firestore Rules：每次讀取或改動 Claim 時再核對指定管理員 Email", "Storage Rules：每次上載、查看或刪除收據時再核對一次"],
        result: "你能說出每一道防線各自保護甚麼。",
      },
      {
        title: "對照第 5 課的設定地圖",
        where: "本課頁面 → 第 5 課預覽卡",
        actions: ["知道第 5 課會建立 Firebase Project 和 Web app", "知道第 5 課會建立唯一管理員、發布 Firestore 和 Storage Rules", "把這頁記住；真正按鈕操作全部在第 5 課一次完成"],
        result: "你已準備好，可在第 5 課直接動手。",
      },
    ],
    mascot: { src: firebaseMascotUrl, alt: "小守護員正在把 Firebase 設定零件裝進網站模型" },
    finishArt: { src: "/images/guardian-code-fit.webp", alt: "小守護員完成 Firebase 設定" },
  },
  {
    id: "vercel",
    lesson: 3,
    tool: "Vercel",
    title: "把 GitHub repository 接到 Vercel，取得第一條可分享的 HTTPS 網址。",
    goal: "Vercel 先要看得到 GitHub repository；Import、Deploy 成功後才會有公開網址。",
    article: {
      subtitle: "LESSON 03 / 05 · VERCEL · 零基礎",
      heading: "把 GitHub 網站變成可開啟網址",
      goal: "今課會把 GitHub 的 welcome-site repository 接到 Vercel。Vercel 會讀取現有檔案，完成 Import 和 Deploy 後給你一條 HTTPS 網址。",
      flow: ["登入 Vercel", "建立 New Project 並 Import welcome-site", "確認設定後 Deploy", "開網址測試"],
      standard: "看到 Vercel 的 Ready 狀態，並可用手機或無痕視窗打開 HTTPS 網址。",
      transition: "這課不再上載檔案。只要 GitHub 的 welcome-site 已完成上一課，Vercel 就能讀取它；現在照四個畫面按即可。",
    },
    view: <VercelProcessFlow />,
    toolIntro: { name: "Vercel", what: "Vercel 是把網站變成網址的發布服務：連上 GitHub 後，每次更新都會自動部署，給你一條可分享的 HTTPS 網址。", trick: "絕招：改完自動上線，還有 Preview 測試網址 — 先試玩確認沒問題，才更新正式網址。" },
    steps: [
      {
        title: "登入 Vercel",
        where: "瀏覽器 → vercel.com → Sign Up 或 Log In",
        actions: ["第一次用：按 Sign Up，再選 Continue with GitHub", "在跳出的 GitHub 畫面登入並同意連結", "回到 Vercel Dashboard，確認右上角有自己的頭像"],
        result: "你已進入 Vercel Dashboard，現在才可以建立部署 Project。",
      },
      {
        title: "建立 New Project，Import welcome-site",
        where: "Vercel Dashboard → 右上角 Add New → Project → Import Git Repository",
        actions: ["按 Add New → Project，等 Import Git Repository 清單出現", "在清單找 welcome-site；看見就按同一行 Import", "畫面進入 Configure Project 後，代表已成功 Import"],
        result: "Vercel Import Git Repository 清單出現 welcome-site；按 Import 後畫面進入 Configure Project。",
        tip: "清單沒有 welcome-site？不要重新建立 repository，照下面 1-5 步授權即可：① 保持這頁開著，另開一個分頁去 github.com；② 右上角頭像 → Settings；③ 左邊選單按 Applications → 找 Vercel → 按 Configure；④ 在 Repository access 選 Only select repositories → 展開清單勾選 welcome-site → 按 Save／Update；⑤ 回剛才的 Vercel New Project 頁重新整理，welcome-site 出現後按 Import。若 GitHub 把 Vercel 放在 Installed GitHub Apps，同樣按 Configure。只授權 welcome-site 已足夠。",
      },
      {
        title: "設定並 Deploy",
        where: "Configure Project",
        actions: ["Project Name 保留 welcome-site", "Framework Preset 選 Other", "Build Command 留空", "按 Deploy"],
        fill: "Project Name：welcome-site；Framework Preset：Other；Build Command：留空",
        result: "部署畫面先顯示 Building，完成後會變 Ready。",
      },
      {
        title: "打開網址測試",
        where: "Deploy 完成畫面 → Ready 旁的 Visit",
        actions: ["等 Building 變 Ready", "按 Visit 開網址", "用手機或無痕視窗再開一次"],
        result: "看到 https://...vercel.app；這就是第一條可分享網址。",
        tip: "日後 GitHub push 新版本，Vercel 會自動部署；不用再次手動上載。",
      },
    ],
    mascot: { src: vercelMascotUrl, alt: "小守護員正在把網站模型送上 Vercel" },
    finishArt: { src: "/images/guardian-launch.webp", alt: "小守護員完成網址發布" },
  },
];

function TaskUnit({ step, number }: { step: TaskStep; number: number }) {
  return <article className="task-unit">
    <header className="task-unit-head"><b>{number}</b><div><h3>{step.title}</h3></div></header>
    <div className="task-unit-body">
      <div className="task-location"><small>到哪裡</small><p>{step.where}</p></div>
      <div className="task-instructions"><small>怎樣做</small><ol>{step.actions.map((item) => <li key={item}>{item}</li>)}</ol></div>
      {step.fill && <div className="task-fill"><small>填甚麼</small><p>{step.fill}</p></div>}
      {step.code && <div className="task-code"><div><small>貼上位置</small><p>按這張 code 卡的「複製 code」；回 VS Code → welcome-site → 下方黑色 Terminal 貼上。把 YOUR NAME、YOUR_EMAIL、YOUR_GITHUB_NAME 改成自己的資料後，再按 Enter。</p></div><CodeBlock code={step.code} fileName="VS Code → welcome-site → 黑色 Terminal" /></div>}
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
  const copyGuide: LessonCopyGuideData = { subtitle: guide.article.subtitle, title: guide.article.heading, goal: guide.article.goal, flow: guide.article.flow, standard: guide.article.standard, transition: guide.article.transition };
  return <div className="kit-page tools-page tool-lesson-page"><KitHeader active={guide.lesson} /><main className="tools-main"><LessonCopyGuide data={copyGuide}/>{guide.intro}<section className="tool-guide standalone-tool-guide" id={guide.id}><div className="tool-title"><span>0{guide.lesson}</span><div><p>{guide.tool} · 由上到下照順序做</p><h2>認識 {guide.tool}{guide.id === "firebase" ? "：先記住這張安全地圖，第 5 課才開始按。" : ""}</h2></div></div>{guide.toolIntro && <div className="tool-intro-card"><div><b>{guide.toolIntro.name} 是甚麼</b><p>{guide.toolIntro.what}</p></div><div className="tool-intro-trick"><b>☆ 絕招</b><p>{guide.toolIntro.trick}</p></div></div>}<div className="tool-guide-hero"><ToolMascot src={guide.mascot.src} alt={guide.mascot.alt} /></div><div className="tool-image">{guide.view}</div>{guide.overview}{guide.id !== "firebase" && <div className="task-unit-list">{guide.steps.map((step, index) => <TaskUnit key={step.title} step={step} number={index + 1} />)}</div>}<div className="tool-result"><CheckCircle2 /><div><b>本課完成</b><p>{guide.completion || guide.article.standard}</p></div><ToolMascot src={(guide.finishArt || guide.mascot).src} alt={(guide.finishArt || guide.mascot).alt} /></div></section><LessonPager current={guide.lesson} /></main><KitFooter /></div>;
}

export function GithubLesson() { return <ToolLesson id="github" />; }
export function FirebaseLesson() { return <ToolLesson id="firebase" />; }
export function VercelLesson() { return <ToolLesson id="vercel" />; }
export default GithubLesson;
