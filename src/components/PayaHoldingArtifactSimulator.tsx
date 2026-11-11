import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  AlertTriangle,
  CheckCircle2,
  Landmark,
  Building2,
  Factory,
  Send,
  RotateCcw,
  Bot,
  User,
  Code,
  Database,
  Layers,
  Scale,
  Zap
} from 'lucide-react';

interface PayaHoldingArtifactSimulatorProps {
  lang?: 'fa' | 'en';
}

export const PAYA_MOCK_PORTFOLIO_DATA = {
  holding_id: 'PAYA-SAMAN-PARS-HOLDING',
  holding_name: 'هلدینگ پایا سامان پارس (تأسیس ۱۳۸۶ · بنیاد مستضعفان)',
  simulated_notice:
    'مقادیر پیشرفت، SPI و ریسک برای تمرین کلاسی شبیه‌سازی‌شده‌اند؛ فیلدهای کارفرما/مبلغ/تاریخ در پورتال عمومی خالی هستند.',
  holding_stats: {
    cataloged_projects: 63,
    domains_total: 8,
    subsidiaries_active: 14,
    workforce: '۵,۰۰۰+ نیرو و ناوگان ماشین‌آلات سنگین',
    contract_models: ['EPC', 'EPC+F', 'PC', 'BOT', 'BLT', 'Consortium']
  },
  featured_projects: [
    {
      code: 'PSP-INFRA-01',
      wing: 'civil_contracting',
      wing_label: 'بال پیمانکاری زیرساختی',
      title: 'آزادراه تهران–شمال و تونل قلاجه–ایلام',
      subsidiary: 'جنرال مکانیک / دی / رامان',
      sector: 'راه، پل و تونل (۲۸ پروژه)',
      contract_model: 'EPC / EPC+F',
      status: 'MONITOR',
      spi_sim: 0.92,
      progress_sim: '۷۱.۵٪ (شبیه‌سازی)',
      portal_gap: 'فیلد مبلغ و کارفرما در پورتال خالی است',
      note: 'نیاز به تجمیع گزارش ناوگان سنگین و پایش ریسک ژئوتکنیک کوهستانی'
    },
    {
      code: 'PSP-UAE-02',
      wing: 'civil_contracting',
      wing_label: 'بال پیمانکاری زیرساختی',
      title: 'محورهای برون‌مرزی امارات (SKF2 شیص–خورفکان، R1000C)',
      subsidiary: 'رامان / جنرال مکانیک',
      sector: 'صادرات خدمات فنی-مهندسی (امارات)',
      contract_model: 'EPC+F',
      status: 'NORMAL',
      spi_sim: 0.98,
      progress_sim: '۹۰.۰٪ (شبیه‌سازی)',
      portal_gap: 'نیاز به رصد ارزی و مستندات تحویل',
      note: 'عملکرد پایدار در مسیرهای SKF2، وادی‌الحلو و جبل‌الکتاب'
    },
    {
      code: 'PSP-RAIL-03',
      wing: 'civil_contracting',
      wing_label: 'بال پیمانکاری زیرساختی',
      title: 'راه‌آهن میانه–اردبیل، مترو تبریز (EPC) و فرودگاه سلام',
      subsidiary: 'ملی ساختمان / پایانه سلام / دی',
      sector: 'ریل (۸)، فرودگاه (۵) و سدها (۱۴)',
      contract_model: 'EPC / BOT',
      status: 'NORMAL',
      spi_sim: 0.94,
      progress_sim: '۸۱.۰٪ (شبیه‌سازی)',
      portal_gap: 'مستندسازی مشترک بین‌شرکتی',
      note: 'شامل سدهای مخملکوه، شهری‌کور، بندرانزلی و ایستگاه‌های M3/N4'
    },
    {
      code: 'PSP-KAVEH-04',
      wing: 'investment_housing',
      wing_label: 'بال مسکن و شهر صنعتی کاوه',
      title: 'شهر صنعتی کاوه (۳۰۰۰ هکتار): خورشیدی ۵MW و پلاسمای سرد',
      subsidiary: 'شهر صنعتی کاوه / تابیران',
      sector: 'انرژی، MEP و منطقه ویژه اقتصادی',
      contract_model: 'BOT / BLT',
      status: 'HIGHLIGHT',
      spi_sim: 0.97,
      progress_sim: '۹۱.۰٪ (شبیه‌سازی ۱۴۰۵)',
      portal_gap: 'ثبت‌شده در اخبار شهریور ۱۴۰۵',
      note: 'تحول سبز کاوه: نیروگاه خورشیدی ۵ مگاواتی + تصفیه‌خانه پلاسمای سرد و پست ۶۳kV'
    },
    {
      code: 'PSP-HSG-05',
      wing: 'investment_housing',
      wing_label: 'بال مسکن و شهر صنعتی کاوه',
      title: 'بال مسکن: آتی‌ساز (دریاکنار)، خانه، عمران مسکن و معین کوثر',
      subsidiary: 'آتی‌ساز / خانه / عمران ایران، شمال و اصفهان',
      sector: 'ابنیه ساختمانی و مدیریت شهری (شکاف پورتال)',
      contract_model: 'Investment / BLT',
      status: 'PORTAL_GAP',
      spi_sim: 0.90,
      progress_sim: '۷۸.۰٪ (شبیه‌سازی)',
      portal_gap: '۰ پروژه ثبت‌شده روی صفحه ابنیه در سایت!',
      note: 'اولویت اول فاز ۱ CPMAI: تکمیل شناسنامه دیجیتال پروژه‌های برج‌سازی و شهرک‌های اقماری'
    }
  ]
};

