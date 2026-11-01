import React, { useState, useRef } from 'react';
import { Language } from '../../types/cpmai';
import { playTactileSound } from '../../utils/uiSoundEffects';
import {
  Brain,
  FolderTree,
  Network,
  Copy,
  Check,
  Terminal,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Code2,
  FileText,
  Workflow,
  Sliders,
  Play,
  Download,
  ShieldAlert,
  Layers,
  Wrench,
  BookOpen,
  Lightbulb,
  Zap,
  Eye,
  ExternalLink,
  Monitor
} from 'lucide-react';
import {
  OBSIDIAN_SECOND_BRAIN_STEPS,
  OBSIDIAN_DAILY_WORKFLOWS
} from '../../data/obsidian_second_brain_curriculum';
import {
  MCP_MASTERCLASS_STEPS,
  MCP_TROUBLESHOOTING_TABLE
} from '../../data/mcp_masterclass_curriculum';
import {
  ProjectorSlideModal,
  ProjectorSlideItem,
  splitPointTitleAndBody
} from '../ProjectorSlideModal';

interface ObsidianBrainSkillsWorkshopProps {
  lang: Language;
  copyToClipboard: (text: string, id: string) => void;
  copiedId: string | null;
  onLoadToSandbox?: (promptText: string) => void;
}

interface CurriculumModule {
  stepNumber: string;
  titleFa: string;
  titleEn: string;
  summaryFa: string;
  deepDiveFa: string;
  keyTakeawayFa: string;
  badgeFa: string;
}

interface ReadySkillPackage {
  id: string;
  name: string;
  titleFa: string;
  titleEn: string;
  badgeFa: string;
  triggerWhenFa: string;
  skillMdContent: string;
  test1NormalTitleFa: string;
  test1NormalPromptFa: string;
  test2TrapTitleFa: string;
  test2TrapPromptFa: string;
  expectedTrapBehaviorFa: string;
}

const CURRICULUM_MODULES: CurriculumModule[] = [
  {
    stepNumber: 'گام ۰۱',
    titleFa: 'توقف تکرار پرامپت‌ها؛ چرا باید Skill بسازیم؟',
    titleEn: 'Stop Repeating Your Prompts, Build a Skill',
    summaryFa: 'معرفی چالش کپی-پیست کردن مداوم پرامپت‌های تکراری و نحوه تبدیل آن‌ها به یک مهارت دائمی (Skill).',
    deepDiveFa:
      'در کار روزمره، اکثر افراد برای کارهای تکراری (مثل خلاصه‌سازی جلسات، بررسی گزارش کارگاه یا نوشتن نامه اداری) هر بار یک پرامپت طولانی را کپی-پیست می‌کنند یا از صفر تایپ می‌کنند. این کار باعث ناهماهنگی خروجی‌ها و اتلاف وقت می‌شود. راه‌حل نسل جدید هوش مصنوعی، بسته‌بندی دستورالعمل‌ها در قالب یک «مهارت دائمی (Skill)» است که فقط یک بار ساخته می‌شود و همیشه در دسترس است.',
    keyTakeawayFa: 'قانون طلایی: هر کاری را که بیش از ۳ بار در هفته برای هوش مصنوعی توضیح می‌دهید، از حالت پرامپت خارج کرده و به یک Skill تبدیل کنید.',
    badgeFa: 'مسئله و ضرورت'
  },
  {
    stepNumber: 'گام ۰۲',
    titleFa: 'تفاوت دقیق بین Prompt، Skill و پروتکل MCP چیست؟',
    titleEn: 'Difference Between Prompt, Skill, and MCP',
    summaryFa: 'مرزبندی شفاف: پرامپت (درخواست لحظه‌ای)، اسکیل (دفترچه قوانین و رویه انجام کار) و MCP (سیم‌کشی اتصال به ابزارهای بیرونی).',
    deepDiveFa:
      '• پرامپت (Prompt): دستور لحظه‌ای شما در چت است («این متن جلسه را خلاصه کن»).\n• اسکیل (SKILL.md): مغز روشی و آیین‌نامه استاندارد انجام کار (SOP) است که به هوش مصنوعی یاد می‌دهد دقیقاً با چه فرمتی، چه مراحلی و چه خطوط قرمزی کار را انجام دهد.\n• پروتکل MCP: پل ارتباطی و دسترسی به نرم‌افزارهای بیرونی (مثل پوشه فایل‌های کامپیوتر، تقویم، ایمیل یا دیتابیس) است.',
    keyTakeawayFa: 'فرمول طلایی: Prompt (چه کاری؟) + Skill (چگونه و با چه استانداردی؟) + MCP (با دسترسی به کدام ابزار و فایل؟).',
    badgeFa: 'مفاهیم پایه'
  },
  {
    stepNumber: 'گام ۰۳',
    titleFa: 'چرا Skill بسیار قدرتمندتر از تکرار پرامپت است؟',
    titleEn: 'Why a Skill Beats Repeating Prompts',
    summaryFa: 'ثبات ۱۰۰٪ خروجی‌ها، بارگذاری هوشمند فقط در زمان نیاز (بدون اشغال دائمی حافظه) و قابلیت اشتراک‌گذاری تیمی.',
    deepDiveFa:
      'برخلاف دستورالعمل‌های کلی (Custom Instructions) که در تمام چت‌ها حافظه مدل را اشغال می‌کنند، هوش مصنوعی در ابتدای چت فقط «نام» و «توضیح یک‌خطی (Description)» اسکیل‌ها را می‌بیند و تنها زمانی که تشخیص دهد درخواست شما مرتبط با آن اسکیل است، فایل کامل SKILL.md را باز کرده و اجرا می‌کند (Progressive Disclosure).',
    keyTakeawayFa: 'اسکیل‌ها هم حافظه (Context Window) را تمیز نگه می‌دارند و هم به شما اجازه می‌دهند یک فایل SKILL.md را به تمام همکاران واحد خود بدهید تا خروجی کل تیم یکدست شود.',
    badgeFa: 'مزیت معماری'
  },
  {
    stepNumber: 'گام ۰۴',
    titleFa: 'نحوه فعال‌سازی قابلیت Skills در حساب کاربری',
    titleEn: 'Enabling Skills in Your Account',
    summaryFa: 'مراحل فعال کردن بخش Skills در تنظیمات پلتفرم‌های هوش مصنوعی و آماده‌سازی محیط برای بارگذاری اولین مهارت.',
    deepDiveFa:
      'در محیط Claude، از منوی Settings وارد بخش Capabilities یا Profile شوید و گزینه Skills را فعال کنید. در آنجا می‌توانید مهارت‌های پیش‌فرض را ببینید یا دکمه Upload / Add Skill را بزنید. در ChatGPT Projects و Gemini Gems نیز می‌توانید فایل SKILL.md را مستقیماً در بخش دانش پروژه (Project Files / Knowledge) بارگذاری کنید.',
    keyTakeawayFa: 'فایل اسکیل باید دقیقاً با نام SKILL.md (یا در قالب یک پوشه فشرده ZIP حاوی فایل SKILL.md) بارگذاری شود.',
    badgeFa: 'تنظیمات اولیه'
  },
  {
    stepNumber: 'گام ۰۵',
    titleFa: 'پروژه عملی: ساخت اسکیل «خلاصه‌ساز جلسات (Meeting Summarizer)»',
    titleEn: 'Building a "Meeting Summarizer" Skill Step-by-Step',
    summaryFa: 'ساخت گام‌به‌گام یک اسکیل واقعی از صفر بدون نیاز به برنامه‌نویسی با کمک خود هوش مصنوعی.',
    deepDiveFa:
      'برای ساخت اسکیل نیازی نیست خودتان کدنویسی کنید! کافی است به هوش مصنوعی بگویید: «من می‌خواهم یک اسکیل برای خلاصه‌سازی جلسات بسازم که خروجی را در ۴ بخش خلاصه مدیریتی، مصوبات قطعی، جدول تسک‌ها و هشدار اعداد تاییدنشده تولید کند؛ فایل استاندارد SKILL.md آن را برایم بنویس.»',
    keyTakeawayFa: 'هوش مصنوعی بهترین نویسنده فایل SKILL.md است؛ شما فقط قوانین کسب‌وکار و قالب دلخواهتان را به او بگویید.',
    badgeFa: 'کارگاه عملی'
  },
  {
    stepNumber: 'گام ۰۶',
    titleFa: 'کالبدشکافی کامل: داخل فایل SKILL.md چه چیزهایی نوشته می‌شود؟',
    titleEn: 'What’s Inside the SKILL.md File?',
    summaryFa: 'بررسی خط‌به‌خط ساختار YAML Frontmatter (نام و شرط فعال‌سازی)، مراحل کاری، قالب خروجی و قوانین مدیریت خطا.',
    deepDiveFa:
      'هر فایل SKILL.md از دو بخش تشکیل می‌شود:\n۱) سرصفحه YAML (بین دو خط ---) شامل name و description. بخش description حیاتی‌ترین قسمت است چون به مدل می‌گوید دقیقاً چه زمانی باید این اسکیل را به صورت خودکار روشن کند.\n۲) بدنه Markdown شامل نقش، گام‌های پردازش، قالب اجباری خروجی و قوانین موارد مرزی (Edge Cases).',
    keyTakeawayFa: 'اگر اسکیل شما خودکار فعال نمی‌شود، علت آن مبهم بودن خط description در بالای فایل SKILL.md است!',
    badgeFa: 'ساختار SKILL.md'
  },
  {
    stepNumber: 'گام ۰۷',
    titleFa: 'در چه کارهایی بیشترین بازدهی را ایجاد می‌کند؟',
    titleEn: 'Where Skills Yield the Highest ROI',
    summaryFa: 'شناسایی فرآیندهای پرتکرار و استانداردپذیر سازمانی (گزارش جلسات، ممیزی قرارداد، کنترل اضافه‌کاری، ایمیل‌های رسمی).',
    deepDiveFa:
      'بهترین کاندیداها برای تبدیل شدن به Skill عبارت‌اند از: ۱) تبدیل یادداشت‌های خام جلسه به صورت‌جلسه رسمی، ۲) ممیزی گزارش کارکرد و اضافه‌کاری کارگاه با سقف‌های مجاز، ۳) بررسی ادعاها و نامه‌های قراردادی بر اساس بندهای پیمان، و ۴) تولید گزارش‌های هفتگی مدیریت با فرمت ثابت.',
    keyTakeawayFa: 'هر جا که «قالب خروجی ثابت» و «چک‌لیست قوانین کنترل کیفیت» دارید، ساخت Skill بازدهی شما را ۱۰ برابر می‌کند.',
    badgeFa: 'کاربردهای طلایی'
  },
  {
    stepNumber: 'گام ۰۸',
    titleFa: 'تست عملی ۱: آزمایش اسکیل با یک جلسه عادی و استاندارد',
    titleEn: 'Test 1: Normal Meeting Session',
    summaryFa: 'بررسی نحوه تشخیص خودکار اسکیل توسط هوش مصنوعی و تولید خروجی ساختاریافته بر اساس متن جلسه.',
    deepDiveFa:
      'پس از بارگذاری فایل SKILL.md، در یک چت جدید حتی نیازی نیست نام اسکیل را ببرید؛ به محض اینکه متن پیاده‌سازی‌شده یک جلسه را ارسال کنید، مدل از روی Description متوجه می‌شود باید اسکیل خلاصه‌ساز جلسات را فراخوانی کند و خروجی را مو‌به‌مو طبق جدول و سرفصل‌های تعریف‌شده تحویل می‌دهد.',
    keyTakeawayFa: 'در تست اول بررسی کنید که آیا مدل بدون یادآوری شما، تمام سرفصل‌ها و جدول Action Items را دقیقاً طبق قالب ساخته است یا خیر.',
    badgeFa: 'تست سناریوی ۱'
  },
  {
    stepNumber: 'گام ۰۹',
    titleFa: 'تست عملی ۲: تله اعداد تاییدنشده (The Unverified Numbers Trap)',
    titleEn: 'Test 2: The Unverified Numbers Trap',
    summaryFa: 'نحوه واکنش هوشمندانه اسکیل وقتی در جلسه اعداد حدسی و غیرقطعی («فکر کنم حدود ۴۰ درصد...») مطرح می‌شود.',
    deepDiveFa:
      'یک پرامپت معمولی وقتی در متن جلسه می‌بیند «فکر کنم حدود ۴۰٪ رشد داشتیم»، آن را به عنوان فکت قطعی در گزارش نهایی می‌نویسد و باعث خطای مدیریتی می‌شود! اما در اسکیل استاندارد، ما قانون «تله اعداد تاییدنشده» را قرار می‌دهیم تا هر عدد حدسی را جدا کرده و جلوی آن برچسب [نیازمند راستی‌آزمایی ⚠️] بزند.',
    keyTakeawayFa: 'عیار واقعی یک Skill حرفه‌ای در تست سناریوهای مبهم (تله اعداد حدسی و تسک‌های بدون مسئول مشخص) مشخص می‌شود.',
    badgeFa: 'تست ضدتوهم ۲'
  },
  {
    stepNumber: 'گام ۱۰',
    titleFa: 'استفاده از همان SKILL.md در Claude، ChatGPT، Codex و Gemini',
    titleEn: 'Using Skills Across Claude, Codex, ChatGPT & Gemini',
    summaryFa: 'استاندارد باز (Open Standard): چطور یک بار SKILL.md بنویسیم و در تمام مدل‌ها و ابزارهای روز استفاده کنیم.',
    deepDiveFa:
      'فرمت SKILL.md یک استاندارد باز و جهانی است. همان فایلی که برای Claude می‌سازید، بدون هیچ تغییری در ChatGPT (بخش Projects یا Codex)، در Google Gemini (بخش Gems) و در ابزارهای مهندسی مثل Cursor و Claude Code قابل استفاده است.',
    keyTakeawayFa: 'با نوشتن اسکیل به فرمت استاندارد SKILL.md، دانش سازمانی شما به هیچ شرکت یا مدل خاصی قفل نمی‌شود.',
    badgeFa: 'مولتی‌پلتفرم'
  },
  {
    stepNumber: 'گام ۱۱',
    titleFa: 'کجا نباید Skill بسازیم؟ + نکات حیاتی امنیتی',
    titleEn: 'Where NOT to Build a Skill + Security Best Practices',
    summaryFa: 'خطرات دانلود اسکیل‌های ناشناس از اینترنت (Prompt Injection) و مواردی که پرامپت ساده کافی است.',
    deepDiveFa:
      'برای کارهای یک‌بارمصرف یا طوفان فکری خلاقانه و آزاد، اسکیل نسازید چون قالب‌های سفت‌وسخت اسکیل خلاقیت مدل را محدود می‌کند. همچنین از نظر امنیتی، هرگز پکیج اسکیل‌های ناشناس اینترنتی را بدون مطالعه متن داخل SKILL.md و اسکریپت‌های آن در اکانت کاری خود آپلود نکنید.',
    keyTakeawayFa: 'هرگز رمز عبور، کلید API یا اطلاعات محرمانه را داخل فایل SKILL.md قرار ندهید و اسکیل‌های دانلودی را قبل از نصب بازبینی کنید.',
    badgeFa: 'امنیت و خطوط قرمز'
  },
  {
    stepNumber: 'گام ۱۲',
    titleFa: 'جمع‌بندی و نقشه راه شروع سریع از امروز',
    titleEn: 'Conclusion: Where to Start Today',
    summaryFa: 'چک‌لیست پایانی برای انتخاب اولین تسک تکراری روزانه و تبدیل آن به اولین SKILL.md شخصی یا سازمانی.',
    deepDiveFa:
      'برای شروع نیازی نیست ده‌ها اسکیل بسازید. همین امروز فقط ۱ کار تکراری که هر هفته وقت شما را می‌گیرد انتخاب کنید، با «کارگاه تعاملی اسکیل‌ساز» در پایین همین صفحه فایل SKILL.md آن را تولید و دانلود کنید و با دو سناریوی عادی و تله آن را محک بزنید.',
    keyTakeawayFa: 'از ۱ اسکیل کوچک و متمرکز شروع کنید، روی ورودی‌های واقعی تست کنید و به مرور کتابخانه مهارت‌های واحد خود را بسازید.',
    badgeFa: 'جمع‌بندی اجرایی'
  }
];

