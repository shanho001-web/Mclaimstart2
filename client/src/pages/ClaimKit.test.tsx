import { describe, expect, it } from "vitest";
import { claimAdminSetup, claimAssemblyParts, claimCopyInstructions, claimFirebaseSetup, claimLessonArticle } from "./ClaimKit";

describe("ClaimKit direct assembly flow", () => {
  it("keeps the final lesson to three practical parts: Firebase setup, VS Code files and Firebase Rules", () => {
    expect(claimAssemblyParts.setup.title).toBe("PART 00 · Firebase：建立 Project 與 Web app");
    expect(claimAssemblyParts.website.title).toBe("PART 01 · VS Code：兩個網頁檔案");
    expect(claimAssemblyParts.website.ids).toEqual(["indexHtml", "dashboardHtml"]);
    expect(claimAssemblyParts.rules.title).toBe("PART 02 · Firebase：兩份 Rules");
    expect(claimAssemblyParts.rules.ids).toEqual(["firestoreRules", "storageRules"]);
    expect(claimFirebaseSetup.where).toContain("Add project");
    expect(claimAdminSetup.where).toContain("Authentication → Users → Add user");
    expect(claimAdminSetup.requirement).toContain("YOUR_ADMIN_EMAIL 完全相同");
    expect(claimCopyInstructions.website).toContain("VS Code 左邊 Explorer");
    expect(claimCopyInstructions.rules).toContain("回本頁按「複製 code」");
    expect(claimLessonArticle.subtitle).toContain("LESSON 05");
    expect(claimLessonArticle.title).toContain("Claim 控制台");
    expect(claimLessonArticle.goal).toContain("兩份 Rules");
    expect(claimLessonArticle.flow).toEqual(["建立 Firebase Project 與 Web app", "替換 index.html", "替換 dashboard.html", "建立唯一管理員", "發布兩份 Rules"]);
    expect(claimLessonArticle.standard).toContain("管理主頁");
    expect(claimLessonArticle.transition).toContain("三部分");
  });
});
