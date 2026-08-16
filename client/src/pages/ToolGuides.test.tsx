import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FirebaseConfigBreakdown, FirebaseProcessFlow, FirebaseSecurityPrimer, GithubProcessFlow, ToolLessonOpening, VercelProcessFlow, firebaseConfigLines, firebaseWelcomeMessage } from "./ToolGuides";

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