const READY_SKILLS: ReadySkillPackage[] = [
  {
    id: 'skill_meeting_summarizer',
    name: 'meeting-summarizer',
    titleFa: '۱. اسکیل خلاصه‌ساز هوشمند جلسات (پروژه مرجع آموزش)',
    titleEn: '1. Smart Meeting Summarizer Skill',
    badgeFa: 'پروژه مرجع کارگاه',
    triggerWhenFa: 'هر زمان کاربر متن پیاده‌سازی‌شده جلسه (Transcript)، یادداشت‌های خام جلسه یا صورت‌جلسه را ارسال کرد.',
    skillMdContent: `---
name: meeting-summarizer
description: تبدیل یادداشت‌های خام یا متن پیاده‌سازی‌شده جلسات (Meeting Transcripts) به صورت‌جلسه اجرایی استاندارد همراه با راستی‌آزمایی اعداد و استخراج مصوبات. هر زمان کاربر متن جلسه، یادداشت جلسه یا درخواست خلاصه‌سازی جلسه داد، از این اسکیل استفاده کن.
---

# دستورالعمل اجرایی اسکیل خلاصه‌ساز جلسات (Meeting Summarizer SOP)

## ۱. هدف و نقش
تو یک دبیر اجرایی ارشد و ممیز دقیق جلسات سازمانی هستی. وظیفه تو تبدیل یادداشت‌های پراکنده یا متن پیاده‌سازی‌شده جلسه به یک گزارش مدیریتی شفاف، بدون تعارف و ۱۰۰٪ مستند است.

## ۲. مراحل پردازش ورودی (Workflow)
1. ابتدا کل متن جلسه را بخوان و هدف اصلی جلسه و حاضرین را شناسایی کن.
2. تصمیمات قطعی (Decisions) را از پیشنهادات خام و بحث‌های ناتمام تفکیک کن.
3. تمام اعداد، ارقام، بودجه‌ها و درصدهای مطرح‌شده در جلسه را از نظر «قطعی بودن» یا «حدسی بودن» بررسی کن.
4. وظایف و اقدامات بعدی (Action Items) را به همراه فرد مسئول و مهلت زمانی استخراج کن.

## ۳. قالب اجباری خروجی (Strict Output Template)
خروجی را همیشه دقیقاً با ساختار زیر و به زبان فارسی رسمی تولید کن:

### 📌 ۱. خلاصه مدیریتی (حداکثر ۳ خط)
- چکیده اصلی‌ترین دستاورد جلسه.

### ✅ ۲. مصوبات و تصمیمات قطعی
- لیست تصمیماتی که در جلسه نهایی و تایید شدند.

### 📊 ۳. جدول اقدامات عملیاتی (Action Items)
| ردیف | شرح اقدام / تسک | مسئول پیگیری | مهلت انجام (Deadline) | وضعیت قطعیت |
| :--- | :--- | :--- | :--- | :--- |

### ⚠️ ۴. هشدار داده‌ها و اعداد تاییدنشده (Unverified Numbers & Traps)
- هرگونه آمار، رقم مالی یا زمانی که در جلسه با عبارات حدسی (مثل «فکر کنم»، «حدوداً»، «احتمالاً»، «یادم نیست») بیان شده را در این بخش لیست کن و جلوی آن بنویس: **[نیازمند راستی‌آزمایی و تایید مکتوب ⚠️]**.

## ۴. قوانین خط قرمز و مدیریت موارد مرزی (Edge Cases)
- **قانون طلایی تله اعداد (Unverified Numbers Trap):** هرگز اعدادی که سخنران نسبت به آن‌ها تردید دارد را در بخش مصوبات قطعی وارد نکن.
- **مسئول نامشخص:** اگر برای یک تسک در جلسه مسئولی تعیین نشده بود، هرگز نامی را حدس نزن؛ در ستون مسئول بنویس: \`[تعیین‌نشده - نیازمند تعیین مالک]\`.
- **حداکثر طول:** گزارش باید اسکن‌پذیر (Scannable) و عاری از حاشیه‌گویی‌های غیرمرتبط جلسه باشد.`,
    test1NormalTitleFa: 'تست ۱: جلسه عادی و استاندارد با اطلاعات شفاف',
    test1NormalPromptFa: `متن یادداشت جلسه امروز کمیته فنی پروژه:
«جلسه در تاریخ ۱۵ آبان با حضور مهندس رضایی (مدیر پروژه)، خانم احمدی (مسئول خرید) و مهندس کریمی (سرپرست کارگاه) برگزار شد.
در خصوص خرید کابل‌های فشار قوی، مصوب شد خانم احمدی حداکثر تا تاریخ ۲۰ آبان استعلام قیمت نهایی را از ۳ تامین‌کننده مجاز دریافت و قرارداد خرید به مبلغ قطعی ۴.۲ میلیارد تومان را نهایی کند.
همچنین مهندس کریمی متعهد شد تا روز پنجشنبه ۱۸ آبان، گزارش تست مقاومت بتن ایستگاه مرکزی را تحویل دفتر فنی دهد. جلسه بعدی روز شنبه ساعت ۱۰ صبح برگزار می‌شود.»`,
    test2TrapTitleFa: 'تست ۲: تله اعداد تاییدنشده (Unverified Numbers Trap)',
    test2TrapPromptFa: `متن پیاده‌سازی‌شده جلسه بررسی عملکرد ماهانه:
«مهندس کاظمی: بچه‌ها خسته نباشید. این ماه کمپین جدید رو رفتیم؛ راستش عدد دقیقش الان جلوی چشمم نیست ولی فکر کنم حدود ۴۰ یا ۴۵ درصد بازدهی تیم بالا رفته و احتمالاً نزدیک ۲ میلیارد تومان هم صرفه‌جویی داشتیم، البته مالی هنوز تاییدش نکرده.
خانم مرادی: بله، برای فاز بعدی هم باید سرورها رو ارتقا بدیم که یکی از بچه‌های فنی باید پیگیری کنه ولی هنوز نگفتیم کی مسئولشه و تا کی باید انجام بشه.»`,
    expectedTrapBehaviorFa:
      'اسکیل نباید عدد «۴۰ تا ۴۵ درصد» و «۲ میلیارد تومان» را به عنوان دستاورد قطعی ثبت کند، بلکه باید آن‌ها را در بخش «⚠️ هشدار داده‌ها و اعداد تاییدنشده» با برچسب [نیازمند راستی‌آزمایی ⚠️] قرار دهد و مسئول ارتقای سرور را [تعیین‌نشده] درج کند!'
  },
  {
    id: 'skill_hr_contract_auditor',
    name: 'hr-overtime-contract-auditor',
    titleFa: '۲. اسکیل ممیزی اضافه‌کاری و تعهدات رفاهی پیمان (پروژه مترو خط ایکس)',
    titleEn: '2. HR Overtime & Camp Welfare Contract Auditor Skill (Metro Line X)',
    badgeFa: 'ویژه منابع انسانی و اداری',
    triggerWhenFa: 'هر زمان کاربر گزارش ساعت‌زنی کارگاه، درخواست شب‌کاری یا وضعیت متراژ کمپ کارگاهی را ارسال کرد.',
    skillMdContent: `---
name: hr-overtime-contract-auditor
description: ممیزی هوشمند کارکرد و اضافه‌کاری پرسنل کارگاه، کنترل مهلت اطلاع‌رسانی شب‌کاری (بند ۴۲-۱) و بررسی انطباق امکانات رفاهی کمپ کارگاهی (ماده ۲۰-ح و صفحه ۵۴ قرارداد پروژه مترو خط ایکس).
---

# دستورالعمل اجرایی اسکیل ممیزی منابع انسانی و کارگاهی (HR & Admin Compliance SOP)

## ۱. قوانین و سقف‌های مرجع (Ground-Truth Rules)
1. **سقف مجاز اضافه‌کاری داخلی سازمان پیمانکار:**
   - پرسنل ستادی: حداکثر ۵۰ ساعت در ماه
   - دفتر فنی: حداکثر ۶۵ ساعت (با مجوز ویژه ۸۰ ساعت)
   - کارگاه‌های ایستگاهی: حداکثر ۸۵ ساعت در ماه
   - عملیات حفاری مکانیزه TBM (به دلیل ماهیت شبانه‌روزی ماده ۲۵ شرایط خصوصی): حداکثر ۱۰۰ ساعت در ماه
2. **خط قرمز ایمنی (HSE Fatigue Red-Line):**
   - بیش از ۱۱۰ ساعت اضافه‌کاری در ماه یا بیش از ۱۴ روز کار متوالی بدون استراحت، تخلف بحرانی ایمنی است.
3. **الزام قراردادی اطلاع‌رسانی به مهندس مشاور (بند ۴۲-۱ ضمیمه شرایط خصوصی):**
   - کار شبانه در ایستگاه‌ها: نیازمند اطلاع‌رسانی کتبی حداقل **۱ هفته (۷ روز) قبل** به مهندس مشاور و مدیر طرح.
   - اضافه‌کاری در ساعات روز: نیازمند اطلاع‌رسانی حداقل **۲۴ ساعت قبل**.
   - استثنا: عملیات حفاری مکانیزه TBM طبق ماده ۲۵ ذاتاً شبانه‌روزی است.
   - ملاک تایید حضور نفرات طبق ماده ۲۵: فقط **لیست بیمه ممهور به مهر سازمان تأمین اجتماعی** + حضور الزامی افسر HSE (بند ۹-۱۲).

## ۲. قالب خروجی ممیزی
در هر بررسی، خروجی را در ۳ بخش ارائه کن:
1. **جدول انحرافات کارکرد و ریسک خستگی HSE** (با وضعیت 🟢 منطبق / 🟡 انحراف داخلی / 🔴 تخلف بحرانی یا قراردادی).
2. **ریسک مالی و قراردادی بند ۴۲-۱** (محاسبه ساعاتی که به علت عدم ارسال نامه در مهلت ۷ روزه یا ۲۴ ساعته در معرض رد شدن توسط مهندس مشاور هستند).
3. **پیش‌نویس اقدام اصلاحی یا اخطاریه رسمی** به سرپرست کارگاه با استناد دقیق به شماره ماده و بند پیمان.`,
    test1NormalTitleFa: 'تست ۱: بررسی کارکرد شیفت TBM و ایستگاه دارای مجوز',
    test1NormalPromptFa: `گزارش کارکرد مهرماه جبهه حفاری مکانیزه TBM غربی:
میانگین اضافه‌کاری تکنسین‌ها ۹۴ ساعت در ماه بوده، حداکثر روزهای کار متوالی ۱۲ روز است، افسر HSE در تمام شیفت‌های شب حضور داشته و لیست بیمه مهرماه ممهور به مهر تأمین اجتماعی ارسال شده است. لطفاً وضعیت انطباق را بررسی کن.`,
    test2TrapTitleFa: 'تست ۲: تله شب‌کاری بدون مجوز ۱ هفته قبل و نقض خط قرمز ایمنی',
    test2TrapPromptFa: `گزارش کارکرد مهرماه ایستگاه مرکزی (کد S-01):
تکنسین‌های اجرایی به طور میانگین ۱۰۵ ساعت اضافه‌کاری ثبت کرده‌اند و ۱۸ روز متوالی بدون روز استراحت کار کرده‌اند. همچنین ۴۰ ساعت از این کارکرد مربوط به شب‌کاری بتن‌ریزی بوده که سرپرست کارگاه فقط ۲ روز قبل به صورت تلفنی به مهندس مشاور الف اطلاع داده است!`,
    expectedTrapBehaviorFa:
      'اسکیل باید فوراً وضعیت 🔴 قرمز اعلام کند: ۱) نقض سقف ۸۵ ساعت ایستگاهی، ۲) نقض خط قرمز HSE (۱۸ روز کار متوالی > ۱۴ روز)، و ۳) ریسک رد شدن کل ۴۰ ساعت شب‌کاری طبق بند ۴۲-۱ به دلیل اطلاع‌رسانی تلفنی ۲ روز قبل به جای نامه کتبی ۷ روز قبل!'
  },
  {
    id: 'skill_contract_claim_auditor',
    name: 'epc-contract-claim-auditor',
    titleFa: '۳. اسکیل ممیزی ادعا، تاخیرات مجاز و لایحه‌نویسی قراردادی (ماده ۳۰ / فیدیک)',
    titleEn: '3. EPC Contract Claim & Excusable Delay Auditor Skill (Clause 30 / FIDIC)',
    badgeFa: 'ویژه دفتر فنی و قراردادها',
    triggerWhenFa: 'هر زمان کاربر مستندات تاخیر، معارض تاسیساتی، تاخیر ابلاغ نقشه یا درخواست تمدید مدت پیمان را مطرح کرد.',
    skillMdContent: `---
name: epc-contract-claim-auditor
description: تحلیل حقوقی و فنی ادعاهای پیمانکاری (Claims)، بررسی تاخیرات مجاز و همپوشان (ماده ۳۰ نشریه ۴۳۱۱ و بند ۸.۴ / ۲۰.۱ فیدیک) و تدوین لایحه دفاعیه مستند.
---

# دستورالعمل اجرایی اسکیل ممیزی ادعا و تاخیرات پیمان (Contract Claims SOP)

## ۱. چک‌لیست الزامی پیش از پذیرش هر ادعا
1. **کنترل مهلت اخطار (Time-Bar Audit):** بررسی کن آیا پیمانکار ظرف مهلت قانونی (۲۱ روز در شرایط عمومی پیمان / ۲۸ روز در بند ۲۰.۱ فیدیک) اخطار کتبی اولیه را ثبت کرده است یا خیر.
2. **تحلیل مسیر بحرانی (Critical Path):** آیا فعالیت متوقف‌شده روی مسیر بحرانی برنامه زمان‌بندی مصوب (Baseline CPM) قرار داشته است؟
3. **بررسی تاخیرات همپوشان (Concurrent Delays):** آیا هم‌زمان با قصور کارفرما (مثلاً تاخیر نقشه یا معارض)، پیمانکار نیز دچار کمبود ماشین‌آلات یا نیروی انسانی بوده است؟

## ۲. قالب خروجی استاندارد
1. **جدول ارزیابی حقوقی ادعا:** [موضوع تاخیر | ماده قراردادی | وضعیت اخطار | اثر روی مسیر بحرانی | نوع تاخیر (مجاز با هزینه / مجاز بدون هزینه / غیرمجاز)].
2. **نقاط ضعف پرونده (تله‌های رد ادعا توسط مشاور):** هر مدرکی که در متن کاربر کسری دارد (مثل صورت‌جلسه امضاشده کارگاهی یا گزارش روزانه) را با علامت ⚠️ گوشزد کن.
3. **پیش‌نویس نامه رسمی ادعا (Claim Notice Letter):** با ادبیات حقوقی و مهندسی.`,
    test1NormalTitleFa: 'تست ۱: تاخیر تحویل زمین با اخطار کتبی به‌موقع',
    test1NormalPromptFa: `در پروژه احداث ایستگاه مترو، کارفرما تحویل زمین شفت شمالی را که روی مسیر بحرانی قرار داشت ۳۰ روز به تاخیر انداخت. ما در روز پنجم وقوع مانع، طی نامه رسمی شماره ۱۴۰۳/۱۰۸ اخطار تاخیر را به مهندس مشاور ابلاغ کردیم و ماشین‌آلات ما در کارگاه آماده به کار بودند (ثبت در گزارش روزانه امضاشده).`,
    test2TrapTitleFa: 'تست ۲: تله تاخیر همپوشان و عدم ارسال اخطار در مهلت قانونی',
    test2TrapPromptFa: `کارفرما نقشه‌های اجرایی فونداسیون را ۲۵ روز دیرتر ابلاغ کرد. البته ما هیچ نامه اخطاری در آن ماه نفرستادیم و ۳ ماه بعد یادمان افتاد ادعا کنیم! ضمناً در همان ۲۵ روز، دستگاه بچینگ بتن ما هم خراب بود و سیمان در کارگاه نداشتیم.`,
    expectedTrapBehaviorFa:
      'اسکیل باید هشدار سقوط حق ادعا (Time-Bar) به دلیل عدم ارسال اخطار در مهلت قانونی و همچنین وجود «تاخیر همپوشان پیمانکار (خرابی بچینگ و نبود سیمان)» را صادر کند و مانع از ارسال لایحه خام و ردشدنی شود.'
  }
];

