import { useState } from "react";
import { CheckCircle2, Clipboard, FileImage, KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";
import { KitFooter, KitHeader } from "@/components/KitHeader";
import { memberAnnouncement } from "../data/claimCode";

const launchMascotUrl = "/images/guardian-launch.webp";

export default function MemberGuide() {
  const [copied, setCopied] = useState(false);
  async function copyGuide() { await navigator.clipboard.writeText(memberAnnouncement); setCopied(true); window.setTimeout(() => setCopied(false), 1600); }
  return <div className="kit-page guide-page"><KitHeader active="guide"/><main className="guide-main">
    <section className="guide-hero"><div><p className="kit-kicker">管理員可直接保存</p><h1>NewClaim 控制台<br/><em>管理員操作指南。</em></h1><p>這份說明只給管理員使用：建立 Firebase 管理員帳戶、設定 Rules、登入控制台及檢查 Claim。系統沒有公開註冊或會員提交頁。</p><button onClick={copyGuide} className={copied ? "guide-copy copied" : "guide-copy"}><Clipboard size={17}/>{copied ? "已複製整份說明" : "複製管理員操作說明"}</button></div><aside className="guide-mascot-hint"><img src={launchMascotUrl} alt="小守護員完成驗收"/><p><b>看到綠色「Ready」</b>代表正式網址已建立；只用指定管理員 Email 登入。</p></aside></section>
    <section className="member-start"><div><span>01</span><KeyRound/><h2>先建立管理員</h2><p>到 Firebase Authentication → Users → Add user 手動建立帳戶；沒有公開註冊功能。</p></div><div><span>02</span><LockKeyhole/><h2>統一管理員 Email</h2><p>將同一個 Email 填入登入 code、Dashboard code、Firestore Rules 和 Storage Rules 的 YOUR_ADMIN_EMAIL。</p></div><div><span>03</span><FileImage/><h2>登入後管理 Claim</h2><p>使用正式 HTTPS 網址登入，查看 Claim、開收據和更新 status；不要把管理員帳密交給其他人。</p></div></section>
    <section className="guide-sheet"><div className="sheet-title"><ShieldCheck/><div><p>管理員真正需要知道的事</p><h2>四個安全與操作重點</h2></div></div><div className="guide-answers"><article><h3>為甚麼沒有會員註冊？</h3><p>這個版本定位為管理員專用 Claim 控制台。帳戶只在 Firebase Authentication 後台由管理員手動建立，避免公開註冊入口。</p></article><article><h3>其他 Firebase 帳戶能登入嗎？</h3><p>登入頁會比對 code 內的 <code>YOUR_ADMIN_EMAIL</code>；Firestore 和 Storage Rules 也會在雲端再次比對同一個 Email。不同帳戶會被登出或被拒絕存取。[1]</p></article><article><h3>管理員可以做甚麼？</h3><p>登入後可以查看所有 Claim、開啟已存在的收據，及把 status 改為 <code>unclaimed</code>、<code>approved</code> 或 <code>rejected</code>。</p></article><article><h3>忘記密碼怎麼辦？</h3><p>請在 Firebase Authentication → Users 內為管理員帳戶處理重設，或依 Firebase 的管理程序操作。不要把重設電郵或新密碼轉交他人。</p></article></div></section>
    <section className="guide-promise"><h2>給管理員的實際提醒</h2><p>管理員登入、Firestore Rules、Storage Rules和正式 HTTPS 網址一起降低未授權存取風險，但並不是絕對安全保證。請定期測試 Rules、保護管理員帳戶，並將 Service Account、私密金鑰和密碼留在前端檔案以外。</p><div><CheckCircle2/> 只需記住：只用正式網址、保護管理員帳戶、每次改 Rules 後先測試。</div></section>
  </main><KitFooter/></div>;
}
