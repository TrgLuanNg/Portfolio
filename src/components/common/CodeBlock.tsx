import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useSoundContext } from '../../context/SoundContext';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'typescript',
  filename,
}) => {
  const [copied, setCopied] = useState(false);
  const { playPop } = useSoundContext();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    playPop();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="clay-inset relative my-6 overflow-hidden rounded-2xl p-1 text-[#f8f6fc]">
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#121b22] px-4 py-2.5 text-xs rounded-t-xl">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#f43f5e] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#4ade80] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4)]" />
          {filename && <span className="ml-2 font-mono text-[#94a3b8] text-[11px]">{filename}</span>}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[#64748b] uppercase text-[10px]">{language}</span>
          <button
            onClick={handleCopy}
            className="clay-btn flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs text-[#94a3b8] hover:text-[#f1f5f9]"
            title="Copy to clipboard"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-[#4ade80]" />
                <span className="text-[11px] text-[#4ade80] font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span className="text-[11px]">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto p-5 font-mono text-xs leading-relaxed bg-[#111920] rounded-b-xl">
        <pre className="text-white/90">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};
