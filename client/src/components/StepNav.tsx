/**
 * Design philosophy: Model Workbench — the navigation behaves like a numbered
 * parts tray so a beginner always sees the next physical piece to assemble.
 */
import { Check, LockKeyhole, Play } from "lucide-react";
import { steps } from "../data/course";

type Props = { activeId: string; completed: string[]; onChoose: (id: string) => void };

export function StepNav({ activeId, completed, onChoose }: Props) {
  return (
    <nav className="step-nav" aria-label="建立步驟">
      <div className="nav-kicker"><LockKeyhole size={14} /> 模型零件包</div>
      {steps.map((step) => {
        const active = step.id === activeId;
        const done = completed.includes(step.id);
        return (
          <button
            key={step.id}
            onClick={() => onChoose(step.id)}
            className={active ? "step-link is-active" : "step-link"}
          >
            <span className={done ? "step-number done" : "step-number"}>{done ? <Check size={14} /> : step.number}</span>
            <span className="step-link-copy"><b>{step.title}</b><small>{step.short}</small></span>
            {active && <Play size={14} className="play-indicator" fill="currentColor" />}
          </button>
        );
      })}
    </nav>
  );
}
