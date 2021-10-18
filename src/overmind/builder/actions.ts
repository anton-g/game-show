import { nanoid } from 'nanoid'
import { Context } from '..'
import { isQuestionSegment } from '../../utils/type-utils'
import type {
  Question,
  QuestionSegmentType,
  Segment,
  SegmentQuestion,
} from '../types'

export const findSegment = (
  { state }: Context,
  id: Segment['id'] | Question['id']
) => {
  if (!state.selectedShow) throw Error('no show :(')

  const c = state.selectedShow.segments[id]
  if (c) {
    return c
  }

  return Object.values(state.selectedShow.segments).find(
    (seg) => seg.type === 'QUESTIONS' && seg.questions.hasOwnProperty(id)
  )
}

export const findQuestion = (
  { state }: Context,
  id: string
): { question: SegmentQuestion; segmentId: string } => {
  if (!state.selectedShow) throw Error('no show :(')

  for (let i = 0; i < state.selectedShowSegmentsList.length; i++) {
    const segment = state.selectedShowSegmentsList[i]

    if (!isQuestionSegment(segment)) continue

    if (segment.questions.hasOwnProperty(id)) {
      return {
        question: segment.questions[id],
        segmentId: segment.id,
      }
    }
  }

  throw Error(`wtf ${id}`)
}

export const addSegmentQuestion = (
  { state }: Context,
  {
    segmentId,
    questionId,
  }: {
    segmentId: string
    questionId: string
  }
) => {
  const segment = state.selectedShow?.segments[segmentId]
  if (!segment) return

  if (!isQuestionSegment(segment))
    throw Error('Trying to add question to invalid segment')

  const question = state.questions[questionId]
  if (!question) return

  const lastPosition = Object.values(segment.questions).reduce(
    (pos, question) => {
      if (question.position > pos) return question.position

      return pos
    },
    0
  )

  segment.questions = {
    ...segment.questions,
    [question.id]: {
      question,
      position: lastPosition + 1,
    },
  }
}

export const removeSegmentQuestion = (
  { state }: Context,
  {
    segmentId,
    questionId,
  }: {
    segmentId: string
    questionId: string
  }
) => {
  if (!state.selectedShow) throw Error('No show :(')

  const segment = state.selectedShow.segments[segmentId]

  if (!isQuestionSegment(segment))
    throw Error('Trying to remove question from invalid segment')

  const q = segment.questions[questionId]

  const newQuestions: SegmentQuestion[] = Object.values(segment.questions)
    .filter((x) => x.question.id !== questionId)
    .map((x) => {
      let mod = 0
      if (x.position > q.position) mod = 1

      return {
        ...x,
        position: x.position - mod,
      }
    })

  segment.questions = newQuestions.reduce(
    (a, sq) => ({ ...a, [sq.question.id]: sq }),
    {}
  )
}

export const moveOrReorderQuestion = (
  { actions }: Context,
  {
    id,
    toPosition,
    toSegmentId,
  }: {
    id: string
    toPosition: number
    toSegmentId: QuestionSegmentType['id']
  }
) => {
  const { question, segmentId } = actions.builder.findQuestion(id)

  if (segmentId === toSegmentId) {
    actions.builder.reorderSegmentQuestion({
      question: question,
      segmentId: segmentId,
      fromPosition: question.position,
      toPosition: toPosition,
    })
  } else {
    actions.builder.moveSegmentQuestion({
      question: question,
      fromSegmentId: segmentId,
      toSegmentId: toSegmentId,
      fromPosition: question.position,
      toPosition: toPosition,
    })
  }
}

export const reorderSegmentQuestion = (
  { state }: Context,
  {
    question,
    segmentId,
    fromPosition,
    toPosition,
  }: {
    question: SegmentQuestion
    segmentId: QuestionSegmentType['id']
    fromPosition: number
    toPosition: number
  }
) => {
  if (!state.selectedShow) throw Error('no show :(')

  if (fromPosition === toPosition) return
  if (fromPosition === undefined || toPosition === undefined) return

  const segment = state.selectedShow.segments[segmentId]

  if (!isQuestionSegment(segment))
    throw Error('Trying to reorder question in invalid segment')

  const newQuestions = { ...segment.questions }

  if (fromPosition < toPosition) {
    // Moving down list (2 -> 5)
    Object.values(newQuestions).forEach((x) => {
      if (x.position > fromPosition && x.position <= toPosition) x.position--
    })
  } else {
    // Moving up list (5 -> 2)
    Object.values(newQuestions).forEach((x) => {
      if (x.position < fromPosition && x.position >= toPosition) x.position++
    })
  }

  question.position = toPosition

  segment.questions = newQuestions
}

