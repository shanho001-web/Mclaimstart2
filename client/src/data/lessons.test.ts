import { describe, expect, it } from "vitest";
import { getLesson, lessons } from "./lessons";

describe("five-lesson course navigation", () => {
  it("contains five unique lessons in order", () => {
    expect(lessons).toHaveLength(5);
    expect(lessons.map((lesson) => lesson.number)).toEqual([1, 2, 3, 4, 5]);
    expect(new Set(lessons.map((lesson) => lesson.href)).size).toBe(5);
  });

  it("places the three tool lessons between publishing and Claim", () => {
    expect(getLesson(1).short).toBe("首次發布");
    expect(getLesson(2).short).toBe("GitHub");
    expect(getLesson(3).short).toBe("Firebase");
    expect(getLesson(4).short).toBe("Vercel");
    expect(getLesson(5).short).toBe("Claim 網站");
  });
});
