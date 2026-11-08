# Contract: Discipline Prompt Showcase & Domain Vibe Authorization

**Files**: `src/data/disciplineExamplesRegistry.ts` & `src/types/industryTrack.ts`  
**Feature**: `005-everyday-general-track`

## Purpose

Guarantees that `getDisciplinePromptShowcase(disciplineId)` generates domain-authentic, structurally authorized prompts for all 24 disciplines across Civil, Petro, and Everyday tracks without cross-domain jargon contamination.

## Interface Contract

```typescript
export interface DisciplinePromptPair {
  weakPromptFa: string;
  weakPromptEn: string;
  weakCritiqueFa: string;
  weakCritiqueEn: string;
  engineeredPromptFa: string;
  engineeredPromptEn: string;
  engineeredBreakdownFa: { role: string; context: string; task: string; output: string };
  engineeredBreakdownEn: { role: string; context: string; task: string; output: string };
}

export function getDisciplinePromptShowcase(disciplineId: DisciplineId): DisciplinePromptPair;
```

## Behavioral Invariants & Domain Boundaries

### 1. Civil & Infrastructure Track (`CIVIL_INFRA` - 8 Disciplines)
- **Role Invariant**: Must speak as an experienced site engineer, geotechnical specialist, tunnel engineer, or contract claims coordinator.
- **Reference Standards**: Must reference Circular 4311 (نشریه ۴۳۱۱), BTS, ABA (آیین‌نامه بتن ایران), Circular 55 (نشریه ۵۵), or Part 7 of National Building Code.
- **Tone & Vocabulary**: Rigorous, technical, site-oriented (e.g., TBM face pressure, ground settlement mm, load cells, anchor shoring, contractor claims).
- **Output Schema**: 4-column engineering table: `[عامل بحرانی ژئوتکنیک/سازه | حد مجاز استاندارد | انحراف اندازه‌گیری‌شده | اقدام اصلاحی کارگاه / دفتر فنی]`.

### 2. Oil, Gas & Petrochemical Track (`ENERGY_PETRO` - 8 Disciplines)
- **Role Invariant**: Must speak as a refinery process simulation engineer, NDT/QAQC inspector, PC&C commissioning supervisor, or Process Safety/HAZOP lead.
- **Reference Standards**: Must reference FIDIC Silver Book, API 1104, ASME B31.3 / B31.8, OSHA 1910.119 PSM, or API 520/521.
- **Tone & Vocabulary**: Industrial plant, DCS telemetry, thermal fouling, flaring emissions, hydrotest, piping spools, catalyst loading, heavy lift rigging.
- **Output Schema**: 4-column plant matrix: `[تگ فرآیندی / تجهیز بحرانی | حد مجاز عملیاتی (MAWP/SOP) | انحراف تلمتری DCS | دستور کار اتاق کنترل و بهره‌برداری]`.

### 3. General, Everyday, Family & Lifestyle Track (`GENERAL_EVERYDAY` - 8 Disciplines)
- **Role Invariant**: Must speak as an empathetic, practical family mentor, household economist, smart travel curator, viral content strategist, smart shopper, health coach, or diplomatic communicator.
- **Zero Jargon Contamination**: Must NEVER use industrial or construction terms like "شیفت", "اقدام اصلاحی شیفت", "مهندس ارشد کارگاه", or "تلمتری سنسورها".
- **Reference Standards**: Must reference UNESCO AI literacy, 50/30/20 budgeting, EPA Zero Food Waste, Positive Parenting principles, or Nonviolent Communication (NVC).
- **Tone & Vocabulary**: Conversational, empowering, encouraging, warm, practical and natural Persian phrasing.
- **Output Schema**: Practical, actionable checklist or household table: `[موضوع دغدغه / قلم مصرفی | راهکار هوشمند | صرفه‌جویی زمان / هزینه | گام اجرایی مشخص همین امروز]`.

## Verification Gate

For any discipline $d \in \text{DISCIPLINE\_REGISTRY}$:
1. All fields of `DisciplinePromptPair` MUST be non-empty strings.
2. If `d.trackId === 'GENERAL_EVERYDAY'`, `engineeredPromptFa` MUST NOT contain the word `شیفت` or `مهندس ارشد`.
3. If `d.trackId === 'CIVIL_INFRA'`, `engineeredPromptFa` MUST contain at least one civil engineering or Circular 4311 reference.
4. If `d.trackId === 'ENERGY_PETRO'`, `engineeredPromptFa` MUST contain at least one refinery, process safety, or EPC reference.
