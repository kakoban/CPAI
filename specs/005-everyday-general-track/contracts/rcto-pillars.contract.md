# Contract: Track-Adaptive RCTO Four Pillars in Module 0

**File**: `src/components/Page0LlmFundamentals.tsx`  
**Feature**: `005-everyday-general-track`

## Purpose

Ensures that the 4 pillars of the RCTO framework (Role, Context, Task, Output) rendered in Module 0 (Session 2 / Section 2-2) dynamically display domain-authentic examples tailored to the currently active track (`CIVIL_INFRA`, `ENERGY_PETRO`, or `GENERAL_EVERYDAY`), rather than generic static examples.

## Data Structure Contract

```typescript
export interface RctoPillarExample {
  roleFa: string;
  roleEn: string;
  contextFa: string;
  contextEn: string;
  taskFa: string;
  taskEn: string;
  outputFa: string;
  outputEn: string;
}

export const TRACK_RCTO_PILLARS: Record<IndustryTrackId, RctoPillarExample>;
```

## Track Content Specifications

### 1. `CIVIL_INFRA`
- **Role**:
  - FA: «تو مهندس ارشد ژئوتکنیک و ناظر مقیم احداث خط مترو بر مبنای نشریه ۴۳۱۱ هستی...»
  - EN: "You are a Lead Geotechnical Engineer and resident metro inspector adhering to Circular 4311..."
- **Context**:
  - FA: «دستگاه TBM در حال نزدیک شدن به تقاطع با لوله گاز پرفشار شهری در عمق ۱۸ متری است و داده‌های انکلینومتر نشست ۳ میلی‌متری را نشان می‌دهند...»
  - EN: "The TBM drive is approaching a high-pressure municipal gas main at 18m depth with inclinometers recording 3mm settlement..."
- **Task**:
  - FA: «ریسک فرونشست را ارزیابی، پارامترهای بهینه فشار سینه کار را تعیین و دستور کار فوری برای شیفت بعد صادر کن...»
  - EN: "Assess subsidence risk, calculate optimal face-support pressure, and prescribe immediate excavation instructions..."
- **Output**:
  - FA: «پاسخ را در یک جدول فنی ۴ ستونه شامل: [پارامتر TBM | مقدار فعلی | حد مجاز استاندارد | اقدام اصلاحی کارگاه] بدون مقدمه بنویس.»
  - EN: "Output a 4-column engineering table: [TBM Parameter | Current Telemetry | Allowable Limit | Site Action Plan] without preamble."

### 2. `ENERGY_PETRO`
- **Role**:
  - FA: «تو مهندس ارشد فرآیند و هماهنگ‌کننده جلسات HAZOP در پالایشگاه میعانات گازی هستی...»
  - EN: "You are a Lead Process Engineer and HAZOP coordinator at a gas condensate refinery..."
- **Context**:
  - FA: «افت فشار در مبدل‌های حرارتی پیش‌گرمایش به ۳.۲ بار رسیده و دمای خروجی به کوره ۵ درجه کاهش یافته که ریسک کک‌گرفتگی و شات‌دان ایجاد کرده است...»
  - EN: "Preheat train heat exchanger differential pressure hit 3.2 bar with a 5°C furnace inlet drop, risking emergency coking trips..."
- **Task**:
  - FA: «علت هیدرولیکی رسوب را تحلیل، زمان بحرانی شستشو با حلال را پیش‌بینی و پروتکل پیشگیری از مشعل‌سوزی را تدوین کن...»
  - EN: "Analyze hydraulic fouling kinetics, forecast descaling timeline, and formulate flaring mitigation protocols..."
- **Output**:
  - FA: «پاسخ را در یک ماتریس ایمنی فرآیندی شامل: [تجهیز بحرانی | انحراف فشار/دما | پیامد HAZOP | دستور اقدام اتاق کنترل] ارائه بده.»
  - EN: "Output as a process safety matrix: [Critical Equipment | Deviation | HAZOP Consequence | CCR Action Directive]."

### 3. `GENERAL_EVERYDAY`
- **Role**:
  - FA: «تو مشاور و مربی هوشمند اقتصاد خانوار و برنامه‌ریزی زندگی خانوادگی هستی...»
  - EN: "You are a Smart Family Lifestyle & Household Economics Coach..."
- **Context**:
  - FA: «خانواده ما ۴ نفره است و ماهانه نزدیک به ۲۵٪ از خریدهای سوپرمارکت و میوه به دلیل فراموشی در یخچال دور ریخته می‌شود...»
  - EN: "Our 4-person family currently discards nearly 25% of fresh supermarket groceries due to pantry disorganization..."
- **Task**:
  - FA: «با تحلیل اقلام پرمصرف، ۵ ترفند سریع برای صفر کردن دورریز، برنامه غذایی با باقیمانده‌ها و روش پس‌انداز بودجه برای سفر تابستانی پیشنهاد بده...»
  - EN: "Identify high-spoilage items, propose 5 quick zero-waste hacks, a leftover meal plan, and a vacation micro-savings rule..."
- **Output**:
  - FA: «پاسخ را در قالب یک جدول کاربردی و دوستانه شامل: [قلم مصرفی / دغدغه | راهکار هوشمند روزمره | صرفه‌جویی ریالی ماهانه | اقدام عملی همین امروز] بنویس.»
  - EN: "Output as a friendly, actionable household table: [Item / Concern | Smart Everyday Hack | Monthly Savings | Immediate Today Action]."
