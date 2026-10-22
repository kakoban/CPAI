# CPAI Architecture & Engineering Constitution

## Core Principles

### I. Zero Compiler Errors & Build Reliability (NON-NEGOTIABLE)
All modifications must preserve 100% clean TypeScript typing. `npm run lint` (`tsc --noEmit`) and `npm run build` (`vite build`) must pass with zero errors and zero unhandled type warnings before any commit or pull request. No `any` type escapes at domain boundaries.

### II. Modularity & Anti-Monolith Architecture
Avoid inflating monolithic components (e.g. `App.tsx` or `Page0LlmFundamentals.tsx`). New features must:
- Be decomposed into modular, single-responsibility components (target: < 400 lines per file).
- Separate presentation UI from business logic, data models, and API calls.
- Place domain mock datasets in `src/data/`, service calls in `src/services/`, and shared interfaces in `src/types/`.

### III. Dual-Track Domain Isolation
The application serves two distinct engineering tracks:
1. **Civil Infrastructure & Transportation Megaprojects**
2. **Oil, Gas & Petrochemical Engineering**

All prompt templates, simulator modules, interactive exercises, and contracts must maintain strict track boundaries. Shared core logic (CPMAI 7 patterns, LMS drip locks) must remain domain-agnostic.

### IV. Bilingual (FA/EN) & RTL Persian Typography
- All user-facing interfaces must support Persian (primary) and English with native RTL layout.
- Use clean UTF-8 encoding without corrupt escape sequences.
- Keep typography aligned with Vazirmatn and standard Iranian engineering terminology.

### V. Serverless & Cold-Start Resilience
The backend runs on serverless environments (Vercel/Neon/Supabase) where connections may sleep. All frontend API services (`authApi.ts`, `lmsApi.ts`) must supply safe local fallback sessions to ensure zero disruption to students during cold starts or offline training.

## Development Workflow & Quality Gates

1. **Specify First**: Run `/speckit-specify` to define acceptance criteria and compatibility boundaries before modifying code.
2. **Plan & De-Risk**: Run `/speckit-plan` to map affected files and avoid unintended coupling.
3. **Task Breakdown**: Run `/speckit-tasks` to create atomic, testable increments.
4. **Implementation**: Run `/speckit-implement` keeping diffs focused and minimal.
5. **Convergence**: Run `/speckit-converge` and verify `npm run lint` and `npm run build` pass completely.

## Governance
This constitution governs all future feature additions, refactoring, and AI-assisted contributions to the CPAI repository. Any architectural deviation must be ratified in this document.

**Version**: 1.0.0 | **Ratified**: 2026-10-22 | **Last Amended**: 2026-10-22
