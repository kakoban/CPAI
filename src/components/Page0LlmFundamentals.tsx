import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types/cpmai';
import {
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Terminal,
  Zap,
  ShieldAlert,
  FileText,
  Layers,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  Code,
  FolderKanban,
  CheckCircle2,
  Info,
  Lightbulb,
  Play,
  RotateCcw,
  Bot,
  Scale,
  Building2,
  Factory,
  Train,
  FileSpreadsheet,
  ListChecks,
  BookCheck,
  AlertCircle,
  Download,
  Table,
  Database,
  Eye,
  ScrollText,
  BookmarkCheck,
  FileCheck2,
  Shield,
  Target,
  Users,
  Volume2,
  VolumeX,
  ChevronUp,
  ChevronDown,
  LayoutGrid,
  Monitor,
  GitBranch,
  FolderTree,
  Rocket,
  Globe,
  BookOpen,
  AlertTriangle,
  Landmark
} from 'lucide-react';
import { getDatasetsForTrack } from '../data/engineering_sample_datasets';
import { getContractsForTrack } from '../data/engineering_sample_contracts';
import { Page0EngineeringMasterclass } from './Page0EngineeringMasterclass';
import { NotebookLmWorkshop } from './NotebookLmWorkshop';
import { PayaHoldingArtifactSimulator } from './PayaHoldingArtifactSimulator';
import { HrArtifactsCanvasWorkshop } from './HrArtifactsCanvasWorkshop';
import { ClaudeEnterpriseConnectors } from './connectors/ClaudeEnterpriseConnectors';
import { ObsidianBrainSkillsWorkshop } from './obsidian/ObsidianBrainSkillsWorkshop';
import { ProjectorSlideModal } from './ProjectorSlideModal';
import {
  DiagramWrapper,
  PipelineArchitectureDiagram,
  VisualTableComparisonDiagram,
  GitHubDccWorkflowDiagram,
  GitHubAnnotatedUiMockup,
  ContractAuditArchitectureDiagram,
  RctoFrameworkDiagram
} from './visuals/EngineeringVisualDiagrams';
import { getSessionCurriculumForTrack } from '../data/session1_and_5_curriculum';
import { OWJ_LOGO, OWJ_LOGO_FALLBACK } from '../data/logo';
import { IndustryTrackId, DisciplineId } from '../types/industryTrack';
import {
  getDisciplineMetadata,
  getDisciplinePromptShowcase
} from '../data/disciplineExamplesRegistry';
import {
  playTactileSound,
  isTactileSoundEnabled,
  setTactileSoundEnabled
} from '../utils/uiSoundEffects';

interface Page0Props {
  lang: Language;
  content: string;
  onChangeContent: (val: string) => void;
  onGoToPage1: () => void;
  onOpenQuiz?: () => void;
  industryTrack?: IndustryTrackId;
  disciplineId?: DisciplineId;
  isAdmin?: boolean;
}

interface PromptItem {
  id: string;
  titleFa: string;
  titleEn: string;
  categoryFa: string;
  categoryEn: string;
  descriptionFa: string;
  descriptionEn: string;
  promptFa: string;
  promptEn: string;
  targetTools: string[];
}

interface RctoPillarExample {
  roleFa: string;
  roleEn: string;
  contextFa: string;
  contextEn: string;
  taskFa: string;
  taskEn: string;
  outputFa: string;
  outputEn: string;
}

const TRACK_RCTO_PILLARS: Record<IndustryTrackId, RctoPillarExample> = {
  CIVIL_INFRA: {
    roleFa: '«تو مهندس ارشد ژئوتکنیک و ناظر مقیم احداث خط مترو بر مبنای نشریه ۴۳۱۱ هستی...»',
    roleEn: '"You are a Lead Geotechnical Engineer and resident metro inspector adhering to Circular 4311..."',
    contextFa: '«دستگاه TBM در حال نزدیک شدن به تقاطع با لوله گاز پرفشار شهری در عمق ۱۸ متری است و داده‌های انکلینومتر نشست ۳ میلی‌متری را نشان می‌دهند...»',
    contextEn: '"The TBM drive is approaching a high-pressure municipal gas main at 18m depth with inclinometers recording 3mm settlement..."',
    taskFa: '«ریسک فرونشست را ارزیابی، پارامترهای بهینه فشار سینه کار را تعیین و دستور کار فوری برای شیفت بعد صادر کن...»',
    taskEn: '"Assess subsidence risk, calculate optimal face-support pressure, and prescribe immediate excavation instructions..."',
    outputFa: '«پاسخ را در یک جدول فنی ۴ ستونه شامل: [پارامتر TBM | مقدار فعلی | حد مجاز استاندارد | اقدام اصلاحی کارگاه] بدون مقدمه بنویس.»',
    outputEn: '"Output a 4-column engineering table: [TBM Parameter | Current Telemetry | Allowable Limit | Site Action Plan] without preamble."'
  },
  ENERGY_PETRO: {
    roleFa: '«تو مهندس ارشد فرآیند و هماهنگ‌کننده جلسات HAZOP در پالایشگاه میعانات گازی هستی...»',
    roleEn: '"You are a Lead Process Engineer and HAZOP coordinator at a gas condensate refinery..."',
    contextFa: '«افت فشار در مبدل‌های حرارتی پیش‌گرمایش به ۳.۲ بار رسیده و دمای ورودی به کوره ۵ درجه کاهش یافته که ریسک کک‌گرفتگی و شات‌دان ایجاد کرده است...»',
    contextEn: '"Preheat train heat exchanger differential pressure hit 3.2 bar with a 5°C furnace inlet drop, risking emergency coking trips..."',
    taskFa: '«علت هیدرولیکی رسوب را تحلیل، زمان بحرانی شستشو با حلال را پیش‌بینی و پروتکل پیشگیری از مشعل‌سوزی را تدوین کن...»',
    taskEn: '"Analyze hydraulic fouling kinetics, forecast descaling timeline, and formulate flaring mitigation protocols..."',
    outputFa: '«پاسخ را در یک ماتریس ایمنی فرآیندی شامل: [تجهیز بحرانی | انحراف فشار/دما | پیامد HAZOP | دستور اقدام اتاق کنترل] ارائه بده.»',
    outputEn: '"Output as a process safety matrix: [Critical Equipment | Deviation | HAZOP Consequence | CCR Action Directive]."'
  },
  GENERAL_EVERYDAY: {
    roleFa: '«تو مشاور و مربی هوشمند اقتصاد خانوار و برنامه‌ریزی زندگی خانوادگی هستی...»',
    roleEn: '"You are a Smart Family Lifestyle & Household Economics Coach..."',
    contextFa: '«خانواده ما ۴ نفره است و ماهانه نزدیک به ۲۵٪ از خریدهای سوپرمارکت و میوه به دلیل فراموشی در یخچال دور ریخته می‌شود...»',
    contextEn: '"Our 4-person family currently discards nearly 25% of fresh supermarket groceries due to pantry disorganization..."',
    taskFa: '«با تحلیل اقلام پرمصرف، ۵ ترفند سریع برای صفر کردن دورریز، برنامه غذایی با باقیمانده‌ها و روش پس‌انداز بودجه برای سفر تابستانی پیشنهاد بده...»',
    taskEn: '"Identify high-spoilage items, propose 5 quick zero-waste hacks, a leftover meal plan, and a vacation micro-savings rule..."',
    outputFa: '«پاسخ را در قالب یک جدول کاربردی و دوستانه شامل: [قلم مصرفی / دغدغه | راهکار هوشمند روزمره | صرفه‌جویی ریالی ماهانه | اقدام عملی همین امروز] بنویس.»',
    outputEn: '"Output as a friendly, actionable household table: [Item / Concern | Smart Everyday Hack | Monthly Savings | Immediate Today Action]."'
  },
  PAYA_SAMAN_PARS: {
    roleFa: '«تو مدیر ارشد PMO و تحلیلگر قراردادهای EPC+F / BOT در ستاد هلدینگ پایا سامان پارس هستی...»',
    roleEn: '"You are Senior Portfolio PMO and EPC+F / BOT Contracts Lead at Paya Saman Pars Holding..."',
    contextFa: '«گزارش‌های ۶۳ پروژه در ۱۴ شرکت تابعه دو بال (رامان، جنرال مکانیک، دی، ملی ساختمان، تابیران، آتی‌ساز، خانه و شهر صنعتی کاوه) پراکنده است و برخی فیلدهای پورتال خالی مانده‌اند...»',
    contextEn: '"Progress reports across 63 projects and 14 subsidiaries in both wings (civil contracting + housing & Kaveh SEZ) are fragmented with unpopulated portal detail fields..."',
    taskFa: '«گلوگاه‌های دو بال و تداخل ناوگان سنگین را تحلیل کن و بدون حدس زدن فیلدهای مفقود، برنامه اقدام کنسرسیومی پیشنهاد بده...»',
    taskEn: '"Diagnose dual-wing delays and heavy fleet conflicts without fabricating missing portal fields, and prescribe consortium actions..."',
    outputFa: '«پاسخ را در جدول ۴ ستونه: [پروژه / شرکت تابعه | گلوگاه یا خلأ داده | اثر بر قرارداد EPC+F/BOT | اقدام اصلاحی با مسئول] بدون مقدمه‌چینی بنویس.»',
    outputEn: '"Output as a 4-column executive table: [Project / Subsidiary | Bottleneck or Data Gap | EPC+F/BOT Impact | Corrective Action & Owner]."'
  }
};

interface OtherLlmPlatform {
  id: 'deepseek' | 'qwen' | 'perplexity' | 'grok' | 'mistral' | 'meta_llama';
  name: string;
  company: string;
  url: string;
  domainLabel: string;
  badgeFa: string;
  badgeEn: string;
  descFa: string;
  descEn: string;
  modelsFa: string;
  modelsEn: string;
  accentHex: string;
  bgTintClass: string;
}

const OTHER_LLM_PLATFORMS: OtherLlmPlatform[] = [
  {
    id: 'deepseek',
    name: 'DeepSeek',
    company: 'DeepSeek AI',
    url: 'https://chat.deepseek.com',
    domainLabel: 'chat.deepseek.com',
    badgeFa: 'استدلال عمیق و متن‌باز',
    badgeEn: 'Open-Weight & Reasoning',
    descFa: 'مدل قدرتمند استدلال گام‌به‌گام (R1) و مکالمه سریع (V3)؛ فوق‌العاده قوی در منطق مهندسی، ریاضیات، کدنویسی و تحلیل داده با دسترسی وب رایگان.',
    descEn: 'Open-weight reasoning powerhouse (R1) and flagship chat (V3), excelling at logic, engineering math, coding, and free web access.',
    modelsFa: 'DeepSeek-R1 · DeepSeek-V3',
    modelsEn: 'DeepSeek-R1 · DeepSeek-V3',
    accentHex: '#4D6BFE',
    bgTintClass: 'bg-[#4D6BFE]/10 border-[#4D6BFE]/25 text-[#4D6BFE]'
  },
  {
    id: 'qwen',
    name: 'Qwen (کوئن)',
    company: 'Alibaba Cloud',
    url: 'https://chat.qwen.ai',
    domainLabel: 'chat.qwen.ai',
    badgeFa: 'قدرتمند در فارسی و کد',
    badgeEn: 'Multilingual & Coding',
    descFa: 'خانواده مدل‌های چندزبانه و متن‌باز علی‌بابا با تسلط چشمگیر بر زبان فارسی، قابلیت Artifacts، جستجوی وب و ابزارهای تخصصی کد و بینایی.',
    descEn: "Alibaba's flagship multilingual & open-weight family with strong Persian fluency, web search, Artifacts, and specialized coder/vision models.",
    modelsFa: 'Qwen3 · Qwen2.5-Max · Qwen-Coder',
    modelsEn: 'Qwen3 · Qwen2.5-Max · Qwen-Coder',
    accentHex: '#615CED',
    bgTintClass: 'bg-[#615CED]/10 border-[#615CED]/25 text-[#615CED]'
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    company: 'Perplexity AI',
    url: 'https://www.perplexity.ai',
    domainLabel: 'perplexity.ai',
    badgeFa: 'تحقیق با منبع دقیق',
    badgeEn: 'Cited Live Research',
    descFa: 'موتور پژوهش و پاسخگویی متصل به وب زنده که کنار هر ادعا لینک منبع معتبر ارائه می‌دهد و ریسک توهم را در بررسی استانداردها و بازار به حداقل می‌رساند.',
    descEn: 'Live AI research engine that cites verifiable web sources inline, drastically reducing hallucination in standards & market research.',
    modelsFa: 'Sonar · Deep Research',
    modelsEn: 'Sonar · Deep Research',
    accentHex: '#20808D',
    bgTintClass: 'bg-[#20808D]/10 border-[#20808D]/25 text-[#20808D]'
  },
  {
    id: 'grok',
    name: 'Grok',
    company: 'xAI',
    url: 'https://grok.com',
    domainLabel: 'grok.com',
    badgeFa: 'رصد زنده و DeepSearch',
    badgeEn: 'Real-Time & DeepSearch',
    descFa: 'دسترسی آنی به اخبار و نبض لحظه‌ای پلتفرم X، مجهز به حالت استدلال عمیق (Think) و جستجوی چندمنبعی برای رصد سریع رقبا و بازار.',
    descEn: 'Real-time intelligence paired with Think reasoning mode and multi-source DeepSearch for rapid market & news tracking.',
    modelsFa: 'Grok 3 · DeepSearch · Think',
    modelsEn: 'Grok 3 · DeepSearch · Think',
    accentHex: '#475569',
    bgTintClass: 'bg-slate-500/10 border-slate-500/25 text-slate-700 dark:text-slate-300'
  },
  {
    id: 'mistral',
    name: 'Le Chat (Mistral)',
    company: 'Mistral AI',
    url: 'https://chat.mistral.ai',
    domainLabel: 'chat.mistral.ai',
    badgeFa: 'سرعت بالا و اروپایی',
    badgeEn: 'European Speed & Privacy',
    descFa: 'پرچم‌دار هوش مصنوعی اروپا با سرعت پاسخ‌گویی استثنایی (Flash Answers)، کدنویسی دقیق، تحلیل سند و رعایت سخت‌گیرانه حریم خصوصی GDPR.',
    descEn: 'Leading European LLM lab known for ultra-fast Flash Answers, strong coding/OCR, and strict enterprise data privacy.',
    modelsFa: 'Mistral Large · Codestral · Pixtral',
    modelsEn: 'Mistral Large · Codestral · Pixtral',
    accentHex: '#FA520F',
    bgTintClass: 'bg-[#FA520F]/10 border-[#FA520F]/25 text-[#FA520F]'
  },
  {
    id: 'meta_llama',
    name: 'Meta AI (Llama)',
    company: 'Meta',
    url: 'https://www.meta.ai',
    domainLabel: 'meta.ai',
    badgeFa: 'استاندارد استقرار داخلی',
    badgeEn: 'Open-Source Standard',
    descFa: 'محبوب‌ترین استاندارد مدل‌های متن‌باز جهان؛ پایه اصلی بسیاری از استقرارهای خصوصی و آفلاین هوش مصنوعی روی سرورهای داخلی سازمان‌ها (On-Premise).',
    descEn: 'The global open-weight benchmark powering private, air-gapped, and on-premise enterprise AI deployments.',
    modelsFa: 'Llama 4 · Llama 3.3',
    modelsEn: 'Llama 4 · Llama 3.3',
    accentHex: '#0668E1',
    bgTintClass: 'bg-[#0668E1]/10 border-[#0668E1]/25 text-[#0668E1]'
  }
];

const renderOtherLlmLogo = (id: OtherLlmPlatform['id']) => {
  switch (id) {
    case 'deepseek':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" aria-label="DeepSeek">
          <path
            fill="#4D6BFE"
            d="M19.8 11.4c-1.1-2.8-3.8-4.6-6.9-4.6-2.4 0-4.6 1.1-6 3-.7-.4-1.5-.6-2.4-.5-1.4.2-2.5 1.3-2.5 2.7 0 .8.4 1.5 1 2-.1.5-.1 1-.1 1.5 0 3.1 2.9 5.5 7.4 5.5 5 0 9.6-3.1 10.6-7.6.2-.7-.4-1.5-1.1-2zm-5.2 2.4a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4z"
          />
          <path
            fill="#93A8FF"
            d="M12.3 5.5c.8-1.4 2.3-2.3 3.9-2.4-.5 1.3-.4 2.7.2 3.8-1.3-.7-2.7-1.2-4.1-1.4z"
          />
        </svg>
      );
    case 'qwen':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" aria-label="Qwen">
          <defs>
            <linearGradient id="qwenGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#615CED" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>
          </defs>
          <path
            fill="url(#qwenGrad)"
            d="M12 2.2 14.9 7l5.5 1-3.9 4 .9 5.5-5.4-2.6L6.6 17.5l.9-5.5L3.6 8 9.1 7 12 2.2z"
          />
          <circle cx="12" cy="11.2" r="2.6" fill="#ffffff" />
          <path d="M13.6 13l3.6 3.8" stroke="#615CED" strokeWidth="2.1" strokeLinecap="round" />
        </svg>
      );
    case 'perplexity':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" aria-label="Perplexity">
          <g fill="none" stroke="#20808D" strokeWidth="1.9" strokeLinejoin="round" strokeLinecap="round">
            <path d="M12 2.5v19M4.5 7l7.5 4.8L19.5 7M4.5 17l7.5-4.8 7.5 4.8" />
            <rect x="6" y="4.5" width="12" height="15" rx="1.5" />
          </g>
        </svg>
      );
    case 'grok':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#111827] dark:text-[#f1f5f9]" aria-label="Grok">
          <circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" strokeWidth="2.2" />
          <path d="M5.5 18.5 18.8 5.2" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case 'mistral':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" aria-label="Mistral AI">
          <rect x="3" y="4" width="3.6" height="3.2" fill="#FFD700" />
          <rect x="17.4" y="4" width="3.6" height="3.2" fill="#FFD700" />
          <rect x="3" y="7.8" width="7.2" height="3.2" fill="#FFAF00" />
          <rect x="13.8" y="7.8" width="7.2" height="3.2" fill="#FFAF00" />
          <rect x="3" y="11.6" width="18" height="3.2" fill="#FF8205" />
          <rect x="3" y="15.4" width="3.6" height="4.2" fill="#FA520F" />
          <rect x="10.2" y="15.4" width="3.6" height="4.2" fill="#FA520F" />
          <rect x="17.4" y="15.4" width="3.6" height="4.2" fill="#FA520F" />
        </svg>
      );
    case 'meta_llama':
    default:
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" aria-label="Meta AI">
          <path
            fill="none"
            stroke="#0668E1"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.2 14.5c0-4 2.4-7.2 4.9-7.2 1.9 0 3.1 1.7 3.9 3.6.8-1.9 2-3.6 3.9-3.6 2.5 0 4.9 3.2 4.9 7.2 0 2.5-1.3 4.2-3.2 4.2-1.9 0-3.3-1.8-5.6-6.2-2.3 4.4-3.7 6.2-5.6 6.2-1.9 0-3.2-1.7-3.2-4.2z"
          />
        </svg>
      );
  }
};

