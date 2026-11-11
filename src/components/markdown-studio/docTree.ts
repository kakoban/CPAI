import { MarkdownDoc, MarkdownDocument, DocSortOption } from './types';

export interface DocTreeNode {
  name: string;
  fullPath: string;
  children: DocTreeNode[];
  docs: MarkdownDoc[];
}

export interface FolderNode {
  name: string;
  path: string;
  children: FolderNode[];
  docs: MarkdownDocument[];
}

export const DEFAULT_FOLDER_NAME = 'عمومی';

export function getDocUploadTime(doc: MarkdownDoc): number {
  return doc.uploadedAt || doc.createdAt || doc.updatedAt || 0;
}

export function sortDocs(docs: MarkdownDoc[], sortBy: DocSortOption = 'upload-desc'): MarkdownDoc[] {
  const list = [...docs];
  switch (sortBy) {
    case 'upload-desc':
      return list.sort((a, b) => getDocUploadTime(b) - getDocUploadTime(a));
    case 'upload-asc':
      return list.sort((a, b) => getDocUploadTime(a) - getDocUploadTime(b));
    case 'updated-desc':
      return list.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    case 'title-asc':
      return list.sort((a, b) => (a.title || '').localeCompare(b.title || '', 'fa', { numeric: true }));
    default:
      return list.sort((a, b) => getDocUploadTime(b) - getDocUploadTime(a));
  }
}

export function getEffectiveFolderPath(folderPath?: string): string {
  let clean = (folderPath || '')
    .trim()
    .replace(/\\/g, '/')
    .replace(/^\/+|\/+$/g, '');

  clean = clean.replace(/^[a-zA-Z]:(\/|\\)?/i, '');
  clean = clean.replace(/^\/+|\/+$/g, '').trim();

  return clean || DEFAULT_FOLDER_NAME;
}

export interface FolderTheme {
  border: string;
  headerBg: string;
  icon: string;
  badge: string;
  cardBorder: string;
}

export function getFolderTheme(_folderName?: string): FolderTheme {
  return {
    border: 'border-indigo-500/30 hover:border-indigo-500/50',
    headerBg: 'bg-indigo-500/5 hover:bg-indigo-500/10',
    icon: 'text-indigo-500',
    badge: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border-indigo-500/30',
    cardBorder: 'hover:border-indigo-500/50',
  };
}

export function buildFolderTree(docs: MarkdownDocument[]): FolderNode {
  const root: FolderNode = { name: '', path: '', children: [], docs: [] };

  docs.forEach((doc) => {
    const rawCategory = (doc.category || doc.folderPath || DEFAULT_FOLDER_NAME).trim();
    const parts = rawCategory
      .split('/')
      .map((p) => p.trim())
      .filter(Boolean);

    if (parts.length === 0) {
      root.docs.push(doc);
      return;
    }

    let current = root;
    let currentPath = '';
    for (const part of parts) {
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      let nextNode = current.children.find((c) => c.name === part);
      if (!nextNode) {
        nextNode = { name: part, path: currentPath, children: [], docs: [] };
        current.children.push(nextNode);
      }
      current = nextNode;
    }
    current.docs.push(doc);
  });

  return root;
}
