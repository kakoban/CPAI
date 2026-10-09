import React, { useState, useEffect } from 'react';
import { Language } from '../types/cpmai';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Check,
  Copy,
  RotateCcw,
  Sparkles,
  FileText,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Layers,
  Cpu,
  Database,
  Workflow,
  Server,
  Shield,
  Zap,
  Split,
  Eye,
  Film,
  Users,
  Settings,
  Boxes
} from 'lucide-react';

interface Page8Props {
  lang: Language;
  content: string;
  onChangeContent: (val: string) => void;
  onGoToPage7: () => void;
  onGoToPage9: () => void;
}

export const Page8NoncognitiveAlternatives: React.FC<Page8Props> = ({
  lang,
  content,
  onChangeContent,
  onGoToPage7,
  onGoToPage9
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedQ1, setCopiedQ1] = useState(false);
  const [copiedQ2, setCopiedQ2] = useState(false);
  const [activeTab, setActiveTab] = useState<'worksheet' | 'builder' | 'architecture'>('worksheet');

  // Question 1: What are the noncognitive (non-AI) portions of this project that will be used in conjunction with the cognitive components?
  const [q1NoncogPortions, setQ1NoncogPortions] = useState('');

  // Question 2: Are non-cognitive automation alternatives possible for this iteration? If so, why are they not being used for this project iteration?
  const [q2AutoAlternativesPossible, setQ2AutoAlternativesPossible] = useState<'yes' | 'no' | 'partial' | ''>('');
  const [q2WhyNotUsed, setQ2WhyNotUsed] = useState('');

  // Categories helper for Question 1
  const [q1UiUx, setQ1UiUx] = useState('');
  const [q1DataStorage, setQ1DataStorage] = useState('');
  const [q1BusinessLogic, setQ1BusinessLogic] = useState('');
  const [q1Apis, setQ1Apis] = useState('');
  const [q1Hitl, setQ1Hitl] = useState('');

  // If content has initial text, parse or initialize helper states if needed
  useEffect(() => {
    if (content && !q1NoncogPortions && !q2WhyNotUsed) {
      // Try to split by Question markers if present
      const q1Match = content.match(/Question 1[^\n]*\n([\s\S]*?)(?=Question 2|پرسش ۲|$)/i) ||
                      content.match(/بخش‌های غیرشناختی[^\n]*\n([\s\S]*?)(?=اتوماسیون غیرشناختی|Question 2|$)/i);
      const q2Match = content.match(/Question 2[^\n]*\n([\s\S]*)/i) ||
                      content.match(/پرسش ۲[^\n]*\n([\s\S]*)/i);

      if (q1Match && q1Match[1]) {
        setQ1NoncogPortions(q1Match[1].trim());
      }
      if (q2Match && q2Match[1]) {
        setQ2WhyNotUsed(q2Match[1].trim());
      }
    }
  }, [content]);

  // Synchronize structured answers back to main canvas content
  const handleCompileToCanvas = (customQ1?: string, customQ2?: string) => {
    const finalQ1 = customQ1 !== undefined ? customQ1 : q1NoncogPortions;
    const finalQ2 = customQ2 !== undefined ? customQ2 : q2WhyNotUsed;

    const compiled =
      lang === 'fa'
        ? `======================================================================
کتاب کار CPMAI - اسلاید ۱۸ (صفحه ۸)
گروه وظایف: الزامات پروژه‌های شناختی (Cognitive Project Requirements)
وظیفه: الزامات شناختی (Cognitive Requirements)
======================================================================

پرسش ۱ (Question 1):
کدام بخش‌های غیرشناختی (غیر مبتنی بر هوش مصنوعی) این پروژه در کنار و در پیوند با مؤلفه‌های شناختی استفاده خواهند شد؟
What are the noncognitive (non-AI) portions of this project that will be used in conjunction with the cognitive components?
----------------------------------------------------------------------
${finalQ1 || '(هنوز پاسخی ثبت نشده است)'}


پرسش ۲ (Question 2):
آیا راه‌حل‌های اتوماسیون غیرشناختی برای این تکرار (ایترِیشن) پروژه امکان‌پذیر هستند؟ در صورت مثبت بودن پاسخ، چرا در این تکرار پروژه استفاده نمی‌شوند؟
Are non-cognitive automation alternatives possible for this iteration? If so, why are they not being used for this project iteration?
----------------------------------------------------------------------
وضعیت امکان‌پذیری اتوماسیون سنتی: ${
            q2AutoAlternativesPossible === 'yes'
              ? 'بله (امکان‌پذیر است اما ناکافی)'
              : q2AutoAlternativesPossible === 'no'
              ? 'خیر (کاملاً ناممکن به دلیل پیچیدگی/حجم غیرخطی)'
              : q2AutoAlternativesPossible === 'partial'
              ? 'تا حدی (به عنوان خط مبنا یا فیلتر اولیه)'
              : 'ارزیابی‌شده'
          }

توجیه و دلایل عدم استفاده در این تکرار:
${finalQ2 || '(هنوز پاسخی ثبت نشده است)'}
`
        : `======================================================================
CPMAI WORKBOOK - SLIDE 18 (PAGE 8)
Task Group: Cognitive Project Requirements
Task: Cognitive Requirements
======================================================================

Question 1:
What are the noncognitive (non-AI) portions of this project that will be used in conjunction with the cognitive components?
----------------------------------------------------------------------
${finalQ1 || '(No response entered yet)'}


Question 2:
Are non-cognitive automation alternatives possible for this iteration?
If so, why are they not being used for this project iteration?
----------------------------------------------------------------------
Feasibility Status: ${
            q2AutoAlternativesPossible === 'yes'
              ? 'Yes (Feasible but inadequate)'
              : q2AutoAlternativesPossible === 'no'
              ? 'No (Infeasible due to non-linear dimensionality/scale)'
              : q2AutoAlternativesPossible === 'partial'
              ? 'Partially feasible (Usable only as baseline or coarse pre-filter)'
              : 'Evaluated'
          }

Detailed Justification / Why Not Used in this Iteration:
${finalQ2 || '(No response entered yet)'}
`;

    onChangeContent(compiled);
  };

  const handleCopyCanvas = () => {
    if (!content) return;
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  const handleCopyQ1 = () => {
    if (!q1NoncogPortions) return;
    navigator.clipboard.writeText(q1NoncogPortions).then(() => {
      setCopiedQ1(true);
      setTimeout(() => setCopiedQ1(false), 2000);
    });
  };

  const handleCopyQ2 = () => {
    if (!q2WhyNotUsed) return;
    navigator.clipboard.writeText(q2WhyNotUsed).then(() => {
      setCopiedQ2(true);
      setTimeout(() => setCopiedQ2(false), 2000);
    });
  };

  // Pre-loaded Template
  const handleInsertTemplate = () => {
    const q1Tpl =
      lang === 'fa'
        ? `۱. رابط کاربری (Frontend / Presentation Layer):
- داشبورد تحت وب واکنش‌گرا و رابط کاربری موبایل برای نمایش پیشنهادات و نتایج استنتاج هوش مصنوعی.
- فرم‌های تعاملی دریافت بازخورد کاربر (کلیک، پسندیدن، گزارش خطا یا رد پیشنهاد).

۲. پایگاه داده و ذخیره‌سازی داده‌ها (Data Persistence & Storage):
- پایگاه داده رابطه‌ای (PostgreSQL) برای ذخیره احراز هویت، تراکنش‌ها و تاریخچه اقدامات کاربر.
- انبار داده (Data Warehouse / Lakehouse) برای ذخیره رویدادهای خام جهت بازآموزی مدل در آینده.

۳. خطوط انتقال داده و وب‌سرویس‌ها (ETL, APIs & Microservices):
- وب‌سرویس‌های RESTful و gRPC برای مدیریت درخواست‌ها و اتصال سیستم‌های موجود به مدل شناختی.
- پایپ‌لاین‌های ETL برای پاک‌سازی، نرمال‌سازی و اعتبارسنجی اولیه فرمت داده‌های ورودی.

۴. موتور قواعد قطعی و سیاست‌های کسب‌وکار (Deterministic Business Logic & Rules):
- بررسی قوانین انطباق قانونی، فیلترهای امنیتی و بلک‌لیست‌ها قبل از ارسال به مدل یا تحویل به کاربر.
- مکانیزم Fallback قطعی در صورت قطع ارتباط با سرویس استنتاج مدل.

۵. نظارت انسانی و سیستم بازبینی (Human-in-the-Loop & Audit Queue):
- پنل ویژه کارشناسان عملیات برای بررسی موارد مشکوک یا مواردی با ضریب اطمینان پیش‌بینی زیر آستانه تعیین‌شده.`
        : `1. User Interface & Presentation Layer:
- Responsive web client & mobile interfaces to present AI inferences and rank ordered recommendations.
- Interactive user feedback controls (implicit watch logs, explicit thumbs-up/down, dismiss triggers).

2. Data Persistence & Stores:
- Relational transactional database (PostgreSQL) storing user profiles, entitlements, and canonical state.
- Data Lakehouse / feature store caching pre-computed feature vectors and telemetry for continuous retraining.

3. Integration Layer & APIs (Microservices):
- High-throughput REST & gRPC API gateways connecting client requests with model inference endpoints.
- Deterministic ingestion & ETL pipelines executing schema validation and data sanitization.

4. Deterministic Business Rules & Policy Filters:
- Guardrail engines applying content censorship, regional regulatory restrictions, and blocklists.
- Hardcoded fallback cascades (e.g., editorial top-lists) if model inference times out (>150ms).

5. Human-in-the-Loop (HITL) & Governance:
- Operations back-office console allowing human analysts to triage borderline high-stakes decisions.`;

    const q2Tpl =
      lang === 'fa'
        ? `وضعیت امکان‌پذیری: بله، اتوماسیون‌های سنتی (شامل اسکریپت‌های شرطی If-Then، موتورهای قواعد ایستا، جاب‌های زمان‌بندی‌شده و فرمول‌های وزنی خطی) از لحاظ فنی قابل پیاده‌سازی هستند.

چرا برای این تکرار پروژه استفاده نمی‌شوند؟
۱. انفجار پیچیدگی قوانین (Rule Combinatorial Explosion):
برای پوشش دادن تنوع رفتار کاربران و شرایط متغیر، به هزاران قانون شرطی تو در تو نیاز است که نگهداری و دیباگ آن‌ها عملاً غیرممکن بوده و پس از هر تغییر کسب‌وکار دچار شکنندگی شدید می‌شوند.

۲. ناتوانی در تعمیم و یادگیری از داده‌های بدون ساختار / نویزی:
اتوماسیون سنتی قابلیت درک الگوهای پنهان و روابط غیرخطی میان صدها متغیر را ندارد و با تغییر الگوهای رفتاری بلافاصله دچار افت دقت فاحش می‌شود.

۳. هزینه فرصت مالی و تجربه کاربری ضعیف:
آزمایش‌های خط مبنا نشان داد که اتوماسیون غیرشناختی بیش از ۵۵ درصد از موقعیت‌های واقعی را از دست می‌دهد یا هشدارهای کاذب متعددی تولید می‌کند که منجر به خستگی کارشناسان و افت درآمد می‌شود.

۴. تفکیک نقش‌ها در این تکرار:
اتوماسیون سنتی صرفاً به عنوان لایه پشتیبان (Fallback) و اعتبارسنج اولیه ورودی‌ها حفظ می‌شود، اما هسته مرکزی تصمیم‌گیری و اولویت‌بندی به مؤلفه شناختی واگذار می‌گردد تا هدف بازگشت سرمایه تحقق یابد.`
        : `Feasibility Status: Yes, non-cognitive automation alternatives (deterministic IF-THEN rules, heuristic scoring, regex pipelines, static SQL jobs) are technically possible to construct.

Why they are NOT being used for this project iteration:
1. Combinatorial Complexity Explosion:
Capturing real-world user variance requires thousands of conflicting deterministic branches. Engineering and maintaining these rule matrices is unsustainable and fragile.

2. Inability to Generalize Across Non-Linear Multidimensional Signals:
Deterministic automation cannot learn latent representations or generalize to novel patterns. As soon as user habits drift, static heuristics degrade catastrophically.

3. Substantial Value & Revenue Opportunity Loss:
Empirical baselines showed heuristic scoring produced a 42% false-positive rate and left over 60% of addressable opportunities uncaptured, violating the ROI target.

4. Clear Scope Boundary for this Iteration:
Deterministic automation is retained strictly as an outer fallback and validation wrapper, while the high-dimensional inference engine is delegated exclusively to the cognitive component.`;

    setQ1NoncogPortions(q1Tpl);
    setQ2AutoAlternativesPossible('yes');
    setQ2WhyNotUsed(q2Tpl);
    handleCompileToCanvas(q1Tpl, q2Tpl);
  };

  // Case study presets
  const handleLoadCaseStudy = (type: 'streaming' | 'fraud' | 'churn' | 'health') => {
    let q1 = '';
    let q2 = '';

    if (type === 'streaming') {
      q1 =
        lang === 'fa'
          ? `[پروژه: سامانه پیشنهادگر ویدیویی استریمینگ]
بخش‌های غیرشناختی همکار با مدل هوش مصنوعی:
۱. رابط کاربری: اپلیکیشن موبایل، وب و تلویزیون هوشمند (نمایش پوسترها، مدیریت چرخش کاروسل ویدیوها).
۲. شبکه توزیع محتوا و سرورها (CDN / Video Delivery): سرورهای استریم ویدیو، ترنسکدینگ و استریم با کیفیت متغیر.
۳. پایگاه داده کاتالوگ: پایگاه داده کاتالوگ ویدیوها، نام بازیگران، سال تولید و متادیتا.
۴. موتور قوانین کسب‌وکار قطعی: فیلتر رده‌بندی سنی (PG-13, R)، فیلتر مجوزهای پخش در کشور کاربر، حذف محتوای منقضی‌شده.
۵. خط لوله تله‌متری: سرویس ثبت گزارش زمان مکث کاربر روی پوستر و تاریخچه مشاهده (Kafka / Event Bus).`
          : `[Case Study: Video Streaming Recommendation & Discovery Platform]
Noncognitive portions used in conjunction with cognitive components:
1. Client UI & Player: Web, mobile, and Smart TV frontends displaying thumbnail ribbons, video players, and carousel carousels.
2. Content Delivery Network (CDN): High-bandwidth video caching and multi-bitrate streaming servers.
3. Relational Video Catalog DB: PostgreSQL cluster housing video metadata, actor credits, DRM licenses, and release dates.
4. Deterministic Business Gateways: Mandatory PG/age rating parental controls, regional licensing geo-blocks, and expired title filters.
5. Telemetry Pipeline: High-throughput Kafka event broker collecting player playhead timestamps, pauses, and dwell times.`;

      q2 =
        lang === 'fa'
          ? `آیا اتوماسیون غیرشناختی ممکن است؟
بله؛ فهرست استاتیک ۱۰ فیلم پربازدید هفته (Top-10 trending)، فیلتر ساده بر اساس ژانر انتخابی کاربر، یا اسکریپت مرتب‌سازی بر اساس تاریخ انتشار کاملاً شدنی هستند.

چرا برای این تکرار استفاده نمی‌شوند؟
۱. عدم شخصی‌سازی: همه کاربران فارغ از سلیقه، صفحه اصلی یکسانی می‌دیدند که نرخ کلیک را ۴۵٪ کاهش می‌داد.
۲. شکست در نمایش کاتالوگ بلند (Long-tail catalog): ۹۰ درصد فیلم‌های ارزشمند پلتفرم هرگز به کاربران علاقه‌مند نشان داده نمی‌شدند.
۳. نرخ ریزش مشترکین: داده‌های مرحله شناخت کسب‌وکار اثبات کرد نبود شخصی‌سازی عامل اصلی لغو اشتراک ۳۲٪ کاربران است. مدل هوش مصنوعی با بهینه‌سازی احتمال کلیک و تماشا، این نقیصه را برطرف می‌کند.`
          : `Are non-cognitive automation alternatives possible?
Yes; static top-10 popularity lists, simple SQL genre filters, and release-date reverse chronological sorts are straightforward to implement.

Why are they NOT being used for this project iteration?
1. Zero Personalization: Every subscriber sees an identical homepage, causing a 45% lower click-through rate.
2. Inability to Surface Long-Tail Catalog: Over 85% of high-cost licensed library content remains buried and unmonetized.
3. High Churn Driver: Business understanding proved generic catalogs drive 32% of customer cancellations. Predictive personalization directly addresses this revenue leakage.`;
    } else if (type === 'fraud') {
      q1 =
        lang === 'fa'
          ? `[پروژه: سیستم تشخیص تراکنش‌های مشکوک و تقلب بانکی]
بخش‌های غیرشناختی همکار با مدل هوش مصنوعی:
۱. درگاه پرداخت و سوئیچ بانکی (Core Banking & Payment Switch): پردازش تراکنش‌های شتاب، تسویه حساب و اعتبارسنجی کارت.
۲. قوانین سخت‌گیرانه انطباق (Compliance & Sanctions Rules): بررسی بلک‌لیست مراجع قضایی، کنترل محدودیت سقف تراکنش روزانه.
۳. سرویس اطلاع‌رسانی: ارسال فوری پیامک و نوتیفیکیشن مسدودی موقت به تلفن همراه صاحب حساب.
۴. داشبورد بازرسان انسانی (HITL Console): صف بررسی دستی برای پرونده‌های با ضریب ریسک بین ۰.۶ تا ۰.۸۵.`
          : `[Case Study: Real-Time Financial Fraud Detection]
Noncognitive portions used in conjunction with cognitive components:
1. Core Payment Gateway Switch: Transaction routing, card authorization, cardholder balance verification, and ledger settlement.
2. Deterministic Compliance Checkers: Anti-Money Laundering (AML) static blacklists, OFAC sanctions filters, and hard daily velocity caps.
3. Notification Dispatcher: Real-time SMS and push alert microservices prompting instant user confirmation for blocked charges.
4. Human Compliance Console (HITL): Case triage workbench for compliance officers auditing transactions scored in the uncertainty band (0.60 - 0.85).`;

      q2 =
        lang === 'fa'
          ? `آیا اتوماسیون غیرشناختی ممکن است؟
بله؛ تعریف قوانین ایستا مثل "اگر مبلغ بیشتر از ۵۰ میلیون تومان بود مسدود کن" یا "اگر تراکنش خارج از کشور بود رد کن".

چرا برای این تکرار استفاده نمی‌شوند؟
۱. نرخ بالای مثبت کاذب (False Positives): مسدودسازی کارت مشتریان معتبر هنگام سفر یا خریدهای بزرگ که باعث نارضایتی شدید و شکایت می‌شد.
۲. دور زدن آسان قوانین توسط کلاهبرداران: مهاجمان مبالغ را به ۴۹ میلیون تومان تقسیم می‌کردند (Smurfing) و قوانین سنتی دور زده می‌شد.
۳. مدل یادگیری ماشین با تحلیل ارتباطات پنهان گراف و توالی زمانی، دقت تشخیص را بدون آزار مشتریان عادی به بیش از ۹۵٪ می‌رساند.`
          : `Are non-cognitive automation alternatives possible?
Yes; traditional threshold rules (e.g., flag transactions > $5,000, or foreign IP addresses).

Why are they NOT being used for this project iteration?
1. Severe False Positive Friction: High-value legitimate cardholders traveling or making major purchases had cards blocked (65% false alarm rate).
2. Trivial for Fraud Rings to Evade: Criminals easily evade hard thresholds via micro-structuring ($4,990 transactions).
3. The cognitive model evaluates multi-dimensional behavioral patterns simultaneously, slashing false positives by 78% while catching complex syndicated fraud.`;
    } else if (type === 'churn') {
      q1 =
        lang === 'fa'
          ? `[پروژه: پیش‌بینی و پیشگیری از ریزش مشتریان B2B/SaaS]
بخش‌های غیرشناختی همکار با مدل هوش مصنوعی:
۱. سیستم مدیریت ارتباط با مشتری (CRM - Salesforce/HubSpot): مدیریت پرونده‌های مشتریان، ثبت تاریخچه قراردادها و مسئول فروش.
۲. سیستم تیکتینگ پشتیبانی: Zendesk/Jira Service Desk برای ثبت مشکلات فنی و زمان پاسخگویی به مشتری.
۳. موتور اتوماسیون ایمیل: سرویس ارسال ایمیل‌های نگهداشت یا ارجاع تیکت به مدیر حسابداری مشتریان پرخطر.`
          : `[Case Study: Enterprise Customer Churn Prediction]
Noncognitive portions used in conjunction with cognitive components:
1. CRM System (Salesforce/HubSpot): Account tenure, contract value, customer success assignments, and tier entitlements.
2. Customer Support Ticketing: Helpdesk databases tracking ticket escalation counts, bug severities, and SLA response delays.
3. Automated Marketing Orchestrator: Email/webhook dispatchers triggering discount retention offers or escalation alerts to CS managers.`;

      q2 =
        lang === 'fa'
          ? `آیا اتوماسیون غیرشناختی ممکن است؟
بله؛ اسکریپتی که مشتریانی که بیش از ۳۰ روز وارد سامانه نشده‌اند یا بیش از ۵ تیکت باز دارند را برچسب پرخطر می‌زند.

چرا برای این تکرار استفاده نمی‌شوند؟
۱. هشدار بسیار دیرهنگام (Lagging Indicator): وقتی مشتری ۳۰ روز وارد نشده، عملاً تصمیم به لغو گرفته و دیگر امکان بازگرداندن او وجود ندارد.
۲. نادیده گرفتن سیگنال‌های نامحسوس: تغییر در عمق استفاده از ویژگی‌ها یا افت فعالیت زیرمجموعه‌ها در قوانین سنتی دیده نمی‌شود، در حالی که مدل شناختی ۶۰ روز قبل هشدار می‌دهد.`
          : `Are non-cognitive automation alternatives possible?
Yes; heuristic filters flagging accounts inactive for > 30 days or logging > 5 open bug tickets.

Why are they NOT being used for this project iteration?
1. Too Late to Intervene (Lagging Signal): By the time an enterprise user is inactive for 30 days, churn is already irreversible.
2. Misses Subtle Leading Behavioral Precursors: Gradual drop-off in feature depth or API usage goes undetected by binary rules. The cognitive model predicts churn 60 days in advance when proactive intervention can succeed.`;
    } else {
      q1 =
        lang === 'fa'
          ? `[پروژه: تریاژ هوشمند تصاویر رادیولوژی اورژانس]
بخش‌های غیرشناختی همکار با مدل هوش مصنوعی:
۱. دستگاه‌های تصویربرداری و پروتکل PACS/DICOM: سخت‌افزار سی‌تی‌اسکن، فرمت تصاویر پزشکی و ذخیره‌سازی ابری امن.
۲. پرونده الکترونیک سلامت (EHR): ثبت مشخصات بالینی بیمار، حساسیت‌ها و پزشک معالج.
۳. سیستم پیجر و هشدار اورژانس بیمارستان: ارسال آلارم صوتی به رادیولوژیست کشیک و بخش مراقبت‌های ویژه.`
          : `[Case Study: Emergency Radiology Triage]
Noncognitive portions used in conjunction with cognitive components:
1. PACS / DICOM Imaging Infrastructure: CT scanner hardware, hospital image archive, and secure encrypted transmission bus.
2. Hospital Electronic Health Record (EHR): Patient medical history, vital signs, and attending physician roster.
3. Hospital Urgent Paging & Alert System: Audible paging alert system notifying on-duty radiologists for high-priority cases.`;

      q2 =
        lang === 'fa'
          ? `آیا اتوماسیون غیرشناختی ممکن است؟
بله؛ سیستم نوبت‌دهی معمولی بر اساس زمان ورود بیمار (FIFO) یا اولویت‌بندی صرفاً بر اساس نوع دستور پزشک عمومی.

چرا برای این تکرار استفاده نمی‌شوند؟
۱. تاخیر مرگبار: خونریزی مغزی حاد در صف نوبت معمولی ممکن است ۳ تا ۴ ساعت منتظر بماند.
۲. سیستم‌های غیرشناختی قادر به دیدن و فهم محتوای پیکسل‌های سی‌تی‌اسکن نیستند. مدل بینایی ماشین شناختی در کمتر از ۳ ثانیه اسکن را تحلیل و موارد حاد را به صدر صف منتقل می‌کند.`
          : `Are non-cognitive automation alternatives possible?
Yes; standard First-In, First-Out (FIFO) queue automation or static priority based solely on order type code.

Why are they NOT being used for this project iteration?
1. Life-Threatening Triage Delays: A patient with an acute intracranial hemorrhage could wait 3 hours in a standard FIFO queue.
2. Non-cognitive software cannot interpret radiological pixel morphology. The cognitive computer vision model triages critical findings in < 3 seconds, prioritizing critical patients to the top of the queue.`;
    }

    setQ1NoncogPortions(q1);
    setQ2AutoAlternativesPossible('yes');
    setQ2WhyNotUsed(q2);
    handleCompileToCanvas(q1, q2);
  };

  const wordCount = content ? content.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = content ? content.length : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner / Slide Context */}
      <div className="bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] rounded-xl p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e5e7eb] dark:border-[#2d3942] pb-4 mb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#00738c]/10 text-[#00738c] dark:bg-[#00738c]/20 dark:text-[#6ee7b7]">
              <span>Task Group: Cognitive Project Requirements</span>
              <span>•</span>
              <span>Task: Cognitive Requirements</span>
              <span>•</span>
              <span className="font-bold underline">{lang === 'fa' ? 'اسلاید ۱۸' : 'Slide 18'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#1c2830] dark:text-[#e8ebe9]">
              {lang === 'fa'
                ? 'اسلاید ۱۸: مؤلفه‌های غیرشناختی مکمل و جایگزین‌های اتوماسیون'
                : 'Slide 18: Noncognitive Portions & Automation Alternatives'}
            </h1>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            {/* View Mode Switcher */}
            <div className="inline-flex rounded-lg border border-[#d9dad5] dark:border-[#2d3942] p-0.5 bg-[#f4f4f1] dark:bg-[#12171b] text-xs">
              <button
                onClick={() => setActiveTab('worksheet')}
                className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1.5 ${
                  activeTab === 'worksheet'
                    ? 'bg-[#ffffff] dark:bg-[#1a2228] text-[#1c2830] dark:text-[#e8ebe9] shadow-2xs font-semibold'
                    : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830]'
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-[#00738c]" />
                <span>{lang === 'fa' ? 'نمای کاربرگ اسلاید ۱۸' : 'Slide 18 Worksheet'}</span>
              </button>

              <button
                onClick={() => setActiveTab('builder')}
                className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1.5 ${
                  activeTab === 'builder'
                    ? 'bg-[#ffffff] dark:bg-[#1a2228] text-[#1c2830] dark:text-[#e8ebe9] shadow-2xs font-semibold'
                    : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830]'
                }`}
              >
                <Settings className="w-3.5 h-3.5 text-[#00738c]" />
                <span>{lang === 'fa' ? 'سازنده پرسش‌ها' : 'Question Builder'}</span>
              </button>

              <button
                onClick={() => setActiveTab('architecture')}
                className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1.5 ${
                  activeTab === 'architecture'
                    ? 'bg-[#ffffff] dark:bg-[#1a2228] text-[#1c2830] dark:text-[#e8ebe9] shadow-2xs font-semibold'
                    : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830]'
                }`}
              >
                <Boxes className="w-3.5 h-3.5 text-[#00738c]" />
                <span>{lang === 'fa' ? 'معماری مکمل سیستم' : 'System Architecture'}</span>
              </button>
            </div>
          </div>
        </div>

        <p className="text-sm text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
          {lang === 'fa'
            ? 'در متدولوژی CPMAI، هیچ مدل هوش مصنوعی در خلاء کار نمی‌کند. اسلاید ۱۸ تعیین می‌کند که چه بخش‌های غیرشناختی (دیتابیس، UI، خطوط انتقال، قوانین قطعی و نیروی انسانی) در کنار مدل کار می‌کنند و آیا اتوماسیون سنتی برای این تکرار ممکن است و چرا به تنهایی کافی نیست.'
            : 'In CPMAI methodology, no AI model functions in a vacuum. Slide 18 documents the deterministic noncognitive components (UI, databases, microservices, business rules, HITL) that operate in conjunction with cognitive models, and rigorously evaluates why non-cognitive automation alternatives are insufficient for this project iteration.'}
        </p>

        {/* Quick Action Case Study Presets */}
        <div className="mt-4 pt-3 border-t border-[#e5e7eb] dark:border-[#2d3942] flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-[#5d6b73] dark:text-[#9aa8b0] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#00738c]" />
            {lang === 'fa' ? 'نمونه‌های آماده صنایع:' : 'Industry Case Presets:'}
          </span>

          <button
            onClick={() => handleLoadCaseStudy('streaming')}
            className="px-2.5 py-1 text-xs rounded-md border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] hover:border-[#00738c] text-[#1c2830] dark:text-[#e8ebe9] transition-colors flex items-center gap-1"
          >
            <Film className="w-3 h-3 text-[#00738c]" />
            <span>{lang === 'fa' ? 'استریمینگ ویدیو' : 'Video Streaming'}</span>
          </button>

          <button
            onClick={() => handleLoadCaseStudy('fraud')}
            className="px-2.5 py-1 text-xs rounded-md border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] hover:border-[#00738c] text-[#1c2830] dark:text-[#e8ebe9] transition-colors flex items-center gap-1"
          >
            <Shield className="w-3 h-3 text-[#b3432f]" />
            <span>{lang === 'fa' ? 'کشف تقلب مالی' : 'Fraud Detection'}</span>
          </button>

          <button
            onClick={() => handleLoadCaseStudy('churn')}
            className="px-2.5 py-1 text-xs rounded-md border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] hover:border-[#00738c] text-[#1c2830] dark:text-[#e8ebe9] transition-colors flex items-center gap-1"
          >
            <Users className="w-3 h-3 text-[#0f4c5c]" />
            <span>{lang === 'fa' ? 'ریزش مشتریان' : 'Customer Churn'}</span>
          </button>

          <button
            onClick={() => handleLoadCaseStudy('health')}
            className="px-2.5 py-1 text-xs rounded-md border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] hover:border-[#00738c] text-[#1c2830] dark:text-[#e8ebe9] transition-colors flex items-center gap-1"
          >
            <Zap className="w-3 h-3 text-[#2f7d5b]" />
            <span>{lang === 'fa' ? 'تریاژ تصویربرداری پزشکی' : 'Radiology Triage'}</span>
          </button>

          <button
            onClick={handleInsertTemplate}
            className="ml-auto px-3 py-1 text-xs font-semibold rounded-md bg-[#00738c] text-white hover:bg-[#005a6e] transition-colors flex items-center gap-1"
          >
            <FileText className="w-3 h-3" />
            <span>{lang === 'fa' ? 'درج قالب استاندارد اسلاید ۱۸' : 'Insert Slide 18 Template'}</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'worksheet' && (
        <div className="space-y-6">
          {/* EXACT SLIDE 18 VISUAL LAYOUT (Matching the uploaded image) */}
          <div className="border-2 border-[#8da5b5] dark:border-[#384955] rounded-xl bg-[#fafbfa] dark:bg-[#151c22] p-5 sm:p-6 shadow-sm">
            {/* Slide Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#cbd5e1] dark:border-[#2a3842] mb-6">
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-[#00738c] dark:text-[#6ee7b7]">
                  Task Group: Cognitive Project Requirements
                </p>
                <h2 className="text-lg sm:text-xl font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                  Task: Cognitive Requirements
                </h2>
              </div>
              <div className="mt-2 sm:mt-0 flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#e2e8f0] dark:bg-[#25323d] text-[#475569] dark:text-[#94a3b8]">
                  SLIDE 18
                </span>
              </div>
            </div>

            {/* BOX 1: What are the noncognitive (non-AI) portions of this project... */}
            <div className="mb-6 rounded-lg border border-[#93c5fd] dark:border-[#1e3a8a] bg-[#eff6ff]/60 dark:bg-[#1e293b]/50 overflow-hidden shadow-2xs">
              {/* Box 1 Header */}
              <div className="bg-[#dbeafe] dark:bg-[#1e3a8a]/40 px-4 py-3 border-b border-[#bfdbfe] dark:border-[#1e3a8a] flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-[#1e3a8a] dark:text-[#93c5fd] flex items-center gap-2">
                    <Layers className="w-4 h-4 shrink-0 text-[#2563eb]" />
                    <span>
                      What are the noncognitive (non-AI) portions of this project that will be used in conjunction with the cognitive components?
                    </span>
                  </h3>
                  {lang === 'fa' && (
                    <p className="text-xs text-[#1d4ed8] dark:text-[#bfdbfe] font-medium">
                      کدام بخش‌های غیرشناختی (غیر مبتنی بر هوش مصنوعی) این پروژه در کنار و در پیوند با مؤلفه‌های شناختی استفاده خواهند شد؟
                    </p>
                  )}
                </div>
                <button
                  onClick={handleCopyQ1}
                  className="px-2 py-1 text-xs rounded bg-white dark:bg-[#0f172a] text-[#1e40af] dark:text-[#93c5fd] border border-[#bfdbfe] dark:border-[#1e3a8a] hover:bg-[#dbeafe] transition-colors shrink-0 flex items-center gap-1"
                  title="کپی پاسخ بخش ۱"
                >
                  {copiedQ1 ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedQ1 ? (lang === 'fa' ? 'کپی شد' : 'Copied') : (lang === 'fa' ? 'کپی' : 'Copy')}</span>
                </button>
              </div>

              {/* Box 1 Text Area */}
              <div className="p-4">
                <textarea
                  value={q1NoncogPortions}
                  onChange={(e) => {
                    setQ1NoncogPortions(e.target.value);
                    handleCompileToCanvas(e.target.value, undefined);
                  }}
                  rows={7}
                  placeholder={
                    lang === 'fa'
                      ? 'بخش‌های غیرشناختی مکمل شامل رابط کاربری (Frontend UI)، پایگاه داده تراکنشی (SQL DB)، وب‌سرویس‌ها و APIها، سیستم‌های صف و پیام (Kafka/RabbitMQ)، فیلترهای قطعی انطباق و قوانین کسب‌وکار، و داشبورد بازرسی انسانی (HITL) را در این کادر مشخص کنید...'
                      : 'Specify the noncognitive portions: presentation layer (UI/UX), relational/NoSQL datastores, microservices & API gateways, event queues, deterministic guardrails & business rules, and human-in-the-loop review dashboards...'
                  }
                  className="w-full text-sm leading-relaxed p-3.5 rounded-lg border border-[#bfdbfe] dark:border-[#334155] bg-white dark:bg-[#0f172a] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] resize-y placeholder:text-[#94a3b8]"
                />
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-[#64748b] dark:text-[#94a3b8]">
                  <span>
                    {lang === 'fa'
                      ? 'مؤلفه‌های رایج: ۱. UI/UX ۲. پایگاه داده ۳. خط لوله تله‌متری ۴. قوانین سخت ۵. صف بازبین انسانی'
                      : 'Common elements: 1. UI/UX 2. Relational DB 3. Ingestion/Telemetry 4. Hard business rules 5. HITL review queue'}
                  </span>
                  <span>
                    {q1NoncogPortions.length} {lang === 'fa' ? 'کاراکتر' : 'chars'}
                  </span>
                </div>
              </div>
            </div>

            {/* BOX 2: Are non-cognitive automation alternatives possible for this iteration? If so, why are they not being used... */}
            <div className="rounded-lg border border-[#fbcfe8] dark:border-[#831843] bg-[#fdf2f8]/60 dark:bg-[#2e1065]/20 overflow-hidden shadow-2xs">
              {/* Box 2 Header */}
              <div className="bg-[#fce7f3] dark:bg-[#831843]/30 px-4 py-3 border-b border-[#fbcfe8] dark:border-[#831843] flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-[#831843] dark:text-[#f472b6] flex items-center gap-2">
                    <Split className="w-4 h-4 shrink-0 text-[#db2777]" />
                    <span>
                      Are non-cognitive automation alternatives possible for this iteration? If so, why are they not being used for this project iteration?
                    </span>
                  </h3>
                  {lang === 'fa' && (
                    <p className="text-xs text-[#9d174d] dark:text-[#fbcfe8] font-medium">
                      آیا راه‌حل‌های اتوماسیون غیرشناختی برای این تکرار پروژه امکان‌پذیر هستند؟ در صورت مثبت بودن پاسخ، چرا در این تکرار استفاده نمی‌شوند؟
                    </p>
                  )}
                </div>
                <button
                  onClick={handleCopyQ2}
                  className="px-2 py-1 text-xs rounded bg-white dark:bg-[#0f172a] text-[#831843] dark:text-[#f472b6] border border-[#fbcfe8] dark:border-[#831843] hover:bg-[#fce7f3] transition-colors shrink-0 flex items-center gap-1"
                  title="کپی پاسخ بخش ۲"
                >
                  {copiedQ2 ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedQ2 ? (lang === 'fa' ? 'کپی شد' : 'Copied') : (lang === 'fa' ? 'کپی' : 'Copy')}</span>
                </button>
              </div>

              {/* Box 2 Content */}
              <div className="p-4 space-y-3">
                {/* Feasibility Selector */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-semibold text-[#831843] dark:text-[#f472b6]">
                    {lang === 'fa' ? 'وضعیت امکان‌پذیری اتوماسیون سنتی:' : 'Feasibility of traditional automation:'}
                  </span>
                  <button
                    onClick={() => {
                      setQ2AutoAlternativesPossible('yes');
                      handleCompileToCanvas(undefined, q2WhyNotUsed);
                    }}
                    className={`px-2.5 py-1 rounded-md font-medium border transition-colors ${
                      q2AutoAlternativesPossible === 'yes'
                        ? 'bg-[#db2777] text-white border-[#db2777]'
                        : 'bg-white dark:bg-[#0f172a] text-[#1c2830] dark:text-[#e8ebe9] border-[#fbcfe8] dark:border-[#831843]'
                    }`}
                  >
                    {lang === 'fa' ? 'بله، امکان‌پذیر است (اما ناکافی)' : 'Yes, feasible (but insufficient)'}
                  </button>
                  <button
                    onClick={() => {
                      setQ2AutoAlternativesPossible('partial');
                      handleCompileToCanvas(undefined, q2WhyNotUsed);
                    }}
                    className={`px-2.5 py-1 rounded-md font-medium border transition-colors ${
                      q2AutoAlternativesPossible === 'partial'
                        ? 'bg-[#0f4c5c] text-white border-[#0f4c5c]'
                        : 'bg-white dark:bg-[#0f172a] text-[#1c2830] dark:text-[#e8ebe9] border-[#fbcfe8] dark:border-[#831843]'
                    }`}
                  >
                    {lang === 'fa' ? 'تا حدی امکان‌پذیر (خط مبنا)' : 'Partially feasible (Baseline only)'}
                  </button>
                  <button
                    onClick={() => {
                      setQ2AutoAlternativesPossible('no');
                      handleCompileToCanvas(undefined, q2WhyNotUsed);
                    }}
                    className={`px-2.5 py-1 rounded-md font-medium border transition-colors ${
                      q2AutoAlternativesPossible === 'no'
                        ? 'bg-[#b3432f] text-white border-[#b3432f]'
                        : 'bg-white dark:bg-[#0f172a] text-[#1c2830] dark:text-[#e8ebe9] border-[#fbcfe8] dark:border-[#831843]'
                    }`}
                  >
                    {lang === 'fa' ? 'خیر، کاملاً غیرممکن (پیچیدگی بالا)' : 'No, infeasible (High complexity)'}
                  </button>
                </div>

                {/* Box 2 Text Area */}
                <textarea
                  value={q2WhyNotUsed}
                  onChange={(e) => {
                    setQ2WhyNotUsed(e.target.value);
                    handleCompileToCanvas(undefined, e.target.value);
                  }}
                  rows={7}
                  placeholder={
                    lang === 'fa'
                      ? 'توضیح دهید که اتوماسیون سنتی (مانند قوانین شرطی IF-THEN، کدهای Regex، یا فیلترهای استاتیک اکسل/SQL) چرا در این تکرار پروژه استفاده نمی‌شوند: ۱. شکنندگی و انفجار پیچیدگی قوانین، ۲. ناتوانی در تعمیم به الگوهای رفتاری پنهان، ۳. هزینه فرصت بالای ناشی از خطاهای مثبت کاذب یا منفی کاذب، ۴. عدم تطابق با اهداف ROI تکرار...'
                      : 'Document why traditional non-cognitive automation (rule engines, regex, cron scripts, static heuristics) is not being used: 1. Rule complexity explosion, 2. Inability to generalize or learn non-linear patterns, 3. High opportunity cost and high false alarm rates, 4. Inability to satisfy ROI success criteria for this iteration...'
                  }
                  className="w-full text-sm leading-relaxed p-3.5 rounded-lg border border-[#fbcfe8] dark:border-[#334155] bg-white dark:bg-[#0f172a] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-none focus:ring-2 focus:ring-[#db2777] resize-y placeholder:text-[#94a3b8]"
                />
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#64748b] dark:text-[#94a3b8]">
                  <span>
                    {lang === 'fa'
                      ? 'محورهای توجیه: ۱. انفجار قوانین ۲. داده‌های بدون ساختار ۳. هزینه فرصت ۴. عدم شخصی‌سازی'
                      : 'Justification vectors: 1. Rule explosion 2. Latent patterns 3. Opportunity cost 4. Poor adaptability'}
                  </span>
                  <span>
                    {q2WhyNotUsed.length} {lang === 'fa' ? 'کاراکتر' : 'chars'}
                  </span>
                </div>
              </div>
            </div>

            {/* Slide 18 Footer Bar */}
            <div className="mt-6 pt-4 border-t border-[#cbd5e1] dark:border-[#2a3842] flex items-center justify-between text-xs text-[#64748b] dark:text-[#94a3b8]">
              <span>Task Group: Cognitive Project Requirements | Task: Cognitive Requirements</span>
              <span className="font-bold text-base text-[#1e293b] dark:text-[#f1f5f9]">18</span>
            </div>
          </div>

          {/* Canvas & Sync View */}
          <div className="bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] rounded-xl p-5 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e5e7eb] dark:border-[#2d3942] pb-3">
              <div>
                <h3 className="text-base font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#00738c]" />
                  <span>{lang === 'fa' ? 'بوم جامع پاسخ‌های اسلاید ۱۸' : 'Slide 18 Consolidated Answer Canvas'}</span>
                </h3>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                  {lang === 'fa'
                    ? 'پاسخ‌های دو کادر فوق به‌صورت خودکار در این بوم همگام‌سازی و ذخیره می‌شوند.'
                    : 'Responses from both worksheet boxes above automatically compile and synchronize here.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCanvas}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9] hover:border-[#00738c] transition-colors flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? (lang === 'fa' ? 'کپی شد!' : 'Copied!') : (lang === 'fa' ? 'کپی کل بوم' : 'Copy Canvas')}</span>
                </button>

                <button
                  onClick={() => onChangeContent('')}
                  className="px-3 py-1.5 text-xs rounded-lg border border-[#d9dad5] dark:border-[#2d3942] text-[#b3432f] hover:bg-[#b3432f]/10 transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{lang === 'fa' ? 'پاک کردن' : 'Clear'}</span>
                </button>
              </div>
            </div>

            <textarea
              value={content}
              onChange={(e) => onChangeContent(e.target.value)}
              rows={10}
              placeholder={
                lang === 'fa'
                  ? 'متن کامل کاربرگ اسلاید ۱۸ در اینجا ذخیره می‌شود...'
                  : 'Consolidated text for Slide 18 will appear here...'
              }
              className="w-full text-sm leading-relaxed font-mono p-4 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#fdfdfc] dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-none focus:ring-2 focus:ring-[#00738c] resize-y"
            />

            <div className="flex items-center justify-between text-xs text-[#5d6b73] dark:text-[#9aa8b0] pt-2">
              <div className="flex items-center gap-4">
                <span>{wordCount} {lang === 'fa' ? 'کلمه' : 'words'}</span>
                <span>•</span>
                <span>{charCount} {lang === 'fa' ? 'کاراکتر' : 'characters'}</span>
              </div>
              <span className="text-[#2f7d5b] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{lang === 'fa' ? 'ذخیره‌سازی خودکار محلی فعال است' : 'Auto-save active'}</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Structured Question Builder */}
      {activeTab === 'builder' && (
        <div className="space-y-6">
          <div className="bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] rounded-xl p-5 shadow-2xs space-y-5">
            <div>
              <h2 className="text-lg font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#00738c]" />
                <span>{lang === 'fa' ? 'سازنده گام‌به‌گام بخش‌های غیرشناختی (پرسش ۱)' : 'Step-by-Step Noncognitive Architecture Builder (Question 1)'}</span>
              </h2>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                {lang === 'fa'
                  ? 'هر لایه غیرشناختی را به‌صورت مجزا تکمیل کنید تا به‌صورت ساختاریافته به کادر پرسش ۱ اضافه شود.'
                  : 'Specify each noncognitive layer to compile into Question 1 answers.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Layer 1: UI / UX */}
              <div className="p-3.5 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f9fafb] dark:bg-[#12171b] space-y-2">
                <label className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-[#00738c]" />
                  <span>{lang === 'fa' ? '۱. لایه رابط و تجربه کاربری (UI/UX)' : '1. Presentation / UI Layer'}</span>
                </label>
                <input
                  type="text"
                  value={q1UiUx}
                  onChange={(e) => setQ1UiUx(e.target.value)}
                  placeholder={lang === 'fa' ? 'مثال: پنل مدیریت تحت وب واکنش‌گرا و اپلیکیشن موبایل...' : 'e.g., Responsive React web portal & iOS app...'}
                  className="w-full text-xs p-2.5 rounded border border-[#d9dad5] dark:border-[#2d3942] bg-white dark:bg-[#1a2228] focus:outline-none focus:ring-1 focus:ring-[#00738c]"
                />
              </div>

              {/* Layer 2: Database */}
              <div className="p-3.5 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f9fafb] dark:bg-[#12171b] space-y-2">
                <label className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-[#0f4c5c]" />
                  <span>{lang === 'fa' ? '۲. پایگاه داده و ذخیره‌سازی (Data Store)' : '2. Persistence & Data Layer'}</span>
                </label>
                <input
                  type="text"
                  value={q1DataStorage}
                  onChange={(e) => setQ1DataStorage(e.target.value)}
                  placeholder={lang === 'fa' ? 'مثال: پایگاه داده رابطه‌ای PostgreSQL برای تراکنش‌ها و انبار داده...' : 'e.g., PostgreSQL for transactions & Snowflake lakehouse...'}
                  className="w-full text-xs p-2.5 rounded border border-[#d9dad5] dark:border-[#2d3942] bg-white dark:bg-[#1a2228] focus:outline-none focus:ring-1 focus:ring-[#00738c]"
                />
              </div>

              {/* Layer 3: Business Logic & Guardrails */}
              <div className="p-3.5 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f9fafb] dark:bg-[#12171b] space-y-2">
                <label className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#b3432f]" />
                  <span>{lang === 'fa' ? '۳. قوانین قطعی کسب‌وکار و سیاست‌های انطباق' : '3. Deterministic Rules & Policy Filters'}</span>
                </label>
                <input
                  type="text"
                  value={q1BusinessLogic}
                  onChange={(e) => setQ1BusinessLogic(e.target.value)}
                  placeholder={lang === 'fa' ? 'مثال: فیلترهای سنی، بلک‌لیست‌های امنیتی و قوانین قطعی Fallback...' : 'e.g., Content filters, AML blacklists, safety thresholds...'}
                  className="w-full text-xs p-2.5 rounded border border-[#d9dad5] dark:border-[#2d3942] bg-white dark:bg-[#1a2228] focus:outline-none focus:ring-1 focus:ring-[#00738c]"
                />
              </div>

              {/* Layer 4: APIs & Integration */}
              <div className="p-3.5 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f9fafb] dark:bg-[#12171b] space-y-2">
                <label className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-[#2f7d5b]" />
                  <span>{lang === 'fa' ? '۴. وب‌سرویس‌ها و خط لوله پیام (APIs & Pipelines)' : '4. APIs & Ingestion Pipelines'}</span>
                </label>
                <input
                  type="text"
                  value={q1Apis}
                  onChange={(e) => setQ1Apis(e.target.value)}
                  placeholder={lang === 'fa' ? 'مثال: درگاه API با پروتکل REST/gRPC و صف پیام Kafka...' : 'e.g., REST/gRPC API gateway & Kafka telemetry broker...'}
                  className="w-full text-xs p-2.5 rounded border border-[#d9dad5] dark:border-[#2d3942] bg-white dark:bg-[#1a2228] focus:outline-none focus:ring-1 focus:ring-[#00738c]"
                />
              </div>
            </div>

            {/* Layer 5: Human in the loop */}
            <div className="p-3.5 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f9fafb] dark:bg-[#12171b] space-y-2">
              <label className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#db2777]" />
                <span>{lang === 'fa' ? '۵. نظارت انسانی و سیستم بازبینی (Human-in-the-Loop)' : '5. Human-in-the-Loop Review Queue'}</span>
              </label>
              <input
                type="text"
                value={q1Hitl}
                onChange={(e) => setQ1Hitl(e.target.value)}
                placeholder={lang === 'fa' ? 'مثال: کنسول ویژه کارشناسان برای تریاژ موارد با احتمال عدم قطعیت بالا...' : 'e.g., Analyst review console for borderline/uncertainty scores...'}
                className="w-full text-xs p-2.5 rounded border border-[#d9dad5] dark:border-[#2d3942] bg-white dark:bg-[#1a2228] focus:outline-none focus:ring-1 focus:ring-[#00738c]"
              />
            </div>

            <button
              onClick={() => {
                const combined = [
                  q1UiUx ? `• لایه رابط کاربری: ${q1UiUx}` : '',
                  q1DataStorage ? `• پایگاه داده و ذخیره‌سازی: ${q1DataStorage}` : '',
                  q1BusinessLogic ? `• قوانین قطعی و فیلترها: ${q1BusinessLogic}` : '',
                  q1Apis ? `• وب‌سرویس‌ها و پایپ‌لاین: ${q1Apis}` : '',
                  q1Hitl ? `• نظارت انسانی (HITL): ${q1Hitl}` : ''
                ]
                  .filter(Boolean)
                  .join('\n');

                if (combined) {
                  setQ1NoncogPortions(combined);
                  handleCompileToCanvas(combined, undefined);
                  setActiveTab('worksheet');
                }
              }}
              className="w-full py-2.5 rounded-lg bg-[#00738c] text-white text-xs font-bold hover:bg-[#005a6e] transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{lang === 'fa' ? 'انتقال این ساختار به کادر پرسش ۱ کاربرگ' : 'Apply Structured Inputs to Question 1 Box'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab: System Architecture View */}
      {activeTab === 'architecture' && (
        <div className="bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] rounded-xl p-5 shadow-2xs space-y-6">
          <div className="border-b border-[#e5e7eb] dark:border-[#2d3942] pb-3">
            <h2 className="text-lg font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2">
              <Boxes className="w-5 h-5 text-[#00738c]" />
              <span>{lang === 'fa' ? 'نقشه معماری پیوند شناختی / غیرشناختی (CPMAI System Architecture)' : 'Cognitive / Noncognitive Hybrid Architecture Blueprint'}</span>
            </h2>
            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
              {lang === 'fa'
                ? 'نمای ادغام مؤلفه یادگیری ماشین با ۵ لایه غیرشناختی سازمان بر اساس استانداردهای متدولوژی CPMAI:'
                : 'Integration view of cognitive ML components operating inside the 5 enterprise noncognitive layers:'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center">
            {/* Box 1 */}
            <div className="p-4 rounded-xl border border-[#cbd5e1] dark:border-[#2d3942] bg-[#f8fafc] dark:bg-[#12171b] space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#3b82f6]/10 text-[#3b82f6] flex items-center justify-center font-bold">
                ۱
              </div>
              <h4 className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                {lang === 'fa' ? 'رابط کاربری و کلاینت' : 'Client UI / Apps'}
              </h4>
              <p className="text-[11px] text-[#64748b] leading-tight">
                {lang === 'fa' ? 'وب، موبایل و اینترفیس نمایش نتایج به کاربر نهایی' : 'Web, mobile frontends, and user feedback capture'}
              </p>
            </div>

            {/* Box 2 */}
            <div className="p-4 rounded-xl border border-[#cbd5e1] dark:border-[#2d3942] bg-[#f8fafc] dark:bg-[#12171b] space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#10b981]/10 text-[#10b981] flex items-center justify-center font-bold">
                ۲
              </div>
              <h4 className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                {lang === 'fa' ? 'وب‌سرویس و API' : 'API Gateway & ETL'}
              </h4>
              <p className="text-[11px] text-[#64748b] leading-tight">
                {lang === 'fa' ? 'احراز هویت، اعتبارسنجی فرمت ورودی و توزیع بار' : 'Authentication, input sanitization, and routing'}
              </p>
            </div>

            {/* Box 3: COGNITIVE CORE */}
            <div className="p-4 rounded-xl border-2 border-[#00738c] bg-[#00738c]/10 dark:bg-[#00738c]/20 space-y-2 shadow-sm">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#00738c] text-white flex items-center justify-center font-bold shadow-xs">
                AI
              </div>
              <h4 className="text-xs font-extrabold text-[#00738c] dark:text-[#6ee7b7]">
                {lang === 'fa' ? 'هسته مدل شناختی' : 'Cognitive ML Core'}
              </h4>
              <p className="text-[11px] text-[#00738c] dark:text-[#6ee7b7] leading-tight font-medium">
                {lang === 'fa' ? 'استنتاج، امتیازدهی، و پیش‌بینی الگوهای چندبعدی' : 'Model inference, predictive scoring, pattern recognition'}
              </p>
            </div>

            {/* Box 4 */}
            <div className="p-4 rounded-xl border border-[#cbd5e1] dark:border-[#2d3942] bg-[#f8fafc] dark:bg-[#12171b] space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#f59e0b]/10 text-[#f59e0b] flex items-center justify-center font-bold">
                ۴
              </div>
              <h4 className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                {lang === 'fa' ? 'قوانین قطعی و فیلتر' : 'Deterministic Rules'}
              </h4>
              <p className="text-[11px] text-[#64748b] leading-tight">
                {lang === 'fa' ? 'سیاست‌های قانونی، اعمال بلک‌لیست و مکانیزم Fallback' : 'Policy compliance, age gates, fallback failovers'}
              </p>
            </div>

            {/* Box 5 */}
            <div className="p-4 rounded-xl border border-[#cbd5e1] dark:border-[#2d3942] bg-[#f8fafc] dark:bg-[#12171b] space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#ec4899]/10 text-[#ec4899] flex items-center justify-center font-bold">
                ۵
              </div>
              <h4 className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                {lang === 'fa' ? 'نظارت انسانی (HITL)' : 'Human Review (HITL)'}
              </h4>
              <p className="text-[11px] text-[#64748b] leading-tight">
                {lang === 'fa' ? 'تریاژ موارد حاشیه‌ای با عدم قطعیت بالا و ممیزی' : 'Auditing edge cases, ambiguous predictions, and feedback'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#f0fdf4] dark:bg-[#064e3b]/30 border border-[#bbf7d0] dark:border-[#065f46] text-xs text-[#166534] dark:text-[#86efac] space-y-1">
            <p className="font-bold">
              {lang === 'fa' ? 'اصل طلایی متدولوژی CPMAI برای اسلاید ۱۸:' : 'CPMAI Golden Rule for Slide 18:'}
            </p>
            <p className="leading-relaxed">
              {lang === 'fa'
                ? '«هوش مصنوعی جایگزین کل نرم‌افزار نمی‌شود، بلکه یک مؤلفه با قابلیت یادگیری در قلب یک معماری عمدتاً غیرشناختی است. موفقیت پروژه در گرو هماهنگی بی‌نقص میان این دو بخش است.»'
                : '"AI does not replace entire software stacks; it is an intelligent learning component embedded inside a predominantly noncognitive architecture. Project success relies upon seamless coordination between deterministic and probabilistic subsystems."'}
            </p>
          </div>
        </div>
      )}

      {/* Navigation Buttons (Back to Page 7, Next to Page 9) */}
      <div className="flex items-center justify-between pt-4 border-t border-[#d9dad5] dark:border-[#2d3942]">
        <button
          onClick={onGoToPage7}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] text-xs font-medium text-[#1c2830] dark:text-[#e8ebe9] hover:bg-[#e2e8f0] dark:hover:bg-[#25323d] transition-colors"
        >
          {lang === 'fa' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{lang === 'fa' ? 'صفحه قبلی: صفحه ۷ (اسلاید ۱۷: چرا AI؟)' : 'Previous: Page 7 (Slide 17: Why AI?)'}</span>
        </button>

        <button
          onClick={onGoToPage9}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00738c] text-white hover:bg-[#005a6e] transition-colors font-medium text-xs shadow-xs"
        >
          <span>{lang === 'fa' ? 'صفحه بعدی: صفحه ۹ (اسلاید ۱۹: اهداف شناختی)' : 'Next: Page 9 (Slide 19: Cognitive Objectives)'}</span>
          {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
