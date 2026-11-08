# Quickstart & Verification Guide: 005 - Everyday & Family AI Domain Track

**Feature**: `005-everyday-general-track`  
**Date**: 2026-10-25

## 1. Automated Build & Type Verification

Run the compiler and build scripts to guarantee 100% type safety and zero compiler warnings:

```bash
npm run lint
npm run build
```

**Expected Output**:
- `tsc --noEmit` completes with zero errors.
- `vite build` generates `dist/` assets cleanly.

## 2. Browser Interactive Scenarios

### Scenario A: Three-Track Switcher in Header
1. Open http://localhost:3000 in your browser.
2. Locate the industry track switcher in the top navigation bar.
3. Verify 3 tabs are present:
   - **راه و ابنیه** (Civil Infra)
   - **نفت و انرژی** (Energy Petro)
   - **روزمره و خانواده** (General Everyday)
4. Click on **«روزمره و خانواده»**.
5. **Observe**: The button illuminates with an emerald/violet gradient and `Sparkles` icon.
6. Refresh the page (F5).
7. **Observe**: The active selection remains on **«روزمره و خانواده»** (localStorage persistence verified).

### Scenario B: Phase 0 Lifestyle & Parenting Prompts
1. Navigate to Module 0 / LLM Workshop (کارگاه پرامپت و مبانی مدل‌های زبانی).
2. Look at the RCTO Golden Formula card and the prompt examples.
3. **Observe**: Prompts showcase family hacks, cooking from leftover fridge items, explaining math/science to children, polite debt/rent negotiation, and viral social media content ideas instead of industrial TBM/HAZOP prompts.

### Scenario C: Phases 1 to 6 Household Economy & Travel Case Study
1. Navigate to Phase 1 (شناخت کسب‌وکار / Business Understanding).
2. Verify the case study displays:
   - Title: «سامانه هوشمند اقتصاد خانوار و بهینه‌سازی سبد مصرفی»
   - ROI Metric: 25% waste reduction and automated vacation savings fund.
3. Navigate sequentially through Phases 2, 3, 4, 5, 6 to verify data feeds (POS receipts, bank SMS), data cleaning (Persian receipt items), model algorithms (grocery exhaustion clustering), evaluation, and deployment (family messaging bot).

### Scenario D: 8 Lifestyle Disciplines in Modal & Authentic Prompt Vibe
1. Click on the Discipline Selector pill in the header.
2. Inspect the 3rd tab (تخصص‌های روزمره و سبک زندگی).
3. Verify all 8 disciplines are selectable:
   - والدین هوشمند و آموزش کودک (`general_family_parenting`)
   - مدیریت خرید و اقتصاد خانوار (`general_household_finance`)
   - سفر و اوقات فراغت (`general_travel_lifestyle`)
   - ترندهای وایرال و سرگرمی (`general_viral_content`)
   - خرید آنلاین و ایکامرس (`general_ecommerce_retail`)
   - سلامت و تغذیه (`general_health_nutrition`)
   - بهره‌وری فردی (`general_personal_productivity`)
   - روابط و آداب معاشرت (`general_customer_care`)
4. Select `general_family_parenting`.
5. Open Module 0 / Section 2-2 (Before vs After Prompt comparison).
6. **Observe**:
   - The prompt role says: "مشاور و مربی هوشمند آموزش کودک و والدین" (NOT "مهندس ارشد کارگاه").
   - The output format says: [موضوع دغدغه کودک | رویکرد بازی‌محور | واکنش تربیتی آرام] (NOT "اقدام اصلاحی شیفت").
   - The vibe is 100% authentic to parenting and daily family life.

### Scenario E: Verification of Civil & Petro Authentic Vibes
1. Switch to **«راه و شهرسازی و ابنیه»** (`CIVIL_INFRA`).
2. Verify Module 0 Section 2-2 displays TBM, settlement, and Circular 4311 engineering terminology.
3. Switch to **«نفت، گاز و پتروشیمی»** (`ENERGY_PETRO`).
4. Verify Module 0 Section 2-2 displays refinery distillation, DCS telemetry, HAZOP safety envelopes, and ASME/API standards.
5. In all cases, verify zero cross-contamination of language or metaphors.

## 3. Git Push Safety Notice (MANDATORY)

- **CRITICAL**: Do NOT execute `git push` or push changes to any remote repository without explicit user coordination and authorization.