export const CLAUDE_PAYA_SYSTEM_PROMPT = `تو مدیر ارشد تحول دیجیتال، کنترل پورتفوی و دستیار هوش مصنوعی ستاد هلدینگ پایا سامان پارس هستی [Role].

زمینه و داده‌های مرجع (Context & Grounding):
ساختار دو بال اجرایی (پیمانکاری عمرانی و سرمایه‌گذاری مسکن/شهرک صنعتی کاوه)، ۸ حوزه تخصصی، ۶۳ پروژه ثبت‌شده و ۱۴ شرکت تابعه هلدینگ به همراه داده‌های شبیه‌سازی‌شده تمرینی در زیر آمده است:
` + JSON.stringify(PAYA_MOCK_PORTFOLIO_DATA, null, 2) + `

دستور کار (Task):
یک آرتیفکت تعاملی React + Tailwind با نام «اتاق فرماندهی پورتفوی دو بال پایا سامان پارس» بساز که:
۱. وضعیت بال پیمانکاری (رامان، جنرال مکانیک، دی، ملی ساختمان، تابیران، بن‌آب) و بال مسکن/کاوه (آتی‌ساز، خانه، عمران مسکن، کاوه، معین کوثر) را مجزا فیلتر و نمایش دهد.
۲. پروژه‌هایی را که در سایت پورتال دارای شکاف اطلاعاتی هستند (فیلدهای خالی مبلغ/کارفرما یا دسته ۰ پروژه‌ای ابنیه شهری) به صورت هشدار شفاف علامت‌گذاری کند.
۳. پاسخگوی سوالات مدیران درباره هم‌افزایی ناوگان سنگین، قراردادهای EPC+F/BOT/BLT و طرح‌های خورشیدی ۵MW/پلاسمای سرد کاوه باشد.

خطوط قرمز و قالب خروجی (Constraints & Output):
- اعداد شبیه‌سازی‌شده تمرینی را هرگز به عنوان رقم واقعی قرارداد معرفی نکن (Zero Hallucination).
- زبان فارسی اجرایی، لحن مدیریتی-فنی دقیق، کامپوننت Tailwind + Lucide React.`;

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  badge?: string;
}

