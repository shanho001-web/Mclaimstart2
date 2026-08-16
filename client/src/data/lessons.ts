export type LessonNumber = 1 | 2 | 3 | 4 | 5;

export type LessonLink = {
  number: LessonNumber;
  short: string;
  title: string;
  href: string;
};

export const lessons: LessonLink[] = [
  { number: 1, short: "首次發布", title: "由 Folder 做到第一條網址", href: "/" },
  { number: 2, short: "GitHub", title: "建立及管理 Private repository", href: "/lesson-2-github" },
  { number: 3, short: "Firebase", title: "開啟登入、資料庫與 Storage", href: "/lesson-3-firebase" },
  { number: 4, short: "Vercel", title: "Import、Deploy 與正式網址", href: "/lesson-4-vercel" },
  { number: 5, short: "Claim 網站", title: "登入、Dashboard 與安全 Rules", href: "/claim-kit" },
];

export function getLesson(number: LessonNumber) {
  return lessons.find((lesson) => lesson.number === number)!;
}

export function getLessonPager(current: LessonNumber) {
  return {
    previous: current > 1 ? getLesson((current - 1) as LessonNumber) : undefined,
    next: current < 5 ? getLesson((current + 1) as LessonNumber) : undefined,
  };
}

export function getCourseNavHref(number: LessonNumber, firstHref = "/#part-01") {
  return number === 1 ? firstHref : getLesson(number).href;
}
