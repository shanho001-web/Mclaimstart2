/**
 * Design philosophy: Model Workbench — code is a clearly labeled component
 * with one clean action: copy the complete code from the named file card.
 */
import { Check, Clipboard, Code2 } from "lucide-react";
import { useState } from "react";

type Props = { code: string; fileName: string };

export function CodeBlock({ code, fileName }: Props) {
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
      <pre><code>{code.split(/(YOUR(?:_[A-Z_]+| [A-Z]+))/g).map((part, index) => part.startsWith("YOUR") ? <mark key={index}>{part}</mark> : part)}</code></pre>
    </section>
  );
}
