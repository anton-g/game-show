import { derived } from 'overmind'
import { mockQuestions, mockShow1, mockShow2 } from './mocks'

// TODO use null instead of undefined/?

export type AnswerType =
  | 'BUZZ_SINGLE'
  | 'OPTIONS_SINGLE'
  | 'OPTIONS_MULTI'
  | 'PHYSICAL'

type BaseAnswer = {
  type: AnswerType
}

type SingleBuzzAnswer = {
  type: 'BUZZ_SINGLE'
  value: string
}

type PhysicalAnswer = {
  type: 'PHYSICAL'
  value: string
}

type OptionsAnswerOptions = {
  a: string
  b: string
  c?: string
  d?: string
}
type OptionsAnswer = {
  type: 'OPTIONS_SINGLE'
  options: OptionsAnswerOptions
  correctOption: keyof OptionsAnswerOptions
}

type Answer = BaseAnswer & (SingleBuzzAnswer | OptionsAnswer | PhysicalAnswer)

type Scoring = {
  value: number
}

type BaseQuestion = {
  id: string
  question: string
  lore?: string
  answer: Answer
  scoring: Scoring
}

type TextQuestion = {
  type: 'TEXT'
} & BaseQuestion

type SoundQuestion = {
  type: 'SOUND'
} & BaseQuestion

type ImageQuestion = {
  type: 'IMAGE'
} & BaseQuestion

type VideoQuestion = {
  type: 'VIDEO'
} & BaseQuestion

export type Question =
  | TextQuestion
  | SoundQuestion
  | ImageQuestion
  | VideoQuestion

type IntroType = 'VIDEO' | 'COMPONENT'

type Intro = {
  type: IntroType
  src: string
}

export type SegmentQuestion = {
  question: Question
  position: number
}

export type Segment = {
  id: string
  name: string
  intro: Intro
  questions: Record<Question['id'], SegmentQuestion>
  position: number
}

export type Show = {
  id: string
  name: string
  segments: Record<Segment['id'], Segment>
}

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
  // unusedQuestions: derived((state: State) => {
  //   const usedQuestions = state.selectedShow?.segments.flatMap(
  //     (x) => x.questions
  //   )
  //   if (!usedQuestions) return []

  //   return state.questionsList.filter(
  //     (x) => usedQuestions.findIndex((q) => q.id === x.id) === -1
  //   )
  // }),
  unusedQuestions: [],
}
