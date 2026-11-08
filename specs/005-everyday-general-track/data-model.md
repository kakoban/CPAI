# Data Model: 005 - Everyday, Family & Viral Lifestyle AI Domain Track

**Date**: 2026-10-25  
**Feature**: [spec.md](./spec.md)

## 1. Domain Types & Enums

### IndustryTrackId
```typescript
export type IndustryTrackId = 'CIVIL_INFRA' | 'ENERGY_PETRO' | 'GENERAL_EVERYDAY';
```

### DisciplineId
```typescript
export type DisciplineId =
  // Civil & Infrastructure (8)
  | 'civil_tbm_tunnel'
  | 'civil_stations_natm'
  | 'civil_precast_segment'
  | 'civil_track_systems'
  | 'civil_highways_bridges'
  | 'civil_technical_claims'
  | 'civil_geotech_monitoring'
  | 'civil_heavy_fleet'
  // Energy & Petrochemical (8)
  | 'petro_process_safety'
  | 'petro_piping_layout'
  | 'petro_mechanical_heavy'
  | 'petro_electrical_inst'
  | 'petro_civil_structure'
  | 'petro_procurement_expediting'
  | 'petro_qaqc_ndt'
  | 'petro_commissioning_pcc'
  // General, Family & Everyday Lifestyle (8)
  | 'general_family_parenting'
  | 'general_household_finance'
  | 'general_travel_lifestyle'
  | 'general_viral_content'
  | 'general_ecommerce_retail'
  | 'general_health_nutrition'
  | 'general_personal_productivity'
  | 'general_customer_care';
```

## 2. Key Entities

### Entity: IndustryTrackInfo
- **id**: `IndustryTrackId`
- **titleFa / titleEn**: نام رسمی مسیر
- **shortTitleFa / shortTitleEn**: نام مختصر برای دکمه‌ها و چیپ‌ها
- **taglineFa / taglineEn**: شعار و زیرعنوان مسیر
- **descriptionFa / descriptionEn**: توضیحات کامل مأموریت مسیر
- **iconName**: آیکون Lucide (`'Building2' | 'Factory' | 'Sparkles'`)
- **scopePillsFa / scopePillsEn**: حوزه‌های شمول محتوایی
- **governingStandardsFa / governingStandardsEn**: استانداردهای راهنما
- **defaultCaseStudy**: پروژه مرجع پیش‌فرض
- **accentColor / gradient / borderColor / glowColor**: استایل بصری تم

### Entity: DisciplineMeta
- **id**: `DisciplineId`
- **trackId**: `IndustryTrackId`
- **titleFa / titleEn**: نام تخصص
- **shortTitleFa / shortTitleEn**: عنوان کوتاه
- **roleDescriptionFa / roleDescriptionEn**: شرح نقش و مسئولیت‌ها
- **coreChallengesFa / coreChallengesEn**: چالش‌های روزمره شغلی/فردی
- **iconName**: نام آیکون Lucide
- **defaultPromptTemplate**: ساختار پرامپت طلایی اولیه

### Entity: DomainPhaseExample (Phases 1-6)
- **phaseId**: شماره فاز (1 الی 6)
- **trackId**: `'GENERAL_EVERYDAY'`
- **titleFa / titleEn**: عنوان پروژه فاز
- **exampleNoteFa / exampleNoteEn**: خلاصه و چکیده کاربردی
- **artifacts**:
  - **backgroundFa / backgroundEn**: زمینه سناریو
  - **primaryObjectiveFa / primaryObjectiveEn**: هدف کلیدی
  - **relatedQuestionsFa / relatedQuestionsEn**: پرسش‌های هدایت‌کننده
  - **sampleDatasetTitleFa / sampleDatasetTitleEn**: نمونه داده‌های ورودی
  - **sampleContractClauseFa / sampleContractClauseEn**: قوانین / ضوابط توافق مصرف‌کننده و بودجه

### Entity: DisciplinePromptPair
- **weakPromptFa / weakPromptEn**: نمونه پرامپت ضعیف و کلیشه‌ای
- **weakCritiqueFa / weakCritiqueEn**: نقد ساختاری نقاط ضعف پرامپت
- **engineeredPromptFa / engineeredPromptEn**: پرامپت کامل ارتقایافته مبتنی بر متدولوژی RCTO با واژگان و ادبیات تخصصی متناسب با دیسیپلین و مسیر انتخابی
- **engineeredBreakdownFa / engineeredBreakdownEn**:
  - **role**: نقش متناسب با دیسیپلین (مهندس ناظر در ابنیه، مهندس فرآیند در نفت و گاز، مربی/مشاور در روزمره)
  - **context**: زمینه چالش واقعی با اعداد، استانداردها و تلمتری
  - **task**: وظیفه دقیق و عملیاتی بدون ابهام
  - **output**: ساختار خروجی مقید به جدول یا چک‌لیست کاربردی

### Entity: TrackRctoPillars
- **trackId**: `IndustryTrackId`
- **roleExampleFa / roleExampleEn**: نمونه نقش متناسب با ترک
- **contextExampleFa / contextExampleEn**: نمونه زمینه متناسب با ترک
- **taskExampleFa / taskExampleEn**: نمونه وظیفه متناسب با ترک
- **outputExampleFa / outputExampleEn**: نمونه ساختار خروجی متناسب با ترک

## 3. Storage & State Management
- **Local Storage Key**: `cpmai_selected_industry_track` -> ذخیره `'CIVIL_INFRA' | 'ENERGY_PETRO' | 'GENERAL_EVERYDAY'`
- **Local Storage Key**: `cpmai_selected_discipline_id` -> ذخیره شناسه دیسیپلین انتخابی
- **Fallback Rule**: اگر دیسیپلین ذخیره‌شده با ترک انتخاب‌شده ناهمخوان باشد، تابع `getSavedDiscipline(trackId)` فراخوانی شده و مقدار پیش‌فرض معتبر تنظیم می‌شود:
  - `CIVIL_INFRA` -> `'civil_tbm_tunnel'`
  - `ENERGY_PETRO` -> `'petro_process_safety'`
  - `GENERAL_EVERYDAY` -> `'general_household_finance'`

