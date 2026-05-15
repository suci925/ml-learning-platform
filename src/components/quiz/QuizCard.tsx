import { useState } from 'react';
import { quizData } from '../../data/quizData';
import { useProgressStore } from '../../store/progressStore';

export default function QuizCard({ chapterId }: { chapterId: number }) {
  const questions = quizData[chapterId];
  const markQuizPassed = useProgressStore((s) => s.markQuizPassed);
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  if (!questions) {
    return (
      <div className="text-center py-4">
        <p className="text-slate-400 text-sm">本章测验即将上线，敬请期待。</p>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="text-center">
        <h4 className="font-semibold text-slate-700 mb-2">章节测验</h4>
        <p className="text-sm text-slate-500 mb-4">
          共 {questions.length} 道选择题，检验你对本章内容的理解
        </p>
        <button onClick={() => setStarted(true)} className="btn-primary">
          开始测验
        </button>
      </div>
    );
  }

  if (showResult) {
    const score = answers.reduce((acc, ans, i) => acc + (ans === questions[i].correct ? 1 : 0), 0);
    const passed = score >= Math.ceil(questions.length * 0.6);

    if (passed) {
      markQuizPassed(chapterId, score);
    }

    return (
      <div className="text-center">
        <div className="text-5xl mb-4">{passed ? '🎉' : '📚'}</div>
        <h4 className="text-xl font-bold text-slate-800 mb-2">
          {passed ? '恭喜通过！' : '继续加油！'}
        </h4>
        <p className="text-slate-500 mb-2">
          得分: {score}/{questions.length} ({Math.round((score / questions.length) * 100)}%)
        </p>
        <p className="text-sm text-slate-400 mb-6">
          {passed ? '你已经掌握了本章的核心概念' : '建议回顾本章内容后再试一次'}
        </p>

        <div className="space-y-3 mb-6 text-left">
          {questions.map((q, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg text-sm ${
                answers[i] === q.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}
            >
              <p className="font-medium text-slate-700">
                {i + 1}. {q.question}
              </p>
              <p className="text-slate-500 mt-1">
                你的答案: {q.options[answers[i]]}
                {answers[i] !== q.correct && (
                  <span className="text-red-500 ml-1">✗ (正确: {q.options[q.correct]})</span>
                )}
                {answers[i] === q.correct && <span className="text-green-500 ml-1">✓</span>}
              </p>
              <p className="text-slate-400 mt-0.5 text-xs">{q.explanation}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => { setStarted(false); setShowResult(false); setAnswers([]); setCurrentQ(0); }}
          className="btn-secondary"
        >
          重新测验
        </button>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-slate-700">章节测验</h4>
        <span className="text-sm text-slate-400">
          {currentQ + 1} / {questions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-slate-200 rounded-full mb-6">
        <div
          className="h-full bg-blue-600 rounded-full transition-all"
          style={{ width: `${((currentQ) / questions.length) * 100}%` }}
        />
      </div>

      <h5 className="text-lg font-medium text-slate-800 mb-4">
        {currentQ + 1}. {q.question}
      </h5>

      <div className="space-y-2 mb-6">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => {
              const newAnswers = [...answers, i];
              setAnswers(newAnswers);
              if (currentQ < questions.length - 1) {
                setCurrentQ(currentQ + 1);
              } else {
                setShowResult(true);
              }
            }}
            className="w-full text-left px-4 py-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-slate-700"
          >
            <span className="font-mono text-sm text-slate-400 mr-2">
              {String.fromCharCode(65 + i)}.
            </span>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
