import React, { useState } from 'react';
import { WORKBOOK_PAGES_META, WorkbookPageDoc } from '../data/exemplarData';
import { Language } from '../types/cpmai';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  Layers, 
  Sparkles, 
  GraduationCap, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Maximize2, 
  X,
  ExternalLink,
  Download
} from 'lucide-react';

interface Props {
  lang: Language;
  userRole: 'student' | 'instructor';
  onNavigateToExercisePage?: (pageNumber: number) => void;
  onApplyExemplarToStudent?: (pageNumber: number) => void;
}

export const WorkbookReferenceViewer: React.FC<Props> = ({
  lang,
  userRole,
  onNavigateToExercisePage,
  onApplyExemplarToStudent
}) => {
  const [selectedPageIndex, setSelectedPageIndex] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<'all' | 'meta' | 'case' | 'solutions'>('all');
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

  const currentPage = WORKBOOK_PAGES_META[selectedPageIndex];

  const filteredPages = WORKBOOK_PAGES_META.filter((p) => {
    if (activeFilter === 'meta') return p.pageNumber <= 10;
    if (activeFilter === 'case') return p.pageNumber >= 11 && p.pageNumber <= 18;
    if (activeFilter === 'solutions') return p.pageNumber >= 19;
    return true;
  });

  const handleNext = () => {
    if (selectedPageIndex < WORKBOOK_PAGES_META.length - 1) {
      setSelectedPageIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (selectedPageIndex > 0) {
      setSelectedPageIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Role Notification */}
      <div className={`p-4 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors ${
        userRole === 'instructor' 
          ? 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200' 
          : 'bg-blue-500/10 border-blue-500/30 text-blue-900 dark:text-blue-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white shadow-xs ${
            userRole === 'instructor' ? 'bg-amber-600' : 'bg-blue-600'
          }`}>
            {userRole === 'instructor' ? <GraduationCap className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
          </div>
          <div>
            <div className="font-bold text-sm md:text-base flex items-center gap-2">
              <span>{userRole === 'instructor' 
                ? (lang === 'fa' ? 'نسخه مرجع استاد (کتاب کار پر شده v7.0)' : 'Instructor Master Reference (Filled Workbook v7.0)')
                : (lang === 'fa' ? 'مستندات و سناریوی مرجع مطالعه موردی' : 'Workbook Reference & Case Study Material')}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 font-mono">
                {lang === 'fa' ? `صفحه ${currentPage.pageNumber} از ۲۵` : `Page ${currentPage.pageNumber} of 25`}
              </span>
            </div>
            <p className="text-xs opacity-85 mt-0.5">
              {userRole === 'instructor'
                ? (lang === 'fa' ? 'شامل کلیه ۲۵ صفحه اصلی، تحلیل‌های تفصیلی، سنجه‌های تصحیح و پاسخ‌های استاندارد.' : 'Full 25 slides including exemplar solutions, teaching rubrics, and high-res book pages.')
                : (lang === 'fa' ? 'مطالعه سناریوی شرکت XYZ، ساختار متدولوژی و بررسی پاسخ‌های نمونه استاد برای یادگیری.' : 'Study the XYZ Company use case, methodology phases, and compare with exemplar model answers.')}
            </p>
          </div>
        </div>

        {/* Section Filters */}
        <div className="flex items-center gap-1.5 flex-wrap self-end md:self-auto text-xs">
          <button
            onClick={() => { setActiveFilter('all'); setSelectedPageIndex(0); }}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              activeFilter === 'all'
                ? 'bg-[#2f7d5b] text-white shadow-xs'
                : 'bg-white/80 dark:bg-[#1a2228] text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            {lang === 'fa' ? 'همه (۱-۲۵)' : 'All (1-25)'}
          </button>
          <button
            onClick={() => { setActiveFilter('meta'); setSelectedPageIndex(0); }}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              activeFilter === 'meta'
                ? 'bg-[#2f7d5b] text-white shadow-xs'
                : 'bg-white/80 dark:bg-[#1a2228] text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            {lang === 'fa' ? 'متدولوژی (۱-۱۰)' : 'Methodology (1-10)'}
          </button>
          <button
            onClick={() => { setActiveFilter('case'); setSelectedPageIndex(10); }}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              activeFilter === 'case'
                ? 'bg-[#2f7d5b] text-white shadow-xs'
                : 'bg-white/80 dark:bg-[#1a2228] text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            {lang === 'fa' ? 'سناریو XYZ (۱۱-۱۸)' : 'XYZ Case (11-18)'}
          </button>
          <button
            onClick={() => { setActiveFilter('solutions'); setSelectedPageIndex(18); }}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              activeFilter === 'solutions'
                ? 'bg-[#2f7d5b] text-white shadow-xs'
                : 'bg-white/80 dark:bg-[#1a2228] text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            {lang === 'fa' ? 'پاسخ‌های حل‌شده (۱۹-۲۵)' : 'Solutions (19-25)'}
          </button>
        </div>
      </div>

      {/* Main Dual-Column Viewer: Slide Preview (Left) + Detailed Analysis & Solution (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: High-Res Slide Presentation (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-white dark:bg-[#1a2228] p-3 rounded-2xl border border-[#d9dad5] dark:border-[#2d3942] shadow-xs relative group">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100 dark:border-gray-800 text-xs">
              <span className="font-semibold text-gray-500 dark:text-gray-400">
                {lang === 'fa' ? 'تصویر اسلاید رسمی کتاب کار' : 'Official Workbook Slide'}
              </span>
              <button
                onClick={() => setIsZoomModalOpen(true)}
                className="flex items-center gap-1 text-[#2f7d5b] hover:underline cursor-pointer"
                title={lang === 'fa' ? 'بزرگنمایی تمام‌صفحه' : 'Full-screen zoom'}
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{lang === 'fa' ? 'بزرگنمایی' : 'Zoom'}</span>
              </button>
            </div>

            {/* Slide Image with preview */}
            <div 
              onClick={() => setIsZoomModalOpen(true)}
              className="relative rounded-xl overflow-hidden cursor-pointer border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 aspect-3/4 flex items-center justify-center group"
            >
              <img
                src={currentPage.imagePath}
                alt={currentPage.titleEn}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-102"
                loading="eager"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 font-medium text-sm backdrop-blur-2xs">
                <Maximize2 className="w-5 h-5" />
                <span>{lang === 'fa' ? 'کلیک جهت مشاهده تمام‌صفحه' : 'Click to view full screen'}</span>
              </div>
            </div>

            {/* Bottom Nav inside image card */}
            <div className="flex items-center justify-between mt-3 pt-2 text-xs">
              <button
                onClick={handlePrev}
                disabled={selectedPageIndex === 0}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
                <span>{lang === 'fa' ? 'صفحه قبلی' : 'Previous'}</span>
              </button>

              <span className="font-mono text-gray-500 font-medium">
                {currentPage.pageNumber} / {WORKBOOK_PAGES_META.length}
              </span>

              <button
                onClick={handleNext}
                disabled={selectedPageIndex === WORKBOOK_PAGES_META.length - 1}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span>{lang === 'fa' ? 'صفحه بعدی' : 'Next'}</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Page Navigator Carousel */}
          <div className="bg-white dark:bg-[#1a2228] p-3 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] shadow-2xs">
            <div className="text-xs font-semibold text-gray-500 mb-2 flex items-center justify-between">
              <span>{lang === 'fa' ? 'انتخاب سریع صفحه:' : 'Quick Page Select:'}</span>
              <span className="font-mono text-xs text-[#2f7d5b]">p. {currentPage.pageNumber}</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {WORKBOOK_PAGES_META.map((p, idx) => (
                <button
                  key={p.pageNumber}
                  onClick={() => setSelectedPageIndex(idx)}
                  className={`w-7 h-7 shrink-0 rounded-md font-mono text-xs font-medium flex items-center justify-center transition-all ${
                    idx === selectedPageIndex
                      ? 'bg-[#2f7d5b] text-white shadow-xs font-bold scale-105'
                      : p.pageNumber >= 19
                      ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200 hover:bg-amber-200'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                  }`}
                  title={`${p.pageNumber}: ${lang === 'fa' ? p.titleFa : p.titleEn}`}
                >
                  {p.pageNumber}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Structured Text, Solutions & Teaching Guide (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-[#1a2228] p-6 rounded-2xl border border-[#d9dad5] dark:border-[#2d3942] shadow-xs space-y-5">
            {/* Header info */}
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#2f7d5b]/10 text-[#2f7d5b] dark:text-[#52b788]">
                    {lang === 'fa' ? currentPage.sectionFa : currentPage.sectionEn}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    Slide {currentPage.pageNumber}
                  </span>
                  {currentPage.pageNumber >= 19 && (
                    <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      {lang === 'fa' ? '★ پاسخ حل‌شده استاد' : '★ Filled Master Solution'}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {lang === 'fa' ? currentPage.titleFa : currentPage.titleEn}
                </h2>
                <h3 className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-0.5">
                  {currentPage.titleEn}
                </h3>
              </div>

              {/* Action Buttons */}
              {currentPage.pageNumber >= 19 && (
                <div className="flex flex-col gap-1.5 shrink-0">
                  {onNavigateToExercisePage && (
                    <button
                      onClick={() => onNavigateToExercisePage(currentPage.pageNumber - 18)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#2f7d5b] text-white hover:bg-[#25664a] transition-colors shadow-xs"
                    >
                      <span>{lang === 'fa' ? 'ورود به بوم تمرین' : 'Go to Exercise'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {userRole === 'instructor' && onApplyExemplarToStudent && (
                    <button
                      onClick={() => onApplyExemplarToStudent(currentPage.pageNumber - 18)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 transition-colors"
                      title={lang === 'fa' ? 'پر کردن فرم دانشجو با این پاسخ نمونه' : 'Fill student form with this answer'}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{lang === 'fa' ? 'تزریق به فرم دانشجو' : 'Apply to Form'}</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Summary Box */}
            <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 text-sm leading-relaxed">
              <span className="font-bold text-[#2f7d5b] block mb-1">
                {lang === 'fa' ? 'خلاصه محتوا:' : 'Summary:'}
              </span>
              <p className="text-gray-700 dark:text-gray-300">
                {lang === 'fa' ? currentPage.summaryFa : currentPage.summaryEn}
              </p>
            </div>

            {/* Key Points */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {lang === 'fa' ? 'نکات کلیدی و راهبردی:' : 'Key Takeaways & Highlights:'}
              </h4>
              <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
                {currentPage.keyPointsFa.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2f7d5b] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Detailed Content / Solution Box */}
            <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center justify-between">
                <span>{currentPage.pageNumber >= 19 
                  ? (lang === 'fa' ? 'متن کامل پاسخ نمونه استاد (حل کتاب کار):' : 'Exemplar Solution Text (from Workbook):')
                  : (lang === 'fa' ? 'متن تشریحی اسلاید:' : 'Full Slide Transcript:')}</span>
                <span className="font-mono text-xs text-gray-400">English Original</span>
              </h4>
              
              <div className="p-4 rounded-xl bg-[#f8f9fa] dark:bg-[#13191f] border border-gray-200 dark:border-gray-700 font-mono text-xs leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto scrollbar-thin text-gray-800 dark:text-gray-200">
                {currentPage.fullTextEn}
              </div>
            </div>

            {/* Instructor Evaluation Notes (if applicable) */}
            {currentPage.instructorNotesFa && (
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-amber-600" />
                  <span>{lang === 'fa' ? 'راهنمای ارزیابی و سنجه تصحیح استاد (Rubric):' : 'Instructor Evaluation & Grading Rubric:'}</span>
                </div>
                <p className="leading-relaxed opacity-90">
                  {currentPage.instructorNotesFa}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full-Screen Zoom Modal */}
      {isZoomModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-5xl flex items-center justify-between text-white pb-3 border-b border-white/20 mb-3">
            <div className="flex items-center gap-3">
              <span className="font-bold text-lg">
                {lang === 'fa' ? currentPage.titleFa : currentPage.titleEn}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-white/20 font-mono">
                Slide {currentPage.pageNumber} / 25
              </span>
            </div>
            <button
              onClick={() => setIsZoomModalOpen(false)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center overflow-auto">
            <img
              src={currentPage.imagePath}
              alt={currentPage.titleEn}
              className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl border border-white/20"
            />
          </div>

          <div className="flex items-center gap-4 mt-3 text-white text-sm">
            <button
              onClick={handlePrev}
              disabled={selectedPageIndex === 0}
              className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-20 cursor-pointer flex items-center gap-1"
            >
              <ChevronRight className="w-4 h-4" />
              <span>{lang === 'fa' ? 'قبلی' : 'Previous'}</span>
            </button>
            <span className="font-mono">{currentPage.pageNumber} / {WORKBOOK_PAGES_META.length}</span>
            <button
              onClick={handleNext}
              disabled={selectedPageIndex === WORKBOOK_PAGES_META.length - 1}
              className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-20 cursor-pointer flex items-center gap-1"
            >
              <span>{lang === 'fa' ? 'بعدی' : 'Next'}</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
