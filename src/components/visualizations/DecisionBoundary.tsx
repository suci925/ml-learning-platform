import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

// Decision boundary visualization - Chapter 5
export default function DecisionBoundary() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [showBoundary, setShowBoundary] = useState(true);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    // Generate two-class data
    const classA: [number, number][] = [];
    const classB: [number, number][] = [];

    // Class A: "会火" - higher rating, moderate price
    for (let i = 0; i < 80; i++) {
      const rating = 3.5 + Math.random() * 1.5;
      const price = 50 + rating * 25 + (Math.random() - 0.5) * 40;
      classA.push([price, rating]);
    }

    // Class B: "不会火" - lower or scattered
    for (let i = 0; i < 70; i++) {
      const rating = 1.5 + Math.random() * 2.5;
      const price = 20 + rating * 10 + (Math.random() - 0.5) * 50;
      classB.push([price, rating]);
    }

    const boundaryData: [number, number][] = [];
    if (showBoundary) {
      // Simulated decision boundary
      for (let p = 10; p <= 300; p += 0.5) {
        const r = 2.8 + 0.003 * p + 0.8 * Math.sin(p * 0.02);
        boundaryData.push([p, r]);
      }
    }

    chart.setOption({
      tooltip: { trigger: 'item' },
      xAxis: {
        name: '人均消费 (¥)',
        type: 'value',
        nameTextStyle: { fontSize: 12 },
      },
      yAxis: {
        name: '评分',
        type: 'value',
        min: 1.5,
        max: 5,
        nameTextStyle: { fontSize: 12 },
      },
      series: [
        {
          type: 'scatter',
          data: classA,
          name: '会火 (存活>1年)',
          symbolSize: 7,
          itemStyle: { color: '#10b981' },
        },
        {
          type: 'scatter',
          data: classB,
          name: '不会火',
          symbolSize: 7,
          itemStyle: { color: '#ef4444' },
        },
        ...(showBoundary
          ? [
              {
                type: 'line' as const,
                data: boundaryData,
                smooth: true,
                lineStyle: { color: '#2563eb', width: 2, type: 'dashed' as const },
                name: '决策边界',
                symbol: 'none',
              },
            ]
          : []),
      ],
      legend: { bottom: 0 },
    });

    return () => chart.dispose();
  }, [showBoundary]);

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-slate-700">决策边界可视化</h4>
        <button
          onClick={() => setShowBoundary(!showBoundary)}
          className="text-xs text-blue-600 hover:text-blue-800"
        >
          {showBoundary ? '隐藏' : '显示'}决策边界
        </button>
      </div>
      <p className="text-sm text-slate-500 mb-4">
        绿色=会火的餐厅，红色=不会火的餐厅。蓝色虚线是Logistic回归学到的决策边界。
        边界一侧被判为"会火"，另一侧被判为"不会火"。
      </p>
      <div ref={chartRef} style={{ width: '100%', height: 350 }} />
    </div>
  );
}
