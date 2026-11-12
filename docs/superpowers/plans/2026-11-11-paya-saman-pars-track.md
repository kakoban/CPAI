# Paya Saman Pars Dedicated Industry Track Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `PAYA_SAMAN_PARS` as an isolated, deeply customized fourth industry track across onboarding, placement quiz, Session 0 workshops (3 Paya datasets, 2 Paya contracts, track-aware Session 1 & 5 slides, track-aware NotebookLM workshop, and `PayaHoldingArtifactSimulator`), Phase I Pages 1–5, and the 3-group holding discipline/role selector without altering the 3 existing tracks.

**Architecture:** Introduce `PAYA_SAMAN_PARS` and 8 `PayaDisciplineId` entries in `src/types/industryTrack.ts`, backed by track-parameterized selector helpers (`getDatasetsForTrack`, `getContractsForTrack`, `getSessionCurriculumForTrack`, `getNotebookLmGuideForTrack`, `getNotebookLmSampleDocsForTrack`) so existing tracks keep their exact default exports unchanged. Add URL-entry routing (`/paya`, `/paya-saman-pars`, `?track=PAYA_SAMAN_PARS|paya`) in `getSavedIndustryTrack()` and filter/adapt all UI surfaces by `industryTrack`.

**Tech Stack:** React 19, TypeScript 7, Tailwind CSS v4, Lucide React icons, Motion animations, Vite 8, `tsx` (devDependency) with Node `node:assert/strict`.

**Spec:** `docs/superpowers/specs/2026-11-11-paya-saman-pars-track-design.md`

## Global Constraints

- Title in switcher & sidebar: `پایا سامان پارس`. Full title: `هلدینگ پایا سامان پارس (پیمانکاری زیرساخت، مسکن و شهرک صنعتی)`.
- Track visual theme: Violet/Indigo (`from-violet-600 via-purple-600 to-indigo-700`, `text-violet-600 dark:text-violet-400`, `border-violet-500/40`, `glowColor: 'rgba(139, 92, 246, 0.35)'`, `Landmark` Lucide icon).
- Zero behavioral or data changes to existing `CIVIL_INFRA`, `ENERGY_PETRO`, and `GENERAL_EVERYDAY` tracks for standard visits.
- All financial figures, contract prices, dates, and progress numbers in datasets, contracts, and the simulator MUST carry an explicit educational simulation disclaimer (`مقادیر شبیه‌سازی‌شده آموزشی`) because the holding's public site omits those fields.
- Zero new npm dependencies; no Prisma/PostgreSQL schema edits.
- Must pass `npx tsx scripts/verify-paya-track.ts`, `npm run lint` (`tsc --noEmit`), `npm run build` (`vite build`), and browser preview verification.

## Review Focus

1. **Non-Paya visitor isolation & SSR/Node safety:** Visiting `/` with empty `localStorage` must return `'CIVIL_INFRA'`, while visiting `/paya` or `?track=PAYA_SAMAN_PARS` (or `?track=paya`) must return `'PAYA_SAMAN_PARS'` and save it; calling `getSavedIndustryTrack()` in Node (`typeof window === 'undefined'`) must not throw.
2. **Stale discipline / dataset / contract IDs on track switch:** Switching between `CIVIL_INFRA` and `PAYA_SAMAN_PARS` must never keep `selectedDatasetId='metro_station_tbm'`, `selectedContractId='metro_tunnel_contract'`, or a `civil_*` discipline active; `Page0` and `NotebookLmWorkshop` must synchronize selected IDs inside `useEffect`.
3. **NotebookLM ID parity:** Every `id` in `PAYA_UNIT_MANAGERS_MATRIX`, `PAYA_PRESENTATION_INFOGRAPHIC_GUIDES`, and `PAYA_NOTEBOOKLM_EXERCISES` must have a matching key in `PAYA_SAMPLE_DEPARTMENT_DOCS`, `PAYA_SAMPLE_BLUEPRINT_DOCS`, and `PAYA_SAMPLE_EXERCISE_DOCS` respectively so preview/download cards never render `undefined`.
4. **Admin & TypeScript exhaustiveness:** Adding `'PAYA_SAMAN_PARS'` to `IndustryTrackId` must not leave unhandled `Record<IndustryTrackId, ...>` map lookups or stale `24` discipline counters in `AdminControlCenterModal.tsx`.
5. **Calculator state sync on Pages 4 & 5:** Switching `industryTrack` after initial mount in `Page4CostBenefit` and `Page5ExpectedRoi` must update calculator `useState` inputs via `useEffect`, not freeze on mount values.

---

### Task 1: Core Track Definition, URL Entry Routing, and 8 Paya Disciplines (3 Structural Groups)

**Files:**
- Modify: `src/types/industryTrack.ts`
- Modify: `src/types/lms.ts:97-121`
- Modify: `src/data/disciplineExamplesRegistry.ts`
- Create: `scripts/verify-paya-track.ts`

