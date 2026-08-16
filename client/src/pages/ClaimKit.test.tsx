import { describe, expect, it } from "vitest";
import { claimAdminSetup, claimAssemblyParts, claimCopyInstructions, claimLessonArticle } from "./ClaimKit";

describe("ClaimKit direct assembly flow", () => {
  it("keeps the final lesson to two practical parts: VS Code files and Firebase Rules", () => {
    expect(claimAssemblyParts.website.title).toBe("PART 01 · VS Code：兩個網頁檔案");
    expect(claimAssemblyParts.website.ids).toEqual(["indexHtml", "dashboardHtml"]);
    expect(claimAssemblyParts.rules.title).toBe("PART 02 · Firebase：兩份 Rules");
    expect(claimAssemblyParts.rules.ids).toEqual(["firestoreRules", "storageRules"]);
    expect(claimAdminSetup.where).toContain("Authentication → Users → Add user");
    expect(claimAdminSetup.requirement).toContain("YOUR_ADMIN_EMAIL 完全相同");
    expect(claimCopyInstructions.website).toContain("VS Code 左邊 Explorer");
    expect(claimCopyInstructions.rules).toContain("回本頁按「複製 code」");
    expect(claimLessonArticle.heading).toContain("Claim 控制台");
    expect(claimLessonArticle.ease).toContain("兩部分");
    expect(claimLessonArticle.flow).toEqual(["替換 index.html", "替換 dashboard.html", "建立唯一管理員", "發布兩份 Rules"]);
    expect(claimLessonArticle.finish).toContain("管理主頁");
  });
});
