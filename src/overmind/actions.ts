import { nanoid } from 'nanoid'
import { Context } from '.'
import { Question, Segment, SegmentQuestion } from './state'

export const selectShow = ({ state }: Context, showId: Question['id']) => {
  state.selectedShowId = showId
}

// library

export const createQuestion = (
  { state, effects }: Context,
  question: Question
) => {
  question.id = nanoid()
  state.questions[question.id] = question
  effects.router.goTo('/library')
}

export const updateQuestion = (
  { state, effects }: Context,
  question: Question
) => {
  if (!state.questions[question.id]) {
    console.log('error')
    return
  }

  state.questions[question.id] = question
  effects.router.goTo('/library')
}

export const deleteQuestion = (
  { state, effects }: Context,
  questionId: string
) => {
  delete state.questions[questionId]
  effects.router.goTo('/library')
}

// creator

export const findQuestion = (
  { state }: Context,
  id: string
): { question: SegmentQuestion; segmentId: string } => {
  if (!state.selectedShow) throw Error('no show :(')

  const segments = Object.values(state.selectedShow.segments)
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]

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
  // const segment = state.selectedShow?.segments.find((x) => x.id === segmentId)
  // if (!segment) return
  // const question = state.questionsList.find((x) => x.id === questionId)
  // if (!question) return
  // // TODO why doesn't push work here?
  // segment.questions = [...segment.questions, question]
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

  delete state.selectedShow.segments[segmentId].questions[questionId]
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
    toSegmentId: Segment['id']
  }
) => {
  const { question, segmentId } = actions.findQuestion(id)

  if (segmentId === toSegmentId) {
    actions.reorderSegmentQuestion({
      question,
      segmentId,
      fromPosition: question.position,
      toPosition,
    })
  } else {
    actions.moveSegmentQuestion({
      question,
      fromSegmentId: segmentId,
      toSegmentId: toSegmentId,
      fromPosition: question.position,
      toPosition,
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
    segmentId: Segment['id']
    fromPosition: number
    toPosition: number
  }
) => {
  console.log(
    `Reordering question ${question.question.id} in seg ${segmentId} to ${toPosition}`
  )

  if (!state.selectedShow) throw Error('no show :(')
  if (fromPosition === toPosition) return
  if (fromPosition === undefined || toPosition === undefined) return

  const segment = state.selectedShow.segments[segmentId]

  if (fromPosition < toPosition) {
    // Moving down list (2 -> 5), update all questions above
    Object.values(segment.questions).forEach((x) => {
      if (x.position > fromPosition && x.position <= toPosition) {
        x.position--
      }
    })
  } else {
    // Moving up list (5 -> 2), update all questions below
    Object.values(segment.questions).forEach((x) => {
      if (x.position < fromPosition && x.position >= toPosition) {
        x.position++
      }
    })
  }

  question.position = toPosition

  state.shows[state.selectedShow.id].segments[segmentId] = { ...segment }
  // todo check if can use derived?
}

export const moveSegmentQuestion = (
  { state }: Context,
  {
    question,
    fromSegmentId,
    toSegmentId,
    fromPosition,
    toPosition,
  }: {
    question: SegmentQuestion
    fromSegmentId: string
    toSegmentId: string
    fromPosition: number
    toPosition: number
  }
) => {
  if (!state.selectedShow) throw Error('no show :(')
  if (fromSegmentId === toSegmentId) return
  if (fromPosition === undefined || toPosition === undefined) return

  const fromSegment = state.selectedShow.segments[fromSegmentId]

  delete fromSegment.questions[question.question.id]
  Object.values(fromSegment.questions).forEach((x) => {
    if (x.position > fromPosition) x.position--
  })

  const toSegment = state.selectedShow.segments[toSegmentId]
  Object.values(toSegment.questions).forEach((x) => {
    if (x.position >= toPosition) x.position++
  })
  question.position = toPosition
  toSegment.questions[question.question.id] = { ...question } // but why :(

  state.shows[state.selectedShow.id].segments[fromSegmentId] = {
    ...fromSegment,
  }
  state.shows[state.selectedShow.id].segments[toSegmentId] = { ...toSegment }
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

  const newSegment: Segment = {
    id: nanoid(),
    name: `${ordinal_suffix_of(
      Object.values(state.selectedShow.segments).length + 1
    )} segment`,
    questions: {},
    intro: {
      src: '',
      type: 'COMPONENT',
    },
  }

  state.selectedShow.segments[newSegment.id] = newSegment
}

export const reorderSegment = (
  { state }: Context,
  {
    segmentId,
    targetPosition,
  }: {
    segmentId: string
    targetPosition: number
  }
) => {
  if (!state.selectedShow) return

  // const sourcePosition = state.selectedShow.segments.findIndex(
  //   (x) => x.id === segmentId
  // )
  // const result = Array.from(state.selectedShow.segments)
  // const [removed] = result.splice(sourcePosition, 1)
  // result.splice(targetPosition, 0, removed)

  // state.selectedShow.segments = result
}

export const removeSegment = ({ state }: Context, segmentId: string) => {
  if (!state.selectedShow) return

  delete state.selectedShow.segments[segmentId]
}

export const updateSegment = (
  { state }: Context,
  update: { id: string } & Partial<Segment>
) => {
  if (!state.selectedShow) return

  const segment = state.selectedShow.segments[update.id]
  state.selectedShow.segments[update.id] = { ...segment, ...update }
}
