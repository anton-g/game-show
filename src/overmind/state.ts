import { derived } from 'overmind'
import { Show, Segment, Question } from './types'
import { mockQuestions, mockShow1, mockShow2 } from './mocks'

type State = {
  shows: Record<Show['id'], Show>
  selectedShowId: string | null
  selectedShow: Show | null
  selectedShowSegmentsList: Segment[]
  unusedQuestions: Question[]

  questions: Record<Question['id'], Question>
  questionsList: Question[]
}

export const state: State = {
  shows: {
    [mockShow1.id]: mockShow1,
    [mockShow2.id]: mockShow2,
  },
  selectedShowId: mockShow1.id,
  selectedShow: derived(
    (state: State) => state.shows[state.selectedShowId ?? '']
  ),
  selectedShowSegmentsList: derived((state: State) =>
    state.selectedShow
      ? Object.values(state.selectedShow.segments).sort(
          (a, b) => a.position - b.position
        )
      : []
  ),
  questions: mockQuestions,
  questionsList: derived((state: State) => Object.values(state.questions)),
  unusedQuestions: derived((state: State) => {
    if (!state.selectedShow) return []

    const usedQuestions = Object.values(state.selectedShow.segments).flatMap(
      (x) => Object.values(x.questions)
    )
    if (!usedQuestions) return []

    return state.questionsList.filter(
      (x) => usedQuestions.findIndex((q) => q.question.id === x.id) === -1
    )
  }),
}
