export type CodeKey = "macFiles" | "windowsFiles" | "indexHtml" | "styleCss" | "scriptJs" | "gitPush" | "gitUpdate";

export const codeTemplates: Record<CodeKey, string> = {
  macFiles: `touch index.html style.css script.js`,
  windowsFiles: `ni index.html,style.css,script.js -ItemType File`,
  indexHtml: `<!doctype html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>我的小守護員網站</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <main class="welcome-card">
    <div id="bot" class="bot" aria-label="小守護員">
      <div class="antenna"></div><div class="face"><span>• ᴗ •</span></div><div class="badge">✦</div>
    </div>
    <p class="label">MY FIRST WEBSITE</p>
    <h1>你好，我的網站砌好了！</h1>
    <p id="message">小守護員會陪你把作品送上網。</p>
    <button id="celebrate">按我慶祝一下</button>
  </main>
  <script src="script.js"></script>
</body>
</html>`,
  styleCss: `* { box-sizing: border-box; }
body { min-height: 100vh; margin: 0; display: grid; place-items: center; font-family: system-ui, sans-serif; color: #102a43; background: radial-gradient(circle at top right, #dcecff, transparent 38%), #fff9ee; }
.welcome-card { width: min(90%, 680px); padding: 52px 28px; text-align: center; background: #fffefa; border: 1px solid #dce6ee; border-radius: 28px; box-shadow: 0 24px 55px #102a4318; }
.bot { width: 142px; height: 142px; margin: 0 auto 18px; position: relative; border: 6px solid #102a43; border-radius: 48px; background: #fff5e4; animation: float 2.4s ease-in-out infinite; }
.antenna { position: absolute; width: 14px; height: 25px; background: #2e73c8; border: 4px solid #102a43; border-bottom: 0; border-radius: 20px 20px 0 0; left: 58px; top: -26px; }
.face { position: absolute; inset: 22px; display: grid; place-items: center; background: #102a43; color: white; border-radius: 34px; font-size: 32px; letter-spacing: 4px; }
.badge { position: absolute; right: -17px; top: -20px; color: #f4a340; font-size: 38px; animation: twinkle 1.4s ease-in-out infinite alternate; }
.label { color: #2e73c8; font-weight: 800; font-size: 12px; letter-spacing: .12em; }
h1 { margin: 8px 0; font-size: clamp(31px, 7vw, 52px); letter-spacing: -.06em; } p { color: #557087; line-height: 1.8; }
button { border: 0; border-radius: 12px; padding: 13px 18px; background: #f4a340; color: #5a3500; font-weight: 800; cursor: pointer; }
.celebrate { animation: celebrate .45s ease both; }
@keyframes float { 50% { transform: translateY(-10px) rotate(2deg); } } @keyframes twinkle { to { transform: scale(1.18) rotate(12deg); } } @keyframes celebrate { 50% { transform: scale(1.08) rotate(-3deg); } }`,
  scriptJs: `const bot = document.getElementById('bot');
const message = document.getElementById('message');
const button = document.getElementById('celebrate');

button.addEventListener('click', () => {
  bot.classList.remove('celebrate');
  void bot.offsetWidth;
  bot.classList.add('celebrate');
  message.textContent = '第一關完成！下一關，我們把這個網站放進 GitHub。';
});`,
  gitPush: `git config --global user.name "YOUR NAME"
git config --global user.email "YOUR_EMAIL@example.com"

git init
git add .
git commit -m "第一個小守護員主頁"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_NAME/welcome-site.git
git push -u origin main`,
  gitUpdate: `git add .
git commit -m "改了歡迎文字"
git push`,
};

export type Guide = { title:string; instruction:string; detail:string; result:string; visual:"download"|"folder"|"open"|"terminal"|"copy"|"github"|"private"|"vercel"|"launch"|"edit"; code?:CodeKey; choices?:CodeKey[]; link?:{label:string;href:string}; tip?:string };
export type CourseStep = { id:string; number:string; title:string; short:string; tool:string; reward:string; goal:string; guides:Guide[] };

