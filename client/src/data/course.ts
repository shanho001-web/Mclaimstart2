export type CodeKey =
  | "macSetup"
  | "windowsSetup"
  | "cuteHome"
  | "githubCommands"
  | "vercelJson"
  | "loginHome"
  | "dashboard"
  | "firestoreRules"
  | "storageRules";

export const codeTemplates: Record<CodeKey, string> = {
  macSetup: `# macOS Terminal：貼上整段後按 Enter
mkdir -p newclaim-starter/firebase
cd newclaim-starter
touch index.html dashboard.html vercel.json
touch firebase/firestore.rules firebase/storage.rules
code .`,

  windowsSetup: `# Windows PowerShell：貼上整段後按 Enter
mkdir newclaim-starter
cd newclaim-starter
mkdir firebase
ni index.html,dashboard.html,vercel.json -ItemType File
ni firebase\\firestore.rules,firebase\\storage.rules -ItemType File
code .`,

  cuteHome: `<!doctype html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>我的第一個網站</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; min-height: 100vh; display: grid; place-items: center;
      font-family: system-ui, sans-serif; color: #102a43;
      background: radial-gradient(circle at top right, #dcecff, transparent 40%), #fff9ee; }
    main { width: min(90%, 680px); padding: 54px 30px; text-align: center;
      background: #fffefa; border: 1px solid #dce6ee; border-radius: 28px;
      box-shadow: 0 24px 55px #102a4318; }
    .bot { width: 142px; height: 142px; margin: 0 auto 18px; position: relative;
      border-radius: 48px; background: #fff5e4; border: 6px solid #102a43;
      animation: float 2.4s ease-in-out infinite; }
    .bot:before { content: "• ᴗ •"; position: absolute; inset: 22px; display: grid; place-items: center;
      background: #102a43; color: white; border-radius: 34px; font-size: 33px; letter-spacing: 4px; }
    .bot:after { content: "✦"; position: absolute; right: -17px; top: -20px; color: #f4a340; font-size: 38px; }
    h1 { margin: 0; font-size: clamp(32px, 7vw, 54px); letter-spacing: -.06em; }
    p { color: #557087; line-height: 1.8; } button { border: 0; border-radius: 12px;
      padding: 13px 18px; background: #f4a340; color: #5a3500; font-weight: 800; cursor: pointer; }
    @keyframes float { 50% { transform: translateY(-10px) rotate(2deg); } }
  </style>
</head>
<body>
  <main>
    <div class="bot"></div>
    <h1>你好，我的網站砌好了！</h1>
    <p>第一關完成。下一關，我們會把這個小作品放進 GitHub，讓每個版本都留低紀錄。</p>
    <button onclick="alert('第一關完成！')">按我慶祝一下</button>
  </main>
</body>
</html>`,

  githubCommands: `# 在 VS Code 終端機、並確認你已在 newclaim-starter 資料夾內
git init
git add .
git commit -m "第一關：可愛主頁"
git branch -M main

# 在 GitHub 建立空白 Private repository 後，複製它的 HTTPS 地址，貼到下面：
git remote add origin https://github.com/YOUR_NAME/newclaim-starter.git
git push -u origin main`,

  vercelJson: `{
  "cleanUrls": true,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}`,

  loginHome: `<!doctype html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>NewClaim 登入</title>
  <style>
    body { margin:0; min-height:100vh; display:grid; place-items:center; font-family:system-ui,sans-serif;
      color:#102a43; background:#fff9ee; } main { width:min(90%,430px); padding:30px; background:white;
      border-radius:22px; box-shadow:0 20px 50px #102a4315; } input,button { width:100%; box-sizing:border-box;
      padding:12px; margin-top:12px; border-radius:10px; font-size:16px; } input { border:1px solid #cbd5e1; }
    button { border:0; background:#2e73c8; color:white; font-weight:800; cursor:pointer; }
    button.alt { color:#2e73c8; background:#eaf3ff; } #message { min-height:24px; color:#557087; }
  </style>
</head>
<body><main>
  <p>NewClaim</p><h1>登入你的報帳帳戶</h1><p>首次使用？輸入 email 後按「忘記密碼」。</p>
  <input id="email" type="email" placeholder="你的 email" autocomplete="email" />
  <input id="password" type="password" placeholder="密碼" autocomplete="current-password" />
  <button id="login">登入</button><button id="reset" class="alt">忘記密碼</button><p id="message"></p>
</main>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
<script>
  // Firebase Console → Project settings → Your apps → Web app，貼自己的設定。
  const firebaseConfig = { apiKey:"YOUR_API_KEY", authDomain:"YOUR_PROJECT.firebaseapp.com",
    projectId:"YOUR_PROJECT", appId:"YOUR_APP_ID" };
  firebase.initializeApp(firebaseConfig); const auth = firebase.auth();
  const message = document.getElementById('message');
  auth.onAuthStateChanged(user => { if (user) location.replace('/dashboard'); });
  document.getElementById('login').onclick = async () => {
    try { await auth.signInWithEmailAndPassword(email.value.trim(), password.value); }
    catch { message.textContent = '登入未成功，請檢查 email 或密碼。'; }
  };
  document.getElementById('reset').onclick = async () => {
    if (!email.value.trim()) return message.textContent = '請先輸入你的 email。';
    try { await auth.sendPasswordResetEmail(email.value.trim()); message.textContent = '如帳戶存在，重設信已寄出。'; }
    catch { message.textContent = '暫時未能處理，請稍後再試。'; }
  };
</script></body></html>`,

  dashboard: `<!doctype html>
<html lang="zh-HK"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
<title>NewClaim Dashboard</title><style>
 body{margin:0;background:#fff9ee;color:#102a43;font-family:system-ui,sans-serif} header,main{max-width:900px;margin:auto;padding:20px}
 header{display:flex;align-items:center;justify-content:space-between}section{background:#fff;padding:24px;margin:18px 0;border-radius:18px;box-shadow:0 12px 35px #102a4310}
 input,button{padding:10px;margin:6px 0;border-radius:9px;font-size:15px}input{width:100%;box-sizing:border-box;border:1px solid #cbd5e1}button{border:0;background:#2e73c8;color:#fff;font-weight:800;cursor:pointer}.claim{padding:12px 0;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between}.muted{color:#64748b}
</style></head><body>
<header><div><b>NewClaim</b><br><span id="who" class="muted"></span></div><button id="logout">登出</button></header>
<main><section><h1>提交一張報帳</h1><label>金額<input id="price" type="number" min="0.01" step="0.01" /></label>
<label>收據圖片（JPG、PNG、WEBP；小於 10MB）<input id="receipt" type="file" accept="image/jpeg,image/png,image/webp" /></label>
<button id="submit">安全提交</button><p id="message" class="muted"></p></section><section><h2>我的報帳</h2><div id="claims"></div></section></main>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script><script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script><script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script><script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-storage-compat.js"></script>
<script>
 const firebaseConfig={apiKey:"YOUR_API_KEY",authDomain:"YOUR_PROJECT.firebaseapp.com",projectId:"YOUR_PROJECT",storageBucket:"YOUR_PROJECT.firebasestorage.app",appId:"YOUR_APP_ID"};
 firebase.initializeApp(firebaseConfig); const auth=firebase.auth(),db=firebase.firestore(),storage=firebase.storage(),message=document.getElementById('message');
 auth.onAuthStateChanged(async user=>{if(!user)return location.replace('/');who.textContent=user.email;await load(user)}); logout.onclick=()=>auth.signOut();
 submit.onclick=async()=>{const user=auth.currentUser,file=receipt.files[0],price=Number(document.getElementById('price').value);if(!file||!(price>0))return message.textContent='請輸入金額並選擇收據。';if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>=10*1024*1024)return message.textContent='請使用小於 10MB 的 JPG、PNG 或 WEBP。';const safe=Date.now()+'_'+file.name.replace(/[^a-zA-Z0-9._-]/g,'_'),path='claims/'+user.uid+'/'+safe;try{message.textContent='正在安全上載…';const ref=storage.ref(path);await ref.put(file);await db.collection('claims').add({userId:user.uid,userEmail:user.email.toLowerCase(),price,status:'unclaimed',storagePath:path,url:await ref.getDownloadURL(),createdAt:firebase.firestore.FieldValue.serverTimestamp()});message.textContent='已提交！';await load(user)}catch{message.textContent='未能提交；請核對 Firebase Rules。'}};
 async function load(user){claims.replaceChildren();const snap=await db.collection('claims').where('userId','==',user.uid).get();if(snap.empty)return claims.textContent='未有報帳。';snap.forEach(doc=>{const c=doc.data(),row=document.createElement('div');row.className='claim';row.textContent='金額：$'+c.price+'　'+c.status;claims.appendChild(row)})}
</script></body></html>`,

  firestoreRules: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function signedIn() { return request.auth != null; }
    function isAdmin() {
      return signedIn() && request.auth.token.email.lower() == 'YOUR_ADMIN_EMAIL@example.com';
    }
    match /claims/{claimId} {
      allow read: if signedIn() && (resource.data.userId == request.auth.uid || isAdmin());
      allow create: if signedIn()
        && request.resource.data.userId == request.auth.uid
        && request.resource.data.userEmail.lower() == request.auth.token.email.lower()
        && request.resource.data.status == 'unclaimed'
        && request.resource.data.price is number
        && request.resource.data.price > 0;
      allow update: if isAdmin();
      allow delete: if signedIn() && (isAdmin() ||
        (resource.data.userId == request.auth.uid && resource.data.status == 'unclaimed'));
    }
  }
}`,

  storageRules: `rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /claims/{userId}/{fileName} {
      allow read, delete: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null && request.auth.uid == userId
        && request.resource.size < 10 * 1024 * 1024
        && request.resource.contentType.matches('image/(jpeg|png|webp)');
    }
  }
}`,
};

export type CourseStep = {
  id: string; number: string; title: string; short: string; tool: string; reward: string;
  goal: string; place: string; actions: string[]; checks: string[]; code?: CodeKey; note?: string;
};

export const steps: CourseStep[] = [
  { id:"vscode", number:"01", title:"打開第一個工作枱", short:"VS Code + 自動骨架", tool:"VS Code", reward:"你會得到一個整齊的網站資料夾", goal:"先安裝 VS Code，然後用它內置的終端機一次過建立網站骨架。暫時不需要懂任何程式。", place:"VS Code → File → Open Folder；頂部 Terminal → New Terminal", actions:["下載並安裝 VS Code；完成後打開它。", "按 File → Open Folder，建立並打開一個你容易找到的位置。", "按 Terminal → New Terminal；選擇自己的電腦系統 code，完整貼上後按 Enter。"], checks:["左側 Explorer 出現 index.html、dashboard.html、vercel.json 與 firebase 資料夾。", "終端機最後沒有紅色 error。", "在這個資料夾內按住檔案名稱，可新增、修改和儲存。"], code:"macSetup", note:"Windows 請在 code 卡右上方切換；macOS 使用目前顯示的版本。這段指令只會在你的電腦建立空白檔案。" },
  { id:"cute", number:"02", title:"先砌一個會動的小可愛", short:"第一個可見成果", tool:"VS Code", reward:"你會先看到屬於自己的會動主頁", goal:"在還未接任何帳戶或資料庫前，先用一頁 HTML 做出可愛主頁。你一打開就會看到會浮動的小守護員。", place:"VS Code 左側 Explorer → index.html → 全選 → 貼上", actions:["在左側按 index.html。", "按 Ctrl/Cmd + A 全選，貼上這張 code 卡。", "安裝 VS Code 的 Live Server extension；右下按 Go Live，再在瀏覽器看成果。"], checks:["瀏覽器看到「你好，我的網站砌好了！」。", "小守護員會慢慢上下浮動。", "按按鈕後出現「第一關完成」小提示。"], code:"cuteHome", note:"這一關的目的只是先讓你有作品。先看見成果，再接上真正的帳戶功能。" },
  { id:"github", number:"03", title:"把作品放進 GitHub 時間盒", short:"每次改動都有紀錄", tool:"GitHub", reward:"你會得到可回到舊版本的私人作品庫", goal:"GitHub 會替你的每次儲存留下版本。改錯時可以回到上一個好的版本；它亦是 Vercel 自動發布網站的來源。", place:"github.com → 右上 + → New repository；再回 VS Code Terminal", actions:["登入 GitHub，按 + → New repository，命名 newclaim-starter，選 Private。", "不要勾選 README；建立後複製 HTTPS repository URL。", "回到 VS Code Terminal，貼上 code；只把 YOUR_NAME 改成自己的 GitHub 名稱。"], checks:["GitHub 網頁看到 index.html 等檔案。", "repository 頂部顯示 Private。", "你看到第一個 commit 訊息「第一關：可愛主頁」。"], code:"githubCommands", note:"GitHub 的神奇之處不是把檔案放上網，而是它記住每次改動。之後每做一關都 commit 一次。" },
  { id:"vercel", number:"04", title:"把小可愛送上網", short:"Vercel 正式網址", tool:"Vercel", reward:"你會得到可分享的第一條網站網址", goal:"現在把 GitHub 的作品交給 Vercel。以後每次 GitHub 有新 commit，Vercel 都會自動建立新版；先看 Preview，確認才讓朋友看正式版本。", place:"vercel.com → Add New → Project → Import Git Repository", actions:["以 GitHub 登入 Vercel，選擇 newclaim-starter repository。", "Framework Preset 選 Other；按 Deploy。", "回 VS Code 新增 vercel.json，貼上 code，commit 並 push；Vercel 會再次發布。"], checks:["Vercel 的 Dashboard 顯示綠色 Ready。", "你打開正式網址，看到自己的小守護員主頁。", "GitHub 新建 branch 後，Vercel Deployments 會出現 Preview。"], code:"vercelJson", note:"朋友只使用 Production 的正式網址。Preview 是你自己測試新版本的安全工作枱。" },
  { id:"login", number:"05", title:"主頁升級：接上 Firebase 登入", short:"帳戶與忘記密碼", tool:"Firebase Authentication", reward:"你的網站開始識得誰是會員", goal:"先在 Firebase 建 Project，開啟 Email/Password 登入。然後把 index.html 換成有登入與忘記密碼的大門。", place:"Firebase Console → Build → Authentication → Sign-in method → Email/Password", actions:["Firebase Console 建立 Project；在 Authentication 開啟 Email/Password。", "Project settings → Your apps → 新增 Web app；複製 firebaseConfig。", "以這關的 code 覆蓋 index.html，將所有 YOUR_... 換成自己的值。"], checks:["你可以在 Authentication → Users 手動建立一個熟人帳戶。", "忘記密碼信只會寄到該帳戶登記的 email。", "登入成功後會嘗試進入 /dashboard；下一關才會砌好它。"], code:"loginHome", note:"小型熟人系統最簡單的做法是：你手動建立帳戶，朋友第一次按忘記密碼設定密碼。暫時不需要邀請碼。" },
  { id:"dashboard", number:"06", title:"砌 Dashboard：朋友可以報帳", short:"登入後的工作房", tool:"Firebase + VS Code", reward:"會員可上載自己的收據並看自己的記錄", goal:"現在才建立 dashboard.html。它會先檢查有沒有登入；未登入就返回主頁。已登入會員會以自己的 UID 儲存收據和 claim。", place:"VS Code 左側 Explorer → dashboard.html → 全選 → 貼上", actions:["將 code 覆蓋 dashboard.html，填入與 index.html 完全相同的 Firebase 設定。", "回 Firebase Console，啟用 Firestore Database 與 Storage。", "以自己的測試帳戶登入，在 Dashboard 選一張小圖片和一個金額。"], checks:["未登入直接開 /dashboard 會回到主頁。", "登入後看到 email、提交表格和「我的報帳」。", "還未發布 Rules 時可能出現 permission denied；下一關會正式裝守門員。"], code:"dashboard", note:"重點不是檔名，而是 path 中包含 user.uid：claims/自己的UID/檔名。這是收據隔離的地基。" },
  { id:"security", number:"07", title:"最後裝上真正守門員", short:"Firestore + Storage Rules", tool:"Firebase Security", reward:"會員只可處理自己資料，管理員才可審批", goal:"這是最後才做的安全關。網頁上的按鈕不是保安；Firebase Rules 才是伺服器真正執行的守門員。", place:"Firebase Console → Firestore Database → Rules；Storage → Rules", actions:["先在 Firestore Rules 貼第一張 code，將 YOUR_ADMIN_EMAIL 改成自己的管理員 email，按 Publish。", "在 Storage Rules 切換第二張 code，貼上後按 Publish。", "用會員 A、會員 B、管理員三個帳戶實測每一條規則。"], checks:["A 能提交自己的 claim 和收據。", "B 看不到、改不到、刪不到 A 的 claim 或收據。", "管理員可更新 claim；A 的已審批 claim 不能再自行刪除。"], code:"firestoreRules", note:"完成 Firestore 後按 code 卡上方「Storage Rules」。兩份 Rules 都要 Publish；只完成一份不算完成。" },
  { id:"why", number:"08", title:"現在才打開原理盒", short:"為何順序是這樣", tool:"你的安全地圖", reward:"你已懂得如何繼續加功能而不亂掉", goal:"你已經親手砌好初版。現在回頭看：VS Code 是工作枱，GitHub 是時間盒，Vercel 是發布線，Firebase Authentication 是身分牌，Rules 是真正守門員。", place:"這一關不需要貼 code，只要完成三人測試與記錄。", actions:["在 GitHub 為這個可用版本建立一個 tag，例如 v1.0-first-site。", "寫下下一個只想加的一件功能，例如管理員審批清單。", "每次改功能：開 branch → Vercel Preview → 測試 → Merge main。"], checks:["你能用一句話說出每個工具的職責。", "你知道保安不能只靠前端按鈕。", "你有一個可回復、可再加功能的初版。"], note:"你不需要一下子變成 IT 人。你已知道：每次只加一件事、先測試、再發布，網站就會愈來愈可靠。" },
];
