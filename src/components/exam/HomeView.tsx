/**  
 * @file HomeView.tsx  
 * @description Introductory view that explains the exam and offers a start button.  
 */

import type { ReactElement } from 'react'

interface HomeViewProps {
  /** Total number of questions in the exam. */
  totalQuestions: number
  /** Callback when the user clicks the start button. */
  onStart: () => void
}

/**  
 * @description Displays exam instructions and a call-to-action button to start the exam.  
 */
export default function HomeView({ totalQuestions, onStart }: HomeViewProps): ReactElement {
  return (
    <main className="flex flex-1 items-center justify-center">
      <section className="w-full rounded-2xl bg-white/90 p-6 shadow-lg ring-1 ring-sky-100 sm:p-8">
        <header className="mb-6 border-b border-slate-100 pb-4">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            非遗文化融合 C++ 编程挑战
          </h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            本测试围绕中国非物质文化遗产场景，考察你对 C++ 基础语法的掌握情况。
          </p>
        </header>

        <div className="space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
          <p>
            · 共 <span className="font-semibold text-sky-700">{totalQuestions}</span> 题，包含
            单选题与多选题。
          </p>
          <p>· 每题 1 分，答题过程中可以随时修改自己的选择。</p>
          <p>· 交卷后系统会自动判分，并展示每题对错与标准答案。</p>
          <p>· 本考试页面支持电脑与手机访问，提交时会有进度反馈，请耐心等待。</p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-slate-500 sm:text-sm">
            温馨提示：多选题需全部选对且不多选，才能获得该题分数。
          </div>
          <button
            type="button"
            onClick={onStart}
            className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-sky-200 transition hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
          >
            开始考试
          </button>
        </div>
      </section>
    </main>
  )
}