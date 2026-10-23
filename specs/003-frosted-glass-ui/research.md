# Phase 0 Research: مهندسی استایل گلس مات (Frosted Glassmorphism)

## ۱. تحلیل الگوهای فایل مرجع (`سرفصلهای کارگاه CPMAI (1).html` و `انتخاب دیسیپلین و رده سازمانی (2).html`)

در فایل‌های مرجع ارائه‌شده توسط کاربر، استایل شیشه‌ای مات (Frosted Glass) با مشخصات زیر طراحی شده است:

```css
:root {
  --glass: rgba(250, 253, 252, 0.62);
  --glass-line: rgba(255, 255, 255, 0.8);
  --tile: rgba(255, 255, 255, 0.5);
  --hover: rgba(18, 52, 59, 0.07);
  --nowbg: rgba(253, 240, 216, 0.9);
  --sheen: rgba(255, 255, 255, 0.3);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --glass: rgba(15, 31, 34, 0.56);
    --glass-line: rgba(255, 255, 255, 0.14);
    --tile: rgba(255, 255, 255, 0.05);
    --hover: rgba(255, 255, 255, 0.07);
    --nowbg: rgba(66, 52, 22, 0.85);
    --sheen: rgba(255, 255, 255, 0.06);
  }
}
```

## ۲. مشخصات فیزیکی لایه گلس مات

- **بلور و اشباع نوری**: `-webkit-backdrop-filter: blur(26px) saturate(1.6); backdrop-filter: blur(26px) saturate(1.6);`
- **لبه‌های نوری شیشه (Inner Highlight & Border)**: `border: 1px solid var(--glass-line); box-shadow: inset 0 1px 0 var(--glass-line), 0 24px 60px rgba(8, 30, 35, 0.14);`
- **گرادیان لایه شفاف بالایی (`::before`)**: `linear-gradient(135deg, var(--sheen), transparent 38%)` برای ایجاد انکسار نوری پرمیوم بدون افزایش بار رندر GPU.

## ۳. تصمیمات پیاده‌سازی
1. اضافه کردن کلاس‌های معنایی `.frosted-glass` و `.frosted-tile` به `src/index.css`.
2. اعمال مستقیم به کامپوننت‌های [WorkspaceSidebar.tsx](src/components/navigation/WorkspaceSidebar.tsx) و [DisciplineSelectorModal.tsx](src/components/industry/DisciplineSelectorModal.tsx).
3. تضمین کنتراست متن‌های فارسی با استفاده از رنگ‌های تیره باکلاس (`#12343b` در لایت و `#e4f0ee` در دارک).
