/**
 * Design philosophy: Model Workbench — code is a clearly labeled component
 * with a single action: copy it, place it, then test it.
 */
import { Check, Clipboard, Code2 } from "lucide-react";
import { useState } from "react";

type Props = { code: string; fileName: string; caption: string };

export function CodeBlock({ code, fileName, caption }: Props) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section className="code-shell" aria-label={`${fileName} 程式碼`}>
      <div className="code-topbar">
        <div className="file-chip"><Code2 size={15} /> {fileName}</div>
        <button className={copied ? "copy-button copied" : "copy-button"} onClick={copyCode}>
          {copied ? <Check size={15} /> : <Clipboard size={15} />}
          {copied ? "已複製" : "複製 code"}
        </button>
      </div>
      <p className="code-caption">{caption}</p>
      <pre><code>{code}</code></pre>
    </section>
  );
}
