export type CodeKey = "macFiles" | "windowsFiles" | "indexHtml" | "styleCss" | "scriptJs" | "gitPush" | "gitUpdate";

export const codeTemplates: Record<CodeKey, string> = {
  macFiles: `touch index.html style.css script.js`,
  windowsFiles: `ni index.html,style.css,script.js -ItemType File`,
  indexHtml: `<!doctype html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>小守護員歡迎你</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <main class="stage">
    <section class="welcome-copy">
      <p class="label">MY FIRST WEBSITE / 由 0 開始</p>
      <h1>先讓小可愛<br><strong>歡迎你。</strong></h1>
      <p id="message">由 Folder 開始，做到第一個守護員歡迎頁。</p>
      <button id="celebrate">按一下，開始砌網站</button>
    </section>

    <section id="scene" class="model-scene" aria-label="小守護員和網站模型">
      <div class="code-block">&lt;/&gt;<span>HTML</span></div>
      <div class="folder-block">▰<span>我的網站</span></div>
      <div class="cloud-block">☁<span>發布</span></div>
      <div class="guardian" aria-hidden="true">
        <i class="antenna"></i><i class="ear left"></i><i class="ear right"></i>
        <div class="head"><div class="visor">• ᴗ •</div></div>
        <div class="body"><b>⬟</b></div><i class="arm left"></i><i class="arm right"></i>
        <i class="leg left"></i><i class="leg right"></i>
      </div>
      <div class="paper-plane">➤</div>
    </section>
  </main>
  <script src="script.js"></script>
</body>
</html>`,
  styleCss: `* { box-sizing: border-box; }
:root { --ink:#102a43; --blue:#2e73c8; --orange:#f4a340; --paper:#ffffff; }
body { min-height:100vh; margin:0; display:grid; place-items:center; overflow-x:hidden; font-family:system-ui,-apple-system,sans-serif; color:var(--ink); background:#fff; }
.stage { width:min(1100px,94vw); min-height:620px; display:grid; grid-template-columns:1fr 1fr; align-items:center; gap:34px; padding:48px; border:1px solid #dce8f0; box-shadow:0 22px 55px #102a4310; background:#fff; }
.label { margin:0 0 14px; color:var(--blue); font-size:12px; font-weight:900; letter-spacing:.12em; }
h1 { margin:0; font-size:clamp(40px,6vw,76px); line-height:1.02; letter-spacing:-.08em; } h1 strong { color:var(--blue); }
#message { max-width:430px; margin:20px 0; color:#60798e; font-size:17px; line-height:1.7; }
button { border:0; padding:15px 20px; border-radius:11px 17px 11px 17px; background:var(--orange); color:#5a3500; font-size:16px; font-weight:900; cursor:pointer; box-shadow:0 8px 0 #d7851b; } button:active { transform:translateY(4px); box-shadow:0 4px 0 #d7851b; }
.model-scene { position:relative; min-height:440px; border:1px dashed #a8c7dd; background:linear-gradient(90deg,#2e73c80b 1px,transparent 1px),linear-gradient(#2e73c80b 1px,transparent 1px),#fff; background-size:28px 28px; overflow:hidden; }
.model-scene > div:not(.guardian) { position:absolute; display:grid; place-items:center; font-weight:900; box-shadow:0 12px 0 #102a4320; }
.model-scene span { display:block; font-size:10px; letter-spacing:.08em; }
.code-block { width:142px; height:110px; left:42px; top:65px; border-radius:14px; background:var(--blue); color:#fff; font-size:48px; transform:rotate(-5deg); }.code-block span{font-size:11px}
.folder-block { width:132px; height:104px; left:38px; bottom:62px; border-radius:13px; background:#102a43; color:#fff; font-size:43px; transform:rotate(4deg); }.folder-block span{font-size:10px}
.cloud-block { width:126px; height:104px; right:46px; bottom:58px; border-radius:13px; background:var(--blue); color:#fff; font-size:42px; transform:rotate(-3deg); }.cloud-block span{font-size:10px}
.guardian { position:absolute; z-index:2; width:156px; height:244px; right:120px; top:77px; animation:float 3s ease-in-out infinite; }.head { position:absolute; top:21px; left:18px; width:120px; height:100px; padding:12px; border:5px solid var(--ink); border-radius:44px; background:#fff; }.visor { height:100%; display:grid; place-items:center; border-radius:28px; background:var(--ink); color:#fff; font-size:29px; letter-spacing:4px; }.antenna { position:absolute; left:70px; top:0; width:14px; height:28px; border:4px solid var(--ink); border-bottom:0; border-radius:18px 18px 0 0; background:var(--blue); }.ear { position:absolute; z-index:-1; top:56px; width:27px; height:44px; border:4px solid var(--ink); border-radius:17px; background:var(--blue); }.ear.left{left:2px}.ear.right{right:2px}.body { position:absolute; left:37px; top:119px; width:83px; height:85px; display:grid; place-items:center; border:5px solid var(--ink); border-radius:30px; background:#fff; color:var(--blue); font-size:31px; }.arm { position:absolute; top:137px; width:44px; height:19px; border:5px solid var(--ink); border-radius:18px; background:#fff; }.arm.left{left:2px;transform:rotate(22deg)}.arm.right{right:1px;transform:rotate(-25deg)}.leg { position:absolute; top:200px; width:28px; height:39px; border:5px solid var(--ink); border-radius:15px 15px 20px 20px; background:#fff; }.leg.left{left:46px}.leg.right{right:43px}.paper-plane { right:18px; top:38px; color:var(--orange); font-size:49px; transform:rotate(-22deg); background:transparent!important; box-shadow:none!important; }
.celebrate { animation:celebrate .65s ease both!important; } @keyframes float{50%{transform:translateY(-12px) rotate(1deg)}} @keyframes celebrate{45%{transform:translateY(-28px) rotate(-5deg) scale(1.08)}75%{transform:translateY(0) rotate(3deg) scale(.98)}}
@media(max-width:720px){.stage{grid-template-columns:1fr;padding:31px 23px;gap:26px}.model-scene{min-height:405px}.guardian{right:80px}.code-block{left:23px}.folder-block{left:25px}.cloud-block{right:23px}h1{font-size:48px}}`,
  scriptJs: `const scene = document.getElementById('scene');
const message = document.getElementById('message');
const button = document.getElementById('celebrate');

button.addEventListener('click', () => {
  scene.classList.remove('celebrate');
  void scene.offsetWidth;
  scene.classList.add('celebrate');
  message.textContent = '第一個歡迎頁完成！下一課會學習把它安全保存到 GitHub。';
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

export type Guide = { title:string; instruction:string; detail:string; microSteps?:string[]; result:string; visual:"download"|"folder"|"open"|"terminal"|"copy"|"github"|"private"|"vercel"|"launch"|"edit"; code?:CodeKey; choices?:CodeKey[]; link?:{label:string;href:string}; tip?:string };
export type CourseStep = { id:string; number:string; title:string; short:string; tool:string; reward:string; goal:string; guides:Guide[] };

export const homeLessonArticle = {
  subtitle: "LESSON 01 / 05 · VS CODE · 零基礎",
  title: "由第一個網站頁面開始",
  goal: "今課會用 VS Code 建立一個簡單的歡迎頁，並在瀏覽器開啟它。你不需要自己編寫程式碼；只要把提供的內容貼到正確檔案即可。",
  flow: ["建立 welcome-site", "建立三個檔案", "貼 code 並開主頁"],
  standard: "瀏覽器顯示小守護員的歡迎頁，而且畫面動畫正常運作。",
  transition: "今課只專注完成一件事：在自己電腦建立並打開第一個網站頁面。VS Code 用來查看和編輯程式碼；GitHub 的版本保存、Vercel 的網址發布，以及 Firebase 的登入和資料設定，會在之後課堂逐步處理。現在請跟住以下分部完成本機版本。",
};

export const steps: CourseStep[] = [
  { id:"vscode", number:"01", title:"打開 VS Code 工作枱", short:"下載 → Folder → Terminal", tool:"VS Code", reward:"", goal:"", guides:[
    { visual:"download", title:"下載並打開 VS Code", instruction:"在這張卡下方的「下載 VS Code」按鈕，開啟官方下載頁。", detail:"下載並安裝 VS Code。", microSteps:["按下方「下載 VS Code」", "選自己的 Mac 或 Windows 版本", "下載完成後雙擊安裝檔，跟畫面完成安裝，再開啟 VS Code"], result:"你會看到藍色 VS Code 圖示和開始畫面。", link:{ label:"下載 VS Code", href:"https://code.visualstudio.com/Download" }, tip:"不要從不明網站下載。這個按鈕會直接前往 VS Code 官方下載頁。" },
    { visual:"folder", title:"建立 welcome-site 資料夾", instruction:"在電腦的桌面或 Documents 資料夾。", detail:"新增一個放網站檔案的資料夾。", microSteps:["在空白位置按右鍵", "選「新增資料夾／New Folder」", "輸入 welcome-site，再按 Enter"], result:"你會看到一個名為 welcome-site 的新資料夾。", tip:"放在桌面或 Documents 最容易找回；先不要放進 Downloads。" },
    { visual:"open", title:"在 VS Code 打開剛才的資料夾", instruction:"回到 VS Code 頂部選單：File → Open Folder…。", detail:"選取 welcome-site 並開啟。", microSteps:["在彈出的視窗找到 welcome-site", "按「Select Folder／開啟」", "如果 VS Code 問是否信任，按 Trust"], result:"左側 Explorer 最上方會顯示 WELCOME-SITE。", tip:"一定要選 welcome-site 本身；不要只選它的上一層桌面或 Documents。" },
    { visual:"terminal", title:"用 Terminal 建立三個網站檔案", instruction:"VS Code 最上方選單 → Terminal → New Terminal。", detail:"貼上建立檔案的指令。", microSteps:["下方出現黑色 Terminal", "選自己的 Mac 或 Windows code 卡，按「複製 code」", "回黑色 Terminal 貼上完整 code，再按 Enter"], result:"左側 Explorer 出現 index.html、style.css、script.js 三個檔案；Terminal 沒有紅色 error。", code:"macFiles", choices:["macFiles", "windowsFiles"], tip:"黑色 Terminal 是本關唯一要貼指令的位置；只需貼一次。" }
  ]},
  { id:"welcome", number:"02", title:"讓小可愛在主頁歡迎你", short:"HTML → CSS → 動畫", tool:"VS Code 左側 Explorer", reward:"", goal:"", guides:[
    { visual:"open", title:"把 HTML code 放進 index.html", instruction:"VS Code 左側 Explorer → index.html。", detail:"完整覆蓋 index.html 的內容。", microSteps:["點 index.html，再按 Ctrl/Cmd + A 全選", "按下方「複製 code」", "回到 index.html 貼上，按 Ctrl/Cmd + S 儲存"], result:"index.html 內會看到由 <!doctype html> 開始的一整段文字。", code:"indexHtml", tip:"檔案名稱必須是 index.html；貼 code 前先全選，舊內容才不會和新內容混在一起。" },
    { visual:"copy", title:"把 CSS code 放進 style.css", instruction:"VS Code 左側 Explorer → style.css。", detail:"完整覆蓋 style.css 的內容。", microSteps:["點 style.css，再按 Ctrl/Cmd + A 全選", "按下方「複製 code」", "貼上完整內容，再按 Ctrl/Cmd + S 儲存"], result:"style.css 內會看到 background、.bot 和 @keyframes 這些文字。", code:"styleCss", tip:"一定是 style.css，不是 styles.css；少一個或多一個 s，主頁就找不到顏色和動畫。" },
    { visual:"terminal", title:"把 JavaScript code 放進 script.js", instruction:"VS Code 左側 Explorer → script.js。", detail:"完整覆蓋 script.js 的內容。", microSteps:["點 script.js，再按 Ctrl/Cmd + A 全選", "按下方「複製 code」", "貼上完整內容，再按 Ctrl/Cmd + S 儲存"], result:"script.js 會看到 addEventListener 和「第一個歡迎頁完成」文字。", code:"scriptJs", tip:"三個檔案都儲存後才測試。看到檔案名稱旁沒有白點或星號，代表已儲存。" },
    { visual:"launch", title:"在瀏覽器打開第一個網站", instruction:"VS Code 左側 Explorer → index.html。", detail:"從資料夾雙擊 index.html。", microSteps:["在 index.html 按右鍵", "選 Reveal in Finder／Show in File Explorer", "彈出資料夾後，雙擊 index.html"], result:"瀏覽器會打開小守護員主頁；按黃色按鈕後，文字變成「第一個歡迎頁完成」。", tip:"看不到浮動動畫時，回 VS Code 檢查 style.css 和 script.js 是否已儲存。" }
  ]},
];
