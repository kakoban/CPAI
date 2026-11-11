import { TutorMarkdownRenderer } from './TutorMarkdownRenderer';
import React, { useState, useEffect, useRef } from 'react';
import { AppPage } from '../../App';
import { Language } from '../../types/cpmai';
import {
  IndustryTrackId,
  DisciplineId,
  EngineeringRoleId,
  INDUSTRY_TRACKS
} from '../../types/industryTrack';
import { getDisciplineMetadata } from '../../data/disciplineExamplesRegistry';

const ROLE_LABELS: Record<EngineeringRoleId, { titleFa: string; titleEn: string }> = {
  director: { titleFa: 'مدیر طرح / مدیر ارشد پروژه', titleEn: 'Project Director / Executive' },
  lead_superintendent: { titleFa: 'سرپرست دیسیپلین / رئیس کارگاه', titleEn: 'Lead Superintendent' },
  technical_engineer: { titleFa: 'مهندس دفتر فنی / کنترل پروژه / ناظر', titleEn: 'Technical / Planning Engineer' },
  site_operator: { titleFa: 'اپراتور / جنرال فورمن / بازرس کیفی', titleEn: 'Site Operator / QA Inspector' }
};

const PAYA_ROLE_LABELS: Record<EngineeringRoleId, { titleFa: string; titleEn: string }> = {
  director: { titleFa: 'مدیرعامل / معاونت هلدینگ یا شرکت تابعه', titleEn: 'Holding Executive / Subsidiary MD' },
  lead_superintendent: { titleFa: 'مدیر طرح، کنسرسیوم یا سرپرست شهر صنعتی کاوه / مسکن', titleEn: 'Consortium / Kaveh / Housing Lead' },
  technical_engineer: { titleFa: 'کارشناس ارشد دفتر فنی، مناقصات، PMO و امور پیمان', titleEn: 'Holding PMO, Bidding & Contracts Specialist' },
  site_operator: { titleFa: 'رئیس کارگاه، ناظر اجرا، مهندس MEP و سرپرست ناوگان', titleEn: 'Site Superintendent, MEP & Fleet Lead' }
};
import {
  Bot,
  Sparkles,
  Send,
  X,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  HelpCircle,
  MessageSquareText,
  Layers,
  Wand2
} from 'lucide-react';

export interface PageTutorMetadata {
  titleFa: string;
  titleEn: string;
  cpmaiMethodSummary: string;
  keyDeliverables: string;
  quickPromptsFa: string[];
  quickPromptsEn: string[];
}

