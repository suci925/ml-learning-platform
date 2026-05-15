import { Link } from 'react-router-dom';
import type { Chapter } from '../../data/chapters';

export default function ChapterNav({ prev, next }: { prev?: Chapter; next?: Chapter }) {
  return (
    <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
      {prev ? (
        <Link
          to={`/chapter/${prev.id}`}
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
        >
          <span>←</span>
          <div>
            <div className="text-xs text-slate-400">上一章</div>
            <div className="text-sm font-medium">{prev.title}</div>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          to={`/chapter/${next.id}`}
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors text-right"
        >
          <div>
            <div className="text-xs text-slate-400">下一章</div>
            <div className="text-sm font-medium">{next.title}</div>
          </div>
          <span>→</span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