**Interfaces:**
- Produces:
  - `IndustryTrackId = 'CIVIL_INFRA' | 'ENERGY_PETRO' | 'GENERAL_EVERYDAY' | 'PAYA_SAMAN_PARS'`
  - `PayaDisciplineId` union (8 IDs: `paya_portfolio_pmo`, `paya_contracts_epcf_bot`, `paya_hr_fleet_support`, `paya_roads_rail_airports`, `paya_dams_marine_industrial`, `paya_mep_tabiran_energy`, `paya_housing_urban`, `paya_kaveh_industrial_city`)
  - Optional `groupFa?: string; groupEn?: string;` on `DisciplineMetadata`
  - `resolveTrackFromUrl(): IndustryTrackId | null` and updated `getSavedIndustryTrack(): IndustryTrackId`
  - Updated `getSavedDiscipline(track: IndustryTrackId): DisciplineId` returning `'paya_portfolio_pmo'` fallback for `'PAYA_SAMAN_PARS'`
  - Updated `getDisciplinePromptShowcase(disciplineId)` handling `meta.trackId === 'PAYA_SAMAN_PARS'`

- [ ] **Step 1: Write failing assertions for Task 1 in `scripts/verify-paya-track.ts`**

Create `scripts/verify-paya-track.ts` testing:
1. `Object.keys(INDUSTRY_TRACKS)` includes `'PAYA_SAMAN_PARS'` with `shortTitleFa === 'پایا سامان پارس'` and `iconName === 'Landmark'`.
2. `getSavedIndustryTrack()` in Node (`window` undefined) returns `'CIVIL_INFRA'` without throwing.
3. `resolveTrackFromUrl('/paya', '') === 'PAYA_SAMAN_PARS'`, `resolveTrackFromUrl('/', '?track=paya') === 'PAYA_SAMAN_PARS'`, `resolveTrackFromUrl('/', '?track=PAYA_SAMAN_PARS') === 'PAYA_SAMAN_PARS'`, and `resolveTrackFromUrl('/', '') === null`.
4. `getDisciplinesByTrack('PAYA_SAMAN_PARS')` has length 8, all 8 have non-empty `groupFa`, `DISCIPLINE_EXAMPLES_REGISTRY[d.id]` exists, and `getDisciplinePromptShowcase(d.id)` cites Paya holding standards/KPIs without `TBM` or refinery leaks where inapplicable.
5. `getSavedDiscipline('PAYA_SAMAN_PARS') === 'paya_portfolio_pmo'`.

- [ ] **Step 2: Run verification script to confirm failure**

Run: `npx tsx scripts/verify-paya-track.ts`
Expected: FAIL because `PAYA_SAMAN_PARS` and `resolveTrackFromUrl` do not exist yet.

- [ ] **Step 3: Update `src/types/industryTrack.ts` and `src/types/lms.ts`**

In `src/types/industryTrack.ts`:
- Expand `IndustryTrackId`, `iconName` (`'Building2' | 'Factory' | 'Sparkles' | 'Landmark'`), add `PayaDisciplineId`, add `groupFa?: string; groupEn?: string;` to `DisciplineMetadata`.
- Add `PAYA_SAMAN_PARS` to `INDUSTRY_TRACKS` with Paya Saman Pars title, tagline (2 wings, 8 fields, 63 projects, 14 subsidiaries), 5 scope pills (EPC/EPC+F/BOT/BLT, road/tunnel/rail/airport/dam, industrial plants/MEP/solar/cold-plasma, housing/urban renewal, Kaveh Industrial City 3000ha), governing standards (Circular 4311, FIDIC EPC+F, BOT/BLT Concession Laws, National Building Codes & ISO/HSE), violet gradient theme, and holding portfolio defaultCaseStudy.
- Export `resolveTrackFromUrl(pathname?: string, search?: string): IndustryTrackId | null` supporting `/paya`, `/paya-saman-pars`, and `?track=PAYA_SAMAN_PARS|paya` (case-insensitive) plus any exact `IndustryTrackId` in `?track=`.
- Update `getSavedIndustryTrack()` to check `resolveTrackFromUrl()` first (saving to `localStorage` if found), then `localStorage`, defaulting to `'CIVIL_INFRA'`. Guard `window` and `localStorage` safely for Node execution.
- Update `getSavedDiscipline()` to support `'PAYA_SAMAN_PARS'` (`saved.startsWith('paya_')`, default `'paya_portfolio_pmo'`).

In `src/types/lms.ts`:
- Update `trackId?: 'CIVIL_INFRA' | 'ENERGY_PETRO' | 'GENERAL_EVERYDAY' | 'PAYA_SAMAN_PARS'`.

- [ ] **Step 4: Add 8 Paya disciplines, case studies, and RCTO prompt branch to `src/data/disciplineExamplesRegistry.ts`**

