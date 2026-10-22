# Implementation Plan: تفکیک ساختاری و محتوایی دامنه‌های نفت‌و‌گاز و مگاپروژه‌های عمرانی

**Branch**: `001-domain-track-segregation` | **Date**: 2026-10-22 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-domain-track-segregation/spec.md`

## Summary

تفکیک کامل مثال‌ها، کاربرگ‌ها، سناریوهای آزمون و پروژه‌های موردی در سراسر پلتفرم بین دو حوزه «مگاپروژه‌های عمرانی و زیرساختی» (`CIVIL_INFRA`) و «نفت، گاز و پتروشیمی» (`ENERGY_PETRO`) از طریق ایجاد ماژول متمرکز دیتای تخصصی `src/data/domainTrackExamples.ts` و تغذیه پویای کامپوننت‌های فازها و صفحات آموزشی.

## Technical Context

**Language/Version**: TypeScript 5.7+ / Node.js 20+ / React 19

**Primary Dependencies**: Vite 8, Tailwind CSS v4, Lucide React, Motion (Framer Motion)

**Storage**: LocalStorage (ماندگاری انتخاب کاربر در کلاینت) + PostgreSQL (ذخیره تخصص در پروفایل کاربر)

**Testing**: `npm run lint` (`tsc --noEmit`) و تایید بیلد Vite

**Target Platform**: مرورگرهای مدرن، کاملاً ریسپانسیو و بهینه‌سازی‌شده برای دسکتاپ و موبایل

**Project Type**: وب‌اپلیکیشن تعاملی آموزشی و ورک‌شاپ سازمانی

**Performance Goals**: تغییر آنی کانتکست (< ۵۰ میلی‌ثانیه)، صفر تاخیر شبکه در رندر مثال‌ها

**Constraints**: عدم ایجاد پکیج و وابستگی خارجی جدید؛ عدم تغییر منطق بنیادی متدولوژی CPMAI

**Scale/Scope**: ۲۲ صفحه آموزشی، شبیه‌سازها، کوییز تعیین سطح، کاربرگ‌های تعاملی

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| اصل قانون اساسی | وضعیت انطباق | یادداشت ارزیابی |
| :--- | :---: | :--- |
| **I. Zero Compiler Errors** | ✅ Passed | هیچ تایپ `any` مجاز نیست؛ خروجی `tsc --noEmit` باید بدون خطا باشد. |
| **II. Anti-Monolith & Modularity** | ✅ Passed | داده‌های تفکیک‌شده به `src/data/domainTrackExamples.ts` منتقل می‌شوند تا فایل‌های UI باد نکنند. |
| **III. Dual-Track Domain Isolation** | ✅ Passed | تفکیک دقیق اصطلاحات و مثال‌های هر دو حوزه به عنوان هسته اصلی این فیچر است. |
| **IV. Bilingual & RTL Typography** | ✅ Passed | تمامی سناریوها دارای متن دوزبانه (فارسی/انگلیسی) و پشتیبانی RTL هستند. |
| **V. Serverless Resilience** | ✅ Passed | خواندن و اعمال داده‌های محتوایی کاملاً کلاینت‌ساید و بدون وابستگی به آپ‌تایم سرورلس کار می‌کند. |

## Project Structure

### Documentation (this feature)

```text
specs/001-domain-track-segregation/
├── plan.md              # This file (/speckit-plan output)
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 contracts
│   └── domain-content.contract.ts
└── checklists/
    └── requirements.md  # Quality validation checklist
```

### Source Code Impact

```text
src/
├── types/
│   └── industryTrack.ts       # بسط تایپ‌های محتوایی فازها به تفکیک دامنه
├── data/
│   ├── domainTrackExamples.ts # منبع یکتای سناریوهای مگاپروژه‌های عمرانی و نفت و گاز
│   └── cpmaiPhases.ts         # اتصال به سناریوهای تخصصی دامنه‌ها
└── components/
    ├── industry/              # کامپوننت‌های سوئیچر و انتخابگر حوزه
    └── Page*.tsx              # دریافت و رندر مثال‌های متناظر با دامنه فعال
```

## Complexity Tracking

> نیازی به پر کردن نیست؛ تمام اصول قانون اساسی بدون نقض رعایت شده‌اند.
