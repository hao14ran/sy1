/**
 * @file ResultView.tsx
 * @description Result view that displays score summary, student name, and per-question correctness with standard answers.
 */

import type { ReactElement } from 'react'
import type { ExamResult } from '../../types/exam'

interface ResultViewProps {
  /** Computed exam result object. */
  result: ExamResult
  /** Callback to restart the exam immediately. */
  onRestart: () => void
  /** Callback to navigate back to the home view. */
  onGoHome: () => void
}

/**
 * @description Displays exam score, visual progress, and detailed answer breakdown.
 */
export default function ResultView({
  result,
  onRestart,
  onGoHome,
}: ResultViewProps): ReactElement {
  const { totalQuestions, correctCount, percentage, questionResults, studentName } = result

  return (
    <main className="flex flex-1 flex-col gap-4">
      <section className="rounded-2xl bg-white/95 p-5 shadow-lg ring-1 ring-emerald-100 sm:p-6">
        <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              成绩与解析
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              考生姓名：{' '}
              <span className="font-semibold text-slate-900">
                {studentName ?? '未填写'}
              </span>
            </p>
            <p className="mt-1 text-sm text-slate-600">
              共 {totalQuestions} 题，你答对{' '}
              <span className="font-semibold text-emerald-600">{correctCount}</span> 题。
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onGoHome}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 sm:text-sm"
            >
              返回首页
            </button>
            <button
              type="button"
              onClick={onRestart}
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-emerald-200 transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 sm:text-sm"
            >
              再考一次
            </button>
          </div>
        </header>

        <div className="space-y-2">
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-medium text-slate-700">得分</span>
            <span className="text-sm font-semibold text-emerald-700">
              {percentage} 分
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-500 via-emerald-500 to-emerald-600 transition-[width]"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 sm:text-sm">
            提示：绿色代表得分比例，你可以在下方查看每道题的详细对错和标准答案。
          </p>
        </div>
      </section>

      <section className="mb-4 space-y-4">
        {questionResults.map((qr, index) => {
          const { question, selectedOptionIds, isCorrect } = qr
          const correctIds = new Set(question.correctOptionIds)
          const selectedIds = new Set(selectedOptionIds)
          const isMultiple = question.type === 'multiple'
          const correctLabel = question.correctOptionIds.join('，')
          const selectedLabel =
            selectedOptionIds.length > 0 ? selectedOptionIds.join('，') : '未作答'

          return (
            <article
              key={question.id}
              className="rounded-xl bg-white/95 p-4 shadow-sm ring-1 ring-slate-100 sm:p-5"
            >
              <header className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                    第 {index + 1} 题 ·{' '}
                    <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-700 ring-1 ring-slate-100">
                      {isMultiple ? '多选题' : '单选题'}
                    </span>
                  </h3>
                  <p className="mt-1 text-sm text-slate-800 sm:text-base">
                    {question.title}
                  </p>
                </div>
                <span
                  className={`inline-flex h-7 items-center justify-center rounded-full px-3 text-xs font-semibold ${
                    isCorrect
                      ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                      : 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'
                  }`}
                >
                  {isCorrect ? '回答正确' : '回答错误'}
                </span>
              </header>

              <div className="mb-2 text-xs text-slate-600 sm:text-sm">
                <div>
                  正确答案：<span className="font-semibold text-emerald-700">{correctLabel}</span>
                </div>
                <div>
                  你的答案：{' '}
                  <span
                    className={`font-semibold ${
                      selectedOptionIds.length === 0
                        ? 'text-slate-500'
                        : isCorrect
                        ? 'text-emerald-700'
                        : 'text-rose-700'
                    }`}
                  >
                    {selectedLabel}
                  </span>
                </div>
              </div>

              <div className="mt-2 space-y-2">
                {question.options.map((option) => {
                  const optionIsCorrect = correctIds.has(option.id)
                  const optionIsSelected = selectedIds.has(option.id)

                  let borderClass = 'border-slate-200'
                  let bgClass = 'bg-white'

                  if (optionIsCorrect && optionIsSelected) {
                    borderClass = 'border-emerald-500'
                    bgClass = 'bg-emerald-50'
                  } else if (optionIsCorrect) {
                    borderClass = 'border-emerald-400'
                    bgClass = 'bg-emerald-50/70'
                  } else if (optionIsSelected) {
                    borderClass = 'border-rose-400'
                    bgClass = 'bg-rose-50'
                  }

                  return (
                    <div
                      key={option.id}
                      className={`flex items-start justify-between gap-3 rounded-lg border px-3 py-2 text-sm ${borderClass} ${bgClass}`}
                    >
                      <div className="flex flex-1 items-start gap-2">
                        <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-700">
                          {option.id}
                        </span>
                        <span className="text-slate-800">{option.text}</span>
                      </div>
                      <div className="flex flex-col items-end gap-1 text-[11px] text-slate-600">
                        {optionIsCorrect && (
                          <span className="inline-flex rounded-full bg-emerald-100 px-2 py-0.5 font-medium text-emerald-700">
                            标准答案
                          </span>
                        )}
                        {optionIsSelected && !optionIsCorrect && (
                          <span className="inline-flex rounded-full bg-rose-100 px-2 py-0.5 font-medium text-rose-700">
                            你的选择
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </article>
          )
        })}
      </section>
    </main>
  )
}