- Add all 8 `paya_*` entries to `DISCIPLINE_REGISTRY` organized in the 3 exact `groupFa` labels:
  - `'گروه الف: ستاد هلدینگ، قراردادها و کنترل پورتفو'` (`paya_portfolio_pmo`, `paya_contracts_epcf_bot`, `paya_hr_fleet_support`)
  - `'گروه ب: بال پیمانکاری عمرانی و زیربنایی'` (`paya_roads_rail_airports`, `paya_dams_marine_industrial`, `paya_mep_tabiran_energy`)
  - `'گروه ج: بال سرمایه‌گذاری مسکن و شهرک‌سازی صنعتی'` (`paya_housing_urban`, `paya_kaveh_industrial_city`)
- Mention all real subsidiary companies and representative projects per spec (`رامان`, `جنرال مکانیک`, `دی`, `ملی ساختمان`, `تابیران`, `بن‌آب`, `پایانه سلام`, `آتی‌ساز`, `شرکت خانه`, `عمران و مسکن ایران/شمال/اصفهان`, `شهر صنعتی کاوه`, `معین کوثر`).
- Add all 8 corresponding entries to `DISCIPLINE_EXAMPLES_REGISTRY`.
- Add `if (meta.trackId === 'PAYA_SAMAN_PARS')` branch in `getDisciplinePromptShowcase` using holding/executive/EPC+F terminology and real `meta.performanceMetricsFa`.

- [ ] **Step 5: Run verification script and TypeScript check**

Run: `npx tsx scripts/verify-paya-track.ts`
Expected: Task 1 assertions PASS.

- [ ] **Step 6: Commit Task 1**

```bash
git add src/types/industryTrack.ts src/types/lms.ts src/data/disciplineExamplesRegistry.ts scripts/verify-paya-track.ts
git commit -m "feat(paya-track): add PAYA_SAMAN_PARS track, URL routing, and 8 grouped disciplines"
```

---

### Task 2: Domain Phase Examples (Phases 1–6) & Placement Quiz Adaptations

**Files:**
- Modify: `src/data/domainTrackExamples.ts`
- Modify: `src/data/placement_quiz_data.ts:1239-1405`
- Modify: `scripts/verify-paya-track.ts`

**Interfaces:**
- Consumes: `IndustryTrackId` (`'PAYA_SAMAN_PARS'`)
- Produces:
  - `DOMAIN_PHASE_EXAMPLES.PAYA_SAMAN_PARS` for phases `1..6`
  - `DISCIPLINE_QUIZ_ADAPTATIONS.PAYA_SAMAN_PARS` covering all adapted question IDs (`1, 2, 3, 7, 10, 11, 13, 16, 17, 20, 21`)

- [ ] **Step 1: Add Task 2 assertions to `scripts/verify-paya-track.ts`**

Assert:
1. For `phase = 1..6`, `getDomainPhaseExample(phase, 'PAYA_SAMAN_PARS').trackId === 'PAYA_SAMAN_PARS'` and titles/notes differ from `'CIVIL_INFRA'`.
2. `getAdaptedQuizQuestions('intermediate', 'paya_portfolio_pmo', 'PAYA_SAMAN_PARS')` replaces at least questions `1, 2, 3, 13, 21` with Paya Saman Pars scenarios (e.g. contains `پایا` / `کاوه` / `EPC+F`).

- [ ] **Step 2: Run verification script to verify Task 2 assertions fail**

Run: `npx tsx scripts/verify-paya-track.ts`
Expected: FAIL on `PAYA_SAMAN_PARS` phase examples and quiz adaptations.

- [ ] **Step 3: Populate `DOMAIN_PHASE_EXAMPLES.PAYA_SAMAN_PARS` in `src/data/domainTrackExamples.ts`**

Add phases 1–6 centered on Paya Saman Pars's 63-project portfolio, 2-wing executive integration, consortium cashflow/EVM tracking, Kaveh Industrial City solar/cold-plasma operations, and UAE cross-border risk control.

- [ ] **Step 4: Add `PAYA_SAMAN_PARS` to `DISCIPLINE_QUIZ_ADAPTATIONS` in `src/data/placement_quiz_data.ts`**

Widen the key union to `'ENERGY_PETRO' | 'GENERAL_EVERYDAY' | 'PAYA_SAMAN_PARS'` and write authentic Paya Saman Pars contexts (63 projects, EPC+F/BOT consortium claims, Kaveh 3000ha industrial city, cold plasma effluent plant, housing wing).

- [ ] **Step 5: Run verification script**

Run: `npx tsx scripts/verify-paya-track.ts`
Expected: Task 1 and Task 2 assertions PASS.

- [ ] **Step 6: Commit Task 2**

