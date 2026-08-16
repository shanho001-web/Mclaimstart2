import { describe, expect, it } from "vitest";
import { claimAdminSetup, claimAssemblyParts, claimCopyInstructions } from "./ClaimKit";

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
  });
});
