import React, { useState } from 'react';
import { ProjectMetadata, Language } from '../types/cpmai';
import { UI_TRANSLATIONS } from '../data/translations';
import { X, Check } from 'lucide-react';

interface ProjectSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  metadata: ProjectMetadata;
  onSaveMetadata: (meta: ProjectMetadata) => void;
  lang: Language;
}

export const ProjectSettingsModal: React.FC<ProjectSettingsModalProps> = ({
  isOpen,
  onClose,
  metadata,
  onSaveMetadata,
  lang
}) => {
  const [form, setForm] = useState<ProjectMetadata>({ ...metadata });
  const t = UI_TRANSLATIONS[lang];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveMetadata(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-xl bg-[#ffffff] dark:bg-[#1a2228] border border-[#d9dad5] dark:border-[#2d3942] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#d9dad5] dark:border-[#2d3942]">
          <h3 className="font-semibold text-base text-[#1c2830] dark:text-[#e8ebe9]">
            {t.projectMetaTitle}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#f4f4f1] dark:hover:bg-[#12171b] text-[#5d6b73] dark:text-[#9aa8b0]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
              {lang === 'fa' ? 'عنوان پروژه هوش مصنوعی' : 'Project Title'}
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
              placeholder={lang === 'fa' ? 'مثال: سامانه پیش‌بینی ریزش مشتریان' : 'e.g. Customer Churn Prediction'}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
              {lang === 'fa' ? 'سازمان / کسب‌وکار' : 'Organization / Enterprise'}
            </label>
            <input
              type="text"
              value={form.organization}
              onChange={(e) => setForm(prev => ({ ...prev, organization: e.target.value }))}
              placeholder={lang === 'fa' ? 'مشاوران مدیریت کسب و کار اوج' : 'OWJ Business Council'}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                {lang === 'fa' ? 'مدیر پروژه (Lead PM)' : 'Lead Project Manager'}
              </label>
              <input
                type="text"
                value={form.leadName}
                onChange={(e) => setForm(prev => ({ ...prev, leadName: e.target.value }))}
                placeholder={lang === 'fa' ? 'نام مدیر پروژه' : 'PM Name'}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
                {lang === 'fa' ? 'شماره اسپرینت / تکرار' : 'Sprint / Iteration'}
              </label>
              <input
                type="text"
                value={form.sprint}
                onChange={(e) => setForm(prev => ({ ...prev, sprint: e.target.value }))}
                placeholder="Sprint 1"
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#1c2830] dark:text-[#e8ebe9] mb-1">
              {lang === 'fa' ? 'حوزه تخصصی صنعت (Domain)' : 'Industry Domain'}
            </label>
            <input
              type="text"
              value={form.caseDomain}
              onChange={(e) => setForm(prev => ({ ...prev, caseDomain: e.target.value }))}
              placeholder={lang === 'fa' ? 'بانکداری، سلامت، فروشگاه آنلاین، تولید...' : 'Banking, Healthcare, Retail...'}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#d9dad5] dark:border-[#2d3942] bg-[#f4f4f1] dark:bg-[#12171b] text-[#1c2830] dark:text-[#e8ebe9]"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-[#d9dad5] dark:border-[#2d3942]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium rounded-lg border border-[#d9dad5] dark:border-[#2d3942] text-[#1c2830] dark:text-[#e8ebe9]"
            >
              {t.closeBtn}
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg bg-[#1f5163] text-white dark:bg-[#6fb3c6] dark:text-[#0f1a1e] hover:opacity-90"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{t.saveMetaBtn}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
