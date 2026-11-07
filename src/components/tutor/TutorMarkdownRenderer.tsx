import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Target,
  Copy,
  Check,
  Code
} from 'lucide-react';

interface TutorMarkdownRendererProps {
  content: string;
  lang?: 'fa' | 'en';
}

// Inline formatting helper: parses **bold**, *italic*, `code`, [TAGS], and isolates English words
export const formatInlineText = (text: string): React.ReactNode[] => {
  const tokenRegex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[A-Za-z0-9_\-\s]{2,20}\]|\([A-Za-z0-9_\-\s/]{2,30}\))/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, idx) => {
    if (!part) return null;

    // Inline code: `code`
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code
          key={idx}
          dir="ltr"
          className="mx-1 px-1.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-[#e0533c]/10 dark:bg-[#79c3d7]/15 text-[#144252] dark:text-[#a5e1f0] border border-[#e0533c]/20 dark:border-[#79c3d7]/30 inline-block align-baseline"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Bold: **text**
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const inner = part.slice(2, -2);
      return (
        <strong
          key={idx}
          className="font-bold text-[#0e2a34] dark:text-[#f0f4f6]"
        >
          {formatInlineText(inner)}
        </strong>
      );
    }

    // Italic: *text*
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
      return (
        <em key={idx} className="italic text-[#375560] dark:text-[#b4c8ce]">
          {part.slice(1, -1)}
        </em>
      );
    }

    // Brackets tag: [Role], [Context], [Task], [Output]
    if (part.startsWith('[') && part.endsWith(']') && part.length >= 3) {
      return (
        <span
          key={idx}
          dir="ltr"
          className="mx-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25 inline-block align-baseline"
        >
          {part}
        </span>
      );
    }

    // Parenthesized English terms: (Blind Spots), (Hallucination)
    if (part.startsWith('(') && part.endsWith(')') && /[A-Za-z]/.test(part)) {
      return (
        <bdi
          key={idx}
          dir="ltr"
          className="inline-block font-sans font-medium text-[#2d5666] dark:text-[#9bc7d5] mx-0.5"
        >
          {part}
        </bdi>
      );
    }

    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
};

// Code block with Copy button
const CodeSnippetBlock: React.FC<{ code: string; language?: string }> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-2 rounded-xl border border-black/10 dark:border-white/10 bg-[#0f171c] text-[#e2e8f0] overflow-hidden text-[11px] shadow-sm">
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#17222a] border-b border-white/5 text-[10px] text-gray-400 font-mono">
        <div className="flex items-center gap-1.5">
          <Code className="w-3 h-3 text-cyan-400" />
          <span>{language || 'code'}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">کپی شد</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>کپی</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-3 overflow-x-auto font-mono text-[11px] leading-relaxed select-all" dir="ltr">
        <code>{code}</code>
      </pre>
    </div>
  );
};

