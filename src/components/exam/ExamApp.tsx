/**
 * @file ExamApp.tsx
 * @description Top-level container for the exam experience: handles view switching, state, scoring, and submission.
 */

import type { ReactElement } from 'react'
import { useState } from 'react'
import { examQuestions } from '../../data/examQuestions'
import type { ExamResult, Question, QuestionResult, UserAnswers } from '../../types/exam'
import HomeView from './HomeView'
import ExamView from './ExamView'
import ResultView from './ResultView'

type View = 'home' | 'exam' | 'results'

/**
 * @description Check whether the selected options fully match the correct options.
 */
function isAnswerCorrect(question: Question, selected: string[] | undefined): boolean {
  if (!selected || selected.length === 0) return false
  const sortedSelected = [...selected].sort()
  const sortedCorrect = [...question.correctOptionIds].sort()
  if (sortedSelected.length !== sortedCorrect.length) return false
  return sortedSelected.every((id, index) => id === sortedCorrect[index])
}

/**
 * @description Main exam application component. Manages routing-like view state, student name, scoring, and submission persistence.
 */
export default function ExamApp(): ReactElement {
  const [view, setView] = useState<View>('home')
  const [studentName, setStudentName] = useState('')
  const [answers, setAnswers] = useState<UserAnswers>({})
  const [result, setResult] = useState<ExamResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  /**
   * @description Start a new exam and reset answer/result state.
   */
  const handleStartExam = (): void => {
    setAnswers({})
    setResult(null)
    setView('exam')
  }

  /**
   * @description Update the selected option ids for a given question.
   */
  const handleAnswerChange = (questionId: number, optionIds: string[]): void => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIds,
    }))
  }

  /**
   * @description Update student name from the top input field.
   */
  const handleStudentNameChange = (name: string): void => {
    setStudentName(name)
  }

  /**
   * @description Compute the exam result based on current answers and attach student name.
   */
  const computeResult = (): ExamResult => {
    const questionResults: QuestionResult[] = examQuestions.map((question) => {
      const selected = answers[question.id] ?? []
      const correct = isAnswerCorrect(question, selected)
      return {
        question,
        selectedOptionIds: selected,
        isCorrect: correct,
      }
    })

    const totalQuestions = examQuestions.length
    const correctCount = questionResults.filter((qr) => qr.isCorrect).length
    const percentage = totalQuestions === 0 ? 0 : Math.round((correctCount / totalQuestions) * 100)

    const trimmedName = studentName.trim()

    return {
      totalQuestions,
      correctCount,
      percentage,
      questionResults,
      studentName: trimmedName || undefined,
    }
  }

  /**
   * @description Submit the exam, validate student name, show a short feedback delay, then display results.
   *              Also persists basic submission data to localStorage for potential later lookup.
   */
  const handleSubmitExam = (): void => {
    if (isSubmitting) return

    const trimmedName = studentName.trim()
    if (!trimmedName) {
      // Simple inline validation for required name.
      window.alert('请先在页面顶部输入姓名，再提交试卷。')
      return
    }

    setIsSubmitting(true)

    // Simulate scoring delay to provide user feedback.
    window.setTimeout(() => {
      const newResult = computeResult()
      setResult(newResult)
      setIsSubmitting(false)
      setView('results')

      // Persist submission locally for potential later score lookup.
      try {
        if (typeof window !== 'undefined') {
          const storageKey = 'cppHeritageExamSubmissions'
          const raw = window.localStorage.getItem(storageKey)
          const list: Array<{
            name: string
            answers: UserAnswers
            submittedAt: string
            result: ExamResult
          }> = raw ? JSON.parse(raw) : []
          list.push({
            name: trimmedName,
            answers,
            submittedAt: new Date().toISOString(),
            result: newResult,
          })
          window.localStorage.setItem(storageKey, JSON.stringify(list))
        }
      } catch {
        // Ignore storage errors silently; they do not affect core exam flow.
      }
    }, 600)
  }

  /**
   * @description Return to home view without clearing the last result or name.
   */
  const handleGoHome = (): void => {
    setView('home')
  }

  /**
   * @description Retake the exam from scratch while keeping the student name.
   */
  const handleRestart = (): void => {
    setAnswers({})
    setResult(null)
    setView('exam')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        {view === 'home' && (
          <HomeView
            totalQuestions={examQuestions.length}
            onStart={handleStartExam}
          />
        )}

        {view === 'exam' && (
          <ExamView
            questions={examQuestions}
            userAnswers={answers}
            studentName={studentName}
            onStudentNameChange={handleStudentNameChange}
            onAnswerChange={handleAnswerChange}
            onSubmit={handleSubmitExam}
            isSubmitting={isSubmitting}
          />
        )}

        {view === 'results' && result && (
          <ResultView
            result={result}
            onRestart={handleRestart}
            onGoHome={handleGoHome}
          />
        )}
      </div>
    </div>
  )
}
