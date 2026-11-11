import { MarkdownDoc, MarkdownDocument } from './types';

function slugifyLocal(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u0600-\u06FF\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function escapeHtmlLocal(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function extractSectionByHeading(content: string, headingText: string): string | null {
  if (!content || !headingText) return null;
  const targetSlug = slugifyLocal(headingText);

  const lines = content.split(/\r?\n/);
  let capturing = false;
  let targetDepth = 0;
  const capturedLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);

    if (headingMatch) {
      const depth = headingMatch[1].length;
      const title = headingMatch[2].trim();
      const slug = slugifyLocal(title);

      if (!capturing) {
        if (slug === targetSlug || title.toLowerCase() === headingText.toLowerCase()) {
          capturing = true;
          targetDepth = depth;
          continue;
        }
      } else {
        if (depth <= targetDepth) {
          break;
        }
      }
    }

    if (capturing) {
      capturedLines.push(line);
    }
  }

  return capturing ? capturedLines.join('\n').trim() : null;
}

export function resolveTransclusions(
  markdown: string,
  allDocs: MarkdownDoc[],
  visitedDocIds: Set<string> = new Set()
): string {
  return markdown.replace(/!\[\[([^\]\n]+)\]\]/g, (_match, inner) => {
    const parts = inner.split('|')[0].trim();
    const [rawDocTitle, rawHeading] = parts.split('#');
    const docTitle = rawDocTitle.trim();
    const heading = rawHeading ? rawHeading.trim() : null;

    const targetDoc = allDocs.find(
      (d) => d.title.trim().toLowerCase() === docTitle.toLowerCase()
    );

    if (!targetDoc) {
      return `\n> *سند مرجع «${escapeHtmlLocal(docTitle)}» یافت نشد*\n`;
    }

    if (visitedDocIds.has(targetDoc.id)) {
      return `\n> *ارجاع بازگشتی به سند «${escapeHtmlLocal(docTitle)}» نادیده گرفته شد*\n`;
    }

    visitedDocIds.add(targetDoc.id);

    let contentToEmbed = targetDoc.content;
    if (heading) {
      const section = extractSectionByHeading(targetDoc.content, heading);
      if (section !== null) {
        contentToEmbed = section;
      } else {
        return `\n> *بخش «${escapeHtmlLocal(heading)}» در سند «${escapeHtmlLocal(docTitle)}» یافت نشد*\n`;
      }
    }

    return `\n<div class="synapse-transclusion-block my-4 p-4 rounded-xl border border-[#0061FF]/30 bg-[#0061FF]/5 shadow-xs">
<div class="flex items-center justify-between pb-2 mb-2 border-b border-[#0061FF]/20 text-[11px] font-bold text-[#0061FF]">
  <span class="synapse-link flex items-center gap-1.5 cursor-pointer hover:underline" data-doc-id="${escapeHtmlLocal(targetDoc.id)}" data-synapse-target="${escapeHtmlLocal(targetDoc.id)}">
    <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
    <span>${escapeHtmlLocal(targetDoc.title)}${heading ? ` / ${escapeHtmlLocal(heading)}` : ''}</span>
  </span>
  <span class="text-[10px] text-[var(--text-muted)] font-normal">جاسازی زنده (Live Embed)</span>
</div>\n\n${contentToEmbed}\n\n</div>\n`;
  });
}

export function renderSynapseLinks(html: string, allDocs: MarkdownDoc[] = []): string {
  return html.replace(/(?<!\!)\[\[([^\]\n]+)\]\]/g, (_match, inner) => {
    const [pathPart, labelPart] = inner.split('|');
    const [rawTitle, rawHeading] = pathPart.split('#');
    const title = rawTitle.trim();
    const heading = rawHeading ? rawHeading.trim() : null;
    const label = labelPart ? labelPart.trim() : heading ? `${title} > ${heading}` : title;
    const matchedDoc = allDocs.find((d) => d.title.trim().toLowerCase() === title.toLowerCase());

    return `<a href="javascript:void(0)" class="synapse-link synapse-wiki-link inline-flex items-center gap-1 font-semibold text-[#0061FF] hover:text-[#0050d4] hover:underline px-1.5 py-0.5 rounded bg-[#0061FF]/10 text-xs transition-colors cursor-pointer" data-doc-id="${matchedDoc ? escapeHtmlLocal(matchedDoc.id) : ''}" data-synapse-title="${escapeHtmlLocal(title)}" data-synapse-heading="${heading ? escapeHtmlLocal(heading) : ''}" title="پرش به سند: ${escapeHtmlLocal(title)}${heading ? ` (${escapeHtmlLocal(heading)})` : ''}"><svg class="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg><span>${escapeHtmlLocal(label)}</span></a>`;
  });
}

export function findInboundBacklinks(
  targetDocTitle: string,
  allDocs: MarkdownDocument[]
): { sourceDocId: string; sourceDocTitle: string; excerpt: string }[] {
  if (!targetDocTitle) return [];
  const targetLower = targetDocTitle.trim().toLowerCase();
  const results: { sourceDocId: string; sourceDocTitle: string; excerpt: string }[] = [];

  allDocs.forEach((doc) => {
    if (doc.title.trim().toLowerCase() === targetLower) return;
    const escapedTitle = targetDocTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\[\\[${escapedTitle}(?:[#|][^\\]]+)?\\]\\]`, 'i');
    if (regex.test(doc.content)) {
      const line = doc.content.split(/\r?\n/).find((l) => regex.test(l)) || '';
      results.push({
        sourceDocId: doc.id,
        sourceDocTitle: doc.title,
        excerpt: line.replace(/[#*`~\[\]]/g, '').slice(0, 120),
      });
    }
  });

  return results;
}
