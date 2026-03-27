/**
 * @file studentScores.ts
 * @description Static exam scoring configuration and demo student score data for the score lookup page.
 */

import type { QuestionScoreMeta, StudentRecord } from '../types/student'

/** Total number of questions in the exam. */
export const TOTAL_QUESTIONS = 30

/**
 * @description Per-question score configuration: first 20 questions 3 points each, last 10 questions 4 points each.
 */
export const QUESTION_SCORE_CONFIG: QuestionScoreMeta[] = Array.from(
  { length: TOTAL_QUESTIONS },
  (_value, index) => ({
    index: index + 1,
    maxScore: index < 20 ? 3 : 4,
  }),
)

/** @description Maximum total score for the exam (should be 100). */
export const MAX_TOTAL_SCORE = QUESTION_SCORE_CONFIG.reduce(
  (sum, q) => sum + q.maxScore,
  0,
)

/**
 * @description Demo student score records used for local lookup by name.
 * The correctness array contains 30 boolean values: true = correct, false = incorrect.
 */
export const STUDENT_RECORDS: StudentRecord[] = [
  {
    id: 'zhang-wei',
    name: '张伟',
    correctness: [
      true,
      true,
      true,
      true,
      false,
      true,
      true,
      false,
      true,
      true,
      false,
      true,
      true,
      true,
      false,
      true,
      false,
      true,
      true,
      true,
      true,
      false,
      true,
      false,
      true,
      true,
      true,
      false,
      true,
      false,
    ],
  },
  {
    id: 'li-na',
    name: '李娜',
    correctness: [
      true,
      true,
      false,
      false,
      true,
      true,
      false,
      true,
      true,
      false,
      true,
      true,
      false,
      true,
      true,
      false,
      true,
      true,
      false,
      true,
      false,
      false,
      true,
      true,
      true,
      false,
      true,
      true,
      false,
      true,
    ],
  },
  {
    id: 'wang-qiang',
    name: '王强',
    correctness: [
      false,
      true,
      false,
      true,
      false,
      true,
      true,
      true,
      false,
      true,
      false,
      false,
      true,
      true,
      true,
      true,
      false,
      true,
      true,
      false,
      true,
      true,
      false,
      true,
      false,
      false,
      true,
      false,
      true,
      true,
    ],
  },
]
