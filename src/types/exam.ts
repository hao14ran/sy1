/**
 * @file exam.ts
 * @description Shared TypeScript types for the exam application, including questions, options, and result models.
 */

export type QuestionType = 'single' | 'multiple'

/**
 * @description Represents a single answer option for a question.
 */
export interface Option {
  /** Unique option identifier, e.g., "A", "B". */
  id: string
  /** Text content displayed for the option. */
  text: string
}

/**
 * @description Represents a single exam question with its metadata and correct answers.
 */
export interface Question {
  /** Unique numeric id, stable across renders. */
  id: number
  /** Main title or stem of the question. */
  title: string
  /** Optional background or explanation text. */
  description?: string
  /** Question type: single-choice or multiple-choice. */
  type: QuestionType
  /** List of available options to choose from. */
  options: Option[]
  /** One or more correct option ids. */
  correctOptionIds: string[]
}

/**
 * @description User answer map: question id → selected option ids.
 */
export type UserAnswers = Record<number, string[]>

/**
 * @description Per-question result used in the result view.
 */
export interface QuestionResult {
  /** Reference to the original question. */
  question: Question
  /** Option ids that the user selected for this question. */
  selectedOptionIds: string[]
  /** Whether the user's answer is fully correct. */
  isCorrect: boolean
}

/**
 * @description Aggregated exam result including score summary and per-question details.
 */
export interface ExamResult {
  /** Total number of questions in the exam. */
  totalQuestions: number
  /** Count of correctly answered questions. */
  correctCount: number
  /** Score percentage (0-100). */
  percentage: number
  /** Detailed results for each question. */
  questionResults: QuestionResult[]
  /** Optional student name associated with this exam submission. */
  studentName?: string
}
