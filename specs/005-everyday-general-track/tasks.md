# Tasks: 005 - Everyday, Family, Household & Viral Lifestyle AI Domain Track (مسیر جامع کاربردهای روزمره، خانواده، خرید، سفر و ترندهای جذاب هوش مصنوعی)

**Input**: Design documents from `specs/005-everyday-general-track/`
**Prerequisites**: `plan.md`, `spec.md`, `data-model.md`, `contracts/`, `quickstart.md`

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to ([US1] to [US6])
- Include exact file paths in descriptions

---

## Phase 1: Foundational Type & Model System (Prerequisites)

**Purpose**: Core types, enums and track configurations that MUST be complete before UI or data tasks begin

- [X] T001 Update `IndustryTrackId` to union `'CIVIL_INFRA' | 'ENERGY_PETRO' | 'GENERAL_EVERYDAY'` in `src/types/industryTrack.ts`
- [X] T002 Add the 8 new lifestyle discipline IDs to `DisciplineId` in `src/types/industryTrack.ts`
- [X] T003 Configure `INDUSTRY_TRACKS.GENERAL_EVERYDAY` metadata (titleFa, tagline, gradient, `Sparkles` icon) in `src/types/industryTrack.ts`
- [X] T004 Update `getSavedDiscipline()` fallback logic for `GENERAL_EVERYDAY` in `src/types/industryTrack.ts`
- [X] T005 [P] Update `trackId` type in `src/types/lms.ts` to allow `'GENERAL_EVERYDAY'`

**Checkpoint**: Foundation ready - Type definitions compile with zero errors.

---

## Phase 2: User Story 1 - Three-Track Switcher in Header & Persistence (Priority: P1) 🎯 MVP

**Goal**: Allow users to switch seamlessly between Civil, Petro, and Everyday tracks in the main navbar with automatic localStorage persistence.

**Independent Test**: Click Everyday track tab in top navigation bar; verify active visual indicator, reload page, confirm choice stays active.

- [X] T006 [US1] Update `src/components/industry/IndustryTrackSwitcher.tsx` to render 3 responsive buttons with Emerald/Violet theme and `Sparkles` icon
- [X] T007 [US1] Verify and handle `localStorage` key `cpmai_industry_track` syncing and safe fallback discipline selection upon track change in `src/components/industry/IndustryTrackSwitcher.tsx`
- [X] T008 [US1] Update `src/components/navigation/WorkspaceSidebar.tsx` header subtitle and badge for `GENERAL_EVERYDAY`

**Checkpoint**: User Story 1 functional - 3-track navigation works and persists across page reloads.

---

## Phase 3: User Story 2 - Phase 0 LLM Fundamentals Lifestyle & Family Prompts (Priority: P1)

**Goal**: Deliver tailored, viral, relatable prompts for parents, home cooking, negotiation, and daily problem-solving in Module 0.

**Independent Test**: Navigate to Module 0 with Everyday track active; verify prompt cards display cooking, parenting, rent negotiation, and viral social media examples.

- [X] T009 [US2] Update `src/components/Page0LlmFundamentals.tsx` to provide family, parenting, kitchen/cooking, rent negotiation, and viral social media prompt sets when track is `GENERAL_EVERYDAY`
- [X] T010 [US2] Update RCTO prompt template in `src/components/Page0LlmFundamentals.tsx` with household budget & parenting scenarios
- [X] T011 [US2] Update the 3 LLM comparison tools card (ChatGPT, Claude, Gemini) with everyday lifestyle use cases in `src/components/Page0LlmFundamentals.tsx`

**Checkpoint**: User Story 2 functional - Module 0 offers inspiring, accessible prompts for non-technical everyday users.

---

## Phase 4: User Story 3 - 6-Phase CPMAI Household Economy & Travel Case Study (Priority: P1)

**Goal**: Provide a cohesive, 6-phase continuous case study on smart household budgeting, grocery optimization, and family vacation savings.

**Independent Test**: Inspect Phases 1 through 6 with Everyday track active; verify data artifacts, ROI metrics, and AI patterns reflect the household case study.

