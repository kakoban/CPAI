# Phase 0 Research: 005 - Everyday, Family, Household & Viral Lifestyle AI Domain Track

**Date**: 2026-10-25  
**Feature**: [spec.md](./spec.md)

## Unknowns & Research Inquiries

### 1. Architectural Strategy for Third Domain Track
- **Question**: How should the domain track system be expanded without breaking existing civil/petro typing and local storage?
- **Decision**: Extend `IndustryTrackId` in `src/types/industryTrack.ts` from `'CIVIL_INFRA' | 'ENERGY_PETRO'` to a 3-way union `'CIVIL_INFRA' | 'ENERGY_PETRO' | 'GENERAL_EVERYDAY'`.
- **Rationale**: Keeps backward compatibility with existing saved records. All components consuming `IndustryTrackId` automatically get compiler assistance for exhaustive handling.
- **Alternatives Considered**: Creating a parallel mode flag outside the track system (rejected: would fragment the architecture into two disjoint state paradigms).

### 2. Visual Identity & Color Palette for Everyday Track
- **Question**: What styling best contrasts with Civil (Blue/Indigo) and Petro (Amber/Orange/Red)?
- **Decision**: Modern Emerald/Teal to Violet gradient (`from-emerald-500 via-teal-500 to-indigo-600`) with `Sparkles` or `HeartHandshake` / `ShoppingBag` icon.
- **Rationale**: Green/Teal communicates daily life, household sustainability, prosperity and freshness. Visually distinct in both dark and light modes.
- **Alternatives Considered**: Pure yellow or gray (rejected: low contrast in dark/light modes or looks disabled).

### 3. Case Study Selection across the 6 CPMAI Phases
- **Question**: What single, cohesive everyday narrative best illustrates all 6 phases of CPMAI for general users?
- **Decision**: **«سامانه هوشمند اقتصاد خانوار، بهینه‌سازی سبد خرید و مدیریت بودجه سفر» (Smart Household Budget, Grocery Optimization & Family Travel Assistant)**.
- **Rationale**:
  - Phase 1 (Business Understanding): Cost waste in household groceries (25% spoil rate), inflation buffering, saving for vacation.
  - Phase 2 (Data Understanding): Bank SMS alerts, POS receipts, supermarket item catalogs, travel fare telemetry.
  - Phase 3 (Data Preparation): Text cleaning of Persian receipt items, categorical tagging (essential vs impulse), date normalization.
  - Phase 4 (Model Development): Consumption pattern clustering, grocery stock exhaustion forecasting, price anomaly detection.
  - Phase 5 (Model Evaluation): Accuracy in predicting grocery budget vs actuals, household satisfaction metrics, zero false-alarm promotions.
  - Phase 6 (Model Deployment): Telegram/Bale family bot, shared interactive dashboard, weekly automated budget digests.
- **Alternatives Considered**: An enterprise CRM or ride-hailing case study (rejected: too corporate; lacks the intimate family & viral appeal requested by user).

### 4. 8 Lifestyle & Everyday Disciplines Definition
- **Question**: Which 8 disciplines cover family life, shopping, travel, viral hype, and daily productivity?
- **Decision**:
  1. `general_family_parenting`: والدین هوشمند و آموزش کودک
  2. `general_household_finance`: مدیریت خرید، سبد مصرف و اقتصاد خانوار
  3. `general_travel_lifestyle`: سفر، اوقات فراغت و ماجراجویی
  4. `general_viral_content`: ترندهای وایرال، سرگرمی و ایده‌پردازی
  5. `general_ecommerce_retail`: خرید هوشمند آنلاین و شکار تخفیف‌ها
  6. `general_health_nutrition`: تغذیه، تناسب اندام و سبک زندگی سالم
  7. `general_personal_productivity`: بهره‌وری، مدیریت زمان و ضدتنبلی
  8. `general_customer_care`: روابط اجتماعی و آداب معاشرت روزمره

### 5. Seamless Switcher & Responsive UI
- **Question**: How to fit 3 tabs comfortably in the header without overflowing mobile screens?
- **Decision**: Responsive horizontal flex with pill badges, compact short titles on mobile screens (`راه و ابنیه`، `نفت و انرژی`، `روزمره و خانواده`), and full titles on tablet/desktop.