```bash
git add src/data/domainTrackExamples.ts src/data/placement_quiz_data.ts scripts/verify-paya-track.ts
git commit -m "feat(paya-track): add 6-phase CPMAI examples and placement quiz adaptations"
```

---

### Task 3: Track-Isolated Multi-Type Datasets & Consortium Contracts

**Files:**
- Modify: `src/data/engineering_sample_datasets.ts`
- Modify: `src/data/engineering_sample_contracts.ts`
- Modify: `scripts/verify-paya-track.ts`

**Interfaces:**
- Consumes: `IndustryTrackId`
- Produces:
  - Optional `trackIds?: IndustryTrackId[]` on `EngineeringDataset` and `ContractSpecimen`
  - `getDatasetsForTrack(trackId?: IndustryTrackId): EngineeringDataset[]`
  - `getContractsForTrack(trackId?: IndustryTrackId): ContractSpecimen[]`
  - 3 Paya datasets (`paya_infra_epc`, `paya_kaveh_housing`, `paya_holding_portfolio`)
  - 2 Paya contracts (`paya_epcf_consortium_contract`, `paya_bot_kaveh_contract`)

- [ ] **Step 1: Add Task 3 assertions to `scripts/verify-paya-track.ts`**

Assert:
1. `getDatasetsForTrack('PAYA_SAMAN_PARS').map(d => d.id)` equals `['paya_infra_epc', 'paya_kaveh_housing', 'paya_holding_portfolio']`, each `rawCsv` parses consistently (same column count across rows), and each description/title notes simulated training figures (`شبیه‌سازی`).
2. `getDatasetsForTrack('CIVIL_INFRA')` and `getDatasetsForTrack('ENERGY_PETRO')` return the original 3 datasets (none of the `paya_*` IDs leak into other tracks).
3. `getContractsForTrack('PAYA_SAMAN_PARS').map(c => c.id)` equals `['paya_epcf_consortium_contract', 'paya_bot_kaveh_contract']`, while `getContractsForTrack('CIVIL_INFRA')` returns only the original 2 contracts.

- [ ] **Step 2: Run verification script to verify failure**

Run: `npx tsx scripts/verify-paya-track.ts`
Expected: FAIL (`getDatasetsForTrack` / `getContractsForTrack` missing).

- [ ] **Step 3: Implement 3 Paya datasets and `getDatasetsForTrack` in `src/data/engineering_sample_datasets.ts`**

Add `trackIds?: IndustryTrackId[]` to `EngineeringDataset`, add the 3 realistic CSV datasets (`paya_infra_epc` covering Tehran-North, Qalajeh, UAE SKF2/R1000C, Shahri-Kour/Makhmalkuh, Mianeh-Ardabil, Tabriz Metro, Imam/Salam & Kish airports; `paya_kaveh_housing` covering Darya-Kenar/Atisaz, Isfahan/Shomal/Iran housing, Kaveh 3000ha, 5MW solar, Cold-Plasma effluent plant 1405; `paya_holding_portfolio` aggregating all 8 sectors, 63 projects, 5000 staff, and heavy fleet across subsidiaries with simulated financial/schedule fields explicitly marked `شبیه‌سازی‌شده آموزشی`), plus ready-to-paste Claude Artifact & Gemini Python prompts for each. Export `getDatasetsForTrack`.

- [ ] **Step 4: Implement 2 Paya contracts and `getContractsForTrack` in `src/data/engineering_sample_contracts.ts`**

Add `trackIds?: IndustryTrackId[]` to `ContractSpecimen`, add `paya_epcf_consortium_contract` (EPC+F multi-subsidiary consortium for highway/tunnel/rail corridor) and `paya_bot_kaveh_contract` (BOT/BLT concession for Kaveh Industrial City 5MW solar + cold-plasma treatment + housing partnership), each clearly marked as simulated training contract text, with tailored Gemini & Claude System Instructions and test queries. Export `getContractsForTrack`.

- [ ] **Step 5: Run verification script**

Run: `npx tsx scripts/verify-paya-track.ts`
Expected: Tasks 1–3 PASS.

- [ ] **Step 6: Commit Task 3**

```bash
git add src/data/engineering_sample_datasets.ts src/data/engineering_sample_contracts.ts scripts/verify-paya-track.ts
git commit -m "feat(paya-track): add 3 isolated Paya datasets and 2 EPC+F/BOT contracts"
```

---

### Task 4: Track-Aware Session 1 & 5 Slides and NotebookLM Workshop Content

**Files:**
- Modify: `src/data/session1_and_5_curriculum.ts`
- Modify: `src/data/notebooklm_engineering_guide.ts`
- Modify: `src/data/notebooklm_sample_documents.ts`
- Modify: `scripts/verify-paya-track.ts`

