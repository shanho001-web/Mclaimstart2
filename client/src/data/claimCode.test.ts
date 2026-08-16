import { describe, expect, it } from "vitest";
import { codeTemplates, homeLessonArticle } from "./course";
import { claimCode, memberAnnouncement } from "./claimCode";
import { lessons } from "./lessons";
import { firebaseSecurityPrinciples } from "../pages/ToolGuides";

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

  it("uses the same copy-guide structure as the other lessons", () => {
    expect(homeLessonArticle.subtitle).toContain("LESSON 01");
    expect(homeLessonArticle.title).toContain("三個檔案");
    expect(homeLessonArticle.goal).toContain("小守護員歡迎頁");
    expect(homeLessonArticle.flow).toEqual(["建立 welcome-site", "建立三個檔案", "貼 code 並開主頁"]);
    expect(homeLessonArticle.standard).toContain("小守護員");
    expect(homeLessonArticle.transition).toContain("GitHub");
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

describe("Firebase security primer", () => {
  it("introduces identity and both server-side rule boundaries before Firebase setup", () => {
    expect(firebaseSecurityPrinciples.map((item) => item.name)).toEqual([
      "Authentication",
      "Firestore Rules",
      "Storage Rules",
    ]);
    expect(firebaseSecurityPrinciples[1]?.summary).toContain("指定管理員 Email");
    expect(firebaseSecurityPrinciples[2]?.summary).toContain("收據");
  });
});
