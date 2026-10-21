import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  AlertTriangle,
  CheckCircle2,
  Flame,
  Activity,
  ShieldAlert,
  Send,
  RotateCcw,
  Bot,
  User,
  Gauge,
  Code,
  Database,
  Layers,
  ArrowRight
} from 'lucide-react';

interface PetroClaudeArtifactSimulatorProps {
  lang?: 'fa' | 'en';
}

export const PETRO_MOCK_SCADA_DATA = {
  plant_id: "PETRO-PH14-GAS-OLEFIN",
  facility_name: "مجتمع فرآورش هیدروکربوری پارس جنوبی (واحد الفین و تفکیک)",
  shift_info: "شیفت روز (A) - ساعت ۱۴:۳۰",
  scada_telemetry: [
    {
      tag: "C-101",
      equipment: "توربوکمپرسور بازگردانی گاز ترش (Recycle Compressor)",
      status: "WARNING",
      vibration_mm_s: 7.4,
      vibration_limit_warning: 6.0,
      vibration_limit_trip: 8.5,
      bearing_temp_c: 92.4,
      lube_oil_pressure_bar: 2.1,
      last_service: "۱۴۰۳/۰۶/۱۵",
      alert: "افزایش دامنه ارتعاش در بیرینگ شماره ۲ شفت - ریسک انحراف مکانیکی یا کاویتاسیون"
    },
    {
      tag: "T-204",
      equipment: "برج تفکیک هیدروکربوری دی‌بوتانایزر (Debutanizer Column)",
      status: "NORMAL",
      top_pressure_bar: 2.8,
      reboiler_temp_c: 168.2,
      tray_delta_p_kpa: 14.5,
      c4_purity_percent: 98.6,
      last_service: "۱۴۰۳/۰۴/۱۰",
      alert: "فرآیند تقطیر درون محدوده پایدار اپتیمم"
    },
    {
      tag: "FL-01",
      equipment: "سیستم پایش مشعل و ریکاوری گاز (Flare Gas Recovery)",
      status: "CAUTION",
      flaring_rate_kg_h: 465,
      environmental_max_kg_h: 500,
      purge_gas_flow_m3_h: 120,
      smoke_opacity_percent: 11,
      alert: "نرخ فلرینگ در ۹۳٪ سقف مجاز محیط‌زیست - هشدار جریمه آلایندگی"
    }
  ],
  active_ptw_permits: [
    {
      permit_id: "PTW-8821",
      type: "کار گرم (Hot Work) - جوشکاری لوله فرعی لاین گاز مایع",
      location: "محوطه مجاور واحد تقطیر T-204 (Zone 1)",
      gas_test: "LEL: 0.0% | H2S: 0 ppm | O2: 20.9% (PASS)",
      valid_until: "۱۸:۰۰ امروز",
      supervisor: "مهندس قنبری (سرپرست ایمنی HSE)"
    }
  ]
};

export const CLAUDE_PETRO_SYSTEM_PROMPT = `تو یک مهندس ارشد فرآیند و سیستم‌های شناختی اتاق کنترل پالایشگاه نفت، گاز و پتروشیمی با تسلط بر استانداردهای PMI-CPMAI و الزامات HSE هستی [Role].

زمینه و داده‌های مرجع (Context & Grounding):
دیتای تله‌متری سنسورهای SCADA و پرمیت‌های ایمنی مجتمع فرآورش پارس جنوبی به شرح زیر است:
` + JSON.stringify(PETRO_MOCK_SCADA_DATA, null, 2) + `

دستور کار (Task):
یک آرتیفکت تعاملی ری‌اکت (Interactive React Artifact) بساز که شبیه به یک "دستیار شناختی اتاق کنترل پالایشگاه" عمل کند. این کامپوننت باید:
۱. کارت‌های پایش زنده سنسورها را با نشانگرهای رنگی (سبز، زرد و قرمز هشدار) نمایش دهد.
۲. یک سیستم چت هوشمند با پاسخ‌های تحلیلی، دقیق، فنی و مستند به داده‌های فوق ایجاد کند.
۳. دکمه‌های سریع برای سوالات پرتکرار اپراتور در شیفت کاری فراهم کند.

خطوط قرمز و قالب خروجی (Constraints & Output):
- هیچ ادعایی خارج از مقادیر تله‌متری ارائه نکن (Zero Hallucination).
- در صورت بروز ارتعاش بالای ۶ میلی‌متر بر ثانیه، پروتکل‌های استاندارد عیب‌یابی توربوکمپرسور (پایش روغن، کاویتاسیون و بار مکانیکی) را قید کن.
- زبان فارسی تخصصی و رسمی، استایل مدرن Tailwind CSS و آیکون‌های lucide-react.`;

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  badge?: string;
}