**Interfaces:**
- Consumes: `IndustryTrackId`, `ProjectorSlideItem`, `DepartmentUseCase`, `PresentationInfographicBlueprint`, `NotebookLmExercise`, `SampleDepartmentDocument`
- Produces:
  - `getSessionCurriculumForTrack(trackId?: IndustryTrackId)` returning `{ s1DemoSlides, s1DriveSlides, s1MarkdownSlides, s1GithubSlides, s5CapstoneSlides, readmeMd, cleanCsvContent }`
  - `getNotebookLmGuideForTrack(trackId?: IndustryTrackId)` returning `{ overview, departments, blueprints, exercises }`
  - `getNotebookLmSampleDocsForTrack(trackId?: IndustryTrackId)` returning `{ departmentDocs, blueprintDocs, exerciseDocs }`

- [ ] **Step 1: Add Task 4 parity assertions to `scripts/verify-paya-track.ts`**

Assert:
1. `getSessionCurriculumForTrack('CIVIL_INFRA')` returns exact `S1_DEMO_SLIDES`, `SAMPLE_ENGINEERING_README_MD`, `SAMPLE_CLEAN_CSV_CONTENT`.
2. `getSessionCurriculumForTrack('PAYA_SAMAN_PARS')` returns Paya-specific slides (non-empty arrays matching deck lengths, containing `پایا سامان پارس` / `کاوه` / `EPC+F`), `readmeMd`, and valid `cleanCsvContent`.
3. Every `d.id` in `getNotebookLmGuideForTrack('PAYA_SAMAN_PARS').departments` (7 items) exists in `getNotebookLmSampleDocsForTrack('PAYA_SAMAN_PARS').departmentDocs`.
4. Every `b.id` in `blueprints` and `e.id` in `exercises` exists in `blueprintDocs` and `exerciseDocs` respectively.

- [ ] **Step 2: Run verification script to verify failure**

Run: `npx tsx scripts/verify-paya-track.ts`
Expected: FAIL because track-aware getters do not exist yet.

- [ ] **Step 3: Add `PAYA_*` curriculum decks and `getSessionCurriculumForTrack` in `src/data/session1_and_5_curriculum.ts`**

Preserve all existing exports intact; add Paya holding slide sets (`PAYA_S1_DEMO_SLIDES`, `PAYA_S1_DRIVE_SLIDES`, `PAYA_S1_MARKDOWN_SLIDES`, `PAYA_S1_GITHUB_SLIDES`, `PAYA_S5_CAPSTONE_SLIDES`), `PAYA_README_MD`, and `PAYA_CLEAN_CSV_CONTENT` (referencing 2 wings, 63 projects, 14 subsidiaries, Kaveh Industrial City, EPC+F/BOT DCC governance, and simulated educational figures), and export `getSessionCurriculumForTrack`.

- [ ] **Step 4: Add `PAYA_*` NotebookLM matrix, blueprints, exercises, sample docs, and selectors**

In `src/data/notebooklm_engineering_guide.ts`:
- Add `PAYA_NOTEBOOKLM_OVERVIEW`, `PAYA_UNIT_MANAGERS_MATRIX` (7 holding units: `paya_tech_bids`, `paya_contracts_epcf`, `paya_portfolio_pmo`, `paya_kaveh_energy`, `paya_housing_wing`, `paya_fleet_hse`, `paya_hr_holding`), `PAYA_PRESENTATION_INFOGRAPHIC_GUIDES`, `PAYA_NOTEBOOKLM_EXERCISES`, and `getNotebookLmGuideForTrack`.

In `src/data/notebooklm_sample_documents.ts`:
- Add matching `PAYA_SAMPLE_DEPARTMENT_DOCS` (all 7 unit IDs), `PAYA_SAMPLE_BLUEPRINT_DOCS`, `PAYA_SAMPLE_EXERCISE_DOCS`, and `getNotebookLmSampleDocsForTrack`.

- [ ] **Step 5: Run verification script**

Run: `npx tsx scripts/verify-paya-track.ts`
Expected: Tasks 1–4 PASS.

- [ ] **Step 6: Commit Task 4**

```bash
git add src/data/session1_and_5_curriculum.ts src/data/notebooklm_engineering_guide.ts src/data/notebooklm_sample_documents.ts scripts/verify-paya-track.ts
git commit -m "feat(paya-track): add Paya Session 1/5 slide decks and NotebookLM workshop assets"
```

---

### Task 5: Dedicated `PayaHoldingArtifactSimulator` Component

**Files:**
- Create: `src/components/PayaHoldingArtifactSimulator.tsx`

**Interfaces:**
- Consumes: `React`, `lucide-react`
- Produces: `PayaHoldingArtifactSimulator: React.FC<{ lang?: 'fa' | 'en' }>` and `PAYA_MOCK_PORTFOLIO_DATA`

- [ ] **Step 1: Add import check for `PayaHoldingArtifactSimulator` in `scripts/verify-paya-track.ts` (if verifiable without DOM) or check export via `tsc`**

