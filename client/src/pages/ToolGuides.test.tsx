import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FirebaseConfigBreakdown, FirebaseProcessFlow, FirebaseSecurityPrimer, GithubProcessFlow, ToolLessonOpening, VercelProcessFlow, firebaseConfigLines, firebaseWelcomeMessage, guides } from "./ToolGuides";

describe("tool process diagrams", () => {
  it("renders a visibly connected icon flow for GitHub, Vercel, and Firebase", () => {
    const github = renderToStaticMarkup(<GithubProcessFlow />);
    const vercel = renderToStaticMarkup(<VercelProcessFlow />);
    const firebase = renderToStaticMarkup(<FirebaseProcessFlow />);

    [github, vercel, firebase].forEach((markup) => expect(markup).toContain("process-arrow"));
    expect(github).toContain("Private repository");
    expect(vercel).toContain("Deploy → Ready");
    expect(vercel).toContain("Settings → Applications");
    expect(vercel).toContain("Configure");
    expect(firebase).toContain("Web app 〈/〉");
    expect(firebase).toContain("firebaseConfig code");
  });
});

describe("tool lesson opening", () => {
  it("uses the same four-step maze promise for GitHub, Vercel, and Firebase", () => {
    ["GitHub", "Vercel", "Firebase"].forEach((tool) => {
      const markup = renderToStaticMarkup(<ToolLessonOpening tool={tool} />);
      expect(markup).toContain(`第一次用 ${tool}，網站設計像迷宮？`);
      expect(markup).toContain("4 個步驟即時學識。");
    });
  });
});

describe("same-place operation cards", () => {
  it("keeps GitHub repository fields and Vercel New Project import work in single continuous cards", () => {
    const github = guides.find((guide) => guide.id === "github")!;
    const vercel = guides.find((guide) => guide.id === "vercel")!;

    expect(github.steps).toHaveLength(3);
    expect(github.steps[1].where).toContain("Create a new repository 表格");
    expect(github.steps[1].actions).toContain("向下到 Visibility，選 Private");

    expect(vercel.steps).toHaveLength(4);
    expect(vercel.steps[1].where).toContain("Import Git Repository");
    expect(vercel.steps[1].actions).toContain("按 Add New → Project，等 Import Git Repository 清單出現");
    expect(vercel.steps[1].actions).toContain("回剛才的 Vercel New Project 頁重新整理；welcome-site 出現後按 Import");
  });
});

describe("short connected operation titles", () => {
  it("removes duplicated current-step phrasing and names a real destination action", () => {
    const allVisibleToolSteps = guides.filter((guide) => guide.id !== "firebase").flatMap((guide) => guide.steps);

    expect(allVisibleToolSteps.every((step) => !step.title.startsWith("現在："))).toBe(true);
    expect(guides.find((guide) => guide.id === "github")!.steps.map((step) => step.title)).toEqual([
      "登入 GitHub", "建立 Private repository", "回到 VS Code 上載三個檔案",
    ]);
    expect(guides.find((guide) => guide.id === "github")!.steps[2].actions[0]).toContain("下方 code 卡的「複製 code」");
    expect(guides.find((guide) => guide.id === "github")!.steps[2].actions[1]).toContain("下方黑色 Terminal");
  });
});

describe("Firebase opening", () => {
  it("starts with the welcoming-room promise before the technical safeguards", () => {
    const markup = renderToStaticMarkup(<FirebaseSecurityPrimer />);

    expect(markup).toContain(firebaseWelcomeMessage.title);
    expect(markup).toContain(firebaseWelcomeMessage.emphasis);
    expect(markup).toContain("第 4 課先看安全概念");
    expect(markup).toContain("第 5 課會帶你逐步完成實作");
    expect(markup.indexOf(firebaseWelcomeMessage.title)).toBeLessThan(markup.indexOf("第 4 課先看安全概念"));
  });
});

describe("firebaseConfig breakdown card", () => {
  it("labels every core config line, both destination files, and the Service Account boundary", () => {
    const markup = renderToStaticMarkup(<FirebaseConfigBreakdown />);

    expect(firebaseConfigLines.map((line) => line.key)).toEqual([
      "apiKey", "authDomain", "projectId", "storageBucket", "messagingSenderId", "appId",
    ]);
    expect(markup).toContain("index.html");
    expect(markup).toContain("dashboard.html");
    expect(markup).toContain("Service Account JSON");
    expect(markup).toContain("private_key");
  });
});
