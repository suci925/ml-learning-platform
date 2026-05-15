import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

// 3D gradient descent visualization - Chapter 2
export default function GradientDescentViz() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    // Generate loss surface: z = 2*(x-3)^2 + (y+2)^2 + 5
    const xData: number[] = [];
    const yData: number[] = [];
    const zData: [number, number, number][] = [];

    for (let x = -8; x <= 8; x += 0.5) {
      xData.push(x);
    }
    for (let y = -8; y <= 8; y += 0.5) {
      yData.push(y);
    }
    for (const x of xData) {
      for (const y of yData) {
        const z = 2 * (x - 3) ** 2 + (y + 2) ** 2 + 5;
        zData.push([x, y, z]);
      }
    }

    // Simulate gradient descent path
    const path: [number, number, number][] = [];
    let cx = -5, cy = 5;
    for (let i = 0; i < 20; i++) {
      const gx = 4 * (cx - 3);
      const gy = 2 * (cy + 2);
      const z = 2 * (cx - 3) ** 2 + (cy + 2) ** 2 + 5;
      path.push([cx, cy, z]);
      cx -= 0.08 * gx;
      cy -= 0.08 * gy;
    }

    chart.setOption({
      tooltip: {},
      backgroundColor: 'transparent',
      grid3D: {
        viewControl: {
          projection: 'perspective',
          autoRotate: false,
          distance: 160,
          alpha: 25,
          beta: 45,
        },
      },
      xAxis3D: {
        name: '参数A',
        type: 'value',
        min: -8,
        max: 8,
      },
      yAxis3D: {
        name: '参数B',
        type: 'value',
        min: -8,
        max: 8,
      },
      zAxis3D: {
        name: 'Loss',
        type: 'value',
        min: 0,
      },
      series: [
        {
          type: 'surface',
          data: zData,
          wireframe: {
            show: true,
          },
          shading: 'color',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#ff6b6b' },
              { offset: 0.5, color: '#feca57' },
              { offset: 1, color: '#48dbfb' },
            ]),
          },
          opacity: 0.7,
        },
        {
          type: 'line3D',
          data: path,
          lineStyle: {
            color: '#2563eb',
            width: 3,
          },
          symbol: 'circle',
          symbolSize: 5,
          itemStyle: {
            color: '#1e40af',
          },
        },
      ],
    });

    return () => chart.dispose();
  }, []);

  return (
    <div className="card p-4">
      <h4 className="font-semibold text-slate-700 mb-2">梯度下降 3D 可视化</h4>
      <p className="text-sm text-slate-500 mb-4">
        曲面表示损失函数，蓝色轨迹表示参数在梯度下降过程中的更新路径。观察参数如何沿"最陡下降方向"逐步到达最小值。
      </p>
      <div ref={chartRef} style={{ width: '100%', height: 420 }} />
    </div>
  );
}