Note: TSX component correctness is verified by `npm run lint` (`tsc --noEmit`) and live browser rendering in Task 8; add export verification of `PAYA_MOCK_PORTFOLIO_DATA` in `scripts/verify-paya-track.ts` verifying both wings and explicit `simulated_notice` metadata.

- [ ] **Step 2: Create `src/components/PayaHoldingArtifactSimulator.tsx`**

Mirror the 3-tab structure of `src/components/PetroClaudeArtifactSimulator.tsx` (`artifact` | `prompt` | `data`) with:
- Violet/indigo Paya executive theme and visible badge `داده‌های شبیه‌سازی‌شده آموزشی · ۶۳ پروژه و ۱۴ شرکت تابعه`
- Wing filter pills (`همه حوزه‌ها` | `بال پیمانکاری زیرساختی` | `بال سرمایه‌گذاری مسکن و کاوه`)
- Live KPI strip (63 projects, 14 subsidiaries, 5,000+ workforce, 8 domains + EPC+F/BOT mix)
- Interactive project cards (آزادراه تهران–شمال، SKF2 شیص–خورفکان امارات، مترو تبریز، پایانه سلام، نیروگاه خورشیدی ۵MW و تصفیه پلاسمای سرد کاوه، شهرک‌سازی آتی‌ساز/عمران مسکن)
- Offline simulated AI Q&A assistant answering holding-specific queries (`تهران-شمال`, `امارات`, `کاوه / خورشیدی / پلاسما`, `مسکن / آتی‌ساز`, `قرارداد / EPC+F / BOT`) + quick prompt chips + full copyable RCTO system prompt & JSON payload.

- [ ] **Step 3: Run `npm run lint` and `npx tsx scripts/verify-paya-track.ts`**

Run: `npx tsx scripts/verify-paya-track.ts && npm run lint`
Expected: PASS with 0 TS errors.

- [ ] **Step 4: Commit Task 5**

```bash
git add src/components/PayaHoldingArtifactSimulator.tsx scripts/verify-paya-track.ts
git commit -m "feat(paya-track): create interactive PayaHoldingArtifactSimulator component"
```

---

### Task 6: UI Shell — Track Switcher, 4-Card Track Modal, Grouped Discipline/Role Modal, Onboarding Presets, Sidebar, Admin & Quiz Labels

**Files:**
- Modify: `src/components/industry/IndustryTrackSwitcher.tsx`
- Modify: `src/components/industry/IndustryTrackSelectorModal.tsx`
- Modify: `src/components/industry/DisciplineSelectorModal.tsx`
- Modify: `src/components/OnboardingModal.tsx`
- Modify: `src/components/navigation/WorkspaceSidebar.tsx:370-395`
- Modify: `src/components/admin/AdminControlCenterModal.tsx:676-715`
- Modify: `src/components/InteractivePlacementQuiz.tsx:307-325`
- Modify: `src/components/tutor/ContextualAiTutorSidebar.tsx:13-18,560-575`

**Interfaces:**
- Consumes: `INDUSTRY_TRACKS`, `DISCIPLINE_REGISTRY`, `getDisciplinesByTrack`
- Produces:
  - 4th tab/option `'PAYA_SAMAN_PARS'` (`پایا سامان پارس`) across switcher & 4-card modal (`xl:grid-cols-4`)
  - 3-group discipline renderer + 4 Paya executive/holding roles in `DisciplineSelectorModal.tsx`
  - Optional `industryTrack?: IndustryTrackId` prop on `OnboardingModal.tsx` and `ContextualAiTutorSidebar` role map supporting Paya labels

- [ ] **Step 1: Update `IndustryTrackSwitcher.tsx` and `IndustryTrackSelectorModal.tsx`**

- In `IndustryTrackSwitcher.tsx`: import `Landmark`, add `isPaya = currentTrack === 'PAYA_SAMAN_PARS'`, update `order`, `dropdown` colors/label (`پایا سامان پارس`), and add 4th pill button with violet gradient.
- In `IndustryTrackSelectorModal.tsx`: import `Landmark`, update icon mapping for `'Landmark'`, change grid container to `grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5`.

- [ ] **Step 2: Update `DisciplineSelectorModal.tsx` with 3 Paya structural groups and 4 Paya OBS roles**

- Import `Landmark`.
- When `currentTrack === 'PAYA_SAMAN_PARS'`, group `disciplines` by `groupFa` / `groupEn` headers (`گروه الف: ستاد هلدینگ، قراردادها و کنترل پورتفو`, `گروه ب: بال پیمانکاری عمرانی و زیربنایی`, `گروه ج: بال سرمایه‌گذاری مسکن و شهرک‌سازی صنعتی`), keeping flat rendering untouched for the other 3 tracks.
- Add `isPaya` 4-tier roles (`director`: مدیرعامل / معاونت هلدینگ یا شرکت تابعه؛ `lead_superintendent`: مدیر طرح، کنسرسیوم یا سرپرست بهره‌برداری شهر صنعتی / مسکن؛ `technical_engineer`: کارشناس ارشد دفتر فنی، مناقصات، کنترل پروژه و امور پیمان؛ `site_operator`: رئیس کارگاه، ناظر اجرا، مهندس MEP و سرپرست ناوگان).
- Update header icon, badge (`هلدینگ پایا سامان پارس`), and helper subtitle for `isPaya`.