// Markdown Table Renderer
const MarkdownTableBlock: React.FC<{ lines: string[] }> = ({ lines }) => {
  if (lines.length < 2) return null;

  const headerCells = lines[0]
    .split('|')
    .map((c) => c.trim())
    .filter((c, i, arr) => (i > 0 && i < arr.length - 1) || (arr.length === 2 && c.length > 0));

  const bodyRows = lines
    .slice(2)
    .map((line) =>
      line
        .split('|')
        .map((c) => c.trim())
        .filter((c, i, arr) => (i > 0 && i < arr.length - 1) || (arr.length === 2 && c.length > 0))
    )
    .filter((r) => r.length > 0);

  return (
    <div className="my-2.5 overflow-x-auto rounded-xl border border-[#d9dad5] dark:border-[#2d3942] shadow-2xs">
      <table className="w-full text-right text-[11px] border-collapse bg-white dark:bg-[#151c22]">
        <thead>
          <tr className="bg-[#e0533c]/10 dark:bg-[#e0533c]/30 text-[#0e2a34] dark:text-[#a5e1f0] border-b border-[#d9dad5] dark:border-[#2d3942] font-bold">
            {headerCells.map((cell, idx) => (
              <th key={idx} className="p-2 text-start font-bold">
                {formatInlineText(cell)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#d9dad5]/60 dark:divide-[#2d3942]">
          {bodyRows.map((row, rIdx) => (
            <tr
              key={rIdx}
              className={rIdx % 2 === 0 ? 'bg-transparent' : 'bg-black/[0.02] dark:bg-white/[0.02]'}
            >
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="p-2 text-start leading-relaxed text-[#1c2830] dark:text-[#dce2e6]">
                  {formatInlineText(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const TutorMarkdownRenderer: React.FC<TutorMarkdownRendererProps> = ({ content }) => {
  if (!content) return null;

  let cleaned = content.trim();
  if (cleaned.startsWith('"""')) cleaned = cleaned.replace(/^"""\s*/, '');
  if (cleaned.endsWith('"""')) cleaned = cleaned.replace(/\s*"""$/, '');

  const lines = cleaned.split('\n');
  const blocks: React.ReactNode[] = [];

  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeLang = '';

  let inTable = false;
  let tableBuffer: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // 1. Code Block boundary
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        blocks.push(
          <CodeSnippetBlock
            key={`code-${i}`}
            code={codeBuffer.join('\n')}
            language={codeLang}
          />
        );
        inCodeBlock = false;
        codeBuffer = [];
        codeLang = '';
      } else {
        inCodeBlock = true;
        codeLang = trimmed.slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    // 2. Table boundary check
    if (trimmed.startsWith('|') && trimmed.endsWith('|') && trimmed.includes('|')) {
      if (!inTable) {
        inTable = true;
        tableBuffer = [line];
      } else {
        tableBuffer.push(line);
      }
      continue;
    } else if (inTable) {
      blocks.push(<MarkdownTableBlock key={`table-${i}`} lines={tableBuffer} />);
      inTable = false;
      tableBuffer = [];
    }

    // 3. Horizontal Rule
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      blocks.push(
        <hr
          key={`hr-${i}`}
          className="my-3 border-t border-black/10 dark:border-white/10"
        />
      );
      continue;
    }

    // 4. Empty lines
    if (!trimmed) {
      blocks.push(<div key={`empty-${i}`} className="h-1.5" />);
      continue;
    }

    // 5. Headings (###, ##, #)
    if (trimmed.startsWith('#')) {
      const match = trimmed.match(/^(#{1,4})\s*(.*)$/);
      if (match) {
        const level = match[1].length;
        const headingText = match[2].trim();

        const isStrength = /نقاط قوت|Strengths|✅|موفقیت/i.test(headingText);
        const isWarning = /نواقص|Blind Spots|⚠️|ایراد|خطر|هشدار/i.test(headingText);
        const isGoal = /هدف|Goal|Target|🎯/i.test(headingText);
        const isRecommendation = /پیشنهاد|Recommendation|راهکار|💡/i.test(headingText);
        const isArtifacts = /خروجی|Deliverables|📋/i.test(headingText);

        if (isStrength) {
          blocks.push(
            <div
              key={`h-${i}`}
              className="mt-3.5 mb-2 flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 font-bold text-xs"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{formatInlineText(headingText.replace(/✅/g, '').trim())}</span>
            </div>
          );
          continue;
        }

        if (isWarning) {
          blocks.push(
            <div
              key={`h-${i}`}
              className="mt-3.5 mb-2 flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-200 font-bold text-xs"
            >
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>{formatInlineText(headingText.replace(/⚠️/g, '').trim())}</span>
            </div>
          );
          continue;
        }

        if (isGoal) {
          blocks.push(
            <div
              key={`h-${i}`}
              className="mt-3 mb-2 flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-sky-500/10 dark:bg-sky-500/15 border border-sky-500/30 text-sky-800 dark:text-sky-200 font-bold text-xs"
            >
              <Target className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
              <span>{formatInlineText(headingText.replace(/🎯/g, '').trim())}</span>
            </div>
          );
          continue;
        }

        if (isRecommendation || isArtifacts) {
          blocks.push(
            <div
              key={`h-${i}`}
              className="mt-3 mb-2 flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#e0533c]/10 dark:bg-[#79c3d7]/15 border border-[#e0533c]/25 dark:border-[#79c3d7]/30 text-[#144252] dark:text-[#a5e1f0] font-bold text-xs"
            >
              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{formatInlineText(headingText.replace(/[💡📋]/g, '').trim())}</span>
            </div>
          );
          continue;
        }

        const headingClasses =
          level === 1
            ? 'text-sm font-extrabold text-[#0e2a34] dark:text-[#f0f4f6] mt-4 mb-2 pb-1 border-b border-black/10 dark:border-white/10'
            : level === 2
            ? 'text-xs font-bold text-[#144252] dark:text-[#c7e9f1] mt-3.5 mb-1.5'
            : 'text-xs font-semibold text-[#1c2830] dark:text-[#e8ebe9] mt-3 mb-1';

        blocks.push(
          <div key={`h-${i}`} className={headingClasses}>
            {formatInlineText(headingText)}
          </div>
        );
        continue;
      }
    }

    // 6. Blockquote (> ...)
    if (trimmed.startsWith('>')) {
      const quoteText = trimmed.replace(/^>\s*/, '');
      blocks.push(
        <div
          key={`quote-${i}`}
          className="my-2 p-2.5 rounded-xl border-r-3 border-r-[#e0533c] dark:border-r-[#fb7185] bg-[#e0533c]/5 dark:bg-[#e0533c]/15 text-[#1a2d34] dark:text-[#d3e5eb] text-[11px] leading-relaxed"
        >
          {formatInlineText(quoteText)}
        </div>
      );
      continue;
    }

    // 7. Bullet List (- item or * item)
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const itemContent = trimmed.slice(2).trim();
      const boldPrefixMatch = itemContent.match(/^(\*\*[^*]+\*\*[:\-]?)\s*(.*)$/);

      blocks.push(
        <div
          key={`li-${i}`}
          className="flex items-start gap-2 my-1.5 text-xs leading-relaxed text-[#1c2830] dark:text-[#dce2e6] pr-1"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#e0533c] dark:bg-[#79c3d7] shrink-0 mt-1.5" />
          <div className="flex-1">
            {boldPrefixMatch ? (
              <>
                <span className="font-bold text-[#0e2a34] dark:text-[#f0f4f6]">
                  {formatInlineText(boldPrefixMatch[1])}
                </span>{' '}
                <span>{formatInlineText(boldPrefixMatch[2])}</span>
              </>
            ) : (
              formatInlineText(itemContent)
            )}
          </div>
        </div>
      );
      continue;
    }

    // 8. Numbered List (1. item)
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (numMatch) {
      const num = numMatch[1];
      const itemContent = numMatch[2].trim();

      blocks.push(
        <div
          key={`num-${i}`}
          className="flex items-start gap-2 my-1.5 text-xs leading-relaxed text-[#1c2830] dark:text-[#dce2e6] pr-1"
        >
          <span className="w-4 h-4 rounded-full bg-[#e0533c]/10 dark:bg-[#79c3d7]/15 text-[#e0533c] dark:text-[#79c3d7] font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
            {num}
          </span>
          <div className="flex-1">{formatInlineText(itemContent)}</div>
        </div>
      );
      continue;
    }

    // 9. Standard Paragraph
    blocks.push(
      <p
        key={`p-${i}`}
        className="my-1.5 text-xs leading-relaxed text-[#1c2830] dark:text-[#dce2e6] break-words"
      >
        {formatInlineText(trimmed)}
      </p>
    );
  }

  // Flush trailing table
  if (inTable && tableBuffer.length > 0) {
    blocks.push(<MarkdownTableBlock key="table-end" lines={tableBuffer} />);
  }

  // Flush trailing code block
  if (inCodeBlock && codeBuffer.length > 0) {
    blocks.push(
      <CodeSnippetBlock
        key="code-end"
        code={codeBuffer.join('\n')}
        language={codeLang}
      />
    );
  }

  return (
    <div className="tutor-rendered-markdown space-y-0.5 select-text text-start">
      {blocks}
    </div>
  );
};
