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
  getSavedIndustryTrack,
  saveIndustryTrack,
  INDUSTRY_TRACKS
} from './types/industryTrack';
import { IndustryTrackSwitcher } from './components/industry/IndustryTrackSwitcher';
import { IndustryTrackSelectorModal } from './components/industry/IndustryTrackSelectorModal';
import { authApi, isAuthorizedAdminUser } from './services/authApi';
import { lmsApi } from './services/lmsApi';
import { UserProfile } from './types/auth';
import { SessionLockEntity } from './types/lms';
import { Footer } from './components/Footer';
import { OWJ_LOGO, OWJ_LOGO_FALLBACK } from './data/logo';
import { Clock, Moon, Sun, Globe, Copy, Printer, RotateCcw, Check, BookOpen, Layers, Award, DollarSign, TrendingUp, Brain, Cpu, Boxes, Split, Target, Gauge, ShieldCheck, Network, Workflow, Calendar, HardDrive, Cloud, Calculator, Bot, Server, Sparkles, Trophy, Lock, Unlock, GraduationCap } from 'lucide-react';

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
  const [page, setPage] = useState<AppPage>('landing');
  const [lang, setLang] = useState<Language>('fa');
  const [theme, setTheme] = useState<Theme>('light');
  // AJA Cinematic Brand Intro (Unseen Studio Inspired Experience)
  const [showBrandIntro, setShowBrandIntro] = useState<boolean>(true);

  // Google OAuth / GIS Authentication State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // LMS & Cohort State
  const [sessionLocks, setSessionLocks] = useState<SessionLockEntity[]>([]);
  const [isLeaderboardModalOpen, setIsLeaderboardModalOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState<boolean>(false);

  // Industry Track State (Civil & Infrastructure vs Oil, Gas & Petrochemicals)
  const [industryTrack, setIndustryTrack] = useState<IndustryTrackId>(() => getSavedIndustryTrack());
  const [isIndustryModalOpen, setIsIndustryModalOpen] = useState<boolean>(false);

  const handleSelectIndustryTrack = (track: IndustryTrackId) => {
    setIndustryTrack(track);
    saveIndustryTrack(track);
    showToast(
      lang === 'fa'
        ? `حوزه تخصصی به «${INDUSTRY_TRACKS[track].shortTitleFa}» تغییر یافت.`
        : `Industry track switched to "${INDUSTRY_TRACKS[track].shortTitleEn}".`
    );
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

  // Enforce authentication: All platform features require login
  useEffect(() => {
    if (!currentUser && page !== 'landing') {
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
      ? 'ع©طھط§ط¨ ع©ط§ط± CPMAI آ· ظپط§ط² ط§ظˆظ„ (ط¯ط±ع© ع©ط³ط¨â€Œظˆع©ط§ط±) | ظ…ط´ط§ظˆط±ط§ظ† ظ…ط¯غŒط±غŒطھ ع©ط³ط¨ ظˆ ع©ط§ط± ط§ظˆط¬'
      : 'CPMAI Workbook آ· Phase I: Business Understanding | OWJ Business Council';
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
        ? (lang === 'fa' ? 'ظ…ظ‚ط¯ظ…ط§طھغŒ' : 'Beginner')
        : updatedUser.aiLevel === 'intermediate'
        ? (lang === 'fa' ? 'ظ…طھظˆط³ط·' : 'Intermediate')
        : (lang === 'fa' ? 'ظ¾غŒط´ط±ظپطھظ‡' : 'Advanced');

    showToast(
      lang === 'fa'
        ? `ط§ط·ظ„ط§ط¹ط§طھ ط¨ط§ ظ…ظˆظپظ‚غŒطھ ط«ط¨طھ ط´ط¯. ط¢ط²ظ…ظˆظ† ط³ط·ط­â€Œط³ظ†ط¬غŒ ظ…طھظ†ط§ط³ط¨ ط¨ط§ ط³ط·ط­ ${levelName} ط¨ط±ط§غŒ ط´ظ…ط§ ط¢ظ…ط§ط¯ظ‡ ط§ط³طھ.`
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
        ? 'ط¨ط§ ظ…ظˆظپظ‚غŒطھ ط§ط² ط­ط³ط§ط¨ ط®ظˆط¯ ط®ط§ط±ط¬ ط´ط¯غŒط¯.'
        : 'Signed out successfully.'
    );
  };

  const handleCopyAll = () => {
    let fullText = lang === 'fa'
      ? `=== ع©طھط§ط¨ ع©ط§ط± CPMAI: ظپط§ط² ط§ظˆظ„ ط¯ط±ع© ع©ط³ط¨â€Œظˆع©ط§ط± ===\nظ…ط´ط§ظˆط±ط§ظ† ظ…ط¯غŒط±غŒطھ ع©ط³ط¨ ظˆ ع©ط§ط± ط§ظˆط¬ (owjbc.com)\n\n`
      : `=== CPMAI Workbook: Phase I Business Understanding ===\nOWJ Business Council (owjbc.com)\n\n`;

    // Page 0
    if (page0Content.trim()) {
      fullText += lang === 'fa'
        ? `--- طµظپط­ظ‡ غ°: ظ¾غŒط´â€Œظ†ظˆغŒط³ ع©ط§ط±ع¯ط§ظ‡ ظ¾ط±ط§ظ…ظ¾طھ LLM ---\n${page0Content}\n\n`
        : `--- Page 0: LLM Prompt Sandbox Draft ---\n${page0Content}\n\n`;
    }

    // Page 1
    fullText += lang === 'fa' ? `--- طµظپط­ظ‡ غ±: ط§ظ‡ط¯ط§ظپ ع©ط³ط¨â€Œظˆع©ط§ط± ---\n` : `--- Page 1: Determine Business Objectives ---\n`;
    fullText += `${lang === 'fa' ? 'ط¯ط§ط³طھط§ظ† ع©ط§ط±ط¨ط± ط§ط³ظ¾ط±غŒظ†طھ:' : 'Sprint User Story:'} ${story || 'N/A'}\n\n`;
    fullText += `${lang === 'fa' ? 'ظ¾ط³â€Œط²ظ…غŒظ†ظ‡ ع©ط³ط¨â€Œظˆع©ط§ط±:' : 'Background:'}\n${bg || 'N/A'}\n\n`;
    fullText += `${lang === 'fa' ? 'ظ‡ط¯ظپ ط§طµظ„غŒ ع©ط³ط¨â€Œظˆع©ط§ط±:' : 'Primary Business Objective:'}\n${obj || 'N/A'}\n\n`;
    fullText += `${lang === 'fa' ? 'ظ¾ط±ط³ط´â€Œظ‡ط§غŒ ع©ط³ط¨â€Œظˆع©ط§ط±غŒ ظ…ط±طھط¨ط·:' : 'Related Business Questions:'}\n`;
    if (qs.length > 0) {
      qs.forEach((q, i) => {
        fullText += `  ${i + 1}. ${q}\n`;
      });
    } else {
      fullText += `  (ظ…ظˆط±ط¯غŒ ط«ط¨طھ ظ†ط´ط¯ظ‡ ط§ط³طھ)\n`;
    }

    // Page 2
    fullText += `\n` + (lang === 'fa'
      ? `--- طµظپط­ظ‡ غ²: ط­ظ„ ع†ظ‡ ظ…ط³ط¦ظ„ظ‡â€Œط§غŒ ط¨ط§ ظ‡ظˆط´ ظ…طµظ†ظˆط¹غŒ ط¯ط± ط§غŒظ† طھع©ط±ط§ط±طں ---\nWhat problem are you solving with AI in this iteration?\n\n`
      : `--- Page 2: What problem are you solving with AI in this iteration? ---\n\n`);
    fullText += (page2Content || '(ظ…ط­طھظˆط§غŒغŒ ط¯ط± ط¨ظˆظ… ط«ط¨طھ ظ†ط´ط¯ظ‡ ط§ط³طھ / No content entered)') + `\n\n`;

    // Page 3
    fullText += lang === 'fa'
      ? `--- طµظپط­ظ‡ غ³: ظ…ط¹غŒط§ط±ظ‡ط§غŒ ظ…ظˆظپظ‚غŒطھ ع©ط³ط¨â€Œظˆع©ط§ط± ط¯ط± ط§غŒظ† طھع©ط±ط§ط± ---\nWhat are the objective measures of success for this project iteration?\n\n`
      : `--- Page 3: Determine Business Success Criteria ---\nWhat are the objective measures of success for this project iteration?\n\n`;
    fullText += (page3Content || '(ظ…ط­طھظˆط§غŒغŒ ط¯ط± ط¨ظˆظ… ط«ط¨طھ ظ†ط´ط¯ظ‡ ط§ط³طھ / No content entered)') + `\n\n`;

    // Page 4
    fullText += lang === 'fa'
      ? `--- طµظپط­ظ‡ غ´: طھط­ظ„غŒظ„ ظ‡ط²غŒظ†ظ‡-ظپط§غŒط¯ظ‡ ظˆ ط¨ظˆط¯ط¬ظ‡ (ط§ط³ظ„ط§غŒط¯ غ±غ´) ---\nSubtask: Cost-Benefit Analysis\nWhat is the cost and time budget for this project?\n\n`
      : `--- Page 4: Subtask: Cost-Benefit Analysis (Slide 14) ---\nWhat is the cost and time budget for this project?\n\n`;
    fullText += (page4Content || '(ظ…ط­طھظˆط§غŒغŒ ط¯ط± ط¨ظˆظ… ط«ط¨طھ ظ†ط´ط¯ظ‡ ط§ط³طھ / No content entered)') + `\n\n`;

    // Page 5
    fullText += lang === 'fa'
      ? `--- طµظپط­ظ‡ غµ: ط¨ط±ط¢ظˆط±ط¯ ظ†ط±ط® ط¨ط§ط²ع¯ط´طھ ط³ط±ظ…ط§غŒظ‡ (ROI) ظ¾ط±ظˆعکظ‡ (ط§ط³ظ„ط§غŒط¯ غ±غµ) ---\nWhat is the expected ROI for this project?\n\n`
      : `--- Page 5: Expected ROI for this project (Slide 15) ---\nWhat is the expected ROI for this project?\n\n`;
    fullText += (page5Content || '(ظ…ط­طھظˆط§غŒغŒ ط¯ط± ط¨ظˆظ… ط«ط¨طھ ظ†ط´ط¯ظ‡ ط§ط³طھ / No content entered)') + `\n\n`;

    // Page 6
    fullText += lang === 'fa'
      ? `--- طµظپط­ظ‡ غ¶: ط§ظ„ط²ط§ظ…ط§طھ ظ¾ط±ظˆعکظ‡â€Œظ‡ط§غŒ ط´ظ†ط§ط®طھغŒ ظˆ ط®ط· ظ…ط¨ظ†ط§غŒ ط§ع©طھط´ط§ظپغŒ (ط§ط³ظ„ط§غŒط¯ غ±غ¶) ---\nTask Group: Cognitive Project Requirements / Task: Cognitive Requirements\n\n`
      : `--- Page 6: Task Group: Cognitive Project Requirements / Task: Cognitive Requirements (Slide 16) ---\n\n`;
    fullText += (page6Content || '(ظ…ط­طھظˆط§غŒغŒ ط¯ط± ط¨ظˆظ… ط«ط¨طھ ظ†ط´ط¯ظ‡ ط§ط³طھ / No content entered)') + `\n\n`;

    // Page 7
    fullText += lang === 'fa'
      ? `--- طµظپط­ظ‡ غ·: ع†ط±ط§ ط¨ط±ط§غŒ ط§غŒظ† ظ¾ط±ظˆعکظ‡ ط¨ظ‡ غŒع© ط±ط§ظ‡â€Œط­ظ„ ظ‡ظˆط´ ظ…طµظ†ظˆط¹غŒ ظ†غŒط§ط² ط§ط³طھطں (ط§ط³ظ„ط§غŒط¯ غ±غ·) ---\nWhy is an AI solution needed for this project?\n\n`
      : `--- Page 7: Why is an AI solution needed for this project? (Slide 17) ---\n\n`;
    fullText += (page7Content || '(ظ…ط­طھظˆط§غŒغŒ ط¯ط± ط¨ظˆظ… ط«ط¨طھ ظ†ط´ط¯ظ‡ ط§ط³طھ / No content entered)') + `\n\n`;

    // Page 8
    fullText += lang === 'fa'
      ? `--- طµظپط­ظ‡ غ¸: ظ…ط¤ظ„ظپظ‡â€Œظ‡ط§غŒ ط؛غŒط±ط´ظ†ط§ط®طھغŒ ظˆ ط¬ط§غŒع¯ط²غŒظ†â€Œظ‡ط§غŒ ط§طھظˆظ…ط§ط³غŒظˆظ† (ط§ط³ظ„ط§غŒط¯ غ±غ¸) ---\nTask: Cognitive Requirements\nظ¾ط±ط³ط´ غ±: What are the noncognitive (non-AI) portions of this project that will be used in conjunction with the cognitive components?\nظ¾ط±ط³ط´ غ²: Are non-cognitive automation alternatives possible for this iteration? If so, why are they not being used for this project iteration?\n\n`
      : `--- Page 8: Noncognitive Portions & Automation Alternatives (Slide 18) ---\nTask: Cognitive Requirements\nQuestion 1: What are the noncognitive (non-AI) portions of this project that will be used in conjunction with the cognitive components?\nQuestion 2: Are non-cognitive automation alternatives possible for this iteration? If so, why are they not being used for this project iteration?\n\n`;
    fullText += (page8Content || '(ظ…ط­طھظˆط§غŒغŒ ط¯ط± ط¨ظˆظ… ط«ط¨طھ ظ†ط´ط¯ظ‡ ط§ط³طھ / No content entered)') + `\n\n`;

    // Page 9
    fullText += lang === 'fa'
      ? `--- طµظپط­ظ‡ غ¹: ط§ظ‡ط¯ط§ظپ ط´ظ†ط§ط®طھغŒ ظ¾ط±ظˆعکظ‡ (ط§ط³ظ„ط§غŒط¯ غ±غ¹) ---\nTask Group: Cognitive Project Requirements\nTask: Cognitive Requirements\nCognitive objectives: Enumerate the specific objectives\n\n`
      : `--- Page 9: Cognitive Objectives (Slide 19) ---\nTask Group: Cognitive Project Requirements\nTask: Cognitive Requirements\nCognitive objectives: Enumerate the specific objectives\n\n`;
    fullText += (page9Content || '(ظ…ط­طھظˆط§غŒغŒ ط¯ط± ط¨ظˆظ… ط«ط¨طھ ظ†ط´ط¯ظ‡ ط§ط³طھ / No content entered)') + `\n\n`;

    // Page 10
    fullText += lang === 'fa'
      ? `--- طµظپط­ظ‡ غ±غ°: ظ†طھط§غŒط¬ ظˆ ط¯ط³طھط§ظˆط±ط¯ظ‡ط§غŒ ط´ظ†ط§ط®طھغŒ (ط§ط³ظ„ط§غŒط¯ غ²غ°) ---\nTask Group: Cognitive Project Requirements\nTask: Cognitive Requirements\nCognitive outcomes: Detail specific outcomes, criteria & subjective judgments\n\n`
      : `--- Page 10: Cognitive Outcomes (Slide 20) ---\nTask Group: Cognitive Project Requirements\nTask: Cognitive Requirements\nCognitive outcomes: Detail specific outcomes, criteria & subjective judgments\n\n`;
    fullText += (page10Content || '(ظ…ط­طھظˆط§غŒغŒ ط¯ط± ط¨ظˆظ… ط«ط¨طھ ظ†ط´ط¯ظ‡ ط§ط³طھ / No content entered)') + '\n\n';

    // Page 11
    fullText += lang === 'fa'
      ? `--- طµظپط­ظ‡ غ±غ±: ظ…ط¹غŒط§ط±ظ‡ط§غŒ ظ…ظˆظپظ‚غŒطھ ظ‡ظˆط´ ظ…طµظ†ظˆط¹غŒ (ط§ط³ظ„ط§غŒط¯ غ²غ±) ---\nTask Group: Cognitive Project Requirements\nTask: Cognitive Requirements / AI Success Criteria\nAI success criteria: Criteria for success, unique capabilities, superiority dimensions & satisfying skeptics\n\n`
      : `--- Page 11: AI Success Criteria (Slide 21) ---\nTask Group: Cognitive Project Requirements\nTask: Cognitive Requirements / AI Success Criteria\nAI success criteria: Criteria for success, unique capabilities, superiority dimensions & satisfying skeptics\n\n`;
    fullText += (page11Content || '(ظ…ط­طھظˆط§غŒغŒ ط¯ط± ط¨ظˆظ… ط«ط¨طھ ظ†ط´ط¯ظ‡ ط§ط³طھ / No content entered)') + '\n\n';

    // Page 12
    fullText += lang === 'fa'
      ? `--- طµظپط­ظ‡ غ±غ²: ط§ظ„ع¯ظˆظ‡ط§غŒ ظ‡ظˆط´ ظ…طµظ†ظˆط¹غŒ (ط§ط³ظ„ط§غŒط¯ غ²غ²) ---\nTask Group: Cognitive Project Requirements\nTask: Cognitive Requirements / AI Patterns (Figure 2: The Seven Patterns of AI)\nAI Patterns: Which patterns used, determination rationale & similar leverageable assets\n\n`
      : `--- Page 12: AI Patterns (Slide 22) ---\nTask Group: Cognitive Project Requirements\nTask: Cognitive Requirements / AI Patterns (Figure 2: The Seven Patterns of AI)\nAI Patterns: Which patterns used, determination rationale & similar leverageable assets\n\n`;
    fullText += (page12Content || '(ظ…ط­طھظˆط§غŒغŒ ط¯ط± ط¨ظˆظ… ط«ط¨طھ ظ†ط´ط¯ظ‡ ط§ط³طھ / No content entered)') + '\n\n';

    // Page 13
    fullText += lang === 'fa'
      ? `--- طµظپط­ظ‡ غ±غ³: طھط¹غŒغŒظ† ط§ظ„ع¯ظˆظ‡ط§غŒ ظ¾ط±ظˆعکظ‡ (ط§ط³ظ„ط§غŒط¯ غ²غ³) ---\nTask Group: Cognitive Project Requirements\nTask: Cognitive Requirements / Which patterns are being used in this project?\nAI Patterns Breakdown: Primary & secondary patterns, pipeline synergy, scope elimination & toolkits\n\n`
      : `--- Page 13: Which Patterns are Being Used (Slide 23) ---\nTask Group: Cognitive Project Requirements\nTask: Cognitive Requirements / Which patterns are being used in this project?\nAI Patterns Breakdown: Primary & secondary patterns, pipeline synergy, scope elimination & toolkits\n\n`;
    fullText += (page13Content || '(ظ…ط­طھظˆط§غŒغŒ ط¯ط± ط¨ظˆظ… ط«ط¨طھ ظ†ط´ط¯ظ‡ ط§ط³طھ / No content entered)') + '\n\n';

    // Page 14
    fullText += lang === 'fa'
      ? `--- طµظپط­ظ‡ غ±غ´: ط§ط±ط²غŒط§ط¨غŒ ظˆط¶ط¹غŒطھ â€” ظ†غŒط§ط²ظ…ظ†ط¯غŒâ€Œظ‡ط§غŒ ظ…ظ†ط§ط¨ط¹ ظˆ ط²ظ…ط§ظ†â€Œط¨ظ†ط¯غŒ (ط§ط³ظ„ط§غŒط¯ غ²غ´) ---\nTask Group: Assess Situation\nTask: Resource Requirements & Task: Schedule Requirements\nResources: Personnel/Skills, Compute/GPU hardware, Software/Data stack, Budget\nSchedule: Agile sprint cadence, CPMAI 6-phase stage-gates, Hard deadlines, Critical path dependencies\n\n`
      : `--- Page 14: Assess Situation â€” Resource & Schedule Requirements (Slide 24) ---\nTask Group: Assess Situation\nTask: Resource Requirements & Task: Schedule Requirements\nResources: Personnel/Skills, Compute/GPU hardware, Software/Data stack, Budget\nSchedule: Agile sprint cadence, CPMAI 6-phase stage-gates, Hard deadlines, Critical path dependencies\n\n`;
    fullText += (page14Content || '(ظ…ط­طھظˆط§غŒغŒ ط¯ط± ط¨ظˆظ… ط«ط¨طھ ظ†ط´ط¯ظ‡ ط§ط³طھ / No content entered)') + '\n\n';

    // Page 15
    fullText += lang === 'fa'
      ? `--- طµظپط­ظ‡ غ±غµ: ط³غŒط§ظ‡ظ‡ ظ…ظ†ط§ط¨ط¹ ظپظ†ط§ظˆط±غŒ ظˆ ظ…ظ‡ط§ط±طھâ€Œظ‡ط§غŒ ظ…ظˆط±ط¯ ظ†غŒط§ط² (ط§ط³ظ„ط§غŒط¯ غ²غµ) ---\nTask Group: Assess Situation\nTask: Resource Requirements â€” Technology Resources & Skills Inventory\nTechnology: Hardware, AI/NLP Frameworks, Cloud Hosting, APIs & CI/CD\nSkills: Core ML/NLP, Solutions Architecture, Domain SME, Agile PM, Skill Gaps\n\n`
      : `--- Page 15: Technology Resources & Skills Inventory (Slide 25) ---\nTask Group: Assess Situation\nTask: Resource Requirements â€” Technology Resources & Skills Inventory\nTechnology: Hardware, AI/NLP Frameworks, Cloud Hosting, APIs & CI/CD\nSkills: Core ML/NLP, Solutions Architecture, Domain SME, Agile PM, Skill Gaps\n\n`;
    fullText += page15Content || '(ظ…ط­طھظˆط§غŒغŒ ط¯ط± ط¨ظˆظ… ط«ط¨طھ ظ†ط´ط¯ظ‡ ط§ط³طھ / No content entered)';

    // Page 16
    fullText += '\n\n' + (lang === 'fa'
      ? `--- طµظپط­ظ‡ غ±غ¶: ط§ظ„ط²ط§ظ…ط§طھ ط²ظ…ط§ظ†â€Œط¨ظ†ط¯غŒ ظˆ ظˆط§ط¨ط³طھع¯غŒâ€Œظ‡ط§غŒ ظ¾ط±ظˆعکظ‡ (ط§ط³ظ„ط§غŒط¯ غ²غ¶) ---\nTask Group: Assess Situation\nTask: Schedule Requirements\nSchedule: 4-Month MVP, 2-to-4-week agile sprints, pilot testing\nConstraints: Budget < $1M, API dependencies, CCPA data permissions\n\n`
      : `--- Page 16: Task: Schedule Requirements (Slide 26) ---\nTask Group: Assess Situation\nTask: Schedule Requirements\nSchedule: 4-Month MVP, 2-to-4-week agile sprints, pilot testing\nConstraints: Budget < $1M, API dependencies, CCPA data permissions\n\n`);
    fullText += page16Content || '(ظ…ط­طھظˆط§غŒغŒ ط¯ط± ط¨ظˆظ… ط«ط¨طھ ظ†ط´ط¯ظ‡ ط§ط³طھ / No content entered)';

    // Page 17
    fullText += '\n\n' + (lang === 'fa'
      ? `--- طµظپط­ظ‡ غ±غ·: ظ…ط­ط¯ظˆط¯غŒطھâ€Œظ‡ط§غŒ طھع©ظ…غŒظ„غŒ ظˆ ظ…ظ‚ط§ط¯غŒط± ط¹ظ…ظ„ع©ط±ط¯ ظ…ط¯ظ„ (ط§ط³ظ„ط§غŒط¯ غ²غ·) ---\nTask Group: AI System Performance and Operation\nTask: Acceptable Model Performance Values\nConstraints: Budget limits, data volume/noise, legacy API rate limits, CCPA privacy, seasonal peak freeze\nPerformance: Probabilistic error awareness & baseline thresholds\n\n`
      : `--- Page 17: Project Constraints & Model Performance Values (Slide 27) ---\nTask Group: AI System Performance and Operation\nTask: Acceptable Model Performance Values\nConstraints: Budget limits, data volume/noise, legacy API rate limits, CCPA privacy, seasonal peak freeze\nPerformance: Probabilistic error awareness & baseline thresholds\n\n`);
    fullText += page17Content || '(ظ…ط­طھظˆط§غŒغŒ ط¯ط± ط¨ظˆظ… ط«ط¨طھ ظ†ط´ط¯ظ‡ ط§ط³طھ / No content entered)';

    // Page 18
    fullText += '\n\n' + (lang === 'fa'
      ? `--- طµظپط­ظ‡ غ±غ¸: ظ…ط§طھط±غŒط³ ط¯ط±ظ‡ظ…â€Œط±غŒط®طھع¯غŒ ظˆ ظ…ظ‚ط§ط¯غŒط± ظ‚ط§ط¨ظ„ ظ‚ط¨ظˆظ„ ط¹ظ…ظ„ع©ط±ط¯ ظ…ط¯ظ„ (ط§ط³ظ„ط§غŒط¯ غ²غ¸) ---\nTask Group: AI System Performance and Operation\nTask: Acceptable Model Performance Values (Figure 3 Confusion Matrix)\nArtifacts: Accuracy, Precision, Recall, F1 Score, Max False Positive Rate\n\n`
      : `--- Page 18: Confusion Matrix & Model Performance Values (Slide 28) ---\nTask Group: AI System Performance and Operation\nTask: Acceptable Model Performance Values (Figure 3 Confusion Matrix)\nArtifacts: Accuracy, Precision, Recall, F1 Score, Max False Positive Rate\n\n`);
    fullText += page18Content || '(ظ…ط­طھظˆط§غŒغŒ ط¯ط± ط¨ظˆظ… ط«ط¨طھ ظ†ط´ط¯ظ‡ ط§ط³طھ / No content entered)';

    // Page 19
    fullText += '\n\n' + (lang === 'fa'
      ? `--- طµظپط­ظ‡ غ±غ¹: ط³ظ†ط¬ظ‡â€Œظ‡ط§غŒ ظ…ط·ظ„ظˆط¨ ط¹ظ…ظ„ع©ط±ط¯ ظˆ ط­ط³ط§ط³غŒطھâ€Œظ‡ط§ (ط§ط³ظ„ط§غŒط¯ غ²غ¹) ---\nTask Group: AI System Performance and Operation\nTask: Acceptable Model Performance Values (Slide 29)\nArtifact: Maximum Acceptable False Negative Rate (FNR)\nQ1: Desired / Required Performance Metrics\nQ2: Sensitivities to False Positives/Negatives & GenAI Inaccuracies\n\n`
      : `--- Page 19: Desired Performance Metrics & Sensitivities (Slide 29) ---\nTask Group: AI System Performance and Operation\nTask: Acceptable Model Performance Values (Slide 29)\nArtifact: Maximum Acceptable False Negative Rate (FNR)\nQ1: Desired / Required Performance Metrics\nQ2: Sensitivities to False Positives/Negatives & GenAI Inaccuracies\n\n`);
    fullText += page19Content || '(ظ…ط­طھظˆط§غŒغŒ ط¯ط± ط¨ظˆظ… ط«ط¨طھ ظ†ط´ط¯ظ‡ ط§ط³طھ / No content entered)';

    // Page 20
    fullText += '\n\n' + (lang === 'fa'
      ? `--- طµظپط­ظ‡ غ²غ°: ظ…ظ‚ط§ط¯غŒط± ظ‚ط§ط¨ظ„ ظ‚ط¨ظˆظ„ ط³ظ†ط¬ظ‡â€Œظ‡ط§غŒ ع©ظ„غŒط¯غŒ ط¹ظ…ظ„ع©ط±ط¯ ع©ط³ط¨â€Œظˆع©ط§ط± (ط§ط³ظ„ط§غŒط¯ غ³غ°) ---\nTask Group: AI System Performance and Operation\nTask: Acceptable KPI Performance Values (Slide 30)\nArtifacts: Required Business KPIs (Efficiency, CSAT, Error Reduction, Revenue)\nFinancial ROI & Cost Savings Estimation\n\n`
      : `--- Page 20: Acceptable Business KPI Performance Values (Slide 30) ---\nTask Group: AI System Performance and Operation\nTask: Acceptable KPI Performance Values (Slide 30)\nArtifacts: Required Business KPIs (Efficiency, CSAT, Error Reduction, Revenue)\nFinancial ROI & Cost Savings Estimation\n\n`);
    fullText += page20Content || '(ظ…ط­طھظˆط§غŒغŒ ط¯ط± ط¨ظˆظ… ط«ط¨طھ ظ†ط´ط¯ظ‡ ط§ط³طھ / No content entered)';

    // Page 21
    fullText += '\n\n' + (lang === 'fa'
      ? `--- طµظپط­ظ‡ غ²غ±: ط³ظ†ط¬ظ‡â€Œظ‡ط§غŒ ع©ظ„غŒط¯غŒ ط¹ظ…ظ„ع©ط±ط¯ ظپظ†ط§ظˆط±غŒ (ط§ط³ظ„ط§غŒط¯ غ³غ±) ---\nTask Group: AI System Performance and Operation\nTask: Acceptable KPI Performance Values â€” Required Technology KPIs (Slide 31)\nArtifacts: Latency SLAs, Cloud FinOps, Throughput, Error Rates, High Availability\n\n`
      : `--- Page 21: Required Technology KPIs (Slide 31) ---\nTask Group: AI System Performance and Operation\nTask: Acceptable KPI Performance Values â€” Required Technology KPIs (Slide 31)\nArtifacts: Latency SLAs, Cloud FinOps, Throughput, Error Rates, High Availability\n\n`);
    fullText += page21Content || '(ظ…ط­طھظˆط§غŒغŒ ط¯ط± ط¨ظˆظ… ط«ط¨طھ ظ†ط´ط¯ظ‡ ط§ط³طھ / No content entered)';

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullText).then(() => {
        showToast(lang === 'fa' ? 'ظ¾ط§ط³ط®â€Œظ‡ط§غŒ ظ‡ط± غ²غ± طµظپط­ظ‡ ع©ظ¾غŒ ط´ط¯!' : 'Workbook answers for all 21 pages copied!');
      });
    }
  };

  const handleReset = () => {
    const confirmMsg = lang === 'fa'
      ? 'ط¢غŒط§ ط§ط² ظ¾ط§ع© ع©ط±ط¯ظ† طھظ…ط§ظ… ظ¾ط§ط³ط®â€Œظ‡ط§غŒ ظˆط§ط±ط¯ط´ط¯ظ‡ ط¯ط± ع©طھط§ط¨ ع©ط§ط± ط§ط·ظ…غŒظ†ط§ظ† ط¯ط§ط±غŒط¯طں'
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
    showToast(lang === 'fa' ? 'طھظ…ط§ظ… ظ¾ط§ط³ط®â€Œظ‡ط§ ظ¾ط§ع© ط´ط¯ظ†ط¯' : 'Workbook reset');
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
        showToast(lang === 'fa' ? 'âœ“ ط§ط·ظ„ط§ط¹ط§طھ ط¨ط§ ظ¾ط§غŒع¯ط§ظ‡ ط¯ط§ط¯ظ‡ Neon ظ‡ظ…ع¯ط§ظ…â€Œط³ط§ط²غŒ ط´ط¯.' : 'âœ“ Synced with Neon PostgreSQL cloud database.');
      } else {
        setCloudStatus('error');
        showToast(lang === 'fa' ? 'ط®ط·ط§ ط¯ط± ط§ط±طھط¨ط§ط· ط¨ط§ ط³ط±ظˆط± ط§ط¨ط±غŒ' : 'Failed to sync with cloud database');
      }
    } catch {
      setCloudStatus('error');
      showToast(lang === 'fa' ? 'ط®ط·ط§ ط¯ط± ط§طھطµط§ظ„ ط¨ظ‡ ط§غŒظ†طھط±ظ†طھ غŒط§ ظ¾ط§غŒع¯ط§ظ‡ ط¯ط§ط¯ظ‡' : 'Network/database connection error');
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
                ? `ط®ظˆط´ ط¢ظ…ط¯غŒط¯طŒ ${user.displayName || user.email}`
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
      </>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-[#f5f5f2] dark:bg-[#0f1418] text-[#1c2830] dark:text-[#e8ebe9] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(31,81,99,0.08),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(111,179,198,0.06),rgba(0,0,0,0))] transition-colors flex flex-col selection:bg-[#1f5163]/20 selection:text-[#1f5163] dark:selection:bg-[#6fb3c6]/20 dark:selection:text-[#6fb3c6]">
      {/* OWJ Content Protection Shield (Anti-Copy, Anti-Print, Anti-Snipping with Smart Prompt Whitelist) */}
      <ContentProtectionShield lang={lang} isAdmin={isUserAdmin(currentUser)} />

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 w-full bg-[#ffffff]/90 dark:bg-[#161e24]/90 backdrop-blur-xl border-b border-[#d9dad5]/80 dark:border-[#26333c]/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="w-full max-w-[1700px] mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-3 sm:gap-4">
          {/* Brand & Organization */}
          <a
            href="https://owjbc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 group shrink-0 select-none cursor-pointer"
          >
            <div className="bg-[#ffffff] p-1.5 rounded-xl border border-black/[0.08] dark:border-white/[0.12] shadow-[0_2px_8px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.03] group-hover:scale-105 group-hover:shadow-md transition-all duration-200 shrink-0 flex items-center justify-center">
              <img
                src={OWJ_LOGO}
                alt="OWJ Business Council"
                className="h-8 w-auto min-w-[50px] max-w-[90px] object-contain shrink-0"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = OWJ_LOGO_FALLBACK;
                }}
              />
            </div>
            <div className="flex flex-col shrink-0 min-w-max">
              <span className="font-extrabold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9] group-hover:text-[#1f5163] dark:group-hover:text-[#6fb3c6] transition-colors whitespace-nowrap">
                {lang === 'fa' ? 'کتاب کار CPMAI' : 'CPMAI Workbook'}
              </span>
              <span className="text-[10px] text-[#5d6b73] dark:text-[#9aa8b0] whitespace-nowrap">
                {lang === 'fa' ? 'مشاوران مدیریت کسب و کار اوج' : 'OWJ Business Council'}
              </span>
            </div>
          </a>

          {/* Industry Track Switcher in Workspace Header */}
          <IndustryTrackSwitcher
            currentTrack={industryTrack}
            onSelectTrack={handleSelectIndustryTrack}
            onOpenSelectorModal={() => setIsIndustryModalOpen(true)}
            className="shrink-0 hidden lg:inline-flex"
          />

          {/* Page Navigation Segmented Control */}
          <div className="flex-1 min-w-0 flex items-center p-1.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] shadow-inner overflow-x-auto gap-1">
            {/* Landing Page Gateway */}
            <button
              onClick={() => {
                setPage('landing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 active:scale-[0.96] shrink-0 border bg-[#2563EB]/10 dark:bg-[#2563EB]/15 text-[#2563EB] dark:text-[#60A5FA] border-[#2563EB]/30 hover:bg-[#2563EB]/20 cursor-pointer"
              title={lang === 'fa' ? 'ط¨ط§ط²ع¯ط´طھ ط¨ظ‡ طµظپط­ظ‡ ظ…ط¹ط±ظپغŒ ظˆ ظ„ظ†ط¯غŒظ†ع¯' : 'Return to Agentify Landing Page'}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'طµظپط­ظ‡ ظ„ظ†ط¯غŒظ†ع¯' : 'Landing'}</span>
            </button>

            {/* LLM For Humans Book Modal Trigger */}
            <button
              onClick={() => setIsBookModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 active:scale-[0.96] shrink-0 border bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20 cursor-pointer shadow-xs"
              title={lang === 'fa' ? 'کتابچه جامع: مدل‌هاي زباني بزرگ (LLM) به زبان آدميزاد' : 'LLMs for Humans Executive Digest'}
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{lang === 'fa' ? '?? کتابچه LLM به زبان آدميزاد' : '?? LLMs for Humans'}</span>
            </button>

            {/* Entry Assessment: Readiness Placement Quiz */}
            <button
              onClick={() => {
                setPage('quiz');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 active:scale-[0.96] shrink-0 border ${
                page === 'quiz'
                  ? 'bg-gradient-to-r from-[#2f7d5b] to-[#1f5163] text-white border-transparent shadow-xs ring-2 ring-[#2f7d5b]/30'
                  : 'bg-[#2f7d5b]/10 dark:bg-[#2f7d5b]/15 text-[#2f7d5b] dark:text-[#52b788] border-[#2f7d5b]/30 hover:bg-[#2f7d5b]/20'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'ًںژ¯ ط¢ط²ظ…ظˆظ† ط³ط·ط­â€Œط³ظ†ط¬غŒ (ظˆط±ظˆط¯)' : 'ًںژ¯ Readiness Quiz'}</span>
            </button>

            {/* Page 0: LLM Fundamentals & Prompting Toolkit */}
            <button
              onClick={() => {
                setPage(0);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 active:scale-[0.96] shrink-0 ${
                page === 0
                  ? 'bg-gradient-to-r from-[#1f5163] to-[#0f4c5c] text-white shadow-xs'
                  : 'text-[#1f5163] dark:text-[#6fb3c6] hover:bg-[#e3eef1] dark:hover:bg-[#1e2a30]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#fbbf24]" />
              <span>{lang === 'fa' ? 'طµظپط­ظ‡ غ°: ط¬ط¹ط¨ظ‡â€Œط§ط¨ط²ط§ط± ظˆ ظ…ط¨ط§ظ†غŒ LLM' : 'Page 0: LLM Toolkit'}</span>
            </button>

            <button
              onClick={() => {
                setPage(1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all shrink-0 ${
                page === 1
                  ? 'bg-[#ffffff] dark:bg-[#1a2228] text-[#1f5163] dark:text-[#6fb3c6] shadow-xs font-semibold'
                  : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'طµظپط­ظ‡ غ±: ط¯ط±ع© ع©ط³ط¨â€Œظˆع©ط§ط±' : 'Page 1'}</span>
            </button>

            <button
              onClick={() => {
                setPage(2);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all shrink-0 ${
                page === 2
                  ? 'bg-[#00738c] text-white shadow-xs font-semibold'
                  : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'طµظپط­ظ‡ غ²: ط­ظ„ ظ…ط³ط¦ظ„ظ‡' : 'Page 2'}</span>
              {isSessionLocked(2) && <Lock className="w-2.5 h-2.5 text-rose-500/80 shrink-0" />}
            </button>

            <button
              onClick={() => {
                setPage(3);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all shrink-0 ${
                page === 3
                  ? 'bg-[#b87333] text-white shadow-xs font-semibold'
                  : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'طµظپط­ظ‡ غ³: ظ…ط¹غŒط§ط±ظ‡ط§غŒ ظ…ظˆظپظ‚غŒطھ' : 'Page 3'}</span>
              {isSessionLocked(3) && <Lock className="w-2.5 h-2.5 text-rose-500/80 shrink-0" />}
            </button>

            <button
              onClick={() => {
                setPage(4);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all shrink-0 ${
                page === 4
                  ? 'bg-[#1f5163] text-white shadow-xs font-semibold'
                  : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'طµظپط­ظ‡ غ´: ظ‡ط²غŒظ†ظ‡-ظپط§غŒط¯ظ‡' : 'Page 4: Budget'}</span>
              {isSessionLocked(4) && <Lock className="w-2.5 h-2.5 text-rose-500/80 shrink-0" />}
            </button>

            <button
              onClick={() => {
                setPage(5);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all shrink-0 ${
                page === 5
                  ? 'bg-[#00738c] text-white shadow-xs font-semibold'
                  : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'طµظپط­ظ‡ غµ: ط¨ط±ط¢ظˆط±ط¯ ROI (غ±غµ)' : 'Page 5 (Expected ROI)'}</span>
              {isSessionLocked(5) && <Lock className="w-2.5 h-2.5 text-rose-500/80 shrink-0" />}
            </button>

            <button
              onClick={() => {
                setPage(6);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all shrink-0 ${
                page === 6
                  ? 'bg-[#1b3a4b] text-white shadow-xs font-semibold'
                  : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
              }`}
            >
              <Brain className="w-3.5 h-3.5 text-[#99e2b4]" />
              <span>{lang === 'fa' ? 'طµظپط­ظ‡ غ¶: ط§ظ„ط²ط§ظ…ط§طھ ط´ظ†ط§ط®طھغŒ (غ±غ¶)' : 'Page 6 (Cognitive Req.)'}</span>
              {isSessionLocked(6) && <Lock className="w-2.5 h-2.5 text-rose-500/80 shrink-0" />}
            </button>

            <button
              onClick={() => {
                setPage(7);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all shrink-0 ${
                page === 7
                  ? 'bg-[#0f4c5c] text-white shadow-xs font-semibold'
                  : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-[#6ee7b7]" />
              <span>{lang === 'fa' ? 'طµظپط­ظ‡ غ·: ع†ط±ط§ AIطں (غ±غ·)' : 'Page 7 (Why AI?)'}</span>
              {isSessionLocked(7) && <Lock className="w-2.5 h-2.5 text-rose-500/80 shrink-0" />}
            </button>

            <button
              onClick={() => {
                setPage(8);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all shrink-0 ${
                page === 8
                  ? 'bg-[#00738c] text-white shadow-xs font-semibold'
                  : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#99e2b4]" />
              <span>{lang === 'fa' ? 'طµظپط­ظ‡ غ¸: ط¨ط®ط´â€Œظ‡ط§غŒ ط؛غŒط±ط´ظ†ط§ط®طھغŒ (غ±غ¸)' : 'Page 8 (Noncognitive Parts)'}</span>
              {isSessionLocked(8) && <Lock className="w-2.5 h-2.5 text-rose-500/80 shrink-0" />}
            </button>

            <button
              onClick={() => {
                setPage(9);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all shrink-0 ${
                page === 9
                  ? 'bg-[#1b3a4b] text-white shadow-xs font-semibold'
                  : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
              }`}
            >
              <Target className="w-3.5 h-3.5 text-[#99e2b4]" />
              <span>{lang === 'fa' ? 'طµظپط­ظ‡ غ¹: ط§ظ‡ط¯ط§ظپ ط´ظ†ط§ط®طھغŒ (غ±غ¹)' : 'Page 9 (Cognitive Obj.)'}</span>
              {isSessionLocked(9) && <Lock className="w-2.5 h-2.5 text-rose-500/80 shrink-0" />}
            </button>

            <button
              onClick={() => {
                setPage(10);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all shrink-0 ${
                page === 10
                  ? 'bg-[#00738c] text-white shadow-xs font-semibold'
                  : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
              }`}
            >
              <Gauge className="w-3.5 h-3.5 text-[#6ee7b7]" />
              <span>{lang === 'fa' ? 'طµظپط­ظ‡ غ±غ°: ظ†طھط§غŒط¬ ط´ظ†ط§ط®طھغŒ (غ²غ°)' : 'Page 10 (Cognitive Outcomes)'}</span>
              {isSessionLocked(10) && <Lock className="w-2.5 h-2.5 text-rose-500/80 shrink-0" />}
            </button>

            <button
              onClick={() => {
                setPage(11);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all shrink-0 ${
                page === 11
                  ? 'bg-[#1f5163] text-white shadow-xs font-semibold'
                  : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#6ee7b7]" />
              <span>{lang === 'fa' ? 'طµظپط­ظ‡ غ±غ±: ظ…ط¹غŒط§ط±ظ‡ط§غŒ ظ…ظˆظپظ‚غŒطھ AI (غ²غ±)' : 'Page 11 (AI Success Criteria)'}</span>
              {isSessionLocked(11) && <Lock className="w-2.5 h-2.5 text-rose-500/80 shrink-0" />}
            </button>

            <button
              onClick={() => {
                setPage(12);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all shrink-0 ${
                page === 12
                  ? 'bg-[#00738c] text-white shadow-xs font-semibold'
                  : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
              }`}
            >
              <Network className="w-3.5 h-3.5 text-[#6ee7b7]" />
              <span>{lang === 'fa' ? 'طµظپط­ظ‡ غ±غ²: ط§ظ„ع¯ظˆظ‡ط§غŒ ظ‡ظˆط´ ظ…طµظ†ظˆط¹غŒ (غ²غ²)' : 'Page 12 (AI Patterns)'}</span>
              {isSessionLocked(12) && <Lock className="w-2.5 h-2.5 text-rose-500/80 shrink-0" />}
            </button>

            <button
              onClick={() => {
                setPage(13);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all shrink-0 ${
                page === 13
                  ? 'bg-[#1f5163] text-white shadow-xs font-semibold'
                  : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
              }`}
            >
              <Workflow className="w-3.5 h-3.5 text-[#6ee7b7]" />
              <span>{lang === 'fa' ? 'طµظپط­ظ‡ غ±غ³: طھط¹غŒغŒظ† ط§ظ„ع¯ظˆظ‡ط§ (غ²غ³)' : 'Page 13 (Which Patterns)'}</span>
              {isSessionLocked(13) && <Lock className="w-2.5 h-2.5 text-rose-500/80 shrink-0" />}
            </button>

            <button
              onClick={() => {
                setPage(14);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all shrink-0 ${
                page === 14
                  ? 'bg-[#00738c] text-white shadow-xs font-semibold'
                  : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-[#6ee7b7]" />
              <span>{lang === 'fa' ? 'طµظپط­ظ‡ غ±غ´: ط§ط±ط²غŒط§ط¨غŒ ظˆط¶ط¹غŒطھ (غ²غ´)' : 'Page 14 (Assess Situation)'}</span>
              {isSessionLocked(14) && <Lock className="w-2.5 h-2.5 text-rose-500/80 shrink-0" />}
            </button>

            <button
              onClick={() => {
                setPage(15);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all shrink-0 ${
                page === 15
                  ? 'bg-[#1b3a4b] text-white shadow-xs font-semibold'
                  : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
              }`}
            >
              <HardDrive className="w-3.5 h-3.5 text-[#99e2b4]" />
              <span>{lang === 'fa' ? 'طµظپط­ظ‡ غ±غµ: ظپظ†ط§ظˆط±غŒ ظˆ ظ…ظ‡ط§ط±طھâ€Œظ‡ط§ (غ²غµ)' : 'Page 15 (Tech & Skills)'}</span>
              {isSessionLocked(15) && <Lock className="w-2.5 h-2.5 text-rose-500/80 shrink-0" />}
            </button>

            <button
              onClick={() => {
                setPage(16);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all shrink-0 ${
                page === 16
                  ? 'bg-[#00738c] text-white shadow-xs font-semibold'
                  : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-[#6ee7b7]" />
              <span>{lang === 'fa' ? 'طµظپط­ظ‡ غ±غ¶: ط²ظ…ط§ظ†â€Œط¨ظ†ط¯غŒ (غ²غ¶)' : 'Page 16 (Schedule)'}</span>
              {isSessionLocked(16) && <Lock className="w-2.5 h-2.5 text-rose-500/80 shrink-0" />}
            </button>

            <button
              onClick={() => {
                setPage(17);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all shrink-0 ${
                page === 17
                  ? 'bg-[#1b3a4b] text-white shadow-xs font-semibold'
                  : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
              }`}
            >
              <Gauge className="w-3.5 h-3.5 text-[#99e2b4]" />
              <span>{lang === 'fa' ? 'طµظپط­ظ‡ غ±غ·: ظ…ط­ط¯ظˆط¯غŒطھâ€Œظ‡ط§ ظˆ ط¹ظ…ظ„ع©ط±ط¯ (غ²غ·)' : 'Page 17 (Constraints & Performance)'}</span>
              {isSessionLocked(17) && <Lock className="w-2.5 h-2.5 text-rose-500/80 shrink-0" />}
            </button>

            <button
              onClick={() => {
                setPage(18);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all shrink-0 ${
                page === 18
                  ? 'bg-[#00738c] text-white shadow-xs font-semibold'
                  : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-[#6ee7b7]" />
              <span>{lang === 'fa' ? 'طµظپط­ظ‡ غ±غ¸: ط³ظ†ط¬ظ‡â€Œظ‡ط§ ظˆ ظ…ط§طھط±غŒط³ (غ²غ¸)' : 'Page 18 (Metrics)'}</span>
              {isSessionLocked(18) && <Lock className="w-2.5 h-2.5 text-rose-500/80 shrink-0" />}
            </button>

            <button
              onClick={() => {
                setPage(19);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all shrink-0 ${
                page === 19
                  ? 'bg-[#1b3a4b] text-white shadow-xs font-semibold'
                  : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-[#99e2b4]" />
              <span>{lang === 'fa' ? 'طµظپط­ظ‡ غ±غ¹: ط³ظ†ط¬ظ‡â€Œظ‡ط§ ظˆ ط­ط³ط§ط³غŒطھâ€Œظ‡ط§ (غ²غ¹)' : 'Page 19 (Sensitivities)'}</span>
              {isSessionLocked(19) && <Lock className="w-2.5 h-2.5 text-rose-500/80 shrink-0" />}
            </button>

            <button
              onClick={() => {
                setPage(20);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all shrink-0 ${
                page === 20
                  ? 'bg-[#00738c] text-white shadow-xs font-semibold'
                  : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-[#6ee7b7]" />
              <span>{lang === 'fa' ? 'طµظپط­ظ‡ غ²غ°: ط³ظ†ط¬ظ‡â€Œظ‡ط§غŒ KPI ع©ط³ط¨â€Œظˆع©ط§ط± (غ³غ°)' : 'Page 20 (Business KPIs)'}</span>
              {isSessionLocked(20) && <Lock className="w-2.5 h-2.5 text-rose-500/80 shrink-0" />}
            </button>

            <button
              onClick={() => {
                setPage(21);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all shrink-0 ${
                page === 21
                  ? 'bg-[#1b3a4b] text-white shadow-xs font-semibold'
                  : 'text-[#5d6b73] dark:text-[#9aa8b0] hover:text-[#1c2830] dark:hover:text-[#e8ebe9]'
              }`}
            >
              <Server className="w-3.5 h-3.5 text-[#99e2b4]" />
              <span>{lang === 'fa' ? 'طµظپط­ظ‡ غ²غ±: ط³ظ†ط¬ظ‡â€Œظ‡ط§غŒ ظپظ†ط§ظˆط±غŒ (غ³غ±)' : 'Page 21 (Tech KPIs)'}</span>
              {isSessionLocked(21) && <Lock className="w-2.5 h-2.5 text-rose-500/80 shrink-0" />}
            </button>
          </div>

          {/* Tools & Utilities */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Class Leaderboard Button */}
            <button
              onClick={() => setIsLeaderboardModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all border bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/20 active:scale-[0.96] cursor-pointer shrink-0"
              title={lang === 'fa' ? 'ط¬ط¯ظˆظ„ ط±طھط¨ظ‡â€Œط¨ظ†ط¯غŒ ط±ظ‚ط§ط¨طھغŒ ظ‡ظ…â€Œط¯ظˆط±ظ‡â€Œط§غŒâ€Œظ‡ط§ (Class Leaderboard)' : 'Class Leaderboard'}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{lang === 'fa' ? 'ط±طھط¨ظ‡â€Œط¨ظ†ط¯غŒ ع©ظ„ط§ط³' : 'Leaderboard'}</span>
            </button>

            {/* Admin Control Center Button */}
            {isUserAdmin(currentUser) && (
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all border bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30 hover:bg-purple-500/25 active:scale-[0.96] cursor-pointer shrink-0"
                title={lang === 'fa' ? 'ظ…ط±ع©ط² ظپط±ظ…ط§ظ†ط¯ظ‡غŒ ظ…ط¯غŒط±غŒطھ ط¯ظˆط±ظ‡ (Admin Control Center)' : 'Admin Control Center'}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{lang === 'fa' ? 'ظ¾ظ†ظ„ ظ…ط¯غŒط±غŒطھ' : 'Admin Panel'}</span>
              </button>
            )}

            {/* User Profile / Google Sign-In Button */}
            {currentUser ? (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 p-1 pe-2.5 rounded-xl border border-[#2f7d5b]/30 bg-[#2f7d5b]/10 hover:bg-[#2f7d5b]/20 transition-all text-xs font-bold text-[#1c2830] dark:text-[#e8ebe9] cursor-pointer"
                title={lang === 'fa' ? 'ط­ط³ط§ط¨ ع©ط§ط±ط¨ط±غŒ' : 'User Account'}
              >
                {currentUser.avatarUrl ? (
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.displayName}
                    className="w-5 h-5 rounded-lg object-cover border border-white dark:border-[#161e24]"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-lg bg-[#2f7d5b] text-white flex items-center justify-center text-[10px] font-mono">
                    {currentUser.displayName.charAt(0)}
                  </div>
                )}
                <span className="hidden md:inline max-w-28 truncate text-[11px]">
                  {currentUser.displayName}
                </span>
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-[#1f5163] to-[#00738c] hover:from-[#163c4a] hover:to-[#0f4c5c] text-white shadow-xs hover:shadow-md transition-all active:scale-[0.96] cursor-pointer shrink-0"
              >
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#fff"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#fff"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#fff"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#fff"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{lang === 'fa' ? 'ظˆط±ظˆط¯ / ط¹ط¶ظˆغŒطھ' : 'Sign In'}</span>
              </button>
            )}

            {/* Copy All Answers */}
            <button
              onClick={handleCopyAll}
              title={lang === 'fa' ? 'ع©ظ¾غŒ طھظ…ط§ظ… ظ¾ط§ط³ط®â€Œظ‡ط§' : 'Copy All Answers'}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] text-[#1c2830] dark:text-[#e8ebe9] hover:border-[#1f5163] transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-[#1f5163] dark:text-[#6fb3c6]" />
              <span className="hidden sm:inline">{lang === 'fa' ? 'ع©ظ¾غŒ ظ¾ط§ط³ط®â€Œظ‡ط§' : 'Copy'}</span>
            </button>

            {/* Print / PDF Protection */}
            <button
              onClick={() => {
                showToast(
                  lang === 'fa'
                    ? 'ًںڑ« ط®ط±ظˆط¬غŒ PDF ظˆ ع†ط§ظ¾ ظ…طھط¯ظˆظ„ظˆعکغŒ ط¨ظ‡ ط¯ظ„غŒظ„ ط­ظ‚ظˆظ‚ ع©ظ¾غŒâ€Œط±ط§غŒطھ ط§ظˆط¬ ظ…ط³ط¯ظˆط¯ ط§ط³طھ. ط¨ط±ط§غŒ ط°ط®غŒط±ظ‡ ع©ط§ط± ط®ظˆط¯طŒ ط§ط² ط¯ع©ظ…ظ‡ آ«ع©ظ¾غŒ ظ¾ط§ط³ط®â€Œظ‡ط§آ» ط§ط³طھظپط§ط¯ظ‡ ع©ظ†غŒط¯.'
                    : 'ًںڑ« Printing methodology to PDF is restricted by OWJ Copyright. Use "Copy Answers" for your work.'
                );
              }}
              title={lang === 'fa' ? 'ط­ظپط§ط¸طھ ع©ظ¾غŒâ€Œط±ط§غŒطھ ع†ط§ظ¾' : 'Print Protected'}
              className="p-2 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9] hover:bg-[#f4f4f1] dark:hover:bg-[#12171b] cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 opacity-60" />
            </button>

            {/* Anti-Screenshot Shield Status & Test */}
            <button
              onClick={() => {
                if (typeof (window as any).__triggerScreenShield === 'function') {
                  (window as any).__triggerScreenShield();
                } else {
                  showToast(
                    lang === 'fa'
                      ? 'ًں›،ï¸ڈ ط³ظ¾ط± ط¶ط¯ ط§ط³ع©ط±غŒظ†â€Œط´ط§طھ ظˆ ع©ظ¾غŒâ€Œط±ط§غŒطھ ط§ظˆط¬ ظپط¹ط§ظ„ ط§ط³طھ.'
                      : 'ًں›،ï¸ڈ OWJ Anti-Screenshot Guard is active.'
                  );
                }
              }}
              title={
                lang === 'fa'
                  ? 'ط³ظ¾ط± ط¶ط¯ ط§ط³ع©ط±غŒظ†â€Œط´ط§طھ ظˆ ع©ظ¾غŒâ€Œط±ط§غŒطھ ط§ظˆط¬ (ظپط¹ط§ظ„) - ط¨ط±ط§غŒ طھط³طھ ع©ظ„غŒع© ظپط±ظ…ط§غŒغŒط¯'
                  : 'OWJ Anti-Screenshot & Copyright Guard (Active) - Click to test'
              }
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 active:scale-[0.96] transition-all cursor-pointer text-xs font-semibold shrink-0"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden lg:inline">{lang === 'fa' ? 'ط³ظ¾ط± ع©ظ¾غŒâ€Œط±ط§غŒطھ' : 'Protected'}</span>
            </button>

            {/* Language Switch */}
            <button
              onClick={() => setLang(prev => (prev === 'fa' ? 'en' : 'fa'))}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] text-[#1c2830] dark:text-[#e8ebe9] hover:border-[#1f5163] transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'English' : 'ظپط§ط±ط³غŒ'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
              title="Theme"
              className="p-2 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9] hover:bg-[#f4f4f1] dark:hover:bg-[#12171b]"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-7 lg:p-10">
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
            industryTrack={industryTrack}
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
          />
        )}

        {/* Page 1 (Matching Image 1) */}
        {page === 1 && (
          <Page1BusinessUnderstanding
            lang={lang}
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
            industryTrack={industryTrack}
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
                    ظ…ط­طھظˆط§غŒ ط¢ظ…ظˆط²ط´غŒ ظ‚ط·ط±ظ‡â€Œط§غŒ (Curriculum Drip Gating)
                  </span>
                  <h3 className="text-lg font-black text-[#1c2830] dark:text-[#e8ebe9]">
                    ط¯ط³طھط±ط³غŒ ط¨ظ‡ ط¬ظ„ط³ظ‡ {page} ط¯ط± ط­ط§ظ„ ط­ط§ط¶ط± ظ‚ظپظ„ ط§ط³طھ
                  </h3>
                  <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] max-w-md mx-auto leading-relaxed">
                    ط¬ظ‡طھ ظ‡ظ…ع¯ط§ظ…غŒ غŒط§ط¯ع¯غŒط±غŒ ط¯ط± ع©ط§ط±ع¯ط§ظ‡ ظˆ ط·ط¨ظ‚ ظ…طھط¯ظˆظ„ظˆعکغŒ ط§ط³طھظ‚ط±ط§ط± CPMAIطŒ ط§غŒظ† ط¬ظ„ط³ظ‡ ظ¾ط³ ط§ط² طھط¯ط±غŒط³ ط§ط³طھط§ط¯ ط¯ط± ع©ظ„ط§ط³ ط¨ط§ط² ط®ظˆط§ظ‡ط¯ ط´ط¯.
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
                    ط¨ط§ط²ع¯ط´طھ ط¨ظ‡ ط¬ظ„ط³ظ‡ غ± (ط¯ط±ع© ع©ط³ط¨â€Œظˆع©ط§ط±)
                  </button>
                  <button
                    onClick={() => {
                      setPage('quiz');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                  >
                    ط´ط±ع©طھ ط¯ط± ط¢ط²ظ…ظˆظ† ط³ط·ط­â€Œط³ظ†ط¬غŒ
                  </button>
                  <button
                    onClick={() => setIsLeaderboardModalOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                  >
                    ظ…ط´ط§ظ‡ط¯ظ‡ ط¬ط¯ظˆظ„ ط±طھط¨ظ‡â€Œط¨ظ†ط¯غŒ ع©ظ„ط§ط³ ًںڈ†
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
            industryTrack={industryTrack}
          />
        )}

        {/* Page 3 (Matching Image 3) */}
        {page === 3 && (
          <Page3SuccessCriteria
            lang={lang}
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
            industryTrack={industryTrack}
          />
        )}

        {/* Page 4 (Matching Slide 14: Subtask: Cost-Benefit Analysis) */}
        {page === 4 && (
          <Page4CostBenefit
            lang={lang}
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
            industryTrack={industryTrack}
          />
        )}

        {/* Page 5 (Matching Slide 15: What is the expected ROI for this project?) */}
        {page === 5 && (
          <Page5ExpectedRoi
            lang={lang}
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
            industryTrack={industryTrack}
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
            industryTrack={industryTrack}
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
            industryTrack={industryTrack}
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
            industryTrack={industryTrack}
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
            industryTrack={industryTrack}
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
            industryTrack={industryTrack}
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
            industryTrack={industryTrack}
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
            industryTrack={industryTrack}
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
            industryTrack={industryTrack}
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
            industryTrack={industryTrack}
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
            industryTrack={industryTrack}
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
            industryTrack={industryTrack}
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
            industryTrack={industryTrack}
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
            industryTrack={industryTrack}
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
            industryTrack={industryTrack}
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
            industryTrack={industryTrack}
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
            industryTrack={industryTrack}
          />
        )}
          </>
        )}

        {/* Reset Option and Auto-save indicator */}
        <div className="mt-8 pt-4 border-t border-[#d9dad5] dark:border-[#2d3942] flex flex-wrap items-center justify-between gap-3 text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2f7d5b]" />
              <span>{lang === 'fa' ? 'ظ¾ط§ط³ط®â€Œظ‡ط§غŒ ط´ظ…ط§ ط±ظˆغŒ ظ‡ظ…غŒظ† ط¯ط³طھع¯ط§ظ‡ ط°ط®غŒط±ظ‡ ظ…غŒâ€Œط´ظˆط¯.' : 'Your answers automatically save on this device.'}</span>
            </span>

            <button
              onClick={handleSyncToCloud}
              disabled={isSyncing}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2f7d5b]/10 hover:bg-[#2f7d5b]/20 text-[#2f7d5b] dark:text-[#52b788] border border-[#2f7d5b]/30 transition-colors cursor-pointer text-xs font-medium"
              title={lang === 'fa' ? 'ظ‡ظ…ع¯ط§ظ…â€Œط³ط§ط²غŒ ظˆ ط°ط®غŒط±ظ‡ ظ¾ط§ط³ط®â€Œظ‡ط§ ط¯ط± ظ¾ط§غŒع¯ط§ظ‡ ط¯ط§ط¯ظ‡ ط§ط¨ط±غŒ Neon' : 'Sync and save responses to Neon Cloud Database'}
            >
              <Cloud className="w-3.5 h-3.5" />
              <span>
                {isSyncing
                  ? (lang === 'fa' ? 'ط¯ط± ط­ط§ظ„ ط°ط®غŒط±ظ‡ ط§ط¨ط±غŒ...' : 'Syncing to cloud...')
                  : cloudStatus === 'synced'
                  ? (lang === 'fa' ? 'âœ“ ظ‡ظ…ع¯ط§ظ… ط¨ط§ ط¯غŒطھط§ط¨غŒط³ ط§ط¨ط±غŒ ظ†ط¦ظˆظ†' : 'âœ“ Synced with Neon DB')
                  : (lang === 'fa' ? 'ط°ط®غŒط±ظ‡ ط¯ط± ظ¾ط§غŒع¯ط§ظ‡ ط¯ط§ط¯ظ‡ ط§ط¨ط±غŒ ظ†ط¦ظˆظ†' : 'Save to Neon Cloud DB')}
              </span>
            </button>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[#b3432f] hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{lang === 'fa' ? 'ظ¾ط§ع© ع©ط±ط¯ظ† ع©ظ„ ع©طھط§ط¨ ع©ط§ط±' : 'Clear all'}</span>
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
                ? `ط®ظˆط´ ط¢ظ…ط¯غŒط¯طŒ ${user.displayName || user.email}`
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
      </main>
    </div>
  );
}
