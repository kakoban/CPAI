# Contract: Domain Track Examples & Registry

**Files**: `src/data/domainTrackExamples.ts` & `src/data/disciplineExamplesRegistry.ts`  
**Feature**: `005-everyday-general-track`

## 1. Domain Phase Examples Contract

```typescript
export interface DomainTrackExamplesRegistry {
  CIVIL_INFRA: Record<number, DomainPhaseExample>;
  ENERGY_PETRO: Record<number, DomainPhaseExample>;
  GENERAL_EVERYDAY: Record<number, DomainPhaseExample>;
}
```

- Every entry for `GENERAL_EVERYDAY[1..6]` MUST have non-empty bilingual fields (`titleFa/En`, `exampleNoteFa/En`, `artifacts.backgroundFa/En`, `artifacts.primaryObjectiveFa/En`, `artifacts.relatedQuestionsFa/En`).
- No `undefined` or placeholder string allowed.

## 2. Discipline Registry Contract

```typescript
export interface DisciplineExampleItem {
  id: DisciplineId;
  trackId: IndustryTrackId;
  titleFa: string;
  titleEn: string;
  shortTitleFa: string;
  shortTitleEn: string;
  roleDescriptionFa: string;
  roleDescriptionEn: string;
  coreChallengesFa: string[];
  coreChallengesEn: string[];
  iconName: string;
  defaultPromptTemplate: string;
}
```

- Exactly 8 items in `DISCIPLINE_REGISTRY` MUST have `trackId === 'GENERAL_EVERYDAY'`.
- All 8 IDs MUST match the `general_*` pattern in `DisciplineId`.
