import { describe, expect, it } from "vitest";
import { getCourseNavHref, getLesson, getLessonPager, lessons } from "./lessons";

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

  it("resolves every course-navigation link and the full previous-next learning path", () => {
    expect(getCourseNavHref(1, "#part-01")).toBe("#part-01");
    expect(getCourseNavHref(2)).toBe("/lesson-2-github");
    expect(getCourseNavHref(3)).toBe("/lesson-3-firebase");
    expect(getCourseNavHref(4)).toBe("/lesson-4-vercel");
    expect(getCourseNavHref(5)).toBe("/claim-kit");

    expect(getLessonPager(1)).toMatchObject({ next: { href: "/lesson-2-github" } });
    expect(getLessonPager(2)).toMatchObject({ previous: { href: "/" }, next: { href: "/lesson-3-firebase" } });
    expect(getLessonPager(3)).toMatchObject({ previous: { href: "/lesson-2-github" }, next: { href: "/lesson-4-vercel" } });
    expect(getLessonPager(4)).toMatchObject({ previous: { href: "/lesson-3-firebase" }, next: { href: "/claim-kit" } });
    expect(getLessonPager(5)).toMatchObject({ previous: { href: "/lesson-4-vercel" }, next: undefined });
  });
});
