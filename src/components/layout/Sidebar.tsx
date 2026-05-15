import { NavLink } from 'react-router-dom';
import { chapters } from '../../data/chapters';
import { useProgressStore } from '../../store/progressStore';

export default function Sidebar() {
  const progress = useProgressStore((s) => s.chapters);

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen overflow-y-auto flex-shrink-0 sticky top-0">
      <div className="p-4 border-b border-slate-200">
        <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <span className="text-xl">🍜</span>
          智能餐厅推荐
        </h1>
        <p className="text-xs text-slate-500 mt-1">机器学习与深度学习互动教程</p>
      </div>
      <nav className="p-2">
        {chapters.map((ch) => {
          const prog = progress[ch.id];
          return (
            <NavLink
              key={ch.id}
              to={`/chapter/${ch.id}`}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'}`
              }
            >
              <span className="text-base w-6 text-center">{ch.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-mono">Ch{ch.id}</span>
                  <span className="truncate">{ch.title}</span>
                </div>
                <div className="text-xs text-slate-400 truncate">{ch.subtitle}</div>
              </div>
              {prog?.completed && (
                <span className="text-green-500 text-xs flex-shrink-0" title="已完成">
                  ✓
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
