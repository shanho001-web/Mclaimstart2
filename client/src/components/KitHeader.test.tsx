import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import { CourseNav, LessonPager } from "./KitHeader";

describe("five-lesson navigation components", () => {
  it("renders all lesson links and marks the current lesson", () => {
    const markup = renderToStaticMarkup(<CourseNav active={3} firstHref="#part-01" />);

    expect(markup).toContain('href="#part-01"');
    expect(markup).toContain('href="/lesson-2-github"');
    expect(markup).toContain('href="/lesson-3-vercel"');
    expect(markup).toContain('href="/lesson-4-firebase"');
    expect(markup).toContain('href="/claim-kit"');
    expect(markup).toContain('aria-current="page"');
    expect(markup).toContain("Vercel");
  });

  it("renders a continuous previous-next path from lesson 1 through lesson 5", () => {
    const renderPager = (current: 1 | 2 | 3 | 4 | 5) => renderToStaticMarkup(
      <Router ssrPath="/">
        <LessonPager current={current} />
      </Router>,
    );
    const lessonOne = renderPager(1);
    const lessonTwo = renderPager(2);
    const lessonFour = renderPager(4);
    const lessonFive = renderPager(5);

    expect(lessonOne).toContain('href="/lesson-2-github"');
    expect(lessonTwo).toContain('href="/"');
    expect(lessonTwo).toContain('href="/lesson-3-vercel"');
    expect(lessonFour).toContain('href="/lesson-3-vercel"');
    expect(lessonFour).toContain('href="/claim-kit"');
    expect(lessonFive).toContain('href="/lesson-4-firebase"');
    expect(lessonFive).toContain('href="/member-guide"');
  });
});
