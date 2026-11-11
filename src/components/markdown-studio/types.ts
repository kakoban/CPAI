export type ThemeMode = 'dark' | 'light' | 'sepia' | 'cyber' | 'nord' | 'academic' | 'editorial';
export type AppTheme = ThemeMode;

export type FontFamily = 'vazir' | 'sans' | 'serif' | 'mono';

export type ViewMode = 'workspace' | 'split' | 'editor' | 'preview' | 'presentation';

export type TextDirection = 'auto' | 'rtl' | 'ltr';

export type HighlightColor = 'yellow' | 'green' | 'blue' | 'pink' | 'purple' | 'orange';

export type DocSortOption = 'upload-desc' | 'upload-asc' | 'updated-desc' | 'title-asc';

export type CloudSyncStatus = 'synced' | 'saving' | 'pending' | 'error';

export interface MarkdownDocument {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: number;
  updatedAt: number;
  uploadedAt?: number;
  isFavorite?: boolean;
  tags?: string[];
  isCloudShared?: boolean;
  isPublic?: boolean;
  cloudSyncedAt?: number;
  cloudAuthor?: string;
  isForked?: boolean;
  wordGoal?: number;
  folderPath?: string;
  isAiBrain?: boolean;
}

export type MarkdownDoc = MarkdownDocument;

export interface EditorSettings {
  theme: ThemeMode;
  fontFamily: FontFamily;
  fontSize: number;
  viewMode: ViewMode;
  showOutline: boolean;
  syncScroll: boolean;
  lineNumbers: boolean;
  direction: TextDirection;
}

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
  line: number;
}

export interface MarkdownTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  content: string;
}

export interface DocStats {
  words: number;
  chars: number;
  charsNoSpaces: number;
  lines: number;
  readingTime: number;
  readingTimeMin: number;
  headingsCount: number;
  tasks: {
    total: number;
    completed: number;
  };
  tasksCount: {
    total: number;
    completed: number;
  };
}
