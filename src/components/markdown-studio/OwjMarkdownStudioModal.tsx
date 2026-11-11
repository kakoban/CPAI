import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import './markdownStudio.css';
import {
  ThemeMode,
  FontFamily,
  ViewMode,
  EditorSettings,
  MarkdownDocument,
  MarkdownTemplate,
} from './types';
import { SAMPLE_DOCUMENTS } from './sampleDocs';
import { extractHeadings, calculateStats, parseMarkdown } from './markdownParser';
import { buildFolderTree, FolderNode } from './docTree';
import { triggerCelebration } from './confetti';
import { MdEditor, EditorHandle } from './MdEditor';
import { MdPreview } from './MdPreview';
import { MdToolbar } from './MdToolbar';
import { MdPresentationView } from './MdPresentationView';
import {
  MdTemplatesModal,
  MdCheatsheetModal,
  MdSearchReplaceModal,
  MdQuickSwitcherModal,
  MdOutlineDrawer,
} from './MdModals';
import {
  FileCode2,
  Upload,
  FolderUp,
  Plus,
  Sparkles,
  Columns2,
  Eye,
  PenTool,
  Presentation,
  LayoutGrid,
  Search,
  ListTree,
  Palette,
  Type,
  Download,
  Printer,
  Copy,
  Check,
  X,
  Star,
  Trash2,
  Files,
  Folder,
  FolderOpen,
  Clock,
  BookOpen,
  FileText,
  AlignRight,
  AlignLeft,
  PanelRightClose,
  PanelRightOpen,
  Target,
  Trophy,
  CheckCircle2,
  CloudCheck,
  ClipboardPaste,
  RotateCcw,
  ChevronDown,
  ChevronLeft,
} from 'lucide-react';

const DOCS_STORAGE_KEY = 'owj_markdown_studio_docs_v1';
const ACTIVE_DOC_KEY = 'owj_markdown_studio_active_doc_v1';
const SETTINGS_STORAGE_KEY = 'owj_markdown_studio_settings_v1';

const THEMES: { id: ThemeMode; name: string; color: string }[] = [
  { id: 'academic', name: 'آکادمیک (آبی دانشگاهی)', color: 'bg-sky-500 border-sky-300' },
  { id: 'editorial', name: 'مجله‌ای (یاقوتی گرم)', color: 'bg-rose-500 border-rose-300' },
  { id: 'light', name: 'روشن کلاسیک', color: 'bg-white border-slate-300' },
  { id: 'sepia', name: 'کاغذ کاهی (مطالعه طولانی)', color: 'bg-[#f4ecd8] border-[#d3c29f]' },
  { id: 'dark', name: 'تاریک مدرن (Dark)', color: 'bg-slate-900 border-slate-700' },
  { id: 'nord', name: 'نوردیک (آبی قطبی)', color: 'bg-[#2e3440] border-[#4c566a]' },
  { id: 'cyber', name: 'سایبرپانک (نئون)', color: 'bg-black border-emerald-500' },
];

const FONTS: { id: FontFamily; name: string }[] = [
  { id: 'vazir', name: 'وزیرمتن (استاندارد فارسی)' },
  { id: 'sans', name: 'مدرن (Plus Jakarta + Vazir)' },
  { id: 'serif', name: 'کتابی و چاپی (Lora + Vazir)' },
  { id: 'mono', name: 'کدنویسی (Fira Code)' },
];

export interface OwjMarkdownStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'fa' | 'en';
  initialViewMode?: ViewMode;
}

