# Implementation Plan: 005 - Everyday, Family & Viral Lifestyle AI Domain Track (مسیر جامع کاربردهای روزمره، خانواده، خرید، سفر و ترندهای جذاب هوش مصنوعی)

**Branch**: `005-everyday-general-track` | **Date**: 2026-10-25 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/005-everyday-general-track/spec.md`

## Summary

افزودن شاخه بالادستی سوم تحت عنوان «کاربردهای عمومی، خانواده، سبک زندگی و ترندهای جذاب» (`GENERAL_EVERYDAY`) در کنار دو شاخه عمرانی و نفتی. این قابلیت شامل سوئیچر سه‌گانه هدر با ماندگاری در `localStorage`، نمونه‌های پرامپت فاز صفر ویژه والدین، ترفندهای خانگی، مذاکره روزمره و ترندهای وایرال، سناریوی ادامه‌دار ۶ فاز CPMAI بر محور اقتصاد خانوار، سبد خرید و پس‌انداز سفر، ۸ دیسیپلین شغلی/فردی جدید و سازگاری کامل با مودال‌های انتخاب و پنل مدیریت ادمین است.

## Technical Context

**Language/Version**: TypeScript 5.7+ / React 19 / Node.js 20+  
**Primary Dependencies**: Tailwind CSS v4, Lucide React, Motion  
**Storage**: `localStorage` (`cpmai_industry_track`, `cpmai_selected_discipline`) با تطابق امن  
**Testing**: `npm run lint` (`tsc --noEmit`) و `npm run build` (`vite build`)  
**Target Platform**: مرورگرهای مدرن دسکتاپ و موبایل با پشتیبانی کامل از چینش راست به چپ (RTL)  
**Project Type**: پلتفرم تعاملی آموزشی هوش مصنوعی استاندارد CPMAI  
**Performance Goals**: سوییچ آنی زیر ۵۰ میلی‌ثانیه بین سه مسیر بدون رفرش صفحه  
**Constraints**: بدون شکست در تایپ‌های قبلی، بدون ایجاد خطای رندر در دیسیپلین‌های ذخیره‌شده کاربران قدیمی

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| اصل قانون اساسی | وضعیت انطباق | یادداشت ارزیابی |
| :--- | :---: | :--- |
| **I. Zero Compiler Errors** | ✅ Passed | تعریف `GENERAL_EVERYDAY` به صورت کامل در تایپ‌ها انجام شده و `tsc --noEmit` بدون خطا پاس می‌شود. |
| **II. Anti-Monolith & Modularity** | ✅ Passed | داده‌های تفصیلی در رجیستری‌های `src/data/` مستقر شده و کامپوننت‌های UI ماژولار باقی می‌مانند. |
| **III. Domain Track Isolation** | ✅ Passed | هر سه مسیر دارای داده‌های کاملاً تفکیک‌شده و مستقل در `DOMAIN_PHASE_EXAMPLES` هستند. |
| **IV. Bilingual & RTL Typography** | ✅ Passed | کلیه عناوین، پرامپت‌ها و کیس‌استادی‌ها دارای متون فارسی و انگلیسی با چینش راست به چپ طبیعی هستند. |
| **V. Serverless Resilience** | ✅ Passed | ذخیره‌سازی انتخاب‌ها در `localStorage` به صورت مستقل از وضعیت سرور کار می‌کند. |

## Project Structure

### Documentation (this feature)

```text
specs/005-everyday-general-track/
├── spec.md              # سند مشخصات تفصیلی نیازمندی‌ها
├── plan.md              # این سند (برنامه جامع پیاده‌سازی)
├── research.md          # یافته‌های فاز صفر و تصمیمات فنی
├── data-model.md        # ساختار مدل داده و تایپ‌ها
├── quickstart.md        # راهنمای اجرای آزمون‌ها و سناریوهای تایید
├── contracts/           # قراردادهای رابط و رجیستری
│   ├── track-switcher.contract.md
│   └── domain-examples.contract.md
└── checklists/
    └── requirements.md  # چک‌لیست اعتبارسنجی کیفیت مشخصات
