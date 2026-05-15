import { useEffect, useRef } from 'react';

interface ChapterContentProps {
  content: string;
  chapterId: number;
}

export default function ChapterContent({ content, chapterId }: ChapterContentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    // Render math formulas if any
    if (window.renderMathInElement) {
      window.renderMathInElement(ref.current);
    }
  }, [content, chapterId]);

  return (
    <div
      ref={ref}
      className="prose prose-slate max-w-none
        prose-headings:text-slate-800 prose-headings:font-bold
        prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
        prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
        prose-p:text-slate-600 prose-p:leading-7
        prose-code:bg-slate-100 prose-code:text-blue-700 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
        prose-pre:bg-slate-900 prose-pre:text-slate-100
        prose-li:text-slate-600
        prose-strong:text-slate-800
        prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-1 prose-blockquote:px-4
        prose-table:border-collapse prose-th:bg-slate-50 prose-th:px-4 prose-th:py-2 prose-td:px-4 prose-td:py-2
      "
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

// Extend Window interface for KaTeX auto-render
declare global {
  interface Window {
    renderMathInElement?: (element: HTMLElement) => void;
  }
}
