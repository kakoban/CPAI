# Tasks: پوسته گلس مات (Frosted Glassmorphism) سایدبار و مدال

**Input**: Design documents from `specs/003-frosted-glass-ui/`
**Prerequisites**: `spec.md`, `plan.md`, `research.md`, `data-model.md`, `quickstart.md`

## Phase 1: Setup & CSS Design Tokens (Shared Infrastructure)

**Purpose**: تعریف و استقرار توکن‌های CSS گلس مات در ریشه استایل‌ها

- [ ] T001 [P] استقرار متغیرهای `--glass`، `--glass-line`، `--tile` و `--sheen` در لایت و دارک در `src/index.css`
- [ ] T002 [P] ایجاد کلاس‌های کمکی `.frosted-glass-surface` و `.frosted-glass-tile` در `src/index.css`

---

## Phase 2: User Story 1 - پوسته گلس مات سایدبار (Priority: P1) [MVP]

**Goal**: تبدیل سایدبار به پنل شیشه‌ای مات عمیق با بلور ۲۶ پیکسلی و لبه نوری شفاف

- [ ] T003 [US1] اتصال کانتینر `<aside>` در `src/components/navigation/WorkspaceSidebar.tsx` به کلاس‌های گلس مات و حذف بردرهای تیره
- [ ] T004 [US1] تنظیم هدر و فوتر سایدبار برای داشتن پس‌زمینه شفاف شیشه‌ای با هایلایت داخلی
- [ ] T005 [US1] اعمال پس‌زمینه نیمه‌شفاف کاشی‌ها روی دکمه‌های آکاردئون فازها در سایدبار

**Checkpoint**: سایدبار دارای افکت شیشه‌ای مات و یکپارچه با محتوای پس‌زمینه است.

---

## Phase 3: User Story 2 - کادر دیالوگ و کاشی‌های مدال دیسیپلین (Priority: P2)

**Goal**: اعمال گلس مات روی پنجره دیالوگ و کارت‌های انتخاب دیسیپلین و رده سازمانی

- [ ] T006 [P] [US2] اعمال کلاس `.frosted-glass-surface` روی دیالوگ اصلی در `src/components/industry/DisciplineSelectorModal.tsx`
- [ ] T007 [P] [US2] تبدیل کاشی‌های گزینه‌های دیسیپلین و رده‌ها به سطوح نیمه‌شفاف شیشه‌ای با افکت هاور ملایم
- [ ] T008 [US2] شفاف‌سازی هدر و فوتر مدال و اتصال به لبه‌های نوری شیشه‌ای

**Checkpoint**: دیالوگ انتخاب دیسیپلین و رده سازمانی ۱۰۰٪ با فایل طراحی مرجع مطابقت دارد.

---

## Phase 4: Polish & Verification

**Purpose**: اعتبارسنجی صفر خطای کامپایلر، بیلد و عملکرد بصری

- [ ] T009 اجرای `npm run lint` (`tsc --noEmit`) و اطمینان از سلامت تایپ‌ها
- [ ] T010 اجرای `npm run build` و اعتبارسنجی بیلد نهایی
- [ ] T011 تست بصری زنده در مرورگر پیش‌نمایش و تایید انکسار نوری