export const CPMAI_PAGE_TUTOR_CONTEXT: Record<string, PageTutorMetadata> = {
  quiz: {
    titleFa: 'آزمون سطح‌سنجی آمادگی هوش مصنوعی',
    titleEn: 'AI Readiness Placement Quiz',
    cpmaiMethodSummary: 'Assess individual and organizational readiness across Beginner, Intermediate, and Advanced AI project management tiers before executing CPMAI Phase I.',
    keyDeliverables: 'Calibrated AI Readiness Tier, Alignment Index (Dunning-Kruger vs Mastery detection), and personalized Phase I focus areas.',
    quickPromptsFa: [
      'تفاوت سطح مقدماتی، متوسط و پیشرفته در متدولوژی CPMAI چیست؟',
      'شاخص هم‌ترازی (Alignment Index) در این آزمون چگونه محاسبه می‌شود؟',
      'چگونه برای سوالات سناریومحور CPMAI آماده شوم؟'
    ],
    quickPromptsEn: [
      'What distinguishes Beginner, Intermediate, and Advanced tiers in CPMAI?',
      'How is the Alignment Index calculated in this placement quiz?',
      'How should I approach scenario-based CPMAI questions?'
    ]
  },
  '0': {
    titleFa: 'جلسه ۰: مبانی کاربردی LLM و کارگاه پرامپت‌نویسی',
    titleEn: 'Session 0: Applied LLM Fundamentals & Prompting Toolkit',
    cpmaiMethodSummary: 'Master enterprise prompt engineering, context window grounding, RAG vs Fine-Tuning trade-offs, and structured outputs before scoping cognitive projects.',
    keyDeliverables: 'Structured system prompt, domain-grounded few-shot examples, and hallucination mitigation guardrails.',
    quickPromptsFa: [
      'پیش‌نویس پرامپت من در این صفحه را بررسی و بهینه‌سازی کن',
      'تفاوت عملی RAG و Fine-Tuning در پروژه‌های مهندسی چیست؟',
      'یک نمونه پرامپت استاندارد برای دیسیپلین تخصصی من بنویس'
    ],
    quickPromptsEn: [
      'Audit and improve my current prompt draft on this page',
      'What is the practical difference between RAG and Fine-Tuning?',
      'Write a structured prompt example tailored to my discipline'
    ]
  },
  '1': {
    titleFa: 'جلسه ۱: شناخت کسب‌وکار و تعیین اهداف تجاری',
    titleEn: 'Session 1: Business Understanding & Objectives',
    cpmaiMethodSummary: 'CPMAI Phase I (Task: Determine Business Objectives). Align the AI initiative with real organizational pain points, Agile User Stories, background context, and primary business objectives before touching data or models.',
    keyDeliverables: 'Sprint User Story (As a... I want... So that...), Business Background, Primary Business Objective, and Related Business Questions.',
    quickPromptsFa: [
      'داستان کاربر (User Story) و هدف کسب‌وکاری که نوشتم را نقد کن',
      'چطور یک هدف کسب‌وکار مبهم را به هدف دقیق در فاز اول CPMAI تبدیل کنم؟',
      '۳ نمونه سوال کلیدی کسب‌وکار برای دیسیپلین من پیشنهاد بده'
    ],
    quickPromptsEn: [
      'Critique my Sprint User Story and Primary Business Objective',
      'How do I turn a vague goal into a concrete CPMAI Phase I objective?',
      'Suggest 3 high-impact business questions for my discipline'
    ]
  },
  '2': {
    titleFa: 'جلسه ۲: تعریف مسئله در این تکرار (Problem Iteration)',
    titleEn: 'Session 2: Problem Definition for This Iteration',
    cpmaiMethodSummary: 'CPMAI is iterative. Narrow down the overarching vision into a tightly scoped, solvable problem for Iteration 1 (MVP) to avoid scope creep (“boiling the ocean”).',
    keyDeliverables: 'Scoped iteration problem statement, explicit in-scope vs. out-of-scope boundaries, and target end-user workflow.',
    quickPromptsFa: [
      'آیا تعریف مسئله من برای تکرار اول (MVP) به اندازه کافی محدود و دقیق است؟',
      'چطور از خطای «جوشاندن اقیانوس» (Scope Creep) در تکرار اول جلوگیری کنم؟',
      'یک نمونه تعریف مسئله فاز اول برای رشته من مثال بزن'
    ],
    quickPromptsEn: [
      'Is my problem definition narrow enough for Iteration 1 (MVP)?',
      'How do I avoid "boiling the ocean" in my first CPMAI iteration?',
      'Give a concrete Iteration 1 problem statement for my discipline'
    ]
  },
  '3': {
    titleFa: 'جلسه ۳: معیارهای عینی موفقیت کسب‌وکار',
    titleEn: 'Session 3: Objective Business Success Criteria',
    cpmaiMethodSummary: 'Define SMART (Specific, Measurable, Achievable, Relevant, Time-bound) business metrics that prove the iteration succeeded from an executive perspective—distinct from technical ML metrics like F1-score.',
    keyDeliverables: 'Quantifiable baseline metrics, target improvement thresholds, and measurement timeframe.',
    quickPromptsFa: [
      'تفاوت معیار موفقیت کسب‌وکار (صفحه ۳) با معیار موفقیت فنی مدل چیست؟',
      'معیارهای موفقیتی که در این صفحه نوشتم را از نظر SMART بودن ممیزی کن',
      'چه شاخص‌های کمی (KPI) برای سنجش موفقیت در دیسیپلین من مناسب‌ترند؟'
    ],
    quickPromptsEn: [
      'How do Business Success Criteria differ from technical ML metrics?',
      'Audit my drafted success criteria against SMART standards',
      'What quantifiable business metrics fit my discipline best?'
    ]
  },
  '4': {
    titleFa: 'جلسه ۴: تحلیل هزینه-فایده و بودجه پروژه',
    titleEn: 'Session 4: Cost-Benefit Analysis & Budget',
    cpmaiMethodSummary: 'Evaluate CAPEX/OPEX costs (data prep, compute/API tokens, SME time, integration, maintenance) against tangible and intangible benefits within hard time and budget constraints.',
    keyDeliverables: 'Total cost breakdown (data, compute, labor), time budget, and benefit justification.',
    quickPromptsFa: [
      'چه هزینه‌های پنهانی در پروژه‌های هوش مصنوعی معمولاً فراموش می‌شوند؟',
      'تحلیل هزینه-فایده فعلی من را بررسی کن؛ چه مواردی جا افتاده است؟',
      'چطور هزینه آماده‌سازی داده و زمان خبرگان (SME) را برآورد کنم؟'
    ],
    quickPromptsEn: [
      'What hidden costs are most often overlooked in AI projects?',
      'Review my Cost-Benefit draft—what cost categories am I missing?',
      'How should I estimate data preparation and SME labor costs?'
    ]
  },
  '5': {
    titleFa: 'جلسه ۵: محاسبه نرخ بازگشت سرمایه مورد انتظار (Expected ROI)',
    titleEn: 'Session 5: Expected ROI Calculation',
    cpmaiMethodSummary: 'Quantify financial return using ROI = ((Net Benefits - Total AI Costs) / Total AI Costs) * 100, including payback period and sensitivity to model errors.',
    keyDeliverables: '12-month / 24-month ROI percentage, net present value or payback horizon, and conservative vs. optimistic scenarios.',
    quickPromptsFa: [
      'فرمول استاندارد محاسبه ROI در پروژه‌های CPMAI را با مثال توضیح بده',
      'آیا اعداد ROI که در این صفحه وارد کرده‌ام واقع‌بینانه و قابل دفاع در هیئت‌مدیره است؟',
      'چطور کاهش ریسک یا ایمنی (HSE) را به ارزش مالی در ROI تبدیل کنم؟'
    ],
    quickPromptsEn: [
      'Explain the standard CPMAI ROI formula with a practical example',
      'Are my drafted ROI numbers realistic and defensible to executives?',
      'How do I monetize risk reduction or safety gains in ROI?'
    ]
  },
  '6': {
    titleFa: 'جلسه ۶: نیازمندی‌های شناختی پروژه (Cognitive Requirements)',
    titleEn: 'Session 6: Cognitive Project Requirements',
    cpmaiMethodSummary: 'Task Group: Cognitive Project Requirements. Determine what makes the problem "cognitive" (requiring perception, prediction, learning, or natural language understanding over unstructured/complex data).',
    keyDeliverables: 'Cognitive task definition, heuristic baseline comparison, and unstructured/complex data characteristics.',
    quickPromptsFa: [
      'ویژگی‌های یک مسئله «شناختی» در مقایسه با نرم‌افزار معمولی چیست؟',
      'پاسخ من در صفحه ۶ را بررسی کن؛ آیا الزامات شناختی را درست نوشته‌ام؟',
      'خط مبنای اکتشافی (Heuristic Baseline) در این بخش یعنی چه؟'
    ],
    quickPromptsEn: [
      'What makes a requirement "cognitive" versus traditional software?',
      'Review my Page 6 response—did I capture the cognitive requirements?',
      'What is a Heuristic Baseline in CPMAI Phase I?'
    ]
  },
  '7': {
    titleFa: 'جلسه ۷: ضرورت راهکار شناختی (چرا AI لازم است؟)',
    titleEn: 'Session 7: Why an AI Solution is Needed',
    cpmaiMethodSummary: 'Justify why deterministic rules, traditional SQL queries, or standard software cannot solve this problem at scale, proving AI is genuinely necessary.',
    keyDeliverables: 'Justification for AI over rule-based systems, complexity/scale drivers, and adaptability needs.',
    quickPromptsFa: [
      'چطور به مدیرعامل ثابت کنم که این مسئله با نرم‌افزار سنتی قابل حل نیست و نیاز به AI دارد؟',
      'استدلال من در این صفحه را نقد کن؛ کجای آن ضعیف است؟',
      'در چه شرایطی طبق CPMAI نباید از هوش مصنوعی استفاده کرد؟'
    ],
    quickPromptsEn: [
      'How do I prove to executives that rule-based code cannot solve this?',
      'Critique my justification on this page—where can skeptics challenge it?',
      'When does CPMAI advise AGAINST using AI?'
    ]
  },
  '8': {
    titleFa: 'جلسه ۸: بخش‌های غیرشناختی و جایگزین‌های اتوماسیون',
    titleEn: 'Session 8: Noncognitive Portions & Automation Alternatives',
    cpmaiMethodSummary: 'Separate the 80% traditional software/RPA plumbing (UI, APIs, databases, workflows) from the 20% cognitive core, and explain why pure RPA/non-cognitive automation is insufficient.',
    keyDeliverables: 'Inventory of non-AI system components and rationale for rejecting pure non-cognitive automation.',
    quickPromptsFa: [
      'تفاوت بخش‌های شناختی (AI) و غیرشناختی (Non-AI) را در پروژه من تفکیک کن',
      'چرا اتوماسیون سنتی (RPA) به تنهایی برای حل مسئله من کافی نیست؟',
      'پیش‌نویس صفحه ۸ من را بررسی و تکمیل کن'
    ],
    quickPromptsEn: [
      'Help me separate the cognitive AI core from non-cognitive plumbing',
      'Why is traditional RPA insufficient for my project iteration?',
      'Review and strengthen my Page 8 draft'
    ]
  },
  '9': {
    titleFa: 'جلسه ۹: اهداف اختصاصی شناختی (Cognitive Objectives)',
    titleEn: 'Session 9: Specific Cognitive Objectives',
    cpmaiMethodSummary: 'Enumerate specific cognitive tasks the model must perform (e.g., classify defect severity, extract delay clauses, forecast demand within ±5%).',
    keyDeliverables: 'Numbered list of concrete cognitive objectives mapped to business goals.',
    quickPromptsFa: [
      'تفاوت «هدف کسب‌وکار» با «هدف شناختی (Cognitive Objective)» چیست؟',
      'اهداف شناختی که در این صفحه فهرست کرده‌ام را ویرایش و استاندارد کن',
      '۳ هدف شناختی دقیق برای دیسیپلین من پیشنهاد بده'
    ],
    quickPromptsEn: [
      'What is the difference between a Business Objective and a Cognitive Objective?',
      'Refine and standardize the cognitive objectives I wrote on this page',
      'Suggest 3 precise cognitive objectives for my discipline'
    ]
  },
  '10': {
    titleFa: 'جلسه ۱۰: خروجی‌ها و دستاوردهای شناختی (Cognitive Outcomes)',
    titleEn: 'Session 10: Cognitive Outcomes & Subjective Judgments',
    cpmaiMethodSummary: 'Detail the tangible outputs produced by the cognitive system (scores, alerts, synthesized reports) and how human-in-the-loop subjective judgments are handled.',
    keyDeliverables: 'Expected model outputs, confidence thresholds, and human-in-the-loop (HITL) escalation rules.',
    quickPromptsFa: [
      'تفاوت Cognitive Objective (صفحه ۹) با Cognitive Outcome (صفحه ۱۰) چیست؟',
      'نقش قضاوت انسانی (Human-in-the-Loop) را چطور در خروجی‌ها تعریف کنم؟',
      'پاسخ من در صفحه ۱۰ را بررسی کن'
    ],
    quickPromptsEn: [
      'How do Cognitive Outcomes (Page 10) differ from Objectives (Page 9)?',
      'How should I define Human-in-the-Loop (HITL) judgment rules here?',
      'Review my Page 10 draft'
    ]
  },
  '11': {
    titleFa: 'جلسه ۱۱: معیارهای موفقیت هوش مصنوعی و اقناع منتقدان',
    titleEn: 'Session 11: AI Success Criteria & Satisfying Skeptics',
    cpmaiMethodSummary: 'Define what proves the AI capability itself succeeded, its unique superiority dimensions over legacy methods, and empirical proof needed to convince organizational skeptics.',
    keyDeliverables: 'AI success criteria, superiority dimensions, and skeptic-proof validation plan.',
    quickPromptsFa: [
      'چطور منتقدان و افراد شکاک در سازمان را نسبت به عملکرد هوش مصنوعی قانع کنم؟',
      'ابعاد برتری (Superiority Dimensions) راهکار AI را چطور بنویسم؟',
      'پاسخ صفحه ۱۱ من را ممیزی کن'
    ],
    quickPromptsEn: [
      'How do I design a validation plan that convinces organizational skeptics?',
      'What are strong Superiority Dimensions for an AI solution?',
      'Audit my Page 11 response'
    ]
  },
  '12': {
    titleFa: 'جلسه ۱۲: الگوهای هفت‌گانه شناختی در متدولوژی CPMAI',
    titleEn: 'Session 12: The Seven Patterns of AI (CPMAI Figure 2)',
    cpmaiMethodSummary: 'Analyze the 7 Patterns of AI (1. Hyperpersonalization, 2. Autonomous Systems, 3. Predictive Analytics & Decision Support, 4. Conversation & Human Interaction, 5. Patterns & Anomalies, 6. Recognition, 7. Goal-Driven Systems) and identify reusable assets.',
    keyDeliverables: 'Mapping of the 7 AI patterns to project needs and inventory of leverageable organizational assets.',
    quickPromptsFa: [
      '۷ الگوی هوش مصنوعی در متدولوژی CPMAI را به زبان ساده خلاصه کن',
      'کدام یک از ۷ الگوی CPMAI برای پروژه و دیسیپلین من کاربرد دارد؟',
      'تفاوت الگوی Predictive Analytics با الگوی Patterns & Anomalies چیست؟'
    ],
    quickPromptsEn: [
      'Summarize the 7 Patterns of AI in CPMAI clearly',
      'Which of the 7 AI Patterns apply best to my discipline and project?',
      'How does Predictive Analytics differ from Patterns & Anomalies?'
    ]
  },
  '13': {
    titleFa: 'جلسه ۱۳: انتخاب و توجیه الگوهای مورد استفاده در پروژه',
    titleEn: 'Session 13: Selecting & Justifying Project AI Patterns',
    cpmaiMethodSummary: 'Select primary and secondary AI patterns for this iteration, explain their pipeline synergy, explicitly eliminate unused patterns to protect scope, and pick toolkits.',
    keyDeliverables: 'Primary/secondary pattern selection, synergy workflow, scope elimination rationale, and toolkit choices.',
    quickPromptsFa: [
      'چرا در CPMAI حذف صریح الگوهای غیرمرتبط (Scope Elimination) اهمیت دارد؟',
      'ترکیب الگوی اصلی و فرعی که در این صفحه انتخاب کردم را بررسی کن',
      'چطور هم‌افزایی (Synergy) بین دو الگوی AI را در پروژه توضیح دهم؟'
    ],
    quickPromptsEn: [
      'Why is explicit pattern elimination critical for scope control in CPMAI?',
      'Review my primary and secondary AI pattern selection on this page',
      'How do I explain pipeline synergy between two AI patterns?'
    ]
  },
  '14': {
    titleFa: 'جلسه ۱۴: ارزیابی وضعیت — نیازمندی‌های منابع و زمان‌بندی',
    titleEn: 'Session 14: Assess Situation — Resources & Schedule',
    cpmaiMethodSummary: 'Task Group: Assess Situation. Audit personnel/SME availability, GPU/cloud compute, data access permissions, budget, and Agile stage-gate timelines.',
    keyDeliverables: 'Resource readiness matrix (Personnel, Compute, Data, Budget) and high-level schedule assessment.',
    quickPromptsFa: [
      'چطور گلوگاه‌های دسترسی به داده و زیرساخت را در مرحله Assess Situation شناسایی کنم؟',
      'ارزیابی وضعیت منابع که در صفحه ۱۴ نوشتم را بررسی کن',
      'مهم‌ترین ریسک‌های منابع در پروژه‌های هوش مصنوعی مهندسی چیست؟'
    ],
    quickPromptsEn: [
      'How do I identify data and compute bottlenecks during Assess Situation?',
      'Review my resource & schedule assessment on Page 14',
      'What are the top resource risks in enterprise AI projects?'
    ]
  },
  '15': {
    titleFa: 'جلسه ۱۵: سیاهه فناوری‌ها و مهارت‌های مورد نیاز',
    titleEn: 'Session 15: Technology Resources & Skills Inventory',
    cpmaiMethodSummary: 'Catalogue hardware, ML/LLM frameworks, cloud/on-prem hosting, MLOps/APIs, and team skills (Data Science, Domain SME, Data Engineering, AI PM) while identifying skill gaps.',
    keyDeliverables: 'Technology stack inventory, team skills matrix, and skill-gap mitigation plan (hire, upskill, partner).',
    quickPromptsFa: [
      'چه شکاف‌های مهارتی (Skill Gaps) معمولاً باعث شکست پروژه‌های CPMAI می‌شوند؟',
      'پشته فناوری و مهارت‌هایی که در صفحه ۱۵ نوشتم را نقد و تکمیل کن',
      'تفاوت نقش خبره دامنه (Domain SME) و مهندس داده در این صفحه چیست؟'
    ],
    quickPromptsEn: [
      'Which skill gaps most commonly derail CPMAI projects?',
      'Critique and complete my technology & skills inventory on Page 15',
      'Why is the Domain SME role indispensable alongside ML engineers?'
    ]
  },
  '16': {
    titleFa: 'جلسه ۱۶: الزامات زمان‌بندی، مایل‌استون‌ها و وابستگی‌ها',
    titleEn: 'Session 16: Schedule Requirements & Critical Dependencies',
    cpmaiMethodSummary: 'Plan 2-to-4-week Agile CPMAI sprints, stage-gate reviews across the 6 phases, hard regulatory/seasonal deadlines, and external API/security dependencies.',
    keyDeliverables: 'Sprint timeline, 6-phase milestones, hard constraints, and critical path dependencies.',
    quickPromptsFa: [
      'چطور فازهای ۶گانه CPMAI را در قالب اسپرینت‌های چابک زمان‌بندی کنم؟',
      'برنامه زمان‌بندی و وابستگی‌هایی که در صفحه ۱۶ نوشتم را ممیزی کن',
      'چرا فاز درک و آماده‌سازی داده بیشترین زمان پروژه را می‌گیرد؟'
    ],
    quickPromptsEn: [
      'How do I structure the 6 CPMAI phases into Agile sprints?',
      'Audit my schedule milestones and dependencies on Page 16',
      'Why do Data Understanding & Preparation consume 70-80% of schedule time?'
    ]
  },
  '17': {
    titleFa: 'جلسه ۱۷: محدودیت‌های پروژه و مرزهای عملکرد مدل',
    titleEn: 'Session 17: Project Constraints & Model Performance Boundaries',
    cpmaiMethodSummary: 'Task Group: AI System Performance & Operation. Document privacy/security constraints (on-prem, GDPR/CCPA), data noise, rate limits, and probabilistic error tolerance.',
    keyDeliverables: 'Technical/regulatory constraint register and minimum acceptable model performance boundaries.',
    quickPromptsFa: [
      'چطور محدودیت‌های محرمانگی داده و خطای احتمالی مدل را در این صفحه ثبت کنم؟',
      'محدودیت‌هایی که در صفحه ۱۷ نوشتم را بررسی کن؛ چه چیزی از قلم افتاده؟',
      'چرا سیستم‌های هوش مصنوعی برخلاف نرم‌افزار سنتی قطعی (Deterministic) نیستند؟'
    ],
    quickPromptsEn: [
      'How should I document data privacy constraints and probabilistic error bounds?',
      'Review my Page 17 constraints—what blind spots did I miss?',
      'How do we manage probabilistic AI behavior vs deterministic software?'
    ]
  },
  '18': {
    titleFa: 'جلسه ۱۸: ماتریس درهم‌ریختگی و سنجه‌های ارزیابی مدل',
    titleEn: 'Session 18: Confusion Matrix & Model Performance Metrics',
    cpmaiMethodSummary: 'Master CPMAI Figure 3 (Confusion Matrix: TP, FP, TN, FN) and select appropriate evaluation metrics (Precision, Recall, F1-Score, Accuracy, ROC-AUC, RMSE) for the problem.',
    keyDeliverables: 'Confusion matrix definitions in domain context and target thresholds for Precision, Recall, and F1.',
    quickPromptsFa: [
      'تفاوت Precision و Recall و ماتریس درهم‌ریختگی (Confusion Matrix) را با مثال رشته من توضیح بده',
      'در پروژه من خطای مثبت کاذب (False Positive) خطرناک‌تر است یا منفی کاذب (False Negative)؟',
      'اعداد و متریک‌هایی که در صفحه ۱۸ نوشتم را بررسی کن'
    ],
    quickPromptsEn: [
      'Explain Precision, Recall, and the Confusion Matrix using an example from my discipline',
      'In my use case, is a False Positive or False Negative more costly?',
      'Review the model evaluation metrics I drafted on Page 18'
    ]
  },
  '19': {
    titleFa: 'جلسه ۱۹: نیازمندی‌های عملکردی در برابر خط پایه و حساسیت به خطا',
    titleEn: 'Session 19: Performance vs. Baselines & Error Sensitivities',
    cpmaiMethodSummary: 'Define Maximum Acceptable False Negative/Positive Rates, compare required AI accuracy against current human/heuristic baselines, and address GenAI hallucination sensitivities.',
    keyDeliverables: 'Max acceptable FNR/FPR, improvement over human baseline, and hallucination/error mitigation plan.',
    quickPromptsFa: [
      'چطور حداکثر نرخ قابل قبول منفی کاذب (FNR) را در برابر عملکرد فعلی انسان تعیین کنم؟',
      'حساسیت پروژه به خطای مدل و توهم (Hallucination) را چطور در صفحه ۱۹ بنویسم؟',
      'پاسخ‌های من در صفحه ۱۹ را نقد و بررسی کن'
    ],
    quickPromptsEn: [
      'How do I benchmark acceptable FNR/FPR against current human baselines?',
      'How should I document sensitivity to GenAI hallucinations on Page 19?',
      'Critique my Page 19 responses'
    ]
  },
  '20': {
    titleFa: 'جلسه ۲۰: مقادیر قابل قبول شاخص‌های کلیدی کسب‌وکار (Business KPIs)',
    titleEn: 'Session 20: Acceptable Business KPI Performance Values',
    cpmaiMethodSummary: 'Bridge technical model accuracy to executive Business KPIs (cycle time reduction, cost savings, CSAT, defect reduction, revenue uplift) with Minimum, Target, and Stretch values.',
    keyDeliverables: 'Business KPI table (Baseline, Minimum Acceptable, Target, Stretch) and financial impact validation.',
    quickPromptsFa: [
      'چطور دقت فنی مدل (مثل F1=90%) را به شاخص کلیدی کسب‌وکار (Business KPI) متصل کنم؟',
      'مقادیر حداقل، هدف و ایده‌آل که در صفحه ۲۰ نوشتم را ممیزی کن',
      '۳ شاخص Business KPI استاندارد برای پروژه من پیشنهاد بده'
    ],
    quickPromptsEn: [
      'How do I translate model F1/Recall into executive Business KPIs?',
      'Audit my Baseline, Minimum, and Target Business KPIs on Page 20',
      'Suggest 3 concrete Business KPIs with target ranges for my project'
    ]
  },
  '21': {
    titleFa: 'جلسه ۲۱: شاخص‌های کلیدی عملکرد زیرساخت و فناوری (Technology KPIs)',
    titleEn: 'Session 21: Required Technology & Infrastructure KPIs',
    cpmaiMethodSummary: 'Define operational SLAs required for Phase VI deployment: P95/P99 inference latency, throughput (RPS/concurrent users), cloud FinOps cost per 1k queries, uptime/HA, and drift monitoring.',
    keyDeliverables: 'Technology KPI SLA table (Latency, Throughput, Cost/Query, Uptime, Drift Alerting) completing Phase I.',
    quickPromptsFa: [
      'مهم‌ترین شاخص‌های فنی زیرساخت (Latency, Throughput, FinOps) در صفحه ۲۱ کدامند؟',
      'پاسخ‌های من در صفحه ۲۱ را بررسی کن؛ آیا برای ورود به فاز دوم CPMAI آماده هستم؟',
      'یک جمع‌بندی از کل فاز اول بر اساس این جلسه ارائه بده'
    ],
    quickPromptsEn: [
      'What are realistic Latency, Throughput, and FinOps SLAs for Page 21?',
      'Review my Page 21 Technology KPIs—am I ready for CPMAI Phase II?',
      'Summarize how Page 21 completes the CPMAI Phase I gate review'
    ]
  }
};