export const OwjMarkdownStudioModal: React.FC<OwjMarkdownStudioModalProps> = ({
  isOpen,
  onClose,
  initialViewMode = 'workspace',
}) => {
  // 1. Documents state (persisted in localStorage)
  const [documents, setDocuments] = useState<MarkdownDocument[]>(() => {
    try {
      const saved = localStorage.getItem(DOCS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return SAMPLE_DOCUMENTS;
  });

  const [activeDocId, setActiveDocId] = useState<string>(() => {
    return localStorage.getItem(ACTIVE_DOC_KEY) || SAMPLE_DOCUMENTS[0].id;
  });

  // 2. Studio Settings
  const [settings, setSettings] = useState<EditorSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      theme: 'academic',
      fontFamily: 'vazir',
      fontSize: 16,
      viewMode: initialViewMode,
      showOutline: false,
      syncScroll: true,
      lineNumbers: true,
      direction: 'auto',
    };
  });

  // 3. UI & Modals state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showCheatsheet, setShowCheatsheet] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showQuickSwitcher, setShowQuickSwitcher] = useState(false);
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [pasteTitle, setPasteTitle] = useState('');
  const [pasteCategory, setPasteCategory] = useState('اسناد الصاقی');
  const [pasteContent, setPasteContent] = useState('');

  // Dropdown menus in header
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showFontMenu, setShowFontMenu] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [copiedType, setCopiedType] = useState<'md' | 'html' | null>(null);
  const [uploadToast, setUploadToast] = useState<string | null>(null);

  // Library / Workspace filter & sort state
  const [librarySearch, setLibrarySearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'updated' | 'created' | 'title'>('updated');
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});

  // Scroll sync & Cursor state
  const [scrollPercentage, setScrollPercentage] = useState<number | undefined>(undefined);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1, selected: 0 });
  const [wordGoal, setWordGoal] = useState<number>(500);
  const [editingGoal, setEditingGoal] = useState(false);
  const [goalCelebrated, setGoalCelebrated] = useState(false);

  // Undo/Redo stack per active document
  const [historyStack, setHistoryStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  const editorRef = useRef<EditorHandle>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const activeDoc = useMemo(() => {
    return documents.find((d) => d.id === activeDocId) || documents[0];
  }, [documents, activeDocId]);

  // Persist documents & settings
  useEffect(() => {
    try {
      localStorage.setItem(DOCS_STORAGE_KEY, JSON.stringify(documents));
    } catch {
      // ignore
    }
  }, [documents]);

  useEffect(() => {
    try {
      localStorage.setItem(ACTIVE_DOC_KEY, activeDocId);
    } catch {
      // ignore
    }
  }, [activeDocId]);

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  // Reset undo/redo when switching active document
  useEffect(() => {
    setHistoryStack([]);
    setRedoStack([]);
  }, [activeDocId]);

  const updateSettings = (partial: Partial<EditorSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  const showToast = (msg: string) => {
    setUploadToast(msg);
    setTimeout(() => setUploadToast(null), 3200);
  };

  // Update active document content
  const handleContentChange = useCallback(
    (newContent: string, pushToHistory = true) => {
      if (!activeDoc) return;
      if (pushToHistory) {
        setHistoryStack((prev) => [...prev.slice(-25), activeDoc.content]);
        setRedoStack([]);
      }
      setDocuments((prev) =>
        prev.map((d) =>
          d.id === activeDoc.id ? { ...d, content: newContent, updatedAt: Date.now() } : d
        )
      );
    },
    [activeDoc]
  );

  const handleTitleChange = (newTitle: string) => {
    if (!activeDoc) return;
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === activeDoc.id ? { ...d, title: newTitle, updatedAt: Date.now() } : d
      )
    );
  };

  const handleCategoryChange = (newCategory: string) => {
    if (!activeDoc) return;
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === activeDoc.id ? { ...d, category: newCategory, updatedAt: Date.now() } : d
      )
    );
  };

  const handleUndo = () => {
    if (historyStack.length === 0 || !activeDoc) return;
    const previous = historyStack[historyStack.length - 1];
    setHistoryStack((prev) => prev.slice(0, -1));
    setRedoStack((prev) => [activeDoc.content, ...prev]);
    handleContentChange(previous, false);
  };

  const handleRedo = () => {
    if (redoStack.length === 0 || !activeDoc) return;
    const next = redoStack[0];
    setRedoStack((prev) => prev.slice(1));
    setHistoryStack((prev) => [...prev, activeDoc.content]);
    handleContentChange(next, false);
  };

  // Interactive checkbox toggling in Preview
  const handleToggleCheckbox = useCallback(
    (checkboxIndex: number) => {
      if (!activeDoc) return;
      let currentIdx = 0;
      const updated = activeDoc.content.replace(/^(\s*[-*+]\s+\[)([ xX])(\])/gm, (full, p1, state, p3) => {
        if (currentIdx === checkboxIndex) {
          currentIdx++;
          const nextState = state === ' ' ? 'x' : ' ';
          return `${p1}${nextState}${p3}`;
        }
        currentIdx++;
        return full;
      });
      handleContentChange(updated);
    },
    [activeDoc, handleContentChange]
  );

  // Create new document
  const handleCreateDoc = (initialTitle?: string, initialContent?: string, initialCategory?: string) => {
    const newDoc: MarkdownDocument = {
      id: `doc-${Date.now()}`,
      title: initialTitle || 'سند مارک‌دان جدید',
      category: initialCategory || 'یادداشت‌های من',
      content:
        initialContent ??
        `# ${initialTitle || 'سند مارک‌دان جدید'}\n\n> [!NOTE]\n> متن مارک‌دان خود را اینجا بنویسید یا ویرایش کنید.\n\n## نکات کلیدی\n\n- ==yellow:نکته مهم اول==\n- [ ] مورد اول چک‌لیست\n`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isFavorite: false,
    };
    setDocuments((prev) => [newDoc, ...prev]);
    setActiveDocId(newDoc.id);
    updateSettings({ viewMode: 'split' });
    showToast(`سند «${newDoc.title}» ایجاد شد`);
  };

  // Select template
  const handleSelectTemplate = (tpl: MarkdownTemplate, mode: 'new' | 'replace') => {
    if (mode === 'new') {
      handleCreateDoc(tpl.name, tpl.content, tpl.category);
    } else {
      handleContentChange(tpl.content);
      handleTitleChange(tpl.name);
      updateSettings({ viewMode: 'split' });
    }
  };

  // Delete document
  const handleDeleteDoc = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (documents.length <= 1) {
      showToast('حداقل یک سند باید در استودیو باقی بماند.');
      return;
    }
    const target = documents.find((d) => d.id === id);
    const remaining = documents.filter((d) => d.id !== id);
    setDocuments(remaining);
    if (activeDocId === id) {
      setActiveDocId(remaining[0].id);
    }
    if (target) {
      showToast(`سند «${target.title}» حذف شد`);
    }
  };

  // Duplicate document
  const handleDuplicateDoc = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const orig = documents.find((d) => d.id === id);
    if (!orig) return;
    const copy: MarkdownDocument = {
      ...orig,
      id: `doc-${Date.now()}`,
      title: `${orig.title} (کپی)`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setDocuments((prev) => [copy, ...prev]);
    setActiveDocId(copy.id);
    showToast(`کپی از «${orig.title}» ایجاد شد`);
  };

  // Toggle favorite
  const handleToggleFavorite = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isFavorite: !d.isFavorite } : d))
    );
  };

  // Process uploaded files (.md, .markdown, .txt)
  const processUploadedFiles = async (fileList: FileList | File[]) => {
    const filesArray = Array.from(fileList).filter((file) => {
      const lower = file.name.toLowerCase();
      return (
        lower.endsWith('.md') ||
        lower.endsWith('.markdown') ||
        lower.endsWith('.mdx') ||
        lower.endsWith('.txt')
      );
    });

    if (filesArray.length === 0) {
      showToast('لطفاً فایل‌هایی با پسوند .md، .markdown یا .txt انتخاب کنید.');
      return;
    }

    const readPromises = filesArray.map(
      (file) =>
        new Promise<MarkdownDocument>((resolve) => {
          const reader = new FileReader();
          reader.onload = (ev) => {
            const content = (ev.target?.result as string) || '';
            const cleanName = file.name.replace(/\.(md|markdown|mdx|txt)$/i, '');
            const relPath = (file as File & { webkitRelativePath?: string }).webkitRelativePath || '';
            let category = 'فایل‌های آپلود شده';
            if (relPath && relPath.includes('/')) {
              const parts = relPath.split('/');
              parts.pop();
              category = parts.join('/') || 'فایل‌های آپلود شده';
            }
            resolve({
              id: `upload-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
              title: cleanName,
              content,
              category,
              createdAt: Date.now(),
              updatedAt: file.lastModified || Date.now(),
              isFavorite: false,
            });
          };
          reader.readAsText(file, 'utf-8');
        })
    );

    const importedDocs = await Promise.all(readPromises);
    if (importedDocs.length > 0) {
      setDocuments((prev) => [...importedDocs, ...prev]);
      setActiveDocId(importedDocs[0].id);
      if (importedDocs.length === 1) {
        updateSettings({ viewMode: 'preview' });
        showToast(`فایل «${importedDocs[0].title}» آپلود شد و آماده مطالعه و ویرایش است!`);
      } else {
        showToast(`${importedDocs.length} فایل مارک‌دان با موفقیت به کتابخانه اضافه شد!`);
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processUploadedFiles(e.target.files);
      e.target.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processUploadedFiles(e.dataTransfer.files);
    }
  };

  // Exports
  const handleDownloadMd = (docToExport: MarkdownDocument = activeDoc) => {
    if (!docToExport) return;
    const blob = new Blob([docToExport.content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${docToExport.title || 'document'}.md`;
    a.click();
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const handleDownloadHtml = () => {
    if (!activeDoc) return;
    const htmlBody = parseMarkdown(activeDoc.content, { documents, activeDocId: activeDoc.id });
    const fullHtml = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${activeDoc.title}</title>
  <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" />
  <style>
    body { font-family: 'Vazirmatn', sans-serif; max-width: 900px; margin: 40px auto; padding: 0 24px; line-height: 1.85; color: #0f172a; background: #ffffff; }
    h1, h2, h3 { color: #1e1b4b; font-weight: 800; }
    h1 { border-bottom: 3px solid #6366f1; padding-bottom: 10px; }
    pre { background: #0f172a; color: #f8fafc; padding: 16px; border-radius: 12px; overflow-x: auto; direction: ltr; text-align: left; }
    code { font-family: monospace; }
    table { width: 100%; border-collapse: collapse; margin: 24px 0; }
    th, td { border: 1px solid #cbd5e1; padding: 10px 14px; }
    th { background: #f1f5f9; }
    blockquote { border-right: 4px solid #6366f1; background: #eef2ff; margin: 16px 0; padding: 12px 16px; border-radius: 8px; }
    mark { padding: 2px 6px; border-radius: 4px; }
  </style>
</head>
<body>
  ${htmlBody}
</body>
</html>`;
    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeDoc.title || 'document'}.html`;
    a.click();
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const handlePrintPdf = () => {
    setShowExportMenu(false);
    document.body.classList.add('md-studio-printing');
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        document.body.classList.remove('md-studio-printing');
      }, 500);
    }, 150);
  };

  const handleCopy = (type: 'md' | 'html') => {
    if (!activeDoc) return;
    if (type === 'md') {
      navigator.clipboard.writeText(activeDoc.content);
    } else {
      const htmlBody = parseMarkdown(activeDoc.content, { documents, activeDocId: activeDoc.id });
      navigator.clipboard.writeText(htmlBody);
    }
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
      setShowExportMenu(false);
    }, 1500);
  };

  // Computed stats & headings
  const headings = useMemo(
    () => extractHeadings(activeDoc?.content || ''),
    [activeDoc?.content]
  );
  const stats = useMemo(
    () => calculateStats(activeDoc?.content || ''),
    [activeDoc?.content]
  );

  // Word goal celebration
  const goalProgress = Math.min(100, Math.round((stats.words / Math.max(1, wordGoal)) * 100));
  useEffect(() => {
    if (goalProgress >= 100 && !goalCelebrated && stats.words > 0) {
      setGoalCelebrated(true);
      triggerCelebration();
    } else if (goalProgress < 100 && goalCelebrated) {
      setGoalCelebrated(false);
    }
  }, [goalProgress, goalCelebrated, stats.words]);

  // Categories & Filtered documents for Workspace Library & Sidebar
  const categories = useMemo(() => {
    const set = new Set<string>();
    documents.forEach((d) => {
      if (d.category) set.add(d.category);
    });
    return Array.from(set);
  }, [documents]);

  const filteredDocs = useMemo(() => {
    const q = librarySearch.trim().toLowerCase();
    return documents
      .filter((doc) => {
        if (selectedCategory === 'FAVORITES' && !doc.isFavorite) return false;
        if (selectedCategory !== 'ALL' && selectedCategory !== 'FAVORITES' && doc.category !== selectedCategory) {
          return false;
        }
        if (!q) return true;
        return (
          doc.title.toLowerCase().includes(q) ||
          doc.category.toLowerCase().includes(q) ||
          doc.content.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'title') return a.title.localeCompare(b.title, 'fa');
        if (sortBy === 'created') return b.createdAt - a.createdAt;
        return b.updatedAt - a.updatedAt;
      });
  }, [documents, librarySearch, selectedCategory, sortBy]);

  const folderTree = useMemo(() => buildFolderTree(documents), [documents]);

  // Global Keyboard Shortcuts inside Studio
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowQuickSwitcher((prev) => !prev);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
        if (settings.viewMode === 'split' || settings.viewMode === 'editor') {
          e.preventDefault();
          setShowSearch((prev) => !prev);
        }
      } else if (e.key === 'Escape') {
        if (
          !showTemplates &&
          !showCheatsheet &&
          !showSearch &&
          !showQuickSwitcher &&
          !showPasteModal &&
          settings.viewMode !== 'presentation'
        ) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isOpen,
    onClose,
    settings.viewMode,
    showTemplates,
    showCheatsheet,
    showSearch,
    showQuickSwitcher,
    showPasteModal,
  ]);

  if (!isOpen) return null;

  // Render Presentation Mode full screen if selected
  if (settings.viewMode === 'presentation' && activeDoc) {
    return (
      <MdPresentationView
        markdown={activeDoc.content}
        title={activeDoc.title}
        fontFamily={settings.fontFamily}
        onExit={() => updateSettings({ viewMode: 'preview' })}
      />
    );
  }

  const renderFolderTreeNode = (node: FolderNode, depth = 0) => {
    const isExpanded = expandedFolders[node.path] ?? true;
    return (
      <div key={node.path || 'root'}>
        {node.name && (
          <button
            type="button"
            onClick={() =>
              setExpandedFolders((prev) => ({ ...prev, [node.path]: !isExpanded }))
            }
            style={{ paddingRight: `${depth * 12 + 8}px` }}
            className="w-full flex items-center justify-between py-1.5 pl-2 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5 truncate">
              {isExpanded ? (
                <FolderOpen className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              ) : (
                <Folder className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              )}
              <span className="truncate">{node.name}</span>
            </span>
            <ChevronLeft
              className={`w-3 h-3 text-slate-400 transition-transform ${
                isExpanded ? '-rotate-90' : ''
              }`}
            />
          </button>
        )}

        {isExpanded && (
          <div className="space-y-0.5 mt-0.5">
            {node.children.map((child) => renderFolderTreeNode(child, depth + 1))}
            {node.docs.map((doc) => {
              const active = doc.id === activeDoc?.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => setActiveDocId(doc.id)}
                  style={{ paddingRight: `${(depth + 1) * 12 + 8}px` }}
                  className={`group flex items-center justify-between py-2 pl-2 rounded-xl text-xs transition-all cursor-pointer ${
                    active
                      ? 'bg-indigo-600 text-white font-bold shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText
                      className={`w-3.5 h-3.5 shrink-0 ${
                        active ? 'text-white' : 'text-indigo-500'
                      }`}
                    />
                    <span className="truncate">{doc.title}</span>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <button
                      type="button"
                      onClick={(e) => handleToggleFavorite(doc.id, e)}
                      className="p-0.5 hover:scale-110 cursor-pointer"
                      title="نشان‌دار کردن"
                    >
                      <Star
                        className={`w-3 h-3 ${
                          doc.isFavorite
                            ? 'fill-amber-400 text-amber-400'
                            : active
                            ? 'text-white/70'
                            : 'text-slate-400'
                        }`}
                      />
                    </button>
                    {documents.length > 1 && (
                      <button
                        type="button"
                        onClick={(e) => handleDeleteDoc(doc.id, e)}
                        className={`p-0.5 hover:text-red-400 cursor-pointer ${
                          active ? 'text-white/70' : 'text-slate-400'
                        }`}
                        title="حذف سند"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-slate-950/75 backdrop-blur-md flex flex-col overflow-hidden animate-fadeIn"
      dir="rtl"
      onDragOver={(e) => {
        e.preventDefault();
        setIsDraggingOver(true);
      }}
      onDragLeave={(e) => {
        if (e.currentTarget === e.target) setIsDraggingOver(false);
      }}
      onDrop={handleDrop}
    >
      {/* Hidden File & Folder Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".md,.markdown,.mdx,.txt"
        multiple
        onChange={handleFileInputChange}
        className="hidden"
      />
      <input
        ref={folderInputRef}
        type="file"
        {...({ webkitdirectory: '', directory: '' } as React.InputHTMLAttributes<HTMLInputElement>)}
        multiple
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Global Drag & Drop Overlay */}
      {isDraggingOver && (
        <div className="fixed inset-0 z-[150] bg-indigo-950/85 backdrop-blur-md flex items-center justify-center p-8 pointer-events-none">
          <div className="max-w-lg w-full p-10 rounded-3xl border-2 border-dashed border-indigo-400 bg-slate-900/90 text-center text-white shadow-2xl">
            <Upload className="w-16 h-16 text-indigo-400 mx-auto mb-4 animate-bounce" />
            <h3 className="text-xl font-black mb-2">فایل‌های مارک‌دان خود را رها کنید</h3>
            <p className="text-sm text-indigo-200">
              پشتیبانی از بارگذاری همزمان چندین فایل .md، .markdown و .txt
            </p>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {uploadToast && (
        <div className="fixed bottom-14 left-1/2 -translate-x-1/2 z-[140] flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-slate-900 text-white text-xs font-bold shadow-2xl border border-indigo-500/40 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{uploadToast}</span>
        </div>
      )}

      {/* ============================================================
          TOP STUDIO HEADER BAR (Minimal, Calm & Single-Line)
         ============================================================ */}
      <header className="h-14 bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800/80 px-4 flex items-center justify-between gap-4 shrink-0 select-none z-30 whitespace-nowrap">
        {/* Right: Studio Brand & Active Document Breadcrumb */}
        <div className="flex items-center gap-2 min-w-0 shrink-0">
          {settings.viewMode !== 'workspace' && (
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              title={sidebarOpen ? 'بستن پنل فایل‌ها' : 'باز کردن پنل فایل‌ها'}
            >
              {sidebarOpen ? (
                <PanelRightClose className="w-4 h-4" />
              ) : (
                <PanelRightOpen className="w-4 h-4" />
              )}
            </button>
          )}

          <button
            type="button"
            onClick={() => updateSettings({ viewMode: 'workspace' })}
            className="flex items-center gap-2 cursor-pointer group shrink-0 whitespace-nowrap"
            title="بازگشت به کتابخانه و مرکز آپلود"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform shrink-0">
              <FileCode2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xs sm:text-sm text-slate-100 group-hover:text-indigo-300 transition-colors whitespace-nowrap">
              استودیو مارک‌دان
            </span>
          </button>

          {activeDoc && settings.viewMode !== 'workspace' && (
            <div className="hidden md:flex items-center gap-2 min-w-0">
              <span className="text-slate-600 text-sm">/</span>
              <input
                type="text"
                value={activeDoc.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="bg-slate-800/60 hover:bg-slate-800 focus:bg-slate-800 text-slate-100 text-xs font-medium px-2.5 py-1 rounded-lg border border-transparent hover:border-slate-700 focus:border-indigo-500 focus:outline-none w-40 lg:w-56 truncate transition-all"
                placeholder="نام سند..."
              />
            </div>
          )}
        </div>

        {/* Center: Clean 4-Mode Segmented Control */}
        <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 shrink-0 whitespace-nowrap">
          <button
            type="button"
            onClick={() => updateSettings({ viewMode: 'workspace' })}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              settings.viewMode === 'workspace'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">کتابخانه</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/15 font-mono">
              {documents.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => updateSettings({ viewMode: 'preview' })}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              settings.viewMode === 'preview'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">مطالعه</span>
          </button>

          <button
            type="button"
            onClick={() => updateSettings({ viewMode: 'split' })}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              settings.viewMode === 'split' || settings.viewMode === 'editor'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Columns2 className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">ویرایش زنده</span>
          </button>

          <button
            type="button"
            onClick={() => updateSettings({ viewMode: 'presentation' })}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-amber-300/90 hover:text-amber-200 hover:bg-amber-500/10 transition-all cursor-pointer whitespace-nowrap shrink-0"
            title="نمایش اسلایدی تمام‌صفحه"
          >
            <Presentation className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">اسلاید</span>
          </button>
        </div>

        {/* Left: Compact Utility Icons & Upload Action */}
        <div className="flex items-center gap-1.5 shrink-0 whitespace-nowrap">
          {/* Quick Upload File Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0"
            title="آپلود فایل مارک‌دان (.md, .markdown, .txt)"
          >
            <Upload className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">آپلود .md</span>
          </button>

          {/* Unified Appearance Popover (Themes + Fonts + Size + Direction) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowThemeMenu(!showThemeMenu);
                setShowExportMenu(false);
              }}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                showThemeMenu
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
              }`}
              title="تنظیمات ظاهر، تم مطالعه و فونت"
            >
              <Palette className="w-4 h-4 text-indigo-400" />
            </button>

            {showThemeMenu && (
              <div className="absolute left-0 mt-2 w-72 bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 p-3.5 z-50 space-y-3 whitespace-normal">
                <div>
                  <div className="text-[11px] font-bold text-slate-400 mb-1.5">
                    تم مطالعه (۷ پوسته):
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {THEMES.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => updateSettings({ theme: t.id })}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                          settings.theme === t.id
                            ? 'bg-indigo-600 text-white font-bold'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full border ${t.color}`} />
                          <span>{t.name}</span>
                        </div>
                        {settings.theme === t.id && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2.5 border-t border-slate-800">
                  <div className="text-[11px] font-bold text-slate-400 mb-1.5">فونت نمایش:</div>
                  <div className="grid grid-cols-2 gap-1">
                    {FONTS.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => updateSettings({ fontFamily: f.id })}
                        className={`px-2 py-1.5 rounded-lg text-[11px] text-right truncate cursor-pointer ${
                          settings.fontFamily === f.id
                            ? 'bg-indigo-600 text-white font-bold'
                            : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {f.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2.5 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                    <span>اندازه متن:</span>
                    <span className="font-mono font-bold text-indigo-400">{settings.fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min={13}
                    max={24}
                    value={settings.fontSize}
                    onChange={(e) => updateSettings({ fontSize: Number(e.target.value) })}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>

                <div className="pt-2.5 border-t border-slate-800">
                  <div className="grid grid-cols-3 gap-1">
                    {(['auto', 'rtl', 'ltr'] as const).map((dir) => (
                      <button
                        key={dir}
                        type="button"
                        onClick={() => updateSettings({ direction: dir })}
                        className={`py-1 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer ${
                          settings.direction === dir
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {dir === 'rtl' && <AlignRight className="w-3 h-3" />}
                        {dir === 'ltr' && <AlignLeft className="w-3 h-3" />}
                        <span>{dir === 'auto' ? 'خودکار' : dir.toUpperCase()}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Search & Quick Switcher */}
          <button
            type="button"
            onClick={() => setShowQuickSwitcher(true)}
            className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="جستجوی سریع در اسناد (Ctrl+K)"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Outline TOC Toggle */}
          {settings.viewMode !== 'workspace' && (
            <button
              type="button"
              onClick={() => updateSettings({ showOutline: !settings.showOutline })}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                settings.showOutline
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
              }`}
              title="فهرست مطالب خودکار (TOC)"
            >
              <ListTree className="w-4 h-4" />
            </button>
          )}

          {/* Export Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowExportMenu(!showExportMenu);
                setShowThemeMenu(false);
              }}
              className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              title="دانلود و خروجی گرفتن از سند"
            >
              <Download className="w-4 h-4 text-emerald-400" />
            </button>

            {showExportMenu && (
              <div className="absolute left-0 mt-2 w-60 bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 p-2 z-50 space-y-1 whitespace-normal">
                <div className="text-[11px] font-bold text-slate-400 px-2.5 py-1">
                  خروجی و اشتراک‌گذاری سند فعلی
                </div>
                <button
                  type="button"
                  onClick={() => handleDownloadMd()}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-indigo-400" />
                  <span>دانلود فایل مارک‌دان (.md)</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadHtml}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <FileCode2 className="w-4 h-4 text-emerald-400" />
                  <span>دانلود صفحه وب مستقل (.html)</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrintPdf}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-amber-400" />
                  <span>چاپ یا ذخیره PDF</span>
                </button>
                <div className="border-t border-slate-800 my-1" />
                <button
                  type="button"
                  onClick={() => handleCopy('md')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>کپی سورس مارک‌دان</span>
                  </span>
                  {copiedType === 'md' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy('html')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>کپی کد HTML رندر شده</span>
                  </span>
                  {copiedType === 'html' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </button>
              </div>
            )}
          </div>

          <div className="w-px h-5 bg-slate-800 mx-0.5" />

          {/* Clean Close Studio Button */}
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="بستن استودیو مارک‌دان (ESC)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ============================================================
          MAIN STUDIO BODY
         ============================================================ */}
      {settings.viewMode === 'workspace' ? (
        /* ------------------------------------------------------------
           VIEW 1: WORKSPACE LIBRARY & UPLOAD HUB
           ------------------------------------------------------------ */
        <div className="flex-1 overflow-y-auto bg-slate-950 text-slate-100 p-4 sm:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Hero Upload & Creation Banner */}
            <div className="relative rounded-3xl overflow-hidden border border-indigo-500/30 bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-900 p-6 sm:p-8 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>موتور رندر، مرور و ویرایش زنده مارک‌دان اوج</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    فایل‌های مارک‌دان خود را آپلود، مرور، هایلایت و ویرایش کنید
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                    فایل‌های <code className="text-amber-300 font-mono">.md</code>،{' '}
                    <code className="text-amber-300 font-mono">.markdown</code> یا{' '}
                    <code className="text-amber-300 font-mono">.txt</code> خود را بکشید و رها کنید؛ یا با استفاده از ویرایشگر دوطرفه، ماژیک ۶ رنگ، نمودارهای Mermaid و فرمول‌های KaTeX جزوات و مستندات خود را بسازید.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-black shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span>آپلود فایل مارک‌دان (.md / .txt)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => folderInputRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 text-xs sm:text-sm font-bold transition-all cursor-pointer"
                    >
                      <FolderUp className="w-4 h-4 text-amber-400" />
                      <span>آپلود پوشه کامل</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowPasteModal(true)}
                      className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 text-xs sm:text-sm font-bold transition-all cursor-pointer"
                    >
                      <ClipboardPaste className="w-4 h-4 text-sky-400" />
                      <span>الصاق سریع متن (Paste)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCreateDoc()}
                      className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>سند خام جدید</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowTemplates(true)}
                      className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs sm:text-sm font-bold transition-all cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>قالب‌های آماده</span>
                    </button>
                  </div>
                </div>

                {/* Drag & Drop Interactive Box */}
                <div className="lg:col-span-5">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="group rounded-2xl border-2 border-dashed border-indigo-400/40 hover:border-emerald-400 bg-slate-900/70 hover:bg-slate-900 p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[190px]"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/15 group-hover:bg-emerald-500/20 border border-indigo-500/30 group-hover:border-emerald-400/40 flex items-center justify-center mb-3 transition-colors">
                      <Upload className="w-7 h-7 text-indigo-400 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <p className="text-sm font-extrabold text-white mb-1">
                      فایل‌های .md یا .txt را بکشید و اینجا رها کنید
                    </p>
                    <p className="text-xs text-slate-400">
                      یا کلیک کنید تا از حافظه دستگاه انتخاب نمایید (تکی یا چندتایی)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter, Search & Sort Controls */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
              {/* Category Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('ALL')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === 'ALL'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  همه اسناد ({documents.length})
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('FAVORITES')}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === 'FAVORITES'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400 hover:text-amber-300'
                  }`}
                >
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>نشان‌شده‌ها ({documents.filter((d) => d.isFavorite).length})</span>
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Folder className="w-3 h-3 text-amber-400" />
                    <span>{cat}</span>
                  </button>
                ))}
              </div>

              {/* Search & Sort */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={librarySearch}
                    onChange={(e) => setLibrarySearch(e.target.value)}
                    placeholder="جستجو در نام یا محتوای فایل‌ها..."
                    className="w-full pr-9 pl-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'updated' | 'created' | 'title')}
                  className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="updated">مرتب‌سازی: آخرین ویرایش</option>
                  <option value="created">مرتب‌سازی: زمان آپلود</option>
                  <option value="title">مرتب‌سازی: حروف الفبا</option>
                </select>

                <button
                  type="button"
                  onClick={() => {
                    const existingIds = new Set(documents.map((d) => d.id));
                    const missingSamples = SAMPLE_DOCUMENTS.filter((s) => !existingIds.has(s.id));
                    if (missingSamples.length > 0) {
                      setDocuments((prev) => [...prev, ...missingSamples]);
                      showToast('اسناد راهنما و نمونه بازیابی شدند.');
                    } else {
                      showToast('همه اسناد نمونه در کتابخانه موجود هستند.');
                    }
                  }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
                  title="بازیابی اسناد نمونه پیش‌فرض"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDocs.map((doc) => {
                const docStats = calculateStats(doc.content);
                const isCurrent = doc.id === activeDoc?.id;
                const snippet = doc.content
                  .replace(/^#+\s+/gm, '')
                  .replace(/[*_`~>#-]/g, '')
                  .trim()
                  .slice(0, 160);

                return (
                  <div
                    key={doc.id}
                    onClick={() => {
                      setActiveDocId(doc.id);
                      updateSettings({ viewMode: 'preview' });
                    }}
                    className={`group rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                      isCurrent
                        ? 'bg-slate-900 border-indigo-500 ring-1 ring-indigo-500/40 shadow-xl'
                        : 'bg-slate-900/70 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[11px] font-semibold truncate max-w-[200px]">
                          <Folder className="w-3 h-3 text-amber-400 shrink-0" />
                          <span className="truncate">{doc.category}</span>
                        </span>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => handleToggleFavorite(doc.id, e)}
                            className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                            title="افزودن به نشان‌شده‌ها"
                          >
                            <Star
                              className={`w-4 h-4 ${
                                doc.isFavorite
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-500 hover:text-amber-300'
                              }`}
                            />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleDuplicateDoc(doc.id, e)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                            title="تکثیر سند"
                          >
                            <Files className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownloadMd(doc);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors cursor-pointer"
                            title="دانلود فایل .md"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          {documents.length > 1 && (
                            <button
                              type="button"
                              onClick={(e) => handleDeleteDoc(doc.id, e)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                              title="حذف سند"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      <h3 className="text-base font-extrabold text-white group-hover:text-indigo-300 transition-colors line-clamp-1 mb-2">
                        {doc.title}
                      </h3>

                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4 min-h-[3.5rem]">
                        {snippet || 'سند خالی...'}
                      </p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-slate-800/80">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{docStats.words.toLocaleString('fa-IR')} کلمه</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{docStats.readingTime} دقیقه مطالعه</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDocId(doc.id);
                            updateSettings({ viewMode: 'preview' });
                          }}
                          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-bold transition-all cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>مرور و مطالعه</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDocId(doc.id);
                            updateSettings({ viewMode: 'split' });
                          }}
                          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-bold transition-all cursor-pointer"
                        >
                          <Columns2 className="w-3.5 h-3.5" />
                          <span>ویرایش زنده</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* ------------------------------------------------------------
           VIEWS 2, 3, 4: SPLIT EDITOR, READER PREVIEW, OR FOCUSED EDITOR
           ------------------------------------------------------------ */
        <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-slate-950">
          {/* Formatting Toolbar (shown when editing in Split or Editor view) */}
          {(settings.viewMode === 'split' || settings.viewMode === 'editor') && (
            <MdToolbar
              onInsertMarkdown={(prefix, suffix, def) =>
                editorRef.current?.insertMarkdown(prefix, suffix, def)
              }
              onInsertHighlight={(color) => editorRef.current?.insertHighlight(color)}
              onInsertTable={(r, c) => editorRef.current?.insertTable(r, c)}
              onInsertCallout={(type) => editorRef.current?.insertCallout(type)}
              onUndo={handleUndo}
              onRedo={handleRedo}
              canUndo={historyStack.length > 0}
              canRedo={redoStack.length > 0}
              onOpenCheatsheet={() => setShowCheatsheet(true)}
            />
          )}

          {/* Main Workspace Row: Collapsible File Sidebar + Editor/Preview + Outline Drawer */}
          <div className="flex-1 flex overflow-hidden relative">
            {/* Right Collapsible File Tree Sidebar */}
            {sidebarOpen && (
              <aside className="w-64 bg-slate-50 dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col h-full shrink-0 select-none">
                <div className="p-3 border-b border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200">
                      فایل‌های مارک‌دان ({documents.length})
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 transition-colors cursor-pointer"
                        title="آپلود فایل .md جدید"
                      >
                        <Upload className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCreateDoc()}
                        className="p-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 transition-colors cursor-pointer"
                        title="سند جدید"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Mobile / Tablet Title input */}
                  {activeDoc && (
                    <input
                      type="text"
                      value={activeDoc.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="md:hidden w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-100"
                      placeholder="عنوان سند..."
                    />
                  )}
                </div>

                {/* Folder & Document Tree */}
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                  {renderFolderTreeNode(folderTree)}
                </div>

                <div className="p-2.5 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setShowTemplates(true)}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>قالب‌های آماده</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => updateSettings({ viewMode: 'workspace' })}
                    className="py-1.5 px-2.5 rounded-xl bg-slate-200/70 dark:bg-slate-800 hover:bg-slate-300 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                    title="نمای کتابخانه"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                </div>
              </aside>
            )}

            {/* Editor & Preview Split / Single Panes */}
            <div className="flex-1 flex overflow-hidden">
              {(settings.viewMode === 'editor' || settings.viewMode === 'split') && activeDoc && (
                <div
                  className={`${
                    settings.viewMode === 'split'
                      ? 'w-1/2 border-l border-slate-200 dark:border-slate-800'
                      : 'w-full'
                  } h-full overflow-hidden`}
                >
                  <MdEditor
                    ref={editorRef}
                    value={activeDoc.content}
                    onChange={(val) => handleContentChange(val)}
                    direction={settings.direction}
                    fontSize={settings.fontSize}
                    lineNumbersVisible={settings.lineNumbers}
                    onScroll={
                      settings.syncScroll && settings.viewMode === 'split'
                        ? setScrollPercentage
                        : undefined
                    }
                    onCursorChange={(line, col, selected) =>
                      setCursorPos({ line, col, selected })
                    }
                    documents={documents}
                  />
                </div>
              )}

              {(settings.viewMode === 'preview' || settings.viewMode === 'split') && activeDoc && (
                <div
                  className={`${
                    settings.viewMode === 'split' ? 'w-1/2' : 'w-full'
                  } h-full overflow-hidden`}
                >
                  <MdPreview
                    markdown={activeDoc.content}
                    theme={settings.theme}
                    fontFamily={settings.fontFamily}
                    fontSize={settings.fontSize}
                    direction={settings.direction}
                    scrollPercentage={
                      settings.syncScroll && settings.viewMode === 'split'
                        ? scrollPercentage
                        : undefined
                    }
                    onToggleCheckbox={handleToggleCheckbox}
                    onUpdateMarkdown={(updated) => handleContentChange(updated)}
                    documents={documents}
                    activeDocId={activeDoc.id}
                    onSelectDoc={(id) => setActiveDocId(id)}
                  />
                </div>
              )}
            </div>

            {/* Outline (Table of Contents) Drawer */}
            <MdOutlineDrawer
              headings={headings}
              isOpen={settings.showOutline}
              onClose={() => updateSettings({ showOutline: false })}
              onJumpToLine={(line) => editorRef.current?.scrollToLine(line)}
            />
          </div>
        </div>
      )}

      {/* ============================================================
          BOTTOM STATUS & ANALYTICS BAR
         ============================================================ */}
      <footer className="h-8 bg-slate-900 border-t border-slate-800 px-4 flex items-center justify-between text-[11px] text-slate-400 select-none shrink-0 z-30">
        <div className="flex items-center gap-4 overflow-x-auto">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>واژگان:</span>
            <strong className="text-slate-200">{stats.words.toLocaleString('fa-IR')}</strong>
          </span>

          <span className="hidden sm:flex items-center gap-1.5">
            <span>حروف:</span>
            <strong className="text-slate-200">{stats.chars.toLocaleString('fa-IR')}</strong>
          </span>

          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>زمان مطالعه:</span>
            <strong className="text-slate-200">~{stats.readingTime.toLocaleString('fa-IR')} دقیقه</strong>
          </span>

          {stats.tasks.total > 0 && (
            <span className="hidden md:flex items-center gap-1.5 text-amber-300">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>
                تمرین‌ها: {stats.tasks.completed}/{stats.tasks.total}
              </span>
            </span>
          )}

          {/* Word Goal Progress */}
          <div className="hidden lg:flex items-center gap-2 pl-2 border-r border-slate-800 pr-3">
            {editingGoal ? (
              <div className="flex items-center gap-1">
                <span>هدف:</span>
                <input
                  type="number"
                  value={wordGoal}
                  onChange={(e) => setWordGoal(Math.max(50, Number(e.target.value)))}
                  onBlur={() => setEditingGoal(false)}
                  onKeyDown={(e) => e.key === 'Enter' && setEditingGoal(false)}
                  className="w-16 px-1.5 py-0.5 rounded bg-slate-800 text-white text-[11px] border border-indigo-500"
                  autoFocus
                />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setEditingGoal(true)}
                className="flex items-center gap-1.5 hover:text-slate-200 transition-colors cursor-pointer"
                title="کلیک برای تنظیم هدف تعداد کلمات"
              >
                {goalProgress >= 100 ? (
                  <Trophy className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                ) : (
                  <Target className="w-3.5 h-3.5 text-rose-400" />
                )}
                <span>هدف نگارش: {goalProgress}%</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {(settings.viewMode === 'split' || settings.viewMode === 'editor') && (
            <span className="hidden sm:inline font-mono text-[10px]">
              خط {cursorPos.line}، ستون {cursorPos.col}
              {cursorPos.selected > 0 ? ` (${cursorPos.selected} انتخاب شده)` : ''}
            </span>
          )}
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <CloudCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ذخیره خودکار در مرورگر</span>
          </span>
        </div>
      </footer>

      {/* ============================================================
          MODALS (Templates, Cheatsheet, Search/Replace, QuickSwitcher, Paste)
         ============================================================ */}
      <MdTemplatesModal
        isOpen={showTemplates}
        onClose={() => setShowTemplates(false)}
        onSelectTemplate={handleSelectTemplate}
      />

      <MdCheatsheetModal
        isOpen={showCheatsheet}
        onClose={() => setShowCheatsheet(false)}
      />

      {activeDoc && (
        <MdSearchReplaceModal
          isOpen={showSearch}
          onClose={() => setShowSearch(false)}
          content={activeDoc.content}
          onChangeContent={(val) => handleContentChange(val)}
          onSelectMatch={(start, end) => editorRef.current?.selectRange(start, end)}
        />
      )}

      <MdQuickSwitcherModal
        isOpen={showQuickSwitcher}
        onClose={() => setShowQuickSwitcher(false)}
        documents={documents}
        activeDocId={activeDoc?.id || ''}
        onSelectDoc={(id) => {
          setActiveDocId(id);
          if (settings.viewMode === 'workspace') {
            updateSettings({ viewMode: 'preview' });
          }
        }}
        onCreateNewDoc={(title) => handleCreateDoc(title)}
      />

      {/* Quick Paste Markdown Modal */}
      {showPasteModal && (
        <div
          className="fixed inset-0 z-[135] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs"
          dir="rtl"
        >
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl p-6 shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ClipboardPaste className="w-5 h-5 text-sky-400" />
                <h3 className="text-base font-bold">الصاق سریع متن مارک‌دان (Paste Markdown)</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPasteModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">عنوان سند:</label>
                <input
                  type="text"
                  value={pasteTitle}
                  onChange={(e) => setPasteTitle(e.target.value)}
                  placeholder="مثلاً: خلاصه فصل سوم..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">پوشه / دسته‌بندی:</label>
                <input
                  type="text"
                  value={pasteCategory}
                  onChange={(e) => setPasteCategory(e.target.value)}
                  placeholder="اسناد الصاقی"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">محتوای مارک‌دان:</label>
              <textarea
                rows={9}
                value={pasteContent}
                onChange={(e) => setPasteContent(e.target.value)}
                placeholder="# عنوان اصلی&#10;متن مارک‌دان خود را اینجا Paste کنید..."
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white font-mono leading-relaxed focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowPasteModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 cursor-pointer"
              >
                انصراف
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!pasteContent.trim()) return;
                  handleCreateDoc(
                    pasteTitle.trim() || 'سند الصاق شده',
                    pasteContent,
                    pasteCategory.trim() || 'اسناد الصاقی'
                  );
                  setPasteTitle('');
                  setPasteContent('');
                  setShowPasteModal(false);
                }}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg shadow-indigo-600/25 cursor-pointer"
              >
                ایجاد و رندر سند
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