- [ ] **Step 3: Update `OnboardingModal.tsx`, `WorkspaceSidebar.tsx`, `AdminControlCenterModal.tsx`, `InteractivePlacementQuiz.tsx`, and `ContextualAiTutorSidebar.tsx`**

- `OnboardingModal.tsx`: accept `industryTrack?: IndustryTrackId`; when `industryTrack === 'PAYA_SAMAN_PARS'`, display Paya holding specialty presets (`PAYA_SPECIALTY_PRESETS`) first in the specialty presets selector.
- `WorkspaceSidebar.tsx`: show `پایا سامان پارس` in header track+discipline label when `industryTrack === 'PAYA_SAMAN_PARS'`.
- `AdminControlCenterModal.tsx`: update `<option value="ALL">` count from ۲۴ to ۳۲ (`کلیه دیسیپلین‌ها (۳۲ دیسیپلین)`) and add `<optgroup label="هلدینگ پایا سامان پارس (۸ دیسیپلین دو بال)">` filtering `d.trackId === 'PAYA_SAMAN_PARS'`.
- `InteractivePlacementQuiz.tsx`: add `PAYA_SAMAN_PARS` branch to `domainTrackBadgeFa` and `domainTrackBadgeEn`.
- `ContextualAiTutorSidebar.tsx`: resolve Paya-tailored role label when `industryTrack === 'PAYA_SAMAN_PARS'` before passing `roleTitle` to `/api/ai/tutor`.

- [ ] **Step 4: Run `npm run lint`**

Run: `npm run lint`
Expected: PASS with 0 TypeScript errors.

- [ ] **Step 5: Commit Task 6**

```bash
git add src/components/industry/ src/components/OnboardingModal.tsx src/components/navigation/WorkspaceSidebar.tsx src/components/admin/AdminControlCenterModal.tsx src/components/InteractivePlacementQuiz.tsx src/components/tutor/ContextualAiTutorSidebar.tsx
git commit -m "feat(paya-track): update switcher, 4-card modal, grouped discipline/role UI, and admin"
```

---

### Task 7: Wire `Page0`–`Page5`, `NotebookLmWorkshop`, `LlmForHumansBookModal`, and `App.tsx`

