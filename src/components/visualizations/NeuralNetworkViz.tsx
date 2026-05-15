import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

// Neural network structure visualization - Chapter 8
export default function NeuralNetworkViz() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    // Layer configuration: [name, neuron count]
    const layers = [
      { name: '输入层\n(特征)', count: 5 },
      { name: '隐藏层1\n(ReLU)', count: 8 },
      { name: '隐藏层2\n(ReLU)', count: 6 },
      { name: '输出层\n(Sigmoid)', count: 1 },
    ];

    const layerGap = 100;
    const startX = 60;
    const neuronGap = 40;
    const categories: { name: string }[] = [];

    const nodes: any[] = [];
    const links: any[] = [];

    const prevPositions: { x: number; y: number }[] = [];

    layers.forEach((layer, li) => {
      const x = startX + li * layerGap;
      const totalHeight = (layer.count - 1) * neuronGap;
      const startY = 200 - totalHeight / 2;
      const positions: { x: number; y: number }[] = [];

      categories.push({ name: layer.name });

      for (let ni = 0; ni < layer.count; ni++) {
        const y = startY + ni * neuronGap;
        positions.push({ x, y });
        nodes.push({
          x,
          y,
          name: layer.name,
          category: li,
          symbolSize: layer.count === 1 ? 22 : Math.max(10, 28 - layer.count * 2),
          itemStyle: {
            color: li === 0 ? '#60a5fa' : li === layers.length - 1 ? '#f472b6' : '#a78bfa',
            borderColor: '#fff',
            borderWidth: 1.5,
          },
        });
      }

      // Connect to previous layer
      if (prevPositions.length > 0) {
        for (const prev of prevPositions) {
          for (const curr of positions) {
            links.push({
              source: [prev.x, prev.y],
              target: [curr.x, curr.y],
              lineStyle: {
                color: '#cbd5e1',
                opacity: 0.25,
                width: 0.8,
              },
            });
          }
        }
      }

      prevPositions.length = 0;
      prevPositions.push(...positions);
    });

    chart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => params.name,
      },
      xAxis: {
        show: false,
        min: 0,
        max: 420,
      },
      yAxis: {
        show: false,
        min: 50,
        max: 350,
      },
      series: [
        {
          type: 'graph',
          layout: 'none',
          data: nodes,
          links,
          categories,
          roam: false,
          draggable: false,
          label: {
            show: false,
          },
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              width: 2,
              opacity: 0.6,
            },
          },
        },
      ],
    });

    return () => chart.dispose();
  }, []);

  return (
    <div className="card p-4">
      <h4 className="font-semibold text-slate-700 mb-2">神经网络结构可视化</h4>
      <p className="text-sm text-slate-500 mb-4">
        多层感知机 (MLP) 结构：输入层(蓝) → 隐藏层(紫) → 输出层(粉)。
        每条线代表一个权重参数，神经网络训练就是找到使损失最小的权重组合。
      </p>
      <div ref={chartRef} style={{ width: '100%', height: 380 }} />
    </div>
  );
}
