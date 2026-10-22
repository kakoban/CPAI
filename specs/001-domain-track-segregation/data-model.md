# Phase 1 Data Model: ساختار داده‌های تفکیک دامنه‌ها

## ۱. مدل داده دامنه تخصصی (`DomainTrackContent`)

```typescript
import { IndustryTrackId } from '../../src/types/industryTrack';

export interface DomainExampleArtifact {
  backgroundFa: string;
  backgroundEn: string;
  primaryObjectiveFa: string;
  primaryObjectiveEn: string;
  relatedQuestionsFa: string[];
  relatedQuestionsEn: string[];
  sampleDatasetTitleFa: string;
  sampleDatasetTitleEn: string;
  sampleContractClauseFa: string;
  sampleContractClauseEn: string;
}

export interface DomainPhaseExample {
  phaseId: number; // 1 to 6
  subtaskId?: number; // 1 to 21
  trackId: IndustryTrackId;
  titleFa: string;
  titleEn: string;
  exampleNoteFa: string;
  exampleNoteEn: string;
  artifacts: DomainExampleArtifact;
  quizScenarioFa?: string;
  quizScenarioEn?: string;
}

export type DomainTrackExamplesRegistry = Record<
  IndustryTrackId,
  Record<number, DomainPhaseExample>
>;
```

## ۲. موجودیت‌های کلیدی

1. **`IndustryTrackId`**: شناسه کلید دوگانه:
   - `'CIVIL_INFRA'`: مگاپروژه‌های عمرانی، راه و شهرسازی، مترو، سد و پل
   - `'ENERGY_PETRO'`: صنایع نفت، گاز، پالایشگاه، پتروشیمی و انرژی
2. **`DomainPhaseExample`**: محتوای آموزشی مستقل و تخصصی متناظر با هر گام از متدولوژی CPMAI.
3. **`DomainExampleArtifact`**: سناریوهای ملموس شامل پیش‌زمینه پروژه، هدف اصلی کسب‌وکار، سوالات پیرامونی، دیتاست مرتبط و بند قراردادی متناظر.
