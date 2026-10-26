import React, { useState } from 'react';
import { Language } from '../../types/cpmai';
import {
  Brain,
  FolderTree,
  Network,
  Copy,
  Check,
  ExternalLink,
  Terminal,
  Settings,
  Sparkles,
  Link2,
  CheckCircle2,
  AlertTriangle,
  Code2,
  FileText,
  Workflow,
  Cpu,
  RefreshCw,
  Sliders,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ObsidianBrainSkillsWorkshopProps {
  lang: Language;
  copyToClipboard: (text: string, id: string) => void;
  copiedId: string | null;
  onLoadToSandbox?: (promptText: string) => void;
}

export const ObsidianBrainSkillsWorkshop: React.FC<ObsidianBrainSkillsWorkshopProps> = ({
  lang,
  copyToClipboard,
  copiedId,
  onLoadToSandbox
}) => {
  const [subTab, setSubTab] = useState<'obsidian_vault' | 'agent_skills'>('obsidian_vault');
  const [openAccordion, setOpenAccordion] = useState<string | null>('mcp_config');

  const toggleAccordion = (id: string) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  const claudeMcpConfigCode = `{
  "mcpServers": {
    "obsidian-vault": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "D:/MIND"
      ]
    }
  }
}`;

  const claudeMdTemplate = `# راهنمای هوش مصنوعی برای والت من (AI Vault Constitution)

## ۱. درباره من
- نام: [نام شما]
- حوزه کاری: [تخصص و شغل شما]
- سبک مورد علاقه: پاسخ‌های کوتاه، ساختاریافته، بدون مقدمه‌چینی اضافه و به زبان فارسی روان.

## ۲. ساختار پوشه‌های این Vault
- \`00_Inbox\`: ایده‌های خام من اینجاست. وقتی گفتم اینباکس را مرتب کن، فایل‌های اینجا را بخوان و به پوشه‌های اصلی ببر.
- \`01_Projects\`: پروژه‌های در حال اجرای من (هر پروژه یک پوشه مستقل).
- \`02_Areas\`: حوزه‌های دائمی زندگی و کار (مالی، سلامت، آموزش، تولید محتوا).
- \`03_Resources\`: بانک اطلاعات، مقالات، پرامپت‌ها و خلاصه‌ها.
- \`04_Archive\`: پروژه‌های تکمیل‌شده.

## ۳. قوانین ویرایش فایل‌ها (الزامی)
- هرگز فایلی را بدون اجازه مستقیم من پاک (Delete) نکن.
- هنگام ساخت یادداشت جدید، حتماً در بالای آن بخش Properties (شامل تاریخ و تگ‌ها) را اضافه کن.
- بین یادداشت‌های مرتبط حتماً با فرمت \`[[نام یادداشت]]\` لینک داخلی برقرار کن.`;

  const skillMdTemplate = `---
name: obsidian-daily-manager
description: مدیریت یادداشت‌های روزانه، پروژه‌ها و پایگاه دانش در Obsidian. هر زمان کاربر درباره یادداشت‌ها، ایده‌ها، تسک‌ها یا آبسیدین صحبت کرد از این اسکیل استفاده کن.
---

# دستورالعمل کار با Obsidian Vault

## ۱. مسیر اصلی والت (Vault Path)
مسیر دائمی والت کاربر در سیستم به شرح زیر است:
\`VAULT_PATH = "D:\\\\MIND"\` (یا "D:/MIND")

همیشه برای خواندن، جستجو و ساخت فایل‌ها مستقیماً به این مسیر مراجعه کن.

## ۲. ساختار پوشه‌ها
- \`D:\\\\MIND\\\\00_Inbox\`: محل قرارگیری یادداشت‌های سریع و مرتب‌نشده.
- \`D:\\\\MIND\\\\01_Projects\`: پروژه‌های فعال کاربر.
- \`D:\\\\MIND\\\\03_Resources\`: مقالات، آموزش‌ها و منابع ذخیره شده.

## ۳. قوانین نوشتن و ویرایش (مهم)
1. **فرمت فایل‌ها:** تمام فایل‌ها باید با پسوند \`.md\` و کدگذاری \`UTF-8\` ذخیره شوند.
2. **متادیتا (Frontmatter):** در ابتدای هر یادداشت جدید، حتماً بلوک YAML زیر را قرار بده:
\`\`\`yaml
---
created: YYYY-MM-DD
tags: [تگ۱, تگ۲]
status: active
---
\`\`\`
3. **لینک‌دهی داخلی:** در صورت اشاره به سایر یادداشت‌های موجود در والت، نام آن‌ها را داخل دو کروشه قرار بده: \`[[نام یادداشت]]\`.
4. **ایمنی:** هرگز فایلی را بدون تایید صریح کاربر حذف نکن. برای تغییر فایل‌های طولانی، به جای بازنویسی کل فایل، فقط بخش مورد نظر را ویرایش (Patch) کن.`;

  const dailyPrompt = `فایل CLAUDE.md و پوشه 01_Projects والت من در Obsidian رو بررسی کن و بگو امروز بر اساس اولویت‌ها روی کدام ۳ تسک کلیدی باید تمرکز کنم؟ پاسخ رو در یک جدول جمع‌وجور بنویس.`;
  const ideaCapturePrompt = `این ایده رو به عنوان یک یادداشت جدید در پوشه 03_Resources والت Obsidian من با نام مناسب ذخیره کن. در ابتدای فایل فرانت‌متر شامل تگ‌های مرتبط و تاریخ امروز رو بذار و به یادداشت‌های مرتبط قبلی با فرمت [[نام یادداشت]] لینک بده:\n\n[متن ایده یا نکته جدید خود را اینجا قرار دهید]`;
  const inboxCleanPrompt = `تمام یادداشت‌های داخل پوشه 00_Inbox والت Obsidian من رو بخون. متون ناقص یا غلط‌های املایی رو اصلاح کن و بر اساس موضوع، هر کدوم رو به پوشه مناسب خودش (01_Projects یا 03_Resources) منتقل کن و نتیجه رو به من گزارش بده.`;

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#d9dad5] dark:border-[#2d3942] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#7c3aed]/15 via-[#2563eb]/15 to-[#059669]/15 text-[#7c3aed] dark:text-[#a78bfa] border border-[#7c3aed]/25 shadow-xs">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20">
                Second Brain & Agent Skills
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                Local Markdown · MCP · Hermes / Claude Code
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-[#1c2830] dark:text-[#e8ebe9] mt-0.5">
              {lang === 'fa'
                ? 'کارگاه تخصصی Obsidian و Skills در هوش مصنوعی: ساخت مغز دوم دائمی و توسعه مهارت‌ها'
                : 'Obsidian Second Brain & AI Agent Skills Masterclass: Persistent Memory & Autonomous Workflows'}
            </h2>
            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
              {lang === 'fa'
                ? 'راه‌اندازی پایگاه دانش محلی بدون تحریم، اتصال مستقیم Claude Desktop از طریق پروتکل MCP و یادگیری ساخت Skills برای ایجنت‌ها'
                : 'Build private local knowledge vaults, connect Claude Desktop via MCP, and program bespoke Skills for AI agents.'}
            </p>
          </div>
        </div>

        {/* Sub-Tabs Selector */}
        <div className="flex items-center p-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] self-start sm:self-center shrink-0">
          <button
            onClick={() => setSubTab('obsidian_vault')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              subTab === 'obsidian_vault'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
            }`}
          >
            <FolderTree className="w-3.5 h-3.5" />
            <span>{lang === 'fa' ? '۱. راه‌اندازی مغز دوم با Obsidian' : '1. Obsidian Second Brain'}</span>
          </button>
          <button
            onClick={() => setSubTab('agent_skills')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              subTab === 'agent_skills'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
            }`}
          >
            <Workflow className="w-3.5 h-3.5" />
            <span>{lang === 'fa' ? '۲. مسترکلاس Skills در ایجنت‌ها' : '2. Agent Skills Masterclass'}</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: OBSIDIAN SECOND BRAIN */}
      {subTab === 'obsidian_vault' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Why Obsidian & Comparison Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#161e24] border border-black/[0.08] dark:border-white/[0.1] shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                <Brain className="w-5 h-5" />
                <h3 className="font-black text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa' ? 'چرا Obsidian بهترین حافظه برای AI است؟' : 'Why Obsidian for AI?'}
                </h3>
              </div>
              <ul className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] space-y-2 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    {lang === 'fa'
                      ? 'ذخیره ۱۰۰٪ محلی (Local) روی هارد با فرمت متنی استاندارد Markdown (.md).'
                      : '100% Local on your disk in standard Markdown (.md) text files.'}
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    {lang === 'fa'
                      ? 'هوش مصنوعی بدون نیاز به وب‌هوک پیچیده می‌تواند صدها فایل را در کسری از ثانیه بخواند و ویرایش کند.'
                      : 'AI can read, parse, and patch hundreds of markdown notes in milliseconds.'}
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    {lang === 'fa'
                      ? 'کاملاً رایگان، بدون فیلتر و تحریم، و بدون نگرانی از حذف ناگهانی اکانت ابری.'
                      : 'Zero subscription lock-in, zero cloud outage risks, private by design.'}
                  </span>
                </li>
              </ul>
            </div>

            {/* Comparison Table with Notion & NotebookLM */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-white dark:bg-[#161e24] border border-black/[0.08] dark:border-white/[0.1] shadow-2xs space-y-3 overflow-hidden">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-sm text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-blue-500" />
                  <span>{lang === 'fa' ? 'مقایسه عینی: Obsidian در برابر Notion و Google NotebookLM' : 'Obsidian vs Notion vs NotebookLM'}</span>
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600">
                  Feature Matrix
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-black/[0.03] dark:bg-white/[0.04] text-[#5d6b73] font-bold">
                    <tr>
                      <th className="p-2.5 rounded-r-lg">ویژگی</th>
                      <th className="p-2.5 text-purple-700 dark:text-purple-300">Obsidian</th>
                      <th className="p-2.5">Notion</th>
                      <th className="p-2.5 rounded-l-lg">Google NotebookLM</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.05] dark:divide-white/[0.06] text-[#2c3840] dark:text-[#cfd6db]">
                    <tr>
                      <td className="p-2.5 font-bold">محل ذخیره داده</td>
                      <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">روی هارد کامپیوتر (Local)</td>
                      <td className="p-2.5">سرورهای ابری نوشن</td>
                      <td className="p-2.5">سرورهای ابری گوگل</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">فرمت فایل‌ها</td>
                      <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">فایل‌های استاندارد (.md)</td>
                      <td className="p-2.5">دیتابیس بسته و اختصاصی</td>
                      <td className="p-2.5">منابع آپلودشده ثابت</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">تعامل مستقیم با AI</td>
                      <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">خواندن، نوشتن، پوشه‌سازی و پچ</td>
                      <td className="p-2.5">نیازمند اتصال پیچیده API</td>
                      <td className="p-2.5">فقط پرسش و پاسخ (خواندنی)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">سرعت و دسترسی آفلاین</td>
                      <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">آنی و ۱۰۰٪ آفلاین</td>
                      <td className="p-2.5">وابسته به اینترنت و تحریم</td>
                      <td className="p-2.5">وابسته به اینترنت و وی‌پی‌ان</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Folder Architecture & Note Principles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Architecture PARA/MIND */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#161e24] border border-black/[0.08] dark:border-white/[0.1] shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-[#2f7d5b] dark:text-[#52b788]">
                <FolderTree className="w-5 h-5" />
                <h3 className="font-black text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa' ? 'معماری پوشه‌ها برای درک بهتر هوش مصنوعی' : 'Vault Folder Architecture'}
                </h3>
              </div>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa'
                  ? 'ساخت پوشه‌های تودرتوی زیاد باعث گیج‌شدن هوش مصنوعی می‌شود. از ساختار مینیمال زیر در والت خود استفاده کنید:'
                  : 'Avoid deeply nested directories. Keep your Vault flat and predictable with standard categories:'}
              </p>
              <div className="p-3 rounded-xl bg-[#f4f4f1] dark:bg-[#12181d] text-xs font-mono text-[#1c2830] dark:text-[#e8ebe9] space-y-1.5" dir="ltr">
                <div>📁 <span className="font-bold text-purple-600">MIND/</span> (پوشه اصلی Vault)</div>
                <div className="ps-4">├── 📂 <span className="text-blue-600 font-bold">00_Inbox/</span> # ایده‌های خام، یادداشت سریع و مرتب‌نشده</div>
                <div className="ps-4">├── 📂 <span className="text-emerald-600 font-bold">01_Projects/</span> # پروژه‌های فعال با ددلاین مشخص</div>
                <div className="ps-4">├── 📂 <span className="text-amber-600 font-bold">02_Areas/</span> # امور دائمی زندگی (مالی، سلامت، آموزش)</div>
                <div className="ps-4">├── 📂 <span className="text-cyan-600 font-bold">03_Resources/</span> # بانک مقالات، پرامپت‌ها و خلاصه کتاب‌ها</div>
                <div className="ps-4">├── 📂 <span className="text-gray-500 font-bold">04_Archive/</span> # پروژه‌های بسته‌شده و آرشیو</div>
                <div className="ps-4">└── 📄 <span className="text-purple-600 font-bold">CLAUDE.md</span> # قانون اساسی والت برای هوش مصنوعی</div>
              </div>
            </div>

            {/* Note Principles: Wikilinks & Frontmatter */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#161e24] border border-black/[0.08] dark:border-white/[0.1] shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                <Network className="w-5 h-5" />
                <h3 className="font-black text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa' ? '۳ اصل طلایی یادداشت‌نویسی استاندارد' : 'Core Note-Taking Principles'}
                </h3>
              </div>
              <div className="space-y-2.5 text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                <div className="p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.06]">
                  <b className="text-[#1c2830] dark:text-[#e8ebe9] block mb-1">۱. لینک‌دهی با ویکی‌لینک [[ ]] (WikiLinks):</b>
                  هر زمان به پروژه یا موضوعی اشاره کردید نام آن را در دو کروشه بگذارید: <code className="text-purple-600 font-mono">[[پروژه سفر نوروز]]</code>. هوش مصنوعی متوجه پیوستگی گراف اطلاعاتی می‌شود.
                </div>
                <div className="p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.06]">
                  <b className="text-[#1c2830] dark:text-[#e8ebe9] block mb-1">۲. تگ‌ها و خواص در Frontmatter:</b>
                  ابتدای یادداشت‌ها ۳ خط تیره بگذارید و تگ و تاریخ را ثبت کنید:
                  <code className="block mt-1 p-1 rounded bg-[#f4f4f1] dark:bg-[#12181d] font-mono text-[11px]" dir="ltr">
                    ---<br />
                    tags: [بودجه, سفر, خرید]<br />
                    status: active<br />
                    ---
                  </code>
                </div>
                <div className="p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.06]">
                  <b className="text-[#1c2830] dark:text-[#e8ebe9] block mb-1">۳. تیتربندی استاندارد با #:</b>
                  تنها یک بار در بالای صفحه از <code className="text-blue-600 font-mono"># عنوان اصلی</code> استفاده کنید و بخش‌ها را با <code className="text-blue-600 font-mono">##</code> و <code className="text-blue-600 font-mono">###</code> دسته‌بندی کنید.
                </div>
              </div>
            </div>
          </div>

          {/* CLAUDE.md Constitution & MCP Connection Accordion */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/[0.04] via-blue-500/[0.04] to-emerald-500/[0.04] border border-purple-500/20 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="font-black text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa' ? 'سند هویت والت (CLAUDE.md) و اتصال مستقیم Claude Desktop با پروتکل MCP' : 'CLAUDE.md Constitution & MCP Setup'}
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300">
                1-Click Copy
              </span>
            </div>

            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
              {lang === 'fa'
                ? 'فایل CLAUDE.md در ریشه والت، اولین سندی است که هوش مصنوعی می‌خواند تا شخصیت، لحن و قوانین ویرایش فایل‌های شما را بشناسد.'
                : 'The CLAUDE.md file in the root of your Vault guides the AI on folder policies, your identity, and editing constraints.'}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Box 1: CLAUDE.md Template */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                  <span>قالب پیشنهادی فایل CLAUDE.md</span>
                  <button
                    onClick={() => copyToClipboard(claudeMdTemplate, 'claude_md_tpl')}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 text-[11px] text-purple-700 dark:text-purple-300 font-bold transition-all cursor-pointer"
                  >
                    {copiedId === 'claude_md_tpl' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === 'claude_md_tpl' ? 'کپی شد!' : 'کپی تمپلیت'}</span>
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-[#1e1e1e] text-[#d4d4d4] font-mono text-[11px] leading-relaxed overflow-x-auto max-h-56 no-scrollbar" dir="ltr">
                  <code>{claudeMdTemplate}</code>
                </pre>
              </div>

              {/* Box 2: Claude Desktop Config MCP */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                  <span>کد کانفیگ MCP در claude_desktop_config.json</span>
                  <button
                    onClick={() => copyToClipboard(claudeMcpConfigCode, 'mcp_cfg_code')}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 text-[11px] text-blue-700 dark:text-blue-300 font-bold transition-all cursor-pointer"
                  >
                    {copiedId === 'mcp_cfg_code' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === 'mcp_cfg_code' ? 'کپی شد!' : 'کپی کانفیگ MCP'}</span>
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-[#1e1e1e] text-[#d4d4d4] font-mono text-[11px] leading-relaxed overflow-x-auto max-h-56 no-scrollbar" dir="ltr">
                  <code>{claudeMcpConfigCode}</code>
                </pre>
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-1.5 leading-relaxed">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <b>نکته طلایی ویندوز:</b> در فایل کانفیگ کلاد، به جای بک‌اسلش (<code className="font-mono">\</code>) حتماً از اسلش معمولی (<code className="font-mono">D:/MIND</code>) یا دو بک‌اسلش (<code className="font-mono">D:\\\\MIND</code>) استفاده کنید.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Prompts Suite for Obsidian */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#161e24] border border-black/[0.08] dark:border-white/[0.1] shadow-2xs space-y-4">
            <h3 className="font-black text-sm text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span>{lang === 'fa' ? '۳ پرامپت آماده برای تعامل روزمره با مغز دوم (Obsidian)' : '3 Everyday Actionable Prompts for Obsidian'}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {/* Prompt 1: Start Day */}
              <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600">
                    شروع روز کاری
                  </span>
                  <h4 className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                    استخراج اولویت‌های روز از پروژه‌ها
                  </h4>
                  <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed line-clamp-3">
                    {dailyPrompt}
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-black/[0.05] dark:border-white/[0.06]">
                  <button
                    onClick={() => copyToClipboard(dailyPrompt, 'p_daily')}
                    className="flex-1 py-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 text-[11px] font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center justify-center gap-1 cursor-pointer"
                  >
                    {copiedId === 'p_daily' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>کپی پرامپت</span>
                  </button>
                  {onLoadToSandbox && (
                    <button
                      onClick={() => onLoadToSandbox(dailyPrompt)}
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/25 text-[11px] font-bold transition-all cursor-pointer"
                      title="ارسال به سندباکس تمرین"
                    >
                      تمرین
                    </button>
                  )}
                </div>
              </div>

              {/* Prompt 2: Capture & Link */}
              <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600">
                    ثبت ایده و اتصال به گراف
                  </span>
                  <h4 className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                    ذخیره ساختاریافته و لینک‌دهی خودکار
                  </h4>
                  <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed line-clamp-3">
                    {ideaCapturePrompt}
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-black/[0.05] dark:border-white/[0.06]">
                  <button
                    onClick={() => copyToClipboard(ideaCapturePrompt, 'p_idea')}
                    className="flex-1 py-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 text-[11px] font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center justify-center gap-1 cursor-pointer"
                  >
                    {copiedId === 'p_idea' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>کپی پرامپت</span>
                  </button>
                  {onLoadToSandbox && (
                    <button
                      onClick={() => onLoadToSandbox(ideaCapturePrompt)}
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/25 text-[11px] font-bold transition-all cursor-pointer"
                      title="ارسال به سندباکس تمرین"
                    >
                      تمرین
                    </button>
                  )}
                </div>
              </div>

              {/* Prompt 3: Weekly Inbox Zero */}
              <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600">
                    مرتب‌سازی هفتگی (Inbox Zero)
                  </span>
                  <h4 className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                    پالایش و دسته‌بندی فایل‌های 00_Inbox
                  </h4>
                  <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed line-clamp-3">
                    {inboxCleanPrompt}
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-black/[0.05] dark:border-white/[0.06]">
                  <button
                    onClick={() => copyToClipboard(inboxCleanPrompt, 'p_inbox')}
                    className="flex-1 py-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 text-[11px] font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center justify-center gap-1 cursor-pointer"
                  >
                    {copiedId === 'p_inbox' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>کپی پرامپت</span>
                  </button>
                  {onLoadToSandbox && (
                    <button
                      onClick={() => onLoadToSandbox(inboxCleanPrompt)}
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/25 text-[11px] font-bold transition-all cursor-pointer"
                      title="ارسال به سندباکس تمرین"
                    >
                      تمرین
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: AGENT SKILLS MASTERCLASS */}
      {subTab === 'agent_skills' && (
        <div className="space-y-6 animate-fadeIn">
          {/* What is a Skill? Concept Overview */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#161e24] border border-black/[0.08] dark:border-white/[0.1] shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
              <Workflow className="w-5 h-5" />
              <h3 className="font-black text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                {lang === 'fa' ? 'اسکیل (Skill) در ایجنت‌های هوش مصنوعی دقیقاً چیست؟' : 'What is an Agent Skill?'}
              </h3>
            </div>
            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
              {lang === 'fa'
                ? 'مدل هوش مصنوعی خام، دانش عمومی دارد اما از رویه‌های کاری شما و ابزارهای خاص سیستم بی‌خبر است. یک اسکیل (Skill)، پکیج آموزشی استاندارد شامل فایل SKILL.md است که مانند دفترچه شرح وظایف (SOP) به ایجنت داده می‌شود تا کارهای تخصصی را بدون آزمون‌وخطا و با تسلط کامل اجرا کند.'
                : 'An AI Agent Skill is a modular SOP package containing a SKILL.md guide that equips agents with procedural domain expertise, deterministic tool use, and strict execution invariants.'}
            </p>

            {/* Comparison: Direct Folder vs Skill */}
            <div className="pt-2 overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-black/[0.03] dark:bg-white/[0.04] text-[#5d6b73] font-bold">
                  <tr>
                    <th className="p-2.5 rounded-r-lg">معیار</th>
                    <th className="p-2.5">روش ۱: اتصال مستقیم پوشه (File System)</th>
                    <th className="p-2.5 rounded-l-lg text-purple-700 dark:text-purple-300 font-bold">روش ۲: استفاده از Skill اختصاصی</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.05] dark:divide-white/[0.06] text-[#2c3840] dark:text-[#cfd6db]">
                  <tr>
                    <td className="p-2.5 font-bold">نحوه اتصال</td>
                    <td className="p-2.5">معرفی آدرس در هر بار گفتگو یا پروتکل MCP</td>
                    <td className="p-2.5 text-purple-600 dark:text-purple-400 font-bold">ثبت دائمی مسیر در فایل متغیرهای اسکیل</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">حافظه دائمی مسیر</td>
                    <td className="p-2.5">ممکن است در چت جدید فراموش شود</td>
                    <td className="p-2.5 text-purple-600 dark:text-purple-400 font-bold">همیشگی؛ ایجنت همیشه موقعیت والت را می‌داند</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">تسلط بر قوانین</td>
                    <td className="p-2.5">معمولی (فایل‌ها را متن عادی می‌بیند)</td>
                    <td className="p-2.5 text-purple-600 dark:text-purple-400 font-bold">حرفه‌ای (قوانین ویکی‌لینک، فرانت‌متر و گراف رعایت می‌شود)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">بهترین کاربرد</td>
                    <td className="p-2.5">کارهای دم‌دستی داخل IDE و سرعت بالا</td>
                    <td className="p-2.5 text-purple-600 dark:text-purple-400 font-bold">دستورات راه دور (ربات تلگرام Hermes، اتوماسیون پس‌زمینه)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Anatomy of SKILL.md & Windows Backslash Fix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Anatomy */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#161e24] border border-black/[0.08] dark:border-white/[0.1] shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <Code2 className="w-5 h-5" />
                <h3 className="font-black text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                  کالبدشکافی ساختار فایل SKILL.md
                </h3>
              </div>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                هر مهارت در پوشه مهارت‌های ایجنت، از ۳ بخش اساسی تشکیل می‌شود:
              </p>
              <div className="space-y-2 text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                <div className="p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.06]">
                  <b className="text-[#1c2830] dark:text-[#e8ebe9] block">۱. شناسنامه (YAML Frontmatter):</b>
                  نام (<code className="font-mono">name</code>) و شرح ماموریت (<code className="font-mono">description</code>) که ایجنت با خواندن آن می‌فهمد چه زمانی اسکیل را فعال کند.
                </div>
                <div className="p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.06]">
                  <b className="text-[#1c2830] dark:text-[#e8ebe9] block">۲. پیش‌نیازها و متغیرها (Variables):</b>
                  تعریف آدرس‌های دیسک نظیر <code className="font-mono">VAULT_PATH</code> یا توکن‌های دسترسی مورد نیاز.
                </div>
                <div className="p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.06]">
                  <b className="text-[#1c2830] dark:text-[#e8ebe9] block">۳. دستورالعمل‌های اجرایی (Instructions):</b>
                  گام‌های بدون ابهام برای خواندن، اعتبارسنجی داده‌ها، ساخت و بروزرسانی یادداشت‌ها.
                </div>
              </div>
            </div>

            {/* Windows Backslash Gold Fix */}
            <div className="p-5 rounded-2xl bg-amber-500/[0.04] border border-amber-500/25 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-black text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                  رفع خطای معروف بک‌اسلش (\) در ویندوز
                </h3>
              </div>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                در ویندوز آدرس‌ها با علامت <code className="font-mono">\</code> کپی می‌شوند (مثلاً <code className="font-mono">E:\Obsidian\Brain</code>). اما در برنامه‌نویسی و پایتون، علامت بک‌اسلش کاراکتر فرار (Escape Character) است و خطای <code className="text-rose-600 font-mono">File Not Found</code> ایجاد می‌کند!
              </p>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                  <b className="block mb-1">راه‌حل اول (دو تا بک‌اسلش):</b>
                  <code className="font-mono text-[11px]" dir="ltr">VAULT_PATH = "E:\\\\Obsidian\\\\Brain"</code>
                </div>
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-800 dark:text-blue-300">
                  <b className="block mb-1">راه‌حل دوم (اسلش معمولی رو به جلو):</b>
                  <code className="font-mono text-[11px]" dir="ltr">VAULT_PATH = "E:/Obsidian/Brain"</code>
                </div>
              </div>
            </div>
          </div>

          {/* Internal Learning Loop & Ready SKILL.md Template */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#161e24] border border-black/[0.08] dark:border-white/[0.1] shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-black text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa' ? 'حلقه یادگیری داخلی (Internal Learning Loop): ساخت خودکار اسکیل توسط خود ایجنت' : 'Self-Learning Agent Loop'}
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">
                Next-Gen Agents
              </span>
            </div>

            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
              ایجنت‌های نوین (مثل Hermes یا Claude Code) نه تنها اسکیل‌ها را مصرف می‌کنند، بلکه در جریان مکالمه می‌توانند اسکیل جدید خلق کنند! وقتی یک کار چندمرحله‌ای را با موفقیت تست کردید، کافی است بگویید:
              <span className="block p-2 mt-1 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] font-bold text-purple-700 dark:text-purple-300">
                «این روندی که با هم رفتیم رو به عنوان یک Skill جدید به اسم youtube-to-obsidian ذخیره کن تا از این به بعد همیشه همین‌طوری انجامش بدی.»
              </span>
            </p>

            <div className="space-y-2 pt-2 border-t border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-center justify-between text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                <span>قالب آماده برای فایل SKILL.md سفارشی شما:</span>
                <button
                  onClick={() => copyToClipboard(skillMdTemplate, 'skill_md_tpl')}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                >
                  {copiedId === 'skill_md_tpl' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === 'skill_md_tpl' ? 'کپی شد!' : 'کپی فایل SKILL.md'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-[#1e1e1e] text-[#d4d4d4] font-mono text-[11px] leading-relaxed overflow-x-auto max-h-72 no-scrollbar" dir="ltr">
                <code>{skillMdTemplate}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