- [X] T012 [US3] Add `GENERAL_EVERYDAY` entries for Phase 1 (Business Understanding) and Phase 2 (Data Understanding) in `src/data/domainTrackExamples.ts`
- [X] T013 [US3] Add `GENERAL_EVERYDAY` entries for Phase 3 (Data Preparation) and Phase 4 (Model Development) in `src/data/domainTrackExamples.ts`
- [X] T014 [US3] Add `GENERAL_EVERYDAY` entries for Phase 5 (Model Evaluation) and Phase 6 (Model Deployment) in `src/data/domainTrackExamples.ts`
- [X] T015 [US3] Update fallback and selector helper functions `getDomainPhaseExample()` in `src/data/domainTrackExamples.ts`

**Checkpoint**: User Story 3 functional - Full 6-phase CPMAI curriculum is completely populated with the everyday household & travel case study.

---

## Phase 5: User Story 4 - 8 Lifestyle Disciplines in Registry & Selector Modal (Priority: P2)

**Goal**: Register 8 distinct everyday lifestyle disciplines and enable discipline selection in the modal.

**Independent Test**: Open Discipline Selector Modal; navigate to tab 3; verify 8 lifestyle disciplines are listed and can be selected.

- [X] T016 [P] [US4] Register 4 family/personal disciplines (`general_family_parenting`, `general_household_finance`, `general_travel_lifestyle`, `general_viral_content`) in `src/data/disciplineExamplesRegistry.ts`
- [X] T017 [P] [US4] Register 4 retail/wellness disciplines (`general_ecommerce_retail`, `general_health_nutrition`, `general_personal_productivity`, `general_customer_care`) in `src/data/disciplineExamplesRegistry.ts`
- [X] T018 [US4] Update `src/components/industry/DisciplineSelectorModal.tsx` to add the third tab and filter for the 8 lifestyle disciplines

**Checkpoint**: User Story 4 functional - All 8 lifestyle disciplines can be browsed, inspected, and activated.

---

## Phase 6: User Story 5 - Track Comparison Modal (3 Columns) (Priority: P2)

**Goal**: Display an engaging 3-column comparison modal showcasing Civil, Petro, and Everyday tracks.

**Independent Test**: Click track comparison button in header; verify 3 balanced cards with distinctive gradients and icons appear.

- [X] T019 [US5] Update `src/components/industry/IndustryTrackSelectorModal.tsx` to render a 3-column layout with a rich card for `GENERAL_EVERYDAY`

**Checkpoint**: User Story 5 functional - Comparison modal clearly explains differences and target audiences for all 3 tracks.

---

## Phase 7: User Story 6 - Admin Control Center Integration (Priority: P3)

**Goal**: Enable course administrators to filter and categorize students by the Everyday track and its 8 disciplines.

**Independent Test**: Open Admin Control Center Modal; check discipline filter dropdown; verify everyday disciplines are grouped cleanly.

- [X] T020 [US6] Update discipline filter in `src/components/admin/AdminControlCenterModal.tsx` to include the 8 general lifestyle disciplines categorized cleanly

**Checkpoint**: User Story 6 functional - Admin management supports complete cohorting and filtering across all 3 tracks.

---

## Phase 8: Polish, Build Verification & Quality Assurance

**Purpose**: Verify TypeScript compilation, production build, and end-to-end interactive experience.

- [X] T021 Run `npm run lint` (`tsc --noEmit`) to ensure 100% type safety and zero warnings
- [X] T022 Run `npm run build` (`vite build`) to confirm production bundle builds cleanly
- [X] T023 Perform browser live verification following `quickstart.md` test scenarios

---

## Dependencies & Execution Order

1. **Foundational (Phase 1)**: T001 to T005 must be completed first.
2. **User Stories 1, 2, 3 (Phase 2, 3, 4)**: MVP core flow (T006 to T015).
3. **User Stories 4, 5 (Phase 5, 6)**: Enhanced personalization and onboarding modal (T016 to T019).
4. **User Story 6 (Phase 7)**: Administrative oversight (T020).
5. **Phase 8**: Verification gate (T021 to T023).
