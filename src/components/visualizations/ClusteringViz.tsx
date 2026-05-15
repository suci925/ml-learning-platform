import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

// K-Means clustering visualization - Chapter 6
export default function ClusteringViz() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(3);
  const [iteration, setIteration] = useState(0);

  // Generate fixed data points
  const clusters = useRef(generateClusters()).current;

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    // Simulate K-Means with a fixed number of iterations
    const centers = runKMeansIteration(clusters, k, iteration);

    const series: any[] = [];

    // Assign points to nearest center
    for (let ci = 0; ci < k; ci++) {
      const points = clusters.filter((p) => {
        const dists = centers.map((c) => Math.hypot(p[0] - c[0], p[1] - c[1]));
        return dists.indexOf(Math.min(...dists)) === ci;
      });

      const colors = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
      series.push({
        type: 'scatter',
        data: points,
        name: `簇 ${ci + 1}`,
        symbolSize: 8,
        itemStyle: { color: colors[ci % colors.length], opacity: 0.7 },
      });
    }

    // Centers
    series.push({
      type: 'scatter',
      data: centers,
      name: '聚类中心',
      symbolSize: 20,
      itemStyle: { color: '#1e293b', borderColor: '#fff', borderWidth: 2 },
      symbol: 'diamond',
    });

    chart.setOption({
      tooltip: { trigger: 'item' },
      xAxis: {
        name: '价格 (标准化)',
        type: 'value',
        nameTextStyle: { fontSize: 12 },
      },
      yAxis: {
        name: '评分 (标准化)',
        type: 'value',
        nameTextStyle: { fontSize: 12 },
      },
      series,
      legend: { bottom: 0 },
    });

    return () => chart.dispose();
  }, [k, iteration]);

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-slate-700">K-Means 聚类可视化</h4>
        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-500">
            K:
            <select
              value={k}
              onChange={(e) => { setK(+e.target.value); setIteration(0); }}
              className="ml-1 border rounded px-1 py-0.5"
            >
              {[2, 3, 4, 5, 6].map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </label>
          <label className="text-xs text-slate-500">
            迭代:
            <input
              type="range"
              min="0"
              max="10"
              value={iteration}
              onChange={(e) => setIteration(+e.target.value)}
              className="ml-2 w-20"
            />
            <span className="ml-1 font-mono text-xs">{iteration}</span>
          </label>
          <button
            onClick={() => setIteration(0)}
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            重置
          </button>
        </div>
      </div>
      <p className="text-sm text-slate-500 mb-4">
        拖拽迭代滑块观察K-Means的聚类过程：中心移动 → 重新分配 → 收敛。
        改变K值观察不同分组数的效果。菱形标记=聚类中心。
      </p>
      <div ref={chartRef} style={{ width: '100%', height: 350 }} />
    </div>
  );
}

function generateClusters(): [number, number][] {
  const points: [number, number][] = [];
  // 3 clusters
  const centers = [
    [-1, 1.5],
    [1.5, -1],
    [-1, -1.5],
  ];
  for (const [cx, cy] of centers) {
    for (let i = 0; i < 60; i++) {
      points.push([cx + (Math.random() - 0.5) * 2.5, cy + (Math.random() - 0.5) * 2]);
    }
  }
  return points;
}

function runKMeansIteration(
  points: [number, number][],
  k: number,
  iteration: number
): [number, number][] {
  // Initialize centers randomly from data
  let centers: [number, number][] = [];
  const shuffled = [...points].sort(() => Math.random() - 0.5);
  for (let i = 0; i < k; i++) {
    centers.push([...shuffled[i]]);
  }

  for (let iter = 0; iter < iteration; iter++) {
    // Assign points to nearest center
    const assignments: [number, number][][] = Array.from({ length: k }, () => []);
    for (const p of points) {
      let minDist = Infinity;
      let minIdx = 0;
      for (let ci = 0; ci < k; ci++) {
        const d = Math.hypot(p[0] - centers[ci][0], p[1] - centers[ci][1]);
        if (d < minDist) {
          minDist = d;
          minIdx = ci;
        }
      }
      assignments[minIdx].push(p);
    }
    // Update centers
    for (let ci = 0; ci < k; ci++) {
      if (assignments[ci].length === 0) continue;
      const mx = assignments[ci].reduce((s, p) => s + p[0], 0) / assignments[ci].length;
      const my = assignments[ci].reduce((s, p) => s + p[1], 0) / assignments[ci].length;
      centers[ci] = [mx, my];
    }
  }

  return centers;
}
