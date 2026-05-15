import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

// Attention heatmap visualization - Chapter 10
const sentences = [
  ['火锅', '太辣了', '，', '但', '超级', '好吃', '！'],
  ['环境', '优雅', '，', '服务', '周到', '，', '价格', '合理'],
];

export default function AttentionHeatmap() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [sentenceIdx, setSentenceIdx] = useState(0);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    const tokens = sentences[sentenceIdx];
    const n = tokens.length;

    // Generate attention matrix
    const data: [number, number, number][] = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        // Simulate attention: "好吃" attends to "火锅" and "超级"
        let val = Math.random() * 0.15;
        if (tokens[i] === '好吃' && (tokens[j] === '火锅' || tokens[j] === '超级')) val = 0.8 + Math.random() * 0.2;
        if (tokens[i] === '超级' && tokens[j] === '好吃') val = 0.7 + Math.random() * 0.2;
        if (tokens[i] === '但' && (tokens[j] === '太辣了' || tokens[j] === '好吃')) val = 0.6 + Math.random() * 0.2;
        if (i === j) val = 0.4 + Math.random() * 0.3;
        if (tokens[j] === '，') val = 0.05;
        data.push([j, i, val]);
      }
    }

    chart.setOption({
      tooltip: {
        formatter: (params: any) => {
          const i = params.value[1];
          const j = params.value[0];
          const score = (params.value[2] * 100).toFixed(0);
          return `"${tokens[i]}" 关注 "${tokens[j]}": ${score}%`;
        },
      },
      xAxis: {
        type: 'category',
        data: tokens.map((t) => (t === '，' || t === '！' ? ' ' : t)),
        axisLabel: { fontSize: 11, rotate: 30 },
        position: 'top',
      },
      yAxis: {
        type: 'category',
        data: tokens.map((t) => (t === '，' || t === '！' ? ' ' : t)),
        axisLabel: { fontSize: 11 },
        inverse: true,
      },
      visualMap: {
        min: 0,
        max: 1,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: 0,
        inRange: { color: ['#f8fafc', '#bfdbfe', '#3b82f6', '#1d4ed8'] },
        textStyle: { fontSize: 10 },
      },
      series: [
        {
          type: 'heatmap',
          data,
          label: { show: false },
          emphasis: {
            itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.5)' },
          },
        },
      ],
      grid: { top: 80, bottom: 60, left: 50, right: 20 },
    });

    return () => chart.dispose();
  }, [sentenceIdx]);

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-slate-700">Self-Attention 热力图</h4>
        <div className="flex gap-1">
          {sentences.map((text, i) => (
            <button
              key={i}
              onClick={() => setSentenceIdx(i)}
              title={text.join('')}
              className={`text-xs px-2 py-1 rounded ${
                sentenceIdx === i ? 'bg-blue-100 text-blue-700' : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              例句{i + 1}
            </button>
          ))}
        </div>
      </div>
      <p className="text-sm text-slate-500 mb-4">
        色块越深表示关注度越高。Y轴=当前位置，X轴=关注的目标词。
        观察"好吃"如何高度关注"火锅"和"超级"——Transformer的Attention机制让任意距离的词直接交互。
      </p>
      <div ref={chartRef} style={{ width: '100%', height: 380 }} />
    </div>
  );
}
