export const claimCode = {
  indexHtml: `<!doctype html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>NewClaim 會員登入</title>
  <style>
    body { margin:0; min-height:100vh; display:grid; place-items:center; font-family:system-ui,sans-serif; color:#102a43; background:#fff9ee; }
    main { width:min(90%,430px); padding:30px; background:#fffefa; border-radius:22px; box-shadow:0 20px 50px #102a4315; }
    input,button { box-sizing:border-box; width:100%; margin-top:12px; padding:12px; border-radius:10px; font-size:16px; }
    input { border:1px solid #cbd5e1; } button { border:0; background:#2e73c8; color:#fff; font-weight:800; cursor:pointer; }
    button.secondary { background:#eaf3ff; color:#2e73c8; } #message { min-height:24px; color:#557087; }
  </style>
</head>
<body><main>
  <p>NewClaim · 內部會員專區</p><h1>登入報帳帳戶</h1>
  <p>首次使用者，請向管理員索取帳戶或重設密碼連結。</p>
  <input id="email" type="email" placeholder="你的 email" autocomplete="email" />
  <input id="password" type="password" placeholder="密碼" autocomplete="current-password" />
  <button id="login">登入</button><button id="reset" class="secondary">忘記密碼</button><p id="message"></p>
</main>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
<script>
  // Firebase Console → Project settings → Your apps → Web app，貼自己的設定。
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY", authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT", appId: "YOUR_APP_ID"
  };
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth(); const message = document.getElementById("message");
  auth.onAuthStateChanged((user) => { if (user) location.replace("/dashboard.html"); });
  document.getElementById("login").onclick = async () => {
    try { await auth.signInWithEmailAndPassword(email.value.trim(), password.value); }
    catch { message.textContent = "登入未成功，請檢查 email 或密碼。"; }
  };
  document.getElementById("reset").onclick = async () => {
    if (!email.value.trim()) return message.textContent = "請先輸入你的 email。";
    try { await auth.sendPasswordResetEmail(email.value.trim()); message.textContent = "如帳戶存在，重設指引已寄出。"; }
    catch { message.textContent = "暫時未能處理，請稍後再試。"; }
  };
</script></body></html>`,
  dashboardHtml: `<!doctype html>
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
 firebase.initializeApp(firebaseConfig); const auth=firebase.auth(),db=firebase.firestore(),storage=firebase.storage(),message=document.getElementById("message");
 auth.onAuthStateChanged(async user=>{if(!user)return location.replace("/");who.textContent=user.email;await load(user)}); logout.onclick=()=>auth.signOut();
 submit.onclick=async()=>{const user=auth.currentUser,file=receipt.files[0],price=Number(document.getElementById("price").value);if(!file||!(price>0))return message.textContent="請輸入金額並選擇收據。";if(!["image/jpeg","image/png","image/webp"].includes(file.type)||file.size>=10*1024*1024)return message.textContent="請使用小於 10MB 的 JPG、PNG 或 WEBP。";const safe=Date.now()+"_"+file.name.replace(/[^a-zA-Z0-9._-]/g,"_"),path="claims/"+user.uid+"/"+safe;try{message.textContent="正在安全上載…";const ref=storage.ref(path);await ref.put(file);await db.collection("claims").add({userId:user.uid,userEmail:user.email.toLowerCase(),price:price,status:"unclaimed",storagePath:path,createdAt:firebase.firestore.FieldValue.serverTimestamp()});message.textContent="已提交！";await load(user)}catch{message.textContent="未能提交；請核對 Firebase Rules。"}};
 async function load(user){claims.replaceChildren();const snap=await db.collection("claims").where("userId","==",user.uid).get();if(snap.empty)return claims.textContent="未有報帳。";snap.forEach(doc=>{const c=doc.data(),row=document.createElement("div");row.className="claim";const label=document.createElement("span");label.textContent="金額：$"+c.price;const state=document.createElement("b");state.textContent=c.status;row.append(label,state);claims.appendChild(row)})}
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
    function isAdmin() {
      return request.auth != null && request.auth.token.email.lower() == 'YOUR_ADMIN_EMAIL@example.com';
    }
    match /claims/{userId}/{fileName} {
      allow read: if request.auth != null && (request.auth.uid == userId || isAdmin());
      allow create: if request.auth != null && request.auth.uid == userId
        && request.resource.size < 10 * 1024 * 1024
        && request.resource.contentType.matches('image/(jpeg|png|webp)');
      allow delete: if request.auth != null && (request.auth.uid == userId || isAdmin());
    }
  }
}`,
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
};

export const memberAnnouncement = `開支報帳與索償系統 —— 成員安心使用指南

各位朋友、團隊夥伴大家好！

為了令大家提交收據、記錄開支更方便，我們啟用了內部專用報帳系統。這個系統只供管理員建立或批准的熟人帳戶使用。

你的資料如何被保護？
1. 每個會員登入後，系統會用自己的帳戶 UID 分開處理收據和報帳記錄。完成設定及測試後，會員只能讀取自己的資料；管理員才可處理全部報帳。
2. 報帳提交後，會員不能直接修改金額或狀態。管理員未審核前，會員可撤回自己的 unclaimed 記錄，再重新提交；審核後，只有管理員可更改狀態。
3. 就算有人開發者工具或更改瀏覽器畫面，Firebase Rules 仍會在雲端重新檢查登入身分、UID、路徑和資料條件。不符合規則的讀取、上載、更新或刪除請求會被拒絕。
4. 忘記密碼時，重設指引只會寄到該帳戶登記的 email。請勿把重設電郵或密碼交給其他人。

開始使用：
第一步，向管理員索取帳戶或首次登入指引。
第二步，打開正式網站網址；輸入自己的 email 和密碼。
第三步，登入後選取一張 JPG、PNG 或 WEBP 收據，填寫金額並提交。

小提醒：請只使用管理員提供的正式網址；請勿共用帳戶、密碼或收據下載連結。如遇到問題，請聯絡管理員。

本系統採取分帳戶、分 UID 路徑、Firebase Authentication 和 Security Rules 的設計來降低未授權存取及誤操作風險；任何網上系統都需要持續更新、測試和妥善保護管理員帳戶。`;
