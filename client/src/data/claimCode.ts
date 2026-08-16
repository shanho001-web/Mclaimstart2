export const claimCode = {
  indexHtml: `<!doctype html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>NewClaim 管理員登入</title>
  <style>
    :root{--ink:#102a43;--blue:#2e73c8;--orange:#f4a340}*{box-sizing:border-box}body{min-height:100vh;margin:0;display:grid;place-items:center;font-family:system-ui,-apple-system,sans-serif;color:var(--ink);background:#fff}.login-shell{width:min(940px,94vw);display:grid;grid-template-columns:1.05fr .95fr;overflow:hidden;border:1px solid #d9e7ef;border-radius:0 28px 0 28px;box-shadow:0 25px 65px #102a4312}.welcome{min-height:580px;padding:56px;background:linear-gradient(135deg,#f5faff,#fff);position:relative;overflow:hidden}.eyebrow{margin:0;color:var(--blue);font-size:12px;font-weight:900;letter-spacing:.12em}.welcome h1{max-width:420px;margin:16px 0 12px;font-size:clamp(37px,5vw,64px);line-height:1.02;letter-spacing:-.07em}.welcome h1 b{color:var(--blue)}.welcome p{max-width:370px;color:#5f788b;line-height:1.75}.guardian{position:absolute;right:8%;bottom:8%;width:190px;height:265px;animation:float 3s ease-in-out infinite}.head{position:absolute;left:21px;top:26px;width:148px;height:117px;border:6px solid var(--ink);border-radius:52px;background:#fff;padding:14px}.visor{height:100%;display:grid;place-items:center;border-radius:32px;background:var(--ink);color:#fff;font-size:33px;letter-spacing:5px}.ear{position:absolute;z-index:-1;top:62px;width:33px;height:50px;border:5px solid var(--ink);border-radius:20px;background:var(--blue)}.ear.left{left:0}.ear.right{right:0}.antenna{position:absolute;left:87px;top:0;width:16px;height:31px;border:5px solid var(--ink);border-bottom:0;border-radius:20px 20px 0 0;background:var(--blue)}.body{position:absolute;left:49px;top:143px;width:95px;height:98px;display:grid;place-items:center;border:6px solid var(--ink);border-radius:35px;background:#fff;color:var(--blue);font-size:33px}.arm{position:absolute;top:163px;width:47px;height:21px;border:5px solid var(--ink);border-radius:20px;background:#fff}.arm.left{left:4px;transform:rotate(25deg)}.arm.right{right:4px;transform:rotate(-25deg)}.leg{position:absolute;top:235px;width:31px;height:29px;border:5px solid var(--ink);border-radius:16px 16px 20px 20px;background:#fff}.leg.left{left:58px}.leg.right{right:56px}.login{padding:54px 42px;background:#fff}.login h2{margin:10px 0 7px;font-size:31px;letter-spacing:-.05em}.login>p{color:#60798e;line-height:1.65}.admin-note{margin:22px 0;padding:13px;border-left:4px solid var(--orange);background:#fff9ec;color:#73500c;font-size:13px;line-height:1.65}label{display:grid;gap:7px;margin-top:16px;font-size:13px;font-weight:900}input,button{width:100%;padding:14px;border-radius:10px;font-size:16px}input{border:1px solid #cbdbe6}button{margin-top:22px;border:0;background:var(--blue);color:#fff;font-weight:900;cursor:pointer;box-shadow:0 7px 0 #1e579a}button:active{transform:translateY(3px);box-shadow:0 4px 0 #1e579a}#message{min-height:25px;color:#b13c2c;font-size:13px;line-height:1.6}@keyframes float{50%{transform:translateY(-11px) rotate(1deg)}}@media(max-width:700px){.login-shell{grid-template-columns:1fr}.welcome{min-height:360px;padding:35px}.guardian{transform:scale(.8);transform-origin:right bottom;right:5%;bottom:-6%}.login{padding:35px 24px}}
  </style>
</head>
<body>
  <main class="login-shell">
    <section class="welcome"><p class="eyebrow">NEWCLAIM / ADMIN CONSOLE</p><h1>小守護員<br><b>等你回來。</b></h1><p>這是管理員專用的 Claim 控制台。登入後可查看所有紀錄、下載收據及更新狀態。</p><div class="guardian" aria-hidden="true"><i class="antenna"></i><i class="ear left"></i><i class="ear right"></i><div class="head"><div class="visor">• ᴗ •</div></div><div class="body">⬟</div><i class="arm left"></i><i class="arm right"></i><i class="leg left"></i><i class="leg right"></i></div></section>
    <section class="login"><p class="eyebrow">管理員登入</p><h2>登入 Claim 主頁</h2><p>這個版本沒有會員註冊。請先在 Firebase Authentication 手動建立管理員帳戶。</p><div class="admin-note">只允許下方 code 內設定的 <b>YOUR_ADMIN_EMAIL</b> 登入；其他帳戶即使存在，也會被登出。</div><label>管理員 Email<input id="email" type="email" autocomplete="email" placeholder="admin@example.com" /></label><label>密碼<input id="password" type="password" autocomplete="current-password" placeholder="你的管理員密碼" /></label><button id="login">登入管理主頁</button><p id="message" role="alert"></p></section>
  </main>
  <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script><script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
  <script>
    const firebaseConfig={apiKey:"YOUR_API_KEY",authDomain:"YOUR_PROJECT.firebaseapp.com",projectId:"YOUR_PROJECT",appId:"YOUR_APP_ID"};
    const ADMIN_EMAIL="YOUR_ADMIN_EMAIL@example.com".toLowerCase();
    firebase.initializeApp(firebaseConfig);const auth=firebase.auth();const email=document.getElementById("email"),password=document.getElementById("password"),message=document.getElementById("message");
    function isAdmin(user){return user&&user.email&&user.email.toLowerCase()===ADMIN_EMAIL;}
    auth.onAuthStateChanged(async user=>{if(!user)return;if(!isAdmin(user)){message.textContent="這不是指定管理員帳戶，已安全登出。";await auth.signOut();return;}location.replace("/dashboard.html");});
    document.getElementById("login").onclick=async()=>{message.textContent="";if(email.value.trim().toLowerCase()!==ADMIN_EMAIL)return message.textContent="請輸入 code 裡設定的管理員 Email。";try{await auth.signInWithEmailAndPassword(email.value.trim(),password.value);}catch{message.textContent="登入未成功，請檢查 Email、密碼或 Firebase Authentication 設定。";}};
  </script>
</body></html>`,
  dashboardHtml: `<!doctype html>
<html lang="zh-HK"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>NewClaim 管理主頁</title><style>
:root{--ink:#102a43;--blue:#2e73c8;--orange:#f4a340}*{box-sizing:border-box}body{margin:0;background:#fff;color:var(--ink);font-family:system-ui,-apple-system,sans-serif}.top,main{max-width:1120px;margin:auto;padding:22px}.top{display:flex;justify-content:space-between;align-items:center}.brand{display:flex;gap:12px;align-items:center}.mini-bot{display:grid;place-items:center;width:46px;height:46px;border:4px solid var(--ink);border-radius:18px;background:#fff;color:var(--blue);font-size:20px;box-shadow:6px 6px 0 #2e73c820}.muted{color:#688095;font-size:13px}.logout{width:auto;margin:0;padding:10px 14px;border:1px solid #bcd1df;background:#fff;color:var(--ink);box-shadow:none}main{padding-top:8px}.hero{position:relative;overflow:hidden;padding:32px;border:1px solid #dbe8f0;background:linear-gradient(120deg,#f4faff,#fff);border-radius:0 24px 0 24px}.hero h1{margin:6px 0;font-size:clamp(30px,5vw,50px);letter-spacing:-.06em}.hero h1 b{color:var(--blue)}.hero p{max-width:620px;color:#60798e;line-height:1.7}.hero-bot{position:absolute;right:35px;bottom:-25px;width:125px;height:125px;border:6px solid var(--ink);border-radius:45px;background:#fff;color:#fff;box-shadow:0 0 0 14px var(--blue),0 0 0 26px #eaf4ff}.hero-bot:before{content:"• ᴗ •";position:absolute;inset:19px;display:grid;place-items:center;border-radius:25px;background:var(--ink);font-size:24px;letter-spacing:3px}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:15px;margin:22px 0}.stat,section{background:#fff;border:1px solid #dbe8f0;border-radius:0 18px 0 18px}.stat{padding:18px}.stat small{color:#688095;font-weight:800}.stat b{display:block;margin-top:7px;font-size:28px;color:var(--blue)}section{padding:24px;margin:18px 0}section h2{margin:0 0 7px}.add-grid{display:grid;grid-template-columns:1fr 1fr;gap:13px;margin-top:17px}.add-grid label{display:grid;gap:6px;font-size:13px;font-weight:900}.add-grid input{width:100%;padding:11px;border:1px solid #bcd1df;border-radius:8px;font:inherit}.add-grid button{align-self:end;padding:12px;border:0;border-radius:8px;background:var(--blue);color:#fff;font-weight:900;cursor:pointer}.claims{display:grid;gap:10px;margin-top:18px}.claim{display:grid;grid-template-columns:1.3fr .7fr .7fr auto;gap:12px;align-items:center;padding:15px;border-top:1px dashed #cbdde8}.claim:first-child{border-top:0}.claim small{display:block;color:#688095}.claim select,.claim button{padding:9px;border-radius:8px;font-size:13px}.claim select{border:1px solid #bcd1df;background:#fff}.claim button{border:0;background:#eaf3ff;color:#205b9d;font-weight:900;cursor:pointer}.notice{padding:14px;background:#fff9ec;border-left:4px solid var(--orange);color:#77510b;line-height:1.65;font-size:13px}#message{color:#aa3b2e;font-size:13px}@media(max-width:700px){.top,main{padding:16px}.hero{padding:25px 20px 122px}.hero-bot{right:30px;bottom:-9px;transform:scale(.78);transform-origin:right bottom}.stats,.add-grid{grid-template-columns:1fr}.claim{grid-template-columns:1fr 1fr}.claim button{grid-column:1/-1}}
</style></head><body>
<header class="top"><div class="brand"><div class="mini-bot">⬟</div><div><b>NewClaim 管理控制台</b><br><span id="who" class="muted"></span></div></div><button id="logout" class="logout">登出</button></header>
<main><section class="hero"><p class="muted">ADMIN / CLAIM REVIEW</p><h1>小守護員已整理好<br><b>所有 Claim。</b></h1><p>管理員可新增 Claim、上載收據、查看所有紀錄，並把狀態改為 unclaimed、approved 或 rejected。</p><div class="hero-bot" aria-hidden="true"></div></section><div class="stats"><div class="stat"><small>全部 Claim</small><b id="total">—</b></div><div class="stat"><small>待處理</small><b id="pending">—</b></div><div class="stat"><small>已批准</small><b id="approved">—</b></div></div><section><h2>新增 Claim</h2><p class="muted">管理員可以先用這張表單建立 Claim 和收據，之後在下方更新審核狀態。</p><div class="add-grid"><label>Claim 名稱<input id="title" placeholder="例如：採購網站素材" /></label><label>金額<input id="price" type="number" min="0.01" step="0.01" placeholder="0.00" /></label><label>收據圖片（JPG、PNG、WEBP；小於 10MB）<input id="receipt" type="file" accept="image/jpeg,image/png,image/webp" /></label><button id="create">新增 Claim</button></div><div class="notice">如要新增管理員，請先在 Firebase Authentication → Users 手動新增帳戶，再同步修改這份 code 與兩份 Rules 的 <b>YOUR_ADMIN_EMAIL</b>。</div><p id="message"></p></section><section><h2>管理 Claim</h2><p class="muted">只有指定管理員 Email 可讀取、建立或更新這些紀錄；Firebase Rules 會再次核對。</p><div id="claims" class="claims"></div></section></main>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script><script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script><script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script><script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-storage-compat.js"></script><script>
const firebaseConfig={apiKey:"YOUR_API_KEY",authDomain:"YOUR_PROJECT.firebaseapp.com",projectId:"YOUR_PROJECT",storageBucket:"YOUR_PROJECT.firebasestorage.app",appId:"YOUR_APP_ID"};const ADMIN_EMAIL="YOUR_ADMIN_EMAIL@example.com".toLowerCase();firebase.initializeApp(firebaseConfig);const auth=firebase.auth(),db=firebase.firestore(),storage=firebase.storage(),claims=document.getElementById("claims"),message=document.getElementById("message");
function isAdmin(user){return user&&user.email&&user.email.toLowerCase()===ADMIN_EMAIL;}auth.onAuthStateChanged(async user=>{if(!user)return location.replace("/");if(!isAdmin(user)){await auth.signOut();return location.replace("/");}document.getElementById("who").textContent=user.email;await loadClaims();});document.getElementById("logout").onclick=()=>auth.signOut();document.getElementById("create").onclick=async()=>{const user=auth.currentUser,title=document.getElementById("title").value.trim()||"未命名 Claim",price=Number(document.getElementById("price").value),file=document.getElementById("receipt").files[0];if(!(price>0)||!file)return message.textContent="請填寫金額並選擇收據圖片。";if(!["image/jpeg","image/png","image/webp"].includes(file.type)||file.size>=10*1024*1024)return message.textContent="只可上載小於 10MB 的 JPG、PNG 或 WEBP。";try{message.textContent="小守護員正在整理 Claim…";const safe=Date.now()+"_"+file.name.replace(/[^a-zA-Z0-9._-]/g,"_"),path="claims/"+user.uid+"/"+safe;await storage.ref(path).put(file);await db.collection("claims").add({title,price,status:"unclaimed",storagePath:path,userEmail:user.email,createdAt:firebase.firestore.FieldValue.serverTimestamp()});message.textContent="Claim 已新增。";document.getElementById("title").value="";document.getElementById("price").value="";document.getElementById("receipt").value="";await loadClaims();}catch{message.textContent="未能新增 Claim；請核對管理員 Email 與 Firebase Rules。";}};
async function loadClaims(){try{claims.replaceChildren();const snap=await db.collection("claims").orderBy("createdAt","desc").get();let pending=0,approved=0;document.getElementById("total").textContent=snap.size;snap.forEach(doc=>{const c=doc.data();if(c.status==="unclaimed")pending++;if(c.status==="approved")approved++;const row=document.createElement("div");row.className="claim";const owner=document.createElement("div");owner.innerHTML="<b></b><small></small>";owner.querySelector("b").textContent=c.title||"未命名 Claim";owner.querySelector("small").textContent=(c.userEmail||"管理員")+" · 金額：$"+Number(c.price||0).toFixed(2);const state=document.createElement("select");["unclaimed","approved","rejected"].forEach(value=>{const option=document.createElement("option");option.value=value;option.textContent=value;if(value===c.status)option.selected=true;state.appendChild(option)});state.onchange=async()=>{await db.collection("claims").doc(doc.id).update({status:state.value,reviewedAt:firebase.firestore.FieldValue.serverTimestamp()});await loadClaims();};const receipt=document.createElement("button");receipt.textContent="開收據";receipt.onclick=async()=>{if(!c.storagePath)return;const url=await storage.ref(c.storagePath).getDownloadURL();window.open(url,"_blank","noopener");};row.append(owner,state,receipt);claims.appendChild(row)});document.getElementById("pending").textContent=pending;document.getElementById("approved").textContent=approved;if(snap.empty)claims.textContent="暫時未有 Claim。";}catch{message.textContent="未能讀取 Claim；請核對管理員 Email 與 Firestore Rules。";}}
</script></body></html>`,
  firestoreRules: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null
        && request.auth.token.email.lower() == 'YOUR_ADMIN_EMAIL@example.com';
    }
    match /claims/{claimId} {
      allow read, create, update, delete: if isAdmin();
    }
  }
}`,
  storageRules: `rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    function isAdmin() {
      return request.auth != null
        && request.auth.token.email.lower() == 'YOUR_ADMIN_EMAIL@example.com';
    }
    match /claims/{allPaths=**} {
      allow read, write: if isAdmin();
    }
  }
}`,
  vercelJson: `{
  "cleanUrls": true,
  "rewrites": [
    { "source": "/", "destination": "/index.html" },
    { "source": "/dashboard", "destination": "/dashboard.html" }
  ],
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
};

export const memberAnnouncement = `NewClaim 管理員操作說明

這個版本是管理員專用 Claim 控制台，沒有公開會員註冊頁。

開始前：
1. 在 Firebase Authentication → Users 手動建立管理員 Email／密碼帳戶。
2. 將同一個 Email 填入 index.html、dashboard.html、Firestore Rules、Storage Rules 的 YOUR_ADMIN_EMAIL。
3. 啟用 Email/Password 登入，貼好 Rules 後按 Publish。

登入後，管理員可以查看所有 Claim、開啟收據及更新狀態。未被指定的帳戶會被登入頁和 Firebase Rules 拒絕存取。

提醒：不要把 Service Account、管理員密碼或任何 Firebase 私密憑證放進 GitHub 或前端檔案；請只使用正式網址登入。`;
