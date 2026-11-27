import React, { useState, useRef } from 'react';
import { Language } from '../../types/cpmai';
import { playTactileSound } from '../../utils/uiSoundEffects';
import {
  Brain,
  Copy,
  Check,
  Terminal,
  Code2,
  Workflow,
  Download,
  ShieldAlert
} from 'lucide-react';
import { OBSIDIAN_SECOND_BRAIN_STEPS } from '../../data/obsidian_second_brain_curriculum';
import { MCP_MASTERCLASS_STEPS } from '../../data/mcp_masterclass_curriculum';
import { splitPointTitleAndBody } from '../../utils/lessonText';
import {
  clampStepIndex,
  formatStepNumber,
  getStepBoundaryState,
  parseLessonBlocks,
  stepBackward,
  stepForward
} from '../../utils/focusedLessonEngine';
import { FocusedLessonLayout, FocusedStepItem } from '../learning/FocusedLessonLayout';
import { LessonTakeawayCallout } from '../learning/LessonTakeawayCallout';
import { FocusedLessonFooter } from '../learning/FocusedLessonFooter';
import { AiSkillsComparisonPanel } from './AiSkillsComparisonPanel';
import { AiSkillsLabPanel } from './AiSkillsLabPanel';
import {
  McpArchitectureComparisonPanel,
  McpTroubleshootingPanel
} from './McpReferencePanels';
import {
  ObsidianComparisonVaultPanel,
  ObsidianConnectWorkflowsPanel
} from './ObsidianReferencePanels';

