import React, { useState, useEffect } from 'react';
import { Language, Theme } from './types/cpmai';
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
import { Footer } from './components/Footer';
import { OWJ_LOGO } from './data/logo';
import { Moon, Sun, Globe, Copy, Printer, RotateCcw, Check, BookOpen, Layers, Award, DollarSign, TrendingUp, Brain, Cpu, Boxes, Split, Target, Gauge, ShieldCheck, Network, Workflow, Calendar } from 'lucide-react';

const STORAGE_KEY = 'cpmai-workbook-14pages-v1';
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
  const [page, setPage] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14>(1);
  const [lang, setLang] = useState<Language>('fa');
  const [theme, setTheme] = useState<Theme>('light');

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

  const [toastMsg, setToastMsg] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored =
        localStorage.getItem(STORAGE_KEY) ||
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
        if (d.page) setPage(d.page);
        if (d.lang) setLang(d.lang);
        if (d.theme) setTheme(d.theme);
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
      page14Content
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Storage unavailable
    }
  }, [page, lang, theme, read, story, bg, obj, qs, ans, page2Content, page3Content, page4Content, page5Content, page6Content, page7Content, page8Content, page9Content, page10Content, page11Content, page12Content, page13Content, page14Content]);

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

  const handleCopyAll = () => {
    let fullText = lang === 'fa'
      ? `=== کتاب کار CPMAI: فاز اول درک کسب‌وکار ===\nمشاوران مدیریت کسب و کار اوج (owjbc.com)\n\n`
      : `=== CPMAI Workbook: Phase I Business Understanding ===\nOWJ Business Council (owjbc.com)\n\n`;

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
    fullText += page14Content || '(محتوایی در بوم ثبت نشده است / No content entered)';

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullText).then(() => {
        showToast(lang === 'fa' ? 'پاسخ‌های هر ۱۴ صفحه کپی شد!' : 'Workbook answers for all 14 pages copied!');
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
    showToast(lang === 'fa' ? 'تمام پاسخ‌ها پاک شدند' : 'Workbook reset');
  };

  return (
    <div className="min-h-screen bg-[#f4f4f1] dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9] transition-colors flex flex-col">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 w-full bg-[#ffffff]/90 dark:bg-[#1a2228]/90 backdrop-blur-md border-b border-[#d9dad5] dark:border-[#2d3942]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Brand & Organization */}
          <a
            href="https://owjbc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 group"
          >
            <div className="bg-[#ffffff] p-1 rounded-md border border-[#d9dad5] shadow-2xs">
              <img
                src={OWJ_LOGO}
                alt="OWJ Business Council"
                className="h-7 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9] group-hover:text-[#1f5163] dark:group-hover:text-[#6fb3c6] transition-colors">
                {lang === 'fa' ? 'کتاب کار CPMAI' : 'CPMAI Workbook'}
              </span>
              <span className="text-[10px] text-[#5d6b73] dark:text-[#9aa8b0]">
                {lang === 'fa' ? 'مشاوران مدیریت کسب و کار اوج' : 'OWJ Business Council'}
              </span>
            </div>
          </a>

          {/* 4-Page Navigation Segmented Control */}
          <div className="flex items-center p-1 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942] overflow-x-auto max-w-full">
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
              <span>{lang === 'fa' ? 'صفحه ۱: درک کسب‌وکار' : 'Page 1'}</span>
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
              <span>{lang === 'fa' ? 'صفحه ۲: حل مسئله' : 'Page 2'}</span>
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
              <span>{lang === 'fa' ? 'صفحه ۳: معیارهای موفقیت' : 'Page 3'}</span>
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
              <span>{lang === 'fa' ? 'صفحه ۴: هزینه-فایده' : 'Page 4: Budget'}</span>
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
              <span>{lang === 'fa' ? 'صفحه ۵: برآورد ROI (۱۵)' : 'Page 5 (Expected ROI)'}</span>
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
              <span>{lang === 'fa' ? 'صفحه ۶: الزامات شناختی (۱۶)' : 'Page 6 (Cognitive Req.)'}</span>
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
              <span>{lang === 'fa' ? 'صفحه ۷: چرا AI؟ (۱۷)' : 'Page 7 (Why AI?)'}</span>
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
              <span>{lang === 'fa' ? 'صفحه ۸: بخش‌های غیرشناختی (۱۸)' : 'Page 8 (Noncognitive Parts)'}</span>
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
              <span>{lang === 'fa' ? 'صفحه ۹: اهداف شناختی (۱۹)' : 'Page 9 (Cognitive Obj.)'}</span>
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
              <span>{lang === 'fa' ? 'صفحه ۱۰: نتایج شناختی (۲۰)' : 'Page 10 (Cognitive Outcomes)'}</span>
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
              <span>{lang === 'fa' ? 'صفحه ۱۱: معیارهای موفقیت AI (۲۱)' : 'Page 11 (AI Success Criteria)'}</span>
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
              <span>{lang === 'fa' ? 'صفحه ۱۲: الگوهای هوش مصنوعی (۲۲)' : 'Page 12 (AI Patterns)'}</span>
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
              <span>{lang === 'fa' ? 'صفحه ۱۳: تعیین الگوها (۲۳)' : 'Page 13 (Which Patterns)'}</span>
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
              <span>{lang === 'fa' ? 'صفحه ۱۴: ارزیابی وضعیت (۲۴)' : 'Page 14 (Assess Situation)'}</span>
            </button>
          </div>

          {/* Tools & Utilities */}
          <div className="flex items-center gap-1.5">
            {/* Copy All Answers */}
            <button
              onClick={handleCopyAll}
              title={lang === 'fa' ? 'کپی تمام پاسخ‌ها' : 'Copy All Answers'}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] text-[#1c2830] dark:text-[#e8ebe9] hover:border-[#1f5163] transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-[#1f5163] dark:text-[#6fb3c6]" />
              <span className="hidden sm:inline">{lang === 'fa' ? 'کپی پاسخ‌ها' : 'Copy'}</span>
            </button>

            {/* Print / PDF */}
            <button
              onClick={() => window.print()}
              title={lang === 'fa' ? 'چاپ یا خروجی PDF' : 'Print / PDF'}
              className="p-2 rounded-lg border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9] hover:bg-[#f4f4f1] dark:hover:bg-[#12171b]"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>

            {/* Language Switch */}
            <button
              onClick={() => setLang(prev => (prev === 'fa' ? 'en' : 'fa'))}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] text-[#1c2830] dark:text-[#e8ebe9] hover:border-[#1f5163] transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'English' : 'فارسی'}</span>
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
            onGoToPage2={() => {
              setPage(2);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

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
          />
        )}

        {/* Reset Option and Auto-save indicator */}
        <div className="mt-8 pt-4 border-t border-[#d9dad5] dark:border-[#2d3942] flex items-center justify-between text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#2f7d5b]" />
            <span>{lang === 'fa' ? 'پاسخ‌های شما روی همین دستگاه ذخیره می‌شود.' : 'Your answers automatically save on this device.'}</span>
          </span>

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
      </main>
    </div>
  );
}