export interface TutorChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  pageTag?: string;
}

interface ContextualAiTutorSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  page: AppPage;
  lang: Language;
  industryTrack: IndustryTrackId;
  disciplineId: DisciplineId;
  roleId: EngineeringRoleId;
  activePageDraft: string;
}

const TUTOR_HISTORY_STORAGE_KEY = 'cpmai_contextual_tutor_history_v1';

export const ContextualAiTutorSidebar: React.FC<ContextualAiTutorSidebarProps> = ({
  isOpen,
  onClose,
  page,
  lang,
  industryTrack,
  disciplineId,
  roleId,
  activePageDraft
}) => {
  const [sidebarWidth, setSidebarWidth] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('cpmai-tutor-sidebar-w');
      if (saved) return Math.max(320, Math.min(540, parseInt(saved, 10)));
    } catch {}
    return 380;
  });
  const [isDragging, setIsDragging] = useState(false);

  const pageKey = String(page);
  const pageMeta: PageTutorMetadata = CPMAI_PAGE_TUTOR_CONTEXT[pageKey] || CPMAI_PAGE_TUTOR_CONTEXT['1'];
  const trackMeta = INDUSTRY_TRACKS[industryTrack];
  const discMeta = getDisciplineMetadata(disciplineId);
  const activeRoleLabels = industryTrack === 'PAYA_SAMAN_PARS' ? PAYA_ROLE_LABELS : ROLE_LABELS;
  const roleMeta = activeRoleLabels[roleId];

  // Store conversation history per page key so switching pages keeps relevant thread or lets user continue
  const [threadsByPage, setThreadsByPage] = useState<Record<string, TutorChatMessage[]>>(() => {
    try {
      const saved = localStorage.getItem(TUTOR_HISTORY_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });

  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentMessages = threadsByPage[pageKey] || [];

  useEffect(() => {
    try {
      localStorage.setItem(TUTOR_HISTORY_STORAGE_KEY, JSON.stringify(threadsByPage));
    } catch {}
  }, [threadsByPage]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentMessages.length, isLoading, isOpen, pageKey]);

  // Resize handle logic
  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e: MouseEvent) => {
      // In RTL (fa), the right sidebar is on the left edge of the screen; in LTR (en), it's on the right edge
      const newWidth = lang === 'fa' ? window.innerWidth - e.clientX : window.innerWidth - e.clientX;
      const computedWidth = lang === 'fa' ? window.innerWidth - e.clientX : window.innerWidth - e.clientX;
      // Use distance from the inline-end edge of viewport
      const isRtl = document.documentElement.dir === 'rtl' || lang === 'fa';
      const w = isRtl ? e.clientX : window.innerWidth - e.clientX;
      const clamped = Math.max(320, Math.min(540, Math.round(w)));
      setSidebarWidth(clamped);
    };

    const onUp = () => {
      setIsDragging(false);
      try {
        localStorage.setItem('cpmai-tutor-sidebar-w', sidebarWidth.toString());
      } catch {}
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isDragging, sidebarWidth, lang]);

  const handleSendQuestion = async (questionText?: string) => {
    const q = (questionText ?? inputQuestion).trim();
    if (!q || isLoading) return;

    setErrorMsg(null);
    if (!questionText) {
      setInputQuestion('');
    }

    const userMsg: TutorChatMessage = {
      id: `u_${Date.now()}`,
      role: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString(lang === 'fa' ? 'fa-IR' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      pageTag: lang === 'fa' ? pageMeta.titleFa : pageMeta.titleEn
    };

    const updatedHistory = [...currentMessages, userMsg];
    setThreadsByPage((prev) => ({
      ...prev,
      [pageKey]: updatedHistory
    }));

    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: q,
          lang,
          history: currentMessages.slice(-8).map((m) => ({
            role: m.role,
            text: m.text
          })),
          pageContext: {
            pageNumber: page,
            pageTitleFa: pageMeta.titleFa,
            pageTitleEn: pageMeta.titleEn,
            cpmaiMethodSummary: pageMeta.cpmaiMethodSummary,
            keyDeliverables: pageMeta.keyDeliverables,
            industryTrack: lang === 'fa' ? trackMeta.titleFa : trackMeta.titleEn,
            disciplineTitle: lang === 'fa' ? `${discMeta.titleFa} (${discMeta.titleEn})` : discMeta.titleEn,
            roleTitle: roleMeta ? (lang === 'fa' ? roleMeta.titleFa : roleMeta.titleEn) : '',
            userDraft: activePageDraft
          }
        })
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || (lang === 'fa' ? 'خطا در دریافت پاسخ از مربی هوشمند' : 'Failed to get response from AI Tutor'));
      }

      const aiMsg: TutorChatMessage = {
        id: `m_${Date.now()}`,
        role: 'model',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString(lang === 'fa' ? 'fa-IR' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        pageTag: lang === 'fa' ? pageMeta.titleFa : pageMeta.titleEn
      };

      setThreadsByPage((prev) => ({
        ...prev,
        [pageKey]: [...(prev[pageKey] || []), aiMsg]
      }));
    } catch (err: any) {
      setErrorMsg(err?.message || (lang === 'fa' ? 'خطا در ارتباط با سرور هوش مصنوعی' : 'Connection error with AI Tutor server'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearCurrentThread = () => {
    setThreadsByPage((prev) => {
      const next = { ...prev };
      delete next[pageKey];
      return next;
    });
    setErrorMsg(null);
  };

  const handleCopyMessage = (id: string, text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      });
    }
  };

  const hasUserDraft = Boolean(activePageDraft && activePageDraft.trim().length > 0);
  const quickPrompts = lang === 'fa' ? pageMeta.quickPromptsFa : pageMeta.quickPromptsEn;

  return (
    <>
      {/* Mobile Backdrop Scrim */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-[#08130f]/60 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Contextual AI Tutor Sidebar */}
      <aside
        style={{
          width: typeof window !== 'undefined' && window.innerWidth >= 1024 ? (isOpen ? `${sidebarWidth}px` : '0px') : undefined,
          opacity: typeof window !== 'undefined' && window.innerWidth >= 1024 && !isOpen ? 0 : 1,
          pointerEvents: typeof window !== 'undefined' && window.innerWidth >= 1024 && !isOpen ? 'none' : 'auto'
        }}
        className={`fixed lg:sticky inset-y-0 end-0 lg:top-16 z-50 lg:z-30 h-full lg:h-[calc(100vh-4rem)] w-[min(370px,92vw)] lg:w-auto shrink-0 frosted-sidebar border-inline-start border-white/60 dark:border-white/10 flex flex-col transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen
            ? 'translate-x-0'
            : lang === 'fa'
            ? '-translate-x-full lg:translate-x-0'
            : 'translate-x-full lg:translate-x-0'
        } ${isDragging ? 'select-none' : ''}`}
      >
        {/* Resize Grip Handle on Desktop */}
        {isOpen && (
          <div
            onMouseDown={() => setIsDragging(true)}
            onDoubleClick={() => setSidebarWidth(380)}
            title={lang === 'fa' ? 'برای تغییر عرض بکشید' : 'Drag to resize'}
            className="hidden lg:block absolute inset-y-0 -inset-inline-start-1 w-2.5 cursor-col-resize z-20 group/grip"
          >
            <div className="w-0.5 h-full bg-[#e0533c] dark:bg-[#fb7185] opacity-0 group-hover/grip:opacity-100 transition-opacity mx-auto" />
          </div>
        )}

        {/* Top Header */}
        <div className="p-4 pb-3 border-b border-white/60 dark:border-white/10 bg-gradient-to-b from-[#e0533c]/10 to-transparent space-y-2.5 shrink-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#e0533c] to-[#1e8f6b] text-white flex items-center justify-center shadow-sm shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-sm font-extrabold text-[#12343b] dark:text-[#e4f0ee] truncate">
                    {lang === 'fa' ? 'مربی هوشمند CPMAI' : 'CPMAI AI Tutor'}
                  </h2>
                  <span className="px-1.5 py-0.5 rounded-md text-[9px] font-mono font-bold bg-[#1e8f6b]/15 text-[#1e8f6b] dark:text-[#63c496] border border-[#1e8f6b]/30">
                    Grounded
                  </span>
                </div>
                <p className="text-[11px] text-[#587479] dark:text-[#8ca8ab] truncate">
                  {lang === 'fa'
                    ? 'پاسخگویی و ممیزی بر اساس محتوای صفحه فعال'
                    : 'Context-grounded in your active workbook page'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {currentMessages.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearCurrentThread}
                  title={lang === 'fa' ? 'پاک کردن گفتگوی این صفحه' : 'Clear this page chat'}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[#587479] hover:text-rose-600 hover:bg-rose-500/10 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                title={lang === 'fa' ? 'بستن مربی هوشمند' : 'Close AI Tutor'}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#587479] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Page Grounding Badge Card */}
          <div className="p-2.5 rounded-xl bg-white/75 dark:bg-[#152227]/90 border border-[#c3d4d4]/80 dark:border-[#274347] space-y-1.5 shadow-2xs">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <BookOpen className="w-3.5 h-3.5 text-[#e0533c] dark:text-[#fb7185] shrink-0" />
                <span className="text-[11px] font-bold text-[#12343b] dark:text-[#e4f0ee] truncate">
                  {lang === 'fa' ? pageMeta.titleFa : pageMeta.titleEn}
                </span>
              </div>
              <span
                className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold shrink-0 ${
                  hasUserDraft
                    ? 'bg-[#e3f2ea] text-[#2f7d5b] dark:bg-[#173025] dark:text-[#63c496]'
                    : 'bg-amber-500/10 text-amber-700 dark:text-amber-300'
                }`}
              >
                <CheckCircle2 className="w-2.5 h-2.5" />
                <span>
                  {hasUserDraft
                    ? (lang === 'fa' ? 'متصل به دست‌نویس شما' : 'Live Draft Synced')
                    : (lang === 'fa' ? 'آماده راهنمایی' : 'Methodology Grounded')}
                </span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1 text-[10px] text-[#587479] dark:text-[#8ca8ab]">
              <span className="px-1.5 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.06] font-medium">
                {lang === 'fa' ? trackMeta.shortTitleFa : trackMeta.shortTitleEn}
              </span>
              <span>·</span>
              <span className="px-1.5 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.06] font-medium">
                {lang === 'fa' ? discMeta.shortTitleFa : discMeta.shortTitleEn}
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Messages & Grounded Prompts Area */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 no-scrollbar">
          {/* Methodology Grounding Summary Card */}
          <div className="p-3 rounded-xl bg-[#eaf2f1]/70 dark:bg-[#172d31]/60 border border-[#c3d4d4]/70 dark:border-[#274347] space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#e0533c] dark:text-[#fb7185]">
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <span>{lang === 'fa' ? 'چارچوب متدولوژی این صفحه:' : 'Page Methodology Context:'}</span>
            </div>
            <p className="text-[11px] text-[#1c2830]/90 dark:text-[#e8ebe9]/90 leading-relaxed">
              {pageMeta.cpmaiMethodSummary}
            </p>
            <div className="pt-1 border-t border-[#c3d4d4]/50 dark:border-[#274347] text-[10px] text-[#587479] dark:text-[#8ca8ab]">
              <strong className="font-bold text-[#12343b] dark:text-[#e4f0ee]">
                {lang === 'fa' ? 'خروجی‌های کلیدی: ' : 'Key Deliverables: '}
              </strong>
              <span>{pageMeta.keyDeliverables}</span>
            </div>
          </div>

          {/* Suggested Contextual Prompts when empty or at top */}
          {currentMessages.length === 0 && (
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-1.5 px-1 text-[11px] font-bold text-[#587479] dark:text-[#8ca8ab]">
                <HelpCircle className="w-3.5 h-3.5 text-[#d98a1f]" />
                <span>
                  {lang === 'fa'
                    ? 'پرسش‌های پیشنهادی ویژه این صفحه:'
                    : 'Suggested questions for this page:'}
                </span>
              </div>

              <div className="space-y-1.5">
                {quickPrompts.map((promptText, idx) => (
                  <button
                    key={idx}
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleSendQuestion(promptText)}
                    className="w-full text-start p-2.5 rounded-xl bg-white/80 dark:bg-[#1a2228]/90 hover:bg-[#fdf0d8]/80 dark:hover:bg-[#2b2412]/70 border border-[#d9dad5]/80 dark:border-[#2d3942] hover:border-[#d98a1f] transition-all text-xs text-[#1c2830] dark:text-[#e8ebe9] flex items-start gap-2 group cursor-pointer shadow-2xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#d98a1f] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="leading-snug">{promptText}</span>
                  </button>
                ))}

                {hasUserDraft && (
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() =>
                      handleSendQuestion(
                        lang === 'fa'
                          ? 'لطفاً پاسخ‌هایی که در این صفحه وارد کرده‌ام را بر اساس استاندارد فاز اول CPMAI ممیزی کن؛ نقاط قوت، نواقص و پیشنهاد اصلاحی برای دیسیپلین من ارائه بده.'
                          : 'Please audit my current draft on this page against CPMAI Phase I standards. Highlight strengths, blind spots, and actionable improvements for my discipline.'
                      )
                    }
                    className="w-full text-start p-2.5 rounded-xl bg-gradient-to-r from-[#1e8f6b]/15 to-[#e0533c]/15 hover:from-[#1e8f6b]/25 hover:to-[#e0533c]/25 border border-[#1e8f6b]/40 transition-all text-xs font-bold text-[#12343b] dark:text-[#e4f0ee] flex items-start gap-2 cursor-pointer shadow-2xs"
                  >
                    <Wand2 className="w-4 h-4 text-[#1e8f6b] shrink-0 mt-0.5" />
                    <span className="leading-snug">
                      {lang === 'fa'
                        ? 'ممیزی هوشمند دست‌نویس فعلی من در این صفحه'
                        : 'Audit my live workbook draft on this page'}
                    </span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Conversation Messages */}
          {currentMessages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[92%] rounded-2xl p-3 text-xs leading-relaxed shadow-2xs ${
                    isUser
                      ? 'bg-[#e0533c] text-white rounded-ee-xs'
                      : 'bg-white/95 dark:bg-[#1a2228] text-[#1c2830] dark:text-[#e8ebe9] border border-[#d9dad5]/80 dark:border-[#2d3942] rounded-es-xs'
                  }`}
                >
                  {isUser ? (
                    <div className="whitespace-pre-wrap break-words font-medium">{msg.text}</div>
                  ) : (
                    <TutorMarkdownRenderer content={msg.text} lang={lang} />
                  )}

                  <div
                    className={`mt-2 pt-1.5 border-t flex items-center justify-between gap-2 text-[10px] ${
                      isUser
                        ? 'border-white/15 text-white/75'
                        : 'border-black/5 dark:border-white/5 text-[#587479] dark:text-[#8ca8ab]'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        type="button"
                        onClick={() => handleCopyMessage(msg.id, msg.text)}
                        className="flex items-center gap-1 hover:text-[#e0533c] dark:hover:text-[#fb7185] transition-colors cursor-pointer"
                        title={lang === 'fa' ? 'کپی پاسخ' : 'Copy reply'}
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-[#1e8f6b]" />
                            <span>{lang === 'fa' ? 'کپی شد' : 'Copied'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>{lang === 'fa' ? 'کپی' : 'Copy'}</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-start gap-2">
              <div className="p-3 rounded-2xl rounded-es-xs bg-white/90 dark:bg-[#1a2228] border border-[#d9dad5]/80 dark:border-[#2d3942] text-xs text-[#587479] dark:text-[#8ca8ab] flex items-center gap-2 shadow-2xs">
                <div className="w-2 h-2 rounded-full bg-[#1e8f6b] animate-ping" />
                <span>
                  {lang === 'fa'
                    ? 'در حال تحلیل بر اساس متدولوژی CPMAI و صفحه فعال...'
                    : 'Analyzing page context & CPMAI methodology...'}
                </span>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">{errorMsg}</div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Action Strip when conversation already started */}
        {currentMessages.length > 0 && (
          <div className="px-3 py-1.5 border-t border-white/50 dark:border-white/5 bg-white/40 dark:bg-black/20 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            {hasUserDraft && (
              <button
                type="button"
                disabled={isLoading}
                onClick={() =>
                  handleSendQuestion(
                    lang === 'fa'
                      ? 'پاسخ فعلی من در این صفحه را ممیزی کن و پیشنهاد بهبود بده.'
                      : 'Audit my current draft on this page and suggest improvements.'
                  )
                }
                className="px-2.5 py-1 rounded-full bg-[#1e8f6b]/15 hover:bg-[#1e8f6b]/25 text-[#1e8f6b] dark:text-[#63c496] border border-[#1e8f6b]/30 text-[10px] font-bold whitespace-nowrap cursor-pointer shrink-0 flex items-center gap-1"
              >
                <Wand2 className="w-3 h-3" />
                <span>{lang === 'fa' ? 'ممیزی دست‌نویس من' : 'Audit My Draft'}</span>
              </button>
            )}
            {quickPrompts.slice(0, 2).map((qp, i) => (
              <button
                key={i}
                type="button"
                disabled={isLoading}
                onClick={() => handleSendQuestion(qp)}
                className="px-2.5 py-1 rounded-full bg-white/80 dark:bg-[#1a2228] hover:border-[#d98a1f] border border-[#d9dad5] dark:border-[#2d3942] text-[10px] text-[#587479] dark:text-[#8ca8ab] whitespace-nowrap cursor-pointer shrink-0 truncate max-w-[200px]"
              >
                {qp}
              </button>
            ))}
          </div>
        )}

        {/* Input Form Footer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendQuestion();
          }}
          className="p-3 border-t border-white/60 dark:border-white/10 bg-white/60 dark:bg-[#12171b]/80 space-y-2 shrink-0"
        >
          <div className="relative flex items-end gap-2">
            <textarea
              rows={2}
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendQuestion();
                }
              }}
              placeholder={
                lang === 'fa'
                  ? 'پرسش خود درباره متدولوژی CPMAI یا این صفحه را بنویسید...'
                  : 'Ask about CPMAI methodology or this page...'
              }
              className="flex-1 resize-none rounded-xl border border-[#c3d4d4] dark:border-[#2d3942] bg-white dark:bg-[#1a2228] px-3 py-2 text-xs text-[#1c2830] dark:text-[#e8ebe9] placeholder-[#587479] focus:outline-hidden focus:border-[#e0533c] dark:focus:border-[#fb7185]"
            />
            <button
              type="submit"
              disabled={!inputQuestion.trim() || isLoading}
              className="h-9 px-3 rounded-xl bg-[#e0533c] hover:bg-[#c2410c] disabled:opacity-40 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-xs"
              title={lang === 'fa' ? 'ارسال پرسش (Enter)' : 'Send Question (Enter)'}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#587479] dark:text-[#8ca8ab] px-0.5">
            <span className="flex items-center gap-1">
              <MessageSquareText className="w-3 h-3 text-[#1e8f6b]" />
              <span>
                {lang === 'fa'
                  ? 'پاسخ‌ها منطبق بر استاندارد CPMAI v6 و صفحه فعلی شماست'
                  : 'Grounded in CPMAI v6 & current page'}
              </span>
            </span>
            <span className="font-mono text-[9px] opacity-75">Enter ↵</span>
          </div>
        </form>
      </aside>
    </>
  );
};
