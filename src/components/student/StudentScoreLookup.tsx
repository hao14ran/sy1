/**
 * @file StudentScoreLookup.tsx
 * @description Responsive page for looking up a student's detailed scores by name.
 *              Displays per-question score, correctness, and total score summary.
 */

import type { ChangeEvent, FormEvent, ReactElement } from 'react'
import { useState } from 'react'
import {
  MAX_TOTAL_SCORE,
  QUESTION_SCORE_CONFIG,
  STUDENT_RECORDS,
  TOTAL_QUESTIONS,
} from '../../data/studentScores'
import type { StudentRecord } from '../../types/student'

/**
 * @description Computed score information for a single question.
 */
interface ComputedQuestionScore {
  /** 1-based question index. */
  index: number
  /** Maximum score this question can award. */
  maxScore: number
  /** Score actually earned by the student. */
  earnedScore: number
  /** Whether the student's answer is correct. */
  isCorrect: boolean
}

/**
 * @description Aggregate score summary for a student.
 */
interface StudentScoreSummary {
  /** Sum of all earned scores. */
  totalScore: number
  /** Maximum possible total score. */
  maxScore: number
  /** Rounded percentage score (0-100). */
  percentage: number
  /** Per-question detailed scores. */
  questions: ComputedQuestionScore[]
}

/**
 * @description Compute per-question and total scores for a given student.
 */
function computeScoreForStudent(student: StudentRecord): StudentScoreSummary {
  const questions: ComputedQuestionScore[] = QUESTION_SCORE_CONFIG.map((meta, index) => {
    const isCorrect = Boolean(student.correctness[index])
    const earnedScore = isCorrect ? meta.maxScore : 0

    return {
      index: meta.index,
      maxScore: meta.maxScore,
      earnedScore,
      isCorrect,
    }
  })

  const totalScore = questions.reduce((sum, q) => sum + q.earnedScore, 0)
  const percentage =
    MAX_TOTAL_SCORE === 0 ? 0 : Math.round((totalScore / MAX_TOTAL_SCORE) * 100)

  return {
    totalScore,
    maxScore: MAX_TOTAL_SCORE,
    percentage,
    questions,
  }
}

/**
 * @description Student score lookup page. Allows searching by student name and shows a
 *              30-question score breakdown with per-question and total scores.
 */
export default function StudentScoreLookup(): ReactElement {
  const [queryName, setQueryName] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  /**
   * @description Handle name input changes.
   */
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQueryName(event.target.value)
  }

  /**
   * @description Handle form submission to search for a student by name.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const keyword = queryName.trim()

    if (!keyword) {
      setSelectedStudent(null)
      setHasSearched(true)
      return
    }

    const found = STUDENT_RECORDS.find((student) => student.name === keyword) ?? null
    setSelectedStudent(found)
    setHasSearched(true)
  }

  const scoreSummary: StudentScoreSummary | null = selectedStudent
    ? computeScoreForStudent(selectedStudent)
    : null

  const sampleNames = STUDENT_RECORDS.map((s) => s.name).join(' / ')

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-4">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            学生成绩查询
          </h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            输入学生姓名后，可查询该生 30 道试题的题值、得分情况以及总分统计。
          </p>
        </header>

        <section className="rounded-2xl bg-white/95 p-4 shadow-lg ring-1 ring-sky-100 sm:p-5">
          <form
            className="flex flex-col gap-3 sm:flex-row sm:items-end"
            onSubmit={handleSubmit}
          >
            <div className="flex-1">
              <label
                htmlFor="student-name"
                className="block text-xs font-medium text-slate-700 sm:text-sm"
              >
                学生姓名
              </label>
              <input
                id="student-name"
                type="text"
                value={queryName}
                onChange={handleChange}
                placeholder="例如：张伟"
                className="mt-1 w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-300 sm:text-base"
              />
              <p className="mt-1 text-xs text-slate-500">
                当前示例数据仅支持以下姓名：{sampleNames}。
              </p>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 sm:px-6 sm:text-base"
            >
              查询成绩
            </button>
          </form>
        </section>

        {hasSearched && !selectedStudent && (
          <section className="mt-4 rounded-2xl bg-white/95 p-4 text-sm text-slate-700 shadow-sm ring-1 ring-amber-100 sm:p-5">
            <p>未找到该学生，请确认姓名输入是否正确。</p>
          </section>
        )}

        {selectedStudent && scoreSummary && (
          <section className="mt-6 space-y-4">
            <div className="rounded-2xl bg-white/95 p-4 shadow-lg ring-1 ring-emerald-100 sm:p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                    {selectedStudent.name} 的成绩
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    共 {TOTAL_QUESTIONS} 题，前 20 题每题 3 分，后 10 题每题 4 分，满分{' '}
                    {scoreSummary.maxScore} 分。
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-emerald-700 sm:text-base">
                    总分：{scoreSummary.totalScore} / {scoreSummary.maxScore}
                  </div>
                  <div className="text-xs text-slate-500 sm:text-sm">
                    正确率：{scoreSummary.percentage}%
                  </div>
                </div>
              </div>

              <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-500 via-emerald-500 to-emerald-600 transition-[width]"
                  style={{ width: `${scoreSummary.percentage}%` }}
                />
              </div>
            </div>

            <div className="mb-4 rounded-2xl bg-white/95 p-4 shadow-sm ring-1 ring-slate-100 sm:p-5">
              <header className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                  题目得分明细
                </h3>
                <span className="text-xs text-slate-500 sm:text-sm">
                  每道题显示题值与该生得分
                </span>
              </header>

              <div className="hidden border-b border-slate-100 pb-2 text-xs font-medium text-slate-500 sm:grid sm:grid-cols-4 sm:gap-2 sm:text-sm">
                <span>题号</span>
                <span>题值（分）</span>
                <span>该生得分</span>
                <span>答题结果</span>
              </div>

              <div className="divide-y divide-slate-100">
                {scoreSummary.questions.map((q) => (
                  <div
                    key={q.index}
                    className="grid grid-cols-3 gap-2 py-2 text-xs text-slate-700 sm:grid-cols-4 sm:text-sm"
                  >
                    <div className="font-medium">第 {q.index} 题</div>
                    <div>题值：{q.maxScore}</div>
                    <div>
                      得分：{' '}
                      <span
                        className={
                          q.earnedScore > 0
                            ? 'font-semibold text-emerald-700'
                            : 'font-semibold text-rose-600'
                        }
                      >
                        {q.earnedScore}
                      </span>
                    </div>
                    <div className="col-span-3 sm:col-span-1">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium sm:text-xs ${
                          q.isCorrect
                            ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                            : 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'
                        }`}
                      >
                        {q.isCorrect ? '答对' : '答错'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
