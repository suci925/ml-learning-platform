import { useState } from 'react';

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  price: number;
  location: string;
  atmosphere: string;
  review: string;
  score: number;
}

const cuisines = ['川菜', '粤菜', '日料', '西餐', '火锅', '烧烤', '快餐'];
const atmospheres = ['浪漫约会', '家庭聚餐', '商务宴请', '朋友聚会', '一人食'];

const mockRestaurants: Restaurant[] = [
  { id: 1, name: '蜀香阁', cuisine: '川菜', rating: 4.8, price: 120, location: '市中心', atmosphere: '浪漫约会', review: '"环境优雅，水煮鱼一绝，靠窗座位夜景绝美"', score: 0 },
  { id: 2, name: '辣有道', cuisine: '川菜', rating: 4.5, price: 65, location: '大学城', atmosphere: '朋友聚会', review: '"性价比超高，麻辣鲜香，学生党最爱"', score: 0 },
  { id: 3, name: '锦里印象', cuisine: '川菜', rating: 4.6, price: 150, location: '商圈', atmosphere: '商务宴请', review: '"正宗川味，包间私密性好，适合请客"', score: 0 },
  { id: 4, name: '龙抄手', cuisine: '川菜', rating: 4.3, price: 35, location: '居民区', atmosphere: '一人食', review: '"地道小吃，红油抄手绝了，排队也要吃"', score: 0 },
  { id: 5, name: '巴蜀风', cuisine: '川菜', rating: 4.7, price: 90, location: '商圈', atmosphere: '朋友聚会', review: '"环境时尚，改良川菜，年轻人聚集地"', score: 0 },
];

export default function RestaurantDemo() {
  const [preferences, setPreferences] = useState({
    cuisine: '川菜',
    atmosphere: '浪漫约会',
    maxPrice: 150,
  });
  const [stage, setStage] = useState<'idle' | 'recall' | 'rank' | 'complete'>('idle');
  const [currentResults, setCurrentResults] = useState<Restaurant[]>([]);

  const simulatePipeline = async () => {
    // Stage 1: Recall
    setStage('recall');
    setCurrentResults([]);
    await new Promise((r) => setTimeout(r, 800));
    const recalled = mockRestaurants.filter(
      (r) => r.cuisine === preferences.cuisine
    );
    setCurrentResults(recalled);
    setStage('rank');

    // Stage 2: Rank
    await new Promise((r) => setTimeout(r, 1200));
    const ranked = recalled
      .map((r) => {
        let score = r.rating * 0.4;
        if (r.atmosphere === preferences.atmosphere) score += 2;
        if (r.price <= preferences.maxPrice) score += 1;
        score += (5 - r.price / 50) * 0.2;
        return { ...r, score: Math.round(score * 10) / 10 };
      })
      .sort((a, b) => b.score - a.score);
    setCurrentResults(ranked.slice(0, 3));
    setStage('complete');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">🍜 智能餐厅推荐系统 Demo</h2>
      <p className="text-slate-500 mb-8">
        模拟完整的工业级推荐流程：召回 → 粗排 → 精排 → 重排。选择偏好后观察系统如何为你推荐。
      </p>

      {/* User preferences */}
      <div className="card p-6 mb-6">
        <h3 className="font-semibold text-slate-700 mb-4">你的偏好</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-slate-500 block mb-1">菜系</label>
            <select
              value={preferences.cuisine}
              onChange={(e) => setPreferences({ ...preferences, cuisine: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white"
            >
              {cuisines.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-slate-500 block mb-1">场景</label>
            <select
              value={preferences.atmosphere}
              onChange={(e) => setPreferences({ ...preferences, atmosphere: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white"
            >
              {atmospheres.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-slate-500 block mb-1">
              最高人均: ¥{preferences.maxPrice}
            </label>
            <input
              type="range"
              min="30"
              max="300"
              step="10"
              value={preferences.maxPrice}
              onChange={(e) => setPreferences({ ...preferences, maxPrice: +e.target.value })}
              className="w-full mt-2"
            />
          </div>
        </div>
        <button
          onClick={simulatePipeline}
          disabled={stage !== 'idle' && stage !== 'complete'}
          className="btn-primary mt-4"
        >
          {stage === 'idle' || stage === 'complete' ? '开始推荐' : '推荐中...'}
        </button>
      </div>

      {/* Pipeline visualization */}
      <div className="card p-6 mb-6">
        <h3 className="font-semibold text-slate-700 mb-4">推荐流水线</h3>
        <div className="flex items-center gap-0 mb-6">
          {[
            { key: 'recall', label: '召回', from: '30,000', to: '200' },
            { key: 'prerank', label: '粗排', from: '200', to: '50' },
            { key: 'rank', label: '精排', from: '50', to: '10' },
            { key: 'rerank', label: '重排', from: '10', to: 'Top 3' },
          ].map((s, i) => (
            <div key={s.key} className="flex-1 flex items-center">
              <div
                className={`flex-1 text-center py-3 rounded-lg border-2 transition-colors ${
                  (s.key === 'recall' && (stage === 'recall' || stage === 'rank' || stage === 'complete')) ||
                  (s.key === 'rank' && (stage === 'rank' || stage === 'complete')) ||
                  (s.key === 'rerank' && stage === 'complete')
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="text-xs text-slate-400">{s.label}</div>
                <div className="text-lg font-bold text-slate-700">
                  {s.from}
                </div>
                <div className="text-xs text-slate-400">↓</div>
                <div className="text-sm font-semibold text-blue-600">{s.to}</div>
              </div>
              {i < 3 && <div className="text-slate-300 text-xl px-1">→</div>}
            </div>
          ))}
        </div>
        <div className="text-sm text-slate-500">
          {stage === 'idle' && '设置偏好后点击"开始推荐"，观察四阶段流水线的工作过程'}
          {stage === 'recall' && '🔍 召回阶段：从30,000家餐厅中快速筛选符合条件的候选...'}
          {stage === 'rank' && '🧠 精排阶段：深度模型对候选餐厅打分排序...'}
          {stage === 'complete' && '✅ 推荐完成！以下是为您精选的Top 3推荐'}
        </div>
      </div>

      {/* Results */}
      {currentResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-700">
            {stage === 'complete' ? '最终推荐结果' : `候选结果 (${currentResults.length}个)`}
          </h3>
          {currentResults.map((r, i) => (
            <div
              key={r.id}
              className={`card p-5 hover:shadow-md transition-all ${
                i === 0 && stage === 'complete' ? 'border-blue-300 bg-blue-50/30' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {i === 0 && stage === 'complete' && (
                      <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full font-medium">
                        最佳推荐
                      </span>
                    )}
                    <h4 className="font-semibold text-slate-800">{r.name}</h4>
                    <span className="text-xs text-slate-400">{r.cuisine}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                    <span>⭐ {r.rating}</span>
                    <span>💰 ¥{r.price}/人</span>
                    <span>📍 {r.location}</span>
                    <span>🎯 {r.atmosphere}</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-2 italic">{r.review}</p>
                </div>
                {stage === 'complete' && (
                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold text-blue-600">{r.score.toFixed(1)}</div>
                    <div className="text-xs text-slate-400">推荐分</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
