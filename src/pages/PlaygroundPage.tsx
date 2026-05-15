import { useState } from 'react';

const models = [
  { id: 'linear', name: '线性回归', icon: '📈' },
  { id: 'logistic', name: 'Logistic回归', icon: '🎯' },
  { id: 'rf', name: '随机森林', icon: '🌲' },
  { id: 'xgb', name: 'XGBoost', icon: '🚀' },
  { id: 'mlp', name: 'MLP神经网络', icon: '🧠' },
];

const datasets = [
  { id: 'price_rating', name: '价格-评分', size: '30,000条' },
  { id: 'restaurant_success', name: '餐厅-存活', size: '10,000条' },
  { id: 'cuisine_photos', name: '食物图片', size: '8,000张' },
];

export default function PlaygroundPage() {
  const [selectedModel, setSelectedModel] = useState('linear');
  const [selectedDataset, setSelectedDataset] = useState('price_rating');
  const [params, setParams] = useState({
    learningRate: 0.01,
    epochs: 100,
    testSize: 0.2,
  });
  const [isTraining, setIsTraining] = useState(false);
  const [results, setResults] = useState<null | { loss: number[]; r2: number; mse: number }>(null);

  const handleTrain = () => {
    setIsTraining(true);
    // Simulate training with mock data
    setTimeout(() => {
      setResults({
        loss: Array.from({ length: 50 }, (_, i) => 5 * Math.exp(-i * 0.08) + Math.random() * 0.3),
        r2: 0.78 + Math.random() * 0.15,
        mse: 0.15 + Math.random() * 0.1,
      });
      setIsTraining(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">🧪 模型实验台</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Model & Dataset Selection */}
        <div className="lg:col-span-1 space-y-4">
          {/* Model selector */}
          <div className="card p-4">
            <h4 className="font-semibold text-slate-700 mb-3">选择模型</h4>
            <div className="space-y-1.5">
              {models.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedModel(m.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedModel === m.id
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{m.icon}</span>
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* Dataset selector */}
          <div className="card p-4">
            <h4 className="font-semibold text-slate-700 mb-3">选择数据集</h4>
            <div className="space-y-1.5">
              {datasets.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDataset(d.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedDataset === d.id
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{d.name}</span>
                  <span className="text-xs text-slate-400">{d.size}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Parameters */}
          <div className="card p-4">
            <h4 className="font-semibold text-slate-700 mb-3">参数设置</h4>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-500 block mb-1">
                  学习率: {params.learningRate}
                </label>
                <input
                  type="range"
                  min="0.001"
                  max="0.1"
                  step="0.001"
                  value={params.learningRate}
                  onChange={(e) => setParams({ ...params, learningRate: +e.target.value })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">
                  训练轮数: {params.epochs}
                </label>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={params.epochs}
                  onChange={(e) => setParams({ ...params, epochs: +e.target.value })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">
                  测试集比例: {params.testSize}
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="0.4"
                  step="0.05"
                  value={params.testSize}
                  onChange={(e) => setParams({ ...params, testSize: +e.target.value })}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleTrain}
            disabled={isTraining}
            className="btn-primary w-full"
          >
            {isTraining ? '训练中...' : '开始训练'}
          </button>
        </div>

        {/* Results area */}
        <div className="lg:col-span-2 space-y-4">
          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="card p-4">
              <div className="text-sm text-slate-500">R² Score</div>
              <div className="text-2xl font-bold text-slate-800 mt-1">
                {results ? results.r2.toFixed(3) : '--'}
              </div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-slate-500">MSE</div>
              <div className="text-2xl font-bold text-slate-800 mt-1">
                {results ? results.mse.toFixed(3) : '--'}
              </div>
            </div>
          </div>

          {/* Loss curve */}
          <div className="card p-4">
            <h4 className="font-semibold text-slate-700 mb-3">训练损失曲线</h4>
            <div className="h-64 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center">
              {results ? (
                <svg viewBox="0 0 400 200" className="w-full h-full p-4">
                  <polyline
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2"
                    points={results.loss
                      .map(
                        (v, i) =>
                          `${(i / (results.loss.length - 1)) * 380 + 10},${200 - (v / 5) * 180 - 10}`
                      )
                      .join(' ')}
                  />
                  {/* Axes */}
                  <line x1="10" y1="190" x2="390" y2="190" stroke="#cbd5e1" strokeWidth="1" />
                  <line x1="10" y1="10" x2="10" y2="190" stroke="#cbd5e1" strokeWidth="1" />
                  <text x="200" y="198" textAnchor="middle" fontSize="10" fill="#94a3b8">
                    Epochs
                  </text>
                  <text
                    x="4"
                    y="100"
                    textAnchor="middle"
                    fontSize="10"
                    fill="#94a3b8"
                    transform="rotate(-90, 4, 100)"
                  >
                    Loss
                  </text>
                </svg>
              ) : (
                <div className="text-slate-400 text-sm">
                  {isTraining ? '模型训练中...' : '点击"开始训练"查看结果'}
                </div>
              )}
            </div>
          </div>

          {/* Console log */}
          <div className="card p-4">
            <h4 className="font-semibold text-slate-700 mb-3">训练日志</h4>
            <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-300 h-48 overflow-y-auto">
              {isTraining ? (
                <div>
                  <p className="text-green-400">$ Loading dataset: {datasets.find(d => d.id === selectedDataset)?.name}...</p>
                  <p className="text-green-400">$ Initializing model: {models.find(m => m.id === selectedModel)?.name}...</p>
                  <p className="text-blue-400">$ lr={params.learningRate}, epochs={params.epochs}</p>
                  <p className="text-yellow-400">$ Training...</p>
                  <p className="text-slate-500">Epoch 1/100 - loss: 4.231</p>
                  <p className="text-slate-500">Epoch 2/100 - loss: 3.892</p>
                  <p className="animate-pulse">...</p>
                </div>
              ) : results ? (
                <div>
                  <p className="text-green-400">$ Training complete!</p>
                  <p className="text-white">R² Score: {results.r2.toFixed(4)}</p>
                  <p className="text-white">MSE: {results.mse.toFixed(4)}</p>
                  <p className="text-slate-500">---</p>
                  <p className="text-slate-400">
                    $ 提示：在Playground中修改参数并重新训练，观察性能变化。这体现了"超参数调优"的过程。
                  </p>
                </div>
              ) : (
                <p className="text-slate-500">$ 等待开始训练...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
