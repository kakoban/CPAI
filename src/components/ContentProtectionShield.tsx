import React, { useEffect, useState, useCallback } from 'react';
import { Shield, ShieldAlert, Lock, EyeOff, RotateCcw } from 'lucide-react';
import { Language } from '../types/cpmai';

interface ContentProtectionShieldProps {
  lang: Language;
  isAdmin?: boolean;
}

export const ContentProtectionShield: React.FC<ContentProtectionShieldProps> = ({
  lang,
  isAdmin = false
}) => {
  const [warningToast, setWarningToast] = useState<{ message: string; type: 'warn' | 'info' } | null>(
    null
  );
  const [isShieldActive, setIsShieldActive] = useState<boolean>(false);
  const [shieldReason, setShieldReason] = useState<string>('');

  const showToast = useCallback((message: string, type: 'warn' | 'info' = 'warn') => {
    setWarningToast({ message, type });
    const timer = setTimeout(() => {
      setWarningToast(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  // Wipes clipboard so any captured screen buffer is replaced with copyright notice
  const wipeClipboard = useCallback(() => {
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard
          .writeText(
            lang === 'fa'
              ? '⚠️ اخطار کپی‌رایت اوج: کلیه حقوق مادی و معنوی متدولوژی و کتاب‌کار انحصاری CPMAI متعلق به مؤسسه مشاوران مدیریت کسب‌وکار اوج (OWJ) است. هرگونه اسکرین‌شات، کپی‌برداری یا انتشار عمومی پیگرد حقوقی دارد.'
              : '⚠️ OWJ Copyright Notice: All methodology and CPMAI materials are proprietary to OWJ Business Council. Screen capturing or unauthorized distribution is strictly prohibited.'
          )
          .catch(() => {});
      }
    } catch {
      // Ignore clipboard restriction errors
    }
  }, [lang]);

  const triggerShield = useCallback(
    (reason: string) => {
      setShieldReason(reason);
      setIsShieldActive(true);
      wipeClipboard();
    },
    [wipeClipboard]
  );

  const dismissShield = useCallback(() => {
    setIsShieldActive(false);
  }, []);

  // Sync with body.screen-protected for deep CSS 50px blur & opacity wash
  useEffect(() => {
    if (isShieldActive) {
      document.body.classList.add('screen-protected');
    } else {
      document.body.classList.remove('screen-protected');
    }
    return () => {
      document.body.classList.remove('screen-protected');
    };
  }, [isShieldActive]);

  // Expose manual test trigger to global window for dev/admin verification
  useEffect(() => {
    (window as any).__triggerScreenShield = () => {
      triggerShield(
        lang === 'fa'
          ? 'تست دستی سپر ضد اسکرین‌شات'
          : 'Manual Anti-Screenshot Shield Test'
      );
    };
    return () => {
      delete (window as any).__triggerScreenShield;
    };
  }, [lang, triggerShield]);

  useEffect(() => {
    // 1. Prevent Unauthorized Copy & Cut (with Whitelist for exercises/prompts)
    const handleCopy = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isAllowed =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable ||
          target.closest('.allow-copy') ||
          target.closest('.allow-select'));

      if (isAllowed) return;

      e.preventDefault();
      if (e.clipboardData) {
        e.clipboardData.clearData();
      }
      wipeClipboard();
      showToast(
        lang === 'fa'
          ? '⚠️ کپی‌رایت انحصاری اوج: کپی متون متدولوژی محفوظ است. لطفاً برای تمرینات از دکمه‌های مجاز «کپی پرامپت» استفاده فرمایید.'
          : '⚠️ OWJ Copyright Protection: Text copying is restricted. Please use the authorized "Copy Prompt" buttons for exercises.'
      );
    };

    // 2. Prevent Right Click (Context Menu)
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isAllowed =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('.allow-context-menu'));

      if (isAllowed) return;

      e.preventDefault();
      showToast(
        lang === 'fa'
          ? '🛡️ حقوق مؤلف: منوی کلیک راست و استخراج سورس در این بخش غیرفعال است.'
          : '🛡️ Copyright Guard: Right-click menu is disabled on educational content.'
      );
    };

    // 3. Intercept Print, DevTools, and Screenshot Shortcuts (keydown)
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      // Escape key instantly dismisses active shield
      if (e.key === 'Escape' && isShieldActive) {
        dismissShield();
        return;
      }

      // PrintScreen Key (Windows / Linux)
      if (
        e.key === 'PrintScreen' ||
        e.code === 'PrintScreen' ||
        e.key === 'Snapshot'
      ) {
        e.preventDefault();
        triggerShield(
          lang === 'fa'
            ? 'شناسایی کلید PrintScreen / عکس از صفحه'
            : 'PrintScreen Key Triggered'
        );
        showToast(
          lang === 'fa'
            ? '⚠️ ضبط تصویر از محتوای دارای کپی‌رایت مسدود گردید. کلیپ‌بورد پاکسازی شد.'
            : '⚠️ Screen capture blocked. Clipboard sanitized.',
          'warn'
        );
        return;
      }

      // Windows Snipping Tool (Win + Shift + S) or Browser Screenshot (Ctrl + Shift + S)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        triggerShield(
          lang === 'fa'
            ? 'شناسایی میانبر برش صفحه (Snipping Tool)'
            : 'Snipping Tool Shortcut Triggered'
        );
        return;
      }

      // Mac Screenshot Shortcuts (Cmd + Shift + 3 / 4 / 5)
      if (e.metaKey && e.shiftKey && ['3', '4', '5'].includes(e.key)) {
        e.preventDefault();
        triggerShield(
          lang === 'fa'
            ? 'شناسایی ابزار تصویربرداری سیستم‌عامل (Mac Capture)'
            : 'OS Screen Capture Tool'
        );
        return;
      }

      // Print (Ctrl+P / Cmd+P)
      if (isCtrlOrCmd && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        showToast(
          lang === 'fa'
            ? '🚫 پرینت یا ذخیره محتوای کتاب‌کار به عنوان PDF مسدود می‌باشد.'
            : '🚫 Printing or saving workbook content as PDF is prohibited.'
        );
        return;
      }

      // Save Webpage (Ctrl+S / Cmd+S)
      if (isCtrlOrCmd && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        showToast(
          lang === 'fa'
            ? '🚫 ذخیره آفلاین صفحه مسدود می‌باشد.'
            : '🚫 Saving offline copies is prohibited.'
        );
        return;
      }

      // View Source (Ctrl+U / Cmd+U)
      if (isCtrlOrCmd && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        return;
      }

      // Developer Tools (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C)
      if (
        e.key === 'F12' ||
        (isCtrlOrCmd && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key))
      ) {
        e.preventDefault();
        showToast(
          lang === 'fa'
            ? '🛡️ ابزارهای توسعه‌دهنده در این سامانه مسدود است.'
            : '🛡️ Developer inspection tools are disabled.'
        );
        return;
      }
    };

    // 4. Intercept PrintScreen on KeyUp (Crucial for Windows Chrome/Edge)
    const handleKeyUp = (e: KeyboardEvent) => {
      if (
        e.key === 'PrintScreen' ||
        e.code === 'PrintScreen' ||
        e.key === 'Snapshot'
      ) {
        e.preventDefault();
        triggerShield(
          lang === 'fa'
            ? 'شناسایی کلید PrintScreen'
            : 'PrintScreen Key Triggered'
        );
      }
    };

    // 5. Anti-Snipping Guard: Detect Window Focus Loss
    // When Snipping Tool, Lightshot, or Win+Shift+S activates, the window loses focus
    const handleBlur = () => {
      triggerShield(
        lang === 'fa'
          ? 'خروج از پنجره / ابزار ضبط تصویر (Snipping Tool)'
          : 'Window Inactive / Snipping Tool'
      );
    };

    // 6. Detect Tab Switching & Screen Recording Visibility Changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        triggerShield(
          lang === 'fa'
            ? 'جابجایی تب یا مخفی‌سازی پنجره'
            : 'Window Hidden / Inactive'
        );
      }
    };

    window.addEventListener('copy', handleCopy);
    window.addEventListener('cut', handleCopy);
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('copy', handleCopy);
      window.removeEventListener('cut', handleCopy);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [lang, isShieldActive, dismissShield, triggerShield, showToast, wipeClipboard]);

  return (
    <>
      {/* 1. Snipping Tool & Screenshot Blackout Protection Shield */}
      {isShieldActive && (
        <div
          onClick={dismissShield}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-black/90 backdrop-blur-3xl text-white p-6 cursor-pointer select-none animate-fadeIn"
          title={lang === 'fa' ? 'برای ادامه کلیک کنید' : 'Click to resume'}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-lg w-full p-8 rounded-3xl bg-[#0f172a] border border-emerald-500/30 text-center space-y-6 shadow-[0_0_80px_rgba(16,185,129,0.15)] ring-1 ring-white/10"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20 shadow-inner">
              <EyeOff className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                <Shield className="w-3.5 h-3.5" />
                <span>{lang === 'fa' ? 'سپر ضد اسکرین‌شات اوج فعال است' : 'OWJ Anti-Capture Shield Active'}</span>
              </div>
              <h3 className="font-extrabold text-lg text-white">
                {lang === 'fa' ? 'محتوای محافظت‌شده شتاب‌دهنده اوج' : 'OWJ Protected Methodology'}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed max-w-sm mx-auto">
                {lang === 'fa'
                  ? 'جهت حفظ حقوق کپی‌رایت متدولوژی CPMAI، هنگام فشردن PrintScreen، فعال شدن ابزار Snipping Tool یا خروج از پنجره، صفحه به صورت خودکار مات شده و کلیپ‌بورد پاکسازی می‌شود.'
                  : 'To protect proprietary CPMAI intellectual property, screen captures and inactive states trigger automatic obfuscation and clipboard sanitization.'}
              </p>
              {shieldReason && (
                <div className="pt-1">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-amber-300">
                    {lang === 'fa' ? `رویداد: ${shieldReason}` : `Trigger: ${shieldReason}`}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={dismissShield}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/40 hover:shadow-emerald-900/60 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{lang === 'fa' ? 'بازگشت به مطالعه ↩' : 'Resume Reading ↩'}</span>
              </button>
            </div>

            <p className="text-[10px] text-gray-400">
              {lang === 'fa'
                ? 'همچنین کلیک در هر نقطه از صفحه یا کلید Escape بلافاصله صفحه را بازمی‌گرداند.'
                : 'Clicking anywhere or pressing Escape will immediately restore the screen.'}
            </p>
          </div>
        </div>
      )}

      {/* 2. Floating Warning Toast */}
      {warningToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[999998] pointer-events-none animate-fadeIn max-w-lg w-full px-4">
          <div className="p-3.5 rounded-2xl bg-[#0A101D]/95 text-white border border-emerald-500/40 shadow-2xl backdrop-blur-md flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <p className="text-xs font-medium leading-relaxed">{warningToast.message}</p>
          </div>
        </div>
      )}
    </>
  );
};