export const PayaHoldingArtifactSimulator: React.FC<PayaHoldingArtifactSimulatorProps> = ({
  lang = 'fa'
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'artifact' | 'prompt' | 'data'>('artifact');
  const [wingFilter, setWingFilter] = useState<'all' | 'civil_contracting' | 'investment_housing'>('all');
  const [copiedSection, setCopiedSection] = useState<'prompt' | 'data' | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'psp-init',
      sender: 'assistant',
      text: 'سلام مدیر محترم. دستیار فرماندهی هلدینگ پایا سامان پارس فعال است. ساختار ۶۳ پروژه در ۸ حوزه کاری و ۱۴ شرکت تابعه دو بال بارگذاری شده (اعداد شاخص پیشرفت جهت تمرین شبیه‌سازی‌شده‌اند). درباره هم‌افزایی دو بال، شهر صنعتی کاوه، پروژه‌های امارات یا قراردادهای EPC+F/BOT بپرسید.',
      timestamp: '۰۹:۰۰',
      badge: 'اتاق فرماندهی پایا سامان پارس'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const visibleProjects = PAYA_MOCK_PORTFOLIO_DATA.featured_projects.filter(
    (p) => wingFilter === 'all' || p.wing === wingFilter
  );

  const copyToClipboard = (text: string, type: 'prompt' | 'data') => {
    navigator.clipboard.writeText(text);
    setCopiedSection(type);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const handleAskQuestion = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed || isThinking) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsThinking(true);

    setTimeout(() => {
      let botResponse = '';
      const lower = trimmed.toLowerCase();

      if (lower.includes('کاوه') || lower.includes('خورشیدی') || lower.includes('پلاسما') || lower.includes('تابیران')) {
        botResponse = `⚡ گزارش شهر صنعتی و منطقه ویژه اقتصادی کاوه (۳۰۰۰ هکتار ساوه):
• طرح‌های ۱۴۰۵: نیروگاه خورشیدی ۵ مگاواتی (مدل BOT) + تصفیه‌خانه پساب صنعتی با فناوری پلاسمای سرد (مدل BLT - شهریور ۱۴۰۵) به همراه ظرفیت MEP شرکت تابیران (پست ۶۳kV یزدمهر و تهویه مترو شیراز/اصفهان).
• وضعیت پورتفو (شبیه‌سازی آموزشی): آمادگی ۹۱.۰٪ و SPI=0.97.
• پیشنهاد اقدام: استفاده از NotebookLM برای پاسخگویی مستند به استعلام سرمایه‌گذاران منطقه ویژه و پایش روزانه شاخص COD پساب تصفیه‌شده.`;
      } else if (lower.includes('امارات') || lower.includes('skf2') || lower.includes('برون') || lower.includes('تهران')) {
        botResponse = `🛣️ وضعیت بال پیمانکاری راه، پل و تونل (بزرگ‌ترین سبد: ۲۸ پروژه):
• پروژه‌های شاخص داخلی: آزادراه تهران–شمال، تونل قلاجه–ایلام، قائمشهر–پل سفید، پل‌های شهدای اروند/۹ دی/فردیس و تقاطع‌های تهران.
• صادرات خدمات مهندسی (امارات): SKF2 شیص–خورفکان، R1000C شارجه، وادی‌الحلو–کلبا، R199 و جبل‌الکتاب (اجرا توسط رامان و جنرال مکانیک).
• هشدار حکمرانی داده: فیلدهای مبلغ و تاریخ این پروژه‌ها روی پورتال عمومی خالی است و باید از اکسل‌های دفتر فنی تکمیل شود.`;
      } else if (lower.includes('مسکن') || lower.includes('آتی') || lower.includes('ابنیه') || lower.includes('شکاف') || lower.includes('پورتال')) {
        botResponse = `🏢 تحلیل بال سرمایه‌گذاری مسکن و شکاف پورتال هلدینگ:
• شرکت‌های فعال بال دوم: آتی‌ساز (دریاکنار با ۱۴۳۳+ ویلا)، شرکت خانه، عمران و مسکن ایران، شمال، اصفهان (شاهین‌شهر/بهارستان/ملک‌شهر) و معین کوثر.
• شکاف کشف‌شده روی سایت: صفحه دسته «ابنیه ساختمانی و مدیریت شهری» اکنون ۰ پروژه ثبت‌شده دارد و فیلدهای جزئیات ۶۳ پروژه دیگر نیز خالی مانده‌اند.
• گام فوری در CPMAI: تعریف فایل استاندارد CSV/Markdown برای تکمیل شناسنامه این پروژه‌ها بدون نیاز به حدس زدن اعداد.`;
      } else if (lower.includes('قرارداد') || lower.includes('epc') || lower.includes('bot') || lower.includes('کنسرسیوم')) {
        botResponse = `⚖️ مدل‌های قراردادی و ریسک کنسرسیوم در پایا سامان پارس:
• مدل‌های فعال هلدینگ: EPC، EPC+F، PC، BOT، BLT و کنسرسیوم‌های چندشرکتی (رامان، جنرال مکانیک، دی، ملی ساختمان، تابیران).
• کلید کاهش ریسک: ممیزی خودکار بندهای فاینانس، مهلت ۲۱ روزه اخطار تاخیر ماده ۳۰ و قوانین جابه‌جایی ناوگان بین ۱۴ شرکت در Claude Projects یا NotebookLM.`;
      } else {
        botResponse = `🏛️ جمع‌بندی پورتفوی دو بال پایا سامان پارس (داده‌های پیشرفت شبیه‌سازی آموزشی):
• سبد کل: ۶۳ پروژه ثبت‌شده (۲۸ راه/تونل، ۱۴ سد/آبی، ۸ ریل/مترو، ۵ فرودگاه، ۴ صنعتی، ۴ MEP به‌علاوه طرح‌های کاوه و بال مسکن).
• ظرفیت اجرایی: ۱۴ شرکت تابعه و بیش از ۵۰۰۰ نیروی انسانی به همراه ناوگان سنگین.
برای تحلیل عمیق‌تر از دکمه‌های آماده زیر درباره «شهر صنعتی کاوه»، «پروژه‌های امارات»، «شکاف بال مسکن» یا «قراردادهای EPC+F/BOT» استفاده کنید.`;
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        badge: 'تحلیل پورتفو (آموزشی)'
      };

      setChatMessages((prev) => [...prev, botMsg]);
      setIsThinking(false);
    }, 350);
  };

  const handleResetChat = () => {
    setChatMessages([
      {
        id: 'psp-init-reset',
        sender: 'assistant',
        text: 'گفت‌وگو بازنشانی شد. ماتریس ۶۳ پروژه، ۱۴ شرکت تابعه و دو بال هلدینگ پایا سامان پارس آماده بررسی است.',
        timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        badge: 'اتاق فرماندهی پایا سامان پارس'
      }
    ]);
  };

  return (
    <div
      className="rounded-3xl border border-violet-500/35 dark:border-violet-400/30 bg-[#120f1d] text-[#ede9fe] shadow-2xl overflow-hidden font-sans"
      dir="rtl"
    >
      {/* Top Bar */}
      <div className="px-4 sm:px-6 py-3.5 bg-[#0b0914] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-400/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="h-4 w-px bg-white/20 mx-1" />
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-bold text-violet-300 bg-violet-500/20 px-2.5 py-0.5 rounded-full border border-violet-500/35">
              CLAUDE ARTIFACT SIMULATOR
            </span>
            <span className="text-xs font-bold text-white hidden sm:inline">
              اتاق فرماندهی دو بال هلدینگ پایا سامان پارس
            </span>
          </div>
        </div>

        {/* Sub-Tabs */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveSubTab('artifact')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'artifact'
                ? 'bg-violet-600 text-white font-bold shadow-xs'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>پیش‌نمایش آرتیفکت زنده</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('prompt')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'prompt'
                ? 'bg-violet-600 text-white font-bold shadow-xs'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>پرامپت کلود (RCTO)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('data')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'data'
                ? 'bg-violet-600 text-white font-bold shadow-xs'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>داده پورتفو (JSON)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: LIVE INTERACTIVE ARTIFACT */}
      {activeSubTab === 'artifact' && (
        <div className="p-4 sm:p-6 space-y-5">
          {/* Header & Disclaimer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-violet-400" />
                <h3 className="text-base sm:text-lg font-black text-white">
                  {PAYA_MOCK_PORTFOLIO_DATA.holding_name}
                </h3>
              </div>
              <p className="text-[11px] text-amber-300/90 mt-1">
                ⚠️ داده‌های شبیه‌سازی‌شده آموزشی · ۶۳ پروژه و ۱۴ شرکت تابعه ({PAYA_MOCK_PORTFOLIO_DATA.holding_stats.workforce})
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setWingFilter('all')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
                  wingFilter === 'all' ? 'bg-violet-600 text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                هر دو بال (۶۳ پروژه)
              </button>
              <button
                type="button"
                onClick={() => setWingFilter('civil_contracting')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
                  wingFilter === 'civil_contracting' ? 'bg-indigo-600 text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                بال پیمانکاری زیرساخت
              </button>
              <button
                type="button"
                onClick={() => setWingFilter('investment_housing')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
                  wingFilter === 'investment_housing' ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                بال مسکن و شهر صنعتی کاوه
              </button>
              <button
                type="button"
                onClick={handleResetChat}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
                title="بازنشانی مکالمه"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Holding KPIs Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-violet-500/15 border border-violet-500/30">
              <span className="text-[10px] text-violet-300 block">پورتفوی ثبت‌شده روی سایت</span>
              <b className="text-lg font-black text-white">۶۳ پروژه / ۸ حوزه</b>
            </div>
            <div className="p-3 rounded-2xl bg-indigo-500/15 border border-indigo-500/30">
              <span className="text-[10px] text-indigo-300 block">ظرفیت اجرایی دو بال</span>
              <b className="text-lg font-black text-white">۱۴ شرکت · ۵۰۰۰+ نیرو</b>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30">
              <span className="text-[10px] text-emerald-300 block">شهر صنعتی کاوه (۱۴۰۵)</span>
              <b className="text-lg font-black text-white">۵MW خورشیدی + پلاسما</b>
            </div>
            <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30">
              <span className="text-[10px] text-amber-300 block">مدل‌های قراردادی هلدینگ</span>
              <b className="text-sm font-black text-white font-mono">EPC · EPC+F · BOT · BLT</b>
            </div>
          </div>

          {/* Filtered Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {visibleProjects.map((proj) => (
              <div
                key={proj.code}
                className={`p-3.5 rounded-2xl border space-y-2 ${
                  proj.status === 'PORTAL_GAP'
                    ? 'bg-amber-500/10 border-amber-500/35'
                    : proj.status === 'HIGHLIGHT'
                    ? 'bg-emerald-500/10 border-emerald-500/35'
                    : 'bg-white/[0.04] border-white/10'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-violet-200">
                    {proj.code} · {proj.contract_model}
                  </span>
                  <span className="text-[10px] font-bold text-gray-300">{proj.wing_label}</span>
                </div>
                <h4 className="text-xs font-black text-white leading-snug">{proj.title}</h4>
                <p className="text-[11px] text-gray-300">شرکت مجری: {proj.subsidiary}</p>
                <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-white/10 font-mono">
                  <span className="text-violet-300">SPI (Sim): {proj.spi_sim}</span>
                  <span className="text-emerald-300">{proj.progress_sim}</span>
                </div>
                <p className="text-[10px] text-amber-300/90 flex items-start gap-1">
                  {proj.status === 'PORTAL_GAP' ? (
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  <span>{proj.portal_gap}</span>
                </p>
              </div>
            ))}
          </div>

          {/* Interactive Chat Area */}
          <div className="rounded-2xl border border-white/10 bg-[#0b0914] flex flex-col h-[340px] overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${
                    msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                      msg.sender === 'user'
                        ? 'bg-violet-600 text-white'
                        : 'bg-gradient-to-tr from-violet-600 to-indigo-500 text-white shadow-xs'
                    }`}
                  >
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-violet-600/25 border border-violet-500/35 text-white'
                        : 'bg-white/5 border border-white/10 text-gray-200'
                    }`}
                  >
                    {msg.badge && (
                      <span className="font-mono text-[10px] text-violet-300 block mb-1 font-semibold">
                        {msg.badge}
                      </span>
                    )}
                    <div className="whitespace-pre-line">{msg.text}</div>
                  </div>
                </div>
              ))}

              {isThinking && (
                <div className="flex items-center gap-2 text-xs text-violet-300 p-2 animate-pulse font-mono">
                  <Bot className="w-4 h-4" />
                  <span>در حال تحلیل ماتریس ۶۳ پروژه و دو بال هلدینگ...</span>
                </div>
              )}
            </div>

            {/* Quick Prompt Buttons */}
            <div className="p-2.5 bg-black/40 border-t border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[10px] text-gray-400 shrink-0">سوالات آماده هلدینگ:</span>
              <button
                type="button"
                onClick={() => handleAskQuestion('وضعیت شهر صنعتی کاوه، نیروگاه خورشیدی ۵MW و پلاسمای سرد را تحلیل کن.')}
                className="shrink-0 text-[11px] px-2.5 py-1 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 cursor-pointer flex items-center gap-1"
              >
                <Zap className="w-3 h-3" />
                <span>شهر صنعتی کاوه و پلاسما</span>
              </button>
              <button
                type="button"
                onClick={() => handleAskQuestion('پروژه‌های راه، تونل و محورهای برون‌مرزی امارات (SKF2) در چه وضعیتی هستند؟')}
                className="shrink-0 text-[11px] px-2.5 py-1 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/30 cursor-pointer flex items-center gap-1"
              >
                <Building2 className="w-3 h-3" />
                <span>راه و تونل (تهران–شمال و امارات)</span>
              </button>
              <button
                type="button"
                onClick={() => handleAskQuestion('شکاف اطلاعاتی بال مسکن (آتی‌ساز/عمران مسکن) و دسته ابنیه در سایت چیست؟')}
                className="shrink-0 text-[11px] px-2.5 py-1 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 cursor-pointer flex items-center gap-1"
              >
                <Layers className="w-3 h-3" />
                <span>بال مسکن و شکاف پورتال</span>
              </button>
              <button
                type="button"
                onClick={() => handleAskQuestion('ریسک‌های قراردادهای EPC+F، BOT/BLT و کنسرسیوم هلدینگ چیست؟')}
                className="shrink-0 text-[11px] px-2.5 py-1 rounded-xl bg-violet-500/15 hover:bg-violet-500/25 text-violet-300 border border-violet-500/30 cursor-pointer flex items-center gap-1"
              >
                <Scale className="w-3 h-3" />
                <span>قراردادهای EPC+F و BOT</span>
              </button>
            </div>

            {/* Chat Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAskQuestion(inputQuery);
              }}
              className="p-3 bg-[#120f1d] border-t border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={
                  lang === 'fa'
                    ? 'سوالی درباره پروژه‌های پایا، کاوه، امارات یا شرکت‌های تابعه بپرسید...'
                    : 'Ask about Paya projects, Kaveh, UAE corridors, or subsidiaries...'
                }
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-hidden focus:border-violet-500"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || isThinking}
                className="p-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: CLAUDE RCTO PROMPT */}
      {activeSubTab === 'prompt' && (
        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <Code className="w-4 h-4 text-violet-400" />
                <span>پرامپت RCTO ساخت اتاق فرماندهی پایا سامان پارس در Claude Artifacts</span>
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                شامل قید صریح جلوگیری از توهم روی فیلدهای خالی پورتال هلدینگ
              </p>
            </div>

            <button
              type="button"
              onClick={() => copyToClipboard(CLAUDE_PAYA_SYSTEM_PROMPT, 'prompt')}
              className="px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              {copiedSection === 'prompt' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'prompt' ? 'کپی شد!' : 'کپی کامل پرامپت'}</span>
            </button>
          </div>

          <div
            className="p-4 rounded-2xl bg-[#0b0914] border border-white/10 font-sans text-xs text-violet-100 leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[440px] custom-scrollbar select-all"
            dir="rtl"
          >
            {CLAUDE_PAYA_SYSTEM_PROMPT}
          </div>
        </div>
      )}

      {/* TAB 3: JSON PORTFOLIO DATA */}
      {activeSubTab === 'data' && (
        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <Factory className="w-4 h-4 text-amber-400" />
                <span>داده JSON ساختار دو بال، ۶۳ پروژه و شبیه‌سازی کارگاهی پایا</span>
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                مبنای Grounding برای تست ساخت داشبوردهای مدیریتی هلدینگ
              </p>
            </div>

            <button
              type="button"
              onClick={() => copyToClipboard(JSON.stringify(PAYA_MOCK_PORTFOLIO_DATA, null, 2), 'data')}
              className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              {copiedSection === 'data' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'data' ? 'کپی شد!' : 'کپی دیتاست JSON'}</span>
            </button>
          </div>

          <div
            className="p-4 rounded-2xl bg-[#0b0914] border border-white/10 font-mono text-xs text-emerald-300 leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[440px] custom-scrollbar"
            dir="ltr"
          >
            {JSON.stringify(PAYA_MOCK_PORTFOLIO_DATA, null, 2)}
          </div>
        </div>
      )}
    </div>
  );
};
