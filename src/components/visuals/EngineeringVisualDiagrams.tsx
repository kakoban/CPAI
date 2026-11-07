import React, { useState } from 'react';
import {
  Database,
  ArrowRight,
  ArrowLeft,
  Workflow,
  Sparkles,
  GitBranch,
  GitCommit,
  GitPullRequest,
  CheckCircle2,
  XCircle,
  FolderTree,
  FileSpreadsheet,
  Layers,
  Terminal,
  Maximize2,
  X
} from 'lucide-react';
import { Language } from '../../types/cpmai';

interface DiagramWrapperProps {
  titleFa: string;
  titleEn: string;
  badgeFa: string;
  children: React.ReactNode;
  lang?: Language;
}

export const DiagramWrapper: React.FC<DiagramWrapperProps> = ({
  titleFa,
  titleEn,
  badgeFa,
  children,
  lang = 'fa'
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <div className="rounded-2xl border border-[#ecdcd8] dark:border-[#382645] bg-[#fdf8f5]/80 dark:bg-[#16101c]/80 backdrop-blur-xs p-4 sm:p-5 shadow-2xs space-y-3 transition-all hover:border-[#e0533c]/40">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-2.5 border-b border-[#ecdcd8]/60 dark:border-[#382645]/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#e0533c] animate-pulse" />
            <h4 className="font-extrabold text-xs sm:text-sm text-[#261a1d] dark:text-[#faedf3]">
              {lang === 'fa' ? titleFa : titleEn}
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-[#e0533c]/10 text-[#e0533c] dark:text-[#fb7185] border border-[#e0533c]/20">
              {badgeFa}
            </span>
            <button
              type="button"
              onClick={() => setIsZoomed(true)}
              className="p-1 rounded-lg text-[#755e66] dark:text-[#ad99ab] hover:bg-[#e0533c]/10 hover:text-[#e0533c] transition-colors cursor-pointer"
              title="بزرگ‌نمایی دیاگرام"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto py-1">{children}</div>
      </div>

      {/* Lightbox / Zoom Modal */}
      {isZoomed && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative w-full max-w-5xl rounded-3xl bg-white dark:bg-[#16101c] border border-white/20 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-[#e0533c] text-white text-xs font-black">
                  نمای تمام‌صفحه
                </span>
                <h3 className="font-black text-sm sm:text-base text-[#261a1d] dark:text-[#faedf3]">
                  {lang === 'fa' ? titleFa : titleEn}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsZoomed(false)}
                className="p-1.5 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-[#e0533c] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-x-auto p-2">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

// ============================================================================
// 1. PIPELINE ARCHITECTURE DIAGRAM (FOR SESSION 1 DEMO & SESSION 5)
// ============================================================================
export const PipelineArchitectureDiagram: React.FC<{ lang?: Language }> = ({ lang = 'fa' }) => {
  const steps = [
    {
      num: '01',
      titleFa: 'داده خام کارگاه',
      subFa: 'Google Drive / هارد دیسک',
      icon: Database,
      color: 'from-amber-500 to-orange-500',
      badge: 'Input'
    },
    {
      num: '02',
      titleFa: 'پایپ‌لاین داده (MCP)',
      subFa: 'اتصال زنده بدون کپی-پیست',
      icon: Terminal,
      color: 'from-blue-600 to-cyan-500',
      badge: 'Piping'
    },
    {
      num: '03',
      titleFa: 'ممیزی با SKILL.md',
      subFa: 'تشخیص انحرافات و تله‌ها',
      icon: Workflow,
      color: 'from-purple-600 to-pink-500',
      badge: 'Brain SOP'
    },
    {
      num: '04',
      titleFa: 'داشبورد Artifacts',
      subFa: 'تولید برنامه زنده React/HTML',
      icon: Layers,
      color: 'from-[#e0533c] to-[#c026d3]',
      badge: 'UI Render'
    },
    {
      num: '05',
      titleFa: 'انتشار در GitHub DCC',
      subFa: 'Commit خودکار و GitHub Pages',
      icon: GitCommit,
      color: 'from-emerald-600 to-teal-500',
      badge: 'Archive'
    }
  ];

  return (
    <div className="min-w-[700px] py-2">
      <div className="grid grid-cols-5 gap-2.5 relative">
        {steps.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div key={st.num} className="relative flex flex-col items-center text-center space-y-2">
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${st.color} text-white flex items-center justify-center shadow-md relative z-10`}
              >
                <Icon className="w-6 h-6" />
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white dark:bg-[#201729] text-[#261a1d] dark:text-[#faedf3] font-mono font-black text-[9px] flex items-center justify-center border border-[#ecdcd8] dark:border-[#382645] shadow-xs">
                  {st.num}
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-[9px] font-black uppercase tracking-wider text-[#e0533c] dark:text-[#fb7185] block">
                  {st.badge}
                </span>
                <span className="font-extrabold text-xs text-[#261a1d] dark:text-[#faedf3] block leading-tight">
                  {st.titleFa}
                </span>
                <span className="text-[10px] text-[#755e66] dark:text-[#ad99ab] block leading-tight">
                  {st.subFa}
                </span>
              </div>

              {/* Connecting Arrow */}
              {idx < steps.length - 1 && (
                <div className="absolute top-6 -left-3.5 z-0 transform translate-x-1/2 hidden md:block">
                  <div className="flex items-center text-[#e0533c]/60 dark:text-[#fb7185]/60">
                    <div className="w-5 h-0.5 bg-gradient-to-l from-current to-transparent" />
                    <ArrowLeft className="w-3.5 h-3.5 -mr-1" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// 2. VISUAL SPREADSHEET COMPARISON: MESSY VS. MACHINE-READABLE
// ============================================================================
export const VisualTableComparisonDiagram: React.FC<{ lang?: Language }> = () => {
  return (
    <div className="min-w-[680px] grid grid-cols-2 gap-4 text-xs font-mono">
      {/* Bad / Messy Excel */}
      <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/[0.03] space-y-2">
        <div className="flex items-center justify-between pb-1.5 border-b border-red-500/20 text-red-700 dark:text-red-400 font-sans font-bold">
          <span className="flex items-center gap-1.5">
            <XCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>جدول سنتی و خراب برای هوش مصنوعی (نویز بالا ❌)</span>
          </span>
          <span className="text-[10px] bg-red-500/10 px-2 py-0.5 rounded">Fail</span>
        </div>

        <div className="rounded-lg border border-red-300 dark:border-red-900 overflow-hidden text-[11px] bg-white dark:bg-[#1a1215]">
          <div className="bg-red-100 dark:bg-red-950/60 p-1.5 text-center font-bold text-red-900 dark:text-red-200 border-b border-red-300 dark:border-red-900">
            [سلول ادغام‌شده Merge]: گزارش وضعیت هفتگی کارگاه خط ۲ مترو
          </div>
          <div className="grid grid-cols-4 bg-gray-100 dark:bg-gray-800 p-1 font-bold border-b text-center text-[10px]">
            <div>بخش</div>
            <div>فعالیت</div>
            <div>پیشرفت</div>
            <div>وضعیت</div>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-800 text-[10px]">
            <div className="grid grid-cols-4 p-1 items-center">
              <div className="row-span-2 bg-yellow-50 dark:bg-yellow-950/30 p-1 text-center font-bold border-l">
                ایستگاه A (Merge)
              </div>
              <div className="p-1">حفاری شفت</div>
              <div className="p-1 text-center">حدود ۸۰٪</div>
              <div className="p-1 text-center text-yellow-600">🟡 تاخیر</div>
            </div>
            <div className="grid grid-cols-4 p-1 items-center bg-red-50/40 dark:bg-red-950/20">
              <div className="p-1 text-red-500 text-center font-bold">[Null خالی]</div>
              <div className="p-1">لاینینگ بتنی</div>
              <div className="p-1 text-center">۴۵٪ (تخمینی)</div>
              <div className="p-1 text-center text-red-600">🔴 بحرانی</div>
            </div>
            <div className="grid grid-cols-4 p-1.5 bg-gray-200 dark:bg-gray-700 font-bold text-center">
              <div className="col-span-2">جمع کل میانی (Total)</div>
              <div>۱۲۵٪ (خطا!)</div>
              <div>میانگین</div>
            </div>
          </div>
        </div>
        <p className="text-[10px] font-sans text-red-700 dark:text-red-300 leading-tight">
          ⚠️ ایراد: سلول‌های ادغام‌شده، ستون‌های عددی حاوی متن فارسی و ردیف جمع کل میانی باعث خطای ۵۰ درصدی مدل می‌شوند!
        </p>
      </div>

      {/* Good / Machine-Readable Clean Table */}
      <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.03] space-y-2">
        <div className="flex items-center justify-between pb-1.5 border-b border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-sans font-bold">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>جدول استاندارد ماشین‌خوان هوش مصنوعی (دقت ۱۰۰٪ ✅)</span>
          </span>
          <span className="text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded">Machine-Ready</span>
        </div>

        <div className="rounded-lg border border-emerald-300 dark:border-emerald-900 overflow-hidden text-[11px] bg-white dark:bg-[#121c16]">
          <div className="grid grid-cols-4 bg-emerald-100 dark:bg-emerald-950/70 p-1 font-bold border-b border-emerald-300 dark:border-emerald-900 text-center text-[10px] text-emerald-950 dark:text-emerald-200">
            <div>zone_id</div>
            <div>task_name</div>
            <div>progress_pct</div>
            <div>delay_reason</div>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-800 text-[10px]">
            <div className="grid grid-cols-4 p-1 items-center">
              <div className="p-1 text-center">Station_A</div>
              <div className="p-1">Shaft_Excavation</div>
              <div className="p-1 text-center font-bold text-emerald-600">80.0</div>
              <div className="p-1 text-center text-gray-500">None</div>
            </div>
            <div className="grid grid-cols-4 p-1 items-center bg-emerald-50/30 dark:bg-emerald-950/20">
              <div className="p-1 text-center">Station_A</div>
              <div className="p-1">Concrete_Lining</div>
              <div className="p-1 text-center font-bold text-amber-600">45.0</div>
              <div className="p-1 text-center text-amber-700">Pump_Fault</div>
            </div>
            <div className="grid grid-cols-4 p-1 items-center">
              <div className="p-1 text-center">Station_B</div>
              <div className="p-1">TBM_Drive_Ring</div>
              <div className="p-1 text-center font-bold text-emerald-600">92.5</div>
              <div className="p-1 text-center text-gray-500">None</div>
            </div>
          </div>
        </div>
        <p className="text-[10px] font-sans text-emerald-700 dark:text-emerald-300 leading-tight">
          ✓ مزیت: بدون Merge، ستون‌های نام‌گذاری‌شده یکتا، اعداد خالص ممیزدار و آماده خروجی CSV با یک کلیک!
        </p>
      </div>
    </div>
  );
};

// ============================================================================
// 3. GITHUB DCC ENGINEERING LIFECYCLE DIAGRAM
// ============================================================================
export const GitHubDccWorkflowDiagram: React.FC<{ lang?: Language }> = () => {
  return (
    <div className="min-w-[680px] p-4 rounded-xl bg-gradient-to-r from-slate-900 via-[#1e293b] to-slate-900 text-white space-y-4">
      <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
        <span className="text-cyan-400 font-bold flex items-center gap-1.5">
          <GitBranch className="w-4 h-4" />
          <span>چرخه استاندارد کنترل مدارک (DCC) در معماری گیت‌هاب</span>
        </span>
        <span className="text-[10px] font-mono text-slate-400" dir="ltr">Main ← Draft Branch ← Commit ← Pull Request ← Merge (IFC)</span>
      </div>

      <div className="grid grid-cols-4 gap-3 text-center text-xs">
        {/* Step 1: Main */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-xs font-black flex items-center justify-center mx-auto border border-emerald-500/40">
            01
          </div>
          <b className="text-emerald-400 block text-xs font-mono">main (IFC)</b>
          <span className="text-[11px] text-slate-300 font-bold block">مدرک رسمی و ابلاغ‌شده</span>
          <p className="text-[10px] text-slate-400 leading-tight">
            نسخه بدون دستکاری که کل پروژه و هوش مصنوعی به آن استناد می‌کنند.
          </p>
        </div>

        {/* Step 2: Branch */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 font-mono text-xs font-black flex items-center justify-center mx-auto border border-blue-500/40">
            02
          </div>
          <b className="text-blue-400 block text-xs font-mono">draft-branch</b>
          <span className="text-[11px] text-slate-300 font-bold block">شاخه چکنویس مهندس</span>
          <p className="text-[10px] text-slate-400 leading-tight">
            کپی موازی برای ایجاد تغییرات، اضافه کردن پرامپت یا ویرایش جدول.
          </p>
        </div>

        {/* Step 3: Commit */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
          <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 font-mono text-xs font-black flex items-center justify-center mx-auto border border-purple-500/40">
            03
          </div>
          <b className="text-purple-400 block text-xs font-mono">Commit (Rev)</b>
          <span className="text-[11px] text-slate-300 font-bold block">ثبت ریویژن جدید</span>
          <p className="text-[10px] text-slate-400 leading-tight">
            ذخیره تغییرات با شناسه یکتا و پیام توصیفی (Rev.01 → Rev.02).
          </p>
        </div>

        {/* Step 4: PR & Merge */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
          <div className="w-7 h-7 rounded-lg bg-pink-500/20 text-pink-400 font-mono text-xs font-black flex items-center justify-center mx-auto border border-pink-500/40">
            04
          </div>
          <b className="text-pink-400 block text-xs font-mono">PR &amp; Merge</b>
          <span className="text-[11px] text-slate-300 font-bold block">تایید سرپرست و ادغام</span>
          <p className="text-[10px] text-slate-400 leading-tight">
            بررسی مقایسه رنگی (Diff)، تایید نهایی و ادغام رسمی در سند اصلی.
          </p>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 4. ANNOTATED GITHUB WEB UI SCHEMATIC (FOR BEGINNERS)
// ============================================================================
export const GitHubAnnotatedUiMockup: React.FC<{ lang?: Language }> = () => {
  return (
    <div className="min-w-[680px] rounded-xl border border-slate-700 bg-[#0d1117] text-[#c9d1d9] font-mono text-xs overflow-hidden shadow-lg">
      {/* Fake Browser Chrome */}
      <div className="bg-[#161b22] px-3 py-2 border-b border-slate-800 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
          <span className="ms-2 text-slate-400 text-[10px]">https://github.com/your-username/ai-engineering-hub</span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] border border-purple-500/30">
          راهنمای تصویری کلیدهای گیت‌هاب
        </span>
      </div>

      {/* Fake Repo Top Header */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-sm font-bold">
            <span className="text-blue-400">your-username</span>
            <span className="text-slate-500">/</span>
            <span className="text-white">ai-engineering-hub</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] border border-slate-700 text-slate-400">Private</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>کلید ۱: New Repository</span>
            </span>
          </div>
        </div>

        {/* File Explorer Bar with Edit Button Callout */}
        <div className="rounded-lg border border-slate-800 bg-[#161b22] p-3 space-y-2">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-300">📄 README.md</span>
              <span className="text-slate-500 text-[10px]">مدرک شناسنامه و قوانین هوش مصنوعی</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold text-[10px] flex items-center gap-1">
                <span>✏️ کلید ۲: آیکون مداد (Edit File)</span>
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded bg-[#0d1117] text-[11px] text-slate-300 leading-relaxed space-y-1">
            <div className="text-emerald-400 font-bold"># AI Engineering Hub (Rev.01)</div>
            <div className="text-slate-400">- Rule 1: No unverified numbers in reports</div>
            <div className="text-slate-400">- Rule 2: Always link prompts to approved WBS</div>
          </div>

          <div className="flex items-center justify-end pt-1">
            <span className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>کلید ۳: Commit Changes (ثبت ریویژن رسمی)</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 5. CONTRACT & CLAIMS AUDIT VISUAL ARCHITECTURE (SESSION 3, MODULE 3-2)
// ============================================================================
export const ContractAuditArchitectureDiagram: React.FC<{ lang?: Language }> = () => {
  return (
    <div className="min-w-[700px] p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#16101c] via-[#201729] to-[#16101c] text-white border border-[#ecdcd8]/20 space-y-4">
      <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
        <span className="text-[#fb7185] font-extrabold flex items-center gap-1.5 font-sans">
          <Workflow className="w-4 h-4 text-[#e0533c]" />
          <span>معماری سیستم ممیزی قراردادها، تاخیرات و ادعاها (Claims) با هوش مصنوعی</span>
        </span>
        <span className="text-[10px] font-mono text-slate-400" dir="ltr">Ground-Truth Docs → AI Contract Auditor → 3 Core Deliverables</span>
      </div>

      <div className="grid grid-cols-3 gap-4 text-xs">
        {/* Pillar 1: Inputs */}
        <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold">
              مرحله ۱ · اسناد ورودی
            </span>
            <span className="text-[10px] text-slate-400">Knowledge Base</span>
          </div>
          <h5 className="font-extrabold text-xs text-white">خوراک دانشی قرارداد</h5>
          <ul className="space-y-1.5 text-[11px] text-slate-300 leading-relaxed">
            <li>• شرایط عمومی پیمان (نشریه ۴۳۱۱ / FIDIC)</li>
            <li>• شرایط خصوصی و موافقت‌نامه رسمی</li>
            <li>• بخشنامه‌های تعدیل آحاد بها و نرخ ارز</li>
            <li>• لاگ‌های روزانه کارگاه و صورت‌جلسات تاخیر</li>
          </ul>
        </div>

        {/* Pillar 2: Process */}
        <div className="p-3.5 rounded-xl bg-purple-500/[0.08] border border-purple-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-[10px] font-bold">
              مرحله ۲ · هوش ممیز
            </span>
            <span className="text-[10px] text-slate-400">Gems / Projects</span>
          </div>
          <h5 className="font-extrabold text-xs text-white">انطباق حقوقی و فنی</h5>
          <ul className="space-y-1.5 text-[11px] text-slate-300 leading-relaxed">
            <li>• انطباق با مواعد ماده ۳۰ (سقوط حق ادعا)</li>
            <li>• تشخیص تاخیرات مجاز در برابر غیرمجاز</li>
            <li>• تحلیل مسیر بحرانی پروژه (Critical Path)</li>
            <li>• اعمال شروط اکید Zero-Hallucination</li>
          </ul>
        </div>

        {/* Pillar 3: Outputs */}
        <div className="p-3.5 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
              مرحله ۳ · خروجی آرتیفکت
            </span>
            <span className="text-[10px] text-slate-400">Deliverables</span>
          </div>
          <h5 className="font-extrabold text-xs text-white">۳ سند عملیاتی قابل دفاع</h5>
          <ul className="space-y-1.5 text-[11px] text-slate-300 leading-relaxed">
            <li>• ۱. <b>ماتریس تخصیص ریسک:</b> تعهدات متقابل</li>
            <li>• ۲. <b>هشدار Time-Bar:</b> مواعد ارسال نامه</li>
            <li>• ۳. <b>لایحه دفاعیه رسمی:</b> با استناد به مواد پیمان</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 6. RCTO PROMPT ENGINEERING FRAMEWORK DIAGRAM (SESSION 2, MODULE 2-2)
// ============================================================================
export const RctoFrameworkDiagram: React.FC<{ lang?: Language }> = () => {
  const parts = [
    {
      letter: 'R',
      nameFa: 'Role (نقش)',
      descFa: 'تعیین زاویه دید تخصصی، پرسونای حرفه‌ای و سطح سخت‌گیری مدل',
      example: 'تو مدیر ارشد کنترل قراردادها و ادعاهای فنی پروژه هستی...',
      color: 'from-blue-600 to-indigo-600'
    },
    {
      letter: 'C',
      nameFa: 'Context (زمینه)',
      descFa: 'مشخصات پروژه، شرایط بالادستی، استانداردها و داده‌های مرجع',
      example: 'پروژه خط ۲ مترو، پیمان نشریه ۴۳۱۱ با شرایط ژئوتکنیکی خاص...',
      color: 'from-purple-600 to-pink-600'
    },
    {
      letter: 'T',
      nameFa: 'Task (ماموریت)',
      descFa: 'دستورات اجرایی گام‌به‌گام با افعال امری کاملاً شفاف و محدود',
      example: 'این ۵ تاخیر را بر اساس مسیر بحرانی تفکیک و ممیزی کن...',
      color: 'from-[#e0533c] to-amber-600'
    },
    {
      letter: 'O',
      nameFa: 'Output (خروجی)',
      descFa: 'قالب دقیق خروجی شامل تعداد ستون‌های جدول، تیترها و لحن',
      example: 'در قالب یک جدول ۵ ستونی شامل ستون درصد، ماده پیمان و نتیجه...',
      color: 'from-emerald-600 to-teal-600'
    }
  ];

  return (
    <div className="min-w-[680px] p-4 rounded-xl bg-gradient-to-r from-[#201729] via-[#16101c] to-[#201729] text-white border border-[#ecdcd8]/20 space-y-3">
      <div className="flex items-center justify-between text-xs pb-1.5 border-b border-white/10">
        <span className="text-[#e0533c] dark:text-[#fb7185] font-extrabold flex items-center gap-1.5 font-sans">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>فرمول طلایی چهارضلعی مهندسی پرامپت (R-C-T-O)</span>
        </span>
        <span className="text-[10px] font-mono text-slate-400" dir="ltr">Role · Context · Task · Output</span>
      </div>

      <div className="grid grid-cols-4 gap-3 text-xs">
        {parts.map((p) => (
          <div key={p.letter} className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-1.5 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-lg bg-gradient-to-br ${p.color} text-white font-mono font-black text-xs flex items-center justify-center shrink-0 shadow-xs`}>
                  {p.letter}
                </span>
                <b className="text-white text-xs leading-tight">{p.nameFa}</b>
              </div>
              <p className="text-[10px] text-slate-300 leading-relaxed">
                {p.descFa}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-black/30 border border-white/5 font-mono text-[9px] text-slate-400 leading-tight">
              {p.example}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