export const Page0LlmFundamentals: React.FC<Page0Props> = ({
  lang,
  content,
  onChangeContent,
  onGoToPage1,
  onOpenQuiz,
  industryTrack = 'CIVIL_INFRA',
  disciplineId,
  isAdmin = false
}) => {
  const effectiveDiscipline: DisciplineId =
    disciplineId ||
    (industryTrack === 'ENERGY_PETRO'
      ? 'petro_process_safety'
      : industryTrack === 'GENERAL_EVERYDAY'
      ? 'general_household_finance'
      : industryTrack === 'PAYA_SAMAN_PARS'
      ? 'paya_portfolio_pmo'
      : 'civil_tbm_tunnel');

  const trackDatasets = getDatasetsForTrack(industryTrack);
  const trackContracts = getContractsForTrack(industryTrack);
  const sessionCurriculum = getSessionCurriculumForTrack(industryTrack);

  const discMeta = getDisciplineMetadata(effectiveDiscipline);
  const disciplinePromptPair = getDisciplinePromptShowcase(effectiveDiscipline);
  const [activeSessionId, setActiveSessionId] = useState<'s1' | 's2' | 's3' | 's4' | 's5'>('s1');
  const [activeTab, setActiveTab] = useState<
    | null
    | 'all'
    | 's1_demo'
    | 's1_drive'
    | 's1_markdown'
    | 's1_github'
    | 'prompt_definition'
    | 'prompting'
    | 'tools'
    | 'prompts_library'
    | 'advanced_features'
    | 'engineering_dashboards'
    | 'notebooklm'
    | 'contracts_and_gems'
    | 'skills_lab'
    | 'mcp_lab'
    | 'connectors'
    | 'safety'
    | 'obsidian_brain'
    | 's5_orchestration'
    | 'masterclass'
    | 's5_vibecoding'
  >('s1_demo');
  const [isSandboxOpen, setIsSandboxOpen] = useState<boolean>(false);
  const [completedSessions, setCompletedSessions] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('cpmai_page0_completed_sessions_v1');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleSessionCompletion = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdmin) return;
    playTactileSound('success');
    setCompletedSessions((prev) => {
      const next = { ...prev, [sessionId]: !prev[sessionId] };
      try {
        localStorage.setItem('cpmai_page0_completed_sessions_v1', JSON.stringify(next));
      } catch {
        // ignore storage error
      }
      return next;
    });
  };
  const [s1ProjectorDeck, setS1ProjectorDeck] = useState<
    null | 's1_demo' | 's1_drive' | 's1_markdown' | 's1_github' | 's5_capstone'
  >(null);
  const [s1SlideIndex, setS1SlideIndex] = useState<number>(0);

  const openS1Projector = (
    deck: 's1_demo' | 's1_drive' | 's1_markdown' | 's1_github' | 's5_capstone',
    startIndex = 0
  ) => {
    playTactileSound('thock');
    setS1SlideIndex(startIndex);
    setS1ProjectorDeck(deck);
  };

  const downloadTextFile = (fileName: string, textContent: string, mime = 'text/plain;charset=utf-8;') => {
    playTactileSound('success');
    const blob = new Blob([textContent], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => isTactileSoundEnabled());
  const [isQuickDrawerOpen, setIsQuickDrawerOpen] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sandboxCopied, setSandboxCopied] = useState(false);
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>('metro_station_tbm');
  const [csvCopied, setCsvCopied] = useState(false);
  const [promptWithDataCopiedId, setPromptWithDataCopiedId] = useState<string | null>(null);
  const [selectedContractId, setSelectedContractId] = useState<string>('metro_tunnel_contract');
  const [contractCopied, setContractCopied] = useState(false);
  const [instructionCopiedId, setInstructionCopiedId] = useState<string | null>(null);

  const navPillsRef = useRef<HTMLDivElement | null>(null);

  const TRACK_METAPHORS = {
    CIVIL_INFRA: {
      trackLabelFa: 'راه و ابنیه (مترو و عمرانی)',
      driveFa: 'Drive: میز مشترک کارگاه و گزارش‌های روزانه',
      githubFa: 'GitHub: دفتر فنی و سیستم کنترل مدارک (DCC)',
      skillFa: 'Skill: دستورالعمل اجرایی کارگاهی (WI)',
      mcpFa: 'MCP: پایپ‌لاین اتصال داده‌های کارگاه به مغز AI'
    },
    ENERGY_PETRO: {
      trackLabelFa: 'نفت، گاز و پتروشیمی (EPC)',
      driveFa: 'Drive: میز کار واحد و اکسل‌های MTO/MDR',
      githubFa: 'GitHub: آرشیو فنی و کنترل ریویژن مدارک (DCC)',
      skillFa: 'Skill: روش اجرایی استاندارد پالایشگاه (SOP / WI)',
      mcpFa: 'MCP: پایپ‌لاین انتقال خوراک داده (Data Pipeline) به واحد AI'
    },
    GENERAL_EVERYDAY: {
      trackLabelFa: 'روزمره، خانواده و کسب‌وکار فردی',
      driveFa: 'Drive: پوشه مشترک اسناد و بودجه خانواده',
      githubFa: 'GitHub: آلبوم نسخه‌دار اسناد و قالب‌های دائمی',
      skillFa: 'Skill: دستور پخت و چک‌لیست استاندارد روزانه',
      mcpFa: 'MCP: پایپ‌لاین ارتباطی هوشمند بین AI، فایل‌ها و تقویم'
    },
    PAYA_SAMAN_PARS: {
      trackLabelFa: 'هلدینگ پایا سامان پارس (دو بال و ۶۳ پروژه)',
      driveFa: 'Drive: پوشه مشترک گزارش‌های ۱۴ شرکت تابعه و شهر صنعتی کاوه',
      githubFa: 'GitHub: مخزن DCC هلدینگ و مهارت‌های ممیزی EPC+F/BOT',
      skillFa: 'Skill: دستورالعمل استاندارد کنترل پورتفوی دو بال و تکمیل پورتال',
      mcpFa: 'MCP: پایپ‌لاین اتصال مستقیم گزارش‌های ۱۴ شرکت به کلود و گیت‌هاب'
    }
  } as const;

  const activeTrackMetaphor =
    TRACK_METAPHORS[industryTrack || 'CIVIL_INFRA'] || TRACK_METAPHORS.CIVIL_INFRA;

  const activeRctoPillars =
    TRACK_RCTO_PILLARS[industryTrack || 'CIVIL_INFRA'] || TRACK_RCTO_PILLARS.CIVIL_INFRA;

  type ModuleTabId = Exclude<typeof activeTab, null | 'all'>;
  interface SessionModuleMeta {
    id: ModuleTabId;
    sessionId: 's1' | 's2' | 's3' | 's4' | 's5';
    num: string;
    titleFa: string;
    subFa: string;
    titleEn: string;
    subEn: string;
  }
  interface CurriculumSessionGroup {
    id: 's1' | 's2' | 's3' | 's4' | 's5';
    numFa: string;
    hoursFa: string;
    titleFa: string;
    titleEn: string;
    metaphorFa: string;
    modules: SessionModuleMeta[];
  }

  const FIVE_SESSIONS: CurriculumSessionGroup[] = [
    {
      id: 's1' as const,
      numFa: 'جلسه ۱',
      hoursFa: '۴ ساعت',
      titleFa: 'زیرساخت داده: Drive، Markdown و GitHub',
      titleEn: 'Session 1: Data Infrastructure (Drive, Markdown & GitHub)',
      metaphorFa: `${activeTrackMetaphor.driveFa} · ${activeTrackMetaphor.githubFa}`,
      modules: [
        {
          id: 's1_demo' as const,
          sessionId: 's1' as const,
          num: '۱-۱',
          titleFa: 'دموی ۱۵ دقیقه‌ای خروجی نهایی دوره',
          subFa: 'چشم‌انداز خط تولید اتوماتیک جلسه ۵',
          titleEn: '15-Min End-to-End Demo',
          subEn: 'Vision of Session 5 Pipeline'
        },
        {
          id: 's1_drive' as const,
          sessionId: 's1' as const,
          num: '۱-۲',
          titleFa: 'گوگل درایو و استانداردسازی جداول',
          subFa: 'حذف سلول‌های Merge و ساختار ماشین‌خوان',
          titleEn: 'Google Drive & Clean Tables',
          subEn: 'Machine-Readable Docs & Sheets'
        },
        {
          id: 's1_markdown' as const,
          sessionId: 's1' as const,
          num: '۱-۳',
          titleFa: 'زبان Markdown؛ زبان مشترک مهندس و AI',
          subFa: 'چرا فایل Word پر از نویز است؟ (.md)',
          titleEn: 'Markdown (.md) Standard',
          subEn: 'Zero-Noise Format for LLMs & Git'
        },
        {
          id: 's1_github' as const,
          sessionId: 's1' as const,
          num: '۱-۴',
          titleFa: 'گیت‌هاب به زبان دفتر فنی و DCC',
          subFa: 'Repo · Commit (Rev) · Branch & PR',
          titleEn: 'GitHub as Engineering DCC',
          subEn: 'Repo, Commit, Branch & Pull Request'
        }
      ]
    },
    {
      id: 's2' as const,
      numFa: 'جلسه ۲',
      hoursFa: '۴ ساعت',
      titleFa: 'کالبدشکافی LLMها، پرامپت‌نویسی و میز کار',
      titleEn: 'Session 2: LLMs, RCTO Prompting, Gems, Projects & Artifacts',
      metaphorFa: 'استخدام «مشاوران مقیم» (Gems/Projects) و ساخت «ابزارهای محاسباتی و داشبورد» (Artifacts/Canvas)',
      modules: [
        {
          id: 'prompt_definition' as const,
          sessionId: 's2' as const,
          num: '۲-۱',
          titleFa: 'پرامپت چیست؟ (تعریف و آناتومی)',
          subFa: 'ورودی دقیق ← خروجی دقیق · Zero-Shot تا مهندسی پرامپت',
          titleEn: 'What is a Prompt? (Anatomy)',
          subEn: 'Instruction, Context & Constraints'
        },
        {
          id: 'prompting' as const,
          sessionId: 's2' as const,
          num: '۲-۲',
          titleFa: 'فرمول طلایی مهندسی پرامپت (RCTO)',
          subFa: 'چارچوب ۴ مرحله‌ای Role, Context, Task, Output',
          titleEn: 'RCTO Prompt Framework',
          subEn: 'Role, Context, Task, Output'
        },
        {
          id: 'tools' as const,
          sessionId: 's2' as const,
          num: '۲-۳',
          titleFa: 'غول‌های هوش مصنوعی و LLMهای مطرح',
          subFa: 'ChatGPT · Claude · Gemini · DeepSeek · Qwen و ...',
          titleEn: 'AI Giants & Leading LLMs',
          subEn: 'ChatGPT, Claude, Gemini, DeepSeek, Qwen & more'
        },
        {
          id: 'prompts_library' as const,
          sessionId: 's2' as const,
          num: '۲-۴',
          titleFa: 'کتابخانه پرامپت‌های آماده دیسیپلین‌ها',
          subFa: 'پرامپت‌های تخصصی و روزمره قابل کپی',
          titleEn: 'Ready Prompt Library',
          subEn: 'Copyable Domain Prompts'
        },
        {
          id: 'advanced_features' as const,
          sessionId: 's2' as const,
          num: '۲-۵',
          titleFa: 'میز کار هوشمند: Gems و Projects',
          subFa: 'ساخت مشاور مقیم با دانش پایه اختصاصی',
          titleEn: 'Gems & Claude Projects',
          subEn: 'Custom Knowledge Workspaces'
        },
        {
          id: 'engineering_dashboards' as const,
          sessionId: 's2' as const,
          num: '۲-۶',
          titleFa: 'ساخت داشبورد و ابزار در Artifacts و Canvas',
          subFa: 'تولید نرم‌افزار و نمودار بدون کدنویسی',
          titleEn: 'Artifacts & Canvas Lab',
          subEn: 'Interactive Dashboards & Calculators'
        }
      ]
    },
    {
      id: 's3' as const,
      numFa: 'جلسه ۳',
      hoursFa: '۴ ساعت',
      titleFa: 'سنتز دانش و معماری مهارت‌ها (Skills)',
      titleEn: 'Session 3: NotebookLM, Contract Audit & AI Skills (SKILL.md)',
      metaphorFa: `${activeTrackMetaphor.skillFa} · اتصال دانش پایه به دستورالعمل گام‌به‌گام و مخزن GitHub`,
      modules: [
        {
          id: 'notebooklm' as const,
          sessionId: 's3' as const,
          num: '۳-۱',
          titleFa: 'کارگاه جامع Google NotebookLM',
          subFa: 'تحلیل اسناد سنگین، نقشه ذهنی و پادکست',
          titleEn: 'Google NotebookLM Lab',
          subEn: 'Zero-Hallucination Document Synthesis'
        },
        {
          id: 'contracts_and_gems' as const,
          sessionId: 's3' as const,
          num: '۳-۲',
          titleFa: 'کارگاه ممیزی قراردادها و ادعاها',
          subFa: 'نشریه ۴۳۱۱، فیدیک و سیستم‌های خبره',
          titleEn: 'Contracts & Claims Lab',
          subEn: 'FIDIC & EPC Clauses Audit'
        },
        {
          id: 'skills_lab' as const,
          sessionId: 's3' as const,
          num: '۳-۳',
          titleFa: 'معماری AI Skills (استاندارد SKILL.md)',
          subFa: 'ساخت مهارت دائمی در Claude و اتصال در Gemini',
          titleEn: 'AI Skills (SKILL.md) Lab',
          subEn: 'SOPs, Trap Testing & Live Skill Builder'
        }
      ]
    },
    {
      id: 's4' as const,
      numFa: 'جلسه ۴',
      hoursFa: '۴ ساعت',
      titleFa: 'انقلاب MCP، امنیت و مغز دوم Obsidian',
      titleEn: 'Session 4: MCP Piping, Connectors, Security & Obsidian Second Brain',
      metaphorFa: `${activeTrackMetaphor.mcpFa} · پایان دوران کپی-پیست دستی`,
      modules: [
        {
          id: 'mcp_lab' as const,
          sessionId: 's4' as const,
          num: '۴-۱',
          titleFa: 'پروتکل MCP؛ پایپ‌لاین اتصال داده به هارد و گیت‌هاب',
          subFa: 'Filesystem · GitHub MCP · پیش‌نیازهای نصب',
          titleEn: 'MCP Protocol & Servers',
          subEn: 'Filesystem, GitHub & SQLite MCP'
        },
        {
          id: 'connectors' as const,
          sessionId: 's4' as const,
          num: '۴-۲',
          titleFa: 'کانکتورهای گوگل، Slack و Workspace',
          subFa: 'اتصال زنده به ایمیل، درایو و تقویم',
          titleEn: 'Workspace & Tool Connectors',
          subEn: 'Google Drive, Gmail, Calendar & Slack'
        },
        {
          id: 'safety' as const,
          sessionId: 's4' as const,
          num: '۴-۳',
          titleFa: 'خطوط قرمز امنیتی، حفاظت از توکن و توهم',
          subFa: 'امنیت PAT گیت‌هاب، دسترسی پوشه و Human-in-the-Loop',
          titleEn: 'Security & Token Guardrails',
          subEn: 'PAT Safety, Least Privilege & Verification'
        },
        {
          id: 'obsidian_brain' as const,
          sessionId: 's4' as const,
          num: '۴-۴',
          titleFa: 'مغز دوم Obsidian + اتصال Claude و Hermes',
          subFa: 'حافظه دائمی رایگان روی هارد شخصی',
          titleEn: 'Obsidian Second Brain',
          subEn: '13-Chapter Vault + Claude & Hermes Course'
        }
      ]
    },
    {
      id: 's5' as const,
      numFa: 'جلسه ۵',
      hoursFa: '۴ ساعت',
      titleFa: 'ارکستراسیون کامل و پل ورود به Vibe Coding',
      titleEn: 'Session 5: Full Orchestration, Masterclass & Bridge to Vibe Coding',
      metaphorFa: 'خط تولید تمام‌اتوماتیک: خواندن داده با MCP ← پردازش با Skill ← ساخت داشبورد Artifact ← ثبت در GitHub',
      modules: [
        {
          id: 's5_orchestration' as const,
          sessionId: 's5' as const,
          num: '۵-۱',
          titleFa: 'پروژه جامع End-to-End (ترکیب تمام ابزارها)',
          subFa: 'Drive + MCP + Skill + Artifact + GitHub Pages',
          titleEn: 'End-to-End Capstone Project',
          subEn: 'Full Automated Engineering Workflow'
        },
        {
          id: 'masterclass' as const,
          sessionId: 's5' as const,
          num: '۵-۲',
          titleFa: 'مسترکلاس مهندسی پیشرفته با LLM',
          subFa: 'تکنیک‌های پیشرفته استدلال و تحلیل فنی',
          titleEn: 'Advanced Engineering Masterclass',
          subEn: 'Deep Technical Reasoning Workflows'
        },
        {
          id: 's5_vibecoding' as const,
          sessionId: 's5' as const,
          num: '۵-۳',
          titleFa: 'پل ورود به Vibe Coding؛ فردا چه می‌کنیم؟',
          subFa: 'انتقال مغز AI، اسکیل‌ها و MCP به محیط IDE حرفه‌ای',
          titleEn: 'Bridge to Vibe Coding',
          subEn: 'From Chat Artifacts to Full-Stack Apps in IDE'
        }
      ]
    }
  ];

  const MODULE_NAV_ITEMS = FIVE_SESSIONS.flatMap((s) => s.modules);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    setTactileSoundEnabled(next);
    if (next) {
      playTactileSound('thock');
    }
  };

  const handleTabClick = (
    tab: typeof activeTab,
    e?: React.MouseEvent<HTMLButtonElement>,
    scrollToTop = false
  ) => {
    playTactileSound('thock');
    setActiveTab(tab);
    if (tab && tab !== 'all') {
      const found = MODULE_NAV_ITEMS.find((m) => m.id === tab);
      if (found) setActiveSessionId(found.sessionId);
    }
    setIsQuickDrawerOpen(false);
    if (scrollToTop && navPillsRef.current) {
      setTimeout(() => {
        navPillsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 40);
    }
  };

  const currentModuleIdx = MODULE_NAV_ITEMS.findIndex((m) => m.id === activeTab);
  const currentModuleMeta = currentModuleIdx >= 0 ? MODULE_NAV_ITEMS[currentModuleIdx] : null;
  const activeSessionObj = FIVE_SESSIONS.find((s) => s.id === activeSessionId) || FIVE_SESSIONS[0];

  const handlePrevModule = () => {
    if (currentModuleIdx <= 0) {
      handleTabClick(MODULE_NAV_ITEMS[MODULE_NAV_ITEMS.length - 1].id, undefined, true);
    } else {
      handleTabClick(MODULE_NAV_ITEMS[currentModuleIdx - 1].id, undefined, true);
    }
  };

  const handleNextModule = () => {
    if (currentModuleIdx < 0 || currentModuleIdx >= MODULE_NAV_ITEMS.length - 1) {
      handleTabClick(MODULE_NAV_ITEMS[0].id, undefined, true);
    } else {
      handleTabClick(MODULE_NAV_ITEMS[currentModuleIdx + 1].id, undefined, true);
    }
  };

  React.useEffect(() => {
    const nextDs = getDatasetsForTrack(industryTrack);
    const nextCt = getContractsForTrack(industryTrack);
    if (industryTrack === 'PAYA_SAMAN_PARS') {
      setSelectedDatasetId('paya_holding_portfolio');
      setSelectedContractId('paya_epcf_consortium_contract');
    } else if (industryTrack === 'ENERGY_PETRO') {
      setSelectedDatasetId(
        nextDs.find((d) => d.id === 'oil_gas_pipeline_epc')?.id || nextDs[0]?.id || 'metro_station_tbm'
      );
      setSelectedContractId(
        nextCt.find((c) => c.id === 'oil_gas_epc_contract')?.id || nextCt[0]?.id || 'metro_tunnel_contract'
      );
    } else {
      setSelectedDatasetId(nextDs[0]?.id || 'metro_station_tbm');
      setSelectedContractId(nextCt[0]?.id || 'metro_tunnel_contract');
    }
  }, [industryTrack]);

  const copyToClipboard = (text: string, id: string) => {
    playTactileSound('success');
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const copySandboxToClipboard = () => {
    if (!content) return;
    playTactileSound('success');
    navigator.clipboard.writeText(content);
    setSandboxCopied(true);
    setTimeout(() => setSandboxCopied(false), 2500);
  };

  const loadPromptToSandbox = (promptText: string) => {
    playTactileSound('switch');
    onChangeContent(promptText);
    setIsSandboxOpen(true);
    setTimeout(() => {
      const sandboxEl = document.getElementById('prompt-sandbox');
      if (sandboxEl) {
        sandboxEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  const openCompanionWindow = (url: string, targetName = 'ai_companion') => {
    playTactileSound('switch');
    if (typeof window === 'undefined') return;
    const width = Math.min(540, Math.round(window.screen.availWidth * 0.42));
    const height = Math.round(window.screen.availHeight * 0.92);
    const left = Math.max(0, window.screen.availWidth - width - 20);
    const top = 30;
    const features = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=no,toolbar=no,menubar=no,location=no`;
    const popup = window.open(url, targetName, features);
    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      popup.focus();
    }
  };

  const PROMPT_LIBRARY: PromptItem[] = [
    {
      id: `discipline_custom_${discMeta.id}`,
      titleFa: `پرامپت تخصصی دیسیپلین: ${discMeta.titleFa}`,
      titleEn: `Discipline Engineering Prompt: ${discMeta.titleEn}`,
      categoryFa:
        discMeta.trackId === 'CIVIL_INFRA'
          ? 'مگاپروژه‌های راه و ابنیه'
          : discMeta.trackId === 'ENERGY_PETRO'
          ? 'نفت، گاز و پتروشیمی'
          : discMeta.trackId === 'PAYA_SAMAN_PARS'
          ? 'هلدینگ پایا سامان پارس'
          : 'سبک زندگی و خانواده',
      categoryEn:
        discMeta.trackId === 'CIVIL_INFRA'
          ? 'Civil & Infrastructure'
          : discMeta.trackId === 'ENERGY_PETRO'
          ? 'Oil & Gas EPCC'
          : discMeta.trackId === 'PAYA_SAMAN_PARS'
          ? 'Paya Saman Pars Holding'
          : 'Lifestyle & Everyday AI',
      descriptionFa: `پرامپت مهندسی‌شده RCTO با استانداردهای ${discMeta.governingStandardsFa[0]} و تحلیل شاخص‌های ${discMeta.performanceMetricsFa.slice(0, 2).join(' و ')}.`,
      descriptionEn: `Engineered RCTO prompt customized for ${discMeta.governingStandardsEn[0]} and ${discMeta.performanceMetricsEn.slice(0, 2).join(', ')}.`,
      promptFa: disciplinePromptPair.engineeredPromptFa,
      promptEn: disciplinePromptPair.engineeredPromptEn,
      targetTools: ['Claude 3.5 / 3.7', 'ChatGPT-4o', 'Gemini Pro']
    },
    {
      id: 'meeting_summary',
      titleFa: 'خلاصه‌سازی جلسه و استخراج اکشن‌آیتم‌ها',
      titleEn: 'Executive Meeting Summary & Action Items',
      categoryFa: 'مدیریت و عملیات',
      categoryEn: 'Management & Ops',
      descriptionFa: 'تبدیل یادداشت‌های نامنظم جلسه به یک گزارش حرفه‌ای با وظایف، مسئولان و ضرب‌الاجل‌ها.',
      descriptionEn: 'Transform raw meeting transcripts/notes into structured summaries with owners and deadlines.',
      promptFa: `تو یک مدیر دفتر ارشد و هماهنگ‌کننده اجرایی بسیار منظم هستی.
من در ادامه متن یا یادداشت‌های خام جلسه‌ای درباره [موضوع جلسه مثلاً: بازبینی اسپرینت شماره ۴] را قرار می‌دهم.

وظیفه تو این است که خروجی را در قالب زیر به زبان فارسی روان و حرفه‌ای استخراج کنی:
۱. خلاصه اجرایی جلسه در حداکثر ۳ بولت‌پوینت کلیدی
۲. تصمیمات قطعی اتخاذ شده (Decisions Made)
۳. جدول اکشن‌آیتم‌ها (Action Items Table) شامل ۴ ستون: [عنوان اقدام | فرد مسئول | ضرب‌الاجل زمانی | پیش‌نیازها]
۴. موضوعات بلاتکلیف یا ریسک‌های نیازمند پیگیری در جلسه بعد

متن یادداشت‌های جلسه:
[متن یا صورت‌جلسه خام خود را اینجا جای‌گذاری کنید]`,
      promptEn: `You are an elite Chief of Staff and Executive Coordinator.
Below are the raw notes from a meeting regarding [Meeting Topic, e.g., Sprint 4 Review].

Please produce a crisp executive brief with the following structure:
1. Executive Summary in 3 concise bullet points.
2. Definite Decisions Made.
3. Action Items Table with 4 columns: [Action Item | Owner | Due Date | Dependencies].
4. Open Issues / Risks requiring follow-up in the next sync.

Meeting Notes:
[Paste raw notes or transcript here]`,
      targetTools: ['ChatGPT', 'Claude', 'Gemini']
    },
    {
      id: 'business_email',
      titleFa: 'تدوین ایمیل رسمی سازمانی و پیگیری تعهدات',
      titleEn: 'Executive Business Follow-up Email',
      categoryFa: 'ارتباطات حرفه‌ای',
      categoryEn: 'Professional Comms',
      descriptionFa: 'نگارش ایمیل با لحن محترمانه، قاطع و سازمانی برای پیگیری قرارداد یا تصمیم مدیران بدون بی‌ادبی.',
      descriptionEn: 'Draft polished, respectful yet firm executive emails to follow up on contracts or deliverables.',
      promptFa: `تو متخصص ارتباطات تجاری و مکاتبات دیپلماتیک سازمانی هستی.
شرایط: دیروز جلسه‌ای با [نام مخاطب / مشتری / مدیر] درباره [موضوع توافق مثلاً: تایید نهایی بودجه خرید نرم‌افزار] داشتیم و قرار بود تا امروز عصر نظرشان را اعلام کنند. هنوز پاسخی دریافت نشده است.

وظیفه:
یک ایمیل پیگیری در حداکثر ۲ تا ۳ پاراگراف کوتاه با مشخصات زیر بنویس:
- لحن: کاملاً محترمانه، حرفه‌ای، محکم و تشکرآمیز (بدون چاپلوسی یا لحن تهاجمی).
- یادآوری ارزش: اشاره کوتاه به اینکه تایید به موقع، به حفظ زمان‌بندی پروژه تا [تاریخ هدف] کمک می‌کند.
- دعوت به اقدام (CTA) مشخص: تعیین زمان برای یک مکالمه تلفنی ۱۰ دقیقه‌ای در صورت وجود هرگونه ابهام.
- ارائه ۲ گزینه برای خط موضوع (Subject Line) جذاب و تمیز.`,
      promptEn: `You are an expert in corporate communications and executive negotiation.
Context: Yesterday we met with [Client Name / Manager] regarding [Topic, e.g., Final Software Budget Approval]. They intended to confirm by today, but we have not yet heard back.

Task:
Draft a concise 2-3 paragraph follow-up email:
- Tone: Highly courteous, respectful, firm, and value-oriented (not passive-aggressive).
- Value proposition: Gently note that confirming this week ensures our launch milestone on [Target Date].
- Clear Call to Action (CTA): Propose a brief 10-minute touchpoint if anything needs clarifying.
- Provide 2 compelling Subject Line variations.`,
      targetTools: ['ChatGPT', 'Claude', 'Gemini']
    },
    {
      id: 'project_wbs',
      titleFa: 'شکست ساختار کار (WBS) و طراحی اسپرینت چابک',
      titleEn: 'Agile WBS & Sprint Breakdown',
      categoryFa: 'مدیریت پروژه چابک',
      categoryEn: 'Agile Project Mgmt',
      descriptionFa: 'تجزیه یک هدف بزرگ کسب‌وکاری به بسته‌های کاری شفاف، معیارهای پذیرش (DoD) و اسپرینت‌های ۲ هفته‌ای.',
      descriptionEn: 'Break down a major business initiative into clear work packages, Definition of Done, and 2-week sprints.',
      promptFa: `تو یک اسکرام‌مستر و مشاور مدیریت پروژه چابک با گواهینامه PMP و CPMAI هستی.
پروژه ما: [شرح کوتاه پروژه مثلاً: راه‌اندازی ربات پاسخگوی هوشمند سوالات پرسنلی منابع انسانی].
مدت زمان کل: [مثلاً ۶ هفته در قالب ۳ اسپرینت ۲ هفته‌ای].

وظیفه:
۱. تجزیه ساختار کار (WBS) در ۳ سطح (فازها، بسته‌های کاری، و وظایف عملیاتی).
۲. برای هر اسپرینت، هدف اسپرینت (Sprint Goal)، خروجی کلیدی (Deliverable) و داستان‌های کاربر نمونه (User Stories با فرمت As a... I want... So that...) ارائه بده.
۳. تعریف انجام کار (Definition of Done - DoD) را به صورت شفاف مشخص کن.
۴. بزرگ‌ترین وابستگی‌ها (Dependencies) میان تیم فنی و کسب‌وکار را هایلایت کن.
پاسخ را در جداول منظم و با دسته‌بندی منطقی ارائه بده.`,
      promptEn: `You are an Agile Project Manager and CPMAI certified advisor.
Project: [Brief project description, e.g., Internal HR Policy AI Chatbot for 5,000 employees].
Timeline: [e.g., 6 weeks split into 3 two-week sprints].

Task:
1. Generate a 3-tier Work Breakdown Structure (WBS: Phases, Work Packages, Tasks).
2. For each sprint, outline the Sprint Goal, Key Deliverable, and 2 sample User Stories in standard agile format (As a... I want... So that...).
3. Specify the Definition of Done (DoD).
4. Highlight the top 3 cross-functional dependencies between technical engineering and business stakeholders.
Format using clean markdown tables.`,
      targetTools: ['Claude', 'ChatGPT']
    },
    {
      id: 'devils_advocate',
      titleFa: 'وکیل مدافع شیطان: نقد بی‌رحمانه و مدیریت ریسک',
      titleEn: "Devil's Advocate & Critical Decision Stress-Testing",
      categoryFa: 'استراتژی و تصمیم‌گیری',
      categoryEn: 'Strategy & Risks',
      descriptionFa: 'آزمون استرس تصمیمات؛ هوش مصنوعی نقایص پنهان، خطاهای شناختی و آسیب‌پذیری‌های برنامه را آشکار می‌کند.',
      descriptionEn: 'Stress-test strategic assumptions; AI pinpoints blind spots, cognitive biases, and failure modes.',
      promptFa: `از این لحظه نقش "وکیل مدافع شیطان" (Devil's Advocate) و منتقد سخت‌گیر استراتژیک را بازی کن. هدف تو زیر سوال بردن خوش‌بینی‌های افراطی و آشکار کردن نقاط کور تصمیم ماست.

ایده یا تصمیم پیشنهادی ما:
[تصمیم خود را بنویسید، مثلاً: می‌خواهیم بخش پشتیبانی مشتریان را کاملاً به هوش مصنوعی بسپاریم و تیم انسانی را به یک نفر اپراتور ناظر تقلیل دهیم].

لطفاً:
۱. ۵ دلیل اصلی که چرا این تصمیم ممکن است با شکستی سنگین مواجه شود را فهرست کن.
۲. ۳ ریسک پنهان (عملیاتی، مالی، رضایت مشتری، یا حقوقی/امنیتی) که معمولاً نادیده گرفته می‌شوند را تشریح کن.
۳. اگر رقیب سرسخت ما این تصمیم را می‌دید، چطور از این نقطه ضعف علیه ما سوءاستفاده می‌کرد؟
۴. سه پیش‌شرط ایمنی (Guardrails) که بدون آن‌ها اجرای این تصمیم خودکشی سازمانی است را بیان کن.
صادق، صریح و بدون تعارف باش.`,
      promptEn: `Act as a ruthless Devil's Advocate and battle-tested executive risk assessor. Your goal is to shatter our confirmation bias and uncover latent operational vulnerabilities.

Our Proposed Decision:
[Insert decision, e.g., Fully replace Level 1 customer support with GenAI agents, cutting human staff by 80%].

Deliverables:
1. Top 5 brutal failure scenarios where this decision collapses.
2. 3 subtle blind spots (operational, financial, reputational, or legal) teams routinely overlook.
3. How an aggressive competitor could exploit this move against us.
4. 3 non-negotiable guardrails/mitigations required before giving a green light.
Be ruthlessly candid and analytical.`,
      targetTools: ['Claude', 'ChatGPT', 'Gemini']
    },
    {
      id: 'data_analyzer',
      titleFa: 'تحلیل داده‌ها و گزارش آماری برای تصمیم‌گیران',
      titleEn: 'Data Insights & Metric Interpretation',
      categoryFa: 'داده و هوش تجاری',
      categoryEn: 'Data & Analytics',
      descriptionFa: 'ارسال داده‌های خام، جدول اکسل یا خروجی دیتابیس برای دریافت تحلیل روندی، ناهنجاری‌ها و توصیه‌ها.',
      descriptionEn: 'Feed raw CSV/tables to extract trend shifts, statistical anomalies, and tactical business takeaways.',
      promptFa: `تو یک تحلیل‌گر ارشد کسب‌وکار و دانشمند داده هستی.
من داده‌های زیر را در اختیارت قرار می‌دهم. این داده‌ها مربوط به [شرح داده مثلاً: عملکرد فروش و تیکت‌های پشتیبانی در ۳ ماه گذشته] است.

وظایف تو:
۱. تحلیل روندهای کلیدی (Trend Analysis): چه تغییرات معناداری در داده‌ها دیده می‌شود؟
۲. کشف ناهنجاری‌ها (Outliers & Anomalies): چه نقاط غیرعادی یا نگران‌کننده‌ای وجود دارد؟
۳. فرضیه‌سازی و علت‌یابی اولیه: محتمل‌ترین دلایل وقوع این الگوها چیست؟
۴. سه توصیه عملیاتی مشخص برای بهبود شاخص‌ها در ماه آینده.
پاسخ را خلاصه، مجهز به اعداد و بدون کلی‌گویی ارائه کن.

داده‌ها:
[داده‌ها یا جدول خود را اینجا الصاق کنید]`,
      promptEn: `You are a Senior Business Intelligence and Data Science Lead.
Below is a data snapshot related to [Data description, e.g., Q3 Customer Support Tickets and Resolution times].

Your tasks:
1. Primary Trend Analysis: Highlight significant directional shifts.
2. Anomaly & Outlier Detection: Pinpoint suspicious spikes or drops.
3. Root-Cause Hypotheses: Propose 2-3 logical drivers explaining the numbers.
4. 3 actionable tactical recommendations for next month's sprint.
Keep it quantitative, concise, and focused on ROI.

Data:
[Paste table or CSV here]`,
      targetTools: ['ChatGPT', 'Claude', 'Gemini']
    },
    {
      id: 'meta_prompter',
      titleFa: 'مهندسی متقابل پرامپت: ارتقادهنده پرامپت با خودِ هوش مصنوعی',
      titleEn: 'Meta-Prompt: Prompt Engineering Coach',
      categoryFa: 'ابزار پرامپت‌نویسی',
      categoryEn: 'Prompt Mastery',
      descriptionFa: 'یک پرامپت ساده به هوش مصنوعی بدهید تا خودش آن را با تکنیک‌های پیشرفته بازنویسی و کامل کند.',
      descriptionEn: 'Feed a rough prompt to the LLM and let it engineer an optimized, high-precision version for you.',
      promptFa: `تو یک مهندس ارشد پرامپت (Lead Prompt Engineer) هستی.
من یک درخواست ساده در ذهن دارم که می‌خواهم از یک هوش مصنوعی بپرسم، اما می‌دانم که ناقص است.

درخواست ساده من این است:
"[درخواست خام خود را بنویسید، مثلاً: می‌خواهم یک استراتژی بازاریابی برای خدمات ابری بنویسم]"

وظیفه تو این است:
۱. پرامپت خام من را به یک "سوپرپرامپت" استاندارد با متدولوژی RCTO (شامل نقش مشخص، پس‌زمینه کسب‌وکار، وظایف گام‌به‌گام و محدودیت‌های خروجی) ارتقا دهی.
۲. جایگاه‌هایی که من باید اطلاعات اختصاصی سازمانم را در آن پر کنم با علامت [کروشه] مشخص کن.
۳. سه سوال هوشمندانه از من بپرس که اگر به آن‌ها جواب دهم، کیفیت پاسخ خروجی چند برابر می‌شود.`,
      promptEn: `You are an elite Prompt Engineer.
I have a rough, unoptimized idea that I want to ask an AI, but it lacks structure.

My rough prompt is:
"[Insert rough idea, e.g., Help me design a B2B SaaS onboarding sequence]"

Your task:
1. Transform my rough idea into a production-grade prompt using the RCTO framework (Role, Context, Step-by-step Task, Output format & Constraints).
2. Insert explicit [brackets] for organizational variables I should customize.
3. Ask me 3 sharp clarifying questions that, once answered, would make the output 10x more relevant.`,
      targetTools: ['ChatGPT', 'Claude', 'Gemini']
    },
    {
      id: 'contract_claims',
      titleFa: 'تحلیل تاخیرات، ادعاها (Claims) و تدوین لایحه دفاعیه (ماده ۳۰ پیمان / فیدیک)',
      titleEn: 'Contractual Claim & Delay Analysis (Clause 30 / FIDIC)',
      categoryFa: 'حقوقی و دعاوی پیمانکاری',
      categoryEn: 'Legal & Contract Claims',
      descriptionFa: 'انطباق مستندات تاخیرات با ماده ۳۰ شرایط عمومی پیمان یا فیدیک، تعیین مسئولیت تاخیر و تنظیم پیش‌نویس لایحه دفاعیه در آرتیفکت.',
      descriptionEn: 'Map delays to Clause 30/FIDIC, determine critical path liability, and generate an executive claim brief.',
      promptFa: `تو سرپرست ارشد امور قراردادها و دعاوی فنی (Claims Manager) با تسلط کامل بر شرایط عمومی پیمان (نشریه ۴۳۱۱) و قراردادهای فیدیک (FIDIC) هستی.

اطلاعات و مستندات پروژه:
- موضوع ادعا: [مثلاً تاخیر ۲ ماهه در تحویل زمین، تداخل تاسیسات معارض شهری و عدم ابلاغ نقشه‌های فونداسیون]
- مستندات و مکاتبات کارگاهی: [تاریخ تحویل موقت، شماره نامه‌های اخطار پیمانکار، صورت‌جلسات کارگاهی و گزارش‌های روزانه]

وظایف تحلیلی:
۱. انطباق حقوقی و زمانی با ماده ۳۰ شرایط عمومی پیمان (یا بند ۸.۴ فیدیک): آیا این تاخیرات در زمره تاخیرات مجاز (Excusable Delays) قرار می‌گیرند؟
۲. تحلیل مسیر بحرانی (Critical Path Impact): انحراف ایجاد شده بر زمان‌بندی کل پروژه را تخمین بزن.
۳. استخراج ماتریس تعهدات متقابل و اثبات تقصیر/قصور کارفرما در انجام تعهدات قراردادی.
۴. تدوین پیش‌نویس کامل لایحه دفاعیه و درخواست رسمی تمدید مدت پیمان خطاب به کارفرما/دستگاه نظارت با لحن اداری، قاطع، حقوقی و مستند به شماره مواد و تبصره‌های پیمان.
خروجی لایحه را بدون تعارف و در قالب یک سند اداری رسمی جهت قرارگیری در آرتیفکت تنظیم کن.`,
      promptEn: `You are a Senior Contract & Claims Specialist well-versed in FIDIC conditions and General Conditions of Contract.

Context & Case Data:
- Claim Subject: [e.g., 2-month delay in site handover, underground municipal utilities clashes, delayed IFC drawings]
- Project Evidence: [Site handover dates, contractor notice letters, daily logs, site minutes]

Analytical Tasks:
1. Legal & contractual mapping to Clause 30 (or FIDIC Sub-Clause 8.4): Classify excusable vs. non-excusable delays.
2. Critical Path Impact Analysis: Estimate the net project completion variance.
3. Extract reciprocal obligations matrix establishing owner default/delay.
4. Draft a formal, hard-hitting Extension of Time (EoT) claim submission letter referencing specific contract clauses.
Format the output as a formal executive brief suitable for a dedicated Artifact document.`,
      targetTools: ['Claude', 'Gemini', 'ChatGPT']
    },
    {
      id: 'industrial_qa_qc',
      titleFa: 'چک‌لیست عدم‌انطباق فنی و بازرسی استاندارد (مترو / پتروشیمی)',
      titleEn: 'Engineering QA/QC & Non-Conformance Matrix (ASME / API / Metro)',
      categoryFa: 'فنی و مهندسی پروژه',
      categoryEn: 'Engineering QA/QC',
      descriptionFa: 'تطبیق لاگ‌های کارگاهی با کدهای استاندارد (ASME, API, مشخصات تونل‌سازی) و تولید ماتریس رفع عدم انطباق (NCR).',
      descriptionEn: 'Cross-reference field reports against engineering codes to produce Inspection and Non-Conformance (NCR) matrices.',
      promptFa: `تو مدیر ارشد کنترل کیفیت (QA/QC Manager) و بازرس فنی ارشد در پروژه‌های بزرگ زیرساختی و صنعتی هستی.

اطلاعات گزارش کارگاهی و متریال:
- حوزه پروژه: [مثلاً اجرای لاینینگ سگمنتی تونل مترو با TBM / یا تست پایپینگ و مخازن تحت فشار پتروشیمی]
- مستندات و لاگ‌های تست: [شرح عدم انطباق مثلاً افت فشار در تست هیدروستاتیک یا ترک‌های سطحی در سگمنت بتنی شماره ۴۲]
- استانداردهای مرجع: [مثلاً ASME Sec VIII, API 1104, IPS یا مشخصات فنی نشریه مترو]

وظایف تحلیلی:
۱. تحلیل علت ریشه‌ای نقص فنی (Root Cause Analysis - RCA).
۲. تطبیق دقیق با تلرانس‌ها و بندهای مجاز در استاندارد مرجع.
۳. تدوین ماتریس گزارش عدم انطباق (NCR) شامل ستون‌های: [کد نقص | شرح عدم انطباق | شدت ریسک | اقدام اصلاحی الزامی (CAPA) | روش بازرسی مجدد | تاییدکننده نهایی].
۴. پیش‌نویس چک‌لیست بازرسی نهایی و صدور گواهی تحویل موقت در یک جدول منسجم.`,
      promptEn: `You are a Senior QA/QC and Technical Inspection Lead on major industrial/infrastructure projects.

Field Inspection Data:
- Domain: [e.g., Segmental Lining of Metro TBM Tunnel / Petrochemical Piping & Pressure Vessel Hydrotest]
- Test Findings: [Observed non-conformance, e.g., pressure drop during hydrotest or structural spalling on precast segment]
- Governing Codes: [e.g., ASME Sec VIII, API 1104, IPS, or Metro Technical Specs]

Tasks:
1. Root Cause Analysis (RCA) of the observed deficiency.
2. Compliance cross-check against code tolerances.
3. Generate a structured Non-Conformance Report (NCR) matrix: [NCR ID | Description | Severity | Corrective Action (CAPA) | Re-inspection Protocol | Approver].
4. Draft a definitive field inspection checklist for mechanical completion / temporary handover.`,
      targetTools: ['Claude', 'ChatGPT', 'Gemini']
    },
    // LIFESTYLE & EVERYDAY PROMPT SUITE
    {
      id: 'kitchen_fridge_chef',
      titleFa: 'سرآشپز نجات یخچال: دستور پخت خوشمزه با باقیمانده مواد غذایی',
      titleEn: 'Zero-Waste Fridge Chef: Creative Meals from Leftovers',
      categoryFa: 'آشپزی و سبک زندگی',
      categoryEn: 'Home & Lifestyle',
      descriptionFa: 'اقلام پراکنده باقیمانده در یخچال را بدهید تا ۳ غذای سریع، اقتصادی و لذیذ بدون نیاز به خرید اضافی پیشنهاد دهد.',
      descriptionEn: 'Feed your scattered fridge ingredients to generate 3 quick, delicious, zero-waste family meals.',
      promptFa: `تو یک سرآشپز خلاق، صرفه‌جو و کارشناس تغذیه خانواده هستی که شعارت «صفر دورریز مواد غذایی» است.
من در حال حاضر اقلام غذایی زیر را در یخچال و کابینت دارم که ممکن است به زودی فاسد یا کهنه شوند:
[لیست اقلام موجود، مثلاً: نصف سینه مرغ پخته، دو عدد کدو، مقداری ماست چکیده، کمی پنیر پیتزا، پیاز و ادویه‌جات]

شرایط:
- تعداد نفرات: [مثلاً ۳ نفر]
- حداکثر زمان آماده‌سازی: [مثلاً ۲۵ دقیقه]
- وسایل پخت موجود: [مثلاً گاز و تابه، بدون فر]

وظیفه تو:
۱. سه گزینه غذای لذیذ، ابتکاری و متناسب با ذائقه ایرانی پیشنهاد کن (یکی بسیار سریع، یکی خوراک گرم، یکی غذای سبک).
2. برای هر گزینه: مواد لازم دقیق از بین اقلام من، طرز تهیه گام‌به‌گام در ۵ مرحله کوتاه، و ترفند خوشمزه‌تر شدن را ذکر کن.
۳. در یک خط بگو با این کار جلوی دورریز چه اقلامی گرفته شد و چقدر در خرید دوباره صرفه‌جویی شد.`,
      promptEn: `You are an inventive, zero-waste family chef and home nutrition expert.
Here are the miscellaneous leftover ingredients currently in my fridge that need using up:
[List ingredients, e.g., half roasted chicken breast, 2 zucchinis, plain yogurt, shredded cheese, onion, basic spices]

Constraints:
- Serving: [e.g., 3 people]
- Max prep & cooking time: [e.g., 25 minutes]
- Equipment: [Stovetop and skillet, no oven]

Tasks:
1. Propose 3 delicious, creative meal concepts from these exact items (Quick Stir-fry, Warm Comfort Dish, Light Dinner).
2. For each: Step-by-step 5-minute recipe, seasoning hacks, and exact portions.
3. Calculate estimated grocery waste avoided.`,
      targetTools: ['ChatGPT-4o', 'Claude 3.5 / 3.7', 'Gemini Flash']
    },
    {
      id: 'parenting_homework',
      titleFa: 'مربی همراه والدین: آموزش درس‌های سخت به زبان قصه و بازی',
      titleEn: 'Smart Parenting Coach: Explaining Homework through Fun Stories',
      categoryFa: 'والدین و آموزش کودک',
      categoryEn: 'Parenting & EdTech',
      descriptionFa: 'آموزش مفاهیم دشوار ریاضی، علوم و تاریخ با انیمیشن‌های مورد علاقه کودک بدون اشک و لجبازی.',
      descriptionEn: 'Teach challenging STEM or history concepts using a child favorite characters and game mechanics.',
      promptFa: `تو یک مربی مهربان، متخصص روانشناسی یادگیری کودک و قصه‌گوی خلاق هستی.
کودک من [سن مثلاً: ۸ ساله، کلاس دوم یا سوم] در یادگیری مبحث [موضوع درسی مثلاً: جمع و تفریق کسرها یا چرخه‌های آب و باران در علوم] احساس خستگی و مقاومت می‌کند.
علاقه‌مندی‌های اصلی او: [مثلاً کارتون کارخانه‌هیولاها، بازی‌های لگو و شخصیت‌های فضایی].

وظیفه تو:
۱. این مفهوم درسی را در قالب یک داستان کوتاه هیجان‌انگیز ۳ دقیقه‌ای با کاراکترهای مورد علاقه او توضیح بده طوری که مفهوم در ذهن او تصویرسازی شود.
۲. یک بازی خانگی ۵ دقیقه‌ای ۲ نفره (بین والد و کودک) بدون نیاز به وسایل خاص طراحی کن که کودک با بازی، درستی فرمول را خودش کشف کند.
۳. دو سوال معماگونه با جایزه فرضی برای تثبیت درس بنویس.
لحن پاسخ صمیمی، پرانرژی و سرشار از شوخ‌طبعی کودکانه باشد.`,
      promptEn: `You are an empathetic child educational psychologist and master storyteller.
My child [Age: e.g., 8 years old, 3rd grade] is struggling and frustrated with [Topic: e.g., Fractions or Water Cycle].
Their passions: [e.g., Minecraft building, Space exploration, Lego].

Tasks:
1. Explain this exact academic concept through an engaging 3-minute adventure story starring their favorite theme.
2. Design a simple 5-minute hands-on game using household items where the child naturally discovers the solution.
3. Craft 2 riddle-style reward questions reinforcing the takeaway.
Tone must be warm, enthusiastic, and playful.`,
      targetTools: ['ChatGPT-4o', 'Claude 3.7', 'Gemini Pro']
    },
    {
      id: 'polite_negotiation',
      titleFa: 'مذاکره روزمره، اجاره‌بها و پس‌گرفتن مؤدبانه طلب بدون دلخوری',
      titleEn: 'Polite Negotiation: Rent Discount & Tactful Loan Recovery',
      categoryFa: 'آداب معاشرت و ارتباطات',
      categoryEn: 'Social & Negotiation',
      descriptionFa: 'نگارش پیام‌های محکم، دیپلماتیک و بسیار محترمانه برای پس‌گرفتن قرض یا گرفتن تخفیف کرایه خانه.',
      descriptionEn: 'Draft warm, assertive, non-confrontational texts to recover loans or negotiate favorable rent terms.',
      promptFa: `تو متخصص برجسته ارتباطات بین‌فردی، اصول مذاکره هاروارد و روانشناسی زبان (NVC) هستی.
موقعیت حساس من:
[شرح موقعیت مثلاً: می‌خواهم از صاحب‌خانه‌ام درخواست کنم اجاره امسال را کمتر از نرخ تورم افزایش دهد چون مستاجر بسیار خوش‌حساب و مراقب ملک بوده‌ام / یا: می‌خواهم مبلغی را که ۶ ماه پیش به دوستم قرض داده‌ام بدون ایجاد ناراحتی و با حفظ رفاقت پس بگیرم].

ملاحظات:
- رابطه ما: [صمیمی / نیمه‌رسمی / کاری]
- هدف مشخص: [مثلاً تعیین تاریخ دقیق واریز یا توافق روی مبلغ مشخص]

وظیفه تو:
۱. سه متن پیام کوتاه آماده ارسال بنویس:
   - گزینه ۱: لحن بسیار گرم و دوستانه با حفظ حرمت‌ها
   - گزینه ۲: لحن قاطع، محترمانه و شفاف بر مبنای منطق و حقایق
   - گزینه ۳: پیشنهاد بازپرداخت قسطی یا مصالحه برد-برد
۲. دو خطای بزرگ کلامی که نباید در این گفتگو مرتکب شوم را به من هشدار بده.`,
      promptEn: `You are an elite interpersonal communication and negotiation expert specializing in principled negotiation and boundary-setting.
My delicate interpersonal scenario:
[Describe scenario, e.g., Tactfully asking landlord for a rent freeze based on 3-year spotless tenancy, OR gently recovering an overdue personal loan from a close friend without destroying the relationship].

Tasks:
1. Draft 3 tailored, ready-to-send messages:
   - Option A: Warm, friendly, and relationship-centric.
   - Option B: Firm, polite, and fact-based.
   - Option C: Pragmatic win-win compromise proposal.
2. Warn me against 2 conversational landmines to strictly avoid.`,
      targetTools: ['Claude 3.5 / 3.7', 'ChatGPT-4o']
    },
    {
      id: 'viral_reels_script',
      titleFa: 'سناریونویسی وایرال اینستاگرام و ریلز با قلاب‌های ۳ ثانیه‌ای',
      titleEn: 'Viral Social Media Script: 3-Second Hooks & Retention',
      categoryFa: 'ترندها و تولید محتوا',
      categoryEn: 'Viral Content',
      descriptionFa: 'ایده و سناریوی آماده ویدیو با قلاب‌های روانشناختی، کات‌های جذاب و کپشن پرکامنت.',
      descriptionEn: 'High-retention video scripts with psychological hooks, visual pacing, and comment-generating CTAs.',
      promptFa: `تو یک استراتژیست ارشد تولید محتوای وایرال در اینستاگرام و تیک‌تاک با شناخت عمیق از الگوریتم ریلز و روانشناسی ۳ ثانیه اول هستی.
موضوع ویدیوی من: [موضوع، مثلاً: ۳ اشتباه بزرگ در خرید لباس / یا: ترفند پس‌انداز ماهیانه ۱۰ میلیون تومان / یا: طرز تهیه یک دسر ۳ سوته].
مخاطب هدف: [مثلاً جوانان، مادران، کارمندان].

وظیفه تو تدوین یک سناریوی کامل ۶۰ ثانیه‌ای است:
۱. قلاب طلایی (Hook): ۳ گزینه جمله افتتاحیه کنجکاوی‌برانگیز و شوکه‌کننده برای ۳ ثانیه اول.
۲. بدنه سناریو (Story & Value): متن گفتار کلمه‌به‌کلمه همراه با مشخص کردن زاویه دوربین و کات‌های تصویر (B-Roll).
۳. کال تو اکشن (CTA): یک دعوت به اقدام هوشمندانه که مخاطب را ترغیب به کامنت‌گذاشتن یا اشتراک‌گذاری در استوری کند.
۴. متن کپشن با ۵ هشتگ پربازدید هدفمند و خط اول جذاب.`,
      promptEn: `You are a viral social media strategist specializing in Instagram Reels/TikTok algorithmic retention and psychological hooks.
Video Topic: [e.g., 3 stealth money leaks keeping you broke, OR 15-minute healthy lunchbox prep].
Target Audience: [e.g., Working parents, young professionals].

Deliverables for a 45-60 second high-retention reel:
1. 3 explosive 3-second auditory/visual hooks that stop the thumb scroll.
2. Word-for-word spoken script with camera angles and B-roll visual cues.
3. High-converting CTA engineered to trigger comments and story shares.
4. Companion caption with engaging first-line preview and 5 targeted hashtags.`,
      targetTools: ['ChatGPT-4o', 'Claude', 'Gemini']
    },
    {
      id: 'smart_travel_planner',
      titleFa: 'برنامه‌ریزی سفر اقتصادی خانوادگی و شکار بلیت ارزان',
      titleEn: 'Family Vacation Architect: Budget Itineraries & Flight Deals',
      categoryFa: 'سفر و اوقات فراغت',
      categoryEn: 'Travel & Vacations',
      descriptionFa: 'طراحی برنامه روزبه‌روز سفر متناسب با انرژی کودک و سالمندان، به همراه چک‌لیست چمدان و ترفندهای کاهش هزینه.',
      descriptionEn: 'Balanced multi-day travel itineraries accommodating kids and seniors, with zero-forgotten packing matrices.',
      promptFa: `تو یک راهنمای حرفه‌ای سفر، مشاور بودجه‌بندی گردشگری و طراح برنامه‌های خانوادگی هستی.
اطلاعات سفر ما:
- مقصد: [مثلاً جزیره کیش / شهر استانبول / شمال ایران]
- مدت سفر: [مثلاً ۴ روز و ۳ شب]
- همسفران: [مثلاً ۲ بزرگسال و یک کودک ۶ ساله]
- سقف بودجه کل: [مثلاً ۲۵ میلیون تومان بدون احتساب پرواز]
- سبک ترجیحی: [آرامش‌بخش، تجربیات محلی و شکم‌گردی، بدون دویدن مدام]

وظیفه تو:
۱. جدول زمان‌بندی روزانه منعطف (صبح، بعدازظهر، شب) با فواصل استراحت کافی برای کودک.
۲. معرفی غذاهای محلی اصیل و رستوران‌های باکیفیت و قیمت‌مناسب دور از تله‌های توریستی.
۳. ترفندهای طلایی برای خرید بلیت و رزرو اقامتگاه با تخفیف حداکثری.
۴. چک‌لیست کامل بستن چمدان شامل داروهای ضروری و مدارک به صورت تفکیک‌شده.`,
      promptEn: `You are an elite family travel concierge and budget travel optimizer.
Trip Profile:
- Destination: [e.g., Istanbul, Turkey / Kish Island / Northern Coast]
- Duration: [e.g., 4 Days, 3 Nights]
- Party: [e.g., 2 adults, 1 child aged 6]
- Total Budget Cap: [e.g., $1,000 excluding airfare]
- Preferred Travel Vibe: [Relaxed, foodie, cultural, low-stress]

Tasks:
1. Flexible hour-by-hour itinerary balancing sights with child nap/downtime windows.
2. Authentic local cuisine gems off the commercial tourist traps.
3. Proven fare-saving hacks for local transit and accommodation.
4. Comprehensive multi-compartment luggage & first-aid pack list.`,
      targetTools: ['Claude 3.7', 'Gemini Pro', 'ChatGPT-4o']
    }
  ];

  const renderOrbitHub = () => {
    const R = 230;
    const W = 760;
    const H = 640;
    const CX = W / 2;
    const CY = H / 2;
    const ANGLES = [0, 72, 144, 216, 288];
    const completedCount = FIVE_SESSIONS.filter((s) => !!completedSessions[s.id]).length;
    const totalModules = FIVE_SESSIONS.reduce((acc, s) => acc + s.modules.length, 0);
    const RING_R = 94;
    const RING_C = 2 * Math.PI * RING_R;
    const progress = completedCount / FIVE_SESSIONS.length;

    const renderHub = (small: boolean) => (
      <div className={`relative flex items-center justify-center shrink-0 ${small ? 'w-44 h-44' : 'w-[200px] h-[200px]'}`}>
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full -rotate-90" aria-hidden="true">
          <circle cx="100" cy="100" r={RING_R} fill="none" stroke="#f1d9d4" strokeWidth="6" />
          <circle
            cx="100"
            cy="100"
            r={RING_R}
            fill="none"
            stroke="#10b981"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={RING_C}
            strokeDashoffset={RING_C * (1 - progress)}
            style={{ transition: 'stroke-dashoffset 600ms ease' }}
          />
        </svg>
        <div className="w-44 h-44 rounded-full bg-white/90 dark:bg-[#201729] backdrop-blur-md shadow-xl border border-white/70 dark:border-[#382645] flex flex-col items-center justify-center gap-2 relative z-10">
          <img
            src={OWJ_LOGO}
            alt="OWJ Business Council"
            className="w-28 h-auto object-contain"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = OWJ_LOGO_FALLBACK;
            }}
          />
          <span className="px-2.5 py-0.5 rounded-full bg-[#1d4f69]/10 text-[#1d4f69] dark:text-[#9cc9e0] text-[10px] font-black">
            {lang === 'fa' ? `۲۰ ساعت • ${totalModules.toLocaleString('fa-IR')} ماژول` : `20h • ${totalModules} modules`}
          </span>
          <span dir="ltr" className="text-[10px] font-mono font-bold text-emerald-600">{completedCount * 20}%</span>
        </div>
      </div>
    );

    const renderCard = (sess: (typeof FIVE_SESSIONS)[number]) => {
      const isSessActive = activeSessionId === sess.id;
      const isCompleted = !!completedSessions[sess.id];
      const metaFa = `${sess.hoursFa} • ${sess.modules.length.toLocaleString('fa-IR')} ماژول`;
      const metaEn = `4h • ${sess.modules.length} modules`;
      return (
        <div
          key={sess.id}
          role="button"
          tabIndex={0}
          onClick={() => {
            playTactileSound('thock');
            setActiveSessionId(sess.id);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              playTactileSound('thock');
              setActiveSessionId(sess.id);
            }
          }}
          dir="rtl"
          className={`p-3 rounded-2xl border text-right transition-all duration-200 cursor-pointer flex flex-col gap-2 select-none w-full ${
            isSessActive
              ? 'bg-gradient-to-br from-purple-600 via-fuchsia-600 to-orange-500 text-white scale-105 ring-4 ring-purple-200 border-transparent shadow-xl'
              : isCompleted
              ? 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-950 dark:text-emerald-100 border-emerald-400/60 shadow-xs hover:shadow-md'
              : 'bg-white dark:bg-[#201729] text-[#261a1d] dark:text-[#faedf3] border-[#ecdcd8] dark:border-[#382645] shadow-xs hover:shadow-md hover:border-[#e0533c]/50'
          }`}
        >
          <div className="flex items-center justify-between gap-1.5">
            <span className={`text-[10px] font-bold ${isSessActive ? 'text-white/90' : 'text-[#755e66] dark:text-[#ad99ab]'}`}>
              {lang === 'fa' ? metaFa : metaEn}
            </span>
            {isAdmin ? (
              <button
                type="button"
                onClick={(e) => toggleSessionCompletion(sess.id, e)}
                title={isCompleted ? 'لغو وضعیت تکمیل (ویژه ادمین)' : 'ثبت به عنوان تکمیل‌شده / سبز کردن (ویژه ادمین)'}
                className={`px-2 py-0.5 rounded-full text-[10px] font-black flex items-center gap-1 transition-all cursor-pointer ${
                  isCompleted
                    ? 'bg-emerald-500 text-white shadow-2xs'
                    : isSessActive
                    ? 'bg-white/25 text-white hover:bg-white/35'
                    : 'bg-black/[0.05] dark:bg-white/[0.08] text-[#755e66] dark:text-[#ad99ab] hover:bg-emerald-500/20 hover:text-emerald-700'
                }`}
              >
                <CheckCircle2 className="w-3 h-3 shrink-0" />
                <span>{isCompleted ? (lang === 'fa' ? 'تکمیل شد' : 'Done') : lang === 'fa' ? '✓ سبز کردن' : '✓ Mark done'}</span>
              </button>
            ) : isCompleted ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black flex items-center gap-1 bg-emerald-500 text-white">
                <CheckCircle2 className="w-3 h-3 shrink-0" />
                <span>{lang === 'fa' ? 'تکمیل‌شده' : 'Done'}</span>
              </span>
            ) : null}
          </div>
          <div className="font-extrabold text-xs leading-snug">{lang === 'fa' ? sess.titleFa : sess.titleEn}</div>
        </div>
      );
    };

    return (
      <div dir="rtl" className="rounded-3xl bg-gradient-to-br from-[#fff7f5] to-[#fdf2f8] dark:from-[#1a1222] dark:to-[#221629] border border-[#f3e1e4] dark:border-[#382645] p-3 sm:p-4">
        {/* Desktop / tablet: radial pentagon orbit */}
        <div dir="ltr" className="hidden md:block relative mx-auto w-full max-w-[760px]" style={{ aspectRatio: `${W} / ${H}` }}>
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 w-full h-full" aria-hidden="true">
            <circle cx={CX} cy={CY} r={R} fill="none" stroke="#e0533c" strokeOpacity="0.28" strokeWidth="1.5" strokeDasharray="4 8" />
            {FIVE_SESSIONS.map((sess, i) => {
              const rad = (ANGLES[i] * Math.PI) / 180;
              const x = CX + R * Math.sin(rad);
              const y = CY - R * Math.cos(rad);
              const isActive = activeSessionId === sess.id;
              const isDone = !!completedSessions[sess.id];
              const stroke = isActive ? '#c026d3' : isDone ? '#10b981' : '#e5cfcb';
              return (
                <line
                  key={sess.id}
                  x1={CX}
                  y1={CY}
                  x2={x}
                  y2={y}
                  stroke={stroke}
                  strokeWidth={isActive ? 3 : 2}
                  strokeLinecap="round"
                  strokeDasharray={isActive ? '7 6' : isDone ? undefined : '3 6'}
                >
                  {isActive && (
                    <animate attributeName="stroke-dashoffset" from="26" to="0" dur="1s" repeatCount="indefinite" />
                  )}
                </line>
              );
            })}
          </svg>

          <div className="absolute z-10" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
            {renderHub(false)}
          </div>

          {FIVE_SESSIONS.map((sess, i) => {
            const rad = (ANGLES[i] * Math.PI) / 180;
            const x = CX + R * Math.sin(rad);
            const y = CY - R * Math.cos(rad);
            return (
              <div
                key={sess.id}
                className="absolute z-20"
                style={{
                  left: `${(x / W) * 100}%`,
                  top: `${(y / H) * 100}%`,
                  width: '27%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {renderCard(sess)}
              </div>
            );
          })}
        </div>

        {/* Mobile: hub on top, then vertical timeline */}
        <div className="md:hidden flex flex-col items-center gap-5">
          {renderHub(true)}
          <div className="w-full relative pr-5 space-y-3">
            <span className="absolute right-1.5 top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#e0533c]/60 to-[#c026d3]/30 rounded-full" aria-hidden="true" />
            {FIVE_SESSIONS.map((sess) => {
              const isActive = activeSessionId === sess.id;
              const isDone = !!completedSessions[sess.id];
              return (
                <div key={sess.id} className="relative">
                  <span
                    className={`absolute -right-[19px] top-4 w-3.5 h-3.5 rounded-full border-2 border-white ${
                      isActive ? 'bg-fuchsia-600' : isDone ? 'bg-emerald-500' : 'bg-[#e0533c]/50'
                    }`}
                    aria-hidden="true"
                  />
                  {renderCard(sess)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };


  const renderCurriculumNav = () => (
    <div className="space-y-3">
      {renderOrbitHub()}

      {/* Track-Adaptive Metaphor Strip for Active Session */}
      <div className="px-3.5 py-2.5 rounded-xl bg-[#fdeee9]/70 dark:bg-[#341528]/50 border border-[#e0533c]/25 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex flex-wrap items-center gap-2 min-w-0">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-[#e0533c] text-white shrink-0">
            استعاره مسیر {activeTrackMetaphor.trackLabelFa}
          </span>
          <span className="font-semibold text-[#261a1d] dark:text-[#faedf3] leading-relaxed">
            {activeSessionObj.metaphorFa}
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#755e66] dark:text-[#ad99ab] shrink-0" dir="ltr">
          Drive → GitHub → LLMs → Skills &amp; MCP → Vibe Coding
        </span>
      </div>

      {/* Level 2: Modules Inside Active Session (Pill CSS modeled after Hero CTAs) */}
      <div className="flex flex-wrap items-center gap-2.5 text-xs">
        {activeSessionObj.modules.map((item) => {
          const isSelected = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={(e) => handleTabClick(item.id, e, false)}
              data-active={isSelected}
              className={`group relative px-4 py-2.5 rounded-full text-right transition-all duration-300 cursor-pointer flex items-center gap-2.5 select-none active:scale-95 ${
                isSelected
                  ? 'bg-gradient-to-r from-[#e0533c] to-[#c026d3] hover:from-[#c2410c] hover:to-[#9333ea] text-white border border-transparent shadow-lg hover:shadow-xl font-semibold'
                  : 'bg-white dark:bg-[#201729] hover:bg-orange-50 dark:hover:bg-[#2d1a33] border border-gray-300 dark:border-[#382645] hover:border-orange-200 dark:hover:border-[#e0533c]/50 text-[#0A101D] dark:text-[#faedf3] hover:text-orange-800 dark:hover:text-white font-medium shadow-xs hover:shadow-md'
              }`}
            >
              <span
                dir="ltr"
                className={`px-2.5 py-1 rounded-full font-mono text-[11px] font-black flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-white/20 text-white shadow-2xs'
                    : 'bg-[#e0533c] text-white shadow-xs group-hover:bg-[#c2410c]'
                }`}
              >
                {item.num}
              </span>

              <div className="min-w-0 text-right">
                <span className="font-bold text-xs leading-tight block">
                  {lang === 'fa' ? item.titleFa : item.titleEn}
                </span>
                <span
                  className={`text-[10px] leading-tight block ${
                    isSelected
                      ? 'text-white/85'
                      : 'text-[#5d6b73] dark:text-[#ad99ab] group-hover:text-orange-700/85 dark:group-hover:text-white/80'
                  }`}
                >
                  {lang === 'fa' ? item.subFa : item.subEn}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div
      className="space-y-8 animate-fadeIn text-[#1c2830] dark:text-[#e8ebe9] pb-16"
      onClickCapture={(e) => {
        const target = e.target as HTMLElement | null;
        const btn = target?.closest('button');
        if (btn && !btn.hasAttribute('data-keycap')) {
          playTactileSound('switch');
        }
      }}
    >
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#e0533c] via-[#9333ea] to-[#4a044e] text-white p-6 sm:p-8 shadow-md border border-[#e0533c]/40">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://owjbc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-1 rounded-lg border border-white/40 shadow-xs hover:scale-105 transition-transform shrink-0"
                title="OWJ Business Council"
              >
                <img
                  src={OWJ_LOGO}
                  alt="OWJ Business Council"
                  className="h-7 w-auto object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = OWJ_LOGO_FALLBACK;
                  }}
                />
              </a>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-[#99e2b4] text-xs font-semibold tracking-wide border border-white/15">
                <Sparkles className="w-3.5 h-3.5 text-[#fbbf24]" />
                <span>{lang === 'fa' ? 'نقشه راه ۲۰ ساعته (۵ جلسه ۴ ساعته) · گروه مشاوران مدیریت اوج (OWJ)' : '20-Hour Curriculum (5 x 4h Sessions) · OWJ Business Council'}</span>
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-snug">
              {lang === 'fa'
                ? 'مهندسی هوش مصنوعی: از زیرساخت Drive و GitHub تا Skills، MCP و Vibe Coding'
                : 'Applied AI Engineering: Drive & GitHub to Skills, MCP & Vibe Coding'}
            </h1>
            <p className="text-xs sm:text-sm text-[#d0e5ec] leading-relaxed">
              {lang === 'fa'
                ? 'چیدمان استاندارد ۵ جلسه‌ای پیش از ورود به Vibe Coding و فاز اول CPMAI: ۱) زیرساخت درایو و گیت‌هاب · ۲) LLMها، Gems، Projects و Artifacts · ۳) NotebookLM، قراردادها و معماری Skills · ۴) پایپ‌لاین MCP، امنیت و مغز دوم Obsidian · ۵) ارکستراسیون نهایی.'
                : '5-Session structured engineering curriculum: 1) Drive, Markdown & GitHub DCC · 2) LLMs, RCTO, Gems, Projects & Artifacts · 3) NotebookLM, Contracts & SKILL.md · 4) MCP Piping, Security & Obsidian · 5) Full Orchestration & Vibe Coding Bridge.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-stretch gap-2.5 shrink-0">
            <button
              onClick={() => handleTabClick('s1_demo', undefined, true)}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{lang === 'fa' ? 'شروع جلسه ۱ کارگاه مهندسی (ماژول ۱-۱)' : 'Start Workshop Session 1 (Module 1-1)'}</span>
            </button>
            <button
              onClick={onGoToPage1}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#2f7d5b] hover:bg-[#25664a] text-white font-semibold text-xs shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'ورود به جلسه ۱ کتاب‌کار CPMAI (اهداف تجاری)' : 'Go to CPMAI Page 1 (Business Goals)'}</span>
              {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSandboxOpen(true);
                setTimeout(() => {
                  document.getElementById('prompt-sandbox')?.scrollIntoView({ behavior: 'smooth' });
                }, 60);
              }}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/20 transition-colors cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-[#99e2b4]" />
              <span>{lang === 'fa' ? 'باز کردن سندباکس تمرین پرامپت' : 'Open Prompt Sandbox'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Start Guidance Banner: شروع جلسه اول */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-blue-500/15 border-2 border-emerald-500/30 dark:border-emerald-500/20 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-emerald-500 text-white shadow-xs shrink-0 mt-0.5 sm:mt-0 flex items-center justify-center">
            <Rocket className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
                {lang === 'fa' ? 'راهنمای شروع دوره' : 'Getting Started Guide'}
              </span>
              <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] font-mono">
                {lang === 'fa' ? 'گام اول شما: انتخاب مسیر شروع' : 'Step 1: Choose your path'}
              </span>
            </div>
            <h3 className="text-xs sm:text-sm font-black text-[#1c2830] dark:text-[#e8ebe9]">
              {lang === 'fa'
                ? 'خوش آمدید! برای شروع یادگیری یکی از دو مسیر زیر را انتخاب کنید:'
                : 'Welcome! Choose one of the paths below to begin:'}
            </h3>
            <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] max-w-2xl leading-relaxed">
              {lang === 'fa'
                ? '۱) مسیر کارگاه مهندسی هوش مصنوعی: از «جلسه ۱: زیرساخت داده، درایو و گیت‌هاب» شروع کنید. ۲) مسیر متدولوژی رسمی CPMAI: مستقیماً وارد «جلسه ۱ کتاب‌کار (درک کسب‌وکار)» شوید.'
                : '1) Engineering Workshop: Start from Session 1 (Drive, Markdown & GitHub DCC). 2) Official CPMAI Workbook: Proceed to Session 1 (Business Understanding).'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full md:w-auto">
          <button
            type="button"
            onClick={(e) => handleTabClick('s1_demo', e, true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-black shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>{lang === 'fa' ? 'شروع جلسه ۱ کارگاه مهندسی (ماژول ۱-۱)' : 'Start Workshop Session 1'}</span>
          </button>
          <button
            type="button"
            onClick={onGoToPage1}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#161e24] hover:bg-gray-50 dark:hover:bg-[#1f2933] border border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold shadow-2xs transition-all active:scale-95 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{lang === 'fa' ? 'جلسه ۱ کتاب‌کار CPMAI' : 'CPMAI Workbook Session 1'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Placement Quiz Banner for New Entrants */}
      <div className="p-1 rounded-2xl bg-gradient-to-r from-[#2f7d5b]/25 via-[#c026d3]/25 to-[#b87333]/25 border border-[#2f7d5b]/30 shadow-2xs">
        <div className="rounded-[calc(1rem-0.25rem)] bg-white dark:bg-[#161e24] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-[#2f7d5b]/15 text-[#2f7d5b] dark:text-[#52b788] shrink-0 mt-0.5 sm:mt-0">
              <Target className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#2f7d5b]/15 text-[#2f7d5b] dark:text-[#52b788] border border-[#2f7d5b]/30">
                  {lang === 'fa' ? 'پیش‌نیاز پیشنهادی اعضای جدید پلتفرم' : 'Recommended Newcomer Entry Gate'}
                </span>
                <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] font-mono">
                  {lang === 'fa' ? '⏱️ ۱۲ سوال تعاملی · ۷ دقیقه' : '⏱️ 12 Questions · 7 Min'}
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-black text-[#1c2830] dark:text-[#e8ebe9]">
                {lang === 'fa'
                  ? 'آزمون تعاملی سنجش سطح هوش مصنوعی، گیت‌هاب و اصطلاحات مهندسی'
                  : 'Interactive AI & Software Engineering Readiness Assessment'}
              </h3>
              <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] max-w-2xl leading-relaxed">
                {lang === 'fa'
                  ? 'پیش از شروع کتاب‌کار CPMAI، میزان تسلط خود را بر اصطلاحات دنیای واقعی (Git, GitHub, PRs, Tokens, RAG, NotebookLM, APIs) محک بزنید و کارنامه و نقشه راه شخصی‌سازی‌شده دریافت کنید.'
                  : 'Assess your practical fluency across Git, PRs, Tokens, RAG architectures, and AI safety to receive a tailored roadmap.'}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenQuiz}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#2f7d5b] border-b-4 border-[#1b4d36] hover:bg-[#256347] text-white text-xs font-black shadow-xs transition-all active:translate-y-[2px] active:border-b shrink-0 cursor-pointer"
          >
            <span>{lang === 'fa' ? 'شرکت در آزمون سطح‌سنجی 🚀' : 'Take Readiness Quiz 🚀'}</span>
            {lang === 'fa' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 5-SESSION TWO-LEVEL EXECUTIVE NAVIGATOR */}
      <div
        ref={navPillsRef}
        className="p-4 sm:p-5 rounded-2xl bg-white/90 dark:bg-[#1a1222]/90 backdrop-blur-md border border-[#ecdcd8] dark:border-[#382645] shadow-xs space-y-3.5"
      >
        {/* Top Control Bar */}
        <div dir="rtl" className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#ecdcd8]/80 dark:border-[#382645]/80">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e0533c] animate-pulse" />
            <h3 className="text-xs sm:text-sm font-extrabold text-[#261a1d] dark:text-[#faedf3]">
              {lang === 'fa'
                ? 'نقشه راه ۵ جلسه‌ای (۲۰ ساعت) — جلسه و ماژول مدنظر را انتخاب کنید:'
                : '5-Session Engineering Curriculum (20 Hours) — Select Session & Module:'}
            </h3>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={(e) => handleTabClick('s1_demo', e, false)}
              className="px-3.5 py-1.5 rounded-full border border-orange-200 dark:border-[#e0533c]/40 text-xs bg-orange-50 dark:bg-[#e0533c]/15 text-orange-800 dark:text-orange-200 hover:bg-orange-100 font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
            >
              <span dir="ltr" className="px-1.5 py-0.5 rounded-full bg-[#e0533c] text-white text-[10px] font-black font-mono">۰-۱</span>
              <span>{lang === 'fa' ? 'دموی ۱۵ دقیقه‌ای خروجی نهایی دوره' : '15-min Final Output Demo'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsSandboxOpen((prev) => !prev);
                setTimeout(() => {
                  document.getElementById('prompt-sandbox')?.scrollIntoView({ behavior: 'smooth' });
                }, 60);
              }}
              className="px-3.5 py-1.5 rounded-full border border-purple-200 dark:border-[#c026d3]/40 text-xs bg-purple-50 dark:bg-[#c026d3]/15 text-purple-800 dark:text-purple-200 hover:bg-purple-100 font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'سندباکس تمرین پرامپت' : 'Prompt Sandbox'}</span>
            </button>

            <button
              type="button"
              onClick={onOpenQuiz}
              className="px-3.5 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-500/40 text-xs bg-emerald-50 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
            >
              <Target className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'آزمون تعیین سطح' : 'Readiness Quiz'}</span>
            </button>

            <button
              type="button"
              onClick={(e) => handleTabClick(activeTab === 'all' ? 's1_demo' : 'all', e, false)}
              className={`px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-[#e0533c] to-[#c026d3] text-white border-transparent shadow-xs'
                  : 'bg-slate-50 dark:bg-white/[0.05] border-slate-200 dark:border-white/10 text-slate-700 dark:text-[#faedf3] hover:bg-slate-100'
              }`}
            >
              {activeTab === 'all'
                ? lang === 'fa' ? '✓ حالت نمایش یکجا' : '✓ Showing All'
                : lang === 'fa' ? 'نمایش یکجای تمام جلسه‌ها' : 'Show All Sessions'}
            </button>
          </div>
        </div>

        {/* 5-Session + Module Stepper Grid */}
        {renderCurriculumNav()}
      </div>

      {/* Empty State / Prompt to Pick a Module */}
      {activeTab === null && (
        <div className="p-8 sm:p-10 rounded-3xl border-2 border-dashed border-[#e0533c]/30 dark:border-[#fb7185]/30 bg-gradient-to-b from-[#fdeee9]/50 via-transparent to-[#c026d3]/5 dark:from-[#341528]/30 dark:via-transparent dark:to-purple-950/10 text-center space-y-4 shadow-2xs">
          <div className="w-14 h-14 rounded-2xl bg-[#e0533c]/10 text-[#e0533c] dark:text-[#fb7185] flex items-center justify-center mx-auto shadow-2xs">
            <Layers className="w-7 h-7" />
          </div>
          <div className="space-y-1.5 max-w-lg mx-auto">
            <h3 className="text-base sm:text-lg font-black text-[#1c2830] dark:text-[#e8ebe9]">
              {lang === 'fa' ? activeSessionObj.titleFa : activeSessionObj.titleEn}
            </h3>
            <p className="text-xs sm:text-sm text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
              {lang === 'fa'
                ? 'برای جلوگیری از شلوغی صفحه، ابتدا یکی از ماژول‌های این بخش را از نوار بالا انتخاب کنید تا محتوای همان بخش باز شود.'
                : 'Select one of the modules from the bar above to open its focused content.'}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            <button
              type="button"
              onClick={(e) => handleTabClick(activeSessionObj.modules[0].id, e, true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#e0533c] to-[#c026d3] text-white text-xs font-bold shadow-sm hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              {lang === 'fa'
                ? `شروع (${activeSessionObj.modules[0].titleFa})`
                : `Start ${activeSessionObj.modules[0].titleEn}`}
            </button>
            <button
              type="button"
              onClick={(e) => handleTabClick('all', e, true)}
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-[#1a232b] border border-black/10 dark:border-white/10 text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] hover:bg-black/[0.04] transition-all cursor-pointer active:scale-95"
            >
              {lang === 'fa' ? 'نمایش یکجای تمام جلسه‌ها' : 'Show All Sessions'}
            </button>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SESSION 1 MODULES: DATA INFRASTRUCTURE (DRIVE, MARKDOWN, GITHUB DCC)  */}
      {/* ===================================================================== */}
      {(activeTab === 'all' || activeTab === 's1_demo') && (
        <section className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] shadow-xs space-y-5">
          {/* Header + Projector Trigger */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#ecdcd8]/60 dark:border-[#382645]/60">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-lg bg-[#e0533c] text-white text-xs font-black shrink-0">۱-۱</span>
              <div>
                <h2 className="text-sm sm:text-base font-black text-[#261a1d] dark:text-[#faedf3]">
                  دموی ۱۵ دقیقه‌ای خروجی نهایی: چرا باید قبل از هوش مصنوعی از Drive و GitHub شروع کنیم؟
                </h2>
                <p className="text-xs text-[#755e66] dark:text-[#ad99ab]">
                  نمایش خط تولید تمام‌اتوماتیک جلسه ۵ برای درک جایگاه هر ابزار پیش از شروع دوره
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openS1Projector('s1_demo', 0)}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black flex items-center gap-1.5 border border-amber-700 border-b-[3px] border-b-amber-900 active:translate-y-[2px] active:border-b cursor-pointer shadow-xs shrink-0 self-start sm:self-center"
            >
              <Monitor className="w-4 h-4" />
              <span>حالت اسلاید پروژکتور (۶ اسلاید)</span>
            </button>
          </div>

          {/* Layer 1: Zero-Assumption Intro Box (Always Visible) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-l from-[#fdeee9]/80 via-white to-[#f3e8ff]/50 dark:from-[#341528]/60 dark:via-[#1a1222] dark:to-purple-950/30 border border-[#e0533c]/30 space-y-3 text-xs">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-[#e0533c] text-white font-black text-[11px]">
                مقدمه از صفر مطلق · داستان این دوره ۲۰ ساعته چیست؟
              </span>
              <span className="font-mono text-[11px] text-[#755e66] dark:text-[#ad99ab]">
                مسیر انتخابی شما: {activeTrackMetaphor.trackLabelFa}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#261a1d] dark:text-[#faedf3] leading-relaxed font-medium">
              اکثر افراد از هوش مصنوعی فقط مثل یک «چت‌بات معمولی» استفاده می‌کنند: هر روز یک جدول یا متن را از فایل‌های به‌هم‌ریخته کپی می‌کنند، داخل چت پیست می‌کنند و جواب می‌گیرند؛ و فردا که چت جدیدی باز می‌کنند، هوش مصنوعی همه‌چیز را فراموش کرده است! در سال ۲۰۲۶ با ظهور <b>مهارت‌های ماژولار (Skills)</b> و <b>پروتکل اتصال مستقیم (MCP)</b>، هوش مصنوعی دیگر یک چت‌بات نیست؛ بلکه به یک همکار دیجیتال تبدیل شده که به پوشه‌های گوگل درایو و آرشیو گیت‌هاب شما وصل می‌شود.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-white/90 dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] space-y-1">
                <b className="text-[#e0533c] dark:text-[#fb7185] block">۱. مشکل روش سنتی (بدون زیرساخت)</b>
                <p className="text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  فایل‌های پراکنده با نام‌های <code>Final_Rev3_Edited.xlsx</code>، کپی-پیست دستی و فراموشی دائمی استانداردهای شرکت توسط مدل.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/90 dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] space-y-1">
                <b className="text-[#c026d3] dark:text-[#e879f9] block">۲. دو ستون ذخیره‌سازی در جلسه ۱</b>
                <p className="text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  • <b>{activeTrackMetaphor.driveFa}</b><br />
                  • <b>{activeTrackMetaphor.githubFa}</b>
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/90 dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] space-y-1">
                <b className="text-emerald-600 dark:text-emerald-400 block">۳. خروجی نهایی که در جلسه ۵ می‌سازیم</b>
                <p className="text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  خوانش خودکار جدول از Drive/هارد با MCP ← ممیزی با Skill ← تولید داشبورد در Artifact ← ثبت ریویژن در GitHub!
                </p>
              </div>
            </div>

            {/* Visual Diagram: Pipeline Architecture */}
            <DiagramWrapper
              titleFa="اینفوگرافیک تصویری: زنجیره خط تولید خودکار مهندسی (پایپ‌لاین ۵ مرحله‌ای دوره)"
              titleEn="Visual Infographic: Automated 5-Stage Engineering AI Pipeline"
              badgeFa="معماری پیوسته"
              lang={lang}
            >
              <PipelineArchitectureDiagram lang={lang} />
            </DiagramWrapper>
          </div>

          {/* Layer 2: Optional Deep-Dive Accordion */}
          <details className="group rounded-2xl border border-[#ecdcd8] dark:border-[#382645] bg-[#fdf8f5] dark:bg-[#16101c] overflow-hidden transition-all">
            <summary className="cursor-pointer list-none p-4 flex items-center justify-between font-bold text-xs sm:text-sm select-none hover:bg-[#fdeee9]/40 dark:hover:bg-[#341528]/40 transition-colors">
              <div className="flex items-center gap-2 text-[#261a1d] dark:text-[#faedf3]">
                <Sparkles className="w-4 h-4 text-[#e0533c] shrink-0" />
                <span>بسط اختیاری موضوع: جدول کامل نقشه راه ۵ جلسه و چرایی تقدم گیت‌هاب بر پرامپت‌نویسی</span>
              </div>
              <span className="text-[11px] font-normal text-[#755e66] dark:text-[#ad99ab] flex items-center gap-1 group-open:text-[#e0533c] shrink-0">
                <span>مشاهده جزئیات کامل</span>
                <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
              </span>
            </summary>

            <div className="p-4 pt-3 border-t border-[#ecdcd8]/60 dark:border-[#382645]/60 space-y-4 text-xs">
              <div className="overflow-x-auto rounded-xl border border-[#ecdcd8] dark:border-[#382645] bg-white dark:bg-[#201729]">
                <table className="w-full text-right text-xs border-collapse">
                  <thead>
                    <tr className="bg-black/[0.03] dark:bg-white/[0.04] border-b border-[#ecdcd8] dark:border-[#382645] font-black">
                      <th className="p-3">جلسه</th>
                      <th className="p-3">محور اصلی</th>
                      <th className="p-3">نقش گیت‌هاب و درایو در آن جلسه</th>
                      <th className="p-3">خروجی عملی پایان جلسه</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ecdcd8]/50 dark:divide-[#382645]/50">
                    <tr>
                      <td className="p-3 font-bold text-[#e0533c]">جلسه ۱ (۴ ساعت)</td>
                      <td className="p-3 font-bold">زیرساخت داده (Drive + Markdown + GitHub)</td>
                      <td className="p-3">ایجاد اولین شیت استاندارد در Drive و ساخت اولین مخزن (Repo) در GitHub</td>
                      <td className="p-3">ثبت اولین فایل دستورالعمل <code>README.md</code> در گیت‌هاب</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#c026d3]">جلسه ۲ (۴ ساعت)</td>
                      <td className="p-3 font-bold">LLMها، پرامپت‌نویسی RCTO، Gems/Projects و Artifacts</td>
                      <td className="p-3">تغذیه فایل‌های استاندارد جلسه ۱ به Projects و ذخیره کد داشبورد Artifact در GitHub</td>
                      <td className="p-3">ساخت مشاور مقیم و داشبورد تعاملی React/HTML</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-purple-600">جلسه ۳ (۴ ساعت)</td>
                      <td className="p-3 font-bold">NotebookLM، ممیزی قراردادها و معماری Skills</td>
                      <td className="p-3">اتصال Gem به <code>@Google Drive</code> و ذخیره پوشه <code>SKILL.md</code> در GitHub تیمی</td>
                      <td className="p-3">ساخت و تست مهارت دائمی با سناریوی تله اعداد</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-teal-600">جلسه ۴ (۴ ساعت)</td>
                      <td className="p-3 font-bold">انقلاب MCP، خطوط قرمز امنیتی و مغز دوم Obsidian</td>
                      <td className="p-3">اتصال مستقیم کلاود به هارد شخصی (Filesystem MCP) و اکانت گیت‌هاب (GitHub MCP)</td>
                      <td className="p-3">خواندن و ویرایش خودکار فایل‌ها بدون کپی-پیست</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-emerald-600">جلسه ۵ (۴ ساعت)</td>
                      <td className="p-3 font-bold">ارکستراسیون کامل، مسترکلاس و پل Vibe Coding</td>
                      <td className="p-3">اجرای خط تولید کامل از Drive تا انتشار زنده داشبورد روی GitHub Pages</td>
                      <td className="p-3">آمادگی ۱۰۰٪ برای ورود به محیط‌های Cursor و Claude Code</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </details>
        </section>
      )}

      {(activeTab === 'all' || activeTab === 's1_drive') && (
        <section className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] shadow-xs space-y-5">
          {/* Header + Projector Trigger */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#ecdcd8]/60 dark:border-[#382645]/60">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-lg bg-[#e0533c] text-white text-xs font-black shrink-0">۱-۲</span>
              <div>
                <h2 className="text-sm sm:text-base font-black text-[#261a1d] dark:text-[#faedf3]">
                  بخش اول جلسه ۱: گوگل درایو (Google Drive) و استانداردسازی جداول کارگاهی (۱.۵ ساعت)
                </h2>
                <p className="text-xs text-[#755e66] dark:text-[#ad99ab]">
                  {activeTrackMetaphor.driveFa} — از تعریف پایه تا تبدیل اکسل‌های نامنظم به جداول ماشین‌خوان
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openS1Projector('s1_drive', 0)}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black flex items-center gap-1.5 border border-amber-700 border-b-[3px] border-b-amber-900 active:translate-y-[2px] active:border-b cursor-pointer shadow-xs shrink-0 self-start sm:self-center"
            >
              <Monitor className="w-4 h-4" />
              <span>حالت اسلاید پروژکتور (۸ اسلاید)</span>
            </button>
          </div>

          {/* Layer 1: Zero-to-One Definition of Google Drive & Sheets */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#fdf8f5] dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] space-y-3 text-xs">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-blue-600 text-white font-black text-[11px]">
                تعریف پایه از صفر · Google Drive و Google Sheets چیستند؟
              </span>
              <a
                href="https://drive.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>ورود به drive.google.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-xs sm:text-sm text-[#261a1d] dark:text-[#faedf3] leading-relaxed">
              <b>گوگل درایو (Google Drive)</b> یک هارد دیسک ابری رایگان (۱۵ گیگابایت) متصل به جیمیل شماست. برخلاف پوشه‌های معمولی ویندوز یا فلش‌مموری که با هر بار ایمیل کردن یک فایل، نسخه‌های تکراری و گیج‌کننده ایجاد می‌شود، در <b>Google Docs</b> (معادل Word) و <b>Google Sheets</b> (معادل Excel) تمام اعضای تیم روی <b>یک نسخه واحد و زنده</b> کار می‌کنند. مهم‌تر از آن، هوش مصنوعی Gemini و Claude می‌توانند مستقیماً به پوشه‌های گوگل درایو شما وصل شوند و از روی جداول زنده گزارش بگیرند؛ به شرطی که جدول شما «ماشین‌خوان» باشد!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] space-y-2">
                <h4 className="font-black text-xs sm:text-sm text-[#261a1d] dark:text-[#faedf3]">
                  ۵ قانون طلایی جدول ماشین‌خوان (Machine-Readable)
                </h4>
                <ul className="space-y-1.5 text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  <li>۱. <b>ممنوعیت مطلق سلول‌های Merge شده:</b> ادغام سلول‌ها باعث خطای Null در هوش مصنوعی می‌شود.</li>
                  <li>۲. <b>سطر اول = فقط نام ستون‌ها:</b> بدون ردیف‌های عنوان تزیینی یا تاریخ در بالای جدول.</li>
                  <li>۳. <b>خلوص نوع داده:</b> در ستون درصد یا مبلغ، فقط عدد بنویسید (عبارت «حدود ۴۰٪» ممنوع!).</li>
                  <li>۴. <b>حذف ردیف «جمع کل» از وسط جدول خام:</b> باعث دوبار شمارش شدن اعداد در تحلیل AI می‌شود.</li>
                  <li>۵. <b>معماری دو شیتی:</b> تب <code>01_Raw_Data</code> برای هوش مصنوعی و تب <code>02_Dashboard</code> برای پرینت.</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] space-y-2 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-black text-xs sm:text-sm text-[#261a1d] dark:text-[#faedf3] flex items-center gap-1.5">
                    <FolderTree className="w-4 h-4 text-[#e0533c]" />
                    <span>ساختار پوشه‌بندی استاندارد در Google Drive</span>
                  </h4>
                  <div className="p-3 rounded-lg bg-[#1e1e1e] text-[#d4d4d4] font-mono text-[11px] space-y-1" dir="ltr">
                    <div>📁 AI_Project_Workspace/</div>
                    <div> ├── 📁 01_Master_Specs/ (Contracts, MDR, WBS)</div>
                    <div> ├── 📁 02_Live_Sheets/ (Clean Tabular Sheets)</div>
                    <div> └── 📁 03_AI_Outputs/ (Audits &amp; Reports)</div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#ecdcd8]/60 dark:border-[#382645]/60">
                  <span className="text-[11px] text-[#755e66] dark:text-[#ad99ab]">نمونه فایل CSV استاندارد آماده تست:</span>
                  <button
                    type="button"
                    onClick={() => downloadTextFile('clean_engineering_log.csv', sessionCurriculum.cleanCsvContent, 'text/csv;charset=utf-8;')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>دانلود نمونه CSV استاندارد</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Visual Diagram: Table Comparison (Always Visible in Layer 1) */}
            <DiagramWrapper
              titleFa="مقایسه بصری ساختار شیت‌ها: جدول پر از نویز اکسل ❌ در برابر شیت ماشین‌خوان هوش مصنوعی ✅"
              titleEn="Visual Comparison: Legacy Excel Table vs. AI Machine-Readable Sheet"
              badgeFa="الگوی ساختاری"
              lang={lang}
            >
              <VisualTableComparisonDiagram lang={lang} />
            </DiagramWrapper>
          </div>

          {/* Layer 2: Optional Deep-Dive Accordions */}
          <details className="group rounded-2xl border border-[#ecdcd8] dark:border-[#382645] bg-[#fdf8f5] dark:bg-[#16101c] overflow-hidden transition-all">
            <summary className="cursor-pointer list-none p-4 flex items-center justify-between font-bold text-xs sm:text-sm select-none hover:bg-[#fdeee9]/40 dark:hover:bg-[#341528]/40 transition-colors">
              <div className="flex items-center gap-2 text-[#261a1d] dark:text-[#faedf3]">
                <Table className="w-4 h-4 text-[#e0533c] shrink-0" />
                <span>بسط اختیاری ۱: مقایسه چشمی «جدول خراب انسانی ❌» در برابر «جدول استاندارد ماشین‌خوان ✅»</span>
              </div>
              <span className="text-[11px] font-normal text-[#755e66] dark:text-[#ad99ab] flex items-center gap-1 group-open:text-[#e0533c] shrink-0">
                <span>مشاهده مقایسه جدول‌ها</span>
                <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
              </span>
            </summary>

            <div className="p-4 pt-3 border-t border-[#ecdcd8]/60 dark:border-[#382645]/60 grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-red-500/[0.05] border border-red-500/30 space-y-2">
                <b className="text-red-700 dark:text-red-400 block">❌ جدول رایج ولی خراب برای هوش مصنوعی:</b>
                <ul className="space-y-1 text-[#5d6b73] dark:text-[#9aa8b0]">
                  <li>• ردیف ۱ تا ۳: «به نام خدا - گزارش پیشرفت ماهانه پروژه - تاریخ: آبانماه» (سلول ادغام‌شده سراسری)</li>
                  <li>• ستون نام واحد: برای ۵ فعالیت زیر هم، سلول «ایستگاه مرکزی» Merge شده است (ردیف‌های ۲ تا ۵ برای AI خالی دیده می‌شوند!).</li>
                  <li>• ستون پیشرفت: نوشته شده «حدود ۷۵ درصد (منتظر تایید ناظر)» (ترکیب متن و عدد در یک سلول).</li>
                </ul>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/30 space-y-2">
                <b className="text-emerald-700 dark:text-emerald-400 block">✅ جدول تمیز و استاندارد (Machine-Readable):</b>
                <pre dir="ltr" className="p-2.5 rounded-lg bg-[#1e1e1e] text-[#d4d4d4] font-mono text-[10px] overflow-x-auto">
                  {sessionCurriculum.cleanCsvContent}
                </pre>
              </div>
            </div>
          </details>

          <details className="group rounded-2xl border border-[#ecdcd8] dark:border-[#382645] bg-[#fdf8f5] dark:bg-[#16101c] overflow-hidden transition-all">
            <summary className="cursor-pointer list-none p-4 flex items-center justify-between font-bold text-xs sm:text-sm select-none hover:bg-[#fdeee9]/40 dark:hover:bg-[#341528]/40 transition-colors">
              <div className="flex items-center gap-2 text-[#261a1d] dark:text-[#faedf3]">
                <ListChecks className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>بسط اختیاری ۲: تمرین عملی ۱۵ دقیقه‌ای کلاسی + پرامپت تمیزکننده خودکار جداول</span>
              </div>
              <span className="text-[11px] font-normal text-[#755e66] dark:text-[#ad99ab] flex items-center gap-1 group-open:text-[#e0533c] shrink-0">
                <span>مشاهده تمرین و پرامپت</span>
                <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
              </span>
            </summary>

            <div className="p-4 pt-3 border-t border-[#ecdcd8]/60 dark:border-[#382645]/60 space-y-3 text-xs">
              <p className="text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                اگر از قبل جدول‌های نامنظم زیادی دارید، نیازی نیست دستی آن‌ها را اصلاح کنید! جدول نامنظم را کپی کنید و با پرامپت زیر به Claude یا Gemini بدهید تا نسخه استاندارد CSV را تحویلتان دهد:
              </p>
              <div className="p-3 rounded-xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <code className="text-[11px] text-[#261a1d] dark:text-[#faedf3]">
                  «این جدول کپی‌شده را به یک جدول کاملاً استاندارد و ماشین‌خوان CSV تبدیل کن: سلول‌های ادغام‌شده را در تمام ردیف‌ها پر کن، اعداد را از توضیحات متنی جدا کن، ردیف‌های جمع کل میانی را حذف کن و یک ستون مجزا برای Notes بساز.»
                </code>
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      'این جدول کپی‌شده را به یک جدول کاملاً استاندارد و ماشین‌خوان CSV تبدیل کن: سلول‌های ادغام‌شده را در تمام ردیف‌ها پر کن، اعداد را از توضیحات متنی جدا کن، ردیف‌های جمع کل میانی را حذف کن و یک ستون مجزا برای Notes بساز.',
                      'clean_table_prompt'
                    )
                  }
                  className="px-3 py-1.5 rounded-lg bg-[#e0533c] text-white font-bold text-[11px] shrink-0 cursor-pointer"
                >
                  {copiedId === 'clean_table_prompt' ? 'کپی شد!' : 'کپی پرامپت'}
                </button>
              </div>
            </div>
          </details>
        </section>
      )}

      {(activeTab === 'all' || activeTab === 's1_markdown') && (
        <section className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] shadow-xs space-y-5">
          {/* Header + Projector Trigger */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#ecdcd8]/60 dark:border-[#382645]/60">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-lg bg-[#e0533c] text-white text-xs font-black shrink-0">۱-۳</span>
              <div>
                <h2 className="text-sm sm:text-base font-black text-[#261a1d] dark:text-[#faedf3]">
                  بخش دوم جلسه ۱: زبان Markdown (`.md`)؛ زبان مادری هوش مصنوعی و گیت‌هاب (۱ ساعت)
                </h2>
                <p className="text-xs text-[#755e66] dark:text-[#ad99ab]">
                  از تعریف پایه Markdown تا تسلط بر ۶ علامت کلیدی و قالب آماده دستورالعمل مهندسی
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openS1Projector('s1_markdown', 0)}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black flex items-center gap-1.5 border border-amber-700 border-b-[3px] border-b-amber-900 active:translate-y-[2px] active:border-b cursor-pointer shadow-xs shrink-0 self-start sm:self-center"
            >
              <Monitor className="w-4 h-4" />
              <span>حالت اسلاید پروژکتور (۷ اسلاید)</span>
            </button>
          </div>

          {/* Layer 1: Zero-to-One Definition of Markdown */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#fdf8f5] dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] space-y-3 text-xs">
            <span className="px-2.5 py-0.5 rounded-md bg-purple-600 text-white font-black text-[11px] inline-block">
              تعریف پایه از صفر · اصلاً Markdown چیست و چرا جایگزین Word شده است؟
            </span>
            <p className="text-xs sm:text-sm text-[#261a1d] dark:text-[#faedf3] leading-relaxed">
              <b>مارک‌داون (Markdown)</b> با پسوند <code>.md</code> ساده‌ترین استاندارد جهانی برای نوشتن متن ساختاریافته با کیبورد است. در نرم‌افزار Word، وقتی متنی را تیتر یا جدول می‌کنید، هزاران خط کد مخفی استایل و فونت پشت صحنه ذخیره می‌شود که برای هوش مصنوعی حکم «نویز و زباله» را دارد. اما در Markdown، شما با گذاشتن یک علامت مربع (<code>#</code>) قبل از جمله به هوش مصنوعی می‌گویید «این تیتر اصلی است» و با گذاشتن دو ستاره (<code>**مهم**</code>) می‌گویید «روی این کلمه تمرکز کن». تمام فایل‌های <b>GitHub (`README.md`)</b>، تمام <b>مهارت‌های کلود (`SKILL.md`)</b> و تمام یادداشت‌های <b>Obsidian</b> با همین فرمت نوشته می‌شوند!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] space-y-2">
                <h4 className="font-black text-xs sm:text-sm text-[#261a1d] dark:text-[#faedf3]">
                  تقلب‌نامه ۶ علامت طلایی Markdown (کل چیزی که نیاز دارید!)
                </h4>
                <div className="p-3 rounded-lg bg-[#1e1e1e] text-[#d4d4d4] font-mono text-[11px] space-y-1.5" dir="ltr">
                  <div><span className="text-emerald-400"># Title</span>         → تیتر اصلی سطح ۱ (H1)</div>
                  <div><span className="text-emerald-400">## Section</span>      → تیتر بخش سطح ۲ (H2)</div>
                  <div><span className="text-amber-300">**Bold Rule**</span>   → بولد و تاکید شدید روی قانون</div>
                  <div><span className="text-sky-400">- Item</span>          → بولت‌پوینت و لیست شروط</div>
                  <div><span className="text-pink-400">| A | B |</span>       → ساخت جدول ساختاریافته</div>
                  <div><span className="text-purple-300">---</span>             → خط افقی جداکننده بخش‌ها</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] space-y-2 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h4 className="font-black text-xs sm:text-sm text-[#261a1d] dark:text-[#faedf3]">
                    قالب آماده `README.md` برای اولین مخزن گیت‌هاب شما
                  </h4>
                  <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                    این فایل استاندارد را دانلود یا کپی کنید تا در ماژول بعدی (`۱-۴ گیت‌هاب`) مستقیماً در اولین Repository خود قرار دهید:
                  </p>
                  <pre dir="rtl" className="p-2.5 rounded-lg bg-[#fdf8f5] dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] font-mono text-[10px] max-h-28 overflow-y-auto whitespace-pre-wrap text-right">
                    {sessionCurriculum.readmeMd}
                  </pre>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => downloadTextFile('README.md', sessionCurriculum.readmeMd, 'text/markdown;charset=utf-8;')}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>دانلود فایل README.md</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(sessionCurriculum.readmeMd, 'sample_readme_md')}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-[#e0533c] hover:bg-[#c2410c] text-white font-bold text-[11px] flex items-center justify-center gap-1 cursor-pointer"
                  >
                    {copiedId === 'sample_readme_md' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'sample_readme_md' ? 'کپی شد!' : 'کپی متن Markdown'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Layer 2: Optional Deep-Dive Accordion */}
          <details className="group rounded-2xl border border-[#ecdcd8] dark:border-[#382645] bg-[#fdf8f5] dark:bg-[#16101c] overflow-hidden transition-all">
            <summary className="cursor-pointer list-none p-4 flex items-center justify-between font-bold text-xs sm:text-sm select-none hover:bg-[#fdeee9]/40 dark:hover:bg-[#341528]/40 transition-colors">
              <div className="flex items-center gap-2 text-[#261a1d] dark:text-[#faedf3]">
                <FileText className="w-4 h-4 text-purple-600 shrink-0" />
                <span>بسط اختیاری: چطور فایل‌های Word و PDF قدیمی را ۱۰۰٪ خودکار به Markdown تبدیل کنیم؟ + مفهوم YAML</span>
              </div>
              <span className="text-[11px] font-normal text-[#755e66] dark:text-[#ad99ab] flex items-center gap-1 group-open:text-[#e0533c] shrink-0">
                <span>مشاهده روش‌های تبدیل</span>
                <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
              </span>
            </summary>

            <div className="p-4 pt-3 border-t border-[#ecdcd8]/60 dark:border-[#382645]/60 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] space-y-1.5">
                <b className="text-[#261a1d] dark:text-[#faedf3] block">۱. تبدیل مستقیم در Google Docs (بدون هیچ ابزاری)</b>
                <p className="text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  فایل Word خود را در Google Docs باز کنید و از منوی بالا روی <code>File &gt; Download &gt; Markdown (.md)</code> کلیک کنید! گوگل داکس تمام تیترها و جداول شما را به یک فایل <code>.md</code> تمیز تبدیل می‌کند.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] space-y-1.5">
                <b className="text-[#261a1d] dark:text-[#faedf3] block">۲. شناسنامه بالای فایل (YAML Frontmatter) چیست؟</b>
                <p className="text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  در ابتدای فایل‌های حرفه‌ای Markdown (مثل <code>SKILL.md</code> در جلسه ۳)، چند خط بین دو علامت <code>---</code> نوشته می‌شود که شامل نام و شرط فعال‌سازی فایل برای هوش مصنوعی است.
                </p>
              </div>
            </div>
          </details>
        </section>
      )}

      {(activeTab === 'all' || activeTab === 's1_github') && (
        <section className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] shadow-xs space-y-5">
          {/* Header + Projector Trigger */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#ecdcd8]/60 dark:border-[#382645]/60">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-lg bg-[#e0533c] text-white text-xs font-black shrink-0">۱-۴</span>
              <div>
                <h2 className="text-sm sm:text-base font-black text-[#261a1d] dark:text-[#faedf3]">
                  بخش سوم جلسه ۱: گیت‌هاب (GitHub) از صفر مطلق به زبان دفتر فنی و کنترل مدارک (DCC) (۱.۵ ساعت)
                </h2>
                <p className="text-xs text-[#755e66] dark:text-[#ad99ab]">
                  {activeTrackMetaphor.githubFa} — بدون یک خط کدنویسی و ۱۰۰٪ با دکمه‌های گرافیکی وب
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openS1Projector('s1_github', 0)}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black flex items-center gap-1.5 border border-amber-700 border-b-[3px] border-b-amber-900 active:translate-y-[2px] active:border-b cursor-pointer shadow-xs shrink-0 self-start sm:self-center"
            >
              <Monitor className="w-4 h-4" />
              <span>حالت اسلاید پروژکتور (۹ اسلاید)</span>
            </button>
          </div>

          {/* Layer 1: Zero-to-One Definition of Git & GitHub */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#fdf8f5] dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] space-y-4 text-xs">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-[#261a1d] dark:bg-white text-white dark:text-[#16101c] font-black text-[11px]">
                تعریف پایه از صفر · اصلاً Git و GitHub چیستند و چرا ما در این دوره ۴ بار با آن کار می‌کنیم؟
              </span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-[#e0533c] dark:text-[#fb7185] hover:underline flex items-center gap-1"
              >
                <span>ورود به سایت github.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <p className="text-xs sm:text-sm text-[#261a1d] dark:text-[#faedf3] leading-relaxed">
              تصور کنید در دفتر فنی پروژه، ۵ مهندس روی یک دستورالعمل یا جدول کار می‌کنند و فایل‌ها را با نام‌های <code>Spec_Rev1.docx</code>، <code>Spec_Final_Ali.docx</code> و <code>Spec_New2.docx</code> برای هم می‌فرستند. بعد از یک هفته، هیچ‌کس نمی‌داند آخرین نسخه معتبر کدام است و چه کسی کدام بند را تغییر داده است! <b>GitHub</b> دقیقاً یک <b>سیستم کنترل مدارک ابری (DCC)</b> و «ماشین زمان فایل‌ها» است: هر پروژه یک زونکن رسمی دارد و هر تغییری با نام شخص، ساعت دقیق و رنگ‌بندی خطوط اضافه‌شده (سبز) و حذف‌شده (قرمز) ثبت می‌شود. در عصر هوش مصنوعی، <b>تمام مهارت‌های کلود (`SKILL.md`)، تمام سرورهای MCP و تمام داشبوردهای Artifacts روی GitHub نگهداری می‌شوند.</b>
            </p>

            {/* 6 Core Concepts Translated to Engineering DCC */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] space-y-1">
                <span className="font-mono font-black text-[#e0533c] dark:text-[#fb7185] block">1. Repository (Repo)</span>
                <b className="block text-[#261a1d] dark:text-[#faedf3]">معادل: زونکن و پرونده اصلی پروژه در DCC</b>
                <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  پوشه اصلی پروژه شما در گیت‌هاب که تمام فایل‌های Markdown، اسکیل‌ها، قالب‌ها و داشبوردها با تاریخچه کامل در آن قرار می‌گیرند.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] space-y-1">
                <span className="font-mono font-black text-[#c026d3] dark:text-[#e879f9] block">2. Commit (ثبت ریویژن)</span>
                <b className="block text-[#261a1d] dark:text-[#faedf3]">معادل: صدور ریویژن جدید (Rev.01 → Rev.02)</b>
                <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  ذخیره رسمی تغییر به همراه یک جمله توضیح (Commit Message) که مشخص می‌کند دقیقاً چه چیزی و به چه دلیلی اصلاح شد.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] space-y-1">
                <span className="font-mono font-black text-emerald-600 dark:text-emerald-400 block">3. Diff (مقایسه تغییرات)</span>
                <b className="block text-[#261a1d] dark:text-[#faedf3]">معادل: Redline و ابروگذاری تغییرات</b>
                <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  نمایش خودکار تفاوت دو ریویژن کنار هم؛ جملات حذف‌شده با رنگ قرمز و جملات جدید با رنگ سبز مشخص می‌شوند.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] space-y-1">
                <span className="font-mono font-black text-blue-600 dark:text-blue-400 block">4. Branch (شاخه موازی)</span>
                <b className="block text-[#261a1d] dark:text-[#faedf3]">معادل: نسخه چکنویس و آزمایشی (Draft)</b>
                <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  ایجاد یک کپی موازی از سند برای اعمال تغییرات آزمایشی، بدون اینکه نسخه اصلی مصوب (`main`) دستکاری یا خراب شود.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] space-y-1">
                <span className="font-mono font-black text-amber-600 dark:text-amber-400 block">5. Pull Request (PR)</span>
                <b className="block text-[#261a1d] dark:text-[#faedf3]">معادل: فرم درخواست تایید سرپرست (IFC)</b>
                <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  درخواست رسمی برای بررسی تغییرات شاخه چکنویس توسط مدیر فنی و ادغام (Merge) آن در نسخه اصلی پروژه.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] space-y-1">
                <span className="font-mono font-black text-purple-600 dark:text-purple-400 block">6. GitHub Pages</span>
                <b className="block text-[#261a1d] dark:text-[#faedf3]">معادل: تابلوی اعلانات و داشبورد آنلاین پروژه</b>
                <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  قابلیت رایگان تبدیل داشبوردهای ساخته‌شده با Claude Artifacts در مخزن شما به یک لینک وب زنده برای کارفرما.
                </p>
              </div>
            </div>

            {/* Visual Diagram: GitHub DCC Lifecycle */}
            <DiagramWrapper
              titleFa="دیاگرام چرخه مهندسی مدارک در گیت‌هاب: از شاخه چکنویس تا ریویژن و ابلاغ (IFC)"
              titleEn="Visual Flow: DCC Document Control Lifecycle via Git & GitHub"
              badgeFa="گردش کار تیمی"
              lang={lang}
            >
              <GitHubDccWorkflowDiagram lang={lang} />
            </DiagramWrapper>

            {/* Visual Diagram: Annotated Web UI Mockup for Beginners */}
            <DiagramWrapper
              titleFa="راهنمای تصویری صفحه گیت‌هاب: ۳ کلید حیاتی که هر مهندس در اولین ورود باید بداند"
              titleEn="Annotated GitHub Web UI: The 3 Essential Buttons Every Beginner Needs"
              badgeFa="راهنمای گام‌به‌گام"
              lang={lang}
            >
              <GitHubAnnotatedUiMockup lang={lang} />
            </DiagramWrapper>
          </div>

          {/* Layer 2: Optional Step-by-Step Hands-On Guide Accordion */}
          <details className="group rounded-2xl border border-[#ecdcd8] dark:border-[#382645] bg-[#fdf8f5] dark:bg-[#16101c] overflow-hidden transition-all">
            <summary className="cursor-pointer list-none p-4 flex items-center justify-between font-bold text-xs sm:text-sm select-none hover:bg-[#fdeee9]/40 dark:hover:bg-[#341528]/40 transition-colors">
              <div className="flex items-center gap-2 text-[#261a1d] dark:text-[#faedf3]">
                <GitBranch className="w-4 h-4 text-[#e0533c] shrink-0" />
                <span>بسط اختیاری: راهنمای گام‌به‌گام کارگاه عملی جلسه ۱ (ساخت اکانت، اولین Repo و ثبت اولین Commit در ۲۰ دقیقه)</span>
              </div>
              <span className="text-[11px] font-normal text-[#755e66] dark:text-[#ad99ab] flex items-center gap-1 group-open:text-[#e0533c] shrink-0">
                <span>مشاهده ۴ گام عملی</span>
                <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
              </span>
            </summary>

            <div className="p-4 pt-3 border-t border-[#ecdcd8]/60 dark:border-[#382645]/60 space-y-3 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] space-y-1">
                  <b className="text-[#e0533c] block">گام ۱: ساخت اکانت و کلیک روی New Repository</b>
                  <p className="text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    وارد <code>github.com</code> شوید، ثبت‌نام کنید و از گوشه بالا سمت راست روی علامت <code>+</code> و گزینه <b>New repository</b> کلیک کنید.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] space-y-1">
                  <b className="text-[#c026d3] block">گام ۲: نام‌گذاری مخزن و تیک Add a README file</b>
                  <p className="text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    در کادر Repository name عبارت <code>ai-engineering-hub</code> را بنویسید، حالت را روی <b>Private</b> (یا Public) بگذارید، حتماً تیک <b>Add a README file</b> را بزنید و دکمه سبز <b>Create repository</b> را بفشارید.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] space-y-1">
                  <b className="text-purple-600 block">گام ۳: ویرایش گرافیکی با آیکون مداد (✏️)</b>
                  <p className="text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    در صفحه مخزن جدیدتان، روی آیکون مداد (Edit file) در گوشه بالای فایل <code>README.md</code> کلیک کنید و متن قالب Markdown ماژول ۱-۳ را داخل آن Paste نمایید.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] space-y-1">
                  <b className="text-emerald-600 block">گام ۴: ثبت اولین ریویژن رسمی (Commit Changes)</b>
                  <p className="text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    روی دکمه سبز <b>Commit changes...</b> کلیک کنید، در کادر توضیح بنویسید <code>docs: init engineering AI constitution rev.01</code> و تایید کنید. اولین ریویژن شما ثبت شد!
                  </p>
                </div>
              </div>
            </div>
          </details>

          {/* Layer 3: GitHub Pages Static Deployment Guide & 404 Troubleshooting */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#f8fafc] via-white to-blue-50/40 dark:from-[#161b22] dark:via-[#1c2128] dark:to-blue-950/20 border-2 border-blue-500/30 dark:border-blue-500/20 shadow-xs space-y-4 text-xs">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-blue-500/20">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 font-black">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-[#1c2830] dark:text-[#e8ebe9]">
                    کاربرد گیت‌هاب برای دیپلوی پروژه‌های استاتیک و دریافت لینک مستقیم (GitHub Pages)
                  </h3>
                  <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                    انتشار رایگان وبسایت و داشبورد مهندسی روی دامنه اینترنتی رایگان بدون نیاز به هاست و سرور
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shrink-0 self-start sm:self-center">
                سرویس رایگان GitHub Pages
              </span>
            </div>

            <p className="text-xs text-[#261a1d] dark:text-[#faedf3] leading-relaxed">
              برای دیپلوی کردن پروژه روی گیت‌هاب و دریافت لینک مستقیم (URL)، باید از سرویس رایگان <b>GitHub Pages</b> استفاده کنید. نحوه انجام این کار بسته به اینکه پروژه شما شامل فایل‌های استاتیک ساده است یا با ابزارهایی مثل Vite / React ساخته شده، متفاوت است.
            </p>

            {/* Step-by-step for Simple Static Projects */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#12161c] border border-blue-500/20 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-extrabold text-[11px]">بخش ۱</span>
                <h4 className="font-bold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                  پروژه‌های استاتیک ساده (HTML, CSS, JavaScript)
                </h4>
              </div>
              <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                اگر پروژه شما نیاز به Build گرفتن ندارد و فایل <code className="text-blue-600 font-mono font-bold">index.html</code> مستقیماً در پوشه اصلی قرار دارد:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#1a212d] border border-black/5 dark:border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400">
                    <span className="w-5 h-5 rounded-full bg-blue-600/10 flex items-center justify-center text-[11px]">۱</span>
                    <span>آپلود کدها در گیت‌هاب</span>
                  </div>
                  <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    یک ریپازیتوری با وضعیت <b>Public</b> در گیت‌هاب بسازید و فایل‌های پروژه را در آن Push کنید (مطمئن شوید فایل <code>index.html</code> دقیقاً در ریشه یا Root پروژه باشد، نه داخل یک پوشه فرعی).
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#1a212d] border border-black/5 dark:border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400">
                    <span className="w-5 h-5 rounded-full bg-blue-600/10 flex items-center justify-center text-[11px]">۲</span>
                    <span>ورود به تنظیمات</span>
                  </div>
                  <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    در صفحه ریپازیتوری خود در گیت‌هاب، از نوار بالا روی تب <b>Settings</b> کلیک کنید.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#1a212d] border border-black/5 dark:border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400">
                    <span className="w-5 h-5 rounded-full bg-blue-600/10 flex items-center justify-center text-[11px]">۳</span>
                    <span>بخش Pages</span>
                  </div>
                  <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    از منوی سمت چپ (در بخش Code and automation)، گزینه <b>Pages</b> را انتخاب کنید.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#1a212d] border border-black/5 dark:border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400">
                    <span className="w-5 h-5 rounded-full bg-blue-600/10 flex items-center justify-center text-[11px]">۴</span>
                    <span>تنظیم برنچ</span>
                  </div>
                  <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    • در قسمت Build and deployment، گزینه Source را روی <b>Deploy from a branch</b> بگذارید.<br />
                    • در بخش Branch، برنچ اصلی خود (معمولاً <code>main</code> یا <code>master</code>) و پوشه را روی <b>/(root)</b> قرار داده و دکمه <b>Save</b> را بزنید.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#1a212d] border border-black/5 dark:border-white/5 space-y-1 sm:col-span-2 lg:col-span-2">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                    <span className="w-5 h-5 rounded-full bg-emerald-600/10 flex items-center justify-center text-[11px]">۵</span>
                    <span>دریافت URL زنده وبسایت</span>
                  </div>
                  <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    حدود ۱ تا ۲ دقیقه صبر کنید و صفحه را رفرش کنید. در بالای همان صفحه Pages، لینک سایت شما با ساختار زیر نمایش داده می‌شود:
                  </p>
                  <div className="mt-1 p-2 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono font-bold text-xs dir-ltr text-left">
                    https://&lt;username&gt;.github.io/&lt;repository-name&gt;/
                  </div>
                </div>
              </div>
            </div>

            {/* Critical Warning: index.html exact naming */}
            <div className="p-4 rounded-xl bg-amber-500/10 border-2 border-amber-500/30 text-amber-900 dark:text-amber-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-amber-800 dark:text-amber-300">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>نکته بسیار حیاتی: نام دقیق فایل ورودی باید index.html باشد</span>
              </div>
              <p className="text-[11px] sm:text-xs leading-relaxed">
                گیت‌هاب برای بارگذاری خودکار صفحه در آدرس اصلی ریپازیتوری، منحصراً به فایلی با نام دقیق <code className="bg-amber-500/20 px-1.5 py-0.5 rounded font-mono font-bold">index.html</code> (با تمام حروف کوچک انگلیسی) نیاز دارد. در صورتی که فایل شما با نام‌های دیگر یا فارسی (مثلاً <code className="bg-amber-500/20 px-1.5 py-0.5 rounded font-mono">کارگاه شماره سه-عباس عسگری.html</code>) ذخیره شده باشد، گیت‌هاب قادر به شناسایی آن به عنوان فایل ریشه نیست.
              </p>
            </div>

            {/* 404 Troubleshooting Guide */}
            <div className="p-4 rounded-xl bg-rose-500/10 border-2 border-rose-500/30 text-rose-950 dark:text-rose-200 space-y-3">
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-rose-700 dark:text-rose-300">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>راهنمای رفع خطای رایج «404 File not found» در GitHub Pages</span>
              </div>
              <p className="text-[11px] sm:text-xs leading-relaxed text-[#4a5568] dark:text-[#cbd5e1]">
                خطای <b>404 File not found</b> در GitHub Pages به این معناست که سرور گیت‌هاب نمی‌تواند فایل ورودی <code className="font-mono font-bold">index.html</code> را در مسیر و شاخه‌ای (Branch) که در تنظیمات مشخص کرده‌اید، پیدا کند. برای برطرف کردن این مشکل، موارد زیر را به‌ترتیب بررسی و اعمال کنید:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-lg bg-white dark:bg-[#1a1215] border border-rose-500/20 space-y-1.5">
                  <b className="text-rose-600 dark:text-rose-400 text-xs block">
                    ۱. بررسی شاخه (Branch) و مسیر انتخابی در تنظیمات
                  </b>
                  <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    شایع‌ترین دلیل این خطا، ست نبودن شاخه دیپلوی با شاخه حاوی فایل‌های اجرایی است:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                    <li>وارد ریپازیتوری خود در سایت GitHub شوید.</li>
                    <li>از تب‌های بالا به <b>Settings</b> و سپس از منوی کناری به بخش <b>Pages</b> بروید.</li>
                    <li>در بخش Build and deployment:
                      <ul className="list-disc list-inside ms-3 mt-1 space-y-0.5">
                        <li>اگر از دستور <code className="font-mono">npm run deploy</code> (پکیج gh-pages) استفاده کرده‌اید، منوی کشویی Branch را از <code className="font-mono">main</code> به <code className="font-mono font-bold">gh-pages</code> تغییر دهید و پوشه را روی <code className="font-mono">/(root)</code> بگذارید.</li>
                        <li>اگر پروژه‌تان صرفاً فایل‌های خام HTML/CSS است، برنچ را روی <code className="font-mono font-bold">main</code> و مسیر را روی <code className="font-mono">/(root)</code> قرار دهید.</li>
                      </ul>
                    </li>
                    <li>روی دکمه <b>Save</b> کلیک کنید.</li>
                  </ol>
                </div>

                <div className="p-3.5 rounded-lg bg-white dark:bg-[#1a1215] border border-rose-500/20 space-y-1.5">
                  <b className="text-rose-600 dark:text-rose-400 text-xs block">
                    ۲. بررسی محل و نام فایل index.html
                  </b>
                  <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    سرور لینوکسی گیت‌هاب به حروف بزرگ و کوچک و موقعیت فایل‌ها بسیار حساس است:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                    <li>نام فایل باید <b>دقیقاً با تمام حروف کوچک</b> <code className="font-mono font-bold">index.html</code> باشد (نه <code className="font-mono line-through">Index.html</code> یا <code className="font-mono line-through">main.html</code>).</li>
                    <li>فایل <code className="font-mono font-bold">index.html</code> باید <b>مستقیماً در ریشه (Root)</b> همان شاخه‌ای باشد که در تنظیمات Pages مشخص کرده‌اید. اگر فایل‌ها داخل یک ساب‌فولدر قرار دارند، گیت‌هاب در آدرس اصلی ریپازیتوری چیزی پیدا نمی‌کند.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2-1: WHAT IS A PROMPT? (DEFINITION & ANATOMY) */}
      {(activeTab === 'all' || activeTab === 'prompt_definition') && (
        <section className="space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#e0533c]/10 text-[#e0533c] dark:text-[#fb7185]">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span dir="ltr" className="px-2 py-0.5 rounded-md bg-[#e0533c] text-white text-xs font-black">۲-۱</span>
                  <h2 className="text-base sm:text-lg font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa'
                      ? 'پرامپت (Prompt) چیست؟ تعریف، منطق کار و تفاوت دستور خام با دستور حرفه‌ای'
                      : 'What is a Prompt? Definition, Mechanics & Anatomy'}
                  </h2>
                </div>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                  {lang === 'fa'
                    ? 'پیش از شناخت ابزارها و فرمول‌ها، باید بدانیم هوش مصنوعی چگونه دستور ما را می‌فهمد و چرا کیفیت ورودی تعیین‌کننده کیفیت خروجی است.'
                    : 'Before picking tools or frameworks, understand how LLMs interpret your input and why input clarity dictates output precision.'}
                </p>
              </div>
            </div>
          </div>

          {/* Core Definition Hero Card */}
          <div className="p-1.5 rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
            <div className="rounded-[calc(1.5rem-0.375rem)] bg-white dark:bg-[#161e24] p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              <div className="lg:col-span-7 space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#e0533c]/10 text-[#e0533c] dark:text-[#fb7185] border border-[#e0533c]/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === 'fa' ? 'تعریف بنیادین پرامپت (Prompt)' : 'Core Definition of a Prompt'}</span>
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#1c2830] dark:text-[#e8ebe9] leading-snug">
                  {lang === 'fa'
                    ? 'پرامپت یعنی «دستورالعمل، مسئله، داده و چارچوبی که به هوش مصنوعی می‌دهید» تا دقیقاً پاسخ مطلوب شما را تولید کند.'
                    : 'A Prompt is the instruction, context, data, and constraints you give an AI model to shape its exact response.'}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  {lang === 'fa'
                    ? 'برخلاف جستجوی گوگل که فقط دنبال کلمات کلیدی می‌گردد، مدل زبانی بزرگ (LLM) کل نیت، نقش، داده‌های زمینه‌ای و قالب مورد انتظار شما را تحلیل می‌کند. هوش مصنوعی ذهن‌خوان نیست؛ هر جزئیاتی که در پرامپت ننویسید را خودش حدس می‌زند (و همین ریشه کلی‌گویی یا خطاست).'
                    : 'Unlike traditional keyword search, an LLM reads intent, persona, situational background, and output rules. AI cannot read your mind—any context omitted from the prompt gets guessed.'}
                </p>
              </div>

              <div className="lg:col-span-5 p-4 rounded-2xl bg-gradient-to-br from-[#fdeee9] via-[#fff7f3] to-[#f8f0fc] dark:from-[#2c1523] dark:via-[#221629] dark:to-[#1a1626] border border-[#e0533c]/25 space-y-2.5">
                <div className="text-xs font-black text-[#e0533c] dark:text-[#fb7185]">
                  {lang === 'fa' ? 'معادله طلایی کیفیت پاسخ AI:' : 'The AI Output Quality Equation:'}
                </div>
                <div className="p-3 rounded-xl bg-white/90 dark:bg-[#12171b] border border-black/[0.06] dark:border-white/[0.08] text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed">
                  {lang === 'fa'
                    ? 'پرامپت مبهم (۱ خطی) ← پاسخ عمومی، تکراری یا همراه با حدس و خطا'
                    : 'Vague 1-line prompt -> Generic, guesswork-heavy output'}
                </div>
                <div className="p-3 rounded-xl bg-[#ecfdf5] dark:bg-[#10241b] border border-[#34d399]/40 text-xs font-bold text-[#047857] dark:text-[#34d399] leading-relaxed">
                  {lang === 'fa'
                    ? 'پرامپت مهندسی‌شده (دستور + زمینه + قید + قالب) ← خروجی دقیق، قابل ممیزی و آماده اجرا'
                    : 'Structured prompt (Instruction + Context + Constraints + Format) -> Actionable, auditable output'}
                </div>
              </div>
            </div>
          </div>

          {/* 3 Levels of Prompting */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl border border-[#d9dad5] dark:border-[#2d3942] bg-white dark:bg-[#1a2228] shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {lang === 'fa' ? 'سطح ۱ · ساده' : 'Level 1 · Basic'}
                </span>
                <span className="font-mono text-[10px] text-[#5d6b73] dark:text-[#9aa8b0]">Zero-Shot</span>
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                {lang === 'fa' ? 'پرامپت مستقیم بدون نمونه' : 'Direct Zero-Shot Prompt'}
              </h4>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa'
                  ? 'یک درخواست کوتاه بدون مثال یا داده کمکی (مثلاً: «یک چک‌لیست ایمنی کارگاه بنویس»). برای پرسش‌های عمومی سریع است اما در کار سازمانی دقیق نیست.'
                  : 'A direct ask without examples or background (e.g., "Write a site safety checklist"). Fast for trivia, too vague for enterprise work.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-[#d9dad5] dark:border-[#2d3942] bg-white dark:bg-[#1a2228] shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#c026d3]/10 text-[#c026d3] dark:text-[#e879f9]">
                  {lang === 'fa' ? 'سطح ۲ · الگو محور' : 'Level 2 · Pattern'}
                </span>
                <span className="font-mono text-[10px] text-[#5d6b73] dark:text-[#9aa8b0]">Few-Shot</span>
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                {lang === 'fa' ? 'پرامپت همراه با ۱ تا ۳ نمونه واقعی' : 'Few-Shot Prompting'}
              </h4>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa'
                  ? 'در کنار دستور، ۱ یا ۲ نمونه از نامه، جدول یا گزارش استاندارد سازمان خود را می‌گذارید تا هوش مصنوعی دقیقاً لحن و ساختار شما را تقلید کند.'
                  : 'Provide 1-3 real examples alongside your instruction so the model mirrors your exact corporate tone and schema.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-[#e0533c]/35 bg-[#fdeee9]/40 dark:bg-[#2a1522]/40 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#e0533c] text-white">
                  {lang === 'fa' ? 'سطح ۳ · استاندارد دوره' : 'Level 3 · Course Standard'}
                </span>
                <span className="font-mono text-[10px] text-[#e0533c] dark:text-[#fb7185]">Prompt Engineering</span>
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                {lang === 'fa' ? 'مهندسی پرامپت ساختاریافته (RCTO)' : 'Structured Prompt Engineering'}
              </h4>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa'
                  ? 'ترکیب شفاف نقش، بافت واقعی، وظیفه دقیق، قیدهای عدم توهم («اگر نبود بنویس نامشخص») و فرمت خروجی؛ فرمولی که در بخش ۲-۲ یاد می‌گیرید.'
                  : 'Combines Role, Context, Task, anti-hallucination guardrails, and exact Output schema—covered step-by-step in 2-2.'}
              </p>
            </div>
          </div>

          {/* Bridge Action Bar to RCTO (2-2) & Sandbox */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="text-xs text-[#1c2830] dark:text-[#e8ebe9] font-medium">
              {lang === 'fa'
                ? 'آماده‌اید فرمول ۴ مرحله‌ای نوشتن یک پرامپت بی‌نقص را یاد بگیرید؟'
                : 'Ready to learn the 4-pillar formula for writing bulletproof prompts?'}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  loadPromptToSandbox(
                    lang === 'fa'
                      ? 'نقش: تو یک دستیار تحلیلگر حرفه‌ای هستی.\nزمینه: داده‌های خام جلسه یا گزارش زیر در اختیار توست.\nوظیفه: فقط بر اساس متن داده‌شده، ۳ نکته کلیدی و جدول اکشن‌آیتم‌ها را استخراج کن. اگر اطلاعاتی در متن نیست، حدس نزن و بنویس «نامشخص».\nقالب خروجی: جدول ۴ ستونه [موضوع | مسئول | مهلت | اولویت].'
                      : 'Role: Senior analyst.\nContext: Raw meeting notes below.\nTask: Extract 3 takeaways and an action-item table strictly from the text; mark missing fields as "Unspecified".\nOutput: 4-column table [Topic | Owner | Due | Priority].'
                  )
                }
                className="px-4 py-2 rounded-full bg-white dark:bg-[#201729] hover:bg-orange-50 border border-gray-300 dark:border-[#382645] text-xs font-bold text-[#0A101D] dark:text-[#faedf3] flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer active:scale-95"
              >
                <Play className="w-3.5 h-3.5 text-[#e0533c]" />
                <span>{lang === 'fa' ? 'تست نمونه پرامپت در سندباکس' : 'Try Sample in Sandbox'}</span>
              </button>
              <button
                type="button"
                onClick={() => handleTabClick('prompting', undefined, true)}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-[#e0533c] to-[#c026d3] hover:from-[#c2410c] hover:to-[#9333ea] text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer active:scale-95"
              >
                <span>{lang === 'fa' ? 'گام بعدی ۲-۲: فرمول طلایی مهندسی پرامپت (RCTO)' : 'Next 2-2: Golden RCTO Formula'}</span>
                {lang === 'fa' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2-2: THE RCTO PROMPTING FRAMEWORK */}
      {(activeTab === 'all' || activeTab === 'prompting') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#9333ea]/10 text-[#9333ea] dark:text-[#6ee7b7]">
                <Zap className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span dir="ltr" className="px-2 py-0.5 rounded-md bg-[#9333ea] text-white text-xs font-black">۲-۲</span>
                  <h2 className="text-base sm:text-lg font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? 'فرمول طلایی پرامپت‌نویسی حرفه‌ای (چهارضلعی R-C-T-O)' : 'The Gold Standard RCTO Prompting Formula'}
                  </h2>
                </div>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                  {lang === 'fa'
                    ? 'دیگر پرامپت‌های مبهم و کلی ننویسید. با رعایت این ۴ رکن، هوش مصنوعی دقیقاً همان خروجی مدنظر شما را تولید می‌کند.'
                    : 'Stop writing vague prompts. Follow the 4 core pillars to command high-precision responses.'}
                </p>
              </div>
            </div>
          </div>

          {/* Visual Diagram: RCTO Framework */}
          <DiagramWrapper
            titleFa="اینفوگرافیک تصویری: ساختار چهارضلعی فرمول طلایی RCTO"
            titleEn="Visual Infographic: The 4 Pillars of RCTO Prompting"
            badgeFa="چارچوب استاندارد"
            lang={lang}
          >
            <RctoFrameworkDiagram lang={lang} />
          </DiagramWrapper>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* R - Role */}
            <div className="p-4 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 rounded-lg bg-[#e0533c] text-white font-extrabold text-sm flex items-center justify-center">
                  R
                </span>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? 'نقش (Role)' : 'Role'}
                  </h3>
                  <span className="text-[10px] text-[#5d6b73] dark:text-[#9aa8b0]">
                    {lang === 'fa' ? 'مدل چه کلاه‌داری است؟' : 'Who is the model?'}
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa'
                  ? 'تعیین شخصیت و سطح تخصص هوش مصنوعی. به آن بگویید در جایگاه چه کسی فکر کند.'
                  : 'Assign persona and domain expertise. Tell the AI which expert shoes to step into.'}
              </p>
              <div className="mt-3 p-2 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b] text-[11px] font-mono text-[#e0533c] dark:text-[#fb7185]">
                {lang === 'fa' ? activeRctoPillars.roleFa : activeRctoPillars.roleEn}
              </div>
            </div>

            {/* C - Context */}
            <div className="p-4 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 rounded-lg bg-[#c026d3] text-white font-extrabold text-sm flex items-center justify-center">
                  C
                </span>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? 'زمینه (Context)' : 'Context'}
                  </h3>
                  <span className="text-[10px] text-[#5d6b73] dark:text-[#9aa8b0]">
                    {lang === 'fa' ? 'وضع موجود و پیش‌نیازها' : 'Background & Situation'}
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa'
                  ? 'توصیف شرکت، بازار هدف، محدودیت‌های زمانی و داده‌های ورودی. هوش مصنوعی ذهن‌خوانی بلد نیست.'
                  : 'Describe organizational background, audience, and constraints. Never assume the AI knows.'}
              </p>
              <div className="mt-3 p-2 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b] text-[11px] font-mono text-[#c026d3] dark:text-[#6ee7b7]">
                {lang === 'fa' ? activeRctoPillars.contextFa : activeRctoPillars.contextEn}
              </div>
            </div>

            {/* T - Task */}
            <div className="p-4 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 rounded-lg bg-[#b87333] text-white font-extrabold text-sm flex items-center justify-center">
                  T
                </span>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? 'وظیفه (Task)' : 'Task'}
                  </h3>
                  <span className="text-[10px] text-[#5d6b73] dark:text-[#9aa8b0]">
                    {lang === 'fa' ? 'دستور کار صریح و افعال شفاف' : 'Actionable Directive'}
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa'
                  ? 'دستور شفاف و قابل ارزیابی بدون ابهام. از افعال مشخص مثل «اولویت‌بندی کن»، «استخراج کن» استفاده کنید.'
                  : 'Unambiguous directive with sharp action verbs: "Categorize", "Synthesize", "Prioritize".'}
              </p>
              <div className="mt-3 p-2 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b] text-[11px] font-mono text-[#b87333] dark:text-[#e0a96d]">
                {lang === 'fa' ? activeRctoPillars.taskFa : activeRctoPillars.taskEn}
              </div>
            </div>

            {/* O - Output */}
            <div className="p-4 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 rounded-lg bg-[#2f7d5b] text-white font-extrabold text-sm flex items-center justify-center">
                  O
                </span>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? 'قالب خروجی (Output)' : 'Output & Format'}
                  </h3>
                  <span className="text-[10px] text-[#5d6b73] dark:text-[#9aa8b0]">
                    {lang === 'fa' ? 'لحن، ساختار و محدودیت کلمات' : 'Structure, Tone & Style'}
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa'
                  ? 'مشخص کردن نوع ارائه: جدول، بولت‌پوینت، کد JSON، زبان فارسی صمیمی یا رسمی، و حد طول پاسخ.'
                  : 'Format specification: Markdown table, bullet points, corporate tone, length limits.'}
              </p>
              <div className="mt-3 p-2 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b] text-[11px] font-mono text-[#2f7d5b] dark:text-[#63c496]">
                {lang === 'fa' ? activeRctoPillars.outputFa : activeRctoPillars.outputEn}
              </div>
            </div>
          </div>

          {/* Before vs After Interactive Showcase */}
          <div className="rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-[#fbbf24]" />
                {lang === "fa" ? "مقایسه عینی: پرامپت ضعیف در برابر پرامپت مهندسی‌شده" : "Side-by-Side: Weak vs. High-Performance Prompt"}
              </span>

              <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-[#e0533c]/10 text-[#e0533c] dark:text-[#fb7185] self-start sm:self-auto border border-[#e0533c]/20">
                {lang === "fa" ? `دیسیپلین شما: ${discMeta.titleFa}` : `Discipline: ${discMeta.titleEn}`}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bad Prompt */}
              <div className="p-4 rounded-xl bg-[#fdf2f2] dark:bg-[#2a1715] border border-[#f87171]/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#b91c1c] dark:text-[#f87171] flex items-center gap-1">
                    <span>✕</span>
                    <span>
                      {lang === "fa" ? `پرامپت ضعیف و مبهم در دیسیپلین ${discMeta.shortTitleFa}` : `Weak Prompt in ${discMeta.shortTitleEn}`}
                    </span>
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-white dark:bg-[#1a1515] font-sans text-xs text-[#b91c1c] dark:text-[#fca5a5] leading-relaxed">
                  {lang === "fa" ? disciplinePromptPair.weakPromptFa : disciplinePromptPair.weakPromptEn}
                </div>
                <p className="text-[11px] text-[#7f1d1d] dark:text-[#fca5a5] leading-relaxed">
                  {lang === "fa" ? disciplinePromptPair.weakCritiqueFa : disciplinePromptPair.weakCritiqueEn}
                </p>
              </div>

              {/* Good Prompt */}
              <div className="p-4 rounded-xl bg-[#ecfdf5] dark:bg-[#10241b] border border-[#34d399]/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#047857] dark:text-[#34d399] flex items-center gap-1">
                    <span>✓</span>
                    <span>
                      {lang === "fa" ? `پرامپت مهندسی‌شده RCTO در ${discMeta.shortTitleFa}` : `Engineered RCTO Prompt (${discMeta.shortTitleEn})`}
                    </span>
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        lang === "fa" ? disciplinePromptPair.engineeredPromptFa : disciplinePromptPair.engineeredPromptEn,
                        "demo_disc_prompt"
                      )
                    }
                    className="text-[10px] font-semibold text-[#047857] dark:text-[#34d399] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {copiedId === "demo_disc_prompt" ? (
                      <>
                        <Check className="w-3 h-3 text-[#059669]" />
                        <span>{lang === "fa" ? "کپی شد" : "Copied"}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>{lang === "fa" ? "کپی پرامپت دیسیپلین" : "Copy"}</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3 rounded-lg bg-white dark:bg-[#132b20] font-sans text-xs text-[#065f46] dark:text-[#a7f3d0] leading-relaxed space-y-1">
                  <div>
                    <span className="font-bold text-[#e0533c] dark:text-[#fb7185] font-mono">[Role] </span>
                    <span>{lang === "fa" ? disciplinePromptPair.engineeredBreakdownFa.role : disciplinePromptPair.engineeredBreakdownEn.role}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#c026d3] dark:text-[#6ee7b7] font-mono">[Context] </span>
                    <span>{lang === "fa" ? disciplinePromptPair.engineeredBreakdownFa.context : disciplinePromptPair.engineeredBreakdownEn.context}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#b87333] dark:text-[#e0a96d] font-mono">[Task] </span>
                    <span>{lang === "fa" ? disciplinePromptPair.engineeredBreakdownFa.task : disciplinePromptPair.engineeredBreakdownEn.task}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#2f7d5b] dark:text-[#63c496] font-mono">[Output] </span>
                    <span>{lang === "fa" ? disciplinePromptPair.engineeredBreakdownFa.output : disciplinePromptPair.engineeredBreakdownEn.output}</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#065f46] dark:text-[#6ee7b7] leading-relaxed">
                  {lang === "fa"
                    ? `مزیت: مدل دقیقاً با ضوابط ${discMeta.governingStandardsFa[0]} و شاخص‌های دیسیپلین پاسخ می‌دهد و نیازی به رفت و برگشت نیست.`
                    : `Advantage: The LLM complies directly with ${discMeta.governingStandardsEn[0]} and discipline KPIs with zero hallucination.`}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2-3: AI GIANTS & PROMINENT GLOBAL LLMs (WITH LOGOS & LINKS) */}
      {(activeTab === 'all' || activeTab === 'tools') && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#c026d3]/10 text-[#c026d3] dark:text-[#fb7185]">
                <Bot className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span dir="ltr" className="px-2 py-0.5 rounded-md bg-[#c026d3] text-white text-xs font-black">۲-۳</span>
                  <h2 className="text-base sm:text-lg font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa'
                      ? 'غول‌های هوش مصنوعی و مدل‌های زبانی مطرح (لینک مستقیم و لوگو)'
                      : 'AI Giants & Prominent LLM Platforms (Direct Links & Logos)'}
                  </h2>
                </div>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                  {lang === 'fa'
                    ? 'سه غول اصلی (ChatGPT، Claude، Gemini) در کنار مدل‌های قدرتمند جهانی مثل DeepSeek، Qwen، Perplexity، Grok و Mistral برای انتخاب هوشمندانه ابزار.'
                    : 'The Big 3 platforms (ChatGPT, Claude, Gemini) alongside DeepSeek, Qwen, Perplexity, Grok, Mistral, and Meta Llama.'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* ChatGPT Card */}
            <div className="group/card p-1.5 rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="h-full rounded-[calc(1.5rem-0.375rem)] bg-white dark:bg-[#161e24] p-5 flex flex-col justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-2xl bg-[#e3f6f0] dark:bg-[#10a37f]/20 border border-[#10a37f]/30 flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 spin-gear-chatgpt" aria-label="ChatGPT">
                          <g transform="translate(12 12)" fill="none" stroke="#10A37F" strokeWidth="1.9">
                            <ellipse cy="-5.5" rx="3.6" ry="6.5" />
                            <ellipse cy="-5.5" rx="3.6" ry="6.5" transform="rotate(60)" />
                            <ellipse cy="-5.5" rx="3.6" ry="6.5" transform="rotate(120)" />
                            <ellipse cy="-5.5" rx="3.6" ry="6.5" transform="rotate(180)" />
                            <ellipse cy="-5.5" rx="3.6" ry="6.5" transform="rotate(240)" />
                            <ellipse cy="-5.5" rx="3.6" ry="6.5" transform="rotate(300)" />
                          </g>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-[#1c2830] dark:text-[#e8ebe9]">ChatGPT</h3>
                        <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">OpenAI</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#10a37f]/10 text-[#10a37f] border border-[#10a37f]/20">
                      {lang === 'fa' ? 'همه‌فن‌حریف و جامع' : 'Most Versatile'}
                    </span>
                  </div>

                  <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    {lang === 'fa'
                      ? 'بهترین ابزار عمومی با پشتیبانی از وب‌سرچ زنده، اجرای کدهای پایتون، تحلیل پیشرفته داده‌ها، ساخت عکس و اکوسیستم وسیع افزونه‌ها (Custom GPTs).'
                      : 'The most popular all-rounder with live web browsing, Python code execution, advanced data analytics, image generation, and Custom GPTs.'}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-[#d9dad5]/60 dark:border-[#2d3942]/60 text-xs">
                    <div className="flex items-center gap-1.5 text-[#1c2830] dark:text-[#e8ebe9]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10a37f] shrink-0" />
                      <span>{lang === 'fa' ? 'مدل‌های کلیدی: GPT-4o, GPT-4o mini, o1' : 'Key Models: GPT-4o, 4o-mini, o1'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#1c2830] dark:text-[#e8ebe9]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10a37f] shrink-0" />
                      <span>{lang === 'fa' ? 'قابلیت شاخص: تحلیل فایل اکسل و پروژه‌ها' : 'Feature: Code Interpreter & Projects'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#1c2830] dark:text-[#e8ebe9]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10a37f] shrink-0" />
                      <span>{lang === 'fa' ? 'ثبت‌نام ساده با جیمیل یا مایکروسافت' : 'Easy signup with Google/Microsoft'}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#d9dad5]/60 dark:border-[#2d3942]/60 space-y-2">
                  <button
                    type="button"
                    onClick={() => openCompanionWindow('https://chatgpt.com', 'chatgpt_companion')}
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#10a37f] hover:bg-[#0e8e6e] active:scale-[0.97] text-white text-xs font-semibold shadow-xs transition-all duration-150 cursor-pointer"
                  >
                    <span>{lang === 'fa' ? 'ورود به ChatGPT در پنجره کناری' : 'Open ChatGPT in Side Window'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="https://chatgpt.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className="block text-center text-[11px] font-mono text-[#10a37f] hover:underline"
                  >
                    chatgpt.com ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Claude Card */}
            <div className="group/card p-1.5 rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="h-full rounded-[calc(1.5rem-0.375rem)] bg-white dark:bg-[#161e24] p-5 flex flex-col justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-2xl bg-[#fdeee6] dark:bg-[#d97706]/20 border border-[#d97706]/30 flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 spin-gear-claude" aria-label="Claude">
                          <g transform="translate(12 12)" stroke="#D97757" strokeWidth="2.4" strokeLinecap="round">
                            <line y1="-3" y2="-11" />
                            <line y1="-3" y2="-9" transform="rotate(30)" />
                            <line y1="-3" y2="-11" transform="rotate(60)" />
                            <line y1="-3" y2="-9" transform="rotate(90)" />
                            <line y1="-3" y2="-11" transform="rotate(120)" />
                            <line y1="-3" y2="-9" transform="rotate(150)" />
                            <line y1="-3" y2="-11" transform="rotate(180)" />
                            <line y1="-3" y2="-9" transform="rotate(210)" />
                            <line y1="-3" y2="-11" transform="rotate(240)" />
                            <line y1="-3" y2="-9" transform="rotate(270)" />
                            <line y1="-3" y2="-11" transform="rotate(300)" />
                            <line y1="-3" y2="-9" transform="rotate(330)" />
                          </g>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-[#1c2830] dark:text-[#e8ebe9]">Claude</h3>
                        <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">Anthropic</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#d97706]/10 text-[#d97706] border border-[#d97706]/20">
                      {lang === 'fa' ? 'پادشاه نگارش و کد' : 'Top Writing & Code'}
                    </span>
                  </div>

                  <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    {lang === 'fa'
                      ? 'بهترین کیفیت درک و تولید متن فارسی طبیعی، کدنویسی، تحلیل داکیومنت‌های بزرگ و شاهکار آرتیفکت‌ها (Artifacts) برای پیش‌نمایش زنده وب و اسناد.'
                      : 'Unmatched nuance, superior coding, large document comprehension, and interactive Artifacts for side-by-side previews.'}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-[#d9dad5]/60 dark:border-[#2d3942]/60 text-xs">
                    <div className="flex items-center gap-1.5 text-[#1c2830] dark:text-[#e8ebe9]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#d97706] shrink-0" />
                      <span>{lang === 'fa' ? 'مدل‌های کلیدی: Claude 3.5 Sonnet, Haiku' : 'Key Models: Claude 3.5 Sonnet, Haiku'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#1c2830] dark:text-[#e8ebe9]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#d97706] shrink-0" />
                      <span>{lang === 'fa' ? 'قابلیت شاخص: آرتیفکت‌های تعاملی و Projects' : 'Feature: Interactive Artifacts & Projects'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#1c2830] dark:text-[#e8ebe9]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#d97706] shrink-0" />
                      <span>{lang === 'fa' ? 'پنجره ورودی ۲۰۰ هزار توکنی (یک کتاب کامل)' : '200K token context window'}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#d9dad5]/60 dark:border-[#2d3942]/60 space-y-2">
                  <button
                    type="button"
                    onClick={() => openCompanionWindow('https://claude.ai', 'claude_companion')}
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#b45309] hover:bg-[#92400e] active:scale-[0.97] text-white text-xs font-semibold shadow-xs transition-all duration-150 cursor-pointer"
                  >
                    <span>{lang === 'fa' ? 'ورود به Claude در پنجره کناری' : 'Open Claude in Side Window'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="https://claude.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className="block text-center text-[11px] font-mono text-[#b45309] dark:text-[#fbbf24] hover:underline"
                  >
                    claude.ai ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Gemini Card */}
            <div className="group/card p-1.5 rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="h-full rounded-[calc(1.5rem-0.375rem)] bg-white dark:bg-[#161e24] p-5 flex flex-col justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-2xl bg-[#e8f0fe] dark:bg-[#1a73e8]/20 border border-[#1a73e8]/30 flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 spin-gear-gemini" aria-label="Gemini">
                          <defs>
                            <linearGradient id="gemGradPage0" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#4285F4" />
                              <stop offset="55%" stopColor="#9B72CB" />
                              <stop offset="100%" stopColor="#D96570" />
                            </linearGradient>
                          </defs>
                          <path fill="url(#gemGradPage0)" d="M12 0C12 6.6 17.4 12 24 12C17.4 12 12 17.4 12 24C12 17.4 6.6 12 0 12C6.6 12 12 6.6 12 0Z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-[#1c2830] dark:text-[#e8ebe9]">Gemini</h3>
                        <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">Google</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#1a73e8]/10 text-[#1a73e8] border border-[#1a73e8]/20">
                      {lang === 'fa' ? 'حافظه ۲ میلیونی و گوگل' : '2M Context & Google'}
                    </span>
                  </div>

                  <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    {lang === 'fa'
                      ? 'بزرگ‌ترین کانتکست جهان (۲ میلیون توکن)، اتصال مستقیم با تایپ @ به Google Drive و Gmail و YouTube، و ساخت دستیار اختصاصی با Gems.'
                      : 'Massive 2M token context, seamless Google Workspace integration (@Drive, @Gmail, @YouTube), and custom Gems.'}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-[#d9dad5]/60 dark:border-[#2d3942]/60 text-xs">
                    <div className="flex items-center gap-1.5 text-[#1c2830] dark:text-[#e8ebe9]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1a73e8] shrink-0" />
                      <span>{lang === 'fa' ? 'مدل‌های کلیدی: Gemini 1.5 Pro, 1.5 Flash' : 'Key Models: Gemini 1.5 Pro, Flash'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#1c2830] dark:text-[#e8ebe9]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1a73e8] shrink-0" />
                      <span>{lang === 'fa' ? 'قابلیت شاخص: واکشی ویدیو، صوت و گوگل‌درایو' : 'Feature: Multimodal & Workspace @mentions'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#1c2830] dark:text-[#e8ebe9]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1a73e8] shrink-0" />
                      <span>{lang === 'fa' ? 'ورود مستقیم با اکانت جیمیل' : 'Zero friction login with Google account'}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#d9dad5]/60 dark:border-[#2d3942]/60 space-y-2">
                  <button
                    type="button"
                    onClick={() => openCompanionWindow('https://gemini.google.com', 'gemini_companion')}
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] active:scale-[0.97] text-white text-xs font-semibold shadow-xs transition-all duration-150 cursor-pointer"
                  >
                    <span>{lang === 'fa' ? 'ورود به Gemini در پنجره کناری' : 'Open Gemini in Side Window'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="https://gemini.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className="block text-center text-[11px] font-mono text-[#1a73e8] dark:text-[#60a5fa] hover:underline"
                  >
                    gemini.google.com ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Other Prominent LLMs: DeepSeek, Qwen, Perplexity, Grok, Mistral, Meta Llama */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#e0533c]" />
                <h3 className="text-sm sm:text-base font-extrabold text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa'
                    ? 'سایر مدل‌های زبانی مطرح جهان (DeepSeek، Qwen و اکوسیستم LLM)'
                    : 'Other Prominent Global LLMs (DeepSeek, Qwen & Open-Weight Leaders)'}
                </h3>
              </div>
              <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                {lang === 'fa'
                  ? 'کلیک روی لینک هر مدل برای ورود مستقیم یا باز کردن در پنجره کناری'
                  : 'Click any official link or launch in the side companion window'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {OTHER_LLM_PLATFORMS.map((llm) => (
                <div
                  key={llm.id}
                  className="p-4 rounded-2xl bg-white dark:bg-[#161e24] border border-black/[0.07] dark:border-white/[0.09] shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between space-y-3.5"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-2xl bg-[#f8f9fa] dark:bg-[#1f2933] border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center shrink-0 shadow-2xs">
                          {renderOtherLlmLogo(llm.id)}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-[#1c2830] dark:text-[#e8ebe9]">{llm.name}</h4>
                          <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">{llm.company}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${llm.bgTintClass}`}>
                        {lang === 'fa' ? llm.badgeFa : llm.badgeEn}
                      </span>
                    </div>

                    <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                      {lang === 'fa' ? llm.descFa : llm.descEn}
                    </p>

                    <div className="text-[11px] font-mono text-[#1c2830] dark:text-[#d1d7db] bg-[#f8f9fa] dark:bg-[#12171b] px-2.5 py-1.5 rounded-lg border border-black/[0.05] dark:border-white/[0.06]">
                      {lang === 'fa' ? llm.modelsFa : llm.modelsEn}
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between gap-2">
                    <a
                      href={llm.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      dir="ltr"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#f8f9fa] dark:bg-[#1f2933] hover:bg-orange-50 dark:hover:bg-[#2d1a33] border border-gray-200 dark:border-white/10 text-[11px] font-mono font-bold text-[#1c2830] dark:text-[#e8ebe9] hover:text-[#e0533c] transition-colors"
                    >
                      <span>{llm.domainLabel}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      type="button"
                      onClick={() => openCompanionWindow(llm.url, `${llm.id}_companion`)}
                      className="px-3 py-1.5 rounded-full text-[11px] font-bold text-white shadow-2xs hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                      style={{ backgroundColor: llm.accentHex }}
                    >
                      {lang === 'fa' ? 'پنجره کناری' : 'Side Window'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: READY-TO-COPY PROMPT LIBRARY */}
      {(activeTab === 'all' || activeTab === 'prompts_library') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#b87333]/10 text-[#b87333] dark:text-[#e0a96d]">
                <FileText className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span dir="ltr" className="px-2 py-0.5 rounded-md bg-[#b87333] text-white text-xs font-black">۲-۴</span>
                  <h2 className="text-base sm:text-lg font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? 'کتابخانه پرامپت‌های آماده و کاربردی (کپی با یک کلیک)' : 'Battle-Tested Prompt Templates (One-Click Copy)'}
                  </h2>
                </div>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                  {lang === 'fa'
                    ? 'این پرامپت‌ها را با یک کلیک کپی کنید یا در کارگاه تمرین بارگذاری نمایید و در ChatGPT یا Claude امتحان کنید.'
                    : 'Click to copy or load into the sandbox below. Paste directly into ChatGPT, Claude, or Gemini.'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROMPT_LIBRARY.map((item) => {
              const activePromptText = lang === 'fa' ? item.promptFa : item.promptEn;
              const isCopied = copiedId === item.id;

              return (
                <div
                  key={item.id}
                  className="rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] p-5 shadow-xs flex flex-col justify-between hover:border-[#e0533c] dark:hover:border-[#fb7185] transition-all space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#fdeee9] dark:bg-[#1e2a30] text-[#e0533c] dark:text-[#fb7185]">
                          {lang === 'fa' ? item.categoryFa : item.categoryEn}
                        </span>

                        <div className="flex flex-wrap items-center gap-1">
                          {item.targetTools.map((tool) => (
                            <span
                              key={tool}
                              className="text-[9px] px-1.5 py-0.5 rounded bg-[#f4f4f1] dark:bg-[#12171b] text-[#5d6b73] dark:text-[#9aa8b0] border border-[#d9dad5]/40 dark:border-[#2d3942]/40 font-mono"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h3 className="font-bold text-sm sm:text-base text-[#1c2830] dark:text-[#e8ebe9] leading-snug">
                        {lang === 'fa' ? item.titleFa : item.titleEn}
                      </h3>
                    </div>

                    <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                      {lang === 'fa' ? item.descriptionFa : item.descriptionEn}
                    </p>

                    <div className="relative rounded-lg bg-[#f8f9fa] dark:bg-[#12171b] border border-[#d9dad5]/70 dark:border-[#2d3942]/70 p-3 max-h-44 overflow-y-auto">
                      <pre className="text-xs font-sans text-[#1c2830] dark:text-[#e8ebe9] whitespace-pre-wrap leading-relaxed select-all">
                        {activePromptText}
                      </pre>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#d9dad5]/60 dark:border-[#2d3942]/60">
                    <button
                      onClick={() => loadPromptToSandbox(activePromptText)}
                      className="flex items-center gap-1 text-xs font-semibold text-[#e0533c] dark:text-[#fb7185] hover:underline"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>{lang === 'fa' ? 'بارگذاری در کارگاه تست' : 'Load to Sandbox'}</span>
                    </button>

                    <button
                      onClick={() => copyToClipboard(activePromptText, item.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-2xs transition-all ${
                        isCopied
                          ? 'bg-[#2f7d5b] text-white'
                          : 'bg-[#e0533c] hover:bg-[#163f4e] text-white'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>{lang === 'fa' ? 'کپی شد!' : 'Copied!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{lang === 'fa' ? 'کپی پرامپت' : 'Copy Prompt'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* SECTION 4: ENTERPRISE EXPERT SYSTEMS (GEMS, PROJECTS, ARTIFACTS, CONTRACTS & INDUSTRY) */}
      {(activeTab === 'all' || activeTab === 'advanced_features') && (
        <section className="space-y-6">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#1b3a4b]/10 text-[#1b3a4b] dark:text-[#99e2b4]">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span dir="ltr" className="px-2 py-0.5 rounded-md bg-[#1b3a4b] text-white text-xs font-black">۲-۵</span>
                  <h2 className="text-base sm:text-lg font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa'
                      ? 'سیستم‌های خبره سازمانی و مشاوران مدیریتی با Gems، Projects و Artifacts'
                      : 'Enterprise Expert Systems with Gems, Projects & Artifacts'}
                  </h2>
                </div>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                  {lang === 'fa'
                    ? 'تبدیل مدل‌های زبانی عمومی به مشاوران دقیق حقوقی، مهندسی و مدیریت پروژه در صنایع سنگین و پیمانکاری'
                    : 'Transform generic LLMs into precision engineering, legal, and mega-project advisors.'}
                </p>
              </div>
            </div>
          </div>

          {/* Hero Callout Banner */}
          <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#e0533c]/10 via-[#9333ea]/10 to-[#1b3a4b]/10 border border-[#e0533c]/30 text-xs sm:text-sm leading-relaxed text-[#1c2830] dark:text-[#e8ebe9]">
            <p className="font-medium">
              {lang === 'fa' ? (
                <>
                  ترکیب ابزارهای سفارشی‌سازی مانند <strong className="text-[#1a73e8] font-bold">Gems در جمینای</strong> و{' '}
                  <strong className="text-[#d97706] font-bold">Projects در کلود (Claude)</strong> همراه با قابلیت‌های{' '}
                  <strong className="text-[#10a37f] font-bold">Artifacts</strong> و{' '}
                  <strong className="text-[#e0533c] dark:text-[#fb7185] font-bold">System Instructions</strong>، مدل‌های زبانی عمومی را به سیستم‌های خبره سازمانی و مشاوران دقیق مدیریتی تبدیل می‌کند.
                </>
              ) : (
                <>
                  Combining customization engines like <strong>Gemini Gems</strong> and <strong>Claude Projects</strong> with <strong>Artifacts</strong> and <strong>System Instructions</strong> elevates generic LLMs into enterprise expert systems and rigorous management advisors.
                </>
              )}
            </p>
          </div>

          {/* Part 1: Core Architecture */}
          <div className="space-y-3">
            <h3 className="text-xs sm:text-sm font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#e0533c] dark:text-[#fb7185]" />
              <span>{lang === 'fa' ? '۱. معماری هسته: تفکیک ابزارها و قابلیت‌ها' : '1. Core Architecture: Decoupling Tools & Capabilities'}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Instructions / Persona */}
              <div className="p-4 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-[#e0533c] dark:text-[#fb7185]">
                  <Terminal className="w-4 h-4" />
                  <h4 className="font-bold text-xs sm:text-sm">
                    {lang === 'fa' ? 'دستورالعمل‌های سیستمی (Instructions)' : 'System Instructions'}
                  </h4>
                </div>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  {lang === 'fa'
                    ? 'تنظیم زاویه دید، دکترین تصمیم‌گیری، قالب‌بندی خروجی و محدودیت‌های تحلیلی مدل. در این بخش رفتار هوش مصنوعی از حالت یک چت‌بات عمومی خارج شده و نقاب یک نقش خاص سازمانی (Persona) را می‌پذیرد.'
                    : 'Governs decision doctrine, analytical bias, output schema, and boundaries. Strips casual chatbot traits to adopt a strict enterprise persona.'}
                </p>
              </div>

              {/* Gems / Projects */}
              <div className="p-4 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-[#c026d3] dark:text-[#6ee7b7]">
                  <FolderKanban className="w-4 h-4" />
                  <h4 className="font-bold text-xs sm:text-sm">
                    {lang === 'fa' ? 'جم‌ها و پروژه‌ها (Gems / Projects)' : 'Gems & Projects (Knowledge Base)'}
                  </h4>
                </div>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  {lang === 'fa'
                    ? 'ایجاد محیط‌های ایزوله همراه با مخزن دانشی اختصاصی (Knowledge Base). شما اسناد قراردادی، استانداردهای فنی، شرایط عمومی پیمان، یا نقشه‌ها را یک‌بار بارگذاری می‌کنید و مدل تمام خروجی‌های خود را فقط بر پایه آن داده‌ها مستند می‌کند.'
                    : 'Isolated workspaces with persistent ground-truth data. Upload technical codes, FIDIC clauses, or P&IDs once; the AI anchors all answers strictly to them.'}
                </p>
              </div>

              {/* Artifacts */}
              <div className="p-4 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-[#b87333] dark:text-[#e0a96d]">
                  <Code className="w-4 h-4" />
                  <h4 className="font-bold text-xs sm:text-sm">
                    {lang === 'fa' ? 'آرتیفکت‌ها (Artifacts)' : 'Artifacts Workspace'}
                  </h4>
                </div>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                  {lang === 'fa'
                    ? 'تفکیک گفت‌وگو از محصول نهایی کار. آرتیفکت بستری مستقل برای تدوین پیش‌نویس لوایح، تولید کدهای تحلیلی، نمودارهای جریان کار، داشبوردهای مدیریتی یا جداول ماتریس ریسک است که بدون به‌هم‌ریختگی محیط چت، قابل ویرایش و توسعه است.'
                    : 'Decouples dialogue from the work product. Standalone canvas for drafting formal claims, EVM dashboards, and risk matrices without cluttering chat history.'}
                </p>
              </div>
            </div>
          </div>

          {/* Part 2: Complex Contract & Claims Methodology (Collapsible Accordion) */}
          <details className="group rounded-2xl border border-[#ecdcd8] dark:border-[#382645] bg-white dark:bg-[#201729] shadow-xs overflow-hidden transition-all">
            <summary className="cursor-pointer list-none p-4 sm:p-5 flex items-center justify-between font-bold text-xs sm:text-sm select-none hover:bg-[#fdeee9]/30 dark:hover:bg-[#341528]/30 transition-colors">
              <div className="flex items-center gap-2 text-[#8c3b2d] dark:text-[#f87171]">
                <Scale className="w-5 h-5 shrink-0" />
                <h3 className="font-bold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa'
                    ? '۲. متدولوژی تحلیل قراردادهای پیچیده با Gems و Projects'
                    : '2. Complex Contract & Claim Analysis Methodology with Gems/Projects'}
                </h3>
              </div>
              <span className="text-[11px] font-normal text-[#755e66] dark:text-[#ad99ab] flex items-center gap-1 group-open:text-[#e0533c]">
                <span>{lang === 'fa' ? 'مشاهده فرمول دانشی و فرایند ۳ مرحله‌ای' : 'View Formula & 3-Step Process'}</span>
                <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180 shrink-0" />
              </span>
            </summary>

            <div className="p-4 sm:p-5 pt-0 border-t border-[#ecdcd8]/50 dark:border-[#382645]/50 space-y-4">
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed pt-3">
                {lang === 'fa'
                  ? 'برای بررسی و ارزیابی ادعاها (Claims)، ریسک‌ها و تاخیرات قراردادی، چت معمولی پاسخگو نیست؛ باید یک Gem یا Project تخصصی تحلیل حقوقی و ادعا با پیکربندی زیر تعریف شود:'
                  : 'For evaluating claims, risks, and project delay penalties, basic chat is insufficient. Deploy a dedicated Contract & Claim Analysis Gem:'}
              </p>

              {/* Knowledge Configuration Box */}
              <div className="p-3.5 rounded-lg bg-[#f8f9fa] dark:bg-[#12171b] border border-[#d9dad5]/70 dark:border-[#2d3942]/70 font-mono text-xs text-[#1c2830] dark:text-[#e8ebe9] space-y-1">
                <span className="font-bold text-[#e0533c] dark:text-[#fb7185] block mb-1">
                  {lang === 'fa' ? '[پیکربندی دانشی Gem / Project]:' : '[Gem / Project Knowledge Configuration]:'}
                </span>
                <div>• {lang === 'fa' ? 'بارگذاری شرایط عمومی و خصوصی پیمان (مانند نشریه ۴۳۱۱ یا فیدیک FIDIC نقره‌ای/زرد/قرمز)' : 'General & Particular Conditions of Contract (e.g., FIDIC Silver/Yellow/Red Books)'}</div>
                <div>• {lang === 'fa' ? 'بخشنامه‌های جبرانی (تعدیل آحاد بها، نوسان نرخ ارز، تمدید مدت پیمان)' : 'Statutory Compensation Circulars (Price Adjustments, FX Variations, EoT Guidelines)'}</div>
                <div>• {lang === 'fa' ? 'مکاتبات کارگاهی، صورت‌جلسات تحویل زمین و گزارش‌های روزانه پیشرفت پروژه' : 'Site correspondence, site possession protocols, and daily contractor logs'}</div>
              </div>

              {/* 3 Step Extraction Process */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] block">
                  {lang === 'fa' ? 'فرایند استخراج خروجی تحلیلی در ۳ گام:' : '3-Step Analytical Extraction Process:'}
                </span>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5]/50 dark:border-[#2d3942]/50 space-y-1">
                    <span className="font-bold text-[#e0533c] dark:text-[#fb7185] flex items-center gap-1">
                      <span>۱.</span>
                      <span>{lang === 'fa' ? 'ماتریس تخصیص ریسک' : 'Risk Allocation Matrix'}</span>
                    </span>
                    <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                      {lang === 'fa'
                        ? 'استخراج تعهدات نامتقارن کارفرما/پیمانکار، بندهای مبهم در آزادسازی زمین، تحویل جبهه‌های کاری، یا فورس‌ماژور.'
                        : 'Uncovers asymmetrical clauses, land handover ambiguities, and force majeure liabilities.'}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5]/50 dark:border-[#2d3942]/50 space-y-1">
                    <span className="font-bold text-[#c026d3] dark:text-[#6ee7b7] flex items-center gap-1">
                      <span>۲.</span>
                      <span>{lang === 'fa' ? 'ارزیابی دعاوی تاخیرات و مالی' : 'Delay & Financial Claims'}</span>
                    </span>
                    <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                      {lang === 'fa'
                        ? 'انطباق مستندات روزانه با مواعد مندرج در ماده ۳۰ شرایط عمومی پیمان، بررسی ضرورت اخطار کتبی و تحلیل مسیر بحرانی (Critical Path).'
                        : 'Maps daily logs against Clause 30 deadlines, notice prerequisites, and critical path variance.'}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5]/50 dark:border-[#2d3942]/50 space-y-1">
                    <span className="font-bold text-[#2f7d5b] dark:text-[#63c496] flex items-center gap-1">
                      <span>۳.</span>
                      <span>{lang === 'fa' ? 'تدوین لایحه دفاعیه در آرتیفکت' : 'Formal Defense in Artifact'}</span>
                    </span>
                    <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                      {lang === 'fa'
                        ? 'مدل متن رسمی دفاعیه را با استناد دقیق به شماره بندهای قرارداد و مستندات تاریخی داخل یک Artifact با فرمت نامه اداری رسمی تنظیم می‌کند.'
                        : 'Drafts hard-hitting official submission briefs citing exact contract clauses in a standalone Artifact.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </details>

          {/* Part 3: Industrial & Engineering Expert Assistants Table (Collapsible Accordion) */}
          <details className="group rounded-2xl border border-[#ecdcd8] dark:border-[#382645] bg-white dark:bg-[#201729] shadow-xs overflow-hidden transition-all">
            <summary className="cursor-pointer list-none p-4 sm:p-5 flex items-center justify-between font-bold text-xs sm:text-sm select-none hover:bg-[#fdeee9]/30 dark:hover:bg-[#341528]/30 transition-colors">
              <div className="flex items-center gap-2 text-[#c026d3] dark:text-[#fb7185]">
                <Factory className="w-5 h-5 shrink-0" />
                <h3 className="font-bold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa'
                    ? '۳. الگوی ساخت دستیارهای تخصصی صنعتی و فنی (مترو، پتروشیمی، حقوقی)'
                    : '3. Industrial & Technical Expert Assistant Patterns (Metro, Petrochemical, Legal)'}
                </h3>
              </div>
              <span className="text-[11px] font-normal text-[#755e66] dark:text-[#ad99ab] flex items-center gap-1 group-open:text-[#e0533c]">
                <span>{lang === 'fa' ? 'مشاهده ماتریس نقش‌ها و پرامپت‌ها' : 'View Roles Matrix'}</span>
                <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180 shrink-0" />
              </span>
            </summary>

            <div className="p-4 sm:p-5 pt-0 border-t border-[#ecdcd8]/50 dark:border-[#382645]/50 space-y-3">
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] pt-3">
                {lang === 'fa'
                  ? 'پیکربندی مخزن دانشی و نوع خروجی‌های آرتیفکت بر حسب رده تخصصی پروژه:'
                  : 'Knowledge base taxonomy and Artifact deliverables categorized by engineering discipline:'}
              </p>

              <div className="overflow-x-auto rounded-lg border border-[#d9dad5] dark:border-[#2d3942]">
                <table className="w-full text-xs text-right border-collapse">
                  <thead>
                    <tr className="bg-[#f4f4f1] dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9] border-b border-[#d9dad5] dark:border-[#2d3942]">
                      <th className="p-3 font-bold w-1/4">
                        {lang === 'fa' ? 'رده تخصصی و نقش' : 'Discipline & Role'}
                      </th>
                      <th className="p-3 font-bold w-3/8">
                        {lang === 'fa' ? 'ساختار دانشی Gem / Project' : 'Gem / Project Knowledge Base'}
                      </th>
                      <th className="p-3 font-bold w-3/8">
                        {lang === 'fa' ? 'خروجی‌های کاربردی و نحوه استفاده در Artifact' : 'Applied Artifact Deliverables'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#d9dad5]/60 dark:divide-[#2d3942]/60">
                    {/* Row 1: Metro */}
                    <tr className="hover:bg-[#f8f9fa] dark:hover:bg-[#162026] transition-colors">
                      <td className="p-3 align-top font-bold text-[#e0533c] dark:text-[#fb7185]">
                        <div className="flex items-center gap-2">
                          <Train className="w-4 h-4 text-[#c026d3] shrink-0" />
                          <span>{lang === 'fa' ? 'مدیر پروژه و مدیر فنی مترو' : 'Metro Project & Technical Director'}</span>
                        </div>
                      </td>
                      <td className="p-3 align-top text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                        {lang === 'fa'
                          ? 'مشخصات فنی عمومی و خصوصی تونل‌سازی، لاینینگ سگمنتی، رژیم حفاری TBM (مانند EPB)، سیستم پایدارسازی گود و ایستگاه‌ها، سازه نگهبان، و WBS پروژه.'
                          : 'Tunneling technical specs, segmental precast lining, EPB TBM excavation logs, deep excavation support, shoring systems, and project WBS.'}
                      </td>
                      <td className="p-3 align-top text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed space-y-1">
                        <div>• {lang === 'fa' ? 'تحلیل انحرافات زمانی و ریالی با رویکرد ارزش کسب‌شده (EVM)' : 'EVM schedule and cost variance analysis'}</div>
                        <div>• {lang === 'fa' ? 'پیش‌نویس چک‌لیست‌های تحویل موقت قطعات لاینینگ و تزریق فوم' : 'Precast segment QA checklists & foam injection audits'}</div>
                        <div>• {lang === 'fa' ? 'سناریونویسی مدیریت ریسک برخورد با معارضات تاسیساتی شهری' : 'Urban utility clashes risk scenarios & shoring logs'}</div>
                      </td>
                    </tr>

                    {/* Row 2: Petrochemical */}
                    <tr className="hover:bg-[#f8f9fa] dark:hover:bg-[#162026] transition-colors">
                      <td className="p-3 align-top font-bold text-[#9333ea] dark:text-[#6ee7b7]">
                        <div className="flex items-center gap-2">
                          <Factory className="w-4 h-4 text-[#9333ea] shrink-0" />
                          <span>{lang === 'fa' ? 'مدیر پتروشیمی و پالایشگاه' : 'Petrochemical & Refinery Lead'}</span>
                        </div>
                      </td>
                      <td className="p-3 align-top text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                        {lang === 'fa'
                          ? 'استانداردهای فرآیندی (ASME, API, IPS)، نقشه‌های P&ID، لاگ‌های تعمیرات و نگهداری، رویه‌های ایمنی HAZOP و استانداردهای متریال.'
                          : 'Process safety codes (ASME Sec VIII, API 1104, IPS), P&IDs, plant maintenance logs, HAZOP studies, metallurgy specs.'}
                      </td>
                      <td className="p-3 align-top text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed space-y-1">
                        <div>• {lang === 'fa' ? 'بررسی عدم‌انطباق‌های متالورژیکی و پایپینگ با کد استاندارد' : 'Metallurgical & piping non-conformance audits against code'}</div>
                        <div>• {lang === 'fa' ? 'آماده‌سازی ماتریس بازرسی فنی و برنامه‌ریزی تست‌های هیدروستاتیک' : 'Technical inspection matrix & hydrotest scheduling'}</div>
                        <div>• {lang === 'fa' ? 'ساخت ماتریس علل ریشه‌ای (RCA) در توقفات عملیاتی واحدها' : 'Root Cause Analysis (RCA) matrices for operational trips'}</div>
                      </td>
                    </tr>

                    {/* Row 3: Legal & Contracts */}
                    <tr className="hover:bg-[#f8f9fa] dark:hover:bg-[#162026] transition-colors">
                      <td className="p-3 align-top font-bold text-[#b87333] dark:text-[#e0a96d]">
                        <div className="flex items-center gap-2">
                          <Scale className="w-4 h-4 text-[#b87333] shrink-0" />
                          <span>{lang === 'fa' ? 'مشاور حقوقی و قراردادها' : 'Legal Counsel & Contract Advisor'}</span>
                        </div>
                      </td>
                      <td className="p-3 align-top text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                        {lang === 'fa'
                          ? 'قوانین بالادستی، آیین‌نامه معاملات، شرایط عمومی پیمان، رویه‌های قضایی و داوری بین‌المللی/داخلی.'
                          : 'Governing procurement laws, General Conditions of Contract, arbitration precedents, and statutory regulations.'}
                      </td>
                      <td className="p-3 align-top text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed space-y-1">
                        <div>• {lang === 'fa' ? 'چک‌لیست انطباق‌سنجی قرارداد با قوانین حاکم پیش از امضا' : 'Pre-award contractual compliance and loophole audits'}</div>
                        <div>• {lang === 'fa' ? 'استخراج مهلت‌های انقضای ضمانت‌نامه‌ها، جرایم تاخیر و سقف تعدیل' : 'Bank guarantee expiry schedules, liquidated damages & cap tracking'}</div>
                        <div>• {lang === 'fa' ? 'ساخت جداول تعهدات متقابل در Artifact برای ارجاع سریع تیم اجرایی' : 'Reciprocal obligations matrices in Artifacts for site execution'}</div>
                      </td>
                    </tr>

                    {/* Row 4: HR, Admin & Welfare */}
                    <tr className="hover:bg-[#f8f9fa] dark:hover:bg-[#162026] transition-colors">
                      <td className="p-3 align-top font-bold text-[#2f7d5b] dark:text-[#63c496]">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#2f7d5b] shrink-0" />
                          <span>{lang === 'fa' ? 'مدیر منابع انسانی، اداری و رفاهی' : 'HR, Admin & Welfare Manager'}</span>
                        </div>
                      </td>
                      <td className="p-3 align-top text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                        {lang === 'fa'
                          ? 'مواد منابع انسانی و رفاهی شرایط خصوصی پیمان (پروژه مترو خط ایکس)، جدول متراژ فضاهای کمپ کارگاهی (صفحه ۵۴)، بخشنامه داخلی کنترل اضافه‌کاری و لاگ‌های ساعت‌زنی.'
                          : 'Particular Conditions HR & welfare clauses (Metro Line X), Page 54 mandatory camp space table, internal overtime directives, and attendance logs.'}
                      </td>
                      <td className="p-3 align-top text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed space-y-1">
                        <div>• {lang === 'fa' ? 'ساخت داشبورد React کنترل اضافه‌کاری و ریسک خستگی در Claude Artifacts / Gemini Canvas' : 'Interactive React overtime & fatigue risk dashboard in Artifacts/Canvas'}</div>
                        <div>• {lang === 'fa' ? 'ماشین‌حساب مهلت اطلاع‌رسانی بند ۴۲-۱ (۷ روز شب‌کاری / ۲۴ ساعت روزکاری) و صدور نامه رسمی' : 'Sub-Clause 42-1 notice deadline calculator & official letter generator'}</div>
                        <div>• {lang === 'fa' ? 'اپلیکیشن ممیزی متراژ کمپ کارگاهی (ماده ۲۰-ح) و مبدل CSV کارت‌زن به گزارش ماهانه ماده ۱۸' : 'Article 20-H camp space audit app & Article 18 monthly CSV manpower chart converter'}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </details>

          {/* Part 4 & 5: Operational Steps & Pre-deployment Checklist (Collapsible Accordion) */}
          <details className="group rounded-2xl border border-[#ecdcd8] dark:border-[#382645] bg-white dark:bg-[#201729] shadow-xs overflow-hidden transition-all">
            <summary className="cursor-pointer list-none p-4 sm:p-5 flex items-center justify-between font-bold text-xs sm:text-sm select-none hover:bg-[#fdeee9]/30 dark:hover:bg-[#341528]/30 transition-colors">
              <div className="flex items-center gap-2 text-[#2f7d5b] dark:text-[#52b788]">
                <ListChecks className="w-5 h-5 shrink-0" />
                <h4 className="font-bold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa' ? '۴. مراحل عملیاتی راه‌اندازی دستیار و چک‌لیست اعتبارسنجی پیش از استقرار' : '4. Operational Setup & Pre-Deployment Checklist'}
                </h4>
              </div>
              <span className="text-[11px] font-normal text-[#755e66] dark:text-[#ad99ab] flex items-center gap-1 group-open:text-[#e0533c]">
                <span>{lang === 'fa' ? 'مشاهده چک‌لیست و ۳ گام عملیاتی' : 'View Checklist & Steps'}</span>
                <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180 shrink-0" />
              </span>
            </summary>

            <div className="p-4 sm:p-5 pt-0 border-t border-[#ecdcd8]/50 dark:border-[#382645]/50 grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
              {/* Operational Implementation Steps */}
              <div className="p-4 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#fdf8f5] dark:bg-[#16101c] shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-[#e0533c] dark:text-[#fb7185]">
                  <ListChecks className="w-4 h-4" />
                  <h5 className="font-bold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? 'مراحل عملیاتی راه‌اندازی دستیار اختصاصی' : 'Operational Deployment Steps'}
                  </h5>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-2.5 rounded-lg bg-white dark:bg-[#201729] border border-[#d9dad5]/40 dark:border-[#2d3942]/40 space-y-1">
                    <span className="font-bold text-[#e0533c] dark:text-[#fb7185] block">
                      {lang === 'fa' ? 'گام ۱: پایه‌گذاری System Instruction' : 'Step 1: Anchor System Instruction'}
                    </span>
                    <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                      {lang === 'fa'
                        ? 'نقش را دقیق، بدون تعارف و با لحن مهندسی/حقوقی بنویسید (مثلاً: «تو سرپرست امور قراردادها و دعاوی فنی هستی؛ هیچ ادعایی را بدون ارجاع به ماده و تبصره صریح قرارداد و بخشنامه‌های سازمان برنامه نمی‌پذیری»).'
                        : 'Define the persona rigorously: "You are the Senior Claims Officer; reject any claim lacking explicit reference to contractual sub-clauses and verified logs."'}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white dark:bg-[#201729] border border-[#d9dad5]/40 dark:border-[#2d3942]/40 space-y-1">
                    <span className="font-bold text-[#c026d3] dark:text-[#6ee7b7] block">
                      {lang === 'fa' ? 'گام ۲: تغذیه اسناد مرجع' : 'Step 2: Upload Ground-Truth Docs'}
                    </span>
                    <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                      {lang === 'fa'
                        ? 'نسخه‌های متنی تمیز و PDFهای دارای لایه متنی اسناد را مستقیماً به مخزن دانشی Gem یا Project بارگذاری کنید تا استنادها قطعی و بدون افت کیفیت باشد.'
                        : 'Upload clean, OCR-layered PDFs and structured markdown files directly into the Gem/Project Knowledge Base.'}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white dark:bg-[#201729] border border-[#d9dad5]/40 dark:border-[#2d3942]/40 space-y-1">
                    <span className="font-bold text-[#b87333] dark:text-[#e0a96d] block">
                      {lang === 'fa' ? 'گام ۳: تعریف ساختار خروجی با Artifacts' : 'Step 3: Direct Artifact Formatting'}
                    </span>
                    <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                      {lang === 'fa'
                        ? 'به دستیار دستور دهید خلاصه‌ها را در قالب جداول چندمتغیره، پیش‌نویس مکاتبات را به صورت ساختار نامه‌ای رسمی، و داده‌های پیشرفت کار را به شکل کدهای داشبورد بصری تولید کند.'
                        : 'Direct the assistant to output briefs as formal letters and metrics as interactive tables in dedicated Artifacts.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Validation Checklist */}
              <div className="p-4 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#fdf8f5] dark:bg-[#16101c] shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-[#2f7d5b] dark:text-[#63c496]">
                  <BookCheck className="w-4 h-4" />
                  <h5 className="font-bold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? 'چک‌لیست اعتبارسنجی پیش از استقرار Gem' : 'Pre-Deployment Validation Checklist'}
                  </h5>
                </div>

                <ul className="space-y-3 text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                  <li className="flex items-start gap-2 p-2.5 rounded-lg bg-white dark:bg-[#201729] border border-[#d9dad5]/40 dark:border-[#2d3942]/40">
                    <CheckCircle2 className="w-4 h-4 text-[#2f7d5b] dark:text-[#63c496] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1c2830] dark:text-[#e8ebe9] block mb-0.5">
                        {lang === 'fa' ? 'قید شرط عدم فرضیه‌سازی (Hallucination Guardrail):' : 'Strict Zero-Hallucination Guardrail:'}
                      </strong>
                      <span>
                        {lang === 'fa'
                          ? 'اطمینان از قرار دادن شروط عدم فرضیه‌سازی در بخش دستورالعمل تا مدل در صورت نبود داده در اسناد بارگذاری‌شده، اعلام بی‌اطلاعی کند.'
                          : 'Ensure instructions mandate stating "Information not found in reference documents" rather than guessing.'}
                      </span>
                    </div>
                  </li>

                  <li className="flex items-start gap-2 p-2.5 rounded-lg bg-white dark:bg-[#201729] border border-[#d9dad5]/40 dark:border-[#2d3942]/40">
                    <CheckCircle2 className="w-4 h-4 text-[#2f7d5b] dark:text-[#63c496] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1c2830] dark:text-[#e8ebe9] block mb-0.5">
                        {lang === 'fa' ? 'طبقه‌بندی بر اساس اولویت حاکمیت اسناد:' : 'Contractual Order of Precedence:'}
                      </strong>
                      <span>
                        {lang === 'fa'
                          ? 'طبقه‌بندی اسناد بر اساس اولویت حاکمیت اسناد (مثلاً تقدم موافقت‌نامه بر شرایط عمومی و شرایط عمومی بر مشخصات فنی).'
                          : 'Explicitly enforce document hierarchy (Agreement > Particular Conditions > General Conditions > Technical Specs).'}
                      </span>
                    </div>
                  </li>

                  <li className="flex items-start gap-2 p-2.5 rounded-lg bg-white dark:bg-[#201729] border border-[#d9dad5]/40 dark:border-[#2d3942]/40">
                    <CheckCircle2 className="w-4 h-4 text-[#2f7d5b] dark:text-[#63c496] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1c2830] dark:text-[#e8ebe9] block mb-0.5">
                        {lang === 'fa' ? 'یکپارچه‌سازی شیوه‌نامه مکاتبات رسمی:' : 'Corporate Letter & Tone Style Guide:'}
                      </strong>
                      <span>
                        {lang === 'fa'
                          ? 'یکپارچه‌سازی شیوه‌نامه نگارش مکاتبات رسمی سازمان در حافظه پایدار دستیار جهت انطباق ۱۰۰٪ با نامه‌های صادره سازمانی.'
                          : 'Embed the organization’s standard official letterhead format and diplomatic tone in persistent memory.'}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </details>
        </section>
      )}

      {/* SECTION 5: ENGINEERING DATA & DASHBOARD WORKSHOP */}
      {(activeTab === 'all' || activeTab === 'engineering_dashboards') && (() => {
        const currentDataset = trackDatasets.find(d => d.id === selectedDatasetId) || trackDatasets[0];
        const claudePromptText = lang === 'fa' ? currentDataset.claudeDashboardPromptFa : currentDataset.claudeDashboardPromptEn;
        const geminiPromptText = lang === 'fa' ? currentDataset.geminiPythonAnalyticsPromptFa : currentDataset.geminiPythonAnalyticsPromptEn;
        const fullClaudePrompt = `${claudePromptText}\n\n\`\`\`csv\n${currentDataset.rawCsv}\n\`\`\``;
        const fullGeminiPrompt = `${geminiPromptText}\n\n\`\`\`csv\n${currentDataset.rawCsv}\n\`\`\``;

        return (
          <section className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-[#c026d3]/10 text-[#c026d3] dark:text-[#fb7185]">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span dir="ltr" className="px-2 py-0.5 rounded-md bg-[#0284c7] text-white text-xs font-black">۲-۶</span>
                    <h2 className="text-base sm:text-lg font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                      {lang === 'fa'
                        ? industryTrack === 'PAYA_SAMAN_PARS'
                          ? 'کارگاه تحلیل پورتفو و داشبوردسازی دو بال هلدینگ پایا سامان پارس (۳ دیتاست تخصصی)'
                          : 'کارگاه عملی تحلیل داده و ساخت داشبورد مهندسی با Claude و Gemini (مترو و نفت‌وگاز)'
                        : 'Engineering Data & Dashboard Workshop with Claude & Gemini'}
                    </h2>
                  </div>
                  <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                    {lang === 'fa'
                      ? 'دانلود فایل‌های CSV واقعی، پیش‌نمایش جداول داده، و پرامپت‌های آماده جهت تولید فوری داشبورد React در Claude Artifacts و تحلیل‌های پیش‌بینانه پایتون در Gemini.'
                      : 'Download real-world CSV engineering datasets, preview data matrices, and use one-click prompts for interactive React dashboards or Python analytics.'}
                  </p>
                </div>
              </div>
            </div>

            {industryTrack === 'PAYA_SAMAN_PARS' && (
              <div className="space-y-2">
                <PayaHoldingArtifactSimulator lang={lang} />
              </div>
            )}

            {/* Dataset Selector Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {trackDatasets.map((ds) => {
                const isSelected = ds.id === selectedDatasetId;
                return (
                  <button
                    key={ds.id}
                    onClick={() => setSelectedDatasetId(ds.id)}
                    className={`p-3.5 rounded-xl border text-right transition-all flex flex-col justify-between gap-2 ${
                      isSelected
                        ? 'border-[#c026d3] bg-[#fdeee9]/60 dark:bg-[#341528] shadow-xs'
                        : 'border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] hover:border-[#c026d3]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        {ds.id === 'metro_station_tbm' && <Train className={`w-4 h-4 ${isSelected ? 'text-[#c026d3]' : 'text-[#5d6b73]'}`} />}
                        {ds.id === 'oil_gas_pipeline_epc' && <Factory className={`w-4 h-4 ${isSelected ? 'text-[#c026d3]' : 'text-[#5d6b73]'}`} />}
                        {ds.id === 'refinery_equipment_qa' && <Building2 className={`w-4 h-4 ${isSelected ? 'text-[#c026d3]' : 'text-[#5d6b73]'}`} />}
                        {ds.id.startsWith('paya_') && <Landmark className={`w-4 h-4 ${isSelected ? 'text-[#c026d3]' : 'text-violet-500'}`} />}
                        <span className="font-bold text-xs text-[#1c2830] dark:text-[#e8ebe9]">
                          {lang === 'fa' ? ds.titleFa : ds.titleEn}
                        </span>
                      </div>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-[#c026d3] shrink-0" />}
                    </div>
                    <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                      {lang === 'fa' ? ds.domainFa : ds.domainEn}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Dataset Inspection Card */}
            <div className="p-5 rounded-2xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#d9dad5]/60 dark:border-[#2d3942]/60">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#c026d3]/10 text-[#c026d3] dark:text-[#fb7185]">
                      {lang === 'fa' ? currentDataset.domainFa : currentDataset.domainEn}
                    </span>
                    <span className="text-xs font-mono text-[#5d6b73] dark:text-[#9aa8b0]">
                      {currentDataset.fileName} ({currentDataset.rowCount} {lang === 'fa' ? 'ردیف' : 'rows'} · {currentDataset.columnCount} {lang === 'fa' ? 'ستون' : 'cols'})
                    </span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? currentDataset.titleFa : currentDataset.titleEn}
                  </h3>
                  <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    {lang === 'fa' ? currentDataset.descriptionFa : currentDataset.descriptionEn}
                  </p>
                </div>

                {/* Direct File Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      downloadTextFile(
                        currentDataset.fileName,
                        currentDataset.rawCsv,
                        'text/csv;charset=utf-8;'
                      )
                    }
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#2f7d5b] hover:bg-[#25664a] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{lang === 'fa' ? 'دانلود فایل CSV' : 'Download CSV'}</span>
                  </button>

                  <button
                    onClick={() => {
                      copyToClipboard(currentDataset.rawCsv, 'raw_csv_' + currentDataset.id);
                      setCsvCopied(true);
                      setTimeout(() => setCsvCopied(false), 2500);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f8f9fa] dark:bg-[#12171b] hover:border-[#c026d3] text-xs font-semibold text-[#1c2830] dark:text-[#e8ebe9] transition-colors"
                  >
                    {csvCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#2f7d5b]" />
                        <span>{lang === 'fa' ? 'CSV کپی شد' : 'CSV Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{lang === 'fa' ? 'کپی متن CSV' : 'Copy CSV Text'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Data Table Preview */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-[#c026d3]" />
                  <span>{lang === 'fa' ? 'پیش‌نمایش داده‌های نمونه (نمونه ۵ ردیف اول):' : 'Data Matrix Preview (First 5 Rows):'}</span>
                </span>

                <div className="overflow-x-auto rounded-xl border border-[#d9dad5] dark:border-[#2d3942] max-h-56">
                  <table className="w-full text-[11px] text-right font-mono border-collapse">
                    <thead>
                      <tr className="bg-[#f4f4f1] dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9] border-b border-[#d9dad5] dark:border-[#2d3942]">
                        {Object.keys(currentDataset.previewRows[0] || {}).map((colKey) => (
                          <th key={colKey} className="p-2.5 font-bold whitespace-nowrap">
                            {colKey}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#d9dad5]/60 dark:divide-[#2d3942]/60">
                      {currentDataset.previewRows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-[#f8f9fa] dark:hover:bg-[#162026] transition-colors">
                          {Object.values(row).map((val, cIdx) => (
                            <td key={cIdx} className="p-2.5 whitespace-nowrap text-[#5d6b73] dark:text-[#9aa8b0]">
                              {val}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Ready-to-Fire Prompts Grid (Claude Artifacts vs Gemini Python) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
                {/* Claude Prompt Card */}
                <div className="p-4 rounded-xl border border-[#d97706]/40 bg-[#fffbeb]/40 dark:bg-[#2b1f09]/30 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#b45309] dark:text-[#fbbf24]">
                        <Code className="w-4 h-4" />
                        <h4 className="font-bold text-xs sm:text-sm">
                          {lang === 'fa' ? 'پرامپت Claude Artifacts (تولید داشبورد تعاملی React)' : 'Claude Artifacts React Dashboard Prompt'}
                        </h4>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-[#d97706]/10 text-[#d97706]">
                        Claude 3.5 Sonnet
                      </span>
                    </div>

                    <p className="text-[11px] text-[#78350f] dark:text-[#fde68a] leading-relaxed">
                      {lang === 'fa'
                        ? 'این پرامپت را در Claude کپی کنید تا بدون نیاز به کدنویسی، یک داشبورد کامل React با فیلترها، کارت‌های KPI و نمودارهای روند در یک آرتیفکت زنده تحویل بگیرید.'
                        : 'Generates an interactive, production-ready React + Tailwind dashboard in a live side-by-side Claude Artifact.'}
                    </p>

                    <div className="p-3 rounded-lg bg-white dark:bg-[#151515] border border-[#d97706]/30 max-h-36 overflow-y-auto font-mono text-[11px] text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed">
                      <pre className="whitespace-pre-wrap">{claudePromptText}</pre>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-2 border-t border-[#d97706]/20">
                    <button
                      onClick={() => {
                        copyToClipboard(fullClaudePrompt, 'claude_full_' + currentDataset.id);
                        setPromptWithDataCopiedId('claude_' + currentDataset.id);
                        setTimeout(() => setPromptWithDataCopiedId(null), 2500);
                      }}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#b45309] hover:bg-[#92400e] text-white text-xs font-semibold shadow-2xs transition-colors"
                    >
                      {promptWithDataCopiedId === 'claude_' + currentDataset.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>{lang === 'fa' ? 'پرامپت + داده‌ها کپی شد!' : 'Copied with Data!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{lang === 'fa' ? 'کپی پرامپت + کل داده‌های CSV' : 'Copy Prompt + Full CSV'}</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1.5 justify-end">
                      <button
                        onClick={() => loadPromptToSandbox(fullClaudePrompt)}
                        className="px-2.5 py-1.5 text-[11px] font-semibold text-[#b45309] dark:text-[#fbbf24] hover:underline flex items-center gap-1"
                      >
                        <Play className="w-3 h-3" />
                        <span>{lang === 'fa' ? 'انتقال به کارگاه' : 'Sandbox'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => openCompanionWindow('https://claude.ai', 'claude_companion')}
                        className="px-2.5 py-1.5 text-[11px] font-semibold rounded bg-[#b45309]/10 hover:bg-[#b45309]/20 text-[#b45309] dark:text-[#fbbf24] flex items-center gap-1 transition-colors cursor-pointer"
                        title={lang === 'fa' ? 'باز کردن Claude در پنجره کناری' : 'Open Claude in side window'}
                      >
                        <span>Claude</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Gemini Prompt Card */}
                <div className="p-4 rounded-xl border border-[#1a73e8]/40 bg-[#eff6ff]/40 dark:bg-[#0f1d38]/30 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#1d4ed8] dark:text-[#60a5fa]">
                        <Terminal className="w-4 h-4" />
                        <h4 className="font-bold text-xs sm:text-sm">
                          {lang === 'fa' ? 'پرامپت Gemini (تحلیل آماری، رگرسیون و پایتون)' : 'Gemini Python Analytics & Forecasting'}
                        </h4>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-[#1a73e8]/10 text-[#1a73e8]">
                        Gemini 1.5 Pro
                      </span>
                    </div>

                    <p className="text-[11px] text-[#1e40af] dark:text-[#93c5fd] leading-relaxed">
                      {lang === 'fa'
                        ? 'این پرامپت را در Gemini وارد کنید تا اسکریپت پایتون، مدل‌سازی رگرسیون تاخیرات، نمودار همبستگی آماری و تحلیل ریشه‌ای را اجرا کند.'
                        : 'Executes advanced Python regression models, schedule variance forecasts, and correlation analysis.'}
                    </p>

                    <div className="p-3 rounded-lg bg-white dark:bg-[#151515] border border-[#1a73e8]/30 max-h-36 overflow-y-auto font-mono text-[11px] text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed">
                      <pre className="whitespace-pre-wrap">{geminiPromptText}</pre>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-2 border-t border-[#1a73e8]/20">
                    <button
                      onClick={() => {
                        copyToClipboard(fullGeminiPrompt, 'gemini_full_' + currentDataset.id);
                        setPromptWithDataCopiedId('gemini_' + currentDataset.id);
                        setTimeout(() => setPromptWithDataCopiedId(null), 2500);
                      }}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-semibold shadow-2xs transition-colors"
                    >
                      {promptWithDataCopiedId === 'gemini_' + currentDataset.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>{lang === 'fa' ? 'پرامپت + داده‌ها کپی شد!' : 'Copied with Data!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{lang === 'fa' ? 'کپی پرامپت + کل داده‌های CSV' : 'Copy Prompt + Full CSV'}</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1.5 justify-end">
                      <button
                        onClick={() => loadPromptToSandbox(fullGeminiPrompt)}
                        className="px-2.5 py-1.5 text-[11px] font-semibold text-[#1a73e8] dark:text-[#60a5fa] hover:underline flex items-center gap-1"
                      >
                        <Play className="w-3 h-3" />
                        <span>{lang === 'fa' ? 'انتقال به کارگاه' : 'Sandbox'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => openCompanionWindow('https://gemini.google.com', 'gemini_companion')}
                        className="px-2.5 py-1.5 text-[11px] font-semibold rounded bg-[#1a73e8]/10 hover:bg-[#1a73e8]/20 text-[#1a73e8] dark:text-[#60a5fa] flex items-center gap-1 transition-colors cursor-pointer"
                        title={lang === 'fa' ? 'باز کردن Gemini در پنجره کناری' : 'Open Gemini in side window'}
                      >
                        <span>Gemini</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Classroom Teaching Playbook */}
              <div className="p-4 rounded-xl bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5]/60 dark:border-[#2d3942]/60 space-y-2">
                <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-[#fbbf24]" />
                  <span>{lang === 'fa' ? 'راهنمای ۳ مرحله‌ای برای استفاده مدرسان در کلاس درس:' : 'Classroom Playbook for Instructors:'}</span>
                </span>
                <ol className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] space-y-1 list-decimal list-inside leading-relaxed">
                  <li>
                    {lang === 'fa'
                      ? 'دیتاست مدنظر (مترو یا نفت‌وگاز) را از تب‌های بالا انتخاب کنید و روی کلید سبز «دانلود فایل CSV» کلیک کنید تا فایل روی سیستم ذخیره شود.'
                      : 'Select the desired domain dataset (Metro or Oil & Gas) and download the CSV file.'}
                  </li>
                  <li>
                    {lang === 'fa'
                      ? 'کلید «کپی پرامپت + کل داده‌های CSV» مربوط به Claude یا Gemini را فشار دهید (متن پرامپت به‌همراه داده‌ها در حافظه قرار می‌گیرد).'
                      : 'Click "Copy Prompt + Full CSV" to place the prompt and data onto your clipboard.'}
                  </li>
                  <li>
                    {lang === 'fa'
                      ? 'وارد claude.ai یا gemini.google.com شوید، متن را پیست کنید و اینتر را بزنید. در کمتر از ۲۰ ثانیه، یک داشبورد زنده یا تحلیل پایتون برای مخاطبان به نمایش درمی‌آید!'
                      : 'Open Claude or Gemini, paste the prompt, and press enter to showcase live Artifact dashboards in under 20 seconds!'}
                  </li>
                </ol>
              </div>

              {/* Collapsible Supplementary HR & Admin Interactive Workshop */}
              <details className="group rounded-2xl border border-[#ecdcd8] dark:border-[#382645] bg-white dark:bg-[#201729] p-4 sm:p-5 shadow-xs overflow-hidden transition-all">
                <summary className="cursor-pointer list-none flex items-center justify-between font-bold text-xs sm:text-sm select-none hover:bg-[#fdeee9]/30 dark:hover:bg-[#341528]/30 transition-colors">
                  <div className="flex items-center gap-2 text-[#c026d3] dark:text-[#fb7185]">
                    <Users className="w-5 h-5 shrink-0" />
                    <span>
                      {lang === 'fa'
                        ? 'کارگاه تکمیلی: ۵ ابزار تعاملی منابع انسانی و اداری در Gemini Canvas و Claude Artifacts'
                        : 'Supplementary Lab: 5 Interactive HR & Admin Tools in Canvas/Artifacts'}
                    </span>
                  </div>
                  <span className="text-[11px] font-normal text-[#755e66] dark:text-[#ad99ab] flex items-center gap-1 group-open:text-[#e0533c]">
                    <span>{lang === 'fa' ? 'مشاهده تمرین‌های ۵گانه HR' : 'View 5 HR Exercises'}</span>
                    <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180 shrink-0" />
                  </span>
                </summary>

                <div className="pt-4 border-t border-[#ecdcd8]/50 dark:border-[#382645]/50 mt-3">
                  <HrArtifactsCanvasWorkshop
                    lang={lang}
                    onLoadToSandbox={loadPromptToSandbox}
                    copyToClipboard={copyToClipboard}
                    copiedId={copiedId}
                  />
                </div>
              </details>
            </div>
          </section>
        );
      })()}

      {/* SESSION 3 - MODULE 3-1: GOOGLE NOTEBOOKLM MEGA-WORKSHOP */}
      {(activeTab === 'all' || activeTab === 'notebooklm') && (
        <NotebookLmWorkshop
          lang={lang}
          industryTrack={industryTrack}
          onLoadToSandbox={loadPromptToSandbox}
          copyToClipboard={copyToClipboard}
          copiedId={copiedId}
        />
      )}

      {/* SESSION 3 - MODULE 3-2: CONTRACTS & ASSISTANTS WORKSHOP (GEMS & PROJECTS) */}
      {(activeTab === 'all' || activeTab === 'contracts_and_gems') && (() => {
        const currentContract = trackContracts.find(c => c.id === selectedContractId) || trackContracts[0];
        const geminiInst = lang === 'fa' ? currentContract.geminiSystemInstructionFa : currentContract.geminiSystemInstructionEn;
        const claudeInst = lang === 'fa' ? currentContract.claudeSystemInstructionFa : currentContract.claudeSystemInstructionEn;

        return (
          <section className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-[#b87333]/10 text-[#b87333] dark:text-[#e0a96d]">
                  <ScrollText className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span dir="ltr" className="px-2 py-0.5 rounded-md bg-[#b87333] text-white text-xs font-black">۳-۲</span>
                    <h2 className="text-base sm:text-lg font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                      {lang === 'fa'
                        ? industryTrack === 'PAYA_SAMAN_PARS'
                          ? 'کارگاه ممیزی قراردادهای EPC+F، BOT و کنسرسیوم هلدینگ پایا سامان پارس در Gems و Projects'
                          : 'کارگاه تحلیل قراردادهای EPC (مترو و نفت‌وگاز) و ساخت دستیار در Gems و Projects'
                        : 'Specimen Engineering Contracts & Custom Assistant Setup in Gems & Projects'}
                    </h2>
                  </div>
                  <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                    {lang === 'fa'
                      ? 'دانلود متن کامل قراردادها با فرمت Markdown، دریافت System Instruction اختصاصی برای ساخت Gem و Project، و پرسش‌های نمونه برای آزمون ادعاها و تاخیرات.'
                      : 'Download full contracts in Markdown, copy tailored System Instructions for Gemini Gems & Claude Projects, and run simulated claims and delay queries.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Diagram: Contract Audit Architecture */}
            <DiagramWrapper
              titleFa="اینفوگرافیک تصویری: معماری ۳ ستونه ممیزی قرارداد، تاخیرات و ادعاها (Claims) با هوش مصنوعی"
              titleEn="Visual Infographic: 3-Pillar AI Contract & Delay Claims Audit Architecture"
              badgeFa="معماری حقوقی و ادعا"
              lang={lang}
            >
              <ContractAuditArchitectureDiagram lang={lang} />
            </DiagramWrapper>

            {/* Contract Selector Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {trackContracts.map((contract) => {
                const isSelected = contract.id === selectedContractId;
                return (
                  <button
                    key={contract.id}
                    onClick={() => setSelectedContractId(contract.id)}
                    className={`p-4 rounded-xl border text-right transition-all flex flex-col justify-between gap-2.5 ${
                      isSelected
                        ? 'border-[#b87333] bg-[#fffaf5] dark:bg-[#2b1f09]/40 shadow-xs'
                        : 'border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] hover:border-[#b87333]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        {contract.id === 'metro_tunnel_contract' && <Train className={`w-4 h-4 ${isSelected ? 'text-[#b87333]' : 'text-[#5d6b73]'}`} />}
                        {contract.id === 'oil_gas_epc_contract' && <Factory className={`w-4 h-4 ${isSelected ? 'text-[#b87333]' : 'text-[#5d6b73]'}`} />}
                        {contract.id.startsWith('paya_') && <Landmark className={`w-4 h-4 ${isSelected ? 'text-[#b87333]' : 'text-violet-500'}`} />}
                        <span className="font-bold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                          {lang === 'fa' ? contract.titleFa : contract.titleEn}
                        </span>
                      </div>
                      {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-[#b87333] shrink-0" />}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                      <span className="px-2 py-0.5 rounded bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5]/40 dark:border-[#2d3942]/40">
                        {lang === 'fa' ? contract.governingStandardFa : contract.governingStandardEn}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Contract Details & Markdown View */}
            <div className="p-5 rounded-2xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#d9dad5]/60 dark:border-[#2d3942]/60">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#b87333]/10 text-[#b87333] dark:text-[#e0a96d]">
                      {lang === 'fa' ? currentContract.governingStandardFa : currentContract.governingStandardEn}
                    </span>
                    <span className="text-xs font-mono text-[#5d6b73] dark:text-[#9aa8b0]">
                      {currentContract.fileName}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? currentContract.titleFa : currentContract.titleEn}
                  </h3>
                  <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                    {lang === 'fa' ? currentContract.summaryFa : currentContract.summaryEn}
                  </p>
                </div>

                {/* Direct Actions: Download & Copy Markdown */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      downloadTextFile(
                        currentContract.fileName,
                        currentContract.markdownContent,
                        'text/markdown;charset=utf-8;'
                      )
                    }
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#2f7d5b] hover:bg-[#25664a] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{lang === 'fa' ? 'دانلود فایل قرارداد (.md)' : 'Download Contract (.md)'}</span>
                  </button>

                  <button
                    onClick={() => {
                      copyToClipboard(currentContract.markdownContent, 'contract_md_' + currentContract.id);
                      setContractCopied(true);
                      setTimeout(() => setContractCopied(false), 2500);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f8f9fa] dark:bg-[#12171b] hover:border-[#b87333] text-xs font-semibold text-[#1c2830] dark:text-[#e8ebe9] transition-colors"
                  >
                    {contractCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#2f7d5b]" />
                        <span>{lang === 'fa' ? 'متن کپی شد' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{lang === 'fa' ? 'کپی متن کامل قرارداد' : 'Copy Full Contract'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Scrollable Contract Markdown Preview */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-[#b87333]" />
                  <span>{lang === 'fa' ? 'پیش‌نمایش مواد و متن قرارداد (Markdown):' : 'Contract Text Preview (Markdown):'}</span>
                </span>

                <div className="p-4 rounded-xl bg-[#f8f9fa] dark:bg-[#12171b] border border-[#d9dad5]/70 dark:border-[#2d3942]/70 max-h-60 overflow-y-auto font-mono text-[11px] text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed whitespace-pre-wrap">
                  {currentContract.markdownContent}
                </div>
              </div>

              {/* System Instructions Cards for Gemini Gems vs Claude Projects */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
                {/* Gemini Gem System Instruction */}
                <div className="p-4 rounded-xl border border-[#1a73e8]/40 bg-[#eff6ff]/40 dark:bg-[#0f1d38]/30 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#1d4ed8] dark:text-[#60a5fa]">
                        <Bot className="w-4 h-4" />
                        <h4 className="font-bold text-xs sm:text-sm">
                          {lang === 'fa' ? 'دستورالعمل سیستمی برای Gemini Gems' : 'Gemini Gems System Instruction'}
                        </h4>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-[#1a73e8]/10 text-[#1a73e8]">
                        Gemini Gem Persona
                      </span>
                    </div>

                    <p className="text-[11px] text-[#1e40af] dark:text-[#93c5fd] leading-relaxed">
                      {lang === 'fa'
                        ? 'این متن را در بخش Instructions جمینای Gem کپی کرده و فایل قرارداد MD بالا را در بخش دانش (Knowledge) بارگذاری کنید.'
                        : 'Paste this prompt in Gemini Gem Instructions and upload the MD contract file as Knowledge.'}
                    </p>

                    <div className="p-3 rounded-lg bg-white dark:bg-[#151515] border border-[#1a73e8]/30 max-h-40 overflow-y-auto font-mono text-[11px] text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed">
                      <pre className="whitespace-pre-wrap">{geminiInst}</pre>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#1a73e8]/20">
                    <button
                      onClick={() => {
                        copyToClipboard(geminiInst, 'gem_inst_' + currentContract.id);
                        setInstructionCopiedId('gem_' + currentContract.id);
                        setTimeout(() => setInstructionCopiedId(null), 2500);
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-semibold shadow-2xs transition-colors"
                    >
                      {instructionCopiedId === 'gem_' + currentContract.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>{lang === 'fa' ? 'دستورالعمل کپی شد!' : 'Copied!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{lang === 'fa' ? 'کپی دستورالعمل Gem' : 'Copy Gem Instruction'}</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => openCompanionWindow('https://gemini.google.com', 'gemini_companion')}
                      className="px-2.5 py-1.5 text-[11px] font-semibold rounded bg-[#1a73e8]/10 hover:bg-[#1a73e8]/20 text-[#1a73e8] dark:text-[#60a5fa] flex items-center gap-1 transition-colors cursor-pointer"
                      title={lang === 'fa' ? 'باز کردن Gemini در پنجره کناری' : 'Open Gemini in side window'}
                    >
                      <span>Gemini Gems</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Claude Projects Custom Instruction */}
                <div className="p-4 rounded-xl border border-[#d97706]/40 bg-[#fffbeb]/40 dark:bg-[#2b1f09]/30 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#b45309] dark:text-[#fbbf24]">
                        <FolderKanban className="w-4 h-4" />
                        <h4 className="font-bold text-xs sm:text-sm">
                          {lang === 'fa' ? 'دستورالعمل سیستمی برای Claude Projects' : 'Claude Projects Custom Instructions'}
                        </h4>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-[#d97706]/10 text-[#d97706]">
                        Claude Project Prompt
                      </span>
                    </div>

                    <p className="text-[11px] text-[#78350f] dark:text-[#fde68a] leading-relaxed">
                      {lang === 'fa'
                        ? 'این متن را در بخش Custom Instructions پروژه کلود کپی کرده و فایل قرارداد MD بالا را در Project Knowledge بارگذاری کنید.'
                        : 'Paste this in Claude Project Instructions and upload the MD contract file into Project Knowledge.'}
                    </p>

                    <div className="p-3 rounded-lg bg-white dark:bg-[#151515] border border-[#d97706]/30 max-h-40 overflow-y-auto font-mono text-[11px] text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed">
                      <pre className="whitespace-pre-wrap">{claudeInst}</pre>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#d97706]/20">
                    <button
                      onClick={() => {
                        copyToClipboard(claudeInst, 'claude_inst_' + currentContract.id);
                        setInstructionCopiedId('claude_' + currentContract.id);
                        setTimeout(() => setInstructionCopiedId(null), 2500);
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#b45309] hover:bg-[#92400e] text-white text-xs font-semibold shadow-2xs transition-colors"
                    >
                      {instructionCopiedId === 'claude_' + currentContract.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>{lang === 'fa' ? 'دستورالعمل کپی شد!' : 'Copied!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{lang === 'fa' ? 'کپی دستورالعمل Project' : 'Copy Project Instruction'}</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => openCompanionWindow('https://claude.ai', 'claude_companion')}
                      className="px-2.5 py-1.5 text-[11px] font-semibold rounded bg-[#b45309]/10 hover:bg-[#b45309]/20 text-[#b45309] dark:text-[#fbbf24] flex items-center gap-1 transition-colors cursor-pointer"
                      title={lang === 'fa' ? 'باز کردن Claude در پنجره کناری' : 'Open Claude in side window'}
                    >
                      <span>Claude Projects</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sample Test Queries for Students & Practitioners */}
              <div className="space-y-3 pt-3 border-t border-[#d9dad5]/60 dark:border-[#2d3942]/60">
                <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                  <BookmarkCheck className="w-4 h-4 text-[#b87333]" />
                  <span>{lang === 'fa' ? 'پرسش‌های نمونه برای آزمایش و ارزیابی دستیار قرارداد (قابل کپی با یک کلیک):' : 'Sample Test Prompts to Query the Contract Assistant:'}</span>
                </span>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {currentContract.sampleTestQueries.map((q, qIdx) => {
                    const activeQueryText = lang === 'fa' ? q.queryFa : q.queryEn;
                    const queryKey = `contract_q_${currentContract.id}_${qIdx}`;
                    const isCopied = copiedId === queryKey;

                    return (
                      <div
                        key={qIdx}
                        className="p-3.5 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#f8f9fa] dark:bg-[#12171b] space-y-2.5 flex flex-col justify-between"
                      >
                        <div className="space-y-1">
                          <h5 className="font-bold text-xs text-[#1c2830] dark:text-[#e8ebe9] leading-snug">
                            {lang === 'fa' ? q.titleFa : q.titleEn}
                          </h5>
                          <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] font-mono leading-relaxed bg-white dark:bg-[#151515] p-2 rounded-lg border border-[#d9dad5]/60 dark:border-[#2d3942]/60">
                            {activeQueryText}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-1 pt-1">
                          <button
                            onClick={() => loadPromptToSandbox(activeQueryText)}
                            className="text-[10px] font-semibold text-[#e0533c] dark:text-[#fb7185] hover:underline flex items-center gap-1"
                          >
                            <Play className="w-3 h-3" />
                            <span>{lang === 'fa' ? 'کارگاه' : 'Sandbox'}</span>
                          </button>

                          <button
                            onClick={() => copyToClipboard(activeQueryText, queryKey)}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold transition-colors ${
                              isCopied
                                ? 'bg-[#2f7d5b] text-white'
                                : 'bg-[#e0533c] hover:bg-[#163f4e] text-white'
                            }`}
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3 h-3 text-white" />
                                <span>{lang === 'fa' ? 'کپی شد' : 'Copied'}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>{lang === 'fa' ? 'کپی پرامپت' : 'Copy'}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step-by-Step Classroom Setup Guide */}
              <div className="p-4 rounded-xl bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5]/60 dark:border-[#2d3942]/60 space-y-2">
                <span className="text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-[#fbbf24]" />
                  <span>{lang === 'fa' ? 'راهنمای ۴ مرحله‌ای ساخت دستیار قرارداد در کلاس درس:' : '4-Step Classroom Setup Guide:'}</span>
                </span>
                <ol className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] space-y-1 list-decimal list-inside leading-relaxed">
                  <li>
                    {lang === 'fa'
                      ? 'فایل قرارداد MD را با کلید سبز بالا دانلود کنید و در سیستم خود نگه دارید.'
                      : 'Download the MD contract file using the green button above.'}
                  </li>
                  <li>
                    {lang === 'fa'
                      ? 'در Claude به منوی Projects -> New Project بروید (یا در Gemini به منوی Gems -> New Gem).'
                      : 'In Claude go to Projects -> New Project (or in Gemini to Gems -> New Gem).'}
                  </li>
                  <li>
                    {lang === 'fa'
                      ? 'فایل قرارداد MD را در بخش فایل‌های دانش (Project Knowledge / Files) بارگذاری کنید.'
                      : 'Upload the downloaded MD contract file into Project Knowledge / Files.'}
                  </li>
                  <li>
                    {lang === 'fa'
                      ? 'دستورالعمل سیستمی (System Instruction) بالا را کپی کرده و در بخش Instructions ذخیره کنید؛ دستیار اختصاصی شما آماده پاسخ‌گویی به دعاوی و تاخیرات است!'
                      : 'Paste the System Instruction above into the assistant instructions and hit save; your specialized contract advisor is live!'}
                  </li>
                </ol>
              </div>
            </div>
          </section>
        );
      })()}

      {/* SESSION 3 - MODULE 3-3: AI SKILLS MASTERCLASS (SKILL.MD) */}
      {(activeTab === 'all' || activeTab === 'skills_lab') && (
        <ObsidianBrainSkillsWorkshop
          lang={lang}
          copyToClipboard={copyToClipboard}
          copiedId={copiedId}
          onLoadToSandbox={loadPromptToSandbox}
          mode="agent_skills"
        />
      )}

      {/* SESSION 4 - MODULE 4-1: MCP PROTOCOL & SERVERS LAB */}
      {(activeTab === 'all' || activeTab === 'mcp_lab') && (
        <div className="space-y-4">
          {/* Pre-Session Prerequisite Checklist Callout */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <b className="text-amber-800 dark:text-amber-300 block">
                ⚡ چک‌لیست پیش‌نیاز قبل از جلسه ۴ (برای جلوگیری از اتلاف وقت نصب در کلاس):
              </b>
              <p className="text-[#261a1d] dark:text-[#faedf3]">
                ۱) نصب <code>Node.js LTS</code> (شامل دستور <code>npx</code>) · ۲) نصب <code>Claude Desktop</code> · ۳) ایجاد یک پوشه مشخص کاری روی درایو (مثلاً <code>D:/EPC_Project</code>) و ساخت توکن محدود گیت‌هاب.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-black text-[10px] shrink-0 self-start sm:self-center">
              پیش‌نیاز فنی جلسه ۴
            </span>
          </div>

          <ObsidianBrainSkillsWorkshop
            lang={lang}
            copyToClipboard={copyToClipboard}
            copiedId={copiedId}
            onLoadToSandbox={loadPromptToSandbox}
            mode="mcp_protocol"
          />
        </div>
      )}

      {/* SESSION 4 - MODULE 4-2: CLAUDE ENTERPRISE & GOOGLE CONNECTORS */}
      {(activeTab === 'all' || activeTab === 'connectors') && (
        <ClaudeEnterpriseConnectors
          lang={lang}
          copyToClipboard={copyToClipboard}
          copiedId={copiedId}
        />
      )}

      {/* SESSION 4 - MODULE 4-3: SAFETY GUARDRAILS, PAT SECURITY & HALLUCINATION DEFENSE */}
      {(activeTab === 'all' || activeTab === 'safety') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#8c3b2d]/10 text-[#8c3b2d] dark:text-[#f87171]">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span dir="ltr" className="px-2 py-0.5 rounded-md bg-[#8c3b2d] text-white text-xs font-black">۴-۳</span>
                  <h2 className="text-base sm:text-lg font-bold text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? 'خطوط قرمز امنیتی، حفاظت از توکن‌های گیت‌هاب (PAT) و مهار توهم' : 'Security Guardrails, PAT Safety & Hallucination Mitigation'}
                  </h2>
                </div>
                <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                  {lang === 'fa'
                    ? 'اصول حیاتی امنیت هنگام اتصال MCP به پوشه‌های سیستم و مخازن گیت‌هاب سازمانی'
                    : 'Critical security rules when connecting MCP servers to local folders and GitHub repositories.'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Rule 1: PAT & MCP Security */}
            <div className="p-5 rounded-xl border border-red-500/30 bg-red-500/[0.04] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#b91c1c] dark:text-[#f87171]">
                <Shield className="w-5 h-5" />
                <h3 className="font-bold text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                  امنیت توکن گیت‌هاب (PAT) و MCP
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                <li>• <b>هرگز توکن را در چت نفرستید:</b> توکن‌های <code>ghp_...</code> حکم کلید گاوصندوق را دارند؛ در صورت افشا در چت فوراً از Settings گیت‌هاب آن را <b>Revoke</b> کنید.</li>
                <li>• <b>حداقل دسترسی (Fine-Grained PAT):</b> توکن MCP را فقط به یک ریپازیتوری مشخص محدود کنید، نه کل اکانت.</li>
                <li>• <b>محدودسازی پوشه Filesystem:</b> فقط مسیر یک پوشه کاری (مثلاً <code>D:/Project</code>) را به MCP بدهید، نه کل درایو C یا Desktop.</li>
              </ul>
            </div>

            {/* Rule 2: Data Privacy & PII */}
            <div className="p-5 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#b91c1c] dark:text-[#f87171]">
                <ShieldAlert className="w-5 h-5" />
                <h3 className="font-bold text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa' ? 'سه قانون حریم خصوصی و محرمانگی' : '3 Non-Negotiable Privacy Rules'}
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                <li>
                  <strong className="text-[#1c2830] dark:text-[#e8ebe9]">۱. عدم درج اطلاعات حساس (PII):</strong> شماره ملی، رمزهای عبور و اسناد طبقه‌بندی‌شده را در چت عمومی وارد نکنید.
                </li>
                <li>
                  <strong className="text-[#1c2830] dark:text-[#e8ebe9]">۲. خاموش کردن Training:</strong> در تنظیمات حساب‌های عمومی گزینه آموزش مدل روی داده‌های چت را خاموش کنید.
                </li>
                <li>
                  <strong className="text-[#1c2830] dark:text-[#e8ebe9]">۳. تایید انسانی (Human-in-the-Loop):</strong> پیش از هر Commit یا حذف فایل توسط MCP، مجوز را شخصاً بررسی و تایید کنید.
                </li>
              </ul>
            </div>

            {/* Rule 3: Hallucination Mitigation */}
            <div className="p-5 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#c026d3] dark:text-[#fb7185]">
                <Info className="w-5 h-5" />
                <h3 className="font-bold text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                  {lang === 'fa' ? 'مهار خطای توهم در اعداد و استانداردها' : 'Tactics to Squash Hallucinations'}
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                <li>
                  <strong className="text-[#1c2830] dark:text-[#e8ebe9]">۱. شرط «نمی‌دانم»:</strong> الزام مدل به اعلام صریح در صورت نبود داده در اسناد مرجع.
                </li>
                <li>
                  <strong className="text-[#1c2830] dark:text-[#e8ebe9]">۲. الزام به Citation:</strong> درخواست ذکر شماره ماده، بند یا ردیف جدول برای هر عدد گزارش‌شده.
                </li>
                <li>
                  <strong className="text-[#1c2830] dark:text-[#e8ebe9]">۳. تله اعداد تاییدنشده:</strong> جداسازی برآوردهای شفاهی از ارقام قطعی صورت‌جلسات.
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* SESSION 4 - MODULE 4-4: OBSIDIAN SECOND BRAIN + CLAUDE & HERMES */}
      {(activeTab === 'all' || activeTab === 'obsidian_brain') && (
        <ObsidianBrainSkillsWorkshop
          lang={lang}
          copyToClipboard={copyToClipboard}
          copiedId={copiedId}
          onLoadToSandbox={loadPromptToSandbox}
          mode="obsidian_vault"
        />
      )}

      {/* ===================================================================== */}
      {/* SESSION 5 MODULES: FULL ORCHESTRATION, MASTERCLASS & VIBE CODING      */}
      {/* ===================================================================== */}
      {(activeTab === 'all' || activeTab === 's5_orchestration') && (
        <section className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#201729] border border-[#ecdcd8] dark:border-[#382645] shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#ecdcd8]/60 dark:border-[#382645]/60">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-lg bg-[#e0533c] text-white text-xs font-black shrink-0">۵-۱</span>
              <div>
                <h2 className="text-sm sm:text-base font-black text-[#261a1d] dark:text-[#faedf3]">
                  پروژه جامع پایان دوره (End-to-End Engineering Workflow) — ۲.۵ ساعت
                </h2>
                <p className="text-xs text-[#755e66] dark:text-[#ad99ab]">
                  اتصال زنجیره‌ای تمام قطعات پازل: Drive + Filesystem MCP + Skill + Artifact + GitHub MCP
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openS1Projector('s5_capstone', 0)}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black flex items-center gap-1.5 border border-amber-700 border-b-[3px] border-b-amber-900 active:translate-y-[2px] active:border-b cursor-pointer shadow-xs shrink-0 self-start sm:self-center"
            >
              <Monitor className="w-4 h-4" />
              <span>حالت اسلاید پروژکتور جلسه ۵</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#fdf8f5] dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] space-y-1">
              <span className="font-mono font-black text-[#e0533c]">گام ۱ · ورودی خام</span>
              <b className="block text-[#261a1d] dark:text-[#faedf3]">Google Drive / پوشه هارد</b>
              <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                فایل وضعیت کارگاه ({activeTrackMetaphor.trackLabelFa}) در پوشه محلی یا Drive قرار دارد.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#fdf8f5] dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] space-y-1">
              <span className="font-mono font-black text-[#c026d3]">گام ۲ · پایپ‌لاین داده</span>
              <b className="block text-[#261a1d] dark:text-[#faedf3]">خوانش خودکار با MCP</b>
              <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                کلاود بدون کپی-پیست، فایل‌ها را از طریق Filesystem / Drive MCP می‌خواند.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#fdf8f5] dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] space-y-1">
              <span className="font-mono font-black text-purple-600">گام ۳ · مغز پردازش</span>
              <b className="block text-[#261a1d] dark:text-[#faedf3]">ممیزی با SKILL.md</b>
              <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                بر اساس اسکیل کنترل پروژه شما، تاخیرات، گلوگاه‌ها و اعداد مشکوک را استخراج می‌کند.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#fdf8f5] dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] space-y-1">
              <span className="font-mono font-black text-amber-600">گام ۴ · مصورسازی</span>
              <b className="block text-[#261a1d] dark:text-[#faedf3]">تولید داشبورد Artifact</b>
              <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                خروجی را به صورت داشبورد تعاملی HTML/React همراه با جدول هشدارها می‌سازد.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#fdf8f5] dark:bg-[#16101c] border border-[#ecdcd8] dark:border-[#382645] space-y-1">
              <span className="font-mono font-black text-emerald-600">گام ۵ · انتشار در DCC</span>
              <b className="block text-[#261a1d] dark:text-[#faedf3]">Commit با GitHub MCP</b>
              <p className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                کد داشبورد و گزارش Markdown را مستقیماً در ریپازیتوری GitHub پروژه ثبت و منتشر می‌کند!
              </p>
            </div>
          </div>

          <details className="group rounded-2xl border border-[#ecdcd8] dark:border-[#382645] bg-[#fdf8f5] dark:bg-[#16101c] overflow-hidden transition-all">
            <summary className="cursor-pointer list-none p-4 flex items-center justify-between font-bold text-xs sm:text-sm select-none hover:bg-[#fdeee9]/40 dark:hover:bg-[#341528]/40 transition-colors">
              <div className="flex items-center gap-2 text-[#261a1d] dark:text-[#faedf3]">
                <Zap className="w-4 h-4 text-[#e0533c] shrink-0" />
                <span>بسط اختیاری: پرامپت جامع ارکستراسیون (اجرای کل زنجیره ۵ مرحله‌ای بالا با یک دستور واحد)</span>
              </div>
              <span className="text-[11px] font-normal text-[#755e66] dark:text-[#ad99ab] flex items-center gap-1 group-open:text-[#e0533c] shrink-0">
                <span>مشاهده و کپی پرامپت</span>
                <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
              </span>
            </summary>

            <div className="p-4 pt-3 border-t border-[#ecdcd8]/60 dark:border-[#382645]/60 space-y-3 text-xs">
              <pre dir="rtl" className="p-3.5 rounded-xl bg-[#1e1e1e] text-[#d4d4d4] font-mono text-[11px] leading-relaxed whitespace-pre-wrap text-right">
                {sessionCurriculum.s5CapstoneSlides[1].codeSnippet}
              </pre>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => copyToClipboard(sessionCurriculum.s5CapstoneSlides[1].codeSnippet || '', 's5_orchestration_prompt')}
                  className="px-4 py-2 rounded-xl bg-[#e0533c] hover:bg-[#c2410c] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedId === 's5_orchestration_prompt' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 's5_orchestration_prompt' ? 'پرامپت ارکستراسیون کپی شد!' : 'کپی پرامپت جامع ارکستراسیون'}</span>
                </button>
              </div>
            </div>
          </details>
        </section>
      )}

      {/* SESSION 5 - MODULE 5-2: ADVANCED ENGINEERING MASTERCLASS */}
      {(activeTab === 'all' || activeTab === 'masterclass') && (
        <Page0EngineeringMasterclass
          lang={lang}
          onLoadToSandbox={loadPromptToSandbox}
          copyToClipboard={copyToClipboard}
          copiedId={copiedId}
        />
      )}

      {/* SESSION 5 - MODULE 5-3: BRIDGE TO VIBE CODING */}
      {(activeTab === 'all' || activeTab === 's5_vibecoding') && (
        <section className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#261a1d] via-[#341528] to-[#16101c] text-white border border-[#e0533c]/40 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/15">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-lg bg-[#e0533c] text-white text-xs font-black shrink-0">۵-۳</span>
              <div>
                <h2 className="text-sm sm:text-base font-black text-white">
                  پل ورود به Vibe Coding؛ فردا قرار است چه کار کنیم؟ (۱.۵ ساعت)
                </h2>
                <p className="text-xs text-white/75">
                  گذر از تک‌فایل‌های محیط چت به ساخت نرم‌افزارهای کامل چندصفحه‌ای در محیط‌های توسعه هوشمند (Cursor, Windsurf, Claude Code)
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => openS1Projector('s5_capstone', 2)}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black flex items-center gap-1.5 border border-amber-700 border-b-[3px] border-b-amber-900 active:translate-y-[2px] active:border-b cursor-pointer shadow-xs shrink-0 self-start sm:self-center"
            >
              <Monitor className="w-4 h-4" />
              <span>اسلاید پروژکتور Vibe Coding</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
            «تا امروز در محیط چت (Claude و Gemini) تک‌فایل‌ها و مینی‌اپلیکیشن‌ها را ساختید، با Skills به آن‌ها روش کار دادید و با MCP به فایل‌ها و گیت‌هاب وصل شدید. در دوره <b>Vibe Coding</b>، ما همین مغز هوش مصنوعی، همین MCPها، همین Skills و همین GitHub را به داخل یک محیط توسعه حرفه‌ای (IDE) می‌بریم تا به جای یک صفحه داشبورد، یک نرم‌افزار کامل تحت وب یا دسکتاپ چندصفحه‌ای با دیتابیس واقعی بسازیم؛ بدون اینکه خودتان درگیر سینتکس کدنویسی شوید.»
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
            <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 space-y-1">
              <b className="text-[#fb7185] block">۱. میراث جلسه ۱ و ۴ (GitHub + MCP)</b>
              <p className="text-white/80 leading-relaxed">
                ریپازیتوری گیت‌هاب شما تبدیل به مخزن اصلی کد نرم‌افزار می‌شود و ایجنت مستقیماً در آن Commit و Branch می‌زند.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 space-y-1">
              <b className="text-amber-300 block">۲. میراث جلسه ۲ (Artifacts → Components)</b>
              <p className="text-white/80 leading-relaxed">
                تک‌صفحه‌های React که در Artifacts ساختید، به کامپوننت‌های ماژولار یک سیستم کامل سازمانی تبدیل می‌شوند.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 space-y-1">
              <b className="text-emerald-300 block">۳. میراث جلسه ۳ (SKILL.md → CLAUDE.md)</b>
              <p className="text-white/80 leading-relaxed">
                مهارت‌های استانداردی که نوشتید، در پوشه <code>.claude/skills/</code> پروژه قرار می‌گیرند تا ایجنت کدنویس دقیقاً طبق استاندارد شما کد بزند.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ===================================================================== */}
      {/* PERSISTENT PROMPT SANDBOX TOOL (ALWAYS AVAILABLE ACROSS ALL SESSIONS) */}
      {/* ===================================================================== */}
      <details
        id="prompt-sandbox"
        open={isSandboxOpen}
        onToggle={(e) => setIsSandboxOpen((e.currentTarget as HTMLDetailsElement).open)}
        className="group rounded-2xl border-2 border-[#e0533c]/35 dark:border-[#fb7185]/35 bg-white dark:bg-[#201729] shadow-xs overflow-hidden transition-all"
      >
        <summary className="cursor-pointer list-none p-4 sm:p-5 flex items-center justify-between gap-3 select-none hover:bg-[#fdeee9]/40 dark:hover:bg-[#341528]/40 transition-colors">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#e0533c]/10 text-[#e0533c] dark:text-[#fb7185]">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-[#1c2830] dark:text-[#e8ebe9]">
                {lang === 'fa' ? 'ابزار سراسری: سندباکس شخصی‌سازی و تست پرامپت (همیشه در دسترس)' : 'Global Tool: Interactive Prompt Customization Sandbox'}
              </h2>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                {lang === 'fa'
                  ? 'پرامپت‌های هر جلسه را اینجا ویرایش و شخصی‌سازی کنید و با یک کلیک در ChatGPT، Claude یا Gemini اجرا نمایید.'
                  : 'Edit and customize prompts from any session here, then copy and launch in ChatGPT, Claude, or Gemini.'}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-[#e0533c] dark:text-[#fb7185] flex items-center gap-1 shrink-0">
            <span>{isSandboxOpen ? (lang === 'fa' ? 'بستن سندباکس' : 'Close') : (lang === 'fa' ? 'باز کردن سندباکس' : 'Open Sandbox')}</span>
            <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
          </span>
        </summary>

        <div className="p-5 pt-3 border-t border-[#ecdcd8]/60 dark:border-[#382645]/60 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-semibold text-[#1c2830] dark:text-[#e8ebe9]">
              {lang === 'fa' ? 'پیش‌نویس پرامپت اختصاصی شما:' : 'Your Custom Prompt Draft:'}
            </span>

            <div className="flex items-center gap-2 text-xs flex-wrap">
              <button
                type="button"
                onClick={() =>
                  onChangeContent(
                    lang === 'fa'
                      ? disciplinePromptPair.engineeredPromptFa
                      : disciplinePromptPair.engineeredPromptEn
                  )
                }
                className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#e0533c]/10 hover:bg-[#e0533c]/20 text-[#e0533c] dark:text-[#fb7185] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>
                  {lang === 'fa'
                    ? `بارگذاری الگوی دیسیپلین ${discMeta.shortTitleFa}`
                    : `Load ${discMeta.shortTitleEn} Template`}
                </span>
              </button>
              <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                {lang === 'fa'
                  ? `${content.trim().length ? content.trim().split(/\s+/).length : 0} واژه · ${content.length} کاراکتر`
                  : `${content.trim().length ? content.trim().split(/\s+/).length : 0} words · ${content.length} chars`}
              </span>
              {content && (
                <button
                  onClick={() => onChangeContent('')}
                  className="flex items-center gap-1 text-[11px] text-[#b91c1c] dark:text-[#f87171] hover:underline"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{lang === 'fa' ? 'پاک کردن' : 'Clear'}</span>
                </button>
              )}
            </div>
          </div>

          <textarea
            rows={7}
            value={content}
            onChange={(e) => onChangeContent(e.target.value)}
            placeholder={
              lang === 'fa'
                ? 'پرامپت خود را اینجا بنویسید، یا از بخش کتابخانه پرامپت‌های بالا یکی را انتخاب کنید تا اینجا بارگذاری شود...\nفرمول RCTO را فراموش نکنید:\n[Role] تو مشاور ارشد...\n[Context] شرکت ما...\n[Task] این ۵ کار را انجام بده...\n[Output] در قالب جدول...'
                : 'Type your prompt here, or pick one from the library above...\nRemember the RCTO formula:\n[Role] You are a lead...\n[Context] Our organization...\n[Task] Perform these 5 steps...\n[Output] In a structured table...'
            }
            className="w-full p-4 rounded-xl border border-[#d9dad5] dark:border-[#2d3942] bg-[#fdfdfd] dark:bg-[#12171b] text-xs sm:text-sm font-mono text-[#1c2830] dark:text-[#e8ebe9] focus:outline-hidden focus:ring-2 focus:ring-[#e0533c] dark:focus:ring-[#fb7185] transition-all resize-y"
          />

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
            <button
              onClick={copySandboxToClipboard}
              disabled={!content.trim()}
              className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold shadow-xs transition-all ${
                sandboxCopied
                  ? 'bg-[#2f7d5b] text-white'
                  : content.trim()
                  ? 'bg-[#e0533c] hover:bg-[#c2410c] text-white'
                  : 'bg-[#d9dad5] dark:bg-[#2d3942] text-[#5d6b73] dark:text-[#9aa8b0] cursor-not-allowed'
              }`}
            >
              {sandboxCopied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>{lang === 'fa' ? 'پرامپت با موفقیت کپی شد!' : 'Copied to Clipboard!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{lang === 'fa' ? 'کپی پرامپت آماده' : 'Copy Prompt'}</span>
                </>
              )}
            </button>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-[#5d6b73] dark:text-[#9aa8b0] font-medium hidden md:inline">
                {lang === 'fa' ? 'تست فوری در:' : 'Test in:'}
              </span>

              <button
                type="button"
                onClick={() => openCompanionWindow('https://chatgpt.com', 'chatgpt_companion')}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-[#10a37f]/10 hover:bg-[#10a37f]/20 text-[#10a37f] border border-[#10a37f]/30 text-xs font-semibold transition-colors cursor-pointer"
                title={lang === 'fa' ? 'تست در پنجره کناری پلتفرم' : 'Test in side window'}
              >
                <span>ChatGPT</span>
                <ExternalLink className="w-3 h-3" />
              </button>

              <button
                type="button"
                onClick={() => openCompanionWindow('https://claude.ai', 'claude_companion')}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-[#d97706]/10 hover:bg-[#d97706]/20 text-[#d97706] border border-[#d97706]/30 text-xs font-semibold transition-colors cursor-pointer"
                title={lang === 'fa' ? 'تست در پنجره کناری پلتفرم' : 'Test in side window'}
              >
                <span>Claude</span>
                <ExternalLink className="w-3 h-3" />
              </button>

              <button
                type="button"
                onClick={() => openCompanionWindow('https://gemini.google.com', 'gemini_companion')}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-[#1a73e8]/10 hover:bg-[#1a73e8]/20 text-[#1a73e8] border border-[#1a73e8]/30 text-xs font-semibold transition-colors cursor-pointer"
                title={lang === 'fa' ? 'تست در پنجره کناری پلتفرم' : 'Test in side window'}
              >
                <span>Gemini</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </details>

      {/* ===================================================================== */}
      {/* WORKSHOP LINEAR PAGER CONTROLS (CLEAN, NO REDUNDANT KEYCAPS)          */}
      {/* ===================================================================== */}
      {activeTab && activeTab !== 'all' && (
        <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#1a1222]/90 backdrop-blur-md border border-[#ecdcd8] dark:border-[#382645] flex items-center justify-between gap-3 shadow-xs">
          <button
            type="button"
            onClick={handlePrevModule}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-[#ecdcd8] dark:border-[#382645] bg-black/[0.02] dark:bg-white/[0.04] hover:bg-[#e0533c]/10 text-[#261a1d] dark:text-[#faedf3] transition-all cursor-pointer active:scale-95"
          >
            <span>{lang === 'fa' ? '← ماژول قبلی' : '← Previous'}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#755e66] dark:text-[#ad99ab]">
              {currentModuleIdx >= 0 ? `${currentModuleIdx + 1} / ${MODULE_NAV_ITEMS.length}` : ''}
            </span>
            <button
              type="button"
              onClick={() => navPillsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="p-1.5 rounded-lg text-xs font-bold text-[#e0533c] dark:text-[#fb7185] hover:bg-[#e0533c]/10 transition-colors cursor-pointer"
              title={lang === 'fa' ? 'بازگشت به بالای سرفصل‌ها' : 'Scroll to top'}
            >
              ↑
            </button>
          </div>

          <button
            type="button"
            onClick={handleNextModule}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#e0533c] to-[#c026d3] text-white hover:brightness-110 shadow-xs transition-all cursor-pointer active:scale-95"
          >
            <span>{lang === 'fa' ? 'ماژول بعدی →' : 'Next Module →'}</span>
          </button>
        </div>
      )}

      {/* Prominent Footer Call to Action: Proceed to Page 1 */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#fdeee9] via-[#fbdcd5] to-[#f9cac1] dark:from-[#341528] dark:via-[#2a1220] dark:to-[#1d0c16] border border-[#e0533c]/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1 text-center sm:text-right">
          <span className="text-xs font-bold text-[#e0533c] dark:text-[#fb7185] block">
            {lang === 'fa' ? 'پایان پیش‌نیاز · ورود به متدولوژی استاندارد پروژه' : 'Prerequisite Complete · Enter Official CPMAI Standard'}
          </span>
          <h4 className="text-sm sm:text-base font-extrabold text-[#1c2830] dark:text-[#e8ebe9]">
            {lang === 'fa'
              ? 'ورود به فاز اول CPMAI: درک کسب‌وکار (صفحه ۱ از ۵)'
              : 'Proceed to CPMAI Phase I: Business Understanding (Page 1)'}
          </h4>
          <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
            {lang === 'fa'
              ? 'اکنون که جعبه‌ابزار LLM را در اختیار دارید، تعریف نیازمندی‌ها، اهداف و داستان کاربر پروژه هوش مصنوعی را آغاز کنید.'
              : 'Armed with the LLM toolkit, define business goals, constraints, and sprint user stories.'}
          </p>
        </div>

        <button
          type="button"
          onClick={onGoToPage1}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold rounded-xl bg-[#e0533c] hover:bg-[#c2410c] active:scale-[0.98] text-white transition-all shadow-sm hover:scale-[1.02] shrink-0"
        >
          <span>{lang === 'fa' ? 'شروع فاز اول CPMAI (صفحه ۱)' : 'Start CPMAI Phase I (Page 1)'}</span>
          {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </button>
      </div>

      {/* FULL-SCREEN PROJECTOR SLIDE MODALS FOR SESSION 1 & SESSION 5 */}
      {s1ProjectorDeck === 's1_demo' && (
        <ProjectorSlideModal
          isOpen={true}
          onClose={() => setS1ProjectorDeck(null)}
          deckTitleFa={
            industryTrack === 'PAYA_SAMAN_PARS'
              ? 'دموی ۱۵ دقیقه‌ای خروجی نهایی و معماری دوره پایا سامان پارس'
              : 'دموی ۱۵ دقیقه‌ای خروجی نهایی و معماری دوره ۲۰ ساعته'
          }
          deckSubtitleFa={`جلسه ۱ · ماژول ۱-۱ (${sessionCurriculum.s1DemoSlides.length} اسلاید)`}
          accentColor="purple"
          slides={sessionCurriculum.s1DemoSlides}
          activeIndex={s1SlideIndex}
          onChangeIndex={setS1SlideIndex}
          copyToClipboard={copyToClipboard}
          copiedId={copiedId}
        />
      )}

      {s1ProjectorDeck === 's1_drive' && (
        <ProjectorSlideModal
          isOpen={true}
          onClose={() => setS1ProjectorDeck(null)}
          deckTitleFa={
            industryTrack === 'PAYA_SAMAN_PARS'
              ? 'Google Drive و استانداردسازی جداول ۱۴ شرکت تابعه پایا'
              : 'آموزش کامل Google Drive و استانداردسازی جداول ماشین‌خوان'
          }
          deckSubtitleFa={`جلسه ۱ · ماژول ۱-۲ (${sessionCurriculum.s1DriveSlides.length} اسلاید)`}
          accentColor="blue"
          slides={sessionCurriculum.s1DriveSlides}
          activeIndex={s1SlideIndex}
          onChangeIndex={setS1SlideIndex}
          copyToClipboard={copyToClipboard}
          copiedId={copiedId}
        />
      )}

      {s1ProjectorDeck === 's1_markdown' && (
        <ProjectorSlideModal
          isOpen={true}
          onClose={() => setS1ProjectorDeck(null)}
          deckTitleFa="زبان Markdown (.md)؛ زبان مشترک مهندس، گیت‌هاب و هوش مصنوعی"
          deckSubtitleFa={`جلسه ۱ · ماژول ۱-۳ (${sessionCurriculum.s1MarkdownSlides.length} اسلاید)`}
          accentColor="purple"
          slides={sessionCurriculum.s1MarkdownSlides}
          activeIndex={s1SlideIndex}
          onChangeIndex={setS1SlideIndex}
          copyToClipboard={copyToClipboard}
          copiedId={copiedId}
        />
      )}

      {s1ProjectorDeck === 's1_github' && (
        <ProjectorSlideModal
          isOpen={true}
          onClose={() => setS1ProjectorDeck(null)}
          deckTitleFa="گیت‌هاب (GitHub) از صفر مطلق به زبان دفتر فنی و کنترل مدارک (DCC)"
          deckSubtitleFa={`جلسه ۱ · ماژول ۱-۴ (${sessionCurriculum.s1GithubSlides.length} اسلاید)`}
          accentColor="teal"
          slides={sessionCurriculum.s1GithubSlides}
          activeIndex={s1SlideIndex}
          onChangeIndex={setS1SlideIndex}
          copyToClipboard={copyToClipboard}
          copiedId={copiedId}
        />
      )}

      {s1ProjectorDeck === 's5_capstone' && (
        <ProjectorSlideModal
          isOpen={true}
          onClose={() => setS1ProjectorDeck(null)}
          deckTitleFa="ارکستراسیون کامل پایان دوره و پل ورود به Vibe Coding"
          deckSubtitleFa="جلسه ۵ · ماژول‌های ۵-۱ و ۵-۳"
          accentColor="purple"
          slides={sessionCurriculum.s5CapstoneSlides}
          activeIndex={s1SlideIndex}
          onChangeIndex={setS1SlideIndex}
          copyToClipboard={copyToClipboard}
          copiedId={copiedId}
        />
      )}
    </div>
  );
};
