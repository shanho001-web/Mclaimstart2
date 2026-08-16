import { describe, expect, it } from "vitest";
import { codeTemplates } from "./course";
import { claimCode, memberAnnouncement } from "./claimCode";
import { lessons } from "./lessons";

describe("first website guardian template", () => {
  it("builds the guardian welcome scene instead of the old generic card", () => {
    expect(codeTemplates.indexHtml).toContain("小守護員");
    expect(codeTemplates.indexHtml).toContain("歡迎你");
    expect(codeTemplates.styleCss).toContain(".guardian");
    expect(codeTemplates.scriptJs).toContain("第一個歡迎頁完成");
    expect(codeTemplates.scriptJs).toContain("下一課會學習把它安全保存到 GitHub");
  });

  it("describes lesson one as a guardian welcome-page build, not a completed deployment", () => {
    expect(lessons[0].title).toContain("守護員歡迎頁");
    expect(lessons[0].title).not.toContain("第一條網址");
  });
});

describe("admin-only claim templates", () => {
  it("restricts login, Firestore and Storage to the same configured admin email", () => {
    expect(claimCode.indexHtml).toContain("const ADMIN_EMAIL");
    expect(claimCode.indexHtml).toContain("YOUR_ADMIN_EMAIL@example.com");
    expect(claimCode.dashboardHtml).toContain("const ADMIN_EMAIL");
    expect(claimCode.firestoreRules).toContain("allow read, create, update, delete: if isAdmin()");
    expect(claimCode.storageRules).toContain("allow read, write: if isAdmin()");
  });

  it("has an admin Claim console and does not expose a signup control", () => {
    expect(claimCode.indexHtml).toContain("管理員登入");
    expect(claimCode.indexHtml).not.toContain('id="signup"');
    expect(claimCode.dashboardHtml).toContain("新增 Claim");
    expect(claimCode.dashboardHtml).toContain("管理 Claim");
    expect(memberAnnouncement).toContain("沒有公開會員註冊頁");
  });
});
