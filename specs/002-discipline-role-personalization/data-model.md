# Phase 1 Data Model: ساختار داده‌های دیسیپلین‌ها و رده‌های سازمانی

## ۱. مدل داده شناسه‌ها و موجودیت‌های دیسیپلین (`DisciplineProfile`)

```typescript
import { IndustryTrackId } from '../../src/types/industryTrack';

export type CivilDisciplineId =
  | 'civil_tbm_tunnel'
  | 'civil_stations_natm'
  | 'civil_precast_segment'
  | 'civil_track_systems'
  | 'civil_highways_bridges'
  | 'civil_technical_claims'
  | 'civil_geotech_monitoring'
  | 'civil_heavy_fleet';

export type PetroDisciplineId =
  | 'petro_process_safety'
  | 'petro_piping_layout'
  | 'petro_mechanical_heavy'
  | 'petro_electrical_inst'
  | 'petro_civil_structure'
  | 'petro_procurement_expediting'
  | 'petro_qaqc_ndt'
  | 'petro_commissioning_pcc';

export type DisciplineId = CivilDisciplineId | PetroDisciplineId;

export type EngineeringRoleId =
  | 'director'            // مدیر طرح / مدیر پروژه
  | 'lead_superintendent' // سرپرست دیسیپلین / رئیس کارگاه
  | 'technical_engineer'  // مهندس دفتر فنی / کنترل پروژه / ناظر
  | 'site_operator';      // اپراتور / جنرال فورمن / بازرس کیفی

export interface DisciplineMetadata {
  id: DisciplineId;
  trackId: IndustryTrackId;
  titleFa: string;
  titleEn: string;
  iconName: string;
  governingStandardsFa: string[];
  governingStandardsEn: string[];
  performanceMetricsFa: string[];
  performanceMetricsEn: string[];
  descriptionFa: string;
  descriptionEn: string;
}

export interface DisciplineExampleContent {
  disciplineId: DisciplineId;
  roleId?: EngineeringRoleId;
  businessProblemFa: string;
  businessProblemEn: string;
  whyAiFa: string;
  whyAiEn: string;
  successCriteriaFa: string[];
  successCriteriaEn: string[];
  costBenefitSummaryFa: string;
  costBenefitSummaryEn: string;
  roiEstimateFa: string;
  roiEstimateEn: string;
}
```

## ۲. ماندگاری داده در کلاینت (`Client Storage`)

- کلید دیسیپلین انتخابی: `'cpmai_selected_discipline_id'`
- کلید رده نقشی انتخابی: `'cpmai_selected_engineering_role'`
- در صورت عدم وجود، مقادیر پیش‌فرض بر اساس دامنه کلان اعمال می‌شوند:
  - برای `CIVIL_INFRA`: `civil_tbm_tunnel`
  - برای `ENERGY_PETRO`: `petro_process_safety`
