import React, { useState, useEffect } from 'react';
import { Language, Theme } from './types/cpmai';
import { Page0LlmFundamentals } from './components/Page0LlmFundamentals';
import { Page1BusinessUnderstanding } from './components/Page1BusinessUnderstanding';
import { Page2ProblemIteration } from './components/Page2ProblemIteration';
import { Page3SuccessCriteria } from './components/Page3SuccessCriteria';
import { Page4CostBenefit } from './components/Page4CostBenefit';
import { Page5ExpectedRoi } from './components/Page5ExpectedRoi';
import { Page6CognitiveRequirements } from './components/Page6CognitiveRequirements';
import { Page7WhyAiSolution } from './components/Page7WhyAiSolution';
import { Page8NoncognitiveAlternatives } from './components/Page8NoncognitiveAlternatives';
import { Page9CognitiveObjectives } from './components/Page9CognitiveObjectives';
import { Page10CognitiveOutcomes } from './components/Page10CognitiveOutcomes';
import { Page11AiSuccessCriteria } from './components/Page11AiSuccessCriteria';
import { Page12AiPatterns } from './components/Page12AiPatterns';
import { Page13WhichPatternsUsed } from './components/Page13WhichPatternsUsed';
import { Page14AssessSituation } from './components/Page14AssessSituation';
import { Page15TechnologyAndSkills } from './components/Page15TechnologyAndSkills';
import { Page16ScheduleRequirements } from './components/Page16ScheduleRequirements';
import { Page17ProjectConstraintsAndModelPerformance } from './components/Page17ProjectConstraintsAndModelPerformance';
import { Page18ModelPerformanceMetrics } from './components/Page18ModelPerformanceMetrics';
import { Page19ModelPerformanceRequirements } from './components/Page19ModelPerformanceRequirements';
import { Page20AcceptableKpiPerformanceValues } from './components/Page20AcceptableKpiPerformanceValues';
import { Page21RequiredTechnologyKpis } from './components/Page21RequiredTechnologyKpis';
import { InteractivePlacementQuiz } from './components/InteractivePlacementQuiz';
import { AgentifyLanding } from './components/landing/AgentifyLanding';
import { AuthModal } from './components/AuthModal';
import { OnboardingModal } from './components/OnboardingModal';
import { ContentProtectionShield } from './components/ContentProtectionShield';
import { ClassLeaderboardModal } from './components/leaderboard/ClassLeaderboardModal';
import { AdminControlCenterModal } from './components/admin/AdminControlCenterModal';
import { AjaBrandIntro } from './components/intro/AjaBrandIntro';
import { LlmForHumansBookModal } from './components/book/LlmForHumansBookModal';
import {
  IndustryTrackId,
  DisciplineId,
  EngineeringRoleId,
  getSavedIndustryTrack,
  saveIndustryTrack,
  getSavedDiscipline,
  saveDiscipline,
  getSavedRole,
  saveRole,
  INDUSTRY_TRACKS
} from './types/industryTrack';
import { IndustryTrackSwitcher } from './components/industry/IndustryTrackSwitcher';
import { IndustryTrackSelectorModal } from './components/industry/IndustryTrackSelectorModal';
import { DisciplineSelectorModal } from './components/industry/DisciplineSelectorModal';
import { DisciplineBadge } from './components/industry/DisciplineBadge';
import { WorkspaceSidebar } from './components/navigation/WorkspaceSidebar';
import { getDisciplineMetadata } from './data/disciplineExamplesRegistry';
import { authApi, isAuthorizedAdminUser } from './services/authApi';
import { lmsApi } from './services/lmsApi';
import { UserProfile } from './types/auth';
import { SessionLockEntity } from './types/lms';
import { Footer } from './components/Footer';
import { OWJ_LOGO, OWJ_LOGO_FALLBACK } from './data/logo';
import { Clock, Moon, Sun, Globe, Copy, Printer, RotateCcw, Check, BookOpen, Layers, Award, DollarSign, TrendingUp, Brain, Cpu, Boxes, Split, Target, Gauge, ShieldCheck, Network, Workflow, Calendar, HardDrive, Cloud, Calculator, Bot, Server, Sparkles, Trophy, Lock, Unlock, GraduationCap, Menu, PanelLeftClose } from 'lucide-react';

export type AppPage = 'landing' | 'quiz' | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21;

const STORAGE_KEY = 'cpmai-workbook-21pages-with-page0-v1';
const LEGACY_KEY_21 = 'cpmai-workbook-21pages-v1';
const LEGACY_KEY_20 = 'cpmai-workbook-20pages-v1';
const LEGACY_KEY_19 = 'cpmai-workbook-19pages-v1';
const LEGACY_KEY_18 = 'cpmai-workbook-18pages-v1';
const LEGACY_KEY_17 = 'cpmai-workbook-17pages-v1';
const LEGACY_KEY_16 = 'cpmai-workbook-16pages-v1';
const LEGACY_KEY_15 = 'cpmai-workbook-15pages-v1';
const LEGACY_KEY_14 = 'cpmai-workbook-14pages-v1';
const LEGACY_KEY_13 = 'cpmai-workbook-13pages-v1';
const LEGACY_KEY_12 = 'cpmai-workbook-12pages-v1';
const LEGACY_KEY_11 = 'cpmai-workbook-11pages-v1';
const LEGACY_KEY_10 = 'cpmai-workbook-10pages-v1';
const LEGACY_KEY_9 = 'cpmai-workbook-9pages-v1';
const LEGACY_KEY_8 = 'cpmai-workbook-8pages-v1';
const LEGACY_KEY_7 = 'cpmai-workbook-7pages-v1';
const LEGACY_KEY_6 = 'cpmai-workbook-6pages-v1';
const LEGACY_KEY_5 = 'cpmai-workbook-5pages-v1';
const LEGACY_KEY_4 = 'cpmai-workbook-4pages-v1';
const LEGACY_KEY_3 = 'cpmai-workbook-3pages-v1';
const LEGACY_KEY_2 = 'cpmai-workbook-2pages-v1';
const LEGACY_KEY = 'cpmai-wb-p1-v1';

