# Implementation Plan: 005 - Everyday, Family & Viral Lifestyle AI Domain Track (مسیر جامع کاربردهای روزمره، خانواده، خرید، سفر و ترندهای جذاب هوش مصنوعی)

**Branch**: `005-everyday-general-track` | **Date**: 2026-10-25 (Updated 2026-11-08) | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/005-everyday-general-track/spec.md` with explicit emphasis on 3 domain tracks (Civil/Infra, Oil/Gas, Everyday/Family), authentic vibe authorization per discipline without jargon cross-contamination, and strict no-push policy without coordination.

## Summary

افزودن شاخه بالادستی سوم تحت عنوان «کاربردهای عمومی، خانواده، سبک زندگی و ترندهای جذاب» (`GENERAL_EVERYDAY`) در کنار دو شاخه مگاپروژه‌های عمرانی (`CIVIL_INFRA`) و صنایع نفت و گاز (`ENERGY_PETRO`). این طرح تضمین می‌کند که تمامی مثال‌ها، پرامپت‌ها، نقش‌ها (Personas)، سناریوهای RCTO و خروجی‌ها در هر یک از ۳ زمینه، بالاترین دقت و هماهنگی کامل با دیسیپلین و ساختار انتخابی را داشته باشند و هیچ‌گونه تداخل واژگانی (مانند نفوذ واژگان کارگاهی و شیفت به موضوعات خانوادگی یا بالعکس) رخ ندهد. همچنین سوئیچر سه‌گانه هدر، سناریوی ادامه‌دار ۶ فاز CPMAI اقتصاد خانوار و سفر، ۸ دیسیپلین تخصصی روزمره، و انطباق کامل پنل مدیریت پیاده‌سازی می‌شود.

## Technical Context

**Language/Version**: TypeScript 5.7+ / React 19 / Node.js 20+  
**Primary Dependencies**: Tailwind CSS v4, Lucide React, Motion  
**Storage**: `localStorage` (`cpmai_selected_industry_track`, `cpmai_selected_discipline_id`) با اعتبارسنجی امن و فال‌بک خودکار  
**Testing**: `npm run lint` (`tsc --noEmit`) و `npm run build` (`vite build`)  
**Target Platform**: مرورگرهای مدرن دسکتاپ و موبایل با پشتیبانی کامل از چینش راست به چپ (RTL)  
**Project Type**: پلتفرم تعاملی آموزشی هوش مصنوعی استاندارد CPMAI  
**Performance Goals**: سوییچ آنی زیر ۵۰ میلی‌ثانیه بین سه مسیر بدون رفرش صفحه  
**Domain Vibe Enforcement**:
- `CIVIL_INFRA`: واژگان تخصصی کارگاهی، حفاری TBM، ابنیه، نشست، استانداردهای نشریه ۴۳۱۱ و ۵۵، جدول اقدام اصلاحی کارگاه.
- `ENERGY_PETRO`: واژگان تخصصی پالایشگاهی، شبیه‌سازی فرآیند، DCS، هیدروتست، ایمنی HAZOP/SIL، فیدیک نقره‌ای، ماتریس ایمنی فرآیندی.
- `GENERAL_EVERYDAY`: ادبیات گرم، صمیمی، کاربردی، ملموس و خودمانی، تربیت مثبت، ۵۰/۳۰/۲۰ بودجه خانوار، صفر دورریز غذا، بدون اصطلاحات کارگاهی یا شرکتی.  
**Strict Policy Constraint**: عدم اجرای دستور `git push` یا انتشار در ریموت بدون هماهنگی و تایید صریح کاربر.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| اصل قانون اساسی | وضعیت انطباق | یادداشت ارزیابی |
| :--- | :---: | :--- |
| **I. Zero Compiler Errors** | ✅ Passed | گسترش کامل `IndustryTrackId` و `DisciplineId` با حفظ ۱۰۰٪ پوشش تایپ‌ها و پاس‌شدن `tsc --noEmit`. |
| **II. Anti-Monolith & Modularity** | ✅ Passed | تفکیک دقیق داده‌ها در `src/data/domainTrackExamples.ts` و `src/data/disciplineExamplesRegistry.ts`. |
| **III. Domain Track Isolation** | ✅ Passed | هر ۳ مسیر دارای داده‌ها، متاداده‌ها، کیس‌استادی‌ها و پرامپت‌های کاملاً ایزوله و بدون تداخل هستند. |
| **IV. Bilingual & RTL Typography** | ✅ Passed | تمامی متون، پرامپت‌ها و عناوین به دو زبان فارسی و انگلیسی با واژگان روان، طبیعی و چینش RTL تدوین شده‌اند. |
| **V. Serverless Resilience** | ✅ Passed | مدیریت ماندگاری انتخاب‌ها در `localStorage` با فال‌بک محلی در زمان قطعی یا آفلاین بودن سرور. |

## Project Structure

### Documentation (this feature)

```text
specs/005-everyday-general-track/
├── spec.md              # سند مشخصات تفصیلی نیازمندی‌ها
├── plan.md              # این سند (برنامه جامع پیاده‌سازی)
├── research.md          # یافته‌های فاز صفر، تصمیمات معماری و تفکیک وایب ۳ مسیر
├── data-model.md        # ساختار مدل داده، تایپ‌ها و ارکان RCTO
├── quickstart.md        # راهنمای اجرای آزمون‌ها، سناریوهای تایید و هشدار عدم پوش
├── contracts/           # قراردادهای رابط و رجیستری
│   ├── track-switcher.contract.md
│   ├── domain-examples.contract.md
│   ├── discipline-prompt-showcase.contract.md
│   └── rcto-pillars.contract.md
└── checklists/
    └── requirements.md  # چک‌لیست اعتبارسنجی کیفیت مشخصات
