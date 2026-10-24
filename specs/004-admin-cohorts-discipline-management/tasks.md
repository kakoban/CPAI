# Tasks: پنل ادمین و مدیریت دوره‌ها، اسلات‌های زمانی و دسته‌بندی دیسیپلین‌ها

**Input**: Design documents from `specs/004-admin-cohorts-discipline-management/`
**Prerequisites**: `spec.md`, `plan.md`, `research.md`, `data-model.md`, `quickstart.md`

## Phase 1: Setup & Data Model Refinement

**Purpose**: ارتقای اینترفیس‌های کلاس‌ها و کاربران در تایپ‌های سیستمی

- [ ] T001 [P] تکمیل `ClassEntity` با فیلدهای `organization`، `studentCount`، `testedCount` و برچسب بازه ۲ ساعته در `src/types/lms.ts`
- [ ] T002 [P] تکمیل `UserRegistryItem` با فیلدهای `disciplineId`، `roleId`، `trackId`، `classCode` و `classTitle` در `src/types/lms.ts`

---

## Phase 2: Backend API & Service Layer

**Purpose**: ایجاد روت‌های ذخیره نام سفارشی کلاس و بازخوانی آمار تجمیعی

- [ ] T003 پیاده‌سازی متد `updateClassInfo(classId, title, organization, isLeaderboardVisible)` در `src/services/lmsApi.ts`
- [ ] T004 پیاده‌سازی روت `/api/admin/classes/update` در `api/index.ts` برای به‌روزرسانی عنوان و سازمان کلاس در دیتابیس

---

## Phase 3: User Story 1 - مدیریت کلاس‌ها و نام‌گذاری پنجره‌های ۲ ساعته (Priority: P1) [MVP]

**Goal**: افزودن تب کلاس‌ها به پنل ادمین با قابلیت تغییر نام و نام‌گذاری سازمانی اسلات‌های خودکار

- [ ] T005 [US1] افزودن تب چهارم «مدیریت دوره‌ها و کلاس‌ها» (`cohorts`) به `src/components/admin/AdminControlCenterModal.tsx`
- [ ] T006 [US1] ساخت کامپوننت فرم تغییر نام کلاس و اسلات ۲ ساعته (شامل کد سیستمی، عنوان نمایشی، و نام سازمان)
- [ ] T007 [US1] دکمه سوئیچ بلادرنگ انتشار لیدربورد و مشاهده تعداد دانشجویان هر کلاس

**Checkpoint**: ادمین می‌تواند اسلات‌های ۲ ساعته ثبت‌نامی را مشاهده کرده و برای آنها نام رسمی فارسی تعیین کند.

---

## Phase 4: User Story 2 - دسته‌بندی و فیلتر کاربران بر اساس دیسیپلین‌های ۱۶گانه (Priority: P2)

**Goal**: ارتقای جدول کاربران با فیلترهای دیسیپلین، رده، و خروجی CSV دارای UTF-8 BOM

- [ ] T008 [US2] افزودن دراپ‌داون‌های فیلتر دیسیپلین (۱۶ مورد) و رده سازمانی به جدول کاربران در `AdminControlCenterModal.tsx`
- [ ] T009 [US2] نمایش تگ دیسیپلین و رده در ستون مشخصات کاربر
- [ ] T010 [US2] به‌روزرسانی تابع خروجی CSV جهت درج ستون‌های دیسیپلین، رده، سازمان و کد کلاس با کاراکتر BOM برای اکسل

**Checkpoint**: جدول کاربران به طور کامل بر اساس دیسیپلین‌ها و رده‌ها قابل تفکیک و استخراج است.

---

## Phase 5: Polish & Verification

**Purpose**: اعتبارسنجی صفر خطای کامپایلر، بیلد و عملکرد بصری

- [ ] T011 اجرای `npm run lint` (`tsc --noEmit`) و اطمینان از سلامت تایپ‌ها
- [ ] T012 اجرای `npm run build` و اعتبارسنجی بیلد نهایی
- [ ] T013 اجرای سناریوی تست [quickstart.md](./quickstart.md) در مرورگر
