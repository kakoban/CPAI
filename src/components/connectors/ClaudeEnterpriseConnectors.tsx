import React, { useState } from 'react';
import { Language } from '../../types/cpmai';
import {
  Mail,
  HardDrive,
  Calendar,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  AlertCircle,
  Terminal,
  Settings,
  Share2,
  Lock,
  Layers,
  Sparkles,
  Link2,
  CheckCircle2,
  Sliders,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ClaudeEnterpriseConnectorsProps {
  lang: Language;
  copyToClipboard: (text: string, id: string) => void;
  copiedId: string | null;
}

export const ClaudeEnterpriseConnectors: React.FC<ClaudeEnterpriseConnectorsProps> = ({
  lang,
  copyToClipboard,
  copiedId
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'google' | 'team'>('all');
  const [openAccordion, setOpenAccordion] = useState<string | null>('gmail');

  const toggleAccordion = (id: string) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  const notionMcpCommand = 'claude mcp add --transport http notion https://mcp.notion.com/mcp';

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#d9dad5] dark:border-[#2d3942] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#1a73e8]/15 via-[#2f7d5b]/15 to-[#d97706]/15 text-[#1a73e8] dark:text-[#60a5fa] border border-[#1a73e8]/20 shadow-xs">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                Claude & Claude Desktop
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Official MCP & Connectors
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-[#1c2830] dark:text-[#e8ebe9] mt-0.5">
              {lang === 'fa'
                ? 'کانکتورهای مهم گوگل و ابزارهای سازمانی (Gmail, Drive, Calendar, Slack & Notion MCP)'
                : 'Essential Google Workspace & Enterprise Connectors (Gmail, Drive, Calendar, Slack & Notion MCP)'}
            </h2>
            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
              {lang === 'fa'
                ? 'اتصال هوش مصنوعی به جریان داده‌های زنده ایمیل، اسناد، تقویم کاری و هاب‌های تیمی با رعایت کامل حریم خصوصی'
                : 'Connect Claude to live workspace streams across email, cloud drives, agendas, and team hubs with zero training on your data'}
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.08] text-xs font-semibold self-start sm:self-auto shrink-0">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeCategory === 'all'
                ? 'bg-white dark:bg-[#1a2228] text-[#1c2830] dark:text-[#e8ebe9] shadow-2xs font-bold'
                : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            {lang === 'fa' ? 'همه کانکتورها' : 'All'}
          </button>
          <button
            onClick={() => setActiveCategory('google')}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeCategory === 'google'
                ? 'bg-blue-600 text-white shadow-2xs font-bold'
                : 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30'
            }`}
          >
            {lang === 'fa' ? 'گوگل ورکس‌پیس (۳)' : 'Google (3)'}
          </button>
          <button
            onClick={() => setActiveCategory('team')}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeCategory === 'team'
                ? 'bg-purple-600 text-white shadow-2xs font-bold'
                : 'text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30'
            }`}
          >
            {lang === 'fa' ? 'Slack & Notion MCP' : 'Slack & Notion'}
          </button>
        </div>
      </div>

      {/* PART 1: GOOGLE WORKSPACE CONNECTORS (GMAIL, DRIVE, CALENDAR) */}
      {(activeCategory === 'all' || activeCategory === 'google') && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-blue-900 dark:text-blue-200 block text-xs sm:text-sm">
                  {lang === 'fa' ? 'دسترس‌پذیری کانکتورهای سه‌گانه گوگل:' : 'Google Workspace Connectors Availability:'}
                </span>
                <p className="text-blue-800 dark:text-blue-300 text-[11px] mt-0.5 leading-relaxed">
                  {lang === 'fa'
                    ? 'هر سه کانکتور Gmail، Google Drive و Google Calendar برای همه کاربران Claude و اپلیکیشن Claude Desktop در دسترس هستند. (اگر دکمه Connect را در تنظیمات ندیدید، پلن اکانت خود را بررسی فرمایید).'
                    : 'All three connectors (Gmail, Drive, Calendar) are available in Claude and Claude Desktop. Check your subscription if the Connect button is missing.'}
                </p>
              </div>
            </div>
            <a
              href="https://claude.ai/customize/connectors"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] shadow-xs shrink-0 self-start sm:self-auto cursor-pointer"
            >
              <span>{lang === 'fa' ? 'مدیریت در Claude.ai' : 'Manage Connectors'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Gmail */}
            <div className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#161e24] p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-red-500/40 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-sm text-[#1c2830] dark:text-[#e8ebe9]">۱. Gmail</h3>
                      <span className="text-[10px] text-gray-400 font-mono">Google Workspace</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/10 text-red-700 dark:text-red-300 border border-red-500/20">
                    Live Action
                  </span>
                </div>

                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  {lang === 'fa'
                    ? 'امکان جست‌وجو و خواندن ایمیل‌ها، ایجاد پیش‌نویس، ارسال ایمیل، پاسخ، فوروارد و مرتب‌سازی برچسب‌ها و رشته‌ها (Thread). به صورت پیش‌فرض برای ارسال ایمیل، تأیید انسانی الزامی است.'
                    : 'Search and read emails, draft, send, reply, forward, and organize labels/threads. Human confirmation is enforced by default prior to sending.'}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-black/[0.04] dark:border-white/[0.06] text-[11px] text-[#4b5563] dark:text-[#9ca3af]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>{lang === 'fa' ? 'قابلیت ارسال ایمیل مستقیم (از ۱۸ آگوست ۲۰۲۶)' : 'Direct Send capability (Aug 2026)'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>{lang === 'fa' ? 'نیازمند تأیید شما قبل از ارسال واقعی' : 'Human-in-the-loop approval safeguard'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
                <a
                  href="https://claude.com/docs/connectors/google/gmail"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>{lang === 'fa' ? 'مستندات رسمی Gmail' : 'Official Gmail Docs'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* 2. Google Drive */}
            <div className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#161e24] p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
                      <HardDrive className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-sm text-[#1c2830] dark:text-[#e8ebe9]">۲. Google Drive</h3>
                      <span className="text-[10px] text-gray-400 font-mono">Docs, Sheets & Slides</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                    File Extraction
                  </span>
                </div>

                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  {lang === 'fa'
                    ? 'برای ویرایش و خواندن زنده فایل‌های Docs، Sheets و Slides در کنار Drive. کلود متن فایل‌ها را استخراج می‌کند؛ Sheets به صورت خروجی CSV و Slides به صورت متن ساده خوانده می‌شود.'
                    : 'Access and edit Docs, Sheets, and Slides in Drive. Claude extracts raw text; Sheets is parsed as structured CSV and Slides as plain text.'}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-black/[0.04] dark:border-white/[0.06] text-[11px] text-[#4b5563] dark:text-[#9ca3af]">
                  <div className="flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{lang === 'fa' ? 'محدودیت: تصاویر داخل اسناد پردازش نمی‌شوند' : 'Limitation: Images in docs are bypassed'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{lang === 'fa' ? 'تحلیل سریع داده‌های جدولی بزرگ به شکل CSV' : 'High-speed tabular parsing via CSV'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
                <a
                  href="https://claude.com/docs/connectors/google/drive"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>{lang === 'fa' ? 'مستندات رسمی Drive' : 'Official Drive Docs'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* 3. Google Calendar */}
            <div className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#161e24] p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-blue-500/40 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-sm text-[#1c2830] dark:text-[#e8ebe9]">۳. Google Calendar</h3>
                      <span className="text-[10px] text-gray-400 font-mono">Agendas & Schedule</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20">
                    Smart Agenda
                  </span>
                </div>

                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  {lang === 'fa'
                    ? 'به Claude کمک می‌کند تعهدات تقویمی شما را بفهمد و جلسات و برنامه‌های کاری را بهینه مدیریت کند. اتصال از مسیر Settings > Connectors با کلیک روی Connect انجام می‌شود.'
                    : 'Enables Claude to comprehend your scheduled commitments and optimize meetings. Connect via Settings > Connectors > Connect.'}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-black/[0.04] dark:border-white/[0.06] text-[11px] text-[#4b5563] dark:text-[#9ca3af]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>{lang === 'fa' ? 'مسیر: Settings > Connectors > Google Calendar' : 'Path: Settings > Connectors'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>{lang === 'fa' ? 'پیشگیری از تداخل زمانی جلسات پروژه' : 'Automatic project clash detection'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
                <a
                  href="https://claude.com/docs/connectors/google/calendar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>{lang === 'fa' ? 'مستندات رسمی Calendar' : 'Official Calendar Docs'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Directory & Management Shortcuts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <a
              href="https://support.claude.com/en/articles/10166901-use-google-workspace-connectors"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] flex items-center justify-between text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] transition-all"
            >
              <span>{lang === 'fa' ? 'راهنمای جامع هر ۳ کانکتور گوگل' : 'Google Connectors Guide'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
            </a>
            <a
              href="https://claude.ai/directory"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] flex items-center justify-between text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] transition-all"
            >
              <span>{lang === 'fa' ? 'دایرکتوری کامل کانکتورها (Notion, Slack, ...)' : 'All Connectors Directory'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
            </a>
            <a
              href="https://claude.ai/customize/connectors"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] flex items-center justify-between text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] transition-all"
            >
              <span>{lang === 'fa' ? 'مدیریت و قطع اتصال (Disconnect)' : 'Manage & Disconnect'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
            </a>
          </div>

          {/* Privacy & Governance Notice */}
          <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 text-xs space-y-2">
            <span className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{lang === 'fa' ? 'تعهدات حریم خصوصی و امنیت داده‌های متصل:' : 'Privacy & Security Guarantees:'}</span>
            </span>
            <ul className="space-y-1 text-emerald-800 dark:text-emerald-300 text-[11px] list-disc list-inside leading-relaxed">
              <li>{lang === 'fa' ? 'Claude فقط به داده‌های همان حساب گوگلی که متصل کرده‌اید دسترسی دارد.' : 'Claude only reads data from the explicitly connected Google account.'}</li>
              <li>{lang === 'fa' ? 'طبق اعلام رسمی Anthropic، مدل‌ها هرگز روی داده‌های کانکتورهای Gmail، Drive و Calendar شما آموزش داده نمی‌شوند.' : 'Anthropic confirms models are never trained on your Gmail, Drive, or Calendar data.'}</li>
              <li>{lang === 'fa' ? 'در پلن‌های Team و Enterprise، مالک سازمان (Owner) باید ابتدا کانکتور را در سطح سازمان فعال نماید.' : 'In Team & Enterprise tiers, workspace owners must enable connectors organization-wide first.'}</li>
            </ul>
          </div>
        </div>
      )}

      {/* PART 2: SLACK & NOTION MCP CONNECTORS */}
      {(activeCategory === 'all' || activeCategory === 'team') && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-5 rounded-full bg-purple-600" />
              <h3 className="font-black text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                {lang === 'fa' ? 'کانکتورهای سازمانی Slack و Notion (Official Hosted MCP)' : 'Slack & Notion Hosted MCP Connectors'}
              </h3>
            </div>
            <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400 font-bold">
              Team Workspaces & MCP
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 1. Slack Connector Card */}
            <div className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#161e24] p-5 shadow-xs space-y-4 hover:border-purple-500/40 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-[#4a154b]/10 text-[#4a154b] dark:text-[#e01e5a] border border-[#4a154b]/20 flex items-center justify-center font-bold text-base shadow-xs">
                      #
                    </div>
                    <div>
                      <h4 className="font-black text-sm text-[#1c2830] dark:text-[#e8ebe9]">۱. کانکتور Slack</h4>
                      <span className="text-[10px] text-gray-400 font-mono">Channels & Direct Messages</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20">
                    Pro, Max, Team & Ent
                  </span>
                </div>

                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  {lang === 'fa'
                    ? 'جست‌وجو در کانال‌ها، پیام‌های مستقیم و فایل‌های ورک‌اسپیس Slack برای یافتن زمینه و خلاصه کردن مباحث. برای مثال: «خلاصه‌ی اتفاقات کانال #general امروز را بگو».'
                    : 'Search channels, DMs, and files across your Slack workspace for contextual recall and executive catch-ups.'}
                </p>

                <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] space-y-2 text-[11px] text-[#4b5563] dark:text-[#9ca3af]">
                  <span className="font-bold text-[#1c2830] dark:text-[#e8ebe9] block text-xs">
                    {lang === 'fa' ? 'سه روش استفاده از Claude در Slack:' : '3 Ways to Leverage Claude with Slack:'}
                  </span>
                  <ul className="space-y-1 list-disc list-inside leading-relaxed">
                    <li><strong className="text-[#1c2830] dark:text-[#e8ebe9]">Claude Tag:</strong> {lang === 'fa' ? 'عضو مشترک در کانال‌های اسلک' : 'Tag as teammate inside channels'}</li>
                    <li><strong className="text-[#1c2830] dark:text-[#e8ebe9]">Claude in Slack App:</strong> {lang === 'fa' ? 'دستیار شخصی در پیام خصوصی' : 'Personal 1-on-1 direct message bot'}</li>
                    <li><strong className="text-[#1c2830] dark:text-[#e8ebe9]">Slack Connector:</strong> {lang === 'fa' ? 'ورود داده‌های اسلک به چت کلود یا Cowork' : 'Bring Slack knowledge into Claude chat'}</li>
                  </ul>
                </div>

                <div className="space-y-1 text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                  <p>• {lang === 'fa' ? 'پلن: برای Team, Enterprise و همچنین مشترکین Pro و Max فعال است.' : 'Plan: Supported on Team, Enterprise, and Pro/Max.'}</p>
                  <p>• {lang === 'fa' ? 'محدودیت: به ازای هر حساب Claude تنها یک ورک‌اسپیس Slack متصل می‌شود.' : 'Limit: Supports 1 Slack workspace per Claude account.'}</p>
                  <p>• {lang === 'fa' ? 'فعال‌سازی: از مسیر Organization settings > Connectors یا Customize > Connectors.' : 'Path: Org settings > Connectors.'}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.06] flex flex-wrap items-center gap-3">
                <a
                  href="https://claude.com/docs/connectors/slack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>{lang === 'fa' ? 'مستندات Slack' : 'Docs'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://claude.com/claude-in-slack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>{lang === 'fa' ? 'معرفی اپلیکیشن' : 'App Page'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://claude.com/blog/claude-and-slack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>{lang === 'fa' ? 'بلاگ آنتروپیک' : 'Anthropic Blog'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* 2. Notion Hosted MCP Server Card */}
            <div className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#161e24] p-5 shadow-xs space-y-4 hover:border-black/40 dark:hover:border-white/40 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-black/10 dark:bg-white/10 text-[#1c2830] dark:text-[#e8ebe9] border border-black/20 dark:border-white/20 flex items-center justify-center font-bold text-base shadow-xs">
                      N
                    </div>
                    <div>
                      <h4 className="font-black text-sm text-[#1c2830] dark:text-[#e8ebe9]">۲. کانکتور رسمی Notion MCP</h4>
                      <span className="text-[10px] text-gray-400 font-mono">Model Context Protocol (Hosted)</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                    Official Hosted MCP
                  </span>
                </div>

                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  {lang === 'fa'
                    ? 'نوپشن دارای سرور MCP رسمی و میزبانی‌شده است که با احراز هویت امن OAuth، امکان جست‌وجو، خواندن، ایجاد و ویرایش مستندات فنی و PRD پروژه‌ها را مستقیماً به Claude می‌دهد.'
                    : 'Notion provides an official hosted MCP server with OAuth authentication to search, read, write, and update project specifications directly from Claude.'}
                </p>

                {/* Server URL Box */}
                <div className="p-3 rounded-xl bg-[#f8faf9] dark:bg-[#12171b] border border-black/[0.06] dark:border-white/[0.08] space-y-1.5">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                    {lang === 'fa' ? 'آدرس سرور رسمی MCP نوشن:' : 'Official Hosted MCP Server URL:'}
                  </span>
                  <div className="flex items-center justify-between gap-2 p-1.5 rounded-lg bg-white dark:bg-[#1a2228] border border-black/[0.05] dark:border-white/[0.08] font-mono text-xs text-[#1f5163] dark:text-[#6fb3c6]">
                    <span className="truncate select-all">https://mcp.notion.com/mcp</span>
                    <button
                      onClick={() => copyToClipboard('https://mcp.notion.com/mcp', 'notion_mcp_url')}
                      className="text-[10px] font-bold text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 flex items-center gap-1 shrink-0 p-1"
                    >
                      {copiedId === 'notion_mcp_url' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* Claude Code CLI Command */}
                <div className="p-3 rounded-xl bg-[#f8faf9] dark:bg-[#12171b] border border-black/[0.06] dark:border-white/[0.08] space-y-1.5">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block flex items-center gap-1">
                    <Terminal className="w-3 h-3" />
                    <span>{lang === 'fa' ? 'دستور نصب تک‌خطی در Claude Code (CLI):' : 'One-line command for Claude Code:'}</span>
                  </span>
                  <div className="flex items-center justify-between gap-2 p-1.5 rounded-lg bg-[#0f1418] text-[#99e2b4] font-mono text-[11px]">
                    <span className="truncate select-all" dir="ltr">{notionMcpCommand}</span>
                    <button
                      onClick={() => copyToClipboard(notionMcpCommand, 'notion_cli_cmd')}
                      className="text-[10px] font-bold text-gray-400 hover:text-white flex items-center gap-1 shrink-0 p-1"
                    >
                      {copiedId === 'notion_cli_cmd' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1 text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                  <p>• {lang === 'fa' ? 'در وب/دسکتاپ: Settings > Connectors > Add custom connector و آدرس بالا را درج کنید.' : 'In Web/Desktop: Settings > Connectors > Add custom connector.'}</p>
                  <p>• {lang === 'fa' ? 'نکته کلیدی: بعد از افزودن کانکتور در نسخه دسکتاپ، برنامه را کامل ببندید و باز کنید.' : 'Tip: Fully restart Claude Desktop after adding for registration to take effect.'}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.06] flex flex-wrap items-center gap-3">
                <a
                  href="https://developers.notion.com/docs/mcp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] hover:underline inline-flex items-center gap-1"
                >
                  <span>{lang === 'fa' ? 'مستندات Notion MCP' : 'Docs'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://developers.notion.com/guides/mcp/overview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] hover:underline inline-flex items-center gap-1"
                >
                  <span>{lang === 'fa' ? 'راهنمای پروتکل MCP' : 'MCP Overview'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PART 3: PRACTICAL CONTEXT MANAGEMENT ADVICE */}
      <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-xs space-y-2">
        <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <h4 className="font-bold text-xs sm:text-sm">
            {lang === 'fa' ? 'توصیه کلیدی و مهندسی مدیریت کانتکست (Context Consumption):' : 'Critical Context Consumption Best Practice:'}
          </h4>
        </div>
        <p className="text-amber-800 dark:text-amber-300 text-[11px] leading-relaxed">
          {lang === 'fa'
            ? 'همه‌ی کانکتورها را همیشه روشن نگذارید! هر کانکتور فعال، پیش از آن‌که پیامی تایپ کنید، بخشی از پنجره زمینه (Context Window) را برای تعاریف توابع و Schema اشغال می‌کند. فقط کانکتورهایی را که برای وظیفه فعلی نیاز دارید در همان گفت‌وگو فعال کنید تا از حداکثر ظرفیت حافظه مدل برای تحلیل‌های سنگین مهندسی بهره‌مند شوید.'
            : 'Do not keep all connectors enabled simultaneously. Each active connector consumes a portion of the context window with function schemas before you even type. Enable only what is strictly required for the active session to preserve maximum reasoning capacity.'}
        </p>
      </div>
    </section>
  );
};
