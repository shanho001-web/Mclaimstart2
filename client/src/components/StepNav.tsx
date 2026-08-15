/**
 * Design philosophy: Model Workbench — the navigation behaves like a numbered
 * parts tray so a beginner always sees the next physical piece to assemble.
 */
import { Check, LockKeyhole, Play } from "lucide-react";
import { steps } from "../data/course";

type Props = { activeId: string; completed: string[]; unlocked: string[]; onChoose: (id: string) => void };

export function StepNav({ activeId, completed, unlocked, onChoose }: Props) {
  return (
    <nav className="step-nav" aria-label="建立步驟">
      <div className="nav-kicker"><LockKeyhole size={14} /> 模型零件包</div>
      {steps.map((step) => {
        const active = step.id === activeId;
        const done = completed.includes(step.id);
        const locked = !unlocked.includes(step.id);
        return (
          <button
            key={step.id}
            onClick={() => !locked && onChoose(step.id)}
            disabled={locked}
            aria-disabled={locked}
            className={active ? "step-link is-active" : locked ? "step-link is-locked" : "step-link"}
          >
            <span className={done ? "step-number done" : "step-number"}>{done ? <Check size={14} /> : step.number}</span>
            <span className="step-link-copy"><b>{step.title}</b><small>{step.short}</small></span>
            {locked ? <LockKeyhole size={13} className="play-indicator" /> : active && <Play size={14} className="play-indicator" fill="currentColor" />}
          </button>
        );
      })}
    </nav>
  );
}
