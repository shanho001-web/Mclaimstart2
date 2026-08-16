import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FirebaseConfigBreakdown, FirebaseProcessFlow, FirebaseSecurityPrimer, FirebaseSetupWorkshop, GithubProcessFlow, VercelProcessFlow, firebaseConfigLines, firebaseSetupSteps, firebaseWelcomeMessage } from "./ToolGuides";

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

describe("Firebase setup workshop", () => {
  it("keeps the full Console configuration, config card, and Rules work together in Lesson 05", () => {
    const markup = renderToStaticMarkup(<FirebaseSetupWorkshop />);

    expect(firebaseSetupSteps).toHaveLength(7);
    expect(markup).toContain("Firebase 正式實作");
    expect(markup).toContain("現在：註冊 Web app，先拿 firebaseConfig");
    expect(markup).toContain("Firestore Rules 顯示最新 Publish 時間");
    expect(markup).toContain("Storage Rules 顯示最新 Publish 時間");
  });
});
