import { useParams, Link } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import { chapters } from '../data/chapters';
import { chapterContents } from '../data/chapterContents';
import { useProgressStore } from '../store/progressStore';
import ChapterContent from '../components/chapters/ChapterContent';
import ChapterNav from '../components/chapters/ChapterNav';
import PyodideEditor from '../components/code/PyodideEditor';
import QuizCard from '../components/quiz/QuizCard';

const GradientDescentViz = lazy(() => import('../components/visualizations/GradientDescentViz'));
const RegressionPlot = lazy(() => import('../components/visualizations/RegressionPlot'));
const DecisionBoundary = lazy(() => import('../components/visualizations/DecisionBoundary'));
const ClusteringViz = lazy(() => import('../components/visualizations/ClusteringViz'));
const NeuralNetworkViz = lazy(() => import('../components/visualizations/NeuralNetworkViz'));
const AttentionHeatmap = lazy(() => import('../components/visualizations/AttentionHeatmap'));

function VisualizationForChapter({ chapterId }: { chapterId: number }) {
  const VizFallback = () => (
    <div className="min-h-[300px] flex items-center justify-center bg-white rounded-lg border border-slate-200">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2" />
        <p className="text-slate-400 text-sm">可视化加载中...</p>
      </div>
    </div>
  );

  const vizMap: Record<number, React.ComponentType> = {
    2: GradientDescentViz,
    4: RegressionPlot,
    5: DecisionBoundary,
    6: ClusteringViz,
    8: NeuralNetworkViz,
    10: AttentionHeatmap,
  };

  const Viz = vizMap[chapterId];
  if (!Viz) return null;
  return (
    <Suspense fallback={<VizFallback />}>
      <Viz />
    </Suspense>
  );
}

export default function ChapterPage() {
  const { chapterId } = useParams<{ chapterId: string }>();
  const id = parseInt(chapterId || '1');
  const chapter = chapters.find((c) => c.id === id);
  const markChapterRead = useProgressStore((s) => s.markChapterRead);
  useEffect(() => {
    if (chapter) {
      markChapterRead(id);
    }
  }, [id]);

  if (!chapter) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-700 mb-4">章节未找到</h2>
        <Link to="/" className="btn-primary">返回首页</Link>
      </div>
    );
  }

  const content = chapterContents[id];
  const prevChapter = chapters.find((c) => c.id === id - 1);
  const nextChapter = chapters.find((c) => c.id === id + 1);

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Chapter header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
          <Link to="/" className="hover:text-blue-600">首页</Link>
          <span>/</span>
          <span>第{id}章</span>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{chapter.icon}</span>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{chapter.title}</h1>
            <p className="text-slate-500">{chapter.subtitle}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {chapter.topics.map((t) => (
            <span key={t} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Chapter content */}
      <ChapterContent content={content} chapterId={id} />

      {/* Interactive visualization */}
      {chapter.hasVisualization && (
        <div className="my-6">
          <VisualizationForChapter chapterId={id} />
        </div>
      )}

      {/* Code playground */}
      {chapter.hasCode && (
        <div className="my-6">
          <h4 className="font-semibold text-slate-700 mb-3">动手实践</h4>
          <PyodideEditor chapterId={id} />
        </div>
      )}

      {/* Quiz section */}
      <div className="card p-6 my-6">
        <QuizCard chapterId={id} />
      </div>

      {/* Chapter navigation */}
      <ChapterNav prev={prevChapter} next={nextChapter} />
    </div>
  );
}
