# Implementation Plan: پنل ادمین و مدیریت دوره‌ها، اسلات‌های زمانی و دسته‌بندی دیسیپلین‌ها

**Branch**: `004-admin-cohorts-discipline-management` | **Date**: 2026-10-24 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/004-admin-cohorts-discipline-management/spec.md`

## Summary

توسعه تب چهارم در پنل ادمین برای مدیریت کلاس‌ها و پنجره‌های زمانی ۲ ساعته ثبت‌نام (Time-Slot Cohorting)، امکان تغییر نام و نام‌گذاری سازمانی اسلات‌های خودکار توسط مدیر، ارتقای فیلترهای جدول کاربران بر اساس ۱۶ دیسیپلین و رده سازمانی، و خروجی ساختاریافته اکسل/CSV.

## Technical Context

**Language/Version**: TypeScript 5.7+ / React 19 / Node.js 20+

**Primary Dependencies**: Tailwind CSS, Lucide React, Express, pg (PostgreSQL)

**Storage**: جدول `classes` و جدول `users` در PostgreSQL (Neon Cloud) با Fallback محلی کامل

**Testing**: `npm run lint` (`tsc --noEmit`) و تایید بیلد Vite

**Target Platform**: وب دسکتاپ و تبلت مدیران و مدرسان با پشتیبانی کامل RTL

**Project Type**: پنل مدیریت و کنترل آموزشی (Admin LMS Center)

**Performance Goals**: بارگذاری آنی لیست کاربران و تغییر نام کلاس بدون رفرش صفحه

**Constraints**: حفظ امنیت دسترسی ادمین؛ عدم حذف رکوردهای دارای تاریخچه مالی و آزمون

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| اصل قانون اساسی | وضعیت انطباق | یادداشت ارزیابی |
| :--- | :---: | :--- |
| **I. Zero Compiler Errors** | ✅ Passed | هیچ فیلد اختیاری ناقص در تایپ‌های `lms.ts` باقی نمی‌ماند. |
| **II. Anti-Monolith & Modularity** | ✅ Passed | توابع کمکی تبدیل اسلات و خروجی CSV در ماژول‌های مجزا قرار می‌گیرند. |
| **III. Dual-Track Isolation** | ✅ Passed | فیلترهای دیسیپلین به تفکیک دو دامنه عمران و نفت عمل می‌کنند. |
| **IV. Bilingual & RTL Typography** | ✅ Passed | خروجی CSV با کاراکتر BOM است تا در اکسل فارسی بدون بهم‌ریختگی باز شود. |
| **V. Serverless Resilience** | ✅ Passed | در صورت قطعی اتصال دیتابیس، سشن‌های لوکال ادمین با فال‌بک امن کار می‌کنند. |

## Project Structure

### Documentation (this feature)

```text
specs/004-admin-cohorts-discipline-management/
├── plan.md              # این سند
├── research.md          # تحلیل اسلات‌های ۲ ساعته
├── data-model.md        # ساختار داده ClassEntity و UserRegistryItem
├── quickstart.md        # سناریوی تست
└── checklists/
    └── requirements.md
```

### Source Code Impact

```text
src/
├── types/
│   └── lms.ts                                    # ارتقای ClassEntity و فیلدهای دیسیپلین کاربر
├── services/
│   └── lmsApi.ts                                 # متدهای updateClassTitle و createCustomClass
├── components/admin/
│   └── AdminControlCenterModal.tsx               # تب جدید Cohorts، فرم تغییر نام و فیلترهای ۱۶گانه
api/
└── index.ts                                      # روت /api/admin/classes/update برای تغییر نام کلاس
```

## Complexity Tracking
> بدون انحراف از قانون اساسی.