interface ObsidianBrainSkillsWorkshopProps {
  lang: Language;
  copyToClipboard: (text: string, id: string) => void;
  copiedId: string | null;
  onLoadToSandbox?: (promptText: string) => void;
  mode?: 'all' | 'agent_skills' | 'obsidian_vault' | 'mcp_protocol';
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
  onLoadToSandbox,
  mode = 'all'
}) => {
  const [internalSubTab, setSubTab] = useState<'agent_skills' | 'obsidian_vault' | 'mcp_protocol'>(
    mode !== 'all' ? mode : 'agent_skills'
  );
  const subTab = mode !== 'all' ? mode : internalSubTab;
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [visitedSkillSteps, setVisitedSkillSteps] = useState<Set<number>>(() => new Set([0]));
  const [aiSkillsView, setAiSkillsView] = useState<'lesson' | 'comparison' | 'sandbox'>('lesson');
  const [isMobileStepsOpen, setIsMobileStepsOpen] = useState<boolean>(false);
  const [activeObsidianStepIdx, setActiveObsidianStepIdx] = useState<number>(0);
  const [visitedObsidianSteps, setVisitedObsidianSteps] = useState<Set<number>>(() => new Set([0]));
  const [obsidianView, setObsidianView] = useState<'lesson' | 'comparison' | 'connect'>('lesson');
  const [isObsidianDrawerOpen, setIsObsidianDrawerOpen] = useState<boolean>(false);

  const [activeMcpStepIdx, setActiveMcpStepIdx] = useState<number>(0);
  const [visitedMcpSteps, setVisitedMcpSteps] = useState<Set<number>>(() => new Set([0]));
  const [mcpView, setMcpView] = useState<'lesson' | 'architecture' | 'troubleshooting'>('lesson');
  const [isMcpDrawerOpen, setIsMcpDrawerOpen] = useState<boolean>(false);

  const [selectedSkillId, setSelectedSkillId] = useState<string>(READY_SKILLS[0].id);

  const handleSelectSkillStep = (nextIdx: number) => {
    const safeIdx = clampStepIndex(nextIdx, CURRICULUM_MODULES.length);
    playTactileSound('switch');
    setActiveStepIndex(safeIdx);
    setVisitedSkillSteps((prev) => {
      if (prev.has(safeIdx)) return prev;
      const next = new Set(prev);
      next.add(safeIdx);
      return next;
    });
    setAiSkillsView('lesson');
  };

  const handleSelectObsidianStep = (nextIdx: number) => {
    const safeIdx = clampStepIndex(nextIdx, OBSIDIAN_SECOND_BRAIN_STEPS.length);
    playTactileSound('switch');
    setActiveObsidianStepIdx(safeIdx);
    setVisitedObsidianSteps((prev) => {
      if (prev.has(safeIdx)) return prev;
      const next = new Set(prev);
      next.add(safeIdx);
      return next;
    });
    setObsidianView('lesson');
  };

  const handleSelectMcpStep = (nextIdx: number) => {
    const safeIdx = clampStepIndex(nextIdx, MCP_MASTERCLASS_STEPS.length);
    playTactileSound('switch');
    setActiveMcpStepIdx(safeIdx);
    setVisitedMcpSteps((prev) => {
      if (prev.has(safeIdx)) return prev;
      const next = new Set(prev);
      next.add(safeIdx);
      return next;
    });
    setMcpView('lesson');
  };

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

  const skillStepBoundary = getStepBoundaryState(activeStepIndex, CURRICULUM_MODULES.length);
  const currentModule = CURRICULUM_MODULES[skillStepBoundary.currentIndex] || CURRICULUM_MODULES[0];
  const focusedSkillSteps: FocusedStepItem[] = CURRICULUM_MODULES.map((mod, idx) => ({
    id: `ai-skill-step-${idx + 1}`,
    title: lang === 'fa' ? mod.titleFa : mod.titleEn,
    subtitle: mod.titleEn,
    category: mod.badgeFa
  }));

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

  const topSectionRef = useRef<HTMLDivElement>(null);

  const obsidianStepBoundary = getStepBoundaryState(
    activeObsidianStepIdx,
    OBSIDIAN_SECOND_BRAIN_STEPS.length
  );
  const currentObsidianStep =
    OBSIDIAN_SECOND_BRAIN_STEPS[obsidianStepBoundary.currentIndex] || OBSIDIAN_SECOND_BRAIN_STEPS[0];
  const focusedObsidianSteps: FocusedStepItem[] = OBSIDIAN_SECOND_BRAIN_STEPS.map((st, idx) => ({
    id: `obsidian-step-${idx + 1}`,
    title: lang === 'fa' ? st.titleFa : st.titleEn,
    subtitle: st.titleEn,
    category: st.badgeFa
  }));

  const mcpStepBoundary = getStepBoundaryState(activeMcpStepIdx, MCP_MASTERCLASS_STEPS.length);
  const currentMcpStep =
    MCP_MASTERCLASS_STEPS[mcpStepBoundary.currentIndex] || MCP_MASTERCLASS_STEPS[0];
  const focusedMcpSteps: FocusedStepItem[] = MCP_MASTERCLASS_STEPS.map((st, idx) => ({
    id: `mcp-step-${idx + 1}`,
    title: lang === 'fa' ? st.titleFa : st.titleEn,
    subtitle: st.titleEn,
    category: st.badgeFa
  }));

  return (
    <section className={mode === 'all' ? 'space-y-6' : 'flex-1 min-h-0 flex flex-col'}>
      {/* Section Header (Only when mode === 'all') */}
      {mode === 'all' && (
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

          {/* 3-Tab Clean Segmented Selector */}
          <div className="p-1.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-[#ecdcd8] dark:border-[#382645] grid grid-cols-1 md:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => {
                playTactileSound('thock');
                setSubTab('agent_skills');
              }}
              className={`p-3 rounded-xl text-right transition-all duration-150 cursor-pointer flex flex-col justify-between gap-1 select-none active:scale-[0.98] ${
                subTab === 'agent_skills'
                  ? 'bg-gradient-to-r from-[#e0533c] to-[#c026d3] text-white shadow-sm'
                  : 'bg-white dark:bg-[#201729] text-[#261a1d] dark:text-[#faedf3] border border-[#ecdcd8]/80 dark:border-[#382645]/80 hover:border-[#e0533c]/40'
              }`}
            >
              <div className="flex items-center justify-between gap-2 w-full">
                <div className="flex items-center gap-1.5 font-extrabold text-xs">
                  <Workflow className="w-4 h-4 shrink-0" />
                  <span>
                    {lang === 'fa'
                      ? '۱. ساخت AI Skills (کارگاه SKILL.md)'
                      : '1. AI Skills Masterclass (SKILL.md)'}
                  </span>
                </div>
                <span dir="ltr" className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${subTab === 'agent_skills' ? 'bg-white/20 text-white' : 'bg-black/5 dark:bg-white/5 text-[#755e66] dark:text-[#ad99ab]'}`}>
                  ۱۲ گام
                </span>
              </div>
              <div className={`text-[10px] leading-tight ${subTab === 'agent_skills' ? 'text-white/85' : 'text-[#755e66] dark:text-[#ad99ab]'}`}>
                استاندارد جهانی SKILL.md + آزمایشگاه تست تله‌ها و اسکیل‌ساز زنده
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                playTactileSound('thock');
                setSubTab('obsidian_vault');
              }}
              className={`p-3 rounded-xl text-right transition-all duration-150 cursor-pointer flex flex-col justify-between gap-1 select-none active:scale-[0.98] ${
                subTab === 'obsidian_vault'
                  ? 'bg-gradient-to-r from-[#0d9488] to-[#0f766e] text-white shadow-sm'
                  : 'bg-white dark:bg-[#201729] text-[#261a1d] dark:text-[#faedf3] border border-[#ecdcd8]/80 dark:border-[#382645]/80 hover:border-[#0d9488]/40'
              }`}
            >
              <div className="flex items-center justify-between gap-2 w-full">
                <div className="flex items-center gap-1.5 font-extrabold text-xs">
                  <Brain className="w-4 h-4 shrink-0" />
                  <span>
                    {lang === 'fa'
                      ? '۲. مغز دوم Obsidian + اتصال Claude و Hermes'
                      : '2. Obsidian Second Brain + Claude & Hermes'}
                  </span>
                </div>
                <span dir="ltr" className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${subTab === 'obsidian_vault' ? 'bg-white/20 text-white' : 'bg-black/5 dark:bg-white/5 text-[#755e66] dark:text-[#ad99ab]'}`}>
                  ۱۳ فصل
                </span>
              </div>
              <div className={`text-[10px] leading-tight ${subTab === 'obsidian_vault' ? 'text-white/85' : 'text-[#755e66] dark:text-[#ad99ab]'}`}>
                ساخت Vault، ساختار پوشه‌ها و اتصال به هوش مصنوعی با ابزار Hermes
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                playTactileSound('thock');
                setSubTab('mcp_protocol');
              }}
              className={`p-3 rounded-xl text-right transition-all duration-150 cursor-pointer flex flex-col justify-between gap-1 select-none active:scale-[0.98] ${
                subTab === 'mcp_protocol'
                  ? 'bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white shadow-sm'
                  : 'bg-white dark:bg-[#201729] text-[#261a1d] dark:text-[#faedf3] border border-[#ecdcd8]/80 dark:border-[#382645]/80 hover:border-[#2563eb]/40'
              }`}
            >
              <div className="flex items-center justify-between gap-2 w-full">
                <div className="flex items-center gap-1.5 font-extrabold text-xs">
                  <Terminal className="w-4 h-4 shrink-0" />
                  <span>
                    {lang === 'fa'
                      ? '۳. باکس تفکیک‌شده پروتکل MCP و سرورها'
                      : '3. Standalone MCP Protocol & Servers'}
                  </span>
                </div>
                <span dir="ltr" className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${subTab === 'mcp_protocol' ? 'bg-white/20 text-white' : 'bg-black/5 dark:bg-white/5 text-[#755e66] dark:text-[#ad99ab]'}`}>
                  ۱۲ فصل
                </span>
              </div>
              <div className={`text-[10px] leading-tight ${subTab === 'mcp_protocol' ? 'text-white/85' : 'text-[#755e66] dark:text-[#ad99ab]'}`}>
                معماری Host/Client/Server، ساخت سرور با FastMCP و اتصال به Claude
              </div>
            </button>
          </div>
        </div>
      )}
      {mode !== 'all' && <div ref={topSectionRef} className="scroll-mt-4" />}

      {/* ===================================================================== */}
      {/* SUB-TAB 1: AI SKILLS FOCUSED LEARNING PILOT (FRAMES 14, 15, 16)       */}
      {/* ===================================================================== */}
      {subTab === 'agent_skills' && (
        <FocusedLessonLayout
          lang={lang}
          moduleCode={lang === 'fa' ? 'ماژول ۳\u200F-\u200F۲' : 'Module 3-2'}
          moduleTitle={
            lang === 'fa'
              ? 'معماری AI Skills و استاندارد جهانی SKILL.md'
              : 'AI Skills Architecture & SKILL.md Open Standard'
          }
          moduleSubtitle="Claude · ChatGPT · Codex · Gemini"
          steps={focusedSkillSteps}
          activeStepIndex={skillStepBoundary.currentIndex}
          visitedStepIndices={visitedSkillSteps}
          onSelectStep={handleSelectSkillStep}
          views={[
            { id: 'lesson', label: lang === 'fa' ? 'مطالعه درس' : 'Lesson' },
            { id: 'comparison', label: lang === 'fa' ? 'مقایسه مفاهیم' : 'Compare Concepts' },
            { id: 'sandbox', label: lang === 'fa' ? 'آزمایشگاه و سندباکس' : 'Lab & Sandbox' }
          ]}
          activeViewId={aiSkillsView}
          onSelectView={(id) => {
            if (id === 'lesson' || id === 'comparison' || id === 'sandbox') {
              playTactileSound('thock');
              setAiSkillsView(id);
            }
          }}
          isStepListVisible={aiSkillsView === 'lesson'}
          isMobileDrawerOpen={isMobileStepsOpen}
          onToggleMobileDrawer={setIsMobileStepsOpen}
        >
          {aiSkillsView === 'lesson' && currentModule && (
            <article className="space-y-7" data-testid="ai-skills-active-step">
              {/* Step Header: Quiet Unboxed Kicker + Calm Title + Lead */}
              <header className="space-y-3 pb-6 border-b border-[var(--cpai-border)]">
                <div className="flex items-center justify-between gap-2 flex-wrap text-xs sm:text-sm text-[var(--cpai-muted)]">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-[var(--cpai-primary-strong)] tabular-nums">
                      {lang === 'fa'
                        ? `گام ${formatStepNumber(skillStepBoundary.stepNumber, 'fa', true)} از ${formatStepNumber(skillStepBoundary.totalSteps, 'fa', true)}`
                        : `Step ${formatStepNumber(skillStepBoundary.stepNumber, 'en', true)} of ${formatStepNumber(skillStepBoundary.totalSteps, 'en', true)}`}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{currentModule.badgeFa}</span>
                  </div>
                  <bdi
                    dir="ltr"
                    className="text-xs font-mono text-[var(--cpai-muted)] truncate max-w-full"
                  >
                    {currentModule.titleEn}
                  </bdi>
                </div>

                <h3 className="cpai-lesson-title">
                  {lang === 'fa' ? currentModule.titleFa : currentModule.titleEn}
                </h3>

                <p className="cpai-lesson-lead">{currentModule.summaryFa}</p>
              </header>

              {/* Main Step Body Prose (Single-Column Calm Reading Flow) */}
              <div className="cpai-prose space-y-5">
                {parseLessonBlocks(currentModule.deepDiveFa).map((block, bIdx) => {
                  if (block.type === 'paragraph') {
                    return <p key={bIdx}>{block.text}</p>;
                  }
                  return (
                    <ul key={bIdx} className="space-y-3 ps-5 list-disc marker:text-[var(--cpai-primary)]">
                      {block.items.map((item, iIdx) => (
                        <li key={iIdx} className="ps-1">
                          {item.label ? (
                            <>
                              <strong className="font-semibold text-[var(--cpai-text)]">
                                {item.label}:
                              </strong>{' '}
                              <span>{item.text}</span>
                            </>
                          ) : (
                            item.text
                          )}
                        </li>
                      ))}
                    </ul>
                  );
                })}
              </div>

              {/* Step 11 (Index 10): Full Preserved Guidance on When NOT to Build a Skill + Security Red Lines */}
              {skillStepBoundary.currentIndex === 10 && (
                <div className="space-y-6 pt-2" data-testid="ai-skills-security-guidelines">
                  <div className="space-y-3 pt-4 border-t border-[var(--cpai-border)]">
                    <h4 className="text-base sm:text-lg font-semibold text-[var(--cpai-text)]">
                      {lang === 'fa'
                        ? 'در چه مواردی نباید Skill بسازیم؟'
                        : 'When Should You NOT Build a Skill?'}
                    </h4>
                    <ul className="cpai-prose space-y-3 ps-5 list-disc marker:text-[var(--cpai-muted)]">
                      <li>
                        <strong className="font-semibold">
                          کارهای یک‌بارمصرف و غیرتکراری (<bdi dir="ltr">One-Off Tasks</bdi>):
                        </strong>{' '}
                        اگر کاری را فقط سالی یک بار انجام می‌دهید، ساخت و نگهداری Skill برای آن اتلاف وقت است؛ یک پرامپت استاندارد RCTO کافی است.
                      </li>
                      <li>
                        <strong className="font-semibold">
                          طوفان فکری و ایده‌پردازی کاملاً آزاد (<bdi dir="ltr">Open Brainstorming</bdi>):
                        </strong>{' '}
                        اسکیل‌ها برای ایجاد «قالب استاندارد و محدودیت دقیق» طراحی شده‌اند. در کارهایی که نیاز به خلاقیت ساختارشکن دارید، قالب‌های خشک Skill دست‌وپای مدل را می‌بندد.
                      </li>
                      <li>
                        <strong className="font-semibold">اسکیل‌های بیش از حد کلی («همه‌کاره»):</strong>{' '}
                        هرگز یک اسکیل با نام «دستیار کلی شرکت» نسازید؛ هر اسکیل باید فقط یک مأموریت مشخص و تیز (مثلاً فقط «خلاصه‌ساز جلسات» یا فقط «ممیز اضافه‌کاری») داشته باشد.
                      </li>
                    </ul>
                  </div>

                  <aside
                    aria-label={lang === 'fa' ? 'هشدارهای امنیتی AI Skills' : 'AI Skills Security Warnings'}
                    className="rounded-[var(--cpai-radius)] bg-[var(--cpai-error-bg)] border border-[var(--cpai-error-border)] p-5 space-y-3"
                  >
                    <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-[var(--cpai-error)]">
                      <ShieldAlert aria-hidden="true" className="w-5 h-5 shrink-0" />
                      <span>
                        {lang === 'fa'
                          ? 'هشدارهای امنیتی حیاتی هنگام استفاده از AI Skills'
                          : 'Critical Security Rules When Using AI Skills'}
                      </span>
                    </div>
                    <ul className="space-y-2.5 text-[15px] sm:text-[16px] font-normal leading-[1.75] text-[var(--cpai-text)] ps-5 list-disc">
                      <li>
                        <strong className="font-semibold">
                          خطر دانلود اسکیل‌های ناشناس از گیت‌هاب و اینترنت:
                        </strong>{' '}
                        هرگز یک پکیج اسکیل آماده را بدون باز کردن و خواندن خط‌به‌خط فایل{' '}
                        <code dir="ltr" className="font-mono text-sm">SKILL.md</code> و پوشه{' '}
                        <code dir="ltr" className="font-mono text-sm">scripts/</code> در اکانت خود آپلود نکنید (خطر دستورات مخفی <bdi dir="ltr">Prompt Injection</bdi>).
                      </li>
                      <li>
                        <strong className="font-semibold">
                          ممنوعیت قرار دادن رمز عبور و <bdi dir="ltr">API Key</bdi> داخل{' '}
                          <bdi dir="ltr">SKILL.md</bdi>:
                        </strong>{' '}
                        فایل <code dir="ltr" className="font-mono text-sm">SKILL.md</code> یک سند متنی قابل اشتراک‌گذاری است؛ هرگز توکن‌های امنیتی، رمز عبور یا اطلاعات محرمانه را داخل متن آن قرار ندهید.
                      </li>
                      <li>
                        <strong className="font-semibold">
                          قانون تأیید انسان برای عملیات حذف یا ارسال (<bdi dir="ltr">Human-in-the-Loop</bdi>):
                        </strong>{' '}
                        اگر اسکیل شما به ابزارهای MCP (مثل ایمیل یا فایل‌های هارد دیسک) متصل است، همیشه شرط بگذارید که قبل از حذف فایل یا ارسال ایمیل، تأیید نهایی را از کاربر بگیرد.
                      </li>
                    </ul>
                  </aside>
                </div>
              )}

              {/* Calm Single-Surface Key Takeaway */}
              <LessonTakeawayCallout lang={lang} text={currentModule.keyTakeawayFa} />

              {/* Single-Primary-CTA Footer Navigation */}
              <FocusedLessonFooter
                lang={lang}
                boundary={skillStepBoundary}
                onPrev={() =>
                  handleSelectSkillStep(
                    stepBackward(skillStepBoundary.currentIndex, CURRICULUM_MODULES.length)
                  )
                }
                onNext={() =>
                  handleSelectSkillStep(
                    stepForward(skillStepBoundary.currentIndex, CURRICULUM_MODULES.length)
                  )
                }
                secondaryAction={
                  skillStepBoundary.currentIndex === 1
                    ? {
                        label: lang === 'fa' ? 'مشاهده جدول مقایسه مفاهیم' : 'Open comparison table',
                        onClick: () => setAiSkillsView('comparison')
                      }
                    : [4, 5, 7, 8].includes(skillStepBoundary.currentIndex)
                    ? {
                        label: lang === 'fa' ? 'باز کردن آزمایشگاه و سندباکس' : 'Open lab & sandbox',
                        onClick: () => setAiSkillsView('sandbox')
                      }
                    : undefined
                }
                finalStepCta={{
                  label: lang === 'fa' ? 'ورود به آزمایشگاه و ساخت SKILL.md' : 'Open Lab & SKILL.md Builder',
                  onClick: () => setAiSkillsView('sandbox')
                }}
              />
            </article>
          )}

          {aiSkillsView === 'comparison' && (
            <AiSkillsComparisonPanel
              lang={lang}
              onBackToLesson={() => setAiSkillsView('lesson')}
            />
          )}

          {aiSkillsView === 'sandbox' && (
            <AiSkillsLabPanel
              lang={lang}
              readySkills={READY_SKILLS}
              selectedSkillId={selectedSkillId}
              onSelectSkillId={setSelectedSkillId}
              copyToClipboard={copyToClipboard}
              copiedId={copiedId}
              onDownloadSkillFile={handleDownloadSkillFile}
              onLoadToSandbox={onLoadToSandbox}
              metaSkillBuilderPrompt={metaSkillBuilderPrompt}
              customName={customName}
              onChangeCustomName={setCustomName}
              customDesc={customDesc}
              onChangeCustomDesc={setCustomDesc}
              customSteps={customSteps}
              onChangeCustomSteps={setCustomSteps}
              customOutputFormat={customOutputFormat}
              onChangeCustomOutputFormat={setCustomOutputFormat}
              customTrapRule={customTrapRule}
              onChangeCustomTrapRule={setCustomTrapRule}
              generatedCustomSkillMd={generatedCustomSkillMd}
              onBackToLesson={() => setAiSkillsView('lesson')}
            />
          )}
        </FocusedLessonLayout>
      )}

      {/* ===================================================================== */}
      {/* SUB-TAB 2: OBSIDIAN SECOND BRAIN FOCUSED LEARNING (MODULE 4-4)        */}
      {/* ===================================================================== */}
      {subTab === 'obsidian_vault' && (
        <FocusedLessonLayout
          lang={lang}
          moduleCode={lang === 'fa' ? 'ماژول ۴\u200F-\u200F۴' : 'Module 4-4'}
          moduleTitle={
            lang === 'fa'
              ? 'مغز دوم Obsidian و اتصال به Claude و Hermes'
              : 'Obsidian Second Brain + Claude & Hermes Agent'
          }
          moduleSubtitle="Obsidian · Claude Desktop · Hermes Agent"
          steps={focusedObsidianSteps}
          activeStepIndex={obsidianStepBoundary.currentIndex}
          visitedStepIndices={visitedObsidianSteps}
          onSelectStep={handleSelectObsidianStep}
          views={[
            { id: 'lesson', label: lang === 'fa' ? 'مطالعه درس' : 'Lesson' },
            { id: 'comparison', label: lang === 'fa' ? 'مقایسه و معماری والت' : 'Compare & Vault' },
            { id: 'connect', label: lang === 'fa' ? 'اتصال و پرامپت‌ها' : 'Connect & Prompts' }
          ]}
          activeViewId={obsidianView}
          onSelectView={(id) => {
            if (id === 'lesson' || id === 'comparison' || id === 'connect') {
              playTactileSound('thock');
              setObsidianView(id);
            }
          }}
          isStepListVisible={obsidianView === 'lesson'}
          isMobileDrawerOpen={isObsidianDrawerOpen}
          onToggleMobileDrawer={setIsObsidianDrawerOpen}
        >
          {obsidianView === 'lesson' && currentObsidianStep && (
            <article className="space-y-7" data-testid="obsidian-active-step">
              <header className="space-y-3 pb-6 border-b border-[var(--cpai-border)]">
                <div className="flex items-center justify-between gap-2 flex-wrap text-xs sm:text-sm text-[var(--cpai-muted)]">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-[var(--cpai-primary-strong)] tabular-nums">
                      {lang === 'fa'
                        ? `فصل ${formatStepNumber(obsidianStepBoundary.stepNumber, 'fa', true)} از ${formatStepNumber(obsidianStepBoundary.totalSteps, 'fa', true)}`
                        : `Chapter ${formatStepNumber(obsidianStepBoundary.stepNumber, 'en', true)} of ${formatStepNumber(obsidianStepBoundary.totalSteps, 'en', true)}`}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{currentObsidianStep.badgeFa}</span>
                  </div>
                  <bdi dir="ltr" className="text-xs font-mono text-[var(--cpai-muted)] truncate max-w-full">
                    {currentObsidianStep.titleEn}
                  </bdi>
                </div>

                <h3 className="cpai-lesson-title">
                  {lang === 'fa' ? currentObsidianStep.titleFa : currentObsidianStep.titleEn}
                </h3>
              </header>

              {/* Calm Single-Column Structured Reading Flow */}
              <div className="cpai-prose space-y-5">
                {currentObsidianStep.deepDiveFa.map((para, pIdx) => {
                  const { heading, body } = splitPointTitleAndBody(para);
                  return (
                    <section key={pIdx} className="space-y-1.5">
                      {heading && (
                        <h4 className="text-base sm:text-[17px] font-semibold text-[var(--cpai-text)] leading-snug">
                          {formatStepNumber(pIdx + 1, lang)}. {heading}
                        </h4>
                      )}
                      <p>{body}</p>
                    </section>
                  );
                })}
              </div>

              {/* Optional Code / Config Snippet */}
              {currentObsidianStep.codeOrConfigSnippet && (
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-[var(--cpai-text)] flex items-center gap-2">
                      <Code2 aria-hidden="true" className="w-4 h-4 text-[var(--cpai-primary)]" />
                      <span>{currentObsidianStep.codeOrConfigSnippet.titleFa}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          currentObsidianStep.codeOrConfigSnippet!.code,
                          `obs_step_code_${currentObsidianStep.keyHint}`
                        )
                      }
                      className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-1.5 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface)] hover:border-[var(--cpai-primary)] text-xs sm:text-sm font-medium text-[var(--cpai-text)] transition-colors"
                    >
                      {copiedId === `obs_step_code_${currentObsidianStep.keyHint}` ? (
                        <>
                          <Check aria-hidden="true" className="w-4 h-4 text-[var(--cpai-success-text)]" />
                          <span>کپی شد</span>
                        </>
                      ) : (
                        <>
                          <Copy aria-hidden="true" className="w-4 h-4" />
                          <span>کپی کد</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre dir="ltr" className="cpai-code-block p-4 overflow-x-auto text-left select-text">
                    <code>{currentObsidianStep.codeOrConfigSnippet.code}</code>
                  </pre>
                </div>
              )}

              <LessonTakeawayCallout
                lang={lang}
                labelFa="نکته کلیدی و تجربه عملی"
                labelEn="Key Takeaway"
                text={currentObsidianStep.proTipFa}
              />

              <FocusedLessonFooter
                lang={lang}
                boundary={obsidianStepBoundary}
                onPrev={() =>
                  handleSelectObsidianStep(
                    stepBackward(obsidianStepBoundary.currentIndex, OBSIDIAN_SECOND_BRAIN_STEPS.length)
                  )
                }
                onNext={() =>
                  handleSelectObsidianStep(
                    stepForward(obsidianStepBoundary.currentIndex, OBSIDIAN_SECOND_BRAIN_STEPS.length)
                  )
                }
                secondaryAction={
                  obsidianStepBoundary.currentIndex <= 3
                    ? {
                        label: lang === 'fa' ? 'مشاهده مقایسه و معماری والت' : 'Open comparison & Vault',
                        onClick: () => setObsidianView('comparison')
                      }
                    : {
                        label: lang === 'fa' ? 'راهنمای اتصال و ۴ پرامپت آماده' : 'Connection & 4 prompts',
                        onClick: () => setObsidianView('connect')
                      }
                }
                finalStepCta={{
                  label: lang === 'fa' ? 'ورود به راهنمای اتصال و پرامپت‌ها' : 'Open Connection & Prompts',
                  onClick: () => setObsidianView('connect')
                }}
              />
            </article>
          )}

          {obsidianView === 'comparison' && (
            <ObsidianComparisonVaultPanel
              lang={lang}
              onBackToLesson={() => setObsidianView('lesson')}
            />
          )}

          {obsidianView === 'connect' && (
            <ObsidianConnectWorkflowsPanel
              lang={lang}
              claudeMdTemplate={claudeMdTemplate}
              claudeMcpConfigCode={claudeMcpConfigCode}
              copyToClipboard={copyToClipboard}
              copiedId={copiedId}
              onDownloadFile={handleDownloadSkillFile}
              onLoadToSandbox={onLoadToSandbox}
              onBackToLesson={() => setObsidianView('lesson')}
            />
          )}
        </FocusedLessonLayout>
      )}

      {/* ===================================================================== */}
      {/* SUB-TAB 3: MCP PROTOCOL FOCUSED LEARNING MASTERCLASS (MODULE 4-1)     */}
      {/* ===================================================================== */}
      {subTab === 'mcp_protocol' && (
        <FocusedLessonLayout
          lang={lang}
          moduleCode={lang === 'fa' ? 'ماژول ۴\u200F-\u200F۱' : 'Module 4-1'}
          moduleTitle={
            lang === 'fa'
              ? 'پروتکل MCP و ساخت سرورهای FastMCP'
              : 'Model Context Protocol (MCP) & FastMCP Servers'
          }
          moduleSubtitle="Host · Client · Server · Python FastMCP"
          steps={focusedMcpSteps}
          activeStepIndex={mcpStepBoundary.currentIndex}
          visitedStepIndices={visitedMcpSteps}
          onSelectStep={handleSelectMcpStep}
          views={[
            { id: 'lesson', label: lang === 'fa' ? 'مطالعه درس' : 'Lesson' },
            { id: 'architecture', label: lang === 'fa' ? 'معماری و دایرکتوری‌ها' : 'Architecture & Sources' },
            { id: 'troubleshooting', label: lang === 'fa' ? 'جدول عیب‌یابی' : 'Troubleshooting' }
          ]}
          activeViewId={mcpView}
          onSelectView={(id) => {
            if (id === 'lesson' || id === 'architecture' || id === 'troubleshooting') {
              playTactileSound('thock');
              setMcpView(id);
            }
          }}
          isStepListVisible={mcpView === 'lesson'}
          isMobileDrawerOpen={isMcpDrawerOpen}
          onToggleMobileDrawer={setIsMcpDrawerOpen}
        >
          {mcpView === 'lesson' && currentMcpStep && (
            <article className="space-y-7" data-testid="mcp-active-step">
              <header className="space-y-3 pb-6 border-b border-[var(--cpai-border)]">
                <div className="flex items-center justify-between gap-2 flex-wrap text-xs sm:text-sm text-[var(--cpai-muted)]">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-[var(--cpai-primary-strong)] tabular-nums">
                      {lang === 'fa'
                        ? `فصل ${formatStepNumber(mcpStepBoundary.stepNumber, 'fa', true)} از ${formatStepNumber(mcpStepBoundary.totalSteps, 'fa', true)}`
                        : `Chapter ${formatStepNumber(mcpStepBoundary.stepNumber, 'en', true)} of ${formatStepNumber(mcpStepBoundary.totalSteps, 'en', true)}`}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{currentMcpStep.badgeFa}</span>
                  </div>
                  <bdi dir="ltr" className="text-xs font-mono text-[var(--cpai-muted)] truncate max-w-full">
                    {currentMcpStep.titleEn}
                  </bdi>
                </div>

                <h3 className="cpai-lesson-title">
                  {lang === 'fa' ? currentMcpStep.titleFa : currentMcpStep.titleEn}
                </h3>
              </header>

              {/* Calm Single-Column Structured Reading Flow */}
              <div className="cpai-prose space-y-5">
                {currentMcpStep.deepDiveFa.map((paragraph, pIdx) => {
                  const { heading, body } = splitPointTitleAndBody(paragraph);
                  return (
                    <section key={pIdx} className="space-y-1.5">
                      {heading && (
                        <h4 className="text-base sm:text-[17px] font-semibold text-[var(--cpai-text)] leading-snug">
                          {formatStepNumber(pIdx + 1, lang)}. {heading}
                        </h4>
                      )}
                      <p>{body}</p>
                    </section>
                  );
                })}
              </div>

              {/* Code / Config Snippet with Download (M5/M9) & Copy */}
              {currentMcpStep.codeOrConfigSnippet && (
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-[var(--cpai-text)] flex items-center gap-2">
                      <Code2 aria-hidden="true" className="w-4 h-4 text-[var(--cpai-primary)]" />
                      <span>{currentMcpStep.codeOrConfigSnippet.titleFa}</span>
                    </span>
                    <div className="flex items-center gap-2 flex-wrap">
                      {(currentMcpStep.keyHint === 'M5' || currentMcpStep.keyHint === 'M9') && (
                        <button
                          type="button"
                          onClick={() =>
                            handleDownloadSkillFile(
                              currentMcpStep.keyHint === 'M5' ? 'server.py' : 'todo_server.py',
                              currentMcpStep.codeOrConfigSnippet?.code || ''
                            )
                          }
                          className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-1.5 rounded-[var(--cpai-radius)] bg-[var(--cpai-primary)] hover:bg-[var(--cpai-primary-strong)] text-white dark:text-[#0F171A] text-xs sm:text-sm font-semibold transition-colors"
                        >
                          <Download aria-hidden="true" className="w-4 h-4" />
                          <span>
                            دانلود <bdi dir="ltr">{currentMcpStep.keyHint === 'M5' ? 'server.py' : 'todo_server.py'}</bdi>
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
                        className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-1.5 rounded-[var(--cpai-radius)] border border-[var(--cpai-border)] bg-[var(--cpai-surface)] hover:border-[var(--cpai-primary)] text-xs sm:text-sm font-medium text-[var(--cpai-text)] transition-colors"
                      >
                        {copiedId === `mcp_step_code_${currentMcpStep.keyHint}` ? (
                          <>
                            <Check aria-hidden="true" className="w-4 h-4 text-[var(--cpai-success-text)]" />
                            <span>کپی شد</span>
                          </>
                        ) : (
                          <>
                            <Copy aria-hidden="true" className="w-4 h-4" />
                            <span>کپی کد / دستور</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <pre dir="ltr" className="cpai-code-block p-4 overflow-x-auto text-left select-text">
                    <code>{currentMcpStep.codeOrConfigSnippet.code}</code>
                  </pre>
                </div>
              )}

              <LessonTakeawayCallout
                lang={lang}
                labelFa="نکته کلیدی و تجربی"
                labelEn="Key Takeaway"
                text={currentMcpStep.proTipFa}
              />

              <FocusedLessonFooter
                lang={lang}
                boundary={mcpStepBoundary}
                onPrev={() =>
                  handleSelectMcpStep(
                    stepBackward(mcpStepBoundary.currentIndex, MCP_MASTERCLASS_STEPS.length)
                  )
                }
                onNext={() =>
                  handleSelectMcpStep(
                    stepForward(mcpStepBoundary.currentIndex, MCP_MASTERCLASS_STEPS.length)
                  )
                }
                secondaryAction={
                  mcpStepBoundary.currentIndex <= 4
                    ? {
                        label: lang === 'fa' ? 'جدول مقایسه Tools / Resources / Prompts' : 'Compare MCP capabilities',
                        onClick: () => setMcpView('architecture')
                      }
                    : {
                        label: lang === 'fa' ? 'مشاهده جدول عیب‌یابی (۷ خطا)' : 'Open troubleshooting guide',
                        onClick: () => setMcpView('troubleshooting')
                      }
                }
                finalStepCta={{
                  label: lang === 'fa' ? 'مرور جدول عیب‌یابی سریع MCP' : 'Review MCP Troubleshooting',
                  onClick: () => setMcpView('troubleshooting')
                }}
              />
            </article>
          )}

          {mcpView === 'architecture' && (
            <McpArchitectureComparisonPanel
              lang={lang}
              onBackToLesson={() => setMcpView('lesson')}
            />
          )}

          {mcpView === 'troubleshooting' && (
            <McpTroubleshootingPanel
              lang={lang}
              onBackToLesson={() => setMcpView('lesson')}
            />
          )}
        </FocusedLessonLayout>
      )}
    </section>
  );
};