export default function App() {
  const [page, setPage] = useState<AppPage>(() => {
    try {
      const savedPage = localStorage.getItem('cpmai_active_page_v1');
      if (savedPage) {
        if (savedPage === 'landing' || savedPage === 'quiz') return savedPage;
        const num = parseInt(savedPage, 10);
        if (!isNaN(num) && num >= 0 && num <= 21) return num as AppPage;
      }
    } catch {}
    return 0; // Default to Page 0 LLM Toolkit
  });
  const [lang, setLang] = useState<Language>('fa');
  const [theme, setTheme] = useState<Theme>('light');
  // AJA Cinematic Brand Intro (Unseen Studio Inspired Experience)
  const [showBrandIntro, setShowBrandIntro] = useState<boolean>(() => {
    try {
      return !localStorage.getItem('aja_brand_intro_seen_v2');
    } catch {
      return false;
    }
  });

  // Google OAuth / GIS Authentication State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = authApi.getSavedUser();
      if (saved) {
        if (isAuthorizedAdminUser(saved)) saved.role = 'admin';
        return saved;
      }
    } catch {}
    return null;
  });

  // LMS & Cohort State
  const [sessionLocks, setSessionLocks] = useState<SessionLockEntity[]>([]);
  const [isLeaderboardModalOpen, setIsLeaderboardModalOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState<boolean>(false);
  const [industryTrack, setIndustryTrack] = useState<IndustryTrackId>(() => getSavedIndustryTrack());
  const [isIndustryModalOpen, setIsIndustryModalOpen] = useState<boolean>(false);
  const [activeDiscipline, setActiveDiscipline] = useState<DisciplineId>(() => getSavedDiscipline(getSavedIndustryTrack()));
  const [activeRole, setActiveRole] = useState<EngineeringRoleId>(() => getSavedRole());
  const [isDisciplineModalOpen, setIsDisciplineModalOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleSelectIndustryTrack = (track: IndustryTrackId) => {
    setIndustryTrack(track);
    saveIndustryTrack(track);
    const fallbackDisc = getSavedDiscipline(track);
    setActiveDiscipline(fallbackDisc);
    saveDiscipline(fallbackDisc);
    showToast(
      lang === 'fa'
        ? `حوزه تخصصی به «${INDUSTRY_TRACKS[track].shortTitleFa}» تغییر یافت.`
        : `Industry track switched to "${INDUSTRY_TRACKS[track].shortTitleEn}".`
    );
  };

  const handleSelectDiscipline = (disc: DisciplineId) => {
    setActiveDiscipline(disc);
    saveDiscipline(disc);
    const meta = getDisciplineMetadata(disc);
    showToast(
      lang === 'fa'
        ? `دیسیپلین تخصصی به «${meta.shortTitleFa}» تنظیم شد.`
        : `Discipline updated to "${meta.shortTitleEn}".`
    );
  };

  const handleSelectRole = (role: EngineeringRoleId) => {
    setActiveRole(role);
    saveRole(role);
  };

  const isUserAdmin = (user: UserProfile | null): boolean => {
    return isAuthorizedAdminUser(user);
  };

  const refreshCurriculumLocks = () => {
    lmsApi.fetchCurriculumLocks().then((res) => {
      if (res?.locks) {
        setSessionLocks(res.locks);
      }
    }).catch(() => {});
  };

  useEffect(() => {
    try {
      localStorage.setItem('cpmai_active_page_v1', page.toString());
    } catch {}
  }, [page]);

  useEffect(() => {
    const saved = authApi.getSavedUser();
    if (saved) {
      if (isAuthorizedAdminUser(saved)) {
        saved.role = 'admin';
      }
      setCurrentUser(saved);
    }
    authApi.fetchCurrentUser().then((u) => {
      if (u) {
        if (isAuthorizedAdminUser(u)) {
          u.role = 'admin';
        }
        setCurrentUser(u);
      }
    });
  }, []);

  useEffect(() => {
    if (currentUser) {
      refreshCurriculumLocks();
    }
  }, [currentUser]);

  const isSessionLocked = (sessionNum: number): boolean => {
    if (isUserAdmin(currentUser)) return false; // Admin bypass!
    if (sessionNum <= 1) return false; // Sessions 0 & 1 always accessible
    const lock = sessionLocks.find((l) => l.sessionNum === sessionNum);
    return lock ? !lock.isUnlocked : false;
  };

  // Enforce authentication: Login prompted only when entering deeper curriculum pages without session
  useEffect(() => {
    // Sessions 0 and 1, plus landing & quiz are publicly viewable
    const publicPages = ['landing', 'quiz', 0, 1];
    if (!currentUser && !publicPages.includes(page)) {
      setPage('landing');
      setIsAuthModalOpen(true);
    }
  }, [currentUser, page]);

  // Page 0 state (Applied LLM Fundamentals & Prompting Toolkit Sandbox)
  const [page0Content, setPage0Content] = useState('');

  // Page 1 state
  const [read, setRead] = useState(false);
  const [story, setStory] = useState('');
  const [bg, setBg] = useState('');
  const [obj, setObj] = useState('');
  const [qs, setQs] = useState<string[]>([]);
  const [ans, setAns] = useState<Record<number, number>>({});

  // Page 2 state (What problem are you solving with AI in this iteration?)
  const [page2Content, setPage2Content] = useState('');

  // Page 3 state (What are the objective measures of success for this project iteration?)
  const [page3Content, setPage3Content] = useState('');

  // Page 4 state (Subtask: Cost-Benefit Analysis: What is the cost and time budget for this project?)
  const [page4Content, setPage4Content] = useState('');

  // Page 5 state (What is the expected ROI for this project?)
  const [page5Content, setPage5Content] = useState('');

  // Page 6 state (Task Group: Cognitive Project Requirements / Task: Cognitive Requirements - Slide 16)
  const [page6Content, setPage6Content] = useState('');

  // Page 7 state (Why is an AI solution needed for this project? - Slide 17)
  const [page7Content, setPage7Content] = useState('');

  // Page 8 state (Noncognitive Technologies & Alternatives - Slide 18)
  const [page8Content, setPage8Content] = useState('');

  // Page 9 state (Cognitive Objectives: Enumerate the specific objectives - Slide 19)
  const [page9Content, setPage9Content] = useState('');

  // Page 10 state (Cognitive Outcomes: Goals, Criteria, Subjective Judgment - Slide 20)
  const [page10Content, setPage10Content] = useState('');

  // Page 11 state (AI Success Criteria: Unique Capabilities & Skeptic Proof - Slide 21)
  const [page11Content, setPage11Content] = useState('');

  // Page 12 state (AI Patterns: The Seven Patterns of AI as Accelerators - Slide 22)
  const [page12Content, setPage12Content] = useState('');

  // Page 13 state (Which patterns are being used in this project? - Slide 23)
  const [page13Content, setPage13Content] = useState('');

  // Page 14 state (Task Group: Assess Situation / Tasks: Resource Requirements & Schedule Requirements - Slide 24)
  const [page14Content, setPage14Content] = useState('');

  // Page 15 state (Task Group: Assess Situation / Task: Resource Requirements - Technology & Skills Inventory - Slide 25)
  const [page15Content, setPage15Content] = useState('');

  // Page 16 state (Task Group: Assess Situation / Task: Schedule Requirements - Slide 26)
  const [page16Content, setPage16Content] = useState('');

  // Page 17 state (Slide 27: Project Constraints & Acceptable Model Performance Values)
  const [page17Content, setPage17Content] = useState('');

  // Page 18 state (Slide 28: Figure 3 Confusion Matrix & Acceptable Model Performance Values)
  const [page18Content, setPage18Content] = useState('');

  // Page 19 state (Slide 29: Desired Performance Metrics & Sensitivities)
  const [page19Content, setPage19Content] = useState('');

  // Page 20 state (Slide 30: Task Acceptable KPI Performance Values)
  const [page20Content, setPage20Content] = useState('');

  // Page 21 state (Slide 31: Required Technology KPIs)
  const [page21Content, setPage21Content] = useState('');

  const [toastMsg, setToastMsg] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [cloudStatus, setCloudStatus] = useState<'idle' | 'synced' | 'error'>('idle');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored =
        localStorage.getItem(STORAGE_KEY) ||
        localStorage.getItem(LEGACY_KEY_21) ||
        localStorage.getItem(LEGACY_KEY_20) ||
        localStorage.getItem(LEGACY_KEY_19) ||
        localStorage.getItem(LEGACY_KEY_18) ||
        localStorage.getItem(LEGACY_KEY_17) ||
        localStorage.getItem(LEGACY_KEY_16) ||
        localStorage.getItem(LEGACY_KEY_15) ||
        localStorage.getItem(LEGACY_KEY_14) ||
        localStorage.getItem(LEGACY_KEY_13) ||
        localStorage.getItem(LEGACY_KEY_12) ||
        localStorage.getItem(LEGACY_KEY_11) ||
        localStorage.getItem(LEGACY_KEY_10) ||
        localStorage.getItem(LEGACY_KEY_9) ||
        localStorage.getItem(LEGACY_KEY_8) ||
        localStorage.getItem(LEGACY_KEY_7) ||
        localStorage.getItem(LEGACY_KEY_6) ||
        localStorage.getItem(LEGACY_KEY_5) ||
        localStorage.getItem(LEGACY_KEY_4) ||
        localStorage.getItem(LEGACY_KEY_3) ||
        localStorage.getItem(LEGACY_KEY_2) ||
        localStorage.getItem(LEGACY_KEY);

      if (stored) {
        const d = JSON.parse(stored);
        if (d.page !== undefined) setPage(d.page);
        if (d.lang) setLang(d.lang);
        if (d.theme) setTheme(d.theme);
        if (d.page0Content) setPage0Content(d.page0Content);
        if (d.read !== undefined) setRead(d.read);
        if (d.story) setStory(d.story);
        if (d.bg) setBg(d.bg);
        if (d.obj) setObj(d.obj);
        if (Array.isArray(d.qs)) setQs(d.qs);
        if (d.ans) setAns(d.ans);
        if (d.page2Content) setPage2Content(d.page2Content);
        if (d.page3Content) setPage3Content(d.page3Content);
        if (d.page4Content) setPage4Content(d.page4Content);
        if (d.page5Content) setPage5Content(d.page5Content);
        if (d.page6Content) setPage6Content(d.page6Content);
        if (d.page7Content) setPage7Content(d.page7Content);
        if (d.page8Content) setPage8Content(d.page8Content);
        if (d.page9Content) setPage9Content(d.page9Content);
        if (d.page10Content) setPage10Content(d.page10Content);
        if (d.page11Content) setPage11Content(d.page11Content);
        if (d.page12Content) setPage12Content(d.page12Content);
        if (d.page13Content) setPage13Content(d.page13Content);
        if (d.page14Content) setPage14Content(d.page14Content);
        if (d.page15Content) setPage15Content(d.page15Content);
        if (d.page16Content) setPage16Content(d.page16Content);
        if (d.page17Content) setPage17Content(d.page17Content);
        if (d.page18Content) setPage18Content(d.page18Content);
        if (d.page19Content) setPage19Content(d.page19Content);
        if (d.page20Content) setPage20Content(d.page20Content);
        if (d.page21Content) setPage21Content(d.page21Content);
      }
    } catch {
      // Ignore parse error
    }
  }, []);

  // Save to localStorage on state changes
  useEffect(() => {
    const data = {
      page,
      lang,
      theme,
      page0Content,
      read,
      story,
      bg,
      obj,
      qs,
      ans,
      page2Content,
      page3Content,
      page4Content,
      page5Content,
      page6Content,
      page7Content,
      page8Content,
      page9Content,
      page10Content,
      page11Content,
      page12Content,
      page13Content,
      page14Content,
      page15Content,
      page16Content,
      page17Content,
      page18Content,
      page19Content,
      page20Content,
      page21Content
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Storage unavailable
    }
  }, [page, lang, theme, page0Content, read, story, bg, obj, qs, ans, page2Content, page3Content, page4Content, page5Content, page6Content, page7Content, page8Content, page9Content, page10Content, page11Content, page12Content, page13Content, page14Content, page15Content, page16Content, page17Content, page18Content, page19Content, page20Content, page21Content]);

  // Sync document language, direction, and theme
  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'fa' ? 'rtl' : 'ltr';
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
    document.title = lang === 'fa'
      ? 'کتاب کار CPMAI · فاز اول (درک کسب‌وکار) | مشاوران مدیریت کسب و کار اوج'
      : 'CPMAI Workbook · Phase I: Business Understanding | OWJ Business Council';
  }, [lang, theme]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  const handleOnboardingComplete = (updatedUser: UserProfile) => {
    setCurrentUser(updatedUser);
    refreshCurriculumLocks();
    const levelName =
      updatedUser.aiLevel === 'beginner'
        ? (lang === 'fa' ? 'مقدماتی' : 'Beginner')
        : updatedUser.aiLevel === 'intermediate'
        ? (lang === 'fa' ? 'متوسط' : 'Intermediate')
        : (lang === 'fa' ? 'پیشرفته' : 'Advanced');

    showToast(
      lang === 'fa'
        ? `اطلاعات با موفقیت ثبت شد. آزمون سطح‌سنجی متناسب با سطح ${levelName} برای شما آماده است.`
        : `Profile saved. Placement quiz calibrated to ${levelName} track is ready!`
    );
    setPage('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    authApi.logout();
    setCurrentUser(null);
    setPage('landing');
    showToast(
      lang === 'fa'
        ? 'با موفقیت از حساب خود خارج شدید.'
        : 'Signed out successfully.'
    );
  };

  const handleCopyAll = () => {
    let fullText = lang === 'fa'
      ? `=== کتاب کار CPMAI: فاز اول درک کسب‌وکار ===\nمشاوران مدیریت کسب و کار اوج (owjbc.com)\n\n`
      : `=== CPMAI Workbook: Phase I Business Understanding ===\nOWJ Business Council (owjbc.com)\n\n`;

    // Page 0
    if (page0Content.trim()) {
      fullText += lang === 'fa'
        ? `--- صفحه ۰: پیش‌نویس کارگاه پرامپت LLM ---\n${page0Content}\n\n`
        : `--- Page 0: LLM Prompt Sandbox Draft ---\n${page0Content}\n\n`;
    }

    // Page 1
    fullText += lang === 'fa' ? `--- صفحه ۱: اهداف کسب‌وکار ---\n` : `--- Page 1: Determine Business Objectives ---\n`;
    fullText += `${lang === 'fa' ? 'داستان کاربر اسپرینت:' : 'Sprint User Story:'} ${story || 'N/A'}\n\n`;
    fullText += `${lang === 'fa' ? 'پس‌زمینه کسب‌وکار:' : 'Background:'}\n${bg || 'N/A'}\n\n`;
    fullText += `${lang === 'fa' ? 'هدف اصلی کسب‌وکار:' : 'Primary Business Objective:'}\n${obj || 'N/A'}\n\n`;
    fullText += `${lang === 'fa' ? 'پرسش‌های کسب‌وکاری مرتبط:' : 'Related Business Questions:'}\n`;
    if (qs.length > 0) {
      qs.forEach((q, i) => {
        fullText += `  ${i + 1}. ${q}\n`;
      });
    } else {
      fullText += `  (موردی ثبت نشده است)\n`;
    }

    // Page 2
    fullText += `\n` + (lang === 'fa'
      ? `--- صفحه ۲: حل چه مسئله‌ای با هوش مصنوعی در این تکرار؟ ---\nWhat problem are you solving with AI in this iteration?\n\n`
      : `--- Page 2: What problem are you solving with AI in this iteration? ---\n\n`);
    fullText += (page2Content || '(محتوایی در بوم ثبت نشده است / No content entered)') + `\n\n`;

    // Page 3
    fullText += lang === 'fa'
      ? `--- صفحه ۳: معیارهای موفقیت کسب‌وکار در این تکرار ---\nWhat are the objective measures of success for this project iteration?\n\n`
      : `--- Page 3: Determine Business Success Criteria ---\nWhat are the objective measures of success for this project iteration?\n\n`;
    fullText += (page3Content || '(محتوایی در بوم ثبت نشده است / No content entered)') + `\n\n`;

    // Page 4
    fullText += lang === 'fa'
      ? `--- صفحه ۴: تحلیل هزینه-فایده و بودجه (اسلاید ۱۴) ---\nSubtask: Cost-Benefit Analysis\nWhat is the cost and time budget for this project?\n\n`
      : `--- Page 4: Subtask: Cost-Benefit Analysis (Slide 14) ---\nWhat is the cost and time budget for this project?\n\n`;
    fullText += (page4Content || '(محتوایی در بوم ثبت نشده است / No content entered)') + `\n\n`;

    // Page 5
    fullText += lang === 'fa'
      ? `--- صفحه ۵: برآورد نرخ بازگشت سرمایه (ROI) پروژه (اسلاید ۱۵) ---\nWhat is the expected ROI for this project?\n\n`
      : `--- Page 5: Expected ROI for this project (Slide 15) ---\nWhat is the expected ROI for this project?\n\n`;
    fullText += (page5Content || '(محتوایی در بوم ثبت نشده است / No content entered)') + `\n\n`;

    // Page 6
    fullText += lang === 'fa'
      ? `--- صفحه ۶: الزامات پروژه‌های شناختی و خط مبنای اکتشافی (اسلاید ۱۶) ---\nTask Group: Cognitive Project Requirements / Task: Cognitive Requirements\n\n`
      : `--- Page 6: Task Group: Cognitive Project Requirements / Task: Cognitive Requirements (Slide 16) ---\n\n`;
    fullText += (page6Content || '(محتوایی در بوم ثبت نشده است / No content entered)') + `\n\n`;

    // Page 7
    fullText += lang === 'fa'
      ? `--- صفحه ۷: چرا برای این پروژه به یک راه‌حل هوش مصنوعی نیاز است؟ (اسلاید ۱۷) ---\nWhy is an AI solution needed for this project?\n\n`
      : `--- Page 7: Why is an AI solution needed for this project? (Slide 17) ---\n\n`;
    fullText += (page7Content || '(محتوایی در بوم ثبت نشده است / No content entered)') + `\n\n`;

    // Page 8
    fullText += lang === 'fa'
      ? `--- صفحه ۸: مؤلفه‌های غیرشناختی و جایگزین‌های اتوماسیون (اسلاید ۱۸) ---\nTask: Cognitive Requirements\nپرسش ۱: What are the noncognitive (non-AI) portions of this project that will be used in conjunction with the cognitive components?\nپرسش ۲: Are non-cognitive automation alternatives possible for this iteration? If so, why are they not being used for this project iteration?\n\n`
      : `--- Page 8: Noncognitive Portions & Automation Alternatives (Slide 18) ---\nTask: Cognitive Requirements\nQuestion 1: What are the noncognitive (non-AI) portions of this project that will be used in conjunction with the cognitive components?\nQuestion 2: Are non-cognitive automation alternatives possible for this iteration? If so, why are they not being used for this project iteration?\n\n`;
    fullText += (page8Content || '(محتوایی در بوم ثبت نشده است / No content entered)') + `\n\n`;

    // Page 9
    fullText += lang === 'fa'
      ? `--- صفحه ۹: اهداف شناختی پروژه (اسلاید ۱۹) ---\nTask Group: Cognitive Project Requirements\nTask: Cognitive Requirements\nCognitive objectives: Enumerate the specific objectives\n\n`
      : `--- Page 9: Cognitive Objectives (Slide 19) ---\nTask Group: Cognitive Project Requirements\nTask: Cognitive Requirements\nCognitive objectives: Enumerate the specific objectives\n\n`;
    fullText += (page9Content || '(محتوایی در بوم ثبت نشده است / No content entered)') + `\n\n`;

    // Page 10
    fullText += lang === 'fa'
      ? `--- صفحه ۱۰: نتایج و دستاوردهای شناختی (اسلاید ۲۰) ---\nTask Group: Cognitive Project Requirements\nTask: Cognitive Requirements\nCognitive outcomes: Detail specific outcomes, criteria & subjective judgments\n\n`
      : `--- Page 10: Cognitive Outcomes (Slide 20) ---\nTask Group: Cognitive Project Requirements\nTask: Cognitive Requirements\nCognitive outcomes: Detail specific outcomes, criteria & subjective judgments\n\n`;
    fullText += (page10Content || '(محتوایی در بوم ثبت نشده است / No content entered)') + '\n\n';

    // Page 11
    fullText += lang === 'fa'
      ? `--- صفحه ۱۱: معیارهای موفقیت هوش مصنوعی (اسلاید ۲۱) ---\nTask Group: Cognitive Project Requirements\nTask: Cognitive Requirements / AI Success Criteria\nAI success criteria: Criteria for success, unique capabilities, superiority dimensions & satisfying skeptics\n\n`
      : `--- Page 11: AI Success Criteria (Slide 21) ---\nTask Group: Cognitive Project Requirements\nTask: Cognitive Requirements / AI Success Criteria\nAI success criteria: Criteria for success, unique capabilities, superiority dimensions & satisfying skeptics\n\n`;
    fullText += (page11Content || '(محتوایی در بوم ثبت نشده است / No content entered)') + '\n\n';

    // Page 12
    fullText += lang === 'fa'
      ? `--- صفحه ۱۲: الگوهای هوش مصنوعی (اسلاید ۲۲) ---\nTask Group: Cognitive Project Requirements\nTask: Cognitive Requirements / AI Patterns (Figure 2: The Seven Patterns of AI)\nAI Patterns: Which patterns used, determination rationale & similar leverageable assets\n\n`
      : `--- Page 12: AI Patterns (Slide 22) ---\nTask Group: Cognitive Project Requirements\nTask: Cognitive Requirements / AI Patterns (Figure 2: The Seven Patterns of AI)\nAI Patterns: Which patterns used, determination rationale & similar leverageable assets\n\n`;
    fullText += (page12Content || '(محتوایی در بوم ثبت نشده است / No content entered)') + '\n\n';

    // Page 13
    fullText += lang === 'fa'
      ? `--- صفحه ۱۳: تعیین الگوهای پروژه (اسلاید ۲۳) ---\nTask Group: Cognitive Project Requirements\nTask: Cognitive Requirements / Which patterns are being used in this project?\nAI Patterns Breakdown: Primary & secondary patterns, pipeline synergy, scope elimination & toolkits\n\n`
      : `--- Page 13: Which Patterns are Being Used (Slide 23) ---\nTask Group: Cognitive Project Requirements\nTask: Cognitive Requirements / Which patterns are being used in this project?\nAI Patterns Breakdown: Primary & secondary patterns, pipeline synergy, scope elimination & toolkits\n\n`;
    fullText += (page13Content || '(محتوایی در بوم ثبت نشده است / No content entered)') + '\n\n';

    // Page 14
    fullText += lang === 'fa'
      ? `--- صفحه ۱۴: ارزیابی وضعیت — نیازمندی‌های منابع و زمان‌بندی (اسلاید ۲۴) ---\nTask Group: Assess Situation\nTask: Resource Requirements & Task: Schedule Requirements\nResources: Personnel/Skills, Compute/GPU hardware, Software/Data stack, Budget\nSchedule: Agile sprint cadence, CPMAI 6-phase stage-gates, Hard deadlines, Critical path dependencies\n\n`
      : `--- Page 14: Assess Situation — Resource & Schedule Requirements (Slide 24) ---\nTask Group: Assess Situation\nTask: Resource Requirements & Task: Schedule Requirements\nResources: Personnel/Skills, Compute/GPU hardware, Software/Data stack, Budget\nSchedule: Agile sprint cadence, CPMAI 6-phase stage-gates, Hard deadlines, Critical path dependencies\n\n`;
    fullText += (page14Content || '(محتوایی در بوم ثبت نشده است / No content entered)') + '\n\n';

    // Page 15
    fullText += lang === 'fa'
      ? `--- صفحه ۱۵: سیاهه منابع فناوری و مهارت‌های مورد نیاز (اسلاید ۲۵) ---\nTask Group: Assess Situation\nTask: Resource Requirements — Technology Resources & Skills Inventory\nTechnology: Hardware, AI/NLP Frameworks, Cloud Hosting, APIs & CI/CD\nSkills: Core ML/NLP, Solutions Architecture, Domain SME, Agile PM, Skill Gaps\n\n`
      : `--- Page 15: Technology Resources & Skills Inventory (Slide 25) ---\nTask Group: Assess Situation\nTask: Resource Requirements — Technology Resources & Skills Inventory\nTechnology: Hardware, AI/NLP Frameworks, Cloud Hosting, APIs & CI/CD\nSkills: Core ML/NLP, Solutions Architecture, Domain SME, Agile PM, Skill Gaps\n\n`;
    fullText += page15Content || '(محتوایی در بوم ثبت نشده است / No content entered)';

    // Page 16
    fullText += '\n\n' + (lang === 'fa'
      ? `--- صفحه ۱۶: الزامات زمان‌بندی و وابستگی‌های پروژه (اسلاید ۲۶) ---\nTask Group: Assess Situation\nTask: Schedule Requirements\nSchedule: 4-Month MVP, 2-to-4-week agile sprints, pilot testing\nConstraints: Budget < $1M, API dependencies, CCPA data permissions\n\n`
      : `--- Page 16: Task: Schedule Requirements (Slide 26) ---\nTask Group: Assess Situation\nTask: Schedule Requirements\nSchedule: 4-Month MVP, 2-to-4-week agile sprints, pilot testing\nConstraints: Budget < $1M, API dependencies, CCPA data permissions\n\n`);
    fullText += page16Content || '(محتوایی در بوم ثبت نشده است / No content entered)';

    // Page 17
    fullText += '\n\n' + (lang === 'fa'
      ? `--- صفحه ۱۷: محدودیت‌های تکمیلی و مقادیر عملکرد مدل (اسلاید ۲۷) ---\nTask Group: AI System Performance and Operation\nTask: Acceptable Model Performance Values\nConstraints: Budget limits, data volume/noise, legacy API rate limits, CCPA privacy, seasonal peak freeze\nPerformance: Probabilistic error awareness & baseline thresholds\n\n`
      : `--- Page 17: Project Constraints & Model Performance Values (Slide 27) ---\nTask Group: AI System Performance and Operation\nTask: Acceptable Model Performance Values\nConstraints: Budget limits, data volume/noise, legacy API rate limits, CCPA privacy, seasonal peak freeze\nPerformance: Probabilistic error awareness & baseline thresholds\n\n`);
    fullText += page17Content || '(محتوایی در بوم ثبت نشده است / No content entered)';

    // Page 18
    fullText += '\n\n' + (lang === 'fa'
      ? `--- صفحه ۱۸: ماتریس درهم‌ریختگی و مقادیر قابل قبول عملکرد مدل (اسلاید ۲۸) ---\nTask Group: AI System Performance and Operation\nTask: Acceptable Model Performance Values (Figure 3 Confusion Matrix)\nArtifacts: Accuracy, Precision, Recall, F1 Score, Max False Positive Rate\n\n`
      : `--- Page 18: Confusion Matrix & Model Performance Values (Slide 28) ---\nTask Group: AI System Performance and Operation\nTask: Acceptable Model Performance Values (Figure 3 Confusion Matrix)\nArtifacts: Accuracy, Precision, Recall, F1 Score, Max False Positive Rate\n\n`);
    fullText += page18Content || '(محتوایی در بوم ثبت نشده است / No content entered)';

    // Page 19
    fullText += '\n\n' + (lang === 'fa'
      ? `--- صفحه ۱۹: سنجه‌های مطلوب عملکرد و حساسیت‌ها (اسلاید ۲۹) ---\nTask Group: AI System Performance and Operation\nTask: Acceptable Model Performance Values (Slide 29)\nArtifact: Maximum Acceptable False Negative Rate (FNR)\nQ1: Desired / Required Performance Metrics\nQ2: Sensitivities to False Positives/Negatives & GenAI Inaccuracies\n\n`
      : `--- Page 19: Desired Performance Metrics & Sensitivities (Slide 29) ---\nTask Group: AI System Performance and Operation\nTask: Acceptable Model Performance Values (Slide 29)\nArtifact: Maximum Acceptable False Negative Rate (FNR)\nQ1: Desired / Required Performance Metrics\nQ2: Sensitivities to False Positives/Negatives & GenAI Inaccuracies\n\n`);
    fullText += page19Content || '(محتوایی در بوم ثبت نشده است / No content entered)';

    // Page 20
    fullText += '\n\n' + (lang === 'fa'
      ? `--- صفحه ۲۰: مقادیر قابل قبول سنجه‌های کلیدی عملکرد کسب‌وکار (اسلاید ۳۰) ---\nTask Group: AI System Performance and Operation\nTask: Acceptable KPI Performance Values (Slide 30)\nArtifacts: Required Business KPIs (Efficiency, CSAT, Error Reduction, Revenue)\nFinancial ROI & Cost Savings Estimation\n\n`
      : `--- Page 20: Acceptable Business KPI Performance Values (Slide 30) ---\nTask Group: AI System Performance and Operation\nTask: Acceptable KPI Performance Values (Slide 30)\nArtifacts: Required Business KPIs (Efficiency, CSAT, Error Reduction, Revenue)\nFinancial ROI & Cost Savings Estimation\n\n`);
    fullText += page20Content || '(محتوایی در بوم ثبت نشده است / No content entered)';

    // Page 21
    fullText += '\n\n' + (lang === 'fa'
      ? `--- صفحه ۲۱: سنجه‌های کلیدی عملکرد فناوری (اسلاید ۳۱) ---\nTask Group: AI System Performance and Operation\nTask: Acceptable KPI Performance Values — Required Technology KPIs (Slide 31)\nArtifacts: Latency SLAs, Cloud FinOps, Throughput, Error Rates, High Availability\n\n`
      : `--- Page 21: Required Technology KPIs (Slide 31) ---\nTask Group: AI System Performance and Operation\nTask: Acceptable KPI Performance Values — Required Technology KPIs (Slide 31)\nArtifacts: Latency SLAs, Cloud FinOps, Throughput, Error Rates, High Availability\n\n`);
    fullText += page21Content || '(محتوایی در بوم ثبت نشده است / No content entered)';

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullText).then(() => {
        showToast(lang === 'fa' ? 'پاسخ‌های هر ۲۱ صفحه کپی شد!' : 'Workbook answers for all 21 pages copied!');
      });
    }
  };

  const handleReset = () => {
    const confirmMsg = lang === 'fa'
      ? 'آیا از پاک کردن تمام پاسخ‌های واردشده در کتاب کار اطمینان دارید؟'
      : 'Clear all responses in the workbook?';
    if (!window.confirm(confirmMsg)) return;

    setRead(false);
    setStory('');
    setBg('');
    setObj('');
    setQs([]);
    setAns({});
    setPage2Content('');
    setPage3Content('');
    setPage4Content('');
    setPage5Content('');
    setPage6Content('');
    setPage7Content('');
    setPage8Content('');
    setPage9Content('');
    setPage10Content('');
    setPage11Content('');
    setPage12Content('');
    setPage13Content('');
    setPage14Content('');
    setPage15Content('');
    setPage16Content('');
    setPage17Content('');
    showToast(lang === 'fa' ? 'تمام پاسخ‌ها پاک شدند' : 'Workbook reset');
  };

  const handleSyncToCloud = async () => {
    setIsSyncing(true);
    try {
      const payload = {
        projectTitle: story || 'XYZ Company Customer Support Chatbot',
        organization: 'OWJ Business Council',
        studentName: 'CPMAI Practitioner',
        language: lang,
        theme: theme,
        pages: [
          { pageNumber: 1, contentText: `${story}\n\n${bg}\n\n${obj}`, contentJson: { story, bg, obj, qs }, isCompleted: true },
          { pageNumber: 2, contentText: page2Content, contentJson: { content: page2Content }, isCompleted: !!page2Content },
          { pageNumber: 3, contentText: page3Content, contentJson: { content: page3Content }, isCompleted: !!page3Content },
          { pageNumber: 4, contentText: page4Content, contentJson: { content: page4Content }, isCompleted: !!page4Content },
          { pageNumber: 5, contentText: page5Content, contentJson: { content: page5Content }, isCompleted: !!page5Content },
          { pageNumber: 6, contentText: page6Content, contentJson: { content: page6Content }, isCompleted: !!page6Content },
          { pageNumber: 7, contentText: page7Content, contentJson: { content: page7Content }, isCompleted: !!page7Content },
          { pageNumber: 8, contentText: page8Content, contentJson: { content: page8Content }, isCompleted: !!page8Content },
          { pageNumber: 9, contentText: page9Content, contentJson: { content: page9Content }, isCompleted: !!page9Content },
          { pageNumber: 10, contentText: page10Content, contentJson: { content: page10Content }, isCompleted: !!page10Content },
          { pageNumber: 11, contentText: page11Content, contentJson: { content: page11Content }, isCompleted: !!page11Content },
          { pageNumber: 12, contentText: page12Content, contentJson: { content: page12Content }, isCompleted: !!page12Content },
          { pageNumber: 13, contentText: page13Content, contentJson: { content: page13Content }, isCompleted: !!page13Content },
          { pageNumber: 14, contentText: page14Content, contentJson: { content: page14Content }, isCompleted: !!page14Content },
          { pageNumber: 15, contentText: page15Content, contentJson: { content: page15Content }, isCompleted: !!page15Content },
          { pageNumber: 16, contentText: page16Content, contentJson: { content: page16Content }, isCompleted: !!page16Content },
          { pageNumber: 17, contentText: page17Content, contentJson: { content: page17Content }, isCompleted: !!page17Content },
        ]
      };

      const res = await fetch('/api/workbooks/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setCloudStatus('synced');
        showToast(lang === 'fa' ? '✓ اطلاعات با پایگاه داده Neon همگام‌سازی شد.' : '✓ Synced with Neon PostgreSQL cloud database.');
      } else {
        setCloudStatus('error');
        showToast(lang === 'fa' ? 'خطا در ارتباط با سرور ابری' : 'Failed to sync with cloud database');
      }
    } catch {
      setCloudStatus('error');
      showToast(lang === 'fa' ? 'خطا در اتصال به اینترنت یا پایگاه داده' : 'Network/database connection error');
    } finally {
      setIsSyncing(false);
    }
  };

  // Agentify Enterprise Hero Landing Page (Pure English & Login-gated)
  // AJA Cinematic Brand Intro (Unseen Studio Inspired Experience)
  if (showBrandIntro) {
    return (
      <AjaBrandIntro
        onComplete={() => setShowBrandIntro(false)}
      />
    );
  }

  if (page === 'landing') {
    return (
      <>
        <AgentifyLanding
          onReplayIntro={() => setShowBrandIntro(true)}
          onOpenBookModal={() => setIsBookModalOpen(true)}
          currentTrack={industryTrack}
          onSelectTrack={handleSelectIndustryTrack}
          onOpenTrackModal={() => setIsIndustryModalOpen(true)}
          onEnterApp={() => {
            if (!currentUser) {
              setIsAuthModalOpen(true);
            } else {
              setPage(0);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          currentUser={currentUser}
          onGoToQuiz={() => {
            if (!currentUser) {
              setIsAuthModalOpen(true);
            } else {
              setPage('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        />

        {/* User Authentication Modal (Admin & Google) */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          lang={lang}
          currentUser={currentUser}
          onLoginSuccess={(user) => {
            setCurrentUser(user);
            showToast(
              lang === 'fa'
                ? `خوش آمدید، ${user.displayName || user.email}`
                : `Welcome, ${user.displayName || user.email}`
            );
            if (user.isOnboarded) {
              setPage(0);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onLogout={handleLogout}
        />

        {/* Mandatory Post-Registration Onboarding Modal */}
        {currentUser && !currentUser.isOnboarded && (
          <OnboardingModal
            isOpen={true}
            currentUser={currentUser}
            onComplete={handleOnboardingComplete}
            onLogout={handleLogout}
            lang={lang}
          />
        )}

        {/* Class Leaderboard Modal */}
        <ClassLeaderboardModal
          isOpen={isLeaderboardModalOpen}
          onClose={() => setIsLeaderboardModalOpen(false)}
          currentUser={currentUser}
          lang={lang}
        />

        {/* Admin Control Center Modal (Admin Only) */}
        {isUserAdmin(currentUser) && isAdminModalOpen && (
          <AdminControlCenterModal
            isOpen={isAdminModalOpen}
            onClose={() => setIsAdminModalOpen(false)}
            currentUser={currentUser}
            lang={lang}
          />
        )}

        {/* LLM For Humans Book Modal */}
        <LlmForHumansBookModal
          isOpen={isBookModalOpen}
          onClose={() => setIsBookModalOpen(false)}
        />

        {/* Industry Track Selector Modal */}
        <IndustryTrackSelectorModal
          isOpen={isIndustryModalOpen}
          onClose={() => setIsIndustryModalOpen(false)}
          currentTrack={industryTrack}
          onSelectTrack={handleSelectIndustryTrack}
        />

        {/* Discipline & Role Selector Modal */}
        <DisciplineSelectorModal
          isOpen={isDisciplineModalOpen}
          onClose={() => setIsDisciplineModalOpen(false)}
          currentTrack={industryTrack}
          currentDiscipline={activeDiscipline}
          currentRole={activeRole}
          onSelectDiscipline={handleSelectDiscipline}
          onSelectRole={handleSelectRole}
          lang={lang}
        />
      </>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-[#f5f5f2] dark:bg-[#0f1418] text-[#1c2830] dark:text-[#e8ebe9] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(31,81,99,0.08),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(111,179,198,0.06),rgba(0,0,0,0))] transition-colors flex flex-col selection:bg-[#1f5163]/20 selection:text-[#1f5163] dark:selection:bg-[#6fb3c6]/20 dark:selection:text-[#6fb3c6]">
      {/* OWJ Content Protection Shield (Anti-Copy, Anti-Print, Anti-Snipping with Smart Prompt Whitelist) */}
      <ContentProtectionShield lang={lang} isAdmin={isUserAdmin(currentUser)} />

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 w-full bg-[#ffffff]/95 dark:bg-[#161e24]/95 backdrop-blur-xl border-b border-[#d9dad5]/80 dark:border-[#26333c]/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="w-full max-w-[1750px] mx-auto px-2 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4 flex-nowrap overflow-x-hidden">
          {/* Section 1: Hamburger Menu + Brand */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Sidebar Toggle Button */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.05] hover:bg-[#1f5163]/10 text-[#1f5163] dark:text-[#6fb3c6] transition-all cursor-pointer shrink-0 shadow-2xs"
              title={lang === 'fa' ? 'فهرست سرفصل‌های کارگاه و جلسات ۲۲گانه' : 'Toggle Curriculum Sidebar'}
            >
              <Menu className="w-4 h-4 shrink-0" />
              <span className="text-xs font-bold whitespace-nowrap hidden sm:inline">
                {lang === 'fa' ? 'جلسات ☰' : 'Sessions ☰'}
              </span>
            </button>

            {/* Brand & Organization */}
            <a
              href="https://owjbc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 group shrink-0 select-none cursor-pointer"
            >
              <div className="bg-[#ffffff] p-1 rounded-xl border border-black/[0.08] dark:border-white/[0.12] shadow-xs group-hover:scale-105 transition-all shrink-0 flex items-center justify-center">
                <img
                  src={OWJ_LOGO}
                  alt="OWJ"
                  className="h-7 w-auto min-w-[36px] max-w-[70px] object-contain shrink-0"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = OWJ_LOGO_FALLBACK;
                  }}
                />
              </div>
              <div className="hidden lg:flex flex-col shrink-0">
                <span className="font-extrabold text-xs text-[#1c2830] dark:text-[#e8ebe9] whitespace-nowrap">
                  {lang === 'fa' ? 'کتاب کار CPMAI' : 'CPMAI Workbook'}
                </span>
                <span className="text-[10px] text-[#5d6b73] dark:text-[#9aa8b0] whitespace-nowrap">
                  {lang === 'fa' ? 'مشاوران مدیریت اوج' : 'OWJ Business Council'}
                </span>
              </div>
            </a>
          </div>

          {/* Section 2: Active Track & Discipline Center Pill */}
          <div className="flex items-center gap-1.5 shrink-0 min-w-0">
            <IndustryTrackSwitcher
              currentTrack={industryTrack}
              onSelectTrack={handleSelectIndustryTrack}
              onOpenSelectorModal={() => setIsIndustryModalOpen(true)}
              className="shrink-0 scale-90 sm:scale-100 origin-right"
            />
            <DisciplineBadge
              currentTrack={industryTrack}
              currentDiscipline={activeDiscipline}
              onClick={() => setIsDisciplineModalOpen(true)}
              lang={lang}
              className="shrink-0 hidden md:inline-flex"
            />
          </div>

          {/* Section 3: Tools & Utilities */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Class Leaderboard Button */}
            <button
              onClick={() => setIsLeaderboardModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all border bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/20 active:scale-[0.96] cursor-pointer shrink-0 whitespace-nowrap"
              title={lang === 'fa' ? 'جدول رتبه‌بندی رقابتی هم‌دوره‌ای‌ها (Class Leaderboard)' : 'Class Leaderboard'}
            >
              <Trophy className="w-3.5 h-3.5 shrink-0 text-amber-500" />
              <span className="hidden lg:inline whitespace-nowrap">{lang === 'fa' ? 'رتبه‌بندی' : 'Leaderboard'}</span>
            </button>

            {/* Admin Control Center Button */}
            {isUserAdmin(currentUser) && (
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all border bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30 hover:bg-purple-500/25 active:scale-[0.96] cursor-pointer shrink-0 whitespace-nowrap"
                title={lang === 'fa' ? 'مرکز فرماندهی مدیریت دوره (Admin Control Center)' : 'Admin Control Center'}
              >
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden lg:inline whitespace-nowrap">{lang === 'fa' ? 'پنل مدیریت' : 'Admin'}</span>
              </button>
            )}

            {/* User Profile / Google Sign-In Button */}
            {currentUser ? (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 p-1 pe-2 rounded-xl border border-[#2f7d5b]/30 bg-[#2f7d5b]/10 hover:bg-[#2f7d5b]/20 transition-all text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] cursor-pointer shrink-0 whitespace-nowrap"
                title={lang === 'fa' ? 'حساب کاربری' : 'User Account'}
              >
                {currentUser.avatarUrl ? (
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.displayName}
                    className="w-5 h-5 rounded-lg object-cover border border-white dark:border-[#161e24] shrink-0"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-lg bg-[#2f7d5b] text-white flex items-center justify-center text-[10px] font-mono shrink-0">
                    {currentUser.displayName.charAt(0)}
                  </div>
                )}
                <span className="hidden xl:inline max-w-24 truncate text-[11px]">
                  {currentUser.displayName}
                </span>
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-[#1f5163] to-[#00738c] hover:from-[#163c4a] hover:to-[#0f4c5c] text-white shadow-xs transition-all active:scale-[0.96] cursor-pointer shrink-0 whitespace-nowrap"
              >
                <span>{lang === 'fa' ? 'ورود' : 'Sign In'}</span>
              </button>
            )}

            {/* Language Switch */}
            <button
              onClick={() => setLang((prev) => (prev === 'fa' ? 'en' : 'fa'))}
              className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] text-[#1c2830] dark:text-[#e8ebe9] hover:border-[#1f5163] transition-colors shrink-0 whitespace-nowrap"
            >
              <Globe className="w-3.5 h-3.5 shrink-0" />
              <span>{lang === 'fa' ? 'EN' : 'فا'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              title="Theme"
              className="p-1.5 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9] hover:bg-[#f4f4f1] dark:hover:bg-[#12171b] shrink-0"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Workspace Body Layout (Sidebar + Main Workspace Area) */}
      <div className="flex-1 flex w-full max-w-[1750px] mx-auto relative">
        {/* Responsive Workspace Sidebar */}
        <WorkspaceSidebar
          page={page}
          onSelectPage={setPage}
          lang={lang}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          isSessionLocked={isSessionLocked}
          onOpenBookModal={() => setIsBookModalOpen(true)}
          industryTrack={industryTrack}
          disciplineId={activeDiscipline}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-7 lg:p-10 min-w-0">
          {toastMsg && (
            <div className="mb-4 p-3 rounded-lg bg-[#e3f2ea] text-[#2f7d5b] dark:bg-[#173025] dark:text-[#63c496] text-xs sm:text-sm font-medium flex items-center gap-2 animate-fade-in">
              <Check className="w-4 h-4 shrink-0" />
              <span>{toastMsg}</span>
            </div>
          )}

        {/* Readiness Placement Quiz View */}
        {page === 'quiz' && (
          <InteractivePlacementQuiz
            lang={lang}
            currentUser={currentUser}
            onOpenLeaderboard={() => setIsLeaderboardModalOpen(true)}
            onNavigateToPage={(targetPage) => {
              setPage(targetPage as AppPage);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onCloseQuiz={() => {
              setPage(0);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Page 0: Applied LLM Fundamentals & Prompting Toolkit */}
        {page === 0 && (
          <Page0LlmFundamentals
            lang={lang}
            content={page0Content}
            onChangeContent={setPage0Content}
            onGoToPage1={() => {
              setPage(1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenQuiz={() => {
              setPage('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            industryTrack={industryTrack}
            disciplineId={activeDiscipline}
          />
        )}

        {/* Page 1 (Matching Image 1) */}
        {page === 1 && (
          <Page1BusinessUnderstanding
            lang={lang}
            industryTrack={industryTrack}
            disciplineId={activeDiscipline}
            read={read}
            onToggleRead={setRead}
            story={story}
            onChangeStory={setStory}
            bg={bg}
            onChangeBg={setBg}
            obj={obj}
            onChangeObj={setObj}
            qs={qs}
            onAddQ={(newQuestion) => setQs(prev => [...prev, newQuestion])}
            onRemoveQ={(index) => setQs(prev => prev.filter((_, i) => i !== index))}
            ans={ans}
            onSelectAns={(qIdx, oIdx) => setAns(prev => ({ ...prev, [qIdx]: oIdx }))}
            onGoToPage0={() => {
              setPage(0);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToPage2={() => {
              setPage(2);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Curriculum Drip Gating for Locked Sessions */}
        {typeof page === 'number' && page >= 2 && isSessionLocked(page) ? (
          <div className="max-w-3xl mx-auto py-12 px-4 animate-fadeIn">
            <div className="p-1.5 rounded-3xl bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] shadow-2xl">
              <div className="rounded-[calc(1.5rem-0.375rem)] bg-white dark:bg-[#161e24] p-8 text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center shadow-inner">
                  <Lock className="w-8 h-8 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                    محتوای آموزشی قطره‌ای (Curriculum Drip Gating)
                  </span>
                  <h3 className="text-lg font-black text-[#1c2830] dark:text-[#e8ebe9]">
                    دسترسی به جلسه {page} در حال حاضر قفل است
                  </h3>
                  <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] max-w-md mx-auto leading-relaxed">
                    جهت همگامی یادگیری در کارگاه و طبق متدولوژی استقرار CPMAI، این جلسه پس از تدریس استاد در کلاس باز خواهد شد.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setPage(1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#2f7d5b] hover:bg-[#256347] text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                  >
                    بازگشت به جلسه ۱ (درک کسب‌وکار)
                  </button>
                  <button
                    onClick={() => {
                      setPage('quiz');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                  >
                    شرکت در آزمون سطح‌سنجی
                  </button>
                  <button
                    onClick={() => setIsLeaderboardModalOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                  >
                    مشاهده جدول رتبه‌بندی کلاس 🏆
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Page 2 (Matching Image 2) */}
            {page === 2 && (
          <Page2ProblemIteration
            lang={lang}
            industryTrack={industryTrack}
            disciplineId={activeDiscipline}
            content={page2Content}
            onChangeContent={setPage2Content}
            onGoToPage1={() => {
              setPage(1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToPage3={() => {
              setPage(3);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Page 3 (Matching Image 3) */}
        {page === 3 && (
          <Page3SuccessCriteria
            lang={lang}
            industryTrack={industryTrack}
            disciplineId={activeDiscipline}
            content={page3Content}
            onChangeContent={setPage3Content}
            onGoToPage2={() => {
              setPage(2);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToPage4={() => {
              setPage(4);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Page 4 (Matching Slide 14: Subtask: Cost-Benefit Analysis) */}
        {page === 4 && (
          <Page4CostBenefit
            lang={lang}
            industryTrack={industryTrack}
            disciplineId={activeDiscipline}
            content={page4Content}
            onChangeContent={setPage4Content}
            onGoToPage3={() => {
              setPage(3);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToPage5={() => {
              setPage(5);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Page 5 (Matching Slide 15: What is the expected ROI for this project?) */}
        {page === 5 && (
          <Page5ExpectedRoi
            lang={lang}
            industryTrack={industryTrack}
            disciplineId={activeDiscipline}
            content={page5Content}
            onChangeContent={setPage5Content}
            onGoToPage4={() => {
              setPage(4);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToPage6={() => {
              setPage(6);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Page 6 (Matching Slide 16: Task Group: Cognitive Project Requirements / Task: Cognitive Requirements) */}
        {page === 6 && (
          <Page6CognitiveRequirements
            lang={lang}
            content={page6Content}
            onChangeContent={setPage6Content}
            onGoToPage5={() => {
              setPage(5);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToPage7={() => {
              setPage(7);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Page 7 (Matching Slide 17: Why is an AI solution needed for this project?) */}
        {page === 7 && (
          <Page7WhyAiSolution
            lang={lang}
            content={page7Content}
            onChangeContent={setPage7Content}
            onGoToPage6={() => {
              setPage(6);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToPage8={() => {
              setPage(8);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Page 8 (Matching Slide 18: Task: Cognitive Requirements - Noncognitive portions & Automation alternatives) */}
        {page === 8 && (
          <Page8NoncognitiveAlternatives
            lang={lang}
            content={page8Content}
            onChangeContent={setPage8Content}
            onGoToPage7={() => {
              setPage(7);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToPage9={() => {
              setPage(9);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Page 9 (Matching Slide 19: Task: Cognitive Requirements - Cognitive objectives: Enumerate the specific objectives) */}
        {page === 9 && (
          <Page9CognitiveObjectives
            lang={lang}
            content={page9Content}
            onChangeContent={setPage9Content}
            onGoToPage8={() => {
              setPage(8);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToPage10={() => {
              setPage(10);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Page 10 (Matching Slide 20: Task Group: Cognitive Project Requirements / Task: Cognitive Requirements - Cognitive outcomes) */}
        {page === 10 && (
          <Page10CognitiveOutcomes
            lang={lang}
            content={page10Content}
            onChangeContent={setPage10Content}
            onGoToPage9={() => {
              setPage(9);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToPage11={() => {
              setPage(11);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Page 11 (Matching Slide 21: Task Group: Cognitive Project Requirements / Task: Cognitive Requirements / AI Success Criteria) */}
        {page === 11 && (
          <Page11AiSuccessCriteria
            lang={lang}
            content={page11Content}
            onChangeContent={setPage11Content}
            onGoToPage10={() => {
              setPage(10);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToPage12={() => {
              setPage(12);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Page 12 (Matching Slide 22: Task Group: Cognitive Project Requirements / Task: Cognitive Requirements - AI Patterns: Figure 2) */}
        {page === 12 && (
          <Page12AiPatterns
            lang={lang}
            content={page12Content}
            onChangeContent={setPage12Content}
            onGoToPage11={() => {
              setPage(11);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToPage13={() => {
              setPage(13);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Page 13 (Matching Slide 23: Task Group: Cognitive Project Requirements / Task: Cognitive Requirements - Which patterns are being used in this project?) */}
        {page === 13 && (
          <Page13WhichPatternsUsed
            lang={lang}
            content={page13Content}
            onChangeContent={setPage13Content}
            onGoToPage12={() => {
              setPage(12);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToPage14={() => {
              setPage(14);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Page 14 (Matching Slide 24: Task Group: Assess Situation / Tasks: Resource Requirements & Schedule Requirements) */}
        {page === 14 && (
          <Page14AssessSituation
            lang={lang}
            content={page14Content}
            onChangeContent={setPage14Content}
            onGoToPage13={() => {
              setPage(13);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToPage15={() => {
              setPage(15);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Page 15 (Matching Slide 25: Task Group: Assess Situation / Task: Resource Requirements - Technology Resources & Skills Inventory) */}
        {page === 15 && (
          <Page15TechnologyAndSkills
            lang={lang}
            content={page15Content}
            onChangeContent={setPage15Content}
            onGoToPage14={() => {
              setPage(14);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToPage16={() => {
              setPage(16);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Page 16 (Matching Slide 26: Task Group: Assess Situation / Task: Schedule Requirements) */}
        {page === 16 && (
          <Page16ScheduleRequirements
            lang={lang}
            content={page16Content}
            onChangeContent={setPage16Content}
            onGoToPage15={() => {
              setPage(15);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToPage17={() => {
              setPage(17);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Page 17 (Matching Slide 27: Project Constraints & Task: Acceptable Model Performance Values) */}
        {page === 17 && (
          <Page17ProjectConstraintsAndModelPerformance
            lang={lang}
            content={page17Content}
            onChangeContent={setPage17Content}
            onGoToPage16={() => {
              setPage(16);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToPage18={() => {
              setPage(18);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Page 18 (Matching Slide 28: Figure 3 Confusion Matrix & Task: Acceptable Model Performance Values) */}
        {page === 18 && (
          <Page18ModelPerformanceMetrics
            lang={lang}
            content={page18Content}
            onChangeContent={setPage18Content}
            onGoToPage17={() => {
              setPage(17);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToPage19={() => {
              setPage(19);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Page 19 (Matching Slide 29: Desired Performance Metrics & Sensitivities) */}
        {page === 19 && (
          <Page19ModelPerformanceRequirements
            lang={lang}
            content={page19Content}
            onChangeContent={setPage19Content}
            onGoToPage18={() => {
              setPage(18);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToPage20={() => {
              setPage(20);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Page 20 (Matching Slide 30: Task Acceptable KPI Performance Values) */}
        {page === 20 && (
          <Page20AcceptableKpiPerformanceValues
            lang={lang}
            content={page20Content}
            onChangeContent={setPage20Content}
            onGoToPage19={() => {
              setPage(19);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToPage21={() => {
              setPage(21);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Page 21 (Matching Slide 31: Required Technology KPIs) */}
        {page === 21 && (
          <Page21RequiredTechnologyKpis
            lang={lang}
            content={page21Content}
            onChangeContent={setPage21Content}
            onGoToPage20={() => {
              setPage(20);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
          </>
        )}

        {/* Reset Option and Auto-save indicator */}
        <div className="mt-8 pt-4 border-t border-[#d9dad5] dark:border-[#2d3942] flex flex-wrap items-center justify-between gap-3 text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2f7d5b]" />
              <span>{lang === 'fa' ? 'پاسخ‌های شما روی همین دستگاه ذخیره می‌شود.' : 'Your answers automatically save on this device.'}</span>
            </span>

            <button
              onClick={handleSyncToCloud}
              disabled={isSyncing}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2f7d5b]/10 hover:bg-[#2f7d5b]/20 text-[#2f7d5b] dark:text-[#52b788] border border-[#2f7d5b]/30 transition-colors cursor-pointer text-xs font-medium"
              title={lang === 'fa' ? 'همگام‌سازی و ذخیره پاسخ‌ها در پایگاه داده ابری Neon' : 'Sync and save responses to Neon Cloud Database'}
            >
              <Cloud className="w-3.5 h-3.5" />
              <span>
                {isSyncing
                  ? (lang === 'fa' ? 'در حال ذخیره ابری...' : 'Syncing to cloud...')
                  : cloudStatus === 'synced'
                  ? (lang === 'fa' ? '✓ همگام با دیتابیس ابری نئون' : '✓ Synced with Neon DB')
                  : (lang === 'fa' ? 'ذخیره در پایگاه داده ابری نئون' : 'Save to Neon Cloud DB')}
              </span>
            </button>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[#b3432f] hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{lang === 'fa' ? 'پاک کردن کل کتاب کار' : 'Clear all'}</span>
          </button>
        </div>

        {/* Footer with OWJ Council & PMI Copyright */}
        <Footer lang={lang} />

        {/* Google OAuth & User Authentication Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          lang={lang}
          currentUser={currentUser}
          onLoginSuccess={(user) => {
            setCurrentUser(user);
            showToast(
              lang === 'fa'
                ? `خوش آمدید، ${user.displayName || user.email}`
                : `Welcome, ${user.displayName || user.email}`
            );
          }}
          onLogout={handleLogout}
        />

        {/* Mandatory Post-Registration Onboarding Modal */}
        {currentUser && !currentUser.isOnboarded && (
          <OnboardingModal
            isOpen={true}
            currentUser={currentUser}
            onComplete={handleOnboardingComplete}
            onLogout={handleLogout}
            lang={lang}
          />
        )}

        {/* Class Leaderboard Modal */}
        <ClassLeaderboardModal
          isOpen={isLeaderboardModalOpen}
          onClose={() => setIsLeaderboardModalOpen(false)}
          currentUser={currentUser}
          lang={lang}
        />

        {/* Admin Control Center Modal (Admin Only) */}
        {isUserAdmin(currentUser) && isAdminModalOpen && (
          <AdminControlCenterModal
            isOpen={isAdminModalOpen}
            onClose={() => setIsAdminModalOpen(false)}
            currentUser={currentUser}
            lang={lang}
          />
        )}

        {/* LLM For Humans Book Modal */}
        <LlmForHumansBookModal
          isOpen={isBookModalOpen}
          onClose={() => setIsBookModalOpen(false)}
        />

        {/* Industry Track Selector Modal */}
        <IndustryTrackSelectorModal
          isOpen={isIndustryModalOpen}
          onClose={() => setIsIndustryModalOpen(false)}
          currentTrack={industryTrack}
          onSelectTrack={handleSelectIndustryTrack}
        />

        {/* Discipline & Role Selector Modal */}
        <DisciplineSelectorModal
          isOpen={isDisciplineModalOpen}
          onClose={() => setIsDisciplineModalOpen(false)}
          currentTrack={industryTrack}
          currentDiscipline={activeDiscipline}
          currentRole={activeRole}
          onSelectDiscipline={handleSelectDiscipline}
          onSelectRole={handleSelectRole}
          lang={lang}
        />
        </main>
      </div>
    </div>
  );
}
