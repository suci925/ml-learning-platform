import { useProgressStore } from '../../store/progressStore';

export default function Header() {
  const getOverallProgress = useProgressStore((s) => s.getOverallProgress);
  const pct = getOverallProgress();

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-500">学习进度</span>
        <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-sm font-mono text-slate-600">{pct}%</span>
      </div>
      <div className="flex items-center gap-3">
        <a href="/playground" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
          模型实验台
        </a>
        <a href="/demo" className="btn-primary text-sm !px-3 !py-1.5">
          餐厅Demo
        </a>
      </div>
    </header>
  );
}