```

### Source Code Targets

```text
src/
├── types/
│   ├── industryTrack.ts             # گسترش IndustryTrackId و 8 دیسیپلین جدید و کلیدهای استوریج
│   └── lms.ts                       # گسترش trackId در تایپ‌های کاربر و کلاس
├── data/
│   ├── domainTrackExamples.ts       # اضافه کردن سناریوی ۶ فاز اقتصاد خانوار و سفر
│   └── disciplineExamplesRegistry.ts# ثبت متاداده و سناریوی ۲۴ دیسیپلین با پرامپت‌ساز تفکیک‌شده بر اساس وایب
├── components/
│   ├── industry/
│   │   ├── IndustryTrackSwitcher.tsx      # ارتقا به سوئیچر سه‌گانه واکنش‌گرا
│   │   ├── IndustryTrackSelectorModal.tsx # مقایسه ۳ ستونه در مودال معرفی
│   │   └── DisciplineSelectorModal.tsx    # تب سوم برای ۸ دیسیپلین سبک زندگی
│   ├── Page0LlmFundamentals.tsx           # تطبیق ارکان ۴گانه RCTO و پرامپت‌ها بر مبنای ترک فعال
│   └── admin/
│       └── AdminControlCenterModal.tsx    # پشتیبانی از دیسیپلین‌های جدید در فیلتر ادمین
```

## Implementation Phases

### Phase 1: Core Type System & Track Definitions
1. به‌روزرسانی `src/types/industryTrack.ts`:
   - `IndustryTrackId = 'CIVIL_INFRA' | 'ENERGY_PETRO' | 'GENERAL_EVERYDAY'`.
   - پیکربندی کامل `INDUSTRY_TRACKS.GENERAL_EVERYDAY` با پالت زمردی-بنفش، آیکون `Sparkles`، استانداردهای خانواده و یونسکو، و کیس‌استادی اقتصاد خانوار.
   - اضافه کردن ۸ دیسیپلین عمومی به `DisciplineId` و به‌روزرسانی توابع کمکی `getSavedDiscipline` و `getSavedIndustryTrack`.
2. به‌روزرسانی `src/types/lms.ts` برای پذیرش `GENERAL_EVERYDAY` در مدل‌های کلاس و کاربر.

### Phase 2: Domain Phase Examples & Authentic Discipline Registry
1. ویرایش `src/data/domainTrackExamples.ts`:
   - ثبت کامل داده‌های فازهای ۱ تا ۶ برای `GENERAL_EVERYDAY` بر محور سناریوی «اقتصاد هوشمند خانوار، خرید بهینه و برنامه‌ریزی سفر».
2. ویرایش `src/data/disciplineExamplesRegistry.ts`:
   - تکمیل متاداده و محتوای تفصیلی هر ۲۴ دیسیپلین (۸ ابنیه، ۸ پتروشیمی، ۸ روزمره).
   - اصلاح اساسی تابع `getDisciplinePromptShowcase` جهت استفاده از پرامپت‌ساز هوشمند بر مبنای ترک و دیسیپلین، با پرهیز کامل از کاربرد اصطلاحات کارگاهی در دیسیپلین‌های عمومی و حفظ اصالت فنی مگاپروژه‌های عمرانی و نفتی.

### Phase 3: Module 0 Track-Adaptive RCTO 4-Pillars & Discipline Prompt Showcase
1. ویرایش `src/components/Page0LlmFundamentals.tsx`:
   - اصلاح مقداردهی پیش‌فرض `effectiveDiscipline` در صورت فعال بودن ترک عمومی.
   - افزودن آبجکت ارکان چهارگانه RCTO تطبیق‌پذیر با ترک فعال (`TRACK_RCTO_PILLARS`).
   - اتصال کارت‌های ۴ رکن (Role, Context, Task, Output) به داده‌های متناسب با ترک (ابنیه/مترو در ابنیه، پالایشگاه/HAZOP در نفت، سبد خرید/یخچال/سفر در روزمره).
   - غنی‌سازی کتابخانه پرامپت‌های ماژول صفر با مثال‌های کاربردی والدین، ترفندهای آشپزی خانگی، مذاکره روزمره و سناریوهای وایرال.

### Phase 4: Switcher & Modal Components
1. ویرایش `src/components/industry/IndustryTrackSwitcher.tsx`:
   - افزودن کلید سوم ریسپانسیو با تم زمردی/بنفش و آیکون `Sparkles` و نام‌گذاری کوتاه در موبایل.
2. ویرایش `src/components/industry/IndustryTrackSelectorModal.tsx`:
   - ارتقای مودال مقایسه به چیدمان ۳ ستونه همگن با کارت مجزای سبک زندگی.
3. ویرایش `src/components/industry/DisciplineSelectorModal.tsx`:
   - افزودن تب سوم ویژه ۸ دیسیپلین عمومی و سبک زندگی.

### Phase 5: Admin Panel & Verification
1. به‌روزرسانی دراپ‌داون فیلتر دیسیپلین‌ها در `src/components/admin/AdminControlCenterModal.tsx`.
2. اجرای کامل اعتبارسنجی بیلد: `npm run lint` (`tsc --noEmit`) و `npm run build`.
3. تست تعاملی مرورگر مطابق سناریوهای `quickstart.md`.

### Phase 6: Push Policy Compliance
- **عدم انجام هرگونه `git push` به مخزن راه دور بدون هماهنگی و تایید صریح کاربر.**

