# NewClaim Starter Kit — 本地完整部署包

這個資料夾已包含網站使用的**全部八張守護員圖片**。圖片放在 `client/public/images/`，程式碼使用 `/images/...` 相對路徑，因此不需要 Manus 雲端素材庫，也不需要 GitHub 圖片連結。

## 本機開啟

1. 解壓縮這個 ZIP，開啟終端機並進入資料夾根目錄。
2. 執行 `pnpm install` 安裝套件。
3. 執行 `pnpm dev` 開啟本機網站。
4. 終端機顯示網址後，用瀏覽器開啟它。首頁、五課、Claim 控制台和管理員指南應均可看見圖片。

## 正式部署前檢查

在資料夾根目錄執行：

```bash
pnpm check
pnpm build
```

兩條指令都成功後，便可把**整個資料夾**上傳到你的 GitHub repository，或在 Vercel 匯入這個 repository。請保留 `client/public/images/` 目錄；不要移動或重新命名其中的圖片，否則網頁找不到守護員素材。

## 圖片清單

| 檔案 | 網頁用途 |
|---|---|
| `logo.webp` | 全站標誌 |
| `guardian-welcome-desktop.png` | 第 1 課桌面主視覺 |
| `guardian-welcome-mobile.png` | 第 1 課手機主視覺 |
| `guardian-download.webp` | 下載／建立資料夾動作貼紙 |
| `guardian-folder-open.webp` | GitHub 與資料夾動作貼紙 |
| `guardian-code-fit.webp` | 程式碼與 Firebase 動作貼紙 |
| `guardian-launch.webp` | Vercel 發布與管理員指南貼紙 |
| `guardian-claim-hero.png` | 第 5 課 Claim 主視覺 |
