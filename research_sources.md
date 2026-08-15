# 第二模型盒：官方資料來源

| 主題 | 要點 | 官方來源 |
|---|---|---|
| Firestore Rules | Web／mobile client 的每次讀寫都會先由 Rules 評估；Rules 可在 Firebase Console 的 Firestore → Rules 測試及 Publish。 | https://firebase.google.com/docs/firestore/security/get-started |
| Storage Rules | `request.auth.uid` 可用於依使用者 UID 限制檔案路徑；Rules 可驗證上載檔案大小與 MIME type。 | https://firebase.google.com/docs/storage/security |
| Firebase Authentication | Firebase Authentication 可建立帳戶、觀察登入狀態及發送密碼重設電郵。 | https://firebase.google.com/docs/auth/web/manage-users |
| Vercel + GitHub | 每次 push 可自動部署；非正式 branch 可使用 Preview URL，production branch 可更新正式部署。 | https://vercel.com/docs/git/vercel-for-github |

此課程不把任何系統稱為「絕對安全」。成員指南所述資料隔離及拒絕存取，均以前端程式、Firebase Rules、帳戶設定已完成發布且已用會員 A、會員 B、管理員實測為前提。
