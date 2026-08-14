export type CodeKey = "macFiles" | "windowsFiles" | "indexHtml" | "styleCss" | "scriptJs" | "gitPush";

export const codeTemplates: Record<CodeKey, string> = {
  macFiles: `# macOS：在 VS Code 下方 Terminal 貼上後按 Enter
touch index.html style.css script.js`,
  windowsFiles: `# Windows：在 VS Code 下方 PowerShell 貼上後按 Enter
ni index.html,style.css,script.js -ItemType File`,
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
      <div class="antenna"></div>
      <div class="face"><span>• ᴗ •</span></div>
      <div class="badge">✦</div>
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
body {
  min-height: 100vh; margin: 0; display: grid; place-items: center;
  font-family: system-ui, sans-serif; color: #102a43;
  background: radial-gradient(circle at top right, #dcecff, transparent 38%), #fff9ee;
}
.welcome-card {
  width: min(90%, 680px); padding: 52px 28px; text-align: center;
  background: #fffefa; border: 1px solid #dce6ee; border-radius: 28px;
  box-shadow: 0 24px 55px #102a4318;
}
.bot {
  width: 142px; height: 142px; margin: 0 auto 18px; position: relative;
  border: 6px solid #102a43; border-radius: 48px; background: #fff5e4;
  animation: float 2.4s ease-in-out infinite;
}
.antenna { position: absolute; width: 14px; height: 25px; background: #2e73c8; border: 4px solid #102a43; border-bottom: 0; border-radius: 20px 20px 0 0; left: 58px; top: -26px; }
.face { position: absolute; inset: 22px; display: grid; place-items: center; background: #102a43; color: white; border-radius: 34px; font-size: 32px; letter-spacing: 4px; }
.badge { position: absolute; right: -17px; top: -20px; color: #f4a340; font-size: 38px; animation: twinkle 1.4s ease-in-out infinite alternate; }
.label { color: #2e73c8; font-weight: 800; font-size: 12px; letter-spacing: .12em; }
h1 { margin: 8px 0; font-size: clamp(31px, 7vw, 52px); letter-spacing: -.06em; }
p { color: #557087; line-height: 1.8; }
button { border: 0; border-radius: 12px; padding: 13px 18px; background: #f4a340; color: #5a3500; font-weight: 800; cursor: pointer; }
.celebrate { animation: celebrate .45s ease both; }
@keyframes float { 50% { transform: translateY(-10px) rotate(2deg); } }
@keyframes twinkle { to { transform: scale(1.18) rotate(12deg); } }
@keyframes celebrate { 50% { transform: scale(1.08) rotate(-3deg); } }`,
  scriptJs: `const bot = document.getElementById('bot');
const message = document.getElementById('message');
const button = document.getElementById('celebrate');

button.addEventListener('click', () => {
  bot.classList.remove('celebrate');
  void bot.offsetWidth; // 讓每次按鈕都可以重新播放小動畫
  bot.classList.add('celebrate');
  message.textContent = '第一關完成！下一關，我們把這個網站放進 GitHub。';
});`,
  gitPush: `# 先把以下兩行的引號內容改成自己的名字和 GitHub 登記 email
git config --global user.name "YOUR NAME"
git config --global user.email "YOUR_EMAIL@example.com"

# 再完整貼上以下指令；將 YOUR_GITHUB_NAME 改成你的 GitHub username
git init
git add .
git commit -m "第一個小守護員主頁"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_NAME/welcome-site.git
git push -u origin main`,
};

export type CourseStep = {
  id: string; number: string; title: string; short: string; tool: string; reward: string;
  goal: string; place: string; actions: string[]; checks: string[]; code?: CodeKey; note?: string;
};

export const steps: CourseStep[] = [
  { id:"vscode", number:"01", title:"開你的第一個工作枱", short:"VS Code + 三個空檔案", tool:"VS Code", reward:"你會看到自己的網站資料夾", goal:"先在電腦建立一個資料夾，再用 VS Code 打開它。然後只貼一行指令，三個網站檔案會自己出現。", place:"下載 VS Code → File → Open Folder → Terminal → New Terminal", actions:["到 code.visualstudio.com 下載 VS Code；安裝後開啟它。", "按 File → Open Folder，在容易找到的位置新增資料夾，名稱輸入 welcome-site，然後選擇它。", "按上方 Terminal → New Terminal。下方出現黑色區域後，選自己的電腦系統，複製 code 並按 Enter。"], checks:["左側 Explorer 出現 index.html、style.css 和 script.js。", "終端機沒有紅色 error。", "你知道：左側是檔案櫃，下方黑色區域是可以貼指令的終端機。"], code:"macFiles", note:"這一步不會上網，也不會改動其他資料夾；它只是在你剛才開啟的 welcome-site 裡建立三個空檔案。" },
  { id:"welcome", number:"02", title:"貼上小可愛，先看到成果", short:"一個會動的歡迎主頁", tool:"VS Code", reward:"你會得到真的可以打開的歡迎網站", goal:"現在只做一件有趣的事：將完整 HTML、CSS 和 JavaScript 分別貼進三個檔案。做完後，在電腦雙擊 index.html 就能看見小守護員。", place:"左側 Explorer → 逐一點 index.html、style.css、script.js", actions:["點 index.html，按 Ctrl/Cmd + A 全選，貼上 HTML code，按 Ctrl/Cmd + S 儲存。", "點 style.css，重複全選、貼上 CSS code、儲存。", "點 script.js，重複貼上 JavaScript code、儲存；回 Finder／檔案總管雙擊 index.html。"], checks:["瀏覽器看見「你好，我的網站砌好了！」。", "小守護員會上下浮動，星星會閃。", "按黃色按鈕後，文字變成「第一關完成」。"], code:"indexHtml", note:"這是真正的網站，不是預覽圖。你已經有一個可以放上網的初版，只是暫時只在自己電腦。" },
  { id:"github", number:"03", title:"在 GitHub 建一個私人時間盒", short:"New repository：選 Private", tool:"GitHub", reward:"你有可回到舊版本的私人作品庫", goal:"GitHub 幫你保存每次改動。第一次建立時，這個主頁只是你的練習作品，建議選 Private；Vercel 仍可在你授權後讀取它並幫你發布。", place:"github.com → 右上角 + → New repository", actions:["登入 GitHub；右上角按 +，再按 New repository。", "Repository name 輸入 welcome-site。Visibility 請選 Private：只有你及你邀請的人可看程式碼。", "因為電腦已有檔案，不要勾選 Add a README、.gitignore 或 license。按 Create repository，保持這一頁開著。", "回 VS Code 的 Terminal，將 code 裡 YOUR NAME、YOUR_EMAIL、YOUR_GITHUB_NAME 改好後一次貼上。"], checks:["GitHub repository 頂部有鎖頭或 Private 標籤。", "Code 頁面看見 index.html、style.css、script.js。", "你看見 commit 訊息「第一個小守護員主頁」。"], code:"gitPush", note:"甚麼時候選 Public？只有當你真的想讓全世界免費查看和複製程式碼時。Public 不可以放密碼、API key 或私人資料；這個新手主頁選 Private 最簡單。" },
  { id:"vercel", number:"04", title:"Vercel New Project：送小可愛上網", short:"Import → Deploy → 網址成功", tool:"Vercel", reward:"你會得到第一條可以分享的網站網址", goal:"Vercel 會讀取 GitHub 的 welcome-site，建立一個公開網址。首次只需按幾個按鈕；日後你 push 新版本，Vercel 會自動更新網站。", place:"vercel.com → Add New → Project → Import Git Repository", actions:["到 vercel.com，用 GitHub 登入；同意 Vercel 存取你剛才的 repository。", "在 Dashboard 右上角按 Add New → Project。於 Import Git Repository 找到 welcome-site，按 Import。", "在 Configure Project：Project Name 可保留；Framework Preset 選 Other 或保留自動設定；不要填 Build Command。按 Deploy。", "見到 Congratulations／Ready 後，按 Visit；把網址複製到無痕視窗打開，確認所有人都能看見小守護員。"], checks:["Vercel Deployments 顯示 Ready。", "你有一條 https://...vercel.app 網址。", "用手機或無痕視窗開網址，仍看到會動的小守護員。"], note:"這一步成功，代表你已經由 0 做出一個真正發佈了的網站。GitHub 記住 code，Vercel 把它變成網址。" },
  { id:"update", number:"05", title:"試一次真正的網站更新", short:"改字 → push → 自動更新", tool:"GitHub + Vercel", reward:"你會親眼看到網站自動換新版本", goal:"最後做一個小改動，證明自己之後可以獨立更新網站：改主頁一句字，存檔、commit、push；Vercel 會自動發布最新版本。", place:"VS Code → index.html；再到 Terminal；最後 Vercel → Deployments", actions:["在 index.html 找到「你好，我的網站砌好了！」，改成自己的歡迎句，儲存。", "在 Terminal 逐行輸入 git add .、git commit -m \"改了歡迎文字\"、git push。", "回 Vercel 的 Deployments 等待新的 Ready；重新整理正式網址，看見自己的新句子。"], checks:["GitHub 顯示新的 commit。", "Vercel 出現較新的 Ready deployment。", "正式網址已顯示你剛才改的文字。"], note:"第一次成功後只要記住這條節奏：VS Code 改 → GitHub push → Vercel 自動上線。下一階段才會加登入、Firebase 和安全 Rules。" },
];
