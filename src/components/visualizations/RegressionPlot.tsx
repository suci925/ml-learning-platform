import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

// Interactive regression visualization - Chapter 4
export default function RegressionPlot() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [degree, setDegree] = useState(1);
  const [noise, setNoise] = useState(0.5);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    // Generate data: rating = 4.5 - 0.008 * price + noise
    const rawData: [number, number][] = [];
    for (let i = 0; i < 200; i++) {
      const price = 20 + Math.random() * 280;
      const baseRating = 4.5 - 0.008 * price;
      const noisedRating = baseRating + (Math.random() - 0.5) * 2 * noise;
      rawData.push([price, Math.max(1, Math.min(5, noisedRating))]);
    }

    // Fit polynomial
    const xs = rawData.map((d) => d[0]);
    const ys = rawData.map((d) => d[1]);
    const coefficients = polynomialFit(xs, ys, degree);

    const lineData: [number, number][] = [];
    for (let p = 15; p <= 310; p += 1) {
      let y = 0;
      for (let d = 0; d <= degree; d++) {
        y += coefficients[d] * Math.pow(p, d);
      }
      lineData.push([p, Math.max(1, Math.min(5, y))]);
    }

    chart.setOption({
      tooltip: { trigger: 'item' },
      xAxis: {
        name: '人均消费 (¥)',
        type: 'value',
        min: 10,
        max: 320,
        nameTextStyle: { fontSize: 12 },
      },
      yAxis: {
        name: '评分',
        type: 'value',
        min: 0,
        max: 5.5,
        nameTextStyle: { fontSize: 12 },
      },
      series: [
        {
          type: 'scatter',
          data: rawData,
          symbolSize: 5,
          itemStyle: { color: '#94a3b8', opacity: 0.6 },
          name: '餐厅数据点',
        },
        {
          type: 'line',
          data: lineData,
          smooth: true,
          lineStyle: { color: '#2563eb', width: 2.5 },
          symbol: 'none',
          name: `多项式拟合 (degree=${degree})`,
        },
      ],
      legend: { bottom: 0 },
    });

    return () => chart.dispose();
  }, [degree, noise]);

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-slate-700">回归拟合可视化</h4>
        <div className="flex items-center gap-4">
          <label className="text-xs text-slate-500">
            多项式阶数:
            <input
              type="range"
              min="1"
              max="15"
              value={degree}
              onChange={(e) => setDegree(+e.target.value)}
              className="ml-2 w-24"
            />
            <span className="ml-1 font-mono">{degree}</span>
          </label>
          <label className="text-xs text-slate-500">
            噪声:
            <input
              type="range"
              min="0.1"
              max="1.5"
              step="0.1"
              value={noise}
              onChange={(e) => setNoise(+e.target.value)}
              className="ml-2 w-24"
            />
            <span className="ml-1 font-mono">{noise}</span>
          </label>
        </div>
      </div>
      <p className="text-sm text-slate-500 mb-4">
        拖拽滑块调整多项式阶数，观察欠拟合（低阶数）和过拟合（高阶数）的现象。
        价格每增加10元，评分约下降0.08分——但仅靠价格无法准确预测评分（R²≈0.05）。
      </p>
      <div ref={chartRef} style={{ width: '100%', height: 350 }} />
    </div>
  );
}

// Simple least-squares polynomial fit
function polynomialFit(xs: number[], ys: number[], degree: number): number[] {
  const n = xs.length;
  const m = degree + 1;
  const A: number[][] = Array.from({ length: m }, () => Array(m).fill(0));
  const b: number[] = Array(m).fill(0);

  for (let i = 0; i < n; i++) {
    const xp: number[] = [1];
    for (let d = 1; d <= 2 * degree; d++) {
      xp.push(xp[d - 1] * xs[i]);
    }
    for (let row = 0; row < m; row++) {
      for (let col = 0; col < m; col++) {
        A[row][col] += xp[row + col];
      }
      b[row] += xp[row] * ys[i];
    }
  }

  // Gaussian elimination
  for (let k = 0; k < m; k++) {
    let maxRow = k;
    for (let i = k + 1; i < m; i++) {
      if (Math.abs(A[i][k]) > Math.abs(A[maxRow][k])) maxRow = i;
    }
    [A[k], A[maxRow]] = [A[maxRow], A[k]];
    [b[k], b[maxRow]] = [b[maxRow], b[k]];

    const pivot = A[k][k];
    if (Math.abs(pivot) < 1e-10) continue;
    for (let j = k; j < m; j++) A[k][j] /= pivot;
    b[k] /= pivot;

    for (let i = k + 1; i < m; i++) {
      const factor = A[i][k];
      for (let j = k; j < m; j++) A[i][j] -= factor * A[k][j];
      b[i] -= factor * b[k];
    }
  }

  for (let k = m - 1; k >= 0; k--) {
    for (let i = 0; i < k; i++) {
      b[i] -= A[i][k] * b[k];
    }
  }

  return b;
}
