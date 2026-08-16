export type LessonCopyGuideData = {
  subtitle: string;
  title: string;
  goal: string;
  flow: string[];
  standard: string;
  transition: string;
};

export function LessonCopyGuide({ data }: { data: LessonCopyGuideData }) {
  return <details className="lesson-copy-guide" aria-label={`${data.subtitle} 課程使用說明`}>
    <summary>
      <span><small>{data.subtitle}</small><b>{data.title}</b><em>按 V 查看本課說明</em></span>
      <i aria-hidden="true">⌄</i>
    </summary>
    <div className="lesson-copy-guide-content">
      <dl>
        <div><dt>副標題</dt><dd>{data.subtitle}</dd></div>
        <div><dt>本課目標</dt><dd>{data.goal}</dd></div>
        <div className="lesson-copy-guide-flow"><dt>本課流程</dt><dd><ol>{data.flow.map((item, index) => <li key={item}><b>{index + 1}</b>{item}</li>)}</ol></dd></div>
        <div><dt>完成標準</dt><dd>{data.standard}</dd></div>
      </dl>
      <div className="lesson-copy-guide-transition"><b>開始前先知道</b><p>{data.transition}</p></div>
    </div>
  </details>;
}
