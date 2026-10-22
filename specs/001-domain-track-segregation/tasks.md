# Tasks: تفکیک ساختاری و محتوایی دامنه‌های نفت‌و‌گاز و مگاپروژه‌های عمرانی

**Input**: Design documents from `specs/001-domain-track-segregation/`
**Prerequisites**: `spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/domain-content.contract.ts`

## Phase 1: Setup & Data Model Definition

**Purpose**: آماده‌سازی تایپ‌ها و اینترفیس‌های داده‌ای

- [ ] T001 [P] تکمیل تایپ‌های `DomainPhaseExample` و `DomainTrackExamplesRegistry` در `src/types/industryTrack.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: ایجاد مخزن متمرکز داده‌های معتبر و جایگزینی مثال‌های بانکی

- [ ] T002 ایجاد ماژول `src/data/domainTrackExamples.ts` شامل مثال‌های واقعی مترو، تونل‌سازی TBM، نشریه ۴۳۱۱ برای `CIVIL_INFRA` و برج تقطیر، P&ID، SCADA و فلرینگ برای `ENERGY_PETRO`
- [ ] T003 پیاده‌سازی متدهای کمکی `getDomainPhaseContent` و `getDomainExampleNote` در `src/data/domainTrackExamples.ts`

**Checkpoint**: پایه داده‌های دامنه‌ای آماده شد — ورود به پیاده‌سازی داستان‌های کاربر

---

## Phase 3: User Story 1 - سوئیچینگ شفاف و تفکیک بلادرنگ کانتکست دامنه‌ها (Priority: P1) [MVP]

**Goal**: بازتاب آنی مثال‌های نفت‌وگاز یا عمران در فازهای CPMAI و صفحات کلیدی متناسب با انتخاب کاربر

- [ ] T004 [US1] یکپارچه‌سازی `src/data/cpmaiPhases.ts` با متد دریافت مثال‌های متناظر با دامنه
- [ ] T005 [US1] انتقال `industryTrack` از `src/App.tsx` به کامپوننت `PhaseView.tsx` و نمایش کارت سناریوی پیش‌فرض هر دامنه
- [ ] T006 [US1] تزریق `industryTrack` به `src/components/Page1BusinessUnderstanding.tsx` و جایگزینی مثال‌های بانکی/خودپرداز با مثال‌های اختصاصی هر دامنه
- [ ] T007 [US1] تزریق `industryTrack` به صفحات `Page2ProblemIteration.tsx` تا `Page5ExpectedRoi.tsx` جهت نمایش مسائل و ROI بومی هر صنعت
- [ ] T008 [US1] تست تعاملی سوئیچر دامنه در ناوبری و هدر جهت اطمینان از تغییر بلادرنگ متون

**Checkpoint**: داستان کاربر ۱ تکمیل شد و MVP تفکیک دامنه‌ها فعال است.

---

## Phase 4: User Story 2 - تفکیک محتوایی پرامپت‌ها و اسناد نمونه در کارگاه‌ها (Priority: P2)

**Goal**: نمایش مستقل اسناد، قراردادها و دیتاست‌ها در کارگاه NotebookLM و کتابخانه پرامپت

- [ ] T009 [P] [US2] تفکیک قراردادهای نمونه در `src/data/engineering_sample_contracts.ts` (نشریه ۴۳۱۱ عمرانی در برابر قراردادهای EPC نفت و گاز)
- [ ] T010 [P] [US2] تفکیک دیتاست‌های نمونه در `src/data/engineering_sample_datasets.ts` (داده‌های ژئوتکنیک و نشست زمین در برابر تلمتری سنسورهای فشار و دما)
- [ ] T011 [P] [US2] تفکیک اسناد نمونه کارگاه NotebookLM در `src/data/notebooklm_sample_documents.ts`
- [ ] T012 [US2] به‌روزرسانی `src/components/NotebookLmWorkshop.tsx` جهت فیلتر و رندر اسناد بر پایه دامنه فعال

**Checkpoint**: داستان کاربر ۲ تکمیل شد؛ تمام داده‌ها و اسناد کارگاه تخصصی شدند.

---

## Phase 5: User Story 3 - ارزیابی و آزمون سطح‌سنجی متناسب با دامنه تخصصی (Priority: P3)

**Goal**: انطباق سناریوهای کوییز تعیین سطح با زبان فنی رشته شرکت‌کننده

- [ ] T013 [US3] دسته‌بندی و الصاق تگ دامنه به سوالات سناریومحور در `src/data/placement_quiz_data.ts`
- [ ] T014 [US3] ارتقای کارنامه در `src/components/InteractivePlacementQuiz.tsx` جهت نمایش نشان و ارزیابی در حوزه مهندسی مربوطه

**Checkpoint**: هر سه داستان کاربر کاملاً کارکردی هستند.

---

## Phase 6: Polish & Verification

**Purpose**: اطمینان از سلامت کامل بیلد، تایپ‌ها و تجربه کاربری

- [ ] T015 بررسی کامل خطاهای تایپ‌اسکریپت با اجرای `npm run lint` (`tsc --noEmit`)
- [ ] T016 بیلد نهایی پروژه با `npm run build` و اطمینان از عدم شکست باندهای استاتیک
- [ ] T017 اجرای چک‌لیست اعتبارسنجی [quickstart.md](./quickstart.md)
