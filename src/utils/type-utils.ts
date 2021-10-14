import type { Segment, QuestionSegmentType } from '../overmind/types'

export function isQuestionSegment(
  segment: Segment
): segment is QuestionSegmentType {
  return segment.type === 'QUESTIONS'
}
