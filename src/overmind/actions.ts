import { Action } from 'overmind'
import { Segment } from './state'

export const getQuestionSegment: Action<string, Segment | undefined> = (
  { state },
  questionId
) => {
  return state.segments.find(
    (s) => s.questions.findIndex((q) => q.id === questionId) !== -1
  )
}

export const addSegmentQuestion: Action<{
  segmentId: string
  questionId: string
}> = ({ state }, { segmentId, questionId }) => {
  const segment = state.segments.find((x) => x.id === segmentId)
  if (!segment) return

  const question = state.questions.find((x) => x.id === questionId)
  if (!question) return

  // TODO why doesn't push work here?
  segment.questions = [...segment.questions, question]
}

export const removeSegmentQuestion: Action<{
  segmentId: string
  questionId: string
}> = ({ state }, { segmentId, questionId }) => {
  const segment = state.segments.find((x) => x.id === segmentId)
  if (!segment) return

  const questionIdx = segment.questions.findIndex((q) => q.id === questionId)
  if (questionIdx === -1) return

  const result = Array.from(segment.questions)
  result.splice(questionIdx, 1)

  segment.questions = result
}

export const reorderSegmentQuestion: Action<{
  segmentId: string
  questionId: string
  targetPosition: number
}> = ({ state }, { segmentId, questionId, targetPosition }) => {
  console.log(
    `Reordering question ${questionId} in seg ${segmentId} to idx ${targetPosition}`
  )

  const segment = state.segments.find((x) => x.id === segmentId)
  if (!segment) return

  const sourcePosition = segment.questions.findIndex((x) => x.id === questionId)

  const result = Array.from(segment.questions)
  const [removed] = result.splice(sourcePosition, 1)
  result.splice(targetPosition, 0, removed)

  segment.questions = result
}

export const moveSegmentQuestion: Action<{
  fromSegmentId: string | null
  toSegmentId: string | null
  questionId: string
  toIndex?: number
}> = ({ state }, { fromSegmentId, toSegmentId, questionId, toIndex }) => {
  if (fromSegmentId === toSegmentId) return

  console.log(
    `Moving question ${questionId} from segment ${fromSegmentId} to segment ${toSegmentId} ${toIndex}`
  )

  const fromSegment = state.segments.find((x) => x.id === fromSegmentId)
  const toSegment = state.segments.find((x) => x.id === toSegmentId)

  if (!toSegment) return

  if (fromSegment) {
    const fromClone = Array.from(fromSegment.questions)
    const questionIndex = fromClone.findIndex((x) => x.id === questionId)
    if (questionIndex === -1) return
    const [removedQuestion] = fromClone.splice(questionIndex, 1)
    fromSegment.questions = fromClone

    const toClone = Array.from(toSegment.questions)
    toClone.splice(toIndex ?? toClone.length, 0, removedQuestion)
    toSegment.questions = toClone
  } else {
    const question = state.unusedQuestions.find((x) => x.id === questionId)
    if (!question) return

    const toClone = Array.from(toSegment.questions)
    toClone.splice(toIndex ?? toClone.length, 0, question)
    toSegment.questions = toClone
  }
}

export const addSegment: Action = ({ state }) => {
  state.segments.push({
    id: `segment-${Math.random()}`,
    name: `segment-${Math.random()}`,
    questions: [],
    intro: {
      src: '',
      type: 'COMPONENT',
    },
  })
}

export const reorderSegment: Action<{
  segmentId: string
  targetPosition: number
}> = ({ state }, { segmentId, targetPosition }) => {
  const sourcePosition = state.segments.findIndex((x) => x.id === segmentId)
  const result = Array.from(state.segments)
  const [removed] = result.splice(sourcePosition, 1)
  result.splice(targetPosition, 0, removed)

  state.segments = result
}

export const removeSegment: Action<string> = ({ state }, segmentId) => {
  state.segments = state.segments.filter((x) => x.id !== segmentId)
}

export const updateSegment: Action<{ id: string } & Partial<Segment>> = (
  { state },
  update
) => {
  const segmentIdx = state.segments.findIndex((x) => x.id === update.id)
  const segment = state.segments[segmentIdx]
  state.segments[segmentIdx] = { ...segment, ...update }
}