export const PetroClaudeArtifactSimulator: React.FC<PetroClaudeArtifactSimulatorProps> = ({
  lang = 'fa'
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'artifact' | 'prompt' | 'data'>('artifact');
  const [copiedSection, setCopiedSection] = useState<'prompt' | 'data' | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      text: 'سلام مهندس شیفت. سیستم مانیتورینگ شناختی واحد فرآورش و الفین فعال است. سنسورهای C-101، T-204 و FL-01 آنلاین هستند. تجهیز C-101 در وضعیت اخطار ارتعاش و مشعل FL-01 در ۹۳٪ سقف محیط‌زیست قرار دارد. جهت بررسی جزئیات، سوال یا سناریوی مدنظرتان را بفرمایید.',
      timestamp: '۱۴:۳۰',
      badge: 'دستیار هوشمند اتاق کنترل'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);

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

      if (lower.includes('c-101') || lower.includes('کمپرسور') || lower.includes('ارتعاش')) {
        botResponse = `⚠️ گزارش فنی توربوکمپرسور C-101 (Recycle Compressor):
• ارتعاش فعلی: 7.4 mm/s (حد آستانه هشدار: 6.0 mm/s | حد تریپ شات‌داون: 8.5 mm/s)
• دمای بیرینگ درایو: 92.4°C (افزایش غیرعادی ۵ درجه نسبت به شیفت قبل)
• فشار روغن روانکاری: 2.1 bar (نرمال)

🔍 تحلیل مهندسی هوش مصنوعی:
با توجه به نرمال بودن فشار روغن (2.1 bar)، علت ارتعاش افت هیدرولیکی روغن نیست. احتمال اصلی نابالانسی دینامیکی روتور یا پدیده کاویتاسیون به دلیل ورود قطرات مایع (Liquid Carryover) از اسکرابر بالادست است.

📋 دستورالعمل فوری (SOP):
۱. بررسی سطح مایع در ساکشن درام کمپرسور و درین دستی در صورت نیاز.
۲. اعزام اکیپ Condition Monitoring جهت اندازه‌گیری طیف فرکانسی ارتعاشات بیرینگ ۲.
۳. در صورت رسیدن ارتعاش به 8.0 mm/s، انتقال فوری خط به کمپرسور رزرو پیش از Trip ناگهانی.`;
      } else if (lower.includes('فلر') || lower.includes('fl-01') || lower.includes('مشعل') || lower.includes('محیط')) {
        botResponse = `🔥 وضعیت سیستم فلرینگ FL-01 (Flare Gas Recovery):
• نرخ فلرینگ فعلی: 465 kg/h
• سقف مجاز محیط‌زیستی: 500 kg/h (مصرف ۹۳٪ از ظرفیت مجاز)
• کدر بودن دود (Opacity): 11% (زیر حد مجاز ۲۰٪)

⚠️ ریسک جریمه محیط‌زیستی:
تنها ۳۵ کیلوگرم بر ساعت تا مرز جریمه آلایندگی و ثبت تخلف در پایش آنلاین محیط‌زیست فاصله داریم.

📋 اقدامات پیشنهادی:
۱. بازبینی رگولاتور فشار شبکه ریکاوری و هدایت گازهای مازاد به کوره حرارتی F-102.
۲. هماهنگی با مهندس فرآیند جهت کاهش ۵ درصدی دبی خوراک تا رفع گلوگاه فشار.`;
      } else if (lower.includes('پرمیت') || lower.includes('ptw') || lower.includes('جوش') || lower.includes('ایمنی') || lower.includes('hse')) {
        botResponse = `🛡️ وضعیت پرمیت‌های فعال (HSE Permit to Work):
• شماره پرمیت: PTW-8821
• نوع عملیات: کار گرم (Hot Work) - جوشکاری لوله فرعی لاین گاز مایع
• موقعیت: Zone 1 (مجاورت برج تقطیر T-204)
• وضعیت گازسنجی: O2: 20.9% | H2S: 0 ppm | LEL: 0.0% (تایید شده ✓)
• سرپرست ایمنی: مهندس قنبری | اعتبار: تا ساعت ۱۸:۰۰ امروز

نکته احتیاطی هوش مصنوعی: با توجه به انجام کار گرم در زون ۱، کپسول‌های آتش‌نشانی CO2 در محل مستقر و بلانکت نسوز روی خطوط مجاور کشیده شده است.`;
      } else if (lower.includes('t-204') || lower.includes('برج') || lower.includes('تقطیر') || lower.includes('دی‌بوتانایزر')) {
        botResponse = `📊 وضعیت عملکرد برج تقطیر T-204 (Debutanizer):
• فشار بالای برج: 2.8 bar (محدوده اپتیمم: 2.5 تا 3.2 bar)
• دمای ریبویلر: 168.2°C (پایدار)
• افت فشار سینی‌ها (ΔP): 14.5 kPa (نشانه عدم فولدینگ یا گرفتگی سینی‌ها)
• خلوص محصول C4: 98.6% (بالاتر از تارگت ۹۸.۰٪)

وضعیت کلی: شرایط فرآیندی برج T-204 کاملاً استاندارد و پایدار است و محصول خروجی با حداکثر راندمان اقتصادی تولید می‌شود.`;
      } else {
        botResponse = `پاسخ دستیار با استناد به پایگاه داده تله‌متری:
داده‌های سنسورها برای «${trimmed}» بررسی شد. در حال حاضر ۳ تجهیز فعال شامل کمپرسور C-101 (هشدار ارتعاش 7.4mm/s)، برج T-204 (پایدار)، و فلرینگ FL-01 (نرخ 465kg/h) به همراه پرمیت کار گرم PTW-8821 در سیستم ثبت هستند.
جهت بررسی دقیق‌تر می‌توانید از دکمه‌های سوالات آماده استفاده کنید یا تگ تجهیز موردنظر را تایپ فرمایید.`;
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        badge: 'تحلیل تله‌متری SCADA'
      };

      setChatMessages((prev) => [...prev, botMsg]);
      setIsThinking(false);
    }, 400);
  };

  const handleResetChat = () => {
    setChatMessages([
      {
        id: 'msg-init-reset',
        sender: 'assistant',
        text: 'مکالمه بازنشانی شد. سنسورهای واحد الفین و تفکیک گاز آنلاین هستند. آماده پاسخگویی به سناریوهای کنترلی شیفت جاری هستم.',
        timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        badge: 'دستیار هوشمند اتاق کنترل'
      }
    ]);
  };

  return (
    <div className="rounded-3xl border border-cyan-500/30 dark:border-cyan-400/30 bg-[#0d151c] text-[#e1e7ec] shadow-2xl overflow-hidden font-sans" dir="rtl">
      
      {/* Claude Artifact OS Bar */}
      <div className="px-4 sm:px-6 py-3.5 bg-[#090f14] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="h-4 w-px bg-white/20 mx-1" />
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-bold text-amber-400 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30">
              CLAUDE 3.5 ARTIFACT
            </span>
            <span className="text-xs font-bold text-white hidden sm:inline">
              دستیار شناختی مانیتورینگ پالایشگاه نفت و گاز
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl text-xs font-mono">
          <button
            onClick={() => setActiveSubTab('artifact')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'artifact'
                ? 'bg-cyan-500 text-white font-bold shadow-xs'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>پیش‌نمایش آرتیفکت زنده</span>
          </button>
          <button
            onClick={() => setActiveSubTab('prompt')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'prompt'
                ? 'bg-cyan-500 text-white font-bold shadow-xs'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>پرامپت کلود (RCTO)</span>
          </button>
          <button
            onClick={() => setActiveSubTab('data')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'data'
                ? 'bg-cyan-500 text-white font-bold shadow-xs'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>دیتای فرضی تله‌متری (JSON)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: LIVE INTERACTIVE ARTIFACT */}
      {activeSubTab === 'artifact' && (
        <div className="p-4 sm:p-6 space-y-6">
          
          {/* Header Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-base sm:text-lg font-black text-white">
                  {PETRO_MOCK_SCADA_DATA.facility_name}
                </h3>
              </div>
              <p className="text-xs text-gray-400 font-mono mt-0.5">
                {PETRO_MOCK_SCADA_DATA.plant_id} · {PETRO_MOCK_SCADA_DATA.shift_info}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                SCADA LINK: CONNECTED
              </span>
              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
                title="بازنشانی مکالمه"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Live Telemetry KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            
            {/* C-101 Warning Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-transparent border border-amber-500/35 relative overflow-hidden group hover:border-amber-400 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span className="font-mono font-black text-sm text-amber-300">C-101</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  WARNING
                </span>
              </div>
              <h4 className="text-xs font-bold text-white mb-2 line-clamp-1">
                توربوکمپرسور بازگردانی گاز ترش
              </h4>
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between items-center text-gray-300">
                  <span>ارتعاش شفت:</span>
                  <span className="font-bold text-amber-300 text-sm">7.4 mm/s</span>
                </div>
                <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: '87%' }} />
                </div>
                <div className="flex justify-between items-center text-[10px] text-gray-400">
                  <span>آستانه هشدار: 6.0</span>
                  <span>شات‌داون: 8.5</span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-gray-300 pt-1 border-t border-white/5">
                  <span>دمای بیرینگ:</span>
                  <span className="text-white">92.4°C</span>
                </div>
              </div>
            </div>

            {/* T-204 Normal Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent border border-emerald-500/35 relative overflow-hidden group hover:border-emerald-400 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="font-mono font-black text-sm text-emerald-300">T-204</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  NORMAL
                </span>
              </div>
              <h4 className="text-xs font-bold text-white mb-2 line-clamp-1">
                برج تفکیک دی‌بوتانایزر (C3/C4)
              </h4>
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between items-center text-gray-300">
                  <span>فشار بالای برج:</span>
                  <span className="font-bold text-emerald-300 text-sm">2.8 bar</span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span>دمای ریبویلر:</span>
                  <span className="text-white">168.2°C</span>
                </div>
                <div className="flex justify-between items-center text-gray-300 pt-1 border-t border-white/5">
                  <span>خلوص C4:</span>
                  <span className="text-emerald-300 font-bold">98.6%</span>
                </div>
              </div>
            </div>

            {/* FL-01 Caution Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-red-500/15 via-orange-500/5 to-transparent border border-orange-500/35 relative overflow-hidden group hover:border-orange-400 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span className="font-mono font-black text-sm text-orange-300">FL-01</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/40">
                  CAUTION 93%
                </span>
              </div>
              <h4 className="text-xs font-bold text-white mb-2 line-clamp-1">
                پایش مشعل و فلرینگ گازی
              </h4>
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between items-center text-gray-300">
                  <span>نرخ فلرینگ:</span>
                  <span className="font-bold text-orange-300 text-sm">465 kg/h</span>
                </div>
                <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '93%' }} />
                </div>
                <div className="flex justify-between items-center text-[10px] text-gray-400">
                  <span>سقف محیط‌زیست: 500 kg/h</span>
                  <span className="text-orange-300 font-bold">فاصله: ۳۵</span>
                </div>
              </div>
            </div>
          </div>

          {/* Active HSE Permit Banner */}
          <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/25 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-blue-400 shrink-0" />
              <div>
                <span className="font-bold text-white">پرمیت کار گرم فعال (PTW-8821):</span>{' '}
                <span className="text-gray-300">جوشکاری لاین فرعی در Zone 1 (مجاورت برج T-204)</span>
              </div>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-blue-300 bg-blue-500/15 px-2.5 py-0.5 rounded-lg border border-blue-500/30">
              <span>LEL: 0%</span>
              <span>•</span>
              <span>H2S: 0 ppm</span>
              <span>•</span>
              <span>O2: 20.9% (PASS)</span>
            </div>
          </div>

          {/* Chat Window */}
          <div className="rounded-2xl border border-white/10 bg-[#090f14] flex flex-col h-[380px] overflow-hidden">
            
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar">
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
                        ? 'bg-cyan-600 text-white'
                        : 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-xs'
                    }`}
                  >
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div
                    className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-3.5 text-xs sm:text-[13px] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-cyan-600/20 border border-cyan-500/30 text-white'
                        : 'bg-white/5 border border-white/10 text-gray-200 shadow-sm'
                    }`}
                  >
                    {msg.badge && (
                      <span className="font-mono text-[10px] text-amber-400 block mb-1 font-semibold">
                        {msg.badge}
                      </span>
                    )}
                    <div className="whitespace-pre-line">{msg.text}</div>
                    <span className="text-[9px] opacity-60 font-mono block mt-1.5 text-left" dir="ltr">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isThinking && (
                <div className="flex items-center gap-2 text-xs text-amber-400 p-2 animate-pulse font-mono">
                  <Bot className="w-4 h-4" />
                  <span>دستیار در حال ارزیابی ماتریس سنسورهای SCADA و لاگ‌های پالایشگاه...</span>
                </div>
              )}
            </div>

            {/* Quick Prompts Bar */}
            <div className="p-2.5 bg-black/40 border-t border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[10px] text-gray-400 shrink-0 font-medium">پرسش‌های آماده:</span>
              <button
                onClick={() =>
                  handleAskQuestion('علت اخطار ارتعاش کمپرسور C-101 چیست و چه دستورالعملی دارد؟')
                }
                className="shrink-0 text-[11px] px-2.5 py-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all cursor-pointer"
              >
                ⚠️ ارتعاش C-101
              </button>
              <button
                onClick={() =>
                  handleAskQuestion('آیا نرخ فلرینگ FL-01 در آستانه جریمه محیط‌زیست است؟')
                }
                className="shrink-0 text-[11px] px-2.5 py-1 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 border border-orange-500/30 transition-all cursor-pointer"
              >
                🔥 وضعیت فلرینگ
              </button>
              <button
                onClick={() =>
                  handleAskQuestion('آیا پرمیت جوشکاری فعال در زون خطرناک داریم؟')
                }
                className="shrink-0 text-[11px] px-2.5 py-1 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 transition-all cursor-pointer"
              >
                🛡️ پرمیت کار گرم
              </button>
              <button
                onClick={() =>
                  handleAskQuestion('تحلیل راندمان برج تقطیر T-204 را گزارش کن.')
                }
                className="shrink-0 text-[11px] px-2.5 py-1 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-all cursor-pointer"
              >
                📊 راندمان برج T-204
              </button>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAskQuestion(inputQuery);
              }}
              className="p-3 bg-[#0d151c] border-t border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="سوال فنی خود را از دستیار هوشمند پالایشگاه بپرسید..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-hidden focus:border-cyan-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || isThinking}
                className="p-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white transition-all cursor-pointer"
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
                <Code className="w-4 h-4 text-cyan-400" />
                <span>پرامپت مهندسی‌شده جهت ساخت آرتیفکت در Claude 3.5 Sonnet</span>
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                این پرامپت با معماری R-C-T-O و الزامات فنی صنایع نفت و پتروشیمی تدوین شده است.
              </p>
            </div>

            <button
              onClick={() => copyToClipboard(CLAUDE_PETRO_SYSTEM_PROMPT, 'prompt')}
              className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              {copiedSection === 'prompt' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>کپی شد!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>کپی کامل پرامپت</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-[#080d12] border border-white/10 font-sans text-xs text-cyan-100 leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[460px] custom-scrollbar select-all" dir="rtl">
            {CLAUDE_PETRO_SYSTEM_PROMPT}
          </div>
        </div>
      )}

      {/* TAB 3: MOCK SCADA DATA (JSON) */}
      {activeSubTab === 'data' && (
        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-amber-400" />
                <span>پایگاه داده فرضی تله‌متری و ایمنی پالایشگاه (SCADA Telemetry JSON)</span>
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                مبنای استناد داده‌ای (Grounding) مدل زبانی بدون ایجاد توهم یا خروجی خارج از سند.
              </p>
            </div>

            <button
              onClick={() => copyToClipboard(JSON.stringify(PETRO_MOCK_SCADA_DATA, null, 2), 'data')}
              className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              {copiedSection === 'data' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>کپی شد!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>کپی دیتاست JSON</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-[#080d12] border border-white/10 font-mono text-xs text-emerald-400 leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[460px] custom-scrollbar" dir="ltr">
            {JSON.stringify(PETRO_MOCK_SCADA_DATA, null, 2)}
          </div>
        </div>
      )}

      {/* Footer Meta */}
      <div className="px-4 sm:px-6 py-3 bg-[#090f14] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] text-gray-400">
        <div className="flex items-center gap-2">
          <span className="font-mono text-cyan-400">AJA × OWJ Council</span>
          <span>•</span>
          <span>شبیه‌ساز رسمی استانداردهای تعاملی هوش مصنوعی مهندسی</span>
        </div>
        <div className="font-mono text-gray-500 text-[10px]">
          Framework: Anthropic React Artifacts Pattern
        </div>
      </div>
    </div>
  );
};