```

### Source Code Targets

```text
src/
├── types/
│   ├── industryTrack.ts             # گسترش IndustryTrackId و 8 دیسیپلین جدید
│   └── lms.ts                       # گسترش trackId در تایپ‌های کاربر و کلاس
├── data/
│   ├── domainTrackExamples.ts       # اضافه کردن سناریوی ۶ فاز اقتصاد خانوار و سفر
│   └── disciplineExamplesRegistry.ts# ثبت ۸ دیسیپلین خانواده، سبک زندگی و هایپ
├── components/
│   ├── industry/
│   │   ├── IndustryTrackSwitcher.tsx      # ارتقا به سوئیچر سه‌گانه واکنش‌گرا
│   │   ├── IndustryTrackSelectorModal.tsx # مقایسه ۳ ستونه در مودال معرفی
│   │   └── DisciplineSelectorModal.tsx    # تب سوم برای ۸ دیسیپلین سبک زندگی
│   ├── Page0LlmFundamentals.tsx           # تطبیق پرامپت‌های فاز صفر با مسیر عمومی
│   └── admin/
│       └── AdminControlCenterModal.tsx    # پشتیبانی از دیسیپلین‌های جدید در فیلتر ادمین
```

## Implementation Phases

### Phase 1: Core Type System & Track Definitions
1. ویرایش `src/types/industryTrack.ts`:
   - به‌روزرسانی `IndustryTrackId = 'CIVIL_INFRA' | 'ENERGY_PETRO' | 'GENERAL_EVERYDAY'`.
   - اضافه کردن کلید `GENERAL_EVERYDAY` به آبجکت `INDUSTRY_TRACKS` با عنوان فارسی «سبک زندگی، خانواده و کاربردهای روزمره هوش مصنوعی»، آیکون `Sparkles` و رنگ زمردی/بنفش.
   - افزودن ۸ دیسیپلین عمومی به تایپ `DisciplineId`.
   - به‌روزرسانی تابع `getSavedDiscipline` برای پشتیبانی از فال‌بک پیش‌فرض عمومی `general_household_finance`.
2. ویرایش `src/types/lms.ts` برای اضافه کردن `'GENERAL_EVERYDAY'` به `trackId`.

### Phase 2: Domain Phase Examples & Discipline Registry
1. ویرایش `src/data/domainTrackExamples.ts`:
   - تدوین داده‌های کامل ۶ فاز CPMAI برای کلید `GENERAL_EVERYDAY` بر مبنای سناریوی «اقتصاد هوشمند خانوار، بهینه‌سازی سبد خرید و پس‌انداز سفر».
2. ویرایش `src/data/disciplineExamplesRegistry.ts`:
   - تعریف ۸ آیتم دیسیپلین جدید با پرامپت‌های جذاب، کاربردی، ملموس و خودمانی.

### Phase 3: Switcher & Modal Components
1. ویرایش `src/components/industry/IndustryTrackSwitcher.tsx`:
   - افزودن دکمه سوم با گرادیانت زمردی/بنفش، آیکون `Sparkles` و عنوان ریسپانسیو.
2. ویرایش `src/components/industry/IndustryTrackSelectorModal.tsx`:
   - بازطراحی چیدمان مودال به ۳ ستون متعادل با نمایش کارت مسیر عمومی.
3. ویرایش `src/components/industry/DisciplineSelectorModal.tsx`:
   - فعال‌سازی تب سوم برای دیسیپلین‌های روزمره و سبک زندگی.

### Phase 4: Module 0 & Phase Prompts Adaptation
1. ویرایش `src/components/Page0LlmFundamentals.tsx`:
   - سوئیچ پرامپت‌های نمونه RCTO و کارت‌های آماده به موضوعات خانواده، آشپزی با یخچال، آموزش فرزند و مذاکره روزمره در زمان فعال بودن ترک عمومی.

### Phase 5: Admin Panel & Verification
1. به‌روزرسانی فیلتر دیسیپلین‌ها در `AdminControlCenterModal.tsx` جهت نمایش بخش سوم دیسیپلین‌های عمومی.
2. اجرای `npm run lint` (`tsc --noEmit`) و `npm run build`.
3. بررسی مرورگر زنده و تایید تعاملی سوئیچر و محتواها.