// TODO clean this up D:
export const moveSegmentQuestion = (
  { state, actions }: Context,
  {
    question,
    fromSegmentId,
    toSegmentId,
    fromPosition,
    toPosition,
    forceLast,
  }: {
    question: SegmentQuestion
    fromSegmentId: string
    toSegmentId: string
    fromPosition: number
    toPosition: number
    forceLast?: boolean
  }
) => {
  if (!state.selectedShow) throw Error('no show :(')

  const newSegments = { ...state.selectedShow.segments }
  const fromSegment = newSegments[fromSegmentId]
  const toSegment = newSegments[toSegmentId]

  if (!isQuestionSegment(fromSegment) || !isQuestionSegment(toSegment))
    throw new Error('Trying to move question between invalid segment')

  // Move to last position
  if (forceLast) {
    toPosition = Object.values(toSegment.questions).length + 1
  }

  if (fromSegmentId === toSegmentId) return
  if (fromPosition === undefined || toPosition === undefined) return

  if (!isQuestionSegment(fromSegment))
    throw Error('Trying to reorder question in invalid segment')

  actions.builder.removeSegmentQuestion({
    questionId: question.question.id,
    segmentId: fromSegment.id,
  })

  const cardsToUpdateInNewSegment = Object.values(toSegment.questions).filter(
    (x) => x.position >= toPosition
  )
  cardsToUpdateInNewSegment.forEach((x) => x.position++)
  question.position = toPosition
  toSegment.questions = {
    ...toSegment.questions,
    [question.question.id]: { ...question },
  }

  state.selectedShow.segments = newSegments
}

export const addSegment = ({ state }: Context) => {
  if (!state.selectedShow) return

  const ordinal_suffix_of = (i: number) => {
    const j = i % 10,
      k = i % 100
    if (j === 1 && k !== 11) {
      return i + 'st'
    }
    if (j === 2 && k !== 12) {
      return i + 'nd'
    }
    if (j === 3 && k !== 13) {
      return i + 'rd'
    }
    return i + 'th'
  }

  const existingSegmentsCount = Object.values(
    state.selectedShow.segments
  ).length

  const newSegment: QuestionSegmentType = {
    id: nanoid(),
    type: 'QUESTIONS',
    name: `${ordinal_suffix_of(existingSegmentsCount + 1)} segment`,
    position: existingSegmentsCount + 1,
    questions: {},
    intro: {
      type: 'NONE',
    },
  }

  state.selectedShow.segments[newSegment.id] = newSegment
}

export const reorderSegment = (
  { state }: Context,
  {
    segmentId,
    toPosition,
  }: {
    segmentId: Segment['id']
    toPosition: number
  }
) => {
  if (!state.selectedShow) throw Error('no show :(')

  const seg = state.selectedShow.segments[segmentId]
  const fromPosition = seg.position

  if (fromPosition === toPosition) return
  if (fromPosition === undefined || toPosition === undefined) return

  const newSegments = { ...state.selectedShow.segments }

  if (fromPosition < toPosition) {
    // Moving down list (2 -> 5)
    Object.values(newSegments).forEach((x) => {
      if (x.position > fromPosition && x.position <= toPosition) x.position--
    })
  } else {
    // Moving up list (5 -> 2)
    Object.values(newSegments).forEach((x) => {
      if (x.position < fromPosition && x.position >= toPosition) x.position++
    })
  }

  seg.position = toPosition

  // if (toPosition === 3) {
  //   console.trace(newSegments)
  //   debugger
  // }
  state.selectedShow.segments = newSegments
}

export const removeSegment = ({ state }: Context, segmentId: string) => {
  if (!state.selectedShow) return

  delete state.selectedShow.segments[segmentId]
}

export const updateSegment = (
  { state }: Context,
  update: { id: string } & Partial<QuestionSegmentType>
) => {
  if (!state.selectedShow) return

  const segment = state.selectedShow.segments[update.id]

  if (!isQuestionSegment(segment))
    throw new Error('Trying to update invalid segment')

  state.selectedShow.segments[update.id] = { ...segment, ...update }
}
