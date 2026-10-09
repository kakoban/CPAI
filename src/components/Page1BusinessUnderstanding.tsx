import React, { useState } from 'react';
import { Language } from '../types/cpmai';
import { ArrowLeft, ArrowRight, Plus, Trash2, Lightbulb, Check } from 'lucide-react';

interface Page1Props {
  lang: Language;
  read: boolean;
  onToggleRead: (val: boolean) => void;
  story: string;
  onChangeStory: (val: string) => void;
  bg: string;
  onChangeBg: (val: string) => void;
  obj: string;
  onChangeObj: (val: string) => void;
  qs: string[];
  onAddQ: (val: string) => void;
  onRemoveQ: (idx: number) => void;
  ans: Record<number, number>;
  onSelectAns: (qIdx: number, oIdx: number) => void;
  onGoToPage2: () => void;
}

export const Page1BusinessUnderstanding: React.FC<Page1Props> = ({
  lang,
  read,
  onToggleRead,
  story,
  onChangeStory,
  bg,
  onChangeBg,
  obj,
  onChangeObj,
  qs,
  onAddQ,
  onRemoveQ,
  ans,
  onSelectAns,
  onGoToPage2
}) => {
  const [newQ, setNewQ] = useState('');
  const [showExample, setShowExample] = useState(false);

  const t = {
    en: {
      badge: 'CPMAI Phase I · Page 1 of 5 (Slide 11)',
      h1: 'CPMAI Phase I: Business Understanding',
      p1: 'The first phase of a CPMAI process is gaining a thorough understanding of the business and organizational objectives and other factors that will determine whether the project is worth undertaking, and the conditions under which it will be a success. The Business Understanding phase focuses on understanding the project objectives and requirements from a business perspective, then converting this knowledge into an AI and cognitive project problem definition and a preliminary plan designed to achieve the objectives.',
      p2: 'As mentioned earlier, since we are doing CPMAI in the context of agile, the business understanding for the particular CPMAI project is relevant to the specific sprint or iteration you are currently in, and should tie very closely to the user story that is relevant for that iteration. In a CPMAI project, it is possible for a single sprint iteration to encompass all of the CPMAI phases, but it is also possible for a CPMAI project to span multiple sprints or iterations, which means that the business understanding will be relevant to that particular iteration’s user story.',
      tg: 'Task Group: Determine Business Objectives',
      tgDesc: 'These tasks help the project team determine overall business objectives as they are relevant to the AI and cognitive aspects of the project.',
      st: 'Subtask: Determine Business Objectives',
      descTitle: 'Description',
      descBody: 'The first objective of the project team is to thoroughly understand, from a business perspective, what the customer really wants to accomplish in a manner that is consistent with cognitive technology goals. Often the customer has many competing objectives and constraints that must be properly balanced. The project team’s goal is to uncover important factors, at the start, that can influence the outcome of the project. A possible consequence of neglecting this step is to expend a great deal of effort producing the right answers to the wrong questions.',
      artTitle: 'Task Artifacts',
      artBg: 'Background: Record the information known about the organization’s business situation at the beginning of the project.',
      artObj: 'Business objectives: Describe the customer’s primary objective from a business perspective. In addition to the primary business objective, there are typically other related business questions that the customer would like to address.',
      artEx: 'For example, the primary business goal might be to keep current customers by predicting when they are prone to move to a competitor. Examples of related business questions are “How does the primary channel used (e.g., ATM, branch visit, internet) affect whether customers stay or go?” or “Will lower ATM fees significantly reduce the number of high-value customers who leave?”',
      readChk: 'I have read and understood this phase overview',
      wsTitle: 'Worksheet: Your Project Artifacts',
      wsDesc: 'Fill these in for your own project or case study iteration.',
      storyL: 'Sprint User Story',
      storyHint: 'Which user story does this iteration serve?',
      storyPh: 'As a [role], I want [goal] so that [benefit]...',
      bgL: 'Background',
      bgHint: 'What do we know about the organization’s business situation right now?',
      objL: 'Primary Business Objective',
      objHint: 'One sentence, written from the business point of view, not technology.',
      rqL: 'Related Business Questions',
      rqHint: 'Add each specific question the customer also wants answered.',
      add: 'Add Question',
      rm: 'Remove',
      exBtnShow: 'Show Example',
      exBtnHide: 'Hide Example',
      exTitle: 'Primary Objective Example:',
      exText: 'Keep current customers by predicting when they are likely to move to a competitor. Related questions explore ATM fees and branch usage impact.',
      quizTitle: 'Check Your Understanding',
      quizDesc: 'Select an option to see instant feedback and explanation.',
      nextPageBtn: 'Next Page: What problem are you solving with AI in this iteration?',
      q1: 'What can happen if the team neglects to understand the customer’s real objectives at the start?',
      q1Options: ['The data will be harder to label', 'They produce the right answers to the wrong questions', 'The model will train more slowly'],
      q1Why: 'Skipping this step can send a great deal of effort toward answering the wrong questions.',
      q2: 'In an agile CPMAI project, business understanding should tie most closely to what?',
      q2Options: ['The final product vision only', 'The vendor’s contract', 'The user story for the current sprint or iteration'],
      q2Why: 'Business understanding is relevant to the specific sprint or iteration, and ties to its user story.',
      q3: 'Which one is a related business question rather than the primary objective?',
      q3Options: ['Will lower ATM fees significantly reduce the number of high-value customers who leave?', 'Keep current customers by predicting when they might leave', 'Choose the neural network architecture'],
      q3Why: 'Related questions explore factors around the main retention goal. Choosing neural architecture is an engineering task.'
    },
    fa: {
      badge: 'فاز اول CPMAI · صفحه ۱ از ۵ (اسلاید ۱۱ کتاب کار)',
      h1: 'CPMAI Phase I: Business Understanding',
      p1: 'نخستین فاز فرایند CPMAI، دستیابی به درکی کامل از اهداف کسب‌وکار و سازمان و عوامل دیگری است که تعیین می‌کنند آیا پروژه ارزش اجرا دارد و در چه شرایطی موفق خواهد بود. تمرکز فاز درک کسب‌وکار بر شناخت اهداف و الزامات پروژه از دیدگاه کسب‌وکار است و سپس تبدیل این دانش به تعریف مسئله برای پروژه هوش مصنوعی و یک برنامه اولیه برای رسیدن به اهداف.',
      p2: 'چون CPMAI را در بستر چابک (Agile) اجرا می‌کنیم، درک کسب‌وکار به اسپرینت یا تکرار مشخصی که در آن هستید مربوط است و باید ارتباط نزدیکی با داستان کاربر (User Story) همان تکرار داشته باشد. ممکن است یک اسپرینت همه فازهای CPMAI را پوشش دهد، یا یک پروژه چند اسپرینت را در بر بگیرد که در این حالت درک کسب‌وکار به داستان کاربر همان تکرار گره می‌خورد.',
      tg: 'گروه وظایف: تعیین اهداف کسب‌وکار (Task Group: Determine Business Objectives)',
      tgDesc: 'این وظایف به تیم پروژه کمک می‌کنند اهداف کلی کسب‌وکار را، تا جایی که به جنبه‌های شناختی و هوش مصنوعی مربوط است، مشخص کند.',
      st: 'زیروظیفه: تعیین اهداف کسب‌وکار (Subtask: Determine Business Objectives)',
      descTitle: 'شرح وظیفه (Description)',
      descBody: 'نخستین هدف تیم پروژه این است که از دیدگاه کسب‌وکار دقیقاً بفهمد مشتری واقعاً می‌خواهد به چه چیزی برسد، آن هم به شکلی که با اهداف فناوری شناختی سازگار باشد. مشتری اغلب اهداف و محدودیت‌های متعارض فراوانی دارد که باید درست متعادل شوند. هدف تیم این است که از همان ابتدا عوامل مهم اثرگذار بر نتیجه پروژه را کشف کند. نادیده گرفتن این گام می‌تواند به این معنا باشد که تلاش زیادی صرف یافتن پاسخ‌های درست برای پرسش‌های نادرست شود.',
      artTitle: 'مستندات خروجی وظیفه (Task Artifacts)',
      artBg: 'پس‌زمینه (Background): اطلاعاتی را که در آغاز پروژه درباره وضعیت کسب‌وکار سازمان می‌دانید ثبت کنید.',
      artObj: 'اهداف کسب‌وکار (Business objectives): هدف اصلی مشتری را از دیدگاه کسب‌وکار توصیف کنید. علاوه بر هدف اصلی، پرسش‌های کسب‌وکاری مرتبطی را که مشتری می‌خواهد به آن‌ها پاسخ داده شود فهرست کنید.',
      artEx: 'مثال: هدف اصلی ممکن است نگه‌داشتن مشتریان فعلی با پیش‌بینی زمان احتمال رفتن به رقیب باشد. نمونه پرسش‌های مرتبط: «کانال اصلی مورد استفاده (خودپرداز، شعبه، اینترنت) چگونه بر ماندن یا رفتن مشتری اثر می‌گذارد؟» یا «آیا کاهش کارمزد خودپرداز، تعداد مشتریان باارزش ترک‌کننده را به طور معناداری کم می‌کند؟»',
      readChk: 'این بخش را مطالعه کردم و اهداف آن را درک نمودم',
      wsTitle: 'برگه تمرین: مستندات پروژه شما',
      wsDesc: 'این بخش‌ها را برای پروژه یا مطالعه موردی خود تکمیل کنید.',
      storyL: 'داستان کاربر اسپرینت (Sprint User Story)',
      storyHint: 'این تکرار یا اسپرینت به کدام داستان کاربر خدمت می‌کند؟',
      storyPh: 'به‌عنوان [نقش]، می‌خواهم [هدف] تا [فایده و ارزش کسب‌وکار]...',
      bgL: 'پس‌زمینه (Background)',
      bgHint: 'اکنون درباره وضعیت کسب‌وکار سازمان چه می‌دانیم؟',
      objL: 'هدف اصلی کسب‌وکار (Primary Business Objective)',
      objHint: 'یک جمله، از دیدگاه کسب‌وکار (نه نام الگوریتم‌های هوش مصنوعی).',
      rqL: 'پرسش‌های کسب‌وکاری مرتبط (Related Business Questions)',
      rqHint: 'هر پرسش فرعی را که مشتری می‌خواهد به آن پاسخ داده شود اضافه کنید.',
      add: 'افزودن پرسش',
      rm: 'حذف',
      exBtnShow: 'نمایش مثال',
      exBtnHide: 'پنهان‌سازی مثال',
      exTitle: 'نمونه هدف اصلی:',
      exText: 'نگه‌داشتن مشتریان فعلی با پیش‌بینی زمانی که احتمالاً به رقیب می‌روند. پرسش‌های مرتبط اثر کارمزد و کانال‌های بانکی را بررسی می‌کنند.',
      quizTitle: 'بررسی فهم مطالب (Quiz)',
      quizDesc: 'یک گزینه را انتخاب کنید تا بلافاصله بازخورد و استدلال را ببینید.',
      nextPageBtn: 'صفحه بعد: در این تکرار چه مسئله‌ای را با هوش مصنوعی حل می‌کنید؟',
      q1: 'اگر تیم در ابتدا اهداف واقعی مشتری را درک نکند، چه اتفاقی ممکن است بیفتد؟',
      q1Options: ['برچسب‌گذاری داده‌ها سخت‌تر می‌شود', 'پاسخ‌های درست برای پرسش‌های نادرست تولید می‌شود', 'آموزش مدل کندتر می‌شود'],
      q1Why: 'نادیده گرفتن این گام می‌تواند تلاش زیادی را صرف پاسخ دادن به پرسش‌های نادرست کند.',
      q2: 'در یک پروژه CPMAI چابک، درک کسب‌وکار باید بیش از همه به چه چیزی مرتبط باشد؟',
      q2Options: ['فقط چشم‌انداز نهایی محصول', 'قرارداد فروشنده', 'داستان کاربر اسپرینت یا تکرار جاری'],
      q2Why: 'درک کسب‌وکار به اسپرینت یا تکرار مشخصی مربوط است و باید با داستان کاربر آن پیوند بخورد.',
      q3: 'کدام مورد یک پرسش کسب‌وکاری مرتبط است، نه هدف اصلی؟',
      q3Options: ['آیا کاهش کارمزد خودپرداز، تعداد مشتریان باارزش ترک‌کننده را به‌طور معناداری کم می‌کند؟', 'نگه‌داشتن مشتریان با پیش‌بینی زمان رفتنشان', 'انتخاب معماری شبکه عصبی'],
      q3Why: 'پرسش‌های مرتبط عوامل پیرامون هدف اصلی را می‌کاوند. انتخاب معماری شبکه عصبی یک وظیفه فنی مهندسی است.'
    }
  }[lang];

  const quizzes = [
    { q: t.q1, opts: t.q1Options, correct: 1, why: t.q1Why },
    { q: t.q2, opts: t.q2Options, correct: 2, why: t.q2Why },
    { q: t.q3, opts: t.q3Options, correct: 0, why: t.q3Why }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header (Matching Image 1) */}
      <div className="border-b border-[#d9dad5] dark:border-[#2d3942] pb-6">
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-[#1f5163] dark:text-[#6fb3c6]">
          <span>{t.badge}</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-1.5 h-8 bg-[#b87333] dark:bg-[#c98344] rounded-xs" />
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#1c2830] dark:text-[#e8ebe9] tracking-tight font-serif-heading">
            {t.h1}
          </h1>
        </div>

        {/* Introductory prose (verbatim from Image 1) */}
        <div className="space-y-3.5 text-sm sm:text-[15px] leading-relaxed text-[#2c3840] dark:text-[#cfd6db]">
          <p>{t.p1}</p>
          <p>{t.p2}</p>
        </div>
      </div>

      {/* Task Group & Subtask Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-[#1c2830] dark:text-[#e8ebe9]">
            {t.tg}
          </h2>
          <p className="text-xs sm:text-sm text-[#5d6b73] dark:text-[#9aa8b0] mt-1">
            {t.tgDesc}
          </p>
        </div>

        <h3 className="text-base sm:text-lg font-semibold text-[#1c2830] dark:text-[#e8ebe9] pt-2">
          {t.st}
        </h3>

        {/* Two-Box Cards (Description & Task Artifacts matching Image 1 layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
          {/* Box 1: Description */}
          <div className="relative p-5 sm:p-6 rounded-xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] border-t-3 border-t-[#1f5163] dark:border-t-[#6fb3c6] shadow-xs">
            <h4 className="font-semibold text-sm sm:text-base text-[#1c2830] dark:text-[#e8ebe9] mb-3">
              {t.descTitle}
            </h4>
            <p className="text-xs sm:text-sm leading-relaxed text-[#4d5b63] dark:text-[#a0afb8]">
              {t.descBody}
            </p>
            {/* Subtle corner triangle matching slide art */}
            <div className="absolute top-4 end-4 opacity-15 pointer-events-none text-[#1f5163] dark:text-[#6fb3c6]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12,2 22,22 2,22" />
              </svg>
            </div>
          </div>

          {/* Box 2: Task Artifacts */}
          <div className="relative p-5 sm:p-6 rounded-xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] border-t-3 border-t-[#1f5163] dark:border-t-[#6fb3c6] shadow-xs">
            <h4 className="font-semibold text-sm sm:text-base text-[#1c2830] dark:text-[#e8ebe9] mb-3">
              {t.artTitle}
            </h4>
            <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-[#4d5b63] dark:text-[#a0afb8]">
              <p>
                <b className="text-[#1c2830] dark:text-[#e8ebe9]">Background: </b>
                {t.artBg.replace('Background: ', '')}
              </p>
              <p>
                <b className="text-[#1c2830] dark:text-[#e8ebe9]">Business objectives: </b>
                {t.artObj.replace('Business objectives: ', '')}
              </p>
              <p className="pt-1 text-[13px] border-t border-[#d9dad5]/60 dark:border-[#2d3942]/60">
                {t.artEx}
              </p>
            </div>
            {/* Subtle corner triangle matching slide art */}
            <div className="absolute top-4 end-4 opacity-15 pointer-events-none text-[#1f5163] dark:text-[#6fb3c6]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12,2 22,22 2,22" />
              </svg>
            </div>
          </div>
        </div>

        {/* Read Checkbox */}
        <label className="flex items-center gap-2.5 pt-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={read}
            onChange={(e) => onToggleRead(e.target.checked)}
            className="w-5 h-5 rounded border-[#d9dad5] dark:border-[#2d3942] text-[#1f5163] focus:ring-[#1f5163]"
          />
          <span className="text-xs sm:text-sm font-medium text-[#1c2830] dark:text-[#e8ebe9]">
            {t.readChk}
          </span>
        </label>
      </div>

      {/* Interactive Worksheet (Participant Inputs) */}
      <div className="p-5 sm:p-7 rounded-xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] space-y-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#d9dad5] dark:border-[#2d3942] pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-[#1c2830] dark:text-[#e8ebe9]">
              {t.wsTitle}
            </h3>
            <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
              {t.wsDesc}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowExample(!showExample)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#d9dad5] dark:border-[#2d3942] text-[#1f5163] dark:text-[#6fb3c6] hover:bg-[#f4f4f1] dark:hover:bg-[#12171b]"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>{showExample ? t.exBtnHide : t.exBtnShow}</span>
          </button>
        </div>

        {showExample && (
          <div className="p-3.5 rounded-lg bg-[#e3eef1] dark:bg-[#1b2c32] text-xs text-[#1c2830] dark:text-[#e8ebe9]">
            <b className="text-[#1f5163] dark:text-[#6fb3c6]">{t.exTitle} </b>
            <span>{t.exText}</span>
          </div>
        )}

        {/* 1. Sprint User Story */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
            {t.storyL}
          </label>
          <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mb-2">
            {t.storyHint}
          </p>
          <input
            type="text"
            value={story}
            onChange={(e) => onChangeStory(e.target.value)}
            placeholder={t.storyPh}
            className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9] focus:border-[#1f5163]"
          />
        </div>

        {/* 2. Background */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
            {t.bgL}
          </label>
          <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mb-2">
            {t.bgHint}
          </p>
          <textarea
            rows={3}
            value={bg}
            onChange={(e) => onChangeBg(e.target.value)}
            className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9] focus:border-[#1f5163]"
          />
        </div>

        {/* 3. Primary Business Objective */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
            {t.objL}
          </label>
          <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mb-2">
            {t.objHint}
          </p>
          <input
            type="text"
            value={obj}
            onChange={(e) => onChangeObj(e.target.value)}
            className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9] focus:border-[#1f5163]"
          />
        </div>

        {/* 4. Related Business Questions */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
            {t.rqL}
          </label>
          <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0] mb-2">
            {t.rqHint}
          </p>

          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newQ}
              onChange={(e) => setNewQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (newQ.trim()) {
                    onAddQ(newQ.trim());
                    setNewQ('');
                  }
                }
              }}
              placeholder={lang === 'fa' ? 'یک پرسش بنویسید و افزودن را بزنید...' : 'Type a question and press Add...'}
              className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9]"
            />
            <button
              type="button"
              onClick={() => {
                if (newQ.trim()) {
                  onAddQ(newQ.trim());
                  setNewQ('');
                }
              }}
              className="px-4 py-2 text-xs font-medium rounded-lg bg-[#1f5163] text-white dark:bg-[#6fb3c6] dark:text-[#0f1a1e] hover:opacity-90"
            >
              {t.add}
            </button>
          </div>

          <ul className="space-y-2">
            {qs.map((qItem, idx) => (
              <li key={idx} className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b] text-xs sm:text-sm">
                <span className="font-semibold text-[#1f5163] dark:text-[#6fb3c6] shrink-0">
                  {idx + 1}.
                </span>
                <span className="flex-1 text-[#1c2830] dark:text-[#e8ebe9]">{qItem}</span>
                <button
                  type="button"
                  onClick={() => onRemoveQ(idx)}
                  className="text-[#b3432f] p-1 hover:opacity-80"
                  title={t.rm}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Understanding Quiz */}
      <div className="p-5 sm:p-7 rounded-xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] space-y-4">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-[#1c2830] dark:text-[#e8ebe9]">
            {t.quizTitle}
          </h3>
          <p className="text-xs text-[#5d6b73] dark:text-[#9aa8b0]">
            {t.quizDesc}
          </p>
        </div>

        <div className="space-y-4">
          {quizzes.map((quiz, qIdx) => {
            const chosen = ans[qIdx];
            const isAnswered = chosen !== undefined;
            const isCorrect = chosen === quiz.correct;

            return (
              <div key={qIdx} className="p-3.5 rounded-lg bg-[#f4f4f1] dark:bg-[#12171b] border border-[#d9dad5] dark:border-[#2d3942] space-y-2">
                <p className="font-semibold text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9]">
                  {qIdx + 1}. {quiz.q}
                </p>

                <div className="space-y-1.5">
                  {quiz.opts.map((opt, oIdx) => {
                    let optStyle = 'border-[#d9dad5] dark:border-[#2d3942] bg-[#ffffff] dark:bg-[#1a2228] text-[#1c2830] dark:text-[#e8ebe9] hover:border-[#1f5163]';
                    if (isAnswered) {
                      if (oIdx === quiz.correct) {
                        optStyle = 'border-[#2f7d5b] bg-[#e3f2ea] text-[#2f7d5b] dark:bg-[#173025] dark:text-[#63c496] font-medium';
                      } else if (chosen === oIdx) {
                        optStyle = 'border-[#b3432f] bg-[#f9e6e1] text-[#b3432f] dark:bg-[#3a1f19] dark:text-[#ee8f7a]';
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={isAnswered}
                        onClick={() => onSelectAns(qIdx, oIdx)}
                        className={`w-full text-start p-2.5 rounded-lg border text-xs sm:text-sm transition-colors ${optStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <p className={`text-xs mt-2 ${isCorrect ? 'text-[#2f7d5b] dark:text-[#63c496]' : 'text-[#b3432f] dark:text-[#ee8f7a]'}`}>
                    {isCorrect ? (lang === 'fa' ? '✓ درست است: ' : '✓ Correct: ') : (lang === 'fa' ? '✕ نادرست: ' : '✕ Not quite: ')}
                    {quiz.why}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Prominent Next Page Button */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#e3eef1] dark:bg-[#1b2c32] border border-[#1f5163]/20 flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[#1f5163] dark:text-[#6fb3c6] block">
            {lang === 'fa' ? 'گام بعدی در کتاب کار' : 'Next Workbook Step'}
          </span>
          <span className="text-xs sm:text-sm text-[#1c2830] dark:text-[#e8ebe9] font-medium">
            {t.nextPageBtn}
          </span>
        </div>

        <button
          type="button"
          onClick={onGoToPage2}
          className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-[#0a7b97] text-white hover:bg-[#08677e] transition-colors shadow-xs"
        >
          <span>{lang === 'fa' ? 'ورود به صفحه ۲' : 'Go to Page 2'}</span>
          {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
