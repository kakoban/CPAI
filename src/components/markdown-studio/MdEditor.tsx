import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { EditorState, Compartment } from '@codemirror/state';
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  highlightActiveLineGutter,
  drawSelection,
  placeholder as cmPlaceholder,
} from '@codemirror/view';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { markdown } from '@codemirror/lang-markdown';
import { syntaxHighlighting, defaultHighlightStyle, bracketMatching } from '@codemirror/language';
import { autocompletion, CompletionContext } from '@codemirror/autocomplete';
import { HighlightColor, MarkdownDocument } from './types';

export interface MdEditorProps {
  value: string;
  onChange: (val: string) => void;
  direction: 'rtl' | 'ltr' | 'auto';
  fontSize: number;
  lineNumbersVisible: boolean;
  onScroll?: (scrollPercentage: number) => void;
  onCursorChange?: (line: number, col: number, selectedChars: number) => void;
  documents?: MarkdownDocument[];
}

export interface EditorHandle {
  insertMarkdown: (prefix: string, suffix?: string, defaultText?: string) => void;
  insertHighlight: (color: HighlightColor) => void;
  insertTable: (rows: number, cols: number) => void;
  insertCallout: (type: 'NOTE' | 'TIP' | 'IMPORTANT' | 'WARNING' | 'CAUTION') => void;
  scrollToLine: (line: number) => void;
  selectRange: (start: number, end: number) => void;
  focus: () => void;
  getTextarea: () => HTMLTextAreaElement | null;
}

