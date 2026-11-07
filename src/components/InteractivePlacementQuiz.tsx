import React, { useState, useEffect, useMemo } from 'react';
import { Language } from '../types/cpmai';
import {
  QUIZ_LEVELS,
  QuizResultLevel,
  ToolReadinessLevel,
  ToolReadinessCategoryKey,
  ToolReadinessItem,
  ToolReadinessCategory,
  TOOL_READINESS_ITEMS,
  TOOL_READINESS_CATEGORIES,
  TOOL_RATING_LEVELS
} from '../data/placement_quiz_data';
import {
  IndustryTrackId,
  DisciplineId,
  getSavedIndustryTrack,
  getSavedDiscipline,
  INDUSTRY_TRACKS
} from '../types/industryTrack';
import { getDisciplineMetadata } from '../data/disciplineExamplesRegistry';
import { OWJ_LOGO, OWJ_LOGO_FALLBACK } from '../data/logo';
import {
  Sparkles,
  GitBranch,
  GitPullRequest,
  GitCommit,
  Brain,
  Cpu,
  Database,
  BookOpen,
  Headphones,
  Key,
  FileSpreadsheet,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Award,
  Download,
  Copy,
  Printer,
  ExternalLink,
  Play,
  Check,
  ChevronRight,
  ChevronLeft,
  BookCheck,
  Target,
  Layers,
  Lightbulb,
  User,
  Trophy,
  Sliders,
  CheckSquare
} from 'lucide-react';

import { UserProfile, AiFamiliarityLevel } from '../types/auth';
import { lmsApi } from '../services/lmsApi';
import { AlignmentIndex } from '../types/lms';

interface InteractivePlacementQuizProps {
  lang: Language;
  onNavigateToPage: (page: number) => void;
  onCloseQuiz?: () => void;
  onOpenLeaderboard?: () => void;
  currentUser?: UserProfile | null;
  disciplineId?: DisciplineId;
  industryTrack?: IndustryTrackId;
}

const STORAGE_QUIZ_KEY = 'cpmai-readiness-quiz-result-v1';

