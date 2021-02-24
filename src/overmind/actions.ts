import { Action } from 'overmind'

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

  segment.questions.splice(questionIdx, 1)
}

export const reorderSegmentQuestion: Action<{
  segmentId: string
  sourcePosition: number
  targetPosition: number
}> = ({ state }, { segmentId, sourcePosition, targetPosition }) => {
  const segment = state.segments.find((x) => x.id === segmentId)

  if (!segment) return

  const result = Array.from(segment.questions)
  const [removed] = result.splice(sourcePosition, 1)
  result.splice(targetPosition, 0, removed)

  segment.questions = result
}

export const moveSegmentQuestion: Action<{
  fromSegmentId: string
  toSegmentId: string
  questionIndex: number
  targetIndex: number
}> = (
  { state },
  { fromSegmentId, toSegmentId, questionIndex, targetIndex }
) => {
  const fromSegment = state.segments.find((x) => x.id === fromSegmentId)
  const toSegment = state.segments.find((x) => x.id === toSegmentId)

  if (!fromSegment || !toSegment) return

  const fromClone = Array.from(fromSegment.questions)
  const toClone = Array.from(toSegment.questions)

  const [removedQuestion] = fromClone.splice(questionIndex, 1)

  toClone.splice(targetIndex, 0, removedQuestion)

  fromSegment.questions = fromClone
  toSegment.questions = toClone
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
  sourcePosition: number
  targetPosition: number
}> = ({ state }, { sourcePosition, targetPosition }) => {
  const result = Array.from(state.segments)
  const [removed] = result.splice(sourcePosition, 1)
  result.splice(targetPosition, 0, removed)

  state.segments = result
}