**Files:**
- Modify: `src/components/NotebookLmWorkshop.tsx`
- Modify: `src/components/book/LlmForHumansBookModal.tsx`
- Modify: `src/components/Page0LlmFundamentals.tsx`
- Modify: `src/components/Page1BusinessUnderstanding.tsx`
- Modify: `src/components/Page2ProblemIteration.tsx`
- Modify: `src/components/Page3SuccessCriteria.tsx`
- Modify: `src/components/Page4CostBenefit.tsx`
- Modify: `src/components/Page5ExpectedRoi.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes:
  - `getDatasetsForTrack`, `getContractsForTrack`, `getSessionCurriculumForTrack`, `getNotebookLmGuideForTrack`, `getNotebookLmSampleDocsForTrack`
  - `PayaHoldingArtifactSimulator`
- Produces:
  - `NotebookLmWorkshopProps` extended with `industryTrack?: IndustryTrackId`
  - `LlmForHumansBookModalProps` extended with `industryTrack?: IndustryTrackId`
  - `App.tsx` passing `industryTrack` to `LlmForHumansBookModal` & `OnboardingModal` and cleaning URL state gracefully without disturbing `/`.

- [ ] **Step 1: Update `NotebookLmWorkshop.tsx` and `LlmForHumansBookModal.tsx`**

- `NotebookLmWorkshop.tsx`: add `industryTrack?: IndustryTrackId`, consume `getNotebookLmGuideForTrack(industryTrack)` and `getNotebookLmSampleDocsForTrack(industryTrack)`, and add `useEffect([industryTrack])` resetting `selectedDeptId`, `selectedBlueprintId`, and `selectedExerciseId` to the first item of the active track's lists so stale IDs never occur.
- `LlmForHumansBookModal.tsx`: accept `industryTrack?: IndustryTrackId`, render `<PayaHoldingArtifactSimulator lang="fa" />` in Chapter 5 when `industryTrack === 'PAYA_SAMAN_PARS'`, otherwise render `<PetroClaudeArtifactSimulator lang="fa" />`.

- [ ] **Step 2: Update `Page0LlmFundamentals.tsx`**

- Import `getDatasetsForTrack`, `getContractsForTrack`, `getSessionCurriculumForTrack`, `PayaHoldingArtifactSimulator`.
- Add `PAYA_SAMAN_PARS` to `TRACK_RCTO_PILLARS` and `TRACK_METAPHORS` and `effectiveDiscipline` fallback (`'paya_portfolio_pmo'`).
- Compute `trackDatasets = getDatasetsForTrack(industryTrack)` and `trackContracts = getContractsForTrack(industryTrack)` and update `useEffect([industryTrack])` to set `selectedDatasetId` (`'paya_holding_portfolio'` for Paya, `'oil_gas_pipeline_epc'` for `ENERGY_PETRO`, and `trackDatasets[0]?.id` fallback) and `selectedContractId` (`'paya_epcf_consortium_contract'` for Paya, `'oil_gas_pipeline_epc_contract'` for `ENERGY_PETRO`, and `trackContracts[0]?.id` fallback).
- Replace static `S1_*_SLIDES`, `S5_CAPSTONE_SLIDES`, `SAMPLE_ENGINEERING_README_MD`, `SAMPLE_CLEAN_CSV_CONTENT` usages inside the component with `sessionCurriculum = getSessionCurriculumForTrack(industryTrack)`.
- Pass `industryTrack={industryTrack}` to `<NotebookLmWorkshop />`.
- Render `<PayaHoldingArtifactSimulator lang={lang} />` inside `engineering_dashboards` when `industryTrack === 'PAYA_SAMAN_PARS'`.
- Include `'پورتفوی پایا سامان پارس'` badge/icon in dataset tabs (`Landmark`) and `categoryFa` (`'هلدینگ پایا سامان پارس'`).

- [ ] **Step 3: Update `Page1BusinessUnderstanding.tsx` through `Page5ExpectedRoi.tsx` and `App.tsx`**

- Add `const isPaya = industryTrack === 'PAYA_SAMAN_PARS';` to `Page1`–`Page5`, adding Paya badges, user story prompts, Q3 question/options (`Page1`), Paya 2-wing/63-project case examples (`Page2`–`Page5`), and `useEffect([industryTrack])` updating calculator initial values in `Page4CostBenefit` and `Page5ExpectedRoi` when switching tracks.
- In `src/App.tsx`: pass `industryTrack={industryTrack}` to BOTH `<LlmForHumansBookModal />` instances (lines ~915 and ~1748) and BOTH `<OnboardingModal />` instances (lines ~878 and ~1711).

- [ ] **Step 4: Run `npm run lint` and `npm run build`**

Run: `npm run lint && npm run build`
Expected: PASS with 0 errors and clean Vite `dist/` bundle.

- [ ] **Step 5: Commit Task 7**

```bash
git add src/components/NotebookLmWorkshop.tsx src/components/book/LlmForHumansBookModal.tsx src/components/Page0LlmFundamentals.tsx src/components/Page1BusinessUnderstanding.tsx src/components/Page2ProblemIteration.tsx src/components/Page3SuccessCriteria.tsx src/components/Page4CostBenefit.tsx src/components/Page5ExpectedRoi.tsx src/App.tsx
git commit -m "feat(paya-track): wire track-aware workshops, book simulator, and Pages 0-5"
```

---

### Task 8: Final Regression Verification & Browser Preview Inspection

**Files:**
- Verify all files in `scripts/verify-paya-track.ts` and browser preview

- [ ] **Step 1: Run automated verification suite and production build**

Run:
```bash
npx tsx scripts/verify-paya-track.ts && npm run lint && npm run build
```
Expected: All assertions pass, 0 TS errors, clean production build.

- [ ] **Step 2: Visual and functional browser preview verification**

Start app via `preview_start` and verify in browser:
1. Open `http://localhost:3000/?track=PAYA_SAMAN_PARS&page=0` (and test `/paya`): confirm `پایا سامان پارس` is active without breaking `/` default.
2. Open Track Selector Modal: confirm 4 tracks render cleanly with `Landmark` icon and violet gradient.
3. Open Discipline Selector Modal: confirm 3 structural groups (`گروه الف` / `گروه ب` / `گروه ج`), 8 Paya disciplines, and 4 holding roles render cleanly.
4. On Page 0: verify 3 Paya datasets (`paya_infra_epc`, `paya_kaveh_housing`, `paya_holding_portfolio`), `PayaHoldingArtifactSimulator`, 2 Paya contracts, NotebookLM 7-department Paya matrix + downloads, and Session 1/5 slides.
5. Switch track to `CIVIL_INFRA`, `ENERGY_PETRO`, and `GENERAL_EVERYDAY` to verify zero regression and zero console/runtime errors (`preview_console_logs`).

- [ ] **Step 3: Clean up any temporary browser state and commit final check script updates if any**

Check `git status` and ensure only intended repository files remain.
