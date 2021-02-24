import { derived } from 'overmind'
import {
  mockQuestions,
  mockSegment1,
  mockSegment2,
  mockSegment3,
} from './mocks'

type AnswerType =
  | 'BUZZ_SINGLE'
  | 'OPTIONS_SINGLE'
  | 'OPTIONS_MULTI'
  | 'PHYSICAL'

type Answer = {
  type: AnswerType
  value: string
}

type BaseQuestion = {
  id: string
  question: string
  answer: Answer
}

type TextQuestion = {
  type: 'TEXT'
} & BaseQuestion

type SoundQuestion = {
  type: 'SOUND'
} & BaseQuestion

export type Question = TextQuestion | SoundQuestion

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
  questions: Question[]
  unusedQuestions: Question[]
}

export const state: State = {
  segments: [mockSegment1, mockSegment2, mockSegment3],
  questions: [...mockQuestions],
  unusedQuestions: derived((state: State) => {
    const usedQuestions = state.segments.flatMap((x) => x.questions)
    return state.questions.filter(
      (x) => usedQuestions.findIndex((q) => q.id === x.id) === -1
    )
  }),
}
