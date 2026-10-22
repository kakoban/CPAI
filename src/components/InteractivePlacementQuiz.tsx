import React, { useState, useEffect } from 'react';
import { Language } from '../types/cpmai';
import {
  QUIZ_QUESTIONS,
  QUIZ_LEVELS,
  QuizQuestion,
  QuizResultLevel,
  QuizCategory
} from '../data/placement_quiz_data';
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
  Trophy
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
}

const STORAGE_QUIZ_KEY = 'cpmai-readiness-quiz-result-v1';

export const InteractivePlacementQuiz: React.FC<InteractivePlacementQuizProps> = ({
  lang,
  onNavigateToPage,
  onCloseQuiz,
  onOpenLeaderboard,
  currentUser
}) => {
  const [quizState, setQuizState] = useState<'intro' | 'question' | 'result'>('intro');
  const [alignmentIndex, setAlignmentIndex] = useState<AlignmentIndex | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<AiFamiliarityLevel>(
    currentUser?.aiLevel || 'intermediate'
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
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
        setSavedResult(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  // Filter questions for the active track
  const trackQuestions: QuizQuestion[] = QUIZ_QUESTIONS.filter(
    (q) => q.level === selectedTrack
  );
  const totalQuestions = trackQuestions.length;
  const currentQuestion: QuizQuestion =
    trackQuestions[currentQuestionIndex] || trackQuestions[0];

  const currentSelectedOption = currentQuestion ? selectedAnswers[currentQuestion.id] : undefined;
  const hasAnsweredCurrent = currentSelectedOption !== undefined;

  const candidateDisplayName =
    currentUser?.displayName || candidateName || 'مهندس / مدیر پروژه';
  const candidateSpecialty = currentUser?.specialty || 'مدیریت و مهندسی پروژه';
  const candidatePhone = currentUser?.phone || '';

  const handleSwitchTrack = (track: AiFamiliarityLevel) => {
    setSelectedTrack(track);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsAnswerRevealed(false);
  };

  const handleStartQuiz = () => {
    setQuizState('question');
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsAnswerRevealed(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (optionIndex: number) => {
    if (isAnswerRevealed || !currentQuestion) return; // locked after revealing
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
    setIsAnswerRevealed(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsAnswerRevealed(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      finishQuiz();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setIsAnswerRevealed(true); // already answered
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Calculate final score for current track
  const calculateScore = () => {
    let score = 0;
    trackQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswerIndex) {
        score += 1;
      }
    });
    return score;
  };

  const finishQuiz = () => {
    const finalScore = calculateScore();
    const finalPercentage = totalQuestions > 0 ? Math.round((finalScore / totalQuestions) * 100) : 0;
    const resultLevel =
      QUIZ_LEVELS.find((lvl) => finalPercentage >= lvl.minPercentage && finalPercentage <= lvl.maxPercentage) ||
      QUIZ_LEVELS[0];

    const record = {
      score: finalScore,
      total: totalQuestions,
      levelKey: resultLevel.levelKey,
      track: selectedTrack,
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
        maxScore: totalQuestions,
        percentage: finalPercentage
      })
      .then((res) => {
        if (res.success && res.result?.alignmentIndex) {
          setAlignmentIndex(res.result.alignmentIndex);
        } else {
          // Local fallback calculation
          let localIdx: AlignmentIndex = finalPercentage < 60 ? 'Below Tier' : 'Matches';
          if (selectedTrack === 'beginner' && finalPercentage >= 85) localIdx = 'Above Tier';
          setAlignmentIndex(localIdx);
        }
      })
      .catch(() => {
        let localIdx: AlignmentIndex = finalPercentage < 60 ? 'Below Tier' : 'Matches';
        setAlignmentIndex(localIdx);
      });

    setQuizState('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentScore = calculateScore();
  const currentPct = totalQuestions > 0 ? Math.round((currentScore / totalQuestions) * 100) : 0;
  const currentResultLevel: QuizResultLevel =
    QUIZ_LEVELS.find((lvl) => currentPct >= lvl.minPercentage && currentPct <= lvl.maxPercentage) ||
    QUIZ_LEVELS[0];

  // Category Breakdown Calculations (filtered for active track)
  const getCategoryStats = (category: QuizCategory) => {
    const questionsInCategory = trackQuestions.filter((q) => q.category === category);
    const correctCount = questionsInCategory.filter(
      (q) => selectedAnswers[q.id] === q.correctAnswerIndex
    ).length;
    const totalCount = questionsInCategory.length;
    const percentage = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
    return { correctCount, totalCount, percentage };
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
    const isCandidatePetro =
      (candidateSpecialty || '').includes('نفت') ||
      (candidateSpecialty || '').includes('گاز') ||
      (candidateSpecialty || '').includes('پتروشیمی') ||
      (candidateSpecialty || '').toLowerCase().includes('petro') ||
      (candidateSpecialty || '').toLowerCase().includes('oil');

    const domainTrackBadgeFa = isCandidatePetro
      ? 'حوزه تخصصی ارزیابی‌شده: صنایع نفت، گاز، پالایش و پتروشیمی'
      : 'حوزه تخصصی ارزیابی‌شده: مگاپروژه‌های عمرانی، راه، ترابری و ابنیه کلان';

    const domainTrackBadgeEn = isCandidatePetro
      ? 'Evaluated Industry Track: Oil, Gas & Petrochemical Engineering'
      : 'Evaluated Industry Track: Mega Civil & Transportation Infrastructure';

    const reportText = `🏆 کارنامه رسمی آزمون سطح‌سنجی هوش مصنوعی و مهندسی
مشاوران مدیریت کسب و کار اوج (OWJ)
نام شرکت‌کننده: ${candidateDisplayName}
تخصص / رشته مهندسی: ${candidateSpecialty}
${lang === 'fa' ? domainTrackBadgeFa : domainTrackBadgeEn}
${candidatePhone ? `شماره تماس: ${candidatePhone}\n` : ''}سطح سوالات آزمون: ${trackLabelFa[selectedTrack]}
امتیاز کل: ${currentScore} از ${totalQuestions} (${Math.round((currentScore / totalQuestions) * 100)}%)
سطح احراز شده: ${lang === 'fa' ? currentResultLevel.titleFa : currentResultLevel.titleEn}
نشان: ${lang === 'fa' ? currentResultLevel.badgeFa : currentResultLevel.badgeEn}
تاریخ آزمون: ${new Date().toLocaleDateString(lang === 'fa' ? 'fa-IR' : 'en-US')}

تفکیک مهارت‌ها در سطح ${trackLabelFa[selectedTrack]}:
• کنترل نسخه و گیت‌هاب: ${getCategoryStats('git_github').correctCount}/${getCategoryStats('git_github').totalCount} (${getCategoryStats('git_github').percentage}%)
• مبانی مدل‌های زبانی و پرامپت: ${getCategoryStats('llm_fundamentals').correctCount}/${getCategoryStats('llm_fundamentals').totalCount} (${getCategoryStats('llm_fundamentals').percentage}%)
• معماری RAG و نوت‌بوک ال‌ام: ${getCategoryStats('rag_notebooklm').correctCount}/${getCategoryStats('rag_notebooklm').totalCount} (${getCategoryStats('rag_notebooklm').percentage}%)
• امنیت، APIها و داده‌های مهندسی: ${getCategoryStats('security_apis').correctCount}/${getCategoryStats('security_apis').totalCount} (${getCategoryStats('security_apis').percentage}%)

پلتفرم یادگیری هوش مصنوعی اوج: https://owjbc.com`;

    navigator.clipboard.writeText(reportText);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const renderCategoryIcon = (iconName: string, className = 'w-4 h-4') => {
    switch (iconName) {
      case 'GitBranch':
        return <GitBranch className={className} />;
      case 'GitPullRequest':
        return <GitPullRequest className={className} />;
      case 'GitCommit':
        return <GitCommit className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Brain':
        return <Brain className={className} />;
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
      case 'ShieldAlert':
      default:
        return <ShieldAlert className={className} />;
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
            <div className="rounded-[calc(1.5rem-0.375rem)] bg-gradient-to-br from-[#1f5163] via-[#0f4c5c] to-[#122b34] text-white p-6 sm:p-9 space-y-6 relative overflow-hidden">
              {/* Background ambient glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#2f7d5b]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#b87333]/20 rounded-full blur-3xl pointer-events-none" />

              {/* Header Badges & Brand */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10 border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-xl shadow-xs">
                    <img
                      src={OWJ_LOGO}
                      alt="OWJ Logo"
                      className="h-8 w-auto object-contain"
                      onError={(e) => {
                        e.currentTarget.src = OWJ_LOGO_FALLBACK;
                      }}
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold tracking-wider uppercase text-[#99e2b4]">
                      {lang === 'fa' ? 'مشاوران مدیریت کسب و کار اوج · پیش‌نیاز ورود به پلتفرم' : 'OWJ Business Council · Platform Entry Gate'}
                    </span>
                    <h3 className="text-xs font-semibold text-white/80">
                      {lang === 'fa' ? 'سنجش مهارت و آمادگی شناختی مهندسی' : 'AI & Engineering Readiness Assessment'}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-xs px-3 py-1.5 rounded-full font-bold bg-white/15 border border-white/20 text-white flex items-center gap-1.5 backdrop-blur-xs">
                    <Target className="w-3.5 h-3.5 text-[#fbbf24]" />
                    <span>
                      {lang === 'fa'
                        ? `${totalQuestions} سوال تخصصی · سطح ${
                            selectedTrack === 'beginner'
                              ? 'مقدماتی'
                              : selectedTrack === 'intermediate'
                              ? 'متوسط'
                              : 'پیشرفته'
                          }`
                        : `${totalQuestions} Questions · ${selectedTrack.toUpperCase()}`}
                    </span>
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-3 relative z-10 max-w-3xl">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black leading-snug tracking-tight text-white">
                  {lang === 'fa'
                    ? '🎯 آزمون سطح‌سنجی تخصصی و هوشمند CPMAI'
                    : '🎯 Adaptive CPMAI Engineering Readiness Assessment'}
                </h1>
                <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-normal">
                  {lang === 'fa'
                    ? `سوالات این آزمون دقیقاً متناسب با سطح آشنایی ثبت‌شده در پرونده آموزشی شما (${totalQuestions} سوال تخصصی) قفل و کالیبره شده است تا ارزیابی دقیقی از تسلط شما بر استانداردهای CPMAI به عمل آید.`
                    : `Questions are calibrated to your declared student profile track (${totalQuestions} questions) to benchmark your proficiency against CPMAI standards.`}
                </p>
              </div>

              {/* Candidate Profile & Track Selector Island */}
              <div className="p-4 rounded-2xl bg-black/25 border border-white/15 backdrop-blur-md relative z-10 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-white/10 text-xs">
                  <div className="flex items-center gap-2 text-white">
                    <User className="w-4 h-4 text-[#99e2b4]" />
                    <span className="font-bold">{candidateDisplayName}</span>
                    <span className="text-white/60">({candidateSpecialty})</span>
                  </div>
                  {candidatePhone && (
                    <div className="text-[11px] font-mono text-white/70" dir="ltr">
                      📞 {candidatePhone}
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-white/90 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>
                        {currentUser?.role === 'admin'
                          ? 'سطح آزمون (پیش‌نمایش مدیر سیستم):'
                          : 'سطح آزمون اختصاص‌یافته در پرونده:'}
                      </span>
                    </span>
                    <span className="text-[11px] text-white/60">
                      {currentUser?.role === 'admin'
                        ? 'دسترسی ادمین جهت تست و بررسی سوالات هر ۳ سطح'
                        : 'کالیبره‌شده بر اساس ثبت‌نام شما (غیرقابل تغییر توسط دانشجو)'}
                    </span>
                  </div>

                  {currentUser?.role === 'admin' ? (
                    /* Admin Mode: Can inspect all 3 tracks */
                    <div className="grid grid-cols-3 gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => handleSwitchTrack('beginner')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          selectedTrack === 'beginner'
                            ? 'bg-emerald-500 text-white border-emerald-400 shadow-md scale-105'
                            : 'bg-white/10 text-white/80 border-white/10 hover:bg-white/15'
                        }`}
                      >
                        مقدماتی (۱۲ سوال)
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSwitchTrack('intermediate')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          selectedTrack === 'intermediate'
                            ? 'bg-[#2563EB] text-white border-blue-400 shadow-md scale-105'
                            : 'bg-white/10 text-white/80 border-white/10 hover:bg-white/15'
                        }`}
                      >
                        متوسط (۱۲ سوال)
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSwitchTrack('advanced')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          selectedTrack === 'advanced'
                            ? 'bg-purple-600 text-white border-purple-400 shadow-md scale-105'
                            : 'bg-white/10 text-white/80 border-white/10 hover:bg-white/15'
                        }`}
                      >
                        پیشرفته (۱۲ سوال)
                      </button>
                    </div>
                  ) : (
                    /* Student Mode: Locked to their declared level */
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 shadow-md ${
                          selectedTrack === 'beginner'
                            ? 'bg-emerald-500 text-white border-emerald-400'
                            : selectedTrack === 'intermediate'
                            ? 'bg-[#2563EB] text-white border-blue-400'
                            : 'bg-purple-600 text-white border-purple-400'
                        }`}
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>
                          {selectedTrack === 'beginner'
                            ? `سطح مقدماتی (${totalQuestions} سوال)`
                            : selectedTrack === 'intermediate'
                            ? `سطح متوسط (${totalQuestions} سوال)`
                            : `سطح پیشرفته (${totalQuestions} سوال)`}
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* 4 Pillars Preview Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10 pt-2">
                <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-1.5">
                  <div className="flex items-center gap-2 text-[#99e2b4] font-bold text-xs">
                    <GitBranch className="w-4 h-4 shrink-0" />
                    <span>{lang === 'fa' ? '۱. گیت و گیت‌هاب' : '1. Git & GitHub'}</span>
                  </div>
                  <p className="text-[11px] text-white/75 leading-relaxed">
                    {lang === 'fa'
                      ? 'مخازن، کامیت، پول‌ریکوئست و برنچ‌ها برای کنترل نسخه پروژه‌ها'
                      : 'Repositories, commits, PRs, and branch protection'}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-1.5">
                  <div className="flex items-center gap-2 text-[#fbbf24] font-bold text-xs">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>{lang === 'fa' ? '۲. مدل‌های زبانی و پرامپت' : '2. LLMs & Prompts'}</span>
                  </div>
                  <p className="text-[11px] text-white/75 leading-relaxed">
                    {lang === 'fa'
                      ? 'محاسبه توکن، فرمول RCTO، و مهندسی کنترل توهم'
                      : 'Tokens, context windows, RCTO prompt framework'}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-1.5">
                  <div className="flex items-center gap-2 text-[#6ee7b7] font-bold text-xs">
                    <Database className="w-4 h-4 shrink-0" />
                    <span>{lang === 'fa' ? '۳. معماری RAG و نوت‌بوک' : '3. RAG & NotebookLM'}</span>
                  </div>
                  <p className="text-[11px] text-white/75 leading-relaxed">
                    {lang === 'fa'
                      ? 'بازیابی اسناد مهندسی، پادکست‌های صوتی و پاسخ‌های مستند'
                      : 'Source-grounding, audio overviews, zero hallucination'}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-1.5">
                  <div className="flex items-center gap-2 text-[#fca5a5] font-bold text-xs">
                    <Key className="w-4 h-4 shrink-0" />
                    <span>{lang === 'fa' ? '۴. امنیت، API و داده‌ها' : '4. Security & APIs'}</span>
                  </div>
                  <p className="text-[11px] text-white/75 leading-relaxed">
                    {lang === 'fa'
                      ? 'کلیدهای محرمانه API، دیتاست‌های CSV و حریم خصوصی سازمان'
                      : 'Secret credentials, clean CSV tables, data leakage'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 relative z-10">
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-[#99e2b4] shrink-0" />
                  <span>
                    {lang === 'fa'
                      ? 'همراه با تحلیل و توضیح تشریحی آموزشی برای تک‌تک سوالات'
                      : 'Includes immediate educational explanations for every concept'}
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
                    <span>{lang === 'fa' ? 'شروع آزمون سطح‌سنجی 🚀' : 'Start Readiness Quiz 🚀'}</span>
                    {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Explanatory FAQ for Newcomers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#161e24] border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-2">
              <span className="text-xs font-bold text-[#1f5163] dark:text-[#6fb3c6] flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                <span>{lang === 'fa' ? 'آیا نمره منفی وجود دارد؟' : 'Is there negative marking?'}</span>
              </span>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa'
                  ? 'خیر! هدف این آزمون ارزش‌گذاری یا ارزیابی رسمی نیست، بلکه شناسایی شکاف‌های مهارتی و آموزش گام‌به‌گام اصطلاحات کاربردی است.'
                  : 'No negative marking. The goal is self-discovery, learning key terminology, and pinpointing recommended study modules.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#161e24] border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-2">
              <span className="text-xs font-bold text-[#b87333] flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" />
                <span>{lang === 'fa' ? 'چرا اصطلاحات Git و GitHub؟' : 'Why Git & GitHub terms?'}</span>
              </span>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa'
                  ? 'در پروژه‌های مدرن هوش مصنوعی، کدهای پایتون، دیتاست‌ها و حتی پرامپت‌ها در گیت‌هاب نسخه‌بندی می‌شوند. تسلط بر الفبای آن برای هر مدیر پروژه‌ای الزامی است.'
                  : 'In modern AI, Python scripts, prompts, and datasets are versioned on GitHub. Knowing basic Git lingo is now a core managerial literacy.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#161e24] border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-2">
              <span className="text-xs font-bold text-[#2f7d5b] dark:text-[#52b788] flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>{lang === 'fa' ? 'گواهی و نقشه راه اختصاصی' : 'Certificate & Roadmap'}</span>
              </span>
              <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] leading-relaxed">
                {lang === 'fa'
                  ? 'پس از اتمام آزمون، کارنامه رسمی با سطح مهارتی (برنزی، نقره‌ای، طلایی یا پلاتینیوم) و دکمه‌های مستقیم به صفحات یادگیری به شما اعطا می‌گردد.'
                  : 'Receive an instant readiness certificate with custom level badges and one-click shortcuts to recommended workbook chapters.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. ACTIVE QUIZ QUESTION VIEW */}
      {/* ============================================================== */}
      {quizState === 'question' && (
        <div className="space-y-5">
          {/* Top Progress & Navigation Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#161e24] border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="px-3 py-1 rounded-xl bg-[#1f5163] text-white font-extrabold text-xs shadow-xs">
                  {lang === 'fa'
                    ? `پرسش ${currentQuestionIndex + 1} از ${totalQuestions}`
                    : `Question ${currentQuestionIndex + 1} of ${totalQuestions}`}
                </span>

                <span
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold ${
                    selectedTrack === 'beginner'
                      ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                      : selectedTrack === 'intermediate'
                      ? 'bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-500/20'
                      : 'bg-purple-500/15 text-purple-700 dark:text-purple-400 border border-purple-500/20'
                  }`}
                >
                  {lang === 'fa'
                    ? `سطح ${
                        selectedTrack === 'beginner'
                          ? 'مقدماتی'
                          : selectedTrack === 'intermediate'
                          ? 'متوسط'
                          : 'پیشرفته'
                      }`
                    : `Level: ${selectedTrack.toUpperCase()}`}
                </span>

                <div className="flex items-center gap-1.5 text-xs font-bold text-[#5d6b73] dark:text-[#9aa8b0]">
                  <span className="p-1 rounded-lg bg-black/5 dark:bg-white/10 text-[#1f5163] dark:text-[#6fb3c6]">
                    {renderCategoryIcon(currentQuestion.categoryIcon)}
                  </span>
                  <span>
                    {lang === 'fa' ? currentQuestion.categoryFa : currentQuestion.categoryEn}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="text-xs font-mono font-bold text-[#2f7d5b] dark:text-[#52b788] bg-[#2f7d5b]/10 px-2.5 py-0.5 rounded-lg">
                  {lang === 'fa'
                    ? `امتیاز فعلی: ${currentScore}`
                    : `Score: ${currentScore}`}
                </span>
                <button
                  onClick={() => setQuizState('intro')}
                  className="text-xs font-medium text-[#5d6b73] dark:text-[#9aa8b0] hover:text-rose-600 transition-colors px-2 py-1"
                >
                  {lang === 'fa' ? 'انصراف / خروج' : 'Exit Quiz'}
                </button>
              </div>
            </div>

            {/* Smooth Animated Progress Bar */}
            <div className="w-full h-2 bg-black/[0.05] dark:bg-white/[0.08] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#1f5163] via-[#00738c] to-[#2f7d5b] transition-all duration-300 rounded-full"
                style={{
                  width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`
                }}
              />
            </div>
          </div>

          {/* Question Card (Double-Bezel Island) */}
          <div className="p-1.5 rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="rounded-[calc(1.5rem-0.375rem)] bg-white dark:bg-[#161e24] p-5 sm:p-7 space-y-6">
              {/* Real World Scenario (if available) */}
              {currentQuestion.scenarioFa && (
                <div className="p-3.5 rounded-xl bg-amber-500/[0.07] dark:bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5 leading-relaxed">
                  <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">
                      {lang === 'fa' ? 'سناریوی واقعی در کارگاه/سازمان: ' : 'Real-World Scenario: '}
                    </strong>
                    <span>
                      {lang === 'fa' ? currentQuestion.scenarioFa : currentQuestion.scenarioEn}
                    </span>
                  </div>
                </div>
              )}

              {/* Question Text */}
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-black text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed">
                  {lang === 'fa' ? currentQuestion.questionFa : currentQuestion.questionEn}
                </h2>
              </div>

              {/* 4 Interactive Options */}
              <div className="space-y-3">
                {(lang === 'fa' ? currentQuestion.optionsFa : currentQuestion.optionsEn).map(
                  (optionText, optIdx) => {
                    const isSelected = currentSelectedOption === optIdx;
                    const isCorrect = optIdx === currentQuestion.correctAnswerIndex;

                    let btnStyles =
                      'bg-white dark:bg-[#1a232a] border-black/[0.08] dark:border-white/[0.1] text-[#1c2830] dark:text-[#e8ebe9] hover:border-[#1f5163] dark:hover:border-[#6fb3c6] hover:bg-[#f4f7f6] dark:hover:bg-[#1f2a32]';
                    let badgeStyles =
                      'bg-black/5 dark:bg-white/10 text-[#5d6b73] dark:text-[#9aa8b0]';

                    if (isAnswerRevealed) {
                      if (isCorrect) {
                        btnStyles =
                          'bg-[#2f7d5b]/10 dark:bg-[#2f7d5b]/20 border-[#2f7d5b] text-[#1f5163] dark:text-[#99e2b4] font-bold ring-2 ring-[#2f7d5b]/30';
                        badgeStyles = 'bg-[#2f7d5b] text-white';
                      } else if (isSelected && !isCorrect) {
                        btnStyles =
                          'bg-rose-500/10 dark:bg-rose-500/20 border-rose-500 text-rose-700 dark:text-rose-300 line-through opacity-85';
                        badgeStyles = 'bg-rose-500 text-white';
                      } else {
                        btnStyles =
                          'bg-black/[0.02] dark:bg-white/[0.02] border-black/[0.05] dark:border-white/[0.06] text-[#5d6b73] dark:text-[#7f8e97] opacity-60';
                      }
                    }

                    const optionLettersFa = ['الف', 'ب', 'ج', 'د'];
                    const optionLettersEn = ['A', 'B', 'C', 'D'];

                    return (
                      <button
                        key={optIdx}
                        disabled={isAnswerRevealed}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full p-4 rounded-2xl border text-start flex items-start gap-3.5 transition-all duration-150 active:scale-[0.98] ${btnStyles}`}
                      >
                        <span
                          className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 transition-colors ${badgeStyles}`}
                        >
                          {isAnswerRevealed && isCorrect ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : isAnswerRevealed && isSelected && !isCorrect ? (
                            <XCircle className="w-3.5 h-3.5" />
                          ) : lang === 'fa' ? (
                            optionLettersFa[optIdx]
                          ) : (
                            optionLettersEn[optIdx]
                          )}
                        </span>

                        <span className="text-xs sm:text-sm leading-relaxed flex-1 select-text">
                          {optionText}
                        </span>
                      </button>
                    );
                  }
                )}
              </div>

              {/* Instant Educational Deep-Dive Drawer (Revealed after selection) */}
              {isAnswerRevealed && (
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#00738c]/[0.05] to-[#2f7d5b]/[0.04] dark:from-[#00738c]/[0.1] dark:to-[#2f7d5b]/[0.08] border border-[#00738c]/25 space-y-3.5 animate-fadeIn">
                  <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-[#00738c] dark:text-[#6fb3c6]">
                    {currentSelectedOption === currentQuestion.correctAnswerIndex ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-[#2f7d5b] shrink-0" />
                        <span>{lang === 'fa' ? 'آفرین! پاسخ شما کاملاً صحیح است.' : 'Excellent! Correct Answer.'}</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                        <span>{lang === 'fa' ? 'پاسخ نادرست بود. تحلیل مفهوم زیر را به خاطر بسپارید:' : 'Incorrect. Study the concept breakdown below:'}</span>
                      </>
                    )}
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9] leading-relaxed select-text">
                    <p className="bg-white/80 dark:bg-[#12171b]/80 p-3.5 rounded-xl border border-black/[0.04] dark:border-white/[0.06]">
                      <strong className="text-[#00738c] dark:text-[#6fb3c6] font-bold">
                        {lang === 'fa' ? '💡 تشریح دقیق اصطلاح: ' : 'Concept Explanation: '}
                      </strong>
                      <span>
                        {lang === 'fa'
                          ? currentQuestion.explanationFa
                          : currentQuestion.explanationEn}
                      </span>
                    </p>

                    <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.06] text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
                      <strong className="text-[#b87333] font-bold">
                        {lang === 'fa' ? '🏗️ کاربرد عملی در پروژه‌ها: ' : 'Engineering Application: '}
                      </strong>
                      <span>
                        {lang === 'fa'
                          ? currentQuestion.realWorldContextFa
                          : currentQuestion.realWorldContextEn}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-black/[0.06] dark:border-white/[0.08]">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={handlePrevQuestion}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    currentQuestionIndex === 0
                      ? 'opacity-30 cursor-not-allowed text-[#5d6b73]'
                      : 'hover:bg-black/5 dark:hover:bg-white/5 text-[#1c2830] dark:text-[#e8ebe9]'
                  }`}
                >
                  {lang === 'fa' ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                  <span>{lang === 'fa' ? 'پرسش قبلی' : 'Previous'}</span>
                </button>

                <div className="flex items-center gap-2">
                  {isAnswerRevealed ? (
                    <button
                      onClick={handleNextQuestion}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2f7d5b] hover:bg-[#256347] text-white font-extrabold text-xs sm:text-sm shadow-xs transition-all active:scale-[0.96]"
                    >
                      <span>
                        {currentQuestionIndex === totalQuestions - 1
                          ? lang === 'fa'
                            ? 'مشاهده کارنامه نهایی 🏆'
                            : 'View Final Result 🏆'
                          : lang === 'fa'
                          ? 'پرسش بعدی'
                          : 'Next Question'}
                      </span>
                      {lang === 'fa' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                  ) : (
                    <span className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] italic">
                      {lang === 'fa'
                        ? 'لطفاً یکی از گزینه‌ها را برای مشاهده پاسخ انتخاب کنید'
                        : 'Select an option to proceed'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. FINAL RESULTS & DIAGNOSTIC DASHBOARD VIEW */}
      {/* ============================================================== */}
      {quizState === 'result' && (
        <div className="space-y-6">
          {/* Hero Result Certificate Card */}
          <div className="p-1.5 rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="rounded-[calc(1.5rem-0.375rem)] bg-white dark:bg-[#161e24] p-6 sm:p-9 space-y-6 relative overflow-hidden">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-xl shadow-xs border border-black/[0.05]">
                    <img
                      src={OWJ_LOGO}
                      alt="OWJ"
                      className="h-9 w-auto object-contain"
                      onError={(e) => {
                        e.currentTarget.src = OWJ_LOGO_FALLBACK;
                      }}
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-[#1f5163] dark:text-[#6fb3c6]">
                      {lang === 'fa' ? 'گروه مشاوران مدیریت اوج · کارنامه سطح‌سنجی' : 'OWJ Business Council · Placement Certificate'}
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#1c2830] dark:text-[#e8ebe9]">
                      {lang === 'fa'
                        ? 'گواهی سطح مهارت و سواد هوش مصنوعی'
                        : 'AI Literacy & Engineering Readiness Certificate'}
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
                  <User className="w-4 h-4 text-[#1f5163] dark:text-[#6fb3c6]" />
                  <span className="font-bold">{candidateDisplayName}</span>
                  <span className="text-[#5d6b73] dark:text-[#9aa8b0]">({candidateSpecialty})</span>
                </div>
                <div className="flex flex-wrap items-center gap-2.5 text-[11px] text-[#5d6b73] dark:text-[#9aa8b0]">
                  {candidatePhone && (
                    <span dir="ltr" className="font-mono">📱 {candidatePhone}</span>
                  )}
                  <span className="px-2.5 py-0.5 rounded-lg bg-[#1f5163]/10 dark:bg-[#6fb3c6]/10 text-[#1f5163] dark:text-[#6fb3c6] font-bold">
                    {lang === 'fa' ? `سطح آزمون: ${trackLabelFa[selectedTrack]}` : `Track: ${trackLabelEn[selectedTrack]}`}
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
                    {lang === 'fa' ? 'امتیاز نهایی' : 'Final Score'}
                  </span>
                  <div className="flex items-baseline gap-1 my-1">
                    <span className={`text-4xl sm:text-5xl font-black font-mono ${currentResultLevel.colorClass}`}>
                      {currentScore}
                    </span>
                    <span className="text-sm font-mono text-[#5d6b73] dark:text-[#9aa8b0]">
                      / {totalQuestions}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#1f5163] dark:text-[#6fb3c6] bg-black/5 dark:bg-white/10 px-2.5 py-0.5 rounded-full font-mono">
                    {Math.round((currentScore / totalQuestions) * 100)} %
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
                          شاخص تطابق سطح (Tier Alignment Index):
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
                            ? '✓ تطابق کامل با سطح انتخابی (Matches Claimed Level)'
                            : alignmentIndex === 'Above Tier'
                            ? '🚀 فراتر از سطح انتخابی (Above Tier / High Potential)'
                            : '⚠️ نیاز به تقویت مفاهیم پایه (Below Tier / Dunning-Kruger Gap)'}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed opacity-90">
                        {alignmentIndex === 'Matches'
                          ? 'تبریک! امتیاز آزمون شما، سطح آشنایی اعلام‌شده در پرونده را کاملاً تصدیق کرد. آمادگی ورود به متدولوژی CPMAI را دارا هستید.'
                          : alignmentIndex === 'Above Tier'
                          ? 'بسیار درخشان! تسلط شما فراتر از سطح پایه انتخابی است و پیشنهاد می‌شود جلسات سطح پیشرفته را پیگیری فرمایید.'
                          : 'توجه شناختی: نمره کسب‌شده نشان‌دهنده خطای برآورد مهارت (Dunning-Kruger Gap) است. مرور دقیق جلسات ۰ و ۱ کتاب‌کار جهت رفع شکاف‌های مفهومی قویاً توصیه می‌گردد.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 4 Category Breakdown Progress Bars */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs sm:text-sm font-black text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#1f5163] dark:text-[#6fb3c6]" />
                  <span>{lang === 'fa' ? 'تفکیک مهارت در حوزه‌های چهارگانه آزمون:' : 'Performance Breakdown by Competency:'}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Category 1 */}
                  {(() => {
                    const stats = getCategoryStats('git_github');
                    return (
                      <div className="p-3.5 rounded-xl bg-[#f8f9fa] dark:bg-[#12171b] border border-black/[0.04] dark:border-white/[0.06] space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                            <GitBranch className="w-3.5 h-3.5 text-[#1f5163]" />
                            <span>{lang === 'fa' ? 'کنترل نسخه و گیت‌هاب' : 'Git & GitHub'}</span>
                          </span>
                          <span className="font-mono text-[11px] font-bold text-[#1f5163] dark:text-[#6fb3c6]">
                            {stats.correctCount} / {stats.totalCount} ({stats.percentage}%)
                          </span>
                        </div>
                        <div className="w-full h-2 bg-black/[0.06] dark:bg-white/[0.08] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#1f5163] rounded-full"
                            style={{ width: `${stats.percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })()}

                  {/* Category 2 */}
                  {(() => {
                    const stats = getCategoryStats('llm_fundamentals');
                    return (
                      <div className="p-3.5 rounded-xl bg-[#f8f9fa] dark:bg-[#12171b] border border-black/[0.04] dark:border-white/[0.06] space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#b87333]" />
                            <span>{lang === 'fa' ? 'مدل‌های زبانی و پرامپت' : 'LLMs & Prompting'}</span>
                          </span>
                          <span className="font-mono text-[11px] font-bold text-[#b87333]">
                            {stats.correctCount} / {stats.totalCount} ({stats.percentage}%)
                          </span>
                        </div>
                        <div className="w-full h-2 bg-black/[0.06] dark:bg-white/[0.08] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#b87333] rounded-full"
                            style={{ width: `${stats.percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })()}

                  {/* Category 3 */}
                  {(() => {
                    const stats = getCategoryStats('rag_notebooklm');
                    return (
                      <div className="p-3.5 rounded-xl bg-[#f8f9fa] dark:bg-[#12171b] border border-black/[0.04] dark:border-white/[0.06] space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                            <Database className="w-3.5 h-3.5 text-[#00738c]" />
                            <span>{lang === 'fa' ? 'معماری RAG و نوت‌بوک ال‌ام' : 'RAG & NotebookLM'}</span>
                          </span>
                          <span className="font-mono text-[11px] font-bold text-[#00738c] dark:text-[#6fb3c6]">
                            {stats.correctCount} / {stats.totalCount} ({stats.percentage}%)
                          </span>
                        </div>
                        <div className="w-full h-2 bg-black/[0.06] dark:bg-white/[0.08] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#00738c] rounded-full"
                            style={{ width: `${stats.percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })()}

                  {/* Category 4 */}
                  {(() => {
                    const stats = getCategoryStats('security_apis');
                    return (
                      <div className="p-3.5 rounded-xl bg-[#f8f9fa] dark:bg-[#12171b] border border-black/[0.04] dark:border-white/[0.06] space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-1.5">
                            <Key className="w-3.5 h-3.5 text-[#2f7d5b]" />
                            <span>{lang === 'fa' ? 'امنیت، API و داده‌های مهندسی' : 'Security, APIs & Data'}</span>
                          </span>
                          <span className="font-mono text-[11px] font-bold text-[#2f7d5b] dark:text-[#52b788]">
                            {stats.correctCount} / {stats.totalCount} ({stats.percentage}%)
                          </span>
                        </div>
                        <div className="w-full h-2 bg-black/[0.06] dark:bg-white/[0.08] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#2f7d5b] rounded-full"
                            style={{ width: `${stats.percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Personalized Recommended Learning Steps */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#f8f9fa] dark:bg-[#12171b] border border-black/[0.05] dark:border-white/[0.06] space-y-3.5">
                <h4 className="text-xs sm:text-sm font-black text-[#1c2830] dark:text-[#e8ebe9] flex items-center gap-2">
                  <BookCheck className="w-4 h-4 text-[#2f7d5b]" />
                  <span>{lang === 'fa' ? 'نقشه راه پیشنهادی متناسب با سطح شما:' : 'Personalized Learning Roadmap:'}</span>
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
                  <span>{lang === 'fa' ? 'آزمون مجدد (Retake Quiz)' : 'Retake Quiz'}</span>
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
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#00738c] hover:bg-[#0f4c5c] text-white text-xs font-bold transition-all shadow-xs active:scale-[0.96]"
                  >
                    <span>{lang === 'fa' ? 'ورود به صفحه ۰ (جعبه‌ابزار LLM)' : 'Open Page 0 (LLM Toolkit)'}</span>
                    {lang === 'fa' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => {
                      onNavigateToPage(1);
                      if (onCloseQuiz) onCloseQuiz();
                    }}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#2f7d5b] hover:bg-[#256347] text-white text-xs font-bold transition-all shadow-xs active:scale-[0.96]"
                  >
                    <span>{lang === 'fa' ? 'ورود به فاز اول درک کسب‌وکار' : 'Proceed to Phase I'}</span>
                    {lang === 'fa' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
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
