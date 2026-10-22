# Implementation Plan: شخصی‌سازی محتوا بر اساس دیسیپلین، رده سازمانی و علایق تخصصی

**Branch**: `002-discipline-role-personalization` | **Date**: 2026-10-23 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/002-discipline-role-personalization/spec.md`

## Summary

پیاده‌سازی سازوکار تطبیق‌پذیری عمیق پلتفرم آموزشی با ۱۶ دیسیپلین رسمی استخراج‌شده از ساختار سازمانی (OBS) هلدینگ‌های راه و شهرسازی و پتروشیمی؛ شامل کامپوننت انتخابگر دیسیپلین، نشانگر دیسیپلین فعال در هدر، و رجیستری محتوای غنی‌شده برای شخصی‌سازی مثال‌ها در صفحات ۱ تا ۵ CPMAI.

## Technical Context

**Language/Version**: TypeScript 5.7+ / Node.js 20+ / React 19

**Primary Dependencies**: Lucide React, Tailwind CSS v4, Motion (Framer Motion)

**Storage**: LocalStorage (`cpmai_selected_discipline_id` و `cpmai_selected_engineering_role`)

**Testing**: `npm run lint` (`tsc --noEmit`) و تایید بیلد Vite

**Target Platform**: مرورگرهای وب دسکتاپ و موبایل با پشتیبانی کامل RTL

**Project Type**: سامانه تعاملی آموزش و ورک‌شاپ سازمانی

**Performance Goals**: سوئیچ زیر ۵۰ میلی‌ثانیه بدون بارگذاری شبکه

**Constraints**: صفر کتابخانه خارجی جدید؛ عدم تغییر منطق بنیادی فازهای ۲۲گانه

**Scale/Scope**: ۱۶ دیسیپلین، ۴ رده نقشی، صفحات ۱ تا ۵ و کارگاه اسناد

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| اصل قانون اساسی | وضعیت انطباق | یادداشت ارزیابی |
| :--- | :---: | :--- |
| **I. Zero Compiler Errors** | ✅ Passed | تعریف صریح تایپ‌ها در `src/types/industryTrack.ts` بدون استفاده از `any`. |
| **II. Anti-Monolith & Modularity** | ✅ Passed | استخراج دیتای دیسیپلین‌ها در فایل مجزای `src/data/disciplineExamplesRegistry.ts`. |
| **III. Dual-Track Domain Isolation** | ✅ Passed | ۸ دیسیپلین عمران و ۸ دیسیپلین پتروشیمی در چارچوب دامنه مادر خود ایزوله هستند. |
| **IV. Bilingual & RTL Typography** | ✅ Passed | تمامی عناوین دیسیپلین‌ها و مثال‌ها دوزبانه (فارسی/انگلیسی) با حروف‌چینی دقیق فارسی تدوین می‌شوند. |
| **V. Serverless Resilience** | ✅ Passed | انتخاب دیسیپلین کاملاً در کلاینت نگهداری می‌شود و قطعی سرور هیچ اثری بر آن ندارد. |

## Project Structure

### Documentation (this feature)

```text
specs/002-discipline-role-personalization/
├── plan.md              # این سند
├── research.md          # پژوهش فاز صفر
├── data-model.md        # مدل داده فاز یک
├── quickstart.md        # راهنمای تست سریع
├── contracts/
│   └── discipline-content.contract.ts
└── checklists/
    └── requirements.md
```

### Source Code Impact

```text
src/
├── types/
│   └── industryTrack.ts             # افزودن DisciplineId, DisciplineMetadata و RoleId
├── data/
│   └── disciplineExamplesRegistry.ts # بانک مثال‌ها، چالش‌ها و شاخص‌های ۱۶ دیسیپلین
├── components/
│   └── industry/
│       ├── DisciplineSelectorModal.tsx # مدال مدرن انتخاب دیسیپلین و رده سازمانی
│       └── DisciplineBadge.tsx         # چیپ نشانگر دیسیپلین در هدر با امکان تغییر سریع
└── components/
    └── Page*.tsx                     # مصرف دیسیپلین فعال جهت نمایش نمونه‌های اختصاصی
```

## Complexity Tracking
> هیچ انحرافی از قانون اساسی وجود ندارد.
