import { derived } from 'overmind'
import {
  mockQuestions,
  mockSegment1,
  mockSegment2,
  mockSegment3,
} from './mocks'

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

type OptionsAnswer = {
  type: 'OPTIONS_SINGLE'
  options: {
    a: string
    b: string
    c?: string
    d?: string
  }
}

type Answer = BaseAnswer & (SingleBuzzAnswer | OptionsAnswer)

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

export type Segment = {
  id: string
  name: string
  intro: Intro
  questions: Question[]
}

type State = {
  segments: Segment[]
  questions: Record<Question['id'], Question>
  questionsList: Question[]
  unusedQuestions: Question[]
}

export const state: State = {
  segments: [mockSegment1, mockSegment2, mockSegment3],
  questions: mockQuestions,
  questionsList: derived((state: State) => Object.values(state.questions)),
  unusedQuestions: derived((state: State) => {
    const usedQuestions = state.segments.flatMap((x) => x.questions)
    return state.questionsList.filter(
      (x) => usedQuestions.findIndex((q) => q.id === x.id) === -1
    )
  }),
}
