import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FirebaseProcessFlow, FirebaseSecurityPrimer, GithubProcessFlow, VercelProcessFlow, firebaseWelcomeMessage } from "./ToolGuides";

describe("tool process diagrams", () => {
  it("renders a visibly connected icon flow for GitHub, Vercel, and Firebase", () => {
    const github = renderToStaticMarkup(<GithubProcessFlow />);
    const vercel = renderToStaticMarkup(<VercelProcessFlow />);
    const firebase = renderToStaticMarkup(<FirebaseProcessFlow />);

    [github, vercel, firebase].forEach((markup) => expect(markup).toContain("process-arrow"));
    expect(github).toContain("Private repository");
    expect(vercel).toContain("Deploy → Ready");
    expect(firebase).toContain("Web app 〈/〉");
    expect(firebase).toContain("firebaseConfig code");
  });
});

describe("Firebase opening", () => {
  it("starts with the welcoming-room promise before the technical safeguards", () => {
    const markup = renderToStaticMarkup(<FirebaseSecurityPrimer />);

    expect(markup).toContain(firebaseWelcomeMessage.title);
    expect(markup).toContain(firebaseWelcomeMessage.emphasis);
    expect(markup).toContain("現在才看安全概念");
    expect(markup.indexOf(firebaseWelcomeMessage.title)).toBeLessThan(markup.indexOf("現在才看安全概念"));
  });
});
