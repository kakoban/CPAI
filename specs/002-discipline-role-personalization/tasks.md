# Tasks: شخصی‌سازی محتوا بر اساس دیسیپلین، رده سازمانی و علایق تخصصی

**Input**: Design documents from `specs/002-discipline-role-personalization/`
**Prerequisites**: `spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/discipline-content.contract.ts`

## Phase 1: Setup & Type Modeling (Shared Infrastructure)

**Purpose**: تعریف تایپ‌های استاندارد ۱۶ دیسیپلین و رده‌های سازمانی

- [ ] T001 [P] تعریف `DisciplineId`، `DisciplineMetadata`، و `EngineeringRoleId` در `src/types/industryTrack.ts`
- [ ] T002 [P] پیاده‌سازی متدهای خواندن و ذخیره دیسیپلین و رده کاربر (`getSavedDiscipline`, `saveDiscipline`, `getSavedRole`, `saveRole`) در `src/types/industryTrack.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: ایجاد رجیستری متمرکز داده‌های ۱۶ دیسیپلین با شاخص‌های OBS دو هلدینگ

- [ ] T003 ایجاد ماژول `src/data/disciplineExamplesRegistry.ts` شامل متادیتای کامل ۱۶ دیسیپلین (۸ دیسیپلین عمران و ۸ دیسیپلین پتروشیمی)
- [ ] T004 پیاده‌سازی متد `getDisciplineExampleContent(disciplineId, roleId)` برای واکشی سناریو، صورت مسئله، معیارهای موفقیت و تحلیل ROI متناظر هر دیسیپلین

**Checkpoint**: پایه داده‌های دیسیپلین‌ها آماده شد — ورود به پیاده‌سازی UI و یکپارچه‌سازی

---

## Phase 3: User Story 1 - انتخاب و مدیریت پروفایل دیسیپلین و رده سازمانی (Priority: P1) [MVP]

**Goal**: امکان انتخاب سریع دیسیپلین و رده سازمانی در UI با ماندگاری در مرورگر

- [ ] T005 [P] [US1] ساخت کامپوننت `src/components/industry/DisciplineSelectorModal.tsx` با قابلیت نمایش کارت‌های تفکیک‌شده دیسیپلین‌ها، آیکون‌ها و شاخص‌های OBS
- [ ] T006 [P] [US1] ساخت کامپوننت `src/components/industry/DisciplineBadge.tsx` برای نمایش برچسب دیسیپلین فعال در هدر و نوار ابزار با قابلیت باز کردن مودال انتخاب
- [ ] T007 [US1] یکپارچه‌سازی استیت دیسیپلین و رده در `src/App.tsx` و اتصال سوئیچر دامنه‌ها به تغییر هماهنگ دیسیپلین
- [ ] T008 [US1] درج `DisciplineBadge` در هدر اصلی و نوار بالای کارگاه

**Checkpoint**: کاربر می‌تواند دیسیپلین و رده خود را انتخاب کند و وضعیت در بالای صفحه نمایان است.

---

## Phase 4: User Story 2 - شخصی‌سازی آنی مثال‌ها، تمرین‌ها و کاربرگ‌ها (Priority: P2)

**Goal**: تزریق محتوای سفارشی به صفحات ۲۲گانه بر اساس دیسیپلین فعال

- [ ] T009 [US2] اتصال کامپوننت‌های `Page1BusinessUnderstanding.tsx` و `Page2ProblemIteration.tsx` به `activeDiscipline` و نمایش خودکار مسائل همان واحد (پایپینگ، TBM، کلیم، فرآیند)
- [ ] T010 [US2] اتصال کامپوننت‌های `Page3SuccessCriteria.tsx`، `Page4CostBenefit.tsx` و `Page5ExpectedRoi.tsx` به شاخص‌های کمّی بومی دیسیپلین
- [ ] T011 [US2] به‌روزرسانی متن دکمه‌های «پر کردن نمونه» متناسب با نام دیسیپلین انتخاب‌شده

**Checkpoint**: تمام مثال‌های صفحات به صورت بلادرنگ مطابق دیسیپلین انتخابی مهندس کاستومایز می‌شوند.

---

## Phase 5: User Story 3 - سفارشی‌سازی کارگاه‌ها و آزمون سطح‌سنجی (Priority: P3)

**Goal**: اولویت‌بندی اسناد مهندسی و سوالات تخصصی بر مبنای دیسیپلین

- [ ] T012 [P] [US3] نگاشت اسناد مهندسی به شناسه‌های دیسیپلین در `src/data/notebooklm_engineering_guide.ts`
- [ ] T013 [US3] بازتاب دیسیپلین انتخابی در کارنامه و نشان سطح‌سنجی `src/components/InteractivePlacementQuiz.tsx`

---

## Phase 6: Polish & Verification

**Purpose**: اعتبارسنجی صفر خطای کامپایلر و پایداری عملکرد

- [ ] T014 اجرای `npm run lint` (`tsc --noEmit`) و اطمینان از تایپ ۱۰۰٪ معتبر
- [ ] T015 اجرای `npm run build` و اعتبارسنجی باندهای خروجی
- [ ] T016 اجرای سناریوی تست [quickstart.md](./quickstart.md)
