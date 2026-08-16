import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { LessonCopyGuide, type LessonCopyGuideData } from "./LessonCopyGuide";

const lesson: LessonCopyGuideData = {
  subtitle: "LESSON 01 / 05 · VS CODE · 零基礎",
  title: "由第一個網站頁面開始",
  goal: "在 VS Code 建立歡迎頁，並在瀏覽器開啟它。",
  flow: ["建立資料夾", "建立檔案", "貼上內容"],
  standard: "看見歡迎頁和動畫。",
  transition: "先完成本機版本；其他服務會在後續課程處理。",
};

describe("LessonCopyGuide", () => {
  it("renders a closed V-shaped summary that contains the full copy guide when expanded", () => {
    const markup = renderToStaticMarkup(<LessonCopyGuide data={lesson} />);

    expect(markup).toContain("<details");
    expect(markup).not.toContain("<details open");
    expect(markup).toContain("<summary");
    expect(markup).toContain("按 V 查看本課說明");
    expect(markup).toContain("⌄");
    ["副標題", "本課目標", "本課流程", "完成標準", "開始前先知道"].forEach((label) => {
      expect(markup).toContain(label);
    });
    expect(markup).toContain(lesson.title);
    expect(markup).toContain(lesson.flow[2]);
    expect(markup).toContain(lesson.transition);
  });
});
