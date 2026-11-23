import React from 'react';
import {
  Copy,
  Check,
  Download,
  Eye,
  EyeOff,
  FileCode,
  FileText
} from 'lucide-react';
import { Language } from '../../types/cpmai';
import {
  SampleDepartmentDocument,
  SampleSubDocument
} from '../../data/notebooklm_sample_documents';

interface SpecimenDocumentCardProps {
  lang: Language;
  doc: SampleDepartmentDocument;
  helperNoteFa: string;
  helperNoteEn: string;
  docCopiedId: string | null;
  previewDocId: string | null;
  onDownload: (doc: SampleDepartmentDocument | SampleSubDocument) => void;
  onCopy: (doc: SampleDepartmentDocument | SampleSubDocument) => void;
  onTogglePreview: (docId: string) => void;
}

export const SpecimenDocumentCard: React.FC<SpecimenDocumentCardProps> = ({
  lang,
  doc,
  helperNoteFa,
  helperNoteEn,
  docCopiedId,
  previewDocId,
  onDownload,
  onCopy,
  onTogglePreview
}) => {
  const isFa = lang === 'fa';
  const isPreviewOpen = previewDocId === doc.id;

  return (
    <div className="rounded-xl bg-slate-50 dark:bg-[#121920] border border-slate-200 dark:border-slate-800 p-4 space-y-3">
      {/* Header row with unboxed metadata */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-start gap-2.5 min-w-0">
          <div className="p-2 rounded-lg bg-[#1f5163]/10 dark:bg-[#6fb3c6]/15 text-[#1f5163] dark:text-[#6fb3c6] shrink-0">
            <FileCode className="w-4 h-4" />
          </div>
          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-2 flex-wrap text-[11px] text-slate-500 dark:text-slate-400">
              <span dir="ltr" className="font-mono font-semibold text-[#1f5163] dark:text-[#6fb3c6]">
                {doc.fileName}
              </span>
              <span aria-hidden="true">·</span>
              <span dir="ltr" className="font-mono tabular-nums">
                {doc.fileSizeApprox}
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                {isFa ? 'فایل نمونه آماده تست' : 'Ready-to-Test Specimen'}
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
              {isFa ? doc.titleFa : doc.titleEn}
            </h4>
          </div>
        </div>
      </div>

      {/* Summary */}
      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        {isFa ? doc.summaryFa : doc.summaryEn}
      </p>

      {/* Primary Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => onDownload(doc)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1f5163] hover:bg-[#163c4a] text-white text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span>{isFa ? 'دانلود فایل (.md)' : 'Download .md'}</span>
          </button>

          <button
            type="button"
            onClick={() => onCopy(doc)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer whitespace-nowrap ${
              docCopiedId === doc.id
                ? 'bg-emerald-600 border-emerald-600 text-white'
                : 'bg-white dark:bg-[#18212b] border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-[#1f5163]/50'
            }`}
          >
            {docCopiedId === doc.id ? (
              <>
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>{isFa ? 'کپی شد' : 'Copied'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 shrink-0" />
                <span>{isFa ? 'کپی متن سند' : 'Copy Text'}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onTogglePreview(doc.id)}
            data-testid={`preview-specimen-${doc.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#18212b] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-[#1f5163]/50 text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
          >
            {isPreviewOpen ? (
              <>
                <EyeOff className="w-3.5 h-3.5 shrink-0" />
                <span>{isFa ? 'بستن پیش‌نمایش' : 'Hide Preview'}</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 shrink-0" />
                <span>{isFa ? 'پیش‌نمایش سند' : 'Preview'}</span>
              </>
            )}
          </button>
        </div>

        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          {isFa ? helperNoteFa : helperNoteEn}
        </span>
      </div>

      {/* Expandable Preview Drawer */}
      {isPreviewOpen && (
        <div className="rounded-lg bg-white dark:bg-[#0d131a] border border-slate-200 dark:border-slate-700 p-3.5 max-h-72 overflow-y-auto space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/70 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
            <span dir="ltr" className="font-mono font-semibold text-[#1f5163] dark:text-[#6fb3c6]">
              {doc.fileName}
            </span>
            <span dir="ltr" className="font-mono tabular-nums">
              {doc.markdownContent.length.toLocaleString()} chars
            </span>
          </div>
          <pre
            dir={isFa ? 'rtl' : 'ltr'}
            className={`text-xs font-mono text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed select-text ${
              isFa ? 'text-right' : 'text-left'
            }`}
          >
            {doc.markdownContent}
          </pre>
        </div>
      )}

      {/* Optional Dual-Source Paste Text Sub-Documents (e.g., HR Compliance Audit) */}
      {doc.subDocuments && doc.subDocuments.length > 0 && (
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
            <span className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#1f5163] dark:text-[#6fb3c6]" />
              <span>
                {isFa
                  ? 'بارگذاری تفکیکی دو منبع (گزینه Paste Text در NotebookLM):'
                  : 'Copy Individual Sources for NotebookLM (Paste Text):'}
              </span>
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              {isFa ? '۲ منبع مجزا' : '2 Separate Sources'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {doc.subDocuments.map((sub) => {
              const isSubPreview = previewDocId === sub.id;
              return (
                <div
                  key={sub.id}
                  className="p-3 rounded-lg bg-white dark:bg-[#161e26] border border-slate-200 dark:border-slate-700/80 space-y-2"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-snug">
                      {isFa ? sub.labelFa : sub.labelEn}
                    </div>
                    <div dir="ltr" className="text-[10.5px] font-mono text-slate-500 dark:text-slate-400 truncate">
                      {sub.fileName}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      type="button"
                      onClick={() => onCopy(sub)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                        docCopiedId === sub.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#1f5163] hover:bg-[#163c4a] text-white'
                      }`}
                    >
                      {docCopiedId === sub.id ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>{isFa ? 'کپی شد' : 'Copied'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>{isFa ? 'کپی برای Paste Text' : 'Copy Text'}</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => onDownload(sub)}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-semibold cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      <span>{isFa ? 'دانلود' : 'Download'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onTogglePreview(sub.id)}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-[#1f5163]/50 text-[11px] font-semibold cursor-pointer"
                    >
                      {isSubPreview ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      <span>{isFa ? (isSubPreview ? 'بستن' : 'مشاهده') : 'View'}</span>
                    </button>
                  </div>
                  {isSubPreview && (
                    <div className="p-2.5 rounded-md bg-slate-50 dark:bg-[#0d131a] border border-slate-200 dark:border-slate-800 max-h-56 overflow-y-auto">
                      <pre
                        dir={isFa ? 'rtl' : 'ltr'}
                        className={`text-[11px] font-mono text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed select-text ${
                          isFa ? 'text-right' : 'text-left'
                        }`}
                      >
                        {sub.markdownContent}
                      </pre>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
