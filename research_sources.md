# 第二模型盒：官方資料來源

| 主題 | 要點 | 官方來源 |
|---|---|---|
| Firestore Rules | Web／mobile client 的每次讀寫都會先由 Rules 評估；Rules 可在 Firebase Console 的 Firestore → Rules 測試及 Publish。 | https://firebase.google.com/docs/firestore/security/get-started |
| Storage Rules | `request.auth.uid` 可用於依使用者 UID 限制檔案路徑；Rules 可驗證上載檔案大小與 MIME type。 | https://firebase.google.com/docs/storage/security |
| Firebase Authentication | Firebase Authentication 可建立帳戶、觀察登入狀態及發送密碼重設電郵。 | https://firebase.google.com/docs/auth/web/manage-users |
| Vercel + GitHub | 每次 push 可自動部署；非正式 branch 可使用 Preview URL，production branch 可更新正式部署。 | https://vercel.com/docs/git/vercel-for-github |

此課程不把任何系統稱為「絕對安全」。成員指南所述資料隔離及拒絕存取，均以前端程式、Firebase Rules、帳戶設定已完成發布且已用會員 A、會員 B、管理員實測為前提。

## 手機版「照著畫面按」導覽核對

GitHub 官方建立 repository 流程為：右上角 **+** → **New repository** → 輸入名稱 → 選擇 Visibility。若本機已有檔案並準備以 Git push，上述官方指引提醒不要先在網頁新增 README、.gitignore 或 License，以免產生合併衝突。

Firebase 官方 Web setup 流程為：Firebase Console 建立 Project → Project Overview 的 **Web** 圖示註冊 Web app → 取得 Firebase configuration object。Authentication 可再開啟 email/password 登入；`onAuthStateChanged` 可用於受保護頁面檢查登入狀態。

Vercel for GitHub 會在每次 branch push 自動建立部署；Production Branch（通常為 `main`）的 push 可更新正式網址，其他 branch 可作 Preview。只有 GitHub repository Owner 可從個人 repository 建立新的 Vercel Project。
