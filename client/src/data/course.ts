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
  { id:"vscode", number:"01", title:"打開 VS Code 工作枱", short:"下載 → Folder → Terminal", tool:"VS Code", reward:"三個網站檔案", goal:"這一關只做五個小動作。做完後，VS Code 左邊會出現三個網站檔案。", guides:[
    { visual:"download", title:"選擇 Mac 或 Windows，下載並打開 VS Code", instruction:"在這張卡下方的「下載 VS Code」按鈕，開啟官方下載頁。", detail:"頁面會有 macOS 和 Windows 下載按鈕。按你自己的電腦版本；下載完成後，雙擊安裝檔，跟著畫面安裝，再開啟 VS Code。", result:"你會看到藍色 VS Code 圖示和開始畫面。", link:{ label:"下載 VS Code", href:"https://code.visualstudio.com/Download" }, tip:"不要從不明網站下載。這個按鈕會直接前往 VS Code 官方下載頁。" },
    { visual:"folder", title:"新增一個名為 welcome-site 的 Folder", instruction:"在電腦的桌面或 Documents 資料夾。", detail:"按右鍵，選「新增資料夾／New Folder」。名稱輸入 welcome-site，再按 Enter。這個 Folder 會放著你全部網站檔案。", result:"你會看到一個名為 welcome-site 的新資料夾。", tip:"放在桌面或 Documents 最容易找回；先不要放進 Downloads。" },
    { visual:"open", title:"在 VS Code 開啟剛才的 Folder", instruction:"回到 VS Code 頂部選單：File → Open Folder…。", detail:"在彈出的視窗找到 welcome-site，按「Select Folder／開啟」。如果 VS Code 問是否信任這個 Folder，這是你剛建立的，按 Trust。", result:"左側 Explorer 最上方會顯示 WELCOME-SITE。", tip:"一定要選 welcome-site 本身；不要只選它的上一層桌面或 Documents。" },
    { visual:"terminal", title:"打開 VS Code 下方的黑色 Terminal", instruction:"在 VS Code 最上方選單：Terminal → New Terminal。", detail:"畫面下方會出現黑色字框，裡面有一條閃動游標。下一步的 code 就貼在這個黑色 Terminal。", result:"下方出現黑色 Terminal，游標正在等待輸入。", tip:"找不到 Terminal 時，先看最頂部的選單列；它通常在 Run 的旁邊。" },
    { visual:"copy", title:"把 code 貼進黑色 Terminal，按 Enter", instruction:"在 VS Code 下方剛打開的黑色 Terminal。", detail:"選擇你正在使用的 Mac 或 Windows，按「複製 code」。回黑色 Terminal 按一下，貼上完整 code，再按 Enter。", result:"左側 Explorer 出現 index.html、style.css、script.js 三個檔案；Terminal 沒有紅色 error。", code:"macFiles", choices:["macFiles", "windowsFiles"], tip:"只需貼一次。看到三個檔案後，保留 VS Code 開著，立即進入下一部。" }
  ]},
  { id:"welcome", number:"02", title:"讓小可愛在主頁歡迎你", short:"HTML → CSS → 動畫", tool:"VS Code 左側 Explorer", reward:"會動的歡迎網站", goal:"你不需要自己寫 code。這一關只是把三張完整 code 卡，分別放進三個對應檔案。", guides:[
    { visual:"open", title:"把 HTML code 放進 index.html", instruction:"VS Code 左側 Explorer → index.html。", detail:"點 index.html，按 Ctrl/Cmd + A 全選。按下方「複製 code」，回到 index.html 貼上完整內容，再按 Ctrl/Cmd + S 儲存。", result:"index.html 內會看到由 <!doctype html> 開始的一整段文字。", code:"indexHtml", tip:"檔案名稱必須是 index.html；貼 code 前先全選，舊內容才不會和新內容混在一起。" },
    { visual:"copy", title:"把 CSS code 放進 style.css", instruction:"VS Code 左側 Explorer → style.css。", detail:"點 style.css，按 Ctrl/Cmd + A 全選。按下方「複製 code」，貼上完整內容，然後按 Ctrl/Cmd + S 儲存。", result:"style.css 內會看到 background、.bot 和 @keyframes 這些文字。", code:"styleCss", tip:"一定是 style.css，不是 styles.css；少一個或多一個 s，主頁就找不到顏色和動畫。" },
    { visual:"terminal", title:"把 JavaScript code 放進 script.js", instruction:"VS Code 左側 Explorer → script.js。", detail:"點 script.js，按 Ctrl/Cmd + A 全選。按下方「複製 code」，貼上完整內容，再按 Ctrl/Cmd + S 儲存。", result:"script.js 會看到 addEventListener 和「第一關完成」文字。", code:"scriptJs", tip:"三個檔案都儲存後才測試。看到檔案名稱旁沒有白點或星號，代表已儲存。" },
    { visual:"launch", title:"在瀏覽器打開自己的第一個網站", instruction:"VS Code 左側 Explorer → index.html。", detail:"在 index.html 按右鍵，選 Reveal in Finder／Show in File Explorer。彈出資料夾後，雙擊 index.html。", result:"瀏覽器會打開小守護員主頁；按黃色按鈕後，文字變成「第一關完成」。", tip:"看不到浮動動畫時，回 VS Code 檢查 style.css 和 script.js 是否已儲存。" }
  ]},
  { id:"github", number:"03", title:"把作品放進 GitHub 私人 repository", short:"New repository → Private", tool:"GitHub 網站", reward:"可回復的私人版本", goal:"GitHub 會保存這個已成功的小可愛主頁。這個練習不需要公開 code，所以我們選 Private。", guides:[
    { visual:"github", title:"登入 GitHub 帳戶", instruction:"瀏覽器 → 按下方「打開 GitHub」按鈕。", detail:"有帳戶就按 Sign in；沒有帳戶就按 Sign up。登入後，右上角應該看見你的頭像。", result:"右上角出現你的頭像和 + 按鈕。", link:{label:"打開 GitHub",href:"https://github.com/"}, tip:"GitHub 是保存 code 的地方，還未會產生公開網址；網址會在 Vercel 部分建立。" },
    { visual:"github", title:"新增一個 repository", instruction:"GitHub 右上角的 + 按鈕。", detail:"按 +，在小選單按 New repository。下一頁會出現 Repository name 和 Visibility。", result:"你看見 Create a new repository 表格。", tip:"選的是 New repository，不是 New project。" },
    { visual:"folder", title:"輸入 welcome-site 作為 repository 名稱", instruction:"Create a new repository → Repository name 欄位。", detail:"輸入 welcome-site。Owner 保持你的 GitHub 帳戶；Description 可以留空。", result:"名稱下方出現綠色剔號，代表這名稱可用。", tip:"本地 Folder 與 GitHub repository 用同一名稱，日後最不易混亂。" },
    { visual:"private", title:"選 Private，其他三項保持不勾選", instruction:"Create a new repository → Visibility 與下方選項。", detail:"選 Private；Add a README、.gitignore template、Choose a license 三項都不要勾。然後按綠色 Create repository。", result:"你進入 Quick setup 畫面，代表私人 repository 已建立。", tip:"這個 Folder 已有檔案；預先建立 README 會令首次上載多一個不必要步驟。" },
    { visual:"copy", title:"把 Git code 貼進黑色 Terminal，按 Enter", instruction:"VS Code 下方黑色 Terminal。", detail:"先把 code 中的 YOUR NAME、YOUR_EMAIL、YOUR_GITHUB_NAME 改成你的資料。然後按「複製 code」，貼進 Terminal，按 Enter。", result:"重新整理 GitHub 頁面，會看到 index.html、style.css、script.js 三個檔案。", code:"gitPush", tip:"第一次上載若跳出 GitHub 瀏覽器登入，跟畫面完成登入；不要把 GitHub 密碼貼進 Terminal 或公開筆記。" }
  ]},
  { id:"vercel", number:"04", title:"Vercel New Project：發布網址", short:"Add New → Import → Deploy", tool:"Vercel Dashboard", reward:"真正的 .vercel.app 網址", goal:"現在把 GitHub 裡的 repository 交給 Vercel。它會把三個檔案變成朋友也能打開的網址。", guides:[
    { visual:"vercel", title:"用 GitHub 登入 Vercel", instruction:"瀏覽器 → 按下方「打開 Vercel」按鈕。", detail:"選 Continue with GitHub。第一次會問是否允許 Vercel 讀取 GitHub repository；按同意，Vercel 才找得到 welcome-site。", result:"你進入 Vercel Dashboard，右上角有 Add New。", link:{label:"打開 Vercel",href:"https://vercel.com/"}, tip:"這一步不用填信用卡；目前只是在連接剛才已上載的 GitHub 專案。" },
    { visual:"vercel", title:"新增一個 Vercel Project", instruction:"Vercel Dashboard 右上角 → Add New。", detail:"按 Add New 後，選 Project。你會進入 New Project 頁面，畫面會列出可匯入的 GitHub repositories。", result:"看見 Import Git Repository 區域。", tip:"welcome-site 沒出現時，按 Adjust GitHub App Permissions，允許 Vercel 讀取這個 Private repository。" },
    { visual:"github", title:"匯入 welcome-site", instruction:"New Project → Import Git Repository 清單。", detail:"找到 welcome-site，按右側 Import。下一頁是 Configure Project；Project Name 保留 welcome-site。", result:"進入 Configure Project，畫面下方有 Deploy 按鈕。", tip:"匯入前再看一次名稱，確認是 welcome-site，不是其他練習專案。" },
    { visual:"copy", title:"選 Other，然後按 Deploy", instruction:"Configure Project → Framework Preset。", detail:"選 Other；Root Directory 保持 ./；Build Command 留空。這是純 HTML、CSS、JavaScript 網站。設定後按 Deploy。", result:"Vercel 顯示 Building，完成後顯示 Ready 或 Congratulations。", tip:"Framework Preset 若已自動選 Other，就不用再修改。" },
    { visual:"launch", title:"按 Visit，複製第一條網址", instruction:"Vercel 完成畫面 → Ready 旁的 Visit。", detail:"按 Visit，看到小守護員後複製網址。用手機或無痕視窗再開一次，確認不登入也看得到主頁。", result:"你得到 https://...vercel.app 網址，第一個網站已真正公開發布。", tip:"手機和無痕視窗都打得開，才代表別人也能用這條網址看見網站。" }
  ]},
  { id:"update", number:"05", title:"改一句字，親眼看自動更新", short:"改字 → push → 新版上線", tool:"VS Code、GitHub、Vercel", reward:"你已掌握日後更新節奏", goal:"最後只改一行字，親眼看到 GitHub 和 Vercel 自動合作。完成後你就知道日後如何自己更新網站。", guides:[
    { visual:"edit", title:"改一行歡迎文字並儲存", instruction:"VS Code 左側 Explorer → index.html。", detail:"找到「你好，我的網站砌好了！」，改成自己的句子，例如「你好，歡迎來到小明的第一個網站！」，按 Ctrl/Cmd + S 儲存。", result:"自己電腦重新開 index.html 時，已看見新句子。", tip:"第一次更新只改一句，最容易確認整個更新流程每一步都正確。" },
    { visual:"terminal", title:"把新版本送到 GitHub", instruction:"VS Code 下方黑色 Terminal。", detail:"按下方「複製 code」，把完整三行貼進 Terminal，按 Enter。", result:"Terminal 顯示 push 完成，而且沒有紅色 error。", code:"gitUpdate", tip:"三行依次會收集改動、替改動命名，再送到 GitHub；不要只貼其中一行。" },
    { visual:"github", title:"在 GitHub 確認新版本", instruction:"瀏覽器 → GitHub 的 welcome-site 頁面。", detail:"重新整理頁面。檔案上方會出現「改了歡迎文字」這個最新 commit。", result:"GitHub 已保存你剛才的新版本。", tip:"若看不到新 commit，回到 Terminal 檢查是否已成功輸入 git push。" },
    { visual:"vercel", title:"等待 Vercel 建立新版", instruction:"瀏覽器 → Vercel Project → Deployments。", detail:"最上方會出現新的 Building deployment。等待它變成 Ready。", result:"最上方 deployment 顯示 Ready，而且時間是最新的。", tip:"這表示 GitHub push 後，Vercel 正在自動把新版本發布。" },
    { visual:"launch", title:"重新整理正式網址，完成第一課", instruction:"瀏覽器 → 你的 .vercel.app 正式網址。", detail:"按重新整理。你剛才改的句子會出現在正式網站。", result:"第一課完成：你已經做過網站、保存版本、發布網址和自動更新。", tip:"以後固定節奏就是：VS Code 改 → git add / commit / push → Vercel 自動上線。" }
  ]}
];
