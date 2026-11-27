# برنامه اجرایی

## فاز صفر — بررسی بدون تغییر
- خواندن repo و دستورالعمل‌ها؛ تشخیص framework، package manager، مسیرها، componentها، theme، data flow، auth، progress، sandbox، AI، admin و test scripts.
- ثبت شاخه پایه و commit، git status، وضعیت محیط و محدودیت دسترسی Figma.
- اجرای تست/build موجود در محیط امن با داده آزمایشی؛ ثبت خطاهای baseline. هیچ اتصال به production بدون مجوز.
- جدول mapping فریم → route → component → data source → وضعیت موجود/ناقص/غایب. گزارش ریسک و برنامه پیشنهادی برای تأیید مالک.

## فاز ۱ — شاخه و پایه بصری
پس از تأیید برنامه و شاخه پایه، در working tree تمیز برنچ feature/ui-ux-redesign ایجاد کن. اگر نام موجود است، توقف و بررسی. توکن‌ها را به theme موجود نگاشت کن، RTL و typography را با کمترین تغییر مشترک تنظیم کن. از تغییر global پرریسک پرهیز.

## فاز ۲ — پایلوت AI Skills
الگوی focused reader را با داده واقعی یک ماژول پیاده کن؛ StepList، renderer، navigation، responsive و حفظ progress. مقایسه و سندباکس موجود را تطبیق بده. قبل/بعد و تست‌ها را ارائه کن. پس از پذیرش، تعمیم به دیگر ماژول‌ها.

## فاز ۳ — تعمیم و داشبورد
تمام انواع محتوای موجود و ماژول‌های دیگر را inventory کن؛ الگوی مشترک را تدریجی اعمال کن. داشبورد و نقشه راه را با داده و routing فعلی هماهنگ کن. موبایل را همزمان تست کن.

## فاز ۴ — امکانات تکمیلی
تاریک، سطح‌سنجی، admin، reports، presentation و AI tutor را فقط در حد قابلیت موجود بازطراحی کن. هر قابلیت غایب را جداگانه با هزینه/ریسک پیشنهاد بده؛ خودسرانه ایجاد نکن.

## فاز ۵ — QA و تحویل
اجرای lint/typecheck/test/build موجود، regression مسیرهای حیاتی، بررسی بصری RTL و responsive، accessibility، security و performance. گزارش موارد اجرا نشده و تفاوت با baseline. diff نهایی و commitهای کوچک؛ PR draft در صورت مجوز. merge و deploy خارج از اختیار پیش‌فرض.

## نمونه commitها (پیشنهادی)
- style: map CPAI semantic design tokens
- feat: introduce focused lesson reader
- feat: adapt existing sandbox to lesson flow
- feat: align dashboard and roadmap UI
- test: cover lesson navigation and progress regression

## rollback
برنچ مستقل را حفظ کن؛ برای بازگشت از commitهای مشخص از روش non-destructive مانند revert پس از تأیید استفاده کن. هیچ reset یا force push. چون production تغییر نمی‌کند، rollback عملیاتی در این مرحله لازم نیست.
