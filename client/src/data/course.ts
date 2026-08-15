export type CodeKey = "macFiles" | "windowsFiles" | "indexHtml" | "styleCss" | "scriptJs" | "gitPush" | "gitUpdate";

export const codeTemplates: Record<CodeKey, string> = {
  macFiles: `# macOS：在 VS Code 下方黑色 Terminal 貼上後，按 Enter
touch index.html style.css script.js`,
  windowsFiles: `# Windows：在 VS Code 下方黑色 PowerShell 貼上後，按 Enter
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
  gitPush: `# 先把引號中的內容換成自己的名字和 GitHub 登記 email
git config --global user.name "YOUR NAME"
git config --global user.email "YOUR_EMAIL@example.com"

# 再將 YOUR_GITHUB_NAME 換成自己的 GitHub username，完整貼上
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

export const steps:CourseStep[]=[
 {id:"vscode",number:"01",title:"打開 VS Code 工作枱",short:"下載 → Folder → Terminal",tool:"VS Code",reward:"三個網站檔案",goal:"這一關只做五個小動作。做完後，VS Code 左邊會出現三個網站檔案。",guides:[
  {visual:"download",title:"下載 VS Code",instruction:"按下面藍色按鈕，進入 VS Code 官方下載頁。",detail:"在頁面按自己電腦的下載按鈕：Mac 選 macOS；Windows 選 Windows。下載完成後，照畫面安裝，再打開 VS Code。",result:"你會看到一個藍色 VS Code 圖示和開始畫面。",link:{label:"打開 VS Code 官方下載頁",href:"https://code.visualstudio.com/Download"},tip:"如果瀏覽器問你要不要儲存安裝檔，按儲存；下載完成後雙擊安裝檔。"},
  {visual:"folder",title:"先在電腦建立新 Folder",instruction:"回到桌面或你最容易找到的位置。按右鍵 → New Folder／新增資料夾。",detail:"新 Folder 的名字一定輸入：welcome-site。這就是你整個網站的家。",result:"桌面或檔案總管出現一個名為 welcome-site 的資料夾。",tip:"不要在 Downloads 裡隨便建立；放在桌面或 Documents，日後較易找回。"},
  {visual:"open",title:"在 VS Code 開啟剛才的 Folder",instruction:"回到 VS Code 最上方，按 File → Open Folder…。",detail:"彈出檔案選擇視窗後，找到剛才建立的 welcome-site，按 Select Folder／開啟。",result:"VS Code 左邊 Explorer 的最上方會顯示 WELCOME-SITE。",tip:"如果跳出信任資料夾的訊息，這是你自己剛建立的 Folder，可以按 Trust。"},
  {visual:"terminal",title:"打開黑色 Terminal",instruction:"在 VS Code 最上方按 Terminal → New Terminal。",detail:"畫面下半部會彈出一個黑色區域，前面通常有一行文字和閃動游標。那就是可以貼指令的位置。",result:"你看到下方黑色 Terminal，游標正在等你輸入。",tip:"找不到 Terminal？先看視窗最頂部的選單列；它通常在 Run 的旁邊。"},
  {visual:"copy",title:"複製一行 code，按 Enter",instruction:"選擇自己的 Mac 或 Windows，按「複製 code」。然後在黑色 Terminal 按一下，貼上並按 Enter。",detail:"這行 code 會在 welcome-site 裡自動建立 index.html、style.css 和 script.js。",result:"左側 Explorer 會立即出現三個新檔案；Terminal 沒有紅色 error。",code:"macFiles",choices:["macFiles","windowsFiles"],tip:"只需要貼一次。完成後不要關閉 VS Code，下一關會直接用這三個檔案。"}
 ]},
 {id:"welcome",number:"02",title:"讓小可愛在主頁歡迎你",short:"HTML → CSS → 動畫",tool:"VS Code",reward:"會動的歡迎網站",goal:"你不需要自己寫 code。這一關只是把三張完整 code 卡，分別放進三個對應檔案。",guides:[
  {visual:"open",title:"先打開 index.html",instruction:"在左側 Explorer 點 index.html。",detail:"右邊會出現空白編輯區。按 Ctrl/Cmd + A 全選，再貼上下一張 HTML code。",result:"index.html 裡不再是空白，看到很多由 <html> 開始的文字。",code:"indexHtml",tip:"每次貼完都按 Ctrl/Cmd + S。右下角沒有轉圈或星號，就代表已儲存。"},
  {visual:"copy",title:"現在貼 style.css",instruction:"在左側點 style.css；同樣按 Ctrl/Cmd + A 全選。",detail:"貼上 CSS code，然後按 Ctrl/Cmd + S。CSS 是小可愛的顏色、形狀和浮動動畫。",result:"style.css 內會看到 background、.bot 和 @keyframes 等文字。",code:"styleCss",tip:"檔案名稱一定是 style.css；不要改成 styles.css，否則主頁找不到它。"},
  {visual:"terminal",title:"最後貼 script.js",instruction:"在左側點 script.js，按 Ctrl/Cmd + A 全選。",detail:"貼上 JavaScript code，再儲存。它令黃色按鈕被按下時，小可愛會慶祝。",result:"script.js 出現 addEventListener 和第一關完成的文字。",code:"scriptJs",tip:"這是三個檔案最後一個。三個檔案都存好才試開主頁。"},
  {visual:"launch",title:"打開自己的第一個網站",instruction:"在 VS Code 左側對 index.html 按右鍵，選 Reveal in Finder／Show in File Explorer。",detail:"彈出電腦資料夾後，雙擊 index.html。它會在瀏覽器打開。",result:"你看到小守護員會浮動；按黃色按鈕後，文字會變成「第一關完成」。",tip:"看不到動畫？先回 VS Code，再檢查 style.css 和 script.js 是否已按儲存。"}
 ]},
 {id:"github",number:"03",title:"把作品放進 GitHub 私人 repository",short:"New repository → Private",tool:"GitHub",reward:"可回復的私人版本",goal:"GitHub 會保存這個已成功的小可愛主頁。這個練習不需要公開 code，所以我們選 Private。",guides:[
  {visual:"github",title:"打開 GitHub，登入帳戶",instruction:"按下面按鈕，開 GitHub。沒有帳戶先按 Sign up；有帳戶就按 Sign in。",detail:"登入後，看右上角應出現自己的頭像。",result:"你可以在右上角看到 + 按鈕和自己的帳戶頭像。",link:{label:"打開 GitHub",href:"https://github.com/"},tip:"GitHub 是存 code 的地方，不是發布網址的地方。網址會在下一關由 Vercel 建立。"},
  {visual:"github",title:"按 +，選 New repository",instruction:"GitHub 右上角點 +。",detail:"在小選單中按 New repository；會跳到 Create a new repository 頁面。",result:"畫面出現 Repository name 和 Visibility 兩個欄位。",tip:"不要按 New project；我們要的是 New repository。"},
  {visual:"folder",title:"輸入 repository 名稱",instruction:"在 Repository name 輸入：welcome-site。",detail:"Owner 保持自己的 GitHub 帳戶。Description 可以留空。",result:"名稱下方顯示綠色剔號，代表名稱可以使用。",tip:"名稱最好和你的本地 Folder 一樣，日後最不容易混亂。"},
  {visual:"private",title:"選 Private；三個選項都不要勾",instruction:"在 Visibility 選 Private。向下看 Add a README、.gitignore template、Choose a license 三項。",detail:"三項都保持未剔選。因為 welcome-site 在你的電腦已經有檔案；預先建立 README 會令第一次上載變複雜。",result:"你會看到 Private 被選中，三個額外選項都沒有藍色剔號。",tip:"Public 代表所有網民都可看你的 code；這個新手作品先選 Private 最簡單。"},
  {visual:"copy",title:"Create repository，回 VS Code 貼 code",instruction:"按綠色 Create repository。建立完成後，不要關閉 GitHub；回到 VS Code 的黑色 Terminal。",detail:"複製下面整張 code 卡。先將 YOUR NAME、YOUR_EMAIL、YOUR_GITHUB_NAME 三個位置換成自己的資料，再貼入 Terminal，按 Enter。",result:"GitHub 網頁刷新後，會看到 index.html、style.css、script.js 三個檔案。",code:"gitPush",tip:"如果 Terminal 第一次問 GitHub 密碼，請依畫面選擇瀏覽器登入；不要把密碼貼進公開記事本。"}
 ]},
 {id:"vercel",number:"04",title:"Vercel New Project：發布網址",short:"Add New → Import → Deploy",tool:"Vercel",reward:"真正的 .vercel.app 網址",goal:"現在把 GitHub 裡的 repository 交給 Vercel。它會把三個檔案變成朋友也能打開的網址。",guides:[
  {visual:"vercel",title:"用 GitHub 登入 Vercel",instruction:"按下面按鈕開 Vercel；選 Continue with GitHub。",detail:"第一次會問你是否授權 Vercel 存取 GitHub repository。按同意，否則它找不到 welcome-site。",result:"你到達 Vercel Dashboard，右上角有 Add New。",link:{label:"打開 Vercel",href:"https://vercel.com/"},tip:"這一步不需要填信用卡；我們只是在連接剛才的 GitHub 作品。"},
  {visual:"vercel",title:"Add New → Project",instruction:"在 Vercel Dashboard 右上角按 Add New。",detail:"選單中按 Project。進入 New Project 頁面後，尋找 Import Git Repository。",result:"畫面列出你有權使用的 GitHub repositories。",tip:"若 welcome-site 沒出現，按 Adjust GitHub App Permissions，允許 Vercel 讀取這個 Private repository。"},
  {visual:"github",title:"在 welcome-site 旁按 Import",instruction:"找到 welcome-site 這一行，按右側 Import。",detail:"下一頁是 Configure Project；Project Name 可以保留 welcome-site。",result:"你進入 Configure Project 頁面，底部有 Deploy 按鈕。",tip:"請確認 repository 名稱是 welcome-site，而不是其他練習檔案。"},
  {visual:"copy",title:"選 Other，然後 Deploy",instruction:"Framework Preset 選 Other。Root Directory 保持 ./；Build Command 留空。",detail:"因為這是三個純 HTML/CSS/JS 檔案，不需要 npm 或 build command。設定完成後按 Deploy。",result:"Vercel 開始建立 deployment；等候畫面最後會顯示 Ready 或 Congratulations。",tip:"若框架選單已自動是 Other，保持它，不需要額外改動。"},
  {visual:"launch",title:"按 Visit，複製你的第一條網址",instruction:"見到 Ready 後按 Visit。",detail:"在新頁看見小守護員後，複製網址；再用手機或無痕視窗開一次。",result:"你得到 https://...vercel.app 網址，而且不登入也看見小守護員。",tip:"這一步成功，你已經由 0 發布了一個真正網站。"}
 ]},
 {id:"update",number:"05",title:"改一句字，親眼看自動更新",short:"改字 → push → 新版上線",tool:"GitHub + Vercel",reward:"你已掌握日後更新節奏",goal:"最後只改一行字，親眼看到 GitHub 和 Vercel 自動合作。完成後你就知道日後如何自己更新網站。",guides:[
  {visual:"edit",title:"改一行歡迎文字",instruction:"回 VS Code，點 index.html。",detail:"找到「你好，我的網站砌好了！」，改成自己的句子；例如「你好，歡迎來到小明的第一個網站！」然後儲存。",result:"在自己電腦重新打開 index.html，已看見新句子。",tip:"只改這一句；第一次更新要小，才容易知道哪一步成功。"},
  {visual:"terminal",title:"在 Terminal 送出新版本",instruction:"回 VS Code 最下方黑色 Terminal。",detail:"完整複製以下三行，貼上後按 Enter。",result:"Terminal 顯示 push 完成；沒有紅色 error。",code:"gitUpdate",tip:"這三行做三件事：收集改動、替改動命名、送到 GitHub。"},
  {visual:"github",title:"先在 GitHub 確認新 commit",instruction:"回 GitHub 的 welcome-site 頁面，重新整理。",detail:"檔案上方應出現「改了歡迎文字」的最新 commit。",result:"GitHub 已保存新版本。",tip:"未見新 commit？回 Terminal 看有沒有忘記輸入 git push。"},
  {visual:"vercel",title:"在 Vercel 等新的 Ready",instruction:"回 Vercel Project → Deployments。",detail:"最上方會出現一個新的 Building deployment；等它轉為 Ready。",result:"新的 deployment 時間比上一個新，而且顯示 Ready。",tip:"這是 GitHub push 後 Vercel 自動工作的證據。"},
  {visual:"launch",title:"重新整理正式網址，完成！",instruction:"再次打開你的 .vercel.app 網址，按重新整理。",detail:"你剛才改的句子已在正式網站出現。",result:"第一階段完成：你不只做了網站，還自己更新並發布了它。",tip:"日後的固定節奏：VS Code 改 → git add / commit / push → Vercel 自動上線。"}
 ]},
];
