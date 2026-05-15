import { Link } from 'react-router-dom';
import { chapters } from '../data/chapters';
import { useProgressStore } from '../store/progressStore';

export default function HomePage() {
  const progress = useProgressStore((s) => s.chapters);
  const getOverallProgress = useProgressStore((s) => s.getOverallProgress);
  const pct = getOverallProgress();

  const completedCount = Object.values(progress).filter((c) => c.completed).length;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Hero */}
      <div className="card p-8 mb-8 bg-gradient-to-br from-blue-50 to-white">
        <h2 className="text-3xl font-bold text-slate-800 mb-3">
          机器学习与深度学习
        </h2>
        <p className="text-lg text-slate-500 mb-2">
          从餐厅推荐到智能系统 — 16章构建完整AI知识体系
        </p>
        <p className="text-sm text-slate-400 mb-6">
          基于2022-2025年最新AI研究成果，用一个统一的案例——"智能餐厅推荐与评价系统"——串联全部核心知识
        </p>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{completedCount}</div>
            <div className="text-sm text-slate-500">已完成章节</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{pct}%</div>
            <div className="text-sm text-slate-500">总体进度</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">16</div>
            <div className="text-sm text-slate-500">章内容</div>
          </div>
        </div>
      </div>

      {/* Start Learning Button */}
      <div className="flex gap-3 mb-8">
        <Link to="/chapter/1" className="btn-primary text-lg">
          开始学习 →
        </Link>
        <Link to="/playground" className="btn-secondary text-lg">
          模型实验台
        </Link>
        <Link to="/demo" className="btn-secondary text-lg">
          完整Demo
        </Link>
      </div>

      {/* Chapter Grid */}
      <h3 className="text-xl font-bold text-slate-800 mb-4">课程大纲</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chapters.map((ch) => {
          const prog = progress[ch.id];
          const isCompleted = prog?.completed;
          return (
            <Link
              key={ch.id}
              to={`/chapter/${ch.id}`}
              className={`card p-5 hover:shadow-md transition-all group ${
                isCompleted ? 'border-green-200 bg-green-50/30' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{ch.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-slate-400">第{ch.id}章</span>
                    {isCompleted && (
                      <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                        已完成
                      </span>
                    )}
                  </div>
                  <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {ch.title}
                  </h4>
                  <p className="text-sm text-slate-500">{ch.subtitle}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {ch.topics.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                    {ch.topics.length > 3 && (
                      <span className="text-xs text-slate-400">+{ch.topics.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
