import React, { useState } from 'react';
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
  Target,
  BarChart3,
  Award,
  Clock,
  Gauge,
  UserCheck,
  Users,
  Scale,
  ShieldCheck,
  TrendingUp,
  Sliders,
  Plus,
  Trash2,
  Zap,
  Info
} from 'lucide-react';

interface Page10Props {
  lang: Language;
  content: string;
  onChangeContent: (val: string) => void;
  onGoToPage9: () => void;
  onGoToPage11?: () => void;
}

interface OutcomeMetricItem {
  id: string;
  businessGoal: string;
  cognitiveOutcome: string;
  metricType: string;
  targetThreshold: string;
  throughput: string;
  subjectiveJudge: string;
  subjectiveCriteria: string;
}

export const Page10CognitiveOutcomes: React.FC<Page10Props> = ({
  lang,
  content,
  onChangeContent,
  onGoToPage9,
  onGoToPage11
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'builder' | 'examples' | 'criteria'>('overview');

  // Interactive Outcome Items
  const [outcomeItems, setOutcomeItems] = useState<OutcomeMetricItem[]>([
    {
      id: '1',
      businessGoal:
        lang === 'fa'
          ? 'کاهش زمان و تلاش دستی پرسنل برای دسته‌بندی و بایگانی اسناد حقوقی و مالی'
          : 'Decrease the time and effort to categorize documents',
      cognitiveOutcome:
        lang === 'fa'
          ? 'دسته‌بندی خودکار اسناد ورودی با دقت پیش‌بینی حداقل ۹۰٪ با سرعت ۶۰ سند در ساعت'
          : 'Classify documents with 90% accuracy, at 60 documents per hour',
      metricType: lang === 'fa' ? 'دقت پیش‌بینی (Predictive Accuracy) & سرعت پردازش' : 'Predictive Accuracy & Throughput',
      targetThreshold: 'Accuracy >= 90% (F1-Score >= 0.88)',
      throughput: lang === 'fa' ? 'حداقل ۶۰ سند در ساعت (۱ سند در دقیقه به ازای هر پردازنده)' : '>= 60 documents per hour',
      subjectiveJudge:
        lang === 'fa'
          ? 'کارشناس ارشد انطباق حقوقی و امور اسناد (Senior Legal Compliance Specialist)'
          : 'Senior Legal Compliance Specialist / Lead Document Auditor',
      subjectiveCriteria:
        lang === 'fa'
          ? 'نمونه‌گیری تصادفی ۵٪ از اسناد دسته‌بندی‌شده و موارد با امتیاز اطمینان بین ۷۰٪ تا ۸۵٪ جهت تایید لحن، ارتباط موضوعی و صحت پوشه‌بندی'
          : 'Double-blind review of 5% sample and low-confidence (70%-85%) classifications on a 5-point relevance rubric'
    },
    {
      id: '2',
      businessGoal:
        lang === 'fa'
          ? 'افزایش نرخ نگهداشت بینندگان و افزایش میانگین زمان تماشای ویدیوها در پلتفرم'
          : 'Increase viewer retention and watch time by surfacing relevant video recommendations',
      cognitiveOutcome:
        lang === 'fa'
          ? 'پیش‌بینی احتمال کلیک و رتبه‌بندی ۵ ویدیوی برتر با دقت رتبه‌بندی (NDCG@5 >= 0.85) و تاخیر کمتر از ۴۰ میلی‌ثانیه'
          : 'Predict viewer click probability and rank top-5 videos with NDCG@5 >= 0.85 and latency < 40ms',
      metricType: lang === 'fa' ? 'دقت رتبه‌بندی (NDCG@5) و نرخ کلیک پیش‌بینی‌شده' : 'Ranking Accuracy (NDCG@5) & Predicted CTR',
      targetThreshold: 'NDCG@5 >= 0.85 | CTR Lift >= +12%',
      throughput: lang === 'fa' ? '۵۰۰ درخواست استنتاج در ثانیه (Peak RPS: 500) با تاخیر p95 < 40ms' : '500 requests/sec with p95 < 40ms',
      subjectiveJudge:
        lang === 'fa'
          ? 'مدیر ارشد محتوا و تیم بازبینی تجربه کاربری (Chief Content Curator & UX Panel)'
          : 'Lead Content Curator & Editorial Board',
      subjectiveCriteria:
        lang === 'fa'
          ? 'ارزیابی کیفی هفتگی تنوع موضوعی ویدیوهای پیشنهادی (Diversity & Serendipity) جهت جلوگیری از به دام افتادن کاربر در حباب اطلاعاتی (Echo Chamber)'
          : 'Weekly editorial audit of recommendation diversity and serendipity to prevent filter bubbles'
    }
  ]);

  const handleAddOutcome = () => {
    const newItem: OutcomeMetricItem = {
      id: Date.now().toString(),
      businessGoal: lang === 'fa' ? 'هدف کسب‌وکار جدید' : 'New Business Goal',
      cognitiveOutcome: lang === 'fa' ? 'نتیجه شناختی معادل (با ذکر دقت و توان عملیاتی)' : 'Corresponding Cognitive Goal with accuracy & throughput',
      metricType: 'Accuracy / Precision / Latency',
      targetThreshold: '>= 90%',
      throughput: '60 / hour',
      subjectiveJudge: lang === 'fa' ? 'کارشناس خبره دامنه (Domain SME)' : 'Domain Subject Matter Expert (SME)',
      subjectiveCriteria: lang === 'fa' ? 'معیار داوری کیفی موارد حاشیه‌ای' : 'Subjective evaluation criteria for edge cases'
    };
    setOutcomeItems([...outcomeItems, newItem]);
  };

  const handleRemoveOutcome = (id: string) => {
    setOutcomeItems(outcomeItems.filter(item => item.id !== id));
  };

  const handleUpdateOutcome = (id: string, field: keyof OutcomeMetricItem, val: string) => {
    setOutcomeItems(outcomeItems.map(item => item.id === id ? { ...item, [field]: val } : item));
  };

  const text = {
    badgePhase: lang === 'fa' ? 'فاز اول CPMAI · درک کسب‌وکار' : 'CPMAI Phase I · Business Understanding',
    badgeTaskGroup: lang === 'fa' ? 'گروه وظایف: الزامات پروژه شناختی' : 'Task Group: Cognitive Project Requirements',
    badgeTask: lang === 'fa' ? 'وظیفه: الزامات شناختی (اسلاید ۲۰)' : 'Task: Cognitive Requirements (Slide 20)',
    pageTitle:
      lang === 'fa'
        ? 'نتایج و دستاوردهای شناختی (Cognitive Outcomes)'
        : 'Cognitive Outcomes: Goals, Criteria & Subjective Judgment',
    pageSubtitle:
      lang === 'fa'
        ? 'تعریف دقیق نتایج شناختی با واژگان کسب‌وکار، تدوین معیارهای عینی ارزیابی (دقت، سرعت و ظرفیت) و تعیین ارزیابان داوری کیفی'
        : 'Detail specific cognitive goals using business terminology, define quantitative evaluation criteria, and establish subjective judgment protocols.',
    questionsHeader: lang === 'fa' ? 'پرسش‌های اصلی اسلاید ۲۰ در متدولوژی CPMAI' : 'Core Slide 20 Questions in CPMAI Workbook',
    q1Title: lang === 'fa' ? 'پرسش ۱: بیان اهداف شناختی با واژگان کسب‌وکار' : 'Question 1: Detail specific outcomes using business terminology',
    q1Desc:
      lang === 'fa'
        ? 'نتیجه یا دستاورد مشخصی که رویکرد شناختی باید به آن دست یابد چیست؟ (به زبان تجاری و ملموس سازمان، نه صرفاً کلمات فنی یادگیری ماشین)'
        : 'Detail the specific outcomes or goals using business terminology that the cognitive approach should achieve.',
    q2Title: lang === 'fa' ? 'پرسش ۲: تدوین معیارهای ارزیابی نتیجه شناختی' : 'Question 2: Define criteria used to evaluate cognitive outcome',
    q2Desc:
      lang === 'fa'
        ? 'چه معیارهایی برای ارزیابی نتیجه شناختی استفاده می‌شود؟ (مانند: دقت پیش‌بینی، نرخ پردازش در دقیقه یا ساعت، تاخیر، و تاب‌آوری خطا)'
        : 'Define the criteria to be used to evaluate the cognitive outcome (e.g., predictive accuracy, categorizations per minute, latency, error thresholds).',
    q3Title: lang === 'fa' ? 'پرسش ۳: تعیین داوری کیفی و شخص مسئول قضاوت' : 'Question 3: If subjective judgments are used, define who will make them',
    q3Desc:
      lang === 'fa'
        ? 'در صورت نیاز به داوری کیفی یا بازبینی انسانی، چه کسی این قضاوت ذهنی/تخصصی را انجام خواهد داد و فرآیند آن چگونه است؟'
        : 'If subjective judgments are to be used, define who will make the subjective judgment and specify the evaluation rubrics.',
    q4Title: lang === 'fa' ? 'پرسش ۴: بیانیه جامع نتایج شناختی پروژه' : 'Question 4: What are the cognitive outcomes for this project?',
    q4Desc:
      lang === 'fa'
        ? 'بیانیه نهایی و منسجم نتایج شناختی این تکرار پروژه را برای ثبت در کتاب کار CPMAI تدوین نمایید.'
        : 'What are the cognitive outcomes for this project iteration? Synthesize business goals, cognitive criteria, and SME governance.',

    // Tabs
    tabOverview: lang === 'fa' ? 'اصول CPMAI و ترجمه هدف کسب‌وکار' : 'CPMAI Translation Principles',
    tabBuilder: lang === 'fa' ? 'سازنده ماتریس نتایج و معیارها' : 'Interactive Outcomes & Metrics Builder',
    tabExamples: lang === 'fa' ? 'نمونه‌های اسلاید و سناریوهای مرجع' : 'Slide 20 Official Examples',
    tabCriteria: lang === 'fa' ? 'راهنمای معیارهای کمی و داوری کیفی' : 'Quantitative vs Subjective Guide',

    // Official slide comparison
    slideExampleTitle: lang === 'fa' ? 'نمونه رسمی کتاب کار CPMAI در اسلاید ۲۰' : 'Official CPMAI Slide 20 Reference Example',
    businessGoalLabel: lang === 'fa' ? 'هدف کسب‌وکار (Business Goal):' : 'Business Goal:',
    businessGoalVal: lang === 'fa' ? '«کاهش زمان و تلاش دستی مورد نیاز برای دسته‌بندی اسناد.»' : '"Decrease the time and effort to categorize documents."',
    cognitiveGoalLabel: lang === 'fa' ? 'هدف و نتیجه شناختی (Cognitive Goal):' : 'Cognitive Goal:',
    cognitiveGoalVal: lang === 'fa' ? '«دسته‌بندی اسناد با دقت ۹۰٪ و با سرعت ۶۰ سند در ساعت.»' : '"Classify documents with 90% accuracy, at 60 documents per hour."',

    // Translation rule
    translationRuleTitle: lang === 'fa' ? 'قاعده طلایی CPMAI: تبدیل هدف انتزاعی به نتیجه شناختی ملموس' : 'The CPMAI Golden Rule: Translating Business Goals to Cognitive Outcomes',
    translationRuleDesc:
      lang === 'fa'
        ? 'اهداف کسب‌وکار معمولاً به صورت کیفی یا کلان بیان می‌شوند (مانند «بهبود تجربه مشتری» یا «کاهش هزینه‌ها»). هوش مصنوعی نمی‌تواند «بهبود تجربه» را مستقیماً بهینه‌سازی کند؛ بنابراین در گام الزامات شناختی باید آن را به دو متغیر قابل اندازه‌گیری تبدیل کنید: ۱) دقت و کیفیت استنتاج (Accuracy/Quality) و ۲) ظرفیت، سرعت یا توان عملیاتی (Throughput/Latency).'
        : 'Business goals are typically stated qualitatively ("decrease time", "improve satisfaction"). AI cannot directly optimize vague aspirations; CPMAI requires mapping each business aspiration to two measurable pillars: 1) Cognitive Prediction Quality (Accuracy/F1/Precision) and 2) Operational Velocity/Throughput (items per hour/latency).',

    // Action buttons
    copyTemplate: lang === 'fa' ? 'درج الگوی رسمی اسلاید ۲۰ در بوم' : 'Insert Slide 20 Template into Canvas',
    copyVideoExample: lang === 'fa' ? 'درج مثال پروژه ویدیو (پیش‌بینی کلیک)' : 'Insert Video Clicks Project Outcome',
    copyDocExample: lang === 'fa' ? 'درج مثال دسته‌بندی اسناد (اسلاید ۲۰)' : 'Insert Slide 20 Document Categorization',
    copiedText: lang === 'fa' ? 'کپی شد!' : 'Copied!',
    clearBtn: lang === 'fa' ? 'پاک کردن بوم' : 'Clear Canvas',
    canvasHeader: lang === 'fa' ? 'بوم ثبت پاسخ اسلاید ۲۰ کتاب کار CPMAI' : 'Slide 20 Workbook Canvas · Cognitive Outcomes',
    canvasPlaceholder:
      lang === 'fa'
        ? 'پاسخ کامل خود به پرسش‌های اسلاید ۲۰ را در اینجا یادداشت یا از دکمه‌های بالا برای درج الگو استفاده کنید...'
        : 'Enter your comprehensive Slide 20 responses here, or use the pre-formatted templates above...',
    pmiCopyright:
      lang === 'fa'
        ? 'چارچوب متدولوژی CPMAI (شناسایی، الزامات شناختی، درک کسب‌وکار) · مشاوران مدیریت کسب و کار اوج'
        : 'CPMAI Methodology Framework (Cognitive Project Requirements, Phase I) · OWJ Business Council'
  };

  const handleCopyTemplate = () => {
    const templateText =
      lang === 'fa'
        ? `=== پاسخ اسلاید ۲۰ کتاب کار CPMAI: نتایج و دستاوردهای شناختی (Cognitive Outcomes) ===
Task Group: Cognitive Project Requirements
Task: Cognitive Requirements
موضوع: Cognitive Outcomes (اسلاید ۲۰)

۱. بیان نتایج و اهداف مشخص شناختی با واژگان کسب‌وکار (Outcomes in Business Terminology):
   - هدف کسب‌وکار (Business Goal): کاهش زمان و هزینه پردازش اسناد سازمانی و آزادسازی وقت کارشناسان برای وظایف با ارزش افزوده بالا.
   - هدف شناختی معادل (Cognitive Goal): دسته‌بندی خودکار اسناد ورودی با دقت پیش‌بینی حداقل ۹۰٪ و توان عملیاتی حداقل ۶۰ سند در ساعت به ازای هر نود پردازشی.
   - دستاورد تجاری ملموس: کاهش ۶۵ درصدی زمان چرخه دسته‌بندی اسناد از ۴ ساعت به کمتر از ۲۰ دقیقه و کاهش خطای بایگانی اشتباه به زیر ۳ درصد.

۲. معیارهای عینی ارزیابی نتیجه شناختی (Criteria to Evaluate Cognitive Outcome):
   - دقت پیش‌بینی (Predictive Accuracy): حداقل ۹۰٪ در داده‌های آزمون مستقل (F1-Score >= 0.88 در رده‌های اصلی).
   - توان عملیاتی (Throughput): پردازش موفق حداقل ۶۰ سند استاندارد در ساعت بدون سرریز صف.
   - تاخیر استنتاج (Latency SLA): زمان پاسخ‌دهی لایه شناختی کمتر از ۵۰۰ میلی‌ثانیه به ازای هر صفحه سند.
   - آستانه اطمینان و نرخ ارجاع (Confidence Threshold): اسناد با امتیاز اطمینان زیر ۸۰٪ جهت مداخله به اپراتور انسانی (HITL) ارجاع داده می‌شوند.

۳. داوری کیفی و تعیین مسئول قضاوت ذهنی (Subjective Judgments & Designated Evaluator):
   - مسئول قضاوت کیفی: سرپرست ارشد بایگانی و تحلیل‌گر ارشد انطباق حقوقی (Senior Compliance Auditor).
   - معیار داوری ذهنی: بررسی ماهانه نمونه تصادفی ۵ درصدی اسناد و تمام موارد اختلافی جهت تایید صحت محتوایی، ارزیابی طبقه‌بندی اسناد چندموضوعی و سنجش میزان پذیرش کاربران نهایی.
   - فرآیند توافق: در صورت اختلاف نظر بین مدل و کارشناس، نظر کارشناس ارشد مبنای بازبرچسب‌گذاری (Re-annotation) برای بازآموزی مدل قرار می‌گیرد.

۴. خلاصه نتایج شناختی این تکرار پروژه (Cognitive Outcomes for this Iteration):
   - مدل شناختی در این تکرار وظیفه دارد با تکیه بر تحلیل معنایی متن اسناد، آنها را به ۸ رده مجاز دسته‌بندی نماید؛ به نحوی که حداقل ۸۰٪ اسناد بدون نیاز به بازبینی انسانی و با دقت بالای ۹۰٪ بایگانی شوند.`
        : `=== CPMAI Slide 20 Deliverable: Cognitive Outcomes ===
Task Group: Cognitive Project Requirements
Task: Cognitive Requirements
Topic: Cognitive Outcomes (Slide 20)

1. Specific outcomes or goals using business terminology that the cognitive approach should achieve:
   - Business Goal: Decrease the time and effort required to categorize organizational documents and liberate team capacity.
   - Cognitive Goal: Classify inbound documents with at least 90% accuracy, at a throughput of 60 documents per hour per worker node.
   - Tangible Business Outcome: Reduce document turnaround cycle time by 65% (from 4 hours to <20 minutes) and keep misfiling rates below 3%.

2. Criteria to be used to evaluate the cognitive outcome:
   - Predictive Accuracy: Minimum 90% top-1 accuracy on holdout validation data (Macro F1-score >= 0.88).
   - Throughput: Successfully process >= 60 documents per hour under sustained production loads.
   - Inference Latency: p95 latency < 500ms per document page.
   - Escalation Threshold: Classifications with model confidence < 80% route to human-in-the-loop review.

3. Subjective judgment criteria and designated evaluators:
   - Designated Evaluator: Lead Compliance Auditor and Senior Records Management Specialist.
   - Subjective Evaluation Protocol: Monthly double-blind review of a 5% stratified random sample, plus all escalated borderline cases (75%-82% confidence).
   - Arbitration Rubric: Evaluated on context preservation, regulatory compliance, and multi-label relevance on a 1-5 Likert scale.

4. Synthesized Cognitive Outcomes for this Project Iteration:
   - The cognitive component will automate classification across 8 core document classes with >=90% accuracy, enabling 80% zero-touch processing while routing ambiguous edge cases to designated human specialists.`;

    onChangeContent(templateText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyVideoExample = () => {
    const videoText =
      lang === 'fa'
        ? `=== پاسخ اسلاید ۲۰ کتاب کار CPMAI: پروژه رتبه‌بندی و پیش‌بینی کلیک ویدیو ===
Task Group: Cognitive Project Requirements
Task: Cognitive Requirements - Cognitive Outcomes

۱. اهداف شناختی با واژگان کسب‌وکار:
   - هدف کسب‌وکار (Business Goal): افزایش تعامل مخاطبان، افزایش میانگین زمان تماشا به میزان ۱۵٪ و جلوگیری از ترک زودهنگام پلتفرم.
   - هدف شناختی معادل (Cognitive Goal): پیش‌بینی احتمال کلیک بیننده (Click Probability) و ارائه ۵ ویدیوی پیشنهادی برتر با دقت رتبه‌بندی NDCG@5 >= 0.85 و تاخیر استنتاج کمتر از ۴۵ میلی‌ثانیه.

۲. معیارهای عینی ارزیابی نتیجه شناختی:
   - دقت پیش‌بینی: AUC-ROC >= 0.84 و NDCG@5 >= 0.85 در پیش‌بینی کلیک نشست فعلی کاربر.
   - ظرفیت و سرعت پردازش: ۵۰۰ درخواست رتبه‌بندی در ثانیه (Peak 500 RPS) با تاخیر صدک نود و پنجم کمتر از ۴۵ میلی‌ثانیه.
   - معیار کسب‌وکاری متصل: افزایش حداقل ۱۰٪ در نرخ تبدیل کلیک (CTR Lift) نسبت به لیست استاتیک پربازدیدترین‌ها.

۳. داوری کیفی و مسئول قضاوت ذهنی:
   - مسئول قضاوت: شورای سیاست‌گذاری محتوا و کارشناس ارشد تجربه کاربری (Content Curation Lead & UX Reviewer).
   - روش ارزیابی کیفی: بررسی ماهانه شاخص تنوع موضوعی (Catalog Diversity) و بررسی عدم ایجاد سوگیری تعصب‌آمیز یا حباب محتوایی نامناسب برای مخاطبان خردسال و عمومی.

۴. نتیجه شناختی نهایی پروژه:
   - موتور پیشنهاددهنده ویدیو در این تکرار، اولویت نمایش ویدیوها را بر مبنای بیشترین کلیک پیش‌بینی‌شده مرتب می‌کند و با حفظ تنوع ژانری، رضایت کاربر و نرخ تماشای پلتفرم را افزایش می‌دهد.`
        : `=== CPMAI Slide 20 Deliverable: Video Click Prediction & Recommendation Project ===
Task Group: Cognitive Project Requirements
Task: Cognitive Requirements - Cognitive Outcomes

1. Specific outcomes or goals using business terminology:
   - Business Goal: Increase viewer engagement, drive a 15% increase in session watch time, and minimize premature platform bounce.
   - Cognitive Goal: Predict viewer click probability and deliver personalized top-5 recommendations with NDCG@5 >= 0.85 within 45ms latency.

2. Criteria to evaluate the cognitive outcome:
   - Predictive Accuracy: AUC-ROC >= 0.84 and NDCG@5 >= 0.85 on test session interactions.
   - Operational Throughput: 500 inference ranking requests per second with p95 latency < 45ms.
   - Business Lift Metric: >= +10% lift in real-world Click-Through Rate (CTR) over popularity baseline.

3. Subjective judgment criteria and designated evaluators:
   - Designated Evaluator: Head of Editorial Curation and UX Research Lead.
   - Subjective Rubric: Bi-weekly qualitative review of recommendation diversity, serendipity, and safety guardrails to prevent echo chambers.

4. Concrete Cognitive Outcome for this Iteration:
   - Rank video catalog tiles dynamically by estimated click volume to surface high-relevance media immediately upon page render.`;

    onChangeContent(videoText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyFromBuilder = () => {
    let builderText =
      lang === 'fa'
        ? `=== ماتریس نتایج شناختی، معیارها و داوری کیفی (برگرفته از سازنده اسلاید ۲۰) ===\n\n`
        : `=== Slide 20 Cognitive Outcomes Matrix (Generated from Builder) ===\n\n`;

    outcomeItems.forEach((item, index) => {
      builderText += `${index + 1}. ${item.businessGoal}\n`;
      builderText += `   - ${lang === 'fa' ? 'هدف شناختی' : 'Cognitive Goal'}: ${item.cognitiveOutcome}\n`;
      builderText += `   - ${lang === 'fa' ? 'معیار ارزیابی' : 'Evaluation Criteria'}: ${item.metricType} [${item.targetThreshold}]\n`;
      builderText += `   - ${lang === 'fa' ? 'توان عملیاتی/سرعت' : 'Throughput'}: ${item.throughput}\n`;
      builderText += `   - ${lang === 'fa' ? 'مسئول داوری کیفی' : 'Subjective Evaluator'}: ${item.subjectiveJudge}\n`;
      builderText += `   - ${lang === 'fa' ? 'معیار قضاوت ذهنی' : 'Subjective Criteria'}: ${item.subjectiveCriteria}\n\n`;
    });

    onChangeContent(builderText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fadeIn" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      {/* Header Banner */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-[#00738c]/10 via-[#2f7d5b]/10 to-transparent border border-[#00738c]/20 dark:border-[#00738c]/30 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#00738c]/15 text-[#00738c] dark:bg-[#00738c]/30 dark:text-[#6fb3c6]">
              {text.badgePhase}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#2f7d5b]/15 text-[#2f7d5b] dark:bg-[#2f7d5b]/30 dark:text-[#6ee7b7]">
              {text.badgeTaskGroup}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#7c3aed]/15 text-[#7c3aed] dark:bg-[#7c3aed]/30 dark:text-[#c4b5fd]">
              {text.badgeTask}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#5d6b73] dark:text-[#9aa8b0] bg-white/70 dark:bg-[#1e262c]/70 px-3 py-1 rounded-md border border-[#d9dad5] dark:border-[#2d3942]">
            <Brain className="w-3.5 h-3.5 text-[#00738c]" />
            <span>Slide 20 / 40+ · Phase I</span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-[#00738c] text-white shrink-0 mt-1 shadow-xs">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#1c2830] dark:text-[#e8ebe9]">
              {text.pageTitle}
            </h1>
            <p className="mt-1 text-sm text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
              {text.pageSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Official Slide 20 Reference Card (Highlighting Document Categorization) */}
      <div className="p-5 rounded-xl bg-white dark:bg-[#1e262c] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs">
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-[#00738c] dark:text-[#6fb3c6]">
          <Award className="w-4 h-4" />
          <span>{text.slideExampleTitle}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-[#f0f9ff] dark:bg-[#0c2a38] border border-[#bae6fd] dark:border-[#0369a1]">
            <div className="text-xs font-semibold text-[#0369a1] dark:text-[#7dd3fc] mb-1">
              {text.businessGoalLabel}
            </div>
            <div className="text-sm font-medium text-[#0c4a6e] dark:text-[#e0f2fe]">
              {text.businessGoalVal}
            </div>
            <div className="mt-2 text-xs text-[#0284c7] dark:text-[#38bdf8]">
              {lang === 'fa'
                ? 'بیان هدف از زاویه مدیران کسب‌وکار (صرفه‌جویی در زمان، هزینه و تلاش نیروی کار)'
                : 'Stated from the business stakeholder viewpoint (saving labor time & organizational effort).'}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#ecfdf5] dark:bg-[#064e3b]/30 border border-[#a7f3d0] dark:border-[#059669]">
            <div className="text-xs font-semibold text-[#059669] dark:text-[#6ee7b7] mb-1">
              {text.cognitiveGoalLabel}
            </div>
            <div className="text-sm font-bold text-[#065f46] dark:text-[#d1fae5]">
              {text.cognitiveGoalVal}
            </div>
            <div className="mt-2 text-xs text-[#10b981] dark:text-[#34d399] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>
                {lang === 'fa'
                  ? 'تعیین دقیق دو ستون ضروری: ۱) دقت پیش‌بینی (۹۰٪) و ۲) نرخ عملیاتی (۶۰ سند در ساعت)'
                  : 'Specifies both required CPMAI pillars: 1) Accuracy threshold (90%) and 2) Throughput velocity (60/hr).'}
              </span>
            </div>
          </div>
        </div>

        {/* Translation Guidance Note */}
        <div className="mt-4 p-3.5 rounded-lg bg-[#f8fafc] dark:bg-[#172027] border border-[#e2e8f0] dark:border-[#2d3942] text-xs text-[#475569] dark:text-[#94a3b8] flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#00738c] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#1c2830] dark:text-[#e8ebe9]">
              {text.translationRuleTitle}:
            </span>{' '}
            {text.translationRuleDesc}
          </div>
        </div>
      </div>

      {/* 4 Core Questions of Slide 20 */}
      <div className="p-5 rounded-xl bg-white dark:bg-[#1e262c] border border-[#d9dad5] dark:border-[#2d3942] shadow-xs">
        <h2 className="text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9] mb-4 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#00738c]" />
          <span>{text.questionsHeader}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-[#f8fafc] dark:bg-[#172027] border border-[#d9dad5] dark:border-[#2d3942]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#00738c] dark:text-[#6fb3c6] mb-1">
              <span className="w-5 h-5 rounded-full bg-[#00738c]/15 text-[#00738c] flex items-center justify-center font-bold">1</span>
              <span>{text.q1Title}</span>
            </div>
            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
              {text.q1Desc}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#f8fafc] dark:bg-[#172027] border border-[#d9dad5] dark:border-[#2d3942]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#2f7d5b] dark:text-[#6ee7b7] mb-1">
              <span className="w-5 h-5 rounded-full bg-[#2f7d5b]/15 text-[#2f7d5b] flex items-center justify-center font-bold">2</span>
              <span>{text.q2Title}</span>
            </div>
            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
              {text.q2Desc}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#f8fafc] dark:bg-[#172027] border border-[#d9dad5] dark:border-[#2d3942]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#7c3aed] dark:text-[#c4b5fd] mb-1">
              <span className="w-5 h-5 rounded-full bg-[#7c3aed]/15 text-[#7c3aed] flex items-center justify-center font-bold">3</span>
              <span>{text.q3Title}</span>
            </div>
            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
              {text.q3Desc}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#f8fafc] dark:bg-[#172027] border border-[#d9dad5] dark:border-[#2d3942]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#d97706] dark:text-[#fcd34d] mb-1">
              <span className="w-5 h-5 rounded-full bg-[#d97706]/15 text-[#d97706] flex items-center justify-center font-bold">4</span>
              <span>{text.q4Title}</span>
            </div>
            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
              {text.q4Desc}
            </p>
          </div>
        </div>
      </div>

      {/* Segmented Sub-Tabs */}
      <div className="flex border-b border-[#d9dad5] dark:border-[#2d3942] gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'overview'
              ? 'border-[#00738c] text-[#00738c] dark:text-[#6fb3c6]'
              : 'border-transparent text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830]'
          }`}
        >
          <Brain className="w-4 h-4" />
          <span>{text.tabOverview}</span>
        </button>

        <button
          onClick={() => setActiveTab('builder')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'builder'
              ? 'border-[#00738c] text-[#00738c] dark:text-[#6fb3c6]'
              : 'border-transparent text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830]'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>{text.tabBuilder}</span>
        </button>

        <button
          onClick={() => setActiveTab('criteria')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'criteria'
              ? 'border-[#00738c] text-[#00738c] dark:text-[#6fb3c6]'
              : 'border-transparent text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830]'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>{text.tabCriteria}</span>
        </button>

        <button
          onClick={() => setActiveTab('examples')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'examples'
              ? 'border-[#00738c] text-[#00738c] dark:text-[#6fb3c6]'
              : 'border-transparent text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{text.tabExamples}</span>
        </button>
      </div>

      {/* Tab 1: Overview & CPMAI Translation Principles */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-white dark:bg-[#1e262c] border border-[#d9dad5] dark:border-[#2d3942] space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#00738c]" />
              <span>
                {lang === 'fa'
                  ? 'فرآیند گام‌به‌گام ترجمه اهداف کسب‌وکار به دستاوردهای شناختی در CPMAI'
                  : 'Three-Stage CPMAI Framework for Cognitive Outcomes'}
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-[#f8fafc] dark:bg-[#172027] border border-[#d9dad5] dark:border-[#2d3942] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-[#00738c] mb-1">
                    {lang === 'fa' ? 'گام ۱: تعریف هدف کسب‌وکار' : 'Step 1: State Business Objective'}
                  </div>
                  <div className="text-xs font-medium text-[#1c2830] dark:text-[#e8ebe9] mb-2">
                    {lang === 'fa' ? 'با واژگان ارزش تجاری و عملیاتی' : 'In Business Value Terms'}
                  </div>
                  <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    {lang === 'fa'
                      ? 'بیان شفاف مساله‌ای که سازمان با آن مواجه است (مانند کاهش اتلاف وقت، افزایش وفاداری مشتری، کاهش ادعاهای تقلب یا تسریع پردازش).'
                      : 'Express organizational pain points or desires (saving labor, reducing churn, accelerating triage, elevating throughput).'}
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono text-[#00738c] bg-[#00738c]/10 p-2 rounded">
                  {lang === 'fa' ? 'مثال: کاهش زمان و زحمت پرسنل در دسته‌بندی' : 'Ex: Decrease time and effort to categorize docs'}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#f8fafc] dark:bg-[#172027] border border-[#d9dad5] dark:border-[#2d3942] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-[#2f7d5b] mb-1">
                    {lang === 'fa' ? 'گام ۲: نگاشت به نتیجه شناختی' : 'Step 2: Map to Cognitive Outcome'}
                  </div>
                  <div className="text-xs font-medium text-[#1c2830] dark:text-[#e8ebe9] mb-2">
                    {lang === 'fa' ? 'تعیین دقت و سرعت عملیاتی' : 'Define Accuracy & Throughput'}
                  </div>
                  <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    {lang === 'fa'
                      ? 'مشخص کردن میزان دقیق کیفیتی که مدل شناختی باید تحویل دهد (مثلاً دقت ۹۰٪) همراه با سرعت تحویل (مثلاً ۶۰ سند در ساعت یا ۵۰ درخواست در ثانیه).'
                      : 'Specify the minimum inference accuracy threshold coupled with the operational pace (e.g. 90% accuracy @ 60 docs/hour).'}
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono text-[#2f7d5b] bg-[#2f7d5b]/10 p-2 rounded">
                  {lang === 'fa' ? 'مثال: دقت ۹۰٪ با سرعت ۶۰ سند در ساعت' : 'Ex: 90% accuracy at 60 documents / hour'}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#f8fafc] dark:bg-[#172027] border border-[#d9dad5] dark:border-[#2d3942] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-[#7c3aed] mb-1">
                    {lang === 'fa' ? 'گام ۳: مرزبندی ارزیابی و داوری' : 'Step 3: Define Evaluation & SME'}
                  </div>
                  <div className="text-xs font-medium text-[#1c2830] dark:text-[#e8ebe9] mb-2">
                    {lang === 'fa' ? 'معیارهای کمی و قضاوت ذهنی' : 'Quantitative Metrics & Subjective Review'}
                  </div>
                  <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    {lang === 'fa'
                      ? 'تعیین ماتریس درستی آزمون، خط مبنای پذیرش، و مشخص کردن فرد یا کارشناس خبره‌ای (SME) که موارد خاکستری یا داوری کیفی را عهده‌دار می‌شود.'
                      : 'Establish formal test validation matrices and designate qualified Subject Matter Experts (SMEs) to audit borderline predictions.'}
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono text-[#7c3aed] bg-[#7c3aed]/10 p-2 rounded">
                  {lang === 'fa' ? 'مثال: ارزیابی کارشناس ارشد حقوقی روی نمونه ۵٪' : 'Ex: Senior Legal SME audits 5% random sample'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Interactive Outcome & Metrics Builder */}
      {activeTab === 'builder' && (
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-white dark:bg-[#1e262c] border border-[#d9dad5] dark:border-[#2d3942] space-y-4 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#00738c]" />
                  <span>
                    {lang === 'fa'
                      ? 'سازنده تعاملی ماتریس نتایج شناختی و معیارهای ارزیابی'
                      : 'Interactive Outcomes, Metrics & Evaluators Matrix'}
                  </span>
                </h3>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mt-1">
                  {lang === 'fa'
                    ? 'اهداف کسب‌وکار، دقت‌های هدف، سرعت پردازش و ارزیابان کیفی را تعریف کنید و سپس نتیجه را مستقیماً به بوم اضافه کنید.'
                    : 'Configure your project goals, cognitive accuracy, throughput, and subjective judges, then transfer to canvas.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddOutcome}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00738c] text-white text-xs font-semibold hover:bg-[#005f73] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{lang === 'fa' ? 'افزودن سطر نتیجه' : 'Add Outcome Row'}</span>
                </button>

                <button
                  onClick={handleCopyFromBuilder}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#00738c] text-[#00738c] dark:text-[#6fb3c6] text-xs font-semibold hover:bg-[#00738c]/10 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{lang === 'fa' ? 'انتقال به بوم پاسخ' : 'Transfer to Canvas'}</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {outcomeItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-4 rounded-lg bg-[#f8fafc] dark:bg-[#172027] border border-[#d9dad5] dark:border-[#2d3942] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#00738c] dark:text-[#6fb3c6]">
                      #{idx + 1} · {lang === 'fa' ? 'مولفه شناختی و دستاورد تجاری' : 'Cognitive Outcome Mapping'}
                    </span>
                    {outcomeItems.length > 1 && (
                      <button
                        onClick={() => handleRemoveOutcome(item.id)}
                        className="text-[#b3432f] hover:text-red-700 p-1 text-xs"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#5d6b73] dark:text-[#9aa8b0] mb-1">
                        {lang === 'fa' ? 'هدف کسب‌وکار (Business Goal)' : 'Business Goal (Organizational terms)'}
                      </label>
                      <input
                        type="text"
                        value={item.businessGoal}
                        onChange={(e) => handleUpdateOutcome(item.id, 'businessGoal', e.target.value)}
                        className="w-full text-xs p-2 rounded border border-[#d9dad5] dark:border-[#2d3942] bg-white dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#5d6b73] dark:text-[#9aa8b0] mb-1">
                        {lang === 'fa' ? 'هدف و نتیجه شناختی (Cognitive Goal)' : 'Cognitive Goal (Accuracy + Throughput)'}
                      </label>
                      <input
                        type="text"
                        value={item.cognitiveOutcome}
                        onChange={(e) => handleUpdateOutcome(item.id, 'cognitiveOutcome', e.target.value)}
                        className="w-full text-xs p-2 rounded border border-[#d9dad5] dark:border-[#2d3942] bg-white dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#5d6b73] dark:text-[#9aa8b0] mb-1">
                        {lang === 'fa' ? 'نوع معیار ارزیابی عینی' : 'Metric Type'}
                      </label>
                      <input
                        type="text"
                        value={item.metricType}
                        onChange={(e) => handleUpdateOutcome(item.id, 'metricType', e.target.value)}
                        className="w-full text-xs p-2 rounded border border-[#d9dad5] dark:border-[#2d3942] bg-white dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#5d6b73] dark:text-[#9aa8b0] mb-1">
                        {lang === 'fa' ? 'حد آستانه دقت هدف' : 'Target Threshold (e.g. >= 90%)'}
                      </label>
                      <input
                        type="text"
                        value={item.targetThreshold}
                        onChange={(e) => handleUpdateOutcome(item.id, 'targetThreshold', e.target.value)}
                        className="w-full text-xs p-2 rounded border border-[#d9dad5] dark:border-[#2d3942] bg-white dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#5d6b73] dark:text-[#9aa8b0] mb-1">
                        {lang === 'fa' ? 'سرعت و توان عملیاتی (Throughput)' : 'Throughput / Velocity'}
                      </label>
                      <input
                        type="text"
                        value={item.throughput}
                        onChange={(e) => handleUpdateOutcome(item.id, 'throughput', e.target.value)}
                        className="w-full text-xs p-2 rounded border border-[#d9dad5] dark:border-[#2d3942] bg-white dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 border-t border-[#d9dad5]/60 dark:border-[#2d3942]/60">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#7c3aed] dark:text-[#c4b5fd] mb-1">
                        {lang === 'fa' ? 'مسئول داوری کیفی / قضاوت ذهنی' : 'Designated Subjective Evaluator (SME)'}
                      </label>
                      <input
                        type="text"
                        value={item.subjectiveJudge}
                        onChange={(e) => handleUpdateOutcome(item.id, 'subjectiveJudge', e.target.value)}
                        className="w-full text-xs p-2 rounded border border-[#d9dad5] dark:border-[#2d3942] bg-white dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#7c3aed] dark:text-[#c4b5fd] mb-1">
                        {lang === 'fa' ? 'معیار قضاوت ذهنی و نحوه نمونه‌گیری' : 'Subjective Judgment Criteria & Sampling'}
                      </label>
                      <input
                        type="text"
                        value={item.subjectiveCriteria}
                        onChange={(e) => handleUpdateOutcome(item.id, 'subjectiveCriteria', e.target.value)}
                        className="w-full text-xs p-2 rounded border border-[#d9dad5] dark:border-[#2d3942] bg-white dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Quantitative Criteria vs Subjective Judgment Guide */}
      {activeTab === 'criteria' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quantitative Criteria Guide */}
            <div className="p-5 rounded-xl bg-white dark:bg-[#1e262c] border border-[#d9dad5] dark:border-[#2d3942] space-y-4 shadow-xs">
              <div className="flex items-center gap-2 text-sm font-bold text-[#00738c] dark:text-[#6fb3c6]">
                <Gauge className="w-5 h-5" />
                <span>
                  {lang === 'fa'
                    ? 'راهنمای معیارهای عینی و کمّی (Quantitative Criteria)'
                    : 'Quantitative Objective Evaluation Criteria'}
                </span>
              </div>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa'
                  ? 'معیارهایی که با فرمول‌های آماری و ریاضی بدون نیاز به مداخله احساسی قابل محاسبه‌اند.'
                  : 'Statistically verifiable metrics computable directly against ground-truth validation sets.'}
              </p>

              <div className="space-y-2.5">
                <div className="p-3 rounded-lg bg-[#f8fafc] dark:bg-[#172027] border border-[#d9dad5] dark:border-[#2d3942]">
                  <div className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center justify-between">
                    <span>{lang === 'fa' ? 'دقت پیش‌بینی (Predictive Accuracy)' : 'Predictive Accuracy / F1-Score'}</span>
                    <span className="text-[10px] font-mono text-[#00738c] bg-[#00738c]/10 px-2 py-0.5 rounded">Accuracy &ge; 90%</span>
                  </div>
                  <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] mt-1">
                    {lang === 'fa'
                      ? 'نسبت پیش‌بینی‌های صحیح به کل موارد. در داده‌های نامتوازن، از F1-Score، Precision و Recall استفاده می‌شود.'
                      : 'Ratio of true predictions. For skewed distributions, use Macro F1-Score, Precision, and Recall.'}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#f8fafc] dark:bg-[#172027] border border-[#d9dad5] dark:border-[#2d3942]">
                  <div className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center justify-between">
                    <span>{lang === 'fa' ? 'توان عملیاتی (Throughput / Rate)' : 'Categorization Rate / Throughput'}</span>
                    <span className="text-[10px] font-mono text-[#2f7d5b] bg-[#2f7d5b]/10 px-2 py-0.5 rounded">&ge; 60 docs/hour</span>
                  </div>
                  <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] mt-1">
                    {lang === 'fa'
                      ? 'تعداد پردازش موفق در واحد زمان (مانند تعداد اسناد دسته‌بندی‌شده در دقیقه یا ساعت) که نشان‌دهنده مقیاس‌پذیری است.'
                      : 'Number of successfully classified records per minute or hour under production load.'}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#f8fafc] dark:bg-[#172027] border border-[#d9dad5] dark:border-[#2d3942]">
                  <div className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center justify-between">
                    <span>{lang === 'fa' ? 'تاخیر زمانی (Latency SLA)' : 'Inference Latency SLA'}</span>
                    <span className="text-[10px] font-mono text-[#7c3aed] bg-[#7c3aed]/10 px-2 py-0.5 rounded">p95 &lt; 50ms</span>
                  </div>
                  <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] mt-1">
                    {lang === 'fa'
                      ? 'مدت زمان تولید پاسخ به ازای هر درخواست. در کاربردهای بلادرنگ و پیشنهاددهنده، تاخیر میلی‌ثانیه‌ای حیاتی است.'
                      : 'Maximum allowable milliseconds to deliver prediction before client request times out.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Subjective Judgment Guide */}
            <div className="p-5 rounded-xl bg-white dark:bg-[#1e262c] border border-[#d9dad5] dark:border-[#2d3942] space-y-4 shadow-xs">
              <div className="flex items-center gap-2 text-sm font-bold text-[#7c3aed] dark:text-[#c4b5fd]">
                <UserCheck className="w-5 h-5" />
                <span>
                  {lang === 'fa'
                    ? 'داوری کیفی و قضاوت ذهنی (Subjective Judgment)'
                    : 'Subjective Judgments & Designated Evaluators'}
                </span>
              </div>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa'
                  ? 'تعیین شفاف افرادی که کیفیت پیش‌بینی‌های مدل را در موارد کیفی، فرهنگی، حقوقی یا مبهم ارزیابی می‌کنند.'
                  : 'Explicit definition of qualified experts who audit nuanced, ethical, or ambiguous model predictions.'}
              </p>

              <div className="space-y-2.5">
                <div className="p-3 rounded-lg bg-[#f8fafc] dark:bg-[#172027] border border-[#d9dad5] dark:border-[#2d3942]">
                  <div className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center justify-between">
                    <span>{lang === 'fa' ? 'تعیین هویت ارزیاب (Designated Evaluator)' : 'Who Makes the Judgment?'}</span>
                    <span className="text-[10px] font-mono text-[#7c3aed] bg-[#7c3aed]/10 px-2 py-0.5 rounded">Lead SME / Auditor</span>
                  </div>
                  <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] mt-1">
                    {lang === 'fa'
                      ? 'عنوان شغلی دقیق (مانند کارشناس ارشد انطباق حقوقی، سردبیر محتوا یا سرپرست کنترل کیفیت) باید مشخص شود نه عبارات کلی مثل «تیم».'
                      : 'Specific job titles (Senior Legal Specialist, Lead Content Curator), never vague generalities like "the team".'}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#f8fafc] dark:bg-[#172027] border border-[#d9dad5] dark:border-[#2d3942]">
                  <div className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center justify-between">
                    <span>{lang === 'fa' ? 'شیوه نمونه‌گیری و روبه‌رویی' : 'Sampling Strategy & Protocol'}</span>
                    <span className="text-[10px] font-mono text-[#d97706] bg-[#d97706]/10 px-2 py-0.5 rounded">5% Stratified + Edge cases</span>
                  </div>
                  <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] mt-1">
                    {lang === 'fa'
                      ? 'مشخص کردن درصد نمونه‌گیری کور (Blind Sampling) و مواردی که امتیاز اطمینان مدل در ناحیه مرزی (مثلاً بین ۷۰٪ تا ۸۵٪) قرار دارد.'
                      : 'Prescribed double-blind sample quotas alongside systematic review of borderline confidence outputs.'}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#f8fafc] dark:bg-[#172027] border border-[#d9dad5] dark:border-[#2d3942]">
                  <div className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center justify-between">
                    <span>{lang === 'fa' ? 'حل اختلاف و حلقه یادگیری' : 'Arbitration & Feedback Loop'}</span>
                    <span className="text-[10px] font-mono text-[#2f7d5b] bg-[#2f7d5b]/10 px-2 py-0.5 rounded">Retraining Pipeline</span>
                  </div>
                  <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] mt-1">
                    {lang === 'fa'
                      ? 'پاسخ قضاوت‌های انسانی به عنوان برچسب‌های معتبر (Ground Truth) برای تصحیح بایگانی و بازآموزی دوره‌ای مدل به کار می‌روند.'
                      : 'Expert corrections automatically feed the re-annotation pipeline to prevent recurring misclassifications.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Reference Scenarios & Examples */}
      {activeTab === 'examples' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Example 1: Document Categorization (Slide 20 Reference) */}
            <div className="p-5 rounded-xl bg-white dark:bg-[#1e262c] border border-[#d9dad5] dark:border-[#2d3942] space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#00738c]/15 text-[#00738c] dark:text-[#6fb3c6]">
                  {lang === 'fa' ? 'نمونه رسمی کتاب کار: دسته‌بندی اسناد' : 'Official Slide 20: Document Categorization'}
                </span>
                <button
                  onClick={handleCopyTemplate}
                  className="flex items-center gap-1 text-xs text-[#00738c] hover:underline cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{lang === 'fa' ? 'درج در بوم' : 'Insert into Canvas'}</span>
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <p>
                  <strong className="text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? 'هدف کسب‌وکار:' : 'Business Goal:'}
                  </strong>{' '}
                  {lang === 'fa'
                    ? 'کاهش زمان و تلاش دستی برای دسته‌بندی اسناد سازمانی.'
                    : 'Decrease the time and effort to categorize documents.'}
                </p>
                <p>
                  <strong className="text-[#00738c] dark:text-[#6fb3c6]">
                    {lang === 'fa' ? 'هدف شناختی:' : 'Cognitive Goal:'}
                  </strong>{' '}
                  {lang === 'fa'
                    ? 'دسته‌بندی اسناد با دقت ۹۰٪ و با سرعت ۶۰ سند در ساعت.'
                    : 'Classify documents with 90% accuracy, at 60 documents per hour.'}
                </p>
                <p>
                  <strong className="text-[#2f7d5b] dark:text-[#6ee7b7]">
                    {lang === 'fa' ? 'معیار ارزیابی عینی:' : 'Evaluation Criteria:'}
                  </strong>{' '}
                  {lang === 'fa'
                    ? 'دقت پیش‌بینی بیش از ۹۰٪ و زمان تاخیر کمتر از ۵۰۰ میلی‌ثانیه به ازای هر سند.'
                    : 'Predictive accuracy >= 90% and p95 inference latency < 500ms.'}
                </p>
                <p>
                  <strong className="text-[#7c3aed] dark:text-[#c4b5fd]">
                    {lang === 'fa' ? 'داوری کیفی:' : 'Subjective Judgment:'}
                  </strong>{' '}
                  {lang === 'fa'
                    ? 'کارشناس ارشد انطباق اسناد با بررسی تصادفی ۵٪ از فایل‌ها و موارد ابهام‌آمیز.'
                    : 'Senior Compliance Specialist audits 5% random stratified sample.'}
                </p>
              </div>
            </div>

            {/* Example 2: Video Clicks Prediction */}
            <div className="p-5 rounded-xl bg-white dark:bg-[#1e262c] border border-[#d9dad5] dark:border-[#2d3942] space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#2f7d5b]/15 text-[#2f7d5b] dark:text-[#6ee7b7]">
                  {lang === 'fa' ? 'پروژه رتبه‌بندی کلیک ویدیو' : 'Video Recommendation Project'}
                </span>
                <button
                  onClick={handleCopyVideoExample}
                  className="flex items-center gap-1 text-xs text-[#2f7d5b] hover:underline cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{lang === 'fa' ? 'درج در بوم' : 'Insert into Canvas'}</span>
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <p>
                  <strong className="text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? 'هدف کسب‌وکار:' : 'Business Goal:'}
                  </strong>{' '}
                  {lang === 'fa'
                    ? 'افزایش زمان تماشا و نگهداشت بینندگان پلتفرم به میزان ۱۵٪.'
                    : 'Increase session watch time and viewer retention by 15%.'}
                </p>
                <p>
                  <strong className="text-[#2f7d5b] dark:text-[#6ee7b7]">
                    {lang === 'fa' ? 'هدف شناختی:' : 'Cognitive Goal:'}
                  </strong>{' '}
                  {lang === 'fa'
                    ? 'پیش‌بینی احتمال کلیک و ارائه ویدیوهای برتر با دقت NDCG@5 >= 0.85 با تاخیر ۴۰ میلی‌ثانیه.'
                    : 'Predict click probabilities with NDCG@5 >= 0.85 under 40ms latency.'}
                </p>
                <p>
                  <strong className="text-[#00738c] dark:text-[#6fb3c6]">
                    {lang === 'fa' ? 'معیار ارزیابی عینی:' : 'Evaluation Criteria:'}
                  </strong>{' '}
                  {lang === 'fa'
                    ? 'پاسخگویی به ۵۰۰ درخواست استنتاج در ثانیه و افزایش ۱۰ درصدی نرخ کلیک واقعی نسبت به وضعیت فعلی.'
                    : 'Throughput 500 RPS with +10% lift in live CTR over heuristic baseline.'}
                </p>
                <p>
                  <strong className="text-[#7c3aed] dark:text-[#c4b5fd]">
                    {lang === 'fa' ? 'داوری کیفی:' : 'Subjective Judgment:'}
                  </strong>{' '}
                  {lang === 'fa'
                    ? 'تیم بازبینی تحریریه و تجربه کاربری جهت اطمینان از تنوع موضوعی و سلامت محتوا.'
                    : 'Editorial Board and UX Panel audit recommendation diversity and brand safety.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Deliverable Response Canvas Section */}
      <div className="p-6 rounded-xl bg-white dark:bg-[#1e262c] border border-[#d9dad5] dark:border-[#2d3942] space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#00738c]" />
            <h2 className="text-sm sm:text-base font-bold text-[#1c2830] dark:text-[#e8ebe9]">
              {text.canvasHeader}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyTemplate}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00738c] text-white text-xs font-semibold hover:bg-[#005f73] transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{text.copyTemplate}</span>
            </button>

            <button
              onClick={handleCopyVideoExample}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2f7d5b] text-[#2f7d5b] dark:text-[#6ee7b7] text-xs font-semibold hover:bg-[#2f7d5b]/10 transition-colors"
            >
              <Award className="w-3.5 h-3.5" />
              <span>{text.copyVideoExample}</span>
            </button>

            {content && (
              <button
                onClick={() => onChangeContent('')}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-[#b3432f] hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{text.clearBtn}</span>
              </button>
            )}
          </div>
        </div>

        {/* Quality Validation Checklist */}
        <div className="p-3.5 rounded-lg bg-[#f8fafc] dark:bg-[#172027] border border-[#d9dad5] dark:border-[#2d3942] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
              content.includes('90%') || content.includes('دقت') || content.includes('accuracy')
                ? 'bg-[#2f7d5b] text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
            }`}>
              <Check className="w-2.5 h-2.5" />
            </div>
            <span className="text-[#5d6b73] dark:text-[#9aa8b0]">
              {lang === 'fa' ? 'تعیین دقت پیش‌بینی (Accuracy Target)' : 'Predictive Accuracy Defined'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
              content.includes('ساعت') || content.includes('hour') || content.includes('سرعت') || content.includes('Throughput')
                ? 'bg-[#2f7d5b] text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
            }`}>
              <Check className="w-2.5 h-2.5" />
            </div>
            <span className="text-[#5d6b73] dark:text-[#9aa8b0]">
              {lang === 'fa' ? 'تعیین توان عملیاتی (Throughput Velocity)' : 'Throughput / Velocity Specified'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
              content.includes('داوری') || content.includes('کارشناس') || content.includes('Subjective') || content.includes('Evaluator')
                ? 'bg-[#2f7d5b] text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
            }`}>
              <Check className="w-2.5 h-2.5" />
            </div>
            <span className="text-[#5d6b73] dark:text-[#9aa8b0]">
              {lang === 'fa' ? 'تعیین مسئول داوری کیفی (SME Evaluator)' : 'Subjective Evaluator Identified'}
            </span>
          </div>
        </div>

        <textarea
          rows={16}
          value={content}
          onChange={(e) => onChangeContent(e.target.value)}
          placeholder={text.canvasPlaceholder}
          className="w-full font-mono text-xs p-4 rounded-lg bg-[#fcfcfb] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9] focus:outline-none focus:border-[#00738c] leading-relaxed transition-all resize-y"
        />

        {/* Footer Disclaimer */}
        <div className="mt-4 pt-3 border-t border-[#d9dad5]/60 dark:border-[#2d3942]/60 flex flex-wrap items-center justify-between text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] gap-2">
          <span>{text.pmiCopyright}</span>
          <span className="font-semibold text-[#00738c] dark:text-[#6fb3c6]">Slide 20</span>
        </div>
      </div>

      {/* Navigation Footer (Back to Page 9 / Slide 19 & Next to Page 11 / Slide 21) */}
      <div className="flex items-center justify-between pt-4 border-t border-[#d9dad5] dark:border-[#2d3942] flex-wrap gap-3">
        <button
          onClick={onGoToPage9}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] text-xs font-medium text-[#1c2830] dark:text-[#e8ebe9] hover:bg-[#e2e8f0] dark:hover:bg-[#25323d] transition-colors"
        >
          {lang === 'fa' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{lang === 'fa' ? 'صفحه قبلی: صفحه ۹ (اسلاید ۱۹: اهداف شناختی)' : 'Previous: Page 9 (Slide 19: Cognitive Objectives)'}</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] flex items-center gap-2">
            <span>{lang === 'fa' ? 'نتایج شناختی (اسلاید ۲۰)' : 'Slide 20 Completed'}</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#2f7d5b]" />
          </div>

          {onGoToPage11 && (
            <button
              onClick={onGoToPage11}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1f5163] dark:bg-[#6fb3c6] text-white dark:text-[#0f1a1e] text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <span>{lang === 'fa' ? 'صفحه بعدی: صفحه ۱۱ (اسلاید ۲۱: معیارهای موفقیت AI)' : 'Next: Page 11 (Slide 21: AI Success Criteria)'}</span>
              {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
