export type CodeKey =
  | "firebaseConfig"
  | "indexHtml"
  | "dashboardHtml"
  | "firestoreRules"
  | "storageRules"
  | "vercelJson";

export const codeTemplates: Record<CodeKey, string> = {
  firebaseConfig: `// 在 Firebase Console → Project settings → Your apps → Web app 找到這些資料。
// 請把每個 YOUR_... 改成自己的 Firebase 設定。
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();`,

  indexHtml: `<!doctype html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>NewClaim 登入</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #fff9ee; color: #102a43; margin: 0; }
    main { max-width: 420px; margin: 10vh auto; padding: 28px; background: white; border-radius: 20px; box-shadow: 0 16px 45px #102a4314; }
    input, button { width: 100%; box-sizing: border-box; padding: 12px; margin-top: 12px; border-radius: 10px; font-size: 16px; }
    input { border: 1px solid #cbd5e1; }
    button { border: 0; background: #2e73c8; color: white; font-weight: 700; cursor: pointer; }
    button.secondary { color: #2e73c8; background: #eaf3ff; }
    #message { min-height: 22px; margin-top: 14px; color: #516579; }
  </style>
</head>
<body>
  <main>
    <p>NewClaim</p>
    <h1>登入你的報帳帳戶</h1>
    <p>帳戶由管理員為熟人建立；首次使用可按「忘記密碼」。</p>
    <input id="email" type="email" placeholder="你的 email" autocomplete="email" />
    <input id="password" type="password" placeholder="密碼" autocomplete="current-password" />
    <button id="loginButton">登入</button>
    <button id="resetButton" class="secondary">忘記密碼</button>
    <p id="message" role="status"></p>
  </main>

  <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-storage-compat.js"></script>
  <script>
    // 貼上「Firebase 設定」步驟中的完整 code。
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
      appId: "YOUR_APP_ID"
    };
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const message = document.getElementById('message');

    auth.onAuthStateChanged((user) => {
      if (user) location.replace('/dashboard');
    });

    document.getElementById('loginButton').addEventListener('click', async () => {
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      try {
        await auth.signInWithEmailAndPassword(email, password);
        location.replace('/dashboard');
      } catch (error) {
        message.textContent = '登入未成功，請檢查 email 或密碼。';
      }
    });

    document.getElementById('resetButton').addEventListener('click', async () => {
      const email = document.getElementById('email').value.trim();
      if (!email) return message.textContent = '請先輸入你的 email。';
      try {
        await auth.sendPasswordResetEmail(email);
        message.textContent = '如這個 email 已登記，重設信已寄出。';
      } catch (error) {
        message.textContent = '未能處理，請稍後再試。';
      }
    });
  </script>
</body>
</html>`,

  dashboardHtml: `<!doctype html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>NewClaim Dashboard</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #fff9ee; color: #102a43; margin: 0; }
    header, main { max-width: 960px; margin: auto; padding: 20px; }
    header { display: flex; align-items: center; justify-content: space-between; }
    section { background: white; padding: 24px; margin: 18px 0; border-radius: 18px; box-shadow: 0 12px 35px #102a4310; }
    input, button { padding: 10px; margin: 6px 0; border-radius: 9px; font-size: 15px; }
    input { width: 100%; box-sizing: border-box; border: 1px solid #cbd5e1; }
    button { border: 0; background: #2e73c8; color: white; font-weight: 700; cursor: pointer; }
    .claim { border-top: 1px solid #e2e8f0; padding: 13px 0; display: flex; justify-content: space-between; gap: 16px; }
    .muted { color: #64748b; }
    .status { display: inline-block; color: #176b43; background: #e9f9ef; padding: 3px 8px; border-radius: 99px; }
  </style>
</head>
<body>
  <header>
    <div><strong>NewClaim</strong><br /><span id="who" class="muted"></span></div>
    <button id="logoutButton">登出</button>
  </header>
  <main>
    <section>
      <h1>提交一張報帳</h1>
      <label>金額<input id="price" type="number" min="0.01" step="0.01" placeholder="例如：120" /></label>
      <label>收據圖片（JPG、PNG 或 WEBP，小於 10MB）<input id="receipt" type="file" accept="image/jpeg,image/png,image/webp" /></label>
      <button id="submitButton">安全提交</button>
      <p id="message" class="muted" role="status"></p>
    </section>
    <section>
      <h2>我的報帳</h2>
      <div id="claims"><p class="muted">正在載入…</p></div>
    </section>
  </main>

  <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-storage-compat.js"></script>
  <script>
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
      appId: "YOUR_APP_ID"
    };
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();
    const storage = firebase.storage();
    const message = document.getElementById('message');

    auth.onAuthStateChanged(async (user) => {
      if (!user) return location.replace('/');
      document.getElementById('who').textContent = user.email;
      await loadMyClaims(user);
    });

    document.getElementById('logoutButton').addEventListener('click', () => auth.signOut());

    document.getElementById('submitButton').addEventListener('click', async () => {
      const user = auth.currentUser;
      const file = document.getElementById('receipt').files[0];
      const price = Number(document.getElementById('price').value);
      if (!user) return message.textContent = '請重新登入。';
      if (!file || !(price > 0)) return message.textContent = '請輸入金額並選擇收據。';
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return message.textContent = '只接受 JPG、PNG 或 WEBP。';
      if (file.size >= 10 * 1024 * 1024) return message.textContent = '圖片必須小於 10MB。';

      const safeName = Date.now() + '_' + file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const storagePath = 'claims/' + user.uid + '/' + safeName;
      try {
        message.textContent = '正在安全上載…';
        const ref = storage.ref(storagePath);
        await ref.put(file);
        const url = await ref.getDownloadURL();
        await db.collection('claims').add({
          userId: user.uid,
          userEmail: user.email.toLowerCase(),
          price: price,
          status: 'unclaimed',
          storagePath: storagePath,
          url: url,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        document.getElementById('price').value = '';
        document.getElementById('receipt').value = '';
        message.textContent = '已提交，等待管理員審批。';
        await loadMyClaims(user);
      } catch (error) {
        message.textContent = '未能提交；請核對 Firebase Rules 和設定。';
      }
    });

    async function loadMyClaims(user) {
      const list = document.getElementById('claims');
      list.replaceChildren();
      const snapshot = await db.collection('claims')
        .where('userId', '==', user.uid)
        .orderBy('createdAt', 'desc')
        .get();
      if (snapshot.empty) return list.textContent = '未有報帳。';
      snapshot.forEach((doc) => {
        const claim = doc.data();
        const row = document.createElement('div');
        row.className = 'claim';
        const left = document.createElement('div');
        left.textContent = '金額：$' + claim.price;
        const right = document.createElement('span');
        right.className = 'status';
        right.textContent = claim.status;
        row.append(left, right);
        list.appendChild(row);
      });
    }
  </script>
</body>
</html>`,

  firestoreRules: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function signedIn() { return request.auth != null; }
    function isAdmin() {
      return signedIn() &&
        request.auth.token.email.lower() == 'YOUR_ADMIN_EMAIL@example.com';
    }
    function owns(data) { return data.userId == request.auth.uid; }

    match /users/{uid} {
      allow read: if signedIn() && (uid == request.auth.uid || isAdmin());
      allow create: if signedIn() && uid == request.auth.uid &&
        request.resource.data.role == 'member';
      allow update, delete: if isAdmin();
    }

    match /claims/{claimId} {
      allow read: if signedIn() && (owns(resource.data) || isAdmin());
      allow create: if signedIn() &&
        request.resource.data.userId == request.auth.uid &&
        request.resource.data.userEmail.lower() == request.auth.token.email.lower() &&
        request.resource.data.status == 'unclaimed' &&
        request.resource.data.price is number && request.resource.data.price > 0;
      allow update: if isAdmin();
      allow delete: if signedIn() && (isAdmin() ||
        (owns(resource.data) && resource.data.status == 'unclaimed'));
    }
  }
}`,

  storageRules: `rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    function signedIn() { return request.auth != null; }

    match /claims/{userId}/{fileName} {
      allow read, delete: if signedIn() && request.auth.uid == userId;
      allow create: if signedIn() && request.auth.uid == userId &&
        request.resource.size < 10 * 1024 * 1024 &&
        request.resource.contentType.matches('image/(jpeg|png|webp)');
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

export const steps: Array<{
  id: string;
  number: string;
  title: string;
  short: string;
  goal: string;
  place: string;
  checks: string[];
  code?: CodeKey;
  note?: string;
}> = [
  {
    id: "start",
    number: "00",
    title: "準備你的模型盒",
    short: "建立五個檔案",
    goal: "在電腦建立一個資料夾，例如 newclaim-starter，裡面先放 index.html、dashboard.html、firestore.rules、storage.rules 和 vercel.json。",
    place: "VS Code → File → Open Folder → New File",
    checks: ["你看到五個檔案名稱", "暫時沒有任何帳戶或資料，這是正常的"],
  },
  {
    id: "firebase",
    number: "01",
    title: "接上 Firebase 的四條線",
    short: "建立 Project 和 Web app",
    goal: "在 Firebase Console 建立 Project，開啟 Authentication 的 Email/Password、Firestore Database 和 Storage。再在 Project settings 新增 Web app，複製設定。",
    place: "Firebase Console → Project settings → Your apps → Web app",
    checks: ["Authentication 裡 Email/Password 顯示 Enabled", "你已複製 firebaseConfig", "不要貼 Admin SDK 金鑰；這個初版不需要它"],
    code: "firebaseConfig",
  },
  {
    id: "frontdoor",
    number: "02",
    title: "砌大門：index.html",
    short: "登入與忘記密碼",
    goal: "把完整 code 貼進 index.html，再把 YOUR_... 的 Firebase 設定逐項換成自己的值。",
    place: "VS Code → index.html → 全選後貼上",
    checks: ["本機打開頁面後看到登入框", "輸入一個已建立帳戶後會前往 /dashboard", "按忘記密碼會向登記 email 發信"],
    code: "indexHtml",
    note: "熟人系統最易管理的做法：由你在 Firebase Authentication 手動建立帳戶；朋友首次用『忘記密碼』設定自己的密碼。",
  },
  {
    id: "workroom",
    number: "03",
    title: "砌工作房：dashboard.html",
    short: "報帳與 UID 收據路徑",
    goal: "把完整 code 貼進 dashboard.html，並填入同一份 Firebase 設定。這頁只在登入後才讀取自己的 claim。",
    place: "VS Code → dashboard.html → 全選後貼上",
    checks: ["未登入開 /dashboard 會返回 /", "登入後看見報帳表格", "上載會使用 claims/你的UID/檔名 的路徑"],
    code: "dashboardHtml",
  },
  {
    id: "rules",
    number: "04",
    title: "裝上真正的守門員",
    short: "Firestore 與 Storage Rules",
    goal: "在兩份 Rules 把 YOUR_ADMIN_EMAIL@example.com 換成你的管理員 email。先存檔，再在 Firebase Console 發布同一版 Rules。",
    place: "Firebase Console → Firestore Database → Rules；Firebase Console → Storage → Rules",
    checks: ["Firestore Rules 已按 Publish", "Storage Rules 已按 Publish", "會員 A 不能讀到會員 B 的資料或收據"],
    code: "firestoreRules",
    note: "完成 Firestore 後，按上方切換看 Storage Rules；兩份都要發布才算完成。",
  },
  {
    id: "github",
    number: "05",
    title: "把作品放進時間盒",
    short: "GitHub private repository",
    goal: "在 GitHub 建立 Private repository。回 VS Code 的 Source Control，將五個檔案 Commit，再 Publish to GitHub。",
    place: "GitHub → + → New repository；VS Code 左側 → Source Control",
    checks: ["Repository 顯示 Private", "你看到一個清楚的 first commit", "以後每次修改先開 branch，不直接改 main"],
  },
  {
    id: "vercel",
    number: "06",
    title: "先試後出街",
    short: "Vercel Preview → Production",
    goal: "用 Vercel Import Git Repository。第一次 Deploy 後，之後每個 branch 都先看 Preview；測試通過才 Merge 到 main。",
    place: "Vercel → Add New → Project → Import Git Repository",
    checks: ["你有一條正式網址", "你開 branch 後在 Deployments 看到 Preview", "朋友只使用正式網址，不使用 Preview"],
    code: "vercelJson",
  },
  {
    id: "test",
    number: "07",
    title: "三人驗收，才算砌好",
    short: "會員 A、會員 B、管理員",
    goal: "用兩個會員帳戶與一個管理員帳戶，逐項測試資料是否真的分開。測試成功後才把網站交給朋友。",
    place: "Chrome 一般視窗、無痕視窗和另一個 Browser profile",
    checks: ["A 成功提交自己的 claim 和收據", "B 看不到、改不到、刪不到 A 的資料", "管理員可以審批；A 的 claimed claim 不能再刪除"],
  },
];
