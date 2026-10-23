# Phase 1 Data Model: ساختار داده کلاس‌ها، اسلات‌های زمانی و دسته‌بندی نفرات

## ۱. مدل داده ارتقایافته کلاس (`ClassEntity`)

```typescript
export interface ClassEntity {
  id: string;
  code: string;            // e.g. "20261024_SLOT5" or "METRO-LINE10"
  title: string;           // Custom Human Title assigned by Admin
  organization?: string;   // e.g. "شرکت راه‌آهن شهری تهران" or "پالایشگاه پارس"
  isLeaderboardVisible: boolean;
  studentCount?: number;
  testedCount?: number;
  averageScore?: number;
  createdAt: string;
  isAutoSlot?: boolean;    // True if created via 2-hour window
  slotWindowLabel?: string; // e.g. "۱۴:۰۰ الی ۱۶:۰۰"
}
```

## ۲. مدل داده آیتم جدول کاربران (`UserRegistryItem`)

```typescript
export interface UserRegistryItem {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  specialty?: string;
  trackId?: 'CIVIL_INFRA' | 'ENERGY_PETRO';
  disciplineId?: string;
  roleId?: string;
  classId?: string;
  classCode?: string;
  classTitle?: string;
  aiLevel: 'beginner' | 'intermediate' | 'advanced' | string;
  role: 'admin' | 'user';
  testedTier?: string;
  score?: number;
  maxScore?: number;
  percentage?: number;
  alignmentIndex?: 'Matches' | 'Below Tier' | 'Above Tier' | string;
  canRetakeQuiz?: boolean;
  createdAt: string;
}
```

## ۳. مدل درخواست ویرایش کلاس (`UpdateClassPayload`)

```typescript
export interface UpdateClassPayload {
  classId: string;
  title: string;
  organization?: string;
  isLeaderboardVisible?: boolean;
}
```
