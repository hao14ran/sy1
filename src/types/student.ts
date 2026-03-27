/**
 * @file student.ts
 * @description Type definitions for static student exam score records used in the score lookup page.
 */

export interface StudentRecord {
  /** Stable string identifier for the student record. */
  id: string
  /** Display name used for searching and rendering. */
  name: string
  /** Per-question correctness flags for a 30-question exam; true = correct, false = incorrect. */
  correctness: boolean[]
}

/**
 * @description Metadata for per-question score configuration.
 */
export interface QuestionScoreMeta {
  /** 1-based index of the question. */
  index: number
  /** Maximum score achievable for this question. */
  maxScore: number
}
