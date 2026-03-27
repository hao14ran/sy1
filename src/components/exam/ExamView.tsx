/**
 * @file ExamView.tsx
 * @description Main exam view that renders all questions, accepts answers, collects student name, and exposes a submit action.
 */

import type { ReactElement } from 'react'
import type { Question, UserAnswers } from '../../types/exam'

interface ExamViewProps {
  /** All questions included in the current exam. */
  questions: Question[]
  /** Map of question id to selected option ids. */
  userAnswers: UserAnswers
  /** Current student name typed in the header input. */
  studentName: string
  /** Callback when the student name input changes. */
  onStudentNameChange: (name: string) => void
  /** Callback when user updates selected options for a question. */
  onAnswerChange: (questionId: number, optionIds: string[]) => void
  /** Callback when user submits the exam. */
  onSubmit: () => void
  /** Whether the exam is currently being submitted and scored. */
  isSubmitting: boolean
}

/**
 * @description Exam view component that shows a name input, question cards, and a sticky submit footer.
 */
export default function ExamView({
  questions,
  userAnswers,
  studentName,
  onStudentNameChange,
  onAnswerChange,
  onSubmit,
  isSubmitting,
}: ExamViewProps): ReactElement {
  const totalQuestions = questions.length
  const answeredCount = questions.filter((q) => (userAnswers[q.id] ?? []).length > 0).length
  const unansweredCount = totalQuestions - answeredCount

  /**
   * @description Update answer for a single-choice question.
   */
  const handleSingleChange = (questionId: number, optionId: string): void => {
    onAnswerChange(questionId, [optionId])
  }

  /**
   * @description Toggle answer for a multiple-choice question.
   */
  const handleMultipleChange = (questionId: number, optionId: string): void => {
    const previous = userAnswers[questionId] ?? []
    const exists = previous.includes(optionId)
    const next = exists ? previous.filter((id) => id !== optionId) : [...previous, optionId]
    onAnswerChange(questionId, next)
  }

  const nameIsEmpty = studentName.trim().length === 0

  return (
    <main className="flex flex-1 flex-col gap-4">
      <header className="sticky top-0 z-10 -mx-4 -mt-2 bg-gradient-to-b from-sky-50/90 via-sky-50/95 to-transparent px-4 pt-2 pb-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                正在答题
              </h2>
              <p className="text-xs text-slate-600 sm:text-sm">
                共 {totalQuestions} 题 · 已答{' '}
                <span className="font-medium text-emerald-600">{answeredCount}</span> 题
              </p>
            </div>
            <div className="hidden text-xs text-slate-500 sm:block">
              请输入姓名并完成作答后，一次性提交整份试卷。
            </div>
          </div>

          <div className="rounded-xl bg-white/90 px-3 py-2 shadow-sm ring-1 ring-sky-100 sm:flex sm:items-center sm:justify-between sm:px-4 sm:py-2.5">
            <label
              htmlFor="student-name-exam"
              className="block text-xs font-medium text-slate-700 sm:text-sm"
            >
              姓名
            </label>
            <div className="mt-1 flex items-center gap-2 sm:mt-0 sm:flex-1 sm:justify-end">
              <input
                id="student-name-exam"
                type="text"
                value={studentName}
                onChange={(event) => onStudentNameChange(event.target.value)}
                placeholder="请在此输入姓名（用于成绩记录）"
                className="w-full rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-300 sm:max-w-xs sm:text-sm"
              />
              <span className="hidden text-[11px] text-slate-500 sm:inline">
                未填写姓名将无法提交
              </span>
            </div>
          </div>
        </div>
      </header>

      <section className="flex-1 space-y-4">
        {questions.map((question, index) => {
          const selected = userAnswers[question.id] ?? []
          const isMultiple = question.type === 'multiple'

          return (
            <article
              key={question.id}
              className="rounded-xl bg-white/95 p-4 shadow-sm ring-1 ring-slate-100 sm:p-5"
            >
              <header className="mb-3">
                <div className="mb-1 flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                    第 {index + 1} 题 ·{' '}
                    <span className="inline-flex items-center rounded-full bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-700 ring-1 ring-sky-100">
                      {isMultiple ? '多选题' : '单选题'}
                    </span>
                  </h3>
                  <span className="text-xs text-slate-500">
                    {selected.length > 0 ? '已作答' : '未作答'}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-800 sm:text-base">
                  {question.title}
                </p>
                {question.description && (
                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    {question.description}
                  </p>
                )}
              </header>

              <div className="space-y-2.5">
                {question.options.map((option) => {
                  const inputId = `q${question.id}-${option.id}`
                  const checked = isMultiple
                    ? selected.includes(option.id)
                    : selected[0] === option.id

                  return (
                    <label
                      key={option.id}
                      htmlFor={inputId}
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2 text-sm transition hover:border-sky-400 hover:bg-sky-50/70 ${
                        checked
                          ? 'border-sky-500 bg-sky-50'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <input
                        id={inputId}
                        type={isMultiple ? 'checkbox' : 'radio'}
                        name={isMultiple ? inputId : `q-${question.id}`}
                        className="mt-1 h-4 w-4 cursor-pointer accent-sky-600"
                        checked={checked}
                        onChange={() =>
                          isMultiple
                            ? handleMultipleChange(question.id, option.id)
                            : handleSingleChange(question.id, option.id)
                        }
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-700">
                            {option.id}
                          </span>
                          <span className="text-slate-800">{option.text}</span>
                        </div>
                      </div>
                    </label>
                  )
                })}
              </div>
            </article>
          )
        })}
      </section>

      <footer className="sticky bottom-0 -mx-4 mt-4 bg-gradient-to-t from-white via-white/95 to-white/70 px-4 pb-3 pt-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-1 text-xs text-slate-600 sm:text-sm">
            <div>
              已答{' '}
              <span className="font-semibold text-emerald-600">{answeredCount}</span> /{' '}
              {totalQuestions} 题，
              {unansweredCount > 0 && (
                <span>
                  还有{' '}
                  <span className="font-semibold text-rose-600">
                    {unansweredCount}
                  </span>{' '}
                  题未作答。
                </span>
              )}
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-emerald-500 transition-[width]"
                style={{
                  width:
                    totalQuestions === 0
                      ? '0%'
                      : `${Math.round((answeredCount / totalQuestions) * 100)}%`,
                }}
              />
            </div>
            {nameIsEmpty && (
              <div className="text-[11px] text-rose-600 sm:text-xs">
                提示：请先在页面顶部输入姓名，提交按钮才会生效。
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting || nameIsEmpty}
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-emerald-400"
          >
            {isSubmitting ? '正在提交与判分…' : '提交试卷'}
          </button>
        </div>
      </footer>
    </main>
  )
}
