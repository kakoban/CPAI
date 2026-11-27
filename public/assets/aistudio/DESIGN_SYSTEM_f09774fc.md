# Design system — RTL / Persian

## جهت بصری
الهام از مکتب‌خونه: سطح‌های روشن، رنگ تأکیدی محدود، تایپوگرافی آرام و فضای سفید. برند و دارایی‌های مکتب‌خونه را کپی نکن.

## توکن‌ها
رنگ‌های مصوب گفتگو: primary #007D86، primary strong #07515A، page #F8F9FA، surface #FFFFFF، text #242B30، muted #646D73. بقیه توکن‌ها در tokens.css پیشنهاد اجرایی هستند و باید با contrast و Figma تطبیق داده شوند. رنگ وضعیت تنها نشانه نباشد.

## تایپوگرافی
Vazirmatn (در صورت وجود یا با مجوز مناسب؛ فونت فایل ضمیمه نشده). fallback: Tahoma, sans-serif. عنوان درس حدود 30px، وزن 600–700؛ متن درس 18–20px وزن 400، line-height 1.6 یا بیشتر برای خوانایی فارسی. عنوان فرعی 20–24، متن UI 14–16. از bold کردن کل پاراگراف پرهیز. برای کد، URL، ایمیل و عبارات انگلیسی از dir=ltr یا bdi استفاده کن؛ کل صفحه RTL بماند.

## فاصله و ساختار پیشنهادی
مقیاس 4/8/12/16/24/32/48؛ radius 8–12؛ border کم‌رنگ فقط برای جداسازی ضروری. سایه بسیار کم. یک CTA اصلی در هر ناحیه. هدف لمس حداقل 44×44px. از کارت تو در تو پرهیز. متن بلند به عرض خوانا محدود شود؛ نمونه Figma محتوای 904px دارد اما در نمایشگر واقعی responsive باشد.

## کامپوننت‌ها
AppShell، Header، Sidebar، StepList، Progress، Breadcrumb، LessonContent، Callout، ComparisonTable، CodeBlock، LessonNavigation، SandboxPanel، TutorPanel، Button، Dialog/Drawer، Empty/Error/Loading state. نام‌ها پیشنهادی؛ اجزای موجود را reuse کن. هر جزء وضعیت focus، disabled، loading و error مناسب داشته باشد.

## حالت تاریک
از semantic tokens استفاده کن؛ نمونه رنگ‌های تاریک در CSS پیشنهاد هستند. از معکوس‌کردن ساده تصاویر یا رنگ‌ها خودداری کن. contrast متن، کد و نمودارها بررسی شود. تنظیم فعلی theme حفظ شود؛ اگر وجود ندارد نیازمند تأیید جداگانه.