export const steps: CourseStep[] = [
  { id:"vscode", number:"01", title:"打開 VS Code 工作枱", short:"下載 → Folder → Terminal", tool:"VS Code", reward:"三個網站檔案", goal:"這一關只做四個畫面位置。做完後，VS Code 左邊會出現三個網站檔案。", guides:[
    { visual:"download", title:"選擇 Mac 或 Windows，下載並打開 VS Code", instruction:"在這張卡下方的「下載 VS Code」按鈕，開啟官方下載頁。", detail:"頁面會有 macOS 和 Windows 下載按鈕。按你自己的電腦版本；下載完成後，雙擊安裝檔，跟著畫面安裝，再開啟 VS Code。", result:"你會看到藍色 VS Code 圖示和開始畫面。", link:{ label:"下載 VS Code", href:"https://code.visualstudio.com/Download" }, tip:"不要從不明網站下載。這個按鈕會直接前往 VS Code 官方下載頁。" },
    { visual:"folder", title:"新增一個名為 welcome-site 的 Folder", instruction:"在電腦的桌面或 Documents 資料夾。", detail:"按右鍵，選「新增資料夾／New Folder」。名稱輸入 welcome-site，再按 Enter。這個 Folder 會放著你全部網站檔案。", result:"你會看到一個名為 welcome-site 的新資料夾。", tip:"放在桌面或 Documents 最容易找回；先不要放進 Downloads。" },
    { visual:"open", title:"在 VS Code 開啟剛才的 Folder", instruction:"回到 VS Code 頂部選單：File → Open Folder…。", detail:"在彈出的視窗找到 welcome-site，按「Select Folder／開啟」。如果 VS Code 問是否信任這個 Folder，這是你剛建立的，按 Trust。", result:"左側 Explorer 最上方會顯示 WELCOME-SITE。", tip:"一定要選 welcome-site 本身；不要只選它的上一層桌面或 Documents。" },
    { visual:"terminal", title:"打開黑色 Terminal，建立三個網站檔案", instruction:"VS Code 最上方選單 → Terminal → New Terminal。", detail:"下方出現黑色 Terminal 後，選擇你的 Mac 或 Windows，按「複製 code」，回黑色 Terminal 貼上完整 code，再按 Enter。", result:"左側 Explorer 出現 index.html、style.css、script.js 三個檔案；Terminal 沒有紅色 error。", code:"macFiles", choices:["macFiles", "windowsFiles"], tip:"黑色 Terminal 是本關唯一要貼指令的位置；只需貼一次。" }
  ]},
  { id:"welcome", number:"02", title:"讓小可愛在主頁歡迎你", short:"HTML → CSS → 動畫", tool:"VS Code 左側 Explorer", reward:"會動的歡迎網站", goal:"你不需要自己寫 code。這一關只是把三張完整 code 卡，分別放進三個對應檔案。", guides:[
    { visual:"open", title:"把 HTML code 放進 index.html", instruction:"VS Code 左側 Explorer → index.html。", detail:"點 index.html，按 Ctrl/Cmd + A 全選。按下方「複製 code」，回到 index.html 貼上完整內容，再按 Ctrl/Cmd + S 儲存。", result:"index.html 內會看到由 <!doctype html> 開始的一整段文字。", code:"indexHtml", tip:"檔案名稱必須是 index.html；貼 code 前先全選，舊內容才不會和新內容混在一起。" },
    { visual:"copy", title:"把 CSS code 放進 style.css", instruction:"VS Code 左側 Explorer → style.css。", detail:"點 style.css，按 Ctrl/Cmd + A 全選。按下方「複製 code」，貼上完整內容，然後按 Ctrl/Cmd + S 儲存。", result:"style.css 內會看到 background、.bot 和 @keyframes 這些文字。", code:"styleCss", tip:"一定是 style.css，不是 styles.css；少一個或多一個 s，主頁就找不到顏色和動畫。" },
    { visual:"terminal", title:"把 JavaScript code 放進 script.js", instruction:"VS Code 左側 Explorer → script.js。", detail:"點 script.js，按 Ctrl/Cmd + A 全選。按下方「複製 code」，貼上完整內容，再按 Ctrl/Cmd + S 儲存。", result:"script.js 會看到 addEventListener 和「第一關完成」文字。", code:"scriptJs", tip:"三個檔案都儲存後才測試。看到檔案名稱旁沒有白點或星號，代表已儲存。" },
    { visual:"launch", title:"在瀏覽器打開自己的第一個網站", instruction:"VS Code 左側 Explorer → index.html。", detail:"在 index.html 按右鍵，選 Reveal in Finder／Show in File Explorer。彈出資料夾後，雙擊 index.html。", result:"瀏覽器會打開小守護員主頁；按黃色按鈕後，文字變成「第一關完成」。", tip:"看不到浮動動畫時，回 VS Code 檢查 style.css 和 script.js 是否已儲存。" }
  ]},
  { id:"github", number:"03", title:"把作品放進 GitHub 私人 repository", short:"New repository → Private", tool:"GitHub 網站", reward:"可回復的私人版本", goal:"GitHub 會保存這個已成功的小可愛主頁。這個練習不需要公開 code，所以我們選 Private。", guides:[
    { visual:"github", title:"登入後，在右上角建立新的 repository", instruction:"瀏覽器 → 按下方「打開 GitHub」按鈕。", detail:"有帳戶按 Sign in；沒有帳戶按 Sign up。登入後，在右上角頭像旁按 +，選 New repository；新頁的 Repository name 可輸入自己想要的名稱，例如 welcome-site。", result:"你看見 Create a new repository 表格，而且名稱下方出現綠色剔號。", link:{label:"打開 GitHub",href:"https://github.com/"}, tip:"這個名稱會成為 GitHub 連結的一部分：github.com/你的帳戶/這個名稱。" },
    { visual:"private", title:"在同一張表格選 Private，然後建立", instruction:"Create a new repository → Visibility 與最下方 Create repository。", detail:"選 Private；Add a README、.gitignore template、Choose a license 三項都保持不勾選，然後按綠色 Create repository。", result:"你進入 Quick setup 畫面，代表私人 repository 已建立。", tip:"welcome-site 是你電腦 Folder 的名稱；GitHub 用同一名稱最容易認。" },
    { visual:"copy", title:"把 Git code 貼進黑色 Terminal，按 Enter", instruction:"VS Code 下方黑色 Terminal。", detail:"先把 code 中的 YOUR NAME、YOUR_EMAIL、YOUR_GITHUB_NAME 改成你的資料。然後按「複製 code」，貼進 Terminal，按 Enter。", result:"重新整理 GitHub 頁面，會看到 index.html、style.css、script.js 三個檔案。", code:"gitPush", tip:"第一次上載若跳出 GitHub 瀏覽器登入，跟畫面完成登入；不要把 GitHub 密碼貼進 Terminal 或公開筆記。" }
  ]},
  { id:"vercel", number:"04", title:"Vercel New Project：發布網址", short:"Add New → Import → Deploy", tool:"Vercel Dashboard", reward:"真正的 .vercel.app 網址", goal:"現在把 GitHub 裡的 repository 交給 Vercel。它會把三個檔案變成朋友也能打開的網址。", guides:[
    { visual:"vercel", title:"登入後，在右上角新增一個 Project", instruction:"瀏覽器 → 按下方「打開 Vercel」按鈕。", detail:"選 Continue with GitHub，允許 Vercel 讀取 GitHub。進入 Dashboard 後，在右上角按 Add New，再選 Project。", result:"你進入 New Project，畫面顯示 Import Git Repository。", link:{label:"打開 Vercel",href:"https://vercel.com/"}, tip:"GitHub repository 不會自動公開；Vercel 只是取得部署它的權限。" },
    { visual:"github", title:"在同一條 repository 列匯入並發布 welcome-site", instruction:"New Project → Import Git Repository → welcome-site。", detail:"在 welcome-site 同一行按 Import；下一頁 Project Name 保留 welcome-site，Framework Preset 選 Other，Build Command 留空，然後按 Deploy。", result:"Vercel 先顯示 Building，完成後顯示 Ready 或 Congratulations。", tip:"Project Name 會成為 Vercel 網址的一部分；保留 welcome-site 最容易辨認。" },
    { visual:"launch", title:"按 Visit，複製第一條網址", instruction:"Vercel 完成畫面 → Ready 旁的 Visit。", detail:"按 Visit，看到小守護員後複製網址。用手機或無痕視窗再開一次，確認不登入也看得到主頁。", result:"你得到 https://...vercel.app 網址，第一個網站已真正公開發布。", tip:"手機和無痕視窗都打得開，才代表別人也能用這條網址看見網站。" }
  ]},
  { id:"update", number:"05", title:"改一句字，親眼看自動更新", short:"改字 → push → 新版上線", tool:"VS Code、GitHub、Vercel", reward:"你已掌握日後更新節奏", goal:"最後只改一行字，親眼看到 GitHub 和 Vercel 自動合作。完成後你就知道日後如何自己更新網站。", guides:[
    { visual:"edit", title:"改一行歡迎文字並儲存", instruction:"VS Code 左側 Explorer → index.html。", detail:"找到「你好，我的網站砌好了！」，改成自己的句子，例如「你好，歡迎來到小明的第一個網站！」，按 Ctrl/Cmd + S 儲存。", result:"自己電腦重新開 index.html 時，已看見新句子。", tip:"第一次更新只改一句，最容易確認整個更新流程每一步都正確。" },
    { visual:"terminal", title:"把新版本送到 GitHub", instruction:"VS Code 下方黑色 Terminal。", detail:"按下方「複製 code」，把完整三行貼進 Terminal，按 Enter。", result:"Terminal 顯示 push 完成，而且沒有紅色 error。", code:"gitUpdate", tip:"三行依次會收集改動、替改動命名，再送到 GitHub；不要只貼其中一行。" },
    { visual:"vercel", title:"確認 GitHub 已收新版本，再等 Vercel 變成 Ready", instruction:"瀏覽器 → GitHub 的 welcome-site 頁面；之後 → Vercel Project → Deployments。", detail:"先重新整理 GitHub，檔案上方看見「改了歡迎文字」的最新 commit；再進 Vercel Deployments，最上方會由 Building 變為 Ready。", result:"GitHub 已保存新版本，而且 Vercel 最上方 deployment 顯示最新的 Ready。", tip:"看到 GitHub 的新 commit 後，Vercel 會自動開始工作；不用再次上載檔案。" },
    { visual:"launch", title:"重新整理正式網址，完成第一課", instruction:"瀏覽器 → 你的 .vercel.app 正式網址。", detail:"按重新整理。你剛才改的句子會出現在正式網站。", result:"第一課完成：你已經做過網站、保存版本、發布網址和自動更新。", tip:"以後固定節奏就是：VS Code 改 → git add / commit / push → Vercel 自動上線。" }
  ]}
];
