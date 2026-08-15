import { useState } from "react";
import { CheckCircle2, Clipboard, FileImage, KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";
import { KitFooter, KitHeader } from "@/components/KitHeader";
import { memberAnnouncement } from "../data/claimCode";

const launchMascotUrl = "/manus-storage/guardian-model-launch_1f0fec45.png";

export default function MemberGuide() {
  const [copied, setCopied] = useState(false);
  async function copyGuide() { await navigator.clipboard.writeText(memberAnnouncement); setCopied(true); window.setTimeout(() => setCopied(false), 1600); }
  return <div className="kit-page guide-page"><KitHeader active="guide"/><main className="guide-main">
    <section className="guide-hero"><div><p className="kit-kicker">可直接轉發給朋友</p><h1>開支報帳與索償系統<br/><em>成員安心使用指南。</em></h1><p>這份公告用親民方式交代使用步驟和已部署的保護機制。使用前，管理員應先確認第二模型盒的 Rules、HTTPS 和三帳戶測試已完成。</p><button onClick={copyGuide} className={copied ? "guide-copy copied" : "guide-copy"}><Clipboard size={17}/>{copied ? "已複製整份公告" : "複製 WhatsApp／Telegram 公告"}</button></div><aside className="guide-mascot-hint"><img src={launchMascotUrl} alt="小守護員完成驗收"/><p><b>看到綠色「Ready」</b>代表正式網址已建立；請從管理員提供的網址登入。</p></aside></section>
    <section className="member-start"><div><span>01</span><KeyRound/><h2>先取得帳戶</h2><p>向管理員索取帳戶或首次登入指引。請勿共用帳戶、密碼或重設電郵。</p></div><div><span>02</span><LockKeyhole/><h2>只用正式 HTTPS 網址</h2><p>從管理員提供的正式網址登入；避免在不明連結或 Preview 網址輸入密碼。</p></div><div><span>03</span><FileImage/><h2>提交收據與金額</h2><p>登入後選 JPG、PNG 或 WEBP 收據，填寫金額並提交。審核前如填錯，可請管理員協助或依系統流程撤回。</p></div></section>
    <section className="guide-sheet"><div className="sheet-title"><ShieldCheck/><div><p>系統如何保護資料？</p><h2>四件成員真正需要知道的事</h2></div></div><div className="guide-answers"><article><h3>我的收據會被其他會員看到嗎？</h3><p>在本手冊指定的 Storage Rules 已發布、並完成帳戶測試的前提下，收據依登入者 UID 分開儲存；Rules 只容許本人或指定管理員讀取對應路徑。</p></article><article><h3>有人開 F12 可否更改資料？</h3><p>F12 只可改變自己瀏覽器畫面。真正的讀取、上載、更新和刪除請求仍會送到 Firebase，由雲端 Rules 按登入身分、UID、路徑和狀態重新判斷；不符合規則的請求會失敗。[1]</p></article><article><h3>提交後還可以改金額嗎？</h3><p>這套 starter Rules 只讓管理員更新 claim。會員在 claim 是 <code>unclaimed</code> 時可刪除自己的記錄再重交；管理員更新狀態後，會員不會獲得直接修改權。</p></article><article><h3>忘記密碼怎麼辦？</h3><p>在登入頁輸入自己的 email 後按「忘記密碼」。Firebase 的重設指引會寄往該帳戶的已登記 email；請不要把該郵件或新密碼轉交給任何人。[3]</p></article></div></section>
    <section className="guide-promise"><h2>給成員的誠實承諾</h2><p>系統以帳戶登入、UID 分路徑、資料規則和 HTTPS 減少未授權讀取、帳戶誤用與資料被隨意修改的風險。它不是「絕對安全」的承諾：管理員仍需妥善保護最高權限帳戶、定期更新規則、測試新版本，以及只從正式網域邀請成員使用。</p><div><CheckCircle2/> 你只需記住：只用正式網址、保管自己的帳戶、提交前核對收據和金額。</div></section>
  </main><KitFooter/></div>;
}