export const ObsidianBrainSkillsWorkshop: React.FC<ObsidianBrainSkillsWorkshopProps> = ({
  lang,
  copyToClipboard,
  copiedId,
  onLoadToSandbox
}) => {
  const [subTab, setSubTab] = useState<'agent_skills' | 'obsidian_vault' | 'mcp_protocol'>('agent_skills');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [activeObsidianStepIdx, setActiveObsidianStepIdx] = useState<number>(0);
  const [activeMcpStepIdx, setActiveMcpStepIdx] = useState<number>(0);
  const [projectorDeck, setProjectorDeck] = useState<'skills' | 'obsidian' | 'mcp' | null>(null);
  const [selectedSkillId, setSelectedSkillId] = useState<string>(READY_SKILLS[0].id);

  // Interactive Custom SKILL.md Builder state
  const [customName, setCustomName] = useState<string>('weekly-site-report-checker');
  const [customDesc, setCustomDesc] = useState<string>(
    'بررسی و استانداردسازی گزارش‌های هفتگی کارگاه و استخراج مغایرت‌های برنامه زمان‌بندی. هر زمان کاربر گزارش هفتگی یا متن وضعیت کارگاه را فرستاد از این اسکیل استفاده کن.'
  );
  const [customSteps, setCustomSteps] = useState<string>(
    '۱. مقایسه درصد پیشرفت واقعی با برنامه مصوب\n۲. استخراج ۳ گلوگاه اصلی توقفات کارگاه\n۳. بررسی صحت اعداد و ارقام مصرف مصالح و نفر-ساعت'
  );
  const [customOutputFormat, setCustomOutputFormat] = useState<string>(
    '۱. خلاصه مدیریتی (۳ بولت‌پوینت)\n۲. جدول مغایرت‌های پیشرفت فیزیکی\n۳. لیست هشدارهای ایمنی و قراردادی'
  );
  const [customTrapRule, setCustomTrapRule] = useState<string>(
    'اگر در گزارش کارگاه عددی بدون مستندات صورت‌جلسه یا به صورت تخمینی («حدوداً»، «فکر کنم») درج شده بود، آن را در جدول قطعی وارد نکن و با برچسب [نیازمند راستی‌آزمایی ⚠️] جداگانه گزارش ده.'
  );

  const activeReadySkill =
    READY_SKILLS.find((s) => s.id === selectedSkillId) || READY_SKILLS[0];

  const currentModule = CURRICULUM_MODULES[activeStepIndex] || CURRICULUM_MODULES[0];

  const generatedCustomSkillMd = `---
name: ${customName.trim() || 'custom-ai-skill'}
description: ${customDesc.trim()}
---

# دستورالعمل اجرایی اسکیل (${customName.trim() || 'custom-ai-skill'})

## ۱. مراحل گام‌به‌گام پردازش (Workflow Steps)
${customSteps.trim()}

## ۲. قالب اجباری خروجی (Strict Output Format)
${customOutputFormat.trim()}

## ۳. قوانین ضدتوهم و مدیریت تله‌های خطا (Edge Cases & Traps)
- ${customTrapRule.trim()}
- در صورت نبود اطلاعات کافی برای هر بخش، هرگز حدس نزن و عبارت \`[اطلاعات در متن ورودی ذکر نشده]\` را درج کن.`;

  const metaSkillBuilderPrompt = `تو یک معمار ارشد سیستم‌های هوش مصنوعی و متخصص استاندارد جهانی SKILL.md هستی.
من می‌خواهم یک Skill اختصاصی برای کار تکرارشونده زیر بسازم تا دیگر مجبور نباشم هر بار پرامپت طولانی بنویسم:

[شرح کار تکراری من: مثلاً خلاصه‌سازی جلسات هفتگی / یا ممیزی گزارش اضافه‌کاری کارگاه / یا تبدیل یادداشت‌های پراکنده به نامه رسمی اداری]

لطفاً یک فایل کامل و استاندارد \`SKILL.md\` برای من تولید کن که دقیقاً شامل ۵ بخش زیر باشد:
1. بخش YAML Frontmatter در بالای فایل شامل \`name\` (با حروف کوچک و خط تیره) و \`description\` بسیار دقیق که مشخص کند هوش مصنوعی در چه شرایطی باید به صورت خودکار این اسکیل را فعال کند.
2. تعریف نقش و هدف دقیق اسکیل (Role & Objective).
3. مراحل گام‌به‌گام پردازش ورودی (Step-by-Step Workflow).
4. قالب خروجی ثابت و ساختاریافته (Strict Output Template) با جداول و تیترهای مشخص.
5. قوانین مدیریت موارد مرزی و تله‌های ضدتوهم (Edge Cases & Anti-Hallucination Traps)؛ به‌ویژه قانون «تله اعداد تاییدنشده» (اگر عددی حدسی یا غیرقطعی بود، با برچسب [نیازمند راستی‌آزمایی ⚠️] مشخص شود و به عنوان فکت قطعی ثبت نگردد).`;

  const handleDownloadSkillFile = (fileName: string, content: string) => {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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

  const dailyPrompt = `فایل CLAUDE.md و پوشه 01_Projects والت من در Obsidian رو بررسی کن و بگو امروز بر اساس اولویت‌ها روی کدام ۳ تسک کلیدی باید تمرکز کنم؟ پاسخ رو در یک جدول جمع‌وجور بنویس.`;
  const ideaCapturePrompt = `این ایده رو به عنوان یک یادداشت جدید در پوشه 03_Resources والت Obsidian من با نام مناسب ذخیره کن. در ابتدای فایل فرانت‌متر شامل تگ‌های مرتبط و تاریخ امروز رو بذار و به یادداشت‌های مرتبط قبلی با فرمت [[نام یادداشت]] لینک بده:\n\n[متن ایده یا نکته جدید خود را اینجا قرار دهید]`;
  const inboxCleanPrompt = `تمام یادداشت‌های داخل پوشه 00_Inbox والت Obsidian من رو بخون. متون ناقص یا غلط‌های املایی رو اصلاح کن و بر اساس موضوع، هر کدوم رو به پوشه مناسب خودش (01_Projects یا 03_Resources) منتقل کن و نتیجه رو به من گزارش بده.`;

  const topSectionRef = useRef<HTMLDivElement>(null);

  const render12StepKeycaps = (scrollToTopOnSelect: boolean) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
      {CURRICULUM_MODULES.map((mod, idx) => {
        const isCurrent = activeStepIndex === idx;
        return (
          <button
            key={mod.stepNumber}
            type="button"
            onMouseEnter={() => playTactileSound('hover')}
            onClick={() => {
              playTactileSound('thock');
              setActiveStepIndex(idx);
              if (scrollToTopOnSelect) {
                setTimeout(() => {
                  topSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 40);
              }
            }}
            className={`p-3 rounded-xl border border-b-4 text-right transition-all duration-100 cursor-pointer flex items-start gap-2 select-none active:translate-y-[2px] active:border-b ${
              isCurrent
                ? 'bg-gradient-to-b from-purple-600 to-purple-700 text-white border-purple-800 border-b-purple-950 shadow-md ring-2 ring-purple-500/25'
                : 'bg-gradient-to-b from-white to-[#f6f8f7] dark:from-[#1b232a] dark:to-[#131a1f] text-[#1c2830] dark:text-[#e8ebe9] border-black/10 dark:border-white/10 border-b-black/25 dark:border-b-black/60 hover:-translate-y-0.5 hover:border-purple-500/40 shadow-xs'
            }`}
          >
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded border shrink-0 mt-0.5 ${
                isCurrent
                  ? 'bg-white/20 text-white border-white/25'
                  : 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20'
              }`}
            >
              {mod.stepNumber}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-extrabold leading-snug line-clamp-2">{mod.titleFa}</div>
            </div>
          </button>
        );
      })}
    </div>
  );

  const currentObsidianStep =
    OBSIDIAN_SECOND_BRAIN_STEPS[activeObsidianStepIdx] || OBSIDIAN_SECOND_BRAIN_STEPS[0];

  const render13ObsidianKeycaps = (scrollToTopOnSelect: boolean) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
      {OBSIDIAN_SECOND_BRAIN_STEPS.map((st, idx) => {
        const isCurrent = activeObsidianStepIdx === idx;
        return (
          <button
            key={st.stepNumber}
            type="button"
            onMouseEnter={() => playTactileSound('hover')}
            onClick={() => {
              playTactileSound('thock');
              setActiveObsidianStepIdx(idx);
              if (scrollToTopOnSelect) {
                setTimeout(() => {
                  topSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 40);
              }
            }}
            className={`p-3 rounded-xl border border-b-4 text-right transition-all duration-100 cursor-pointer flex items-start gap-2 select-none active:translate-y-[2px] active:border-b ${
              isCurrent
                ? 'bg-gradient-to-b from-[#0d9488] to-[#0f766e] text-white border-[#115e59] border-b-[#042f2e] shadow-md ring-2 ring-[#0d9488]/25'
                : 'bg-gradient-to-b from-white to-[#f6f8f7] dark:from-[#1b232a] dark:to-[#131a1f] text-[#1c2830] dark:text-[#e8ebe9] border-black/10 dark:border-white/10 border-b-black/25 dark:border-b-black/60 hover:-translate-y-0.5 hover:border-[#0d9488]/40 shadow-xs'
            }`}
          >
            <div className="flex flex-col items-center gap-0.5 shrink-0 mt-0.5">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  isCurrent
                    ? 'bg-white/20 text-white border-white/25'
                    : 'bg-[#0d9488]/10 text-[#0d9488] dark:text-[#2dd4bf] border-[#0d9488]/20'
                }`}
              >
                {st.stepNumber}
              </span>
              <span
                dir="ltr"
                className={`text-[9px] font-mono ${isCurrent ? 'text-white/75' : 'text-[#5d6b73]'}`}
              >
                {st.keyHint}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-extrabold leading-snug line-clamp-2">{st.titleFa}</div>
            </div>
          </button>
        );
      })}
    </div>
  );

  const currentMcpStep =
    MCP_MASTERCLASS_STEPS[activeMcpStepIdx] || MCP_MASTERCLASS_STEPS[0];

  const render12McpKeycaps = (scrollToTopOnSelect: boolean) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
      {MCP_MASTERCLASS_STEPS.map((st, idx) => {
        const isCurrent = activeMcpStepIdx === idx;
        return (
          <button
            key={st.stepNumber}
            type="button"
            onMouseEnter={() => playTactileSound('hover')}
            onClick={() => {
              playTactileSound('thock');
              setActiveMcpStepIdx(idx);
              if (scrollToTopOnSelect) {
                setTimeout(() => {
                  topSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 40);
              }
            }}
            className={`p-3 rounded-xl border border-b-4 text-right transition-all duration-100 cursor-pointer flex items-start gap-2 select-none active:translate-y-[2px] active:border-b ${
              isCurrent
                ? 'bg-gradient-to-b from-blue-600 to-blue-700 text-white border-blue-800 border-b-blue-950 shadow-md ring-2 ring-blue-500/25'
                : 'bg-gradient-to-b from-white to-[#f6f8f7] dark:from-[#1b232a] dark:to-[#131a1f] text-[#1c2830] dark:text-[#e8ebe9] border-black/10 dark:border-white/10 border-b-black/25 dark:border-b-black/60 hover:-translate-y-0.5 hover:border-blue-500/40 shadow-xs'
            }`}
          >
            <div className="flex flex-col items-center gap-0.5 shrink-0 mt-0.5">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  isCurrent
                    ? 'bg-white/20 text-white border-white/25'
                    : 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20'
                }`}
              >
                {st.stepNumber}
              </span>
              <span
                dir="ltr"
                className={`text-[9px] font-mono ${isCurrent ? 'text-white/75' : 'text-[#5d6b73]'}`}
              >
                {st.keyHint}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-extrabold leading-snug line-clamp-2">{st.titleFa}</div>
            </div>
          </button>
        );
      })}
    </div>
  );

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div ref={topSectionRef} className="scroll-mt-4 space-y-4 border-b border-[#d9dad5] dark:border-[#2d3942] pb-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-[#7c3aed]/20 via-[#0d9488]/20 to-[#2563eb]/20 text-[#7c3aed] dark:text-[#a78bfa] border border-[#7c3aed]/30 shadow-xs shrink-0">
              <Workflow className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                  ۱. استاندارد جهانی SKILL.md
                </span>
                <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                  ۲. مغز دوم Obsidian + Claude + Hermes
                </span>
                <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30">
                  ۳. باکس تفکیک‌شده پروتکل MCP
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-black text-[#1c2830] dark:text-[#e8ebe9] mt-1">
                {lang === 'fa'
                  ? 'بخش ۸: مسترکلاس جامع ساخت AI Skills + راه‌اندازی «مغز دوم» در Obsidian (و باکس مجزای MCP)'
                  : 'Section 8: Comprehensive AI Skills Masterclass + Obsidian Second Brain & Standalone MCP Box'}
              </h2>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mt-0.5">
                {lang === 'fa'
                  ? 'شامل: ۱) کارگاه ساخت مهارت‌های دائمی (SKILL.md) · ۲) آموزش کامل ۱۳ فصلی ساخت حافظه دائمی رایگان برای هوش مصنوعی با Obsidian، Claude و Hermes · ۳) باکس تفکیک‌شده پروتکل MCP'
                  : 'Includes: 1) SKILL.md Masterclass · 2) 13-Chapter Obsidian + Claude + Hermes Permanent AI Memory Course · 3) Dedicated MCP Box'}
              </p>
            </div>
          </div>
        </div>

        {/* 3-Column Sub-Tabs Tactile Mechanical Keycaps Selector */}
        <div className="p-2.5 rounded-2xl bg-[#eef1f0] dark:bg-[#131b20] border border-black/[0.08] dark:border-white/[0.1] grid grid-cols-1 md:grid-cols-3 gap-2.5 shadow-inner">
          <button
            type="button"
            onMouseEnter={() => playTactileSound('hover')}
            onClick={() => {
              playTactileSound('thock');
              setSubTab('agent_skills');
            }}
            className={`p-3 rounded-xl text-right transition-all duration-100 cursor-pointer flex flex-col justify-between gap-1.5 border border-b-4 active:translate-y-[2px] active:border-b ${
              subTab === 'agent_skills'
                ? 'bg-gradient-to-b from-purple-600 to-purple-700 text-white border-purple-800 border-b-purple-950 shadow-md ring-2 ring-purple-500/25'
                : 'bg-gradient-to-b from-white to-[#f6f8f7] dark:from-[#1d262d] dark:to-[#161d23] text-[#1c2830] dark:text-[#e8ebe9] border-black/10 dark:border-white/10 border-b-black/25 dark:border-b-black/60 hover:-translate-y-0.5'
            }`}
          >
            <div className="flex items-center justify-between gap-2 w-full">
              <div className="flex items-center gap-1.5 font-black text-xs">
                <Workflow className="w-4 h-4 shrink-0" />
                <span>
                  {lang === 'fa'
                    ? '۱. مسترکلاس جامع ساخت AI Skills (کارگاه SKILL.md)'
                    : '1. AI Skills Masterclass (SKILL.md Lab)'}
                </span>
              </div>
              <span dir="ltr" className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${subTab === 'agent_skills' ? 'bg-white/20 text-white border-white/30' : 'bg-black/5 dark:bg-white/5 text-[#5d6b73] border-black/10'}`}>
                S1
              </span>
            </div>
            <div className={`text-[10px] ${subTab === 'agent_skills' ? 'text-white/85' : 'text-[#5d6b73] dark:text-[#9aa8b0]'}`}>
              ۱۲ گام استاندارد جهانی SKILL.md + آزمایشگاه تست تله‌ها + اسکیل‌ساز زنده
            </div>
          </button>

          <button
            type="button"
            onMouseEnter={() => playTactileSound('hover')}
            onClick={() => {
              playTactileSound('thock');
              setSubTab('obsidian_vault');
            }}
            className={`p-3 rounded-xl text-right transition-all duration-100 cursor-pointer flex flex-col justify-between gap-1.5 border border-b-4 active:translate-y-[2px] active:border-b ${
              subTab === 'obsidian_vault'
                ? 'bg-gradient-to-b from-[#0d9488] to-[#0f766e] text-white border-[#115e59] border-b-[#042f2e] shadow-md ring-2 ring-[#0d9488]/25'
                : 'bg-gradient-to-b from-white to-[#f6f8f7] dark:from-[#1d262d] dark:to-[#161d23] text-[#1c2830] dark:text-[#e8ebe9] border-black/10 dark:border-white/10 border-b-black/25 dark:border-b-black/60 hover:-translate-y-0.5'
            }`}
          >
            <div className="flex items-center justify-between gap-2 w-full">
              <div className="flex items-center gap-1.5 font-black text-xs">
                <Brain className="w-4 h-4 shrink-0" />
                <span>
                  {lang === 'fa'
                    ? '۲. راه‌اندازی «مغز دوم» با Obsidian + اتصال Claude و Hermes'
                    : '2. Obsidian Second Brain + Claude & Hermes'}
                </span>
              </div>
              <span dir="ltr" className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${subTab === 'obsidian_vault' ? 'bg-white/20 text-white border-white/30' : 'bg-black/5 dark:bg-white/5 text-[#5d6b73] border-black/10'}`}>
                S2
              </span>
            </div>
            <div className={`text-[10px] ${subTab === 'obsidian_vault' ? 'text-white/85' : 'text-[#5d6b73] dark:text-[#9aa8b0]'}`}>
              ۱۳ فصل کامل: ساخت Vault، تفاوت با Notion و NotebookLM، اتصال Claude و Hermes و رفع مشکل ویندوز
            </div>
          </button>

          <button
            type="button"
            onMouseEnter={() => playTactileSound('hover')}
            onClick={() => {
              playTactileSound('thock');
              setSubTab('mcp_protocol');
            }}
            className={`p-3 rounded-xl text-right transition-all duration-100 cursor-pointer flex flex-col justify-between gap-1.5 border border-b-4 active:translate-y-[2px] active:border-b ${
              subTab === 'mcp_protocol'
                ? 'bg-gradient-to-b from-blue-600 to-blue-700 text-white border-blue-800 border-b-blue-950 shadow-md ring-2 ring-blue-500/25'
                : 'bg-gradient-to-b from-white to-[#f6f8f7] dark:from-[#1d262d] dark:to-[#161d23] text-[#1c2830] dark:text-[#e8ebe9] border-black/10 dark:border-white/10 border-b-black/25 dark:border-b-black/60 hover:-translate-y-0.5'
            }`}
          >
            <div className="flex items-center justify-between gap-2 w-full">
              <div className="flex items-center gap-1.5 font-black text-xs">
                <Terminal className="w-4 h-4 shrink-0" />
                <span>
                  {lang === 'fa'
                    ? '۳. باکس تفکیک‌شده پروتکل MCP + ساخت MCP Server'
                    : '3. Standalone MCP Protocol & Server Lab'}
                </span>
              </div>
              <span dir="ltr" className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${subTab === 'mcp_protocol' ? 'bg-white/20 text-white border-white/30' : 'bg-black/5 dark:bg-white/5 text-[#5d6b73] border-black/10'}`}>
                S3
              </span>
            </div>
            <div className={`text-[10px] ${subTab === 'mcp_protocol' ? 'text-white/85' : 'text-[#5d6b73] dark:text-[#9aa8b0]'}`}>
              ۱۲ فصل کامل: معماری Host/Client/Server، ساخت سرور پایتون با FastMCP، تست با Inspector و اتصال به Claude و Cursor
            </div>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* SUB-TAB 1: COMPREHENSIVE AI SKILLS MASTERCLASS (INTERACTIVE LAB)      */}
      {/* ===================================================================== */}
      {subTab === 'agent_skills' && (
        <div className="space-y-6 animate-fadeIn">
          {/* 1. 12-STEP INTERACTIVE CURRICULUM ROADMAP (ALL-VISIBLE GRID, NO NESTED SCROLLBAR) */}
          <div className="p-1.5 rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.07] dark:border-white/[0.09] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="rounded-[calc(1.5rem-0.375rem)] bg-white dark:bg-[#161e24] p-5 sm:p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>نقشه راه ۱۲ گام استاندارد جهانی AI Skills</span>
                    </span>
                    <span className="text-[11px] font-semibold text-[#5d6b73] dark:text-[#9aa8b0]">
                      قابل اجرا در Claude · ChatGPT · Codex · Gemini
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa'
                      ? 'مسیر یادگیری گام‌به‌گام ساخت AI Skills از صفر تا صد (روی هر گام کلیک کنید):'
                      : 'Step-by-Step Learning Path: Building AI Skills from Scratch:'}
                  </h3>
                </div>

                <div className="flex items-center gap-2 flex-wrap shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      playTactileSound('thock');
                      setProjectorDeck('skills');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black flex items-center gap-1.5 border border-amber-700 border-b-[3px] border-b-amber-900 active:translate-y-[2px] active:border-b cursor-pointer shadow-xs"
                  >
                    <Monitor className="w-4 h-4" />
                    <span>حالت اسلاید پروژکتور (۱۲ اسلاید)</span>
                  </button>
                </div>
              </div>

              {/* Clean 4-Column All-Visible Tactile Keycap Grid of 12 Steps */}
              {render12StepKeycaps(false)}

              {/* Active Step Slide-Ready Multi-Column Presentation Card (No Nested Wall-of-Text!) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-purple-500/[0.07] via-white to-indigo-500/[0.05] dark:from-purple-950/30 dark:via-[#141c23] dark:to-indigo-950/25 border-2 border-purple-500/35 space-y-5">
                <div className="flex items-center justify-between gap-3 flex-wrap pb-3 border-b border-purple-500/20">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="px-3.5 py-1 rounded-xl bg-purple-600 text-white text-xs sm:text-sm font-black">
                      {currentModule.stepNumber} — {currentModule.badgeFa}
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#334155] dark:text-[#cbd5e1]" dir="ltr">
                      {currentModule.titleEn}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        playTactileSound('switch');
                        setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : CURRICULUM_MODULES.length - 1));
                      }}
                      className="px-3 py-1.5 rounded-xl text-xs font-black bg-white dark:bg-[#1d262d] text-[#0f172a] dark:text-white border border-black/15 border-b-[3px] border-b-black/30 active:translate-y-[2px] active:border-b cursor-pointer"
                    >
                      → گام قبلی
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playTactileSound('switch');
                        setActiveStepIndex((prev) => (prev < CURRICULUM_MODULES.length - 1 ? prev + 1 : 0));
                      }}
                      className="px-3 py-1.5 rounded-xl text-xs font-black bg-purple-600 text-white border border-purple-800 border-b-[3px] border-b-purple-950 active:translate-y-[2px] active:border-b cursor-pointer"
                    >
                      گام بعدی ←
                    </button>
                  </div>
                </div>

                <h4 className="text-lg sm:text-2xl font-black text-[#0f172a] dark:text-white leading-snug">
                  {currentModule.titleFa}
                </h4>

                {/* Multi-Column Scannable Slide Points */}
                {(() => {
                  const pts = currentModule.deepDiveFa
                    .split('\n\n')
                    .map((s) => s.trim())
                    .filter(Boolean);
                  return (
                    <div
                      className={`grid grid-cols-1 ${
                        pts.length === 2 ? 'lg:grid-cols-2' : pts.length >= 3 ? 'md:grid-cols-2 xl:grid-cols-3' : 'lg:grid-cols-1'
                      } gap-4`}
                    >
                      {pts.map((pt, pIdx) => {
                        const { heading, body } = splitPointTitleAndBody(pt);
                        return (
                          <div
                            key={pIdx}
                            className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#11171d] border border-purple-500/25 shadow-2xs space-y-2.5 flex flex-col justify-between"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center gap-2.5">
                                <span className="w-7 h-7 rounded-lg bg-purple-600 text-white font-mono text-xs font-black flex items-center justify-center shrink-0">
                                  {pIdx + 1}
                                </span>
                                <span className="text-sm sm:text-base font-black text-purple-800 dark:text-purple-300 leading-snug">
                                  {heading || `نکته کلیدی ${pIdx + 1}`}
                                </span>
                              </div>
                              <p className="text-sm sm:text-[15px] font-semibold text-[#0f172a] dark:text-[#f1f5f9] leading-relaxed">
                                {body}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}

                <div className="p-4 rounded-2xl bg-emerald-500/15 border-2 border-emerald-500/35 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-sm sm:text-base font-bold text-[#0f172a] dark:text-emerald-100 leading-relaxed">
                    <strong className="font-black text-emerald-800 dark:text-emerald-300">جمع‌بندی طلایی این گام: </strong>
                    {currentModule.keyTakeawayFa}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. THE GOLDEN TRIANGLE: PROMPT vs. SKILL vs. MCP */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161e24] border border-black/[0.08] dark:border-white/[0.1] shadow-2xs space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                <Layers className="w-5 h-5" />
                <h3 className="font-black text-sm sm:text-base text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa'
                    ? 'درس اول: تفاوت دقیق بین Prompt، Skill و پروتکل MCP چیست؟'
                    : 'Lesson 1: The Exact Difference Between a Prompt, a Skill, and MCP'}
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300">
                مهم‌ترین مفهوم معماری ایجنت‌ها در ۲۰۲۶
              </span>
            </div>

            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
              یکی از رایج‌ترین سردرگمی‌ها در کار با هوش مصنوعی، اشتباه گرفتن **پرامپت (Prompt)**، **اسکیل (Skill)** و **پروتکل MCP** است. با این مثال ملموس سازمانی، برای همیشه تفاوت این سه را به خاطر بسپارید:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: Prompt */}
              <div className="p-4 rounded-2xl bg-[#f8f9fa] dark:bg-[#12171b] border border-black/[0.06] dark:border-white/[0.08] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-black bg-blue-500/15 text-blue-700 dark:text-blue-300">
                    ۱. پرامپت (Prompt)
                  </span>
                  <span className="text-[10px] font-mono text-[#5d6b73]">دستور لحظه‌ای</span>
                </div>
                <h4 className="text-xs font-extrabold text-[#1c2830] dark:text-[#e8ebe9]">
                  «چه کاری را همین الان انجام بده؟»
                </h4>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  مثل توضیح شفاهی یک تسک به کارمند در همان لحظه است: *«این متن جلسه امروز را خلاصه کن»*. اگر فردا چت جدیدی باز کنید، هوش مصنوعی تمام نکات و قالب دلخواه شما را فراموش کرده است.
                </p>
              </div>

              {/* Card 2: Skill (SKILL.md) */}
              <div className="p-4 rounded-2xl bg-purple-500/[0.05] dark:bg-purple-500/[0.1] border-2 border-purple-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-black bg-purple-600 text-white">
                    ۲. اسکیل (SKILL.md) ⭐
                  </span>
                  <span className="text-[10px] font-mono text-purple-700 dark:text-purple-300 font-bold">مغز و روش انجام کار</span>
                </div>
                <h4 className="text-xs font-extrabold text-[#1c2830] dark:text-[#e8ebe9]">
                  «چگونه و با چه استانداردی کار را انجام بده؟»
                </h4>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  مثل **دفترچه شرح وظایف و آیین‌نامه استاندارد (SOP)** است که یک‌بار در فایل `SKILL.md` می‌نویسید. هوش مصنوعی فقط وقتی که موضوع مرتبط باشد به صورت خودکار آن را باز می‌کند و همیشه با یک کیفیت و قالب ثابت کار را تحویل می‌دهد.
                </p>
              </div>

              {/* Card 3: MCP */}
              <div className="p-4 rounded-2xl bg-[#f8f9fa] dark:bg-[#12171b] border border-black/[0.06] dark:border-white/[0.08] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-black bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                    ۳. پروتکل MCP
                  </span>
                  <span className="text-[10px] font-mono text-[#5d6b73]">دسترسی و ابزار</span>
                </div>
                <h4 className="text-xs font-extrabold text-[#1c2830] dark:text-[#e8ebe9]">
                  «به چه داده‌ها و نرم‌افزارهایی دسترسی داری؟»
                </h4>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  مثل **کابل شبکه و کارت تردد کارمند** به نرم‌افزارهای بیرونی (Google Drive، Gmail، تقویم، دیتابیس یا پوشه Obsidian) است. MCP خودش نمی‌داند چطور گزارش بنویسد؛ فقط دسترسی خواندن و نوشتن می‌دهد.
                </p>
              </div>
            </div>

            {/* Comparison Matrix */}
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-right text-xs border-collapse">
                <thead>
                  <tr className="bg-black/[0.03] dark:bg-white/[0.04] text-[#1c2830] dark:text-[#e8ebe9] font-bold border-b border-black/[0.08] dark:border-white/[0.1]">
                    <th className="p-2.5">ویژگی کلیدی</th>
                    <th className="p-2.5">پرامپت معمولی (Prompt)</th>
                    <th className="p-2.5 text-purple-700 dark:text-purple-300">اسکیل استاندارد (SKILL.md)</th>
                    <th className="p-2.5">پروتکل اتصال (MCP)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.05] dark:divide-white/[0.06] text-[#2c3840] dark:text-[#cfd6db]">
                  <tr>
                    <td className="p-2.5 font-bold">ماندگاری در حافظه</td>
                    <td className="p-2.5">موقت (محدود به همان یک چت)</td>
                    <td className="p-2.5 font-bold text-emerald-600 dark:text-emerald-400">دائمی و قابل استفاده در تمام چت‌ها</td>
                    <td className="p-2.5">دائمی (در سطح اتصال به سرویس)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">مصرف توکن و حافظه (Context)</td>
                    <td className="p-2.5">در صورت کپی مداوم، حافظه چت را پر می‌کند</td>
                    <td className="p-2.5 font-bold text-emerald-600 dark:text-emerald-400">بهینه (فقط هنگام نیاز فراخوانی می‌شود)</td>
                    <td className="p-2.5">فقط هنگام فراخوانی ابزار</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">نیاز به دانش فنی</td>
                    <td className="p-2.5">صفر (متن ساده)</td>
                    <td className="p-2.5 font-bold text-emerald-600 dark:text-emerald-400">صفر (یک فایل متنی ساده SKILL.md)</td>
                    <td className="p-2.5">متوسط (نیازمند تنظیم کانکتور یا JSON)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">قابلیت انتقال بین پلتفرم‌ها</td>
                    <td className="p-2.5">کپی-پیست دستی</td>
                    <td className="p-2.5 font-bold text-emerald-600 dark:text-emerald-400">استاندارد جهانی در Claude, ChatGPT, Codex, Gemini</td>
                    <td className="p-2.5">پشتیبانی در کلاینت‌های سازگار با MCP</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. ANATOMY OF SKILL.MD & 5-STEP ZERO-CODE CREATION GUIDE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left 6 Cols: Anatomy of SKILL.md */}
            <div className="lg:col-span-6 p-5 rounded-2xl bg-white dark:bg-[#161e24] border border-black/[0.08] dark:border-white/[0.1] shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <Code2 className="w-5 h-5" />
                <h3 className="font-black text-sm sm:text-base text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa'
                    ? 'درس دوم: کالبدشکافی دقیق فایل SKILL.md'
                    : 'Lesson 2: Anatomy of a Standard SKILL.md File'}
                </h3>
              </div>

              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                هر اسکیل یک پوشه ساده است که قلب تپنده آن فایلی دقیقاً با نام <code className="font-mono font-bold text-purple-600">SKILL.md</code> (با حروف بزرگ) است. داخل این فایل ۵ بخش کلیدی زیر نوشته می‌شود:
              </p>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-purple-500/[0.05] border border-purple-500/20 space-y-1">
                  <b className="text-purple-700 dark:text-purple-300 block">
                    ۱. شناسنامه و شرط فعال‌سازی (YAML Frontmatter بین دو خط ---):
                  </b>
                  <p className="text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    مهم‌ترین بخش فایل! شامل <code className="font-mono">name</code> (نام انگلیسی با خط تیره مثل <code className="font-mono">meeting-summarizer</code>) و <code className="font-mono">description</code> است. هوش مصنوعی در ابتدای هر چت فقط همین ۲ خط را می‌بیند تا تصمیم بگیرد آیا الان وقت استفاده از این اسکیل هست یا نه!
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.06] space-y-1">
                  <b className="text-[#1c2830] dark:text-[#e8ebe9] block">۲. هدف و نقش تخصصی (Role & Objective):</b>
                  <p className="text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    تعیین زاویه دید مدل (مثلاً: «تو دبیر اجرایی و ممیز دقیق جلسات هستی که هیچ ادعای غیرمستندی را نمی‌پذیری»).
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.06] space-y-1">
                  <b className="text-[#1c2830] dark:text-[#e8ebe9] block">۳. گام‌های پردازش (Step-by-Step Workflow):</b>
                  <p className="text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    ترتیب منطقی کارهایی که هوش مصنوعی باید قبل از نوشتن پاسخ انجام دهد (مثلاً تفکیک تصمیمات قطعی از بحث‌های باز).
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.06] space-y-1">
                  <b className="text-[#1c2830] dark:text-[#e8ebe9] block">۴. قالب خروجی ثابت (Strict Output Format):</b>
                  <p className="text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    ساختار دقیق تیترها و ستون‌های جدولی که می‌خواهید در ۱۰۰٪ دفعات بدون کم‌وکاست تکرار شود.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/[0.06] border border-amber-500/25 space-y-1">
                  <b className="text-amber-800 dark:text-amber-300 block">
                    ۵. مدیریت موارد مرزی و تله‌ها (Edge Cases & Traps):
                  </b>
                  <p className="text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    تعیین رفتار مدل در شرایط مبهم؛ مثل **«تله اعداد تاییدنشده»** (اگر در جلسه گفته شد «فکر کنم حدود ۴۰٪»، مدل حق ندارد آن را فکت قطعی جا بزند!).
                  </p>
                </div>
              </div>
            </div>

            {/* Right 6 Cols: How to Build Without Coding + Meta-Prompt */}
            <div className="lg:col-span-6 p-5 rounded-2xl bg-white dark:bg-[#161e24] border border-black/[0.08] dark:border-white/[0.1] shadow-2xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <Zap className="w-5 h-5" />
                    <h3 className="font-black text-sm sm:text-base text-[#1c2830] dark:text-[#e8ebe9]">
                      {lang === 'fa'
                        ? 'روش ساخت بدون کدنویسی: از خود هوش مصنوعی بخواهید SKILL.md را بسازد!'
                        : 'Zero-Code Method: Let the AI Write Your SKILL.md!'}
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600">
                    Meta-Skill Prompt
                  </span>
                </div>

                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  شما نیازی به حفظ کردن فرمت فایل `SKILL.md` ندارید! کافی است پرامپت زیر را کپی کنید، کار تکراری خودتان را داخل کروشه بنویسید و به Claude یا ChatGPT بدهید تا فایل استاندارد `SKILL.md` را برایتان بسازد:
                </p>

                <div className="p-3.5 rounded-xl bg-[#1e1e1e] text-[#d4d4d4] font-mono text-[11px] leading-relaxed max-h-60 overflow-y-auto">
                  <pre dir="rtl" className="whitespace-pre-wrap text-right select-text">
                    {metaSkillBuilderPrompt}
                  </pre>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-black/[0.06] dark:border-white/[0.08]">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  {onLoadToSandbox && (
                    <button
                      type="button"
                      onClick={() => onLoadToSandbox(metaSkillBuilderPrompt)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/25 text-xs font-bold transition-all cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>ارسال به سندباکس تمرین</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => copyToClipboard(metaSkillBuilderPrompt, 'meta_skill_builder_prompt')}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer ${
                      copiedId === 'meta_skill_builder_prompt'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    {copiedId === 'meta_skill_builder_prompt' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>پرامپت اسکیل‌ساز کپی شد!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>کپی پرامپت «اسکیل‌ساز خودکار»</span>
                      </>
                    )}
                  </button>
                </div>

                {/* How to Enable in Claude Account */}
                <div className="p-3 rounded-xl bg-blue-500/[0.06] border border-blue-500/20 text-[11px] text-[#1c2830] dark:text-[#d1d7db] space-y-1">
                  <b className="text-blue-700 dark:text-blue-300 block">
                    ⚙️ نحوه فعال‌سازی و بارگذاری در پلتفرم‌های مختلف:
                  </b>
                  <div>
                    • <b>در Claude:</b> وارد <code className="font-mono">Settings &gt; Profile / Capabilities &gt; Skills</code> شوید و فایل <code className="font-mono">SKILL.md</code> (یا پوشه ZIP اسکیل) را آپلود کنید.
                  </div>
                  <div>
                    • <b>در ChatGPT و Gemini:</b> فایل <code className="font-mono">SKILL.md</code> را در بخش <code className="font-mono">Project Files</code> (در ChatGPT Projects) یا در <code className="font-mono">Gem Knowledge</code> (در Gemini Gems) قرار دهید.
                  </div>
                  <div>
                    • <b>در Claude Code / Codex / Cursor:</b> فایل را در پوشه <code className="font-mono">.claude/skills/&lt;skill-name&gt;/SKILL.md</code> قرار دهید تا به صورت خودکار شناسایی شود.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. HANDS-ON SKILL TESTING LAB: 3 READY SKILLS + TEST 1 vs TEST 2 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-purple-500/[0.04] via-blue-500/[0.03] to-emerald-500/[0.04] border border-purple-500/25 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-600 text-white">
                    آزمایشگاه عملی تست اسکیل‌ها
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                    همراه با دانلود مستقیم SKILL.md و سناریوی «تله اعداد تاییدنشده»
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-black text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa'
                    ? '۳ پکیج آماده SKILL.md (خلاصه‌ساز جلسات + منابع انسانی مترو خط ایکس + ممیزی ادعای پیمان)'
                    : '3 Ready-to-Use SKILL.md Packages with Normal vs. Trap Test Scenarios'}
                </h3>
              </div>
            </div>

            {/* Skill Package Selector Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {READY_SKILLS.map((sk) => {
                const isSelected = sk.id === selectedSkillId;
                return (
                  <button
                    key={sk.id}
                    type="button"
                    onClick={() => setSelectedSkillId(sk.id)}
                    className={`p-3.5 rounded-2xl border text-right transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                      isSelected
                        ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                        : 'bg-white dark:bg-[#141b20] text-[#1c2830] dark:text-[#e8ebe9] border-black/[0.07] dark:border-white/[0.09] hover:border-purple-500/40'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 w-full">
                      <span
                        dir="ltr"
                        className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-purple-500/10 text-purple-700 dark:text-purple-300'
                        }`}
                      >
                        {sk.name}/SKILL.md
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                        }`}
                      >
                        {sk.badgeFa}
                      </span>
                    </div>
                    <div className="text-xs font-extrabold leading-snug">{sk.titleFa}</div>
                  </button>
                );
              })}
            </div>

            {/* Active Skill Package Details */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#12171b] border border-black/[0.08] dark:border-white/[0.1] space-y-5">
              {/* Top Bar with Download & Copy SKILL.md */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-[#1c2830] dark:text-[#e8ebe9]">
                    {activeReadySkill.titleFa}
                  </h4>
                  <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                    <strong className="text-purple-700 dark:text-purple-300">شرط فعال‌سازی خودکار: </strong>
                    {activeReadySkill.triggerWhenFa}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap shrink-0">
                  <button
                    type="button"
                    onClick={() => handleDownloadSkillFile('SKILL.md', activeReadySkill.skillMdContent)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>دانلود فایل SKILL.md</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(activeReadySkill.skillMdContent, `ready_skill_${activeReadySkill.id}`)
                    }
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer ${
                      copiedId === `ready_skill_${activeReadySkill.id}`
                        ? 'bg-emerald-600 text-white'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    {copiedId === `ready_skill_${activeReadySkill.id}` ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>محتوای SKILL.md کپی شد!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>کپی کل فایل SKILL.md</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* SKILL.md Code Preview */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-purple-600" />
                  <span>محتوای کامل فایل استاندارد SKILL.md:</span>
                </span>
                <pre
                  dir="rtl"
                  className="p-4 rounded-xl bg-[#1e1e1e] text-[#d4d4d4] font-mono text-xs leading-relaxed overflow-x-auto max-h-72 whitespace-pre-wrap text-right select-text"
                >
                  {activeReadySkill.skillMdContent}
                </pre>
              </div>

              {/* Test 1 (Normal) vs Test 2 (The Unverified Numbers Trap) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
                {/* Test 1: Normal Scenario */}
                <div className="p-4 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/25 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>{activeReadySkill.test1NormalTitleFa}</span>
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                        Test #1
                      </span>
                    </div>
                    <p className="text-xs font-mono bg-white dark:bg-[#161e24] p-3 rounded-lg border border-emerald-500/20 text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed whitespace-pre-wrap">
                      {activeReadySkill.test1NormalPromptFa}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-emerald-500/20">
                    {onLoadToSandbox && (
                      <button
                        type="button"
                        onClick={() =>
                          onLoadToSandbox(
                            `${activeReadySkill.skillMdContent}\n\n---\nورودی کاربر برای تست ۱:\n${activeReadySkill.test1NormalPromptFa}`
                          )
                        }
                        className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Play className="w-3 h-3" />
                        <span>تست اسکیل + ورودی ۱ در سندباکس</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(activeReadySkill.test1NormalPromptFa, `test1_${activeReadySkill.id}`)
                      }
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === `test1_${activeReadySkill.id}` ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>کپی شد!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>کپی متن تست ۱</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Test 2: Trap Scenario */}
                <div className="p-4 rounded-xl bg-amber-500/[0.06] border border-amber-500/30 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>{activeReadySkill.test2TrapTitleFa}</span>
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300">
                        Test #2 (Trap)
                      </span>
                    </div>
                    <p className="text-xs font-mono bg-white dark:bg-[#161e24] p-3 rounded-lg border border-amber-500/25 text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed whitespace-pre-wrap">
                      {activeReadySkill.test2TrapPromptFa}
                    </p>
                    <div className="p-2.5 rounded-lg bg-amber-500/10 text-[11px] text-amber-900 dark:text-amber-200 leading-relaxed">
                      <strong>🎯 واکنش مورد انتظار اسکیل در این تله: </strong>
                      {activeReadySkill.expectedTrapBehaviorFa}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-amber-500/20">
                    {onLoadToSandbox && (
                      <button
                        type="button"
                        onClick={() =>
                          onLoadToSandbox(
                            `${activeReadySkill.skillMdContent}\n\n---\nورودی کاربر برای تست ۲ (تله اعداد تاییدنشده):\n${activeReadySkill.test2TrapPromptFa}`
                          )
                        }
                        className="text-[11px] font-bold text-amber-800 dark:text-amber-300 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Play className="w-3 h-3" />
                        <span>تست اسکیل + تله ۲ در سندباکس</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(activeReadySkill.test2TrapPromptFa, `test2_${activeReadySkill.id}`)
                      }
                      className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === `test2_${activeReadySkill.id}` ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>کپی شد!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>کپی متن تست ۲ (تله)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. INTERACTIVE LIVE SKILL.MD BUILDER (BUILD YOUR OWN SKILL RIGHT HERE!) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161e24] border-2 border-purple-500/30 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <h3 className="text-sm sm:text-base font-black text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa'
                      ? 'کارگاه تعاملی: همین الان اولین فایل SKILL.md اختصاصی خودتان را بسازید و دانلود کنید!'
                      : 'Interactive SKILL.md Builder: Create & Download Your Custom Skill Now'}
                  </h3>
                </div>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                  فیلدهای ساده زیر را متناسب با کار روزانه خود ویرایش کنید تا فایل استاندارد <code className="font-mono font-bold">SKILL.md</code> به صورت زنده در سمت چپ تولید شود و با یک کلیک دانلود نمایید:
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-black bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 self-start sm:self-center">
                Interactive Live Builder
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Builder Form Inputs (6 Cols) */}
              <div className="lg:col-span-6 space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-[#1c2830] dark:text-[#e8ebe9] block mb-1">
                    ۱. نام انگلیسی اسکیل (با خط تیره - بدون فاصله):
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="e.g. weekly-site-report-checker"
                    className="w-full p-2.5 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#f8f9fa] dark:bg-[#12171b] font-mono text-xs text-[#1c2830] dark:text-[#e8ebe9]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1c2830] dark:text-[#e8ebe9] block mb-1">
                    ۲. شرح ماموریت و شرط فعال‌سازی خودکار (Description):
                  </label>
                  <textarea
                    rows={2}
                    value={customDesc}
                    onChange={(e) => setCustomDesc(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#f8f9fa] dark:bg-[#12171b] text-xs text-[#1c2830] dark:text-[#e8ebe9]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1c2830] dark:text-[#e8ebe9] block mb-1">
                    ۳. مراحل گام‌به‌گام انجام کار (Workflow Steps):
                  </label>
                  <textarea
                    rows={3}
                    value={customSteps}
                    onChange={(e) => setCustomSteps(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#f8f9fa] dark:bg-[#12171b] text-xs text-[#1c2830] dark:text-[#e8ebe9]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1c2830] dark:text-[#e8ebe9] block mb-1">
                    ۴. قالب خروجی دلخواه (Output Format):
                  </label>
                  <textarea
                    rows={2}
                    value={customOutputFormat}
                    onChange={(e) => setCustomOutputFormat(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#f8f9fa] dark:bg-[#12171b] text-xs text-[#1c2830] dark:text-[#e8ebe9]"
                  />
                </div>

                <div>
                  <label className="font-bold text-amber-800 dark:text-amber-300 block mb-1">
                    ۵. قانون ضدتوهم و مدیریت تله‌ها (Edge Cases & Traps):
                  </label>
                  <textarea
                    rows={2}
                    value={customTrapRule}
                    onChange={(e) => setCustomTrapRule(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-amber-500/40 bg-amber-500/[0.04] text-xs text-[#1c2830] dark:text-[#e8ebe9]"
                  />
                </div>
              </div>

              {/* Live Generated SKILL.md Preview & Download (6 Cols) */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-purple-600" />
                      <span>پیش‌نمایش زنده فایل SKILL.md تولیدشده شما:</span>
                    </span>
                    <span dir="ltr" className="font-mono text-[11px] text-purple-600 dark:text-purple-400">
                      {customName.trim() || 'custom-skill'}/SKILL.md
                    </span>
                  </div>

                  <pre
                    dir="rtl"
                    className="p-4 rounded-2xl bg-[#1e1e1e] text-[#d4d4d4] font-mono text-xs leading-relaxed overflow-y-auto h-[310px] whitespace-pre-wrap text-right select-text border border-white/10"
                  >
                    {generatedCustomSkillMd}
                  </pre>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => handleDownloadSkillFile('SKILL.md', generatedCustomSkillMd)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>دانلود مستقیم فایل SKILL.md</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => copyToClipboard(generatedCustomSkillMd, 'custom_generated_skill_md')}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer ${
                      copiedId === 'custom_generated_skill_md'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    {copiedId === 'custom_generated_skill_md' ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>فایل SKILL.md شما کپی شد!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>کپی کد SKILL.md</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 6. WHEN NOT TO BUILD A SKILL & SECURITY RED LINES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* When NOT to build a skill */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#161e24] border border-black/[0.08] dark:border-white/[0.1] shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <Lightbulb className="w-5 h-5" />
                <h3 className="font-black text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa'
                    ? 'درس سوم: در چه مواردی نباید Skill بسازیم؟'
                    : 'Lesson 3: When Should You NOT Build a Skill?'}
                </h3>
              </div>

              <ul className="space-y-2.5 text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                <li className="p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.06]">
                  <b className="text-[#1c2830] dark:text-[#e8ebe9] block mb-0.5">
                    ۱. کارهای یک‌بارمصرف و غیرتکراری (One-Off Tasks):
                  </b>
                  اگر کاری را فقط سالی یک بار انجام می‌دهید، ساخت و نگهداری Skill برای آن اتلاف وقت است؛ یک پرامپت استاندارد RCTO کافی است.
                </li>
                <li className="p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.06]">
                  <b className="text-[#1c2830] dark:text-[#e8ebe9] block mb-0.5">
                    ۲. طوفان فکری و ایده‌پردازی کاملاً آزاد (Open Brainstorming):
                  </b>
                  اسکیل‌ها برای ایجاد «قالب استاندارد و محدودیت دقیق» طراحی شده‌اند. در کارهایی که نیاز به خلاقیت ساختارشکن دارید، قالب‌های خشک Skill دست‌وپای مدل را می‌بندد.
                </li>
                <li className="p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.06]">
                  <b className="text-[#1c2830] dark:text-[#e8ebe9] block mb-0.5">
                    ۳. اسکیل‌های بیش از حد کلی («همه‌کاره»):
                  </b>
                  هرگز یک اسکیل با نام «دستیار کلی شرکت» نسازید! هر اسکیل باید فقط یک ماموریت مشخص و تیز (مثلاً فقط «خلاصه‌ساز جلسات» یا فقط «ممیز اضافه‌کاری») داشته باشد.
                </li>
              </ul>
            </div>

            {/* Security Tips for Skills */}
            <div className="p-5 rounded-2xl bg-red-500/[0.04] border border-red-500/25 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <ShieldAlert className="w-5 h-5" />
                <h3 className="font-black text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa'
                    ? '۴ هشدار امنیتی حیاتی هنگام استفاده از AI Skills'
                    : '4 Critical Security Rules When Using AI Skills'}
                </h3>
              </div>

              <ul className="space-y-2.5 text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                <li className="p-2.5 rounded-xl bg-white dark:bg-[#141b20] border border-red-500/20">
                  <b className="text-red-700 dark:text-red-300 block mb-0.5">
                    ۱. خطر دانلود اسکیل‌های ناشناس از گیت‌هاب و اینترنت:
                  </b>
                  هرگز یک پکیج اسکیل آماده را بدون باز کردن و خواندن خط‌به‌خط فایل <code className="font-mono">SKILL.md</code> و پوشه <code className="font-mono">scripts/</code> در اکانت خود آپلود نکنید (خطر دستورات مخفی Prompt Injection برای سرقت داده‌های چت).
                </li>
                <li className="p-2.5 rounded-xl bg-white dark:bg-[#141b20] border border-red-500/20">
                  <b className="text-red-700 dark:text-red-300 block mb-0.5">
                    ۲. ممنوعیت قرار دادن رمز عبور و API Key داخل SKILL.md:
                  </b>
                  فایل <code className="font-mono">SKILL.md</code> یک سند متنی قابل اشتراک‌گذاری است؛ هرگز توکن‌های امنیتی، رمزهای عبور یا اطلاعات محرمانه شخصی را داخل متن آن هاردکد نکنید.
                </li>
                <li className="p-2.5 rounded-xl bg-white dark:bg-[#141b20] border border-red-500/20">
                  <b className="text-red-700 dark:text-red-300 block mb-0.5">
                    ۳. قانون تایید انسان برای عملیات حذف یا ارسال (Human-in-the-Loop):
                  </b>
                  اگر اسکیل شما به ابزارهای MCP (مثل ایمیل یا فایل‌های هارد دیسک) متصل است، همیشه در <code className="font-mono">SKILL.md</code> شرط بگذارید که قبل از حذف فایل یا ارسال ایمیل، تایید نهایی را از کاربر بگیرد.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SUB-TAB 2: OBSIDIAN SECOND BRAIN + CLAUDE & HERMES (13 CHAPTERS)      */}
      {/* ===================================================================== */}
      {subTab === 'obsidian_vault' && (
        <div className="space-y-6 animate-fadeIn">
          {/* 1. 13-CHAPTER INTERACTIVE CURRICULUM FOR OBSIDIAN + CLAUDE + HERMES */}
          <div className="p-1.5 rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.07] dark:border-white/[0.09] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="rounded-[calc(1.5rem-0.375rem)] bg-white dark:bg-[#161e24] p-5 sm:p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#0d9488]/15 text-[#0d9488] dark:text-[#2dd4bf] border border-[#0d9488]/30 flex items-center gap-1">
                      <Brain className="w-3.5 h-3.5" />
                      <span>دوره کامل ۱۳ فصلی حافظه دائمی هوش مصنوعی (رایگان)</span>
                    </span>
                    <span className="text-[11px] font-semibold text-[#5d6b73] dark:text-[#9aa8b0]">
                      Obsidian · Claude Desktop · Nous Research Hermes Agent
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa'
                      ? 'آموزش گام‌به‌گام ساخت «مغز دوم» با Obsidian و اتصال مستقیم به Claude و Hermes (روی هر فصل کلیک کنید):'
                      : '13-Chapter Step-by-Step Guide to Building Your Second Brain with Obsidian, Claude & Hermes:'}
                  </h3>
                </div>

                {/* Prev/Next Chapter Buttons + Projector Slide Mode */}
                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                  <button
                    type="button"
                    onClick={() => {
                      playTactileSound('thock');
                      setProjectorDeck('obsidian');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black flex items-center gap-1.5 border border-amber-700 border-b-[3px] border-b-amber-900 active:translate-y-[2px] active:border-b cursor-pointer shadow-xs"
                  >
                    <Monitor className="w-4 h-4" />
                    <span>حالت اسلاید پروژکتور (۱۳ اسلاید)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playTactileSound('switch');
                      setActiveObsidianStepIdx((prev) =>
                        prev > 0 ? prev - 1 : OBSIDIAN_SECOND_BRAIN_STEPS.length - 1
                      );
                    }}
                    className="px-2.5 py-1.5 rounded-xl text-xs font-extrabold bg-[#f4f6f5] dark:bg-[#1d262d] text-[#1c2830] dark:text-[#e8ebe9] border border-black/10 dark:border-white/10 border-b-[3px] border-b-black/25 active:translate-y-[2px] active:border-b cursor-pointer"
                  >
                    → فصل قبلی
                  </button>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-[#0d9488]/15 text-[#0d9488] dark:text-[#2dd4bf]">
                    {activeObsidianStepIdx + 1} / {OBSIDIAN_SECOND_BRAIN_STEPS.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      playTactileSound('switch');
                      setActiveObsidianStepIdx((prev) =>
                        prev < OBSIDIAN_SECOND_BRAIN_STEPS.length - 1 ? prev + 1 : 0
                      );
                    }}
                    className="px-2.5 py-1.5 rounded-xl text-xs font-extrabold bg-[#0d9488] text-white border border-[#115e59] border-b-[3px] border-b-[#042f2e] active:translate-y-[2px] active:border-b cursor-pointer"
                  >
                    فصل بعدی ←
                  </button>
                </div>
              </div>

              {/* 13-Chapter Tactile Keycap Grid */}
              {render13ObsidianKeycaps(false)}

              {/* Active Chapter Multi-Column Slide Card (High Contrast & Large Typography) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#0d9488]/[0.07] via-white to-emerald-500/[0.05] dark:from-teal-950/30 dark:via-[#141c23] dark:to-emerald-950/20 border-2 border-[#0d9488]/40 space-y-5">
                <div className="flex items-center justify-between gap-2 flex-wrap pb-3 border-b border-[#0d9488]/20">
                  <span className="px-3.5 py-1 rounded-xl bg-[#0d9488] text-white text-xs sm:text-sm font-black">
                    {currentObsidianStep.stepNumber} ({currentObsidianStep.keyHint}) — {currentObsidianStep.badgeFa}
                  </span>
                  <span dir="ltr" className="text-xs sm:text-sm font-mono font-bold text-[#334155] dark:text-[#cbd5e1]">
                    {currentObsidianStep.titleEn}
                  </span>
                </div>

                <h4 className="text-lg sm:text-2xl font-black text-[#0f172a] dark:text-white leading-snug">
                  {currentObsidianStep.titleFa}
                </h4>

                {/* Multi-Column Scannable Cards Instead of Full-Width Text Lines */}
                <div
                  className={`grid grid-cols-1 ${
                    currentObsidianStep.deepDiveFa.length === 2
                      ? 'lg:grid-cols-2'
                      : currentObsidianStep.deepDiveFa.length >= 3
                        ? 'md:grid-cols-2 xl:grid-cols-3'
                        : 'lg:grid-cols-1'
                  } gap-4`}
                >
                  {currentObsidianStep.deepDiveFa.map((para, pIdx) => {
                    const { heading, body } = splitPointTitleAndBody(para);
                    return (
                      <div
                        key={pIdx}
                        className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#11171d] border border-[#0d9488]/25 shadow-2xs space-y-2.5 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center gap-2.5">
                            <span className="w-7 h-7 rounded-lg bg-[#0d9488] text-white font-mono text-xs font-black flex items-center justify-center shrink-0">
                              {pIdx + 1}
                            </span>
                            <span className="text-sm sm:text-base font-black text-[#0f766e] dark:text-[#2dd4bf] leading-snug">
                              {heading || `گام اجرایی ${pIdx + 1}`}
                            </span>
                          </div>
                          <p className="text-sm sm:text-[15px] font-semibold text-[#0f172a] dark:text-[#f1f5f9] leading-relaxed">
                            {body}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Optional Code or Config Snippet inside Chapter */}
                {currentObsidianStep.codeOrConfigSnippet && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#11161c] text-[#f1f5f9] space-y-2.5 border border-white/15">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-xs sm:text-sm font-black text-[#2dd4bf]">
                        {currentObsidianStep.codeOrConfigSnippet.titleFa}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          copyToClipboard(
                            currentObsidianStep.codeOrConfigSnippet!.code,
                            `obs_step_code_${currentObsidianStep.keyHint}`
                          )
                        }
                        className="px-3.5 py-1.5 rounded-xl bg-[#0d9488] hover:bg-[#0f766e] text-white text-xs font-black flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedId === `obs_step_code_${currentObsidianStep.keyHint}` ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>کپی شد!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>کپی کد</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre
                      dir="ltr"
                      className="text-xs sm:text-sm font-mono whitespace-pre-wrap leading-relaxed select-text text-left overflow-x-auto"
                    >
                      {currentObsidianStep.codeOrConfigSnippet.code}
                    </pre>
                  </div>
                )}

                {/* Pro Tip */}
                <div className="p-4 rounded-2xl bg-emerald-500/15 border-2 border-emerald-500/35 flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-sm sm:text-base font-bold text-[#0f172a] dark:text-emerald-100 leading-relaxed">
                    <strong className="font-black text-emerald-800 dark:text-emerald-300">نکته کلیدی و تجربه عملی: </strong>
                    {currentObsidianStep.proTipFa}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. 3-WAY COMPARISON MATRIX: OBSIDIAN vs. NOTION vs. GOOGLE NOTEBOOKLM */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-4 p-5 rounded-2xl bg-white dark:bg-[#161e24] border border-black/[0.08] dark:border-white/[0.1] shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#0d9488] dark:text-[#2dd4bf]">
                  <Brain className="w-5 h-5" />
                  <h3 className="font-black text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                    چرا Obsidian تنها انتخاب واقعی برای «حافظه دائمی هوش مصنوعی» است؟
                  </h3>
                </div>
                <ul className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] space-y-2.5 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      <b>فایل متنی ساده روی هارد خودتان (Local .md):</b> برخلاف Notion که یادداشت‌ها را در سرور ابری قفل می‌کند، در Obsidian همه چیز فایل متنی ساده روی کامپیوتر شماست و هوش مصنوعی مستقیم آن‌ها را می‌خواند و ویرایش می‌کند.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      <b>تفاوت با NotebookLM:</b> نوت‌بوک ال‌ام یک «کتابخانه تحقیق یک‌طرفه (فقط خواندنی)» برای PDFهای مرجع است؛ اما Obsidian یک «دفتر کار دوطرفه (خواندن و نوشتن)» است که هوش مصنوعی داخل آن یادداشت می‌سازد و پوشه‌ها را مرتب می‌کند.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      <b>۱۰۰٪ رایگان، آفلاین و بدون تحریم:</b> هیچ محدودیت اکانت یا ریسک مسدود شدن حساب ابری وجود ندارد.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-black/[0.06] dark:border-white/[0.08] flex-wrap">
                <a
                  href="https://obsidian.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#7c3aed]/10 hover:bg-[#7c3aed]/20 text-[#7c3aed] dark:text-[#a78bfa] border border-[#7c3aed]/30 text-xs font-extrabold transition-all"
                >
                  <span>سایت رسمی Obsidian.md</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://hermes-agent.nousresearch.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#0d9488]/10 hover:bg-[#0d9488]/20 text-[#0d9488] dark:text-[#2dd4bf] border border-[#0d9488]/30 text-xs font-extrabold transition-all"
                >
                  <span>سایت Hermes Agent</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="lg:col-span-8 p-5 rounded-2xl bg-white dark:bg-[#161e24] border border-black/[0.08] dark:border-white/[0.1] shadow-2xs space-y-3 overflow-hidden">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="font-black text-sm text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#0d9488]" />
                  <span>مقایسه دقیق: Obsidian در برابر Notion و Google NotebookLM</span>
                </h3>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#0d9488]/10 text-[#0d9488] dark:text-[#2dd4bf] font-bold">
                  انتخاب ابزار درست برای هر کار
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs border-collapse">
                  <thead className="bg-black/[0.03] dark:bg-white/[0.04] text-[#1c2830] dark:text-[#e8ebe9] font-extrabold border-b border-black/[0.08] dark:border-white/[0.1]">
                    <tr>
                      <th className="p-2.5">معیار مقایسه</th>
                      <th className="p-2.5 text-[#0d9488] dark:text-[#2dd4bf]">Obsidian (مغز دوم زنده)</th>
                      <th className="p-2.5">Notion (فضای کاری ابری)</th>
                      <th className="p-2.5 text-purple-700 dark:text-purple-300">Google NotebookLM (کتابخانه تحقیق)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.05] dark:divide-white/[0.06] text-[#2c3840] dark:text-[#cfd6db]">
                    <tr>
                      <td className="p-2.5 font-bold">محل ذخیره و فرمت</td>
                      <td className="p-2.5 font-bold text-emerald-600 dark:text-emerald-400">فایل متنی ساده (.md) روی هارد کامپیوتر شما</td>
                      <td className="p-2.5">دیتابیس بسته در سرورهای ابری نوشن</td>
                      <td className="p-2.5">منابع ثابت آپلودشده در کلود گوگل</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">نوع دسترسی هوش مصنوعی</td>
                      <td className="p-2.5 font-bold text-emerald-600 dark:text-emerald-400">دوطرفه کامل (خواندن، نوشتن، ویرایش و جابه‌جایی فایل‌ها)</td>
                      <td className="p-2.5">محدود و نیازمند API پیچیده</td>
                      <td className="p-2.5">یک‌طرفه (فقط می‌خواند و به سوالات جواب می‌دهد)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">اتصال به Claude و Hermes</td>
                      <td className="p-2.5 font-bold text-emerald-600 dark:text-emerald-400">مستقیم و آنی (از طریق پوشه Vault روی هارد)</td>
                      <td className="p-2.5">غیرمستقیم و کند</td>
                      <td className="p-2.5">محیط بسته داخل سایت گوگل</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">بهترین کاربرد</td>
                      <td className="p-2.5 font-bold text-emerald-600 dark:text-emerald-400">حافظه دائمی روزانه، مدیریت پروژه‌ها، ایده‌ها و مرتب‌سازی خودکار</td>
                      <td className="p-2.5">تابلوهای تسک تیمی آنلاین</td>
                      <td className="p-2.5">تحلیل PDFهای سنگین، قراردادها و ساخت پادکست/اسلاید</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 3. VAULT ARCHITECTURE (D:/MIND) & CLAUDE.MD TEMPLATE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Folder Structure & Note Rules (6 Cols) */}
            <div className="lg:col-span-6 p-5 rounded-2xl bg-white dark:bg-[#161e24] border border-black/[0.08] dark:border-white/[0.1] shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-[#0d9488] dark:text-[#2dd4bf]">
                <FolderTree className="w-5 h-5" />
                <h3 className="font-black text-sm sm:text-base text-[#1c2830] dark:text-[#e8ebe9]">
                  معماری استاندارد پوشه‌های Vault + قواعد یادداشت‌نویسی برای هوش مصنوعی
                </h3>
              </div>

              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                برای اینکه Claude و Hermes بلافاصله ساختار مغز دوم شما را بفهمند، از ساختن ده‌ها پوشه تودرتو خودداری کنید و فقط این ۵ پوشه شماره‌گذاری‌شده + فایل راهنمای <code className="font-mono font-bold">CLAUDE.md</code> را در ریشه والت بسازید:
              </p>

              <div className="p-3.5 rounded-xl bg-[#1e1e1e] text-[#d4d4d4] text-xs font-mono space-y-1.5" dir="ltr">
                <div>📁 <span className="font-bold text-teal-400">D:/MIND/</span> (پوشه اصلی Vault — نام انگلیسی و بدون فاصله)</div>
                <div className="ps-4">├── 📂 <span className="text-sky-400 font-bold">00_Inbox/</span> &nbsp;&nbsp;&nbsp;&nbsp;# یادداشت‌های خام و عجله‌ای روزانه</div>
                <div className="ps-4">├── 📂 <span className="text-emerald-400 font-bold">01_Projects/</span> &nbsp;# پروژه‌های فعال در حال اجرا</div>
                <div className="ps-4">├── 📂 <span className="text-amber-400 font-bold">02_Areas/</span> &nbsp;&nbsp;&nbsp;&nbsp;# حوزه‌های دائمی کار و زندگی</div>
                <div className="ps-4">├── 📂 <span className="text-purple-400 font-bold">03_Resources/</span> # بانک مقالات، آموزش‌ها و پرامپت‌ها</div>
                <div className="ps-4">├── 📂 <span className="text-gray-400 font-bold">04_Archive/</span> &nbsp;&nbsp;# پروژه‌های تکمیل‌شده</div>
                <div className="ps-4">└── 📄 <span className="text-pink-400 font-bold">CLAUDE.md</span> &nbsp;&nbsp;&nbsp;&nbsp;# شناسنامه و قوانین والت برای هوش مصنوعی</div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.06]">
                  <b className="text-[#1c2830] dark:text-[#e8ebe9] block mb-0.5">
                    ۱. ویژگی‌های بالای یادداشت (Properties / YAML Frontmatter):
                  </b>
                  <span className="text-[#5d6b73] dark:text-[#9aa8b0]">
                    در خط اول هر یادداشت سه خط تیره (<code className="font-mono">---</code>) بزنید تا بخش Properties باز شود و حداقل <code className="font-mono">date</code>، <code className="font-mono">tags</code> و <code className="font-mono">status</code> را ثبت کنید.
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.06]">
                  <b className="text-[#1c2830] dark:text-[#e8ebe9] block mb-0.5">
                    ۲. لینک‌های داخلی دوطرفه با دو کروشه <code className="font-mono text-purple-600">[[نام یادداشت]]</code>:
                  </b>
                  <span className="text-[#5d6b73] dark:text-[#9aa8b0]">
                    برای اتصال یادداشت‌ها در Graph View و درک ارتباط موضوعات توسط هوش مصنوعی، نام موضوعات مرتبط را داخل دو کروشه بگذارید.
                  </span>
                </div>
              </div>
            </div>

            {/* CLAUDE.md Constitution Template (6 Cols) */}
            <div className="lg:col-span-6 p-5 rounded-2xl bg-white dark:bg-[#161e24] border border-black/[0.08] dark:border-white/[0.1] shadow-2xs flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                    <FileText className="w-5 h-5" />
                    <h3 className="font-black text-sm sm:text-base text-[#1c2830] dark:text-[#e8ebe9]">
                      فایل کلیدی CLAUDE.md (شناسنامه شما برای Claude و Hermes)
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300">
                    ذخیره در ریشه D:/MIND/CLAUDE.md
                  </span>
                </div>

                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  این فایل را در پوشه اصلی Vault خود بسازید تا هر بار که Claude یا Hermes به والت شما وصل می‌شود، بدون نیاز به توضیح مجدد بداند شما که هستید و چطور باید یادداشت‌هایتان را مدیریت کند:
                </p>

                <pre
                  dir="rtl"
                  className="p-3.5 rounded-xl bg-[#1e1e1e] text-[#d4d4d4] font-mono text-xs leading-relaxed overflow-y-auto max-h-60 whitespace-pre-wrap text-right select-text border border-white/10"
                >
                  {claudeMdTemplate}
                </pre>
              </div>

              <div className="flex items-center justify-between gap-2 flex-wrap pt-2 border-t border-black/[0.06] dark:border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => handleDownloadSkillFile('CLAUDE.md', claudeMdTemplate)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#0d9488] hover:bg-[#0f766e] text-white text-xs font-extrabold border border-[#115e59] border-b-[3px] border-b-[#042f2e] active:translate-y-[2px] active:border-b transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>دانلود مستقیم فایل CLAUDE.md</span>
                </button>

                <button
                  type="button"
                  onClick={() => copyToClipboard(claudeMdTemplate, 'claude_md_tpl')}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-extrabold border border-purple-800 border-b-[3px] border-b-purple-950 active:translate-y-[2px] active:border-b transition-all cursor-pointer"
                >
                  {copiedId === 'claude_md_tpl' ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>تمپلیت CLAUDE.md کپی شد!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>کپی متن CLAUDE.md</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* 4. CONNECTING CLAUDE DESKTOP & HERMES AGENT (METHODS 1 & 2 + WINDOWS PATH FIX) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#0d9488]/[0.05] via-purple-500/[0.04] to-amber-500/[0.04] border border-[#0d9488]/30 space-y-5">
            <div className="space-y-1 pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#0d9488] text-white">
                  راهنمای جامع اتصال هوش مصنوعی به والت
                </span>
                <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300">
                  شامل اتصال Claude Desktop + دو روش اتصال ایجنت رایگان Hermes + رفع مشکل رایج مسیر ویندوز
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-[#1c2830] dark:text-[#e8ebe9]">
                نحوه وصل کردن Claude Desktop و ایجنت Hermes به یادداشت‌های Obsidian
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Card A: Connecting Claude Desktop */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#12171b] border border-black/[0.08] dark:border-white/[0.1] space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black bg-purple-500/15 text-purple-700 dark:text-purple-300 inline-block">
                    ۱. اتصال Claude Desktop به Vault
                  </span>
                  <h4 className="text-xs font-black text-[#1c2830] dark:text-[#e8ebe9]">
                    دسترسی مستقیم برنامه دسکتاپ کلاد به پوشه D:/MIND
                  </h4>
                  <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    در برنامه Claude Desktop وارد <code className="font-mono">Settings &gt; Developer &gt; Edit Config</code> شوید و آدرس پوشه Vault خود را در فایل <code className="font-mono">claude_desktop_config.json</code> قرار دهید و کلاد را ری‌استارت کنید:
                  </p>
                  <pre className="p-3 rounded-xl bg-[#1e1e1e] text-[#d4d4d4] font-mono text-[11px] leading-relaxed overflow-x-auto" dir="ltr">
                    <code>{claudeMcpConfigCode}</code>
                  </pre>
                </div>

                <button
                  type="button"
                  onClick={() => copyToClipboard(claudeMcpConfigCode, 'mcp_cfg_code')}
                  className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copiedId === 'mcp_cfg_code' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'mcp_cfg_code' ? 'کپی شد!' : 'کپی کانفیگ Claude Desktop'}</span>
                </button>
              </div>

              {/* Card B: Hermes Agent Method 1 & Method 2 */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#12171b] border border-black/[0.08] dark:border-white/[0.1] space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black bg-[#0d9488]/15 text-[#0d9488] dark:text-[#2dd4bf] inline-block">
                    ۲. اتصال ایجنت رایگان Hermes (هر دو روش)
                  </span>
                  <h4 className="text-xs font-black text-[#1c2830] dark:text-[#e8ebe9]">
                    اسکیل داخلی Obsidian در Hermes Agent
                  </h4>
                  <div className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] space-y-2 leading-relaxed">
                    <p>
                      <b>روش اول (تنظیم دائمی اسکیل داخلی):</b> در Hermes اسکیل پیش‌فرض <code className="font-mono">skills/note-taking/obsidian</code> را روشن کنید و در فایل <code className="font-mono">~/.hermes/.env</code> مسیر والت را بدهید:
                    </p>
                    <pre className="p-2.5 rounded-xl bg-[#1e1e1e] text-[#d4d4d4] font-mono text-[11px]" dir="ltr">
                      <code>OBSIDIAN_VAULT_PATH="D:/MIND"</code>
                    </pre>
                    <p>
                      <b>روش دوم (معرفی مستقیم مسیر در چت):</b> بدون درگیر شدن با فایل تنظیمات، مستقیماً در اولین پیام به Hermes بگویید: <code className="font-mono">«والت آبسیدین من در مسیر D:/MIND (یا /mnt/d/MIND) است؛ با اسکیل Obsidian وارد آن شو.»</code>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => copyToClipboard('OBSIDIAN_VAULT_PATH="D:/MIND"', 'hermes_env_code')}
                  className="w-full py-2 rounded-xl bg-[#0d9488] hover:bg-[#0f766e] text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copiedId === 'hermes_env_code' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'hermes_env_code' ? 'کپی شد!' : 'کپی کد مسیر Hermes'}</span>
                </button>
              </div>

              {/* Card C: Fixing Common Windows Vault Path Error */}
              <div className="p-4 rounded-2xl bg-amber-500/[0.07] border-2 border-amber-500/35 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-black text-xs">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>۳. رفع مشکل رایج ویندوز (خوانده نشدن مسیر Vault)</span>
                  </div>
                  <p className="text-xs text-[#2c3840] dark:text-[#d1d7db] leading-relaxed">
                    اگر در ویندوز Claude یا Hermes ارور می‌دهد که پوشه Vault پیدا نمی‌شود، یکی از این ۳ مورد علت آن است:
                  </p>
                  <ul className="text-xs text-[#2c3840] dark:text-[#d1d7db] space-y-1.5 leading-relaxed">
                    <li>
                      • <b>خطای بک‌اسلش ویندوز:</b> هرگز آدرس را به صورت <code className="font-mono text-red-600" dir="ltr">D:\MIND</code> ننویسید! حتماً از اسلش معمولی <code className="font-mono text-emerald-600 font-bold" dir="ltr">D:/MIND</code> یا دو بک‌اسلش <code className="font-mono" dir="ltr">D:\\MIND</code> استفاده کنید.
                    </li>
                    <li>
                      • <b>مسیر درایوها در WSL ویندوز:</b> اگر Hermes را در محیط WSL اجرا می‌کنید، درایو D ویندوز باید به صورت <code className="font-mono text-emerald-600 font-bold" dir="ltr">/mnt/d/MIND</code> نوشته شود.
                    </li>
                    <li>
                      • <b>حذف فاصله و حروف فارسی از نام پوشه اصلی:</b> نام پوشه ریشه Vault را کوتاه و انگلیسی بگذارید (مثلاً <code className="font-mono" dir="ltr">D:/MIND</code>).
                    </li>
                  </ul>
                </div>

                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-[#161e24] border border-amber-500/30 font-mono text-[11px] text-left" dir="ltr">
                  <div className="text-red-500">❌ Wrong: "D:\MIND\Notes"</div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold">✅ Windows: "D:/MIND"</div>
                  <div className="text-blue-600 dark:text-blue-400 font-bold">✅ WSL/Hermes: "/mnt/d/MIND"</div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. 4 EVERYDAY ACTIONABLE WORKFLOWS & AUTOMATED INBOX SORTING */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#161e24] border border-black/[0.08] dark:border-white/[0.1] shadow-2xs space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="font-black text-sm sm:text-base text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#0d9488]" />
                <span>۴ پرامپت عملیاتی روزمره با مغز دوم (مرتب‌سازی خودکار یادداشت‌ها با Hermes و Claude + تمرین پایان دوره)</span>
              </h3>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                کارهای واقعی روزمره
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {OBSIDIAN_DAILY_WORKFLOWS.map((wf) => (
                <div
                  key={wf.id}
                  className="p-4 rounded-2xl bg-[#f8f9fa] dark:bg-[#12171b] border border-black/[0.06] dark:border-white/[0.08] flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-black px-2.5 py-0.5 rounded-lg bg-[#0d9488]/15 text-[#0d9488] dark:text-[#2dd4bf]">
                        {wf.badgeFa}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-black text-[#1c2830] dark:text-[#e8ebe9]">
                      {wf.titleFa}
                    </h4>
                    <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                      {wf.descriptionFa}
                    </p>
                    <pre
                      dir="rtl"
                      className="p-3 rounded-xl bg-white dark:bg-[#161e24] border border-black/[0.06] dark:border-white/[0.08] font-mono text-[11px] text-[#1c2830] dark:text-[#e8ebe9] whitespace-pre-wrap leading-relaxed max-h-44 overflow-y-auto select-text text-right"
                    >
                      {wf.promptFa}
                    </pre>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-black/[0.05] dark:border-white/[0.06]">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(wf.promptFa, `obs_wf_${wf.id}`)}
                      className="flex-1 py-2 rounded-xl bg-[#0d9488] hover:bg-[#0f766e] text-white text-xs font-extrabold flex items-center justify-center gap-1.5 cursor-pointer border border-[#115e59] border-b-[3px] border-b-[#042f2e] active:translate-y-[2px] active:border-b transition-all"
                    >
                      {copiedId === `obs_wf_${wf.id}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === `obs_wf_${wf.id}` ? 'پرامپت کپی شد!' : 'کپی پرامپت'}</span>
                    </button>
                    {onLoadToSandbox && (
                      <button
                        type="button"
                        onClick={() => onLoadToSandbox(wf.promptFa)}
                        className="px-3 py-2 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/25 text-xs font-bold transition-all cursor-pointer"
                      >
                        تست در سندباکس
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SEPARATED STANDALONE BOX FOR MCP (MODEL CONTEXT PROTOCOL)             */}
      {/* Full 12-Chapter Interactive Course when subTab === 'mcp_protocol'     */}
      {/* ===================================================================== */}
      <div
        className={`p-5 sm:p-6 rounded-3xl border-2 transition-all space-y-6 ${
          subTab === 'mcp_protocol'
            ? 'bg-gradient-to-br from-blue-500/[0.08] via-indigo-500/[0.04] to-cyan-500/[0.06] border-blue-500/45 shadow-md animate-fadeIn'
            : 'bg-gradient-to-br from-blue-500/[0.04] via-white to-indigo-500/[0.04] dark:from-blue-500/[0.07] dark:via-[#151d24] dark:to-indigo-500/[0.06] border-dashed border-blue-500/35'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-blue-500/20">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3.5 py-1 rounded-full text-xs font-black bg-blue-600 text-white flex items-center gap-1.5">
                <Terminal className="w-4 h-4" />
                <span>باکس مستقل و تفکیک‌شده: مسترکلاس کامل پروتکل MCP (Model Context Protocol)</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/35">
                ۱۲ فصل عملی: ساخت MCP Server با پایتون (FastMCP) + اتصال به Claude و Cursor
              </span>
            </div>
            <h3 className="text-base sm:text-xl font-black text-[#0f172a] dark:text-white mt-1">
              {lang === 'fa'
                ? 'آموزش جامع Model Context Protocol (پورت USB-C دنیای هوش مصنوعی) + ساخت سرور مدیریت کارها و عیب‌یابی'
                : 'Complete Model Context Protocol (MCP) Masterclass + FastMCP Server Lab & Troubleshooting'}
            </h3>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 flex-wrap">
            <button
              type="button"
              onClick={() => {
                playTactileSound('thock');
                setSubTab('mcp_protocol');
                setProjectorDeck('mcp');
              }}
              className="px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black flex items-center gap-1.5 border border-amber-700 border-b-[4px] border-b-amber-900 active:translate-y-[2px] active:border-b transition-all cursor-pointer shadow-xs"
            >
              <Monitor className="w-4 h-4" />
              <span>حالت اسلاید پروژکتور (۱۲ اسلاید)</span>
            </button>

            {subTab !== 'mcp_protocol' && (
              <button
                type="button"
                onClick={() => {
                  playTactileSound('thock');
                  setSubTab('mcp_protocol');
                  topSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold border border-blue-800 border-b-[4px] border-b-blue-950 active:translate-y-[2px] active:border-b transition-all cursor-pointer shrink-0"
              >
                ورود به مسترکلاس ۱۲ فصلی MCP ←
              </button>
            )}
          </div>
        </div>

        {/* Always-visible 3-Pillar High-Contrast Projector-Ready Summary Cards (Fixes Screenshot 1!) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#11171d] border-2 border-blue-500/25 shadow-2xs space-y-2.5">
            <span className="inline-block px-3 py-1 rounded-lg bg-blue-600 text-white font-black text-xs sm:text-sm">
              ۱. پورت USB-C هوش مصنوعی (چرخه N×M به N+M)
            </span>
            <p className="text-sm sm:text-[15px] font-semibold text-[#0f172a] dark:text-[#f1f5f9] leading-relaxed">
              پروتکل متن‌باز معرفی‌شده توسط Anthropic که هوش مصنوعی را از «اتاق دربسته» خارج می‌کند تا به فایل‌ها، دیتابیس‌ها، گیت‌هاب و APIها با یک زبان مشترک وصل شود.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#11171d] border-2 border-indigo-500/25 shadow-2xs space-y-2.5">
            <span className="inline-block px-3 py-1 rounded-lg bg-indigo-600 text-white font-black text-xs sm:text-sm">
              ۲. معماری ۳ جزئی: Host، Client و Server
            </span>
            <p className="text-sm sm:text-[15px] font-semibold text-[#0f172a] dark:text-[#f1f5f9] leading-relaxed">
              برنامه‌هایی مثل <b>Claude Desktop</b> و <b>Cursor</b> میزبان (Host) هستند، بخش مترجم داخل آن‌ها <b>Client</b> است و برنامه پایتون شما <b>MCP Server</b> است که ۳ قابلیت <b>Tools</b>، <b>Resources</b> و <b>Prompts</b> را ارائه می‌دهد.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#11171d] border-2 border-emerald-500/25 shadow-2xs space-y-2.5">
            <span className="inline-block px-3 py-1 rounded-lg bg-emerald-600 text-white font-black text-xs sm:text-sm">
              ۳. ساخت سریع با FastMCP + تست با Inspector
            </span>
            <p className="text-sm sm:text-[15px] font-semibold text-[#0f172a] dark:text-[#f1f5f9] leading-relaxed">
              با پکیج رسمی <code className="font-mono font-bold text-blue-700 dark:text-blue-300" dir="ltr">mcp[cli]&gt;=1.28,&lt;2</code> و دکوراتور <code className="font-mono font-bold text-emerald-700 dark:text-emerald-300" dir="ltr">@mcp.tool()</code> هر تابع پایتونی به یک ابزار هوشمند برای هوش مصنوعی تبدیل می‌شود.
            </p>
          </div>
        </div>

        {/* FULL INTERACTIVE 12-CHAPTER MCP MASTERCLASS (WHEN S3 IS ACTIVE) */}
        {subTab === 'mcp_protocol' && (
          <div className="space-y-6 pt-2">
            {/* 1. 12-CHAPTER MECHANICAL KEYCAPS GRID & ACTIVE CHAPTER VIEW */}
            <div className="rounded-3xl bg-white dark:bg-[#161e24] border-2 border-blue-500/30 p-5 sm:p-6 space-y-5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/[0.08] dark:border-white/[0.1]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-0.5 rounded-full text-xs font-black bg-blue-500/15 text-blue-800 dark:text-blue-300 border border-blue-500/30">
                      سرفصل‌های ۱۲ گانه دوره کامل MCP
                    </span>
                    <span className="text-xs font-bold text-[#334155] dark:text-[#cbd5e1]">
                      روی هر کلید مکانیکی (M1 تا M12) کلیک کنید یا دکمه اسلاید پروژکتور را بزنید
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-[#0f172a] dark:text-white">
                    ۱۲ فصل گام‌به‌گام: از مفاهیم پایه تا ساخت MCP Server واقعی با Python و FastMCP
                  </h4>
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-auto flex-wrap">
                  <button
                    type="button"
                    disabled={activeMcpStepIdx === 0}
                    onClick={() => {
                      playTactileSound('switch');
                      setActiveMcpStepIdx((prev) => Math.max(0, prev - 1));
                    }}
                    className="px-3 py-1.5 rounded-xl border border-black/15 dark:border-white/15 border-b-[3px] border-b-black/30 bg-white dark:bg-[#1d262d] text-xs font-extrabold disabled:opacity-40 active:translate-y-[2px] active:border-b transition-all cursor-pointer"
                  >
                    → فصل قبلی
                  </button>
                  <span className="px-3 py-1.5 rounded-lg bg-blue-500/15 text-blue-800 dark:text-blue-300 font-mono text-xs font-black">
                    {activeMcpStepIdx + 1} / {MCP_MASTERCLASS_STEPS.length}
                  </span>
                  <button
                    type="button"
                    disabled={activeMcpStepIdx === MCP_MASTERCLASS_STEPS.length - 1}
                    onClick={() => {
                      playTactileSound('switch');
                      setActiveMcpStepIdx((prev) => Math.min(MCP_MASTERCLASS_STEPS.length - 1, prev + 1));
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white border border-blue-800 border-b-[3px] border-b-blue-950 text-xs font-extrabold disabled:opacity-40 active:translate-y-[2px] active:border-b transition-all cursor-pointer"
                  >
                    فصل بعدی ←
                  </button>
                </div>
              </div>

              {/* 12 Mechanical Keycaps Grid */}
              {render12McpKeycaps(false)}

              {/* Active Chapter Slide-Ready Multi-Column Presentation Card (Fixes Screenshot 2!) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-500/[0.07] via-white to-indigo-500/[0.05] dark:from-blue-950/30 dark:via-[#141c23] dark:to-indigo-950/25 border-2 border-blue-500/40 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-blue-500/20">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="px-3.5 py-1 rounded-xl bg-blue-600 text-white text-xs sm:text-sm font-black">
                      {currentMcpStep.stepNumber} ({currentMcpStep.keyHint})
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-blue-500/15 text-blue-800 dark:text-blue-300 text-xs sm:text-sm font-black">
                      {currentMcpStep.badgeFa}
                    </span>
                  </div>
                  <span dir="ltr" className="text-xs sm:text-sm font-mono font-bold text-[#334155] dark:text-[#cbd5e1]">
                    {currentMcpStep.titleEn}
                  </span>
                </div>

                <h4 className="text-lg sm:text-2xl font-black text-[#0f172a] dark:text-white leading-snug">
                  {currentMcpStep.titleFa}
                </h4>

                {/* 3-Column Scannable Slide Cards Instead of Long Full-Width Text Lines */}
                <div
                  className={`grid grid-cols-1 ${
                    currentMcpStep.deepDiveFa.length === 2
                      ? 'lg:grid-cols-2'
                      : currentMcpStep.deepDiveFa.length >= 3
                        ? 'md:grid-cols-2 xl:grid-cols-3'
                        : 'lg:grid-cols-1'
                  } gap-4`}
                >
                  {currentMcpStep.deepDiveFa.map((paragraph, pIdx) => {
                    const { heading, body } = splitPointTitleAndBody(paragraph);
                    return (
                      <div
                        key={pIdx}
                        className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#11171d] border border-blue-500/25 shadow-2xs space-y-2.5 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center gap-2.5">
                            <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-mono text-xs font-black flex items-center justify-center shrink-0">
                              {pIdx + 1}
                            </span>
                            <span className="text-sm sm:text-base font-black text-blue-800 dark:text-blue-300 leading-snug">
                              {heading || `بخش ${pIdx + 1}`}
                            </span>
                          </div>
                          <p className="text-sm sm:text-[15px] font-semibold text-[#0f172a] dark:text-[#f1f5f9] leading-relaxed">
                            {body}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Code Snippet Box if present in this chapter */}
                {currentMcpStep.codeOrConfigSnippet && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-xs sm:text-sm font-black text-[#0f172a] dark:text-white flex items-center gap-1.5">
                        <Code2 className="w-4 h-4 text-blue-600" />
                        <span>{currentMcpStep.codeOrConfigSnippet.titleFa}</span>
                      </span>
                      <div className="flex items-center gap-2">
                        {(currentMcpStep.keyHint === 'M5' || currentMcpStep.keyHint === 'M9') && (
                          <button
                            type="button"
                            onClick={() =>
                              handleDownloadSkillFile(
                                currentMcpStep.keyHint === 'M5' ? 'server.py' : 'todo_server.py',
                                currentMcpStep.codeOrConfigSnippet?.code || ''
                              )
                            }
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>
                              دانلود فایل {currentMcpStep.keyHint === 'M5' ? 'server.py' : 'todo_server.py'}
                            </span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() =>
                            copyToClipboard(
                              currentMcpStep.codeOrConfigSnippet?.code || '',
                              `mcp_step_code_${currentMcpStep.keyHint}`
                            )
                          }
                          className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer"
                        >
                          {copiedId === `mcp_step_code_${currentMcpStep.keyHint}` ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>کپی شد!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>کپی کد / دستور</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <pre
                      dir="ltr"
                      className="p-4 sm:p-5 rounded-2xl bg-[#11161c] text-[#f1f5f9] font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto select-text border border-white/15"
                    >
                      <code>{currentMcpStep.codeOrConfigSnippet.code}</code>
                    </pre>
                  </div>
                )}

                {/* Pro Tip Box */}
                <div className="p-4 rounded-2xl bg-amber-500/15 border-2 border-amber-500/40 flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-sm sm:text-base font-bold text-[#0f172a] dark:text-amber-100 leading-relaxed">
                    <b className="font-black text-amber-900 dark:text-amber-300">نکته کلیدی و تجربی: </b>
                    {currentMcpStep.proTipFa}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. READY-MADE OFFICIAL MCP SERVERS & DIRECTORIES */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-7 p-5 rounded-2xl bg-white dark:bg-[#161e24] border border-black/[0.08] dark:border-white/[0.1] space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4 className="text-sm sm:text-base font-black text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2">
                    <Layers className="w-5 h-5 text-blue-600" />
                    <span>تفاوت دقیق ۳ قابلیت اصلی سرورهای MCP (Tools vs. Resources vs. Prompts)</span>
                  </h4>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-black/10 dark:border-white/10 bg-blue-500/5">
                        <th className="p-2.5 font-black">قابلیت در MCP</th>
                        <th className="p-2.5 font-black">نقش و عملکرد</th>
                        <th className="p-2.5 font-black">کنترل‌کننده</th>
                        <th className="p-2.5 font-black">مثال واقعی</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5 dark:divide-white/5">
                      <tr>
                        <td className="p-2.5 font-mono font-bold text-blue-600 dark:text-blue-400" dir="ltr">
                          1. Tools (@mcp.tool)
                        </td>
                        <td className="p-2.5">انجام عملیات، محاسبه، تغییر داده یا فراخوانی API</td>
                        <td className="p-2.5 font-bold">مدل هوش مصنوعی (Model-Controlled)</td>
                        <td className="p-2.5">افزودن تسک جدید، ارسال ایمیل، ثبت رکورد در دیتابیس</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono font-bold text-emerald-600 dark:text-emerald-400" dir="ltr">
                          2. Resources (@mcp.resource)
                        </td>
                        <td className="p-2.5">داده‌ها و فایل‌های صرفاً خواندنی (Read-Only Context)</td>
                        <td className="p-2.5 font-bold">برنامه و مدل</td>
                        <td className="p-2.5">خواندن لاگ سرور، فایل راهنما یا جدول قیمت‌ها بدون تغییر</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono font-bold text-purple-600 dark:text-purple-400" dir="ltr">
                          3. Prompts (@mcp.prompt)
                        </td>
                        <td className="p-2.5">قالب‌های آماده گفتگو و دستورالعمل‌های از پیش تعریف‌شده</td>
                        <td className="p-2.5 font-bold">کاربر (User-Controlled)</td>
                        <td className="p-2.5">قالب آماده «بررسی کد امنیتی» یا «خلاصه‌سازی گزارش روزانه»</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="lg:col-span-5 p-5 rounded-2xl bg-white dark:bg-[#161e24] border border-black/[0.08] dark:border-white/[0.1] space-y-3 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <h4 className="text-sm sm:text-base font-black text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-blue-600" />
                    <span>۴ منبع معتبر دانلود هزاران سرور MCP آماده و رایگان</span>
                  </h4>
                  <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    قبل از اینکه خودتان سروری کدنویسی کنید، در این ۴ دایرکتوری رسمی بررسی کنید؛ برای اکثر سرویس‌ها (GitHub، Postgres، Google Drive، Brave Search، Slack) سرور آماده وجود دارد:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs" dir="ltr">
                    <a
                      href="https://github.com/modelcontextprotocol/servers"
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 dark:text-blue-300 font-mono font-bold flex items-center justify-between border border-blue-500/20"
                    >
                      <span>github.com/.../servers</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://smithery.ai"
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 font-mono font-bold flex items-center justify-between border border-purple-500/20"
                    >
                      <span>smithery.ai</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://glama.ai/mcp/servers"
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 dark:text-teal-300 font-mono font-bold flex items-center justify-between border border-teal-500/20"
                    >
                      <span>glama.ai/mcp/servers</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://mcp.so"
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 font-mono font-bold flex items-center justify-between border border-amber-500/20"
                    >
                      <span>mcp.so</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs text-[#1c2830] dark:text-[#e8ebe9]">
                  <b>ابزار تست اعتبار فایل JSON تنظیمات: </b>
                  قبل از ذخیره <code className="font-mono" dir="ltr">claude_desktop_config.json</code>، کد خود را در سایت{' '}
                  <a
                    href="https://jsonlint.com"
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono font-bold text-emerald-700 dark:text-emerald-300 underline"
                    dir="ltr"
                  >
                    jsonlint.com
                  </a>{' '}
                  تست کنید تا مطمئن شوید ویرگول اضافه یا بک‌اسلش تکی ندارد.
                </div>
              </div>
            </div>

            {/* 3. COMPLETE 7-ROW TROUBLESHOOTING TABLE */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#161e24] border border-black/[0.08] dark:border-white/[0.1] space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="text-sm sm:text-base font-black text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-amber-600" />
                  <span>جدول مرجع عیب‌یابی: ۷ خطای پرتکرار در راه‌اندازی MCP و راه‌حل قطعی آن‌ها</span>
                </h4>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300">
                  Troubleshooting Cheat Sheet
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-black/10 dark:border-white/10 bg-amber-500/10">
                      <th className="p-3 font-black">خطا / مشکل مشاهده‌شده</th>
                      <th className="p-3 font-black">علت اصلی</th>
                      <th className="p-3 font-black">راه‌حل سریع و قطعی</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5 dark:divide-white/5">
                    {MCP_TROUBLESHOOTING_TABLE.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-black/[0.015] dark:hover:bg-white/[0.02]">
                        <td className="p-3 font-bold text-red-600 dark:text-red-400">{row.errorTitle}</td>
                        <td className="p-3 text-[#5d6b73] dark:text-[#9aa8b0]">{row.causeFa}</td>
                        <td className="p-3 font-semibold text-[#1c2830] dark:text-[#e8ebe9]">{row.solutionFa}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===================================================================== */}
      {/* BOTTOM NAVIGATION DECK FOR SECTION 8 (SKILLS + OBSIDIAN + MCP)        */}
      {/* ===================================================================== */}
      <div className="p-4 rounded-2xl bg-gradient-to-b from-white to-[#f4f6f5] dark:from-[#161e24] dark:to-[#11171b] border border-purple-500/30 space-y-3 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
            <span className="text-xs font-black text-[#1c2830] dark:text-[#e8ebe9]">
              {lang === 'fa'
                ? 'پنل پایین بخش ۸: جابه‌جایی سریع بین ۱) مسترکلاس Skills، ۲) مغز دوم Obsidian و ۳) مسترکلاس MCP:'
                : 'Section 8 Bottom Deck: Quick Switch Between Skills, Obsidian Second Brain & MCP:'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => {
                playTactileSound('thock');
                setSubTab('agent_skills');
                topSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className={`px-3 py-1 rounded-xl text-[11px] font-extrabold border border-b-[3px] active:translate-y-[2px] active:border-b transition-all cursor-pointer ${
                subTab === 'agent_skills'
                  ? 'bg-purple-600 text-white border-purple-800 border-b-purple-950'
                  : 'bg-white dark:bg-[#1a232a] text-[#1c2830] dark:text-[#e8ebe9] border-black/15 border-b-black/30'
              }`}
            >
              ۱. کارگاه ساخت Skills
            </button>

            <button
              type="button"
              onClick={() => {
                playTactileSound('thock');
                setSubTab('obsidian_vault');
                topSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className={`px-3 py-1 rounded-xl text-[11px] font-extrabold border border-b-[3px] active:translate-y-[2px] active:border-b transition-all cursor-pointer ${
                subTab === 'obsidian_vault'
                  ? 'bg-[#0d9488] text-white border-[#115e59] border-b-[#042f2e]'
                  : 'bg-white dark:bg-[#1a232a] text-[#1c2830] dark:text-[#e8ebe9] border-black/15 border-b-black/30'
              }`}
            >
              ۲. مغز دوم Obsidian + Hermes
            </button>

            <button
              type="button"
              onClick={() => {
                playTactileSound('thock');
                setSubTab('mcp_protocol');
                topSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className={`px-3 py-1 rounded-xl text-[11px] font-extrabold border border-b-[3px] active:translate-y-[2px] active:border-b transition-all cursor-pointer ${
                subTab === 'mcp_protocol'
                  ? 'bg-blue-600 text-white border-blue-800 border-b-blue-950'
                  : 'bg-white dark:bg-[#1a232a] text-[#1c2830] dark:text-[#e8ebe9] border-black/15 border-b-black/30'
              }`}
            >
              ۳. مسترکلاس پروتکل MCP
            </button>

            <button
              type="button"
              onClick={() => {
                playTactileSound('switch');
                topSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="px-3 py-1 rounded-xl text-[11px] font-extrabold bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/25 border-b-[3px] border-b-purple-500/40 active:translate-y-[2px] active:border-b transition-all cursor-pointer"
            >
              {lang === 'fa' ? '↑ بالای این کارگاه' : '↑ Top of Section'}
            </button>
          </div>
        </div>

        {subTab === 'agent_skills' && render12StepKeycaps(true)}
        {subTab === 'obsidian_vault' && render13ObsidianKeycaps(true)}
        {subTab === 'mcp_protocol' && render12McpKeycaps(true)}
      </div>

      {/* FULL-SCREEN PROJECTOR SLIDE DECK MODAL FOR SKILLS, OBSIDIAN & MCP */}
      {projectorDeck === 'skills' && (
        <ProjectorSlideModal
          isOpen={true}
          onClose={() => setProjectorDeck(null)}
          deckTitleFa="مسترکلاس جامع ساخت AI Skills (استاندارد جهانی SKILL.md)"
          deckSubtitleFa="بخش ۸ · تب ۱ (۱۲ گام اجرایی)"
          accentColor="purple"
          slides={CURRICULUM_MODULES.map((m, idx): ProjectorSlideItem => ({
            stepNumber: m.stepNumber,
            keyHint: `S${idx + 1}`,
            badgeFa: m.badgeFa,
            titleFa: m.titleFa,
            titleEn: m.titleEn,
            pointsFa: m.deepDiveFa
              .split('\n\n')
              .map((s) => s.trim())
              .filter(Boolean),
            proTipFa: m.keyTakeawayFa
          }))}
          activeIndex={activeStepIndex}
          onChangeIndex={setActiveStepIndex}
          copyToClipboard={copyToClipboard}
          copiedId={copiedId}
        />
      )}

      {projectorDeck === 'obsidian' && (
        <ProjectorSlideModal
          isOpen={true}
          onClose={() => setProjectorDeck(null)}
          deckTitleFa="راه‌اندازی «مغز دوم» با Obsidian و اتصال به Claude و Hermes"
          deckSubtitleFa="بخش ۸ · تب ۲ (۱۳ فصل کامل)"
          accentColor="teal"
          slides={OBSIDIAN_SECOND_BRAIN_STEPS.map((st): ProjectorSlideItem => ({
            stepNumber: st.stepNumber,
            keyHint: st.keyHint,
            badgeFa: st.badgeFa,
            titleFa: st.titleFa,
            titleEn: st.titleEn,
            pointsFa: st.deepDiveFa,
            proTipFa: st.proTipFa,
            codeTitleFa: st.codeOrConfigSnippet?.titleFa,
            codeSnippet: st.codeOrConfigSnippet?.code,
            codeDir: 'ltr'
          }))}
          activeIndex={activeObsidianStepIdx}
          onChangeIndex={setActiveObsidianStepIdx}
          copyToClipboard={copyToClipboard}
          copiedId={copiedId}
        />
      )}

      {projectorDeck === 'mcp' && (
        <ProjectorSlideModal
          isOpen={true}
          onClose={() => setProjectorDeck(null)}
          deckTitleFa="مسترکلاس کامل پروتکل MCP (Model Context Protocol) و ساخت MCP Server"
          deckSubtitleFa="بخش ۸ · تب ۳ (۱۲ فصل عملی با FastMCP)"
          accentColor="blue"
          slides={MCP_MASTERCLASS_STEPS.map((st): ProjectorSlideItem => ({
            stepNumber: st.stepNumber,
            keyHint: st.keyHint,
            badgeFa: st.badgeFa,
            titleFa: st.titleFa,
            titleEn: st.titleEn,
            pointsFa: st.deepDiveFa,
            proTipFa: st.proTipFa,
            codeTitleFa: st.codeOrConfigSnippet?.titleFa,
            codeSnippet: st.codeOrConfigSnippet?.code,
            codeDir: 'ltr'
          }))}
          activeIndex={activeMcpStepIdx}
          onChangeIndex={setActiveMcpStepIdx}
          copyToClipboard={copyToClipboard}
          copiedId={copiedId}
        />
      )}
    </section>
  );
};
