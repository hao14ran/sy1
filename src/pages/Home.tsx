/**
 * @file Home.tsx
 * @description Root page that lets users switch between the exam experience and the student score lookup page.
 */

import type { ReactElement } from 'react'
import { useState } from 'react'
import ExamApp from '../components/exam/ExamApp'
import StudentScoreLookup from '../components/student/StudentScoreLookup'

/**
 * @description Supported top-level views for the home page.
 */
type HomeView = 'exam' | 'scores'

/**
 * @description Home page component providing navigation between exam and score lookup views.
 */
export default function HomePage(): ReactElement {
  const [activeView, setActiveView] = useState<HomeView>('exam')

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="sticky top-0 z-20 border-b border-sky-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start">
            <div className="text-sm font-semibold text-sky-700 sm:text-base">
              非遗 C++ 编程练习与成绩系统
            </div>
            <div className="mt-0.5 rounded-full bg-sky-100 px-3 py-0.5 text-[11px] font-medium text-sky-700">
              田浩然制作
            </div>
          </div>
          <nav className="flex rounded-full bg-slate-100 p-1 text-xs sm:text-sm">
            <button
              type="button"
              onClick={() => setActiveView('exam')}
              className={`rounded-full px-3 py-1.5 font-medium transition ${
                activeView === 'exam'
                  ? 'bg-white text-sky-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              在线考试
            </button>
            <button
              type="button"
              onClick={() => setActiveView('scores')}
              className={`rounded-full px-3 py-1.5 font-medium transition ${
                activeView === 'scores'
                  ? 'bg-white text-sky-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              成绩查询
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {activeView === 'exam' ? <ExamApp /> : <StudentScoreLookup />}
      </main>
    </div>
  )
}