export const MdEditor = forwardRef<EditorHandle, MdEditorProps>(
  ({ value, onChange, direction, fontSize, lineNumbersVisible, onScroll, onCursorChange, documents = [] }, ref) => {
    const editorContainerRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null);
    const lineNumbersCompartment = useRef(new Compartment());
    const themeCompartment = useRef(new Compartment());
    const dirCompartment = useRef(new Compartment());
    const autocompleteCompartment = useRef(new Compartment());

    const onChangeRef = useRef(onChange);
    const onScrollRef = useRef(onScroll);
    const onCursorChangeRef = useRef(onCursorChange);
    const isExternalUpdate = useRef(false);

    useEffect(() => {
      onChangeRef.current = onChange;
      onScrollRef.current = onScroll;
      onCursorChangeRef.current = onCursorChange;
    }, [onChange, onScroll, onCursorChange]);

    const detectedDir = React.useMemo(() => {
      if (direction !== 'auto') return direction;
      const firstChars = value.trim().slice(0, 120);
      const persianRegex = /[\u0600-\u06FF]/;
      return persianRegex.test(firstChars) || firstChars.length === 0 ? 'rtl' : 'ltr';
    }, [value, direction]);

    const insertMarkdown = (prefix: string, suffix: string = '', defaultText: string = 'متن نمونه') => {
      const view = viewRef.current;
      if (!view) return;

      const selection = view.state.selection.main;
      const selectedText = view.state.sliceDoc(selection.from, selection.to);
      const textToInsert = selectedText.length > 0 ? selectedText : defaultText;
      const replacement = `${prefix}${textToInsert}${suffix}`;

      view.dispatch({
        changes: { from: selection.from, to: selection.to, insert: replacement },
        selection: {
          anchor: selection.from + prefix.length,
          head: selection.from + prefix.length + textToInsert.length,
        },
        scrollIntoView: true,
      });
      view.focus();
    };

    const insertHighlight = (color: HighlightColor) => {
      const colorLabels: Record<HighlightColor, string> = {
        yellow: 'نکته کلیدی زرد',
        green: 'نکته سبز',
        blue: 'نکته آبی',
        pink: 'نکته صورتی',
        purple: 'نکته بنفش',
        orange: 'نکته نارنجی',
      };
      insertMarkdown(`==${color}:`, `==`, colorLabels[color]);
    };

    const insertTable = (rows: number, cols: number) => {
      let header = '| ';
      let divider = '| ';
      for (let c = 1; c <= cols; c++) {
        header += `ستون ${c} | `;
        divider += `:---: | `;
      }
      let body = '';
      for (let r = 1; r <= rows; r++) {
        body += '| ';
        for (let c = 1; c <= cols; c++) {
          body += `داده ${r}-${c} | `;
        }
        body += '\n';
      }
      const tableMd = `\n${header.trim()}\n${divider.trim()}\n${body.trim()}\n`;
      insertMarkdown(tableMd, '', '');
    };

    const insertCallout = (type: 'NOTE' | 'TIP' | 'IMPORTANT' | 'WARNING' | 'CAUTION') => {
      const calloutTexts = {
        NOTE: 'این یک یادداشت آموزشی برای توضیح بیشتر مبحث است.',
        TIP: 'نکته طلایی و میان‌بر کاربردی برای یادگیری سریع‌تر.',
        IMPORTANT: 'محتوای بسیار مهم که حتماً باید به خاطر بسپارید.',
        WARNING: 'توجه: در به کارگیری این بخش دقت کافی داشته باشید.',
        CAUTION: 'خطای رایج! از انجام این کار خودداری کنید.',
      };
      insertMarkdown(`\n> [!${type}]\n> `, '\n', calloutTexts[type]);
    };

    const scrollToLine = (line: number) => {
      const view = viewRef.current;
      if (!view) return;
      const docLines = view.state.doc.lines;
      const targetLine = Math.max(1, Math.min(line, docLines));
      const lineInfo = view.state.doc.line(targetLine);
      view.dispatch({
        selection: { anchor: lineInfo.from, head: lineInfo.to },
        effects: EditorView.scrollIntoView(lineInfo.from, { y: 'center' }),
      });
      view.focus();
    };

    const selectRange = (start: number, end: number) => {
      const view = viewRef.current;
      if (!view) return;
      const maxLen = view.state.doc.length;
      const safeStart = Math.max(0, Math.min(start, maxLen));
      const safeEnd = Math.max(safeStart, Math.min(end, maxLen));
      view.dispatch({
        selection: { anchor: safeStart, head: safeEnd },
        effects: EditorView.scrollIntoView(safeStart, { y: 'center' }),
      });
      view.focus();
    };

    useImperativeHandle(ref, () => ({
      insertMarkdown,
      insertHighlight,
      insertTable,
      insertCallout,
      scrollToLine,
      selectRange,
      focus: () => viewRef.current?.focus(),
      getTextarea: () => null,
    }));

    const buildTheme = (size: number) =>
      EditorView.theme({
        '&': {
          height: '100%',
          fontSize: `${size}px`,
          backgroundColor: 'transparent',
          color: 'inherit',
        },
        '.cm-content': {
          fontFamily: "'Vazirmatn', 'Fira Code', monospace",
          padding: '24px 28px',
          lineHeight: '1.85',
          caretColor: '#6366f1',
        },
        '.cm-Focused': {
          outline: 'none',
        },
        '.cm-gutters': {
          backgroundColor: 'rgba(248, 250, 252, 0.7)',
          color: '#94a3b8',
          border: 'none',
          borderLeft: '1px solid #f1f5f9',
          borderRight: '1px solid #f1f5f9',
          fontFamily: "'Fira Code', monospace",
          fontSize: '12px',
          minWidth: '48px',
        },
        '.cm-activeLineGutter': {
          backgroundColor: 'rgba(99, 102, 241, 0.08)',
          color: '#6366f1',
          fontWeight: 'bold',
        },
        '.cm-activeLine': {
          backgroundColor: 'rgba(99, 102, 241, 0.04)',
          borderRadius: '4px',
        },
        '.cm-selectionBackground, ::selection': {
          backgroundColor: 'rgba(99, 102, 241, 0.2) !important',
        },
        '.cm-scroller': {
          overflow: 'auto',
          fontFamily: "'Vazirmatn', 'Fira Code', monospace",
        },
      });

    useEffect(() => {
      if (!editorContainerRef.current) return;

      const customKeymap = keymap.of([
        {
          key: 'Mod-b',
          run: () => {
            insertMarkdown('**', '**', 'متن ضخیم');
            return true;
          },
        },
        {
          key: 'Mod-i',
          run: () => {
            insertMarkdown('*', '*', 'متن مورب');
            return true;
          },
        },
        {
          key: 'Mod-h',
          run: () => {
            insertHighlight('yellow');
            return true;
          },
        },
        {
          key: 'Mod-k',
          run: () => {
            insertMarkdown('[', '](https://example.com)', 'عنوان لینک');
            return true;
          },
        },
      ]);

      const state = EditorState.create({
        doc: value,
        extensions: [
          lineNumbersCompartment.current.of(lineNumbersVisible ? lineNumbers() : []),
          themeCompartment.current.of(buildTheme(fontSize)),
          dirCompartment.current.of(
            EditorView.contentAttributes.of({
              dir: detectedDir,
              style: `text-align: ${detectedDir === 'rtl' ? 'right' : 'left'}`,
            })
          ),
          autocompleteCompartment.current.of(autocompletion({ override: [] })),
          highlightActiveLineGutter(),
          highlightActiveLine(),
          history(),
          drawSelection(),
          bracketMatching(),
          markdown(),
          syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
          EditorView.lineWrapping,
          cmPlaceholder('متن مارک‌دان خود را اینجا بنویسید یا فایل .md خود را از نوار بالا آپلود کنید...'),
          customKeymap,
          keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
          EditorView.updateListener.of((update) => {
            if (update.docChanged && !isExternalUpdate.current) {
              const newVal = update.state.doc.toString();
              onChangeRef.current(newVal);
            }
            if (update.selectionSet || update.docChanged) {
              const sel = update.state.selection.main;
              const lineObj = update.state.doc.lineAt(sel.head);
              const lineNum = lineObj.number;
              const colNum = sel.head - lineObj.from + 1;
              const selectedLen = Math.abs(sel.to - sel.from);
              onCursorChangeRef.current?.(lineNum, colNum, selectedLen);
            }
          }),
          EditorView.domEventHandlers({
            scroll: (_event, view) => {
              if (!onScrollRef.current) return;
              const scroller = view.scrollDOM;
              const maxScroll = scroller.scrollHeight - scroller.clientHeight;
              if (maxScroll > 0) {
                onScrollRef.current(scroller.scrollTop / maxScroll);
              }
            },
          }),
        ],
      });

      const view = new EditorView({
        state,
        parent: editorContainerRef.current,
      });

      viewRef.current = view;

      return () => {
        view.destroy();
        viewRef.current = null;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      const view = viewRef.current;
      if (!view) return;
      const currentText = view.state.doc.toString();
      if (value !== currentText) {
        isExternalUpdate.current = true;
        view.dispatch({
          changes: { from: 0, to: currentText.length, insert: value },
        });
        isExternalUpdate.current = false;
      }
    }, [value]);

    useEffect(() => {
      const view = viewRef.current;
      if (!view) return;
      view.dispatch({
        effects: lineNumbersCompartment.current.reconfigure(lineNumbersVisible ? lineNumbers() : []),
      });
    }, [lineNumbersVisible]);

    useEffect(() => {
      const view = viewRef.current;
      if (!view) return;
      view.dispatch({
        effects: themeCompartment.current.reconfigure(buildTheme(fontSize)),
      });
    }, [fontSize]);

    useEffect(() => {
      const view = viewRef.current;
      if (!view) return;
      view.dispatch({
        effects: dirCompartment.current.reconfigure(
          EditorView.contentAttributes.of({
            dir: detectedDir,
            style: `text-align: ${detectedDir === 'rtl' ? 'right' : 'left'}`,
          })
        ),
      });
    }, [detectedDir]);

    useEffect(() => {
      const view = viewRef.current;
      if (!view) return;

      const synapseCompletion = (context: CompletionContext) => {
        const word = context.matchBefore(/!?\[\[[^\]]*/);
        if (!word) return null;

        const isEmbed = word.text.startsWith('!');
        const query = word.text.replace(/^!?\[\[/, '').toLowerCase();

        const options = documents
          .filter((d) => d.title.toLowerCase().includes(query))
          .map((d) => ({
            label: d.title,
            detail: isEmbed ? 'تزریق زنده (Transclusion)' : `پیوند به (${d.category})`,
            apply: `${isEmbed ? '!' : ''}[[${d.title}]]`,
          }));

        return {
          from: word.from,
          options,
          filter: false,
        };
      };

      view.dispatch({
        effects: autocompleteCompartment.current.reconfigure(
          autocompletion({ override: [synapseCompletion] })
        ),
      });
    }, [documents]);

    return (
      <div className="relative h-full w-full flex flex-col bg-white dark:bg-slate-900 overflow-hidden md-studio-codemirror">
        <div ref={editorContainerRef} className="flex-1 w-full h-full overflow-hidden" />
      </div>
    );
  }
);

MdEditor.displayName = 'MdEditor';
