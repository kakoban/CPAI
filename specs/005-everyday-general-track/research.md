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

### 6. Authentic Vibe & Persona Authorization Across All Three Tracks
- **Question**: How to prevent domain leakage (e.g. engineering jargon appearing in parenting prompts, or informal language creeping into civil/petro megaprojects)?
- **Decision**: Implement strict track-aware persona and tone authorization:
  1. **Civil & Infrastructure (`CIVIL_INFRA`)**:
     - *Tone & Vibe*: Rigorous site engineering, geotechnical monitoring, contractual rigor.
     - *Persona*: مهندس ناظر ژئوتکنیک، سرپرست کارگاه، مدیر دفتر فنی، کارشناس امور پیمان و کلیم.
     - *Standards*: نشریه ۴۳۱۱ شرایط عمومی پیمان، نشریه ۵۵، آیین‌نامه بتن ایران (آبا)، استانداردهای تونل‌سازی BTS، مبحث ۷ مقررات ملی ساختمان.
     - *Output Template*: جدول گزارش فنی و مهندسی کارگاه با ستون‌های: [عامل بحرانی ژئوتکنیک/سازه | حد مجاز استاندارد | انحراف اندازه‌گیری‌شده | اقدام اصلاحی کارگاه / دفتر فنی].
  2. **Oil, Gas & Petrochemical (`ENERGY_PETRO`)**:
     - *Tone & Vibe*: Mega-refinery operations, process safety, industrial instrumentation, EPC turnkey execution.
     - *Persona*: مهندس ارشد فرآیند و شبیه‌سازی، بازرس فنی و متالورژی (QA/QC & NDT)، سوپروایزر راه‌اندازی (PC&C)، سرپرست ایمنی فرآیند (HAZOP/SIL Lead).
     - *Standards*: FIDIC Silver Book EPC, API 1104, ASME B31.3 / B31.8, OSHA 1910.119 PSM, API 520/521.
     - *Output Template*: جدول ماتریس پایش فرآیندی و ایمنی با ستون‌های: [تگ فرآیندی / تجهیز بحرانی | حد مجاز عملیاتی (MAWP/SOP) | انحراف تلمتری DCS | دستور کار اتاق کنترل و بهره‌برداری].
  3. **General, Everyday, Family & Lifestyle (`GENERAL_EVERYDAY`)**:
     - *Tone & Vibe*: Warm, relatable, empowering, practical, conversational, empathetic and culturally natural Persian.
     - *Persona*: مربی و مشاور هوشمند والدین، مشاور اقتصاد و بهینه‌سازی بودجه خانوار، برنامه‌ریز حرفه‌ای سفر و اوقات فراغت، سناریونویس خلاق واید و ترندهای جذاب، مشاور هوشمند خرید آنلاین، مربی سلامت و تغذیه خانوادگی، مربی بهره‌وری فردی، مشاور ارتباط بدون خشونت (NVC) و آداب معاشرت.
     - *Standards*: استاندارد ۶ فاز CPMAI، چارچوب سواد هوش مصنوعی یونسکو، قاعده ۵۰/۳۰/۲۰ بودجه‌بندی خانوار، اصول صفر دورریز غذا (Zero Waste)، منشور ارتباط بدون خشونت (NVC).
     - *Output Template*: جدول راهنما یا چک‌لیست کاربردی ملموس با ستون‌های متناسب با موضوع (مثلاً: [موضوع دغدغه | راهکار هوشمند | زمان/هزینه صرفه‌جویی‌شده | گام اول اجرایی همین امروز]).

### 7. Dynamic Four Pillars (RCTO) in Module 0
- **Question**: Why were the 4 pillars (Role, Context, Task, Output) in Module 0 static and using generic FinTech examples?
- **Decision**: Refactor the RCTO four pillars in `Page0LlmFundamentals.tsx` to dynamically switch their showcase examples based on `industryTrack`:
  - `CIVIL_INFRA`: TBM cutterhead settlement forecasting under Circular 4311.
  - `ENERGY_PETRO`: Heat exchanger fouling in crude distillation under HAZOP safety envelope.
  - `GENERAL_EVERYDAY`: Perishable grocery waste reduction and annual family vacation savings.

### 8. Refactoring `getDisciplinePromptShowcase`
- **Question**: How to ensure `getDisciplinePromptShowcase` in `disciplineExamplesRegistry.ts` generates prompt templates with authentic role, context, task, and output matching each discipline's distinct character?
- **Decision**: Introduce a track-specific prompt builder inside `getDisciplinePromptShowcase` that switches phrasing, role, and output schemas depending on whether the discipline belongs to Civil, Petro, or General tracks.