export const InteractivePlacementQuiz: React.FC<InteractivePlacementQuizProps> = ({
  lang,
  onNavigateToPage,
  onCloseQuiz,
  onOpenLeaderboard,
  currentUser,
  disciplineId: propDisciplineId,
  industryTrack: propIndustryTrack
}) => {
  const effectiveTrack: IndustryTrackId =
    propIndustryTrack ||
    (propDisciplineId ? getDisciplineMetadata(propDisciplineId).trackId : getSavedIndustryTrack());
  const effectiveDiscipline: DisciplineId =
    propDisciplineId || getSavedDiscipline(effectiveTrack);
  const discMeta = getDisciplineMetadata(effectiveDiscipline);
  const trackInfo = INDUSTRY_TRACKS[effectiveTrack];

  const [quizState, setQuizState] = useState<'intro' | 'question' | 'result'>('intro');
  const [alignmentIndex, setAlignmentIndex] = useState<AlignmentIndex | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<AiFamiliarityLevel>(
    currentUser?.aiLevel || 'intermediate'
  );
  const [toolRatings, setToolRatings] = useState<Record<string, ToolReadinessLevel>>({});
  const [candidateName, setCandidateName] = useState<string>(
    currentUser?.displayName || 'مهندس / مدیر پروژه'
  );
  const [copiedReport, setCopiedReport] = useState<boolean>(false);
  const [savedResult, setSavedResult] = useState<{
    score: number;
    total: number;
    levelKey: string;
    track: string;
    date: string;
    toolRatings?: Record<string, ToolReadinessLevel>;
  } | null>(null);

  // Sync selected track with user profile if available
  useEffect(() => {
    if (currentUser?.aiLevel) {
      setSelectedTrack(currentUser.aiLevel);
    }
    if (currentUser?.displayName) {
      setCandidateName(currentUser.displayName);
    }
  }, [currentUser?.aiLevel, currentUser?.displayName]);

  // Load previous result from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_QUIZ_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSavedResult(parsed);
        if (parsed.toolRatings) {
          setToolRatings(parsed.toolRatings);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const totalTools = TOOL_READINESS_ITEMS.length; // 12
  const maxScore = totalTools * 3; // 36

  const ratedCount = useMemo(() => {
    return Object.keys(toolRatings).length;
  }, [toolRatings]);

  const calculateScore = () => {
    return TOOL_READINESS_ITEMS.reduce((sum, item) => sum + (toolRatings[item.id] ?? 0), 0);
  };

  const currentScore = calculateScore();
  const currentPct = maxScore > 0 ? Math.round((currentScore / maxScore) * 100) : 0;
  const currentResultLevel: QuizResultLevel =
    QUIZ_LEVELS.find((lvl) => currentPct >= lvl.minPercentage && currentPct <= lvl.maxPercentage) ||
    QUIZ_LEVELS[0];

  const candidateDisplayName =
    currentUser?.displayName || candidateName || 'مهندس / مدیر پروژه';
  const candidateSpecialty = currentUser?.specialty || 'مدیریت و مهندسی پروژه';
  const candidatePhone = currentUser?.phone || '';

  const handleRateTool = (toolId: string, level: ToolReadinessLevel) => {
    setToolRatings((prev) => ({
      ...prev,
      [toolId]: level
    }));
  };

  const handleSelectAllLevel = (level: ToolReadinessLevel) => {
    const all: Record<string, ToolReadinessLevel> = {};
    TOOL_READINESS_ITEMS.forEach((tool) => {
      all[tool.id] = level;
    });
    setToolRatings(all);
  };

  const handleResetRatings = () => {
    setToolRatings({});
  };

  const handleStartQuiz = () => {
    setQuizState('question');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Category Breakdown Calculations (5 Categories)
  const getCategoryStats = (categoryKey: ToolReadinessCategoryKey) => {
    const tools = TOOL_READINESS_ITEMS.filter((t) => t.category === categoryKey);
    const earnedScore = tools.reduce((sum, t) => sum + (toolRatings[t.id] ?? 0), 0);
    const totalCategoryMax = tools.length * 3;
    const percentage = totalCategoryMax > 0 ? Math.round((earnedScore / totalCategoryMax) * 100) : 0;
    return { earnedScore, maxScore: totalCategoryMax, percentage, count: tools.length };
  };

  const finishQuiz = () => {
    const finalScore = calculateScore();
    const finalPercentage = Math.round((finalScore / maxScore) * 100);
    const resultLevel =
      QUIZ_LEVELS.find((lvl) => finalPercentage >= lvl.minPercentage && finalPercentage <= lvl.maxPercentage) ||
      QUIZ_LEVELS[0];

    const record = {
      score: finalScore,
      total: maxScore,
      levelKey: resultLevel.levelKey,
      track: selectedTrack,
      toolRatings,
      date: new Date().toLocaleDateString(lang === 'fa' ? 'fa-IR' : 'en-US')
    };

    try {
      localStorage.setItem(STORAGE_QUIZ_KEY, JSON.stringify(record));
      setSavedResult(record);
    } catch {
      // ignore
    }

    // Submit assessment to backend LMS API to record score and compute Tier Alignment Index
    lmsApi
      .submitAssessment({
        testedTier: selectedTrack,
        rawScore: finalScore,
        maxScore: maxScore,
        percentage: finalPercentage
      })
      .then((res) => {
        if (res.success && res.result?.alignmentIndex) {
          setAlignmentIndex(res.result.alignmentIndex);
        } else {
          // Local fallback calculation based on percentage
          let localIdx: AlignmentIndex = finalPercentage < 40 ? 'Below Tier' : 'Matches';
          if (finalPercentage >= 75) localIdx = 'Above Tier';
          setAlignmentIndex(localIdx);
        }
      })
      .catch(() => {
        let localIdx: AlignmentIndex = finalPercentage < 40 ? 'Below Tier' : 'Matches';
        if (finalPercentage >= 75) localIdx = 'Above Tier';
        setAlignmentIndex(localIdx);
      });

    setQuizState('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const trackLabelFa: Record<AiFamiliarityLevel, string> = {
    beginner: 'مقدماتی (Beginner)',
    intermediate: 'متوسط (Intermediate)',
    advanced: 'پیشرفته (Advanced)',
    BEGINNER: 'مقدماتی (Beginner)',
    INTERMEDIATE: 'متوسط (Intermediate)',
    ADVANCED: 'پیشرفته (Advanced)'
  };

  const trackLabelEn: Record<AiFamiliarityLevel, string> = {
    beginner: 'Beginner Track',
    intermediate: 'Intermediate Track',
    advanced: 'Advanced Track',
    BEGINNER: 'Beginner Track',
    INTERMEDIATE: 'Intermediate Track',
    ADVANCED: 'Advanced Track'
  };

  const handleCopyReport = () => {
    const domainTrackBadgeFa =
      effectiveTrack === 'GENERAL_EVERYDAY'
        ? `حوزه ارزیابی‌شده: سبک زندگی، خانواده و کاربردهای روزمره (${discMeta.titleFa})`
        : effectiveTrack === 'ENERGY_PETRO'
        ? `حوزه تخصصی ارزیابی‌شده: صنایع نفت، گاز، پالایش و پتروشیمی (${discMeta.titleFa})`
        : `حوزه تخصصی ارزیابی‌شده: مگاپروژه‌های عمرانی، راه، ترابری و ابنیه کلان (${discMeta.titleFa})`;

    const domainTrackBadgeEn =
      effectiveTrack === 'GENERAL_EVERYDAY'
        ? `Evaluated Track: Everyday & Family AI (${discMeta.titleEn})`
        : effectiveTrack === 'ENERGY_PETRO'
        ? `Evaluated Industry Track: Oil, Gas & Petrochemical Engineering (${discMeta.titleEn})`
        : `Evaluated Industry Track: Mega Civil & Transportation Infrastructure (${discMeta.titleEn})`;

    const reportText = `🏆 کارنامه رسمی ماتریس آمادگی ابزارهای هوش مصنوعی و مهندسی
مشاوران مدیریت کسب و کار اوج (OWJ)
نام شرکت‌کننده: ${candidateDisplayName}
تخصص / دیسیپلین: ${discMeta.titleFa}
${lang === 'fa' ? domainTrackBadgeFa : domainTrackBadgeEn}
${candidatePhone ? `شماره تماس: ${candidatePhone}\n` : ''}سطح خوداظهاری پایه: ${trackLabelFa[selectedTrack]}
امتیاز کل ابزارها: ${currentScore} از ${maxScore} (${currentPct}%)
سطح احراز شده: ${lang === 'fa' ? currentResultLevel.titleFa : currentResultLevel.titleEn}
نشان شایستگی: ${lang === 'fa' ? currentResultLevel.badgeFa : currentResultLevel.badgeEn}
تاریخ ارزیابی: ${new Date().toLocaleDateString(lang === 'fa' ? 'fa-IR' : 'en-US')}

تفکیک آمادگی در حوزه‌های پنج‌گانه ابزارها:
• مدل‌های زبانی و چت‌بات‌ها: ${getCategoryStats('chatbots').earnedScore}/${getCategoryStats('chatbots').maxScore} (${getCategoryStats('chatbots').percentage}%)
• کنترل نسخه و گیت‌هاب: ${getCategoryStats('git_vcs').earnedScore}/${getCategoryStats('git_vcs').maxScore} (${getCategoryStats('git_vcs').percentage}%)
• کدنویسی هوشمند و ایجنت‌ها: ${getCategoryStats('ai_coding_agents').earnedScore}/${getCategoryStats('ai_coding_agents').maxScore} (${getCategoryStats('ai_coding_agents').percentage}%)
• مدیریت دانش و مغز دوم (RAG): ${getCategoryStats('pkm_docs').earnedScore}/${getCategoryStats('pkm_docs').maxScore} (${getCategoryStats('pkm_docs').percentage}%)
• کلیدهای API و اتوماسیون: ${getCategoryStats('api_automation').earnedScore}/${getCategoryStats('api_automation').maxScore} (${getCategoryStats('api_automation').percentage}%)

پلتفرم یادگیری هوش مصنوعی اوج: https://owjbc.com`;

    navigator.clipboard.writeText(reportText);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const renderIcon = (iconName: string, className = 'w-4 h-4') => {
    switch (iconName) {
      case 'Brain':
        return <Brain className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'GitBranch':
        return <GitBranch className={className} />;
      case 'GitPullRequest':
        return <GitPullRequest className={className} />;
      case 'GitCommit':
        return <GitCommit className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      case 'Database':
        return <Database className={className} />;
      case 'BookOpen':
        return <BookOpen className={className} />;
      case 'Headphones':
        return <Headphones className={className} />;
      case 'Key':
        return <Key className={className} />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className={className} />;
      case 'Sliders':
        return <Sliders className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 select-text">
      {/* ============================================================== */}
      {/* 1. INTRO VIEW */}
      {/* ============================================================== */}
      {quizState === 'intro' && (
        <div className="space-y-6">
          {/* Main Hero Card */}
          <div className="p-1.5 rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="rounded-[calc(1.5rem-0.375rem)] bg-gradient-to-br from-[#e0533c] via-[#9333ea] to-[#122b34] text-white p-6 sm:p-9 space-y-6 relative overflow-hidden">
              {/* Background ambient glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#2f7d5b]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-4 relative z-10">
                {/* Header Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold tracking-wide">
                  <Sliders className="w-3.5 h-3.5 text-[#fbbf24]" />
                  <span>
                    {lang === 'fa'
                      ? 'ماتریس سنجش جعبه‌ابزار هوش مصنوعی · ۱۲ ابزار کلیدی'
                      : 'AI Tools Readiness Matrix · 12 Core Capabilities'}
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                  {lang === 'fa'
                    ? 'سنجش عملی سطح آشنایی با ابزارهای هوش مصنوعی'
                    : 'Practical AI Tools Familiarity & Capability Diagnostic'}
                </h1>

                {/* Description */}
                <p className="text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
                  {lang === 'fa'
                    ? 'به جای سوالات تئوری چهارگزینه‌ای، سطح تسلط و کاربرد واقعی خود را در ۱۲ ابزار و پلتفرم کلیدی دوره‌های آموزشی مشخص کنید تا شناخت دقیقی از جعبه‌ابزار فعلی شما به دست آید.'
                    : 'A rapid, self-declared readiness matrix across 12 frontier tools covering Chatbots, Git, Coding Agents, Second-Brain PKM, and API Automations.'}
                </p>

                {/* Target Track & Discipline Indicator */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs">
                    <span className="text-white/60">{lang === 'fa' ? 'حوزه تخصصی:' : 'Industry Track:'}</span>
                    <span className="font-bold text-[#fbbf24]">{discMeta.titleFa}</span>
                    <span className="text-[10px] text-white/50">({trackInfo.shortTitleFa})</span>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs">
                    <span className="text-white/60">{lang === 'fa' ? 'مدت زمان سنجش:' : 'Estimated Time:'}</span>
                    <span className="font-bold text-[#6ee7b7]">{lang === 'fa' ? 'کمتر از ۱ دقیقه' : '< 1 minute'}</span>
                  </div>
                </div>
              </div>

              {/* 5 Pillars Preview Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative z-10 pt-2">
                {TOOL_READINESS_CATEGORIES.map((cat, idx) => (
                  <div key={cat.key} className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-1.5">
                    <div className="flex items-center gap-2 text-[#fbbf24] font-bold text-xs">
                      {renderIcon(cat.iconName, 'w-4 h-4 shrink-0')}
                      <span className="truncate">{idx + 1}. {lang === 'fa' ? cat.titleFa : cat.titleEn}</span>
                    </div>
                    <p className="text-[11px] text-white/75 leading-relaxed line-clamp-2">
                      {lang === 'fa' ? cat.descFa : cat.descEn}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 relative z-10">
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-[#99e2b4] shrink-0" />
                  <span>
                    {lang === 'fa'
                      ? '۴ سطح شفاف: نشنیده‌ام (۰) | فقط نامش را شنیده‌ام (۱) | استفاده معمولی (۲) | کاربر حرفه‌ای (۳)'
                      : '4 Clear tiers: Never heard (0) | Heard of it (1) | Regular user (2) | Power user (3)'}
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {savedResult && (
                    <button
                      onClick={() => setQuizState('result')}
                      className="px-4 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all border border-white/20 active:scale-[0.96]"
                    >
                      <span>
                        {lang === 'fa'
                          ? `مشاهده آخرین کارنامه (${savedResult.score}/${savedResult.total})`
                          : `View Last Result (${savedResult.score}/${savedResult.total})`}
                      </span>
                    </button>
                  )}

                  <button
                    onClick={handleStartQuiz}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2f7d5b] hover:bg-[#256347] text-white font-extrabold text-sm shadow-md transition-all active:scale-[0.96] hover:scale-[1.02]"
                  >
                    <span>{lang === 'fa' ? 'شروع ماتریس سنجش ابزارها 🚀' : 'Start Tools Matrix 🚀'}</span>
                    {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Explanatory FAQ for Newcomers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#161e24] border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-2">
              <span className="text-xs font-bold text-[#e0533c] dark:text-[#fb7185] flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                <span>{lang === 'fa' ? 'چرا خوداظهاری ابزارها؟' : 'Why Self-Declared Tools?'}</span>
              </span>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa'
                  ? 'هدف ما ایجاد اضطراب امتحان نیست، بلکه می‌خواهیم تصویری صادقانه و بی‌واسطه از تجربه کاری شما داشته باشیم تا آموزش دقیقاً از نقطه توانمندی شما آغاز شود.'
                  : 'Zero exam anxiety. A frictionless diagnostic snapshot to tailor workshops and course materials directly to your actual toolkit.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#161e24] border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-2">
              <span className="text-xs font-bold text-[#b87333] flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" />
                <span>{lang === 'fa' ? 'اهمیت Git، Claude و NotebookLM' : 'Core 2026 AI Stack'}</span>
              </span>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa'
                  ? 'هوش مصنوعی مدرن فقط چت‌بات نیست؛ شامل کنترل نسخه، ایجنت‌های کدنویسی، حافظه دوم سازمانی و پایپ‌لاین‌های خودکار است.'
                  : 'Engineering AI spans far beyond ChatGPT — it combines Git versioning, autonomous CLI agents, grounded PKM, and API pipelines.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#161e24] border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-2">
              <span className="text-xs font-bold text-[#2f7d5b] dark:text-[#52b788] flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>{lang === 'fa' ? 'گواهی و نقشه راه اختصاصی' : 'Certificate & Roadmap'}</span>
              </span>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa'
                  ? 'پس از تکمیل ماتریس، شاخص آمادگی ابزاری و تفکیک پنج‌گانه مهارت‌ها به همراه نقشه یادگیری اختصاصی صادر می‌شود.'
                  : 'Instantly receive your official Tool Readiness Certificate with categorized capability breakdown and direct links to lessons.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. ACTIVE TOOLS MATRIX VIEW */}
      {/* ============================================================== */}
      {quizState === 'question' && (
        <div className="space-y-6">
          {/* Top Sticky Progress & Status Bar */}
          <div className="sticky top-2 z-20 p-4 sm:p-5 rounded-2xl bg-white/95 dark:bg-[#161e24]/95 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.1] shadow-lg space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="px-3 py-1 rounded-xl bg-[#e0533c] text-white font-black text-xs shadow-xs">
                  {lang === 'fa'
                    ? `${ratedCount} از ${totalTools} ابزار ارزیابی شده`
                    : `${ratedCount} of ${totalTools} tools evaluated`}
                </span>

                <div className="flex items-center gap-1.5 text-xs font-bold text-[#5d6b73] dark:text-[#9aa8b0]">
                  <span>{lang === 'fa' ? 'امتیاز فعلی:' : 'Current Score:'}</span>
                  <span className="font-mono font-black text-sm text-[#e0533c] dark:text-[#fb7185]">
                    {currentScore} / {maxScore}
                  </span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10">
                    {currentPct}%
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectAllLevel(2)}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold transition-colors"
                  title={lang === 'fa' ? 'علامت‌گذاری همه ابزارها با سطح معمولی' : 'Mark all as regular user'}
                >
                  {lang === 'fa' ? 'انتخاب همه: معمولی (۲)' : 'All: Regular'}
                </button>

                <button
                  type="button"
                  onClick={handleResetRatings}
                  className="px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[#5d6b73] dark:text-[#9aa8b0] text-[11px] font-bold transition-colors"
                >
                  {lang === 'fa' ? 'بازنشانی' : 'Reset'}
                </button>

                <button
                  type="button"
                  onClick={() => setQuizState('intro')}
                  className="text-xs font-medium text-[#5d6b73] dark:text-[#9aa8b0] hover:text-rose-600 transition-colors px-2 py-1"
                >
                  {lang === 'fa' ? 'بازگشت' : 'Back'}
                </button>
              </div>
            </div>

            {/* Overall Progress Bar */}
            <div className="w-full h-2 bg-black/[0.06] dark:bg-white/[0.08] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#e0533c] to-[#2f7d5b] rounded-full transition-all duration-300"
                style={{ width: `${Math.round((ratedCount / totalTools) * 100)}%` }}
              />
            </div>
          </div>

          {/* Matrix Categories & Tool Cards */}
          <div className="space-y-6">
            {TOOL_READINESS_CATEGORIES.map((category) => {
              const categoryTools = TOOL_READINESS_ITEMS.filter((t) => t.category === category.key);
              const catStats = getCategoryStats(category.key);

              return (
                <div
                  key={category.key}
                  className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161e24] border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-4"
                >
                  {/* Category Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-black/[0.05] dark:border-white/[0.06]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#e0533c]/15 to-[#9333ea]/15 dark:from-[#e0533c]/25 dark:to-[#9333ea]/25 text-[#e0533c] dark:text-[#fb7185] flex items-center justify-center shrink-0">
                        {renderIcon(category.iconName, 'w-5 h-5')}
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-black text-[#1c2830] dark:text-[#e8ebe9]">
                          {lang === 'fa' ? category.titleFa : category.titleEn}
                        </h2>
                        <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                          {lang === 'fa' ? category.descFa : category.descEn}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className="font-mono text-xs font-bold text-[#5d6b73] dark:text-[#9aa8b0] bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-lg">
                        {catStats.earnedScore} / {catStats.maxScore} ({catStats.percentage}%)
                      </span>
                    </div>
                  </div>

                  {/* Tools Grid within this Category */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {categoryTools.map((tool) => {
                      const currentRating = toolRatings[tool.id];

                      return (
                        <div
                          key={tool.id}
                          className={`p-4 rounded-2xl border transition-all duration-150 space-y-3 ${
                            currentRating !== undefined
                              ? 'bg-[#f8f9fa] dark:bg-[#12171b] border-black/[0.08] dark:border-white/[0.12] shadow-xs'
                              : 'bg-white dark:bg-[#141b21] border-black/[0.04] dark:border-white/[0.06]'
                          }`}
                        >
                          {/* Tool Header */}
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-xl bg-black/5 dark:bg-white/10 text-[#e0533c] dark:text-[#fb7185] flex items-center justify-center shrink-0 font-bold text-xs">
                                {renderIcon(tool.iconName, 'w-4 h-4')}
                              </div>
                              <div>
                                <h3 className="text-sm font-black text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                                  <span>{tool.name}</span>
                                  <span className="text-[11px] font-normal text-[#5d6b73] dark:text-[#9aa8b0]">
                                    ({lang === 'fa' ? tool.titleFa : tool.titleEn})
                                  </span>
                                </h3>
                              </div>
                            </div>

                            {currentRating !== undefined && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#2f7d5b]/15 text-[#2f7d5b] dark:text-[#52b788] border border-[#2f7d5b]/20">
                                {TOOL_RATING_LEVELS.find((l) => l.level === currentRating)?.[lang === 'fa' ? 'labelFa' : 'labelEn']}
                              </span>
                            )}
                          </div>

                          {/* Tool Description */}
                          <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                            {lang === 'fa' ? tool.descriptionFa : tool.descriptionEn}
                          </p>

                          {/* 4 Rating Buttons / Pills */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
                            {TOOL_RATING_LEVELS.map((tier) => {
                              const isSelected = currentRating === tier.level;

                              let activeStyles =
                                'bg-black/[0.03] dark:bg-white/[0.04] border-black/[0.06] dark:border-white/[0.08] text-[#5d6b73] dark:text-[#9aa8b0] hover:bg-black/5 dark:hover:bg-white/10';

                              if (isSelected) {
                                if (tier.level === 0) {
                                  activeStyles = 'bg-slate-200 dark:bg-slate-800 border-slate-400 text-slate-800 dark:text-slate-200 font-bold ring-2 ring-slate-400/30';
                                } else if (tier.level === 1) {
                                  activeStyles = 'bg-blue-500/15 border-blue-500 text-blue-700 dark:text-blue-300 font-bold ring-2 ring-blue-500/30';
                                } else if (tier.level === 2) {
                                  activeStyles = 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold ring-2 ring-emerald-500/30';
                                } else {
                                  activeStyles = 'bg-purple-500/15 border-purple-500 text-purple-700 dark:text-purple-300 font-bold ring-2 ring-purple-500/30';
                                }
                              }

                              return (
                                <button
                                  key={tier.level}
                                  type="button"
                                  onClick={() => handleRateTool(tool.id, tier.level)}
                                  className={`p-2 rounded-xl border text-center transition-all duration-150 flex flex-col items-center justify-center gap-0.5 active:scale-95 ${activeStyles}`}
                                >
                                  <span className="text-[11px] font-bold leading-tight">
                                    {lang === 'fa' ? tier.labelFa : tier.labelEn}
                                  </span>
                                  <span className="text-[10px] font-mono opacity-60">
                                    ({tier.level} {lang === 'fa' ? 'امتیاز' : 'pts'})
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Floating / Fixed Action Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#161e24] border border-black/[0.08] dark:border-white/[0.1] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
              <CheckSquare className="w-4 h-4 text-[#2f7d5b]" />
              <span>
                {ratedCount === totalTools
                  ? (lang === 'fa' ? 'تمام ۱۲ ابزار تکمیل شده است. آماده صدور کارنامه هستید!' : 'All 12 tools evaluated. Ready to finalize!')
                  : (lang === 'fa'
                      ? `توجه: ${totalTools - ratedCount} ابزار ارزیابی نشده، نمره ۰ (نشنیده‌ام) در نظر گرفته خواهد شد.`
                      : `Note: ${totalTools - ratedCount} unrated tools will be counted as 0.`)}
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={finishQuiz}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#2f7d5b] to-[#256347] hover:from-[#256347] hover:to-[#1e5038] text-white font-black text-sm shadow-lg transition-all active:scale-[0.97]"
              >
                <Award className="w-4 h-4 text-[#fbbf24]" />
                <span>{lang === 'fa' ? 'ثبت نهایی و صدور کارنامه رسمی 🏆' : 'Submit & Generate Certificate 🏆'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. RESULT & READINESS CERTIFICATE VIEW */}
      {/* ============================================================== */}
      {quizState === 'result' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Certificate Container */}
          <div className="p-1 rounded-3xl bg-gradient-to-br from-[#e0533c]/20 via-[#9333ea]/20 to-[#2f7d5b]/20 border border-black/[0.08] dark:border-white/[0.1] shadow-xl">
            <div className="bg-white dark:bg-[#161e24] rounded-[calc(1.5rem-0.25rem)] p-6 sm:p-9 space-y-6">
              {/* Certificate Top Header */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
                <div className="flex items-center gap-3.5 text-center sm:text-start">
                  <div className="h-12 w-12 rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] p-2 flex items-center justify-center border border-black/[0.06] dark:border-white/[0.08] shrink-0">
                    <img
                      src={OWJ_LOGO}
                      alt="OWJ Logo"
                      className="h-9 w-auto object-contain"
                      onError={(e) => {
                        e.currentTarget.src = OWJ_LOGO_FALLBACK;
                      }}
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-[#e0533c] dark:text-[#fb7185]">
                      {lang === 'fa' ? 'گروه مشاوران مدیریت اوج · کارنامه ماتریس ابزارها' : 'OWJ Business Council · AI Tools Certificate'}
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#1c2830] dark:text-[#e8ebe9]">
                      {lang === 'fa'
                        ? 'گواهی سنجش جعبه‌ابزار و سواد عملی هوش مصنوعی'
                        : 'AI Tools Readiness & Practical Literacy Certificate'}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>{lang === 'fa' ? 'چاپ / ذخیره PDF' : 'Print PDF'}</span>
                  </button>

                  <button
                    onClick={handleCopyReport}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] transition-colors"
                  >
                    {copiedReport ? <Check className="w-3.5 h-3.5 text-[#2f7d5b]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedReport ? (lang === 'fa' ? 'کپی شد!' : 'Copied!') : (lang === 'fa' ? 'کپی کارنامه' : 'Copy Report')}</span>
                  </button>
                </div>
              </div>

              {/* Candidate Profile Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] text-xs">
                <div className="flex items-center gap-2 text-[#1c2830] dark:text-[#e8ebe9]">
                  <User className="w-4 h-4 text-[#e0533c] dark:text-[#fb7185]" />
                  <span className="font-bold">{candidateDisplayName}</span>
                  <span className="text-[#5d6b73] dark:text-[#9aa8b0]">({candidateSpecialty})</span>
                </div>
                <div className="flex flex-wrap items-center gap-2.5 text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                  {candidatePhone && (
                    <span dir="ltr" className="font-mono">📱 {candidatePhone}</span>
                  )}
                  <span className="px-2.5 py-0.5 rounded-lg bg-[#e0533c]/10 dark:bg-[#fb7185]/10 text-[#e0533c] dark:text-[#fb7185] font-bold">
                    {lang === 'fa' ? `سطح پایه: ${trackLabelFa[selectedTrack]}` : `Base Tier: ${trackLabelEn[selectedTrack]}`}
                  </span>
                  <span>
                    📅 {new Date().toLocaleDateString(lang === 'fa' ? 'fa-IR' : 'en-US')}
                  </span>
                </div>
              </div>

              {/* Score Showcase Hero */}
              <div
                className={`p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${currentResultLevel.bgGradientClass} border ${currentResultLevel.borderColorClass} flex flex-col md:flex-row items-center justify-between gap-6`}
              >
                <div className="space-y-3 text-center md:text-start">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#12171b] border border-black/[0.08] dark:border-white/[0.1] shadow-2xs">
                    <Award className={`w-4 h-4 ${currentResultLevel.colorClass}`} />
                    <span className={`text-xs font-black ${currentResultLevel.colorClass}`}>
                      {lang === 'fa' ? currentResultLevel.badgeFa : currentResultLevel.badgeEn}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-[#1c2830] dark:text-[#e8ebe9]">
                    {lang === 'fa' ? currentResultLevel.titleFa : currentResultLevel.titleEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5d6b73] dark:text-[#9aa8b0] max-w-xl leading-relaxed">
                    {lang === 'fa' ? currentResultLevel.summaryFa : currentResultLevel.summaryEn}
                  </p>
                </div>

                {/* Score Dial Big Card */}
                <div className="p-5 rounded-2xl bg-white dark:bg-[#12171b] border border-black/[0.08] dark:border-white/[0.1] shadow-md flex flex-col items-center justify-center shrink-0 min-w-44 text-center">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#5d6b73] dark:text-[#9aa8b0]">
                    {lang === 'fa' ? 'امتیاز جعبه‌ابزار' : 'Toolbox Score'}
                  </span>
                  <div className="flex items-baseline gap-1 my-1">
                    <span className={`text-4xl sm:text-5xl font-black font-mono ${currentResultLevel.colorClass}`}>
                      {currentScore}
                    </span>
                    <span className="text-sm font-mono text-[#5d6b73] dark:text-[#9aa8b0]">
                      / {maxScore}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#e0533c] dark:text-[#fb7185] bg-black/5 dark:bg-white/10 px-2.5 py-0.5 rounded-full font-mono">
                    {currentPct} %
                  </span>
                </div>
              </div>

              {/* Tier Alignment Index Diagnostic Card */}
              {alignmentIndex && (
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    alignmentIndex === 'Matches'
                      ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-950 dark:text-emerald-100'
                      : alignmentIndex === 'Above Tier'
                      ? 'bg-blue-500/10 border-blue-500/25 text-blue-950 dark:text-blue-100'
                      : 'bg-amber-500/10 border-amber-500/25 text-amber-950 dark:text-amber-100'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-xl shrink-0 ${
                        alignmentIndex === 'Matches'
                          ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                          : alignmentIndex === 'Above Tier'
                          ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                          : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {alignmentIndex === 'Matches' ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : alignmentIndex === 'Above Tier' ? (
                        <Sparkles className="w-5 h-5" />
                      ) : (
                        <ShieldAlert className="w-5 h-5" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-black uppercase tracking-wider">
                          {lang === 'fa' ? 'شاخص تطابق سطح (Tier Alignment Index):' : 'Tier Alignment Index:'}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
                            alignmentIndex === 'Matches'
                              ? 'bg-emerald-600 text-white'
                              : alignmentIndex === 'Above Tier'
                              ? 'bg-blue-600 text-white'
                              : 'bg-amber-600 text-white'
                          }`}
                        >
                          {alignmentIndex === 'Matches'
                            ? '✓ تطابق متوازن با سطح انتخابی (Balanced Toolset)'
                            : alignmentIndex === 'Above Tier'
                            ? '🚀 ابزارشناسی فراتر از سطح (Advanced Toolset)'
                            : '⚠️ نیاز به آشنایی با ابزارهای پایه (Early Stage Adoption)'}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed opacity-90">
                        {alignmentIndex === 'Matches'
                          ? 'تسلط ابزاری شما با سطح تعریف‌شده همخوانی کامل دارد. آماده ورود به متدولوژی CPMAI و پیاده‌سازی کاربردی هستید.'
                          : alignmentIndex === 'Above Tier'
                          ? 'بسیار درخشان! تسلط شما بر ابزارهای نوین، ایجنت‌ها و مدیریت دانش فراتر از سطح است و امکان ورود سریع به پروژه‌های پیشرفته را دارید.'
                          : 'پیشنهاد می‌شود قبل از ورود به فازهای پیچیده، کار با ابزارهای اولیه نظیر ChatGPT، Git و NotebookLM در صفحه ۰ را تمرین نمایید.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 5 Category Breakdown Progress Bars */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs sm:text-sm font-black text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#e0533c] dark:text-[#fb7185]" />
                  <span>{lang === 'fa' ? 'تفکیک مهارت در حوزه‌های پنج‌گانه ابزارها:' : 'Performance Breakdown by Tool Domain:'}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {TOOL_READINESS_CATEGORIES.map((cat) => {
                    const stats = getCategoryStats(cat.key);
                    return (
                      <div
                        key={cat.key}
                        className="p-3.5 rounded-xl bg-[#f8f9fa] dark:bg-[#12171b] border border-black/[0.04] dark:border-white/[0.06] space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5 truncate">
                            {renderIcon(cat.iconName, 'w-3.5 h-3.5 text-[#e0533c]')}
                            <span className="truncate">{lang === 'fa' ? cat.titleFa : cat.titleEn}</span>
                          </span>
                          <span className="font-mono text-[11px] font-bold text-[#e0533c] dark:text-[#fb7185]">
                            {stats.earnedScore} / {stats.maxScore} ({stats.percentage}%)
                          </span>
                        </div>
                        <div className="w-full h-2 bg-black/[0.06] dark:bg-white/[0.08] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#e0533c] to-[#9333ea] rounded-full"
                            style={{ width: `${stats.percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Detailed Breakdown of All 12 Tools */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs sm:text-sm font-black text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#2f7d5b]" />
                  <span>{lang === 'fa' ? 'وضعیت ثبت‌شده برای هر یک از ۱۲ ابزار:' : 'Detailed 12-Tool Status:'}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {TOOL_READINESS_ITEMS.map((item) => {
                    const rating = toolRatings[item.id] ?? 0;
                    const meta = TOOL_RATING_LEVELS.find((l) => l.level === rating) || TOOL_RATING_LEVELS[0];

                    return (
                      <div
                        key={item.id}
                        className="p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2 truncate">
                          {renderIcon(item.iconName, 'w-3.5 h-3.5 text-[#5d6b73] shrink-0')}
                          <span className="font-bold text-[#1c2830] dark:text-[#e8ebe9] truncate">{item.name}</span>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold shrink-0 ${
                            rating === 3
                              ? 'bg-purple-500/15 text-purple-700 dark:text-purple-300'
                              : rating === 2
                              ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                              : rating === 1
                              ? 'bg-blue-500/15 text-blue-700 dark:text-blue-300'
                              : 'bg-black/5 dark:bg-white/10 text-[#5d6b73]'
                          }`}
                        >
                          {lang === 'fa' ? meta.labelFa : meta.labelEn}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Personalized Recommended Learning Steps */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#f8f9fa] dark:bg-[#12171b] border border-black/[0.05] dark:border-white/[0.06] space-y-3.5">
                <h4 className="text-xs sm:text-sm font-black text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2">
                  <BookCheck className="w-4 h-4 text-[#2f7d5b]" />
                  <span>{lang === 'fa' ? 'نقشه راه پیشنهادی متناسب با جعبه‌ابزار شما:' : 'Personalized Learning Roadmap:'}</span>
                </h4>

                <div className="space-y-2 text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                  {(lang === 'fa'
                    ? currentResultLevel.recommendedActionsFa
                    : currentResultLevel.recommendedActionsEn
                  ).map((action, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-lg bg-[#2f7d5b]/15 text-[#2f7d5b] dark:text-[#52b788] font-bold text-[11px] flex items-center justify-center shrink-0">
                        {aIdx + 1}
                      </span>
                      <span className="leading-relaxed">{action}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions & Navigation CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-black/[0.06] dark:border-white/[0.08]">
                <button
                  onClick={handleStartQuiz}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] text-xs font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{lang === 'fa' ? 'سنجش مجدد ماتریس (Retake Matrix)' : 'Retake Matrix'}</span>
                </button>

                <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                  {onOpenLeaderboard && (
                    <button
                      onClick={onOpenLeaderboard}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-xs active:scale-[0.96]"
                    >
                      <Trophy className="w-3.5 h-3.5" />
                      <span>{lang === 'fa' ? 'مشاهده جدول رتبه‌بندی کلاس 🏆' : 'Class Leaderboard 🏆'}</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      onNavigateToPage(0);
                      if (onCloseQuiz) onCloseQuiz();
                    }}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#c026d3] hover:bg-[#9333ea] text-white text-xs font-bold transition-all shadow-xs active:scale-[0.96]"
                  >
                    <span>{lang === 'fa' ? 'ورود به صفحه ۰ (جعبه‌ابزار LLM)' : 'Open Page 0 (LLM Toolkit)'}</span>
                    {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => {
                      onNavigateToPage(1);
                      if (onCloseQuiz) onCloseQuiz();
                    }}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#2f7d5b] hover:bg-[#256347] text-white text-xs font-bold transition-all shadow-xs active:scale-[0.96]"
                  >
                    <span>{lang === 'fa' ? 'ورود به فاز اول درک کسب‌وکار' : 'Proceed to Phase I'}</span>
                    {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
